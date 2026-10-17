import React from "react";
import { faqsData } from "@/data/faqs";
import { Container } from "@/ui/Container";
import { Accordion } from "@/ui/Accordion";
import { Reveal } from "@/motion/Reveal";
import { generateFaqSchema } from "@/lib/seo";

export const FAQ: React.FC = () => {
  const faqSchema = generateFaqSchema(faqsData);

  return (
    <section className="py-24 sm:py-32 bg-[#F7F6F2]" id="faq">
      {/* Inject FAQ structured data schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <Reveal>
              <div className="eyebrow">COMMON QUESTIONS</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="section-heading">Before We Get Started.</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="section-description">
                Transparent answers about our working process, technology stack, timeline commitments, and measurement methodologies.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="p-6 rounded-2xl bg-white border border-[#E5E4E0] space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#7657FF] font-semibold block">
                  Have a specific question?
                </span>
                <p className="text-sm text-[#686B73]">
                  Schedule an initial diagnostic call with our team. We respond to all inquiries within 24 business hours.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Accessible Accordion with all 10 items */}
          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <Accordion items={faqsData} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
