import React from "react";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <Hero />

      {/* SECTION 2 — TRUST BAR */}
      <TrustBar />

      {/* SECTION 3 — SERVICES */}
      <ServicesGrid />

      {/* SECTION 4 — WORK / CASE STUDIES */}
      <CaseStudies />

      {/* SECTION 5 — PROCESS */}
      <Process />

      {/* SECTION 6 — TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 7 — FAQ */}
      <FAQ />

      {/* SECTION 8 — FINAL CTA + CONTACT FORM */}
      <ContactCTA />
    </>
  );
}
