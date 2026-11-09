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

## Service homepage

- `HomePage.jsx` owns the approved homepage section composition while remaining server rendered. The LV/RU route files continue to own metadata, structured data, FAQ loading, reviews loading, and settings loading.
- `HomeInteractions.jsx` is the only homepage client boundary. `HomeBookingButton` delegates to `UiDialogsProvider`; `HomeLocations` owns ephemeral selected-branch state and consumes locations plus pin positions supplied by the server component.
- `HomePage.module.scss` is the page-scoped presentation layer over the shared service tokens. It must not create alternate header, footer, dock, button, or drawer systems.
- Homepage imagery lives in `public/images/home`. Production routes, reviews, settings, branch data, booking behavior, and SEO wrappers remain authoritative; redesign mock content and JavaScript are reference-only.

## Service catalog hubs

- `app/_components/sections/catalog-hub/CatalogHero.jsx` is the shared category-hub hero for iPhone, phone, tablet, and computer routes. It receives production title, lead, breadcrumbs, imagery, and model/brand target data from each route adapter.

## Brand pages and model selection

- Phone, tablet, and computer `[brand]` route modules remain responsible for production data, localized content, SEO, structured data, and route validation. `catalog-brand/BrandHero` opts into `CatalogHero`'s isolated brand geometry and checks local hero assets. Its exact tablet filename fallback uses the existing tablet photograph; unknown missing assets receive a localized unavailable state.
- `app/(site)/sections/device-selector/DeviceSelector.jsx` remains the server-facing boundary. Its explicit `variant="brand"` reuses R3B's `HubDeviceGridClient` for search, year controls, native series disclosures and complete server-rendered model links. The default path retains the legacy progressive island/static preview for other consumers.
- `deviceGrid.groups.js` extracts the existing brand/category filtering, first-slug deduplication and metadata grouping without changing them. Brand devices retain the existing year/name display sort and search fields. The shared client receives localized copy and a brand variant; its iPhone-hub defaults remain unchanged. No UI component owns inventories, pricing or route rules.
- `catalog-brand/BrandServices` adapts existing production service content and destinations into editorial rows without inventing prices. Brand-only wrappers reuse the recovered section skin for process, trust, FAQ and closing content; review data selection and text toggles remain in the original Reviews component. A `data-catalog-brand` presentation marker scopes full locale navigation to real brand pages; the existing exact hub-path behavior remains.
- The LV Samsung template directly covers its matching sections. Other phone brands, RU, tablets and computers adapt approved patterns because dedicated templates are absent. Production-only sections, empty inventories and section gates remain; tablet services precede its finder to follow the brand hierarchy.

## Dynamic device pages

- Six LV/RU `[brand]/[device]` route adapters remain the source of device resolution, localized copy, prices, FAQ, metadata, canonicals, and JSON-LD. They load related devices by category and brand without moving data ownership into UI components.
- `app/_components/sections/device-detail/DeviceDetailPage.jsx` is the single presentation shared by phone, tablet, and computer wrappers. It composes the approved hero, editorial service rows, production pricing, related models, trust/process, FAQ, and closing CTA.
- The iPhone 12 redesign template is the direct phone mapping. Tablet and computer families adapt it; no per-model files or mock models/prices are introduced.
- `CatalogBookingButton.jsx` is the only new client boundary and delegates to `UiDialogsProvider`; it does not own another booking state or submission path.
- `CatalogHero.module.scss` and `CatalogHub.module.scss` are scoped to migrated hubs. Do not move these rules into global CSS or retrofit the protected advertising landing with them.
- iPhone maps directly to the approved redesign template. General phone, tablet, and computer hubs adapt the same pattern because the reference repository does not contain dedicated hub templates for those routes.

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

## Remaining-family presentation adapters

- `app/(site)/(catalog)/dyson-remonts/DysonRepairPage.jsx` is the shared LV/RU Dyson presentation. Locale route adapters retain category resolution, FAQ selection, metadata, canonicals, and JSON-LD; the presentation reuses `CatalogHero`, editorial `Services`, and existing production sections.
- `app/_components/page-sections/photo-repair/PhotoRepairPage.jsx` is the shared LV/RU camera/lens presentation. `photoRepairContent.js` owns localized production copy, while route adapters own settings, reviews, metadata, canonicals, and JSON-LD.
- `LensRepairSection` and `CameraBrandRepairSection` remain page-specific because no other production family shares their content model. They follow the approved square hairline editorial system without creating a competing global component set.
- The camera page currently consumes `LandingLocations` and `LandingCtaProvider` for its existing settings-backed location presentation. Do not edit or generalize the protected landing implementation during service-page passes; replace this dependency only in a separately scoped architecture pass with regression coverage.

