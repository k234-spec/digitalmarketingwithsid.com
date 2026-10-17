"use client";

import React, { useState } from "react";
import { Search, RefreshCw, Loader2, ImageIcon } from "lucide-react";
import { ServiceRecord } from "@/lib/db/types";
import { ServiceListItem } from "./ServiceListItem";

interface ServiceListProps {
  services: ServiceRecord[];
  loading: boolean;
  editingId: string | null;
  onRefresh: () => void;
  onEdit: (service: ServiceRecord) => void;
  onDelete: (service: ServiceRecord) => void;
  onTogglePublish: (service: ServiceRecord) => void;
}

export function ServiceList({
  services,
  loading,
  editingId,
  onRefresh,
  onEdit,
  onDelete,
  onTogglePublish,
}: ServiceListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const totalCount = services.length;
  const publishedCount = services.filter((s) => s.isPublished).length;
  const draftCount = totalCount - publishedCount;

  const filtered = services.filter((s) => {
    const matchesSearch =
      s.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.moduleName.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "published") return matchesSearch && s.isPublished;
    if (statusFilter === "draft") return matchesSearch && !s.isPublished;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="bg-[#12131A] border border-[#232530] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by name or module..."
            className="w-full pl-9 pr-3 py-2 bg-[#171923] border border-[#2B2E3D] rounded-lg text-white text-xs focus:outline-none focus:border-[#7657FF] transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              statusFilter === "all"
                ? "bg-[#7657FF] text-white"
                : "text-gray-400 hover:text-white bg-[#171923]"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              statusFilter === "published"
                ? "bg-[#112417] text-[#55E685] border border-[#55E685]/40"
                : "text-gray-400 hover:text-white bg-[#171923]"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              statusFilter === "draft"
                ? "bg-[#2A2412] text-amber-400 border border-amber-400/40"
                : "text-gray-400 hover:text-white bg-[#171923]"
            }`}
          >
            Draft ({draftCount})
          </button>
        </div>
      </div>

      {/* Header with counter & refresh */}
      <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-1">
        <span>Existing Services ({filtered.length})</span>
        <button
          type="button"
          onClick={onRefresh}
          className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          title="Refresh service list"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Grid of Cards */}
      {loading ? (
        <div className="p-12 text-center bg-[#12131A] border border-[#232530] rounded-2xl">
          <Loader2 className="h-6 w-6 text-[#7657FF] animate-spin mx-auto mb-2" />
          <p className="text-xs font-mono text-gray-400">Loading catalog...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-[#12131A] border border-dashed border-[#2B2E3D] rounded-2xl">
          <ImageIcon className="h-8 w-8 text-gray-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white">No services found</p>
          <p className="text-xs font-mono text-gray-400 mt-1">
            {searchQuery
              ? "No services matched your filter criteria."
              : "Create your first service using the form on the left."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((service) => (
            <ServiceListItem
              key={service.id}
              service={service}
              isEditing={editingId === service.id}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePublish={onTogglePublish}
            />
          ))}
        </div>
      )}
    </div>
  );
}
