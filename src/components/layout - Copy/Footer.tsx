"use client";

import React, { useState } from "react";
import Link from "next/link";
import { brand, serviceLinks, nav } from "@/data/site";
import { Logo } from "./Logo";
import { newsletterSchema } from "@/lib/validations";
import { trackEvent } from "@/lib/analytics";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    setErrorMessage("");

    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      setNewsletterStatus("error");
      setErrorMessage(validation.error.errors[0]?.message || "Invalid email address");
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Unable to subscribe at this time.");
      }

      setNewsletterStatus("success");
      setEmail("");
    } catch (err: unknown) {
      setNewsletterStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Subscription failed. Please try again."
      );
    }
  };

  return (
    <footer className="bg-[#F7F6F2] text-[#17181C] pt-20 pb-12 border-t border-[#E5E4E0]">
      <div className="container-x">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E5E4E0]">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-5">
            <Logo />
            <p className="text-sm text-[#686B73] max-w-sm leading-relaxed">
              {brand.description}
            </p>
            <div className="pt-2 text-xs font-mono text-[#686B73] space-y-1">
              <p>📍 {brand.location}</p>
              <p>🕒 {brand.operatingHours}</p>
              <p>✉️ {brand.email}</p>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#7657FF] font-semibold">
              Disciplines
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-[#686B73] hover:text-[#17181C] transition-colors flex items-center gap-1 group"
                  >
                    <span>{s.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#7657FF]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#7657FF] font-semibold">
              Company
            </h4>
            <ul className="space-y-2.5">
              {nav
                .filter((n) => n.label !== "Services")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#686B73] hover:text-[#17181C] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[#8E9199] hover:text-[#17181C] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[#8E9199] hover:text-[#17181C] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#7657FF] font-semibold">
              Growth Intelligence
            </h4>
            <p className="text-xs text-[#686B73] leading-relaxed">
              Bi-weekly technical breakdowns on conversion engineering, SEO architecture, and performance paid acquisition.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#E5E4E0] rounded-xl px-3.5 py-2.5 text-xs text-[#17181C] placeholder-[#8E9199] focus:outline-none focus:border-[#7657FF]"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#7657FF] hover:bg-[#6242EC] text-white rounded-lg flex items-center justify-center text-xs transition-colors cursor-pointer disabled:opacity-50"
                  aria-label="Subscribe to growth intelligence"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
              {newsletterStatus === "success" && (
                <p className="text-xs text-[#7657FF] flex items-center gap-1 font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Subscribed successfully!
                </p>
              )}
              {newsletterStatus === "error" && (
                <p className="text-xs text-red-500 font-mono">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Closing statement banner */}
        <div className="py-8 border-b border-[#E5E4E0] text-center">
          <p className="font-mono text-xs tracking-widest text-[#686B73] uppercase font-medium">
            {brand.closingStatement}
          </p>
        </div>

        {/* Copyright and Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E9199]">
          <p>© {currentYear} {brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#17181C] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#17181C] transition-colors">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#17181C] transition-colors">
              Sitemap
            </Link>
            <Link href="/admin/services" className="hover:text-[#17181C] transition-colors text-gray-400 hover:text-gray-600">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
