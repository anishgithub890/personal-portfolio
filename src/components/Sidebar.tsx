'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import AuthDialog from '@/components/AuthDialog';
import { cn } from '@/lib/utils';
import { 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Mail, 
  Menu,
  Github,
  Linkedin,
  MessageCircle,
  LogIn,
  LogOut,
  UserCircle,
  MessageSquare,
  FileText
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Ensure we're on the client before setting any state
  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', href: '#home', icon: Home },
    { id: 'about', label: 'About', href: '#about', icon: User },
    { id: 'skills', label: 'Skills', href: '#skills', icon: Code },
    { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
    { id: 'cv', label: 'CV', href: '/cv', icon: FileText },
  ];

  // Add admin-specific navigation items only for logged-in admin users
  const adminNavigationItems = session?.user?.userType === 'ADMIN' ? [
    { id: 'admin-contacts', label: 'Manage Contacts', href: '/admin/dashboard', icon: MessageSquare },
  ] : [];

  const allNavigationItems = [...navigationItems, ...adminNavigationItems];

  const scrollToSection = async (href: string, id: string) => {
    setIsNavigating(true);
    
    try {
      // Check if it's a hash link (starts with #) or a regular link
      if (href.startsWith('#')) {
        // Handle hash links for main page sections
        if (pathname !== '/') {
          // If we're not on the main page, navigate to main page first with hash
          await router.push('/' + href);
        } else {
          const element = document.querySelector(href);
          if (element) {
            window.history.pushState(null, '', href);
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            setActiveSection(id);
          }
        }
      } else {
        // Handle regular navigation links (like dashboard pages)
        await router.push(href);
      }
    } finally {
      setIsNavigating(false);
    }
  };

  // Set active section based on current page
  useEffect(() => {
    if (!isClient) return;
    
    // Check if we're on a specific page
    if (pathname === '/admin/dashboard') {
      setActiveSection('admin-contacts');
    } else if (pathname === '/dashboard') {
      setActiveSection('dashboard');
    } else if (pathname === '/') {
      // We're on the main page, check for hash in URL
      const hash = window.location.hash;
      if (hash) {
        // Find the corresponding navigation item
        const navItem = navigationItems.find(item => item.href === hash);
        if (navItem) {
          setActiveSection(navItem.id);
          // Scroll to the section after a small delay
          setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
          }, 100);
        }
      } else {
        // No hash, set default to home and update URL
        setActiveSection('home');
        if (window.location.hash !== '') {
          window.history.replaceState(null, '', '/');
        }
        // Let scroll detection handle it
        const hasHashLinks = navigationItems.some(item => item.href.startsWith('#'));
        if (hasHashLinks) {
          // Check initial scroll position for main page
          const handleInitialScroll = () => {
            const sections = navigationItems
              .filter(item => item.href.startsWith('#'))
              .map(item => ({
                id: item.id,
                element: document.querySelector(item.href)
              }))
              .filter(section => section.element);

            if (sections.length === 0) return;

            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
              const section = sections[i];
              if (section.element) {
                const elementTop = (section.element as HTMLElement).offsetTop;
                if (scrollPosition >= elementTop) {
                  setActiveSection(section.id);
                  break;
                }
              }
            }
          };
          
          // Small delay to ensure DOM is ready
          setTimeout(handleInitialScroll, 100);
        }
      }
    }
  }, [pathname, isClient]);

  // Add scroll detection for main page
  useEffect(() => {
    if (!isClient) return;
    
    let ticking = false;
    const handleScroll = () => {
      if (pathname !== '/') return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sections = navigationItems
          .filter(item => item.href.startsWith('#'))
          .map(item => ({
            id: item.id,
            element: document.querySelector(item.href)
          })).filter(section => section.element);

        if (sections.length === 0) {
          ticking = false;
          return;
        }

        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.element) {
            const elementTop = (section.element as HTMLElement).offsetTop;
            if (scrollPosition >= elementTop) {
              setActiveSection(section.id);
              const newHash = navigationItems.find(item => item.id === section.id)?.href;
              if (newHash && window.location.hash !== newHash) {
                window.history.replaceState(null, '', newHash);
              }
              break;
            }
          }
        }
        ticking = false;
      });
    };

    // Handle browser back/forward navigation
    const handlePopState = () => {
      if (pathname !== '/') return;
      
      const hash = window.location.hash;
      if (hash) {
        const navItem = navigationItems.find(item => item.href === hash);
        if (navItem) {
          setActiveSection(navItem.id);
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          }
        }
      } else {
        setActiveSection('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [pathname, isClient]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 xxs:p-4 pb-2 xxs:pb-3">
        <div className="flex items-center gap-2 xxs:gap-3 mb-1.5 xxs:mb-2">
          <div className="w-6 h-6 xxs:w-8 xxs:h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs xxs:text-sm">A</span>
          </div>
          <div>
            <h2 className="text-xs xxs:text-sm font-bold text-foreground">
              Anish Mahato
            </h2>
            <p className="text-[10px] xxs:text-xs text-muted-foreground">
              Full Stack Dev
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          Available
        </Badge>
      </div>

      <div className="mx-4 h-px bg-border/30" />

      {/* Navigation */}
      <div className="flex-1 px-2 py-3">
        <nav className="space-y-1">
            {allNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isClient && activeSection === item.id;
              const isCurrentPage = isClient && item.href.startsWith('/') && pathname === item.href;
              const isLoading = isNavigating && (isActive || isCurrentPage);
              
              return (
                <button
                  key={item.id}
                  disabled={isNavigating}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out",
                    isActive || isCurrentPage
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    isNavigating ? 'opacity-50 cursor-not-allowed' : ''
                  )}
                  onClick={() => scrollToSection(item.href, item.id)}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
        </nav>
      </div>

      <div className="mx-4 h-px bg-border/30" />

      {/* Social Links */}
      <div className="p-4 pt-3">
        <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          Connect
        </h3>
        <div className="flex gap-1.5 mb-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Button
                key={social.name}
                variant="ghost"
                size="sm"
                className={cn("h-7 w-7 p-0", social.color)}
                onClick={() => window.open(social.href, '_blank')}
              >
                <Icon className="h-3.5 w-3.5" />
              </Button>
            );
          })}
        </div>
        <div className="space-y-2 text-xs">
          <a 
            href="mailto:anishgithub890@gmail.com" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Email: anishgithub890@gmail.com"
          >
            <Mail className="h-3 w-3" />
            <span className="truncate">anishgithub890@gmail.com</span>
          </a>
          <a 
            href="https://wa.me/971508572468" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            title="WhatsApp: +971508572468"
          >
            <MessageCircle className="h-3 w-3" />
            <span>+971508572468</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-3 mt-auto">
        {session ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-muted/50">
              <UserCircle className="h-4 w-4 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {session.user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center gap-2 text-xs h-auto min-h-[36px] sm:min-h-[44px]"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        ) : (
          <AuthDialog>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center gap-2 text-xs h-auto min-h-[36px] sm:min-h-[44px]"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Button>
          </AuthDialog>
        )}
        <p className="text-xs text-muted-foreground text-center mt-2">
          © 2024 AM
        </p>
      </div>
    </div>
  );

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/anishgithub890', color: 'hover:text-gray-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/anishpabe', color: 'hover:text-blue-400' },
    { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/971508572468', color: 'hover:text-green-400' },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="print:hidden fixed top-2 xxs:top-3 sm:top-4 left-2 xxs:left-3 sm:left-4 z-50 md:hidden bg-background/80 backdrop-blur-sm border border-border/50 h-8 w-8 xxs:h-10 xxs:w-10"
          >
            <Menu className="h-4 w-4 xxs:h-5 xxs:w-5 sm:h-6 sm:w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80vw] max-w-[300px] xxs:max-w-[320px] p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="h-full w-full bg-background">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="print:hidden hidden md:block fixed left-0 top-0 h-full w-56 lg:w-64 z-50 bg-background border-r">
        <SidebarContent />
      </div>
    </>
  );
} 