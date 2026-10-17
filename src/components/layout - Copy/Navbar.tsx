"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, serviceLinks } from "@/data/site";
import { Logo } from "./Logo";
import { Button } from "@/ui/Button";
import { useScrolled } from "@/lib/hooks";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X, ArrowRight, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isScrolled = useScrolled(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleCtaClick = () => {
    trackEvent("consultation_cta_click", { location: "navbar" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#F7F6F2]/90 backdrop-blur-md border-b border-[#E5E4E0] py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            : "bg-transparent py-5 sm:py-6"
        )}
      >
        <div className="container-x flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Services with Accessible Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer",
                  pathname.startsWith("/services")
                    ? "text-[#7657FF] font-semibold"
                    : "text-[#17181C] hover:text-[#7657FF]"
                )}
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    servicesDropdownOpen && "rotate-180 text-[#7657FF]"
                  )}
                />
              </button>

              {/* Desktop Dropdown Content */}
              <div
                className={cn(
                  "absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white border border-[#E5E4E0] p-3 shadow-xl transition-all duration-200 origin-top-left",
                  servicesDropdownOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#686B73] px-3 py-1.5 font-semibold">
                  Core Disciplines
                </div>
                <div className="space-y-1">
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-start gap-3 p-2.5 rounded-xl transition-all",
                        pathname === item.href
                          ? "bg-[#7657FF]/10 text-[#7657FF]"
                          : "hover:bg-[#F7F6F2] text-[#17181C]"
                      )}
                    >
                      <span className="font-mono text-xs text-[#7657FF] font-bold mt-0.5">
                        {item.code}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-display font-semibold group-hover:text-[#7657FF] transition-colors">
                          {item.label}
                        </div>
                        <p className="text-xs text-[#686B73] line-clamp-1 mt-0.5">
                          {item.shortDesc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-[#E5E4E0] px-2">
                  <Link
                    href="/services"
                    className="flex items-center justify-between text-xs font-mono font-semibold text-[#7657FF] hover:underline p-1"
                  >
                    <span>View all services overview</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Standard Nav Links */}
            {nav
              .filter((n) => n.label !== "Services")
              .map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-2 rounded-full text-sm font-medium transition-colors",
                      isActive
                        ? "text-[#7657FF] font-semibold"
                        : "text-[#17181C] hover:text-[#7657FF]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>

          {/* Consultation Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              showArrow
              onClick={handleCtaClick}
            >
              Get a Free Consultation
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              onClick={handleCtaClick}
              className="text-xs px-3.5 h-9"
            >
              Consultation
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-[#17181C] hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657FF]"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className={cn(
            "absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#F7F6F2] border-l border-[#E5E4E0] p-6 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#E5E4E0]">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7657FF]"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6 text-[#17181C]" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="py-6 space-y-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#686B73] mb-2 px-2 font-semibold">
                  Disciplines
                </div>
                <div className="space-y-1">
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-[#7657FF] text-white font-semibold"
                          : "text-[#17181C] hover:bg-white"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-xs opacity-70">
                          {item.code}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E4E0]">
                <div className="font-mono text-xs uppercase tracking-wider text-[#686B73] mb-2 px-2 font-semibold">
                  Navigation
                </div>
                <div className="space-y-1">
                  {nav
                    .filter((n) => n.label !== "Services")
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block px-3 py-2.5 rounded-xl text-base font-display font-medium transition-colors",
                          pathname === item.href
                            ? "bg-[#7657FF] text-white font-semibold"
                            : "text-[#17181C] hover:bg-white"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Bottom CTA */}
          <div className="pt-6 border-t border-[#E5E4E0] space-y-3">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={handleCtaClick}
            >
              Get a Free Consultation
            </Button>
            <p className="text-center text-xs text-[#686B73] font-mono">
              Inquiries reviewed within 24 business hours
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
