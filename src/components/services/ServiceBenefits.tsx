import React from "react";
import { ServiceDetail } from "@/data/services";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";
import { AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";

interface ServiceBenefitsProps {
  service: ServiceDetail;
}

export const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({ service }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F6F2] border-b border-[#E5E4E0]">
      <Container>
        {/* Part 1: Problem & Business Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-20 border-b border-[#E5E4E0]">
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <div className="eyebrow text-amber-600">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>BUSINESS CONTEXT & FRICTION</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="section-heading text-3xl sm:text-4xl">
                {service.problemStatement.heading}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="section-description">
                {service.problemStatement.description}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <div className="rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-8 space-y-4 shadow-sm">
                <span className="font-mono text-xs uppercase tracking-wider text-[#17181C] font-semibold block">
                  Common Obstacles We Resolve
                </span>
                <div className="space-y-3">
                  {service.problemStatement.painPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-[#17181C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Part 2: Outcomes and Benefits */}
        <div className="pt-20">
          <div className="max-w-2xl mb-12 space-y-3">
            <Reveal>
              <div className="eyebrow">MEASURABLE VALUE</div>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="section-heading text-3xl sm:text-4xl">
                Commercial Outcomes & Strategic Advantages
              </h3>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((b, idx) => (
              <Reveal key={b.title} delay={idx * 80}>
                <div className="h-full rounded-2xl bg-white border border-[#E5E4E0] p-6 flex flex-col justify-between hover:border-[#7657FF]/40 transition-colors shadow-sm">
                  <div className="space-y-3">
                    {b.stat && (
                      <span className="inline-block font-mono text-xs font-bold text-[#7657FF] bg-[#7657FF]/10 px-2.5 py-1 rounded">
                        {b.stat}
                      </span>
                    )}
                    <h4 className="font-display font-bold text-lg text-[#17181C]">
                      {b.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#686B73] leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
