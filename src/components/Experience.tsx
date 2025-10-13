'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { getExperienceContent, getAboutContent } from '@/lib/portfolio-content';

import { Calendar, MapPin, ExternalLink, GraduationCap } from 'lucide-react';

const Experience = () => {
  const experienceContent = getExperienceContent();
  const aboutContent = getAboutContent();
  const experiences = experienceContent.jobs;
  const education = aboutContent.education;

  const formatYear = (date: string) => {
    return formatDate.year(date);
  };

  return (
    <section id="experience" className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {experienceContent.title.split(' ')[0]} <span className="gradient-text">{experienceContent.title.split(' ')[1]}</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {experienceContent.subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.position}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-semibold text-foreground">
                          {experience.position}
                        </h3>
                        {experience.current && (
                          <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-foreground/70 mb-4">
                        <div className="flex items-center gap-1">
                          <ExternalLink size={16} />
                          <span className="font-medium">{experience.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{experience.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>
                            {formatYear(experience.startDate)} - {experience.current ? 'Present' : formatYear(experience.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground/80 leading-relaxed mb-6">
                    {experience.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/80">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="gradient-text-animated">Education</span>
            </h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              My academic background and qualifications
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={`${edu.institution}-${edu.degree}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Card className="card-hover glass">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-2 text-foreground">
                          {edu.degree}
                        </h4>
                        <p className="text-foreground/70 mb-2 font-medium">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-foreground/60">
                          {edu.field}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 