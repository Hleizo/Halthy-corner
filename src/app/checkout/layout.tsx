import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Complete your purchase securely. Free delivery on orders over 50 JOD. SSL encrypted checkout.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
