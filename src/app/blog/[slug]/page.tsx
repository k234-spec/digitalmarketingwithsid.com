import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { Reveal } from "@/motion/Reveal";
import { constructMetadata, generateArticleSchema } from "@/lib/seo";
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2 } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return constructMetadata({ title: "Article Not Found" });
  }

  return constructMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => post.relatedSlugs.includes(p.slug));

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
  });

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#F7F6F2]">
      {/* Schema.org Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article Header */}
      <section className="pb-16 border-b border-[#E5E4E0]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#686B73] hover:text-[#17181C] transition-colors mr-2"
                >
                  <ArrowLeft className="h-3 w-3" /> All Articles
                </Link>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#7657FF]/10 text-[#7657FF]">
                  {post.category}
                </span>
                <span className="font-mono text-xs text-[#686B73] flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime}
                </span>
                <span className="font-mono text-xs text-[#686B73] flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.publishedAt}
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#17181C] tracking-tight leading-[1.1]">
                {post.title}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-body text-lg sm:text-xl text-[#686B73] leading-relaxed">
                {post.description}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="pt-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7657FF] text-white flex items-center justify-center font-display font-bold text-sm">
                  {post.author.name[0]}
                </div>
                <div>
                  <div className="font-display font-semibold text-sm text-[#17181C]">
                    {post.author.name}
                  </div>
                  <div className="font-mono text-xs text-[#686B73]">
                    {post.author.role}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Body Text */}
            <div className="lg:col-span-8 space-y-12 max-w-3xl">
              {post.content.map((sec, i) => (
                <div key={i} id={sec.sectionId} className="space-y-4 scroll-mt-28">
                  {sec.heading && (
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17181C] pt-2 border-t border-[#E5E4E0]/60">
                      {sec.heading}
                    </h2>
                  )}

                  {sec.subheading && (
                    <h3 className="font-display font-semibold text-lg text-[#17181C]">
                      {sec.subheading}
                    </h3>
                  )}

                  {sec.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="font-body text-base sm:text-lg text-[#17181C]/90 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}

                  {sec.callout && (
                    <div className="my-6 p-6 rounded-2xl bg-white border-l-4 border-[#7657FF] shadow-sm">
                      <p className="font-display font-medium text-base sm:text-lg text-[#17181C] italic">
                        &ldquo;{sec.callout}&rdquo;
                      </p>
                    </div>
                  )}

                  {sec.bulletPoints && (
                    <ul className="space-y-2.5 my-4">
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#17181C]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7657FF] shrink-0 mt-2.5" />
                          <span className="leading-relaxed">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Tags */}
              <div className="pt-8 border-t border-[#E5E4E0] flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#686B73]">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono bg-white border border-[#E5E4E0] px-3 py-1 rounded-full text-[#17181C]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Sticky Sidebar: TOC and CTA */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <TableOfContents items={post.toc} />

              <div className="rounded-2xl bg-white border border-[#E5E4E0] text-[#17181C] p-6 space-y-4 shadow-sm">
                <span className="font-mono text-xs uppercase tracking-wider text-[#7657FF] font-semibold block">
                  Commercial Diagnostic
                </span>
                <h4 className="font-display font-bold text-lg text-[#17181C]">
                  Want an Audit of Your Stack?
                </h4>
                <p className="text-xs text-[#686B73] leading-relaxed">
                  We review your Core Web Vitals, server-side tracking, and conversion bottlenecks free of charge.
                </p>
                <Button href="/contact" variant="primary" size="sm" className="w-full justify-center">
                  Request an Audit
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#F7F6F2] border-t border-[#E5E4E0]">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h3 className="section-heading text-2xl sm:text-3xl">Related Insights</h3>
              <Link
                href="/blog"
                className="font-mono text-xs font-semibold text-[#7657FF] hover:underline flex items-center gap-1"
              >
                <span>All Articles</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((r) => (
                <div
                  key={r.slug}
                  className="rounded-2xl bg-white border border-[#E5E4E0] p-6 space-y-3 hover:border-[#7657FF]/40 transition-colors shadow-sm"
                >
                  <span className="font-mono text-xs font-semibold text-[#7657FF]">{r.category}</span>
                  <h4 className="font-display font-bold text-xl text-[#17181C]">
                    <Link href={`/blog/${r.slug}`} className="hover:text-[#7657FF] transition-colors">
                      {r.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-[#686B73] line-clamp-2">{r.description}</p>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#7657FF]"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
