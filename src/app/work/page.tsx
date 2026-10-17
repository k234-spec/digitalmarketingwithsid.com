import React from "react";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";
import { constructMetadata } from "@/lib/seo";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Case Studies & Work Portfolio",
  description:
    "Explore our portfolio of conversion-driven websites, server-side paid performance campaigns, and commercial SEO architectures.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#F7F6F2]">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-6 mb-16">
          <Reveal>
            <div className="eyebrow bg-[#7657FF]/10 px-3.5 py-1.5 rounded-full border border-[#7657FF]/20">
              <Sparkles className="h-3.5 w-3.5 text-[#7657FF]" />
              <span>COMMERCIAL CASE STUDIES & BENCHMARKS</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#17181C] tracking-tight leading-[1.1]">
              Measurable Outcomes. Proven Systems.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-lg sm:text-xl text-[#686B73] leading-relaxed">
              We benchmark every engagement against real commercial objectives: inquiry volume, sub-second latency, and verified return on ad spend.
            </p>
          </Reveal>
        </div>

        {/* Filterable Project Grid */}
        <ProjectGrid projects={projectsData} />
      </Container>
    </div>
  );
}
