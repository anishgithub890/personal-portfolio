import portfolioContent from '@/data/portfolio-content.json';
import type { PortfolioContent } from '@/types/portfolio-content';

// Type assertion to ensure the imported JSON matches our interface
const content = portfolioContent as PortfolioContent;

// Helper functions to access specific sections
export const getHeroContent = () => content.hero;
export const getAboutContent = () => content.about;
export const getExperienceContent = () => content.experience;
export const getSkillsContent = () => content.skills;
export const getContactContent = () => content.contact;
export const getFooterContent = () => content.footer;
export const getNavigationContent = () => content.navigation;

// Get all content
export const getAllContent = () => content;

// Helper function to get specific job experience
export const getJobExperience = (company: string) => {
  return content.experience.jobs.find(job => job.company === company);
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: keyof typeof content.skills.categories) => {
  return content.skills.categories[category];
};

// Helper function to get service information
export const getServiceInfo = (service: keyof typeof content.about.services) => {
  return content.about.services[service];
};

// Helper function to get form field information
export const getFormField = (field: keyof typeof content.contact.form.fields) => {
  return content.contact.form.fields[field];
};

// Export the content directly for backward compatibility
export default content; 