'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  Shield,
  Check,
  Lock,
} from 'lucide-react';
import { Breadcrumbs, Button, Input, Select } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { formatPrice, cn } from '@/lib/utils';

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const shipping = shippingMethod === 'express' ? 14.99 : subtotal >= 50 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Check },
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">
            Your cart is empty
          </h1>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success-500" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-neutral-600 mb-2">
              Thank you for your purchase. Your order has been received.
            </p>
            <p className="text-neutral-500 mb-8">
              Order number: <span className="font-semibold">#HC-{Date.now().toString().slice(-8)}</span>
            </p>
            <p className="text-sm text-neutral-500 mb-8">
              A confirmation email has been sent to{' '}
              <span className="font-medium">{shippingInfo.email || 'your email'}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" size="lg">
                Track Order
              </Button>
            </div>
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
          <div className="flex items-center justify-between">
            <div>
              <Breadcrumbs
                items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]}
              />
              <h1 className="text-2xl font-bold text-neutral-800 mt-2">Checkout</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-center mt-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isComplete =
                (currentStep === 'payment' && step.id === 'shipping') ||
                (currentStep === 'review' && step.id !== 'review');

              return (
                <React.Fragment key={step.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                        isComplete
                          ? 'bg-success-500 text-white'
                          : isActive
                          ? 'bg-primary-500 text-white'
                          : 'bg-neutral-200 text-neutral-500'
                      )}
                    >
                      {isComplete ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'font-medium hidden sm:block',
                        isActive ? 'text-primary-500' : 'text-neutral-500'
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-16 h-0.5 mx-4',
                        isComplete ? 'bg-success-500' : 'bg-neutral-200'
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form area */}
            <div className="lg:col-span-2">
              {/* Shipping form */}
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit}>
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8 mb-6">
                    <h2 className="text-xl font-bold text-neutral-800 mb-6">
                      Shipping Information
                    </h2>

                    <div className="grid gap-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="First Name"
                          value={shippingInfo.firstName}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                          }
                          required
                        />
                        <Input
                          label="Last Name"
                          value={shippingInfo.lastName}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, email: e.target.value })
                          }
                          required
                        />
                        <Input
                          label="Phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, phone: e.target.value })
                          }
                          required
                        />
                      </div>

                      <Input
                        label="Street Address"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, address: e.target.value })
                        }
                        required
                      />

                      <div className="grid md:grid-cols-3 gap-6">
                        <Input
                          label="City"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, city: e.target.value })
                          }
                          required
                        />
                        <Input
                          label="State"
                          value={shippingInfo.state}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, state: e.target.value })
                          }
                          required
                        />
                        <Input
                          label="ZIP Code"
                          value={shippingInfo.zipCode}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping method */}
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8 mb-6">
                    <h2 className="text-xl font-bold text-neutral-800 mb-6">
                      Shipping Method
                    </h2>

                    <div className="space-y-4">
                      <label
                        className={cn(
                          'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors',
                          shippingMethod === 'standard'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            checked={shippingMethod === 'standard'}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="w-4 h-4 text-primary-500"
                          />
                          <div>
                            <p className="font-medium text-neutral-800">
                              Standard Shipping
                            </p>
                            <p className="text-sm text-neutral-500">
                              3-5 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-neutral-800">
                          {subtotal >= 50 ? 'Free' : '$7.99'}
                        </span>
                      </label>

                      <label
                        className={cn(
                          'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors',
                          shippingMethod === 'express'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shipping"
                            value="express"
                            checked={shippingMethod === 'express'}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="w-4 h-4 text-primary-500"
                          />
                          <div>
                            <p className="font-medium text-neutral-800">
                              Express Shipping
                            </p>
                            <p className="text-sm text-neutral-500">
                              1-2 business days
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-neutral-800">$14.99</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" asChild>
                      <Link href="/cart">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                      </Link>
                    </Button>
                    <Button type="submit" size="lg">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}

              {/* Payment form */}
              {currentStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit}>
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8 mb-6">
                    <h2 className="text-xl font-bold text-neutral-800 mb-6">
                      Payment Information
                    </h2>

                    <div className="grid gap-6">
                      <Input
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="Cardholder Name"
                        placeholder="John Doe"
                        value={paymentInfo.cardName}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                        }
                        required
                      />
                      <div className="grid grid-cols-2 gap-6">
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                          }
                          required
                        />
                        <Input
                          label="CVV"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6 p-4 bg-neutral-50 rounded-xl">
                      <Shield className="w-5 h-5 text-success-500" />
                      <p className="text-sm text-neutral-600">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setCurrentStep('shipping')}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back to Shipping
                    </Button>
                    <Button type="submit" size="lg">
                      Review Order
                    </Button>
                  </div>
                </form>
              )}

              {/* Review */}
              {currentStep === 'review' && (
                <div>
                  {/* Order items */}
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8 mb-6">
                    <h2 className="text-xl font-bold text-neutral-800 mb-6">
                      Order Items
                    </h2>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-4"
                        >
                          <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="text-neutral-300">
                              <svg
                                className="w-6 h-6"
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
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-neutral-800 truncate">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-neutral-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-neutral-800">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping info summary */}
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-neutral-800">
                        Shipping Address
                      </h2>
                      <button
                        onClick={() => setCurrentStep('shipping')}
                        className="text-sm text-primary-500 hover:text-primary-600"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-neutral-600">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                      <br />
                      {shippingInfo.address}
                      <br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      <br />
                      {shippingInfo.email}
                    </p>
                  </div>

                  {/* Payment info summary */}
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 lg:p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-neutral-800">
                        Payment Method
                      </h2>
                      <button
                        onClick={() => setCurrentStep('payment')}
                        className="text-sm text-primary-500 hover:text-primary-600"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-neutral-600">
                      Card ending in ****{paymentInfo.cardNumber.slice(-4) || '0000'}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep('payment')}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back to Payment
                    </Button>
                    <Button
                      size="lg"
                      onClick={handlePlaceOrder}
                      isLoading={isProcessing}
                    >
                      Place Order - {formatPrice(total)}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 sticky top-32">
                <h2 className="text-xl font-bold text-neutral-800 mb-6">
                  Order Summary
                </h2>

                {/* Items summary */}
                <div className="space-y-3 mb-6">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-neutral-600 truncate pr-2">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-medium text-neutral-800 flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-neutral-500">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>

                <hr className="border-neutral-100 mb-6" />

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

                {/* Security badges */}
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <div className="flex items-center justify-center gap-4 text-neutral-400 text-xs">
                    <span>🔒 Secure</span>
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
