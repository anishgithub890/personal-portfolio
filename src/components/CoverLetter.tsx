'use client';
import portfolioContent from '@/lib/portfolio-content';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Github, Linkedin, FileText, Globe } from 'lucide-react';
import Image from 'next/image';

export default function CoverLetter() {
  const content = portfolioContent;
  const { hero, footer, coverLetter } = content;
  
  // Get current date for cover letter
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

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

      {/* Cover Letter Container */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl print:shadow-none min-h-screen">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground p-6 print:p-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2 print:text-2xl">{hero.name}</h1>
              <p className="text-lg mb-1 opacity-90 print:text-base">{hero.title}</p>
              <p className="text-sm opacity-80 print:text-xs">{hero.description}</p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/anish.jpg"
                alt={hero.name}
                width={100}
                height={100}
                className="rounded-full border-2 border-white/20 print:w-20 print:h-20"
                priority
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="px-6 py-3 border-b bg-muted/30 print:px-4 print:py-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm print:text-xs">
            <div className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
              <a href={`mailto:${footer.contact.email}`} className="hover:underline">
                {footer.contact.email}
              </a>
            </div>
            <div className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
              <a href={`https://wa.me/${footer.contact.whatsapp}`} className="hover:underline">
                {footer.contact.whatsapp}
              </a>
            </div>
            <div className="inline-flex items-center gap-2">
              <Github className="h-4 w-4 shrink-0 text-muted-foreground" />
              <a href={footer.social.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </div>
            <div className="inline-flex items-center gap-2">
              <Linkedin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </div>
            <div className="inline-flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
              <a href={footer.contact.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Cover Letter Content */}
        <div className="p-8 print:p-6">
          <div className="space-y-6 print:space-y-4">
            {/* Date */}
            <p className="text-sm text-muted-foreground print:text-xs">{currentDate}</p>
            
            {/* Recipient */}
            <div className="text-sm print:text-xs">
              <p className="font-semibold text-foreground">{coverLetter.recipient.title}</p>
            </div>
            
            {/* Opening Paragraph */}
            <p className="text-sm leading-relaxed text-muted-foreground print:text-xs">
              {coverLetter.opening}
            </p>
            
            {/* Body Paragraphs */}
            {coverLetter.body.map((paragraph: string, index: number) => (
              <p key={index} className="text-sm leading-relaxed text-muted-foreground print:text-xs">
                {paragraph}
              </p>
            ))}
            
            {/* Closing Paragraph */}
            <p className="text-sm leading-relaxed text-muted-foreground print:text-xs">
              {coverLetter.closing}
            </p>
            
            {/* Signature */}
            <div className="mt-8 text-sm print:text-xs print:mt-6">
              <p className="mb-2">{coverLetter.signature.farewell},</p>
              <p className="font-semibold text-foreground text-base print:text-sm">{coverLetter.signature.name}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 1.5cm 1.5cm 1cm 1.5cm;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          * {
            line-height: 1.4 !important;
          }

          /* Hide browser default header and footer */
          @page {
            margin-top: 0;
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}

