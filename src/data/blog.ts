export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: "Digital Strategy" | "SEO" | "Website Development" | "Paid Advertising" | "Social Media" | "Branding & Design";
  tags: string[];
  readingTime: string;
  toc: { id: string; title: string }[];
  content: {
    sectionId?: string;
    heading?: string;
    subheading?: string;
    paragraphs: string[];
    callout?: string;
    bulletPoints?: string[];
  }[];
  relatedSlugs: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "engineering-nextjs-websites-for-b2b-conversion",
    title: "Why Modern B2B Companies Are Moving from WordPress to Next.js",
    description:
      "A deep dive into how sub-second load times, headless architectures, and structured data create an unfair advantage in commercial pipeline velocity.",
    publishedAt: "2025-01-15",
    updatedAt: "2025-02-10",
    author: {
      name: "Siddharth Verma",
      role: "Head of Technology & Architecture",
    },
    category: "Website Development",
    tags: ["Next.js", "Web Performance", "Core Web Vitals", "B2B Strategy"],
    readingTime: "6 min read",
    toc: [
      { id: "the-real-cost-of-slow-websites", title: "The Hidden Cost of Slow Websites" },
      { id: "core-web-vitals-and-commercial-intent", title: "Core Web Vitals as a Commercial Lever" },
      { id: "security-and-maintenance-overhead", title: "Eliminating WordPress Plugin Bloat" },
      { id: "the-headless-future", title: "Architecting for Long-Term Scale" },
    ],
    content: [
      {
        sectionId: "the-real-cost-of-slow-websites",
        heading: "The Hidden Cost of Slow Websites",
        paragraphs: [
          "In enterprise B2B sales, your website is rarely just a digital brochure—it is your most reliable frontline salesperson. Yet, the vast majority of B2B corporate websites take between 4.5 and 7 seconds to complete initial rendering on typical mobile and office connections.",
          "Every 100 milliseconds of latency degrades user attention. For enterprise decision-makers reviewing potential partners, a sluggish, unresponsive site signals technical debt and operational apathy before a single case study has even loaded.",
        ],
        callout:
          "Studies across enterprise procurement demonstrate that over 53% of B2B buyers abandon mobile research journeys if page rendering exceeds 3 seconds.",
      },
      {
        sectionId: "core-web-vitals-and-commercial-intent",
        heading: "Core Web Vitals as a Commercial Lever",
        paragraphs: [
          "Google's Core Web Vitals—specifically Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)—are not merely technical metrics for engineers; they represent the friction coefficient of your digital funnel.",
          "When architecting with Next.js App Router and React Server Components, server-side HTML streaming and edge static generation ensure that LCP routinely clocks in under 1.2 seconds, even on simulated 4G mobile connections.",
        ],
        bulletPoints: [
          "Static Pre-rendering: Critical landing pages render instantaneously from regional edge caches.",
          "Zero Layout Shift: Explicit image dimension reservations and font preloading eliminate jarring visual jumps.",
          "Sub-200ms INP: Minimal client-side JavaScript execution keeps interactive dropdowns and forms crisp and responsive.",
        ],
      },
      {
        sectionId: "security-and-maintenance-overhead",
        heading: "Eliminating WordPress Plugin Bloat",
        paragraphs: [
          "Traditional monolithic CMS setups often rely on 35 to 50 interdependent plugins for SEO, contact forms, caching, security firewalls, and analytics. Each plugin introduces third-party scripts, SQL query overhead, and continuous vulnerability patch obligations.",
          "A decoupled Next.js codebase written in TypeScript eliminates database exposure to public internet traffic, drastically reduces attack surfaces, and provides predictable, deterministic deployments through automated Git pipelines.",
        ],
      },
      {
        sectionId: "the-headless-future",
        heading: "Architecting for Long-Term Scale",
        paragraphs: [
          "Modern marketing teams do not have to sacrifice ease of editing to achieve technical excellence. By coupling Next.js with structured content models (such as MDX or headless content repositories), marketing leaders can publish new landing pages in minutes without worrying about breaking design system tokens or slowing down page speed.",
        ],
      },
    ],
    relatedSlugs: ["technical-seo-audit-framework", "meta-capi-server-side-tracking"],
  },
  {
    slug: "technical-seo-audit-framework",
    title: "The 10-Point Technical SEO Architecture Framework for 2025",
    description:
      "Eliminate crawl traps, indexation bloat, and broken schema to unlock compounding organic discovery from high-intent buyers.",
    publishedAt: "2025-02-01",
    author: {
      name: "Rhea Sen",
      role: "Lead SEO Strategist",
    },
    category: "SEO",
    tags: ["Technical SEO", "Schema Markup", "Search Intent", "Google Search Console"],
    readingTime: "8 min read",
    toc: [
      { id: "beyond-basic-keywords", title: "Beyond Basic Keywords: Intent Architecture" },
      { id: "resolving-index-bloat", title: "Diagnosing and Resolving Index Bloat" },
      { id: "schema-as-a-first-class-citizen", title: "Schema.org as a First-Class Citizen" },
      { id: "internal-linking-mechanics", title: "Internal Linking & PageRank Conservation" },
    ],
    content: [
      {
        sectionId: "beyond-basic-keywords",
        heading: "Beyond Basic Keywords: Intent Architecture",
        paragraphs: [
          "Search engines have evolved far beyond literal keyword matching. Modern search algorithms evaluate comprehensive topical depth, semantic entities, and whether a URL actually resolves the user's commercial problem.",
          "When ranking for competitive B2B phrases, websites must structure content around topical pillars and spoke articles that systematically address transactional, informational, and comparative search intents.",
        ],
      },
      {
        sectionId: "resolving-index-bloat",
        heading: "Diagnosing and Resolving Index Bloat",
        paragraphs: [
          "One of the most widespread issues discovered during technical audits is indexation bloat—where search bots waste precious crawl budget indexing empty tag archives, internal search result pages, and pagination variants.",
          "Proper implementation of self-referencing canonical tags, clean robots.txt directives, and targeted `noindex, follow` headers directs search crawlers strictly toward revenue-generating URLs.",
        ],
        bulletPoints: [
          "Audit indexed URLs vs. actual XML sitemap URLs in Google Search Console.",
          "Eliminate parameter URLs generated by faceted navigation filters.",
          "Resolve redirect chains (ensure all 301s resolve in a single hop).",
        ],
      },
      {
        sectionId: "schema-as-a-first-class-citizen",
        heading: "Schema.org as a First-Class Citizen",
        paragraphs: [
          "Structured data using JSON-LD provides direct semantic hints to search engine knowledge graphs. Rather than using surface-level snippets, implementing deep Organization, Service, FAQPage, and BreadcrumbList schemas directly in server-rendered templates elevates rich result visibility.",
        ],
        callout:
          "Rich snippets powered by valid Schema.org markup can boost click-through rates by up to 28% for high-intent transactional search queries.",
      },
      {
        sectionId: "internal-linking-mechanics",
        heading: "Internal Linking & PageRank Conservation",
        paragraphs: [
          "Your homepage often commands the highest external authority. By designing a strategic internal linking hierarchy—connecting primary service pages directly to related case studies and deep-dive technical briefs—you channel domain authority into the pages closest to sales conversion.",
        ],
      },
    ],
    relatedSlugs: ["engineering-nextjs-websites-for-b2b-conversion", "meta-capi-server-side-tracking"],
  },
  {
    slug: "meta-capi-server-side-tracking",
    title: "Server-Side Tracking & Meta CAPI: Recovering Ad Attribution",
    description:
      "How to overcome browser tracking restrictions, improve event match quality, and stabilize customer acquisition costs across paid channels.",
    publishedAt: "2025-02-18",
    author: {
      name: "Arjun Nair",
      role: "Performance Growth Director",
    },
    category: "Paid Advertising",
    tags: ["Performance Marketing", "Meta CAPI", "Attribution", "Google Analytics 4"],
    readingTime: "5 min read",
    toc: [
      { id: "the-death-of-client-pixels", title: "The Breakdown of Client-Side Pixels" },
      { id: "how-server-side-capi-works", title: "How Meta Conversions API (CAPI) Operates" },
      { id: "improving-event-match-quality", title: "Improving Event Match Quality" },
      { id: "impact-on-cac-and-roas", title: "Direct Commercial Impact on CAC" },
    ],
    content: [
      {
        sectionId: "the-death-of-client-pixels",
        heading: "The Breakdown of Client-Side Pixels",
        paragraphs: [
          "Third-party cookie deprecation, iOS privacy updates, and ad-blockers have crippled traditional browser-based tracking scripts. In many campaigns, 25% to 40% of conversion events fail to register in ad account dashboards.",
          "When ad algorithms lose signal, machine learning models cannot accurately identify which audience segments are actually purchasing, leading to erratic bidding and spiked customer acquisition costs.",
        ],
      },
      {
        sectionId: "how-server-side-capi-works",
        heading: "How Meta Conversions API (CAPI) Operates",
        paragraphs: [
          "Meta Conversions API creates a direct, server-to-server connection between your web application backend and Meta's advertising platform. Instead of relying on a fragile browser JavaScript pixel, the server securely dispatches hashed conversion telemetry in real time.",
        ],
        bulletPoints: [
          "Immune to browser ad-blockers and privacy extensions.",
          "Enables inclusion of server-verified order values and transaction IDs.",
          "Deduplication mechanisms ensure transactions are never counted twice.",
        ],
      },
      {
        sectionId: "improving-event-match-quality",
        heading: "Improving Event Match Quality",
        paragraphs: [
          "Event Match Quality (EMQ) scores dictate how effectively Meta can tie a conversion back to a real user account. Passing normalized, SHA-256 hashed customer parameters (such as email, phone number, and IP) raises EMQ scores from average (4–5/10) to superior (8.5–9.5/10).",
        ],
      },
      {
        sectionId: "impact-on-cac-and-roas",
        heading: "Direct Commercial Impact on CAC",
        paragraphs: [
          "With comprehensive server-side signal restoration, algorithmic bidding models can optimize against verified buyers instead of accidental clicks. In practice, clients regularly observe a 20% to 35% reduction in blended CAC within 30 days of clean tracking deployment.",
        ],
      },
    ],
    relatedSlugs: ["engineering-nextjs-websites-for-b2b-conversion", "technical-seo-audit-framework"],
  },
];
