'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Check, AlertCircle } from 'lucide-react';
import { Product } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { Button } from './Button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem } = useCart();

  const stockStatusConfig = {
    'in-stock': { label: 'In Stock', color: 'text-success-600', icon: Check },
    'low-stock': { label: 'Low Stock', color: 'text-amber-600', icon: AlertCircle },
    'out-of-stock': { label: 'Out of Stock', color: 'text-red-500', icon: AlertCircle },
  };

  const status = stockStatusConfig[product.stockStatus];
  const StatusIcon = status.icon;

  const badgeConfig = {
    new: { label: 'New', className: 'bg-primary-500 text-white' },
    bestseller: { label: 'Popular', className: 'bg-success-500 text-white' },
    sale: { label: 'Best Value', className: 'bg-primary-600 text-white' },
  };

  return (
    <div
      className={cn(
        'group bg-white rounded-2xl border border-neutral-100 overflow-hidden transition-all duration-300',
        'hover:shadow-soft-lg hover:border-neutral-200',
        variant === 'compact' ? 'flex' : ''
      )}
    >
      {/* Image */}
      <Link
        href={`/shop/${product.id}`}
        className={cn(
          'relative block bg-neutral-50 overflow-hidden',
          variant === 'compact' ? 'w-32 flex-shrink-0' : 'aspect-square'
        )}
      >
        {/* Product image or placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-50">
          {product.images?.[0] && product.images[0] !== '/images/products/placeholder.jpg' ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.images.find((img) => img.startsWith('http')) || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <div className="text-neutral-300">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={cn(
              'absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-lg',
              badgeConfig[product.badge].className
            )}
          >
            {badgeConfig[product.badge].label}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className={cn('p-4', variant === 'compact' ? 'flex-1' : '')}>
        {/* Category */}
        <p className="text-xs font-medium text-primary-500 uppercase tracking-wide mb-1">
          {product.category.replace('-', ' ')}
        </p>

        {/* Title */}
        <Link href={`/shop/${product.id}`}>
          <h3
            className={cn(
              'font-semibold text-neutral-800 group-hover:text-primary-500 transition-colors duration-200',
              variant === 'compact' ? 'text-sm line-clamp-1' : 'text-base line-clamp-2'
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-neutral-200'
                )}
              />
            ))}
          </div>
          <span className="text-sm text-neutral-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Short description */}
        {variant === 'default' && (
          <p className="text-sm text-neutral-500 mt-2 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Stock status */}
        <div className={cn('flex items-center gap-1 mt-2', status.color)}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{status.label}</span>
        </div>

        {/* Price and action */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-neutral-800">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {variant === 'default' && (
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                if (product.stockStatus !== 'out-of-stock') {
                  addItem(product);
                }
              }}
              disabled={product.stockStatus === 'out-of-stock'}
              leftIcon={<ShoppingCart className="w-4 h-4" />}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
