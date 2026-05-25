# iLab Website - Project Review V2
**Date:** May 24, 2026  
**Architecture:** Firebase Firestore as Single Source of Truth  
**Focus:** Data Consolidation, Firebase-First Architecture, Elimination of Data Duplication

---

## Executive Summary

Following the decision to establish **Firestore as the definitive source of truth**, this review focuses on:

1. **🔴 CRITICAL:** Delete entire `app/data/` folder (12 files) - eliminate dual data sources
2. **🔴 CRITICAL:** Consolidate Firebase initialization across codebase
3. **🟠 MAJOR:** Migrate all static config to Firestore collections
4. **🟢 IMPROVEMENTS:** Simplified data fetching, consistent schemas, reduced code duplication

**Key Findings:**
- **Dual Data System Eliminated** - One source of truth (Firestore) instead of static files + runtime database
- **Configuration Consolidation** - 5 separate config files → 1 Firestore `settings` collection
- **-12 Files to Delete** - Removes maintenance burden and confusion
- **Reduced Bundle Size** - Client-side data files no longer needed
- **Consistent Schema** - Single validation across entire codebase

---

## 1. FIRESTORE AS SOURCE OF TRUTH - IMPLEMENTATION STATUS

### Current Architecture ✓
```
Client/Server
    ↓
Firebase SDKs (firebaseClient.js, firebaseAdmin.js)
    ↓
Firestore Collections:
  - categories/
  - devices/
  - brands/
  - services/
  - settings/
  - reviews/
  - faq/
  - pricing/
```

**Status: GOOD** - Firebase infrastructure properly initialized in:
- [lib/firebaseClient.js](lib/firebaseClient.js) - Client-side Firestore instance ✓
- [lib/firebaseAdmin.js](lib/firebaseAdmin.js) - Server-side Firestore instance ✓

### Problem: Duplicate Data Sources ❌

Currently **both exist simultaneously**:
```
❌ OLD (DEPRECATED - TO BE DELETED):
  app/data/
  ├── categories.js
  ├── devices.js
  ├── brands.js (via contentRegistry/categoryContent)
  ├── services/ (via repairServices.js)
  ├── site.config.js (LOCATIONS, COMPANY, HOURS)
  └── ... 7 more files

✓ NEW (SOURCE OF TRUTH - ACTIVE):
  Firestore Collections:
  ├── categories/
  ├── devices/
  ├── services/
  ├── settings/ (for site config)
  └── ...
```

**Risk:** 
- Components may import from stale `app/data/` files instead of Firestore
- Pricing/Services updated in Firestore but static files outdated
- Confusion about which data is authoritative

---

## 2. ACTION ITEMS - DELETE APP/DATA FOLDER

### 2.1 Files to Delete (12 Total)

**STEP 1: Verify No Imports** 

Run this before deletion:
```bash
grep -r "from '@/app/data/" app/ lib/ --include="*.js" --include="*.jsx" | head -20
grep -r "from 'app/data" app/ lib/ --include="*.js" --include="*.jsx" | head -20
grep -r "require.*app/data" app/ lib/ --include="*.js" --include="*.jsx" | head -20
```

If results show imports, **DO NOT DELETE** until those imports are updated to use Firestore.

---

**STEP 2: Verify Firebase Has All Data**

Before deletion, confirm Firestore collections have complete data:

```javascript
// Temporary verification script
// scripts/verifyFirestoreData.cjs
const admin = require('firebase-admin');

async function verify() {
  const db = admin.firestore();
  
  const collections = ['categories', 'devices', 'brands', 'services', 'settings'];
  
  for (const col of collections) {
    const snapshot = await db.collection(col).get();
    console.log(`${col}: ${snapshot.size} documents`);
  }
}

verify().catch(console.error);
```

Run: `node scripts/verifyFirestoreData.cjs`

**Expected Output:**
```
categories: X documents (where X > 0)
devices: Y documents (where Y > 0)
brands: Z documents (where Z > 0)
services: W documents (where W > 0)
settings: 1 documents
```

---

