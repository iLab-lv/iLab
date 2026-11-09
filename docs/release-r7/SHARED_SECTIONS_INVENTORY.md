# R7.4A — Shared sections inventory

Source inspection: **November 5, 2026**. Service repository `C:/Users/info/Desktop/website/iLab`, branch `feature/redesign-integration`, remote `https://github.com/iLab-lv/iLab.git`. No application changes, refactoring or design decisions implemented.

## A. Executive summary

**16 recurring section families** are mapped below. Counts distinguish active rendering implementations from thin wrappers, explicit variants, inline compositions and potentially unused files; they are not counts of URLs. Dynamic model routes are grouped by their actual templates. Protected landing and preview implementations are recorded separately, outside the main Service counts.

The largest duplication is Reviews (**5 renderers / 6 compositions**) and Process (**4 renderers**). Service summaries have **5 renderers**, while pricing has **3 active general renderers plus a specialized diagnostic-price block**. FAQ already has only **2 Service renderers**: much apparent variation comes from wrappers rather than separate accordions.

The main causes are overlapping `app/(site)/sections` and `app/_components/sections` trees; inline homepage/page compositions; duplicated content normalization; and descendant selectors in `CatalogHubSkin`, `CatalogBrand`, `ModelDetailSkin` and `ServiceRecovery`. A shared component can therefore have several appearances, while a generically named component can have only one caller. Base SCSS still contains rounded/gradient card treatments that some Service wrappers reset; source presence alone does not establish their final rendered appearance.

Start with **Reviews → Process → Services/Symptoms**. Preserve the approved homepage Reviews foundation, reuse its card behavior, and consider only the preferred default heading and quantity-in-title heading. These are recommendations for later approval, not authorized migrations.

## B. Section inventory matrix

Strategies: **A** one shared component; **B** one component with 2–3 explicit variants; **C** separate components sharing primitives; **D** remain specialized. Counts below refer to the detailed mappings in C.

| Family | Implementations | Used on | Data source | Animation | Recommended strategy |
|---|---|---|---|---|---|
| 1. Reviews | R7.4B: 1 canonical Service renderer, full/compact; protected exceptions retained | Home, hubs, phone/tablet brands, iPhone model/services, Dyson, About, camera | Existing cached loader and shared normalization | Shared HomeReview word/focus treatment and expansion; independent compact pagination | **Consolidated — R7.4B** |
| 2. Process / Steps | 1 shared family: sticky / timeline; protected exceptions | Home, hubs, existing model/service coverage, brands, About, prices, camera | Existing 2 localized registries and page-provided workflows | Shared HomeProcess sticky behavior; native step reveals and timeline marker activation | **Consolidated — R7.4C** |
| 3. Service summaries / Popular Repairs | 1 canonical family: featured / compact / informational; thin adapters; protected legacy retained | Existing iPhone hub/model/services, brands, other hubs, Dyson, camera | Existing localized sources; model amounts from R7.2-resolved Firebase items | Existing heading reveals and accessible link feedback | **Consolidated — R7.4D** |
| 4. Symptoms / problem answers | 3 reusable renderers + board-page inline block; 1 unused preview | iPhone hub/model/screen/battery/back-cover/board; camera | Localized content modules and page strings | Shared reveals; no separate diagnostic interaction | **B**: informational rows/list and detailed diagnostic Q/A; keep purpose distinct from services |
| 5. Trust / benefits | 2 reusable renderers + Home and Contacts inline compositions | Most families; Contact/About | Localized registries, inline copy, supplied overrides | Hover/reveals; Home statement/count hooks elsewhere | **B**: benefits list versus evidence/facts |
| 6. FAQ / accordions | 2 renderers; grouped FAQ page is a wrapper | Home, hubs, models, services, info pages | FAQ adapters/Firebase; camera copy registry | Native details + shared height/opacity enhancement | **A** accordion + page-specific grouping/header slots |
| 7. CTA / contact sections | 3 reusable sections + Home inline closing | Almost all page families | Localized CTA registries, static contacts, provider actions | Hover, stagger/reveals; dialogs separate | **B** section layouts; **C** separate Dock/dialog infrastructure |
| 8. Pricing | 3 active general renderers + water diagnostic block; 1 potentially unused table | Models, service selectors, prices page, water diagnostics | Firebase adapters/shared resolver, supplied price rows; diagnostic copy local | Selector/details interactions, CSS; no common price animation | **C** table versus selector; share formatting/row primitives safely |
| 9. Model selection / grids | 1 active finder client via 2 main wrappers; 1 legacy pipeline | iPhone hub, phone/tablet/computer brands; legacy preview | Devices, series metadata, localized labels | Search/year filters, expansion; legacy lazy island | **C** shared finder engine, explicit wrappers |
| 10. Brand/device highlights | 3 active compositions; older home components remain | Home, phone/tablet/computer hubs | Home copy/images, category/device adapters | Home scans; card hover | **C** editorial imagery versus compact catalog preview |
| 11. Related models/services | 1 model-link renderer + specialized camera cross-link; reuses family 3 for other services | Models, iPhone service pages | Device relationships; service registry/local copy | Link hover; unused carousel exists | **C** separate relationship types, shared link primitives |
| 12. Guides / practical advice | 2 generic Guides + 9 named advice components + 6 water/photo specialist compositions | iPhone hub/model/services, Dyson, camera | Localized guide registries and specialist copy | Shared reveals, some hover; no common interactive guide | **C**, with **D** for safety/diagnostic advice |
| 13. Locations / branches | R7.4H: Full Locations + Quick Contacts | Hubs/Contacts/About: Full; brands/models/services/Prices/FAQ: Quick; home: both | getSiteSettings + established fallback | Shared actions/clock; distinct compositions | Global dialog/LP/Ads/Shop excluded |
| 14. Heroes / editorial headings / containers | 3 foundations: CatalogHero (4 variants), InfoHero, Home inline; 3 CatalogHero adapters; repeated body headings | All families | Resolved page data, localized metadata/copy, image adapters | Rise, image scan, stagger; generic headings revealed | **C** preserve roles; share spacing/heading primitives |
| 15. Quick facts / short answers | 2 reusable components + inline business-facts compositions | iPhone hub/model/services, camera, Home/About/Contacts | Localized facts/answers, supplied settings/copy | Mainly shared reveals | **B** fact strip versus prose answer; do not merge their content |
| 16. Quality / repair decisions | 4 renderers: quality pair + decision pair | iPhone hub/screen and camera | Localized specialist registries / supplied content | Hover/reveals; wrapper-dependent layout | **C** common panels/cards, distinct decision and quality semantics |

### Page-family coverage

| Route family (both locales) | Actual presentation / important composition |
|---|---|
| `/`, `/ru` | `app/(site)/HomePage.jsx`, `HomeSections.jsx`, `HomeInteractions.jsx`, `HomeServices.jsx`; inline benefits/closing |
| iPhone hub | `app/(site)/(catalog)/iphone-remonts/IphoneRepairPage.jsx`; HubReviews/HubPopularServices/HubRepairProcess and specialist editorial blocks |
| iPhone models | `app/(site)/(catalog)/iphone-remonts/[device]/IphoneDevicePage.jsx`; Compact model reviews, ModelServices/ModelPriceList, symptom guide, four-step process |
| Phone/tablet/computer models | Family wrappers under `telefonu-remonts/[brand]/[device]`, `plansetdatoru-remonts/[brand]/[device]`, `datoru-remonts/[brand]/[device]` all use `app/_components/sections/device-detail/DeviceDetailPage.jsx`; **no Reviews section in that shared template** |
| Phone/tablet/computer hubs | `PhoneRepairPage.jsx`, `TabletRepairPage.jsx`, `ComputerRepairPage.jsx` under their category directories; HubReviews but generic Process/Why and varying catalog previews |
| Phone/tablet/computer brands | `PhoneBrandPage.jsx`, `TabletBrandPage.jsx`, `ComputerBrandPage.jsx` under category `[brand]`; common BrandServices/finder; phone/tablet use older Reviews, computer brand has none |
| iPhone services | Screen/battery/back-cover/water use the newer specialist stack; camera/audio/charge-port/board retain generic Process/Why/ConvertBand plus page-specific content |
| General phone services | Six templates under `app/(site)/(catalog)/telefonu-remonts/(services)`; shared general selector, generic Process/Why/Faq/ConvertBand |
| iPad | Public dedicated hub adapters use tablet-brand presentation; iPad models use TabletDevicePage → DeviceDetailPage |
| Dyson | `app/(site)/(catalog)/dyson-remonts/DysonRepairPage.jsx`; generic Services/Process/Why/Reviews/Guide inside recovery wrappers |
| Camera | `app/_components/page-sections/photo-repair/PhotoRepairPage.jsx`; generic specialist sections plus separate lens/brand content and landing-derived locations |
| Informational | `AboutPage.jsx`, `ContactsPage.jsx`, `BujPage.jsx`, `CenasPage.jsx`, `TermsPage.jsx`, `PierakstiesPage.jsx` in `app/(site)/(info)`; InfoHero, generic sections, grouped FAQ and inline business data |

