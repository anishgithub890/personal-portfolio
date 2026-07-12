"use client";

import Sidebar from "@/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="grid-shell h-full w-full" />
      </div>
      <main className="relative min-h-screen md:ml-[288px]">{children}</main>
    </>
  );
}
