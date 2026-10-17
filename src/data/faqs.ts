export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Services" | "Process & Pricing";
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services does your digital marketing agency provide?",
    answer:
      "We provide five core, integrated growth disciplines: (1) Custom Website Development on Next.js/TypeScript, (2) Social Media Marketing and editorial thought leadership, (3) Performance Marketing across Google Ads and Meta Ads, (4) Technical and Commercial Search Engine Optimization (SEO), and (5) Graphic Design & Brand Systems.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "Which industries do you work with?",
    answer:
      "We partner with ambitious companies across Industrial Manufacturing, E-commerce & D2C Brands, Professional Services (Legal, Financial, Consulting), B2B Technology & SaaS, and growing Consumer Goods brands across India and global markets.",
    category: "General",
  },
  {
    id: "faq-3",
    question: "How do you determine the right marketing strategy?",
    answer:
      "We begin with a comprehensive commercial diagnostic: analyzing your unit economics, current customer journey, search demand, competitor positioning, and conversion friction points. From there, we design an integrated roadmap prioritizing high-leverage channels rather than spreading resources thin.",
    category: "General",
  },
  {
    id: "faq-4",
    question: "How long does website development take?",
    answer:
      "A typical high-performance corporate marketing website requires 5 to 7 weeks from discovery kickoff to production launch. Complex platforms with bespoke interactive calculators, dynamic filtering, or custom CRM integrations typically require 8 to 10 weeks.",
    category: "Services",
  },
  {
    id: "faq-5",
    question: "How long does SEO take to show results?",
    answer:
      "Technical audits, Core Web Vitals remediation, and schema fixes show positive crawl signals in Google Search Console within 4 to 8 weeks. Meaningful commercial keyword ranking gains and compounding organic traffic typically take 4 to 8 months of consistent topical cluster publishing and optimization.",
    category: "Services",
  },
  {
    id: "faq-6",
    question: "What is included in performance marketing?",
    answer:
      "Our performance marketing service includes full tracking infrastructure setup (Server-Side GTM, GA4, Meta CAPI), weekly iterative ad creative production (copy, static cards, and video assets), continuous A/B testing of dedicated landing pages, negative keyword management, daily budget pacing, and transparent weekly reporting on Customer Acquisition Cost (CAC) and ROAS.",
    category: "Services",
  },
  {
    id: "faq-7",
    question: "Do you offer customized service packages?",
    answer:
      "Yes. While many clients engage us for full-funnel growth (Web Development + Paid Performance + SEO), we frequently construct scoped engagements tailored to immediate business priorities—such as an urgent website overhaul or a dedicated performance marketing optimization sprint.",
    category: "Process & Pricing",
  },
  {
    id: "faq-8",
    question: "How do you measure campaign success?",
    answer:
      "We align our primary KPIs directly with commercial outcomes: qualified inbound leads, pipeline value, cost per qualified acquisition, and organic revenue contribution. We do not hide behind vanity metrics such as impression totals or unassisted clicks.",
    category: "Process & Pricing",
  },
  {
    id: "faq-9",
    question: "Will we receive regular reports?",
    answer:
      "Yes. Every client receives access to a real-time analytics dashboard (Looker Studio / custom telemetry), bi-weekly executive sprint summaries, and structured monthly strategy review sessions with senior growth partners.",
    category: "Process & Pricing",
  },
  {
    id: "faq-10",
    question: "How can we book an initial consultation?",
    answer:
      "You can book an initial consultation by completing our online inquiry form on the contact page or clicking 'Get a Free Consultation'. Alternatively, reach out directly via our verified WhatsApp channel or email us at Siddhantshukla108@gmail.com. We review every submission within 24 business hours.",
    category: "General",
  },
];
