import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Anish Mahato | Full Stack Engineer",
  description:
    "Portfolio of Anish Mahato, a full stack engineer building fast, scalable, high-quality web products.",
  keywords: [
    "Anish Mahato",
    "Full Stack Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    title: "Anish Mahato | Full Stack Engineer",
    description:
      "Portfolio of Anish Mahato, a full stack engineer building fast, scalable, high-quality web products.",
    siteName: "Anish Mahato Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Mahato | Full Stack Engineer",
    description:
      "Portfolio of Anish Mahato, a full stack engineer building fast, scalable, high-quality web products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-[var(--font-space-grotesk)]">
        <Providers>
          <div className="page-shell">
            <AppShell>{children}</AppShell>
          </div>
        </Providers>
      </body>
    </html>
  );
}
