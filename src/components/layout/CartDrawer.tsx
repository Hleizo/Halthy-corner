'use client';

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-500" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-neutral-800">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100% - 200px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-neutral-200 mb-4" aria-hidden="true" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">
                Your cart is empty
              </h3>
              <p className="text-neutral-400 mb-6">
                Add some products to get started
              </p>
              <Button onClick={closeCart} asChild>
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4" role="list" aria-label="Cart items">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-neutral-50 rounded-xl"
                >
                  {/* Product image placeholder */}
                  <div className="w-20 h-20 bg-neutral-200 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <div className="text-neutral-400">
                      <svg
                        className="w-8 h-8"
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
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.product.id}`}
                      className="font-medium text-neutral-800 hover:text-primary-500 transition-colors line-clamp-1"
                      onClick={closeCart}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-neutral-500 mt-1">
                      {formatPrice(item.product.price)} each
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2" role="group" aria-label={`Quantity for ${item.product.name}`}>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:border-primary-500 hover:text-primary-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          <Minus className="w-3 h-3" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center font-medium text-neutral-800" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:border-primary-500 hover:text-primary-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          <Plus className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-neutral-800">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="text-neutral-400 hover:text-red-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-600">Subtotal</span>
              <span className="text-xl font-bold text-neutral-800">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-sm text-neutral-400 mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <div className="space-y-2">
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Proceed to Checkout
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                asChild
              >
                <Link href="/cart" onClick={closeCart}>
                  View Cart
                </Link>
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
