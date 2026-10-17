import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const isAuthenticated = verifyAdminRequest(request);

  if (!isAuthenticated) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { authenticated: true, user: { role: "admin" } },
    { status: 200 }
  );
}
