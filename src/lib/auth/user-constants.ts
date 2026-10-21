/**
 * Client-safe User Authentication and Public Services Constants
 * Safe to import in both Client and Server Components without next/headers or Node.js builtins.
 */

export const USER_COOKIE_NAME = "user_session";
export const COMPANY_NOREPLY_EMAIL = "noreply@digitalmarketingwithsid.com";

export interface User {
  id: string;
  identifier: string; // Phone number or email
  name?: string;
  phone?: string;
  email?: string;
  provider: "phone" | "google" | "email";
  createdAt: number;
}

/**
 * Normalizes phone numbers or emails for keying
 */
export function normalizeTarget(target: string): string {
  const trimmed = target.trim().toLowerCase();
  // If target looks like phone (digits, +, spaces, hyphens)
  if (/^[\d+\-\s()]+$/.test(target)) {
    return target.replace(/[^\d+]/g, "");
  }
  return trimmed;
}

/**
 * Checks whether a given service is freely public or members-only.
 * Public services: Website Development ("website building") and Performance Marketing ("paid ads").
 * All other services require user login.
 */
export function isPublicService(nameOrSlug: string): boolean {
  if (!nameOrSlug) return false;
  const s = nameOrSlug.toLowerCase().trim();

  // Website Development / Website Building
  if (
    s === "website-development" ||
    s.includes("website") ||
    s.includes("web solutions")
  ) {
    return true;
  }

  // Performance Marketing / Paid Ads
  if (
    s === "performance-marketing" ||
    s.includes("performance") ||
    s.includes("paid ads") ||
    s.includes("digital marketing")
  ) {
    return true;
  }

  return false;
}
