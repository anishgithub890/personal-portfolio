"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const version = "2026-11-20-international";
const storageKey = "portfolio-legal-acceptance";

export default function LegalNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(storageKey) !== version);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(storageKey, version);
    } catch {
      // Keep the notice dismissible when browser storage is unavailable.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside aria-label="Terms and privacy notice" className="fixed bottom-4 left-4 right-4 z-50 max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border border-white/15 bg-background p-5 shadow-2xl sm:left-auto sm:w-[360px]">
      <p className="text-base font-semibold text-white">Terms &amp; privacy</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Please review the <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary underline">Terms &amp; Conditions</Link> and <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Privacy Policy</Link>.
        Selecting Agree to Terms confirms your agreement to the terms. The privacy policy is provided for transparency, not as a request for blanket consent.
      </p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">This does not authorize marketing or optional tracking. Your choice is saved on this browser.</p>
      <div className="mt-4 flex items-center gap-3">
        <Button onClick={accept} className="rounded-full">Agree to Terms</Button>
        <Button variant="ghost" onClick={() => setVisible(false)} className="rounded-full">Not now</Button>
      </div>
    </aside>
  );
}
