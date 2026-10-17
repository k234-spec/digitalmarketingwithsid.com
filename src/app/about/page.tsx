import React from "react";
import type { Metadata } from "next";
import { brand, agencyValues, industriesServed } from "@/data/site";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { constructMetadata } from "@/lib/seo";
import { Sparkles, Target, Zap, Shield, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "About Our Studio & Growth Philosophy",
  description:
    "We combine strategic thinking, modern web engineering, editorial creative design, and data-driven performance to help ambitious businesses scale.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#F7F6F2]">
      {/* Header */}
      <section className="pb-20 border-b border-[#E5E4E0]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <Reveal>
              <div className="eyebrow bg-[#7657FF]/10 px-3.5 py-1.5 rounded-full border border-[#7657FF]/20">
                <Sparkles className="h-3.5 w-3.5 text-[#7657FF]" />
                <span>ABOUT {brand.name}</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#17181C] tracking-tight leading-[1.1]">
                Built Around Your Business Goals.
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-body text-xl sm:text-2xl text-[#17181C] font-medium leading-relaxed max-w-3xl">
                We are a digital growth studio engineered for companies that value commercial clarity, sub-second performance, and verified business outcomes over agency fluff.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="font-body text-[#686B73] text-base sm:text-lg leading-relaxed max-w-2xl">
                Founded with a deliberate focus on combining deep technical web engineering with disciplined paid acquisition and high-craft brand design, our mission is to turn your digital presence into a dependable revenue engine.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-28 bg-[#F7F6F2] border-b border-[#E5E4E0]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Reveal>
                <div className="eyebrow">OUR PHILOSOPHY</div>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="section-heading text-3xl sm:text-4xl">
                  Strategy First. Craft Always. Measured Continuously.
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="section-description">
                  Traditional agencies operate in isolated departments: designers create mockups without considering conversion flow, developers build websites with heavy page builders, and media buyers launch ads to disconnected landing pages.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <Reveal delay={150}>
                <div className="rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-8 space-y-4 shadow-sm">
                  <h3 className="font-display font-bold text-xl text-[#17181C]">
                    The Integrated Growth Principle
                  </h3>
                  <p className="text-sm sm:text-base text-[#686B73] leading-relaxed">
                    We bridge the gap. We treat your brand identity, website code, search engine footprint, and advertising spend as one unified machine. When every piece works in concert, your cost to acquire qualified customers drops and your market authority compounds.
                  </p>
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#17181C]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#7657FF]" />
                      <span>Zero Page-Builder Bloat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#7657FF]" />
                      <span>Server-Side Ad Attribution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#7657FF]" />
                      <span>Editorial Design Craft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#7657FF]" />
                      <span>100% Client Ownership of Code</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Values & Standards */}
      <section className="py-20 sm:py-28 bg-[#F7F6F2] border-b border-[#E5E4E0]">
        <Container>
          <div className="max-w-2xl mb-14 space-y-3">
            <Reveal>
              <div className="eyebrow">OUR CORE PRINCIPLES</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="section-heading text-3xl sm:text-4xl">
                Values That Guide Every Sprint
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="section-description">
                These principles dictate how we write code, design interfaces, and communicate with partners every day.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agencyValues.map((val, idx) => (
              <Reveal key={val.number} delay={idx * 80}>
                <div className="rounded-3xl bg-white border border-[#E5E4E0] p-8 space-y-4 hover:border-[#7657FF]/40 transition-colors shadow-sm">
                  <span className="font-mono text-xs font-bold text-[#7657FF] bg-[#7657FF]/10 px-3 py-1 rounded">
                    PRINCIPLE {val.number}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#17181C]">
                    {val.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#686B73] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-[#F7F6F2] text-[#17181C]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Reveal>
              <div className="eyebrow text-[#7657FF]">PARTNERSHIP</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17181C]">
                Ready to Discuss Your Next Stage?
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body text-[#686B73] text-base sm:text-lg leading-relaxed">
                Connect with our senior team. We will review your current digital assets and share actionable observations within 24 hours.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg" showArrow>
                  Get a Free Consultation
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  Explore Capabilities
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
