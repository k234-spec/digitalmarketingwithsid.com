"use client";

import React from "react";
import { brand } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const number = brand.whatsappNumber;
  if (!number || number.length < 5) return null;

  const message = "Hi, I'd like to discuss digital marketing services for my business.";
  const url = buildWhatsAppUrl(number, message);

  const handleClick = () => {
    trackEvent("whatsapp_click", { source: "floating_button" });
  };

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with our growth specialists on WhatsApp"
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:bg-[#20BD5A] hover:shadow-[0_12px_28px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="h-5 w-5 fill-current" />
        <span className="font-display font-medium text-xs tracking-wide hidden sm:inline-block">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
