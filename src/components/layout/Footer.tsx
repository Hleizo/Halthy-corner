import React from 'react';
import Link from 'next/link';
import {
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { categories } from '@/data';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white" role="contentinfo">
      {/* Features bar */}
      <div className="border-b border-neutral-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400">
                <Truck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-white">Free Shipping</p>
                <p className="text-sm text-neutral-400">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400">
                <RotateCcw className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-white">Easy Returns</p>
                <p className="text-sm text-neutral-400">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400">
                <Shield className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-white">Secure Payment</p>
                <p className="text-sm text-neutral-400">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400">
                <CreditCard className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-white">Flexible Payment</p>
                <p className="text-sm text-neutral-400">Multiple options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">
                Healthy<span className="text-primary-400">Corner</span>
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Your trusted partner in home health monitoring. We provide
              FDA-cleared medical devices with exceptional accuracy and
              reliability.
            </p>
            <div className="flex items-center gap-3" role="list" aria-label="Social media links">
              <a
                href="#"
                aria-label="Follow us on Facebook"
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Follow us on Twitter"
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Follow us on LinkedIn"
                className="w-9 h-9 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Shop categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop by Category</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/shop?category=${category.id}`}
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-neutral-400">
                  123 Health Street, Medical District
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+1-800-123-4567"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  1-800-123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@healthycorner.com"
                  className="text-neutral-400 hover:text-primary-400 transition-colors"
                >
                  support@healthycorner.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-neutral-950">
        <div className="container mx-auto px-4 py-4">
          <p className="text-neutral-500 text-xs text-center leading-relaxed max-w-4xl mx-auto">
            <strong className="text-neutral-400">Medical Disclaimer:</strong> Information on this site is not medical advice. 
            The products sold are intended for home health monitoring and do not replace professional medical diagnosis, 
            treatment, or advice. Always consult a qualified healthcare provider for medical concerns. If you experience 
            a medical emergency, call your local emergency services immediately.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Healthy Corner. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400">Secure payments:</span>
              <div className="flex items-center gap-2">
                {['Visa', 'MC', 'Amex', 'PayPal'].map((card) => (
                  <div
                    key={card}
                    className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400"
                  >
                    {card}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
