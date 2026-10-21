"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { User, isPublicService } from "@/lib/auth/user-constants";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  activeAuthTab: "phone" | "google" | "email";
  openLoginModal: (tab?: "phone" | "google" | "email") => void;
  closeLoginModal: () => void;
  sendOtpCode: (
    target: string,
    type: "phone" | "email",
    name?: string
  ) => Promise<{ success: boolean; message: string; devOtp?: string; error?: string }>;
  verifyOtpCode: (
    target: string,
    code: string,
    name?: string
  ) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: (
    email?: string,
    code?: string,
    name?: string
  ) => Promise<{
    success: boolean;
    otpRequired?: boolean;
    message?: string;
    devOtp?: string;
    error?: string;
  }>;
  logout: () => Promise<void>;
  checkServiceAccess: (serviceNameOrSlug: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"phone" | "google" | "email">("phone");

  // Fetch active session from HTTP-only cookie on mount
  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to check auth status:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const openLoginModal = (tab: "phone" | "google" | "email" = "phone") => {
    setActiveAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsAuthModalOpen(false);
  };

  const sendOtpCode = async (
    target: string,
    type: "phone" | "email",
    name?: string
  ) => {
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, type, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: "", error: data.error || "Failed to send code" };
      }
      return {
        success: true,
        message: data.message,
        devOtp: data.devOtp,
      };
    } catch (err) {
      return {
        success: false,
        message: "",
        error: err instanceof Error ? err.message : "Network error dispatching OTP",
      };
    }
  };

  const verifyOtpCode = async (
    target: string,
    code: string,
    name?: string
  ) => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, code, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Verification failed" };
      }
      setUser(data.user);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Verification error",
      };
    }
  };

  const signInWithGoogle = async (
    email?: string,
    code?: string,
    name?: string
  ) => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Google sign-in failed" };
      }
      if (data.otpRequired) {
        return {
          success: true,
          otpRequired: true,
          message: data.message,
          devOtp: data.devOtp,
        };
      }
      setUser(data.user);
      setIsAuthModalOpen(false);
      return { success: true, message: data.message };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Google auth error",
      };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
      setUser(null);
    }
  };

  /**
   * Returns true if user is logged in OR if the service is a free public preview
   * (Website Building or Paid Performance Ads)
   */
  const checkServiceAccess = useCallback(
    (serviceNameOrSlug: string): boolean => {
      if (user !== null) return true;
      return isPublicService(serviceNameOrSlug);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        activeAuthTab,
        openLoginModal,
        closeLoginModal,
        sendOtpCode,
        verifyOtpCode,
        signInWithGoogle,
        logout,
        checkServiceAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useUserAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within an AuthProvider");
  }
  return context;
}