## Repair-service detail pages

- Twenty-eight LV/RU repair-detail URLs resolve through fourteen shared family presentations under the iPhone and general-phone `(services)` route groups. Locale route modules own data and SEO; presentation components own section composition only.
- All repair-detail presentations reuse `CatalogHero`. Do not restore the former `PageHeader` + `DeviceHero` pairing or duplicate the booking state from `UiDialogsProvider`.
- The direct visual source is `iLabRedesign/src/pages/iphone-remonts-ekrana-maina.html`. Battery, charging, camera, audio, water, rear-cover, and board pages adapt that approved pattern while retaining their family-specific production sections.
- Keep both service-pricelist implementations until the client-Firestore general-phone routes are deliberately moved to server-fed pricing. They share visual rules but have different data-loading responsibilities; merging them during a styling pass would risk pricing behavior.

## R2 service presentation boundary

- `(site)/serviceFoundation.module.scss` owns approved service CSS variables, typography roles and responsive geometry. `serviceFonts.js` owns local licensed Geologica (variable weights/axes) and IBM Plex Mono (400/500); generated font families prevent legacy Google-font consumers from inheriting a replacement family.
- `(site)/layout.jsx` applies the foundation/font classes and `data-service-redesign`. `UiDialogsProvider` explicitly opts this service tree into the same classes on portal content; its default remains false for advertising/localized landings. `FullscreenPanel` accepts the service flag for pane-specific width selection without changing focus/close behavior.
- Shared navbar/footer/dock/button/consent and drawer modules scope new rules beneath the service marker. Preserve unscoped defaults: protected advertising pages import these same modules. Do not replace global Sass tokens as a shortcut.
- `CatalogHero` owns common breadcrumb, split-hero and typography geometry. Its booking action and homepage booking action reuse `Button` while existing provider event handlers retain booking ownership. Explicit paragraph typography prevents legacy global `p` declarations from overriding action/body roles.
- Drawer shell sizing/insets belong to `FullscreenPanel`; contact/booking/locator content and business integrations remain separate pane responsibilities. R2 does not replace their data or behavior with reference mockups.
- The service opt-in also stops the existing opening effect from restarting a settled open drawer on every phase change. Keep this guard scoped: protected consumers retain their original state behavior. Keyboard/focus checks are recorded with the R2 interaction evidence.

See [R2 evidence and remaining R3 scope](audit-r2/INDEX.md) before extending these foundations. Actual final reference CSS wins conflicting DESIGN.md prose: container 1440 px, margins 20/40/96 px, header 72 px, mobile dock 60 px.

## R3B catalog hub presentation boundary

- The four shared LV/RU hub presentations explicitly opt into `CatalogHero` with `variant="hub"`. Hub facts and the supplementary production paragraph sit outside the centered heading/lead/action core; other consumers retain the existing hero path. Hub booking uses the provider's `openBook` contract.
- LanguageSwitcher uses full localized navigation only on the eight exact hub paths, refreshing the server-owned HTML language and localized shared shell. Other paths retain their previous router navigation behavior.
- `CatalogHubSkin.module.scss` and explicit section wrappers scope approved editorial patterns to these hub pages. Existing copy components and `page.sections` gates remain in place; shared brand/model selectors and protected landing implementations are unchanged.
- `HubPopularServices` reads the existing iPhone service definitions; `HubReviews` uses the real review summary; `HubLocations` scopes the existing settings-backed branch dossiers without editing the protected implementation. `HubRepairProcess` and `HubFinalCta` read existing production content definitions while reproducing the approved process rail and closing composition. These are hub presentation adapters, not replacement data stores or APIs.
- The iPhone-only `DeviceGrid` delegates presentation to `HubDeviceGridClient`: native series disclosures, dynamic model links/counts, search and year filters. Inventory grouping and ordering remain server-owned. The separate `(site)/sections/device-selector` used by brand pages is outside R3B.
- `HubBrandPreview` retains production brand/device inputs and the existing ModelCard for valid images. It checks unavailable local image paths before rendering a neutral missing-image state with the same device name and destination; it does not substitute a different device model or alter Firestore records.

