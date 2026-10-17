export interface ProjectCaseStudy {
  slug: string;
  title: string;
  clientType: string;
  isDemonstrationProject: boolean;
  industry: string;
  category: "Website Development" | "Social Media" | "Performance Marketing" | "SEO" | "Branding";
  timeframe: string;
  challenge: string;
  objectives: string[];
  strategy: string;
  servicesDelivered: string[];
  implementationSummary: string[];
  outcomes: {
    label: string;
    value: string;
    context: string;
  }[];
  techStack: string[];
  featured: boolean;
  heroColor: string;
}

export const projectsData: ProjectCaseStudy[] = [
  {
    slug: "apex-industrial-redesign",
    title: "Global Machinery Platform & Technical Brand Architecture",
    clientType: "Apex Heavy Engineering (Demonstration Case Study)",
    isDemonstrationProject: true,
    industry: "Manufacturing & Industrial Export",
    category: "Website Development",
    timeframe: "7 Weeks Delivery",
    challenge:
      "A heritage precision manufacturing exporter faced high bounce rates on mobile, a dated multi-page catalog, and lack of technical search presence for global procurement engineers looking for OEM components.",
    objectives: [
      "Re-architect the 400+ product catalog with sub-second search and filtering.",
      "Achieve top-quartile Core Web Vitals (LCP < 1.4s, CLS < 0.05).",
      "Establish international schema markup for multi-currency industrial specifications.",
      "Streamline RFQ (Request for Quote) flows into an automated sales team routing pipeline.",
    ],
    strategy:
      "Engineered a headless Next.js App Router platform featuring instantaneous client-side faceted filtering, technical spec sheet downloads, and high-contrast editorial industrial design.",
    servicesDelivered: [
      "Website Development (Next.js & TypeScript)",
      "Graphic Design & Brand Refresh",
      "Technical SEO & Schema Architecture",
      "Procurement RFQ Form Optimization",
    ],
    implementationSummary: [
      "Deployed edge-rendered product pages with dynamic OpenGraph generation for shared parts.",
      "Configured WCAG 2.2 AA compliant typography hierarchy and high-visibility keyboard states.",
      "Integrated Zod-validated RFQ forms with CRM qualification routing.",
      "Reduced overall JavaScript bundle payload by 68% compared to their legacy CMS.",
    ],
    outcomes: [
      {
        label: "Largest Contentful Paint",
        value: "1.1s",
        context: "Audited across simulated mobile 4G network profiles",
      },
      {
        label: "Inquiry Form Completion Rate",
        value: "+38%",
        context: "Observed in structured before-and-after user testing",
      },
      {
        label: "Lighthouse Performance Score",
        value: "99/100",
        context: "Across all desktop and mobile catalog index pages",
      },
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Zod", "Vercel Edge"],
    featured: true,
    heroColor: "#7657FF",
  },
  {
    slug: "lumina-d2c-growth",
    title: "Direct-to-Consumer Paid Acquisition & Creative Testing Engine",
    clientType: "Lumina Wellness (Demonstration Case Study)",
    isDemonstrationProject: true,
    industry: "E-commerce & Consumer Goods",
    category: "Performance Marketing",
    timeframe: "3 Months Optimization Sprint",
    challenge:
      "A fast-growing wellness brand experienced declining ROAS and escalating Customer Acquisition Costs due to iOS tracking signal loss and creative ad fatigue on Meta platforms.",
    objectives: [
      "Rebuild conversion attribution using Meta Conversions API (CAPI) and Google GA4 server-side.",
      "Implement a weekly iterative creative testing cycle producing 12+ ad variants per sprint.",
      "Build dedicated high-speed landing pages tailored to specific problem-solution hooks.",
      "Optimize customer lifetime value through post-purchase retargeting workflows.",
    ],
    strategy:
      "Shifted ad spend into a structured broad-targeting model supported by server-side tracking, aggressive negative exclusions, and custom unbranded landing pages focusing on deep buyer education.",
    servicesDelivered: [
      "Performance Marketing (Meta & Google Ads)",
      "Social Media Creative Production",
      "Landing Page UX & Conversion Rate Optimization",
      "Server-Side Tracking & Attribution (GTM + CAPI)",
    ],
    implementationSummary: [
      "Implemented server-side GTM container connected to cloud endpoint for 98% event match quality.",
      "Designed high-converting UGC style static cards, unboxing reels, and comparison infographics.",
      "Developed 4 distinct landing page variants testing single-product vs bundle value offers.",
      "Established daily budget pacing rules to prevent weekend algorithm overspend.",
    ],
    outcomes: [
      {
        label: "Attribution Event Match Quality",
        value: "9.2 / 10",
        context: "Direct Meta CAPI server-to-server verified signal",
      },
      {
        label: "Landing Page Speed",
        value: "0.8s",
        context: "Instantaneous first paint on mobile ad click-throughs",
      },
      {
        label: "Tested Creative Angles",
        value: "36 Variants",
        context: "Systematically evaluated across 90-day testing sprints",
      },
    ],
    techStack: ["Meta Ads Manager", "Google Ads", "Server-Side GTM", "Next.js", "Figma"],
    featured: true,
    heroColor: "#D9FF70",
  },
  {
    slug: "vanguard-legal-seo",
    title: "High-Intent Commercial SEO & Authority Inbound Architecture",
    clientType: "Vanguard Corporate Legal (Demonstration Case Study)",
    isDemonstrationProject: true,
    industry: "Professional Services & Corporate Law",
    category: "SEO",
    timeframe: "6 Months Engagement",
    challenge:
      "A premier corporate dispute and M&A advisory firm relied exclusively on word-of-mouth and had zero organic search visibility for high-value corporate transactional queries.",
    objectives: [
      "Resolve legacy indexing bloat, duplicate practice pages, and missing structured data.",
      "Develop 25+ comprehensive pillar legal briefs answering specific corporate governance questions.",
      "Implement legal schema markup (LegalService, Attorney, FAQPage) for rich Google snippets.",
      "Generate qualified enterprise consultation bookings directly from organic search.",
    ],
    strategy:
      "Formulated a topical authority matrix targeting high-commercial-intent advisory keywords rather than generic legal terms, backed by authoritative thought leadership authored by senior partners.",
    servicesDelivered: [
      "Search Engine Optimization (Technical & On-Page)",
      "Content Strategy & Topic Modeling",
      "Website UX & Consultation Flow Restructure",
      "Schema.org Structured Data Implementation",
    ],
    implementationSummary: [
      "Fixed 45 redirect chains and eliminated 120 low-quality thin index pages.",
      "Authored 30 detailed legal guide briefs with clear table-of-contents navigation and citations.",
      "Embedded direct attorney booking modals on high-intent service sub-routes.",
      "Monitored Search Console weekly to expand on query variations demonstrating commercial intent.",
    ],
    outcomes: [
      {
        label: "Core Practice Search Visibility",
        value: "Top 3",
        context: "For priority targeted corporate advisory terms",
      },
      {
        label: "Crawl Efficiency & Clean Index",
        value: "100%",
        context: "Zero indexation errors or duplicate content warnings in GSC",
      },
      {
        label: "Consultation Request Velocity",
        value: "Consistent Inbound",
        context: "High-ticket corporate queries booking direct partner consultations",
      },
    ],
    techStack: ["Google Search Console", "Screaming Frog", "Next.js", "Schema.org", "Semrush"],
    featured: true,
    heroColor: "#B8A7FF",
  },
  {
    slug: "horizon-saas-platform",
    title: "Enterprise SaaS Conversion Architecture & Product Identity",
    clientType: "Horizon Cloud Systems (Demonstration Case Study)",
    isDemonstrationProject: true,
    industry: "Technology & B2B SaaS",
    category: "Branding",
    timeframe: "8 Weeks Delivery",
    challenge:
      "A Series A cloud data infrastructure startup had a complex product message that confused enterprise buyers, resulting in low self-serve trial signups and demo request drop-offs.",
    objectives: [
      "Distill intricate distributed database architecture into clear, intuitive product diagrams.",
      "Develop a dark-mode forward, high-credibility developer brand identity.",
      "Build an interactive interactive ROI calculation tool directly on the homepage.",
      "Optimize enterprise demo request qualification workflows.",
    ],
    strategy:
      "Created a brand system centered around engineering precision: custom isometric diagrams, clean monochrome surfaces with violet accents, and an interactive demo booking system.",
    servicesDelivered: [
      "Graphic Design & Brand Systems",
      "Website Development (Interactive Next.js)",
      "Interactive ROI Calculator Tooling",
      "Information Architecture & Product Copywriting",
    ],
    implementationSummary: [
      "Created full design tokens in Figma and translated directly into Tailwind v4 tokens.",
      "Coded responsive interactive ROI slider calculating annual infrastructure cost savings.",
      "Structured product capability comparison tables with instant feature search.",
      "Connected calendar booking integration with automated lead enrichment.",
    ],
    outcomes: [
      {
        label: "Interactive Tool Engagement",
        value: "4.2 min",
        context: "Average session duration on interactive ROI calculator",
      },
      {
        label: "Demo Booking Form Velocity",
        value: "+45%",
        context: "Increase in completed demo requests from qualified domain emails",
      },
      {
        label: "Asset Reusability",
        value: "100+ Components",
        context: "Standardized across marketing site, app UI, and pitch decks",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Figma", "Zod"],
    featured: false,
    heroColor: "#7657FF",
  },
];
