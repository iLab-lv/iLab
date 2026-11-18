# Landing V3 — full-page assembly

Work remains on `feature/landing-v3`; `backup/pre-landing-v3-2026-11-17` is preserved. No commit, push or deployment.

## Implementation

Updated `app/adsV3/AdsV3.jsx`, `page.jsx`, `adsV3.i18n.js` and `adsV3.model.js`. Added `AdsV3Sections.jsx` and `AdsV3Sections.module.scss`; extended `tests/ads-v3.test.mjs` and `tests/browser/ads-v3.cjs`.

The approved hero, header, artwork, trust facts, compact review badge/reviews, drawer and responsive Dock are retained. Original landing, AdsV2, global styles, shared components, booking API, Firebase schemas, pricing data and dependencies are unchanged. `/adsV3` retains noindex/nofollow.

### Reuse and section order

1. Existing V3 hero.
2. Existing compact Google reviews, sharing the live server-loaded summary with the hero badge.
3. Speed/diagnostics/convenience: original LV/RU copy from AdsV2's existing `getSpeedContent` snapshot; dark scoped surface.
4. Common repairs: original six-service content from `getServicesContent`; AdsV2 detail/selector/image layouts. Selection opens the unchanged LeadForm with the service title in `fault`; price links use the existing localized price route.
5. Brands: AdsV2 logos, layout and device-inquiry qualification. The approved LV/RU heading and description are exact; removed wording is absent.
6. Locations: existing `HomeLocations` map, pins, branch controls, hours and contact/directions links, combined with the existing `getLocationPhoto` assets. One controlled branch ID drives map selection, photograph, caption, address, hours and actions. Hero/topbar links select and scroll here.
7. Process: original four steps and their original LV/RU text/order from `getProcessContent`, rendered in AdsV2's four-column process layout.
8. Parcel delivery: original text, three instructions and four partner assets, using AdsV2's delivery layout and the unchanged delivery LeadForm.
9. FAQ: the original `LandingFaq` component itself, including sanitization, six localized questions/answers, native keyboard-accessible details/summary behavior and initially open first item. The original component has no FAQ JSON-LD to preserve; none was invented.
10. Final CTA: original closing content and price/call/WhatsApp actions; V3 scoped cyan accent and gradient. Footer uses authoritative company/location settings and the original localized copyright/disclaimer copy.

The V3-specific section adapters stay in one module and one scoped stylesheet. They do not create another booking controller, service registry or contact-data source. Existing consent-gated anonymous preview CTA tracking now recognizes the new section placements and delivery intent; no conversion event or personal data is added.

### Approved brand copy

LV: **Profesionāls remonts populārāko zīmolu ierīcēm**

Remontējam Apple, Samsung, Xiaomi, Huawei un citu populāru zīmolu telefonus, planšetdatorus un datorus.

RU: **Профессиональный ремонт устройств популярных брендов**

Ремонтируем телефоны, планшеты и компьютеры Apple, Samsung, Xiaomi, Huawei и других популярных брендов.

The existing qualification asks for the model and problem so availability can be confirmed; no universal catalog coverage is claimed.

### Locations and CTA contract

Photos: `/images/locations/ilab-spice-home-remonta-serviss-riga.webp` and `/images/locations/ilab-domina-shopping-remonta-serviss-riga.webp`, with their existing 640px variants, localized alt text and lazy loading. No new image or map library. Spice's crop is adapted to show the reception counter in the shorter V3 frame.

Original desktop Dock (>768px): fixed bottom-right, booking first (`Pieteikt remontu`), price link second (`Uzzināt cenu` → `https://ilab.lv/cenas`, same tab). Booking selects the branch inside the form. V3 preserves this behavior with AdsV2 styling and RU labels/routes (`Записаться`, `Узнать цену`, `/ru/ceny`).

Original mobile Dock (≤768px): WhatsApp first, Call second, each opening a two-branch selector. V3 preserves the shared authoritative contact destinations and close-on-selection behavior. Mobile hero buttons remain hidden. Docks remain fixed during scrolling, hide while a drawer is open, and page-bottom spacing keeps the footer reachable.

## Verification

- Scoped ESLint: passed.
- Repository tests: 154 passed, including exact visible-copy comparisons against original section factories in both languages (icons/artwork excluded), approved brand text, consent gating, existing booking/drawer/review checks.
- Production build: passed; existing Sass/autoprefixer/cache warnings remain in protected legacy files.
- Browser checks: 14 locale/viewport combinations from 320px to 1440px, 31 flow checks; full-assembly checks at 1440px/390px in both languages; original landing and AdsV2 booking regressions and direct original Dock comparison. Zero unexpected runtime/console errors. The deliberately mocked booking 503 is recorded separately, and failure/retry/success behavior passes. Two booking requests were intercepted; no real enquiries were sent. No broken loaded images or horizontal page overflow at tested widths; text enlargement, touch, focus containment/return and footer clearance passed.
- Captures and machine-readable results: ignored `tmp/ads-v3-assembly/`; full-page files `lv-1440-full.png`, `lv-390-full.png`, `ru-1440-full.png`, `ru-390-full.png`.

## Preserved discrepancies for later review

- Original RU final CTA starts with Latvian `Radusies problēma?`. Preserved verbatim under this pass's copy instruction.
- Original screen timing differs: LV `1-3 h`, RU `20–60 мин`; back-glass timing differs: LV `20-60 min`, RU `1–3 ч`. Preserved, not reconciled or independently verified.
- Original service prices are existing static campaign examples, not live catalog quotations. Existing delivery-cost and warranty claims are preserved original text, not newly verified promises.
- Configured location labels/copy say Spice Life; existing photo names/alt text say Spice Home. Branch identity, address, contacts and hours remain authoritative settings; no global rename.
- V3 reads legal/registration fields from settings and displays registration data only when configured, rather than copying the original footer's hardcoded fallback number.

This is the complete assembly pass. Section-by-section polishing and content reconciliation are deferred for review.
