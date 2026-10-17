import { z } from "zod";

export const serviceSchema = z.object({
  serviceName: z
    .string()
    .trim()
    .min(1, "Service name is required")
    .max(150, "Service name must be at most 150 characters"),
  moduleName: z
    .string()
    .trim()
    .min(1, "Module name is required")
    .max(100, "Module name must be at most 100 characters"),
  imageUrl: z
    .string()
    .trim()
    .min(1, "Image URL is required")
    .max(2048, "Image URL too long")
    .refine((url) => {
      // Allow relative upload URLs (/uploads/...) or absolute http(s) URLs
      if (url.startsWith("/uploads/")) return true;
      try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    }, "Must be a valid HTTP/HTTPS URL or uploaded asset path"),
  imagePublicId: z.string().max(255).optional().nullable(),
  isPublished: z.boolean().optional().default(false),
  sortOrder: z.coerce.number().int().optional().default(0),
});

export const serviceUpdateSchema = serviceSchema.partial();

export type ServiceSchemaType = z.infer<typeof serviceSchema>;
