# Landing V3 — Pass 1B

Corrective refinement on `feature/landing-v3`; backup remains `backup/pre-landing-v3-2026-11-17`. No commit, push or deployment.

## Implemented direction

- Reuse AdsV2's actual hero grid, typography tokens, spacing, branch contact pattern and button family. The header is local to V3, without the main website navigation/header component.
- LV headline: **Telefonu remonts tajā pašā dienā Rīgā.** RU: **Ремонт телефонов в Риге в тот же день.** The same-day phrase receives the existing signature cyan glow; supporting copy qualifies common repairs by parts availability.
- Select the original `/images/categories/landing_hero.webp` after rendering both assets inside the corrected desktop/mobile composition. Its illuminated cracked screen communicates the repair need, brings stronger color and avoids the visible dark rectangle surrounding the AdsV2 open-phone asset. No imagery generated or edited.
- Add static petrol/cyan gradients, one radial artwork light, a restrained image shadow and primary button surface polish. No ambient animation.
- Desktop header exposes configured branches, phone numbers, call/WhatsApp controls and branch-specific contact drawers. Mobile retains the simpler contact/language controls and booking/contact dock.
- Replace the custom proof row with the existing `HeroReviewsBadge`. Place the existing `ReviewsCompact` immediately after the hero, including its branch strip. Reuse the same fetched review summary for both; keep shared pagination, disclosure and Google destinations.
- Keep booking/contact drawers, form internals, query prefills, consent-aware preview events, locale handling and route-level noindex protections. Later landing sections remain deferred.

## Files changed in this pass

- `app/adsV3/AdsV3.jsx`
- `app/adsV3/AdsV3.module.scss`
- `app/adsV3/adsV3.i18n.js`
- `app/adsV3/page.jsx`
- `tests/browser/ads-v3.cjs`
- This handoff document.

## Verification

- Focused ESLint: passed. All 149 repository tests: passed.
- Protected source trees match the backup: original ads, AdsV2, shared site components, booking API and `lib`.
- Production build, including lint/type validation: passed. Existing Sass/Autoprefixer warnings remain outside V3. Build reports 146 kB first-load JS for V3; no dependencies added.
- Production browser checks: 12 LV/RU viewports (320, 360, 390, 768, 1024 and 1440 px), 20 flow checks, no page/hydration errors or horizontal overflow. Includes header branch selection, compact review anchor/pagination, booking/contact/dock paths, focus containment/restoration, 200% text enlargement, query/locale preservation and original/AdsV2 regression checks.
- Two booking API requests were intercepted (failure then success); no real enquiries or emails were sent.
- Screenshots/results: `tmp/ads-v3-pass1b/` (ignored local artifacts). `lv-1440.png` / `ru-1440.png` are desktop heroes; `lv-390.png` / `ru-390.png` are mobile heroes; the matching `*-transition.png` files include the hero-to-reviews transition. `results.json` contains browser results and `build.log` the final build output.

Preview: `/adsV3` and `/adsV3?lang=ru`.
