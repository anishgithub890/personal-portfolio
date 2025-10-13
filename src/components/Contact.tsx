'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Phone, Send, CheckCircle, User, Mail, MessageSquare } from 'lucide-react';
import { getContactContent } from '@/lib/portfolio-content';

const Contact = () => {
  const contactContent = getContactContent();
  
  const contactSchema = z.object({
    name: z.string().min(2, contactContent.validation.name),
    email: z.string().email(contactContent.validation.email),
    phoneNumber: z.string().min(10, contactContent.validation.phone),
    message: z.string().min(10, contactContent.validation.message),
  });

type ContactForm = z.infer<typeof contactSchema>;

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

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        const error = await response.json();
        alert(error.error || contactContent.errors.formSubmission);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert(contactContent.errors.networkError);
    } finally {
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {contactContent.title.split(' ')[0]} {contactContent.title.split(' ')[1]} <span className="gradient-text">{contactContent.title.split(' ')[2]}</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {contactContent.subtitle}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-foreground mb-2">
                      {contactContent.form.successMessage}
                    </h4>
                    <p className="text-foreground/70 mb-6">
                      {contactContent.form.successDescription}
                    </p>
                    
                    {/* Social Links in Success Message */}
                    <div className="border-t pt-6">
                      <h5 className="text-lg font-medium mb-4 text-foreground">
                        Connect with me
                      </h5>
                      <div className="flex justify-center items-center gap-6">
                        <motion.a
                          href="https://github.com/anishgithub890"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="transition-transform duration-200"
                        >
                          <img
                            src="/github_thumnail.png"
                            alt="GitHub"
                            className="w-14 h-14 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                          />
                        </motion.a>
                        <motion.a
                          href="https://www.linkedin.com/in/anishpabe/"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="transition-transform duration-200"
                        >
                          <img
                            src="/linkedin_thumnail.png"
                            alt="LinkedIn"
                            className="w-14 h-14 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                          />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                          <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{contactContent.form.title}</h3>
                        <p className="text-sm text-foreground/70 mt-1">
                          {contactContent.form.subtitle}
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{contactContent.form.fields.name.label}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder={contactContent.form.fields.name.placeholder}
                                    className="pl-10"
                                    {...field}
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
                              <FormLabel>{contactContent.form.fields.email.label}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    type="email"
                                    placeholder={contactContent.form.fields.email.placeholder}
                                    className="pl-10"
                                    {...field}
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
                            <FormLabel>{contactContent.form.fields.phone.label}</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="tel"
                                  placeholder={contactContent.form.fields.phone.placeholder}
                                  className="pl-10"
                                  {...field}
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
                            <FormLabel>{contactContent.form.fields.message.label}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={contactContent.form.fields.message.placeholder}
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            {contactContent.form.loadingText}
                          </>
                        ) : (
                          <>
                            <Send className="mr-2" size={20} />
                            {contactContent.form.submitButton}
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 