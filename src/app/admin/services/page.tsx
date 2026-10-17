"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  ExternalLink,
  LogOut,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { ServiceRecord } from "@/lib/db/types";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { ServiceList } from "@/components/admin/ServiceList";
import { DeleteServiceDialog } from "@/components/admin/DeleteServiceDialog";

export default function AdminServicesPage() {
  const router = useRouter();

  // State
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const formSectionRef = useRef<HTMLDivElement>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 5000);
  };

  const fetchServices = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/services");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to load services");
      const data = await res.json();
      setServices(data);
    } catch (err: unknown) {
      showNotification(
        "error",
        err instanceof Error ? err.message : "Could not fetch service list."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleEdit = (service: ServiceRecord) => {
    setEditingService(service);
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingService(null);
  };

  const handleFormSuccess = (saved: ServiceRecord, isEdit: boolean) => {
    if (isEdit) {
      setServices((prev) => prev.map((s) => (s.id === saved.id ? saved : s)));
      showNotification("success", `Updated service "${saved.serviceName}".`);
      setEditingService(null);
    } else {
      setServices((prev) => [...prev, saved]);
      showNotification("success", `Created service "${saved.serviceName}".`);
    }
  };

  const handleTogglePublish = async (service: ServiceRecord) => {
    const nextStatus = !service.isPublished;
    setServices((prev) =>
      prev.map((s) => (s.id === service.id ? { ...s, isPublished: nextStatus } : s))
    );

    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: nextStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      showNotification(
        "success",
        `Service "${service.serviceName}" is now ${nextStatus ? "Published" : "Draft"}.`
      );
    } catch {
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, isPublished: service.isPublished } : s))
      );
      showNotification("error", "Failed to update publish state on server.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/services/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete service.");

      setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      if (editingService?.id === deleteTarget.id) {
        setEditingService(null);
      }

      showNotification("success", `Deactivated service "${deleteTarget.serviceName}".`);
      setDeleteTarget(null);
    } catch (err: unknown) {
      showNotification(
        "error",
        err instanceof Error ? err.message : "Failed to delete service."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const totalCount = services.length;
  const publishedCount = services.filter((s) => s.isPublished).length;
  const draftCount = totalCount - publishedCount;
  const uniqueModules = Array.from(new Set(services.map((s) => s.moduleName))).length;

  return (
    <div className="min-h-screen pb-24">
      {/* Top Header */}
      <header className="border-b border-[#232530] bg-[#12131A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-xl bg-[#7657FF] flex items-center justify-center shadow-[0_0_20px_rgba(118,87,255,0.4)]">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold font-display text-white tracking-tight">
                  Service Management
                </h1>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#7657FF]/20 text-[#D9FF70] border border-[#7657FF]/30">
                  Admin
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono hidden sm:block">
                Manage your website&apos;s dynamic service cards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1D1F2A] hover:bg-[#252836] text-xs font-mono text-gray-300 hover:text-white border border-[#2B2E3D] transition-colors"
            >
              <span>Public Website</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-mono text-red-400 border border-red-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div
            className={`px-4 py-3 rounded-xl font-mono text-xs shadow-2xl flex items-center gap-3 border ${
              notification.type === "success"
                ? "bg-[#112417] text-[#55E685] border-[#55E685]/30"
                : "bg-[#2A1215] text-[#FF6B6B] border-[#FF6B6B]/30"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="opacity-70 hover:opacity-100 ml-2 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#12131A] border border-[#232530] rounded-2xl p-4">
            <span className="text-xs font-mono text-gray-400 block mb-1">Total Services</span>
            <span className="text-2xl font-bold font-display text-white">{totalCount}</span>
          </div>
          <div className="bg-[#12131A] border border-[#232530] rounded-2xl p-4">
            <span className="text-xs font-mono text-[#55E685] block mb-1">Published</span>
            <span className="text-2xl font-bold font-display text-white">{publishedCount}</span>
          </div>
          <div className="bg-[#12131A] border border-[#232530] rounded-2xl p-4">
            <span className="text-xs font-mono text-amber-400 block mb-1">Drafts</span>
            <span className="text-2xl font-bold font-display text-white">{draftCount}</span>
          </div>
          <div className="bg-[#12131A] border border-[#232530] rounded-2xl p-4">
            <span className="text-xs font-mono text-[#D9FF70] block mb-1">Active Modules</span>
            <span className="text-2xl font-bold font-display text-white">{uniqueModules}</span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div ref={formSectionRef} className="lg:col-span-5 sticky top-24">
            <ServiceForm
              editingService={editingService}
              onSuccess={handleFormSuccess}
              onCancelEdit={handleCancelEdit}
              onError={(msg) => showNotification("error", msg)}
              nextSortOrder={services.length + 1}
            />
          </div>

          {/* Right Column: Listing */}
          <div className="lg:col-span-7">
            <ServiceList
              services={services}
              loading={loading}
              editingId={editingService?.id || null}
              onRefresh={fetchServices}
              onEdit={handleEdit}
              onDelete={(svc) => setDeleteTarget(svc)}
              onTogglePublish={handleTogglePublish}
            />
          </div>
        </div>
      </main>

      {/* Confirmation Dialog */}
      <DeleteServiceDialog
        target={deleteTarget}
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />
    </div>
  );
}
