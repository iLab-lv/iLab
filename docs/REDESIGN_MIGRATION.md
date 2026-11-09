# Redesign migration

## R1 visual recovery gate — 2026-10-30

**All previous functional migration passes remain visually unaccepted.** “Complete”, “implemented”, and passing test/build statements below describe implementation or historical checks only; they do not establish approval against the final rendered redesign. This gate applies to Passes 1A/1A.2, 2, 3, 4, 5A, 5B, 6A and the existing uncommitted Pass 6B.

New migration work is paused pending visual recovery. R1 is an audit only; no application corrections are included. Preserve Pass 6B changes and its distinct pricing data paths. See [R1 visual discrepancy report](REDESIGN_VISUAL_AUDIT.md) for evidence, limitations, protected landing dependencies, priorities, and recommended R2 scope. Acceptance must follow matched browser comparisons with verified fonts and images, plus focused regression checks.

## Baseline and responsibility

- Repository: `iLab-lv/iLab` (repair-service production application).
- Baseline: `a3b0aef44c8bff915d1aea612ef712d8cca58cac` (`origin/main` on 2026-10-29).
- Remote backup: `backup/pre-redesign-2026-10-29` at the baseline commit.
- Working branch: `feature/redesign-integration`.
- Visual source of truth: `askoldas/iLabRedesign` at the approved revision inspected for each pass.
- This repository remains authoritative for routes, localized content, SEO, booking, contact data, Firebase integration, and service business logic.

Do not copy mock data or simulated behavior from the redesign. Preserve production URLs, metadata, structured data, locale behavior, forms, validation, and APIs.

## Phases and status

| Phase | Status |
| --- | --- |
| Repository baseline and architecture audit | Complete |
| 1A Service CTA Dock | Superseded by corrective Pass 1A.2 |
| 1A.2 Shared service UI correction | In review (2026-10-29) |
| Shop CTA Dock | Not started |
| Shared service layout and header | Pass 2 complete; in review (2026-10-29) |
| Navigation and footer | Pass 2 complete; in review (2026-10-29) |
| Service homepage | Pass 3 complete; in review (2026-10-29) |
| Service catalog hubs | Pass 4 complete; committed locally (`e17784b`) |
| Brand pages and model selection | Pass 5A complete; committed locally (`ada4385`) |
| Dynamic device model pages | Pass 5B complete; committed locally (`9bbf177`) |
| Dyson and photo/camera service families | Pass 6A complete; committed locally (`ea79068`) |
| Individual phone/iPhone repair-service pages | Pass 6B implemented; uncommitted review state (2026-10-30) |
| Shop catalog, product, cart, checkout surfaces | Not started |
| Responsive, accessibility, functional, SEO, and performance QA | Not started |

## Architecture decisions

- Adapt redesign presentation around `UiDialogsProvider`, `BookingForm`, `/api/booking`, and `getSiteSettings`; do not replace them.
- Keep the campaign-specific `app/landings` and `app/ads` CTA systems independent during Pass 1A unless verified reuse is behavior-preserving.
- Resolve contact and branch data through existing production settings/fallback ownership; do not add another data registry.
- Treat the redesign's static HTML, CSS, and JavaScript as a visual/interaction specification, not production application code.
- The service dock switches at 1024 px: Contact + Booking form the fixed two-cell mobile bar; Booking + Prices form the floating desktop dock. This follows the rendered redesign rather than its contradictory prose notes.
- `UiDialogsProvider` remains the interaction owner. `FullscreenPanel` owns the shared drawer shell and accessibility behavior; existing contact, location, price, and booking panes remain responsible for their production content and actions.
- Location panels receive `getSiteSettings` locations and pin positions through the provider. Do not reintroduce a parallel static location registry.
- Geologica is loaded through the same Google Fonts stylesheet used by the redesign and is applied to the migrated header, buttons, dock, and drawers. Unmigrated page typography remains unchanged.
- The shared service `Button` retains its existing component API but now owns the approved square, hairline primary/secondary/ghost presentation. The transitional `ctaChip` API remains only for unmigrated page content.
- `HeaderActions` owns the verified `/shop` switch, localized language switch, locator/contact actions, and mobile menu trigger. `/shop` is backed by the existing proxy in `next.config.mjs`.
- The fixed `Controls` cluster was removed from the normal service layout and dock; social links remain in legitimate footer/mobile-menu locations.
- The service shell owns redesign-scoped layout variables: a 1440 px maximum content measure, 20/40/96 px responsive margins, 24 px grid gutters, Geologica/IBM Plex Mono roles, and the approved dark surface hierarchy. These are scoped to `SiteLayout` so admin, ads, landings, and shop are not restyled.
- Desktop navigation switches at 1024 px and groups camera repair plus production information routes beneath the approved non-link “Vairāk/Ещё” trigger. Route configuration remains the URL authority.
- The shared service footer consumes `getSiteSettings` company/location data and the existing social registry. Its presentation follows the redesign counter surface and 12-column responsive composition; it does not copy reference contact data.
- The service homepage is a server-rendered presentation adapter over existing reviews, FAQ, process copy, settings, routes, and SEO wrappers. Its two small client islands reuse `UiDialogsProvider` for booking and own only branch-selection state.
- Homepage source mapping is `iLabRedesign/src/pages/index.html` and `src/pages/ru/index.html`, with `assets/css/awwwards-home.css`, `pages.css`, `components.css`, and the approved homepage image assets. Static template JavaScript and mock data are not production dependencies.
- Catalog hubs use the isolated `app/_components/sections/catalog-hub` presentation boundary. It owns the approved split category hero and page spacing without changing legacy globals or shared components consumed by advertising landings.

