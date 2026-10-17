import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  dark?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, dark = false, id, required, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "block text-xs font-mono font-medium uppercase tracking-wider",
              dark ? "text-gray-300" : "text-[#17181C]"
            )}
          >
            {label} {required && <span className="text-[#7657FF]">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={4}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none resize-y",
            dark
              ? "bg-[#1F2128] border border-[#303139] text-white placeholder-gray-500 focus:border-[#7657FF] focus:ring-1 focus:ring-[#7657FF]"
              : "bg-white border border-[#E5E4E0] text-[#17181C] placeholder-gray-400 focus:border-[#7657FF] focus:ring-1 focus:ring-[#7657FF]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500 font-mono mt-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
