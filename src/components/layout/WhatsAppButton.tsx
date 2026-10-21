"use client";

import React, { useState, useRef, useEffect } from "react";
import { brand } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, X, ArrowUpRight, Phone, Users, Sparkles, CheckCircle2 } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const primaryNumber = brand.whatsappNumber;
  const altNumber = brand.alternateWhatsappNumber;

  const defaultMsg = "Hi Sid, I'd like to discuss digital growth and marketing services.";
  const existingClientMsg = "Hi Sid, I'm an existing client/member reaching out for account support.";

  const primaryUrl = buildWhatsAppUrl(primaryNumber, defaultMsg);
  const altUrl = buildWhatsAppUrl(altNumber, existingClientMsg);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleChannelClick = (type: "primary" | "alternate") => {
    trackEvent("whatsapp_click", {
      source: "floating_widget",
      channel: type,
      number: type === "primary" ? primaryNumber : altNumber,
    });
    setIsOpen(false);
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Direct WhatsApp Contact Channels"
      className="fixed bottom-6 right-6 z-40 select-none"
    >
      {/* Floating Popup Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose WhatsApp Contact Channel"
          className="absolute bottom-16 right-0 mb-3 w-[320px] sm:w-[350px] rounded-3xl bg-[#111318] border border-[#303139] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-[10px] font-mono font-semibold mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span>OFFICIAL WHATSAPP CHANNELS</span>
              </div>
              <h4 className="font-display font-bold text-base text-white">
                Chat Directly on WhatsApp
              </h4>
              <p className="text-gray-400 text-xs mt-0.5">
                Choose the direct line that fits your needs:
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close channels dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Two Channels: Primary & Alternate */}
          <div className="space-y-3 relative z-10">
            {/* Channel 1: Primary Growth Desk */}
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleChannelClick("primary")}
              className="group block p-3.5 rounded-2xl bg-[#181A20] hover:bg-[#20232B] border border-[#303139] hover:border-[#25D366]/50 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#25D366]/10 text-[#25D366] font-semibold flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" />
                  <span>Primary Desk · New Inquiries</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#25D366] transition-colors" />
              </div>

              <div className="text-sm font-display font-bold text-white group-hover:text-[#25D366] transition-colors flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gray-400" />
                <span>{brand.phone}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                For new project inquiries, free consultations & service roadmaps.
              </p>
            </a>

            {/* Channel 2: Alternate Line for Existing & New Users */}
            <a
              href={altUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleChannelClick("alternate")}
              className="group block p-3.5 rounded-2xl bg-[#181A20] hover:bg-[#20232B] border border-[#303139] hover:border-[#25D366]/50 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#7657FF]/20 text-[#D9FF70] font-semibold flex items-center gap-1">
                  <Users className="h-2.5 w-2.5" />
                  <span>Alternate Line · Existing & New Users</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#D9FF70] transition-colors" />
              </div>

              <div className="text-sm font-display font-bold text-white group-hover:text-[#D9FF70] transition-colors flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gray-400" />
                <span>{brand.alternatePhone}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                Alternate contact line for active clients, OTP assistance & rapid support.
              </p>
            </a>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-[#303139] flex items-center justify-between text-[10px] font-mono text-gray-400">
            <span>⚡ Typical reply: &lt; 15 mins</span>
            <span>Active IST Hours</span>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Direct WhatsApp Contact Channels"
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:bg-[#20BD5A] hover:shadow-[0_12px_28px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="h-5 w-5 fill-current" />
        <span className="font-display font-medium text-xs tracking-wide hidden sm:inline-block">
          Chat on WhatsApp
        </span>
      </button>
    </aside>
  );
};

export default WhatsAppButton;
