import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { getPublishedServices } from "@/lib/db/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { constructMetadata } from "@/lib/seo";
import {
  Code2,
  Share2,
  BarChart2,
  Search,
  Palette,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Services & Capabilities",
  description:
    "Explore our full-funnel digital growth capabilities: Website Development, Social Media, Paid Performance, SEO, and Brand Systems.",
  path: "/services",
});

export default async function ServicesPage() {
  const serviceList = Object.values(servicesData);
  const dynamicServices = await getPublishedServices();

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case "website-development":
        return <Code2 className="h-6 w-6 text-[#7657FF]" />;
      case "social-media-marketing":
        return <Share2 className="h-6 w-6 text-[#7657FF]" />;
      case "performance-marketing":
        return <BarChart2 className="h-6 w-6 text-[#7657FF]" />;
      case "seo":
        return <Search className="h-6 w-6 text-[#7657FF]" />;
      case "branding-graphic-design":
      default:
        return <Palette className="h-6 w-6 text-[#7657FF]" />;
    }
  };

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
            <Reveal key={service.slug} delay={idx * 80}>
              <div className="group rounded-3xl bg-white border border-[#E5E4E0] p-8 sm:p-12 hover:border-[#7657FF]/40 transition-all duration-300 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Summary */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#7657FF] bg-[#7657FF]/10 px-3 py-1 rounded-md">
                        DISCIPLINE {service.code}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F7F6F2] border border-[#E5E4E0] flex items-center justify-center">
                        {getServiceIcon(service.slug)}
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#17181C] group-hover:text-[#7657FF] transition-colors">
                      <Link href={`/services/${service.slug}`}>
                        {service.title}
                      </Link>
                    </h3>

                    <p className="font-body text-sm sm:text-base text-[#686B73] leading-relaxed">
                      {service.summary}
                    </p>

                    <div className="pt-2">
                      <Button
                        href={`/services/${service.slug}`}
                        variant="primary"
                        size="md"
                        showArrow
                      >
                        Explore Complete Scope
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Key Deliverables & Commercial Impact */}
                  <div className="lg:col-span-7 bg-[#F7F6F2] rounded-2xl border border-[#E5E4E0] p-6 sm:p-8 space-y-6">
                    <div>
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#17181C] mb-3">
                        Commercial Impact & Benchmarks
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.benefits.map((b) => (
                          <div
                            key={b.title}
                            className="bg-white p-3.5 rounded-xl border border-[#E5E4E0]"
                          >
                            {b.stat && (
                              <span className="font-mono text-xs font-bold text-[#7657FF] block mb-1">
                                {b.stat}
                              </span>
                            )}
                            <p className="font-bold text-xs text-[#17181C] mb-1">
                              {b.title}
                            </p>
                            <p className="text-xs text-[#686B73] leading-relaxed">
                              {b.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#17181C] mb-3">
                        Standard Deliverables Summary
                      </h4>
                      <div className="space-y-2">
                        {service.deliverables.flatMap((d) => d.items).slice(0, 4).map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-[#17181C]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#7657FF] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
