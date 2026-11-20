"use client";

import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import LegalNotice from "@/components/LegalNotice";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/terms" || pathname === "/privacy" || pathname === "/owner-access") {
    return <main className="relative min-h-screen">{children}</main>;
  }

  return (
    <>
      <Sidebar />
      <LegalNotice />
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="grid-shell h-full w-full" />
      </div>
      <main className="relative min-h-screen md:ml-[288px]">{children}</main>
    </>
  );
}
