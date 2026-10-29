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
| 1A Service CTA Dock | Complete (2026-10-29) |
| Shop CTA Dock | Not started |
| Shared service layout, header, navigation, footer | Not started |
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
- Geologica is loaded through the same Google Fonts stylesheet used by the redesign and is scoped to the dock/drawers; the application-wide Inter typography remains unchanged.

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

## Pass requirements

For every pass:

1. Compare the affected production implementation with the approved redesign.
2. Preserve production behavior, data ownership, SEO, localization, and URLs.
3. Test LV/RU where applicable; keyboard/focus/Escape; reduced motion; 375, 768, 1024, 1280, and 1600 px layouts; and relevant API-backed flows.
4. Run focused tests plus lint/build checks appropriate to the change.
5. Update affected architecture/developer documentation, record decisions here, and list unresolved documentation conflicts.

Do not delete historical documentation without approval or treat experimental code as finalized behavior.
