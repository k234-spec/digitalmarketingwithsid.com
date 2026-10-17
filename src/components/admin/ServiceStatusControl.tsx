"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface ServiceStatusControlProps {
  isPublished: boolean;
  onChange: (published: boolean) => void;
  disabled?: boolean;
}

export function ServiceStatusControl({
  isPublished,
  onChange,
  disabled = false,
}: ServiceStatusControlProps) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
        Publication Status
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!isPublished)}
        className={`w-full py-2.5 px-3 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          isPublished
            ? "bg-[#112417] text-[#55E685] border-[#55E685]/40"
            : "bg-[#252838] text-gray-400 border-[#303348]"
        }`}
      >
        {isPublished ? (
          <>
            <Eye className="h-3.5 w-3.5" />
            <span>Published (Visible publicly)</span>
          </>
        ) : (
          <>
            <EyeOff className="h-3.5 w-3.5" />
            <span>Draft (Hidden publicly)</span>
          </>
        )}
      </button>
    </div>
  );
}
