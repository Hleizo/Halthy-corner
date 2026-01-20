import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Healthy Corner\'s medical devices, orders, shipping, warranties, returns, and technical support.',
  openGraph: {
    title: 'FAQ | Healthy Corner',
    description:
      'Find answers to common questions about our medical devices, orders, shipping, and support.',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
