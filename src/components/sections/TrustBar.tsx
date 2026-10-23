"use client";

import React from "react";
import { industriesServed } from "@/data/site";
import { Container } from "@/ui/Container";
import { Factory, ShoppingBag, Briefcase, Cpu, Sparkles } from "lucide-react";

export const TrustBar: React.FC = () => {
  const industryIcons: Record<string, React.ReactNode> = {
    "Manufacturing": <Factory className="h-4 w-4 text-[#7657FF]" />,
    "E-commerce": <ShoppingBag className="h-4 w-4 text-[#7657FF]" />,
    "Professional Services": <Briefcase className="h-4 w-4 text-[#7657FF]" />,
    "Technology & SaaS": <Cpu className="h-4 w-4 text-[#7657FF]" />,
    "Consumer Brands": <Sparkles className="h-4 w-4 text-[#7657FF]" />,
  };

  // Base list of 5 industries repeated 3 times = 15 items per track
  const trackItems = [
    ...industriesServed,
    ...industriesServed,
    ...industriesServed,
  ];

  return (
    <section
      className="py-10 sm:py-12 border-y border-[#E5E4E0] bg-[#F7F6F2] overflow-hidden"
      aria-label="Industries served"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Eyebrow Label */}
          <div className="shrink-0 text-center lg:text-left lg:pr-8 lg:border-r lg:border-[#E5E4E0] select-none">
            <span className="font-mono text-xs uppercase tracking-widest text-[#686B73] font-semibold">
              BUILT FOR AMBITIOUS BUSINESSES
            </span>
            <p className="text-xs text-[#17181C] font-display font-medium mt-0.5">
              Sector Expertise & Growth Frameworks
            </p>
          </div>

          {/* Continuous Infinite Rotating Marquee */}
          <div className="marquee-container flex-1 w-full min-w-0 overflow-hidden relative">
            <div className="marquee-track flex items-center">
              {/* Group 1 */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0 pr-3 sm:pr-4">
                {trackItems.map((industry, index) => (
                  <div
                    key={`orig-${industry.name}-${index}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-[#E5E4E0] hover:border-[#7657FF]/60 hover:shadow-sm transition-all duration-200 shrink-0 select-none cursor-default group"
                    title={industry.focus}
                  >
                    {industryIcons[industry.name] || (
                      <Sparkles className="h-4 w-4 text-[#7657FF]" />
                    )}
                    <span className="font-display text-xs sm:text-sm font-semibold text-[#17181C] group-hover:text-[#7657FF] transition-colors whitespace-nowrap">
                      {industry.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Group 2 (Exact Duplicate for Seamless -50% Loop) */}
              <div
                className="flex items-center gap-3 sm:gap-4 shrink-0 pr-3 sm:pr-4"
                aria-hidden="true"
              >
                {trackItems.map((industry, index) => (
                  <div
                    key={`dup-${industry.name}-${index}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-[#E5E4E0] hover:border-[#7657FF]/60 hover:shadow-sm transition-all duration-200 shrink-0 select-none cursor-default group"
                    title={industry.focus}
                  >
                    {industryIcons[industry.name] || (
                      <Sparkles className="h-4 w-4 text-[#7657FF]" />
                    )}
                    <span className="font-display text-xs sm:text-sm font-semibold text-[#17181C] group-hover:text-[#7657FF] transition-colors whitespace-nowrap">
                      {industry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
