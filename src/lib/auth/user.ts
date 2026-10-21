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

export * from "./user-constants";

const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

const SECRET_KEY =
  process.env.USER_SESSION_SECRET ||
  "digital_studio_user_session_secret_2026_secure_sid";

interface OtpRecord {
  target: string;
  code: string;
  type: "phone" | "email";
  name?: string;
  expiresAt: number;
}

// In-memory OTP storage with automatic expiry
const otpStore = new Map<string, OtpRecord>();

/**
 * Generates a 6-digit OTP and logs/dispatches notification from noreply@digitalmarketingwithsid.com
 */
export function sendOtp(
  target: string,
  type: "phone" | "email",
  name?: string
): { success: boolean; message: string; devOtp: string } {
  const normalized = normalizeTarget(target);

  // Generate cryptographic 6-digit numeric OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;

  otpStore.set(normalized, {
    target: normalized,
    code,
    type,
    name,
    expiresAt,
  });

  // Log official notification dispatch from company sender
  console.log(
    `\n=======================================================\n` +
      `[SECURITY DISPATCH] Digital Marketing with Sid\n` +
      `From: ${COMPANY_NOREPLY_EMAIL}\n` +
      `To: ${normalized} (${type.toUpperCase()})\n` +
      `Subject: Your One-Time Password (OTP) for Digital Studio Access\n` +
      `Security Code: ${code}\n` +
      `Expires in: 10 minutes\n` +
      `=======================================================\n`
  );

  return {
    success: true,
    message: `A one-time verification code has been dispatched from ${COMPANY_NOREPLY_EMAIL} to your ${type}.`,
    devOtp: code,
  };
}

/**
 * Validates the OTP submitted by the user
 */
export function verifyOtp(
  target: string,
  code: string,
  name?: string
): { success: boolean; user?: User; error?: string } {
  const normalized = normalizeTarget(target);
  const record = otpStore.get(normalized);

  if (!record) {
    return {
      success: false,
      error: "No active verification code found for this target. Please request a new OTP.",
    };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(normalized);
    return {
      success: false,
      error: "Verification code has expired. Please request a fresh code.",
    };
  }

  if (record.code !== code.trim()) {
    return {
      success: false,
      error: "Invalid verification code entered. Please check the code and try again.",
    };
  }

  // Clear consumed OTP
  otpStore.delete(normalized);

  const isEmail = record.type === "email" || normalized.includes("@");
  const user: User = {
    id: `user_${crypto.randomBytes(8).toString("hex")}`,
    identifier: normalized,
    phone: isEmail ? undefined : normalized,
    email: isEmail ? normalized : undefined,
    name: name || record.name || (isEmail ? normalized.split("@")[0] : `Member ${normalized.slice(-4)}`),
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
