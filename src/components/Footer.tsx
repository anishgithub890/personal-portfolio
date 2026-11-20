'use client';

import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/anishgithub890', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anishpabe', icon: Linkedin },
  { label: 'Email', href: 'mailto:anishgithub890@gmail.com', icon: Mail },
  { label: 'WhatsApp', href: 'https://wa.me/971508572468', icon: MessageCircle },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-medium text-white">Anish Mahato</p>
          <p className="mt-1">Full stack engineer building thoughtful, fast, production-ready web products.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {social.label}
              </a>
            );
          })}
        </div>

        <p className="font-[var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.2em]">
          © {currentYear}
        </p>
      </div>
      <nav aria-label="Legal" className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-3 border-t border-white/10 px-4 py-5 text-sm text-muted-foreground sm:px-6 md:px-8">
        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Terms &amp; Conditions</Link>
        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Privacy Policy</Link>
      </nav>
    </footer>
  );
}