LV/RU route adapters generally import the **same presentation** and pass `locale`/localized data. Examples verified in `app/(site)/ru`: iPhone hub/model/screen, phone model, camera and Contacts/Terms. This does not mean all content logic is shared: many LV/RU `page.jsx` adapters separately define labels, popular-service items, process arrays and FAQ assembly. A visual consolidation must retain those data differences and existing section gates.

## C. Detailed implementation mappings

### 1. Reviews — priority

**R7.4B.2 current status (2026-11-05): distribution verified; shared rows implemented.**

- All applicable LV/RU Service families in the R7.4B mapping already use the canonical component. Existing section gates/order remain; no Reviews was added elsewhere. **Full:** homepage and now About, whose company/customer-experience content warrants a substantial trust section. **Compact:** existing hub/brand/model/service/Dyson/photo consumers. Localized defaults and title/subtitle overrides remain.
- `ServiceReviews.module.scss` shares intrinsic rows through location/list CSS subgrids at **1024px+**. Each row follows its taller currently displayed card; ratings, navigation and Google-link regions also align. Expansion grows the shared row without clipping. Mobile uses independent natural heights.
- Retired hidden measurement-card copies and reserved list heights from `ReviewLocation.jsx`; canonical rows no longer use runtime height equalization. Pagination remains independent with its existing 320ms transition. A brief position observer keeps the activated arrow steady while content settles, stops on visitor scrolling and never sets row heights.
- No additional unused public renderer was found. Thin adapters and protected Ads/AdsV2/marketing/specialized/temp renderers/assets remain. HomeReview/HomeStars, cached loader, review data, ratings, counts, links and localization are unchanged.
- Validation: 50 tests passed; five Reviews tests and focused lint passed after the position correction. Rendered checks covered homepage comparison, hub, model and full About at **375/1024/1440px**, unequal/expanded rows, independent keyboard pagination and reduced motion. Corrected arrow displacement was below one pixel. Production build passed; production checks confirmed aligned full/compact rows, expansion, motion preferences, stable pagination at all three widths, and representative LV/RU page families. No requested visual checks remain pending.
- Known behavior: visible content may change the section's intrinsic height; control anchoring prevents a pagination jump instead of retaining oversized blank review space.

The R7.4B notes below are retained as implementation history.

**R7.4B status: implemented and verified (2026-11-05).** The mapping below remains the R7.4A inventory baseline.

- Canonical section: `app/_components/sections/reviews/ServiceReviews.jsx`; location/rating/navigation: `ReviewLocation.jsx`; normalization, count/title formatting and pair selection: `serviceReviews.model.js`; isolated integration styles: `ServiceReviews.module.scss`. Both variants reuse unchanged `HomeReview/HomeStars` and the approved homepage layout classes/Google asset.
- **Full:** homepage keeps its standard title/subtitle, four available reviews per location, links, expansion and motion; no pagination. Before/after rendered comparisons found no intended visual changes.
- **Compact:** two visible reviews per location, independent previous/next pairs and actual-set feedback. Inert offscreen measurements reserve the largest collapsed pair area without scroll tracks or inner scrollbars. Boundary arrows use guarded `aria-disabled` states to preserve keyboard focus. Pair changes use native 320ms fade/vertical motion; reduced motion skips/cancels it. The existing runtime refreshes only the changed review group. Quantity headers use existing aggregate counts and LV/RU number/plural formatting; title/subtitle overrides remain available.
- Migrated existing consumers: four catalog hubs; phone/tablet brand presentations; iPhone model and four service templates; Dyson, About and photo repair. Existing section flags/order/anchors remain. Samsung phone Reviews is absent in both baseline and candidate; no Reviews was added to generic device-detail or computer-brand pages.
- HubReviews and the shared Reviews/ReviewsCompact paths are thin adapters. Removed their unused shared-directory styles/text toggle. Retained `HomeSections.HomeReviews` for protected AdsV2 and the older `app/(site)/sections/reviews` renderer for three marketing landings; protected files and shared legacy assets remain unchanged.
- Data remains `getReviewsSummary` (settings place IDs → Firestore places; existing 1,800-second cache), with no new query source or data writes. Existing content, location associations, ratings, counts and Google destinations are preserved.
- Validation: 50 tests passed; final focus change passed 12 affected tests; focused JSX/JS lint, production build and scoped whitespace checks passed. Browser checks covered homepage before/after, hub and iPhone model at **375/1024/1440px**, remaining migrated families, LV/RU, independent pagination, expansion, stable height, keyboard focus, motion preference changes and absence of overflow/inner scrollbars. No browser runtime exceptions in checked interactions. No remaining R7.4B issues or requested manual checks pending.

| Exact renderer | Actual callers | Structure/data differences |
|---|---|---|
| `app/(site)/HomeSections.jsx` → `HomeReviews` | `app/(site)/HomePage.jsx`; also `app/adsV2/AdsV2.jsx` | Preferred foundation. Large heading + subtitle + count in supporting text; white Google logo; two branch columns, up to 4 reviews per branch. Parent normalizes summary in HomePage. |
| `app/_components/sections/catalog-hub/HubReviews.jsx` | iPhone/phone/tablet/computer hub presentations | Quantity inside H2; two branch stacks; reuses **HomeReview/HomeStars**, but has no Google image/subtitle override. Accepts summary or loads it. |
| `app/(site)/sections/reviews/Reviews.jsx` | PhoneBrandPage, TabletBrandPage, DysonRepairPage, AboutPage; three `(lp)` routes | Async self-loading section; no section H2/subtitle, centered older Google Reviews asset; branch cards, dates, local expandable text component. Brand wrappers substantially restyle it. |
| `app/_components/sections/reviews/Reviews.jsx` | PhotoRepairPage only | Prop-driven summary; separate branch-card markup and text toggle; same older logo; no common H2 override. Shared directory does not imply broad use. |
| `app/_components/sections/reviews/ReviewsCompact.jsx` | Four newer iPhone service templates (default); IphoneDevicePage (`variant="model"`) | Default: branch summary + interleaved horizontal review track. Model: quantity-title + per-branch tracks. Mixes at most 6 reviews across branches; no HomeReview expansion. |

Supporting paths: `app/(site)/HomeInteractions.jsx` (`HomeReview`, `HomeStars`); `app/(site)/HomePage.module.scss`; both Reviews directories' `Reviews.module.scss` and `ReviewTextToggle.jsx`; `ReviewsCompact.module.scss`; `app/_components/sections/catalog-hub/CatalogHubSkin.module.scss`; `app/_components/sections/catalog-brand/CatalogBrand.module.scss`.

All production review data ultimately uses `lib/reviews/getReviewsSummary.js`: site settings → place IDs → `places` documents, cached for 1,800 seconds. **No live reads were made for this inventory.** `app/_components/features/reviews/reviews.helpers.js` supplies a shared normalization path, but HomePage and the older async Reviews still normalize independently. Locale fallback, missing-count handling, displayed date format and review limits differ. Unknown counts must not be silently turned into a fabricated total during future consolidation.

Assets actually referenced: `public/images/home/google-logo-white.png` by HomeReviews; `public/images/logos/Google-Review-Logo.webp` by the other image-bearing renderers. HubReviews has no image. The latter is a legacy presentation asset, not proven invalid branding; replacement needs a design choice. Home cards use SVG stars; other cards use Unicode stars.

Animation is not unified by sharing a card: HomeReviews provides `data-home-reviews`; HubReviews does **not**. `serviceMotionRuntime.js` selects that parent hook for word/focus enhancement. HomeReview measures clamping via ResizeObserver/font readiness and provides localized expand/collapse. Compact uses scroll buttons/snap tracks; its model branch honors reduced-motion in its scroll handler, while the default handler explicitly requests smooth scrolling. Base review grids collapse from two columns at their own breakpoints; Home reviews have large fluid section padding, Hub uses skin spacing, and Compact has separate model/default styles.

**Candidate:** preserve HomeReview/HomeStars and the homepage composition as the foundation; use the cached loader + one normalization contract. Offer default heading/subtitle overrides and one quantity-title header. The quantity-title source candidates are HubReviews and Compact model; generic phone/tablet brand pages currently use the older renderer. Grid versus carousel retention remains a user decision, not an automatic third permanent section design.

### 2. Process / Steps — priority

**R7.4C status: implemented and verified (2026-11-05).** The earlier inventory below remains historical context.

