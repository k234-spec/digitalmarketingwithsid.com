import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { ServiceDeliverables } from "@/components/services/ServiceDeliverables";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { Accordion } from "@/ui/Accordion";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { constructMetadata, generateServiceSchema, generateFaqSchema } from "@/lib/seo";
import { ArrowRight, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return constructMetadata({ title: "Service Not Found" });
  }

  return constructMetadata({
    title: `${service.title} Services`,
    description: service.summary,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const relatedProject =
    projectsData.find((p) => p.slug === service.relatedCaseStudySlug) ||
    projectsData[0];

  const serviceSchema = generateServiceSchema({
    title: service.title,
    summary: service.summary,
    slug: service.slug,
  });

  const faqSchema = generateFaqSchema(service.faqs);

  return (
    <>
      {/* Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Service Hero */}
      <ServiceHero service={service} />

      {/* 2 & 3. Problem Statement & Benefits */}
      <ServiceBenefits service={service} />

      {/* 4. Scope and Deliverables */}
      <ServiceDeliverables service={service} />

      {/* 5. Process and Implementation */}
      <ServiceProcess service={service} />

      {/* 6. Related Case Study or Demonstration Project */}
      {relatedProject && (
        <section className="py-20 sm:py-28 bg-[#F7F6F2] border-b border-[#E5E4E0]">
          <Container>
            <div className="max-w-2xl mb-12 space-y-3">
              <Reveal>
                <div className="eyebrow">REPRESENTATIVE WORK</div>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="section-heading text-3xl sm:text-4xl">
                  Related Case Study
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="section-description">
                  Explore how we applied these exact service capabilities to eliminate bottlenecks for clients.
                </p>
              </Reveal>
            </div>

            <Reveal>
              <div className="rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-10 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#7657FF]/10 text-[#7657FF]">
                        {relatedProject.category}
                      </span>
                      <span className="font-mono text-xs text-[#686B73]">
                        {relatedProject.timeframe}
                      </span>
                      {relatedProject.isDemonstrationProject && (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200 text-[#17181C] font-semibold">
                          Demonstration Project
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#17181C]">
                      {relatedProject.title}
                    </h3>
                    <p className="text-sm text-[#686B73] leading-relaxed">
                      {relatedProject.challenge}
                    </p>
                    <div className="pt-2">
                      <Button
                        href={`/work/${relatedProject.slug}`}
                        variant="secondary"
                        size="md"
                        showArrow
                      >
                        Explore Complete Project Breakdown
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#F7F6F2] rounded-2xl p-6 border border-[#E5E4E0] space-y-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#17181C] font-semibold block">
                      Target Key Metrics
                    </span>
                    <div className="space-y-3">
                      {relatedProject.outcomes.map((o) => (
                        <div key={o.label} className="flex items-baseline justify-between border-b border-[#E5E4E0] pb-2 last:border-b-0">
                          <span className="text-xs text-[#686B73]">{o.label}</span>
                          <span className="font-display font-bold text-lg text-[#7657FF]">{o.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* 7. Frequently Asked Questions */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#F7F6F2] border-b border-[#E5E4E0]">
          <Container>
            <div className="max-w-2xl mb-12 space-y-3">
              <Reveal>
                <div className="eyebrow">COMMON INQUIRIES</div>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="section-heading text-3xl sm:text-4xl">
                  {service.title} FAQs
                </h2>
              </Reveal>
            </div>

            <Reveal>
              <div className="max-w-3xl">
                <Accordion
                  items={service.faqs.map((f, i) => ({
                    id: `service-faq-${i}`,
                    question: f.question,
                    answer: f.answer,
                  }))}
                />
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* 8. Consultation CTA */}
      <section className="py-20 sm:py-28 bg-[#F7F6F2] text-[#17181C] border-t border-[#E5E4E0]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Reveal>
              <div className="eyebrow text-[#7657FF]">NEXT STEPS</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17181C]">
                Ready to Upgrade Your {service.title}?
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body text-[#686B73] text-base sm:text-lg leading-relaxed">
                Book a diagnostic consultation with our growth architects. We will analyze your current performance benchmarks and outline a high-impact roadmap.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg" showArrow>
                  Request a Free Consultation
                </Button>
                <Button href="/work" variant="secondary" size="lg">
                  Explore More Case Studies
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
