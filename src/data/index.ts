import { Product, CategoryInfo, FAQItem, Testimonial, Category } from '@/types';

export const categories: CategoryInfo[] = [
  {
    id: 'blood-pressure',
    name: 'Blood Pressure',
    description: 'Accurate digital blood pressure monitors for home and clinical use',
    icon: 'Heart',
    productCount: 8,
  },
  {
    id: 'oxygen',
    name: 'Oxygen & Pulse',
    description: 'Pulse oximeters and oxygen monitoring devices',
    icon: 'Activity',
    productCount: 6,
  },
  {
    id: 'diabetes-care',
    name: 'Diabetes Care',
    description: 'Blood glucose meters and diabetes management tools',
    icon: 'Droplet',
    productCount: 7,
  },
  {
    id: 'temperature',
    name: 'Temperature',
    description: 'Digital thermometers for accurate temperature readings',
    icon: 'Thermometer',
    productCount: 5,
  },
  {
    id: 'respiratory',
    name: 'Respiratory',
    description: 'Nebulizers and respiratory therapy devices',
    icon: 'Wind',
    productCount: 4,
  },
  {
    id: 'smart-health',
    name: 'Smart Health',
    description: 'Wearable ECG devices and smart health monitors',
    icon: 'Watch',
    productCount: 6,
  },
];

