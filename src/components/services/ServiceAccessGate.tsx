"use client";

import React from "react";
import { useUserAuth } from "@/components/auth/AuthContext";
import { isPublicService, COMPANY_NOREPLY_EMAIL } from "@/lib/auth/user-constants";
import { Lock, Sparkles, ArrowRight, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";
import { Container } from "@/ui/Container";

interface ServiceAccessGateProps {
  serviceSlug: string;
  serviceTitle: string;
  children: React.ReactNode;
}

export const ServiceAccessGate: React.FC<ServiceAccessGateProps> = ({
  serviceSlug,
  serviceTitle,
  children,
}) => {
  const { isAuthenticated, openLoginModal } = useUserAuth();

  const isPublic = isPublicService(serviceSlug);
  const isAccessible = isAuthenticated || isPublic;

  if (isAccessible) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Access Gate Interstitial Banner */}
      <section className="py-12 bg-[#111318] text-white border-y border-[#303139] relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#7657FF]/15 rounded-full blur-[100px] pointer-events-none" />

        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7657FF]/20 border border-[#7657FF]/40 text-[#D9FF70] text-xs font-mono font-medium">
              <Lock className="h-3.5 w-3.5 text-[#D9FF70]" />
              <span>To unlock more features sign in</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              To Unlock More Features Sign In
            </h2>

            <p className="text-gray-300 text-sm sm:text-base font-body leading-relaxed max-w-xl mx-auto">
              Our advanced workflow schedules, execution roadmaps, and commercial KPI targets for this discipline are exclusively visible to authenticated accounts.
            </p>

            {/* Official Sender Notice */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF70]" />
              <span>OTPs dispatched from {COMPANY_NOREPLY_EMAIL}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openLoginModal("phone")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#7657FF] hover:bg-[#6242EC] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_4px_20px_rgba(118,87,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Log In with Mobile Number</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => openLoginModal("google")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-[#17181C] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign In with Google</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Teaser Preview with blur */}
      <div className="relative filter blur-[5px] opacity-30 select-none pointer-events-none">
        {children}
      </div>
    </div>
  );
};