## Known risks

- Main-site, landing, ads, and LP shells have different CTA responsibilities.
- Locale resolution and location data currently have multiple consumers and some direct static imports.
- Overlay focus, scroll locking, focus return, responsive behavior, and booking success/error states must survive visual migration.
- Service and Shop are separate Next.js deployments sharing the public `ilab.lv` URL space.
- The Google Fonts presentation has a runtime network dependency; system sans-serif remains the fallback when it is unavailable.

## Pass 1A verification

- Rendered LV layouts compared with the approved redesign at 375, 768, 1024, 1280, and 1600 px.
- Verified the 1024 px dock/drawer breakpoint, full-screen mobile panel, 560 px desktop drawer, square controls, production contact/location content, and preserved booking API integration.
- `npm test`, `npm run lint`, and `npm run build` pass. Existing Sass legacy/deprecation notices remain outside this pass.
- RU uses the existing localized labels and production panel data; mobile action typography permits wrapping for longer translations.
- Existing page/header and cookie-banner differences are outside the CTA Dock scope and were not changed.

## Pass 1A.2 visual correction

- Audited the rendered redesign header, button variants, mobile menu, dock, and drawer shell against the production service shell.
- Replaced the legacy glossy fixed header and rounded glass button styling in the shared service interface with the redesign's 72 px dark header, square hairlines, Geologica typography, compact switch controls, and cyan action treatment.
- Added the production `/shop` mode switch and moved the existing LV/RU route switcher into the header.
- Removed the normal shell's bottom-left fixed language/social cluster. Footer and mobile-menu social links remain intentional.
- The redesign source and `DESIGN.md` conflict on the mobile dock: rendered `bottombar.html` has Contact + Booking while the prose specifies three cells. Production follows the rendered two-cell implementation.
- Drawer shell geometry, scan line, scrim, focus trap/return, Escape, scroll lock, 560 px desktop width, and full-screen mobile behavior are migrated. Contact, locator, booking, and mobile-menu internal content still require the dedicated Pass 1A.3 parity pass.
- Automated Computer Use could not connect to its native Windows pipe. Local headless Chromium/Edge captures were used at 375, 768, 1024, 1280, and 1600 px; this limitation prevents claiming complete interactive pixel parity.

## Pass 2 global layout integration

- Migrated the approved service-shell surface, typography, spacing variables, responsive content margins, sticky-header coordination, accessible skip link, navigation grouping, and footer composition without changing page-specific content or business logic.
- Preserved production LV/RU URLs, `getSiteSettings` company and location data, existing social URLs, dialog ownership, and the responsive CTA dock. Footer links now include all approved service and utility destinations, including camera repair, prices, and booking.
- Reference template routes and hard-coded footer contacts remain visual examples only. Production configuration is authoritative for live data and URLs.
- Page sections remain intentionally unmigrated. The new foundations expose target values but do not blanket-rewrite legacy page CSS modules; individual sections will adopt them during their dedicated passes.
- Automated tests, lint, production build, and local browser checks at 375, 768, 1024, 1280, and 1600 px are required before this pass leaves review. Native Computer Use remains unavailable if its Windows pipe cannot be opened.

