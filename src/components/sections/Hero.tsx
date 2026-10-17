"use client";

import React from "react";
import { Button } from "@/ui/Button";
import { Container } from "@/ui/Container";
import { HeroScene } from "@/three/HeroScene";
import { Reveal } from "@/motion/Reveal";
import { trackEvent } from "@/lib/analytics";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";

export const Hero: React.FC = () => {
  const handlePrimaryCta = () => {
    trackEvent("consultation_cta_click", { location: "hero_primary" });
  };

  const handleSecondaryCta = () => {
    trackEvent("case_study_open", { location: "hero_secondary" });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#7657FF]/10 via-[#B8A7FF]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & Conversion Flow */}
          <div className="lg:col-span-7 space-y-7">
            {/* Eyebrow */}
            <Reveal delay={150}>
              <div className="eyebrow bg-[#7657FF]/10 border border-[#7657FF]/20 px-3.5 py-1.5 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-[#7657FF]" />
                <span>DIGITAL STRATEGY · CREATIVE · PERFORMANCE</span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={300}>
              <h1 className="font-display font-extrabold tracking-tight text-[#17181C] text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.08]">
                Turn Your Digital Presence Into{" "}
                <span className="text-gradient">Business Growth.</span>
              </h1>
            </Reveal>

            {/* Supporting Copy */}
            <Reveal delay={450}>
              <p className="font-body text-[#686B73] text-lg sm:text-xl leading-relaxed max-w-xl">
                We build high-performing websites, compelling brands, and data-driven marketing systems that help ambitious businesses attract the right audience and convert attention into revenue.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={600}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={handlePrimaryCta}
                  className="shadow-[0_8px_24px_rgba(118,87,255,0.3)] hover:shadow-[0_12px_32px_rgba(118,87,255,0.4)]"
                >
                  Get a Free Consultation
                </Button>
                <Button
                  href="/work"
                  variant="secondary"
                  size="lg"
                  onClick={handleSecondaryCta}
                >
                  Explore Our Work
                </Button>
              </div>
            </Reveal>

            {/* Micro Credibility Badges */}
            <Reveal delay={750}>
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-[#686B73] border-t border-[#E5E4E0]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7657FF]" />
                  <span>Next.js 15 & React 19 Core</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D9FF70]" />
                  <span>Sub-1.2s Core Web Vitals</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#17181C]" />
                  <span>Attribution & Meta CAPI</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Dimensional 3D Experience or Code Dashboard */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <Reveal delay={400} direction="none" className="w-full">
              <HeroScene />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
