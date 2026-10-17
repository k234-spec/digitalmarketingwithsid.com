import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "dark" | "ghost" | "lime";
  size?: "sm" | "md" | "lg";
  href?: string;
  showArrow?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      showArrow = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-9 px-4 text-xs tracking-wider",
      md: "h-11 px-6 text-sm tracking-wide",
      lg: "h-13 px-8 text-base tracking-wide font-medium",
    };

    const variantClasses = {
      primary:
        "bg-[#7657FF] text-white hover:bg-[#6242EC] active:scale-[0.98] border border-transparent shadow-[0_4px_16px_rgba(118,87,255,0.25)]",
      secondary:
        "bg-white text-[#17181C] hover:bg-[#F3F2EE] active:scale-[0.98] border border-[#E5E4E0] shadow-sm",
      outline:
        "bg-transparent text-[#17181C] hover:bg-[#17181C]/5 active:scale-[0.98] border border-[#17181C]/20 hover:border-[#17181C]",
      dark:
        "bg-[#111318] text-white hover:bg-[#1F2128] active:scale-[0.98] border border-[#303139]",
      lime:
        "bg-[#D9FF70] text-[#111318] hover:bg-[#C8F552] active:scale-[0.98] font-semibold border border-transparent shadow-[0_4px_16px_rgba(217,255,112,0.3)]",
      ghost:
        "bg-transparent text-[#17181C] hover:bg-black/5 active:scale-[0.98] border border-transparent",
    };

    const baseClasses = cn(
      "group inline-flex items-center justify-center gap-2 rounded-full font-display cursor-pointer transition-all duration-200 select-none disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657FF] focus-visible:ring-offset-2",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    const content = (
      <>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        <span>{children}</span>
        {showArrow && !isLoading && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
