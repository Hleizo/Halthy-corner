'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { Breadcrumbs, Button, Input, Textarea, Select } from '@/components/ui';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />
          <h1 className="text-3xl font-bold text-neutral-800 mt-4">Contact Us</h1>
          <p className="text-neutral-600 mt-2">
            We&apos;re here to help with any questions about our products or services
          </p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact cards */}
              <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Phone Support</h3>
                    <p className="text-neutral-500 text-sm mb-2">
                      Speak with our product experts
                    </p>
                    <a
                      href="tel:+1-800-123-4567"
                      className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
                    >
                      1-800-123-4567
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Email Us</h3>
                    <p className="text-neutral-500 text-sm mb-2">
                      We&apos;ll respond within 24 hours
                    </p>
                    <a
                      href="mailto:support@healthycorner.com"
                      className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
                    >
                      support@healthycorner.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Our Location</h3>
                    <p className="text-neutral-500 text-sm mb-2">Visit our headquarters</p>
                    <p className="text-neutral-600">
                      123 Health Street
                      <br />
                      Medical District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Business Hours</h3>
                    <p className="text-neutral-500 text-sm mb-2">
                      When we&apos;re available
                    </p>
                    <p className="text-neutral-600">
                      Mon - Fri: 9AM - 8PM EST
                      <br />
                      Sat: 10AM - 6PM EST
                      <br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-neutral-50 p-6 rounded-2xl">
                <h3 className="font-semibold text-neutral-800 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/faq"
                      className="flex items-center gap-2 text-neutral-600 hover:text-primary-500 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Frequently Asked Questions</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-neutral-600 hover:text-primary-500 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Live Chat Support</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 lg:p-10 rounded-2xl border border-neutral-100 shadow-soft">
                <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-neutral-500 mb-8">
                  Fill out the form below and we&apos;ll get back to you as soon as possible
                </p>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-success-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-neutral-500 mb-6">
                      Thank you for contacting us. We&apos;ll respond within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'general',
                          message: '',
                        });
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        helperText="Optional"
                      />
                      <Select
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        options={[
                          { value: 'general', label: 'General Inquiry' },
                          { value: 'product', label: 'Product Question' },
                          { value: 'order', label: 'Order Support' },
                          { value: 'technical', label: 'Technical Support' },
                          { value: 'returns', label: 'Returns & Refunds' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                    </div>

                    <Textarea
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={6}
                      required
                    />

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        className="w-4 h-4 mt-1 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                        required
                      />
                      <label htmlFor="consent" className="text-sm text-neutral-500">
                        I agree to the{' '}
                        <a href="#" className="text-primary-500 hover:underline">
                          Privacy Policy
                        </a>{' '}
                        and consent to being contacted regarding my inquiry.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-12 lg:py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="aspect-[21/9] bg-neutral-200 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
              <p className="text-neutral-500">Map Placeholder</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
