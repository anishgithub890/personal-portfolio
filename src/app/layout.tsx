import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from '@/components/Providers';
import Sidebar from '@/components/Sidebar';

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anish Mahato - Full Stack Developer",
  description: "Professional portfolio of Anish Mahato, a passionate Full Stack Developer specializing in modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "MongoDB", "Portfolio"],
  authors: [{ name: "Anish Mahato" }],
  creator: "Anish Mahato",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anishmahato.dev",
    title: "Anish Mahato - Full Stack Developer",
    description: "Professional portfolio of Anish Mahato, a passionate Full Stack Developer specializing in modern web technologies.",
    siteName: "Anish Mahato Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Mahato - Full Stack Developer",
    description: "Professional portfolio of Anish Mahato, a passionate Full Stack Developer specializing in modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 md:ml-56 lg:ml-64 max-w-full overflow-x-hidden">
              <main className="pt-0 max-w-full overflow-x-hidden pr-0 md:pr-2 lg:pr-4">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
