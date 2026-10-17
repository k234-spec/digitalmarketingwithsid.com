import React from "react";
import { ServiceDetail } from "@/data/services";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";
import { CheckCircle2 } from "lucide-react";

interface ServiceDeliverablesProps {
  service: ServiceDetail;
}

export const ServiceDeliverables: React.FC<ServiceDeliverablesProps> = ({ service }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F6F2] border-b border-[#E5E4E0]" id="deliverables">
      <Container>
        <div className="max-w-2xl mb-14 space-y-3">
          <Reveal>
            <div className="eyebrow">WHAT WE DELIVER</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="section-heading text-3xl sm:text-4xl">
              Scope & Concrete Deliverables
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-description">
              Clear deliverables without ambiguous buzzwords. Every item represents an accessible asset or verified technical output.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {service.deliverables.map((deliv, idx) => (
            <Reveal key={deliv.category} delay={idx * 100}>
              <div className="h-full rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="border-b border-[#E5E4E0] pb-4">
                  <span className="font-mono text-xs font-bold text-[#7657FF] block mb-1">
                    PHASE 0{idx + 1}
                  </span>
                  <h3 className="font-display font-bold text-xl text-[#17181C]">
                    {deliv.category}
                  </h3>
                </div>

                <ul className="space-y-3.5">
                  {deliv.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17181C]">
                      <CheckCircle2 className="h-4 w-4 text-[#7657FF] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
