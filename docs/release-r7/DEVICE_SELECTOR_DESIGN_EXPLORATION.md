# R7.5B — Device selector and brand teaser design exploration

2026-11-08 · Service / feature/redesign-integration · **Proposal only.**

Recommendation: **compact illustrated rows for exact-model selection; editorial brand rows for featured-model discovery.** Share thumbnail treatment, typography and interaction states, while keeping their different layouts and purposes.

## A. Current implementation and rendered evidence

The principal reference was the rendered Service site. Its previously verified production snapshot still matched all 701 source files, so it was reused without a new build. Chrome inspection covered eight routes at 1440/390px: LV iPhone, Samsung, Huawei, iPad, MacBook and phone hub; RU iPhone and Samsung. Search, empty states, year controls and native expand/collapse were exercised. Additional iMac, Dyson and camera pages returned 200 with no model-search controls.

| Interface / consumers, including RU equivalents | Actual implementation | Contract to retain |
|---|---|---|
| iPhone hub | app/_components/sections/device-grid/DeviceGrid.jsx:61 → HubDeviceGridClient.jsx:13; HubDeviceGrid.module.scss | Category/brand filtering, metadata-defined series order, device order/year/name sorting, localized links. |
| Phone brands, including Samsung/Huawei/Xiaomi | app/(site)/sections/device-selector/DeviceSelector.jsx:12 with variant="brand", called by telefonu-remonts/[brand]/PhoneBrandPage.jsx:85 | Same active client finder, with brand-specific grouping/search behavior. |
| Tablet brands including iPad; computer brands including MacBook when enabled | Same DeviceSelector via TabletBrandPage.jsx:384 and ComputerBrandPage.jsx:506 | Retain computer cfg.hasModels gate, empty-model handling, category-specific names/codes and route bases. |
| Phone hub brand previews | app/_components/sections/catalog-hub/HubBrandPreview.jsx:18 → app/(site)/components/model-grid/ModelCard.jsx:75; CatalogHubSkin.module.scss:185 onward | Actual featured array, total, brand heading and model/brand destinations. |
| Related consumers | Tablet hub also uses HubBrandPreview. Service price pickers use components/service-pricelist/{BrandPickerPricelist,ServicePricelist}.jsx; the latter already has a large selected-device image. | Phone teaser changes must be opt-in; preserve tablet presentation and price-picker functionality. No new selectors for diagnostic-only flows. |

Current finder behavior:

- Text-only anchors: **no model thumbnails**, although device objects already include image. Desktop fits five text columns in the sampled 1440px layout; mobile uses one.
- Native series details: first group open; search opens matching groups. Counts/year buttons belong to each group. There is no active four-model cap within a series: wrapper initialLimit props are not consumed by this active client renderer.
- iPhone search normalizes accents and matches name/slug/year/group title; brand search uses its existing name/slug/legacy-series/year matcher. iPhone search bypasses the selected-year restriction; brand search retains it. Preserve these distinctions.
- Verified searches returned four iPhone 13 matches, four Samsung S24 matches, two iPad M4 matches and four MacBook M4 matches. First-series year checks returned three Samsung models for 2026 and two MacBook Air models for 2025.
- DeviceGridIsland/static-preview remains in DeviceSelector's non-brand branch; it is not the active brand UI above. Do not conflate it with the current finder or remove legacy/protected consumers.

The phone hub already has imagery: square image cards, four desktop columns/two mobile columns, repeated “remonts un cenas” copy, and substantial per-brand spacing. Its image loader initially renders a generic phone placeholder, then changes source in an effect. A server file check avoids a broken image for Huawei.

telefonu-remonts/page.jsx:172–225 preserves current grouping/order/year/name selection and takes slice(0,4). Rendered counts are **Apple iPhone 4/51, Samsung 4/93, Huawei 1/1, Xiaomi 2/2**. Sony/OnePlus have no device records and therefore no preview block. Do not invent four items where fewer exist. Apple’s full-brand destination remains the iPhone hub.

Current references: [selector](r75b-design/current-selector.png), [brand teaser](r75b-design/current-teaser.png).

## B. Image availability and quality

A fresh **read-only ilab-v2** Firestore projection inspected all 211 devices records and their image references. Local existence/metadata checks covered all referenced files; alpha-bound measurements sampled 14 images. No credentials are included.

