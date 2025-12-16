'use client';

import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Code, Globe, Zap, Users, Award, BookOpen, Target, Heart } from 'lucide-react';
import { getAboutContent } from '@/lib/portfolio-content';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/3D/Scene3D'), { 
  ssr: false,
  loading: () => null
});

const About = () => {
  const aboutContent = getAboutContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const stats = [
    { icon: Code, label: aboutContent.stats[0].label, value: aboutContent.stats[0].value, color: 'text-blue-500' },
    { icon: Globe, label: aboutContent.stats[1].label, value: aboutContent.stats[1].value, color: 'text-green-500' },
    { icon: Zap, label: aboutContent.stats[2].label, value: aboutContent.stats[2].value, color: 'text-yellow-500' },
    { icon: Users, label: aboutContent.stats[3].label, value: aboutContent.stats[3].value, color: 'text-purple-500' },
  ];

  const interests = aboutContent.interests;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="py-16 md:py-24 bg-muted/30 relative overflow-hidden gpu-accelerated"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 w-full h-full opacity-25">
        <Scene3D 
          intensity={0.2}
          showControls={false}
          showStars={false}
          showParticles={true}
          cameraPosition={[0, 0, 6]}
        />
      </div>
      
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl z-0"
        animate={isInView ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl z-0"
        animate={isInView ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 mobile-text-3xl lg:mobile-text-5xl text-render-optimized">
            {aboutContent.title.split(' ')[0]} <span className="gradient-text-animated">{aboutContent.title.split(' ')[1]}</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mobile-text-lg">
            {aboutContent.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Enhanced Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.div 
                variants={itemVariants} 
                className="card-hover glass p-6 rounded-xl transition-smooth"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Heart className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-semibold mobile-text-xl">Who I Am</h3>
                </div>
                <p className="text-foreground/80 leading-relaxed mb-4 mobile-text-lg">
                  {aboutContent.personalInfo.whoIAm}
                </p>
                <p className="text-foreground/80 leading-relaxed mb-4 mobile-text-lg">
                  {aboutContent.personalInfo.journey}
                </p>
                <p className="text-foreground/80 leading-relaxed mobile-text-lg">
                  {aboutContent.personalInfo.personal}
                </p>
              </motion.div>

              <motion.div 
                variants={itemVariants} 
                className="card-hover glass p-6 rounded-xl transition-smooth"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BookOpen className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-semibold mobile-text-xl">Education</h3>
                </div>
                <div className="space-y-4">
                  {aboutContent.education.map((edu, index) => (
                    <motion.div 
                      key={index} 
                      className="border-l-4 border-primary pl-4 hover:border-primary/70 transition-colors"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h4 className="font-semibold text-foreground mobile-text-lg">{edu.degree}</h4>
                      <p className="text-foreground/80 mobile-text-base">{edu.institution}</p>
                      <p className="text-sm text-foreground/70">{edu.field}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants} 
                className="card-hover glass p-6 rounded-xl transition-smooth"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Target className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-semibold mobile-text-xl">What I Do</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: aboutContent.services.frontend.title, tech: aboutContent.services.frontend.technologies },
                    { title: aboutContent.services.backend.title, tech: aboutContent.services.backend.technologies },
                    { title: aboutContent.services.devops.title, tech: aboutContent.services.devops.technologies },
                    { title: aboutContent.services.design.title, tech: aboutContent.services.design.technologies }
                  ].map((service, index) => (
                    <motion.div 
                      key={service.title}
                      className="space-y-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h4 className="font-medium text-foreground mobile-text-base">{service.title}</h4>
                      <p className="text-sm text-foreground/70">{service.tech}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 card-hover glass gpu-accelerated">
                    <CardContent className="p-0">
                      <motion.div 
                        className={`w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center ${stat.color}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <stat.icon className="w-6 h-6" />
                      </motion.div>
                      <div className="text-2xl font-bold text-foreground mb-1 mobile-text-2xl">
                        {stat.value}
                      </div>
                      <div className="text-sm text-foreground/70 mobile-text-sm">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <Card className="p-6 card-hover glass gpu-accelerated">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Award className="w-5 h-5 text-primary" />
                    </motion.div>
                    <h4 className="font-semibold mobile-text-lg">Areas of Interest</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <motion.div
                        key={interest}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <Badge variant="secondary" className="text-xs hover:bg-primary/20 transition-colors">
                          {interest}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 