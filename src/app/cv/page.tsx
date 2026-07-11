import { Metadata } from 'next';
import CVPage from '@/components/CVPage'; 

export const metadata: Metadata = {
  title: 'Anish Mahato - CV',
  description: 'Professional CV of Anish Mahato - Full Stack Engineer',
};

export default function CV() {
  return <CVPage />;
}

