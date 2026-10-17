"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `accordion-btn-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border transition-all duration-200 overflow-hidden",
              isOpen
                ? "bg-white border-[#7657FF]/40 shadow-sm"
                : "bg-white/80 border-[#E5E4E0] hover:border-[#17181C]/30"
            )}
          >
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657FF]"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#7657FF] font-semibold w-6 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display font-semibold text-base sm:text-lg text-[#17181C] leading-snug">
                    {item.question}
                  </span>
                </div>
                <div
                  className={cn(
                    "w-8 h-8 rounded-full border border-[#E5E4E0] flex items-center justify-center shrink-0 transition-transform duration-300",
                    isOpen
                      ? "rotate-180 bg-[#7657FF] border-[#7657FF] text-white"
                      : "bg-[#F7F6F2] text-[#686B73]"
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "transition-all duration-300 ease-in-out px-5 sm:px-6",
                isOpen
                  ? "max-h-96 pb-6 pt-0 opacity-100"
                  : "max-h-0 pb-0 pt-0 opacity-0 pointer-events-none"
              )}
            >
              <div className="pl-10 text-sm sm:text-base text-[#686B73] leading-relaxed border-t border-[#F7F6F2] pt-4">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
