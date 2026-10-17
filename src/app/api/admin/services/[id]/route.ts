import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getServiceById,
  updateService,
  deleteService,
} from "@/lib/db/services";
import { serviceUpdateSchema } from "@/lib/validations/service";
import { verifyAdminRequest } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator session required." },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const service = await getServiceById(id);

  if (!service) {
    return NextResponse.json(
      { error: "Service record not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(service, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator session required." },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    const validation = serviceUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const updated = await updateService(id, validation.data);
    if (!updated) {
      return NextResponse.json(
        { error: "Service record not found" },
        { status: 404 }
      );
    }

    try {
      revalidatePath("/");
      revalidatePath("/services");
      revalidatePath("/api/services");
    } catch (e) {
      console.warn("revalidatePath warning:", e);
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: unknown) {
    console.error(`[API PATCH /api/admin/services/${id}] Error:`, error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator session required." },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const isPermanent = request.nextUrl.searchParams.get("permanent") === "true";

  try {
    const success = await deleteService(id, !isPermanent);
    if (!success) {
      return NextResponse.json(
        { error: "Service record not found or could not be removed" },
        { status: 404 }
      );
    }

    try {
      revalidatePath("/");
      revalidatePath("/services");
      revalidatePath("/api/services");
    } catch (e) {
      console.warn("revalidatePath warning:", e);
    }

    return NextResponse.json(
      { success: true, message: "Service successfully deleted." },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(`[API DELETE /api/admin/services/${id}] Error:`, error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
