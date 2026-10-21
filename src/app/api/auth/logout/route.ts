import { NextResponse } from "next/server";
import { USER_COOKIE_NAME } from "@/lib/auth/user";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully." },
    { status: 200 }
  );

  response.cookies.delete(USER_COOKIE_NAME);
  return response;
}
