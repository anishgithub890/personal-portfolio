'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, Mail, Phone, Send, User } from 'lucide-react';
import { getContactContent } from '@/lib/portfolio-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const contactContent = getContactContent();

const contactSchema = z.object({
  name: z.string().min(2, contactContent.validation.name),
  email: z.string().email(contactContent.validation.email),
  phoneNumber: z.string().min(10, contactContent.validation.phone),
  message: z.string().min(10, contactContent.validation.message),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactForm) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || contactContent.errors.formSubmission);
      }

      setIsSubmitted(true);
      form.reset();
      window.setTimeout(() => setIsSubmitted(false), 3200);
    } catch (error) {
      const message = error instanceof Error ? error.message : contactContent.errors.networkError;
      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
      <div className="section-card">
        <p className="section-kicker">Contact</p>
        <h2 className="section-title mt-4">{contactContent.title}</h2>
        <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">{contactContent.subtitle}</p>

        <div className="mt-8 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-medium text-white">Email</p>
            <a
              href="mailto:anishgithub890@gmail.com"
              className="mt-2 inline-flex text-sm text-muted-foreground hover:text-primary"
            >
              anishgithub890@gmail.com
            </a>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-medium text-white">Phone / WhatsApp</p>
            <a
              href="https://wa.me/971508572468"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex text-sm text-muted-foreground hover:text-primary"
            >
              +971 50 857 2468
            </a>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-medium text-white">Best fit</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Product teams looking for strong full stack execution, dashboard UX, and scalable web systems.
            </p>
          </div>
        </div>
      </div>

      <Card className="rounded-[30px] border-white/10 bg-white/[0.03] py-0 shadow-2xl shadow-black/10 backdrop-blur-xl">
        <CardContent className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="rounded-full border border-primary/25 bg-primary/10 p-4">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{contactContent.form.successMessage}</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                {contactContent.form.successDescription}
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-primary/80">Message Me</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{contactContent.form.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{contactContent.form.subtitle}</p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{contactContent.form.fields.name.label}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              placeholder={contactContent.form.fields.name.placeholder}
                              className="h-12 rounded-2xl border-white/10 bg-black/20 pl-11 text-white placeholder:text-muted-foreground"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{contactContent.form.fields.email.label}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              type="email"
                              placeholder={contactContent.form.fields.email.placeholder}
                              className="h-12 rounded-2xl border-white/10 bg-black/20 pl-11 text-white placeholder:text-muted-foreground"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">{contactContent.form.fields.phone.label}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="tel"
                            placeholder={contactContent.form.fields.phone.placeholder}
                            className="h-12 rounded-2xl border-white/10 bg-black/20 pl-11 text-white placeholder:text-muted-foreground"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">{contactContent.form.fields.message.label}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={7}
                          placeholder={contactContent.form.fields.message.placeholder}
                          className="rounded-[24px] border-white/10 bg-black/20 text-white placeholder:text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full">
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/70 border-t-transparent" />
                      {contactContent.form.loadingText}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {contactContent.form.submitButton}
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