See [R3B inventory and validation](audit-r3b/INDEX.md) for route ownership, reference limitations and acceptance status.

## R3D dynamic model presentation boundary

- Four localized route families use two compositions: `IphoneDevicePage` and shared `DeviceDetailPage`. Phone, tablet and computer wrappers all delegate to the latter. Route adapters continue owning data, metadata, canonicals, alternates and structured data.
- `ModelHero` resolves actual local image dimensions and missing assets, then opts into `CatalogHero variant="model"`. `ModelServices` presents existing editorial summaries. `ModelDetailSkin` scopes downstream sections and legacy layout resets to model consumers. Authentic copy and section gates remain server-owned.
- `ModelPriceList` and `RelatedModels` accept an optional model presentation variant; their original visibility, formatting, ordering and relationship helpers remain unchanged. Desktop price rows and mobile articles supply the same model/service booking context.
- `openBook(openerEl, initialValues?)` passes optional context through `PierakstiesPanel` into the existing BookingForm API. Explicit context changes remount that form; ordinary callers retain their prior behavior. No second dialog provider is introduced. LanguageSwitcher adds full-document locale navigation only for actual `data-catalog-model` consumers, alongside previous hub/brand guards.
- Model reviews retain real selection, quotations, branch aggregates and carousel controls. `ModelLocations` adds the real Riga map with settings-backed pins, delegates contact opening to the existing provider and retains the existing location dossier. Its outer wrapper owns the real `iphone-locations` scroll target. `IphoneLocationsSection` accepts an optional id; its default stays unchanged for other consumers. Protected landing source is unchanged.

See [R3D inventory, evidence and exact manifest](audit-r3d/INDEX.md).

## R4 shared service interaction boundary

- `UiDialogsProvider` remains the single owner of contact/locator/booking state and optional model/service context. It also coordinates the existing mobile menu's open state for service consumers, ensuring only one modal interface owns focus and scroll. Protected consumers retain their local menu state and prior panel path.
- `FullscreenPanel` selects an exclusive service implementation using the same provider props. It filters hidden/inert/disabled focus targets, preserves the external opener across pane switches, restores focus after closing and handles rapid sequences without the old animated swap-effect cycle. Its protected legacy implementation is preserved apart from its internal function name and comments. Service dialog IDs are actual aria-controls targets rather than hidden placeholders.
- Contact and locator use settings-backed branches, existing contact/direction destinations and the unchanged extracted `branchAvailability` functions. Service contact tabs move focus with their selected state; hours use a native disclosure button. Locator includes the actual map and branch rows. Contact→booking supplies the selected real branch through the existing form context API.
- `BookingForm` receives `serviceInteractions` only from opted-in service panes. Inline validation, unique field IDs, first-invalid focus, busy/duplicate-submit handling, retryable network errors and success focus are opt-in. Existing payload fields and `/api/booking` remain unchanged. Protected/default consumers retain prior presentation and behavior; the `drawer` presentation alone does not enable new behavior.
- Service mobile navigation retains native route links and separate group-expansion buttons. It owns focus containment/return, close/Escape/backdrop and scroll behavior, closes at1024px and coordinates dock visibility through the provider. Desktop disclosures expose open state and ArrowDown/Escape behavior. Service locale switching reloads the server-owned localized shell; protected defaults retain prior navigation. Every catalog booking adapter uses the existing `openBook` callback.

See [R4 interactive inventory and validation](audit-r4/INDEX.md).

## R5 service and support presentation boundary

