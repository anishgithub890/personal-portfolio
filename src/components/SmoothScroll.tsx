'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll to element with enhanced performance
  const scrollToElement = useCallback((elementId: string, offset: number = 64) => {
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById(elementId);
    if (element && containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const elementTop = element.offsetTop;
      const targetScroll = containerTop + elementTop - offset;
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, []);

  // Expose scroll function globally for other components
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    (window as unknown as Record<string, unknown>).scrollToElement = scrollToElement;
    return () => {
      delete (window as unknown as Record<string, unknown>).scrollToElement;
    };
  }, [scrollToElement]);

  // Enhanced scroll performance with throttling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let ticking = false;
    let lastKnownScrollPosition = 0;

    const updateScrollPosition = () => {
      lastKnownScrollPosition = window.scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-x-hidden w-full max-w-[100vw] box-border"
      style={{
        willChange: 'transform',
        overscrollBehavior: 'none',
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        paddingRight: '0px',
        boxSizing: 'border-box'
      }}
      layout
    >
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      
      {children}
    </motion.div>
  );
};

export default SmoothScroll;