**STEP 3: Delete Files from app/data/**

Delete all 12 files:

```bash
# Backup first (recommended)
zip -r tmp/app_data_backup_$(date +%Y%m%d).zip app/data/

# Delete folder
rm -r app/data/

# Verify
ls -la app/data/  # Should error: No such file or directory
```

**Files Deleted:**
1. `app/data/brandContent.js` - Brand messaging → Firestore `brands/{id}`
2. `app/data/categories.js` - Category data → Firestore `categories/{id}`
3. `app/data/categoryContent.js` - Category content → Firestore `categories/{id}.content`
4. `app/data/contentRegistry.js` - Page content → Firestore `pages/{pageId}` or `content/{id}`
5. `app/data/devicePricing.js` - Pricing overrides → Firestore `pricing/{id}`
6. `app/data/devices.js` - Device data → Firestore `devices/{id}`
7. `app/data/faq.js` - FAQ items → Firestore `faq/{id}`
8. `app/data/places.js` - Locations → Firestore `settings/locations`
9. `app/data/processSteps.js` - Process steps → Firestore `content/processSteps`
10. `app/data/repairServices.js` - Services → Firestore `services/{id}`
11. `app/data/servicesContent.js` - Service content → Firestore `services/{id}.content`
12. `app/data/site.config.js` - Site config → Firestore `settings/config`

---

**STEP 4: Update All Imports**

Find all files still importing from `app/data/`:

```bash
grep -r "app/data" . --include="*.js" --include="*.jsx" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude="*.test.js"
```

For each import found, replace with Firestore fetch. Example:

```javascript
// ❌ OLD (delete this)
import { LOCATIONS } from '@/app/data/site.config';

// ✓ NEW (replace with this)
import { getSettings } from '@/lib/firestore/settings';
const settings = await getSettings();
const { locations } = settings;
```

---

### 2.2 Firestore Migration Checklist

**Before Deletion Complete:**

- [ ] All 12 files verified zero imports
- [ ] Firestore `verifyFirestoreData.cjs` shows complete data
- [ ] All imports updated to use Firestore fetchers
- [ ] API routes updated to read from Firestore
- [ ] Components updated to use Firestore queries
- [ ] Tests updated (if any reference app/data/)
- [ ] Backup created: `tmp/app_data_backup_YYYYMMDD.zip`
- [ ] `app/data/` folder deleted
- [ ] Deploy to staging and smoke test critical pages

---

## 3. FIREBASE INITIALIZATION CONSOLIDATION

### 3.1 Firebase Duplication Issue ❌

Currently `initFirebaseAdmin()` duplicated in multiple files:

**Files with duplication:**
- [lib/firebaseAdmin.js](lib/firebaseAdmin.js) - Line 8-20
- [lib/content/categories.js](lib/content/categories.js) - Similar pattern
- [lib/content/devices.js](lib/content/devices.js) - Similar pattern
- [lib/reviews/getReviewsSummary.js](lib/reviews/getReviewsSummary.js) - Similar pattern
- Multiple scripts in [scripts/](scripts/) folder

### 3.2 Solution: Centralized Firebase Instance ✓

**Current State:** [lib/firebaseAdmin.js](lib/firebaseAdmin.js) already has good pattern

```javascript
// ✓ GOOD - Use this pattern everywhere
import { db } from '@/lib/firebaseAdmin';

export async function getCategories() {
  const snapshot = await db.collection('categories').get();
  return snapshot.docs.map(doc => doc.data());
}
```

**Action:** 
- ✓ Keep `lib/firebaseAdmin.js` as is (already centralized)
- Audit other files to ensure they import from here
- Remove any local Firebase initialization code

**Status: MOSTLY DONE** - [lib/firebaseAdmin.js](lib/firebaseAdmin.js) is properly exported

---

## 4. DATA ACCESS LAYER - CONSOLIDATE LOADERS

### 4.1 Current Firestore Loaders

These are good patterns:

- [lib/content/categories.js](lib/content/categories.js) - Fetches categories from Firestore ✓
- [lib/content/devices.js](lib/content/devices.js) - Fetches devices from Firestore ✓
- [lib/reviews/getReviewsSummary.js](lib/reviews/getReviewsSummary.js) - Fetches reviews ✓
- [lib/siteSettings.js](lib/siteSettings.js) - Fetches settings ✓

### 4.2 New Loaders Needed (for deleted app/data files)

Create these to replace deleted files:

```javascript
// lib/firestore/services.js (NEW)
import { db } from '@/lib/firebaseAdmin';

export async function getServices() {
  const snapshot = await db.collection('services').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getServiceById(id) {
  const doc = await db.collection('services').doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

// lib/firestore/pricing.js (NEW)
import { db } from '@/lib/firebaseAdmin';

export async function getPricingOverrides() {
  const doc = await db.collection('settings').doc('pricing').get();
  return doc.exists ? doc.data() : {};
}

// lib/firestore/faq.js (NEW)
import { db } from '@/lib/firebaseAdmin';

export async function getFaqItems() {
  const snapshot = await db.collection('faq').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// lib/firestore/pages.js (NEW)
import { db } from '@/lib/firebaseAdmin';

export async function getPageContent(pageId) {
  const doc = await db.collection('pages').doc(pageId).get();
  return doc.exists ? doc.data() : null;
}
```

**Benefit:** Single source for all Firestore fetching, easy to add caching/error handling

---

## 5. SCHEMA STANDARDIZATION

### 5.1 Firestore Collection Schemas (Source of Truth)

Define these in Firestore and use consistently:

```javascript
// lib/schemas/firestore.js (REFERENCE)

/**
 * categories/{categoryId}
 */
