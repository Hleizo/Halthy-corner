import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Award,
  Users,
  HeartPulse,
  Target,
  Shield,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { Breadcrumbs, Button, Testimonials } from '@/components/ui';
import { testimonials } from '@/data';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Healthy Corner\'s mission to provide CE-certified medical devices for home health monitoring. Our story, values, and commitment to accuracy and reliability.',
  openGraph: {
    title: 'About Healthy Corner',
    description:
      'Learn about our mission to provide CE-certified medical devices for home health monitoring.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={[{ label: 'About Us' }]} />
          <h1 className="text-3xl font-bold text-neutral-800 mt-4">About Healthy Corner</h1>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 text-sm font-semibold rounded-full mb-6">
                Our Story
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-6 leading-tight">
                Empowering People to Take Control of Their Health
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                Founded in 2010, Healthy Corner began with a simple mission: to make
                professional-grade health monitoring accessible to everyone. We
                believe that understanding your health shouldn&apos;t require a
                trip to the doctor for every reading.
              </p>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                Today, we&apos;re proud to serve thousands of customers across Jordan,
                providing CE-certified medical devices that deliver the accuracy
                and reliability you&apos;d expect from hospital equipment—right in
                the comfort of your home.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary-500">50K+</p>
                  <p className="text-neutral-500">Happy Customers</p>
                </div>
                <div className="w-px h-12 bg-neutral-200" />
                <div>
                  <p className="text-3xl font-bold text-primary-500">15+</p>
                  <p className="text-neutral-500">Years Experience</p>
                </div>
                <div className="w-px h-12 bg-neutral-200" />
                <div>
                  <p className="text-3xl font-bold text-primary-500">100%</p>
                  <p className="text-neutral-500">CE Certified</p>
                </div>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl flex items-center justify-center">
              <div className="text-center p-8">
                <HeartPulse className="w-24 h-24 text-primary-300 mx-auto mb-4" />
                <p className="text-primary-400 font-medium">About Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 lg:p-10 rounded-2xl border border-neutral-100">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">Our Mission</h3>
              <p className="text-neutral-600 leading-relaxed">
                To democratize health monitoring by providing accurate,
                affordable, and user-friendly medical devices that empower
                individuals to make informed decisions about their health and
                well-being.
              </p>
            </div>

            <div className="bg-white p-8 lg:p-10 rounded-2xl border border-neutral-100">
              <div className="w-14 h-14 bg-success-50 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-success-500" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">Our Vision</h3>
              <p className="text-neutral-600 leading-relaxed">
                A world where everyone has access to the tools they need to
                understand and manage their health proactively, preventing
                disease and improving quality of life through informed,
                data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              These principles guide everything we do at Healthy Corner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Trust & Reliability',
                description:
                  'Every product we sell is CE-certified and clinically validated for accuracy.',
              },
              {
                icon: Users,
                title: 'Customer First',
                description:
                  'Your health and satisfaction are at the heart of every decision we make.',
              },
              {
                icon: Award,
                title: 'Quality Excellence',
                description:
                  'We partner only with manufacturers who share our commitment to quality.',
              },
              {
                icon: HeartPulse,
                title: 'Health Empowerment',
                description:
                  'We believe knowledge is power—especially when it comes to your health.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl border border-neutral-100 hover:shadow-soft transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-primary-500">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Why Healthcare Professionals Recommend Us
              </h2>
              <p className="text-primary-100 text-lg mb-8">
                Our commitment to accuracy and reliability has earned the trust
                of doctors, nurses, and healthcare professionals across Jordan.
              </p>
              <ul className="space-y-4">
                {[
                  'All devices meet AAMI/ESH/ISO accuracy standards',
                  'Clinical validation studies for every product',
                  'CE marking for international compliance',
                  'JFDA registered medical devices',
                  'Dedicated medical affairs team',
                  'Free professional support and guidance',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '99.2%', label: 'Accuracy Rate' },
                { stat: '4.9/5', label: 'Customer Rating' },
                { stat: '24/7', label: 'Support Available' },
                { stat: '100%', label: 'CE Certified' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/20"
                >
                  <p className="text-4xl font-bold text-white mb-2">{item.stat}</p>
                  <p className="text-primary-100">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A dedicated team of healthcare and technology experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Dr. Emily Chen', role: 'Chief Medical Officer' },
              { name: 'Michael Roberts', role: 'CEO & Founder' },
              { name: 'Sarah Johnson', role: 'Head of Product' },
              { name: 'David Kim', role: 'Customer Success Lead' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary-300">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-800">
                  {member.name}
                </h3>
                <p className="text-neutral-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              What People Say About Us
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Real stories from our customers and partners
            </p>
          </div>

          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-3xl p-8 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Browse our collection of CE-certified medical devices and start
              your journey to better health monitoring today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
