# R7.5B — Device selectors and phone hub teasers

Implemented 2026-11-08 on feature/redesign-integration. The implementation brief locks Selector B (compact visual tiles) and Teaser A (editorial brand rows), superseding the exploration report's selector recommendation.

## Changes

- Shared ModelThumbnail in app/_components/sections/model-thumbnail uses existing device images, Next Image optimization, lazy loading, stable image wells and contained proportions. Decorative images have empty alt text; each enclosing link retains its full model name and existing destination.
- modelPresentation separates parenthetical identifiers and years into quieter metadata without mutating the searchable record. modelThumbnail.server validates local asset availability before rendering; missing assets and later image failures use a quiet category outline.
- HubDeviceGridClient and its server adapters DeviceGrid / DeviceSelector provide compact tiles for iPhone, phone brands, iPad/tablet and MacBook/computer consumers. Existing search, series ordering, year filtering, native details, IDs and links remain intact. Phone/tablet/laptop image wells differ in height; all retain two columns on mobile.
- HubBrandPreview has an explicit editorial presentation, enabled only by PhoneRepairPage for LV/RU phone hubs. Brand heading/count and full-brand link lead on desktop; mobile DOM/layout follows brand → featured models → full-brand link. The existing default branch remains for tablet hubs.
- Featured selection remains unchanged: Apple four, Samsung four, Huawei one, Xiaomi two. No records are fabricated for absent brands.

A fresh read-only devices check verified project ilab-v2: 211 model records, 210 available local images, one missing Huawei asset, no OnePlus model records. No additional Firestore query was added to the application.

## Validation

- 18 focused tests passed: model thumbnails, catalog hubs/brands, device pages, navigation rulers and hydration replay safeguards.
- Scoped ESLint passed for changed JS/JSX and the new tests.
- Final isolated production build passed, including lint/type validation and 119 generated static pages. Existing Sass deprecation and snapshot workspace-root warnings remain. All 706 production snapshot files match current source.
- Production browser checks passed on 12 routes (iPhone, Samsung, Huawei, iPad, MacBook and phone hub, each LV/RU), at 1440px and 390px. Verified search, empty results, year filters, native collapse, existing link/order parity, two-column mobile layout, no horizontal overflow, visible keyboard focus, and arrows aligned with wrapped labels. No runtime/hydration errors were detected.
- Verified missing-image and simulated network-failure fallbacks, optimized thumbnail requests, JavaScript-disabled native details/links, mobile full-brand link placement and unchanged tablet hub presentation. Representative screenshots were reviewed in .env-r75b-implementation/.
- Source hash comparison confirms only six intended pre-existing source files changed; unrelated working-tree changes are preserved.

## Limits

Huawei retains an intentional outline until an existing record's image becomes available. Native links/details remain server rendered; interactive search/year filters require JavaScript as before. Existing optimized images are requested at thumbnail sizes; source assets and price-list imagery are unchanged.

No production data writes, routing/SEO changes, commits, pushes or deployment.
