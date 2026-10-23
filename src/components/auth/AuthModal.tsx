"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUserAuth } from "./AuthContext";
import { COMPANY_NOREPLY_EMAIL } from "@/lib/auth/user-constants";
import { brand } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  X,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Smartphone,
  MessageCircle,
  KeyRound,
  UserPlus,
  LogIn,
} from "lucide-react";

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeLoginModal,
    activeAuthTab,
    sendOtpCode,
    verifyOtpCode,
    signInWithGoogle,
  } = useUserAuth();

  const [authMode, setAuthMode] = useState<"signin" | "signup" | "recovery">("signin");
  const [tab, setTab] = useState<"phone" | "google" | "email">("email");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpStep, setOtpStep] = useState<"input" | "verify">("input");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successNotice, setSuccessNotice] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeAuthTab) {
      setTab(activeAuthTab);
    }
  }, [activeAuthTab]);

  // Reset state on open/close
  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMsg("");
      setSuccessNotice("");
      setOtpStep("input");
      setOtpCode("");
      setAttemptsRemaining(null);
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

  const currentTarget =
    tab === "phone" ? phone : tab === "google" ? googleEmail : email;

  // Step 1: Send OTP to Mobile Number, Google Email, or Work Email
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessNotice("");
    setAttemptsRemaining(null);

    const target = currentTarget.trim();
    if (!target) {
      if (tab === "phone") {
        setErrorMsg("Please enter your mobile phone number.");
      } else if (tab === "google") {
        setErrorMsg("Please enter your Google account email address.");
      } else {
        setErrorMsg("Please enter your email address.");
      }
      return;
    }

    setLoading(true);

    const purposeLabel =
      authMode === "signup"
        ? "New Member Registration"
        : authMode === "recovery"
        ? "Account Access Recovery"
        : "Member Sign In";

    if (tab === "google") {
      const res = await signInWithGoogle(target, undefined, userName);
      setLoading(false);
      if (res.success) {
        setSuccessNotice("Verification code requested. Please check your email.");
        setOtpStep("verify");
        setResendCooldown(60);
      } else {
        if (res.cooldownRemaining) {
          setResendCooldown(res.cooldownRemaining);
        }
        setErrorMsg(res.error || "Unable to send the verification code. Please try again.");
      }
    } else {
      const res = await sendOtpCode(
        target,
        tab === "phone" ? "phone" : "email",
        userName,
        purposeLabel
      );
      setLoading(false);
      if (res.success) {
        setSuccessNotice("Verification code requested. Please check your email.");
        setOtpStep("verify");
        setResendCooldown(60);
      } else {
        if (res.cooldownRemaining) {
          setResendCooldown(res.cooldownRemaining);
        }
        setErrorMsg(res.error || "Unable to send the verification code. Please try again.");
      }
    }
  };

  // Step 2: Verify OTP. The user MUST enter the 6-digit OTP before they can log in!
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const code = otpCode.trim();
    if (!code || code.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);

    if (tab === "google") {
      const res = await signInWithGoogle(currentTarget.trim(), code, userName);
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || "Invalid verification code for Google account.");
      }
    } else {
      const res = await verifyOtpCode(currentTarget.trim(), code, userName);
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || "Invalid verification code.");
        if (res.attemptsRemaining !== undefined) {
          setAttemptsRemaining(res.attemptsRemaining);
        }
      }
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
              <span>EMAILJS PRODUCTION OTP SECURITY</span>
            </div>
            <h3
              id="auth-modal-title"
              className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight"
            >
              {authMode === "signup"
                ? "Create Your Account"
                : authMode === "recovery"
                ? "Account Access Recovery"
                : "Sign In to Unlock Services"}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-body mt-1">
              {authMode === "signup"
                ? "Register with your email to receive an instant OTP verification code."
                : authMode === "recovery"
                ? "Enter your email to verify ownership and instantly restore full access."
                : "Verify your email or phone with a one-time password (OTP)."}
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

        {/* Workflow Mode Selector (Sign In / Register / Recover) */}
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

        {/* Delivery Provider Badge */}
        <div className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9FF70] shrink-0 animate-pulse" />
            <span>
              Delivery via <strong className="text-white">EmailJS Production API</strong>
            </span>
          </div>
          <span className="text-[#D9FF70] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D9FF70]/10 border border-[#D9FF70]/30">
            60s Cooldown
          </span>
        </div>

        {/* Channel Selection */}
        <div className="flex rounded-xl bg-[#181A20] p-1 border border-[#303139] mb-5">
          <button
            type="button"
            onClick={() => {
              setTab("email");
              setOtpStep("input");
              setErrorMsg("");
              setSuccessNotice("");
            }}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer",
              tab === "email"
                ? "bg-[#7657FF] text-white shadow-sm font-semibold"
                : "text-gray-400 hover:text-white"
            )}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email OTP</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTab("google");
              setOtpStep("input");
              setErrorMsg("");
              setSuccessNotice("");
            }}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer",
              tab === "google"
                ? "bg-[#7657FF] text-white shadow-sm font-semibold"
                : "text-gray-400 hover:text-white"
            )}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Account</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTab("phone");
              setOtpStep("input");
              setErrorMsg("");
              setSuccessNotice("");
            }}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer",
              tab === "phone"
                ? "bg-[#7657FF] text-white shadow-sm font-semibold"
                : "text-gray-400 hover:text-white"
            )}
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Mobile OTP</span>
          </button>
        </div>

        {/* Error Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <span>{errorMsg}</span>
              {attemptsRemaining !== null && attemptsRemaining > 0 && (
                <span className="block mt-1 font-semibold text-amber-300">
                  {attemptsRemaining} verification attempt{attemptsRemaining === 1 ? "" : "s"} remaining before code invalidation.
                </span>
              )}
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

        {/* STEP 1: INPUT FORM (Email, Google Account, or Mobile Number) */}
        {otpStep === "input" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold mb-2">
                {tab === "phone"
                  ? "Mobile Phone Number *"
                  : tab === "google"
                  ? "Google Account Email Address *"
                  : "Email Address *"}
              </label>

              <div className="relative">
                {tab === "phone" ? (
                  <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                ) : tab === "google" ? (
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
                ) : (
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                )}

                <input
                  ref={inputRef}
                  type={tab === "phone" ? "tel" : "email"}
                  required
                  value={
                    tab === "phone"
                      ? phone
                      : tab === "google"
                      ? googleEmail
                      : email
                  }
                  onChange={(e) => {
                    if (tab === "phone") setPhone(e.target.value);
                    else if (tab === "google") setGoogleEmail(e.target.value);
                    else setEmail(e.target.value);
                  }}
                  placeholder={
                    tab === "phone"
                      ? "+91 98765 43210"
                      : tab === "google"
                      ? "yourname@gmail.com"
                      : "founder@company.com"
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#181A20] border border-[#303139] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#7657FF] transition-colors"
                />
              </div>
            </div>

            {(authMode === "signup" || tab !== "phone") && (
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
            )}

            <p className="text-[11px] font-mono text-gray-400">
              The verification code expires in <strong className="text-gray-200">10 minutes</strong>. A minimum 60-second cooldown is enforced between requests.
            </p>

            <button
              type="submit"
              disabled={loading || resendCooldown > 0}
              className="w-full py-3.5 px-6 rounded-full bg-[#7657FF] hover:bg-[#6242EC] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(118,87,255,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Dispatching OTP via EmailJS...</span>
                </>
              ) : resendCooldown > 0 ? (
                <span>Cooldown active ({resendCooldown}s)</span>
              ) : (
                <>
                  <span>
                    {authMode === "signup"
                      ? "Register & Send Verification Code"
                      : authMode === "recovery"
                      ? "Send Recovery OTP Code"
                      : "Send One-Time Password"}
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
                  Verification code dispatched via EmailJS to:
                </span>
                <strong className="text-white text-sm break-all">{currentTarget}</strong>
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
                Enter 6-Digit OTP *
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
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>
                    {authMode === "signup"
                      ? "Verify & Complete Signup"
                      : authMode === "recovery"
                      ? "Verify & Restore Access"
                      : "Verify OTP & Log In"}
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
                Need OTP / Login help?
              </p>
              <p className="text-gray-400 font-mono text-[10px]">
                Alternate Line: <span className="text-[#25D366] font-bold">{brand.alternatePhone}</span>
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${brand.alternateWhatsappNumber}?text=${encodeURIComponent("Hi Sid, I need assistance logging in or receiving my OTP on Digital Marketing with Sid.")}`}
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
