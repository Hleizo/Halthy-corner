import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Healthy Corner. Contact our customer support team for questions about medical devices, orders, or technical support.',
  openGraph: {
    title: 'Contact Us | Healthy Corner',
    description:
      'Contact our customer support team for questions about medical devices, orders, or technical support.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
