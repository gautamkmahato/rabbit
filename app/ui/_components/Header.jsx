// components/Header.tsx
"use client";

export function Header() {
  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">GitHub Code Review</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
    </header>
  );
}
