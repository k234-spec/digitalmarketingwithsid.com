import React from "react";
import type { Metadata } from "next";
import { brand } from "@/data/site";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";
import { constructMetadata } from "@/lib/seo";
import { Mail, Phone, MapPin, Clock, MessageSquare, Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Contact & Consultation Booking",
  description:
    "Schedule a diagnostic consultation with our growth architects. Review your digital strategy, website architecture, and paid marketing pipelines.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-32 bg-[#F7F6F2]">
      {/* Contact Header */}
      <section className="pb-16 border-b border-[#E5E4E0]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <Reveal>
              <div className="eyebrow bg-[#7657FF]/10 px-3.5 py-1.5 rounded-full border border-[#7657FF]/20">
                <Sparkles className="h-3.5 w-3.5 text-[#7657FF]" />
                <span>START A CONVERSATION</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#17181C] tracking-tight leading-[1.1]">
                Let&apos;s Discuss Your Commercial Goals.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-body text-lg sm:text-xl text-[#686B73] leading-relaxed max-w-2xl">
                Whether you need a custom Next.js web application, a server-side paid acquisition audit, or a comprehensive brand refresh, our team is ready to evaluate your requirements.
              </p>
            </Reveal>

            {/* Quick Contact Info Cards */}
            <Reveal delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                <div className="rounded-2xl bg-white border border-[#E5E4E0] p-5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#7657FF]/10 flex items-center justify-center text-[#7657FF]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#686B73] font-semibold block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-xs font-mono font-medium text-[#17181C] hover:text-[#7657FF] transition-colors break-all"
                  >
                    {brand.email}
                  </a>
                </div>

                <div className="rounded-2xl bg-white border border-[#E5E4E0] p-5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#7657FF]/10 flex items-center justify-center text-[#7657FF]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#686B73] font-semibold block">
                    Primary Desk (Inquiries)
                  </span>
                  <a
                    href={`https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent("Hi Sid, I would like to discuss digital growth and marketing services.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-medium text-[#17181C] hover:text-[#7657FF] transition-colors"
                  >
                    {brand.phone}
                  </a>
                </div>

                <div className="rounded-2xl bg-[#111318] border border-[#25D366]/40 p-5 space-y-2 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#25D366]/15 rounded-full blur-xl pointer-events-none" />
                  <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#25D366] font-semibold block">
                    Alternate Line · Existing & New Users
                  </span>
                  <a
                    href={`https://wa.me/${brand.alternateWhatsappNumber}?text=${encodeURIComponent("Hi Sid, I am an existing/new user reaching out on the alternate WhatsApp line.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-white hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                  >
                    <span>{brand.alternatePhone}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] font-mono">
                      WhatsApp
                    </span>
                  </a>
                </div>

                <div className="rounded-2xl bg-white border border-[#E5E4E0] p-5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#7657FF]/10 flex items-center justify-center text-[#7657FF]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#686B73] font-semibold block">
                    Operating Hours
                  </span>
                  <p className="text-xs font-mono font-medium text-[#17181C]">
                    {brand.operatingHours}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Embedded Contact Form Section */}
      <ContactCTA />
    </div>
  );
}
