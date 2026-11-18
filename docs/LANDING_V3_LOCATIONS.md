# Landing V3 — Locations polish pass

Only the V3 Locations section changed. Work remains on `feature/landing-v3`; the existing backup branch is preserved. No staging, commit, push or deployment.

## Files

- Updated `app/adsV3/AdsV3Sections.jsx` to render the dedicated location presentation, and removed only the old location composition rules from `AdsV3Sections.module.scss`.
- Added `AdsV3Locations.jsx`, `AdsV3Locations.module.scss` and `adsV3Locations.model.js` in that directory.
- Added `tests/ads-v3-locations.test.mjs` and `tests/browser/ads-v3-locations.cjs`; updated the existing full-page browser test's marker selector for the new markup.
- Hero/topbar source, every other section, booking/controller/Dock, original advertising landing, AdsV2, shared components, business settings and dependencies are unchanged.

## Layout and reuse

Desktop uses a full-container 16:8 map followed by a unified dark surface: branch selector, then photograph and branch information side by side. Mobile uses a 260px map, branch selector, 280px photo frame and contact information in that order. The photograph occupies half the desktop panel; the former tall empty information column is removed.

Reused the existing map image `/images/home/map-riga-branches.png`, authoritative `pinPositions`, `getLocationPhoto`, `getAvailability`, `useLocationClock`, `locationLinks`, `ContactActions`, `ContactDirections` and localized location strings. The existing implementation has no map library, live tiles, panning or zooming to import. V3 therefore adds bounded pointer panning, zoom/reset buttons, Ctrl/Command-wheel zoom and keyboard arrows/+/-/Home around the same image, without dependencies. Normal wheel scrolling remains page scrolling. Touch users can scroll vertically over the map at its default zoom and drag the map after zooming.

The square image and markers share one transformed image plane. Percentage positions are never applied to the cropped viewport or adjusted by arbitrary offsets. Marker hit targets remain 44px when zooming. Branch selection smoothly adjusts focus while keeping both configured branches visible; reduced motion disables the movement.

## Selection, photos and contacts

`AdsV3.jsx` remains the sole owner of selected branch identity. Map markers and selector buttons call its existing setter. Incoming hero/topbar links retain native section navigation and branch selection; the map also refocuses when the visitor selects the already-active branch. No main-site drawer opens. Section scroll margin preserves the heading below the sticky header.

Selected branch identity controls the marker, photo, name, address, live availability, weekly hours, telephone, WhatsApp and directions. Contacts and hours come from settings and shared helpers, with no copied branch registry. Weekly hours remain a native accessible disclosure; branch controls expose names and pressed state.

Existing optimized assets:

- Domina: `/images/locations/ilab-domina-shopping-remonta-serviss-riga.webp` and its `-640.webp` version.
- Spice: `/images/locations/ilab-spice-home-remonta-serviss-riga.webp` and its `-640.webp` version.

Both responsive image layers remain mounted in a fixed frame. Their opacity crossfades over 220ms; `prefers-reduced-motion` removes the transition. Domina uses the existing crop positioning; Spice is contained to preserve the full portrait, reception and recognizable signage. No image filter, generated asset or replacement photograph is applied.

## Verification

- Scoped ESLint, explicitly including JSX: passed.
- 17 focused model, V3 copy/CTA and shared location tests: passed.
- Production build: passed; existing legacy Sass/autoprefixer warnings remain.
- Focused browser checks: LV and RU at 360, 390, 768, 1024 and 1440px. Marker/image alignment is checked against actual transformed image bounds, including after zoom and drag. Selection, photo/contact/hour synchronization, directions destinations, keyboard controls, incoming navigation, responsive composition, overflow and reduced motion pass. Photo-frame stability and desktop panel stability pass during the crossfade.
- Existing full-page browser suite: 14 locale/viewport combinations, 31 flow checks, original advertising landing and AdsV2 booking regressions, original desktop/mobile Dock comparison, text enlargement, touch, drawer focus and mocked booking recovery: passed. Zero unexpected runtime/console errors; intentional mocked booking 503 is recorded separately. No real enquiries were submitted.
- Eight section captures in ignored `tmp/ads-v3-locations/`: `{lv,ru}-{390,1440}-{domina,spice}.png`. Fixed header/Dock/skip-link chrome is hidden only during isolated section captures; behavior checks use the normal page.

## Remaining limitations

The map uses the existing project bitmap, not live map tiles. Google Maps/Waze links provide external navigation. Configured branch labels remain Spice Life while the established photo filenames/alt text say Spice Home; this pre-existing naming discrepancy is preserved. No other polishing pass was started.
