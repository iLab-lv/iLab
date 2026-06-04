# Mobile Performance Refactoring Plan

This plan focuses on reducing mobile JavaScript, improving first load speed, and making performance easier to measure on the iLab Next.js app.

## Current Observations

- Shared first-load JavaScript is about `100 kB`.
- Several iPhone service pages are around `117 kB First Load JS`.
- Generic phone service pages such as `/telefonu-remonts/ekrana-maina` are around `232 kB First Load JS`.
- The public site layout mounts several client systems on every page: navigation, bottom bar, dialog provider, cookie consent, analytics, and footer locale switching.
- Many image assets are much larger than mobile layouts need.
- The production build is noisy and currently blocked by unrelated issues, which makes performance verification harder.

## Priority 1: Reduce Always-Loaded Client JavaScript

### Target Files

- `app/(site)/layout.jsx`
- `app/(site)/ui/providers/UiDialogsProvider.jsx`
- `app/(site)/ui/navbar/NavBar.jsx`
- `app/(site)/ui/bottombar/BottomBar.jsx`
- `app/(site)/ui/footer/FooterClientWrapper.jsx`

### Plan

1. Split dialog panel content out of `UiDialogsProvider`.
2. Lazy-load `LocatorPanel`, `SazinatiesPanel`, and `PierakstiesPanel` only when a user opens a dialog.
3. Keep only minimal dialog state in the initial client bundle.
4. Consider rendering footer locale server-side instead of using `FooterClientWrapper` with `usePathname`.

### Expected Benefit

- Less JavaScript downloaded and hydrated on every mobile page.
- Faster Total Blocking Time and Interaction to Next Paint.

## Priority 2: Split Mobile and Desktop Navigation

### Target Files

- `app/(site)/ui/navbar/NavBar.jsx`
- `app/(site)/ui/navbar/DesktopNav.jsx`
- `app/(site)/ui/navbar/MobileNavDrawer.jsx`

### Plan

1. Make the header/logo shell mostly server-rendered.
2. Move desktop dropdown behavior into a desktop-only client island.
3. Dynamically load `MobileNavDrawer` after hamburger interaction.
4. Avoid shipping desktop menu state/effects to mobile users.

### Expected Benefit

- Smaller initial mobile bundle.
- Less hydration work above the fold.

## Priority 3: Reduce Heavy Service Page Bundles

### Target Files

- `app/(site)/components/service-pricelist/ServicePricelist.jsx`
- `app/(site)/components/service-pricelist/BrandPickerPricelist.jsx`
- Generic phone service pages under `app/(site)/(catalog)/telefonu-remonts/(services)`
- RU generic phone service pages under `app/(site)/ru/(catalog)/remont-telefonov/(services)`

### Plan

1. Compare why generic phone service pages are about `232 kB First Load JS`, while iPhone service pages are about `117 kB`.
2. Move pricing data preparation server-side wherever possible.
3. Keep the client component responsible only for user interactions such as selecting a model or opening an accordion.
4. Avoid importing Firebase client code into page-level bundles unless the page truly needs live client fetching.

### Expected Benefit

- Bring generic service pages closer to the iPhone service page bundle size.
- Improve mobile page transitions and hydration time.

## Priority 4: Optimize Images for Mobile

### Large Assets Found

- `public/images/home/iphone-badge.png` is about `1.9 MB`.
- `public/images/hands-closeup.png` is about `1.85 MB`.
- `public/images/home/android-badge.png` is about `1.83 MB`.
- Several device images are between about `0.9 MB` and `1.5 MB`.

### Plan

1. Generate smaller mobile variants for hero, badge, map, and device images.
2. Prefer AVIF/WebP variants at widths such as `320`, `480`, `768`, and `1024`.
3. Review `next/image` `sizes` values so mobile does not request desktop-sized images.
4. Remove `unoptimized` from local `next/image` usage where safe, especially in `ServicePricelist.jsx`.

### Expected Benefit

- Faster Largest Contentful Paint on mobile.
- Lower bandwidth usage for device grids and service pages.

## Priority 5: Cache Server Data

### Target Files

- `lib/siteSettings.js`
- `lib/googlePlaces.js`
- `lib/faq/getFaqGroups.js`
- `lib/content/categories.js`
- `lib/content/devices.js`
- `lib/content/catalogDevices.js`

### Plan

1. Replace `cache: 'no-store'` in Google Places/reviews flows with a reasonable revalidation window.
2. Use Next caching helpers for Firestore-backed content that does not change on every request.
3. Cache site settings, FAQ groups, device/category metadata, and review summaries.
4. Keep admin routes dynamic, but allow public catalog pages to reuse cached data.

### Expected Benefit

- Faster server response times.
- Less dependency on Firestore/Google latency for public mobile users.

## Priority 6: Clean Up Redirect Handling

### Target File

- `next.config.mjs`

### Observation

`next.config.mjs` contains more than `400` redirect rules.

### Plan

1. Move redirect data into a generated or structured data file.
2. Consider handling legacy redirects at Vercel or edge configuration if possible.
3. Keep only high-value application redirects in `next.config.mjs`.

### Expected Benefit

- Easier maintenance.
- Cleaner build config and routing logic.

## Priority 7: Fix Build and Measurement Blockers

### Known Issues

- `app/api/reviews/route.js` imports `PLACE_IDS`, but `lib/reviews/getReviewsSummary.js` does not export it.
- Build can fail when Firebase admin or Resend env vars are missing.
- Sass deprecation warnings are repeated across many modules.

### Plan

1. Fix or remove the invalid `PLACE_IDS` import.
2. Make API route initialization safe during build when secrets are absent.
3. Gradually migrate Sass `@import` and deprecated mixed declaration patterns.

### Expected Benefit

- Reliable production builds.
- Easier Lighthouse and bundle-size verification.

## Validation Plan

Run before and after measurements for:

- `/`
- `/iphone-remonts`
- `/iphone-remonts/ekrana-maina`
- `/telefonu-remonts/ekrana-maina`
- `/kontakti`

Track:

- Lighthouse mobile Performance score.
- Largest Contentful Paint.
- Interaction to Next Paint.
- Total Blocking Time.
- First Load JS from `next build`.
- Image transfer size in browser network panel.

## Suggested Implementation Order

1. Lazy-load dialog panels.
2. Split mobile and desktop navigation.
3. Optimize the biggest image assets and remove unnecessary `unoptimized`.
4. Reduce generic service page bundle size.
5. Cache public Firestore and Google data.
6. Clean up redirects.
7. Fix build blockers and Sass warnings.

