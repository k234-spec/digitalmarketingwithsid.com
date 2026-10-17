import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceRecord } from "@/lib/db/types";

interface ServiceCardProps {
  service: Pick<
    ServiceRecord,
    "id" | "serviceName" | "moduleName" | "imageUrl"
  >;
  className?: string;
}

export function ServiceCard({ service, className = "" }: ServiceCardProps) {
  const isExternal =
    service.imageUrl.startsWith("http://") ||
    service.imageUrl.startsWith("https://");

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl bg-white border border-[#E5E4E0] shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#7657FF]/50 hover:shadow-[0_16px_36px_rgba(118,87,255,0.12)] flex flex-col justify-between ${className}`}
    >
      {/* Top hairline ambient glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#7657FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      <div>
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

          {/* Module Pill Overlay */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[#111318]/85 text-[#D9FF70] backdrop-blur-md border border-white/10 shadow-sm">
              {service.moduleName}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs font-mono uppercase tracking-wider text-[#7657FF] font-semibold mb-1.5">
            {service.moduleName}
          </p>

          <h3 className="text-xl font-bold font-display text-[#17181C] tracking-tight group-hover:text-[#7657FF] transition-colors leading-snug">
            {service.serviceName}
          </h3>
        </div>
      </div>

      {/* Card Action footer */}
      <div className="px-6 pb-6 pt-0">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#17181C] group-hover:text-[#7657FF] transition-colors"
        >
          <span>Request consultation</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;