- Canonical wrapper: `app/_components/sections/process/ServiceProcess.jsx`; timeline: `TimelineProcess.jsx`; styles: `ServiceProcess.module.scss`; object/tuple normalization: `process.model.js`. The `Process.jsx` adapter preserves existing content variants. Sticky reuses unchanged `HomeProcess` from `HomeMotion.jsx`, rather than duplicating its renderer or scroll hook.
- **Sticky:** homepage and About (LV/RU); approved homepage copy, proportions, heading pin and step progression remain. Scoped inactive-heading contrast improves readability (measured **9.84:1**). **Timeline:** existing hub, brand, model, service, Dyson, camera and prices Process sections. Existing model coverage and section order remain; no mass insertion on model routes.
- Phone-brand presentations now show their existing supplied workflow even when the old Process flag was off. The shared LV/RU template covers Samsung and other active non-Apple phone brands; no per-brand JSX copies or database changes. Existing five-step copy and qualified warranty wording are preserved.
- Existing localized registries `sections/process/process.i18n.js`, `repair-process/RepairProcess.i18n.js`, page-local steps and `photoRepairContent.js` remain unchanged. Counts stay page-specific: homepage five, iPhone hub/model four, specialist services five/six, camera five.
- One rail connects the first/last marker centers; layout offsets keep its geometry independent of reveal transforms. Normal-flow grid steps alternate at **1024px+**, then use one left rail on mobile. Existing native reveal infrastructure adds a small vertical entrance; current markers turn cyan. Reduced motion leaves all content readable and disables sticky staging/animated emphasis.
- HubRepairProcess and RepairProcess are thin adapters; removed the latter's unused stylesheet and public Process-only wrapper skins. Protected `HomeSections.HomeRepairProcess` (AdsV2) and the older generic renderer/styles (three marketing landings) remain. No shared assets or protected landing implementation changed.
- Validation: **53 tests**, focused lint, production build and scoped whitespace checks passed. Browser/visual checks covered home, iPhone hub, Samsung, Dyson, camera and RU Samsung at **375/1024/1440px**; additional page-family/count checks; sticky activation, contrast, rail/marker geometry, mobile flow and normal/reduced motion. Homepage section IDs/rulers and copy match the baseline. No duplicate public Process sections, overflow or inner scrollbars were found in checked pages. No requested visual verification or design approval remains pending.


- `app/(site)/HomeSections.jsx` → `HomeRepairProcess`, with `HomeProcess` in `app/(site)/HomeMotion.jsx`: homepage/adsV2; five localized steps from `app/(site)/sections/process/process.i18n.js`. Sticky desktop stage (1024px+) and scroll-progress line/active-step emphasis; mobile flows vertically; reduced-motion CSS removes sticky staging/visual motion.
- `app/_components/sections/catalog-hub/HubRepairProcess.jsx`: iPhone hub only; four steps from the `iphone` entry in `app/_components/sections/repair-process/RepairProcess.i18n.js`; numbered ordered list, skin-based vertical layout, no own progress hook.
- `app/(site)/sections/process/Process.jsx`: generic hubs/brands/models/services, About/prices and `(lp)` pages; defaults to five steps or takes page-specific `steps`/`title`. Its `variant` selects **content**, not layout; passing `variant="cards"` does not select a separate visual renderer. `Process.module.scss` plus catalog/model/recovery wrappers determines appearance.
- `app/_components/sections/repair-process/RepairProcess.jsx`: iPhone model and four newer service templates, plus camera. Default iPhone workflow has four steps; screen/battery/back-cover have five; water diagnostics six; camera supplies five. Accepts content/background image. Base SCSS has a responsive card grid; wrappers convert it to editorial timelines.

These are partly visual duplication and partly legitimate workflow differences. **Candidate B:** a data-driven steps contract with timeline/compact presentation; preserve step counts, diagnostic ordering and all LV/RU copy. Reuse the homepage progress behavior only where approved, rather than adding sticky motion to every service.

### 3. Popular Repairs / Services — priority

**Owner refinement after R7.4D.1:** Popular Repairs now shows one lowest valid configured amount per repair, without option names or variant lists. Multiple variants are summarized with localized starting-from wording. Exact variant records, model pricing tables and selectors remain intact; missing amounts never become zero. This supersedes the multiple-option presentation described in the history below.

**R7.4D.1 recovery (2026-11-06).** The R7.4D visual result was not accepted; its implementation/check history below is retained.

- **Diagnosis:** `HubPopularServices.jsx` replaced every static editorial amount with model/diagnostic status before passing data to the renderer. No authoritative starting-price loader existed. This was an adapter/data-mapping omission, not a variant hiding supplied numbers. Numeric model prices did reach the renderer, but 24px amounts and prominent model-action plates weakened their hierarchy. Generic Service heading reveals could also leave repair names at opacity 0 until scrolled into view.
- **Authority:** Firebase `services` has no global starting-price field. The new server-only, one-hour-cached `lib/pricing/getStartingServicePrices.js` reads the same public brand/category model cohort used by the finder, existing active service definitions and authoritative `servicePricing` rows in bounded batches. `resolveStartingServicePriceItems` extends the R7.2 resolver: it resolves each model normally, then takes the lowest published amount **within each exact service ID**. It never takes a minimum across original/OLED/Incell/Service Pack, camera/module/glass or unrelated repairs. Missing/hidden/inactive/non-numeric rows cannot create a quote or €0 fallback; actual configured zero remains valid. Exact model pricing and selectors are unchanged.
- **Verified current bounds (51 listed iPhone models):** original display 45 €, OLED 110 €, Incell 35 €, display Service Pack 230 €; battery 40 €/Service Pack 110 €; charging-connector replacement 50 €; camera module/glass 30 €/30 €; water cleaning 50 €; back cover 50 €/Service Pack 190 €. Every line is labelled separately and localized as “No”/“От”. Original display keeps the dedicated selector's primary priority. Historical 110/60/15 € screenshot amounts are not copied into code: notably, 15 € cleaning has no corresponding configured service amount. Audio remains model-dependent and board repair diagnostic-only. Variant associations in `iphoneRepairPrices.js` now also retain the verified Service Pack, camera-glass and water-cleaning IDs.
- **Presentation:** existing `PopularRepairs.jsx`/`.module.scss` retain all three variants. A lighter token-based blue-charcoal surface, cyan top boundary, stronger separators, larger white headings/repair names and 40–48px leading prices distinguish the family. Additional labelled variants use compact inline rows. Numeric price precedes explanation on mobile and in DOM reading order; wide layouts retain three coherent zones. With a number present, model/price navigation is an understated supporting text link, followed by distinct service details. Missing numeric prices can retain a primary model action. Informational status stays inline without empty CTA columns or input-like boxes.
- **Visibility:** the section opts into the existing `data-motion-skip` contract. No global motion code, Process/Reviews behavior or surrounding section is modified; repair headings, descriptions, prices and links remain immediately visible. Only restrained link hover/focus feedback remains, with reduced-motion support.
- **Scope:** shared architecture, caller-selected variants, locale copy, service routes, finder gates, SEO/schema, Ads/AdsV2 and all surrounding sections remain. No Firebase writes, inquiries, dependency/global settings changes, staging, commits or deployments.

**R7.4D.1 validation:** 63 tests passed, including per-variant/cohort/hidden-price bounds, price-before-description reading order, all three variants/status states and Galaxy S26 Ultra 320 €/90 € with camera on request beside glass 60 €. Read-only live Firebase confirms that Samsung case. Configured lint, explicit JS/JSX lint, Sass, final production build and scoped whitespace checks passed; existing build warnings remain nonfatal. Rendered checks passed on iPhone hub/model, MacBook, camera, Dyson and RU hub at **375/768/1024/1440px** (24 states); all 16 selected section captures were inspected against the prior presentation. Normal-motion checks before/midway/after scrolling found full content opacity and zero fading animations; reduced motion, variants, numeric prominence, model links, keyboard focus and Dock clearance passed. Production HTML contains the current LV/RU starting amounts without client interaction; production action smoke passed. No browser exceptions were recorded in these checks. Baseline hashes found only the intended 9 files, with built app/lib source matching the workspace and all protected/unrelated source preserved. The earlier R7 hydration observation is not closed by this section pass. Implementation/rendered verification is complete; final visual acceptance remains with the owner.

**R7.4D implementation (2026-11-06).** Canonical `app/_components/sections/popular-repairs/PopularRepairs.jsx` owns the section shell and repair-row/price primitives; `PopularRepairs.module.scss` owns all three layouts. `popularRepairs.model.js` handles localized amount/status presentation and action ordering/deduplication, not Firebase resolution. `RepairServices.jsx` adapts existing generic title/text lists. `HubPopularServices`, `BrandServices`, `ModelServices` and `PopularServices` are thin content adapters; their previous renderers are retired. Removed the unused `popular-services/PopularServices.module.scss`.

