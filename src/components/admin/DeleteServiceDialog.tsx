"use client";

import React from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { ServiceRecord } from "@/lib/db/types";

interface DeleteServiceDialogProps {
  target: ServiceRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
}

export function DeleteServiceDialog({
  target,
  isOpen,
  onClose,
  onConfirm,
  loading,
}: DeleteServiceDialogProps) {
  if (!isOpen || !target) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-[#12131A] border border-[#2B2E3D] rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="h-12 w-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <h3
          id="dialog-title"
          className="text-lg font-bold font-display text-white mb-2"
        >
          Confirm Service Deletion
        </h3>
        <p className="text-xs font-body text-gray-400 leading-relaxed mb-6">
          Are you sure you want to delete{" "}
          <strong className="text-white">&quot;{target.serviceName}&quot;</strong>?
          This service will be immediately deactivated and removed from the public website cards.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1D1F2A] hover:bg-[#252836] text-xs font-mono text-gray-300 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-mono font-bold text-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>Confirm Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
