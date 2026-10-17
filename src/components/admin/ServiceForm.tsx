"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Loader2, Sparkles } from "lucide-react";
import { ServiceRecord } from "@/lib/db/types";
import { ServiceImageUploader } from "./ServiceImageUploader";
import { ServiceStatusControl } from "./ServiceStatusControl";

const MODULE_PRESETS = [
  "Web Solutions",
  "Digital Marketing",
  "Growth & Distribution",
  "Organic Search",
  "Brand Identity",
];

interface ServiceFormProps {
  editingService: ServiceRecord | null;
  onSuccess: (saved: ServiceRecord, isEdit: boolean) => void;
  onCancelEdit: () => void;
  onError: (msg: string) => void;
  nextSortOrder: number;
}

export function ServiceForm({
  editingService,
  onSuccess,
  onCancelEdit,
  onError,
  nextSortOrder,
}: ServiceFormProps) {
  const [serviceName, setServiceName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false); // Section 4A: draft by default
  const [sortOrder, setSortOrder] = useState<number>(nextSortOrder);
  const [submitting, setSubmitting] = useState(false);

  // Sync state when editingService changes
  useEffect(() => {
    if (editingService) {
      setServiceName(editingService.serviceName);
      setModuleName(editingService.moduleName);
      setImageUrl(editingService.imageUrl);
      setImagePublicId(editingService.imagePublicId);
      setIsPublished(editingService.isPublished);
      setSortOrder(editingService.sortOrder);
    } else {
      setServiceName("");
      setModuleName("");
      setImageUrl("");
      setImagePublicId(null);
      setIsPublished(false); // draft by default
      setSortOrder(nextSortOrder);
    }
  }, [editingService, nextSortOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = serviceName.trim();
    const trimmedModule = moduleName.trim();
    const trimmedUrl = imageUrl.trim();

    if (!trimmedName) {
      onError("Service Name is required.");
      return;
    }
    if (trimmedName.length > 150) {
      onError("Service Name cannot exceed 150 characters.");
      return;
    }
    if (!trimmedModule) {
      onError("Module Name is required.");
      return;
    }
    if (trimmedModule.length > 100) {
      onError("Module Name cannot exceed 100 characters.");
      return;
    }
    if (!trimmedUrl) {
      onError("Service Image is required. Please upload an image or provide a valid URL.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        serviceName: trimmedName,
        moduleName: trimmedModule,
        imageUrl: trimmedUrl,
        imagePublicId,
        isPublished,
        sortOrder: Number(sortOrder) || 0,
      };

      if (editingService) {
        // PATCH existing service
        const res = await fetch(`/api/admin/services/${editingService.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to update service record.");
        }

        onSuccess(data, true);
      } else {
        // POST new service
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to create service record.");
        }

        onSuccess(data, false);
      }
    } catch (err: unknown) {
      onError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while saving."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#12131A] border border-[#232530] rounded-3xl p-6 sm:p-7 shadow-xl">
      <div className="flex items-center justify-between pb-5 border-b border-[#232530] mb-6">
        <div>
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#D9FF70]" />
            <span>{editingService ? "Edit Service Record" : "Add / Edit Service"}</span>
          </h2>
          <p className="text-xs font-mono text-gray-400 mt-1">
            {editingService
              ? `Modifying: ${editingService.serviceName}`
              : "Create a new dynamic service for the public cards catalog"}
          </p>
        </div>

        {editingService && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs font-mono px-2.5 py-1 rounded bg-[#1D1F2A] hover:bg-[#282B3B] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Service Name */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold">
              Service Name *
            </label>
            <span className="text-xs font-mono text-gray-500">
              {serviceName.length}/150
            </span>
          </div>
          <input
            type="text"
            required
            maxLength={150}
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="e.g. Website Development"
            className="w-full px-3.5 py-2.5 bg-[#171923] border border-[#2B2E3D] rounded-xl text-white text-sm focus:outline-none focus:border-[#7657FF] transition-colors"
          />
        </div>

        {/* Module Name */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold">
              Module Name *
            </label>
            <span className="text-xs font-mono text-gray-500">
              {moduleName.length}/100
            </span>
          </div>
          <input
            type="text"
            required
            maxLength={100}
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            placeholder="e.g. Web Solutions"
            className="w-full px-3.5 py-2.5 bg-[#171923] border border-[#2B2E3D] rounded-xl text-white text-sm focus:outline-none focus:border-[#7657FF] transition-colors mb-2"
          />

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5">
            {MODULE_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setModuleName(preset)}
                className="px-2 py-0.5 rounded text-xs font-mono bg-[#1C1E2A] text-gray-400 hover:text-white hover:bg-[#252838] transition-colors cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Reusable Image Uploader */}
        <ServiceImageUploader
          imageUrl={imageUrl}
          imagePublicId={imagePublicId}
          onChange={(url, publicId) => {
            setImageUrl(url);
            setImagePublicId(publicId);
          }}
          onError={onError}
        />

        {/* Sort Order and Visibility Control */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
              Display Sort Order
            </label>
            <input
              type="number"
              min={0}
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#171923] border border-[#2B2E3D] rounded-xl text-white text-sm focus:outline-none focus:border-[#7657FF] transition-colors"
            />
          </div>

          <ServiceStatusControl
            isPublished={isPublished}
            onChange={setIsPublished}
            disabled={submitting}
          />
        </div>

        <div className="pt-2 text-xs font-mono text-gray-500">
          Required fields marked *
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 px-6 rounded-xl bg-[#7657FF] hover:bg-[#6242EC] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(118,87,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Persisting Service...</span>
            </>
          ) : (
            <>
              {editingService ? (
                <Edit2 className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span>{editingService ? "Save Changes" : "Save Service"}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
