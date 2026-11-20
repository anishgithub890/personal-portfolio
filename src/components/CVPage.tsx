'use client';
import portfolioContent from '@/lib/portfolio-content';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Github, Linkedin, FileText, Globe } from 'lucide-react';
import type { JobExperience, Skill } from '@/types/portfolio-content';
import Image from 'next/image';

export default function CVPage() {
  const content = portfolioContent;
  const { hero, about, experience, skills, footer } = content;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Action Buttons - Hidden in print */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <Button onClick={handlePrint} variant="secondary" className="gap-2">
          <FileText className="h-4 w-4" />
          Print
        </Button>
      </div>

      {/* PDF Preview Modal removed */}

      {/* CV Container */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-2xl print:shadow-none min-h-screen">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground p-4 print:p-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1 print:text-xl">{hero.name}</h1>
              <p className="text-base mb-1 opacity-90 print:text-sm">{hero.title}</p>
              <p className="text-xs opacity-80 print:text-[10px]">{hero.description}</p>
              {about.personalInfo?.nationality && (
                <p className="text-[10px] opacity-80 mt-1 print:text-[9px]">Nationality: {about.personalInfo.nationality}</p>
              )}
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/anish.jpg"
                alt={hero.name}
                width={80}
                height={80}
                className="rounded-full border-2 border-white/20 print:w-16 print:h-16"
                priority
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="px-4 py-2 border-b bg-muted/30 print:py-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs leading-tight print:text-xs">
            <div className="inline-flex items-center gap-1 flex-nowrap whitespace-nowrap print:flex-nowrap print:whitespace-nowrap">
              <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground align-middle print:h-3 print:w-3 print:shrink-0" />
              <a href={`mailto:${footer.contact.email}`} className="hover:underline align-middle print:text-xs print:leading-none">
                {footer.contact.email}
              </a>
            </div>
            <div className="inline-flex items-center gap-1 flex-nowrap whitespace-nowrap print:flex-nowrap print:whitespace-nowrap">
              <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground align-middle print:h-3 print:w-3 print:shrink-0" />
              <a href={`https://wa.me/${footer.contact.whatsapp}`} className="hover:underline align-middle print:text-xs print:leading-none">
                {footer.contact.whatsapp}
              </a>
            </div>
            <div className="inline-flex items-center gap-1 flex-nowrap whitespace-nowrap print:flex-nowrap print:whitespace-nowrap">
              <Github className="h-3.5 w-3.5 shrink-0 text-muted-foreground align-middle print:h-3 print:w-3 print:shrink-0" />
              <a href={footer.social.github} target="_blank" rel="noopener noreferrer" className="hover:underline align-middle print:text-xs print:leading-none">
                GitHub
              </a>
            </div>
            <div className="inline-flex items-center gap-1 flex-nowrap whitespace-nowrap print:flex-nowrap print:whitespace-nowrap">
              <Linkedin className="h-3.5 w-3.5 shrink-0 text-muted-foreground align-middle print:h-3 print:w-3 print:shrink-0" />
              <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline align-middle print:text-xs print:leading-none">
                LinkedIn
              </a>
            </div>
            <div className="inline-flex items-center gap-1 flex-nowrap whitespace-nowrap print:flex-nowrap print:whitespace-nowrap">
              <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground align-middle print:h-3 print:w-3 print:shrink-0" />
              <a href={footer.contact.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline align-middle print:text-xs print:leading-none">
                Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 print:p-3">
          {/* Professional Summary */}
          <section className="mb-3 print:mb-2">
            <h2 className="text-lg font-bold mb-1 pb-1 border-b-2 border-primary print:text-sm">
              Professional Summary
            </h2>
            <p className="text-muted-foreground leading-relaxed text-xs print:text-[10px]">{about.personalInfo.whoIAm}</p>
          </section>

          {/* Work Experience */}
          <section className="mb-3 print:mb-2">
            <h2 className="text-lg font-bold mb-1 pb-1 border-b-2 border-primary print:text-sm">
              Work Experience
            </h2>
            <div className="space-y-2 print:space-y-1">
              {experience.jobs.map((job: JobExperience, index: number) => (
                <div key={index} className="print:break-inside-avoid">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-sm font-semibold print:text-xs">{job.position}</h3>
                      <p className="text-primary font-semibold text-xs print:text-[10px] underline decoration-primary/50 underline-offset-2">{job.company}</p>
                    </div>
                    <div className="text-right text-[10px] text-muted-foreground print:text-[8px]">
                      <p>{job.location}</p>
                      <p>{job.startDate} - {job.current ? 'Present' : job.endDate}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-1 text-[10px] print:text-[8px]">{job.description}</p>
                  
                  {/* Key Achievements */}
                  <div className="mb-1">
                    <p className="font-medium text-[10px] mb-0.5 print:text-[8px]">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-0 text-[10px] text-muted-foreground print:text-[8px]">
                      {job.achievements.map((achievement: string, idx: number) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {job.technologies.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-1 py-0.5 bg-muted text-[8px] rounded print:border print:border-gray-300 print:text-[7px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-3 print:mb-2 print:break-inside-avoid">
            <h2 className="text-lg font-bold mb-1 pb-1 border-b-2 border-primary print:text-sm">
              Education
            </h2>
            <div className="space-y-1">
              {about.education.map((edu: { degree: string; institution: string; field: string }, index: number) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold print:text-xs">{edu.degree}</h3>
                  <p className="text-primary font-medium text-xs print:text-[10px]">{edu.institution}</p>
                  <p className="text-[10px] text-muted-foreground print:text-[8px]">{edu.field}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-3 print:mb-2 print:break-inside-avoid">
            <h2 className="text-lg font-bold mb-1 pb-1 border-b-2 border-primary print:text-sm">
              Technical Skills
            </h2>
            <div className="space-y-1">
              {/* Frontend Skills */}
              <div>
                <h3 className="font-semibold mb-0.5 text-xs print:text-[10px]">Frontend Development</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.categories.frontend.map((skill: Skill, idx: number) => (
                    <span
                      key={idx}
                      className="px-1 py-0.5 bg-muted text-[10px] rounded print:border print:border-gray-300 print:text-[8px]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div>
                <h3 className="font-semibold mb-0.5 text-xs print:text-[10px]">Backend Development</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.categories.backend.map((skill: Skill, idx: number) => (
                    <span
                      key={idx}
                      className="px-1 py-0.5 bg-muted text-[10px] rounded print:border print:border-gray-300 print:text-[8px]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database Skills */}
              <div>
                <h3 className="font-semibold mb-0.5 text-xs print:text-[10px]">Database & Tools</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.categories.database.map((skill: Skill, idx: number) => (
                    <span
                      key={idx}
                      className="px-1 py-0.5 bg-muted text-[10px] rounded print:border print:border-gray-300 print:text-[8px]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Other Skills */}
              <div>
                <h3 className="font-semibold mb-0.5 text-xs print:text-[10px]">Other Tools & Technologies</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.otherSkills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-1 py-0.5 bg-muted text-[10px] rounded print:border print:border-gray-300 print:text-[8px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Interests */}
          <section className="print:break-inside-avoid">
            <h2 className="text-lg font-bold mb-1 pb-1 border-b-2 border-primary print:text-sm">
              Professional Interests
            </h2>
            <div className="flex flex-wrap gap-1">
              {about.interests.map((interest: string, idx: number) => (
                <span
                  key={idx}
                  className="px-1 py-0.5 bg-muted text-[10px] rounded print:border print:border-gray-300 print:text-[8px]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        {/* <div className="px-4 py-1 border-t text-center text-[10px] text-muted-foreground print:text-[8px]">
          <p>Generated from anishgithub890.vercel.app</p>
        </div> */}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0.2cm;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            line-height: 1.2 !important;
          }
        }
      `}</style>
    </div>
  );
}
