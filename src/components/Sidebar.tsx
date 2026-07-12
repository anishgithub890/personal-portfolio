"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Github,
  Home,
  Linkedin,
  LogIn,
  LogOut,
  Mail,
  Menu,
  User,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/AuthDialog";
import { cn } from "@/lib/utils";

const navigationItems = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "about", label: "About", href: "#about", icon: User },
  { id: "skills", label: "Skills", href: "#skills", icon: Wrench },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
    icon: Briefcase,
  },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/anishgithub890", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anishpabe",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:anishgithub890@gmail.com", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionIds = useMemo(
    () =>
      navigationItems
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.id),
    [],
  );

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname, sectionIds]);

  useEffect(() => {
    if (pathname !== "/") {
      const current = navigationItems.find((item) => item.href === pathname);
      if (current) {
        setActiveSection(current.id);
      }
    }
  }, [pathname]);

  const handleNavClick = (href: string, id: string) => {
    setMobileOpen(false);

    if (!href.startsWith("#")) {
      setActiveSection(id);
      return;
    }

    if (pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }
  };

  const renderNavBody = (showCloseButton = false) => (
    <div className="panel flex h-full min-h-0 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/8 px-5 py-4">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#home", "home");
          }}
          className="group min-w-0"
          aria-label="Anish Mahato home"
        >
          <span className="sidebar-logo group-hover:text-primary/95">Anish Mahato</span>
          <span className="mt-2 block font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.28em] text-primary/75">
            Full Stack Engineer
          </span>
        </a>

        {showCloseButton && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-white backdrop-blur transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="flex-1 min-h-0 space-y-8 overflow-y-auto overscroll-contain p-6 pt-4">
        <div>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href.startsWith("#")
                ? pathname === "/" && activeSection === item.id
                : pathname === item.href;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(event) => {
                    if (item.href.startsWith("#")) {
                      event.preventDefault();
                    }
                    handleNavClick(item.href, item.id);
                  }}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm",
                    isActive
                      ? "border-primary/35 bg-primary/12 text-white"
                      : "border-white/8 bg-white/[0.02] text-muted-foreground hover:border-white/15 hover:bg-white/[0.05] hover:text-white",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <span className="font-[var(--font-ibm-plex-mono)] text-[11px] text-muted-foreground group-hover:text-primary">
                    0{navigationItems.indexOf(item) + 1}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-muted-foreground hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 p-6">
        {session ? (
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-sm font-medium text-white">
                {session.user?.name}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-center rounded-2xl border-white/12 bg-transparent text-white hover:bg-white/5"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        ) : (
          <AuthDialog>
            <Button
              variant="outline"
              className="w-full justify-center rounded-2xl border-white/12 bg-transparent text-white hover:bg-white/5"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </AuthDialog>
        )}
      </div>
    </div>
  );

  return (
    <>
      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed right-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-white backdrop-blur hover:border-white/20 hover:bg-black/50 md:hidden"
          aria-label="Open navigation"
          aria-expanded={false}
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute inset-y-0 left-0 w-[88vw] max-w-sm p-3"
            onClick={(event) => event.stopPropagation()}
          >
            {renderNavBody(true)}
          </div>
        </div>
      )}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[288px] p-5 md:block">
        {renderNavBody()}
      </aside>
    </>
  );
}
