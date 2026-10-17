import type { Metadata } from "next";
import { brand } from "@/data/site";

export const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmarketingwithsid.com";

export function constructMetadata({
  title,
  description = brand.description,
  path = "",
  image = "/images/og-image.png",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const fullTitle = title ? `${title} | ${brand.name}` : `${brand.name} — ${brand.tagline}`;
  const canonicalUrl = `${defaultSiteUrl}${path}`;
  const ogImageUrl = image.startsWith("http") ? image : `${defaultSiteUrl}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(defaultSiteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: brand.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    legalName: brand.name,
    url: defaultSiteUrl,
    logo: `${defaultSiteUrl}/images/brand/logo.svg`,
    description: brand.description,
    email: brand.email,
    telephone: brand.phone,
    areaServed: brand.markets,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "India",
    },
    sameAs: [
      "https://linkedin.com/company/digitalmarketingwithsid",
      "https://x.com/marketingwithsid",
      "https://instagram.com/digitalmarketingwithsid",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: defaultSiteUrl,
    description: brand.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${defaultSiteUrl}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateServiceSchema(service: {
  title: string;
  summary: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: defaultSiteUrl,
    },
    description: service.summary,
    url: `${defaultSiteUrl}/services/${service.slug}`,
    areaServed: brand.markets,
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: {
        "@type": "ImageObject",
        url: `${defaultSiteUrl}/images/brand/logo.svg`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: `${defaultSiteUrl}/blog/${article.slug}`,
  };
}
