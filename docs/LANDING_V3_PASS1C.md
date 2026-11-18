# Landing V3 — Pass 1C

Focused CTA/trust/mobile refinement on `feature/landing-v3`. Pass 1B's AdsV2 composition, headline, artwork, cyan lighting and compact reviews remain the design foundation.

## Behavior

- Mobile and desktop bottom docks contain exactly **Call + WhatsApp**. Desktop uses the existing service/AdsV2 bottom-right dock pattern; mobile uses the full-width safe-area surface. Docks hide while any V3 drawer is open and final page content has bottom clearance.
- Both actions reuse the existing V3 contact drawer, passing `call` or `whatsapp` as context. Both configured branches are always offered, including when an inquiry contains a location prefill. Each branch action uses the shared `locationLinks` helper; no phone numbers were copied into V3.
- Selecting a Call link follows that branch's `tel:` destination. WhatsApp follows its branch conversation in a new tab with `noopener noreferrer`. The selector itself never launches either destination automatically.
- Hero booking/contact buttons are hidden below 1024 px with their spacing removed. Desktop buttons and the existing booking query/form flow remain functional.
- Hero and header branch names are native `#locations` links, preserving locale/query parameters. They scroll to the accessible, offset Locations target without opening a drawer. `selectedLocationId` and `data-selected-branch` retain the clicked branch for future synchronized map/photo integration.
- The Locations target currently supplies configured addresses/contact/directions only; no map/photo system or full later-section implementation was added. Reviews still immediately follow the hero.

## Trust and mobile composition

Restored the original advertising hero's facts and order:

1. Garantija veiktajiem darbiem / Гарантия на выполненные работы.
2. Diagnostika bez maksas / Диагностика бесплатно.
3. Kvalitatīvas detaļas / Качественные детали.
4. Datu drošība / Безопасность данных.

The original hero source is Latvian; Russian wording faithfully translates those same claims. No figures or guarantee periods were added. The LV facts are checked against the original component by a regression test. No conflicting factual details were identified in these four hero claims.

Trust facts use a compact two-column treatment. Both branch links now precede the artwork on mobile, putting them within the initial 390 px viewport without shrinking the headline.

## Files

`app/adsV3/AdsV3.jsx`, `AdsV3.module.scss`, `adsV3.i18n.js`, `adsV3.model.js`; `tests/ads-v3.test.mjs`; `tests/browser/ads-v3.cjs`; this handoff.

## Verification

All 151 repository tests passed. Focused ESLint and the final production build (including lint/type validation) passed. Existing Sass/Autoprefixer warnings remain outside V3.

Production browser checks passed: 12 LV/RU viewports (320, 360, 390, 768, 1024, 1440 px), 27 flow checks, no page/hydration errors or horizontal overflow. Checks cover both contact destinations for both branches, query-prefill isolation, 320 px selector label wrapping, desktop booking/contact, mobile hidden hero actions, 390 px branch visibility above the dock, branch scrolling/preselection, keyboard focus/restore, enlarged text, review placement/pagination, and original/AdsV2 booking regression checks. Two booking requests were mocked; no real emails, calls or WhatsApp messages were sent.

Evidence is in ignored `tmp/ads-v3-pass1c/`: `results.json`, `tests.log`, `build.log`, LV/RU desktop/mobile hero and transition screenshots, plus `ru-contact-selector.png`.

No protected original/AdsV2/shared sources, business records, booking internals or dependencies were changed. No commit, push or deployment.
