import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import AppShell from '@/components/AppShell';
import { getAboutContent, getHeroContent } from '@/lib/portfolio-content';

const hero = getHeroContent();
const title = `${hero.name} | ${hero.title}`;
const description = getAboutContent().personalInfo.whoIAm;

export const viewport: Viewport = {
  themeColor: '#101319',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Anish Mahato',
    'Full-Stack & AI Engineer',
    'Backend Systems',
    'AI Agents',
    'System Design',
    'Next.js',
    'React',
    'TypeScript',
    'Portfolio',
  ],
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: 'Anish Mahato Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
