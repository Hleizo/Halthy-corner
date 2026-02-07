'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Star,
  ShoppingCart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  AlertCircle,
  Minus,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  Zap,
  GitCompare,
  Bookmark,
  HelpCircle,
  Package,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { getProductById as getLocalProduct, products, getCategoryById } from '@/data';
import { Product, Category } from '@/types';
import { Breadcrumbs, Button, ProductCard } from '@/components/ui';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { getProductById as getSupabaseProduct, getAllProducts } from '@/lib/supabase/api';

// Product FAQs - common questions for products
const productFaqs = [
  {
    question: 'What warranty is included with this product?',
    answer:
      'All our medical devices come with a minimum 2-year manufacturer warranty. Extended warranty options are available at checkout for additional peace of mind.',
  },
  {
    question: 'How accurate are the readings?',
    answer:
      'Our devices are CE-certified and clinically validated to meet strict accuracy standards. Most devices offer accuracy within ±3mmHg for blood pressure and ±2% for other vital measurements.',
  },
  {
    question: 'Can I return this product if it doesn\'t meet my needs?',
    answer:
      'Yes! We offer a 14-day satisfaction guarantee. If you\'re not completely satisfied, you can return the product for a full refund, no questions asked.',
  },
  {
    question: 'Is this product covered by insurance?',
    answer:
      'Many of our medical devices may be covered by health insurance plans. We recommend checking with your insurance provider for specific coverage details.',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'specs' | 'faqs'>('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch product from Supabase with local fallback
  useEffect(() => {
    const fetchProduct = async () => {
      const id = params.id as string;
      try {
        const supabaseProduct = await getSupabaseProduct(id);
        if (supabaseProduct) {
          setProduct(supabaseProduct);
        } else {
          setProduct(getLocalProduct(id) ?? null);
        }

        // Also fetch all products for related section
        const allData = await getAllProducts();
        if (allData.length > 0) {
          setAllProducts(allData);
        }
      } catch {
        setProduct(getLocalProduct(id) ?? null);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Handle sticky bar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (product === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <RefreshCw className="w-8 h-8 text-neutral-400 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">
            Product Not Found
          </h1>
          <p className="text-neutral-500 mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/shop"><ArrowLeft className="w-4 h-4" /> Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const category = getCategoryById(product.category);
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const stockStatusConfig = {
    'in-stock': {
      label: 'In Stock',
      sublabel: 'Ready to ship',
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      icon: Check,
    },
    'low-stock': {
      label: 'Low Stock',
      sublabel: 'Only a few left',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: AlertCircle,
    },
    'out-of-stock': {
      label: 'Out of Stock',
      sublabel: 'Notify me when available',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: AlertCircle,
    },
  };

  const status = stockStatusConfig[product.stockStatus];
  const StatusIcon = status.icon;

  const handleAddToCart = () => {
    if (product.stockStatus !== 'out-of-stock') {
      addItem(product, quantity);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
    }
  };

  // Benefits bullets for conversion
  const benefitBullets = [
    'CE-certified for clinical accuracy and safety',
    'Easy-to-read display with instant results',
    'Backed by our 14-day satisfaction guarantee',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: 'Shop', href: '/shop' },
              { label: category?.name || '', href: `/shop?category=${product.category}` },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="relative aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl overflow-hidden border border-neutral-100">
                {product.badge && (
                  <span
                    className={cn(
                      'absolute top-4 left-4 px-3 py-1.5 text-sm font-semibold rounded-full z-10',
                      product.badge === 'new' && 'bg-primary-500 text-white',
                      product.badge === 'bestseller' && 'bg-success-500 text-white',
                      product.badge === 'sale' && 'bg-primary-600 text-white'
                    )}
                  >
                    {product.badge === 'new'
                      ? 'New Arrival'
                      : product.badge === 'bestseller'
                      ? '⭐ Popular'
                      : 'Best Value'}
                  </span>
                )}
                <div className="w-full h-full flex items-center justify-center">
                  {product.images?.[selectedImageIndex]?.startsWith('http') ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={product.images[selectedImageIndex]}
                      alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="text-center p-12">
                      <div className="w-40 h-40 mx-auto bg-white rounded-2xl shadow-soft flex items-center justify-center mb-4">
                        <svg
                          className="w-20 h-20 text-neutral-300"
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
                      <p className="text-neutral-400 text-sm">
                        {product.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        'aspect-square bg-neutral-50 rounded-xl border-2 transition-all duration-200 hover:border-primary-300 overflow-hidden',
                        selectedImageIndex === index
                          ? 'border-primary-500 ring-2 ring-primary-100'
                          : 'border-transparent'
                      )}
                      aria-label={`View image ${index + 1}`}
                    >
                      {img.startsWith('http') ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300">
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
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div>
              {/* Category */}
              <div className="mb-3">
                <Link
                  href={`/shop?category=${product.category}`}
                  className="text-sm font-medium text-primary-500 hover:text-primary-600 uppercase tracking-wide transition-colors"
                >
                  {category?.name}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-neutral-800 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-5 h-5',
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : i < product.rating
                          ? 'fill-amber-400/50 text-amber-400'
                          : 'text-neutral-200'
                      )}
                    />
                  ))}
                </div>
                <span className="font-semibold text-neutral-800">
                  {product.rating}
                </span>
                <span className="text-neutral-300">|</span>
                <button className="text-primary-500 hover:underline">
                  {product.reviewCount} reviews
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl lg:text-4xl font-bold text-neutral-800">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-neutral-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-lg">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock status */}
              <div
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl border mb-6',
                  status.bgColor,
                  status.borderColor
                )}
              >
                <StatusIcon className={cn('w-5 h-5', status.color)} />
                <div>
                  <span className={cn('font-semibold', status.color)}>
                    {status.label}
                  </span>
                  <span className={cn('ml-2 text-sm', status.color)}>
                    — {status.sublabel}
                  </span>
                </div>
              </div>

              {/* Short benefit bullets */}
              <div className="mb-6">
                <ul className="space-y-2">
                  {benefitBullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-success-600" />
                      </div>
                      <span className="text-neutral-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-3 mb-4">
                {/* Quantity stepper */}
                <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 h-12 text-center font-semibold text-neutral-800 border-x border-neutral-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                    min="1"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <Button
                  size="lg"
                  className="flex-1 h-12"
                  leftIcon={<ShoppingCart className="w-5 h-5" />}
                  onClick={handleAddToCart}
                  disabled={product.stockStatus === 'out-of-stock'}
                >
                  Add to Cart — {formatPrice(product.price * quantity)}
                </Button>
              </div>

              {/* Secondary actions */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200',
                    isWishlisted
                      ? 'border-red-300 text-red-500 bg-red-50 hover:bg-red-100'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                  )}
                >
                  <Bookmark className={cn('w-4 h-4', isWishlisted && 'fill-red-500')} />
                  <span className="text-sm font-medium">
                    {isWishlisted ? 'Saved' : 'Save for Later'}
                  </span>
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200">
                  <GitCompare className="w-4 h-4" />
                  <span className="text-sm font-medium">Compare</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-200"
                  aria-label="Share product"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-success-500" />
                      <span className="text-sm font-medium text-success-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">Share</span>
                    </>
                  )}
                </button>
              </div>

              {/* Delivery & Warranty Info Card */}
              <div className="bg-gradient-to-br from-neutral-50 to-primary-50/30 rounded-2xl p-5 border border-neutral-100">
                <h3 className="font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-500" />
                  Purchase with Confidence
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                      <Truck className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800 text-sm">Free Delivery</p>
                      <p className="text-xs text-neutral-500">On orders over 50 JOD</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                      <RotateCcw className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800 text-sm">14-Day Returns</p>
                      <p className="text-xs text-neutral-500">Hassle-free policy</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                      <Award className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800 text-sm">
                        {product.specs['Warranty'] || '2-Year'} Warranty
                      </p>
                      <p className="text-xs text-neutral-500">Manufacturer backed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-800 text-sm">Fast Delivery</p>
                      <p className="text-xs text-neutral-500">Ships within 24h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 lg:py-12 bg-neutral-50" id="details">
        <div className="container mx-auto px-4">
          {/* Tab buttons */}
          <div className="flex overflow-x-auto border-b border-neutral-200 mb-8 scrollbar-hide">
            {[
              { id: 'description', label: 'Description', icon: null },
              { id: 'features', label: 'Features', icon: Zap },
              { id: 'specs', label: 'Specifications', icon: null },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors relative',
                  activeTab === tab.id
                    ? 'text-primary-500'
                    : 'text-neutral-500 hover:text-neutral-700'
                )}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.icon && <tab.icon className="w-4 h-4" />}
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-neutral-100 shadow-soft">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="prose prose-neutral max-w-none">
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  {product.longDescription}
                </p>
                <div className="not-prose grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-neutral-100">
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-3">What&apos;s in the Box</h4>
                    <ul className="space-y-2">
                      {[
                        `1x ${product.name}`,
                        'User Manual',
                        'Quick Start Guide',
                        'Carrying Case',
                        'USB Charging Cable',
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-neutral-600 text-sm">
                          <Check className="w-4 h-4 text-success-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 mb-3">Ideal For</h4>
                    <ul className="space-y-2">
                      {[
                        'Home health monitoring',
                        'Elderly care',
                        'Chronic condition management',
                        'Fitness enthusiasts',
                        'Healthcare professionals',
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-neutral-600 text-sm">
                          <Check className="w-4 h-4 text-success-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-primary-200 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-neutral-800 font-medium">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], index) => (
                      <tr
                        key={key}
                        className={cn(
                          'border-b border-neutral-100 last:border-0',
                          index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'
                        )}
                      >
                        <td className="px-6 py-4 font-medium text-neutral-800 w-1/3">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* FAQs Tab */}
            {activeTab === 'faqs' && (
              <div className="space-y-3">
                {productFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-neutral-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-50 transition-colors"
                      aria-expanded={openFaqIndex === index}
                    >
                      <span className="font-medium text-neutral-800 pr-4">
                        {faq.question}
                      </span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                      )}
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                      )}
                    >
                      <div className="px-6 pb-4 text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800">
                  Related Products
                </h2>
                <p className="text-neutral-500 mt-1">
                  Customers also viewed these items
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href={`/shop?category=${product.category}`}>View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile Sticky Add to Cart Bar */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 z-40 lg:hidden transition-transform duration-300 shadow-lg',
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-neutral-800 truncate text-sm">{product.name}</p>
            <p className="text-lg font-bold text-primary-500">{formatPrice(product.price)}</p>
          </div>
          <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center text-neutral-500"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium text-neutral-800">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-neutral-500"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <Button
            size="lg"
            leftIcon={<ShoppingCart className="w-5 h-5" />}
            onClick={handleAddToCart}
            disabled={product.stockStatus === 'out-of-stock'}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="h-24 lg:hidden" />
    </div>
  );
}
