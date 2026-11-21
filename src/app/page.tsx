import Image from "next/image";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  Mail,
  ServerCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { CountUp, HoverLift, Reveal, SkillMeter } from "@/components/MotionPrimitives";
import { getAllContent, getAboutContent, getExperienceContent, getHeroContent, getSkillsContent } from "@/lib/portfolio-content";

function formatDuration(startDate: string, endDate: string, current: boolean) {
  return `${startDate} - ${current ? "Present" : endDate}`;
}

function formatCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    aiIot: "AI & IoT",
    devops: "DevOps",
  };

  return labels[category] ?? category.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export default function Home() {
  const hero = getHeroContent();
  const about = getAboutContent();
  const skills = getSkillsContent();
  const experience = getExperienceContent();

  const featuredExperience = experience.jobs.slice(0, 4);
  const serviceCards = Object.values(about.services);
  const heroHighlights = [
    { label: "AI Home", value: "CASABOT", icon: BrainCircuit },
    { label: "Cloud Ops", value: "AWS / EC2", icon: ServerCog },
    { label: "Data", value: "DocumentDB", icon: Database },
  ];
  const capabilityIcons = [Code2, ServerCog, Database, Cpu];

  return (
    <div className="relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(115deg,rgba(47,224,177,0.08),transparent_24%,rgba(255,255,255,0.04)_58%,transparent_76%)] [mask-image:linear-gradient(to_bottom,transparent,black_240px)]" />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 md:px-8 md:pb-16 lg:pt-12">
        <section id="home" className="hero-shell relative overflow-hidden">
          <div className="relative grid gap-12 xl:grid-cols-[1.4fr_0.8fr] xl:items-center">
            <Reveal>
              <p className="section-kicker mb-8">Independent thinking. End-to-end engineering.</p>

              <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[0.96] text-white sm:text-6xl xl:text-8xl">
                {hero.name}
                <span className="mt-6 block max-w-3xl text-2xl font-normal leading-tight text-white/60 sm:text-3xl xl:text-4xl">
                  {hero.title}
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {hero.description}
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
                  <HoverLift key={stat.label} className="metric-card">
                    <p className="font-[var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      <CountUp value={stat.value} />
                    </p>
                  </HoverLift>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12} className="relative mx-auto w-full max-w-md">
              <div className="portrait-card relative overflow-hidden">
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/15 pb-4">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Currently building
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CASABOT - AI HOME, privacy-first automation, and
                      intelligent workflows
                    </p>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_18px_rgba(47,224,177,0.9)]" />
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src="/thumbnail_profile.png"
                    alt="Anish Mahato portrait"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 via-black/20 to-transparent p-5">
                    <p className="text-sm font-medium text-white">
                      Production-minded engineer
                    </p>
                    <p className="mt-1 text-xs text-white/65">
                      Interfaces, APIs, cloud ops, and product polish.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {heroHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="min-w-0 border-t border-white/15 py-3"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm text-white">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal id="experience" className="section-card mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Experience</p>
              <h2 className="section-title mt-4">{experience.title}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              {experience.subtitle}
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {featuredExperience.map((job, index) => (
              <HoverLift
                key={`${job.company}-${job.position}-${index}`}
                className="experience-card"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-white">
                        {job.position}
                      </h3>
                      {job.current && (
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-white/82">{job.company}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="pill">{job.location}</span>
                      <span className="pill">
                        {formatDuration(
                          job.startDate,
                          job.endDate,
                          job.current,
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="max-w-sm text-sm leading-7 text-muted-foreground">
                    {job.description}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.technologies.slice(0, 8).map((tech) => (
                    <span key={tech} className="pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {job.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm leading-7 text-muted-foreground"
                      >
                        {achievement}
                      </div>
                    ))}
                </div>
              </HoverLift>
            ))}
          </div>
        </Reveal>

        <Reveal id="projects" className="section-card mt-8">
          <p className="section-kicker">Selected Work</p>
          <h2 className="section-title mt-4">Products I help build at CASABOT</h2>
          <div className="mt-10 divide-y divide-white/10">
            {getAllContent().projects.map((project, index) => (
              <article key={project.name} className="grid min-w-0 gap-5 py-8 lg:grid-cols-[3rem_1fr_1.2fr]">
                <span className="font-mono text-sm text-primary">0{index + 1}</span>
                <h3 className="max-w-sm text-xl font-medium tracking-tight text-white">{project.name}</h3>
                <div>
                {project.description && <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>}
                {project.bullets.length > 0 && <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-7 text-muted-foreground">{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal id="skills" className="section-card mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Capabilities</p>
              <h2 className="section-title mt-4">{skills.title}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              {skills.subtitle}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {Object.entries(skills.categories).map(([category, items]) => (
              <HoverLift key={category} className="skill-card">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-semibold capitalize text-white">
                    {formatCategoryLabel(category)}
                  </h3>
                  <span className="font-[var(--font-ibm-plex-mono)] text-xs uppercase tracking-[0.24em] text-primary/80">
                    {items.length} tools
                  </span>
                </div>
                <div className="space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="text-white">{skill.name}</span>
                        <CountUp
                          value={skill.proficiency}
                          suffix="%"
                          className="text-muted-foreground"
                        />
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <SkillMeter value={skill.proficiency} />
                      </div>
                    </div>
                  ))}
                </div>
              </HoverLift>
            ))}
          </div>

          <div className="mt-8 rounded-[26px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
              Additional Tools
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.otherSkills.map((skill) => (
                <span key={skill} className="pill text-white/80">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <section
          id="about"
          className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]"
        >
          <Reveal className="section-card">
            <p className="section-kicker">About</p>
            <h2 className="section-title mt-4">{about.title}</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
              <p>{about.personalInfo.whoIAm}</p>
              <p>{about.personalInfo.journey}</p>
              <p>{about.personalInfo.personal}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="section-card">
            <p className="section-kicker">What I Do</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {serviceCards.map((service, index) => {
                const Icon = capabilityIcons[index % capabilityIcons.length];
                return (
                  <HoverLift key={service.title} className="feature-card">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {service.technologies}
                    </p>
                  </HoverLift>
                );
              })}
            </div>
            <div className="mt-6 rounded-[24px] border border-white/10 bg-black/25 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                Education
              </p>
              <div className="mt-4 space-y-4">
                {about.education.map((item) => (
                  <div
                    key={`${item.degree}-${item.institution}`}
                    className="rounded-2xl border border-white/8 bg-white/[0.02] p-4"
                  >
                    <p className="font-medium text-white">{item.degree}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.institution}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.field}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal className="section-card mt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="section-kicker">Operating Principles</p>
              <h2 className="section-title mt-4">
                How I build products that hold up in production.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-3xl">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-sm font-medium text-white">
                  Product clarity
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Ship interfaces that make complex workflows easier to
                  understand, operate, and trust.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-sm font-medium text-white">
                  Reliable systems
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Design APIs, data flows, and deployments with security,
                  observability, and recovery in mind.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-sm font-medium text-white">Calm execution</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Move across frontend, backend, cloud, QA, and product UX
                  without losing delivery focus.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <section id="contact" className="mt-8">
          <Contact />
        </section>

        <Reveal className="mt-8">
          <div className="section-card flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="section-kicker">Engineering Partnership</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                From complex requirements to systems people depend on.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                I take ownership across product interfaces, AI services, and
                cloud infrastructure, connecting architecture decisions to
                tested releases and production operations. Let’s build software
                that earns trust in everyday use.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full px-7">
              <a href="mailto:anishgithub890@gmail.com">
                <Mail className="h-4 w-4" />
                Start a Conversation
              </a>
            </Button>
          </div>
        </Reveal>
      </div>

      <Footer />
    </div>
  );
}
