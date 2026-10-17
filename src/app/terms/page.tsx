import React from "react";
import type { Metadata } from "next";
import { brand } from "@/data/site";
import { Container } from "@/ui/Container";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: "Terms and conditions governing agency engagements.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#F7F6F2]">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8 bg-white border border-[#E5E4E0] rounded-3xl p-8 sm:p-12">
          <div className="border-b border-[#E5E4E0] pb-6">
            <span className="eyebrow">LEGAL COMPLIANCE</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#17181C] mt-2">
              Terms of Service
            </h1>
            <p className="font-mono text-xs text-[#686B73] mt-2">
              Last Updated: January 2025 · Effective Immediately
            </p>
          </div>

          <div className="space-y-6 font-body text-sm sm:text-base text-[#17181C]/90 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                1. Engagement and Statements of Work
              </h2>
              <p>
                All consulting services, web development milestones, creative design deliverables, and advertising management provided by {brand.name} are governed by specific Statements of Work (SOW) mutually executed with client organizations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                2. Intellectual Property and Code Ownership
              </h2>
              <p>
                Upon receipt of full payment for agreed milestones, 100% of custom frontend code, tailored brand assets, design system files, and configured marketing assets transfer to the client organization without licensing encumbrances.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                3. Advertising Accounts and Third-Party Media
              </h2>
              <p>
                All advertising budgets on platforms such as Meta, Google, and LinkedIn are billed directly to client-owned payment methods. {brand.name} acts strictly as an authorized manager without ownership claims over client ad account data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                4. Performance Disclaimer
              </h2>
              <p>
                While we employ rigorous statistical modeling, server-side attribution, and engineering standards, business growth depends on market dynamics, customer service, and product viability. We do not make fabricated guarantees regarding fixed financial returns or algorithm positions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                5. Governing Law
              </h2>
              <p>
                These terms are governed by the commercial laws of India. For inquiries regarding contracts or commercial policies, contact{" "}
                <a href={`mailto:${brand.email}`} className="text-[#7657FF] underline font-mono">
                  {brand.email}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
