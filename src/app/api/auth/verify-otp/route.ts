import { NextRequest, NextResponse } from "next/server";
import {
  verifyOtp,
  createUserToken,
  USER_COOKIE_NAME,
} from "@/lib/auth/user";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { target, code, name } = body;

    if (!target || !code) {
      return NextResponse.json(
        { error: "Both mobile/email target and 6-digit verification code are required." },
        { status: 400 }
      );
    }

    const verification = verifyOtp(target, code, name);

    if (!verification.success || !verification.user) {
      return NextResponse.json(
        { error: verification.error || "Verification failed." },
        { status: 401 }
      );
    }

    const token = createUserToken(verification.user);

    const response = NextResponse.json(
      {
        success: true,
        message: "Authentication successful. All client services are now unlocked.",
        user: verification.user,
      },
      { status: 200 }
    );

    // Set secure HTTP-only user cookie (30 days)
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
    console.error("[API POST /api/auth/verify-otp] Error:", error);
    return NextResponse.json(
      { error: "Failed to verify security code." },
      { status: 500 }
    );
  }
}
