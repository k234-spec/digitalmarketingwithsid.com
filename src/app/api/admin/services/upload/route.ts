import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { verifyAdminRequest } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator session required." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string" || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No image file provided in form-data ('file' key expected)." },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image file exceeds maximum allowable size (5 MB limit)." },
        { status: 400 }
      );
    }

    // Validate MIME type
    const mime = file.type.toLowerCase();
    const ext = ALLOWED_MIME_TYPES[mime];
    if (!ext) {
      return NextResponse.json(
        {
          error:
            "Unsupported file format. Please upload JPG, PNG, or WebP image files.",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Basic magic bytes check for extra security
    const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8;
    const isPng =
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47;
    const isRiffWebp =
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP";

    if (!isJpeg && !isPng && !isRiffWebp) {
      return NextResponse.json(
        { error: "Invalid image binary payload. Corrupted or invalid image file." },
        { status: 400 }
      );
    }

    // Unique storage identifier
    const publicId = `service_${Date.now()}_${crypto.randomUUID().slice(0, 8)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "services");

    await fs.mkdir(uploadDir, { recursive: true });
    const targetFilePath = path.join(uploadDir, publicId);
    await fs.writeFile(targetFilePath, buffer);

    const imageUrl = `/uploads/services/${publicId}`;

    return NextResponse.json(
      {
        success: true,
        imageUrl,
        imagePublicId: publicId,
        size: file.size,
        mimeType: mime,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[API POST /api/admin/services/upload] Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process image upload on the server." },
      { status: 500 }
    );
  }
}
