import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAllServices, createService } from "@/lib/db/services";
import { serviceSchema } from "@/lib/validations/service";
import { verifyAdminRequest } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator session required." },
      { status: 401 }
    );
  }

  try {
    const services = await getAllServices();
    return NextResponse.json(services, { status: 200 });
  } catch (error: unknown) {
    console.error("[API GET /api/admin/services] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve service catalog" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator session required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const validation = serviceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const newService = await createService(validation.data);

    // Invalidate static caches so public pages update immediately
    try {
      revalidatePath("/");
      revalidatePath("/services");
      revalidatePath("/api/services");
    } catch (e) {
      console.warn("revalidatePath warning:", e);
    }

    return NextResponse.json(newService, { status: 201 });
  } catch (error: unknown) {
    console.error("[API POST /api/admin/services] Error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
