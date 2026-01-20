'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/types';
import { cn } from '@/lib/utils';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative bg-white p-6 rounded-2xl border border-neutral-100 shadow-soft">
      {/* Quote icon */}
      <div className="absolute top-4 right-4 text-primary-100">
        <Quote className="w-8 h-8" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < testimonial.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-neutral-200'
            )}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-neutral-600 leading-relaxed mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
          <span className="text-primary-600 font-semibold text-sm">
            {testimonial.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
        </div>
        <div>
          <p className="font-medium text-neutral-800">{testimonial.name}</p>
          <p className="text-sm text-neutral-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
