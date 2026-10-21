import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "info@digitalmarketingwithsid.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin12345";
const SECRET_KEY =
  process.env.ADMIN_SESSION_SECRET ||
  "digital_studio_admin_secret_key_super_secure_9921_sid";

export function checkAdminCredentials(
  email?: string | null,
  password?: string | null
): boolean {
  if (!email || !password) return false;
  const normalized = email.trim().toLowerCase();
  const validEmails = [
    ADMIN_EMAIL.toLowerCase(),
    "info@digitalmarketingwithsid.com",
    "admin@digitalmarketingwithsid.com",
  ];
  return (
    validEmails.includes(normalized) &&
    password === ADMIN_PASSWORD
  );
}

export function createAdminToken(email: string): string {
  const timestamp = Date.now();
  const payload = Buffer.from(
    JSON.stringify({ email: email.toLowerCase(), ts: timestamp })
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyAdminToken(token?: string | null): boolean {
  if (!token || !token.includes(".")) return false;
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
      return false;
    }

    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    );
    // 7-day expiration
    const age = Date.now() - (data.ts || 0);
    if (age > SESSION_MAX_AGE_SECONDS * 1000 || age < 0) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function verifyAdminRequest(request: Request | NextRequest): boolean {
  // Check Authorization header first
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (verifyAdminToken(token)) return true;
  }

  // Check Cookie header
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(
      new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]+)`)
    );
    if (match && verifyAdminToken(decodeURIComponent(match[1]))) {
      return true;
    }
  }

  return false;
}

export async function isServerAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifyAdminToken(token);
  } catch {
    return false;
  }
}
