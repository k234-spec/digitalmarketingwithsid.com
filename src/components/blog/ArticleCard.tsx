import React from "react";
import Link from "next/link";
import { BlogPost } from "@/data/blog";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface ArticleCardProps {
  post: BlogPost;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ post }) => {
  return (
    <article className="group h-full rounded-3xl bg-white border border-[#E5E4E0] p-6 sm:p-8 flex flex-col justify-between hover:border-[#7657FF]/40 hover:shadow-lg transition-all duration-300">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#7657FF]/10 text-[#7657FF]">
            {post.category}
          </span>
          <span className="font-mono text-xs text-[#686B73] flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl sm:text-2xl text-[#17181C] mb-3 group-hover:text-[#7657FF] transition-colors leading-snug">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-sm text-[#686B73] leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#E5E4E0] flex items-center justify-between text-xs font-mono text-[#686B73]">
        <div className="flex items-center gap-2">
          <span>By {post.author.name}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 font-bold text-[#7657FF] group-hover:text-[#6242EC]"
        >
          <span>Read Article</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};
