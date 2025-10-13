'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSkillsContent, getNavigationContent } from '@/lib/portfolio-content';

const Skills = () => {
  const skillsContent = getSkillsContent();
  const navigationContent = getNavigationContent();
  const skillCategories = skillsContent.categories;

  const SkillBar = ({ name, proficiency }: { name: string; proficiency: number }) => (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-foreground mobile-text-base">{name}</span>
        <span className="text-sm text-foreground/70 bg-primary/10 px-2 py-1 rounded-full">{proficiency}%</span>
      </div>
      <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full"></div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative h-3 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer"></div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-12 md:py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 mobile-text-3xl lg:mobile-text-5xl">
            {skillsContent.title.split(' ')[0]} <span className="gradient-text-animated">{skillsContent.title.split(' ')[1]}</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mobile-text-lg">
            {skillsContent.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="flex w-full mb-8 glass p-1 rounded-lg">
              <TabsTrigger 
                value="frontend" 
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 h-10 rounded-md data-[state=active]:shadow-md text-sm md:text-base px-3 md:px-4"
              >
                {navigationContent.skillTabs[0]}
              </TabsTrigger>
              <TabsTrigger 
                value="backend"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 h-10 rounded-md data-[state=active]:shadow-md text-sm md:text-base px-3 md:px-4"
              >
                {navigationContent.skillTabs[1]}
              </TabsTrigger>
              <TabsTrigger 
                value="database"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:bg-primary/10 h-10 rounded-md data-[state=active]:shadow-md text-sm md:text-base px-3 md:px-4"
              >
                {navigationContent.skillTabs[2]}
              </TabsTrigger>
            </TabsList>

            {Object.entries(skillCategories).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <motion.div 
                  className="grid md:grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="card-hover glass p-6 rounded-xl">
                    <h3 className="text-xl md:text-2xl font-semibold mb-6 capitalize mobile-text-xl">
                      {category} Technologies
                    </h3>
                    <div className="space-y-4">
                      {skills.slice(0, Math.ceil(skills.length / 2)).map((skill) => (
                        <SkillBar key={skill.name} {...skill} />
                      ))}
                    </div>
                  </div>
                  <div className="card-hover glass p-6 rounded-xl">
                    <div className="space-y-4">
                      {skills.slice(Math.ceil(skills.length / 2)).map((skill) => (
                        <SkillBar key={skill.name} {...skill} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Enhanced Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="card-hover glass">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 mobile-text-2xl">
                  Other Skills & Tools
                </h3>
                <p className="text-foreground/70 mobile-text-base">
                  Additional technologies and tools I work with
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {skillsContent.otherSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="text-sm px-4 py-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <Card className="card-hover glass text-center p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <h4 className="font-semibold mb-2 mobile-text-lg">Frontend</h4>
              <p className="text-sm text-foreground/70 mobile-text-sm">
                React, Next.js, TypeScript, Tailwind CSS
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover glass text-center p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <h4 className="font-semibold mb-2 mobile-text-lg">Backend</h4>
              <p className="text-sm text-foreground/70 mobile-text-sm">
                Node.js, Express
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-hover glass text-center p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <h4 className="font-semibold mb-2 mobile-text-lg">DevOps</h4>
              <p className="text-sm text-foreground/70 mobile-text-sm">
                Docker, AWS, CI/CD, Git
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 