'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import GithubContributions from '@/components/GithubContributions';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingCursor from '@/components/FloatingCursor';
import { LoadingProgress } from '@/components/LoadingProgress';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
    
    // Check if we've already loaded this session
    const hasLoaded = sessionStorage.getItem('portfolioLoaded');
    
    if (hasLoaded) {
      setIsLoading(false);
    } else {
      // Simulate loading time for better UX
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('portfolioLoaded', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Enhanced scroll detection with intersection observer
  useEffect(() => {
    if (!isClient || isLoading || typeof window === 'undefined') return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(sectionId));
        } else {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            newSet.delete(sectionId);
            return newSet;
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = ['home', 'about', 'skills', 'github', 'experience', 'contact'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isClient, isLoading]);

  // Preload critical resources
  useEffect(() => {
    if (isClient && !isLoading) {
      // Preload hero image
      const img = new Image();
      img.src = '/thumbnail_profile.jpg';
      img.fetchPriority = 'high';
    }
  }, [isClient, isLoading]);

  // Show loading screen until client-side hydration is complete
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-md w-full px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">A</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Anish Mahato
            </h2>
            <p className="text-muted-foreground text-sm">
              Full Stack Developer
            </p>
          </motion.div>
          
          <LoadingProgress 
            duration={2000}
            onComplete={() => setIsLoading(false)}
            className="mb-6"
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="space-y-2"
          >
            <p className="text-foreground/70 text-sm">
              Loading your experience...
            </p>
            <div className="flex justify-center space-x-1">
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-background page-transition overflow-x-hidden">
        {/* Floating Cursor Effect */}
        <FloatingCursor />
        
        <AnimatePresence mode="wait">
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-full overflow-x-hidden scroll-smooth"
            style={{ maxWidth: '100%', overflowX: 'hidden' }}
          >
            <div id="home" className={visibleSections.has('home') ? 'scroll-fade-in visible' : 'scroll-fade-in'}>
              <Hero />
            </div>
            <div id="about" className={visibleSections.has('about') ? 'scroll-fade-in visible' : 'scroll-fade-in'}>
              <About />
            </div>
            <div id="skills" className={visibleSections.has('skills') ? 'scroll-fade-in visible' : 'scroll-fade-in'}>
              <Skills />
            </div>
            <div id="github" className={visibleSections.has('github') ? 'scroll-fade-in visible' : 'scroll-fade-in'}>
              <GithubContributions 
                username={process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'anishgithub890'}
                from="2023-02-01"
                to="2024-01-31"
              />
            </div>
            <div id="experience" className={visibleSections.has('experience') ? 'scroll-fade-in visible' : 'scroll-fade-in'}>
              <Experience />
            </div>
            <div id="contact" className={visibleSections.has('contact') ? 'scroll-fade-in visible' : 'scroll-fade-in'}>
              <Contact />
            </div>
          </motion.div>
        </AnimatePresence>  
        
        <Footer />
      </div>
    </SmoothScroll>
  );
}
