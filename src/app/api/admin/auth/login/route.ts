import { NextRequest, NextResponse } from "next/server";
import {
  checkAdminCredentials,
  createAdminToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Both email address and password are required." },
        { status: 400 }
      );
    }

    if (!checkAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: "Invalid administrator credentials provided." },
        { status: 401 }
      );
    }

    const token = createAdminToken(email);

    const response = NextResponse.json(
      {
        success: true,
        message: "Administrator authenticated successfully.",
        user: { email },
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: unknown) {
    console.error("[API POST /api/admin/auth/login] Error:", error);
    return NextResponse.json(
      { error: "Server authentication failure." },
      { status: 500 }
    );
  }
}
