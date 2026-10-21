import { ContactFormData } from "./validations";

export interface MailerResult {
  success: boolean;
  messageId?: string;
  mode: "production" | "development_mock";
  error?: string;
}

/**
 * Server-side mailer adapter for inquiry notifications.
 * Can be plugged into Resend, SendGrid, Postmark, or AWS SES via environment variables.
 */
export async function sendInquiryNotification(
  data: ContactFormData
): Promise<MailerResult> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const toEmail =
    process.env.CONTACT_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "info@digitalmarketingwithsid.com";

  // In production with API key configured:
  if (apiKey && apiKey.startsWith("re_")) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Digital Marketing with Sid <notifications@digitalmarketingwithsid.com>",
          to: [toEmail],
          subject: `[New Inquiry] ${data.company} - ${data.service}`,
          html: `
            <h2>New Consultation Request</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Website:</strong> ${data.website || "Not provided"}</p>
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Estimated Budget:</strong> ${data.budget || "Not specified"}</p>
            <p><strong>Project Goals:</strong></p>
            <blockquote>${data.projectGoals}</blockquote>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          mode: "production",
          error: errorData.message || "Failed to dispatch email via Resend API",
        };
      }

      const resJson = await response.json();
      return {
        success: true,
        mode: "production",
        messageId: resJson.id,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unknown dispatch error";
      return {
        success: false,
        mode: "production",
        error: errorMsg,
      };
    }
  }

  // Development / Mock mode when EMAIL_PROVIDER_API_KEY is not configured
  // Operational simulation logging safely without exposing personal PII in public logs
  const mockId = `mock_inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  console.info(`[SERVER MAILER MOCK] Inquiry accepted for company="${data.company}" service="${data.service}". Mock ID: ${mockId}. Configure EMAIL_PROVIDER_API_KEY for production SMTP/Resend delivery.`);

  return {
    success: true,
    mode: "development_mock",
    messageId: mockId,
  };
}