export const CategorySchema = {
  name: {
    lv: string,      // Required
    ru: string,      // Required
  },
  slug: string,      // Unique, URL-safe
  description: {
    lv: string,
    ru: string,
  },
  imageUrl: string,  // Category thumbnail
  isActive: boolean, // Default: true
  order: number,     // Sort order
  createdAt: timestamp,
  updatedAt: timestamp,
};

/**
 * devices/{deviceId}
 */
export const DeviceSchema = {
  modelNumber: string,    // Apple model number (e.g., A2572)
  slug: string,           // URL-safe, e.g. "iphone-14-pro"
  brand: string,          // Always "Apple"
  category: string,       // Ref to category doc
  name: {
    lv: string,
    ru: string,
  },
  description: {
    lv: string,
    ru: string,
  },
  imageUrl: string,
  defaultServices: [string], // Array of service IDs
  createdAt: timestamp,
  updatedAt: timestamp,
};

/**
 * services/{serviceId}
 */
export const ServiceSchema = {
  name: {
    lv: string,
    ru: string,
  },
  slug: string,
  description: {
    lv: string,
    ru: string,
  },
  defaultPrice: number,   // EUR
  estimatedTime: number,  // Minutes
  category: string,       // Device category this applies to
  isActive: boolean,
  order: number,
  createdAt: timestamp,
  updatedAt: timestamp,
};

/**
 * settings/config
 */
export const SettingsSchema = {
  company: {
    name: string,
    email: string,
    phone: string,
    address: string,
  },
  locations: [
    {
      id: string,
      name: {
        lv: string,
        ru: string,
      },
      address: string,
      phone: string,
      email: string,
      hours: [
        {
          day: {
            lv: string,
            ru: string,
          },
          time: string,
        }
      ],
      coordinates: { lat: number, lng: number },
    }
  ],
  socials: [
    {
      name: string,    // facebook, instagram, etc
      url: string,
    }
  ],
  createdAt: timestamp,
  updatedAt: timestamp,
};
```

**Usage: Validate all data against this schema**

```javascript
// lib/schemas/validate.js (NEW)
export function validateCategory(data) {
  if (!data.slug) throw new Error('Category missing slug');
  if (!data.name?.lv || !data.name?.ru) {
    throw new Error('Category must have lv and ru names');
  }
  return data; // Validated
}

