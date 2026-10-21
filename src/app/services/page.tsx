import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { getPublishedServices } from "@/lib/db/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceListItem } from "@/components/services/ServiceListItem";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { constructMetadata } from "@/lib/seo";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Services & Capabilities",
  description:
    "Explore our full-funnel digital growth capabilities: Website Development, Social Media, Paid Performance, SEO, and Brand Systems.",
  path: "/services",
});

export default async function ServicesPage() {
  const serviceList = Object.values(servicesData);
  const dynamicServices = await getPublishedServices();

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#F7F6F2]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-6 mb-16">
          <Reveal>
            <div className="eyebrow bg-[#7657FF]/10 px-3.5 py-1.5 rounded-full border border-[#7657FF]/20 inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#7657FF]" />
              <span>FULL-FUNNEL GROWTH DISCIPLINES</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#17181C] tracking-tight leading-[1.1]">
              Engineered Capabilities for Serious Companies.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-lg sm:text-xl text-[#686B73] leading-relaxed">
              We do not treat design, engineering, and marketing as isolated silos. Every channel is designed as a connected lever to drive verified business inquiries.
            </p>
          </Reveal>
        </div>

        {/* Dynamic Service Cards Grid (from database) */}
        {dynamicServices.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E4E0]">
              <div>
                <h2 className="text-xl font-bold font-display text-[#17181C]">
                  Active Service Catalog
                </h2>
                <p className="text-xs font-mono text-gray-500 mt-0.5">
                  Dynamically managed through the studio administrative control panel
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {dynamicServices.map((service, idx) => (
                <Reveal key={service.id} delay={idx * 60}>
                  <ServiceCard service={service} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Service Scopes Header */}
        <div className="mb-10 pt-8 border-t border-[#E5E4E0]">
          <h2 className="text-2xl font-bold font-display text-[#17181C] mb-2">
            Detailed Disciplines & Complete Deliverables Scope
          </h2>
          <p className="text-sm text-gray-500 font-mono">
            Full process workflows, commercial KPIs, and operational deliverables
          </p>
        </div>

        {/* Detailed Service Cards List */}
        <div className="space-y-12">
          {serviceList.map((service, idx) => (
            <ServiceListItem
              key={service.slug}
              service={service}
              index={idx}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
