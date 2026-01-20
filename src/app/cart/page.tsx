'use client';

import React from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { Breadcrumbs, Button } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const shipping = subtotal >= 50 ? 0 : 7.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-neutral-50 border-b border-neutral-100">
          <div className="container mx-auto px-4 py-6">
            <Breadcrumbs items={[{ label: 'Cart' }]} />
            <h1 className="text-3xl font-bold text-neutral-800 mt-4">Shopping Cart</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-20 h-20 text-neutral-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-neutral-500 mb-8">
              Looks like you haven&apos;t added any products to your cart yet.
              Browse our collection to find the perfect health monitoring devices.
            </p>
            <Button size="lg" asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={[{ label: 'Cart' }]} />
          <h1 className="text-3xl font-bold text-neutral-800 mt-4">
            Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
        </div>
      </div>

      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border border-neutral-100 p-6"
                >
                  <div className="flex gap-6">
                    {/* Product image */}
                    <Link
                      href={`/shop/${item.product.id}`}
                      className="w-24 h-24 md:w-32 md:h-32 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <div className="text-neutral-300">
                        <svg
                          className="w-10 h-10"
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
                    </Link>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-sm text-primary-500 font-medium uppercase tracking-wide mb-1">
                            {item.product.category.replace('-', ' ')}
                          </p>
                          <Link
                            href={`/shop/${item.product.id}`}
                            className="font-semibold text-neutral-800 hover:text-primary-500 transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-sm text-neutral-500 mt-2 line-clamp-1 hidden md:block">
                        {item.product.shortDescription}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-neutral-500">Qty:</span>
                          <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-10 text-center font-medium text-neutral-800 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-bold text-neutral-800">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-neutral-400">
                              {formatPrice(item.product.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <div className="flex justify-between items-center pt-4">
                <Button variant="ghost" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 sticky top-32">
                <h2 className="text-xl font-bold text-neutral-800 mb-6">
                  Order Summary
                </h2>

                {/* Promo code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <Button variant="secondary">Apply</Button>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="font-medium text-neutral-800">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="font-medium text-neutral-800">
                      {shipping === 0 ? (
                        <span className="text-success-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-neutral-400">
                      Add {formatPrice(50 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Estimated Tax</span>
                    <span className="font-medium text-neutral-800">
                      {formatPrice(tax)}
                    </span>
                  </div>
                  <hr className="border-neutral-100 my-4" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-neutral-800">Total</span>
                    <span className="text-xl font-bold text-neutral-800">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <Button
                  size="lg"
                  className="w-full mt-6"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  asChild
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                {/* Security badges */}
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <div className="flex items-center justify-center gap-4 text-neutral-400 text-xs">
                    <span>🔒 Secure Checkout</span>
                    <span>•</span>
                    <span>SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
