# Main website performance and Core Web Vitals audit

Date: 19 November 2026 (Europe/Riga). Source revision: `ba0c2b1`.

The mobile loading problem is reproduced. Homepage mobile scores are **46–52** across three baseline runs, with **5.50–5.72 s LCP**; desktop scores vary **77–94**. Mobile LCP is hero text. The strongest verified opportunities are analytics execution, the font/rendering path, multi-megabyte homepage photographs, and generic-service Firebase/Auth loading. `/cenas` also has an intermittent **0.1901 CLS** event (two of three runs).

**Audit only. No application source, design, Firebase data/settings, advertising landings, deployment settings, dependencies, or Git history were changed.** The initial working tree was clean. The report and local measurement helpers/results are new audit artifacts.

## Scope and evidence

Production `https://ilab.lv` and this Service repository were inspected. Shop and advertising landings are excluded. Representative LV pages cover the homepage, iPhone hub, phone hub, iPhone 12, iPhone screen replacement, generic phone screen replacement, and prices. RU homepage and iPhone screen replacement provide localized samples; this is not exhaustive RU coverage.

The primary guide was the installed `web-perf` skill. `webapp-testing` informed browser regression checks; installed Python was not executable, so the existing cached Puppeteer package supplies equivalent headless Chrome checks. Firecrawl/read-docs retrieved official documentation. No packages or skills were installed. The relevant explorer, implementer, functional QA, and visual QA configuration files were inspected. One read-only explorer attempt lacked workspace tools; the main session performed the source review, feasibility assessment, benchmarking, and preservation review. Additional specialists were not started. `find-skills` and a Next-specific skill were not found in the inspected installed-skill roots. General design/accessibility skills were considered; this audit does not redesign or certify accessibility.

### Measurement method

- Existing Lighthouse **12.8.2**, installed Chrome **157**, Windows, headless, serial navigations. No development-server scores are used.
- Mobile: 412 × 823, DPR 1.75, simulated 150 ms RTT / 1,638.4 Kbps / 4× CPU slowdown. Desktop: 1350 × 940, DPR 1, simulated 40 ms RTT / 10,240 Kbps / 1× CPU.
- Lighthouse resets browser storage/cache; these are fresh-visitor lab samples with no recorded consent. CDN/server data caches can remain warm. Server cold-start state is not controlled.
- Only the Performance category was collected. The supplied 51/97/100/100 scores are user-reported context; accessibility, best practices and SEO scores were not independently reproduced here.
- Fresh primary results, repeats and diagnostic variants are separated. An initial homepage run taken during a concurrent local build is excluded from the comparable baseline. The initial sandboxed network/interstitial failure is also excluded.
- Lighthouse's headline LCP is **simulated**. Its element/breakdown insights describe the **observed trace**. Those timings must not be combined into a single breakdown or presented as interchangeable.
- Main-thread and script totals cover the recorded trace, which can extend beyond the scoring window. They are not the same as TBT and are not necessarily comparable when a run times out.
- Production deployment commit provenance was not available. Production DOM/assets match the inspected templates; local build/chunk hashes differ, so checkout build sizes support source analysis rather than proving byte-for-byte deployment identity.

Raw reports, timings/waterfall data, helper scripts and the local build log are in [`tmp/perf-audit-2026-11-19/`](../tmp/perf-audit-2026-11-19/). `benchmark.mjs` uses cached tools and skips reports already collected; `summarize.mjs` extracts metrics, LCP nodes, resource totals, execution attribution and insights. Public URL query parameters are stripped from its resource labels where possible.

## Field Core Web Vitals

**Not available in this audit.** The public PageSpeed API returned HTTP 429 `RESOURCE_EXHAUSTED` with a zero daily quota. No connected Search Console session or authorized CrUX API response was available. This is a retrieval limitation, not proof that the origin lacks field data or passes/fails CWV.

Google's field targets are p75 LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1, segmented by mobile/desktop. All three must meet their targets. TBT is a laboratory diagnostic and **does not establish INP**. See [Web Vitals](https://web.dev/articles/vitals).

## Production lab baseline

Primary single-run samples are below. SI means Speed Index. The generic-service mobile result carries a timeout warning and is **provisional**; its startup appends `?brand=samsung`. Desktop collection failed with a Lighthouse protocol error, including an attempt with the explicit brand URL. These are measurement limitations, not a fabricated score or proof that ordinary browsing fails.

