import React from "react";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Container } from "@/ui/Container";
import { Reveal } from "@/motion/Reveal";
import { constructMetadata } from "@/lib/seo";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Growth Intelligence & Technical Articles",
  description:
    "Engineering breakdowns, technical SEO strategies, server-side tracking setups, and conversion optimization insights.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#F7F6F2]">
      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-6 mb-16">
          <Reveal>
            <div className="eyebrow bg-[#7657FF]/10 px-3.5 py-1.5 rounded-full border border-[#7657FF]/20">
              <Sparkles className="h-3.5 w-3.5 text-[#7657FF]" />
              <span>GROWTH INTELLIGENCE & TECHNICAL ARTICLES</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#17181C] tracking-tight leading-[1.1]">
              Engineering & Performance Insights.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="font-body text-lg sm:text-xl text-[#686B73] leading-relaxed">
              In-depth research and technical guides authored by our architects on web performance, modern SEO architecture, and paid customer acquisition.
            </p>
          </Reveal>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <Reveal key={post.slug} delay={idx * 80}>
              <ArticleCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
