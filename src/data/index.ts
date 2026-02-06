import { Product, CategoryInfo, FAQItem, Testimonial, Category } from '@/types';

export const categories: CategoryInfo[] = [
  {
    id: 'blood-pressure-monitors',
    name: 'Blood Pressure Monitors',
    description: 'Accurate digital blood pressure monitors for home and clinical use',
    icon: 'Heart',
    productCount: 1,
  },
  {
    id: 'pulse-oximeters',
    name: 'Pulse Oximeters',
    description: 'Fingertip pulse oximeters for oxygen saturation monitoring',
    icon: 'Activity',
    productCount: 1,
  },
  {
    id: 'thermometers',
    name: 'Digital Thermometers',
    description: 'Precision digital thermometers for accurate temperature readings',
    icon: 'Thermometer',
    productCount: 1,
  },
  {
    id: 'stethoscopes',
    name: 'Stethoscopes',
    description: 'Professional-grade stethoscopes for clinical examination',
    icon: 'Stethoscope',
    productCount: 1,
  },
  {
    id: 'nebulizers',
    name: 'Nebulizers',
    description: 'Medical nebulizers for effective respiratory therapy',
    icon: 'Wind',
    productCount: 1,
  },
];

export const products: Product[] = [
  // Blood Pressure Monitor
  {
    id: 'bp-001',
    name: 'Blood Pressure Monitor',
    category: 'blood-pressure-monitors',
    price: 45.00,
    originalPrice: 55.00,
    rating: 4.8,
    reviewCount: 342,
    shortDescription: 'Professional-grade digital blood pressure monitor with automatic arm cuff for accurate home and clinical measurements.',
    longDescription: 'This advanced digital blood pressure monitor provides hospital-grade accuracy for reliable home health monitoring. Featuring an automatic arm cuff with intelligent pressure technology, it delivers precise systolic and diastolic readings along with pulse rate measurement. The device is designed for ease of use, making it ideal for daily blood pressure management and hypertension monitoring.',
    features: [
      'Fully automatic arm cuff with one-touch operation',
      'Irregular heartbeat detection with visual indicator',
      'Large backlit LCD display for easy reading',
      'Memory storage for up to 120 readings for 2 users',
      'WHO blood pressure classification indicator',
    ],
    specs: {
      'Measurement Method': 'Oscillometric',
      'Measurement Range': 'Pressure: 0-299 mmHg, Pulse: 40-180 bpm',
      'Accuracy': 'Pressure: ±3 mmHg, Pulse: ±5%',
      'Cuff Size': '22-42 cm (standard adult)',
      'Display': 'Backlit LCD',
      'Memory': '120 readings × 2 users',
      'Power Source': '4 × AA batteries or AC adapter (included)',
      'Weight': '340g (without batteries)',
      'Warranty': '3 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/blood-pressure-monitor.jpg'],
    badge: 'bestseller',
  },

  // Pulse Oximeter
  {
    id: 'ox-001',
    name: 'Pulse Oximeter',
    category: 'pulse-oximeters',
    price: 25.00,
    originalPrice: 32.00,
    rating: 4.7,
    reviewCount: 521,
    shortDescription: 'Compact fingertip pulse oximeter for quick and accurate blood oxygen saturation (SpO2) and pulse rate monitoring.',
    longDescription: 'This medical-grade fingertip pulse oximeter provides fast, accurate measurements of blood oxygen saturation (SpO2) and pulse rate. Using advanced optical sensing technology, it delivers reliable readings within seconds. The lightweight, portable design makes it essential for home health monitoring, sports activities, and aviation use. Perfect for individuals with respiratory conditions, athletes, and anyone needing to monitor their oxygen levels.',
    features: [
      'Fast SpO2 and pulse rate readings in under 10 seconds',
      'Multi-directional OLED display with adjustable brightness',
      'Plethysmograph waveform for reading quality verification',
      'Auto power-off to preserve battery life',
      'Suitable for adults and children (age 4+)',
    ],
    specs: {
      'SpO2 Measurement Range': '70% - 100%',
      'SpO2 Accuracy': '±2% (80-100%), ±3% (70-79%)',
      'Pulse Rate Range': '30 - 250 bpm',
      'Pulse Rate Accuracy': '±2 bpm',
      'Display': 'Dual-color OLED, 6 display modes',
      'Finger Size': '8mm - 25.4mm diameter',
      'Power Source': '2 × AAA batteries (30+ hours operation)',
      'Weight': '50g (with batteries)',
      'Warranty': '2 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/pulse-oximeter.jpg'],
    badge: 'bestseller',
  },

  // Digital Thermometer
  {
    id: 'tm-001',
    name: 'Digital Thermometer',
    category: 'thermometers',
    price: 18.00,
    rating: 4.6,
    reviewCount: 678,
    shortDescription: 'Non-contact infrared digital thermometer for instant and hygienic temperature measurements.',
    longDescription: 'This advanced non-contact infrared thermometer provides accurate temperature readings in just one second without physical contact. Ideal for use with infants, children, and adults, it offers a hygienic solution for temperature monitoring. The color-coded fever alert system provides instant visual feedback, while the silent mode allows for measurements without disturbing sleeping patients.',
    features: [
      'Non-contact measurement from 3-5 cm distance',
      'Instant 1-second temperature reading',
      'Color-coded fever alert (green/yellow/red)',
      'Dual mode: Body and surface/object temperature',
      'Silent mode for sleeping patients',
    ],
    specs: {
      'Measurement Method': 'Infrared',
      'Body Temperature Range': '32.0°C - 42.9°C (89.6°F - 109.2°F)',
      'Object Temperature Range': '0°C - 100°C (32°F - 212°F)',
      'Accuracy': '±0.2°C (±0.4°F)',
      'Measurement Time': '1 second',
      'Measurement Distance': '3-5 cm',
      'Memory': '50 readings',
      'Display': 'Backlit LCD',
      'Power Source': '2 × AAA batteries',
      'Warranty': '2 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/digital-thermometer.jpg'],
  },

  // Stethoscope
  {
    id: 'st-001',
    name: 'Stethoscope',
    category: 'stethoscopes',
    price: 35.00,
    originalPrice: 42.00,
    rating: 4.9,
    reviewCount: 256,
    shortDescription: 'Professional dual-head stethoscope with premium acoustic performance for clinical auscultation.',
    longDescription: 'This professional-grade dual-head stethoscope delivers exceptional acoustic clarity for cardiovascular and respiratory assessment. Featuring a precision-machined stainless steel chestpiece with tunable diaphragm technology, it allows healthcare professionals and home users to hear both high and low frequency sounds with remarkable clarity. The ergonomic design ensures comfort during extended use.',
    features: [
      'Dual-head chestpiece with tunable diaphragm and bell',
      'Premium stainless steel construction for durability',
      'High-performance acoustic tubing for clear sound transmission',
      'Soft-sealing ear tips for comfortable, ambient noise reduction',
      'Versatile use for adult and pediatric patients',
    ],
    specs: {
      'Chestpiece Material': 'Stainless steel',
      'Chestpiece Diameter': 'Diaphragm: 45mm, Bell: 35mm',
      'Tubing Material': 'Medical-grade PVC, latex-free',
      'Tubing Length': '70 cm',
      'Frequency Response': '20 Hz - 1000 Hz',
      'Ear Tips': 'Soft silicone, multiple sizes included',
      'Total Weight': '150g',
      'Colors Available': 'Black, Navy Blue, Burgundy',
      'Warranty': '5 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/stethoscope.jpg'],
    badge: 'new',
  },

  // Nebulizer
  {
    id: 'nb-001',
    name: 'Nebulizer',
    category: 'nebulizers',
    price: 55.00,
    rating: 4.5,
    reviewCount: 234,
    shortDescription: 'Portable mesh nebulizer for efficient delivery of respiratory medications at home or on the go.',
    longDescription: 'This advanced portable nebulizer utilizes innovative mesh technology to convert liquid medication into a fine, breathable mist for effective respiratory therapy. Ultra-quiet operation and compact design make it ideal for use anywhere—at home, work, or while traveling. Suitable for treating asthma, COPD, bronchitis, and other respiratory conditions, it provides consistent medication delivery for patients of all ages.',
    features: [
      'Advanced mesh nebulization technology for fine mist delivery',
      'Ultra-quiet operation under 25dB—ideal for nighttime use',
      'Compact, portable design fits in pocket or bag',
      'Rechargeable battery provides 4+ treatment sessions per charge',
      'Includes adult and pediatric masks plus mouthpiece',
    ],
    specs: {
      'Nebulization Technology': 'Vibrating mesh',
      'Nebulization Rate': '≥0.25 mL/min',
      'Particle Size (MMAD)': '3.0 µm (optimal for deep lung delivery)',
      'Medication Capacity': '8 mL',
      'Residual Volume': '<0.3 mL',
      'Noise Level': '<25 dB',
      'Battery': 'Rechargeable Li-ion, 2000mAh',
      'Charging': 'USB-C, 2 hours full charge',
      'Weight': '100g',
      'Warranty': '2 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/nebulizer.jpg'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Ahmad Khalil',
    role: 'Family Physician',
    content: 'I recommend Healthy Corner medical devices to my patients. The accuracy and build quality are excellent for home health monitoring.',
    rating: 5,
    avatar: '/images/avatars/avatar-1.jpg',
  },
  {
    id: 't2',
    name: 'Fatima Al-Hassan',
    role: 'Home Healthcare Provider',
    content: 'The blood pressure monitor and pulse oximeter have become essential tools for my daily patient visits. Reliable readings every time.',
    rating: 5,
    avatar: '/images/avatars/avatar-2.jpg',
  },
  {
    id: 't3',
    name: 'Mohammad Qasim',
    role: 'Respiratory Patient',
    content: 'The nebulizer is so quiet and portable. I can use it at work without any issues. Excellent product quality and fast delivery.',
    rating: 5,
    avatar: '/images/avatars/avatar-3.jpg',
  },
  {
    id: 't4',
    name: 'Layla Mahmoud',
    role: 'Mother of Three',
    content: 'The digital thermometer is perfect for my kids. Non-contact measurement means no fuss, and the fever alert is very helpful.',
    rating: 5,
    avatar: '/images/avatars/avatar-4.jpg',
  },
];

export const faqs: FAQItem[] = [
  // Orders & Delivery
  {
    id: 'faq-1',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days within Jordan. Express shipping (1-2 business days) is available for an additional fee. Free standard shipping on orders over 50 JOD.',
    category: 'Orders & Delivery',
  },
  {
    id: 'faq-2',
    question: 'Can I track my order?',
    answer: 'Yes, once your order ships, you\'ll receive an SMS and email with tracking information. You can contact our support team anytime for order status updates.',
    category: 'Orders & Delivery',
  },
  {
    id: 'faq-3',
    question: 'Do you offer cash on delivery?',
    answer: 'Yes, we offer cash on delivery (COD) for all orders within Jordan. Payment can be made in Jordanian Dinars upon receiving your order.',
    category: 'Orders & Delivery',
  },
  {
    id: 'faq-4',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash on delivery, credit/debit cards (Visa, MasterCard), and bank transfers. All online transactions are secured with SSL encryption.',
    category: 'Orders & Delivery',
  },
  {
    id: 'faq-5',
    question: 'Can I change or cancel my order after placing it?',
    answer: 'You can modify or cancel your order within 2 hours of placing it. After that, our fulfillment process begins and changes may not be possible. Contact us immediately if you need to make changes.',
    category: 'Orders & Delivery',
  },

  // Warranty & Returns
  {
    id: 'faq-6',
    question: 'What is your return policy?',
    answer: 'We offer a 14-day satisfaction guarantee. If you\'re not completely satisfied with your purchase, return it in original condition for a full refund or exchange.',
    category: 'Warranty & Returns',
  },
  {
    id: 'faq-7',
    question: 'Do you offer warranty on your products?',
    answer: 'Yes, all our medical devices come with manufacturer warranty ranging from 2-5 years depending on the product. Warranty details are specified on each product page.',
    category: 'Warranty & Returns',
  },
  {
    id: 'faq-8',
    question: 'How do I initiate a return or exchange?',
    answer: 'To start a return, contact our customer service team via phone or WhatsApp. We\'ll arrange pickup from your location within Amman, or provide instructions for shipping from other areas.',
    category: 'Warranty & Returns',
  },
  {
    id: 'faq-9',
    question: 'What does the warranty cover?',
    answer: 'Our warranty covers manufacturing defects, component failures, and accuracy issues under normal use. It does not cover physical damage, water damage, or damage from improper use.',
    category: 'Warranty & Returns',
  },
  {
    id: 'faq-10',
    question: 'How do I make a warranty claim?',
    answer: 'For warranty claims, contact our support team with your order number and a description of the issue. We may ask for photos or videos. Most claims are processed within 3-5 business days.',
    category: 'Warranty & Returns',
  },

  // Device Accuracy
  {
    id: 'faq-11',
    question: 'Are your medical devices certified?',
    answer: 'Yes, all our medical devices are CE marked and meet international standards for accuracy and safety. Each product page displays its specific certifications.',
    category: 'Device Accuracy',
  },
  {
    id: 'faq-12',
    question: 'How accurate are home monitoring devices compared to hospital equipment?',
    answer: 'Our devices are clinically validated to provide accuracy comparable to professional medical equipment. For example, our blood pressure monitors are accurate within ±3 mmHg for pressure and ±5% for pulse.',
    category: 'Device Accuracy',
  },
  {
    id: 'faq-13',
    question: 'How do I ensure accurate readings from my blood pressure monitor?',
    answer: 'For accurate readings: rest for 5 minutes before measuring, sit with feet flat on the floor, support your arm at heart level, don\'t talk during measurement, and take readings at the same time daily.',
    category: 'Device Accuracy',
  },
  {
    id: 'faq-14',
    question: 'Do your devices need regular calibration?',
    answer: 'Most of our devices come pre-calibrated and maintain accuracy throughout their lifespan. We recommend professional calibration checks every 2 years for blood pressure monitors.',
    category: 'Device Accuracy',
  },
  {
    id: 'faq-15',
    question: 'Why might my readings differ from my doctor\'s office?',
    answer: 'Minor variations are normal due to factors like time of day, stress, recent activity, and "white coat syndrome." If readings are consistently different by large amounts, contact our support team.',
    category: 'Device Accuracy',
  },

  // Support
  {
    id: 'faq-16',
    question: 'How do I contact customer support?',
    answer: 'You can reach us via phone, WhatsApp, or email. Our support team is available Saturday-Thursday from 9AM-6PM. We typically respond to messages within a few hours.',
    category: 'Support',
  },
  {
    id: 'faq-17',
    question: 'Where can I find user manuals and setup guides?',
    answer: 'User manuals and quick-start guides are included with every product in both Arabic and English. Digital versions are available on each product page under "Downloads."',
    category: 'Support',
  },
  {
    id: 'faq-18',
    question: 'Do you offer training on how to use the devices?',
    answer: 'Yes! We provide video tutorials and step-by-step guides for all our products. For additional assistance, our support team can guide you through setup and usage over the phone.',
    category: 'Support',
  },
  {
    id: 'faq-19',
    question: 'What should I do if my device is not working properly?',
    answer: 'First, check the user manual for troubleshooting tips. If the issue persists, contact our support team—we can often resolve issues quickly. If needed, we\'ll arrange a replacement under warranty.',
    category: 'Support',
  },
  {
    id: 'faq-20',
    question: 'Can I visit your store in person?',
    answer: 'Yes, you are welcome to visit our store in Amman to see our products and get expert advice. Contact us for our current location and business hours.',
    category: 'Support',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter(p => p.category === category);
}

export function getCategoryById(id: Category): CategoryInfo | undefined {
  return categories.find(c => c.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.shortDescription.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function filterProducts(
  filters: Partial<{
    categories: Category[];
    minPrice: number;
    maxPrice: number;
    inStockOnly: boolean;
    minRating: number;
  }>
): Product[] {
  return products.filter(p => {
    if (filters.categories?.length && !filters.categories.includes(p.category)) {
      return false;
    }
    if (filters.minPrice !== undefined && p.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) {
      return false;
    }
    if (filters.inStockOnly && p.stockStatus === 'out-of-stock') {
      return false;
    }
    if (filters.minRating !== undefined && p.rating < filters.minRating) {
      return false;
    }
    return true;
  });
}
