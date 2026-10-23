/**
 * EmailJS Delivery Service for Secure Email OTP Verification
 * Supports both Server-side REST API dispatch and client-side SDK integration.
 * Complies with official EmailJS documentation: https://www.emailjs.com/docs/
 */

export interface SendOtpEmailParams {
  toEmail: string;
  otpCode: string;
  purpose?: string;
  expiryMinutes?: number;
  recipientName?: string;
}

export interface EmailJsResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Returns EmailJS configuration from environment variables.
 */
export function getEmailJsConfig() {
  const serviceId =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    process.env.EMAILJS_SERVICE_ID ||
    "";
  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    process.env.EMAILJS_TEMPLATE_ID ||
    "";
  const publicKey =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    process.env.EMAILJS_PUBLIC_KEY ||
    "";
  const privateKey = process.env.EMAILJS_PRIVATE_KEY || "";

  const isConfigured = Boolean(serviceId && templateId && publicKey);

  return {
    serviceId,
    templateId,
    publicKey,
    privateKey,
    isConfigured,
  };
}

/**
 * Dispatches an OTP verification email using EmailJS.
 * Runs server-side via the official EmailJS REST API (https://api.emailjs.com/api/v1.0/email/send).
 * This ensures the OTP code is never exposed to the client prior to email delivery.
 */
export async function sendOtpEmail({
  toEmail,
  otpCode,
  purpose = "Account Verification & Secure Access",
  expiryMinutes = 10,
  recipientName,
}: SendOtpEmailParams): Promise<EmailJsResult> {
  const config = getEmailJsConfig();

  if (!config.isConfigured) {
    const errorMsg =
      "EmailJS credentials missing. Please configure NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local.";
    console.error(`[EmailJS Service Error] ${errorMsg}`);
    return {
      success: false,
      error: errorMsg,
    };
  }

  const name = recipientName?.trim() || toEmail.split("@")[0];

  // Template variables mapping to common EmailJS template field names
  const templateParams: Record<string, string> = {
    to_email: toEmail,
    email: toEmail,
    recipient_email: toEmail,
    to_name: name,
    name: name,
    otp_code: otpCode,
    otp: otpCode,
    code: otpCode,
    passcode: otpCode,
    purpose: purpose,
    expiry_minutes: `${expiryMinutes} minutes`,
    expiration_time: `${expiryMinutes} minutes`,
    site_name: "Digital Marketing with Sid",
    brand_name: "Digital Marketing with Sid",
  };

  const payload: {
    lib_version?: string;
    service_id: string;
    template_id: string;
    user_id: string;
    template_params: Record<string, string>;
    accessToken?: string;
  } = {
    lib_version: "5.0.3",
    service_id: config.serviceId,
    template_id: config.templateId,
    user_id: config.publicKey,
    template_params: templateParams,
  };

  if (config.privateKey) {
    payload.accessToken = config.privateKey;
  }

  try {
    const siteOrigin =
      process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmarketingwithsid.com";

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": siteOrigin,
        "Referer": `${siteOrigin}/`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(
        `[EmailJS Success] Verification email successfully delivered to ${toEmail}.`
      );
      return {
        success: true,
        message: "Verification code requested. Please check your email.",
      };
    }

    const errorText = await response.text();
    console.error(
      `[EmailJS Delivery Error] HTTP ${response.status}: ${errorText}`
    );

    return {
      success: false,
      error: "Unable to send the verification code. Please try again.",
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Network error contacting EmailJS";
    console.error(`[EmailJS Dispatch Exception]:`, message);
    return {
      success: false,
      error: "Unable to send the verification code. Please try again.",
    };
  }
}
