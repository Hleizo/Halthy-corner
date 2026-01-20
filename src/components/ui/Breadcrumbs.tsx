import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      <Link
        href="/"
        className="text-neutral-400 hover:text-primary-500 transition-colors duration-200"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-neutral-300 mx-2" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-neutral-500 hover:text-primary-500 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-800 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
