import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Service Management | Digital Growth Studio",
  description: "Administrative dashboard for dynamic service catalog management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0D0E12] text-white selection:bg-[#7657FF] selection:text-white">
      {children}
    </div>
  );
}
