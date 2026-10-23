"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUserAuth } from "./AuthContext";
import { brand } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  X,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  KeyRound,
  UserPlus,
  LogIn,
} from "lucide-react";

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeLoginModal,
    signInWithGoogle,
  } = useUserAuth();

  const [authMode, setAuthMode] = useState<"signin" | "signup" | "recovery">("signin");
  const [googleEmail, setGoogleEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpStep, setOtpStep] = useState<"input" | "verify">("input");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Reset state on open/close
  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMsg("");
      setSuccessNotice("");
      setOtpStep("input");
      setOtpCode("");
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAuthModalOpen]);

  // Keyboard accessibility: Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeLoginModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeLoginModal]);

  // Resend timer countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  if (!isAuthModalOpen) return null;

  // Step 1: Send OTP to Google Account Email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessNotice("");

    const target = googleEmail.trim();
    if (!target) {
      setErrorMsg("Please enter your Google account email address.");
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(target)) {
      setErrorMsg("Please enter a valid Google email address.");
      return;
    }

    setLoading(true);

    const res = await signInWithGoogle(target, undefined, userName);
    setLoading(false);

    if (res.success) {
      setSuccessNotice("Verification code sent! Please check your Google account email.");
      setOtpStep("verify");
      setResendCooldown(60);
    } else {
      if (res.cooldownRemaining) {
        setResendCooldown(res.cooldownRemaining);
      }
      setErrorMsg(res.error || "Unable to send the verification code. Please try again.");
    }
  };

  // Step 2: Verify OTP for Google Account
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const code = otpCode.trim();
    if (!code || code.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);

    const res = await signInWithGoogle(googleEmail.trim(), code, userName);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Invalid verification code for Google account.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeLoginModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#111318] border border-[#303139] p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)] z-10 text-white overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7657FF]/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D9FF70]/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7657FF]/20 border border-[#7657FF]/40 text-[#D9FF70] text-xs font-mono font-medium mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D9FF70]" />
              <span>SECURE GOOGLE AUTHENTICATION</span>
            </div>
            <h3
              id="auth-modal-title"
              className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight"
            >
              {authMode === "signup"
                ? "Sign Up with Google"
                : authMode === "recovery"
                ? "Google Account Recovery"
                : "Sign In with Google"}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-body mt-1">
              {authMode === "signup"
                ? "Create your account using your Google email to receive an instant verification code."
                : authMode === "recovery"
                ? "Enter your Google account email to verify ownership and instantly restore access."
                : "Enter your Google email to authenticate and unlock client services."}
            </p>
          </div>

          <button
            type="button"
            onClick={closeLoginModal}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Workflow Mode Selector (Sign In / Sign Up / Recovery) */}
        {otpStep === "input" && (
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#181A20] border border-[#2b2d3d] mb-5 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setAuthMode("signin");
                setErrorMsg("");
                setSuccessNotice("");
              }}
              className={cn(
                "py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer",
                authMode === "signin"
                  ? "bg-[#7657FF] text-white font-bold shadow-sm"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <LogIn className="h-3.5 w-3.5 shrink-0" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setErrorMsg("");
                setSuccessNotice("");
              }}
              className={cn(
                "py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer",
                authMode === "signup"
                  ? "bg-[#7657FF] text-white font-bold shadow-sm"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <UserPlus className="h-3.5 w-3.5 shrink-0" />
              <span>Sign Up</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("recovery");
                setErrorMsg("");
                setSuccessNotice("");
              }}
              className={cn(
                "py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer",
                authMode === "recovery"
                  ? "bg-[#7657FF] text-white font-bold shadow-sm"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <KeyRound className="h-3.5 w-3.5 shrink-0" />
              <span>Recovery</span>
            </button>
          </div>
        )}

        {/* Google Authentication Badge */}
        <div className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-gray-300">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
            <span>
              Google Identity Verification via <strong className="text-white">EmailJS OTP</strong>
            </span>
          </div>
          <span className="text-[#D9FF70] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D9FF70]/10 border border-[#D9FF70]/30">
            TLS Protected
          </span>
        </div>

        {/* Error Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Success / Status Banner */}
        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* STEP 1: GOOGLE EMAIL INPUT FORM */}
        {otpStep === "input" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold mb-2">
                Google Account Email Address *
              </label>

              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4"
                  viewBox="0 0 24 24"
                >
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

                <input
                  ref={inputRef}
                  type="email"
                  required
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#181A20] border border-[#303139] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#7657FF] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold mb-2">
                Full Name {authMode === "signup" ? "*" : "(Optional)"}
              </label>
              <input
                type="text"
                required={authMode === "signup"}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Vikram Mehta"
                className="w-full px-4 py-3 bg-[#181A20] border border-[#303139] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#7657FF] transition-colors"
              />
            </div>

            <p className="text-[11px] font-mono text-gray-400">
              The verification code expires in <strong className="text-gray-200">10 minutes</strong>. A 60-second cooldown is enforced between code requests.
            </p>

            <button
              type="submit"
              disabled={loading || resendCooldown > 0}
              className="w-full py-3.5 px-6 rounded-full bg-[#7657FF] hover:bg-[#6242EC] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(118,87,255,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Dispatching Code via EmailJS...</span>
                </>
              ) : resendCooldown > 0 ? (
                <span>Cooldown active ({resendCooldown}s)</span>
              ) : (
                <>
                  <span>
                    {authMode === "signup"
                      ? "Sign Up with Google & Send Code"
                      : authMode === "recovery"
                      ? "Send Google Recovery Code"
                      : "Continue with Google & Send Code"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: VERIFICATION OTP ENTRY FORM */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono flex items-center justify-between">
              <div>
                <span className="text-gray-400 block text-[11px]">
                  Verification code sent to your Google account:
                </span>
                <strong className="text-white text-sm break-all">{googleEmail}</strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOtpStep("input");
                  setErrorMsg("");
                }}
                className="text-[#D9FF70] hover:underline font-semibold cursor-pointer shrink-0 ml-3"
              >
                Change
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold mb-2">
                Enter 6-Digit Google OTP *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  autoFocus
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="123456"
                  className="w-full pl-10 pr-4 py-3 bg-[#181A20] border border-[#303139] rounded-xl text-white font-mono text-xl tracking-[0.3em] text-center placeholder-gray-600 focus:outline-none focus:border-[#7657FF] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-1">
              <span>Didn&apos;t receive code?</span>
              {resendCooldown > 0 ? (
                <span>Resend in {resendCooldown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[#7657FF] hover:underline font-semibold cursor-pointer"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length !== 6}
              className="w-full py-3.5 px-6 rounded-full bg-[#D9FF70] hover:bg-[#C8F552] text-[#111318] font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(217,255,112,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-[#111318]" />
                  <span>Verifying Google Code...</span>
                </>
              ) : (
                <>
                  <span>
                    {authMode === "signup"
                      ? "Verify Google Code & Complete Sign Up"
                      : authMode === "recovery"
                      ? "Verify Code & Restore Access"
                      : "Verify Google Code & Sign In"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* WhatsApp Assistance Desk */}
        <div className="mt-5 p-3 rounded-2xl bg-[#161821] border border-[#2b2d3d] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-gray-200 font-mono text-[11px] font-semibold">
                Need Google Login Help?
              </p>
              <p className="text-gray-400 font-mono text-[10px]">
                Support Helpline: <span className="text-[#25D366] font-bold">{brand.alternatePhone}</span>
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${brand.alternateWhatsappNumber}?text=${encodeURIComponent("Hi Sid, I need assistance logging in with my Google account on Digital Marketing with Sid.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-mono text-[10px] font-bold transition-colors inline-flex items-center gap-1"
          >
            <span>WhatsApp</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-[#232533] flex items-center justify-between text-[11px] font-mono text-gray-400">
          <span className="flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-[#D9FF70]" />
            TLS Encrypted
          </span>
          <span>{brand.name}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
