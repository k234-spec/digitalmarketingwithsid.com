import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { constructMetadata } from "@/lib/seo";
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return constructMetadata({ title: "Project Not Found" });
  }

  return constructMetadata({
    title: `${project.title} — Case Study`,
    description: project.challenge,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#F7F6F2]">
      {/* Hero Header */}
      <section className="pb-16 border-b border-[#E5E4E0]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#686B73] hover:text-[#17181C] transition-colors mr-2"
                >
                  <ArrowLeft className="h-3 w-3" /> Back to Work
                </Link>
                <span className="font-mono text-xs font-semibold px-3 py-1 rounded bg-[#7657FF]/10 text-[#7657FF]">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-[#686B73] flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {project.timeframe}
                </span>
                {project.isDemonstrationProject && (
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200 text-[#17181C] font-semibold">
                    Demonstration Case Study
                  </span>
                )}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#17181C] tracking-tight leading-[1.1]">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-[#686B73] pt-2">
                <div>
                  <span className="text-gray-400 block text-xs">CLIENT TYPE</span>
                  <span className="text-[#17181C] font-semibold">{project.clientType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">INDUSTRY</span>
                  <span className="text-[#17181C] font-semibold">{project.industry}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">ENGAGEMENT</span>
                  <span className="text-[#17181C] font-semibold">{project.timeframe}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Verified Outcomes Banner */}
      <section className="py-16 bg-[#F7F6F2] border-b border-[#E5E4E0]">
        <Container>
          <div className="mb-8">
            <span className="eyebrow">VERIFIED PERFORMANCE IMPACT</span>
            <h2 className="section-heading text-2xl sm:text-3xl mt-1">
              Measurable Results & Benchmarks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.outcomes.map((metric, idx) => (
              <Reveal key={metric.label} delay={idx * 100}>
                <div className="rounded-2xl bg-white border border-[#E5E4E0] p-6 space-y-2 shadow-sm">
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#7657FF]">
                    <Counter value={metric.value} />
                  </div>
                  <div className="font-display font-bold text-base text-[#17181C]">
                    {metric.label}
                  </div>
                  <p className="text-xs text-[#686B73] font-mono leading-relaxed">
                    {metric.context}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Breakdown: Challenge, Objectives, Strategy, Implementation */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge */}
              <Reveal>
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-2xl text-[#17181C]">
                    The Business Challenge
                  </h3>
                  <p className="font-body text-[#686B73] text-base sm:text-lg leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              </Reveal>

              {/* Objectives */}
              <Reveal delay={100}>
                <div className="rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-8 space-y-4">
                  <h3 className="font-display font-bold text-xl text-[#17181C]">
                    Key Engagement Objectives
                  </h3>
                  <div className="space-y-3">
                    {project.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-[#17181C]">
                        <CheckCircle2 className="h-4 w-4 text-[#7657FF] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Strategy */}
              <Reveal delay={200}>
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-2xl text-[#17181C]">
                    Strategic Approach
                  </h3>
                  <p className="font-body text-[#686B73] text-base sm:text-lg leading-relaxed">
                    {project.strategy}
                  </p>
                </div>
              </Reveal>

              {/* Execution Summary */}
              <Reveal delay={300}>
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-2xl text-[#17181C]">
                    Execution & Implementation Summary
                  </h3>
                  <ul className="space-y-3">
                    {project.implementationSummary.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#686B73]">
                        <span className="font-mono text-xs font-bold text-[#7657FF] shrink-0 mt-0.5">
                          0{i + 1}.
                        </span>
                        <span className="leading-relaxed text-[#17181C]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              {/* Services Box */}
              <div className="rounded-2xl bg-white border border-[#E5E4E0] p-6 space-y-4 shadow-sm">
                <span className="font-mono text-xs uppercase tracking-wider text-[#686B73] font-semibold block">
                  Delivered Disciplines
                </span>
                <div className="space-y-2">
                  {project.servicesDelivered.map((svc) => (
                    <div
                      key={svc}
                      className="text-xs bg-[#F7F6F2] border border-[#E5E4E0] px-3 py-2 rounded-lg text-[#17181C] font-medium"
                    >
                      {svc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Box */}
              <div className="rounded-2xl bg-white border border-[#E5E4E0] p-6 space-y-4 shadow-sm">
                <span className="font-mono text-xs uppercase tracking-wider text-[#686B73] font-semibold block">
                  Technology & Platforms
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono bg-gray-100 px-2.5 py-1 rounded text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sidebar Consultation Card */}
              <div className="rounded-2xl bg-white border border-[#E5E4E0] text-[#17181C] p-6 space-y-4 shadow-sm">
                <h4 className="font-display font-bold text-lg text-[#17181C]">
                  Face Similar Bottlenecks?
                </h4>
                <p className="text-xs text-[#686B73] leading-relaxed">
                  Book a free strategic audit. We will review your digital footprint and identify conversion opportunities.
                </p>
                <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                  Request a Consultation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-[#F7F6F2] border-t border-[#E5E4E0]">
          <Container>
            <div className="flex items-center justify-between mb-10">
              <h3 className="section-heading text-2xl sm:text-3xl">Related Case Studies</h3>
              <Link
                href="/work"
                className="font-mono text-xs font-semibold text-[#7657FF] hover:underline flex items-center gap-1"
              >
                <span>View all work</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <div
                  key={p.slug}
                  className="rounded-2xl bg-white border border-[#E5E4E0] p-6 sm:p-8 space-y-4 hover:border-[#7657FF]/40 transition-colors shadow-sm"
                >
                  <span className="font-mono text-xs font-semibold text-[#7657FF]">{p.category}</span>
                  <h4 className="font-display font-bold text-xl text-[#17181C]">
                    <Link href={`/work/${p.slug}`} className="hover:text-[#7657FF] transition-colors">
                      {p.title}
                    </Link>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#686B73] line-clamp-2">{p.challenge}</p>
                  <Link
                    href={`/work/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#7657FF]"
                  >
                    <span>Read Study</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