- **Featured:** iPhone/phone hubs and existing brand summaries. **Compact:** tablet/computer hubs, iPhone/generic model summaries and four iPhone specialist related-service lists. **Informational:** existing Dyson/camera lists. These are explicit caller choices; the canonical renderer never reads device/brand/category. Section order, IDs, localized copy and existing service exclusions remain.
- Three functional zones on wide screens, reflowed action area on tablets and linear mobile reading order. Rows without price/actions use two zones, with no empty offer container. Informational status is inline; camera's model/damage exception remains distinct. Square surfaces, blue-charcoal ground, fine separators, restrained cyan marker/action edges and no gradients/cards/shadows.
- Model actions require an actual populated finder using the selector's existing `dedupeAndSort(devicesAll, brandSlug, CATEGORY_KEY)` filter, plus computer `cfg.hasModels`. The category-wide input alone is insufficient: MacBook/iPad have populated finders; Asus has no matching models. Dedicated links retain the existing `buildServiceHref` mappings or supplied destinations. One primary model/price action takes precedence over service details, then supported contact; duplicate/invalid destinations are removed, with at most one secondary action. No contact flow was invented.
- Hub editorial numeric amounts are no longer displayed: there is no selected model or approved cross-model minimum rule. They are replaced by localized model-dependent/diagnostic states. iPhone model summaries consume the existing `priceItems` prop from `buildPriceListItems`/`resolveServicePriceItems`; `iphoneRepairPrices.js` associates existing selector service IDs/slugs only. All matching original/alternative variants, configured order, starting-from flags, real zero and missing/request prices survive; no cheapest-variant selection, new Firestore queries or writes.
- Protected Services & Symptoms, Reviews, Process, header, pricing loaders/selectors, SEO, booking, Ads/AdsV2, Shop and marketing landings retain their existing implementations. The old `app/(site)/sections/services/Services.jsx` and its styles remain for three `(lp)` routes. Generic model summaries retain their supplied links and separate model pricelist rather than guessing price associations.

**Validation:** 60 tests passed (7 new Popular Repairs tests), configured lint plus explicit lint of 22 affected JS/JSX modules, Sass compilation, final isolated production build and scoped `git diff --check` passed. Existing Sass/deprecation warnings remain nonfatal. Four representative sections (iPhone hub/model, MacBook, camera) passed layout checks at **375/768/1024/1440px**; all 12 requested-width section captures were inspected, plus iPad/Russian mobile captures. Final production checks covered **17 LV/RU routes**, including Asus without a model action, iPad's existing model destination and all four specialist exclusions; **28 offered service destinations returned 200**. Populated finder anchors, keyboard activation/tab focus, mobile Dock clearance, normal/reduced motion, no duplicate links, no missing fragments, no empty offers and no overflow passed. One React hydration #418 event repeated on the iPad Pro 11 M4 model route during same-tab sweeps; a fresh production load and focused development navigation were clean. R7 already records an intermittent #418 observation, but the cause/relationship remains unproven and is not closed by this pass. Baseline hashes confirm unrelated/protected source preservation and that the built app matches the implementation. No requested visual checks remain pending; no deployment approval is implied.

**R7.4D capability mapping (2026-11-06, before implementation).** Presentation is independent of these capabilities; the earlier inventory below is retained as history.

| Active consumer / content source (LV/RU) | Existing price source | Verified navigation capabilities / planned presentation |
|---|---|---|
| iPhone hub — `popularServices.i18n.js`, 8 repairs with notes | Static editorial starting prices, not Firebase; replace with model-dependent/diagnostic status | `#iphone-modeli` finder + 8 mapped service routes; featured |
| iPhone model — same registry's model summaries | Existing `priceItems` prop from `buildPriceListItems` → R7.2 `resolveServicePriceItems` | Service details + existing `#cenas` when rows exist; compact; retain all configured price variants |
| Four iPhone specialist pages — same registry, excluding current repair | No price shown previously | Dedicated mapped services only; compact |
| Phone hub — page-provided `servicesItems` | No numeric price | Six existing general-phone service routes; featured |
| Tablet / computer hubs — localized page strings / `services.i18n.js` | No numeric price | Informational items, no selector/dedicated route on these entries; compact |
| Phone / tablet brands — route-provided `popularRepairs` / `getTabletBrandPopularServices` | No numeric price | Existing `#brand-modeli` finder when populated; phone entries also supply service routes; featured |
| Computer brands — route-local repairs + `cfg.hasModels` | No numeric price | Finder action only when `cfg.hasModels` and matching brand/category models exist; MacBook populated, Asus empty; disabled-model configurations retain their existing message; featured |
| Generic models — route-local `modelServices` | Separate model pricelist; summaries have no price association | Only supplied destinations; compact |
| Dyson — localized inline `servicesItems` | No price in entries | Informational, no per-repair destination; informational |
| Camera — `photoRepairContent.js`, 6 rows | Five diagnostic labels, one model/damage-dependent label | Informational, no per-repair destination; informational; preserve individual price conditions |

No existing per-row contact/inquiry flow was found in these inputs; none is invented. Legacy Services used by `(lp)` landings remains isolated.

- `app/_components/sections/catalog-hub/HubPopularServices.jsx`: iPhone hub. Four columns: title, description/note, editorial price, two separate actions (model anchor and dedicated service route).
- `app/_components/sections/popular-services/PopularServices.jsx`: newer iPhone services use `other-services`; camera uses `photo` with supplied content. Also contains hub/model branches; the current iPhone hub/model use different renderers. Icons/cards, exclusion of current service, different price/action visibility per branch.
- `app/_components/sections/catalog-brand/BrandServices.jsx`: three brand templates; title + description + model anchor, with optional service link. No numeric price field.
- `app/_components/sections/device-detail/ModelServices.jsx`: iPhone model and DeviceDetailPage. Editorial summaries, **not availability/pricing rows**. iPhone has service link + price anchor; other models show a service link only when supplied.
- `app/(site)/sections/services/Services.jsx`: phone/tablet/computer hubs and Dyson, with page-supplied items; card or `editorial` presentation; missing href deliberately produces a non-link card.

Root cause of disconnected columns is explicit: `CatalogHubSkin.module.scss` `.serviceRows > article` uses `3fr 5fr 2fr 2fr`; BrandServices and ModelServices place actions in column 4 despite having no price node. Hub actions are right-aligned, stacked and styled similarly. This is source evidence of reserved/empty space and competing actions, not a new browser diagnosis.

**Data/action map:** `app/_components/sections/popular-services/popularServices.i18n.js` contains eight iPhone service definitions and localized editorial prices, including “No 110 €”, “Pēc modeļa”, and diagnostic wording. `buildServiceHref` produces existing iPhone service routes: screen, battery, charge-port, camera, audio, water, board and back-cover. General phone adapter definitions under `app/(site)/(catalog)/telefonu-remonts/page.jsx` and `[brand]/page.jsx` provide six corresponding general-phone routes. Tablet/computer brand summaries may omit hrefs; their model-selection action is intentional. Dyson's inline `servicesItems` are information cards, not dedicated service routes. Camera `photoRepairContent.js` supplies diagnostic service copy/prices; the photo branch omits dedicated-page actions. Do not manufacture routes or numerical prices to fill a column.

Actual configured prices follow `lib/content/catalogDevices.js`, `lib/pricing/resolveServicePricing.js` and `lib/pricing/getServiceSelectorPricing.client.js`, not this editorial registry. **Candidate B:** integrated action/price area with explicit action descriptors and optional editorial price, plus compact related-services presentation. No empty price placeholder, universal “lowest price”, or invented service link should be part of a future interface.

### 4. Symptoms / Common Problems

- `app/_components/page-sections/iphone-screen-repair/symptoms/IphoneScreenSymptoms.jsx`: screen/battery/back-cover templates; localized content variants despite its screen-specific name. Icon cards become informational/editorial rows through ServiceBlock skins.
- `app/_components/sections/model-symptom-guide/ModelSymptomGuide.jsx`: iPhone model only; model-name-aware localized symptom list, with two-column model skin.
- `app/_components/sections/problem-answers/ProblemAnswers.jsx`: camera and iPhone hub via `app/_components/page-sections/iphone-remonts/problem-answers/IphoneProblemAnswers.jsx`; multi-part diagnosis uses a definition list, icon mapping, optional highlighted first answer.
- `app/(site)/(catalog)/iphone-remonts/(services)/iphone-plates-remonts/IphoneBoardRepairServicePage.jsx`: inline symptoms within illustrated technical content; keep board-specific explanation.
- `app/(site)/sections/common-issues/CommonIssues.jsx` + `index.js`: mini FAQ/service-link preview; no incoming application import to the barrel was found. Its generated FAQ-anchor convention must not be assumed to match the active accordion IDs.

**Candidate B:** simple symptom rows/list and detailed diagnostic Q/A are meaningful distinct roles. They should not inherit service pricing/action requirements. Preserve specialist warning copy and field labels.

### 5. Trust / Benefits

R7.4F separates **full Why sections** from the compact trust blocks reserved for R7.4G. There are exactly two canonical full-section renderers under `app/_components/sections/why/`: `MetricsWhy.jsx` / `MetricsWhy.module.scss` and `EditorialWhy.jsx` / `EditorialWhy.module.scss`. Both render on the server, use existing Service tokens/Geologica, semantic headings and configurable content. No new dependencies, client runtime, Firebase writes or global design variants were introduced.