## Pass 3 service homepage

- Migrated the hero, branch-status strip, Apple/Android/device services, diagnostic statement, repair process, Google reviews, benefits, branch map, FAQ, and closing CTA in the approved LV section order.
- Preserved production routes, LV/RU page wrappers and metadata, structured data, canonical handling, Firebase-backed settings, live/fallback reviews, FAQ data, branch contacts, booking drawer, and map destinations.
- The approved raster assets are served locally from `public/images/home`; production content and configuration replace template mock values.
- Review cards display up to four production-curated reviews per branch. If fewer are available, the layout intentionally renders the available verified content rather than inventing testimonials.
- The reference RU template places the diagnostic statement before services while LV places it after services. Production keeps a single component order matching the primary LV approved homepage; this localization contradiction remains recorded for design confirmation.
- Five-viewport full-page comparisons and interaction checks cover 375, 768, 1024, 1280, and 1600 px. All five render without horizontal overflow or broken images; branch selection, FAQ disclosure, booking open/Escape close, and focus return pass. Native Computer Use remains unavailable, so local Chromium CDP captures are the visual evidence for this pass.
- `npm test` (8 tests), `npm run lint`, and the production build (118 routes) pass. Existing Sass deprecation notices remain outside the homepage scope.

## Pass 4 service catalog hubs

- Migrated `/iphone-remonts`, `/telefonu-remonts`, `/plansetdatoru-remonts`, and `/datoru-remonts`, together with their existing RU counterparts, to the approved catalog-hub presentation.
- `iLabRedesign/src/pages/iphone-remonts.html` is the direct visual mapping. The redesign has no equivalent general phone, tablet, or computer hub templates; those routes are explicit adaptations of the same approved category system, not new designs.
- Preserved production category/device/brand sources, model links, services, prices, reviews, FAQ, metadata, canonicals, JSON-LD, breadcrumbs, LV/RU routing, booking integration, and section visibility flags.
- The protected Google Ads landing remains isolated. No files under `app/ads`, `app/(lp)`, or `app/landings` changed; `middleware.js` still rewrites `riga.ilab.lv` to `/ads`. Catalog styling does not modify `Button`, `GoogleReviewsBadge`, global CSS, advertising CTA providers, forms, analytics, or conversion behavior.
- Responsive browser checks cover 375, 768, 1024, 1280, and 1600 px. The long iPhone hub requires segmented capture because its full rendered height exceeds Chromium's reliable single-image limit.
- All eight LV/RU hub routes return 200 with their existing canonical and JSON-LD output. Browser checks found no broken images; booking open/Escape close/focus return and a production brand link passed. The Ads preview retains its `https://riga.ilab.lv/` canonical, responsive layout, forms, and advertising-specific CTA presentation.

## Pass 5A brand pages and model selection

- Migrated the dynamic LV/RU phone, tablet, and computer brand routes. The approved `src/pages/telefonu-remonts-samsung.html` is the direct phone mapping; tablet and computer routes adapt the same approved split hero and searchable series-list language because no dedicated reference templates exist.
- Reused `CatalogHero` and the existing production `DeviceSelector` data flow. Model lists still come from `getDevices`, `resolveBrandPage`, and category/brand/series metadata; public URLs, metadata, canonicals, JSON-LD, pricing relationships, and booking dialogs remain owned by their route modules.
- Restyled model selection as the approved compact finder/series list, including localized search, empty results, counts, progressive expansion, year filters, keyboard focus, and responsive columns. No redesign mock model data was imported.
- Validation: 12/12 automated tests, lint, and the network-enabled production build pass. Representative LV/RU phone, tablet, and computer routes return 200 with their expected canonicals, four JSON-LD blocks, and the model target. The `riga.ilab.lv` host rewrite returns 200 with its existing canonical, and protected files have no diff.
- Protected scope: `app/ads/**`, `middleware.js`, `app/(lp)/**`, and `app/landings/**` were not modified. Exact viewport screenshot QA remains pending because Windows Computer Use stopped when it could not establish the existing Chrome tab URL with sufficient confidence.

## Pass 5B dynamic device model pages

