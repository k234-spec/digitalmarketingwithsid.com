"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TOCProps {
  items: { id: string; title: string }[];
}

export const TableOfContents: React.FC<TOCProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl bg-white border border-[#E5E4E0] p-6 space-y-3"
    >
      <span className="font-mono text-xs uppercase tracking-wider text-[#17181C] font-semibold block">
        Table of Contents
      </span>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-xs sm:text-sm text-[#686B73] hover:text-[#7657FF] transition-colors flex items-start gap-2"
            >
              <span className="font-mono text-xs text-[#7657FF] opacity-80 mt-0.5">
                0{idx + 1}.
              </span>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