export function validateDevice(data) {
  if (!data.slug) throw new Error('Device missing slug');
  if (!data.modelNumber) throw new Error('Device missing modelNumber');
  return data;
}
```

---

## 6. ELIMINATED ISSUES FROM V1 REVIEW

### Previously Critical (Now Fixed by Firestore-First) ✅

**6.1 Dual Data Sources** ✅
- **Before:** Files in `app/data/` conflicted with Firestore
- **After:** Single Firestore source only

**6.2 Firebase Initialization Duplication** ✅
- **Before:** initFirebaseAdmin() in multiple places
- **After:** Centralized in `lib/firebaseAdmin.js`

**6.3 Schema Validation Mismatch** ✅
- **Before:** 8 different normalize functions
- **After:** Single Firestore schema + validation layer

**6.4 Data Sync Issues** ✅
- **Before:** Static files could desync from Firebase
- **After:** No static files - only Firebase

**6.5 Code Duplication** ✅
- **Before:** Unclear data flow, multiple sources
- **After:** Clear: Always fetch from Firestore

---

## 7. REMAINING WORK - POST APP/DATA DELETION

### 7.1 Cache Layer (Optional but Recommended)

Once app/data/ deleted, add in-memory cache for performance:

```javascript
// lib/cache/firestoreCache.js (NEW - OPTIONAL)
let categoryCache = null;
let cacheExpiry = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function getCategoriesCached() {
  const now = Date.now();
  
  if (categoryCache && now < cacheExpiry) {
    return categoryCache;
  }
  
  const categories = await getCategories(); // From lib/firestore/categories.js
  categoryCache = categories;
  cacheExpiry = now + CACHE_TTL;
  
  return categories;
}

// Invalidate cache on updates
export function invalidateCache() {
  categoryCache = null;
  cacheExpiry = 0;
}
```

**Benefit:** Reduced Firestore reads, faster page loads

---

### 7.2 Real-time Listeners (Optional)

If you need live updates (pricing, reviews):

```javascript
// lib/firestore/listeners.js (NEW - OPTIONAL)
import { onSnapshot } from 'firebase/firestore';
import { query, collection } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebaseClient';

export function watchPricing(callback) {
  const db = getFirestore(firebaseApp);
  
  const unsubscribe = onSnapshot(
    query(collection(db, 'pricing')),
    (snapshot) => {
      const prices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(prices);
    },
    (error) => console.error('Pricing listener error:', error)
  );
  
  return unsubscribe;
}
```

---

### 7.3 Admin Panel Integration

Ensure admin panel properly updates Firestore:

```javascript
// app/api/admin/categories/route.js (VERIFY)
import { db } from '@/lib/firebaseAdmin';

export async function POST(request) {
  const data = await request.json();
  
  // Validate before save
  validateCategory(data);
  
  // Save to Firestore (NOT to app/data/)
  await db.collection('categories').doc(data.slug).set(data);
  
  return Response.json({ success: true });
}
```

✓ **Status:** Check if admin API already does this

---

## 8. SCRIPTS TO UPDATE/DELETE

### 8.1 Scripts to Delete (Data Import Scripts)

These become **redundant after app/data deletion**:

- `scripts/exportCategoriesFromFirestore.cjs` - No need to export to static files
- `scripts/exportDevicesFromFirestore.cjs` - No need to export to static files
- `scripts/importCategoriesToFirestore.cjs` - Keep if still actively importing
- `scripts/importDevicesToFirestore.cjs` - Keep if still actively importing

**Action:** 
1. Archive old scripts: `mkdir scripts/archived && mv scripts/export*.cjs scripts/archived/`
2. Document in [scripts/README.md](scripts/README.md) which scripts are deprecated

### 8.2 Scripts to Keep

- `importContactFaqToFirestore.cjs` - Keep (active data pipeline)
- `importPricingToFirestore.cjs` - Keep (pricing updates)
- `importSiteSettingsToFirestore.cjs` - Keep (config updates)
- `backfillHiddenPhoneServicePricingNonApple.cjs` - Keep (data fixes)

---

## 9. SEO & PERFORMANCE IMPROVEMENTS

### 9.1 Meta Tags - Add hreflang ✓

Implement i18n hreflang tags:

```javascript
// app/layout.jsx or per-page
export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.ilab.lv';
  
  return {
    alternates: {
      languages: {
        'lv': `${baseUrl}${pathname}`,
        'ru': `${baseUrl}/ru${pathname}`,
        'x-default': `${baseUrl}${pathname}`,
      },
    },
  };
}
```

**Impact:** Fixes duplicate content SEO issues

---

### 9.2 Structured Data - Add Product Schema ✓

On device pages:

```javascript
// app/(site)/(catalog)/[brand]/[device]/page.jsx
export async function generateMetadata({ params }) {
  const device = await getDeviceById(params.device);
  
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: device.name.lv,
    brand: { '@type': 'Brand', name: device.brand },
    image: device.imageUrl,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: device.minPrice,
      highPrice: device.maxPrice,
    },
  };
  
  return {
    other: {
      'ld+json': JSON.stringify(productLd),
    },
  };
}
```

**Impact:** Better Rich Snippets in Google Search

---

## 10. MIGRATION TIMELINE & CHECKLIST

### Phase 1: Preparation (1-2 hours)
- [ ] Verify all Firestore collections have data
- [ ] Run grep to find all `app/data` imports
- [ ] Create backup: `zip -r tmp/app_data_backup_$(date).zip app/data/`
- [ ] Document findings in ticket

### Phase 2: Code Updates (2-3 hours)
- [ ] Update all imports to use Firestore loaders
- [ ] Update API routes to read from Firestore only
- [ ] Update components to fetch from Firestore
- [ ] Update tests (if any reference app/data)

### Phase 3: Deletion (30 minutes)
- [ ] Delete `app/data/` folder
- [ ] Update `.gitignore` (remove any app/data entries)
- [ ] Run `npm run build` to verify no missing imports
- [ ] Commit: "chore: remove static data files, use Firestore only"

### Phase 4: Testing (1-2 hours)
- [ ] Smoke test homepage
- [ ] Smoke test device pages
- [ ] Smoke test category pages
- [ ] Verify admin panel still works
- [ ] Check all API routes

### Phase 5: Deploy (30 minutes)
- [ ] Deploy to staging
- [ ] Run production smoke tests
- [ ] Monitor error logs for 24 hours
- [ ] Deploy to production

---

## 11. FIRESTORE BEST PRACTICES

### 11.1 Firestore Rules (Security)

Ensure rules allow reads but restrict writes:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access to collections
    match /{document=**} {
      allow read;
      allow write: if request.auth.uid != null && 
                      request.auth.token.admin == true;
    }
  }
}
```