- Migrated the shared dynamic `[brand]/[device]` presentation for phone, tablet, and computer families in LV/RU. `iphone-remonts-iphone-12.html` is the direct phone reference; tablet and computer pages adapt the same approved editorial model-page system because dedicated templates are absent.
- Added one shared `DeviceDetailPage` presentation while retaining all six route adapters and their `getDeviceBySlug`, production price-list, FAQ, metadata, canonical, and JSON-LD logic. New devices inherit the presentation automatically.
- Production brand/category device data now feeds related-model navigation. Missing hero imagery renders a labelled approved-style placeholder; missing prices continue to use existing fallback behavior, and an empty price list is omitted.
- Model services use hairline editorial rows, pricing uses the approved responsive spec table, and related models use compact text links rather than legacy rounded/glowing cards.
- The audit found the Russian tablet model adapter incorrectly declared `locale = 'lv'`, causing an LV canonical and Latvian fallbacks on `/ru/remont-planshetov/...`; Pass 5B corrects the adapter to `ru` without changing route or schema behavior.
- Validation: 14/14 tests, lint, and the network-enabled production build pass. Representative Samsung phone, iPad, and MacBook models render in LV/RU with correct canonicals and JSON-LD; production pricing and related-model sections are present, an unknown device returns 404, and the protected Ads host retains its canonical. Exact five-width screenshot comparison remains pending because browser-based visual automation was unavailable after the Windows control safety stop recorded in Pass 5A.
- `npm test` (10 tests), `npm run lint`, and the production build (118 routes) pass. Existing Sass deprecation warnings remain in unrelated legacy, landing, admin, and device styles.

## Pass 6A remaining service families

- Migrated `/dyson-remonts`, `/ru/remont-dyson`, `/fotoaparatu-remonts`, and `/ru/remont-fotoapparatov`. All four are individual route adapters over two shared LV/RU presentations rather than dynamic model routes.
- Dyson maps directly to `iLabRedesign/src/pages/dyson-remonts.html` and now uses the approved split `CatalogHero` and editorial service rows while preserving production services, FAQ, reviews, guide, process, trust content, booking, metadata, canonical, and JSON-LD behavior.
- The redesign repository has no dedicated camera, lens, or photo-repair page. Those routes explicitly adapt the established approved editorial hero and square hairline treatment while retaining the production-only lens, Canon/Nikon/Sony, diagnostic, locations, review, FAQ, and repair-process sections.
- Camera content remains data-driven through `photoRepairContent.js`; both locale route adapters continue to own settings/reviews loading and SEO/structured-data composition. Dyson continues to resolve category content, production FAQs, and section visibility in its route adapters.
- Remaining legacy catalog work consists of the individual iPhone and general-phone service routes (screen, battery, charging, camera, audio, water damage, and iPhone-specific back-cover/board repair), with their RU counterparts.
- Protected scope remains unchanged: no files under `app/ads/**`, `app/(lp)/**`, `app/landings/**`, or `middleware.js` were modified. The existing photo page still consumes the established landing location/provider components; this dependency is documented architecture debt, not a change to advertising code.
- Validation: 16/16 automated tests, lint, and the production build (118 pages) pass. All four LV/RU routes return 200 with their expected canonical and four JSON-LD blocks; the protected `riga.ilab.lv` rewrite returns 200 with its existing canonical. Existing Sass deprecation notices remain in unrelated legacy/admin/landing styles.
- Exact full-page comparison at 375, 768, 1024, 1280, and 1600 px remains pending: the Windows browser-control host was unavailable during this pass. Automated checks therefore do not constitute final visual acceptance.

## Pass 6B repair-service detail pages

