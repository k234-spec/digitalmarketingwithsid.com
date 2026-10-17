import React from "react";
import Link from "next/link";
import { getPublishedServices } from "@/lib/db/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";
import { ArrowRight, Sparkles } from "lucide-react";

export async function ServicesGrid() {
  const services = await getPublishedServices();

  return (
    <section className="py-24 sm:py-32 bg-[#F7F6F2]" id="services">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <Reveal>
              <div className="eyebrow flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#7657FF]" />
                <span>WHAT WE DO · DYNAMIC SERVICE CAPABILITIES</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="section-heading">Everything You Need to Grow Online.</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="section-description">
                From the first impression to the final conversion, we connect your brand, website, and marketing channels into one growth-focused system.
              </p>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-mono font-semibold text-[#7657FF] hover:text-[#6242EC] transition-colors"
            >
              <span>Explore full service breakdowns</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Dynamic Service Cards Grid */}
        {services.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#D2D0C9] p-12 text-center bg-white/50">
            <p className="text-gray-500 font-mono text-sm">
              Services will be available soon. Please check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <Reveal key={service.id} delay={idx * 70}>
                <ServiceCard service={service} className="h-full" />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default ServicesGrid;