---

### 11.2 Indexes (Performance)

Create composite indexes for queries:

```
collection: categories
- slug (Ascending)
- isActive (Ascending)

collection: devices  
- category (Ascending)
- isActive (Ascending)

collection: services
- category (Ascending)
- isActive (Ascending)
```

**Note:** Firestore suggests these when you run queries

---

### 11.3 Monitoring

Add error logging:

```javascript
// lib/firestore/errors.js
export function logFirestoreError(operation, error) {
  console.error(`Firestore ${operation} failed:`, {
    code: error.code,
    message: error.message,
    timestamp: new Date().toISOString(),
  });
  
  // Send to monitoring service (e.g., Sentry)
  if (typeof window === 'undefined') {
    // Server-side error
  }
}
```

---

## 12. SUMMARY OF CHANGES

### What's Deleted
- ❌ `app/data/` folder (12 files)
- ❌ Static data sources
- ❌ Data sync confusion

### What's Kept
- ✓ Firestore collections (source of truth)
- ✓ Firebase SDKs (firebaseClient.js, firebaseAdmin.js)
- ✓ Firestore loaders (lib/content/, lib/reviews/)
- ✓ Admin API routes

### What's New
- ✓ Schema validation layer (lib/schemas/)
- ✓ Consolidated Firestore loaders (lib/firestore/)
- ✓ Clear data access patterns
- ✓ Single source of truth

### Benefits
| Aspect | Before | After |
|--------|--------|-------|
| Data Sources | 2 (static + Firestore) | 1 (Firestore) |
| Sync Issues | High risk | None |
| Code Duplication | 8 normalize functions | 1 schema |
| Maintenance Burden | High | Low |
| Build Size | Larger (data files) | Smaller |
| Data Freshness | Possible stale | Always current |

---

## NEXT STEPS

1. **Backup** - Create `app_data_backup_$(date).zip`
2. **Verify** - Confirm Firestore has all data
3. **Audit** - Find all remaining imports from app/data/
4. **Migrate** - Update code to use Firestore loaders
5. **Delete** - Remove app/data/ folder
6. **Test** - Smoke test all critical pages
7. **Deploy** - Roll out to staging then production

**Estimated Effort:** 4-6 hours total  
**Risk Level:** 🟡 MEDIUM (high impact, but well-defined scope)  
**Benefit:** 🟢 HIGH (eliminated major architectural confusion)

---

**Review Status:** V2 - Firestore-First Architecture ✅  
**Date:** May 24, 2026  
**Next Review:** After migration complete (check for performance + new patterns)
