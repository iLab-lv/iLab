# Component architecture

This document defines the target structure for components in `app/_components`.

`app/(site)/components` is legacy-only. Do not add new components there. When a legacy component is redesigned, move it into the matching target folder, update its imports, and remove the legacy version only after nothing uses it.

## Service CTA shell

The main service-site CTA shell is an intentionally retained legacy integration boundary during redesign migration:

- `app/(site)/ui/bottombar/BottomBar.jsx` renders the responsive dock only.
- `app/(site)/ui/providers/UiDialogsProvider.jsx` owns open/close state and supplies locale plus `getSiteSettings` location data.
- `app/(site)/ui/panels/FullscreenPanel.jsx` owns the shared accessible drawer, focus containment/return, Escape handling, and scroll lock.
- The existing contact, locator, pricing, and booking panes own their real actions and data. `BookingForm` continues to submit to `/api/booking`; its `drawer` presentation is styling-only.

At widths below 1024 px the dock is Contact + Booking and panels fill the viewport. From 1024 px the dock is Booking + Prices and panels use a right-side 560 px drawer. Campaign-specific `app/landings`, `app/ads`, and LP CTA systems are separate and must not import this shell without a later architecture decision.

## Shared service chrome

- `NavBar` owns the 72 px redesign header, production logo/home route, desktop navigation, and responsive composition.
- `HeaderActions` owns the verified `/shop` mode switch, `LanguageSwitcher`, service-centre/contact dialog triggers, and mobile-menu trigger.
- `Button` remains the shared semantic link/button adapter. Its primary, secondary, ghost, compact, disabled, and focus states use the redesign's square Geologica system. The `ctaChip` variant is transitional for page content scheduled for later migration.
- `UiDialogsProvider` remains the sole owner of drawer state and production settings. `FullscreenPanel` owns the drawer shell and accessibility mechanics; panels own their real content.
- `Controls` is no longer rendered as a fixed normal-shell control cluster. It remains available to the mobile menu until that content is finalized in Pass 1A.3.
- `SiteLayout` scopes the approved service design foundations through `Layout.module.scss`; do not move these rules into global `body` styles because admin, ads, landing, and shop shells have independent presentation contracts.
- `navigation.config.js` is the single source for localized service navigation destinations. `menuOnly` supports the approved desktop “Vairāk/Ещё” disclosure without inventing a destination route.
- `Footer` is a server-rendered presentation adapter over `getSiteSettings`, `footer.i18n.js`, and the existing social registry. Do not duplicate location/contact values in footer markup.

## Target file tree

```text
app/
  _components/
    ui/                         # Small, generic UI building blocks
      button/
      icons/
      scroll-cta/

    features/                   # Reusable domain functionality and data UI
      booking/
      devices/
        device-grid/
        model-grid/
      locations/
        locations-map/
      reviews/
      services/
        service-pricelist/
      seo/

    sections/                   # Full-width reusable page sections
      device-hero/
      faq/
      final-cta/
      guide/
      popular-services/
      quick-facts/
      repair-process/
      reviews/
      why-us/

    page-sections/              # Sections intentionally limited to one page or route
      iphone-remonts/
        expert-notes/
        locations/
        problem-answers/
        quality/
        repair-decision/
```

## Placement rules

- `ui/` contains small presentational elements. It must not contain page layout or Firebase data fetching.
- `features/` contains reusable business or data-driven functionality. A feature may include server components, client islands, helpers, and data normalization.
- `sections/` contains self-contained page blocks with their own layout, heading, and spacing. They can be reused by more than one route through props such as `locale` and `variant`.
- `page-sections/` contains blocks that are deliberately page-specific. Do not put them in `sections/` until there is a real reuse case.
- Keep client-only children beside their server parent. For example, `FinalCtaActions.jsx` belongs inside `sections/final-cta/`.

## Component folder convention

Use lowercase kebab-case folder names. Component filenames stay PascalCase.

```text
sections/final-cta/
  FinalCta.jsx
  FinalCtaActions.jsx           # Only when a small client component is necessary
  FinalCta.module.scss
  finalCta.i18n.js
  finalCta.helpers.js           # Only when used solely by this component
```

Use colocated static copy in `*.i18n.js`. Keep dynamic content in its real source, such as Firebase. Do not create local data files that duplicate Firebase records.

## Naming and import rules

- Folder names: lowercase kebab-case, for example `quick-facts` and `service-pricelist`.
- React components: PascalCase, for example `QuickFacts.jsx`.
- Styles: `ComponentName.module.scss`.
- Static copy: `componentName.i18n.js`.
- Helpers used by one component: `componentName.helpers.js` in the same folder.
- Shared helpers used by one feature: place them at that feature root, for example `features/reviews/reviews.helpers.js`.
- Import new components through `@/_components/...`.

## Legacy migration map

| Legacy location | Target location |
| --- | --- |
| `app/(site)/components/button` | `app/_components/ui/button` |
| `app/(site)/components/icons` | `app/_components/ui/icons` |
| `app/(site)/components/booking` | `app/_components/features/booking` |
| `app/(site)/components/device-grid` | `app/_components/features/devices/device-grid` |
| `app/(site)/components/model-grid` | `app/_components/features/devices/model-grid` |
| `app/(site)/components/locations-map` | `app/_components/features/locations/locations-map` |
| `app/(site)/components/service-pricelist` | `app/_components/features/services/service-pricelist` |
| `app/(site)/components/seo` | `app/_components/features/seo` |

## Migration checklist

1. Create the redesigned component in its target folder.
2. Keep its copy, styles, client children, and local helpers colocated.
3. Update every importing route or component.
4. Verify both locales where relevant.
5. Run lint and a build check.
6. Remove the legacy component only after repository-wide search confirms it has no imports.
