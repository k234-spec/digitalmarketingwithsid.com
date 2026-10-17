import React from "react";
import { ServiceDetail } from "@/data/services";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";

interface ServiceProcessProps {
  service: ServiceDetail;
}

export const ServiceProcess: React.FC<ServiceProcessProps> = ({ service }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F6F2] border-b border-[#E5E4E0]">
      <Container>
        <div className="max-w-2xl mb-14 space-y-3">
          <Reveal>
            <div className="eyebrow">IMPLEMENTATION CADENCE</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="section-heading text-3xl sm:text-4xl">
              Process & Timeline Milestones
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-description">
              A structured execution sprint with weekly milestone check-ins and direct engineering collaboration.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step, idx) => (
            <Reveal key={step.step} delay={idx * 100}>
              <div className="h-full rounded-2xl bg-white border border-[#E5E4E0] p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#7657FF] bg-[#7657FF]/10 px-2 py-0.5 rounded">
                    STEP {step.step}
                  </span>
                  <span className="font-mono text-xs text-[#686B73]">
                    {step.duration}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-[#17181C]">
                  {step.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#686B73] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
