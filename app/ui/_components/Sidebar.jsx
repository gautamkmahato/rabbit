// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { LayoutDashboard, Github, FileText } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-4 hidden md:block">
      <h2 className="text-xl font-bold text-gray-800 mb-6">CodeReview AI</h2>
      <nav className="space-y-3">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-black">
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link href="/ui/repository" className="flex items-center gap-2 text-gray-700 hover:text-black">
          <Github size={18} /> Repositories
        </Link>
        <Link href="/reviews" className="flex items-center gap-2 text-gray-700 hover:text-black">
          <FileText size={18} /> Reviews
        </Link>
      </nav>
    </aside>
  );
}