- Migrated 28 LV/RU routes through 14 existing presentation components: screen, battery, charging-port, camera, audio, and water-damage pages for iPhone and general phones, plus iPhone rear-cover and logic-board repair. Route modules remain the authority for metadata, canonicals, JSON-LD, FAQ resolution, Firestore content, devices, and prices.
- `iLabRedesign/src/pages/iphone-remonts-ekrana-maina.html` is the only direct repair-detail template. The other service families adapt its approved split hero, technical hierarchy, square hairline pricing browser, process/FAQ flow, related services, and closing CTA without replacing service-specific production copy.
- The iPhone screen route retains its specialized production sections for symptoms, damage interpretation, model pricing, post-repair checks, hydrogel protection, quality, reviews, locations, FAQ, and final CTA. Other families keep their existing distinct section compositions rather than being flattened into generic content.
- Two pricing architectures remain intentionally supported: server-fed `app/(site)/sections/service-pricelist` for newer iPhone pages and client Firestore-backed `app/(site)/components/service-pricelist` for general-phone pages. Their data ownership is unchanged; both now share the approved 4/8-column, square hairline presentation.
- Runtime verification exposed a Cyrillic `р` embedded in the static RU iPhone screen canonical (`zamena-ekрана`). The verified public route is ASCII `/ru/remont-iphone/zamena-ekrana`; the static SEO registry now matches that route.
- Protected advertising paths and middleware remain outside the pass. No files under `app/ads/**`, `app/(lp)/**`, `app/landings/**`, or `middleware.js` are modified.
- Validation: 19/19 automated tests, lint, and the network-enabled production build (118 pages) pass. All 28 migrated LV/RU routes return 200 with their expected canonical and four JSON-LD blocks; the protected `riga.ilab.lv` rewrite returns 200 with its existing canonical. Existing Sass deprecation warnings remain outside this pass.
- Exact full-page comparison at 375, 768, 1024, 1280, and 1600 px remains pending because Windows browser control is unavailable. Automated validation and route checks do not constitute final visual acceptance.

## Pass requirements

For every pass:

1. Compare the affected production implementation with the approved redesign.
2. Preserve production behavior, data ownership, SEO, localization, and URLs.
3. Test LV/RU where applicable; keyboard/focus/Escape; reduced motion; 375, 768, 1024, 1280, and 1600 px layouts; and relevant API-backed flows.
4. Run focused tests plus lint/build checks appropriate to the change.
5. Update affected architecture/developer documentation, record decisions here, and list unresolved documentation conflicts.

Do not delete historical documentation without approval or treat experimental code as finalized behavior.

## R2 recovery — shared foundations

R2 replaces inconsistent service typography/tokens and corrects shared buttons, header, footer, dock, consent styling, catalog hero roles and drawer shell geometry against the rendered approved reference. Fonts are self-hosted within the service scope. Shared consumers outside that scope retain their prior presentation. See [R2 evidence, exact change manifest and issue resolution register](audit-r2/INDEX.md), [Visual QA](audit-r2/VISUAL_QA.md), and [Functional QA](audit-r2/FUNCTIONAL_QA.md).

This gate does not accept previous page migrations as visually complete. R3 must correct page-family composition, imagery, rails, model lists, legacy section/card presentation and detailed drawer content. The historical Pass 6B browser-unavailable note above describes that earlier pass; R1 and R2 subsequently captured actual Chromium rendering. Original Pass 6B sources, price modules, SEO correction and R1 evidence are preserved. R2 remains uncommitted; no push, merge or deployment.

Validation: 19/19 regression tests, lint and the production build (118 pages) passed. Independent bounded visual checks cover all five widths. Final service-only drawer keyboard/focus retests passed 12 cycles; LV/RU switching was exercised without submitting a booking. Matched-data advertising folds are pixel-identical at all five widths. Protected localized landing padding and complete page dimensions match after correcting a generic Catalog section specificity conflict. Detailed evidence and limitations are linked above.

## R3A recovery — homepage family

The shared LV/RU homepage presentation now follows the final approved templates across all ten sections. The hero, locale-specific services, precision statement, review dossiers, benefits, locations, FAQ and closing CTA use the approved compositions and assets. RU places precision before services, superseding the earlier choice to force LV order on both locales. All production copy/data sources and existing section content remain; no standalone production-only or redesign-only section was identified.

Homepage-only client helpers own booking/contact adapters, real Riga-hours status, review expansion, branch selection and section/progress rails. Shared R2 components, route SEO adapters, APIs, pricing and protected landing files remain outside R3A. The undefined homepage `openBooking` call was corrected to the existing `openBook` provider API. Reference overlaps/overflow are corrected through bounded responsive layouts while retaining the approved hierarchy.

See [R3A inventory and evidence](audit-r3a/INDEX.md), [Visual QA](audit-r3a/VISUAL_QA.md), and [Functional QA](audit-r3a/FUNCTIONAL_QA.md). R3A is left uncommitted. The proposed isolated R2 checkpoint was rejected by automatic approval review; the original working state remains preserved. No push, merge or deployment.

Recommended R3B is catalog-hub recovery only: inner hero composition and image framing; model/series selectors; editorial service/pricing/review/FAQ sections; LV/RU content density and responsive layouts. Preserve dynamic identifiers, data relationships and both pricing implementations. Treat legacy iPhone model pages and detailed drawer contents as separately scoped follow-ups. Do not extend R3A into those families.

