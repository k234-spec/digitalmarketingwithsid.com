"use client";

import React from "react";
import { Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { ServiceRecord } from "@/lib/db/types";

interface ServiceListItemProps {
  service: ServiceRecord;
  isEditing: boolean;
  onEdit: (service: ServiceRecord) => void;
  onDelete: (service: ServiceRecord) => void;
  onTogglePublish: (service: ServiceRecord) => void;
}

export function ServiceListItem({
  service,
  isEditing,
  onEdit,
  onDelete,
  onTogglePublish,
}: ServiceListItemProps) {
  const formattedDate = new Date(service.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`group bg-[#12131A] border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#7657FF]/60 hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)] ${
        isEditing
          ? "border-[#7657FF] ring-2 ring-[#7657FF]/30"
          : "border-[#232530]"
      }`}
    >
      {/* Image Thumbnail */}
      <div className="relative h-44 w-full bg-[#181A24] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#111318]/90 text-[#D9FF70] backdrop-blur-md border border-white/10">
            #{service.sortOrder}
          </span>

          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold backdrop-blur-md border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              service.isPublished
                ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30"
                : "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30"
            }`}
          >
            {service.isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex-1">
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
          Module: {service.moduleName}
        </p>
        <h3 className="font-display font-bold text-base text-white tracking-tight leading-snug">
          {service.serviceName}
        </h3>
        <p className="text-xs font-mono text-gray-500 mt-2">
          Updated: {formattedDate}
        </p>
      </div>

      {/* Action Bar */}
      <div className="p-3 bg-[#0E0F15] border-t border-[#232530] flex items-center justify-between gap-2">
        {/* Visibility Toggle */}
        <button
          type="button"
          onClick={() => onTogglePublish(service)}
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2.5 rounded-xl bg-[#171923] hover:bg-[#202330] text-gray-300 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7657FF]"
          title={service.isPublished ? "Switch to Draft" : "Publish to site"}
          aria-label={service.isPublished ? "Switch service to draft" : "Publish service to site"}
        >
          {service.isPublished ? (
            <EyeOff className="h-4 w-4 text-gray-400" />
          ) : (
            <Eye className="h-4 w-4 text-[#10B981]" />
          )}
        </button>

        <div className="flex items-center gap-2">
          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(service)}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171923] hover:bg-[#7657FF] text-gray-300 hover:text-white font-mono text-xs font-medium transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7657FF]"
            title="Edit Service"
            aria-label={`Edit ${service.serviceName}`}
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDelete(service)}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2.5 rounded-xl bg-[#171923] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-500"
            title="Delete Service"
            aria-label={`Delete ${service.serviceName}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
