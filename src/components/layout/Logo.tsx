import React from "react";
import Link from "next/link";
import Image from "next/image";
import { brand } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  dark?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ dark = false, className }) => {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center transition-all duration-200 focus-visible:outline-none select-none",
        className
      )}
      aria-label={`${brand.name} Homepage`}
    >
      <div
        className={cn(
          "relative flex items-center transition-all duration-200",
          "hover:opacity-90"
        )}
      >
        <Image
          src={dark ? "/images/brand/logo-dark.png" : "/images/brand/logo.png"}
          alt="Digital Marketing with Sid"
          width={190}
          height={58}
          priority
          className="h-8 sm:h-9 md:h-10 w-auto object-contain"
        />
      </div>
    </Link>
  );
};