| Full-section consumer (LV/RU) | Previous renderer | Canonical renderer / content | Integration |
|---|---|---|---|
| Home `/`, `/ru` | Inline HomePage benefits | MetricsWhy; `metricsWhy.content.js` | Same dark left introduction/right stacked-fact composition, `benefits` anchor and responsive stacking. Four uniformly sized/padded metric rows; `Garantija` / `Гарантия` with qualified one-year supporting copy; `13+ gadi` / `13+ лет` with existing certified-repair expertise rephrased to avoid repeating the duration/date. |
| iPhone hub | WhyUs | EditorialWhy; `editorialWhy.content.js` (moved original WhyUs.i18n content) | Preserves `hasWhy`, original introduction, 15+ experience explanation and all four diagnostic/price/location/honesty entries. |
| iPhone models | WhyUs | Same EditorialWhy / existing localized content | One full section; no new model-specific claim. |
| Camera repair | WhyUs with supplied content | EditorialWhy; existing `photoRepairContent.js` Why content | Four camera-specific explanations preserved; no added experience claim. |
| Contacts | Local Benefits renderer | EditorialWhy; existing `getContactsPageStrings` five heading/description pairs | Full explanatory Why section migrated; `contacts-benefits-h2` heading anchor preserved. Separate factual/legal/location blocks unchanged. |

The extended component accepts eyebrow/title/subtitle, optional experience value/label/explanation and heading/description entries. Its balanced introduction/explanation columns, smaller experience note and divided text rows are distinct from homepage metrics. Headings use one ink color; no icon medallions, floating cards, rounded panels or new decorative effects. Content is never hidden by a local animation; the existing reduced-motion-aware Service enhancement remains responsible for page motion.

Retired full duplicates: `why-us/WhyUs.jsx`, `why-us/WhyUs.module.scss`, and the local Contacts `Benefits` function. The original iPhone localized copy moved to `why/editorialWhy.content.js`; obsolete full-section-only homepage, Contacts and WhyUs wrapper rules were removed. Generic short-facts skins were retained.

**R7.4F boundary (before R7.4G):** `app/(site)/sections/why/Why.jsx`, `why.content.js`, `Why.module.scss`, QuickFacts, BeforeVisiting, compact warranty/diagnostic badges and their consumers were not migrated. The generic Why renderer contains four brief labels, not explanatory full-section copy; it remains on phone/tablet/computer hubs/brands/models, generic repair services, Dyson, About and Prices. Protected LP/Ads/AdsV2/Shop implementations remain untouched.

Brand templates were inspected. Phone/tablet/computer brands already render a gated compact Why block serving the same trust purpose. Adding a full section alongside it would duplicate that role, while replacing it would violate this pass's short-facts exclusion. No brand section or unsupported brand-specific claim was added. Pages without a full section remain unchanged.

Content review remains open: the requested homepage **13+ years / since 2013** and preserved extended iPhone **15+ years** are different existing statements. They have not been silently normalized; the factual distinction needs editorial confirmation.

Validation completed 2026-11-07: **16 focused tests pass**, including the Why component/content/integration/exclusion checks and FAQ regressions; scoped JSX-aware lint and whitespace checks pass. Component fixtures with the real Service font/styles/copy cover **375, 768, 1024 and 1440px**, both locales and reduced-motion visibility. The production build passes in an isolated, hash-verified copy of the current working source (690 matching source/config files, unchanged dependencies/configuration, credentials loaded in memory rather than copied). A concurrent local dev server was replacing the shared `.next` artifacts during root-directory build retries; isolated verification avoided that conflict without permanent configuration changes.

Final production-mode browser checks cover `/`, `/ru`, `/iphone-remonts`, `/ru/remont-iphone`, `/fotoaparatu-remonts`, `/ru/remont-fotoapparatov`, `/kontakti` and `/ru/kontakty` at all four widths: **32 HTTP-200 checks, zero horizontal overflow, duplicate full sections, metric overlap or inherited header-grid collisions**. Screenshots were reviewed after cookie dismissal, alongside the component fixtures. Nested section wrappers own outer spacing; the editorial header explicitly owns its block layout/heading typography so legacy catalog skins cannot narrow its text. No brand-page visual check was needed because no full brand section was added. Private QA evidence is under `.env-r74f-qa/`; no full-site crawl, Firebase data change, deployment or R7.4G work was performed. The separate QA server was stopped; the existing development server remains on port 3000.

#### R7.4G — Quick Trust Facts

Canonical presentation: `app/_components/sections/quick-facts/QuickTrustFacts.jsx` and `QuickTrustFacts.module.scss`; localized category selection: `quickTrustFacts.content.js`. Extracted from iPhone hub's former `QuickFacts` inside `CatalogHero` and its descendant CSS overrides. Text-only top separators, Service font/tokens, six/three/two-column reference rhythm; flexible fact counts fill each row. Optional label/value and localized accessible section label; empty input omits the block. No new animation or queries; facts remain readable with reduced motion or no JS.

| Migrated shared templates (LV/RU) | Facts / placement |
|---|---|
| iPhone hub | Exact existing six strings/order from `quickFacts.i18n.js`, including existing parts and common-repair turnaround wording; same hero slot. |
| Phone hub + PhoneBrandPage | Qualified warranty, phone diagnostics, agreed price, two Riga branches. |
| Tablet hub + TabletBrandPage (including Apple/iPad) | Qualified warranty, tablet diagnostics, agreed price, two Riga branches; no model-price or turnaround claim. |
| Computer hub + ComputerBrandPage (including MacBook) | Qualified warranty, computer diagnostics, cost/time after diagnostics, two Riga branches; no same-day promise. |
| Dyson hub | Diagnostics, fault/repair assessment, agreed price, two Riga branches; no parts or turnaround claim. |
| Camera hub | Existing six photo facts from `quickFacts.i18n.js`: qualified warranty, diagnostics, agreed cost, camera/lens repairs, existing branches, final checks; no fixed-price or timing promise. |

Phone/tablet/computer sets summarize existing category-template diagnostic and cost-agreement copy. Dyson uses its current localized diagnostic/assessment/process explanations; camera retains its existing photo registry. No new numeric experience claim, free-diagnostics promise or universal repair-time guarantee was added.

One strip in each selected hero; former compact `Why` grids removed from those seven hub/brand templates, retaining their `why` anchors. Quick Trust Facts is independent of the legacy `hasWhy` flag: configured phone/computer brands intentionally disable the old Why section, while this pass explicitly adds the separate short facts strip. No Firebase flag or full Why visibility changed. Brand hero now accepts the same child slot. Full Why components, copy and placement are unchanged. The older `Why` renderer remains required by informational/model/service/LP consumers; legacy `QuickFacts` remains required for detailed model/service summaries. Neither is dead code, so neither was deleted. BeforeVisiting and other factual/booking blocks are separate roles.

Excluded: homepage and its CSS/composition, all full Why content/styles, individual models/services, informational pages, LP, Ads/AdsV2, Shop, pricing/Firebase/FAQ/routing/SEO and CTA flows. No production writes or deployment.

QA: 21/21 focused Quick Trust Facts/Why/FAQ tests, scoped JSX-aware lint, scoped diff/whitespace checks and production build passed (693-file exact isolated source snapshot; existing Sass/autoprefixer warnings remain). Browser: 64 component checks, including original iPhone text/geometry/typography comparison and variable counts; 72 rendered-page checks across all nine templates in LV/RU at 375/768/1024/1440px. All HTTP 200, one strip each, no overflow, hidden facts, fact overlap or CTA Dock collision. Representative screenshots reviewed. Regression test covers hasWhy=false through the actual brand/hero child slot. Homepage/full Why file hashes unchanged; QA server stopped; no deployment.

### 6. FAQ / Accordions

R7.4E.2 consolidates active main Service FAQ presentation in **one renderer**, `app/_components/sections/faq/ServiceFaq.jsx` with `ServiceFaq.module.scss`, extracted from the approved homepage: square separators, native independent details, first item open, plus/minus and the existing Service motion enhancement. Localized heading/subtitle/link are content props, not visual variants. Homepage retains no subtitle/numbering and its six-item limit. Catalog/recovery FAQ internal overrides have been removed; surrounding page composition remains.

All applicable Service families use that renderer and the existing cached `lib/faq/getFaqGroups.js`, including page scope/legacy contact IDs. Basic/category inheritance and existing brand visibility gates remain; iPhone audio stays absent, and back-cover explicitly retains basic fallback. The final filtered/deduplicated localized list drives both display and schema, including the home limit. Camera/board/prices are Firebase-first with exact transitional manifest content until the six missing locale records are separately approved/created. Directory policy includes those new families only when actual published/nonempty records exist; no fallback-only entries.

Protected exports `HomeFaq` in `HomeSections.jsx` and generic `sections/faq/Faq.jsx` remain unchanged for AdsV2/LP/temp. Separate Ads/landing renderers and routing are untouched. Admin original identity/revision and transaction checks prevent contact-to-basic save coercion while preserving metadata. Production FAQ writes remain unauthorized.

Details, exact six-record content diff, safe emulator migration, validation and rollout boundary: [FAQ_CONSOLIDATION_PLAN.md](FAQ_CONSOLIDATION_PLAN.md) and [FAQ_MIGRATION_CONTENT_DIFF.md](FAQ_MIGRATION_CONTENT_DIFF.md).

