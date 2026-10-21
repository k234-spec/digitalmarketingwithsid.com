export interface BrandConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  location: string;
  markets: string[];
  operatingHours: string;
  closingStatement: string;
}

export const brand: BrandConfig = {
  name: "Digital Marketing with Sid",
  shortName: "Digital Marketing with Sid",
  tagline: "Turn Your Digital Presence Into Business Growth.",
  description:
    "We build high-performing websites, compelling brands, and data-driven marketing systems that help ambitious businesses attract the right audience and convert attention into revenue.",
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmarketingwithsid.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@digitalmarketingwithsid.com",
  phone: "+91 84478 86310",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918447886310",
  location: "Bengaluru & Mumbai, India (Global Delivery)",
  markets: ["India", "United States", "United Kingdom", "UAE", "Singapore"],
  operatingHours: "Monday – Friday: 9:30 AM – 6:30 PM IST",
  closingStatement: "STRATEGY WITH PURPOSE. CREATIVE WITH INTENT. GROWTH WITH MEASUREMENT.",
} as const;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export const nav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export interface ServiceLinkItem {
  label: string;
  href: string;
  shortDesc: string;
  code: string;
}

export const serviceLinks: ServiceLinkItem[] = [
  {
    label: "Website Development",
    href: "/services/website-development",
    shortDesc: "High-performance, conversion-engineered digital platforms.",
    code: "01",
  },
  {
    label: "Social Media Marketing",
    href: "/services/social-media-marketing",
    shortDesc: "Engaging content systems that build authority and organic reach.",
    code: "02",
  },
  {
    label: "Performance Marketing",
    href: "/services/performance-marketing",
    shortDesc: "Targeted paid campaigns optimized for ROI, ROAS, and qualified leads.",
    code: "03",
  },
  {
    label: "Search Engine Optimization",
    href: "/services/seo",
    shortDesc: "Technical audits, keyword architecture, and organic rank growth.",
    code: "04",
  },
  {
    label: "Graphic Design & Branding",
    href: "/services/branding-graphic-design",
    shortDesc: "Distinctive brand identities, typography systems, and design systems.",
    code: "05",
  },
];

export const industriesServed = [
  { name: "Manufacturing", focus: "B2B Lead Generation & Global Export Discovery" },
  { name: "E-commerce", focus: "D2C Scaling, Retention & Performance ROAS" },
  { name: "Professional Services", focus: "High-Ticket Client Acquisition & Authority" },
  { name: "Technology & SaaS", focus: "Product Marketing, Demo Inquiries & Conversion Rate" },
  { name: "Consumer Brands", focus: "Omnichannel Awareness & Community Engagement" },
];

export const agencyValues = [
  {
    number: "01",
    title: "Truth in Data",
    desc: "We prioritize verified conversions and actual pipeline impact over vanity metrics and impression totals.",
  },
  {
    number: "02",
    title: "Engineering Precision",
    desc: "Sub-second load times, accessible user experiences, and clean codebases that stand the test of time.",
  },
  {
    number: "03",
    title: "Commercial Focus",
    desc: "Every creative element, layout choice, and copy variation is calibrated to drive qualified business inquiries.",
  },
  {
    number: "04",
    title: "Transparent Partnership",
    desc: "Direct communication, weekly sprint reporting, and zero lock-in barriers. We earn trust through accountability.",
  },
];
