# 🎯 QUICK START - Supabase Backend

## ⚡ 3-Minute Setup

### 1️⃣ Get Supabase Credentials (2 min)
```
1. Go to https://app.supabase.com
2. Create new project → "healthy-corner"
3. Copy:
   - Project URL: Settings → API → URL
   - Anon Key: Settings → API → anon public key
```

### 2️⃣ Configure Environment (30 sec)
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

### 3️⃣ Create Database (30 sec)
```
1. Supabase Dashboard → SQL Editor
2. New Query → Paste supabase/schema.sql → Run
3. New Query → Paste supabase/seed.sql → Run
```

### 4️⃣ Test It! (30 sec)
```bash
npm run dev
```
Visit http://localhost:3000 - products now load from Supabase! ✅

---

## 📁 Files Created

```
src/lib/supabase/
  ├── client.ts          # Browser client
  ├── server.ts          # Server client  
  ├── types.ts           # TypeScript types
  ├── api.ts             # API functions
  └── test.ts            # Test connection

src/lib/services/
  └── products.ts        # Product service (with fallback)

supabase/
  ├── schema.sql         # Database tables
  └── seed.sql           # 5 products

.env.local.example       # Environment template
SUPABASE_SETUP.md       # Full documentation
```

---

## 🧪 Quick Test

Browser console test:
```typescript
import { getAllProducts } from '@/lib/supabase/api';

const products = await getAllProducts();
console.log(products); // Should show 5 products
```

---

## 🗄️ Database Schema

**products**
- id (uuid)
- name (text)
- description (text)
- price_jod (decimal)
- category (text)
- in_stock (boolean)
- image_urls (text[])

**orders**
- id (uuid)
- customer_name, phone, address
- city (default: 'Amman')
- country (default: 'Jordan')
- total_jod (decimal)
- status (default: 'pending')

**order_items**
- id (uuid)
- order_id (FK)
- product_id (FK)
- quantity (integer)
- price_jod (decimal)

---

## 📦 Seeded Products

1. Blood Pressure Monitor - 45 JOD
2. Pulse Oximeter - 25 JOD
3. Digital Thermometer - 18 JOD
4. Stethoscope - 35 JOD
5. Nebulizer - 55 JOD

---

## 🔍 Verify Setup

**Supabase Dashboard:**
1. Table Editor → products → Should see 5 rows ✅
2. SQL Editor → Run: `SELECT * FROM products;` ✅

**Your App:**
1. `npm run dev` ✅
2. Homepage loads 5 products ✅
3. No console errors ✅

---

## 💡 Usage Examples

### Fetch all products:
```typescript
import { getProducts } from '@/lib/services/products';
const products = await getProducts();
```

### Fetch one product:
```typescript
import { getProduct } from '@/lib/services/products';
const product = await getProduct('product-id');
```

### Create order:
```typescript
import { createOrder } from '@/lib/supabase/api';

await createOrder({
  customer_name: 'John Doe',
  phone: '+962790000000',
  address: '123 Main St',
  city: 'Amman',
  country: 'Jordan',
  total_jod: 70.00,
  items: [
    { product_id: 'uuid', quantity: 2, price_jod: 35.00 }
  ]
});
```

---

## 🎓 What You Got

✅ **Full Backend**: PostgreSQL database via Supabase  
✅ **Type Safety**: Full TypeScript support  
✅ **RLS Security**: Row-level security policies  
✅ **Guest Checkout**: No auth required for orders  
✅ **Smart Fallback**: Works offline with mock data  
✅ **Production Ready**: Scalable architecture  
✅ **Jordan Localized**: JOD currency, Amman defaults  

---

## 📖 Full Docs

See **SUPABASE_SETUP.md** for detailed documentation.

**Happy coding! 🚀**
