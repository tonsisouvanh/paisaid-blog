'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, MessageSquare, Clock, Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      // In a real app, you would send the form data to your backend here

      // Randomly succeed or fail for demo purposes
      if (Math.random() > 0.2) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: 'general',
        });
      } else {
        setFormStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Get in Touch</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Have questions, feedback, or need assistance? We&apos;re here to help. Choose the best way to reach us
              below.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12">
          <div className="container px-4">
            <div className="mb-12 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Chat Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Get instant answers to your questions through our live chat support.
                  </p>
                  <div className="mb-2 flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Available 24/7</span>
                  </div>
                  <div className="mb-4 flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>Support in multiple languages</span>
                  </div>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Send us an email and we&apos;ll get back to you within 24 hours.
                  </p>
                  <div className="mb-4 space-y-2">
                    <div>
                      <p className="text-sm font-medium">General Inquiries:</p>
                      <p className="text-sm text-primary">info@travelspot.com</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Support:</p>
                      <p className="text-sm text-primary">support@travelspot.com</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Business Partnerships:</p>
                      <p className="text-sm text-primary">partners@travelspot.com</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:info@travelspot.com">Send Email</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Prefer to talk? Give us a call during our business hours.
                  </p>
                  <div className="mb-4 space-y-2">
                    <div>
                      <p className="text-sm font-medium">Customer Support:</p>
                      <p className="text-sm">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Business Hours:</p>
                      <p className="text-sm text-muted-foreground">Monday - Friday: 9AM - 6PM EST</p>
                      <p className="text-sm text-muted-foreground">Saturday: 10AM - 4PM EST</p>
                      <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="tel:+15551234567">Call Now</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid items-start gap-8 md:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="mb-6 text-2xl font-bold tracking-tight">Send Us a Message</h2>

                {formStatus === 'success' ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="py-6 text-center">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">Message Sent!</h3>
                        <p className="mb-4 text-muted-foreground">
                          Thank you for reaching out. We&apos;ve received your message and will get back to you shortly.
                        </p>
                        <Button onClick={() => setFormStatus('idle')}>Send Another Message</Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Card>
                      <CardContent className="pt-6">
                        {formStatus === 'error' && (
                          <div className="mb-4 flex items-start gap-2 rounded-md bg-destructive/10 px-4 py-3 text-destructive">
                            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">There was a problem sending your message</p>
                              <p className="text-sm">Please try again or use another contact method.</p>
                            </div>
                          </div>
                        )}

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="inquiryType">Inquiry Type</Label>
                            <RadioGroup
                              defaultValue="general"
                              value={formData.inquiryType}
                              onValueChange={handleRadioChange}
                              className="flex flex-wrap gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="general" id="general" />
                                <Label htmlFor="general">General</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="support" id="support" />
                                <Label htmlFor="support">Support</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="business" id="business" />
                                <Label htmlFor="business">Business</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="press" id="press" />
                                <Label htmlFor="press">Press</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                name="name"
                                placeholder="Your name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Your email address"
                                required
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="What is your message about?"
                              required
                              value={formData.subject}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="How can we help you?"
                              rows={5}
                              required
                              value={formData.message}
                              onChange={handleChange}
                            />
                          </div>

                          <Button type="submit" className="w-full" disabled={formStatus === 'submitting'}>
                            {formStatus === 'submitting' ? (
                              <>
                                <span className="mr-2">Sending...</span>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </form>
                )}
              </div>

              {/* FAQ and Office Info */}
              <div>
                <Tabs defaultValue="faq">
                  <TabsList className="mb-6 grid w-full grid-cols-2">
                    <TabsTrigger value="faq">FAQs</TabsTrigger>
                    <TabsTrigger value="office">Our Offices</TabsTrigger>
                  </TabsList>

                  <TabsContent value="faq" className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>How quickly will I receive a response?</AccordionTrigger>
                        <AccordionContent>
                          We aim to respond to all inquiries within 24 hours during business days. For urgent matters,
                          we recommend using our live chat support for immediate assistance.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How do I report a problem with a listing?</AccordionTrigger>
                        <AccordionContent>
                          You can report issues with listings directly on the listing page by clicking the
                          &quot;Report&quot; button. Alternatively, you can contact our support team through this form
                          by selecting &quot;Support&quot; as the inquiry type and providing details about the listing.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Can I update or remove my review?</AccordionTrigger>
                        <AccordionContent>
                          Yes, you can edit or delete your reviews at any time by going to your profile and accessing
                          your review history. If you&apos;re having trouble, our support team can assist you with
                          managing your reviews.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>How do I claim my business listing?</AccordionTrigger>
                        <AccordionContent>
                          Business owners can claim their listing by creating an account and clicking &quot;Claim This
                          Business&quot; on their listing page. You&apos;ll need to verify ownership through our
                          verification process. For assistance, select &quot;Business&quot; as your inquiry type in our
                          contact form.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>Is PaiSaiD available in my country?</AccordionTrigger>
                        <AccordionContent>
                          PaiSaiD is available worldwide! While our coverage may vary by region, we&apos;re constantly
                          expanding our database of places. If you notice missing locations in your area, you can help
                          by adding them to our platform.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>

                  <TabsContent value="office">
                    <div className="space-y-6">
                      <div className="relative mb-4 h-[300px] overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=600&width=800"
                          alt="PaiSaiD office location map"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Headquarters</CardTitle>
                            <CardDescription>San Francisco, USA</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm">123 Travel Street</p>
                            <p className="text-sm">San Francisco, CA 94105</p>
                            <p className="text-sm">United States</p>
                            <p className="mt-4 text-sm">
                              <span className="font-medium">Hours:</span> 9AM - 6PM (PST), Mon-Fri
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>European Office</CardTitle>
                            <CardDescription>London, UK</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm">456 Explorer Avenue</p>
                            <p className="text-sm">London, EC2A 4NE</p>
                            <p className="text-sm">United Kingdom</p>
                            <p className="mt-4 text-sm">
                              <span className="font-medium">Hours:</span> 9AM - 6PM (GMT), Mon-Fri
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" asChild>
                      <a href="#" aria-label="Facebook">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href="#" aria-label="Twitter">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href="#" aria-label="Instagram">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href="#" aria-label="LinkedIn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href="#" aria-label="YouTube">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="mb-4 text-2xl font-bold tracking-tight">Stay Updated</h2>
              <p className="mb-6 text-muted-foreground">
                Subscribe to our newsletter to receive travel tips, exclusive offers, and updates from PaiSaiD.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input placeholder="Enter your email" className="sm:flex-1" />
                <Button>Subscribe</Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from PaiSaiD.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
