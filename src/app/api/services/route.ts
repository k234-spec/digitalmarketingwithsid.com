import { NextResponse } from "next/server";
import { getPublishedServices } from "@/lib/db/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await getPublishedServices();
    return NextResponse.json(services, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: unknown) {
    console.error("[API /api/services] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch published services" },
      { status: 500 }
    );
  }
}
