import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/user";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);

  if (!user) {
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { authenticated: true, user },
    { status: 200 }
  );
}
