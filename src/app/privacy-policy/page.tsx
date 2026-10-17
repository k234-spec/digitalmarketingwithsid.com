import React from "react";
import type { Metadata } from "next";
import { brand } from "@/data/site";
import { Container } from "@/ui/Container";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: "Privacy policy and client data handling commitments.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#F7F6F2]">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8 bg-white border border-[#E5E4E0] rounded-3xl p-8 sm:p-12">
          <div className="border-b border-[#E5E4E0] pb-6">
            <span className="eyebrow">LEGAL COMPLIANCE</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#17181C] mt-2">
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-[#686B73] mt-2">
              Last Updated: January 2025 · Effective Immediately
            </p>
          </div>

          <div className="space-y-6 font-body text-sm sm:text-base text-[#17181C]/90 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                1. Information We Collect
              </h2>
              <p>
                When you request a diagnostic consultation or submit an inquiry through our digital channels, we collect information you voluntarily provide: your name, work email address, company name, website URL, service preferences, and project goals.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                2. Use of Information
              </h2>
              <p>
                Collected data is used solely to evaluate your business requirements, prepare strategic diagnostic recommendations, communicate with you regarding service delivery, and fulfill contractual obligations. We never sell, rent, or distribute personal information to third-party data brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                3. Telemetry and Analytics
              </h2>
              <p>
                We collect anonymized behavioral telemetry (such as page views, scroll depth, and interaction events) to optimize site accessibility and performance. No personally identifiable information (PII) is attached to analytics event streams.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                4. Data Security and Confidentiality
              </h2>
              <p>
                All communications and customer data submitted to {brand.name} are stored using industry-standard TLS encryption in transit and secure cloud storage at rest. Client confidential records and strategy documents are protected by non-disclosure protocols.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#17181C]">
                5. Contact and Inquiries
              </h2>
              <p>
                For questions regarding our privacy practices or to request data deletion, contact our data protection representative at{" "}
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
