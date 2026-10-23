"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number | string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  duration = 1600,
  prefix: propPrefix,
  suffix: propSuffix,
  decimals: propDecimals,
  className,
}) => {
  let targetNum = typeof value === "number" ? value : 0;
  let prefix = propPrefix || "";
  let suffix = propSuffix || "";
  let decimals = propDecimals !== undefined ? propDecimals : 0;
  let isParsable = true;

  if (typeof value === "string") {
    // Matches prefix (e.g., "+", "~", "$"), number (e.g., "1.1", "38", "99"), and suffix (e.g., "s", "%", "/100", " / 10")
    const match = value.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (match) {
      prefix = propPrefix !== undefined ? propPrefix : match[1];
      targetNum = parseFloat(match[2]);
      suffix = propSuffix !== undefined ? propSuffix : match[3];
      if (propDecimals === undefined) {
        decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
      }
    } else {
      isParsable = false;
    }
  }

  const [current, setCurrent] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isParsable) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(targetNum);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic: 1 - (1 - progress)^3 for natural deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCurrent(easeProgress * targetNum);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCurrent(targetNum);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNum, duration, isParsable]);

  if (!isParsable && typeof value === "string") {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
};