### 7. CTA / Contact Sections

Active section renderers: `app/_components/sections/catalog-hub/HubFinalCta.jsx` (iPhone hub), `app/_components/sections/final-cta/FinalCta.jsx` + `FinalCtaActions.jsx` (iPhone model/newer services/camera), `app/(site)/sections/convert-band/ConvertBand.jsx` (generic families/info pages), and inline closing in `app/(site)/HomePage.jsx`. Copy comes from `finalCta.i18n.js`, `convertBandContent.js` or Home COPY. Hub uses call-first plain links; FinalCtaActions uses price/call/WhatsApp buttons; Home has contact-route link + booking drawer; ConvertBand uses configured localized links. Static `app/data/site.config.js` contacts and Firebase-backed settings are both represented in callers.

Infrastructure is **not another content section**: `app/(site)/ui/bottombar/BottomBar.jsx`, `ui/providers/UiDialogsProvider.jsx`, `ui/panels/{PierakstiesPanel,SazinatiesPanel,LocatorPanel}.jsx`, `components/booking/BookingForm.jsx`. `app/_components/sections/catalog-hub/CatalogBookingButton.jsx`, `sections/pricing/BookButton.jsx`, HomeBookingButton and InfoContactButton trigger those existing flows, sometimes with device/fault values. **B** for ordinary CTA sections; **C** keep global Dock/dialogs separate. Preserve focus restoration, booking context and WhatsApp destinations.

### 8. Pricing

- `app/_components/sections/model-price-list/ModelPriceList.jsx`: iPhone model and generic DeviceDetailPage; model variant, times/prices/booking, mobile alternatives and starting-from/hidden/request semantics.
- `app/(site)/components/service-pricelist/{BrandPickerPricelist,ServicePricelist}.jsx`: general phone services; R7.2 live reader/shared resolver, exact variant mapping, model and brand selection.
- `app/(site)/sections/service-pricelist/{BrandPickerPricelist,ServicePricelist}.jsx`: `/cenas` and several iPhone services; receives server-built pricing/serviceMeta, supports supplied initial model and separate formatting. `app/_components/page-sections/iphone-screen-repair/price-list/IphoneScreenPriceList.jsx` is only a thin wrapper here.
- `WaterDiagnosticPrice` in `app/_components/page-sections/iphone-water-damage/WaterDamageSections.jsx`: specialized diagnostic copy/CTA, not interchangeable with a configured per-model price.
- `app/(site)/sections/pricing/PriceList.jsx`: no incoming application import found; `BookButton.jsx` in that directory **is active**.

Counts are 3 active general renderers, 2 BrandPicker wrappers and 1 diagnostic block, plus the potentially unused PriceList. Future reuse must preserve `servicePricing`, service definitions, variants/families, currency, hidden/inactive/null handling, ordering, selected model, price anchors and booking initialValues. **C:** share safe formatting/row primitives; retain model table versus model browser. Do not undo R7.2 or replace Firebase amounts with editorial “from” prices.

### 9. Model Selection / Grids

`app/_components/sections/device-grid/DeviceGrid.jsx` is the iPhone-hub server wrapper. `app/(site)/sections/device-selector/DeviceSelector.jsx` with `variant="brand"` serves phone/tablet/computer brand pages. Both reach `app/_components/sections/device-grid/HubDeviceGridClient.jsx`; the wrappers have different preparation/locale contracts. This is real reuse worth retaining.

DeviceSelector's default branch uses `app/(site)/components/device-grid/DeviceGridIsland.jsx`, `DeviceGrid.jsx`, `DeviceGridSection.jsx` and `DeviceGridStaticPreview.jsx`; the active public brand templates select the newer branch, while the temp preview uses the default. `ModelCard.jsx`, `deviceGrid.groups.js`, `deviceGrid.helpers.js` and localized series metadata are important dependencies. The older `app/_components/sections/device-grid/DeviceGridClient.jsx` has no incoming import found. **C:** consolidate filter/sort/model-card primitives deliberately; maintain category/brand filtering, deduplication, year/search/series behavior and actual route baseHref.

### 10. Brand / Device Highlights

`app/(site)/HomeServices.jsx` is an editorial image-led category showcase, supplied by HomePage COPY and image/link definitions. `app/_components/sections/catalog-hub/HubBrandPreview.jsx` renders device previews on phone/tablet hubs using `app/(site)/components/model-grid/ModelCard.jsx`, including a missing-image state. `app/(site)/sections/brand-list/BrandList.jsx` handles computer brands, separating Apple device categories from other brands. These are 3 different active purposes, not duplicate price lists. **C:** shared image/card/link primitives, retain editorial versus catalog roles. Legacy `app/(site)/sections/home-devices/Services.jsx` and `components/model-grid/{ModelGrid,SeriesGrid,BrandPreview}.jsx` have no incoming imports found.

### 11. Related Services / Models

`app/_components/sections/related-models/RelatedModels.jsx` serves iPhone and generic model templates. It filters by category, brand, series and adjacent year, excludes the current model and renders **links**, not its neighboring carousel file. `RelatedModelsCarousel.jsx` has no incoming import found. `app/_components/page-sections/iphone-back-cover-repair/related-camera/IphoneBackCoverCameraLink.jsx` is a specific related-damage callout; other-service lists reuse PopularServices (`other-services`). **C:** separate model relationships and repair cross-links, sharing navigation styling only. Do not replace configured service relationships with fabricated related URLs.


**R7.4I verification (2026-11-07):** retained the existing implementations. Inspected RelatedModels, PopularServices/ModelServices/BrandServices/PopularRepairs, the back-cover camera callout, HomeServices, HubBrandPreview, BrandList, DeviceGrid/DeviceSelector/HubDeviceGridClient, CatalogHero breadcrumbs and route/localization helpers. Static service registries use buildServiceHref; Firebase category/brand/device adapters supply enabled brands, model slugs and localized parents. Model URLs append verified device slugs to those parents. Models expose their own prices/booking and category-wide service links; no nested model/service route family exists. Tablet/computer summaries and camera/Dyson diagnostic flows do not manufacture service URLs.

Coverage: home and six hubs; Samsung/iPad/MacBook/Asus brands; iPhone 13, Galaxy S26, iPad Pro 11 M4 and MacBook Air 13 M4 models; iPhone screen/battery/back-cover/water and general-phone battery services, in LV/RU. Thirty-eight routes rendered at 375/1440px; the two general-phone battery routes initially exceeded network-idle waits and were rechecked separately. All 94 sampled contextual/parent destinations returned 200 with matching final/canonical paths. Important links appeared in server HTML; sampled related lists had no self/duplicate destinations, missing targets, empty placeholder sections or unnecessary nofollow. Informational repair lists without links are intentional. Representative screenshots showed usable stacking and no navigation overflow.

Only application correction: BrandList's Russian list labels and logo-link alt names previously remained Latvian; localized them without changing links or layout. Three rendered-component tests pass. Existing related tests: 30/31 pass; the remaining source assertion expects hasWhy, removed by earlier consolidation, and was left untouched. Scoped lint passes with an existing img warning; isolated production build/type checks pass. Four LV/RU desktop/mobile keyboard journeys pass, including home-to-hub, brand/model/service links, visible focus, parent breadcrumbs, Back and language switching. Keyboard selection of iPhone 13 in both localized screen-service price browsers also passes. Server/rendered evidence and route coverage are retained locally in .env-r74i-qa. No relationship redesign, routing or Firebase change.

R7.4I.2 follow-up: the bundled React host-replay hydration defect is resolved by a version-guarded upstream backport; 56 production checks passed with zero hydration errors, and the DOM-identity regression fails before/passes after. The obsolete hasWhy test assertion is closed; 44 focused tests, scoped lint and the isolated production build pass. See [root cause, fix and maintenance](HYDRATION_418_ROOT_CAUSE_AND_FIX.md). The prior R7.4I/R7.4I.1 counts above remain historical. Application components and protected source hashes remain unchanged.

### 12. Guides / Information / Specialist Advice

`app/_components/sections/guide/Guide.jsx` serves iPhone hub and camera via localized `guide.i18n.js` or supplied content. `app/(site)/sections/guide/Guide.jsx` serves Dyson using `guideContent.js`. Both render rich-text cards; headers, input shape (`presentation.cards` versus `parts`) and styling differ.

Nine specialist components also matter: `app/_components/sections/before-visiting/BeforeVisiting.jsx`; `app/_components/page-sections/iphone-remonts/expert-notes/IphoneExpertNotes.jsx`; `iphone-screen-repair/{damage-guide/IphoneScreenDamageGuide,price-factors/IphoneScreenPriceFactors,post-repair-checks/IphoneScreenPostRepairChecks,hydrogel/IphoneHydrogelSection}.jsx`; `iphone-battery-repair/{lifecycle/IphoneBatteryLifecycle,battery-or-charging/IphoneBatteryOrCharging}.jsx`; `iphone-back-cover-repair/terminology/IphoneBackCoverTerminology.jsx`. Here the shortened page-section paths share the full `app/_components/page-sections/` prefix. WaterProtection/WaterEmergency/WaterEffects/WaterTechnical exports in `iphone-water-damage/WaterDamageSections.jsx` add safety-specific compositions; camera has `photo-repair/{LensRepairSection,CameraBrandRepairSection}.jsx`.

