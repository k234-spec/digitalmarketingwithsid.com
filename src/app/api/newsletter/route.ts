import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0]?.message || "Invalid email" },
        { status: 422 }
      );
    }

    console.info(`[NEWSLETTER MOCK] New subscriber registered: ${result.data.email}`);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed to growth intelligence briefings.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process newsletter subscription." },
      { status: 500 }
    );
  }
}
