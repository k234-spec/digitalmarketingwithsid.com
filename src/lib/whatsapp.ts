import type { ContactFormData } from "./validations";
import { brand } from "@/data/site";
import { buildWhatsAppUrl } from "./utils";

/**
 * Generates a clean, well-formatted WhatsApp message containing all submitted inquiry details.
 */
export function buildInquiryWhatsAppMessage(
  data: ContactFormData,
  submissionId?: string
): string {
  const parts: string[] = [
    "🚀 *NEW INQUIRY | Digital Marketing with Sid*",
    "━━━━━━━━━━━━━━━━━━━━━━━━",
    `👤 *Name:* ${data.name.trim()}`,
    `✉️ *Work Email:* ${data.email.trim()}`,
    `🏢 *Company:* ${data.company.trim()}`,
  ];

  if (data.website && data.website.trim()) {
    parts.push(`🌐 *Website:* ${data.website.trim()}`);
  }

  parts.push(`🎯 *Service Requested:* ${data.service}`);

  if (data.budget && data.budget.trim()) {
    parts.push(`💰 *Estimated Budget:* ${data.budget.trim()}`);
  }

  parts.push(
    "",
    "📋 *Project Goals & Requirements:*",
    data.projectGoals.trim(),
    "━━━━━━━━━━━━━━━━━━━━━━━━"
  );

  if (submissionId) {
    parts.push(`🔖 *Reference ID:* ${submissionId}`);
  }

  parts.push(`🌐 *Origin:* digitalmarketingwithsid.com`);

  return parts.join("\n");
}

/**
 * Builds the complete wa.me link directed to the dedicated WhatsApp inquiry number.
 */
export function getInquiryWhatsAppUrl(
  data: ContactFormData,
  submissionId?: string,
  customNumber?: string
): string {
  const targetNumber =
    customNumber ||
    process.env.NEXT_PUBLIC_INQUIRY_WHATSAPP_NUMBER ||
    process.env.INQUIRY_WHATSAPP_NUMBER ||
    brand.inquiryWhatsappNumber ||
    brand.alternateWhatsappNumber ||
    "917827169606";

  const message = buildInquiryWhatsAppMessage(data, submissionId);
  return buildWhatsAppUrl(targetNumber, message);
}
