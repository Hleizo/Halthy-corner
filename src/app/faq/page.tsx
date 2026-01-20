'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { Breadcrumbs, Button, Input } from '@/components/ui';
import { faqs } from '@/data';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqCategories = ['All', ...Array.from(new Set(faqs.map((faq) => faq.category)))];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-white border-b border-neutral-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <Breadcrumbs items={[{ label: 'FAQ' }]} />
          <div className="flex items-center justify-center gap-3 mt-6 mb-4">
            <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Find quick answers to common questions about our products, orders,
            shipping, and more.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <label htmlFor="faq-search" className="sr-only">
                Search frequently asked questions
              </label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
              <input
                id="faq-search"
                type="search"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                aria-describedby="search-hint"
              />
              <p id="search-hint" className="sr-only">
                Start typing to filter the FAQ list
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0" aria-label="FAQ categories">
              <div className="bg-white p-4 rounded-2xl border border-neutral-100 sticky top-32">
                <h2 className="font-semibold text-neutral-800 mb-4">Categories</h2>
                <ul className="space-y-1" role="list">
                  {faqCategories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setActiveCategory(category)}
                        aria-pressed={activeCategory === category}
                        className={cn(
                          'w-full text-left px-4 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                          activeCategory === category
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'text-neutral-600 hover:bg-neutral-50'
                        )}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* FAQ Items */}
            <div className="flex-1">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                  <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" aria-hidden="true" />
                  <h2 className="text-lg font-semibold text-neutral-800 mb-2">
                    No results found
                  </h2>
                  <p className="text-neutral-500 mb-6">
                    Try adjusting your search or browse by category
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-4" role="region" aria-label="Frequently Asked Questions">
                  {filteredFaqs.map((faq) => {
                    const isExpanded = openItems.includes(faq.id);
                    const panelId = `faq-panel-${faq.id}`;
                    const buttonId = `faq-button-${faq.id}`;
                    
                    return (
                      <div
                        key={faq.id}
                        className="bg-white rounded-2xl border border-neutral-100 overflow-hidden transition-shadow hover:shadow-soft"
                      >
                        <h3>
                          <button
                            id={buttonId}
                            onClick={() => toggleItem(faq.id)}
                            aria-expanded={isExpanded}
                            aria-controls={panelId}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rounded-2xl"
                          >
                            <div className="flex items-start gap-4 pr-4">
                              <span className="text-primary-500 font-bold" aria-hidden="true">Q</span>
                              <span className="font-medium text-neutral-800">
                                {faq.question}
                              </span>
                            </div>
                            <ChevronDown
                              className={cn(
                                'w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200',
                                isExpanded && 'rotate-180'
                              )}
                              aria-hidden="true"
                            />
                          </button>
                        </h3>
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          hidden={!isExpanded}
                          className={cn(
                            'overflow-hidden transition-all duration-300',
                            isExpanded
                              ? 'max-h-96 opacity-100'
                              : 'max-h-0 opacity-0'
                          )}
                        >
                          <div className="px-6 pb-6">
                            <div className="flex gap-4 pt-4 border-t border-neutral-100">
                              <span className="text-success-500 font-bold" aria-hidden="true">A</span>
                              <p className="text-neutral-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-12 lg:py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 lg:p-12 text-center border border-neutral-100">
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-neutral-600 max-w-xl mx-auto mb-8">
              Can&apos;t find what you&apos;re looking for? Our customer support team is
              here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" size="lg">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
