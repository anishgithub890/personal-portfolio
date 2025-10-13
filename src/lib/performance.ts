// Performance optimization utilities

// Throttle function for scroll events
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce function for resize events
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Smooth scroll to element with offset
export function smoothScrollTo(elementId: string, offset: number = 64): void {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (element) {
    const elementTop = element.offsetTop - offset;
    window.scrollTo({
      top: elementTop,
      behavior: 'smooth'
    });
  }
}

// Check if element is in viewport
export function isInViewport(element: Element): boolean {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll position
export function getScrollPosition(): number {
  if (typeof window === 'undefined') return 0;
  return window.pageYOffset || document.documentElement.scrollTop;
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Optimized intersection observer
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined') return null;
  
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Performance monitoring
export function measurePerformance<T extends (...args: unknown[]) => unknown>(
  name: string,
  fn: T
): (...args: Parameters<T>) => unknown {
  return function(this: unknown, ...args: Parameters<T>): unknown {
    if (typeof performance === 'undefined') {
      return fn.apply(this, args);
    }
    
    const start = performance.now();
    const result = fn.apply(this, args);
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start}ms`);
    }
    
    return result;
  };
}

// Request animation frame wrapper
export function requestAnimationFrameWrapper(callback: () => void): void {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    window.requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 16); // Fallback to ~60fps
  }
}

// Optimized scroll handler
export function createScrollHandler(
  callback: (scrollY: number) => void,
  throttleMs: number = 16
): () => void {
  if (typeof window === 'undefined') return () => {};
  
  let ticking = false;
  
  return throttle(() => {
    if (!ticking) {
      requestAnimationFrameWrapper(() => {
        callback(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  }, throttleMs);
}

// Memory efficient event listener
export function addEventListenerWithCleanup(
  element: EventTarget,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler, options);
  
  return () => {
    element.removeEventListener(event, handler, options);
  };
}

// Optimized resize handler
export function createResizeHandler(
  callback: (width: number, height: number) => void,
  debounceMs: number = 250
): () => void {
  if (typeof window === 'undefined') return () => {};
  
  return debounce(() => {
    callback(window.innerWidth, window.innerHeight);
  }, debounceMs);
}

// Check if device is mobile
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Check if device supports touch
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Optimize for mobile performance
export function getMobileOptimizations(): {
  reducedAnimations: boolean;
  simplifiedEffects: boolean;
  lowerFrameRate: boolean;
} {
  if (typeof window === 'undefined') {
    return {
      reducedAnimations: false,
      simplifiedEffects: false,
      lowerFrameRate: false
    };
  }
  
  const isMobile = isMobileDevice();
  const isTouch = isTouchDevice();
  const prefersReduced = prefersReducedMotion();
  
  return {
    reducedAnimations: isMobile || prefersReduced,
    simplifiedEffects: isMobile,
    lowerFrameRate: isMobile && isTouch
  };
}