R3A validation completed 2026-10-31: independent visual/functional QA, 19/19 tests, lint, the 118-page production build and five production-output browser smoke cases passed. Protected advertising geometry/metadata matches R2 at all five widths; live review data changed between captures. Shared LP dimensions/padding and the real Riga-host rewrite remain correct. See [final validation](audit-r3a/VALIDATION.md). R3B has not begun.

## R3B recovery — catalog hub families

The four LV/RU catalog hub presentations now opt into the approved hero and scoped editorial system. iPhone is the direct reference; other families and Russian routes adapt those patterns while preserving their distinct copy and data. All existing sections remain, including iPhone quality/decision/guide content, dynamic brand previews and computer Apple/other-brand navigation. The iPhone finder uses complete dynamic series disclosures, search and year filters. Hub booking calls `openBook`; missing local Huawei imagery receives a neutral missing-image state without changing the device record.

Hero facts are embedded in the iPhone hero. Extra production hero copy follows the reference heading/lead/action core; no SEO copy was shortened. Other section order/gates remain authoritative. Shared brand/model selectors, protected ads/LP/middleware, APIs, route SEO adapters and pricing implementations are unchanged. See [R3B inventory and exact manifest](audit-r3b/INDEX.md), [Visual QA](audit-r3b/VISUAL_QA.md), [Functional QA](audit-r3b/FUNCTIONAL_QA.md) and [validation](audit-r3b/VALIDATION.md).

All R3B work remains uncommitted. No staging, checkpoints, branch switching, push, merge or deployment. Proposed R3C covers brand pages and model-detail recovery, including the pre-existing non-hub booking adapter contract; it has not begun.

R3B completed 2026-10-31: independent 40-state visual review, 64/64 final focused functional checks, 19/19 regression tests, lint, the 118-page production build and ten-route production smoke passed. The eight hub locale switches use full localized navigation to refresh document and shared-shell language. Protected advertising/LP dimensions and Riga host routing remain correct. Final location-link filters and both branch-hours disclosures were checked at375/1280. See [final validation](audit-r3b/VALIDATION.md) for evidence and capture limits.

## R3C recovery — brand pages and model selector

This pass covers the existing phone, tablet and computer brand presentations: 19 brands / 38 localized routes. It supersedes the broader proposed R3C scope above: dynamic model-detail recovery belongs to R3D and has not begun. The direct LV Samsung template supplies brand hero, editorial services, finder, FAQ and closing patterns. Other brands/locales adapt the same system while retaining production copy, gates, reviews, notes, process, benefits and honest no-model states. No standalone redesign-only section was added.

`BrandHero` opts into isolated `CatalogHero` geometry. `DeviceSelector` adapts authoritative production data into the existing R3B `HubDeviceGridClient`; extracted legacy grouping functions retain filtering/deduplication and metadata ownership. The brand variant preserves its localized search/year semantics and server-rendered model destinations, removes the four-model preview, and avoids repeating years already in model names. Empty inventories omit unusable finder controls while retaining their precise message. Tablet services move before the selector. Booking uses the existing `openBook` API; locale navigation refreshes documents only for actual brand consumers and the previously guarded hubs.

See [R3C exact routes, implementation and change manifest](audit-r3c/INDEX.md), [Visual QA](audit-r3c/VISUAL_QA.md), [Functional QA](audit-r3c/FUNCTIONAL_QA.md), and [validation](audit-r3c/VALIDATION.md). Protected advertising/LP/middleware, model-detail and repair-service source, pricing, route adapters and localization modules remain outside the changes. Prior R1–R3B evidence is preserved. All R3C changes remain uncommitted; no staging, push, merge or deployment.

### R3C follow-up — approved warranty wording

Business decision: the general repair warranty is **up to 1 year**, expressed as **Garantija līdz 1 gadam** / **Гарантия до 1 года**, with natural grammatical forms in sentences. This resolves the earlier open warranty-copy decision; historical R3C evidence describes the state reviewed at that time.

The follow-up audit reviewed service source, shared components, LV/RU localization, metadata/JSON-LD, seed content and read-only public CMS content. No nine-month claim remained in the current source/CMS snapshot. Existing qualified descriptions were already correct. The homepage's prominent `1 gads` / `1 год` facts were still unqualified; these now read `Līdz 1 gadam` / `До 1 года`. A first-fact-only font adjustment keeps the longer value within its existing column. Terms, receipt exceptions, moisture/impact exclusions, service-specific warranty-day defaults/overrides and product warranties are unchanged.