| Current dataset | Records | Existing local images | Missing referenced files |
|---|---:|---:|---:|
| iPhone | 51 | 51 | 0 |
| Samsung phones | 93 | 93 | 0 |
| Huawei phones | 1 | 0 | 1 |
| Xiaomi phones | 2 | 2 | 0 |
| OnePlus phones | 0 | 0 | 0 |
| iPad | 31 | 31 | 0 |
| MacBook | 33 | 33 | 0 |
| **Total** | **211** | **210** | **1** |

All records use image; none depends on imagePath-only or remote URLs. Paths start with /images/devices/iphone/, samsung/, tablet/ipad/, macbook/ or xiaomi/. Huawei P30 Pro points to absent /images/devices/huawei/huawei-p30-pro.webp. Of 213 local device files, three additional Samsung files are unreferenced: Galaxy A15, A25 and Z Flip2. They do not fill the Huawei/OnePlus gap.

Phones/iPads are 1600×2000 WebP; MacBooks are 1600×1600. All 210 existing files have alpha channels. Sampled corners were transparent, with no opaque background box observed. Visible-height occupancy varied: iPhones 77–80%, Samsung 76–89%, Xiaomi 84–87%, iPads 63–73%, MacBooks 38–55%. A uniform box alone will not make silhouettes equally prominent. Some originals approach **1.5 MB**, disproportionate to a thumbnail.

**Existing assets are sufficient for populated lists**, with a deliberate Huawei fallback. This verifies availability and sampled presentation, not hardware-exact photographic accuracy for every record. Similar-looking devices still require full names/identifiers.

Fallback: preserve the same empty image well with a restrained category-correct outline, hidden from assistive technology; keep the real name/link prominent. Avoid repeated large “image unavailable” messages or unrelated model photographs. Existing /images/placeholders/phone.webp is phone-only, unsuitable as the universal tablet/laptop representation. No asset acquisition, replacement or upload is proposed.

## C. Device-selector alternatives

| Specification | A — Compact illustrated rows **(recommended)** | B — Compact visual tiles |
|---|---|---|
| Image well | Phones 56×64px; tablet 64×72; laptop 80×72. Contain, centered. | Approximately 96×104px region; whole device contained. |
| Item size | Phone minimum 88px high, typically 280–320px wide desktop; grows for long labels. Laptop approximately 96–112px high. | Minimum approximately 208px high desktop / 232px mobile; grows with labels. |
| Desktop / intermediate | Four columns when they fit, with 24px gutters; three intermediate/two tablet. Computers may need three because of long identifiers. | Four / three / two columns, with greater image emphasis. |
| Mobile | One full-width row; name beside image. | Two columns; name below image. |
| Label | 17px/1.35, medium weight; 16px mobile. Preserve model names/codes; secondary year only when not already embedded. | Same conventions; more wrapping in narrow tiles. |
| Hover/focus | Whole row is one link. Bottom separator, trailing chevron, restrained hover tint/accent, 2px focus outline. | Same link/focus treatment; no rounded product-card shell. |
| Long names | Natural wrapping and growing row; no ellipsis or identifier clipping. | Natural wrapping and growing tile; narrow mobile names cost more height. |
| Missing source | Same-size quiet category fallback. | Same fallback, more conspicuous in the larger well. |
| Strength / cost | Best for 51/93-model finders: imagery supports text scanning. More space than current text-only links. | Stronger visual browsing, but repeated imagery and taller open groups. |

Illustrative content-height arithmetic for 20 models, excluding headers/gutters: four-column 88px rows ≈440px versus 208px tiles ≈1040px. Mobile rows ≈1760px versus two-column 232px tiles ≈2320px. These are estimates, not full-list implementation measurements.

Retain series, search, year controls and collapse behavior. Reduce the selector-only 48–88px heading toward the shared 30–44px section scale, with approximately 32px between heading/search/groups. This improves hierarchy and partially offsets added image height. Do not add a four-item limit or extra “show more” steps.

Comparisons: [desktop](r75b-design/selector-desktop.png), [mobile](r75b-design/selector-mobile.png). These annotated fragments show the same first eight Samsung models, not a new listing limit. Search/year placement is illustrative; the studies are not replacement working finders.

## D. Phone brand-teaser alternatives

