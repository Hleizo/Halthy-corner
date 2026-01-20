import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Medical Devices',
  description:
    'Browse our collection of FDA-cleared medical devices. Blood pressure monitors, pulse oximeters, glucometers, thermometers, nebulizers, and smart health wearables.',
  openGraph: {
    title: 'Shop Medical Devices | Healthy Corner',
    description:
      'Browse our collection of FDA-cleared medical devices for home health monitoring.',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
