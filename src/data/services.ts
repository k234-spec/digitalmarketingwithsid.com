export interface ServiceDetail {
  slug: string;
  code: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  problemStatement: {
    heading: string;
    description: string;
    painPoints: string[];
  };
  benefits: {
    title: string;
    description: string;
    stat?: string;
  }[];
  deliverables: {
    category: string;
    items: string[];
  }[];
  process: {
    step: string;
    name: string;
    duration: string;
    description: string;
  }[];
  relatedCaseStudySlug: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "website-development": {
    slug: "website-development",
    code: "01",
    title: "Website Development",
    eyebrow: "ENGINEERED FOR CONVERSION & SPEED",
    tagline: "Custom, fast, accessible digital experiences built to convert traffic into qualified pipeline.",
    summary:
      "We design and build bespoke web platforms using modern architectures (Next.js, TypeScript, Tailwind CSS). Every page is engineered with high-performing Core Web Vitals, semantic accessibility, mobile responsiveness, and conversion architecture.",
    problemStatement: {
      heading: "Why most agency websites fail to generate revenue",
      description:
        "Generic WordPress templates and bloated page builders load slowly, fail mobile users, and bury value propositions under decorative noise. When visitors bounce within 3 seconds, your advertising and sales efforts are compromised.",
      painPoints: [
        "Sub-optimal Core Web Vitals resulting in high bounce rates and lost ad spend.",
        "Fragmented mobile layouts that cause conversion friction and abandoned forms.",
        "Cluttered CMS architectures that become difficult for internal marketing teams to maintain.",
        "Lack of structured data and technical SEO foundations at code level.",
      ],
    },
    benefits: [
      {
        title: "Sub-Second Load Times",
        description: "Static generation and edge caching that keep Largest Contentful Paint (LCP) under 1.5 seconds.",
        stat: "< 1.5s LCP",
      },
      {
        title: "Conversion-Rate Engineering",
        description: "UX wireframing focused on visual hierarchy, clear CTAs, and frictionless lead capture forms.",
        stat: "Up to 42% lift in lead flow",
      },
      {
        title: "Enterprise SEO Foundation",
        description: "Dynamic sitemaps, JSON-LD schema, OpenGraph tags, and semantic HTML built into every route.",
        stat: "100% Crawlable",
      },
      {
        title: "Maintainable Content Model",
        description: "Clean component architecture and headless CMS capabilities so your team updates content with ease.",
        stat: "Zero Lock-in",
      },
    ],
    deliverables: [
      {
        category: "Strategy & UX Architecture",
        items: [
          "Information architecture & user journey mapping",
          "High-fidelity responsive wireframes & Figma prototypes",
          "Conversion funnel modeling & CTA placement strategy",
          "Copywriting guidance & headline frameworks",
        ],
      },
      {
        category: "Frontend & Full-Stack Engineering",
        items: [
          "Next.js App Router & React 19 architecture",
          "Tailwind CSS design token system with dark/light harmony",
          "Micro-interactions & accessible motion design",
          "Form validation with Zod & server-side API endpoints",
        ],
      },
      {
        category: "Performance, QA & Launch",
        items: [
          "Lighthouse 95+ Core Web Vitals optimization",
          "Cross-browser and multi-device viewport testing",
          "Accessibility testing (WCAG 2.2 AA standard)",
          "Production deployment on Vercel with automated CI/CD",
        ],
      },
    ],
    process: [
      {
        step: "01",
        name: "Discovery & Blueprint",
        duration: "Week 1",
        description: "Analyze user behaviors, competitor benchmarks, technical stack requirements, and brand guidelines.",
      },
      {
        step: "02",
        name: "UX/UI Design System",
        duration: "Week 2–3",
        description: "Design high-fidelity design tokens, component libraries, responsive viewports, and interactive states.",
      },
      {
        step: "03",
        name: "Clean Code Implementation",
        duration: "Week 3–5",
        description: "Develop component architecture in Next.js, integrate APIs, connect forms, and verify responsive behavior.",
      },
      {
        step: "04",
        name: "Performance Audit & Launch",
        duration: "Week 6",
        description: "Complete end-to-end QA, Core Web Vitals validation, DNS cutover, and post-launch telemetry setup.",
      },
    ],
    relatedCaseStudySlug: "apex-industrial-redesign",
    faqs: [
      {
        question: "How long does a custom website development project take?",
        answer:
          "A typical high-performance corporate or marketing website takes 5 to 7 weeks from discovery to production launch, depending on scope and stakeholder review cycles.",
      },
      {
        question: "Will our internal team be able to edit blog posts and page content?",
        answer:
          "Yes. We configure clear content schemas—either through code-based Markdown/MDX workflows or headless CMS integrations—so non-technical team members can publish updates without developer assistance.",
      },
      {
        question: "Do you build on Next.js or traditional CMS platforms?",
        answer:
          "We primarily architect websites with modern Next.js and TypeScript because it provides unmatched performance, security, SEO, and flexibility compared to monolithic page builders.",
      },
      {
        question: "How do you handle hosting and maintenance after launch?",
        answer:
          "We deploy on modern edge infrastructure such as Vercel or AWS. We also offer monthly support retainers for continuous monitoring, dependency updates, and feature enhancements.",
      },
    ],
  },

  "social-media-marketing": {
    slug: "social-media-marketing",
    code: "02",
    title: "Social Media Marketing",
    eyebrow: "ORGANIC ENGAGEMENT & AUTHORITY",
    tagline: "Strategic content systems that build market authority, nurture prospects, and expand organic brand reach.",
    summary:
      "We design editorial content ecosystems across LinkedIn, Instagram, and YouTube. Rather than generic social posting, we align storytelling with your core commercial strengths to establish category leadership.",
    problemStatement: {
      heading: "Random posting does not create qualified client demand",
      description:
        "Many brands post erratic, templated graphics that generate zero meaningful engagement. Without positioning, thought leadership, and clear distribution, social media becomes an unproductive operational cost.",
      painPoints: [
        "Lack of distinct editorial perspective, blending in with competitors.",
        "Inconsistent publishing schedules and zero multi-channel content repurposing.",
        "Focus on vanity likes rather than qualified inbound inquiries and website referral traffic.",
        "Disconnected visual styling that dilutes brand equity.",
      ],
    },
    benefits: [
      {
        title: "Category Authority",
        description: "Position founders and executives as trusted domain experts through high-signal thought leadership.",
        stat: "Authority Positioning",
      },
      {
        title: "Editorial Design Standards",
        description: "Custom typography templates, carousel designs, and motion assets that reflect high craft.",
        stat: "100% Bespoke Creatives",
      },
      {
        title: "Structured Content Pillars",
        description: "Tested frameworks combining educational content, case breakdowns, and conversion touchpoints.",
        stat: "Consistent Cadence",
      },
      {
        title: "Commercial Attribution",
        description: "Tracking referral traffic and assisted conversions from organic social into your sales pipeline.",
        stat: "Measurable Impact",
      },
    ],
    deliverables: [
      {
        category: "Content Strategy & Editorial Calendar",
        items: [
          "Target audience persona & content topic matrix",
          "Monthly editorial calendars with scheduled production milestones",
          "Executive LinkedIn ghostwriting & brand voice guidelines",
          "Hashtag and algorithmic distribution strategy",
        ],
      },
      {
        category: "Creative Production & Motion",
        items: [
          "Multi-slide carousel design systems for LinkedIn & Instagram",
          "Short-form motion graphics, Reels & video editing",
          "Data visualization graphics & quote cards",
          "Copywriting crafted for high retention and comment velocity",
        ],
      },
      {
        category: "Publishing & Analytics",
        items: [
          "Direct multi-platform scheduling & asset management",
          "Community engagement monitoring & inquiry triage",
          "Monthly KPI review covering engagement, clicks, and profile conversions",
          "Quarterly strategic pivot sessions based on audience data",
        ],
      },
    ],
    process: [
      {
        step: "01",
        name: "Persona & Channel Audit",
        duration: "Week 1",
        description: "Examine past organic performance, identify competitor whitespace, and define target buyer personas.",
      },
      {
        step: "02",
        name: "Creative System & Templates",
        duration: "Week 2",
        description: "Create brand-aligned Figma templates, typography scales, color treatments, and editorial guidelines.",
      },
      {
        step: "03",
        name: "Batch Content Production",
        duration: "Ongoing",
        description: "Produce, review, and schedule monthly content batches with executive review touchpoints.",
      },
      {
        step: "04",
        name: "Analysis & Iteration",
        duration: "Monthly",
        description: "Evaluate top-performing formats, refine messaging hooks, and channel high-performing ideas into paid ads.",
      },
    ],
    relatedCaseStudySlug: "lumina-d2c-growth",
    faqs: [
      {
        question: "Which social platforms do you specialize in?",
        answer:
          "We specialize in LinkedIn for B2B and professional services, and Instagram & YouTube for B2C, D2C, and consumer brands.",
      },
      {
        question: "Do you handle community management and responding to comments?",
        answer:
          "Yes, we offer monitored community management as part of comprehensive retainers, ensuring customer questions and sales leads are escalated to your team quickly.",
      },
      {
        question: "How do you ensure the tone of voice matches our brand?",
        answer:
          "We develop a rigorous brand voice manual during the onboarding phase, establishing vocabulary rules, tone examples, and review protocols before any post goes live.",
      },
    ],
  },

  "performance-marketing": {
    slug: "performance-marketing",
    code: "03",
    title: "Performance Marketing",
    eyebrow: "DATA-DRIVEN PAID ACQUISITION",
    tagline: "Scalable paid search and paid social campaigns focused strictly on Customer Acquisition Cost and ROAS.",
    summary:
      "We build, test, and scale paid acquisition campaigns across Google Search, Meta Ads, and LinkedIn. With server-side tracking, dedicated landing page testing, and rigorous budget discipline, we ensure ad spend translates directly into qualified revenue.",
    problemStatement: {
      heading: "Ad spend without rigorous tracking is money wasted",
      description:
        "Modern ad platforms are volatile. Relying on broad targeting, broken pixel attribution, and generic ad creative leads to escalating customer acquisition costs and low lead quality.",
      painPoints: [
        "Wasted ad spend on low-intent search terms and click-farm audiences.",
        "Signal loss caused by browser cookie deprecation and incomplete tracking setups.",
        "Creative fatigue from running the same ad creative for months on end.",
        "Lack of landing page conversion rate testing, strangling campaign ROI.",
      ],
    },
    benefits: [
      {
        title: "Server-Side Conversion API",
        description: "Meta CAPI and Google Enhanced Conversions to recover tracking accuracy and feed algorithm optimization.",
        stat: "99% Attribution Accuracy",
      },
      {
        title: "Systematic Creative Testing",
        description: "Weekly batches of ad creatives, hooks, headlines, and angles to combat creative fatigue.",
        stat: "Continuous Testing",
      },
      {
        title: "Dedicated Landing Pages",
        description: "Custom campaign landing pages tailored specifically to match search intent and ad creative hooks.",
        stat: "+35% Conversion Rate",
      },
      {
        title: "Negative Keyword Guardrails",
        description: "Aggressive filtering to ensure zero budget leakage on competitor clicks and irrelevant queries.",
        stat: "Zero Waste Budget",
      },
    ],
    deliverables: [
      {
        category: "Tracking Architecture & Setup",
        items: [
          "Google Tag Manager (GTM) server-side deployment",
          "Google Analytics 4 event schema & custom conversion mapping",
          "Meta Conversions API (CAPI) & LinkedIn Insight Tag integration",
          "CRM offline conversion tracking integration (HubSpot / Salesforce)",
        ],
      },
      {
        category: "Campaign Strategy & Creative",
        items: [
          "Full-funnel campaign architecture (Prospecting, Retargeting, Retention)",
          "Ad creative production: stat cards, carousels, video ads, search copy",
          "Audience segmentation (Lookalikes, first-party customer lists, in-market intent)",
          "Competitor ad intelligence and market pricing analysis",
        ],
      },
      {
        category: "Optimization & Daily Management",
        items: [
          "Daily bid, budget, and placement optimization",
          "Weekly search query mining & negative keyword expansions",
          "A/B testing of landing page headlines and form lengths",
          "Real-time Looker Studio dashboard reporting on CAC, ROAS, and pipeline value",
        ],
      },
    ],
    process: [
      {
        step: "01",
        name: "Tracking Audit & Tech Setup",
        duration: "Days 1–7",
        description: "Install server-side tracking, test event triggers, and audit existing ad account permissions.",
      },
      {
        step: "02",
        name: "Audience & Creative Sprint",
        duration: "Days 8–14",
        description: "Develop 10–15 creative variants, write precision copy, and build custom campaign landing pages.",
      },
      {
        step: "03",
        name: "Controlled Launch & Calibration",
        duration: "Days 15–30",
        description: "Launch initial ad sets at controlled budgets to validate cost-per-click and conversion rates.",
      },
      {
        step: "04",
        name: "Scale & Efficiency",
        duration: "Month 2+",
        description: "Double down on winning ad creative angles and expand audience reach while holding target CAC.",
      },
    ],
    relatedCaseStudySlug: "lumina-d2c-growth",
    faqs: [
      {
        question: "What minimum ad budget do you recommend for paid campaigns?",
        answer:
          "To provide sufficient data volume for machine learning optimization, we typically recommend a minimum ad spend of $1,500 – $2,500 (or ₹1,20,000+) per month, managed separately from our agency fee.",
      },
      {
        question: "Do you guarantee a specific ROAS or number of leads?",
        answer:
          "We do not make misleading guarantees because external factors (product pricing, market demand, sales team close rate) play a key role. We guarantee rigorous tracking, commercial discipline, and weekly scientific testing.",
      },
      {
        question: "Who owns the ad accounts and data?",
        answer:
          "You do. We build campaigns directly inside your own Google Ads, Meta, and LinkedIn Business Manager accounts. You retain full administrative ownership and historical data at all times.",
      },
    ],
  },

  "seo": {
    slug: "seo",
    code: "04",
    title: "Search Engine Optimization",
    eyebrow: "ORGANIC DISCOVERY & TECHNICAL FOUNDATIONS",
    tagline: "Sustainable organic rankings driven by technical excellence, search intent architecture, and content depth.",
    summary:
      "We treat SEO as a discipline of digital infrastructure and user intent. We eliminate crawl roadblocks, optimize core website architecture, construct authoritative topic clusters, and build the foundation for long-term organic customer acquisition.",
    problemStatement: {
      heading: "Search engines reward technical clarity, not keyword stuffing",
      description:
        "Modern search algorithms prioritize user experience, page speed, topical authority, and semantic depth. Outdated black-hat tactics and thin AI-generated articles now risk severe algorithmic penalties.",
      painPoints: [
        "Hidden crawl errors, indexation bloat, and broken redirect chains.",
        "Keyword cannibalization where multiple internal pages compete against each other.",
        "Slow server response times and poor Core Web Vitals dragging down rankings.",
        "Thin content that fails to satisfy comprehensive search intent.",
      ],
    },
    benefits: [
      {
        title: "Technical Cleanliness",
        description: "Full resolution of sitemap anomalies, canonical tags, schema markup, and crawl budgets.",
        stat: "Zero Indexation Errors",
      },
      {
        title: "High-Commercial Intent Keywords",
        description: "Focusing on buyer-ready terms with strong commercial intent rather than empty search volume.",
        stat: "Pipeline-First Targeting",
      },
      {
        title: "Topical Authority Clusters",
        description: "Strategic pillar-and-spoke internal linking architectures that establish domain leadership.",
        stat: "Compound Growth",
      },
      {
        title: "Schema & Rich Snippets",
        description: "JSON-LD structured data implementation (Organization, FAQ, Breadcrumbs, Article) for search features.",
        stat: "Rich Result Eligibility",
      },
    ],
    deliverables: [
      {
        category: "Technical SEO & Architecture",
        items: [
          "Comprehensive 120-point technical audit & code recommendations",
          "Robots.txt, XML sitemap, and canonical tag restructuring",
          "Core Web Vitals remediation (LCP, CLS, INP)",
          "Dynamic Schema.org JSON-LD generation for search engines",
        ],
      },
      {
        category: "Keyword & Intent Strategy",
        items: [
          "Commercial intent keyword mapping for all core services",
          "Search competitor gap analysis and opportunity matrices",
          "Information architecture and URL slug hierarchy planning",
          "Internal linking strategy to channel PageRank effectively",
        ],
      },
      {
        category: "Content Optimization & Reporting",
        items: [
          "Content optimization briefs for writers and editors",
          "On-page optimization: titles, meta descriptions, semantic headings",
          "Google Search Console crawl telemetry monitoring",
          "Monthly organic search performance reports detailing rankings and clicks",
        ],
      },
    ],
    process: [
      {
        step: "01",
        name: "Technical Crawl Audit",
        duration: "Week 1–2",
        description: "Run comprehensive site crawls to diagnose indexation bottlenecks, redirect chains, and schema gaps.",
      },
      {
        step: "02",
        name: "Architecture & Keyword Roadmap",
        duration: "Week 3",
        description: "Map target commercial keywords to existing and planned URLs with verified search intent.",
      },
      {
        step: "03",
        name: "On-Page & Schema Implementation",
        duration: "Week 4–6",
        description: "Deploy technical code fixes, optimize metadata, inject structured data, and refine content.",
      },
      {
        step: "04",
        name: "Monitoring & Content Scaling",
        duration: "Ongoing",
        description: "Monitor indexing in Search Console, analyze query movements, and publish high-authority topic clusters.",
      },
    ],
    relatedCaseStudySlug: "vanguard-legal-seo",
    faqs: [
      {
        question: "How long does SEO take to produce measurable results?",
        answer:
          "Typically, technical improvements and indexation fixes begin showing early positive signals within 6 to 10 weeks. Significant organic keyword rankings and commercial traffic compound sustainably over 4 to 8 months.",
      },
      {
        question: "Do you guarantee number 1 rankings on Google?",
        answer:
          "No ethical agency can guarantee specific #1 positions because Google's ranking algorithms change frequently. What we guarantee is rigorous adherence to Google Search Essentials, clean technical code, and proven editorial depth.",
      },
      {
        question: "Do you build backlinks?",
        answer:
          "We focus on digital PR, high-quality content assets, and legitimate industry directory citations. We strictly avoid spam link networks (PBNs) or paid link packages that violate search guidelines.",
      },
    ],
  },

  "branding-graphic-design": {
    slug: "branding-graphic-design",
    code: "05",
    title: "Graphic Design & Branding",
    eyebrow: "DISTINCTIVE IDENTITY & CRAFT",
    tagline: "Enduring brand systems, typography rules, and marketing collateral designed to communicate credibility.",
    summary:
      "We forge cohesive visual identities that make companies instantly recognizable and commercially compelling. From primary logo suites and custom typography scales to pitch decks, social templates, and comprehensive brand books, we give your business an undeniable aesthetic edge.",
    problemStatement: {
      heading: "Inconsistent visual presentation damages perceived value",
      description:
        "When your company's marketing collateral, presentation decks, and website look disjointed, buyers subconsciously question your reliability. A strong, coherent visual identity justifies premium pricing.",
      painPoints: [
        "Incoherent typography and mismatched colors across marketing touchpoints.",
        "Generic clip-art logos that blend into crowds of competitors.",
        "Sales teams using outdated, unformatted presentation decks.",
        "No documented brand guidelines for internal teams and external contractors.",
      ],
    },
    benefits: [
      {
        title: "Perceived Value Premium",
        description: "High-craft visual identity enables confident enterprise pricing and attracts sophisticated buyers.",
        stat: "Commercial Authority",
      },
      {
        title: "Scalable Design System",
        description: "Design tokens, color swatches, and typography rules in Figma that keep future assets cohesive.",
        stat: "Systematized Identity",
      },
      {
        title: "Multi-Touchpoint Consistency",
        description: "From digital ads and business stationery to website elements, every asset shares one visual DNA.",
        stat: "Omnichannel Cohesion",
      },
      {
        title: "Production-Ready Assets",
        description: "Vector SVGs, high-res exports, font licenses guidance, and guidelines ready for any printer or agency.",
        stat: "Complete Asset Suite",
      },
    ],
    deliverables: [
      {
        category: "Core Identity & Brand Assets",
        items: [
          "Primary logomark, secondary wordmark, and favicon configurations",
          "Bespoke brand color palette with primary, secondary, and highlight tokens",
          "Typography system specification (Display, Body, Technical/Mono)",
          "Vector icon styleguide and custom graphic motifs",
        ],
      },
      {
        category: "Marketing Collateral & Templates",
        items: [
          "Executive pitch deck and presentation templates (Keynote / Google Slides)",
          "Social media carousel, story, and post template library in Figma",
          "Corporate stationery: business cards, letterheads, email signatures",
          "Sales one-pagers, case study PDFs, and digital brochure templates",
        ],
      },
      {
        category: "Brand Guidelines & System Documentation",
        items: [
          "Comprehensive 40+ page Brand Identity Manual (PDF)",
          "Logo clear-space, minimum size, and misuse rules",
          "Art direction guidelines for photography and visual assets",
          "Organized Google Drive / Cloud asset repository with web and print exports",
        ],
      },
    ],
    process: [
      {
        step: "01",
        name: "Brand Discovery & Market Mapping",
        duration: "Week 1",
        description: "Uncover core positioning, competitive visual territory, target audience demographics, and brand values.",
      },
      {
        step: "02",
        name: "Creative Concepts & Moodboards",
        duration: "Week 2",
        description: "Develop 2–3 distinct visual directions showing logos, color palettes, and typographic personality.",
      },
      {
        step: "03",
        name: "Refinement & Collateral Expansion",
        duration: "Week 3–4",
        description: "Refine chosen direction and extend visual system across pitch decks, social kits, and web components.",
      },
      {
        step: "04",
        name: "Asset Packaging & Guidelines",
        duration: "Week 5",
        description: "Export all master files in vector, RGB, and CMYK formats alongside the comprehensive brand manual.",
      },
    ],
    relatedCaseStudySlug: "apex-industrial-redesign",
    faqs: [
      {
        question: "What files and formats do we receive upon brand completion?",
        answer:
          "You receive full vector files (AI, EPS, SVG) and high-resolution exports (PNG with transparent backgrounds, JPG) for digital and print, along with complete Figma component libraries and the Brand Guidelines document.",
      },
      {
        question: "Can you rebrand our existing business without losing brand equity?",
        answer:
          "Yes. We frequently execute brand evolutions and modernizations that retain the recognizable heritage of your existing mark while refining typography, contrast, and digital responsiveness.",
      },
      {
        question: "Who owns the copyright and intellectual property?",
        answer:
          "You do. Upon project completion and final payment, 100% of intellectual property and commercial copyright for the approved designs are transferred to your business.",
      },
    ],
  },
};
