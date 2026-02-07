import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Shield,
  Award,
  HeartPulse,
  Clock,
  CheckCircle2,
  Truck,
  Lock,
  Headphones,
  Stethoscope,
  ClipboardList,
  ShoppingBag,
  Star,
  Send,
  Sparkles,
} from 'lucide-react';
import { Button, ProductCard, CategoryCard, Testimonials } from '@/components/ui';
import { categories, testimonials } from '@/data';
import { getProducts } from '@/lib/services/products';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Shop certified medical devices for home health monitoring. Blood pressure monitors, pulse oximeters, thermometers, stethoscopes, and nebulizers with free delivery over 50 JOD in Jordan.',
};

export default async function HomePage() {
  const products = await getProducts();
  const bestSellers = products.filter((p) => p.badge === 'bestseller' || p.rating >= 4.7).slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-success-50 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-success-100/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-200/30 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft mb-6">
                <Shield className="w-4 h-4 text-success-500" />
                <span className="text-sm font-medium text-neutral-600">
                  Certified Medical-Grade Devices
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-800 leading-tight mb-6">
                Trustworthy{' '}
                <span className="text-primary-500">Healthcare Tech</span>{' '}
                for Your Home
              </h1>

              <p className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Experience clinical accuracy and comfort with our CE-certified medical devices. 
                Monitor your health with precision technology you can trust—certified, reliable, 
                and designed for everyday use.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/shop">Shop Devices <ArrowRight className="w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Talk to Us</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 lg:gap-8 mt-10 justify-center lg:justify-start flex-wrap">
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-neutral-800">50K+</p>
                  <p className="text-sm text-neutral-500">Happy Customers</p>
                </div>
                <div className="w-px h-10 bg-neutral-200 hidden sm:block" />
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-neutral-800">4.9/5</p>
                  <p className="text-sm text-neutral-500">Customer Rating</p>
                </div>
                <div className="w-px h-10 bg-neutral-200 hidden sm:block" />
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-bold text-neutral-800">100%</p>
                  <p className="text-sm text-neutral-500">CE Certified</p>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl flex items-center justify-center shadow-soft-lg border border-primary-100">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white/80 rounded-2xl flex items-center justify-center shadow-soft">
                    <HeartPulse className="w-16 h-16 text-primary-400" />
                  </div>
                  <p className="text-primary-500 font-semibold text-lg">
                    Premium Health Devices
                  </p>
                  <p className="text-primary-400 text-sm mt-1">
                    Hero Image Placeholder
                  </p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-4 lg:-left-8 top-1/4 bg-white p-4 rounded-2xl shadow-soft-lg border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">Clinically Accurate</p>
                    <p className="text-sm text-neutral-500">±3mmHg precision</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 lg:-right-8 bottom-1/4 bg-white p-4 rounded-2xl shadow-soft-lg border border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-800">Fast Results</p>
                    <p className="text-sm text-neutral-500">In seconds</p>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-white px-6 py-3 rounded-full shadow-soft-lg border border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 border-2 border-white flex items-center justify-center"
                      >
                        <span className="text-xs font-medium text-primary-700">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-neutral-800">4.9</span>
                    <span className="text-neutral-500 text-sm">(2.5k reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Row */}
      <section className="bg-white border-y border-neutral-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex items-center justify-center gap-3 p-4">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-800">Certified Devices</p>
                <p className="text-sm text-neutral-500">CE approved</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-800">Reliable Support</p>
                <p className="text-sm text-neutral-500">Expert help 24/7</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-800">Fast Delivery</p>
                <p className="text-sm text-neutral-500">Free over 50 JOD</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-800">Secure Checkout</p>
                <p className="text-sm text-neutral-500">100% protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 text-sm font-medium rounded-full mb-4">
              Browse Categories
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Browse our comprehensive range of medical devices designed for
              accurate home health monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 bg-success-100 text-success-600 text-sm font-medium rounded-full mb-4">
                Customer Favorites
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-2">
                Best Sellers
              </h2>
              <p className="text-lg text-neutral-600">
                Trusted by thousands for reliable health monitoring
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/shop">View All Products <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Healthy Corner Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Healthy Corner?
            </h2>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              We&apos;re committed to providing you with the most accurate and
              reliable health monitoring solutions for your peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'CE Certified Devices',
                description:
                  'All our devices meet strict international CE standards for safety, accuracy, and reliability in home use.',
              },
              {
                icon: Award,
                title: 'Clinical Accuracy',
                description:
                  'Hospital-grade precision you can trust for monitoring your health at home with confidence.',
              },
              {
                icon: Headphones,
                title: 'Expert Support',
                description:
                  'Healthcare professionals available 24/7 to answer your questions and provide guidance.',
              },
              {
                icon: Clock,
                title: '3-Year Warranty',
                description:
                  'Extended protection on all devices for your complete peace of mind and satisfaction.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose a Device Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-600 text-sm font-medium rounded-full mb-4">
                Quick Guide
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
                How to Choose the Right Device
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Follow these three simple steps to find the perfect health monitoring device for your needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  icon: Stethoscope,
                  title: 'Identify Your Needs',
                  description:
                    'Consider what health metrics you need to monitor. Blood pressure? Oxygen saturation? Temperature? Understanding your requirements helps narrow down options.',
                },
                {
                  step: 2,
                  icon: ClipboardList,
                  title: 'Check Key Features',
                  description:
                    'Look for CE certification, accuracy ratings, ease of use, memory storage, and connectivity options. Read reviews from verified customers.',
                },
                {
                  step: 3,
                  icon: ShoppingBag,
                  title: 'Compare & Purchase',
                  description:
                    'Compare similar products on price, warranty, and included accessories. Our team is always ready to help you make the best choice.',
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  {/* Connector line - hidden on last item */}
                  {item.step < 3 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary-200 to-primary-100" />
                  )}

                  <div className="relative bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 hover:shadow-soft transition-all duration-300">
                    {/* Step number */}
                    <div className="absolute -top-4 left-6 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-soft">
                      {item.step}
                    </div>

                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5 mt-2">
                      <item.icon className="w-7 h-7 text-primary-500" />
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline">
                <Link href="/faq">Read Our Full Guide <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-success-100 text-success-600 text-sm font-medium rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Real stories from people who trust Healthy Corner for their health
              monitoring needs
            </p>
          </div>

          <Testimonials testimonials={testimonials.slice(0, 3)} />
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-12 bg-gradient-to-r from-primary-50 via-white to-success-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Expanding Our Range</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-4">
              More Medical Devices Coming Soon
            </h3>
            <p className="text-lg text-neutral-600 mb-6">
              We are continuously expanding our range of certified medical devices to better serve your health monitoring needs. 
              Stay tuned for new additions to our catalog, including diagnostic equipment, wellness monitors, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/contact">Request a Device</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/faq">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-50 to-success-50 rounded-3xl p-8 lg:p-12 border border-primary-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

            <div className="relative text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-soft flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-primary-500" />
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-3">
                Stay Updated on Health Tips
              </h2>
              <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter for health monitoring tips, product guides, and wellness resources. 
                Join our community of health-conscious individuals.
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all placeholder:text-neutral-400"
                  required
                  aria-label="Email address for newsletter"
                />
                <Button type="submit" size="lg" className="sm:flex-shrink-0">
                  Subscribe
                </Button>
              </form>

              <p className="text-sm text-neutral-500 mt-4">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-3xl overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="relative px-8 py-12 lg:px-16 lg:py-16 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
                Join our customers who trust Healthy Corner for accurate,
                reliable home health monitoring. Free delivery on orders over 50 JOD.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-neutral-100 focus:ring-white focus:ring-offset-primary-600"
                >
                  <Link href="/shop">Shop All Products</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 focus:ring-white"
                >
                  <Link href="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
