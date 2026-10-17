"use client";

import React, { useState } from "react";
import { testimonialsData } from "@/data/testimonials";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? testimonialsData.length - 1 : prevIdx - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === testimonialsData.length - 1 ? 0 : prevIdx + 1
    );
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F6F2] border-b border-[#E5E4E0]" id="testimonials">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <Reveal>
              <div className="eyebrow">CLIENT EXPERIENCES</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="section-heading">Partnership Built on Progress.</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="section-description">
                Hear from leaders who partnered with us to modernize their digital presence, eliminate acquisition waste, and build sustainable inbound pipelines.
              </p>
            </Reveal>
          </div>

          {/* Accessible Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#E5E4E0] bg-white flex items-center justify-center hover:bg-[#F7F6F2] hover:border-[#7657FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657FF] cursor-pointer shadow-sm"
              aria-label="Previous client testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-[#17181C]" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#E5E4E0] bg-white flex items-center justify-center hover:bg-[#F7F6F2] hover:border-[#7657FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657FF] cursor-pointer shadow-sm"
              aria-label="Next client testimonial"
            >
              <ChevronRight className="h-5 w-5 text-[#17181C]" />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <Reveal>
          <div className="relative rounded-3xl bg-white border border-[#E5E4E0] p-8 sm:p-12 lg:p-16 shadow-sm">
            <Quote className="h-12 w-12 text-[#7657FF]/20 mb-6" />

            <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-[#17181C] leading-snug sm:leading-relaxed mb-8">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#E5E4E0]">
              <div>
                <div className="font-display font-bold text-base sm:text-lg text-[#17181C]">
                  {current.name}
                </div>
                <div className="text-xs sm:text-sm font-mono text-[#686B73]">
                  {current.role} · {current.company} ({current.industry})
                </div>
              </div>

              {current.isDemonstrationSample && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F6F2] border border-[#E5E4E0] text-[11px] font-mono text-[#686B73]">
                  <span>Demonstration Feedback Benchmark</span>
                </div>
              )}
            </div>

            {/* Pagination dots indicator */}
            <div className="flex items-center gap-2 mt-8 pt-4">
              {testimonialsData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer",
                    currentIndex === dotIdx
                      ? "w-8 bg-[#7657FF]"
                      : "w-2 bg-[#E5E4E0] hover:bg-[#7657FF]/50"
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
