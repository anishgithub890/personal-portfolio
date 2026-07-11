import Image from 'next/image';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getAboutContent, getExperienceContent, getHeroContent, getSkillsContent } from '@/lib/portfolio-content';

function formatDuration(startDate: string, endDate: string, current: boolean) {
  const start = startDate.includes('-') ? startDate.slice(0, 7) : startDate;
  const end = current ? 'Present' : endDate.includes('-') ? endDate.slice(0, 7) : endDate;
  return `${start} - ${end}`;
}

export default function Home() {
  const hero = getHeroContent();
  const about = getAboutContent();
  const skills = getSkillsContent();
  const experience = getExperienceContent();

  const featuredExperience = experience.jobs.slice(0, 4);
  const serviceCards = Object.values(about.services);

  return (
    <div className="relative overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 md:px-8 md:pb-16 md:pt-12">
        <section id="home" className="section-card relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,224,177,0.18),transparent_24%),radial-gradient(circle_at_left,rgba(128,142,255,0.14),transparent_20%)]" />
          <div className="relative grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                <Badge className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-primary hover:bg-primary/15">
                  {hero.greeting}
                </Badge>
                <span className="pill">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Building smoother digital products
                </span>
              </div>

              <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.02] text-white sm:text-5xl xl:text-7xl">
                {hero.name}
                <span className="mt-4 block text-2xl font-medium text-white/72 sm:text-3xl xl:text-4xl">
                  {hero.title}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {hero.description} I build robust frontends, ship scalable backend systems, and care deeply
                about making products feel polished in real use.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-7">
                  <a href="#contact">
                    Let&apos;s Work Together
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {about.stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="font-[var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[32px] bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/20">
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">Currently building</p>
                    <p className="text-xs text-muted-foreground">CASABOT - AI HOME, privacy-first automation, and intelligent workflows</p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_rgba(47,224,177,0.9)]" />
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10">
                  <Image
                    src="/thumbnail_profile.png"
                    alt="Anish Mahato portrait"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Location</p>
                    <p className="mt-2 text-sm text-white">Dubai, UAE</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Focus</p>
                    <p className="mt-2 text-sm text-white">UX + Full Stack</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="section-card">
            <p className="section-kicker">About</p>
            <h2 className="section-title mt-4">{about.title}</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
              <p>{about.personalInfo.whoIAm}</p>
              <p>{about.personalInfo.journey}</p>
              <p>{about.personalInfo.personal}</p>
            </div>
          </div>

          <div className="section-card">
            <p className="section-kicker">What I Do</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {serviceCards.map((service) => (
                <div key={service.title} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.technologies}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Education</p>
              <div className="mt-4 space-y-4">
                {about.education.map((item) => (
                  <div key={`${item.degree}-${item.institution}`} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                    <p className="font-medium text-white">{item.degree}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.institution}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.field}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-card mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Capabilities</p>
              <h2 className="section-title mt-4">{skills.title}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">{skills.subtitle}</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {Object.entries(skills.categories).map(([category, items]) => (
              <div key={category} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-semibold capitalize text-white">{category}</h3>
                  <span className="font-[var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.24em] text-primary/80">
                    {items.length} tools
                  </span>
                </div>
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-cyan-300"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[26px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Additional Tools</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.otherSkills.map((skill) => (
                <span key={skill} className="pill text-white/80">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-card mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Experience</p>
              <h2 className="section-title mt-4">{experience.title}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">{experience.subtitle}</p>
          </div>

          <div className="mt-8 space-y-5">
            {featuredExperience.map((job, index) => (
              <div
                key={`${job.company}-${job.position}-${index}`}
                className="rounded-[28px] border border-white/10 bg-black/20 p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-white">{job.position}</h3>
                      {job.current && (
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-white/82">{job.company}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="pill">{job.location}</span>
                      <span className="pill">{formatDuration(job.startDate, job.endDate, job.current)}</span>
                    </div>
                  </div>
                  <div className="max-w-sm text-sm leading-7 text-muted-foreground">{job.description}</div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.technologies.slice(0, 8).map((tech) => (
                    <span key={tech} className="pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {job.achievements.slice(0, 4).map((achievement, achievementIndex) => (
                    <div
                      key={achievementIndex}
                      className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm leading-7 text-muted-foreground"
                    >
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card mt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="section-kicker">Why This Version Feels Better</p>
              <h2 className="section-title mt-4">Built for clarity, speed, and trust.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-3xl">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-sm font-medium text-white">Less visual noise</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">Removed heavy 3D and loading effects that were making the site feel unstable.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-sm font-medium text-white">Stronger hierarchy</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">Content now reads in a cleaner order so visitors understand your value faster.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-sm font-medium text-white">Better mobile UX</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">The layout now scales down more naturally without overflow and interaction clutter.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mt-8">
          <Contact />
        </section>

        <section className="mt-8">
          <div className="section-card flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="section-kicker">Next Step</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Need a reliable product engineer?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                I can help with polished frontend architecture, scalable APIs, enterprise dashboards, and smoother product UX.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full px-7">
              <a href="mailto:anishgithub890@gmail.com">
                <Mail className="h-4 w-4" />
                Start a Conversation
              </a>
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
