import React from "react";
import { ServiceDetail } from "@/data/services";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface ServiceHeroProps {
  service: ServiceDetail;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({ service }) => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-[#F7F6F2] border-b border-[#E5E4E0] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#7657FF]/15 via-[#B8A7FF]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <Container className="relative z-10">
        <div className="max-w-4xl space-y-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#7657FF] bg-[#7657FF]/10 px-3 py-1 rounded-md">
                SERVICE {service.code}
              </span>
              <div className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{service.eyebrow}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#17181C] tracking-tight leading-[1.1]">
              {service.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="font-body text-xl sm:text-2xl text-[#17181C] font-medium leading-snug">
              {service.tagline}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="font-body text-[#686B73] text-base sm:text-lg leading-relaxed max-w-2xl">
              {service.summary}
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button href="/contact" variant="primary" size="lg" showArrow>
                Discuss This Service
              </Button>
              <Button href="#deliverables" variant="secondary" size="lg">
                View Detailed Scope
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
