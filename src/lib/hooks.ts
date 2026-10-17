"use client";

import { useEffect, useState } from "react";

export type QualityTier = 0 | 1 | 2;

export function useQualityTier(): QualityTier {
  const [tier, setTier] = useState<QualityTier>(1);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTier(0);
      return;
    }

    // Check device memory / hardware concurrency if supported
    const nav = navigator as unknown as {
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };

    const isMobile = window.innerWidth < 768;
    const lowMemory = nav.deviceMemory && nav.deviceMemory <= 4;
    const lowCores = nav.hardwareConcurrency && nav.hardwareConcurrency <= 4;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) {
        setTier(0);
        return;
      }
    } catch {
      setTier(0);
      return;
    }

    if (isMobile || lowMemory || lowCores) {
      setTier(1);
    } else {
      setTier(2);
    }
  }, []);

  return tier;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return reduced;
}

export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
