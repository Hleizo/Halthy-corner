-- ============================================================
-- Healthy Corner — Seed Data
-- Run this AFTER schema.sql in your Supabase SQL Editor
-- ============================================================

INSERT INTO products (id, name, category, price, original_price, rating, review_count, short_description, long_description, features, specs, stock_status, images, badge)
VALUES
(
  'bp-001',
  'Blood Pressure Monitor',
  'blood-pressure-monitors',
  45.00,
  55.00,
  4.8,
  342,
  'Professional-grade digital blood pressure monitor with automatic arm cuff for accurate home and clinical measurements.',
  'This advanced digital blood pressure monitor provides hospital-grade accuracy for reliable home health monitoring. Featuring an automatic arm cuff with intelligent pressure technology, it delivers precise systolic and diastolic readings along with pulse rate measurement. The device is designed for ease of use, making it ideal for daily blood pressure management and hypertension monitoring.',
  ARRAY[
    'Fully automatic arm cuff with one-touch operation',
    'Irregular heartbeat detection with visual indicator',
    'Large backlit LCD display for easy reading',
    'Memory storage for up to 120 readings for 2 users',
    'WHO blood pressure classification indicator'
  ],
  '{"Measurement Method":"Oscillometric","Measurement Range":"Pressure: 0-299 mmHg, Pulse: 40-180 bpm","Accuracy":"Pressure: ±3 mmHg, Pulse: ±5%","Cuff Size":"22-42 cm (standard adult)","Display":"Backlit LCD","Memory":"120 readings × 2 users","Power Source":"4 × AA batteries or AC adapter (included)","Weight":"340g (without batteries)","Warranty":"3 years"}'::jsonb,
  'in-stock',
  ARRAY['/images/products/blood-pressure-monitor.jpg'],
  'bestseller'
),
(
  'ox-001',
  'Pulse Oximeter',
  'pulse-oximeters',
  25.00,
  32.00,
  4.7,
  521,
  'Compact fingertip pulse oximeter for quick and accurate blood oxygen saturation (SpO2) and pulse rate monitoring.',
  'This medical-grade fingertip pulse oximeter provides fast, accurate measurements of blood oxygen saturation (SpO2) and pulse rate. Using advanced optical sensing technology, it delivers reliable readings within seconds. The lightweight, portable design makes it essential for home health monitoring, sports activities, and aviation use. Perfect for individuals with respiratory conditions, athletes, and anyone needing to monitor their oxygen levels.',
  ARRAY[
    'Fast SpO2 and pulse rate readings in under 10 seconds',
    'Multi-directional OLED display with adjustable brightness',
    'Plethysmograph waveform for reading quality verification',
    'Auto power-off to preserve battery life',
    'Suitable for adults and children (age 4+)'
  ],
  '{"SpO2 Measurement Range":"70% - 100%","SpO2 Accuracy":"±2% (80-100%), ±3% (70-79%)","Pulse Rate Range":"30 - 250 bpm","Pulse Rate Accuracy":"±2 bpm","Display":"Dual-color OLED, 6 display modes","Finger Size":"8mm - 25.4mm diameter","Power Source":"2 × AAA batteries (30+ hours operation)","Weight":"50g (with batteries)","Warranty":"2 years"}'::jsonb,
  'in-stock',
  ARRAY['/images/products/pulse-oximeter.jpg'],
  'bestseller'
),
(
  'tm-001',
  'Digital Thermometer',
  'thermometers',
  18.00,
  NULL,
  4.6,
  678,
  'Non-contact infrared digital thermometer for instant and hygienic temperature measurements.',
  'This advanced non-contact infrared thermometer provides accurate temperature readings in just one second without physical contact. Ideal for use with infants, children, and adults, it offers a hygienic solution for temperature monitoring. The color-coded fever alert system provides instant visual feedback, while the silent mode allows for measurements without disturbing sleeping patients.',
  ARRAY[
    'Non-contact measurement from 3-5 cm distance',
    'Instant 1-second temperature reading',
    'Color-coded fever alert (green/yellow/red)',
    'Dual mode: Body and surface/object temperature',
    'Silent mode for sleeping patients'
  ],
  '{"Measurement Method":"Infrared","Body Temperature Range":"32.0°C - 42.9°C (89.6°F - 109.2°F)","Object Temperature Range":"0°C - 100°C (32°F - 212°F)","Accuracy":"±0.2°C (±0.4°F)","Measurement Time":"1 second","Measurement Distance":"3-5 cm","Memory":"50 readings","Display":"Backlit LCD","Power Source":"2 × AAA batteries","Warranty":"2 years"}'::jsonb,
  'in-stock',
  ARRAY['/images/products/digital-thermometer.jpg'],
  NULL
),
(
  'st-001',
  'Stethoscope',
  'stethoscopes',
  35.00,
  42.00,
  4.9,
  256,
  'Professional dual-head stethoscope with premium acoustic performance for clinical auscultation.',
  'This professional-grade dual-head stethoscope delivers exceptional acoustic clarity for cardiovascular and respiratory assessment. Featuring a precision-machined stainless steel chestpiece with tunable diaphragm technology, it allows healthcare professionals and home users to hear both high and low frequency sounds with remarkable clarity. The ergonomic design ensures comfort during extended use.',
  ARRAY[
    'Dual-head chestpiece with tunable diaphragm and bell',
    'Premium stainless steel construction for durability',
    'High-performance acoustic tubing for clear sound transmission',
    'Soft-sealing ear tips for comfortable, ambient noise reduction',
    'Versatile use for adult and pediatric patients'
  ],
  '{"Chestpiece Material":"Stainless steel","Chestpiece Diameter":"Diaphragm: 45mm, Bell: 35mm","Tubing Material":"Medical-grade PVC, latex-free","Tubing Length":"70 cm","Frequency Response":"20 Hz - 1000 Hz","Ear Tips":"Soft silicone, multiple sizes included","Total Weight":"150g","Colors Available":"Black, Navy Blue, Burgundy","Warranty":"5 years"}'::jsonb,
  'in-stock',
  ARRAY['/images/products/stethoscope.jpg'],
  'new'
),
(
  'nb-001',
  'Nebulizer',
  'nebulizers',
  55.00,
  NULL,
  4.5,
  234,
  'Portable mesh nebulizer for efficient delivery of respiratory medications at home or on the go.',
  'This advanced portable nebulizer utilizes innovative mesh technology to convert liquid medication into a fine, breathable mist for effective respiratory therapy. Ultra-quiet operation and compact design make it ideal for use anywhere—at home, work, or while traveling. Suitable for treating asthma, COPD, bronchitis, and other respiratory conditions, it provides consistent medication delivery for patients of all ages.',
  ARRAY[
    'Advanced mesh nebulization technology for fine mist delivery',
    'Ultra-quiet operation under 25dB—ideal for nighttime use',
    'Compact, portable design fits in pocket or bag',
    'Rechargeable battery provides 4+ treatment sessions per charge',
    'Includes adult and pediatric masks plus mouthpiece'
  ],
  '{"Nebulization Technology":"Vibrating mesh","Nebulization Rate":"≥0.25 mL/min","Particle Size (MMAD)":"3.0 µm (optimal for deep lung delivery)","Medication Capacity":"8 mL","Residual Volume":"<0.3 mL","Noise Level":"<25 dB","Battery":"Rechargeable Li-ion, 2000mAh","Charging":"USB-C, 2 hours full charge","Weight":"100g","Warranty":"2 years"}'::jsonb,
  'in-stock',
  ARRAY['/images/products/nebulizer.jpg'],
  NULL
);
