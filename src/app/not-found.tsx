import React from "react";
import Link from "next/link";
import { Container } from "@/ui/Container";
import { Button } from "@/ui/Button";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-32 pb-24 bg-[#F7F6F2]">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7657FF] bg-[#7657FF]/10 px-3.5 py-1.5 rounded-full border border-[#7657FF]/20 font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ERROR 404 · PAGE NOT LOCATED</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl text-[#17181C] tracking-tight">
            Lost in the Architecture.
          </h1>

          <p className="font-body text-[#686B73] text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            The page you requested may have moved or no longer exists. Let&apos;s guide you back to our active growth systems.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" variant="primary" size="md" showArrow>
              Return to Homepage
            </Button>
            <Button href="/services" variant="secondary" size="md">
              Explore Services
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
