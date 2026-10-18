"use client";

import React, { Suspense, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { GrowthGeometry } from "./GrowthGeometry";
import { SceneFallback } from "./SceneFallback";

interface CanvasProps {
  tier: 1 | 2;
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Three.js Canvas caught an error, falling back to 2D dashboard:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const HeroSceneCanvas: React.FC<CanvasProps> = ({ tier }) => {
  return (
    <ThreeErrorBoundary fallback={<SceneFallback />}>
      <div className="relative w-full aspect-square max-w-[540px] mx-auto select-none rounded-3xl overflow-hidden bg-[#111318] border border-[#303139] shadow-[0_24px_64px_rgba(17,19,24,0.35)] group">
        {/* Real-time Engine Status Pill */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#181A20]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span className="flex h-2 w-2 rounded-full bg-[#D9FF70] animate-pulse" />
          <span className="font-mono text-[10px] text-gray-300 tracking-wider uppercase font-semibold">
            Real-Time 3D Engine · Tier {tier}
          </span>
        </div>

        {/* Interactive Pointer Hint */}
        <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            Interactive · Move Cursor
          </span>
        </div>

        {/* Three.js Canvas */}
        <Canvas
          camera={{ position: [0, 1.2, 5.2], fov: 42 }}
          dpr={tier === 2 ? [1, 2] : 1}
          gl={{
            antialias: tier === 2,
            alpha: true,
            powerPreference: "high-performance",
            depth: true,
            stencil: false,
          }}
          onCreated={(state) => {
            state.gl.toneMapping = THREE.AgXToneMapping;
            state.gl.toneMappingExposure = 1.15;
          }}
        >
          {/* Calibrated Studio Lighting */}
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 8, 5]} intensity={1.4} color="#FFFFFF" />
          <pointLight position={[-4, 2, -2]} intensity={2.2} color="#7657FF" distance={12} />
          <pointLight position={[3, 3, 2]} intensity={1.5} color="#D9FF70" distance={10} />

          <Suspense fallback={null}>
            <Float
              speed={2}
              rotationIntensity={tier === 2 ? 0.2 : 0.05}
              floatIntensity={tier === 2 ? 0.35 : 0.1}
            >
              <GrowthGeometry qualityTier={tier} />
            </Float>

            {/* Ground Contact Shadow */}
            {tier === 2 && (
              <ContactShadows
                position={[0, -1.25, 0]}
                opacity={0.65}
                scale={7}
                blur={2.4}
                far={4}
                color="#7657FF"
              />
            )}
          </Suspense>
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
};
