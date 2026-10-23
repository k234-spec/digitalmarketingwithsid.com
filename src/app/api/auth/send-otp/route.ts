import { NextRequest, NextResponse } from "next/server";
import { sendOtp } from "@/lib/auth/user";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { target, type = "email", name, purpose } = body;

    if (!target || typeof target !== "string" || target.trim().length < 3) {
      return NextResponse.json(
        { error: "Please enter a valid mobile number or email address." },
        { status: 400 }
      );
    }

    if (type !== "phone" && type !== "email") {
      return NextResponse.json(
        { error: "Invalid target type specified. Must be 'phone' or 'email'." },
        { status: 400 }
      );
    }

    // Determine verification purpose string
    let resolvedPurpose = "Account Verification & Access";
    if (purpose === "signup") {
      resolvedPurpose = "New Member Registration";
    } else if (purpose === "login") {
      resolvedPurpose = "Member Sign In";
    } else if (purpose === "recovery") {
      resolvedPurpose = "Account Access Recovery";
    } else if (typeof purpose === "string" && purpose.trim()) {
      resolvedPurpose = purpose.trim();
    }

    const result = await sendOtp(target, type, name, resolvedPurpose);

    if (!result.success) {
      // 429 Too Many Requests if in cooldown or rate limited
      const status = result.cooldownRemaining ? 429 : 400;
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Unable to send the verification code. Please try again.",
          cooldownRemaining: result.cooldownRemaining,
        },
        { status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Verification code requested. Please check your email.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[API POST /api/auth/send-otp] Error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch verification code due to a server error." },
      { status: 500 }
    );
  }
}
