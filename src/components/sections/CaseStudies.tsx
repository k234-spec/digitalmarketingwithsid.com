import React from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { ArrowRight, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export const CaseStudies: React.FC = () => {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#F7F6F2] border-y border-[#E5E4E0]" id="work">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <Reveal>
              <div className="eyebrow">SELECTED WORK</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="section-heading">Good Strategy. Better Execution.</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="section-description">
                Explore real and structured demonstration projects showcasing how we combine engineering performance, high-craft brand design, and full-funnel marketing.
              </p>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <Button href="/work" variant="secondary" size="md" showArrow>
              View Full Portfolio
            </Button>
          </Reveal>
        </div>

        {/* 3 Featured Case Studies Cards */}
        <div className="space-y-12">
          {featuredProjects.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 100}>
              <article className="group rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-10 transition-all duration-300 hover:border-[#7657FF]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Details & Strategy */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Meta Bar */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#7657FF]/10 text-[#7657FF]">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-[#686B73] flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {project.timeframe}
                      </span>
                      {project.isDemonstrationProject && (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200 text-[#17181C] font-semibold">
                          Demonstration Project
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#17181C] group-hover:text-[#7657FF] transition-colors">
                      <Link href={`/work/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    {/* Client & Industry */}
                    <div className="text-xs font-mono text-[#686B73]">
                      <span>{project.clientType}</span> · <span>{project.industry}</span>
                    </div>

                    {/* Challenge & Strategy Brief */}
                    <div className="space-y-3 text-sm text-[#686B73] leading-relaxed">
                      <p>
                        <strong className="text-[#17181C] font-display">Challenge: </strong>
                        {project.challenge}
                      </p>
                      <p>
                        <strong className="text-[#17181C] font-display">Strategy: </strong>
                        {project.strategy}
                      </p>
                    </div>

                    {/* Services Delivered Tags */}
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[#686B73] mb-2 font-semibold">
                        Services Delivered
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.servicesDelivered.map((svc) => (
                          <span
                            key={svc}
                            className="text-xs bg-[#F7F6F2] border border-[#E5E4E0] px-3 py-1 rounded-lg text-[#17181C]"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Link */}
                    <div className="pt-2">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#7657FF] group-hover:text-[#6242EC] transition-colors"
                      >
                        <span>Read full case study breakdown</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Outcomes & Impact Metrics */}
                  <div className="lg:col-span-5 bg-[#F7F6F2] rounded-2xl border border-[#E5E4E0] p-6 sm:p-8 space-y-6">
                    <div className="border-b border-[#E5E4E0] pb-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#686B73] font-semibold">
                        Verified Outcomes & Objectives
                      </span>
                    </div>

                    <div className="space-y-5">
                      {project.outcomes.map((metric) => (
                        <div key={metric.label} className="space-y-1">
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs font-display font-medium text-[#17181C]">
                              {metric.label}
                            </span>
                            <span className="font-display text-2xl font-bold text-[#7657FF]">
                              <Counter value={metric.value} />
                            </span>
                          </div>
                          <p className="text-xs text-[#686B73] font-mono leading-normal">
                            {metric.context}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#E5E4E0] flex items-center justify-between text-[11px] font-mono text-gray-400">
                      <span>Stack: {project.techStack.join(" · ")}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
