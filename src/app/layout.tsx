import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar, Footer, CartDrawer } from '@/components/layout';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://healthycorner.com';

export const metadata: Metadata = {
  title: {
    default: 'Healthy Corner | Your Trusted Partner in Home Health Monitoring',
    template: '%s | Healthy Corner',
  },
  description:
    'Shop CE-certified medical devices for home health monitoring. Blood pressure monitors, pulse oximeters, thermometers, stethoscopes, and nebulizers.',
  keywords: [
    'medical devices',
    'blood pressure monitor',
    'pulse oximeter',
    'glucometer',
    'thermometer',
    'nebulizer',
    'health monitoring',
    'CE certified',
    'home healthcare',
  ],
  authors: [{ name: 'Healthy Corner' }],
  creator: 'Healthy Corner',
  publisher: 'Healthy Corner',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Healthy Corner',
    title: 'Healthy Corner | Your Trusted Partner in Home Health Monitoring',
    description:
      'Shop CE-certified medical devices for home health monitoring. Blood pressure monitors, pulse oximeters, thermometers, and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Healthy Corner - CE-Certified Medical Devices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthy Corner | Your Trusted Partner in Home Health Monitoring',
    description:
      'Shop CE-certified medical devices for home health monitoring.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0891b2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <Navbar />
          <CartDrawer />
          <main id="main-content" className="min-h-screen pt-[104px] lg:pt-[120px]">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
