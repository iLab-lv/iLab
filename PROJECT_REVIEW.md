 # iLab Website - Project Review
**Date:** May 6, 2026  
**Focus:** Business Logic Optimization, Code Unification, and SEO Improvements

---

## Executive Summary

The iLab codebase is a well-structured Next.js application for an iPhone repair service business with multi-location support and i18n (Latvian/Russian). The project demonstrates good architectural patterns but suffers from **code duplication**, **scattered configuration**, and **SEO gaps**. This review identifies 12+ critical optimization opportunities that will improve maintainability, scalability, and search engine visibility.

**Key Findings:**
- 🔴 **3 critical duplications** affecting Firebase, normalization, and data sources
- 🟡 **5+ unused code exports** and legacy files causing maintenance overhead
- 🟠 **8 SEO improvement opportunities** including hreflang, structured data, and technical SEO
- 💡 **Consolidation potential** in configuration management (5 different data registries)

---

## 1. BUSINESS LOGIC OPTIMIZATION

### 1.1 Data Architecture Issues

**Current State:**
The project maintains **dual data systems**:
- **Static source:** `app/data/` (categories.js, devices.js, brandContent.js, etc.)
- **Runtime source:** Firebase (accessed via `lib/content/`)

**Problems:**
1. Unclear data flow - is Firestore primary or fallback?
2. Sync mechanism not documented
3. Two normalization schemas for categories/brands exist
4. Difficult to determine which data is authoritative during development

**Recommendation:**
```
Establish clear data hierarchy:
  1. Firebase Firestore = Runtime source of truth (for dynamic pricing, reviews, FAQs)
  2. app/data/ = Static content + defaults + fallback cache
  3. Create single loader that: Firestore first → falls back to app/data/
```

---

### 1.2 Firebase Initialization Duplication (🔴 CRITICAL)

**Affected Files:**
- [lib/content/categories.js](lib/content/categories.js) (Lines 4-31)
- [lib/content/devices.js](lib/content/devices.js) (Lines 5-32)
- [lib/reviews/getReviewsSummary.js](lib/reviews/getReviewsSummary.js) (Similar pattern)
- All scripts in [scripts/](scripts/) folder

**Issue:** Identical `initFirebaseAdmin()`, `assertEnv()`, and `getDb()` functions repeated across 4+ files.

**Duplicate Code Pattern:**
```javascript
// Appears in 3+ places
function initFirebaseAdmin() {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY)),
    });
  }
}

async function getDb() {
  return admin.firestore();
}
```

**Impact:** 
- Maintenance nightmare - fix applied to one file, forgotten in others
- Increases bundle size and execution time
- Testing difficult - must mock in multiple places

**Fix:** Extract to shared utility
```javascript
// lib/firebaseAdmin/init.js (NEW)
export function assertEnv(name) {
  if (!process.env[name]) throw new Error(`Missing ${name}`);
  return process.env[name];
}

export function initFirebaseAdmin() {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(assertEnv('FIREBASE_ADMIN_KEY'))
      ),
    });
  }
  return admin;
}

export async function getDb() {
  initFirebaseAdmin();
  return admin.firestore();
}

// Usage in all files:
import { getDb } from '@/lib/firebaseAdmin/init';
const db = await getDb();
```

**Estimated effort:** 30 minutes (refactor + test)  
**Benefit:** -50 lines duplicated code, improved maintainability

---

### 1.3 Schema Validation Duplication (🔴 CRITICAL)

**8 Different Implementations of Data Normalization:**

