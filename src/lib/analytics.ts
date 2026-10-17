export type AnalyticsEventName =
  | "consultation_cta_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "contact_form_success"
  | "whatsapp_click"
  | "case_study_open"
  | "service_page_view"
  | "service_card_click";

export interface AnalyticsPayload {
  location?: string;
  service?: string;
  source?: string;
  slug?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Dispatches an analytics event without collecting or forwarding PII.
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  payload?: AnalyticsPayload
): void {
  if (typeof window === "undefined") return;

  // Custom debug log in development
  if (process.env.NODE_ENV !== "production") {
    // Development event tracking
  }

  // If Google Tag / Analytics is loaded on window
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", eventName, payload);
    }
  } catch {
    // Ignore error in non-tracking environments
  }
}
