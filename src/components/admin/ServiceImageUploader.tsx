"use client";

import React, { useRef, useState } from "react";
import { Upload, X, Loader2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

interface ServiceImageUploaderProps {
  imageUrl: string;
  imagePublicId?: string | null;
  onChange: (url: string, publicId: string | null) => void;
  onError: (msg: string) => void;
}

export function ServiceImageUploader({
  imageUrl,
  imagePublicId,
  onChange,
  onError,
}: ServiceImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      onError("File exceeds maximum allowed size (5 MB limit).");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/services/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Image upload failed");
      }

      onChange(data.imageUrl, data.imagePublicId);
    } catch (err: unknown) {
      onError(
        err instanceof Error ? err.message : "Failed to upload image file."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleClear = () => {
    onChange("", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold">
          Service Image *
        </label>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === "upload"
                ? "bg-[#7657FF] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded transition-colors ${
              mode === "url"
                ? "bg-[#7657FF] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#2B2E3D] hover:border-[#7657FF] rounded-2xl p-5 text-center cursor-pointer transition-colors bg-[#171923]/60 group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center py-2">
              <Loader2 className="h-6 w-6 text-[#7657FF] animate-spin mb-2" />
              <span className="text-xs font-mono text-gray-400">
                Uploading and validating image...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center py-2">
              <Upload className="h-6 w-6 text-gray-400 group-hover:text-[#7657FF] mb-2 transition-colors" />
              <p className="text-xs font-mono text-gray-300 font-medium">
                Click to browse or drop an image
              </p>
              <p className="text-xs font-mono text-gray-500 mt-1">
                JPG, PNG or WebP · Max 5 MB
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => onChange(e.target.value, null)}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full pl-9 pr-3.5 py-2.5 bg-[#171923] border border-[#2B2E3D] rounded-xl text-white text-xs focus:outline-none focus:border-[#7657FF] transition-colors"
          />
        </div>
      )}

      {/* Image Preview Thumbnail */}
      {imageUrl && (
        <div className="relative rounded-xl overflow-hidden border border-[#2B2E3D] bg-black/40 h-28 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-xs font-mono text-white/90 truncate">
              {imagePublicId || imageUrl}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-red-500 text-white transition-colors cursor-pointer"
            title="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
