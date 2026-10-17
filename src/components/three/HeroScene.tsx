"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SceneFallback } from "./SceneFallback";
import { useQualityTier } from "@/lib/hooks";

// Dynamically import Canvas and GrowthGeometry with ssr: false
const CanvasView = dynamic(
  () =>
    import("@react-three/fiber").then((mod) => {
      const { Canvas } = mod;
      return function DynamicCanvas({
        tier,
      }: {
        tier: 1 | 2;
      }) {
        // Dynamically import GrowthGeometry
        const { GrowthGeometry } = require("./GrowthGeometry");
        return (
          <div className="relative w-full aspect-square max-w-[540px] mx-auto select-none rounded-3xl overflow-hidden bg-[#111318] border border-[#303139] shadow-[0_24px_64px_rgba(17,19,24,0.35)]">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#D9FF70] animate-pulse" />
              <span className="font-mono text-[10px] text-gray-300 tracking-wider uppercase font-semibold">
                Real-Time 3D Engine · Tier {tier}
              </span>
            </div>
            <Canvas
              camera={{ position: [0, 1.2, 5.2], fov: 42 }}
              dpr={tier === 2 ? [1, 2] : 1}
              gl={{ antialias: tier === 2, alpha: true, powerPreference: "high-performance" }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[4, 8, 4]} intensity={1.5} color="#FFFFFF" />
              <pointLight position={[-4, 2, -2]} intensity={2.0} color="#7657FF" />
              <pointLight position={[2, 3, 2]} intensity={1.2} color="#D9FF70" />
              <Suspense fallback={null}>
                <GrowthGeometry qualityTier={tier} />
              </Suspense>
            </Canvas>
          </div>
        );
      };
    }),
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

  if (!mounted || qualityTier === 0) {
    return <SceneFallback />;
  }

  return (
    <div className="relative w-full flex items-center justify-center">
      <CanvasView tier={qualityTier} />
    </div>
  );
};