| Page/run | Mode | Performance | FCP s | LCP s | SI s | TBT ms | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| LV / | mobile | 52 | 2.40 | 5.55 | 4.32 | 1014 | 0.0000 |
| LV / | desktop | 94 | 0.72 | 1.06 | 1.99 | 71 | 0.0028 |
| LV /iphone-remonts | mobile | 43 | 2.18 | 6.14 | 9.61 | 1190 | 0.0003 |
| LV /iphone-remonts | desktop | 91 | 0.77 | 1.34 | 1.65 | 134 | 0.0031 |
| LV /telefonu-remonts | mobile | 56 | 2.05 | 5.51 | 3.68 | 911 | 0.0002 |
| LV /telefonu-remonts | desktop | 82 | 0.70 | 1.97 | 1.69 | 206 | 0.0003 |
| LV /iphone-remonts/iphone-12 | mobile | 46 | 2.14 | 6.55 | 5.34 | 1367 | 0.0000 |
| LV /iphone-remonts/iphone-12 | desktop | 92 | 0.77 | 1.34 | 1.60 | 122 | 0.0031 |
| LV /iphone-remonts/ekrana-maina | mobile | 53 | 2.02 | 5.30 | 4.75 | 1017 | 0.0000 |
| LV /iphone-remonts/ekrana-maina | desktop | 85 | 0.75 | 1.24 | 1.74 | 245 | 0.0172 |
| LV /cenas | mobile | 45 | 2.11 | 4.44 | 4.28 | 1648 | 0.1901 |
| LV /cenas | desktop | 93 | 0.78 | 1.23 | 1.43 | 134 | 0.0000 |
| LV /telefonu-remonts/ekrana-maina | mobile | 45 | 1.84 | 5.49 | 4.92 | 3767 | 0.0000 |
| LV /telefonu-remonts/ekrana-maina | desktop | unavailable | — | — | — | — | — |
| RU /ru † | mobile | 45 | 2.20 | 5.82 | 4.30 | 2826 | 0.0000 |
| RU /ru | desktop | 71 | 0.90 | 1.45 | 3.25 | 364 | 0.0004 |
| RU /ru/remont-iphone/zamena-ekrana | mobile | 45 | 2.10 | 5.53 | 5.33 | 2469 | 0.0000 |
| RU /ru/remont-iphone/zamena-ekrana | desktop | 72 | 0.80 | 1.40 | 2.32 | 425 | 0.0003 |

† Lighthouse emitted a slow-host-CPU warning for these samples. The same presets were used, but host calibration varied: for example, homepage mobile benchmark index was 1,623 initially, 649 in repeat 1 and 1,597.5 in repeat 2. The initial matrix reused a Chrome process with Lighthouse storage resets; repeats used isolated Chrome processes after the protocol failure. Treat CPU-sensitive deltas cautiously; do not infer that RU itself causes its higher sampled TBT.

### Actual LCP elements

| Page | Mobile LCP | Desktop LCP |
| --- | --- | --- |
| LV / | text: remonts Rīgā. (`span`) | image: `/images/home/home-hero-repair.webp` |
| LV /iphone-remonts | text: iPhone remonts Rīgā (`h1`) | image: `/images/categories/iphone_remonts.webp` |
| LV /telefonu-remonts | text: Telefonu remonts Rīgā (`h1`) | image: `/images/categories/telefonu_remonts.webp` |
| LV /iphone-remonts/iphone-12 | text: iPhone 12 remonts (`h1`) | image: `/images/devices/iphone/iphone-12.webp` |
| LV /iphone-remonts/ekrana-maina | text: ekrāna maiņa (`span`) | image: `/images/categories/displeja_maina.webp` |
| LV /cenas | text: Remonta cenas (`h1`) | text: Remonta cenas (`h1`) |
| LV /telefonu-remonts/ekrana-maina | text: Telefonu ekrāna maiņa Rīgā (`h1`) | unavailable |
| RU /ru | text: Ремонт телефонов (`span`) | image: `/images/home/home-hero-repair.webp` |
| RU /ru/remont-iphone/zamena-ekrana | text: Замена экрана iPhone в Риге (`h1`) | text: Замена экрана iPhone в Риге (`h1`) |

Text LCP is confirmed by Lighthouse's DOM node, not inferred from the largest image. The headline's visibility/font/entrance scheduling therefore matters on mobile. Desktop homepage LCP is the repair photograph. High fetch priority is already set on homepage/catalog hero images, which are discoverable from server HTML; adding blanket priority/preload everywhere is not the first fix.

### Transfer and execution

Script transfer includes first-party and third-party scripts. Execution is Lighthouse's JavaScript evaluation plus parsing/compilation diagnostic; main-thread totals include layout, paint and other work. They are trace totals, not TBT. The generic page's long recording cannot be compared directly with ordinary trace lengths.

