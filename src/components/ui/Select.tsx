import React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  dark?: boolean;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, dark = false, id, required, options, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "block text-xs font-mono font-medium uppercase tracking-wider",
              dark ? "text-gray-300" : "text-[#17181C]"
            )}
          >
            {label} {required && <span className="text-[#7657FF]">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none cursor-pointer pr-10",
              dark
                ? "bg-[#1F2128] border border-[#303139] text-white focus:border-[#7657FF] focus:ring-1 focus:ring-[#7657FF]"
                : "bg-white border border-[#E5E4E0] text-[#17181C] focus:border-[#7657FF] focus:ring-1 focus:ring-[#7657FF]",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          >
            <option value="" disabled className={dark ? "bg-[#1F2128] text-gray-400" : "bg-white text-gray-400"}>
              Select an option...
            </option>
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className={dark ? "bg-[#1F2128] text-white" : "bg-white text-[#17181C]"}
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-500 font-mono mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
