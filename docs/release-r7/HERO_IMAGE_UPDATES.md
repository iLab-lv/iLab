# R7.5D — Targeted hero image updates

2026-11-08. New visual assets for Dyson, computers, camera repair and About, shared by the existing LV/RU page families. Existing assets were retained.

| New asset under public/images/heroes/ | Approach |
|---|---|
| dyson-repair-r75d.webp | One isolated cordless vacuum, graphite with restrained violet/copper hardware; transparent background. |
| computer-repair-r75d.webp | One isolated open graphite laptop with a quiet blue-grey screen; transparent background. |
| camera-repair-r75d.webp | One isolated camera and mounted lens, textured black hardware and restrained optical reflections; transparent background. |
| about-locations-r75d.webp | Two stacked editorial panels from the supplied reception/counter photos, retaining recognizable signage and interiors. |

Created with the built-in image_gen tool and converted to WebP; assets are approximately 56–193 KiB each. The About collage uses the two provided Downloads PNGs, not stock imagery. [Exact generation prompts](../../.env-r75d-hero/generation-prompts.json) are retained locally.

## Source files modified

Only hero image props changed in these files:

- app/(site)/(catalog)/dyson-remonts/page.jsx
- app/(site)/ru/(catalog)/remont-dyson/page.jsx
- app/(site)/(catalog)/datoru-remonts/page.jsx
- app/(site)/ru/(catalog)/remont-noutbukov/page.jsx
- app/(site)/(catalog)/fotoaparatu-remonts/page.jsx
- app/(site)/ru/(catalog)/remont-fotoapparatov/page.jsx
- app/(site)/(info)/par-mums/AboutPage.jsx

Two narrow image presentation adjustments:

- app/_components/sections/catalog-hub/CatalogHero.module.scss: contain/center only the three new device cutouts inside existing hero frames.
- app/_components/sections/service-recovery/RemainingPages.module.scss: retain the About collage's 4:5 portrait ratio on narrow screens so both panels remain visible.

Headings, copy, CTAs, hero structure, functionality and existing metadata/JSON-LD image references were preserved. Homepage, iPhone, phone and tablet hero assets, selectors, teasers and other protected sections were untouched.

## Lightweight verification

All four assets were inspected directly; the changed references and styles were reviewed. Quick browser views used the already running localhost:3000 server: computer hero at 1440px and About collage at 390px. Final screenshots were visually reviewed: the complete laptop silhouette is contained, and both About panels remain recognizable on mobile.

Comprehensive QA was intentionally skipped: no automated tests, Playwright suites, lint, type checks, production builds, extensive browser sweeps or SEO audit. No additional server was started or unrelated process stopped.

No Firebase writes, commits, pushes or deployment. Generated product imagery is illustrative; the About composition is based on the supplied photos.
