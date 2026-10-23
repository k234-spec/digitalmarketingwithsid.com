"use client";

import React from "react";
import Link from "next/link";
import { useUserAuth } from "@/components/auth/AuthContext";
import { isPublicService } from "@/lib/auth/user-constants";
import { Reveal } from "@/motion/Reveal";
import { Button } from "@/ui/Button";
import {
  Lock,
  CheckCircle2,
  ArrowRight,
  Code2,
  Share2,
  BarChart2,
  Search,
  Palette,
} from "lucide-react";
import { ServiceDetail } from "@/data/services";

interface ServiceListItemProps {
  service: ServiceDetail;
  index: number;
}

export const ServiceListItem: React.FC<ServiceListItemProps> = ({
  service,
  index,
}) => {
  const { isAuthenticated, openLoginModal } = useUserAuth();

  const isPublic = isPublicService(service.slug) || isPublicService(service.title);
  // Show only 2 services (Website Building and Paid Ads) clearly; blur the rest until logged in.
  const isLocked = !isAuthenticated && !isPublic;

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

  const handleLockedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openLoginModal("google");
  };

  return (
    <Reveal delay={index * 80}>
      <div
        onClick={isLocked ? handleLockedClick : undefined}
        className={`group rounded-3xl bg-white border border-[#E5E4E0] p-8 sm:p-12 transition-all duration-300 shadow-sm relative overflow-hidden ${
          isLocked
            ? "cursor-pointer hover:border-[#7657FF]/60 hover:shadow-md"
            : "hover:border-[#7657FF]/40"
        }`}
      >
        {/* Top subtle highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7657FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Content container - blurred for locked services */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start transition-all duration-300 ${
            isLocked
              ? "filter blur-[5px] opacity-35 select-none pointer-events-none"
              : ""
          }`}
        >
          {/* Left Column: Summary & Access Status */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-xs font-bold text-[#7657FF] bg-[#7657FF]/10 px-3 py-1 rounded-md">
                DISCIPLINE {service.code}
              </span>

              {isPublic && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Open Access</span>
                </span>
              )}

              <div className="w-10 h-10 rounded-xl bg-[#F7F6F2] border border-[#E5E4E0] flex items-center justify-center ml-auto">
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

            <div className="pt-2 flex items-center gap-3 flex-wrap">
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
                {service.deliverables
                  .flatMap((d) => d.items)
                  .slice(0, 4)
                  .map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-[#17181C]"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#7657FF] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Focused Overlay for Locked Services */}
        {isLocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-white/70 backdrop-blur-[2px] transition-all">
            <div className="w-14 h-14 rounded-full bg-[#111318] border border-[#7657FF]/40 text-[#D9FF70] flex items-center justify-center shadow-xl mb-4">
              <Lock className="h-6 w-6" />
            </div>

            <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-[#17181C] mb-2 tracking-tight">
              To unlock more features sign in
            </h4>

            <p className="text-sm text-gray-600 font-body mb-5 max-w-md">
              Detailed scope of work, timeline benchmarks, and execution processes for {service.title} unlock once logged in.
            </p>

            <button
              type="button"
              onClick={handleLockedClick}
              className="px-6 py-3.5 rounded-full bg-[#7657FF] hover:bg-[#6242EC] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5 text-[#D9FF70]" />
              <span>To unlock more features sign in</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
};

export default ServiceListItem;