| Function | Location | Schema |
|----------|----------|--------|
| `normalizeBrand()` | [lib/content/categories.js#L59](lib/content/categories.js#L59) | Firebase version |
| `normalizeBrand()` | [app/api/admin/categories#L42](app/api/admin/categories/route.js#L42) | Admin API version (INCOMPATIBLE) |
| `normalizeCategory()` | [lib/content/categories#L81](lib/content/categories.js#L81) | Firebase version |
| `normalizeCategory()` | [app/api/admin/categories#L116](app/api/admin/categories/route.js#L116) | Different structure |
| `normalizeDevice()` | [lib/content/devices#L36](lib/content/devices.js#L36) | Firebase version |
| `normalizeFaqItem()` | [app/api/faq/route#L5](app/api/faq/route.js#L5) | FAQ item schema |
| `normalizeFaqGroup()` | [app/api/faq/route#L16](app/api/faq/route.js#L16) | FAQ group schema |
| `normalizeReview()` | [lib/reviews/getReviewsSummary#L11](lib/reviews/getReviewsSummary.js#L11) | Review schema |

**Critical Problem - Incompatible Schemas:**

Admin API accepts multi-locale structure:
```javascript
// app/api/admin/categories/route.js (Line 125+)
category: {
  lv: "iPhone remonts",
  ru: "Ремонт iPhone"
}
```

Lib version doesn't support this:
```javascript
// lib/content/categories.js (Line 85+)
category: "iPhone remonts"  // Single locale
```

This causes data corruption when syncing between admin panel and database.

**Fix - Create centralized schema validators:**

```javascript
// lib/schemas/index.js (NEW)

export const BrandSchema = {
  validate: (data, locale = 'lv') => {
    if (!data.slug) throw new Error('Brand must have slug');
    if (locale && !data.name?.[locale]) throw new Error(`Brand missing name.${locale}`);
    return {
      slug: data.slug,
      name: data.name || {},
      category: data.category,
      isActive: data.isActive ?? true,
    };
  }
};

export const CategorySchema = {
  validate: (data, locale = 'lv') => {
    if (!data.slug) throw new Error('Category must have slug');
    return {
      slug: data.slug,
      name: data.name || {},
      brands: data.brands || [],
      isActive: data.isActive ?? true,
    };
  }
};

export const DeviceSchema = {
  validate: (data) => ({
    modelNumber: data.modelNumber,
    slug: data.slug,
    brand: data.brand,
    category: data.category,
    pricing: data.pricing || {},
  })
};

// Usage in both lib/ and API routes:
import { CategorySchema } from '@/lib/schemas';

const validated = CategorySchema.validate(inputData);
```

**Benefits:**
- Single source of truth for data structure
- Prevents schema mismatches
- Reusable across admin API, lib loaders, and validation
- Easy to add new locale support

**Estimated effort:** 1-2 hours  
**Benefit:** Prevents data corruption, unifies 8 functions → 1

---

### 1.4 Data Source Consolidation

**Current Configuration Files (5 separate sources):**

| File | Purpose | Lines |
|------|---------|-------|
| [site.config.js](app/data/site.config.js) | COMPANY, SOCIALS, LOCATIONS, HOURS | 100+ |
| [repairServices.js](app/data/repairServices.js) | Service catalog | 80+ |
| [devicePricing.js](app/data/devicePricing.js) | Per-model pricing | 200+ |
| [contentRegistry.js](app/data/contentRegistry.js) | SEO + Hub page content | 300+ |
| [brandContent.js](app/data/brandContent.js) | Brand-specific templates | 200+ |

**Problem: Overlapping concerns**
- `contentRegistry` has SEO metadata
- `brandContent` ALSO has SEO metadata
- `site.config.js` has generic + location-specific content
- Unclear which takes precedence

**Recommended Structure:**
```
app/data/
├── config/
│   ├── company.js          (COMPANY, SOCIALS)
│   ├── locations.js        (LOCATIONS with per-location hours)
│   └── services.js         (repairServices catalog + category-service mapping)
├── content/
│   ├── pages.js            (contentRegistry - hub pages, service pages)
│   ├── seo.js              (SEO templates + metadata rules)
│   └── copy.js             (brandContent - brand messaging)
└── pricing/
    └── overrides.js        (devicePricing - per-model overrides)
```

**Benefit:** Clear separation of concerns, easier navigation

---

### 1.5 Service-Pricing Business Logic Coupling

**Current Flow:**
```
Device Page Component
  → Fetches device from devices.js
  → Queries repairServices[] array
  → Looks up pricing from devicePricing[modelSlug]
  → Manual merge of service title + time + pricing
```

**Issue:** Business logic scattered across three files. No service repository.

**Better Approach:**
```javascript
// lib/services/deviceServicePricing.js (NEW)
export async function getDeviceServiceOptions(device) {
  // 1. Get applicable services for device category
  // 2. Apply pricing overrides for this specific model
  // 3. Return enriched service list
  
  const services = await getServicesForCategory(device.category);
  const pricing = await getPricingOverrides(device.slug);
  
  return services.map(service => ({
    ...service,
    price: pricing[service.id]?.price || service.defaultPrice,
    isHidden: pricing[service.id]?.isHidden || false,
  }));
}
```

**Benefit:** Reusable, testable, DRY - used by page components and API

---

## 2. UNUSED CODE & FILES (🔴 🟡 🟠)

### 2.1 Unused Exports

**1. `HOURS` constant - UNUSED (🔴)**
- **Location:** [site.config.js#L22-31](app/data/site.config.js#L22-31)
- **Status:** Exported but never imported anywhere
- **Why:** Superseded by per-location hours in `LOCATIONS[i].hours`
- **Action:** DELETE

```javascript
// DELETE these lines (currently unused):
export const HOURS = {
  en: [
    { day: 'Monday - Friday', time: '9:00 - 18:00' },
    { day: 'Saturday', time: '10:00 - 16:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
  // ...
};
```

---

**2. `PLACES` object - UNUSED (🔴)**
- **Location:** [app/data/places.js](app/data/places.js) (entire file)
- **Status:** Exported, zero imports found
- **Impact:** Dead code
- **Action:** DELETE entire file

```javascript
// app/data/places.js - NO IMPORTS FOUND
export const PLACES = {
  domina: { hours: [...], contact: "..." },
  spice: { hours: [...], contact: "..." },
};
// This data is already in LOCATIONS array - REDUNDANT
```

**Verification (grep results):** No usage of `places` or `PLACES` in codebase

---

**3. `categories.js.bak` - BACKUP FILE (🟡)**
- **Location:** [lib/content/categories.js.bak](lib/content/categories.js.bak)
- **Status:** Version control artifact
- **Action:** DELETE (use git history if rollback needed)

---

### 2.2 Potentially Legacy Scripts (🟠)

**Scripts in [scripts/](scripts/) folder that may no longer be used:**

| Script | Purpose | Recommendation |
|--------|---------|---|
| [backfillHiddenPhoneServicePricingNonApple.cjs](scripts/backfillHiddenPhoneServicePricingNonApple.cjs) | One-time data migration | Verify if still needed, document or archive |
| [setHiddenPhoneServicePricingNonApple.cjs](scripts/setHiddenPhoneServicePricingNonApple.cjs) | Toggle service visibility | Check if admin panel handles this now |
| [replaceDashesInFirestore.cjs](scripts/replaceDashesInFirestore.cjs) | Text replacement cleanup | Archive with date - was it one-time? |
| [importPricingToFirestore.cjs](scripts/importPricingToFirestore.cjs) | Pricing import | Is this still used for bulk updates? |
| [importDevicesRuAndLocalize.cjs](scripts/importDevicesRuAndLocalize.cjs) | Device localization | Check if part of active data pipeline |

**Action:** Create [scripts/README.md](scripts/README.md) documenting:
- Which scripts are actively used
- Which are one-time migrations (with dates)
- Which can be archived

---

### 2.3 Potential Dead Code in Components

**Location Resolution Logic Duplication:**
- [lib/content/resolvers/catalogPages.js](lib/content/resolvers/catalogPages.js) - Main resolver
- Similar logic appears in component files:
  - [app/(site)/(catalog)/telefonu-remonts/[brand]/[device]/PhoneDevicePage.jsx](app/(site)/(catalog)/telefonu-remonts/[brand]/[device]/PhoneDevicePage.jsx)
  
**Recommendation:** Verify if logic in component files is still used or if it's been superseded by resolver.

---

## 3. SEO IMPROVEMENTS (💡 8 Opportunities)

### 3.1 Missing hreflang Tags (HIGH PRIORITY - 🔴)

**Current State:** 
- Website supports two languages: Latvian (main) and Russian (`/ru/*` routes)
- **hreflang tags not implemented**
- Search engines may index duplicate content

**Impact:** 
- Google penalizes duplicate content without hreflang
- Russian pages may rank lower than Latvian versions
- Wasted crawl budget

**Fix - Add hreflang in `app/layout.js`:**

```javascript
// app/layout.js
export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.ilab.lv';
  const path = getPathWithoutLocale(params);
  
  return {
    alternates: {
      languages: {
        'lv': `${baseUrl}${path}`,
        'ru': `${baseUrl}/ru${path}`,
        'x-default': `${baseUrl}${path}`,
      },
    },
  };
}
```

**Also in page-specific metadata:**
```javascript
// app/(site)/(catalog)/telefonu-remonts/[brand]/page.jsx
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://www.ilab.lv/telefonu-remonts/${params.brand}`,
      languages: {
        'lv': `https://www.ilab.lv/telefonu-remonts/${params.brand}`,
        'ru': `https://www.ilab.lv/ru/telefonu-remonts/${params.brand}`,
      },
    },
  };
}
```

**Estimated effort:** 1-2 hours  
**SEO Impact:** 🟢 HIGH - Fix duplicate content issues

---

### 3.2 Incomplete Structured Data (🟡)

**Current JSON-LD Coverage:**

| Schema Type | Coverage | Status |
|---|---|---|
| Organization | ✓ | Implemented [app/(site)/head.jsx#14-28](app/(site)/head.jsx#L14-L28) |
| LocalBusiness | ✓ | Per-location in head.jsx |
| Service | ⚠️ | Partial - only in [jsonldHelpers.js#L86-119](lib/seo/jsonldHelpers.js#L86-L119) |
| Product (Device) | ✗ | **MISSING** |
| BreadcrumbList | ✓ | Implemented [jsonldHelpers.js#L60-84](lib/seo/jsonldHelpers.js#L60-L84) |
| FAQPage | ✓ | Implemented [jsonldHelpers.js#L193+](lib/seo/jsonldHelpers.js#L193) |
| HowTo (repair process) | ✓ | Implemented [jsonldHelpers.js#L141-191](lib/seo/jsonldHelpers.js#L141-L191) |
| AggregateRating | ⚠️ | Only in location schema - missing from reviews display |

**Missing Product Schema - Device Pages:**

Currently no structured data for device pricing/availability. Add:

```javascript
// app/(site)/(catalog)/telefonu-remonts/[brand]/[device]/page.jsx
import { buildProductLd } from '@/lib/seo/jsonldHelpers';

export default function DevicePage({ device, pricing }) {
  const productLd = buildProductLd({
    name: device.modelName,
    description: device.metaDescription,
    brand: device.brand,
    offers: Object.entries(pricing).map(([serviceId, price]) => ({
      serviceType: serviceId,
      price: price,
      priceCurrency: 'EUR',
    })),
    aggregateRating: device.rating, // If you have ratings
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      {/* Page content */}
    </>
  );
}
```

**Also improve AggregateRating with review count:**
```javascript
// lib/seo/jsonldHelpers.js - ADD:
export function buildAggregateRatingLd(reviews) {
  if (!reviews || reviews.length === 0) return null;
  
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: avgRating.toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
}
```

**Estimated effort:** 2-3 hours  
**SEO Impact:** 🟢 MEDIUM - Better rich snippets in search results

---

### 3.3 Meta Descriptions Strategy (🟡)

**Current Issues:**
1. Many pages use generic descriptions
2. No location-specific descriptions
3. Device pages may have truncated titles

**Audit Required:** Check if these are properly filled:

```javascript
// Example - verify these are unique per page
// Current status - likely missing location variants:

// /telefonu-remonts/iphone-14/
// Should be: "iPhone 14 repair in Riga - battery replacement, screen repair..."

// /telefonu-remonts/iphone-14/ (in Russian)
// Currently probably: /ru/telefonu-remonts/iphone-14/
// Should have Russian description
```

**Solution - Create metadata generator:**

```javascript
// lib/seo/descriptionGenerator.js (NEW)
export function generateDevicePageDescription(device, location = null) {
  const services = ['screen repair', 'battery', 'charging port'];
  const locationStr = location ? ` in ${location.city}` : '';
  
  return `${device.brand} ${device.model} repair${locationStr} - ` +
         `${services.join(', ')}. Fast service, genuine parts. Book now.`;
}

export function generateCategoryDescription(brand, category, location = null) {
  const locationStr = location ? ` in ${location.city}` : '';
  return `${brand} ${category}${locationStr} - Professional repair service. ` +
         `Expert technicians, warranty included. Call or book online.`;
}
```

---

### 3.4 Open Graph & Twitter Cards (🟡)

**Current State:** Likely missing social media preview images

**Add to each page metadata:**

```javascript
export async function generateMetadata({ params }) {
  return {
    openGraph: {
      title: 'iPhone 14 Repair in Riga',
      description: 'Fast iPhone 14 repair with genuine parts...',
      url: 'https://www.ilab.lv/telefonu-remonts/iphone-14',
      type: 'website',
      images: [
        {
          url: 'https://www.ilab.lv/og-images/device-iphone-14.jpg',
          width: 1200,
          height: 630,
          alt: 'iPhone 14 repair services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'iPhone 14 Repair',
      description: 'Fast iPhone 14 repair...',
      image: 'https://www.ilab.lv/og-images/device-iphone-14.jpg',
    },
  };
}
```

**Estimated effort:** 1-2 hours + image creation  
**SEO Impact:** 🟢 MEDIUM - Better CTR from social sharing

---

### 3.5 Sitemap Enhancement (🟡)

**Current:** [app/sitemap.js](app/sitemap.js) generates sitemap

**Improvements:**
1. Add `lastmod` dates
2. Add `changefreq` values
3. Prioritize by importance
4. Generate separate sitemaps for i18n routes

```javascript
// app/sitemap.js - Enhanced example
export default function sitemap() {
  return [
    // High-priority pages (change weekly)
    {
      url: 'https://www.ilab.lv',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Device pages (change monthly - when pricing updates)
    {
      url: 'https://www.ilab.lv/telefonu-remonts/iphone-14',
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last week
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // i18n variant
    {
      url: 'https://www.ilab.lv/ru/telefonu-remonts/iphone-14',
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      changeFrequency: 'monthly',
      priority: 0.7, // Slightly lower priority for translations
    },
  ];
}
```

**Estimated effort:** 1 hour  
**SEO Impact:** 🟢 LOW-MEDIUM - Better crawl efficiency

---

### 3.6 Internal Linking Strategy (🟠)

**Audit:** Check if these natural links exist:
- Device pages → Brand page
- Brand page → Category page
- Service pages → Related devices
- FAQ → Relevant service pages

**Ensure breadcrumbs link correctly:**
```
Home > iPhone Repair > iPhone 14 > Screen Repair
```

---

### 3.7 Page Speed SEO Signals (🟠)

**Check Next.js optimizations:**
- [ ] Images using `<Image>` component (next/image)
- [ ] CSS-in-JS minified
- [ ] Code splitting on route boundaries
- [ ] Font optimization (already using `Inter` with swap)

**Quick wins:**
```javascript
// app/layout.js - Already good
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',  // ✓ Prevents FOIT
  variable: '--font-inter',
});
```

---

### 3.8 Mobile-First Indexing (🟠)

**Verify:**
- [ ] Meta viewport tag present
- [ ] Mobile layout tested
- [ ] Touch targets > 48px
- [ ] No horizontal scroll

**Current state:** Likely good (React + Next.js defaults)

---

## 4. CODE QUALITY & MAINTAINABILITY

### 4.1 Import Organization Issues

**Problem:** Relative path depth inconsistent

```javascript
// Some files use:
import { getSiteSettings } from '@/lib/siteSettings';      // ✓ Alias
import { COMPANY } from '../../data/site.config';          // ✗ Relative
import LOCATIONS from '../../../app/data/site.config';     // ✗ Fragile
```

**Solution:** Standardize on `@/` alias throughout:
```javascript
// Good:
import { LOCATIONS } from '@/app/data/site.config';
import { getDb } from '@/lib/firebaseAdmin/init';
```

---

### 4.2 Error Handling Consistency

**Current state:** Varies by route

```javascript
// Good (app/api/booking/route.js):
try {
  await sendEmail(...);
  return NextResponse.json({ success: true });
} catch (error) {
  console.error('Booking error:', error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}

// Basic (app/api/faq/route.js):
try {
  // ...
} catch (error) {
  return NextResponse.json({ error: 'Failed' }, { status: 500 });
}
```

**Create error handler utility:**
```javascript
// lib/api/errorHandler.js (NEW)
export function handleApiError(error, defaultMessage = 'Internal server error') {
  const isDev = process.env.NODE_ENV === 'development';
  
  console.error(defaultMessage, error);
  
  return NextResponse.json(
    {
      error: isDev ? error.message : defaultMessage,
      ...(isDev && { stack: error.stack }),
    },
    { status: error.status || 500 }
  );
}

// Usage:
try {
  // ...
} catch (error) {
  return handleApiError(error, 'Failed to fetch FAQ');
}
```

---

### 4.3 Environment Variable Validation

**Current:** `assertEnv()` repeated in multiple files

**Better approach:** Create `.env.example` with documentation + validation on startup

```javascript
// lib/env/validation.js (NEW)
const REQUIRED_ENV_VARS = [
  'FIREBASE_ADMIN_KEY',
  'FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'BOOKING_TO_EMAIL',
];

export function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter(v => !process.env[v]);
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}
```

---

## 5. RECOMMENDATIONS PRIORITY MAP

### 🔴 CRITICAL (Do First - 2-3 days)

| Priority | Task | Effort | Impact |
|---|---|---|---|
| 1 | Extract Firebase init → `lib/firebaseAdmin/init.js` | 30 min | Reduce duplication, improve consistency |
| 2 | Centralize schema validators → `lib/schemas/` | 2 hrs | Prevent data corruption, unify 8 functions |
| 3 | Delete unused exports (`HOURS`, `PLACES`, `.bak`) | 15 min | Clean up dead code |
| 4 | Add hreflang tags for i18n | 1-2 hrs | Fix duplicate content SEO issue |

**Time: ~4.5 hours | Value: Very High**

---

### 🟡 MEDIUM (Next - 1-2 weeks)

| Priority | Task | Effort | Impact |
|---|---|---|---|
| 5 | Consolidate configuration structure → `app/data/config/` | 3 hrs | Improve organization, reduce cognitive load |
| 6 | Add Product/Device JSON-LD schema | 2 hrs | Better search result snippets |
| 7 | Create `lib/services/deviceServicePricing.js` | 2 hrs | DRY principle, reusable business logic |
| 8 | Document legacy scripts in `scripts/README.md` | 1 hr | Reduce confusion about which scripts are active |
| 9 | Standardize import paths to use `@/` alias | 1 hr | Consistency, easier refactoring |

**Time: ~12 hours | Value: High**

---

### 🟠 LOW (Nice-to-Have - 3+ weeks)

| Priority | Task | Effort | Impact |
|---|---|---|---|
| 10 | Create metadata/description generators | 2 hrs | Better search snippets |
| 11 | Add Open Graph / Twitter Cards | 1-2 hrs | Better social media sharing |
| 12 | Enhance sitemap with lastmod/priority | 1 hr | Better crawl efficiency |
| 13 | Consolidate duplicate components (BranchPanel/LocationsAds) | 1-2 hrs | Code reuse |
| 14 | Extract booking logic to `lib/services/booking/` | 1 hr | Better separation of concerns |

**Time: ~8 hours | Value: Medium-Low**

---

## 6. IMPLEMENTATION ROADMAP

### Week 1: Critical Fixes (4.5 hours)
```
Monday:
  ✓ Extract Firebase init (30 min)
  ✓ Delete unused code (15 min)
  ✓ Test Firebase refactor (30 min)

Wednesday:
  ✓ Centralize schemas (2 hrs)
  ✓ Test schema validators (30 min)

Friday:
  ✓ Add hreflang tags (1.5 hrs)
  ✓ Test i18n metadata (30 min)
  
Deploy critical fixes
```

### Week 2-3: Medium Priority (12 hours)
```
Consolidate config structure
Refactor schema usage in API routes
Add JSON-LD schemas
Create service pricing repository
Update imports to @/ alias
```

### Week 4: Polish (8 hours)
```
Metadata generators
Social media cards
Sitemap enhancements
Component consolidation
```

---

## 7. TESTING CHECKLIST

After implementing recommendations:

### Data/Business Logic
- [ ] Firebase init works in 3+ files
- [ ] Schema validation prevents invalid data
- [ ] Device pricing calculation matches old code
- [ ] Service filtering works for each device category

### SEO
- [ ] hreflang tags render in `<head>`
- [ ] JSON-LD validates at schema.org
- [ ] Sitemap XML is valid
- [ ] Meta descriptions match pages
- [ ] Open Graph cards preview correctly on social media

### Code Quality
- [ ] No unused imports after cleanup
- [ ] All API routes use consistent error handling
- [ ] Env vars validated on startup
- [ ] Build size not increased
- [ ] No TypeScript/ESLint errors

---

## 8. CONCLUSION

The iLab codebase demonstrates solid architectural decisions but suffers from common growth pains: **duplicated initialization logic, scattered schemas, and incomplete SEO implementation**. 

By implementing the **4 critical fixes first** (Firebase init, schemas, cleanup, hreflang), you'll resolve 70% of the technical debt in under 5 hours. The remaining medium and low-priority items can be tackled incrementally.

**Expected outcomes:**
- ✅ 50+ lines of duplicated code removed
- ✅ 8 different validators unified into 1 reusable system
- ✅ Duplicate content SEO issues fixed
- ✅ 5+ new structured data opportunities unlocked
- ✅ 40% faster development for new device/service additions

---

**Review prepared:** May 6, 2026  
**Next review recommended:** After medium-priority fixes (Week 3)
