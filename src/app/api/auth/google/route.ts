import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  User,
  createUserToken,
  USER_COOKIE_NAME,
  sendOtp,
  verifyOtp,
  COMPANY_NOREPLY_EMAIL,
} from "@/lib/auth/user";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, code, name } = body;

    const userEmail =
      email && typeof email === "string" && email.includes("@")
        ? email.toLowerCase().trim()
        : "client@gmail.com";

    const userName =
      name && typeof name === "string"
        ? name.trim()
        : userEmail.split("@")[0].replace(/[._-]/g, " ");

    // Step 1: If no OTP code was supplied, generate and dispatch OTP to user's Google email
    if (!code || typeof code !== "string" || !code.trim()) {
      const sendResult = await sendOtp(
        userEmail,
        "email",
        userName,
        "Google Account Verification"
      );

      if (!sendResult.success) {
        return NextResponse.json(
          {
            error: sendResult.error || "Unable to send the verification code. Please try again.",
            cooldownRemaining: sendResult.cooldownRemaining,
          },
          { status: sendResult.cooldownRemaining ? 429 : 400 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          otpRequired: true,
          message: "Verification code requested. Please check your email.",
        },
        { status: 200 }
      );
    }

    // Step 2: Verify the OTP code. The user cannot log in without entering the correct OTP!
    const verification = verifyOtp(userEmail, code.trim(), userName);
    if (!verification.success || !verification.user) {
      return NextResponse.json(
        {
          error:
            verification.error ||
            "Invalid or expired verification code. Please enter the correct OTP.",
        },
        { status: 400 }
      );
    }

    // Set provider explicitly to google
    const user: User = {
      ...verification.user,
      id: `google_${crypto.randomBytes(8).toString("hex")}`,
      provider: "google",
    };

    const token = createUserToken(user);

    const response = NextResponse.json(
      {
        success: true,
        message: "Google account verified with OTP. All client services are unlocked.",
        user,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: USER_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error: unknown) {
    console.error("[API POST /api/auth/google] Error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate with Google." },
      { status: 500 }
    );
  }
}
