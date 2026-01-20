import React from 'react';
import Link from 'next/link';
import { CategoryInfo } from '@/types';
import { cn } from '@/lib/utils';
import {
  Heart,
  Activity,
  Droplet,
  Thermometer,
  Wind,
  Watch,
  LucideIcon,
} from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  variant?: 'default' | 'compact';
}

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Activity,
  Droplet,
  Thermometer,
  Wind,
  Watch,
};

export function CategoryCard({ category, variant = 'default' }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon] || Heart;

  if (variant === 'compact') {
    return (
      <Link
        href={`/shop?category=${category.id}`}
        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-100 hover:border-primary-200 hover:shadow-soft transition-all duration-200"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 text-primary-500">
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-neutral-800 truncate">{category.name}</p>
          <p className="text-sm text-neutral-500">{category.productCount} products</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/shop?category=${category.id}`}
      className={cn(
        'group relative block p-6 bg-white rounded-2xl border border-neutral-100 overflow-hidden',
        'transition-all duration-300 hover:shadow-soft-lg hover:border-primary-200'
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-100 transition-colors duration-300" />
      
      {/* Icon */}
      <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-primary-50 text-primary-500 mb-4 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
        <IconComponent className="w-7 h-7" />
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-500 transition-colors duration-200">
        {category.name}
      </h3>
      <p className="relative text-sm text-neutral-500 mb-4 line-clamp-2">
        {category.description}
      </p>

      {/* Product count */}
      <div className="relative flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-600">
          {category.productCount} Products
        </span>
        <span className="text-primary-500 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
          Shop →
        </span>
      </div>
    </Link>
  );
}
