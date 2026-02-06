import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Medical Devices',
  description:
    'Browse our collection of CE-certified medical devices. Blood pressure monitors, pulse oximeters, thermometers, stethoscopes, and nebulizers.',
  openGraph: {
    title: 'Shop Medical Devices | Healthy Corner',
    description:
      'Browse our collection of CE-certified medical devices for home health monitoring.',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