| Page | Mode | Requests | Total KiB | Scripts KiB | Fonts KiB | JS parse/eval ms | Main thread ms |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| LV / | mobile | 53 | 5265 | 519 | 390 | 2523 | 7615 |
| LV / | desktop | 76 | 9991 | 518 | 390 | 5822 | 11110 |
| LV /iphone-remonts | mobile | 53 | 1426 | 529 | 390 | 2482 | 9620 |
| LV /iphone-remonts | desktop | 76 | 1435 | 529 | 390 | 709 | 2491 |
| LV /telefonu-remonts | mobile | 50 | 1292 | 526 | 390 | 2211 | 9260 |
| LV /telefonu-remonts | desktop | 75 | 1423 | 526 | 390 | 759 | 2490 |
| LV /iphone-remonts/iphone-12 | mobile | 52 | 1506 | 519 | 390 | 2897 | 9499 |
| LV /iphone-remonts/iphone-12 | desktop | 75 | 1512 | 519 | 390 | 609 | 2831 |
| LV /iphone-remonts/ekrana-maina | mobile | 50 | 1296 | 528 | 390 | 2383 | 8757 |
| LV /iphone-remonts/ekrana-maina | desktop | 75 | 1302 | 529 | 390 | 765 | 2883 |
| LV /cenas | mobile | 48 | 1954 | 523 | 390 | 3248 | 8018 |
| LV /cenas | desktop | 71 | 1961 | 523 | 390 | 693 | 2455 |
| LV /telefonu-remonts/ekrana-maina | mobile | 73 | 1990 | 770 | 390 | 6461 | 48667 |
| RU /ru | mobile | 52 | 3284 | 519 | 390 | 4962 | 11768 |
| RU /ru | desktop | 77 | 5272 | 519 | 390 | 1217 | 3627 |
| RU /ru/remont-iphone/zamena-ekrana | mobile | 53 | 1303 | 529 | 390 | 4708 | 12315 |
| RU /ru/remont-iphone/zamena-ekrana | desktop | 77 | 1309 | 529 | 390 | 1308 | 3673 |

### Repeated key measurements

| Page/run | Mode | Performance | FCP s | LCP s | SI s | TBT ms | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| home-mobile | mobile | 52 | 2.40 | 5.55 | 4.32 | 1014 | 0.0000 |
| home-desktop | desktop | 94 | 0.72 | 1.06 | 1.99 | 71 | 0.0028 |
| home-repeat-1-mobile † | mobile | 46 | 2.08 | 5.50 | 4.64 | 2644 | 0.0000 |
| home-repeat-1-desktop | desktop | 77 | 0.88 | 1.53 | 2.04 | 306 | 0.0000 |
| home-repeat-2-mobile | mobile | 49 | 2.30 | 5.72 | 3.84 | 1511 | 0.0000 |
| home-repeat-2-desktop | desktop | 77 | 0.81 | 1.37 | 2.76 | 291 | 0.0006 |
| iphone-mobile | mobile | 43 | 2.18 | 6.14 | 9.61 | 1190 | 0.0003 |
| iphone-repeat-1-mobile † | mobile | 41 | 2.45 | 6.56 | 5.12 | 2560 | 0.0003 |
| iphone-repeat-2-mobile | mobile | 38 | 2.48 | 7.23 | 6.11 | 4265 | 0.0003 |
| prices-mobile | mobile | 45 | 2.11 | 4.44 | 4.28 | 1648 | 0.1901 |
| prices-repeat-1-mobile † | mobile | 37 | 2.39 | 4.77 | 5.59 | 2873 | 0.1901 |
| prices-repeat-2-mobile † | mobile | 47 | 2.44 | 5.33 | 5.09 | 1635 | 0.0000 |

### Browser-only diagnostic variants and local production build

| Page/run | Mode | Performance | FCP s | LCP s | SI s | TBT ms | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| home-no-motion-mobile | mobile | 48 | 2.37 | 5.78 | 3.95 | 1524 | 0.0000 |
| home-no-tags-mobile | mobile | 64 | 2.21 | 5.43 | 3.80 | 485 | 0.0000 |
| local-home-mobile | mobile | 71 | 2.34 | 2.72 | 6.84 | 635 | 0.0015 |
| local-home-desktop | desktop | 90 | 1.13 | 1.16 | 2.10 | 115 | 0.0035 |

`?motion=off` uses an existing diagnostic switch. The no-tags test blocks only `googletagmanager.com` in the auditor's browser. Neither is a deployable fix or permission to remove effects/tracking; neither changes production. Each variant is one exploratory sample, so its delta is not a guaranteed saving or an additive forecast. Local results use `next start -p 3100`, the same Lighthouse presets and a generated optimized build; localhost removes production network/server conditions and is not a production baseline.

## Architecture findings and existing optimizations