- Sixteen repair compositions (32 localized routes) opt into `ServiceRecovery`, `ServiceHero` and semantic `ServiceBlock` wrappers. The hero resolves genuine image dimensions/missing states and selects the isolated `CatalogHero variant="service"`; existing hub, brand and model variants retain their paths. Repair imagery fills the approved photographic frame. Direct LV screen/Dyson titles follow their reference phrase breaks; other titles retain natural wrapping. Dyson explicitly places supporting copy after its actions and adds the real branch call action while retaining its service anchor. New hero props default to the previous behavior.
- Repair hero media uses an explicit service-only aspect ratio: square by default and 4:5 for Dyson, including mobile and tablet. It does not inherit the model hero's short 16:9 intermediate frame. Intrinsic dimensions and object fitting remain accurate; existing hub/brand/model/default media paths are unchanged.
- `ServiceRecovery.module.scss` adapts complete existing sections to editorial grids. Resets explicitly override legacy nested containers, price-factor cards, alternating process placement, hydrogel subgrids and camera decision cards. These rules require the service recovery marker; protected/default consumers do not opt in. `ServiceLocations` adds the real existing map while retaining the original service-specific location dossier. Dyson reuses settings-backed `HubLocations` for its previously absent centers section.
- The two pricing architectures remain separate: server-fed `(site)/sections/service-pricelist` and client Firestore `(site)/components/service-pricelist`. Only their scoped styles change. Service IDs, variants, filtering, order, model selection and price format/visibility helpers remain authoritative and unchanged.
- Six support/info compositions (12 localized routes) use `InfoHero` and `RemainingPages.module.scss`. The FAQ and legal contents lists derive from real group/section headings. Hero phone actions read actual site settings. The legal text, provider details and original update date are retained; only their placement changes.
- `InfoContactButton` delegates the FAQ technician prompt to the existing `openContact` provider API. The pricing hero uses a compact settings-backed call/WhatsApp foot; Contacts retains its complete branch phone list and adds the approved large location heading/intro. About retains the actual location anchor. No new dialog owner is introduced.
- The standalone booking adapter now opts into the existing R4 form presentation/accessible validation with inline retryable errors. It still uses the same form fields, locations and `/api/booking` fetch endpoint. Its reference-only branch/FAQ sections reuse settings and the existing basic FAQ collection/fallback, without new business promises or database writes.
- `Faq` adds optional `openFirst=true` so the FAQ index can open only its first group's first question. `Locations`/`LocationList` add `showContactActions=false`, enabled by Contacts to expose the existing complete branch actions. Defaults are verified against the original sources; protected/default behavior is retained.

See [R5 inventory and evidence](audit-r5/INDEX.md). Route adapters continue owning metadata, canonicals, hreflang and JSON-LD.

## Ads V2 preview boundary

`app/adsV2/` owns a dedicated campaign page, responsive header/dock, branch contact selection and multi-mode lead presentation. It reuses service fonts/foundations, the semantic Button and existing accessible drawer machinery, while keeping its CTA state separate from the standard service provider. Production settings and `/api/booking` remain the business integration authorities. Original `app/ads`, `app/landings`, `(lp)` and middleware remain unchanged.

The shared Button now supports an opt-in `whatsapp` variant with semantic `--service-whatsapp`, `--service-whatsapp-hover`, `--service-whatsapp-active` and `--service-whatsapp-foreground` tokens. Existing primary/cyan behavior is unchanged. This pass adopts the green variant only in Ads V2; existing main-site WhatsApp links in contact panes, branch/locator controls and footer are candidates for a later controlled adoption. See [Ads V2 audit and validation](ads-v2/INDEX.md).

## Service navigation side rulers (R7.5A)

Canonical presentation and public behavior: `app/(site)/ui/navigation-rulers/NavigationRulers.jsx` and its CSS module. The public `app/(site)/layout.jsx` owns exactly one `NavigationRulers`, inside `UiDialogsProvider`; templates must not add instances. The homepage instance was removed.

The original left section navigator and right scroll range retain their approved 96px columns, 72px header offset, ticks, numbering, colors, typography and 1280px visibility breakpoint. CSS hides them below that breakpoint. Dialog/navigation state hides and inerts them while overlays are open. Native buttons/range retain keyboard interaction and visible focus; reduced motion uses immediate scrolling.

Targets come from the current main content after hydration: homepage direct sections retain their original order; other pages use outer semantic sections with headings/accessible labels, plus their H1 when outside those sections. Existing IDs are retained; sections without IDs use element references. No anchors, page copy, routing or configuration registry are added. Section-free error/utility content receives no controls. Route changes and streamed content refresh targets. Desktop tracking uses one passive scroll listener with animation-frame batching, cached offsets, direct progress updates and React active-state updates only on section changes. Observers/listeners/frames are cleaned up; hidden breakpoints have no scroll tracking.

Admin/auth, Shop/proxy, Ads, AdsV2, LP and preview layouts receive no new global instance. AdsV2's existing `HomeMotion` export and tracking behavior remain compatible and reuse the pure `RulerControls` presentation, without the global wrapper/provider dependency. `HomeProcess` remains unchanged. The pinned hydration-renderer correction is untouched.
