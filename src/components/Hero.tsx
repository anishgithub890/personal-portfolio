'use client';

import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Mail, Download, Play, FileText } from 'lucide-react';
import { getHeroContent } from '@/lib/portfolio-content';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/3D/Scene3D'), { 
  ssr: false,
  loading: () => null
});

const Hero = () => {
  const heroContent = getHeroContent();
  const [isTyping, setIsTyping] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // 3D tilt effect for profile image with performance optimization
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    setIsTyping(true);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const elementTop = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  // Particle effect component with performance optimization
  const Particles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => i); // Reduced particle count for better performance
    
    return (
      <div className="particles">
        {particles.map((i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [100, 0, -100, -200]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              delay: Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="min-h-[100vh] flex items-center justify-center relative overflow-hidden gpu-accelerated pt-16 pb-24 xxs:py-16 sm:py-8 max-w-full w-full"
      style={{ maxWidth: '100%', overflowX: 'hidden' }}
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 w-full h-full">
        <Scene3D 
          intensity={0.3}
          showControls={false}
          showStars={true}
          showParticles={true}
          cameraPosition={[0, 0, 5]}
        />
      </div>
      
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      
      {/* Animated Background with reduced motion support */}
      <motion.div 
        className="absolute inset-0 animated-bg opacity-10 hidden md:block z-0"
        animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Particle Effects - Now handled by 3D scene */}
      <div className="hidden md:block opacity-30">
        <Particles />
      </div>

      {/* Floating Elements with staggered animation */}
      <motion.div 
        className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-6 h-6 bg-primary/20 rounded-full hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-3 h-3 bg-primary/40 rounded-full hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-5 h-5 bg-primary/25 rounded-full hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-20 w-full max-w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          {/* Enhanced Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 order-2 lg:order-2 mt-8 sm:mt-0"
          >
            <div 
              className="relative cursor-pointer mx-auto w-full max-w-[300px] xxs:max-w-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Enhanced glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Profile image container with 3D effect */}
              <motion.div 
                className="relative aspect-square w-36 h-36 xxs:w-48 xxs:h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl hover-3d gpu-accelerated"
                style={{
                  transformStyle: 'preserve-3d',
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/thumbnail_profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high" 
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 320px) 144px, (max-width: 480px) 192px, (max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
                
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
                
                {/* Overlay with shimmer effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%']
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              </motion.div>
              
              {/* Enhanced decorative elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-6 sm:w-8 h-6 sm:h-8 bg-primary rounded-full opacity-60"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-5 sm:w-6 h-5 sm:h-6 bg-primary/40 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Play button overlay */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 text-center lg:text-left order-1 lg:order-1 mt-8 sm:mt-0"
          >
            {/* Enhanced Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base xs:text-lg md:text-xl text-foreground/80 mb-3 sm:mb-4"
            >
              {heroContent.greeting}
            </motion.p>

            {/* Enhanced Name with typing animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-render-optimized"
            >
              <span className={`gradient-text-animated ${isTyping ? 'typing-animation' : ''}`}>
                {heroContent.name}
              </span>
            </motion.h1>

            {/* Enhanced Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/80 mb-6 sm:mb-8"
            >
              {heroContent.title}
            </motion.h2>

            {/* Enhanced Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-sm xs:text-base sm:text-lg lg:text-xl text-foreground/70 mb-8 sm:mb-12 max-w-2xl lg:max-w-none leading-relaxed"
            >
              {heroContent.description}
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-8 sm:mb-16"
            >
              <Button
                size="lg"
                className="w-full xs:w-auto text-sm xs:text-base sm:text-lg px-4 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 btn-glow shadow-lg btn-interactive transition-smooth"
                onClick={() => scrollToSection('about')}
              >
                {heroContent.buttons.primary}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full xs:w-auto text-sm xs:text-base sm:text-lg px-4 sm:px-8 py-5 sm:py-6 border-2 hover-3d glass btn-interactive transition-smooth"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="mr-2" size={18} />
                {heroContent.buttons.secondary}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full xs:w-auto text-sm xs:text-base sm:text-lg px-4 sm:px-8 py-5 sm:py-6 btn-interactive transition-smooth"
                onClick={() => window.open('/cv', '_blank')}
              >
                <FileText className="mr-2" size={18} />
                View CV
              </Button>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 max-w-xs xs:max-w-sm sm:max-w-md mx-auto lg:mx-0"
            >
              {[
                { value: "3+", label: "Years Experience" },
                { value: "5+", label: "Projects" },
                { value: "100%", label: "Satisfaction" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-foreground/60 hover:text-foreground transition-colors p-2 rounded-full hover:bg-white/10 backdrop-blur-sm btn-interactive"
          >
            <ArrowDown size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 