| Direction | A — Editorial brand rows **(recommended)** | B — Structured brand groups |
|---|---|---|
| Desktop hierarchy | About 224px brand/count/view-all column, 40px gap, then four compact previews. | Full-width brand header/view-all, then four-column visual group. |
| Imagery | 112px-high contained wells: larger than selector thumbnails, subordinate to the brand. | Approximately 144px-high wells and 248px minimum model fields. |
| Rhythm | No individual card boxes; one separator per brand. Approximately 240–300px desktop content height per row. | More prominent images/flat fields; taller and closer to existing catalog treatment. |
| Mobile | Brand/header link, then two columns; 88px image wells, approximately 174px minimum items, full labels. | Stacked header, two-column fields, 112px wells and approximately 232px minimum items. |
| Tradeoff | Faster Brand → Models → All models scan; less repetitive chrome. | Strong showcase, but more repeated backgrounds and page length. |

Phone-specific editorial spacing: roughly 40–48px between brand rows, retaining section-level spacing around the collection instead of padding every brand as a full standalone section. Keep model/brand destinations. Fewer records produce fewer previews, aligned to the start without invented placeholders.

Use model-only visible labels to remove repeated card suffixes; retain descriptive localized accessible link names and all model codes/year text. Keep the full-brand action a clear plain link with a minimum 44px target.

Both interfaces share image conventions, ink, focus and chevrons; **their layouts differ**. The selector optimizes exact identification; the teaser introduces a brand and selected examples.

Comparisons: [desktop](r75b-design/teaser-desktop.png), [mobile](r75b-design/teaser-mobile.png). Both retain the **same current four featured Samsung models and order**, rather than substituting newer search results.

## E. Shared visual and technical contract

- Existing Geologica / IBM Plex Mono; Service paper #070a0d, secondary paper #0c1115, ink #f2f5f7, secondary ink #aeb8c0, hairline #1c242b, signal #47c6e2. Heading words remain ink-colored.
- Section heading 30–44px; brand 28–32px; series 20–22px; model 16–17px; metadata 13–14px. Existing 20/40/96px responsive margins and 24px gutters. Square geometry; no shadows, photo zoom or new decorative animation.
- One future ModelThumbnail primitive accepts existing source, device kind and layout-owned class. It owns image/fallback only, not links, fetching or selection state. Kind changes dimensions, not whole component families or per-model crop configurations.
- Contain the entire image. Accept some laptop whitespace rather than crop or arbitrarily zoom devices; the wider well/taller row accommodates silhouette and full A-number/year labels.
- Reserve dimensions for successful/missing images. Decorative alt="" inside the named model link; retain native details, keyboard behavior and visible focus. No nested controls in links.
- lib/content/devices.js:10–30,49–57,85–105 already supplies image through a 3600-second cached reader. Pass existing arrays through: **no Firebase request per thumbnail**, no new image collection. Current records need no imagePath-only reader extension.
- Use appropriately sized optimized local images with explicit sizes, lazy loading and async decoding. Current teaser img fetches originals; the related price preview explicitly bypasses optimization. Reusing that bypass is inappropriate for a long thumbnail list. Validate optimizer output/cache and requests in the later patch.
- Server-render the resolved source/known fallback immediately; avoid the current placeholder-to-source effect flash. Preserve SSR anchors, IDs and JS-off native details; keep filtering local. CSS controls columns, with identical initial server/client markup. Leave the guarded hydration correction, SEO and route construction intact.

The four final mock screenshots were reviewed at 1440/390px. Checks found no horizontal overflow, image/label overlaps, escaping wells or failed loads. This establishes visual feasibility, not completed application functionality or full-list performance.

## F. Focused implementation plan — after approval

1. Approve selector A + teaser A, fallback, sizing and selector-heading adjustments. Treat studies as direction rather than pixel-parity requirements.
2. Add the thumbnail primitive/shared source fallback using existing data. Verify optimized sizes, transparency and a missing-image case before expanding lists.
3. Extend active HubDeviceGridClient markup/styles: Samsung/iPhone, then iPad/MacBook. Preserve grouping, sorting, search/year differences, open state, localized links and availability gates.
4. Opt the phone hub into editorial HubBrandPreview composition; preserve arrays/totals/links. Retain tablet defaults and legacy ModelCard consumers.
5. Validate LV/RU, long identifiers, missing Huawei image, empty OnePlus/model-less flows, keyboard/focus, image-error recovery, JS-off links, CLS and network payload across representative widths. Add focused behavior/SSR regression coverage and run lint/build when implementing.
6. Review the integrated result before release. Missing Huawei photography can remain a graceful fallback; new/replacement assets need separate authorization. No Firestore migration is needed.

**Status:** report, current-reference screenshots and temporary studies only. No application code/styles, device image assets, Firebase records, routing, pricing, SEO, rulers or protected sections changed. No commit/push/deployment. Implementation has not begun.
