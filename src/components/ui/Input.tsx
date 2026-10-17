import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  dark?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, dark = false, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-xs font-mono font-medium uppercase tracking-wider",
              dark ? "text-gray-300" : "text-[#17181C]"
            )}
          >
            {label} {required && <span className="text-[#7657FF]">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none",
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

Input.displayName = "Input";