- Next.js **15.5.29**, App Router, React **19.1.10**. Homepage and route presentation are substantially server rendered; the provider wrapping server children does not turn all children into client components.
- Both [`app/layout.jsx`](../app/layout.jsx) and [`app/(site)/layout.jsx`](../app/(site)/layout.jsx) call `headers()`. The completed production route table marks the sampled pages `ƒ` (on-demand rendering), not static/ISR HTML. Next 15 documents `headers()` as a [Dynamic API](https://nextjs.org/docs/15/app/api-reference/functions/headers). Data Cache use still benefits dynamic routes.
- [`lib/siteSettings.js`](../lib/siteSettings.js) already caches settings for 3,600 s; [`lib/reviews/getReviewsSummary.js`](../lib/reviews/getReviewsSummary.js) caches review summaries for 1,800 s; category/device readers and FAQ readers have 3,600 s revalidation. Do not propose adding caching to these as if absent.
- Main-site reviews are read server-side from Firestore snapshots and passed to review UI. The `no-store` Google Places helper is used by the review cron route, not the main page-load chain. No live Places widget is needed to render review ratings.
- [`UiDialogsProvider.jsx`](../app/(site)/ui/providers/UiDialogsProvider.jsx) already dynamically imports locator/contact/booking content with `ssr:false`, and only renders a pane after selection. [`HeaderActions.jsx`](../app/(site)/ui/navbar/HeaderActions.jsx) already dynamically imports and conditionally mounts the mobile drawer. The header shell and footer are server components; interactive desktop nav and CTA Dock hydrate.
- Current homepage locations use branch photos and tabs. The old `HomeLocations`/map and `HomeMotion` exports retain compatibility consumers; their presence in a source file does not prove they load on the main homepage. The actual locator uses a static image and pins, not a tile-map library.
- There are two pricing component families. `@sections/service-pricelist` is server-fed; `@components/service-pricelist` imports the browser Firebase pricing reader. Conclusions must follow each route's actual import.
- The old [`MOBILE_PERFORMANCE_REFACTOR_PLAN.md`](../MOBILE_PERFORMANCE_REFACTOR_PLAN.md) and July Lighthouse JSONs are historical. Its dialog/menu/cache/build observations are partially obsolete; its old route sizes are not the current baseline.

## Implementation boundaries

Preserve the original Geologica/IBM Plex typography, neon signature colors/shadows, image crops, interactive neon treatments, scroll effects, reviews/ratings, dock, forms, pricing state, location pins, LV/RU navigation, metadata and JSON-LD. Prefer improving loading, scheduling, font encoding, data boundaries and geometry reservation. Do not remove an effect or swap a visual solely for a score. Root layout and shared motion files also have protected-shell consumers: any future optimization must be explicitly scoped to Service and prove the advertising landings are unchanged.

No implementation is authorized by this report. Recommendations and implementation passes below are ready for review.

## Ranked issues and proposed fixes

P1 means the first optimization passes; P2 follows after those pass review; P3 requires more profiling before implementation. These are engineering priorities, not promises of a particular Lighthouse score. Estimates from different Lighthouse insights overlap and must not be added together.

| Issue | Evidence | Affected metric | Proposed fix | Priority | Risk |
| --- | --- | --- | --- | --- | --- |
| Early analytics JavaScript adds blocking work | Fresh-visitor traces download both GTM (~158 KiB) and GA tag code (~198 KiB) before any consent interaction. The homepage primary trace attributes about 1.12 s total CPU to their two script URLs and includes a 650 ms GA task. [`app/layout.jsx:123`](../app/layout.jsx#L123) injects GTM `afterInteractive` without the explicit cookie gate used by the OpenAI pixel. | TBT, JS execution; possible interaction latency | Review the existing GTM tag/firing inventory, required conversion events, and consent behavior. Reduce redundant tag work if found and schedule noncritical work after critical rendering while retaining conversion attribution and correct consent semantics. Measure accepted, rejected and new-visitor states. Do not assume duplicate GTM installations: only one container loader and its GA dependency are confirmed here. | P1 | Medium/high: analytics and conversion attribution. Account configuration changes require separately authorized implementation. |
| Fonts and avoidable blocking stylesheet on every sampled page | Roughly 390 KiB transferred in five font requests. Two root Inter WOFF2 preloads add about 131 KiB, alongside service Geologica and two IBM Plex TTFs. The external Google Fonts stylesheet still loads although no `fonts.gstatic.com` font downloads occur in the sampled homepage trace. Homepage render-blocking insight estimates about 700 ms combined opportunity in the primary run; this is not wholly attributable to one file. [`app/layout.jsx:19`](../app/layout.jsx#L19), [`app/layout.jsx:104`](../app/layout.jsx#L104), [`serviceFonts.js:4`](../app/(site)/serviceFonts.js#L4). | FCP, LCP, bandwidth | Keep Service's existing local font identities. Scope the legacy Google stylesheet/preconnects away from Service after checking all service typography; audit actual Inter glyph use before changing its preloads. Test WOFF2 encoding/subsetting and preload only the weights actually needed immediately. Preserve Cyrillic/Latvian glyphs and Geologica variation axes. | P1 | Medium: global layout serves protected shells; incorrect subsetting or family mapping changes design/localization. No claim that `font-display` is missing: local fonts already use `swap`. |
| Price-page font-related layout instability | `/cenas` mobile records CLS 0.1901, with the hero contact `aside.RemainingPages_heroAside...` shifting; the trace lists loaded service fonts as possible causes. [`serviceFonts.js`](../app/(site)/serviceFonts.js) explicitly disables automatic fallback adjustment for both families. The footer's unsized logo is also listed by Lighthouse, but that does not prove it caused the above-fold panel shift. | CLS, LCP | Match fallback font metrics to the real families and reserve stable hero/aside geometry at the existing breakpoints. Reproduce with font load delays and inspect shift sources. Add intrinsic logo dimensions separately; verify that the visible panel shift is actually fixed. | P1 | Medium: careless fixed heights clip RU text or alter mobile layout. |
| Homepage service photography overwhelms transfer despite lazy attributes | `apple-ecosystem-v2.png` transfers 2,197,337 B and `android-phone-tablet-v2.png` 2,029,202 B in the LV mobile primary load (~4.03 MiB together). Desktop also loads `dyson-repair-wide.png` 2,585,614 B and `laptop-repair-wide.png` 2,250,516 B. [`HomeServices.jsx:26`](../app/(site)/HomeServices.jsx#L26) uses plain lazy images without responsive candidates. | Transfer, SI; potential network competition | Encode responsive WebP/AVIF variants of the same approved photographs with matching crops and `srcset`/`sizes` (or equivalent scoped image optimization). Keep dimensions, lazy loading and accessibility text. Validate crispness/gradients at real display DPR. | P1 | Low/medium: same assets and composition; exact compression benefit awaits visual quality acceptance. |
| Public generic-service pricing imports browser Firestore **and Auth** | Build: generic screen service ~252 kB First Load JS versus iPhone screen service ~147 kB. Production generic-mobile script transfer is ~770 KiB versus ~528 KiB on iPhone service, including Firebase's auth iframe script (~93 KiB), Firestore channels and project-config requests. [`components/BrandPickerPricelist.jsx:9`](../app/(site)/components/service-pricelist/BrandPickerPricelist.jsx#L9) → [`getServiceSelectorPricing.client.js`](../lib/pricing/getServiceSelectorPricing.client.js) → [`firebaseClient.js:32`](../lib/firebaseClient.js#L32) eagerly initializes Auth. This is not present in the shared homepage/layout chunk inventory. | JS transfer/execution, TBT, pricing readiness | Assess using the existing server-fed pricing pattern for generic services. Keep only the selected-brand/model controls client-side and preserve service-ID mapping, hidden/starting prices and fallback behavior. If any browser Firestore use remains, separate public data access from Auth initialization. Profile the startup URL replacement and repeated data loads. | P1 | Medium/high: pricing correctness and freshness. The ~105 kB build difference is an opportunity size, not guaranteed savings. Generic Lighthouse results are provisional. |
| Price selector downloads a large transient placeholder | `/cenas` downloads `/images/placeholders/phone.webp` (507,730 B, ~496 KiB), then `/images/devices/iphone/iphone-duo.webp` (398,112 B). Both `ServicePricelist` families use `unoptimized`; the server-fed family starts at `useState(PLACEHOLDER)` then replaces it in an effect. [`sections/ServicePricelist.jsx:188`](../app/(site)/sections/service-pricelist/ServicePricelist.jsx#L188). | Transfer, hydration/image readiness | Resolve the first selected image for initial rendering when known, retain a compact fallback only for missing/error assets, and provide a correctly sized preview. Preserve model selection and error fallback. This can avoid one ~496 KiB request on the measured price-page path before any image re-encoding benefit. | P1/P2 | Low/medium: selected-model synchronization and fallback handling. |
| Mobile text render delay; animation contribution unproven | All completed mobile primary samples identify hero text as LCP. The homepage observed trace has about 1.40 s element render delay; model/service/price traces about 1.88–2.22 s. [`ServiceMotion`](../app/(site)/ServiceMotion.jsx) starts in `useLayoutEffect`; [`serviceMotionRuntime.js:14`](../app/(site)/serviceMotionRuntime.js#L14) defaults to 900 ms animations. However, motion-off records LCP 5.78 s / TBT 1,524 ms versus the nearby control's 5.72 s / 1,511 ms, with similar CPU calibration. | LCP, FCP, SI | Prioritize font/render-path investigation. Retain the entrance, glow and scroll effects; only change animation scheduling if a more specific trace demonstrates a benefit. The single diagnostic does not support removing motion to solve loading. | P2 investigation | Medium if subsequently changed: appearance/timing and shared advertising consumers. No animation rewrite is justified by current results. |
| Dynamic route data work and large serialized catalog/price payloads | Sampled routes are dynamic. The iPhone hub had one observed TTFB of ~3.76 s; ordinary homepage/model/service starts are much faster. [`getPageCtaCatalog`](../lib/navigation/getPageCtaCatalog.js) rebuilds the full page/model mapping on every layout request and sends it to the provider. `/cenas` HTML decodes to ~925 KiB, versus homepage ~262 KiB; its server reader fetches the whole `servicePricing` collection and serializes pricing. Several model/service readers use uncached direct Firestore queries. | TTFB tails, HTML/RSC parse and hydration work | Instrument warm/cold server time and cache hits before broad changes. Consider request memoization of repeated model lookups, cached CTA mapping, smaller client props, and safe batched/cached public reads with explicit freshness/invalidation. Keep selected brand/model and LV/RU routing. | P2 | Medium/high: stale prices/content and locale leakage. Existing settings/reviews/catalog caches must be retained. The full CTA payload's exact byte contribution is not yet isolated. |
| Runtime geometric reads and per-word review work | Motion uses observers and passive scroll listeners with rAF scheduling already. It nevertheless reads hero/review rectangles, changes word opacity and animates scan-line `left`/accordion `height`. Homepage forced-reflow insight identifies about 29 ms at a top call plus several source locations; this is smaller than the measured loading/JS problems. [`serviceMotionRuntime.js:232`](../app/(site)/serviceMotionRuntime.js#L232). | Scroll smoothness, layout/paint; possible interaction latency | Profile a representative scroll and expanded reviews/FAQ on a real midrange phone, then batch reads/writes, stop offscreen work, use compositor transforms for decorative movement, and preserve keyboard/reduced-motion behavior. Keep static neon shadows unless traces specifically implicate them. | P2/P3 | Medium: motion quality and focus/accordion behavior. No measured field INP or proven neon-shadow bottleneck. |
| Locator asset remains large on first use | Locator content is already deferred. Its Service branch uses the same static `/images/home/map-riga-branches.png` (1,312,431 B locally), with functional buttons over the image. [`LocatorPanel.jsx:33`](../app/(site)/ui/panels/LocatorPanel.jsx#L33). No Leaflet/tile-map dependency was found in this path. | First-open drawer/image readiness | Keep on-demand mounting; encode a drawer-sized map variant while preserving the coordinate system and pin hit targets. Measure first open on throttled mobile before changing preload behavior. | P2 | Low/medium: map alignment and pin accessibility. This is not a confirmed initial-homepage bottleneck. |

## Homepage-specific assessment

The hero photograph is already WebP (~83.5 KiB body), has explicit dimensions, `fetchPriority="high"`, and receives a high-priority/preloaded network request. Its quality should not be sacrificed as the first mobile fix: mobile's measured LCP is the second heading line, not the photo. The plain `<img>` still lacks responsive variants, but the large service PNGs are a much larger transfer opportunity. A Lighthouse image-delivery hint on the hero estimates only about 23 KiB in the first exploratory trace; that is secondary.

The LV homepage primary load transfers ~5.14 MiB on mobile and ~9.76 MiB on desktop. Lazy loading is proximity-based, so below-fold assets can be requested without scrolling; the two first service photographs actually start during this load. Do not equate a `loading="lazy"` attribute with zero initial network cost. RU's different text geometry changes which lazy assets fall within the fetch distance.

The shared typography/animation/script path is therefore relevant to mobile LCP and TBT, while same-image responsive encoding addresses homepage bandwidth and visual completion. Current local review snapshots and location tabs should stay functional. No evidence supports replacing ratings, removing the CTA Dock, deleting neon glow, or stripping all scroll effects.

## Diagnostic interpretation and browser validation

- Three homepage mobile baseline runs: score median **49** (46–52), LCP median **5.55 s** (5.50–5.72), TBT median **1,511 ms** (1,014–2,644), CLS **0**. Desktop score median **77** (77–94), LCP **1.06–1.53 s**, TBT **71–306 ms**. CPU warnings and browser lifecycle differences limit precise score comparisons.
- In the nearby control/no-motion comparison (CPU benchmark indices 1,597.5 / 1,541.5), LCP is **5.72 / 5.78 s** and TBT **1,511 / 1,524 ms**. This does **not** establish motion as the main loading bottleneck. Keep the approved effects.
- Browser-blocking GTM/GA reduces the diagnostic script transfer from about **519 to 162 KiB** and TBT to **485 ms** (score 64, LCP **5.43 s**). Against the nearby control that is roughly 1.03 s less TBT in this single experiment, with a different but unflagged CPU calibration index of 1,256.5. This supports prioritizing analytics work; it is not a forecast for preserving all tracking behavior in production. LCP remains poor.
- `/cenas` CLS is **0.1901, 0.1901, 0** across three mobile tests: an intermittent problem. The affected node is the hero contact aside. The separate unthrottled browser pass had no large shift; that does not cancel the throttled evidence.
- The iPhone hub's observed TTFB changes from **3.76 s** to **0.242 s** and **0.242 s** in repeats. This is a tail/cold-path observation, not evidence of consistently slow Firestore on every request. Text paint and TBT still need work on its warm responses.
- Local optimized homepage scores are **71 mobile / 90 desktop**. The mobile localhost run has an unfinished GTM request (status -1, 0 bytes), and does not load GA; desktop loads the tags. The mobile local score therefore combines different analytics completion with localhost/network effects and must **not** be presented as a server-only improvement or production score.
- Five production browser views (homepage mobile/desktop, prices mobile, RU iPhone service mobile, generic phone service mobile) returned HTTP 200, had no captured page exceptions and no document horizontal overflow. These are unthrottled functional observations, separate from Lighthouse's simulated values. The generic page remained browsable despite its Lighthouse collector failures.
- Focused checks confirm booking opens with real inputs, Escape closes it after its exit transition, and focus returns to the opener. The deferred locator image finishes loading (3,000 px intrinsic width, 364 px displayed in the mobile drawer), and pin selection reaches the contact pane. Price-brand keyboard activation changes `iPhone` to `iPad`, with URL `https://ilab.lv/cenas?brand=ipad`. No form was submitted. An earlier immediate-after-Escape DOM count occurred before the closing transition completed; it is not a drawer-close defect. An early price click observation was inconclusive and was replaced by the state/URL-confirmed check.
- The FontFaceSet snapshot on all five views shows the active service sans family and 400-weight service mono loaded, while the Inter faces, remote Geologica/IBM Plex faces and the 500 service mono face remain `unloaded` at that capture. Combined with the font network requests, this supports auditing unused initial preloads without asserting that those fonts are unused on every route/state.
- Mobile (412 × 823) and desktop (1350 × 940) homepage captures were visually inspected for the existing hero, signature neon heading, navigation, consent UI and Dock. This is representative baseline review, not a new design approval or comprehensive accessibility audit. Snapshots and browser evidence are in the same temporary measurement directory.

## Shared loading paths and network evidence

The raw Lighthouse `network-requests` audit contains per-request start/end, priority, resource type, transfer size and status for the waterfall. The most relevant chains are:

1. Document → emitted CSS/font preloads + external Google stylesheet → local font availability → server heading + hydration-started entrance → text LCP.
2. Document → Next/React client chunks → GTM `afterInteractive` → GA tag code → large script tasks. `afterInteractive` does not mean after critical rendering has finished.
3. Generic phone service → browser selector → Firebase app/Firestore/**Auth** → iframe/config/channel requests → price population; the default brand is also written to the URL on startup.
4. `/cenas` HTML/selector → temporary phone placeholder → effect-selected device image, causing two expensive preview requests.
5. Dialog trigger → dynamic drawer content → locator image or booking form. This deferred path must remain deferred.

Homepage observed mobile resource timings illustrate the bandwidth competition: the Apple and Android service images start at about 1.49 s, while GTM/GA scripts and font requests occupy the same loading period. Price-page placeholder starts about 1.90 s and completes at 2.60 s; the selected image starts about 2.63 s and finishes at 3.07 s. These are trace timings, not simulated metric components.

The first-party React/Next chunk also appears prominently in execution attribution. That does not prove a particular component should be removed. Component-level hydration profiling and serialization measurement are needed before narrowing the shared provider or desktop navigation. Source presence of `react-icons`, `firebase`, or drag/drop packages alone is not evidence that all of them ship on every public route; no such claim is made.

## Proposed optimization passes

1. **Critical rendering and stable geometry.** Scope the redundant font-loading path away from Service, evaluate local font encoding/preloads and fallback metrics, and reproduce/fix price hero movement. Profile text paint without changing the approved entrance/glow; motion-off did not improve these metrics. Take matched screenshots and compare the actual LCP node/timeline before and after.
2. **Same-visual image delivery.** Add responsive compressed variants of the large homepage service photos; avoid the transient price placeholder and size preview/model images; retain the hero appearance and correct loading priorities. Compare network bytes and image quality on LV/RU mobile/desktop. Locator image improvements can accompany this pass without preloading the drawer.
3. **Initial JavaScript and public data boundaries.** Review analytics scheduling/firing with the site's conversion requirements. Adapt generic-service pricing to the existing server-fed approach if correctness/freshness can be preserved; eliminate incidental Auth from public reads. Measure client bundle/network/CPU changes and inspect startup brand replacement. Narrow CTA props only after quantifying their contribution.
4. **Targeted server/runtime work.** Investigate TTFB tails and duplicate direct reads with cache-hit timing; make only justified caching/memoization changes. Profile scroll, review toggles and FAQ expansion, then batch any expensive reads/writes while preserving the approved motion.
5. **Validation and field follow-up.** Repeat matched production-build lab tests, then repeat production only after separately authorized deployment. Obtain Search Console/CrUX mobile/desktop p75 LCP/INP/CLS or approved RUM. Compare like-for-like routes and consent states; keep field measurements separate from lab scores.

Expected benefits are faster text paint, fewer blocking tasks, lower image/font transfer, earlier price readiness and stable price-page layout. Only the directly counted bytes and diagnostic measurements are quantified here. No combined point increase, LCP reduction, or actual INP improvement is guaranteed before implementation and matched validation.

## Validation contract and remaining measurements

Before any optimization is accepted:

- Repeat at least three key mobile samples on a quiet, stable host with the same Lighthouse/Chrome, presets, consent state and server-cache assumptions. Report median/range plus warnings. The current host's CPU variability limits precise comparisons; calibrate CPU emulation for the target device before asserting absolute CPU savings. [Lighthouse scoring documentation](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) explains run variability and the LCP/TBT score weighting.
- Reproduce the generic-service route's default-brand startup and obtain a complete trace on a stable explicit-brand URL. Treat its timeout/protocol-error samples as provisional, including their long execution totals.
- Verify all six principal page types in LV/RU, including price/model query links, real price variants, model/brand switching, missing-price/error states, and public price freshness/invalidation. Broader RU hub/model/price performance is still unmeasured.
- Exercise header/mobile navigation, sticky Dock contact/booking/prices, first drawer open, Escape/focus return, form validation, locations/pins/hours, reviews pagination/expansion and FAQ. Never submit a real booking for this audit. Measure first-open drawer readiness and runtime scroll/interaction traces on a representative phone; neither TBT nor a scripted click is field INP.
- Compare new/rejected/accepted consent. The source gates OpenAI pixel initialization on accepted consent; the initial no-consent trace does not measure that pixel's accepted-state cost. Preserve analytics/conversion behavior; inspect tags before revising scheduling.
- Check approved hero crops, original neon text shadows, interactive treatments, readable delayed-font fallbacks, LV/RU line wrapping and reduced motion. Future major visual changes warrant representative browser checks and final five-width validation; this audit does not assert design parity from numeric metrics.
- Retain route metadata, canonicals/hreflang, JSON-LD, accessibility names/keyboard behavior and protected advertising behavior. Run focused functional/pricing tests and lint for changes; use the production build at the implementation milestone. No full test/lint suite is claimed for this documentation-only audit.
- Instrument server/cache timing and payload sizes before broad architecture changes. The root `headers()` usage, full CTA mapping and large price serialization are verified source facts; the exact per-function CPU/latency savings remain unmeasured.

The generated optimized build and route table are in `build-network.log`, and the server reached `Ready` on port 3100. The first sandbox build could not read Firebase and was stopped. The network-enabled build completed static generation, optimization/tracing and the route table; PowerShell returned wrapper exit 1 after treating a webpack/Sass stderr warning as `NativeCommandError`. Successful production serving verifies the generated artifact, but this is not represented as a clean CI build exit. No warning remediation was attempted under the audit-only restriction.

## Follow-up: authorized Pass 1 implementation

The separately authorized [Pass 1 implementation report](MAIN_WEBSITE_PERFORMANCE_PASS1_2026-11-19.md) records scoped font delivery and price-layout changes, repeated isolated local production-build measurements, LV/RU/protected rendering checks, and validation. Matched font transfer falls 18.7%, first paint improves, and price-page mobile CLS falls from a 0.19008 median to zero. Homepage mobile LCP remains unresolved: its local simulated median worsens, with overlapping wide ranges. No production deployment was performed. The original audit measurements above remain historical production context and were not overwritten.
