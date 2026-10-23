import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import {
  USER_COOKIE_NAME,
  COMPANY_NOREPLY_EMAIL,
  User,
  normalizeTarget,
  isPublicService,
} from "./user-constants";
import { sendOtpEmail } from "./emailjs";

export * from "./user-constants";

const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const OTP_COOLDOWN_MS = 60 * 1000; // 60 seconds resend cooldown
const MAX_VERIFICATION_ATTEMPTS = 5; // Max invalid tries before code is invalidated
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 OTPs per 15-minute window per target

const SECRET_KEY =
  process.env.USER_SESSION_SECRET ||
  "digital_studio_user_session_secret_2026_secure_sid";

interface OtpRecord {
  target: string;
  code: string;
  type: "phone" | "email";
  name?: string;
  purpose: string;
  expiresAt: number;
  createdAt: number;
  attempts: number;
}

interface RateLimitRecord {
  count: number;
  firstRequestAt: number;
}

// In-memory OTP storage with automatic expiry & attempt tracking
const otpStore = new Map<string, OtpRecord>();

// In-memory rate limiting store for OTP requests
const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Checks and updates rate limits for a given target.
 */
function checkRateLimit(target: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(target);

  if (!record || now - record.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(target, { count: 1, firstRequestAt: now });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((record.firstRequestAt + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(1, retryAfter) };
  }

  record.count += 1;
  return { allowed: true };
}

export interface SendOtpResult {
  success: boolean;
  message: string;
  cooldownRemaining?: number;
  error?: string;
}

/**
 * Generates a cryptographically secure 6-digit OTP and dispatches it.
 * If target is an email, delivery is performed via EmailJS.
 */
export async function sendOtp(
  target: string,
  type: "phone" | "email",
  name?: string,
  purpose: string = "Account Verification & Secure Access"
): Promise<SendOtpResult> {
  const normalized = normalizeTarget(target);
  const now = Date.now();

  // 1. Check Resend Cooldown (60 seconds)
  const existing = otpStore.get(normalized);
  if (existing) {
    const elapsed = now - existing.createdAt;
    if (elapsed < OTP_COOLDOWN_MS) {
      const remaining = Math.ceil((OTP_COOLDOWN_MS - elapsed) / 1000);
      return {
        success: false,
        message: "",
        cooldownRemaining: remaining,
        error: `Please wait ${remaining} seconds before requesting a new verification code.`,
      };
    }
  }

  // 2. Check Rate Limit (max 5 per 15 minutes)
  const rateLimit = checkRateLimit(normalized);
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: "",
      error: `Too many verification requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
    };
  }

  // 3. Generate cryptographically secure 6-digit numeric OTP (100000 - 999999)
  const code = crypto.randomInt(100000, 1000000).toString();
  const expiresAt = now + OTP_EXPIRY_MS;

  otpStore.set(normalized, {
    target: normalized,
    code,
    type,
    name,
    purpose,
    expiresAt,
    createdAt: now,
    attempts: 0,
  });

  // 4. Log official dispatch notification (Strictly never logging the plaintext code)
  console.log(
    `[SECURITY DISPATCH] Digital Marketing with Sid: Dispatched OTP to ${normalized} (${type.toUpperCase()}) for "${purpose}".`
  );

  // 5. Dispatch via EmailJS if email target
  const isEmail = type === "email" || normalized.includes("@");
  if (isEmail) {
    const emailResult = await sendOtpEmail({
      toEmail: normalized,
      otpCode: code,
      purpose,
      expiryMinutes: 10,
      recipientName: name,
    });

    if (!emailResult.success) {
      // Delete generated code so invalid/unreachable addresses cannot be brute-forced
      otpStore.delete(normalized);
      return {
        success: false,
        message: "",
        error: "Unable to send the verification code. Please try again.",
      };
    }
  }

  return {
    success: true,
    message: "Verification code requested. Please check your email.",
  };
}

/**
 * Internal helper for unit test runners only.
 * Never imported or exposed to API routes or client components.
 */
export function _getOtpForTesting(target: string): string | undefined {
  return otpStore.get(normalizeTarget(target))?.code;
}

export interface VerifyOtpResult {
  success: boolean;
  user?: User;
  error?: string;
  attemptsRemaining?: number;
}

/**
 * Validates the OTP submitted by the user with rate limiting and timing-attack safe comparison.
 */
export function verifyOtp(
  target: string,
  code: string,
  name?: string
): VerifyOtpResult {
  const normalized = normalizeTarget(target);
  const record = otpStore.get(normalized);

  if (!record) {
    return {
      success: false,
      error: "No active verification code found for this target. Please request a new OTP.",
    };
  }

  // Check expiration
  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalized);
    return {
      success: false,
      error: "Verification code has expired. Please request a fresh code.",
    };
  }

  // Increment attempts counter
  record.attempts += 1;

  // Enforce maximum failed attempts limit
  if (record.attempts > MAX_VERIFICATION_ATTEMPTS) {
    otpStore.delete(normalized);
    return {
      success: false,
      error: "Maximum verification attempts exceeded. For your security, this code has been revoked. Please request a new OTP.",
      attemptsRemaining: 0,
    };
  }

  // Constant-time comparison to prevent timing attacks
  const inputTrimmed = code.trim();
  const inputBuffer = Buffer.from(inputTrimmed.padEnd(6, " "));
  const recordBuffer = Buffer.from(record.code.padEnd(6, " "));

  const isMatch =
    inputTrimmed.length === 6 &&
    inputBuffer.length === recordBuffer.length &&
    crypto.timingSafeEqual(inputBuffer, recordBuffer);

  if (!isMatch) {
    const attemptsRemaining = MAX_VERIFICATION_ATTEMPTS - record.attempts;
    return {
      success: false,
      error: `Invalid verification code. Please check the code and try again. (${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining)`,
      attemptsRemaining,
    };
  }

  // Clear consumed OTP immediately (single-use guarantee)
  otpStore.delete(normalized);

  const isEmail = record.type === "email" || normalized.includes("@");
  const user: User = {
    id: `user_${crypto.randomBytes(8).toString("hex")}`,
    identifier: normalized,
    phone: isEmail ? undefined : normalized,
    email: isEmail ? normalized : undefined,
    name:
      name ||
      record.name ||
      (isEmail ? normalized.split("@")[0] : `Member ${normalized.slice(-4)}`),
    provider: record.type,
    createdAt: Date.now(),
  };

  return { success: true, user };
}

/**
 * Creates a signed JWT-like token for user session
 */
export function createUserToken(user: User): string {
  const payload = Buffer.from(JSON.stringify(user)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

/**
 * Verifies and decodes the user session token
 */
export function verifyUserToken(token?: string | null): User | null {
  if (!token || !token.includes(".")) return null;
  try {
    const [payload, signature] = token.split(".");
    const expectedSig = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(payload)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSig)
      )
    ) {
      return null;
    }

    const user: User = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    );

    const age = Date.now() - (user.createdAt || 0);
    if (age > SESSION_MAX_AGE_SECONDS * 1000 || age < 0) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

/**
 * Reads user session from request headers (Cookie or Authorization)
 */
export function getUserFromRequest(request: Request | NextRequest): User | null {
  // Check Authorization Bearer header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const user = verifyUserToken(token);
    if (user) return user;
  }

  // Check Cookie header
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(
      new RegExp(`(?:^|;\\s*)${USER_COOKIE_NAME}=([^;]+)`)
    );
    if (match) {
      return verifyUserToken(decodeURIComponent(match[1]));
    }
  }

  return null;
}

/**
 * Reads user session from Next.js server cookies
 */
export async function getServerUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(USER_COOKIE_NAME)?.value;
    return verifyUserToken(token);
  } catch {
    return null;
  }
}
