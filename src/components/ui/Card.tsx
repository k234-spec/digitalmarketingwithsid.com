import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "bordered" | "interactive";
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-white border border-[#E5E4E0] shadow-sm",
    dark: "bg-[#181A20] border border-[#303139] text-white",
    bordered: "bg-transparent border border-[#E5E4E0]",
    interactive:
      "bg-white border border-[#E5E4E0] shadow-sm hover:border-[#7657FF]/40 hover:shadow-[0_12px_32px_rgba(118,87,255,0.08)] transition-all duration-300",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 sm:p-8 transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
