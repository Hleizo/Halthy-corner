import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description:
    'Review your shopping cart and proceed to checkout. Free delivery on orders over 50 JOD.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
