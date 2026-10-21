"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFillDemo = () => {
    setEmail("info@digitalmarketingwithsid.com");
    setPassword("admin12345");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B0C10] relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#7657FF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#D9FF70]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7657FF]/10 border border-[#7657FF]/25 text-[#D9FF70] text-xs font-mono font-medium mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-[#7657FF]" />
            <span>STUDIO CONTROL PANEL</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
            Admin Authentication
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-body">
            Sign in to manage dynamic services, uploads, and public catalog visibility.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#12131A] border border-[#2B2D38] rounded-3xl p-8 shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold mb-2">
                Administrator Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="info@digitalmarketingwithsid.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#1A1C26] border border-[#303342] rounded-xl text-white text-sm focus:outline-none focus:border-[#7657FF] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#1A1C26] border border-[#303342] rounded-xl text-white text-sm focus:outline-none focus:border-[#7657FF] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#7657FF] hover:bg-[#6242EC] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(118,87,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-8 pt-6 border-t border-[#232533]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 font-mono">Demo Credentials</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[#D9FF70] hover:underline font-mono text-xs font-semibold cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <p className="text-xs font-mono text-gray-500 mt-1">
              info@digitalmarketingwithsid.com / admin12345
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-mono text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            <span>← Back to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