Protected advertising/landing source was inspected read-only: no conflicting warranty wording found. Neither Shop folder was inspected or modified. No Firebase content was changed. See [warranty audit and verification](warranty-correction/INDEX.md). All changes remain uncommitted; no staging, push, merge or deployment. R3D has not begun.

## R3D recovery — dynamic device-model pages (2026-11-01)

R3D now covers all four dynamic model families through their existing two compositions: dedicated iPhone and shared phone/tablet/computer. The runtime inventory contains 211 models / 422 LV/RU URLs. The approved iPhone 12 reference informs the hero, services, pricing, related models and complete downstream editorial sections; other families/locales adapt this system while retaining real content and gates. Generic trust/process sections were redesigned within that system. The real Riga branch map is integrated using existing assets/settings.

Model presentation variants preserve authoritative service relationships, price visibility/order/variants, zero and conditional prices, localized times, warranty conditions and route SEO. Booking actions reuse the existing dialog and form API with optional model/service context. The approved maximum warranty wording and earlier passes remain preserved.

Validation: 422/422 route responses, independent 63-state visual review, final representative browser and booking checks, 28/28 tests, lint and 118-page production build pass. Protected advertising matches the saved geometry at all five widths; LP and actual Riga-host rewrite checks pass. See [R3D completion and exact manifest](audit-r3d/INDEX.md) and [validation](audit-r3d/VALIDATION.md) for build provenance, sampling and inspector limitations.

Existing source discrepancies remain: Huawei P30 Pro's missing image and Galaxy S26 Ultra's inconsistent LV heading year. No Shop access, protected source edits, Firebase writes, submissions, staging, commits, push, merge or deployment. R4 has not begun; recommended scope is the service drawer contents and non-model booking-adapter contract, with keyboard/focus, locale, real data and protected-consumer regression coverage.

## R4 recovery — shared drawers and interactive controls (2026-11-01)

R4 completes the shared service contact, booking and locator panes, mobile navigation, desktop disclosures, locale controls and CTA Dock coordination. Direct states follow the final reference; real extra contact/direction actions, branch notices and booking validation/loading/error/success are retained in that system. The provider remains the single state owner. Service behavior is opt-in; protected consumers retain their legacy panel/form paths. Booking fields, backend endpoint, schema, real branch data and destinations are unchanged.

Final build `PMIqlu80FRJCOySs0Izv0` passes the independent34-state visual review and16 short-height states,32 tests, repository/explicit JSX lint and118-page production build. Functional coverage includes30 pane combinations plus selected states, four menus, four short-height openings, four keyboard dropdown cases, safely intercepted submission scenarios,16 page-family booking regressions and both locale→contact-copy sequences. Eight protected geometry comparisons and protected ad/LP drawer checks pass. See [R4 inventory and completion report](audit-r4/INDEX.md), [visual QA](audit-r4/VISUAL_QA.md), [functional QA](audit-r4/FUNCTIONAL_QA.md) and [validation](audit-r4/VALIDATION.md).

The approved maximum warranty claim and R3D's Huawei-image/Galaxy-heading issues remain preserved. Reference-only branch coordinates were not fabricated. Browser-back drawer history was not introduced. All work remains uncommitted; no staging, stash, reset, branch switch, push, merge or deployment. R5/R6 and adsV2 have not begun. Recommended R5 is repair-service detail-page recovery using the approved screen-repair template, preserving both pricing/data implementations and the completed R4 interactions.

## R5 recovery — remaining service pages (2026-11-01)

R5 completed and validated on 2026-11-01. R6 has not started. All changes remain uncommitted. The actual inventory covers 32 localized repair routes and 12 support/business routes. Individual iPhone/general-phone repairs, Dyson, camera/lens, pricing, FAQ, Contacts, booking, About and Terms now use scoped approved editorial compositions. Direct references are reproduced where present; camera/lens and additional production sections retain real content in the same design system.

Original pricing JavaScript, device/service relationships, data readers, route adapters, metadata and JSON-LD are preserved. Repair warranty wording remains qualified as up to one year, with original exceptions and service conditions. No Firestore write or real booking occurred.