**C** for common editorial headings/cards/rich text; **D** for diagnostic/safety/technical content. A six-step water workflow, emergency do/don't advice, image-based damage comparison and ordinary guide cards should not become one boolean-heavy section.

### 13. Locations / Branches

**R7.4H: two canonical Service families.** Full Locations: `app/_components/sections/full-locations/FullLocations.jsx` + scoped SCSS. Retains the approved homepage Riga map, configured pins, synchronized tabs, native schedule, address/email/phone hierarchy and mobile details before map. Quick Contacts: `app/_components/sections/quick-contacts/QuickContacts.jsx` + SCSS, extracted from HomeBranchStrip: compact two-branch editorial layout, existing typography/status/phone/address, two desktop columns and stacked mobile branches. Its hours buttons retain the original selected-branch contact-dialog behavior. QuickContactsSection.jsx resolves server settings; homepage passes its existing settings.

Shared `contact-actions/ContactActions.jsx` / SCSS supplies Call, WhatsApp and ContactDirections. Cyan Call; AdsV2-derived WhatsApp uses rgba(37,211,102,.12), .34 border and #7deba6 text, becoming #25D366 with dark text on hover/focus. Both families share 48px actions, visible focus, width-based wrapping and reduced-motion treatment. Quiet navigation links use “Maršruts uz servisu” / “Как добраться”; email remains subordinate.

| Page family (LV/RU shared templates) | Current distribution |
|---|---|
| Homepage | One Quick Contacts at home-branches and one Full Locations at locations; original order/hero unchanged. |
| Six repair hubs: iPhone, phones, tablets, computers, Dyson, camera | Full Locations. Existing three reused; phone/tablet/computer maps added after core content/process and before FAQ. HubLocations remains a settings adapter. |
| Phone/tablet/computer brands, including iPad/MacBook | Quick Contacts before closing. Phone Apple resolves to the dedicated iPhone hub, retaining Full Locations. |
| iPhone + generic phone/tablet/computer models | Quick Contacts in two shared templates; former model map replaced. Existing iphone-locations anchor retained. |
| Eight iPhone + six phone service templates | Quick Contacts after primary information/FAQ, before closing. Four previous maps replaced; remaining services gain compact contacts. Existing iphone-locations anchors retained. |
| Prices / FAQ directory | Quick Contacts before closing; pricing, FAQ and schema unchanged. |
| About / Contacts | Dedicated Full Locations retained; About teaser unchanged; no extra Quick Contacts. |
| Booking / Terms | Excluded: Booking already has branch selection/contact aside; legal content needs no extra two-branch section. |
| Admin/auth/utility/error/transactional, Shop, LP/Ads/AdsV2 | No distribution or routing changes. |

Authority remains getSiteSettings(): Firestore settings/site merged with app/data/site.config.js. No branch datasets copied into pages. Shared locationState.js retains URL precedence and Riga-time/date-override logic; useLocationClock.js provides neutral SSR status and minute updates. Previously verified live records lack dedicated parking/access, GPS and explicit Waze fields; existing full-section parking copy and address-based Waze fallback remain. No invented claims or Firebase writes.

Retired unused main-Service ModelLocations, ServiceLocations and the former iPhone full-section heading adapter. Legacy HomeLocations/HomeBranchStrip exports and homepage styles remain untouched for protected consumers. Generic Locations/LocationList/LocationsMap remain for LP/Booking/Locator; global panels are unchanged. AdsV2 is read-only styling reference.

QA: 31 focused tests, scoped ESLint and production build (including type checks) passed. The isolated build matched all 698 source files; 80 protected-file hashes remained unchanged. Interactive fixtures passed 48 checks at 375/768/1024/1440px. Production-browser validation passed 160 branch/viewport checks across 38 LV/RU URLs at 375/1440px, covering section counts, both branches, links, schedules/dialogs, keyboard focus, hover and overflow/overlap. Representative screenshots reviewed. Build retained existing Sass deprecation and isolated-workspace warnings. No Firebase writes, commit or deployment.

### 14. Heroes / Section Headings / Containers / Dividers

`app/_components/sections/catalog-hub/CatalogHero.jsx` already supports explicit hub/brand/model/service variants. Thin adapters are `catalog-brand/BrandHero.jsx`, `device-detail/ModelHero.jsx`, `service-recovery/ServiceHero.jsx` under the same `app/_components/sections/` root; the latter two validate image availability/dimensions. `app/_components/sections/service-recovery/InfoHero.jsx` is a separate informational composition; homepage hero is inline HomePage. `app/(site)/sections/hero/Hero.jsx` has no incoming import found; `sections/device-hero/DeviceHero.jsx` is temp-preview-only.

Section primitives are currently mostly **CSS contracts**, not one SectionHeading component: `app/styles/_layout.scss`, `_tokens.scss`, `Catalog.module.scss`; `app/(site)/serviceFoundation.module.scss`, `HomePage.module.scss`; `app/_components/sections/catalog-hub/{CatalogHubSkin,CatalogHub}.module.scss`; `catalog-brand/CatalogBrand.module.scss`; `device-detail/ModelDetailSkin.module.scss`; `service-recovery/{ServiceRecovery,RemainingPages}.module.scss` and `ServiceRecovery.jsx`/`ServiceBlock`. Several skins depend on exact nested elements or positional selectors (`> div:last-child`, grid column 4), explaining fragile restyling. Plus markers/dividers, large editorial H2s, smaller legacy section titles, accent spans and eyebrow labels coexist. **C:** explicit section/header/row primitives first; preserve approved hero roles, hierarchy and navigation.

### 15. Quick Facts / Short Answers

`app/_components/sections/quick-facts/QuickFacts.jsx` + `quickFacts.i18n.js` supports compact text and richer facts with descriptions on iPhone hub/model/newer services and camera. `app/_components/sections/quick-answer/QuickAnswer.jsx` contains localized screen/battery/back-cover/water variants on those service templates. Inline business-facts/evidence compositions remain in HomePage and informational About/Contacts presentations. **B:** common fact strip and short-answer panel primitives, keeping data authority and specific claims separate. Do not convert editorial facts into fabricated live metrics.

### 16. Quality / Repair Decisions

`app/_components/page-sections/iphone-remonts/quality/IphoneQualitySection.jsx` and `app/_components/sections/quality/QualitySection.jsx` share the former's SCSS but duplicate panel/card markup; the former serves iPhone hub/screen, the latter camera. Their input shapes (`cards/bullets` versus `items/examples`) differ. Similarly, `app/_components/page-sections/iphone-remonts/repair-decision/IphoneRepairDecisionSection.jsx` and `app/_components/sections/repair-decision/RepairDecisionSection.jsx` duplicate three-choice diagnostic cards with different data shapes; only the iPhone version includes the extra board/contact CTA. **C:** share panels/cards and normalize presentation inputs later, preserving technical meanings, examples and localized warranty wording.

### Animation and asset cross-cutting map

| Mechanism / exact source | Current scope and constraint |
|---|---|
| `app/(site)/ServiceMotion.jsx` + `serviceMotionRuntime.js` | Service layout only; IntersectionObserver/WAAPI entrances, `[data-rise]`, `[data-scan]`, `[data-stagger]`, eligible H2/H3, counters and native-details enhancement. Reduced-motion and `?motion=off` skip runtime enhancement. Component-local absence of a hook does not imply no animation. |
| `app/(site)/HomeMotion.jsx` | Homepage rail/progress + HomeProcess sticky/active step. Do not transfer page rail infrastructure into shared sections. |
| `app/(site)/serviceNavigationMotion.js` | Service page transitions and dialog cleanup, with reduced-motion guards; not a section renderer. |
| `app/(site)/HomeInteractions.jsx` / `HomeSections.jsx` | Expandable review measurement, SVG stars, per-word markup; parent hooks determine Home-specific enhancement. |
| `app/_components/sections/reviews/ReviewsCompact.jsx` | Default and model carousel scrolling; reduced-motion handling differs between branches. |
| `app/(site)/sections/faq/Faq.module.scss` and global runtime | Icon transitions plus shared details height/opacity animation; native keyboard/details semantics must remain. |
| Section CSS modules and the four skin layers | Hover, padding, breakpoints and typography differ. Base gradients/radii/icons can be reset by wrappers; no screenshot-based appearance conclusion is asserted. |

Icons are independently mapped through `react-icons/lu`, `react-icons/fa6`, `react-icons/tb`, inline SVGs and Unicode stars. Common Google imagery is split as noted above; device cards also have multiple missing-image strategies. HomeServices uses the newer `/images/home/*-v2.png` ecosystem images, while the photo process explicitly passes `/images/hands-closeup.png`. These are source references, not findings that an asset is incorrect or obsolete. Any artwork replacement needs separate approval.

