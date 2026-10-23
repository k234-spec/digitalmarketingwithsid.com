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

    // Fall back to verified Resend domain if EmailJS template is not found or fails
    const fallbackResult = await dispatchViaResendFallback({
      toEmail,
      otpCode,
      purpose,
      expiryMinutes,
      recipientName,
    });

    if (fallbackResult?.success) {
      return fallbackResult;
    }

    return {
      success: false,
      error: "Unable to send the verification code. Please try again.",
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Network error contacting EmailJS";
    console.error(`[EmailJS Dispatch Exception]:`, message);

    const fallbackResult = await dispatchViaResendFallback({
      toEmail,
      otpCode,
      purpose,
      expiryMinutes,
      recipientName,
    });

    if (fallbackResult?.success) {
      return fallbackResult;
    }

    return {
      success: false,
      error: "Unable to send the verification code. Please try again.",
    };
  }
}

/**
 * Fallback dispatcher using Resend with custom verified domain.
 * Ensures OTPs are reliably delivered even if EmailJS template ID is not yet published.
 */
async function dispatchViaResendFallback({
  toEmail,
  otpCode,
  purpose = "Account Verification & Secure Access",
  expiryMinutes = 10,
  recipientName,
}: SendOtpEmailParams): Promise<EmailJsResult | null> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  if (!apiKey || !apiKey.startsWith("re_")) {
    return null;
  }

  const name = recipientName?.trim() || toEmail.split("@")[0];

  try {
    const fromAddress =
      "Digital Marketing with Sid <noreply@digitalmarketingwithsid.com>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toEmail],
        subject: `Your Verification Code: ${otpCode} — Digital Marketing with Sid`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; background: #0b0c10; color: #ffffff; border-radius: 16px; border: 1px solid #1f232d;">
            <div style="margin-bottom: 24px;">
              <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0 0 6px 0; letter-spacing: -0.5px;">Digital Marketing with Sid</h1>
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">${purpose}</p>
            </div>
            <div style="background: #141721; border: 1px solid #282d3c; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <p style="color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px 0; font-family: monospace;">One-Time Security Passcode</p>
              <div style="font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #D9FF70; font-family: monospace; line-height: 1;">${otpCode}</div>
              <p style="color: #6b7280; font-size: 12px; margin: 14px 0 0 0; font-family: monospace;">Expires in ${expiryMinutes} minutes • Single use only</p>
            </div>
            <p style="color: #d1d5db; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
              Hello ${name}, please enter this verification code on the site to authenticate your account.
            </p>
            <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 0 0 20px 0;">
              If you did not request this verification code, please ignore this email or reach out to our team.
            </p>
            <div style="border-top: 1px solid #1f232d; padding-top: 16px; margin-top: 24px; font-size: 11px; color: #6b7280; font-family: monospace;">
              TLS Encrypted • Digital Marketing with Sid • Delhi, India
            </div>
          </div>
        `,
      }),
    });

    if (res.ok) {
      console.log(
        `[Resend Delivery Success] Verification email successfully delivered to ${toEmail}.`
      );
      return {
        success: true,
        message: "Verification code requested. Please check your email.",
      };
    }

    const errData = await res.text();
    console.warn(`[Resend Fallback Warning] HTTP ${res.status}: ${errData}`);
  } catch (err: unknown) {
    console.error("[Resend Fallback Exception]:", err);
  }

  return null;
}
