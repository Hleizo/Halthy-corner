'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  Heart,
  User,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data';

const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop', hasDropdown: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white'
      )}
    >
      {/* Top bar */}
      <div className="bg-primary-500 text-white text-sm py-2">
        <div className="container mx-auto px-4 text-center">
          <p>
            🎉 Free shipping on orders over $50 | 30-day satisfaction guarantee
          </p>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-neutral-800">
              Healthy<span className="text-primary-500">Corner</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {mainNavLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsShopDropdownOpen(true)}
                    onMouseLeave={() => setIsShopDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-1 font-medium transition-colors duration-200',
                        pathname === link.href || pathname.startsWith('/shop')
                          ? 'text-primary-500'
                          : 'text-neutral-600 hover:text-primary-500'
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          isShopDropdownOpen && 'rotate-180'
                        )}
                      />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={cn(
                        'absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-soft-lg border border-neutral-100 py-2 transition-all duration-200',
                        isShopDropdownOpen
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      )}
                    >
                      <Link
                        href="/shop"
                        className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                      >
                        All Products
                      </Link>
                      <hr className="my-2 border-neutral-100" />
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/shop?category=${category.id}`}
                          className="block px-4 py-2 text-neutral-600 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'font-medium transition-colors duration-200',
                      pathname === link.href
                        ? 'text-primary-500'
                        : 'text-neutral-600 hover:text-primary-500'
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* User */}
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
              <User className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="py-4 space-y-1 border-t border-neutral-100">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-2.5 rounded-xl font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-neutral-600 hover:bg-neutral-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