export const products: Product[] = [
  // Blood Pressure Products
  {
    id: 'bp-001',
    name: 'ProCare Digital Blood Pressure Monitor',
    category: 'blood-pressure',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 342,
    shortDescription: 'Clinical-grade accuracy with automatic arm cuff and large backlit display.',
    longDescription: 'The ProCare Digital Blood Pressure Monitor delivers hospital-grade accuracy right in your home. Featuring an advanced sensor technology and irregular heartbeat detection, this device ensures you get reliable readings every time. The large, backlit LCD display makes readings easy to see, while the memory function stores up to 120 readings for two users.',
    features: [
      'Clinically validated accuracy',
      'Irregular heartbeat detection',
      'Large backlit LCD display',
      '120 memory storage for 2 users',
      'One-touch operation',
      'Adjustable cuff fits arms 22-42cm',
      'WHO blood pressure classification indicator',
      'Includes carrying case',
    ],
    specs: {
      'Display': 'Backlit LCD',
      'Memory': '120 readings x 2 users',
      'Cuff Size': '22-42 cm',
      'Power': '4 x AA batteries or AC adapter',
      'Weight': '340g',
      'Warranty': '3 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/bp-monitor-1.jpg'],
    badge: 'bestseller',
  },
  {
    id: 'bp-002',
    name: 'CompactBP Wrist Monitor',
    category: 'blood-pressure',
    price: 54.99,
    rating: 4.5,
    reviewCount: 189,
    shortDescription: 'Portable wrist blood pressure monitor with voice guidance.',
    longDescription: 'Perfect for on-the-go monitoring, the CompactBP Wrist Monitor combines portability with precision. Voice guidance helps ensure proper positioning for accurate readings, while the compact design fits easily in any bag or pocket.',
    features: [
      'Voice-guided operation',
      'Compact, portable design',
      'Position indicator for accuracy',
      '90 memory storage',
      'Rechargeable battery',
      'Travel case included',
    ],
    specs: {
      'Display': 'LCD',
      'Memory': '90 readings',
      'Wrist Circumference': '13.5-21.5 cm',
      'Power': 'Rechargeable Li-ion',
      'Weight': '120g',
      'Warranty': '2 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/bp-wrist-1.jpg'],
  },
  {
    id: 'bp-003',
    name: 'SmartBP Connect Monitor',
    category: 'blood-pressure',
    price: 129.99,
    rating: 4.9,
    reviewCount: 256,
    shortDescription: 'Bluetooth-enabled monitor with smartphone app integration.',
    longDescription: 'The SmartBP Connect represents the future of home blood pressure monitoring. Seamlessly sync your readings to your smartphone via Bluetooth, track trends over time, and share reports directly with your healthcare provider.',
    features: [
      'Bluetooth connectivity',
      'iOS & Android app',
      'Unlimited cloud storage',
      'PDF report generation',
      'Multi-user support',
      'Automatic sync',
      'Trend analysis',
      'Medication reminders',
    ],
    specs: {
      'Display': 'LED with app display',
      'Connectivity': 'Bluetooth 5.0',
      'Cuff Size': '22-44 cm',
      'Power': 'USB-C rechargeable',
      'App': 'iOS 12+ / Android 8+',
      'Warranty': '3 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/bp-smart-1.jpg'],
    badge: 'new',
  },

  // Oxygen / Pulse Oximeter Products
  {
    id: 'ox-001',
    name: 'VitalOx Fingertip Pulse Oximeter',
    category: 'oxygen',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 521,
    shortDescription: 'Fast, accurate SpO2 and pulse rate readings in seconds.',
    longDescription: 'The VitalOx Fingertip Pulse Oximeter provides quick and accurate oxygen saturation and pulse rate measurements. Its one-button operation and auto-rotate display make it incredibly easy to use, while the plethysmograph waveform helps ensure reading quality.',
    features: [
      'SpO2 accuracy: ±2%',
      'Pulse rate accuracy: ±2 bpm',
      'Auto-rotate OLED display',
      'Plethysmograph waveform',
      '6 display modes',
      'Auto power-off',
      'Lanyard included',
    ],
    specs: {
      'SpO2 Range': '70-100%',
      'Pulse Range': '30-250 bpm',
      'Display': 'OLED, 6 modes',
      'Battery': '2 x AAA (30+ hours)',
      'Weight': '50g',
      'Warranty': '2 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/oximeter-1.jpg'],
    badge: 'sale',
  },
  {
    id: 'ox-002',
    name: 'ProOx Pediatric Pulse Oximeter',
    category: 'oxygen',
    price: 49.99,
    rating: 4.6,
    reviewCount: 134,
    shortDescription: 'Designed specifically for children with fun, colorful design.',
    longDescription: 'The ProOx Pediatric Pulse Oximeter is specially designed for children ages 2-12. The fun animal design helps reduce anxiety, while the smaller sensor ensures accurate readings on smaller fingers.',
    features: [
      'Designed for ages 2-12',
      'Fun animal design options',
      'Gentle silicone sensor',
      'Child-sized finger chamber',
      'Quiet operation',
      'Parent-friendly display',
    ],
    specs: {
      'Age Range': '2-12 years',
      'SpO2 Range': '70-100%',
      'Pulse Range': '30-250 bpm',
      'Display': 'LCD',
      'Battery': '2 x AAA',
      'Warranty': '2 years',
    },
    stockStatus: 'low-stock',
    images: ['/images/products/oximeter-ped-1.jpg'],
  },

  // Diabetes Care Products
  {
    id: 'db-001',
    name: 'GlucoCheck Pro Meter',
    category: 'diabetes-care',
    price: 34.99,
    rating: 4.8,
    reviewCount: 892,
    shortDescription: 'Accurate blood glucose monitoring with minimal blood sample.',
    longDescription: 'The GlucoCheck Pro delivers lab-accurate results in just 5 seconds with only a tiny 0.5µL blood sample. The ergonomic design and large display make testing simple and stress-free.',
    features: [
      'Results in 5 seconds',
      'Only 0.5µL blood needed',
      'No coding required',
      '500 memory with averages',
      'Meal markers',
      'Ketone warning',
      'USB data transfer',
    ],
    specs: {
      'Test Time': '5 seconds',
      'Sample Size': '0.5µL',
      'Memory': '500 tests',
      'Range': '20-600 mg/dL',
      'Calibration': 'Plasma',
      'Warranty': '5 years meter, lifetime strips',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/glucose-1.jpg'],
    badge: 'bestseller',
  },
  {
    id: 'db-002',
    name: 'GlucoCheck Test Strips (100ct)',
    category: 'diabetes-care',
    price: 29.99,
    rating: 4.7,
    reviewCount: 1205,
    shortDescription: 'High-accuracy test strips compatible with GlucoCheck meters.',
    longDescription: 'Premium test strips engineered for consistent, accurate results. Each strip features advanced electrode technology that compensates for variations in hematocrit and common interfering substances.',
    features: [
      'Compatible with all GlucoCheck meters',
      'Advanced electrode technology',
      'Hematocrit compensation',
      'Long shelf life',
      'Easy-fill design',
      'Individually foil-wrapped',
    ],
    specs: {
      'Quantity': '100 strips',
      'Compatibility': 'GlucoCheck Pro, GlucoCheck Plus',
      'Shelf Life': '24 months',
      'Storage': '4-30°C',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/strips-1.jpg'],
  },
  {
    id: 'db-003',
    name: 'SmartGluco CGM Starter Kit',
    category: 'diabetes-care',
    price: 199.99,
    rating: 4.9,
    reviewCount: 445,
    shortDescription: 'Continuous glucose monitoring system with real-time alerts.',
    longDescription: 'Experience the freedom of continuous glucose monitoring. The SmartGluco CGM provides real-time glucose readings every 5 minutes, customizable alerts, and seamless smartphone integration for comprehensive diabetes management.',
    features: [
      '14-day sensor wear',
      'Real-time readings every 5 minutes',
      'Customizable high/low alerts',
      'Trend arrows',
      'Smartphone app',
      'Share with caregivers',
      'Water-resistant sensor',
    ],
    specs: {
      'Sensor Duration': '14 days',
      'Reading Interval': '5 minutes',
      'Range': '40-500 mg/dL',
      'Warm-up Time': '1 hour',
      'App': 'iOS 13+ / Android 8+',
      'Warranty': '1 year transmitter',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/cgm-1.jpg'],
    badge: 'new',
  },

  // Temperature Products
  {
    id: 'tm-001',
    name: 'InstaTemp Forehead Thermometer',
    category: 'temperature',
    price: 44.99,
    rating: 4.6,
    reviewCount: 678,
    shortDescription: 'Non-contact infrared thermometer with instant readings.',
    longDescription: 'Get accurate temperature readings in just 1 second without any contact. The InstaTemp Forehead Thermometer features a color-coded fever alert and silent mode for sleeping patients.',
    features: [
      '1-second instant reading',
      'Non-contact measurement',
      'Color-coded fever alert',
      'Silent mode',
      '50 memory storage',
      'Object temperature mode',
      'Auto-off function',
    ],
    specs: {
      'Measurement Time': '1 second',
      'Distance': '3-5 cm',
      'Accuracy': '±0.2°C',
      'Range': '32-42.9°C body, 0-100°C object',
      'Memory': '50 readings',
      'Warranty': '2 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/thermo-1.jpg'],
  },
  {
    id: 'tm-002',
    name: 'DualScan Ear & Forehead Thermometer',
    category: 'temperature',
    price: 59.99,
    rating: 4.7,
    reviewCount: 423,
    shortDescription: 'Versatile 2-in-1 thermometer for ear and forehead use.',
    longDescription: 'The DualScan offers the flexibility of both ear and forehead measurement modes. Advanced age-precision technology adjusts fever thresholds based on age for more accurate fever detection.',
    features: [
      'Dual ear/forehead modes',
      'Age-precision technology',
      'Fever guidance by age',
      '40 memory storage',
      'Gentle tip for ear mode',
      'Hygiene covers included',
    ],
    specs: {
      'Modes': 'Ear, Forehead',
      'Accuracy': '±0.2°C',
      'Memory': '40 readings',
      'Display': 'Backlit LCD',
      'Battery': '2 x AA',
      'Warranty': '2 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/thermo-dual-1.jpg'],
    badge: 'bestseller',
  },

  // Respiratory Products
  {
    id: 'rs-001',
    name: 'BreathEasy Portable Nebulizer',
    category: 'respiratory',
    price: 79.99,
    rating: 4.5,
    reviewCount: 234,
    shortDescription: 'Compact mesh nebulizer for effective respiratory therapy.',
    longDescription: 'The BreathEasy Portable Nebulizer uses advanced mesh technology to deliver medication efficiently and quietly. Its compact size makes it perfect for home use or travel.',
    features: [
      'Mesh nebulization technology',
      'Ultra-quiet operation (<25dB)',
      'Portable, pocket-sized',
      'Rechargeable battery',
      'Residual drug volume <0.3mL',
      'Auto-cleaning mode',
      'Adult & child masks included',
    ],
    specs: {
      'Nebulization Rate': '≥0.25mL/min',
      'Particle Size': '3.0µm MMAD',
      'Noise Level': '<25dB',
      'Battery': '2000mAh, 4+ sessions',
      'Weight': '100g',
      'Warranty': '2 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/nebulizer-1.jpg'],
  },
  {
    id: 'rs-002',
    name: 'CompNeb Desktop Nebulizer System',
    category: 'respiratory',
    price: 129.99,
    rating: 4.8,
    reviewCount: 189,
    shortDescription: 'Professional-grade compressor nebulizer for home therapy.',
    longDescription: 'The CompNeb Desktop Nebulizer System delivers consistent, reliable aerosol therapy. Designed for frequent use, it features a powerful compressor and durable construction for years of dependable service.',
    features: [
      'Professional compressor technology',
      'Consistent particle delivery',
      'Durable construction',
      'Easy-clean nebulizer cup',
      'Built-in accessory storage',
      'Quiet operation',
      'Complete accessory kit',
    ],
    specs: {
      'Nebulization Rate': '≥0.30mL/min',
      'Particle Size': '2.5µm MMAD',
      'Max Pressure': '35 PSI',
      'Duty Cycle': 'Continuous',
      'Warranty': '5 years',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/nebulizer-desktop-1.jpg'],
  },

  // Smart Health Products
  {
    id: 'sh-001',
    name: 'CardioTrack ECG Monitor',
    category: 'smart-health',
    price: 179.99,
    rating: 4.8,
    reviewCount: 312,
    shortDescription: 'Medical-grade portable ECG with AI-powered analysis.',
    longDescription: 'The CardioTrack ECG Monitor puts hospital-quality heart monitoring in your pocket. Capture a single-lead ECG in just 30 seconds and receive instant AI-powered analysis that can detect common arrhythmias including AFib.',
    features: [
      'Medical-grade ECG',
      'AI arrhythmia detection',
      'AFib screening',
      '30-second recordings',
      'Unlimited storage',
      'PDF reports for doctors',
      'FDA cleared',
    ],
    specs: {
      'ECG Type': 'Single-lead',
      'Recording Time': '30-300 seconds',
      'Detection': 'AFib, Bradycardia, Tachycardia',
      'Battery': 'Rechargeable, 200+ readings',
      'Connectivity': 'Bluetooth 5.0',
      'App': 'iOS 12+ / Android 8+',
      'Certification': 'FDA Cleared, CE Marked',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/ecg-1.jpg'],
    badge: 'new',
  },
  {
    id: 'sh-002',
    name: 'VitalScale Smart Body Analyzer',
    category: 'smart-health',
    price: 89.99,
    rating: 4.6,
    reviewCount: 567,
    shortDescription: 'Smart scale with 13 body composition metrics.',
    longDescription: 'Go beyond weight with the VitalScale Smart Body Analyzer. Using advanced BIA technology, it measures 13 key body composition metrics including body fat, muscle mass, bone density, and metabolic age.',
    features: [
      '13 body metrics',
      'High-precision sensors',
      'Unlimited user profiles',
      'Baby weighing mode',
      'Athlete mode',
      'Trend tracking',
      'Goal setting',
    ],
    specs: {
      'Metrics': 'Weight, BMI, Body Fat %, Muscle Mass, Water %, Bone Mass, Visceral Fat, BMR, Metabolic Age, Protein %, Fat-free Body Weight, Subcutaneous Fat, Skeletal Muscle',
      'Capacity': '180kg / 400lb',
      'Accuracy': '±0.1kg',
      'Connectivity': 'Bluetooth + WiFi',
      'Display': 'LED',
      'Power': '4 x AAA',
    },
    stockStatus: 'in-stock',
    images: ['/images/products/scale-1.jpg'],
  },
  {
    id: 'sh-003',
    name: 'SleepTrack Pro Monitor',
    category: 'smart-health',
    price: 149.99,
    rating: 4.7,
    reviewCount: 234,
    shortDescription: 'Non-wearable sleep and vital signs monitor.',
    longDescription: 'Monitor your sleep quality without wearing anything. The SleepTrack Pro uses advanced radar technology to track sleep stages, breathing patterns, and heart rate while you sleep.',
    features: [
      'No-contact monitoring',
      'Sleep stage tracking',
      'Breathing analysis',
      'Heart rate monitoring',
      'Sleep score',
      'Smart alarm',
      'Environment sensors',
    ],
    specs: {
      'Technology': 'mmWave radar',
      'Metrics': 'Sleep stages, HR, Breathing, Movement',
      'Range': 'Up to 1.5m',
      'Connectivity': 'WiFi',
      'Power': 'USB-C',
      'Sensors': 'Temperature, Humidity, Light',
    },
    stockStatus: 'low-stock',
    images: ['/images/products/sleep-1.jpg'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Sarah Mitchell',
    role: 'Family Physician',
    content: 'I recommend Healthy Corner products to my patients. The accuracy and ease of use make home monitoring effective and reliable.',
    rating: 5,
    avatar: '/images/avatars/avatar-1.jpg',
  },
  {
    id: 't2',
    name: 'Robert Chen',
    role: 'Diabetes Patient',
    content: 'The GlucoCheck Pro has made managing my diabetes so much easier. Fast results and the app helps me track my trends.',
    rating: 5,
    avatar: '/images/avatars/avatar-2.jpg',
  },
  {
    id: 't3',
    name: 'Maria Garcia',
    role: 'Caregiver',
    content: 'As a caregiver for my elderly parents, these devices give me peace of mind. The quality is excellent and customer service is outstanding.',
    rating: 5,
    avatar: '/images/avatars/avatar-3.jpg',
  },
  {
    id: 't4',
    name: 'James Wilson',
    role: 'Heart Patient',
    content: 'The CardioTrack ECG Monitor detected my AFib before I even knew I had it. This device literally saved my life.',
    rating: 5,
    avatar: '/images/avatars/avatar-4.jpg',
  },
];

export const faqs: FAQItem[] = [
  // Orders & Delivery
  {
    id: 'faq-1',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. Free standard shipping on orders over $50.',
    category: 'Orders & Delivery',
  },
  {
    id: 'faq-2',
    question: 'Can I track my order?',
    answer: 'Yes, once your order ships, you\'ll receive an email with tracking information. You can also track your order by logging into your account or contacting our support team.',
    category: 'Orders & Delivery',
  },
  {
    id: 'faq-3',
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship to the United States, Canada, and select European countries. International shipping typically takes 7-14 business days. Please check our shipping page for your specific country.',
    category: 'Orders & Delivery',
  },
  {
    id: 'faq-4',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.',
    category: 'Orders & Delivery',
  },
  {
    id: 'faq-5',
    question: 'Can I change or cancel my order after placing it?',
    answer: 'You can modify or cancel your order within 1 hour of placing it. After that, our fulfillment process begins and changes may not be possible. Contact us immediately if you need to make changes.',
    category: 'Orders & Delivery',
  },

  // Warranty & Returns
  {
    id: 'faq-6',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely satisfied with your purchase, return it in original condition for a full refund. Opened test strips and consumables cannot be returned for hygiene reasons.',
    category: 'Warranty & Returns',
  },
  {
    id: 'faq-7',
    question: 'Do you offer warranty on your products?',
    answer: 'Yes, all our devices come with manufacturer warranty ranging from 1-5 years depending on the product. Extended warranty options are available at checkout for most devices.',
    category: 'Warranty & Returns',
  },
  {
    id: 'faq-8',
    question: 'How do I initiate a return or exchange?',
    answer: 'To start a return, log into your account, go to Order History, and select "Request Return" for the item. You\'ll receive a prepaid shipping label within 24 hours. Alternatively, contact our support team for assistance.',
    category: 'Warranty & Returns',
  },
  {
    id: 'faq-9',
    question: 'What does the warranty cover?',
    answer: 'Our warranty covers manufacturing defects, component failures, and accuracy issues under normal use. It does not cover physical damage, water damage (unless the device is water-resistant), or damage from improper use.',
    category: 'Warranty & Returns',
  },
  {
    id: 'faq-10',
    question: 'How do I make a warranty claim?',
    answer: 'For warranty claims, contact our support team with your order number and a description of the issue. We may ask for photos or videos. Most claims are processed within 3-5 business days, and we\'ll ship a replacement at no cost.',
    category: 'Warranty & Returns',
  },

  // Device Accuracy
  {
    id: 'faq-11',
    question: 'Are your medical devices FDA approved?',
    answer: 'Yes, all our medical devices are FDA cleared and/or CE marked, meeting the highest standards for accuracy and safety. Each product page displays its specific certifications.',
    category: 'Device Accuracy',
  },
  {
    id: 'faq-12',
    question: 'How accurate are home monitoring devices compared to hospital equipment?',
    answer: 'Our devices are clinically validated to provide accuracy comparable to professional medical equipment. For example, our blood pressure monitors meet AAMI/ESH/ISO standards with accuracy within ±3 mmHg for pressure and ±5% for pulse.',
    category: 'Device Accuracy',
  },
  {
    id: 'faq-13',
    question: 'How do I ensure accurate readings from my blood pressure monitor?',
    answer: 'For accurate readings: rest for 5 minutes before measuring, sit with feet flat on the floor, support your arm at heart level, don\'t talk during measurement, and take readings at the same time daily. Avoid caffeine and exercise 30 minutes before.',
    category: 'Device Accuracy',
  },
  {
    id: 'faq-14',
    question: 'Do your devices need regular calibration?',
    answer: 'Most of our devices come pre-calibrated and maintain accuracy throughout their lifespan. Blood glucose meters should be validated periodically using control solution. We recommend professional calibration checks every 2 years for blood pressure monitors.',
    category: 'Device Accuracy',
  },
  {
    id: 'faq-15',
    question: 'Why might my readings differ from my doctor\'s office?',
    answer: 'Minor variations are normal due to factors like time of day, stress, recent activity, and "white coat syndrome." Our devices meet clinical accuracy standards. If readings are consistently different by large amounts, contact our support team for troubleshooting.',
    category: 'Device Accuracy',
  },

  // Support
  {
    id: 'faq-16',
    question: 'How do I contact customer support?',
    answer: 'You can reach us via phone at 1-800-123-4567 (Mon-Fri 9AM-8PM EST), email at support@healthycorner.com, or live chat on our website. We typically respond to emails within 24 hours.',
    category: 'Support',
  },
  {
    id: 'faq-17',
    question: 'Do your devices sync with health apps?',
    answer: 'Many of our smart devices sync with popular health apps including Apple Health, Google Fit, and Samsung Health via Bluetooth. Check individual product pages for specific app compatibility.',
    category: 'Support',
  },
  {
    id: 'faq-18',
    question: 'Where can I find user manuals and setup guides?',
    answer: 'User manuals and quick-start guides are included with every product. Digital versions are available on each product page under "Downloads." You can also find video tutorials on our YouTube channel and Help Center.',
    category: 'Support',
  },
  {
    id: 'faq-19',
    question: 'Do you offer training on how to use the devices?',
    answer: 'Yes! We provide free video tutorials, step-by-step guides, and one-on-one phone support for all our products. For healthcare facilities, we offer group training sessions. Contact us to schedule a session.',
    category: 'Support',
  },
  {
    id: 'faq-20',
    question: 'What should I do if my device is not working properly?',
    answer: 'First, try our online troubleshooting guide for your specific device. If the issue persists, contact our support team—we\'re available 7 days a week and can often resolve issues quickly. If needed, we\'ll arrange a replacement under warranty.',
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