### Protected / preview implementations and unused candidates

`app/ads/_components/{reviews/LandingReviews,process/LandingProcess,faq/LandingFaq,final-cta/LandingFinalCta}.jsx` are active Riga landing components. Equivalent files under `app/landings/_components/` are used by `app/landings/iphone-remonts/page.jsx`; that tree also has live Service location dependencies. They must not be blanket-deleted or merged. Their CTA providers, forms and dock are separate from the Service provider.

`app/adsV2/AdsV2.jsx` already imports HomeReviews/HomeFaq/HomeRepairProcess. That dependency requires compatibility when a later approved Service extraction moves exports; it is not permission to activate or restyle AdsV2. `app/temp/iphone-remonts/` contains a distinct reviews/process/popular-services preview stack; `(lp)` routes reuse older Service sections and must be regression-scoped separately in any implementation pass.

“No incoming import found” above means **no static incoming application import in the inspected app/lib graph**; it is not proof that deletion is safe. Barrel exports, default branches and preview routes were followed where present. In particular, CommonIssues' component is imported by its own barrel but the barrel has no consumer; DeviceGrid's legacy pipeline is still reachable through a default branch. No file is recommended for immediate deletion.

## D. Preferred foundation candidates

| Family | Existing foundation / reason | Keep distinct |
|---|---|---|
| Reviews | Homepage HomeReviews + HomeReview/HomeStars; explicit user preference; HubReviews/Compact model supply quantity-title examples | Data normalization, heading override, optional carousel decision; not extra unrelated card designs |
| Process | HomeProcess timeline behavior with existing Process/RepairProcess content registries | Four/five/six-step workflows; compact versus sticky behavior needs approval |
| Services / Symptoms | Hub/Brand/Model service-row structure, with explicit optional price/action region; current symptom/list/Q&A semantics | Editorial starting price versus Firebase model price; navigation rows versus diagnosis |
| FAQ | Existing native-details Faq, plus grouping/header composition | Home limit and group page navigation; visible/schema alignment |
| CTA | Existing localized actions/provider contracts; select section composition after approval | Dock, dialogs, Ads and phone/WhatsApp versus booking intents |
| Pricing / model finder | R7.2 shared price resolver and existing HubDeviceGridClient are already useful shared foundations | Tables, selectors, editorial summaries and relationship queries |
| Quality / guides / locations | Share their current primitives/data contracts first | Safety advice, technical diagnosis, map/dialog/section roles |

Widest usage does not override the homepage Reviews preference or approve a new visual direction. Candidate interfaces should carry content/locale/action descriptors and a small explicit variant, not dozens of booleans.

## E. Recommended consolidation order

1. **Reviews:** agree the two header roles, card foundation and carousel requirement; normalize existing data once and preserve current exports for protected consumers.
2. **Process:** define one step-data shape; approve timeline/compact roles; migrate one representative generic page and one specialist workflow before broader rollout.
3. **Popular Services / Symptoms:** establish their different content contracts and optional action/price states; remove reserved visual space only in an approved implementation. Preserve detailed diagnostic Q/A as needed.
4. **FAQ:** extract the header/container styling contract, retain native behavior and reconcile visible limits with schema generation.
5. **Trust, quick facts, quality and decision panels:** share headings/rows/cards while keeping claims and technical copy unchanged.
6. **CTA sections:** align section presentation and actions; leave Dock, forms, provider and Ads infrastructure separate.
7. **Guides / editorial containers:** consolidate rich-text primitives and spacing; keep emergency/diagnostic modules specialized.
8. **Locations:** R7.4H consolidates Full Locations and Quick Contacts and distributes them across the main Service families listed in section 13. Protected landings/Ads and the global locator retain their existing implementations.
9. **Pricing and model finders:** presentation-only reuse last because of selection, variants, grouping and booking dependencies. Preserve R7.2 behavior.
10. **Legacy cleanup:** only after a separately approved migration proves zero callers, including default branches, previews and protected routes.

Each family requires review/approval before implementation; no migration is started by this document.

## F. Risks and dependencies

- **Pricing/data:** `servicePricing`, exact service IDs/variants, family/order, active/hidden/null/request/from flags and currency must survive unchanged. Editorial registry prices are a separate contract. No database writes or data migration are implied.
- **Selection/routes:** retain brand/category/model filters, series metadata, initial selection, search/year behavior, anchors and localized hrefs. Do not add service routes just to populate an action cell.
- **Booking/contact:** preserve UiDialogsProvider triggers, initial device/fault values, focus restoration, contact destinations and global Dock behavior.
- **Locale/content:** shared presentation often sits above independently authored LV/RU adapters. Preserve specialist workflow/diagnostic copy, content gates and warranty wording; do not homogenize it.
- **FAQ/SEO:** section IDs, render limits and transformed answers must stay aligned with existing JSON-LD inputs; this audit changes neither.
- **Motion/styles:** retain reduced-motion support, runtime hooks and teardown; moving DOM wrappers can silently change both descendant styles and which elements animate.
- **Protected consumers:** HomeSections is shared with AdsV2; landing location/provider code is consumed by Service. Keep separate compatibility boundaries and explicit regression scope.
- **Release:** R7.1–R7.3 remain intact. This is architecture analysis, not a new release blocker or authorization for pre-deployment refactoring.

## G. Open design decisions

1. For Reviews, approve the placement of the count-title header and whether any pages require a carousel rather than the preferred homepage card/branch arrangement. The homepage foundation itself is already decided.
2. For Process, choose where sticky progress is appropriate versus a compact/static timeline; retain all existing workflows and step counts.
3. For Services, choose the primary action hierarchy (model pricing, service page or contact), how editorial/request prices are integrated, and whether editorial starting-price labels remain maintained separately. Do not derive model-price minima as a visual-design shortcut. Approve any removal or relocation of existing content/links.
4. For Symptoms, approve simple informational rows/list versus detailed diagnostic Q/A roles; do not assume those must share the Services layout.
5. Approve the target Google branding treatment, heading/spacing roles and first representative page for each family before broader migration. Asset replacement and optional content relocation remain separate decisions.

### Verification and boundary

Referenced source files and direct imports/usages were inspected, including same-template LV/RU route adapters, SCSS layers and content/motion dependencies. Potentially unused files are labeled conservatively. No reference repository inspection was necessary: the relevant existing patterns were present in Service. No browser, screenshots, build, test suite, live Firebase reads/writes or production actions were run. This inventory is the **only permitted repository change**; the R7 index and application code are unchanged.

## R7.5A — Global navigation side rulers (2026-11-07)

Implemented once in the public Service layout via `ui/navigation-rulers/NavigationRulers.jsx`; its `RulerControls` export and CSS module are the canonical presentation extracted from HomeMotion/HomePage styles. The homepage instance was removed. Protected AdsV2 retains its existing HomeMotion export/tracking behavior through the shared presentation; no Ads/AdsV2 files or route configuration changed. Other layouts receive no new global ruler instance.

Left buttons navigate actual current-page sections and track the active section; the right native range tracks/controls document scroll. Homepage's ten targets/order are retained. Other pages discover outer semantic sections and their introduction without inventing IDs; section-free error/utility pages omit controls. Desktop-only observers/listeners refresh streamed/current-route targets, cache section offsets and clean up on route/breakpoint changes. Progress updates avoid per-scroll React state. Overlay state hides/inerts the controls; keyboard focus and reduced-motion scrolling are retained.

Validation: 15 focused SSR/layout/home/process/brand/hydration-backport tests and scoped JSX-aware ESLint passed. Final isolated production build passed against 701 verified source files, including its type/lint phase; root .next was preserved. All eight approved ruler style rules remain verbatim. Homepage before/after computed ruler styles, geometry and target order match at LV/RU 1600px and LV 1280px; hidden geometry/visibility match at 1024/375px. Desktop screenshots of home and model were reviewed.

99 Service browser checks passed: eight page families in LV/RU at 1600/1280/768/375px (64 layout checks), 16 section-navigation/focus checks, 16 full-range keyboard checks, contact-overlay hiding/restoration, client link/Back and real LV/RU language switching. Zero hydration/runtime exceptions, duplicated global instances or sampled content overflow. Admin redirects to login without rulers; AdsV2 and LP return 200 without the new global wrapper; missing route/model responses remain 404. Bare /ads intentionally returns an empty middleware 404 and is checked via HTTP.

Limitations: active Ads preview /?ads=1 returns HTTP 500 with the same localhost proxy/socket error on both unchanged baseline and final builds; its full landing behavior is not certified by this run. AdsV2 returns 200 on both. Existing local Shop prefetch HTTP 500 messages and build Sass/workspace/cache warnings remain separate. Firebase, SEO, pricing, protected UI, middleware/Shop routing and the pinned hydration backport remain unchanged. No commit/push/deployment.
