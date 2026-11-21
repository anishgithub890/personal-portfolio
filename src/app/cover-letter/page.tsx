import CoverLetter from '@/components/CoverLetter';
import { getAboutContent } from '@/lib/portfolio-content';

export const metadata = {
  title: 'Cover Letter - Anish Mahato',
  description: getAboutContent().personalInfo.whoIAm,
};

export default function CoverLetterPage() {
  return <CoverLetter />;
}

