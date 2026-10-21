import { NextRequest, NextResponse } from "next/server";
import { sendOtp } from "@/lib/auth/user";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { target, type = "phone", name } = body;

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

    const result = sendOtp(target, type, name);

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        devOtp: result.devOtp, // Returned to expedite development and client-side testing
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[API POST /api/auth/send-otp] Error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch verification code." },
      { status: 500 }
    );
  }
}
