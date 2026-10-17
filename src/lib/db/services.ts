import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { ServiceRecord, CreateServiceInput, UpdateServiceInput } from "./types";

const DB_FILE_PATH = path.join(process.cwd(), "src", "data", "services.db.json");

const INITIAL_SEED_SERVICES: CreateServiceInput[] = [
  {
    serviceName: "Website Development",
    moduleName: "Web Solutions",
    imageUrl:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
    imagePublicId: null,
    isPublished: true,
    sortOrder: 1,
  },
  {
    serviceName: "Performance Marketing",
    moduleName: "Digital Marketing",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    imagePublicId: null,
    isPublished: true,
    sortOrder: 2,
  },
  {
    serviceName: "Social Media Marketing",
    moduleName: "Growth & Distribution",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    imagePublicId: null,
    isPublished: true,
    sortOrder: 3,
  },
  {
    serviceName: "Search Engine Optimization",
    moduleName: "Organic Search",
    imageUrl:
      "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=1200&auto=format&fit=crop",
    imagePublicId: null,
    isPublished: true,
    sortOrder: 4,
  },
  {
    serviceName: "Graphic Design & Branding",
    moduleName: "Brand Identity",
    imageUrl:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    imagePublicId: null,
    isPublished: true,
    sortOrder: 5,
  },
];

async function readDatabase(): Promise<ServiceRecord[]> {
  try {
    const content = await fs.readFile(DB_FILE_PATH, "utf-8");
    const data = JSON.parse(content);
    if (Array.isArray(data) && data.length > 0) {
      // Ensure all records have deletedAt field (migration support)
      return data.map((item) => ({
        ...item,
        deletedAt: item.deletedAt !== undefined ? item.deletedAt : null,
      }));
    }
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code !== "ENOENT"
    ) {
      console.error("[Database] Error reading services database:", error);
    }
  }

  // Auto-seed if not present
  const now = new Date().toISOString();
  const seededServices: ServiceRecord[] = INITIAL_SEED_SERVICES.map(
    (item, index) => ({
      id: crypto.randomUUID(),
      serviceName: item.serviceName,
      moduleName: item.moduleName,
      imageUrl: item.imageUrl,
      imagePublicId: item.imagePublicId ?? null,
      isPublished: item.isPublished,
      sortOrder: item.sortOrder ?? index + 1,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    })
  );

  await writeDatabase(seededServices);
  return seededServices;
}

async function writeDatabase(records: ServiceRecord[]): Promise<void> {
  const dir = path.dirname(DB_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DB_FILE_PATH, JSON.stringify(records, null, 2), "utf-8");
}

export async function getPublishedServices(): Promise<ServiceRecord[]> {
  const all = await readDatabase();
  return all
    .filter((s) => s.isPublished && s.deletedAt === null)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt));
}

export async function getAllServices(options?: {
  includeDeleted?: boolean;
}): Promise<ServiceRecord[]> {
  const all = await readDatabase();
  const filtered = options?.includeDeleted
    ? all
    : all.filter((s) => s.deletedAt === null);

  return filtered.sort(
    (a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt)
  );
}

export async function getServiceById(
  id: string,
  options?: { includeDeleted?: boolean }
): Promise<ServiceRecord | null> {
  const all = await readDatabase();
  const record = all.find((s) => s.id === id);
  if (!record) return null;
  if (!options?.includeDeleted && record.deletedAt !== null) {
    return null;
  }
  return record;
}

export async function createService(input: CreateServiceInput): Promise<ServiceRecord> {
  const all = await readDatabase();
  const now = new Date().toISOString();
  const newRecord: ServiceRecord = {
    id: crypto.randomUUID(),
    serviceName: input.serviceName.trim(),
    moduleName: input.moduleName.trim(),
    imageUrl: input.imageUrl.trim(),
    imagePublicId: input.imagePublicId ?? null,
    isPublished: input.isPublished ?? false,
    sortOrder: typeof input.sortOrder === "number" ? input.sortOrder : all.length + 1,
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  all.push(newRecord);
  await writeDatabase(all);
  return newRecord;
}

export async function updateService(
  id: string,
  input: UpdateServiceInput
): Promise<ServiceRecord | null> {
  const all = await readDatabase();
  const index = all.findIndex((s) => s.id === id);
  if (index === -1) {
    return null;
  }

  const existing = all[index];
  if (existing.deletedAt !== null) {
    return null; // Cannot update soft-deleted record without restoring
  }

  const updated: ServiceRecord = {
    ...existing,
    ...(input.serviceName !== undefined && { serviceName: input.serviceName.trim() }),
    ...(input.moduleName !== undefined && { moduleName: input.moduleName.trim() }),
    ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl.trim() }),
    ...(input.imagePublicId !== undefined && { imagePublicId: input.imagePublicId }),
    ...(input.isPublished !== undefined && { isPublished: input.isPublished }),
    ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    updatedAt: new Date().toISOString(),
  };

  all[index] = updated;
  await writeDatabase(all);
  return updated;
}

export async function deleteService(
  id: string,
  softDelete = true
): Promise<boolean> {
  const all = await readDatabase();
  const index = all.findIndex((s) => s.id === id);
  if (index === -1) return false;

  const target = all[index];

  if (softDelete) {
    // Soft deletion: marks deletedAt timestamp and unpublishes
    target.deletedAt = new Date().toISOString();
    target.isPublished = false;
    target.updatedAt = new Date().toISOString();
    await writeDatabase(all);
    return true;
  }

  // Hard deletion: removes from DB and cleans storage asset
  const remaining = all.filter((s) => s.id !== id);
  await writeDatabase(remaining);

  if (target.imagePublicId && target.imageUrl.startsWith("/uploads/services/")) {
    try {
      const filename = path.basename(target.imageUrl);
      const filePath = path.join(process.cwd(), "public", "uploads", "services", filename);
      await fs.unlink(filePath).catch(() => {});
    } catch (e) {
      console.warn("[Database] Could not delete image file for deleted service:", e);
    }
  }

  return true;
}

export async function restoreService(id: string): Promise<ServiceRecord | null> {
  const all = await readDatabase();
  const target = all.find((s) => s.id === id);
  if (!target) return null;

  target.deletedAt = null;
  target.updatedAt = new Date().toISOString();
  await writeDatabase(all);
  return target;
}

export async function reorderServices(
  orderUpdates: { id: string; sortOrder: number }[]
): Promise<boolean> {
  const all = await readDatabase();
  const orderMap = new Map(orderUpdates.map((item) => [item.id, item.sortOrder]));

  let changed = false;
  for (const s of all) {
    if (orderMap.has(s.id)) {
      s.sortOrder = orderMap.get(s.id)!;
      s.updatedAt = new Date().toISOString();
      changed = true;
    }
  }

  if (changed) {
    await writeDatabase(all);
  }
  return true;
}
