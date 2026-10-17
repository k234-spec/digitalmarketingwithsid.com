import React from "react";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";
import { Compass, Lightbulb, Rocket, LineChart } from "lucide-react";

export const Process: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Discover",
      icon: <Compass className="h-6 w-6 text-[#7657FF]" />,
      summary:
        "Understand the business model, target audience personas, current digital presence, objectives, and technical constraints.",
      deliverables: ["Diagnostic Audit", "Competitor Matrix", "Constraint Analysis"],
    },
    {
      number: "02",
      title: "Strategize",
      icon: <Lightbulb className="h-6 w-6 text-[#7657FF]" />,
      summary:
        "Define commercial positioning, channel priorities, technical architecture, tracking model, and an iterative implementation roadmap.",
      deliverables: ["Channel Selection", "Funnel Architecture", "KPI Targets"],
    },
    {
      number: "03",
      title: "Build & Launch",
      icon: <Rocket className="h-6 w-6 text-[#7657FF]" />,
      summary:
        "Execute high-performance website code, brand creative assets, server-side tracking infrastructure, and calibrated ad campaigns.",
      deliverables: ["Production Code", "Creative Testing Sprints", "GTM / CAPI Setup"],
    },
    {
      number: "04",
      title: "Measure & Grow",
      icon: <LineChart className="h-6 w-6 text-[#7657FF]" />,
      summary:
        "Review verified pipeline telemetry, eliminate drop-off bottlenecks, run weekly creative experiments, and scale winning channels.",
      deliverables: ["Live Looker Dashboards", "Conversion Rate Optimization", "CAC Efficiency"],
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F6F2]" id="process">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <Reveal>
            <div className="eyebrow">HOW WE WORK</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="section-heading">
              A Clear Process. Work That Moves You Forward.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-description">
              We eliminate guesswork with a systematic, 4-stage delivery framework designed for accountability, velocity, and compounding returns.
            </p>
          </Reveal>
        </div>

        {/* 4 Connected Steps Grid with Horizontal Connector line on Desktop */}
        <div className="relative">
          {/* Connector Line on Desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-[2px] bg-gradient-to-r from-[#7657FF] via-[#B8A7FF] to-[#D9FF70] -z-0 opacity-40" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 120} className="relative z-10">
                <div className="h-full rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-8 flex flex-col justify-between hover:border-[#7657FF]/40 hover:shadow-md transition-all duration-300">
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#F7F6F2] border border-[#E5E4E0] flex items-center justify-center font-display font-bold text-sm text-[#17181C] shadow-sm">
                        {step.number}
                      </div>
                      <div className="p-2 rounded-xl bg-[#7657FF]/10">
                        {step.icon}
                      </div>
                    </div>

                    {/* Step Title & Summary */}
                    <h3 className="font-display text-xl font-bold text-[#17181C] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#686B73] leading-relaxed mb-6">
                      {step.summary}
                    </p>
                  </div>

                  {/* Micro Deliverables */}
                  <div className="pt-4 border-t border-[#F7F6F2] space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7657FF] font-semibold block mb-1">
                      Key Outputs
                    </span>
                    {step.deliverables.map((d) => (
                      <div
                        key={d}
                        className="text-xs font-mono text-[#17181C] flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#7657FF]" />
                        <span>{d}</span>
                      </div>
                    ))}
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
