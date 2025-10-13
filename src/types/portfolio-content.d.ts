export interface HeroContent {
  greeting: string;
  name: string;
  title: string;
  description: string;
  buttons: {
    primary: string;
    secondary: string;
  };
}

export interface AboutContent {
  title: string;
  subtitle: string;
  personalInfo: {
    whoIAm: string;
    journey: string;
    personal: string;
    nationality?: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    field: string;
  }>;
  services: {
    frontend: { title: string; technologies: string };
    backend: { title: string; technologies: string };
    devops: { title: string; technologies: string };
    design: { title: string; technologies: string };
  };
  stats: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
  interests: string[];
}

export interface JobExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface EducationInfo {
  title: string;
  degree: string;
  institution: string;
  duration: string;
  gpa: string;
  description: string;
}

export interface ExperienceContent {
  title: string;
  subtitle: string;
  jobs: JobExperience[];
  education: EducationInfo;
}

export interface Skill {
  name: string;
  proficiency: number;
}

export interface SkillsContent {
  title: string;
  subtitle: string;
  categories: {
    frontend: Skill[];
    backend: Skill[];
    database: Skill[];
    devops: Skill[];
  };
  otherSkills: string[];
}

export interface ContactFormFields {
  name: { label: string; placeholder: string };
  email: { label: string; placeholder: string };
  phone: { label: string; placeholder: string };
  message: { label: string; placeholder: string };
}

export interface ContactContent {
  title: string;
  subtitle: string;
  form: {
    title: string;
    subtitle: string;
    fields: ContactFormFields;
    submitButton: string;
    loadingText: string;
    successMessage: string;
    successDescription: string;
  };
  validation: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  errors: {
    formSubmission: string;
    networkError: string;
  };
}

export interface FooterContent {
  brand: {
    initials: string;
    tagline: string;
  };
  contact: {
    email: string;
    whatsapp: string;
  };
  social: {
    github: string;
    linkedin: string;
  };
  sections: {
    contactInfo: string;
    connect: string;
    builtWith: string;
  };
  builtWithDescription: string;
  copyright: string;
}

export interface NavigationContent {
  sections: string[];
  skillTabs: string[];
}

export interface PortfolioContent {
  hero: HeroContent;
  about: AboutContent;
  experience: ExperienceContent;
  skills: SkillsContent;
  contact: ContactContent;
  footer: FooterContent;
  navigation: NavigationContent;
} 