Final build `2DoHBUojjJNjRRQQ-OQJ1`: independent 142-state visual acceptance; 44 route/content/SEO checks; eight pricing/keyboard cases; both booking locales with mocked success/validation; 16 earlier page states and six drawer checks; four support-control cases; 32 tests, repository/explicit JSX lint and 118-page production build pass. Protected advertising at all five widths, LP375/1280 and actual Riga-host1280 match preserved geometry, with documented live carousel offsets only.

See [R5 report and manifest](audit-r5/INDEX.md), [visual review](audit-r5/VISUAL_QA.md), [functional review](audit-r5/FUNCTIONAL_QA.md) and [validation](audit-r5/VALIDATION.md). Existing Huawei P30 Pro missing imagery and Galaxy S26 Ultra LV heading-year discrepancy remain open. Pre-existing Latvian fallback labels in the generic-phone RU picker are documented for separate localization review; no pricing logic was rewritten. Shop, protected sources and adsV2 are untouched; no staging, commit, branch switch, push, merge or deployment. Recommended R6 is comprehensive regression across accepted families, data/query edge cases, locale switching, keyboard/form flows and protected consumers; it has not begun.

## Template motion follow-up � 2026-11-02

Restored service-layout entrance/image reveals, homepage scroll zoom, per-branch review word focus, precision statement, rating counters and reversible FAQ motion after comparing the approved template. Normal/reduced-motion, navigation/back and progressive enhancement were verified in the browser; 32 tests, lint, isolated production build and eight protected comparisons pass. See [motion report](audit-r6-motion/INDEX.md) for timings, React/Next adaptations and evidence. Nine application paths changed; protected sources, shop, configuration and dependencies remain untouched. Everything remains uncommitted; no push, merge or deployment.

## Exit, drawer and hover follow-up — 2026-11-02

Completed the missing page-exit sweep, including language-switch navigation; corrected the drawer entry frame and scan lifecycle with a reverse close scan. Navigation hover has no text underline. Text booking actions retain a transparent background, and price CTA labels remain dark and readable on cyan hover. LV/RU mobile/desktop browser checks, 32 tests, lint, isolated production build and eight protected comparisons pass. See [follow-up evidence](audit-r6-motion-controls/INDEX.md). Thirteen application paths changed; protected route sources and shop remain untouched. All changes remain uncommitted; no push, merge or deployment.

## Shared homepage services — 2026-11-02

LV/RU now use one HomeServices component and stylesheet based on the Latvian layout. Per the user's clarification, Apple and phones/tablets remain side by side on desktop; only Dyson and fototehnika become stacked full-width rows. Apple and phones/tablets share larger numbered links with hover/focus motion and a reduced-motion fallback. Twelve responsive states, decoded-image visual checks, 32 tests, lint and the isolated production build pass. See [shared-services report](audit-r6-home-services/INDEX.md). Four application paths changed; protected sources and shop are untouched. Everything remains uncommitted; no push, merge or deployment.

## Service-row rhythm — 2026-11-02

Applied a focused design-taste review to the shared homepage services section: laptop image-left, Dyson image-right, fototehnika image-left on desktop. Mobile/tablet image-first stacking, row dimensions, links and the approved Apple/phones composition are preserved. Eight LV/RU before/after states and Sass/source checks pass. Only HomeServices.module.scss changed in the application. See [design critique and evidence](audit-r6-services-rhythm/INDEX.md). All work remains uncommitted; no push, merge or deployment.

## A1/A2 — Ads V2 preview — 2026-11-02

Dedicated advertising alternative developed under `app/adsV2/`, **not activated**. Existing `/ads`, protected LP/Landings and the `riga.ilab.lv` host rewrite remain unchanged. Shared additions are opt-in WhatsApp semantic tokens/Button variant; no site-wide contact-button replacement. Audit, preview URLs, responsive/functionality evidence and the future activation/rollback procedure are in [Ads V2](ads-v2/INDEX.md). Work remains uncommitted; this entry does not approve release, traffic switching, deployment or SEO audit work.

## A2 visual refinement — 2026-11-02

Ads V2 presentation was refined after user review: larger repair objects, a new hero and section composition, muted desktop WhatsApp states, and scoped motion with reduced-motion support. The development preview remains unactivated; protected Ads/routing and shared service components are unchanged. See [refinement and evidence](ads-v2-refinement/INDEX.md). All work remains uncommitted.
