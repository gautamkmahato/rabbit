// app/layout.tsx
import "@/app/globals.css";
import { Sidebar } from "./_components/Sidebar";
import { Header } from "./_components/Header";


export default function RootLayout({ children }) {
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </>
  );
}