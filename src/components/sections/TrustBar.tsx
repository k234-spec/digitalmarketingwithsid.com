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

  // Repeat items to ensure smooth continuous marquee without gaps on large viewports
  const repeatedIndustries = [
    ...industriesServed,
    ...industriesServed,
    ...industriesServed,
  ];

  const renderTrack = (isDuplicate = false) => (
    <div
      aria-hidden={isDuplicate ? "true" : undefined}
      className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3 sm:pr-4 animate-marquee"
    >
      {repeatedIndustries.map((industry, index) => (
        <div
          key={`${industry.name}-${index}-${isDuplicate ? "dup" : "orig"}`}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-[#E5E4E0] hover:border-[#7657FF]/50 hover:shadow-sm transition-all duration-200 shrink-0 select-none cursor-default"
          title={industry.focus}
        >
          {industryIcons[industry.name] || (
            <Sparkles className="h-4 w-4 text-[#7657FF]" />
          )}
          <span className="font-display text-xs sm:text-sm font-semibold text-[#17181C] whitespace-nowrap">
            {industry.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-10 sm:py-12 border-y border-[#E5E4E0] bg-[#F7F6F2] overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Eyebrow Label */}
          <div className="shrink-0 text-center lg:text-left lg:pr-8 lg:border-r lg:border-[#E5E4E0]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#686B73] font-semibold">
              BUILT FOR AMBITIOUS BUSINESSES
            </span>
            <p className="text-xs text-[#17181C] font-display font-medium mt-0.5">
              Sector Expertise & Growth Frameworks
            </p>
          </div>

          {/* Marquee Container with edge fade masks and pause-on-hover */}
          <div
            className="marquee-group flex-1 w-full min-w-0 overflow-hidden relative"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)",
            }}
          >
            <div className="flex w-max">
              {renderTrack(false)}
              {renderTrack(true)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
