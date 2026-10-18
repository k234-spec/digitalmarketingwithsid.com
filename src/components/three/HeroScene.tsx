"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SceneFallback } from "./SceneFallback";
import { useQualityTier } from "@/lib/hooks";

// Dynamically import HeroSceneCanvas with SSR disabled
const HeroSceneCanvas = dynamic(
  () => import("./HeroSceneCanvas").then((mod) => mod.HeroSceneCanvas),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

export const HeroScene: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const qualityTier = useQualityTier();

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or on Tier 0 (low power / reduced motion / no WebGL), render the 2D telemetry dashboard
  if (!mounted || qualityTier === 0) {
    return <SceneFallback />;
  }

  return (
    <div className="relative w-full flex items-center justify-center">
      <HeroSceneCanvas tier={qualityTier} />
    </div>
  );
};
