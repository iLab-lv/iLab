# Redesign migration

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
| Service catalog hubs | Pass 4 complete; in review (2026-10-29) |
| Existing and missing service page templates | Not started |
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
- `npm test` (10 tests), `npm run lint`, and the production build (118 routes) pass. Existing Sass deprecation warnings remain in unrelated legacy, landing, admin, and device styles.

## Pass requirements

For every pass:

1. Compare the affected production implementation with the approved redesign.
2. Preserve production behavior, data ownership, SEO, localization, and URLs.
3. Test LV/RU where applicable; keyboard/focus/Escape; reduced motion; 375, 768, 1024, 1280, and 1600 px layouts; and relevant API-backed flows.
4. Run focused tests plus lint/build checks appropriate to the change.
5. Update affected architecture/developer documentation, record decisions here, and list unresolved documentation conflicts.

Do not delete historical documentation without approval or treat experimental code as finalized behavior.
