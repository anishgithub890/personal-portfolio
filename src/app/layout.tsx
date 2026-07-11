import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} scroll-smooth`}
    >
      <body className="font-[var(--font-space-grotesk)]">
        <Providers>
          <div className="page-shell">
            <Sidebar />
            <div className="pointer-events-none fixed inset-0 opacity-70">
              <div className="grid-shell h-full w-full" />
            </div>
            <main className="relative min-h-screen md:ml-[288px]">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
