import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { sendInquiryNotification } from "@/lib/mailer";

// In-memory rate limiting map for basic abuse prevention
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const current = rateLimitMap.get(ip);
  if (!current || now > current.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Check Content-Type
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid Content-Type. Expected application/json." },
        { status: 415 }
      );
    }

    // Rate limiting check
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a minute before retrying." },
        { status: 429 }
      );
    }

    // Payload size guard (max 64KB)
    const rawBody = await req.text();
    if (rawBody.length > 65536) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds permissible size limit." },
        { status: 413 }
      );
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed JSON payload." },
        { status: 400 }
      );
    }

    // Zod validation
    const validationResult = contactFormSchema.safeParse(parsedJson);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(fieldErrors).flat()[0] || "Invalid form submission data.";

      return NextResponse.json(
        {
          success: false,
          error: firstErrorMessage,
          fieldErrors,
        },
        { status: 422 }
      );
    }

    const validatedData = validationResult.data;

    // Send through server-side mailer adapter
    const mailerResult = await sendInquiryNotification(validatedData);

    if (!mailerResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: mailerResult.error || "Operational failure while recording your inquiry.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry successfully processed.",
        submissionId: mailerResult.messageId,
        mode: mailerResult.mode,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMsg =
      error instanceof Error ? error.message : "Internal server failure.";
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to submit inquiries." },
    { status: 405 }
  );
}
