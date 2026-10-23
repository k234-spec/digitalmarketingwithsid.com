"use client";

import emailjs from "@emailjs/browser";

/**
 * Client-Side EmailJS SDK Helper
 * Leverages the official @emailjs/browser SDK (https://www.emailjs.com/docs/sdk/installation/)
 */

export const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "Tv6RmLe-U4J77h6j8";
export const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_8vyxkwe";
export const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_0navwiu";

let isInitialized = false;

/**
 * Initializes the EmailJS Browser SDK with the public key.
 */
export function initEmailJs(): void {
  if (typeof window === "undefined" || isInitialized) return;
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
    });
    isInitialized = true;
  }
}

export interface ClientEmailParams {
  toEmail: string;
  recipientName?: string;
  otpCode?: string;
  purpose?: string;
  expiryMinutes?: number;
}

/**
 * Dispatches an email using the client-side @emailjs/browser SDK.
 */
export async function sendEmailViaBrowserSdk({
  toEmail,
  recipientName,
  otpCode,
  purpose = "Account Verification",
  expiryMinutes = 10,
}: ClientEmailParams) {
  initEmailJs();

  const name = recipientName?.trim() || toEmail.split("@")[0];

  const templateParams: Record<string, string> = {
    to_email: toEmail,
    email: toEmail,
    recipient_email: toEmail,
    to_name: name,
    name: name,
    purpose: purpose,
    expiry_minutes: `${expiryMinutes} minutes`,
    expiration_time: `${expiryMinutes} minutes`,
    site_name: "Digital Marketing with Sid",
    brand_name: "Digital Marketing with Sid",
    ...(otpCode ? { otp_code: otpCode, otp: otpCode, code: otpCode } : {}),
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    {
      publicKey: EMAILJS_PUBLIC_KEY,
    }
  );
}
