"use client";

import React from "react";
import { ArrowUpRight, BarChart3, TrendingUp, Users, Target, ShieldCheck } from "lucide-react";

export const SceneFallback: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[540px] mx-auto select-none">
      {/* Background ambient glowing rings */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#7657FF]/20 via-[#B8A7FF]/10 to-[#D9FF70]/15 blur-2xl -z-10" />

      {/* Main Dimensional Dashboard Container */}
      <div className="relative w-full h-full rounded-3xl bg-[#111318] border border-[#303139] p-5 sm:p-7 shadow-[0_24px_64px_rgba(17,19,24,0.35)] flex flex-col justify-between overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#7657FF 1px, transparent 1px), radial-gradient(#D9FF70 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        {/* Dashboard Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#303139] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-2 font-mono text-[11px] text-gray-400 font-semibold tracking-wider">
              GROWTH_ORCHESTRATOR.SYS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#D9FF70] animate-pulse" />
            <span className="font-mono text-[10px] text-[#D9FF70] tracking-wider uppercase font-semibold">
              Live Telemetry
            </span>
          </div>
        </div>

        {/* Middle: Interactive-looking KPI Panels */}
        <div className="relative z-10 grid grid-cols-2 gap-3.5 my-4">
          {/* Panel 1: Conversion Rate */}
          <div className="rounded-2xl bg-[#181A20] border border-[#303139] p-4 transition-transform hover:-translate-y-1 duration-200">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider">Conversion Velocity</span>
              <TrendingUp className="h-4 w-4 text-[#D9FF70]" />
            </div>
            <div className="font-display text-2xl font-bold text-white flex items-baseline gap-1.5">
              <span>+41.8%</span>
              <span className="font-mono text-[11px] text-[#D9FF70] font-normal">QoQ</span>
            </div>
            <div className="mt-2.5 h-1.5 w-full bg-[#303139] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7657FF] to-[#D9FF70] w-[78%] rounded-full" />
            </div>
          </div>

          {/* Panel 2: Pipeline Generated */}
          <div className="rounded-2xl bg-[#181A20] border border-[#303139] p-4 transition-transform hover:-translate-y-1 duration-200">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider">Attributed Pipeline</span>
              <Target className="h-4 w-4 text-[#7657FF]" />
            </div>
            <div className="font-display text-2xl font-bold text-white flex items-baseline gap-1.5">
              <span>₹4.2 Cr</span>
              <span className="font-mono text-[11px] text-gray-400 font-normal">Active</span>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
              <ShieldCheck className="h-3 w-3 text-[#7657FF]" />
              <span>Verified CRM Match</span>
            </div>
          </div>
        </div>

        {/* Dynamic Vector Graph Visualization */}
        <div className="relative z-10 rounded-2xl bg-[#181A20] border border-[#303139] p-4">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-mono text-[10px] uppercase text-gray-400">
              Multi-Touch Attribution Funnel
            </span>
            <span className="font-mono text-[10px] text-[#7657FF] font-semibold">
              ROAS: 4.85x
            </span>
          </div>

          {/* SVG Smooth Curve */}
          <div className="relative h-24 w-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 320 80"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="gradientCurve" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7657FF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#7657FF" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill area */}
              <path
                d="M0,70 Q40,65 80,48 T160,35 T240,18 T320,8 L320,80 L0,80 Z"
                fill="url(#gradientCurve)"
              />
              {/* Glowing stroke */}
              <path
                d="M0,70 Q40,65 80,48 T160,35 T240,18 T320,8"
                fill="none"
                stroke="#7657FF"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Peak Accent Dot */}
              <circle cx="320" cy="8" r="4.5" fill="#D9FF70" />
            </svg>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#303139]/50 text-[10px] font-mono text-gray-500">
            <span>WEEK 01 (AUDIT)</span>
            <span>WEEK 04 (LAUNCH)</span>
            <span>WEEK 08 (SCALE)</span>
          </div>
        </div>

        {/* Bottom Floating Pill Badge */}
        <div className="relative z-10 mt-3 pt-3 flex items-center justify-between border-t border-[#303139] text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#7657FF]/20 flex items-center justify-center">
              <BarChart3 className="h-3 w-3 text-[#7657FF]" />
            </div>
            <span className="font-mono text-[11px] text-gray-300">
              Core Web Vitals: 99/100
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#D9FF70] bg-[#D9FF70]/10 border border-[#D9FF70]/30 px-2.5 py-0.5 rounded-full font-semibold">
            OPTIMIZED
          </span>
        </div>
      </div>
    </div>
  );
};
