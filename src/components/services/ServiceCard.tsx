"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, Sparkles, ArrowRight } from "lucide-react";
import { ServiceRecord } from "@/lib/db/types";
import { useUserAuth } from "@/components/auth/AuthContext";
import { isPublicService } from "@/lib/auth/user-constants";

interface ServiceCardProps {
  service: Pick<
    ServiceRecord,
    "id" | "serviceName" | "moduleName" | "imageUrl"
  >;
  className?: string;
}

export function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const { isAuthenticated, openLoginModal } = useUserAuth();

  const isExternal =
    service.imageUrl.startsWith("http://") ||
    service.imageUrl.startsWith("https://");

  const isPublic =
    isPublicService(service.serviceName) ||
    isPublicService(service.moduleName);

  // Exactly 2 services are public (Website Building and Paid Ads). The rest are blurred until logged in.
  const isLocked = !isAuthenticated && !isPublic;

  const handleLockedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openLoginModal("google");
  };

  return (
    <article
      onClick={isLocked ? handleLockedClick : undefined}
      className={`group relative overflow-hidden rounded-2xl bg-white border border-[#E5E4E0] shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#7657FF]/50 hover:shadow-[0_16px_36px_rgba(118,87,255,0.12)] flex flex-col justify-between ${
        isLocked ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Top hairline ambient glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7657FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Main Card Content (Blurred if not one of the 2 public services) */}
      <div className="relative">
        <div
          className={`transition-all duration-300 ${
            isLocked ? "filter blur-[5px] opacity-40 select-none pointer-events-none" : ""
          }`}
        >
          {/* Service Image with smooth zoom */}
          <div className="relative h-56 w-full overflow-hidden bg-[#17181C]">
            {isExternal ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={service.imageUrl}
                alt={service.serviceName}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <Image
                src={service.imageUrl}
                alt={service.serviceName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            )}

            {/* Module Pill */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#111318]/85 text-[#D9FF70] backdrop-blur-md border border-white/10 shadow-sm">
                {service.moduleName}
              </span>
              {isPublic && (
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 backdrop-blur-md border border-emerald-500/20 shadow-sm">
                  Open Access
                </span>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#7657FF] font-semibold">
                {service.moduleName}
              </p>
            </div>

            <h3 className="text-xl font-bold font-display text-[#17181C] tracking-tight group-hover:text-[#7657FF] transition-colors leading-snug">
              {service.serviceName}
            </h3>
          </div>
        </div>

        {/* Prominent Overlay for Blurred Services */}
        {isLocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-white/60 backdrop-blur-[2px] transition-all">
            <div className="w-12 h-12 rounded-full bg-[#111318] border border-[#7657FF]/40 text-[#D9FF70] flex items-center justify-center shadow-lg mb-3">
              <Lock className="h-5 w-5" />
            </div>

            <h4 className="font-display font-bold text-lg text-[#17181C] mb-1 leading-snug">
              To unlock more features sign in
            </h4>

            <p className="text-xs text-gray-600 font-body mb-4 max-w-[220px]">
              Access full deliverables, execution schedules, and metrics.
            </p>

            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7657FF] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md hover:bg-[#6242EC] transition-all">
              <span>To unlock more features sign in</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="px-6 pb-6 pt-0 relative z-30">
        {isLocked ? (
          <button
            type="button"
            onClick={handleLockedClick}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#111318] hover:bg-[#7657FF] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:bg-[#7657FF]"
          >
            <Lock className="h-3.5 w-3.5 text-[#D9FF70]" />
            <span>To unlock more features sign in</span>
          </button>
        ) : (
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#17181C] group-hover:text-[#7657FF] transition-colors py-2"
          >
            <span>Request consultation</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default ServiceCard;
