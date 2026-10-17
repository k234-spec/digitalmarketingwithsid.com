export interface ServiceRecord {
  id: string;
  serviceName: string;
  moduleName: string;
  imageUrl: string;
  imagePublicId: string | null;
  isPublished: boolean;
  sortOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateServiceInput = Omit<
  ServiceRecord,
  "id" | "createdAt" | "updatedAt" | "deletedAt" | "imagePublicId"
> & {
  imagePublicId?: string | null;
  deletedAt?: string | null;
};

export type UpdateServiceInput = Partial<CreateServiceInput>;
