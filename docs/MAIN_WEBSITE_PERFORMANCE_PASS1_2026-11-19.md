# Performance Pass 1: fonts, critical rendering and price layout

19 November 2026. Baseline source: `ba0c2b1`; implementation is uncommitted on `feature/landing-v3`.

Service font transfer falls **256,358 → 208,474 bytes (−47,884; −18.7%)** in every matched sample. First Contentful Paint improves across the sampled routes. `/cenas` mobile Lighthouse CLS falls from a **0.19008 median to 0**, and repeated delayed-font checks confirm the contact panel stays in place in LV/RU.

**Homepage mobile LCP is unresolved.** Its simulated median worsens **4.03 → 10.60 s**, with overlapping wide ranges; prices mobile LCP also rises **2.92 → 3.58 s**. These results do not establish a homepage LCP improvement or readiness to meet production CWV. The font/fallback diagnostic below investigates this explicitly. No animation scheduling, neon treatment, analytics, data architecture, images or protected landing source was changed. Nothing was committed, pushed or deployed.

## Implementation and boundaries

| Files | Change |
| --- | --- |
| `app/layout.jsx`, `app/_components/fonts/LegacyFontLinks.jsx`, `LegacyFontResources.jsx`, `lib/presentation/serviceTypographyRoutes.mjs`, `middleware.js` | Omit the legacy Google stylesheet and its two preconnects on Service. Preserve the original links for advertising/legacy shells, including client navigation, preview queries and the advertising host. Middleware adds presentation metadata without changing routing decisions. |
| `app/(site)/layout.jsx`, `ServiceFontResources.jsx`, `ServiceFontResources.module.scss`, `public/fonts/service/*` | Service-only WOFF2 faces, early Geologica/regular Plex preloads, on-demand medium Plex, and calibrated local fallback metrics. Dialog portals receive the same font scope. |
| `app/_components/sections/service-recovery/RemainingPages.module.scss` | Price-hero width limits use equivalent `em` measures so fallback glyph widths cannot change the container measure. |
| `next.config.mjs` | Immutable caching only for the three content-hashed font URLs; optional `ILAB_BUILD_DIR` isolates profiling builds from the running development server. Normal builds still use `.next`. |
| `tests/serviceTypographyRoutes.test.mjs` | Guard the typography boundary for main LV/RU pages and protected shells. |

The existing `app/(site)/serviceFonts.js` and original TTFs remain unchanged for AdsV2/AdsV3. Root Inter remains unchanged because it belongs to the shared legacy shell; its **48,732-byte** request remains in these local samples. A broader Inter ownership/preload change needs separate consumer coverage. The measured saving here does not include removing it.

## Font delivery and preservation

The Google stylesheet was redundant on the sampled Service views: its Geologica/Plex faces remained unloaded while the local Service faces rendered the text. It and both Google connection hints are absent on Service after the change. The identical stylesheet URL and hints remain on protected routes. The baseline homepage stylesheet transferred 1,341 bytes and took about 270 ms in the observed request; the RU primary request's render-blocking insight reported 909 ms duration. These are resource diagnostics, not additive predicted LCP savings.

The optimized faces retain `font-display: swap`, the original weight mappings and all glyphs. No subsetting or axis instancing was applied to the shipped fonts.

| Font | Original TTF bytes | WOFF2 bytes | Preservation |
| --- | ---: | ---: | --- |
| Geologica | 348,640 | 119,964 | 973 glyphs; `wght` 100–900, `CRSV` 0–1, `SHRP` 0–100, `slnt` −12–0 |
| IBM Plex Mono regular | 135,580 | 39,176 | 1,033 glyphs, weight 400 |
| IBM Plex Mono medium | 136,704 | 40,080 | 1,033 glyphs, weight 500 |

Round-trip checks compare cmap, glyph order, advances, outlines, hint bytecode, variation axes and shaping/variation tables. Font names and hint tables are preserved; final SHA-256 hashes match the validated outputs. Original OFL notices accompany the new assets. Geologica and regular Plex preload before layout data awaits; medium Plex is available through CSS and was successfully loaded at weight 500 in the browser check. Hashed URLs return `public, max-age=31536000, immutable`, and served bytes match the local assets.

TTFs are compressed by the local server, so file-size reduction is larger than network-transfer reduction. The matched build emits three initial font requests before and after: Inter plus the two active Service faces. Production's historical approximately 390 KiB/five-request observation is a different deployment/delivery baseline and is not used to calculate this pass's saving.

FontTools 4.68.0/Brotli were used in a task-local temporary directory for lossless encoding and verification. Those tool packages/cache were removed. Project dependencies and lockfiles are unchanged.

## Demonstrated price-page cause and fix

At 412 px, delayed fonts changed the LV H1 from one fallback line to two Geologica lines: **69.19 → 119.94 px**. The contact aside moved **600.14 → 650.89 px**. In RU the H1 already had two lines, but the lead grew **116 → 145 px**, moving the aside **650.89 → 679.89 px**. The aside's intrinsic height stayed constant. Images and dynamic price data did not cause this recorded panel movement.

Arial-based fallback metrics match the existing sans family more closely. The five-width experiment also found that `12ch`/`54ch` container limits changed with the fallback's zero-glyph width. Price-only equivalents of **8.196em / 36.693em** retain the loaded Geologica layout while keeping the container measure stable during font loading. Heights, overflow, typography sizes, tracking, line heights and hero animation were not altered.

| Delayed-font test | Before, three runs | After, three runs |
| --- | ---: | ---: |
| LV prices, recorded shift sum | 0.190080 each | 0.000016 each |
| RU prices, recorded shift sum | 0.019190 each | 0.000575–0.000579 |
| LV aside Y before/after font swap | 600.14 → 650.89 px | 650.89 → 650.89 px |
| RU aside Y before/after font swap | 650.89 → 679.89 px | 679.89 → 679.89 px |

Tests use 2.5 s artificial font-request delays and 4× CPU. Implemented-CSS checks at **375, 412, 768, 1024 and 1350 px** retain the panel's vertical geometry in both locales. Total residual shifts range **0–0.00248**; the largest source is small horizontal text/control-width adjustment, not the former panel jump. These browser observer sums are separate from Lighthouse CLS and field CWV.

Step B alone still produced a **0.19099** delayed-font shift. Fallback metrics alone fixed the narrow price layout but left a **0.18539** tablet event from the `ch` limit. The combined source fix was retained only after those controlled tests and the final repeated checks.

## Measurement method and intermediate steps

Lighthouse **12.8.2**, installed Chrome **157**, serial fresh-browser runs, same audit presets: mobile 412 × 823, DPR 1.75, simulated 150 ms RTT / 1,638.4 Kbps / 4× CPU; desktop 1350 × 940, DPR 1, 40 ms / 10,240 Kbps / 1× CPU. All headline results below use `next start` on localhost, fresh storage and no recorded consent. Tracking remains enabled. Live public-data/server cache state and host CPU are not fully controlled.

Early local runs shared `.next` with an existing development server and were discarded after manifest corruption was identified. The unchanged-source baseline, A, B and final build were repeated using the isolated output directory. The development server was left running. Acceptance evidence uses only the `*-isolated` folders; the original production audit evidence was preserved.

CPU benchmark indices range **704–1,584.5 before / 900–1,650.5 after**. Slow-host warnings occur on baseline home run 2 and prices runs 1/2; after home run 1 and iPhone run 1. Intermediate A prices is also flagged (index 919.5). This is not a quiet, calibrated target-phone certification. Score/TBT deltas cannot be assigned wholly to fonts; GTM/GA completion and server/network timing vary. Lighthouse headline FCP/LCP are simulated; element/breakdown timings describe the observed trace and must remain separate.

| Intermediate single mobile sample | Score | FCP s | LCP s | TBT ms | CLS | Font bytes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A: home | 58 | 1.92 | 3.72 | 1,935 | 0.00004 | 256,358 |
| A: prices | 52 | 1.77 | 2.89 | 1,597 | 0.19008 | 256,358 |
| B: home | 56 | 1.92 | 4.08 | 1,893 | 0 | 208,474 |
| B: prices | 53 | 1.79 | 3.67 | 2,326 | 0.00002 | 208,474 |

These intermediate samples establish resource behavior and guide diagnosis; they are not repeated effect estimates.

## Matched final results

### LV homepage — mobile

3 before / 3 after samples. Values are medians; brackets show min–max. Difference compares medians.

| Metric | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Performance | 48 [36–56] | 52 [45–57] | +4 |
| FCP (s) | 2.56 [2.37–3.59] | 1.90 [1.89–1.92] | -0.66 |
| LCP (s) | 4.03 [3.95–11.86] | 10.60 [4.51–11.70] | +6.57 |
| TBT (ms) | 1666 [1625–1967] | 1254 [680–1334] | -413 |
| CLS | 0.00004 [0.00000–0.00004] | 0.00000 | -0.00004 |
| Fonts (KiB) | 250.35 | 203.59 | -46.76 |

### RU homepage — mobile

3 before / 3 after samples. Values are medians; brackets show min–max. Difference compares medians.

| Metric | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Performance | 37 [36–40] | 46 [44–46] | +9 |
| FCP (s) | 3.28 [3.14–3.29] | 1.89 [1.88–1.89] | -1.39 |
| LCP (s) | 11.22 [10.95–11.43] | 10.91 [10.74–10.97] | -0.31 |
| TBT (ms) | 1707 [1247–2120] | 1196 [1151–1482] | -511 |
| CLS | 0.00000 | 0.00000 | 0.00000 |
| Fonts (KiB) | 250.35 | 203.59 | -46.76 |

### iPhone hub — mobile

3 before / 3 after samples. Values are medians; brackets show min–max. Difference compares medians.

| Metric | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Performance | 35 [34–45] | 42 [42–43] | +7 |
| FCP (s) | 3.42 [3.27–3.44] | 2.05 [2.03–2.05] | -1.38 |
| LCP (s) | 10.69 [5.97–11.39] | 10.72 [10.39–10.76] | +0.03 |
| TBT (ms) | 2195 [1508–2502] | 1698 [1640–1801] | -497 |
| CLS | 0.00033 [0.00032–0.00037] | 0.00033 [0.00033–0.00033] | 0.00000 |
| Fonts (KiB) | 250.35 | 203.59 | -46.76 |

### iPhone 12 — mobile

3 before / 3 after samples. Values are medians; brackets show min–max. Difference compares medians.

| Metric | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Performance | 42 [42–50] | 53 [51–53] | +11 |
| FCP (s) | 3.26 [2.23–3.27] | 1.88 [1.88–1.88] | -1.38 |
| LCP (s) | 6.33 [4.88–6.34] | 6.01 [6.00–6.02] | -0.32 |
| TBT (ms) | 1950 [1737–2454] | 1133 [1101–1157] | -818 |
| CLS | 0.00155 [0.00155–0.00181] | 0.00000 | -0.00155 |
| Fonts (KiB) | 250.35 | 203.59 | -46.76 |

### LV prices — mobile

3 before / 3 after samples. Values are medians; brackets show min–max. Difference compares medians.

| Metric | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Performance | 51 [47–61] | 65 [60–67] | +14 |
| FCP (s) | 2.34 [2.27–2.44] | 1.77 [1.74–1.79] | -0.57 |
| LCP (s) | 2.92 [2.91–3.35] | 3.58 [2.91–3.92] | +0.67 |
| TBT (ms) | 2043 [1551–2317] | 1288 [1006–1381] | -755 |
| CLS | 0.19008 [0.00002–0.19099] | 0.00000 | -0.19008 |
| Fonts (KiB) | 250.35 | 203.59 | -46.76 |

### RU prices — mobile

1 before / 1 after sample. Values are medians; brackets show min–max. Difference compares medians.

| Metric | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Performance | 52 | 64 | +12 |
| FCP (s) | 3.27 | 1.75 | -1.52 |
| LCP (s) | 4.55 | 3.90 | -0.65 |
| TBT (ms) | 1122 | 1028 | -94 |
| CLS | 0.01815 | 0.00000 | -0.01815 |
| Fonts (KiB) | 250.35 | 203.59 | -46.76 |

### LV homepage — desktop

1 before / 1 after sample. Values are medians; brackets show min–max. Difference compares medians.

| Metric | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Performance | 91 | 93 | +2 |
| FCP (s) | 0.88 | 0.54 | -0.34 |
| LCP (s) | 1.28 | 1.14 | -0.14 |
| TBT (ms) | 169 | 167 | -3 |
| CLS | 0.00348 | 0.00057 | -0.00291 |
| Fonts (KiB) | 250.35 | 203.59 | -46.76 |

### LV prices — desktop

1 before / 1 after sample. Values are medians; brackets show min–max. Difference compares medians.

| Metric | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Performance | 85 | 94 | +9 |
| FCP (s) | 0.83 | 0.53 | -0.30 |
| LCP (s) | 1.15 | 1.01 | -0.14 |
| TBT (ms) | 241 | 141 | -100 |
| CLS | 0.00308 | 0.00000 | -0.00308 |
| Fonts (KiB) | 250.35 | 203.59 | -46.76 |



## LCP and main-thread interpretation

Mobile LCP remains hero text: LV home `remonts Rīgā.`, RU home `Ремонт телефонов`, iPhone hub H1, model H1, and price H1. Desktop homepage LCP remains the approved hero image. The fonts use the same outlines and the existing entrance/glow/scroll scheduling is unchanged.

Homepage mobile LCP ranges **3.95–11.86 s before / 4.51–11.70 s after**. The worse final median must not be hidden behind the higher score or lower FCP. Model/RU home LCP medians improve slightly, iPhone hub is effectively unchanged, and LV prices' median worsens. This pass verifies faster first paint, fewer font bytes and stable price geometry; it does not resolve mobile LCP.

A separate current-build experiment alternated three browser-only fallback variants, three fresh Chrome runs each, with **applied** 150 ms / 1,638.4 Kbps network throttling and 4× CPU. The observed homepage LCP node remained `remonts Rīgā.` and fonts finished loading in every sample. These are browser observations, not Lighthouse's simulated values or a new original-source baseline.

| Fallback variant | Observed LCP median s [range] |
| --- | ---: |
| Implemented metric fallback | 2.52 [2.42–2.60] |
| Original system fallback stack forced in the browser | 2.25 [2.12–3.02] |
| Metric fallback with explicit fallback-face `font-display: swap` | 3.04 [2.54–3.08] |

The ranges overlap; removing the metric fallback did not reproduce the multi-second Lighthouse delta. This does not establish a homepage LCP benefit or rule out smaller effects. The combined fix is retained for its demonstrated price stability and font/first-paint savings. No speculative animation or font-display rewrite was applied.

Trace-wide homepage main-thread and parse/evaluation totals are retained in each `summary.json`. They span the recorded trace, can differ in recording length, and are not TBT or field INP. Unchanged analytics and first-party hydration continue to contribute long tasks. No motion rewrite or analytics scheduling change is justified by this pass's evidence.

| Mobile diagnostic, median ms | Main thread before → after | JS parse/evaluation before → after |
| --- | ---: | ---: |
| LV home | 10,045 → 8,858 | 2,842 → 2,296 |
| LV prices | 11,786 → 9,790 | 4,077 → 2,651 |

CPU calibration and tag execution vary, so these trace-total changes are not isolated font CPU savings.

## Validation and remaining work

- **162/162 tests pass**, including the new typography ownership guards and existing pricing/navigation/booking safeguards. Focused JSX lint passes with zero warnings. Final production build exits **0**, with existing Sass deprecation warnings; the isolated server reaches Ready. `git diff --check` passes.
- Seven Service views at mobile/desktop cover LV/RU home, iPhone hub/model/screen service, and LV/RU prices. Five protected views at both widths cover the original preview, AdsV2, AdsV3 and both legacy iPhone landings. All **24 before/after comparisons** pass for final typography settings, heading/lead/aside geometry within 1 CSS px, metadata, JSON-LD, HTTP 200, no page exceptions and no document overflow. Representative screenshot pairs were visually inspected for neon, wrapping, crop, CTA and navigation placement. Price pages also pass final five-width delayed-font checks.
- Real client navigation removes/restores legacy links correctly. Direct HTTP testing of `riga.ilab.lv` preserves its legacy stylesheet and excludes the new Service preload. Service routes retain no Google font links. All three font asset/cache checks pass.
- Non-submitting browser checks pass for booking open/Escape/focus return, deferred locator image/pin/contact, mobile navigation open/Escape/focus return, keyboard price-brand change to `?brand=ipad`, LV/RU glyph/400–500 mono loading and visible reduced-motion headings. An initial harness check opened navigation before the locator exit transition finished; awaiting the transition resolves it. A Host assertion was corrected to use direct HTTP because fetch normalized Host.
- Visual checks use Windows Chrome. Font data preservation is verified, but physical Android/iOS rendering, field p75 LCP/INP/CLS and accepted-consent performance were not measured. No claim of passing field CWV is made.

Pass 2 remains the approved same-photo responsive image work, including the large homepage service photographs and transient price preview, with visual quality checks. Analytics/initial JavaScript and public-data work remain separate subsequent passes. Mobile LCP still needs controlled tracing on a stable host/representative device and matched production checks after separately authorized deployment. Retain the original motion and neon treatments.

Raw runs, scripts, screenshots, font validation and build logs: [`tmp/perf-pass1-2026-11-19/`](../tmp/perf-pass1-2026-11-19/README.md). The [original performance audit](MAIN_WEBSITE_PERFORMANCE_AUDIT_2026-11-19.md) remains the production context. Next configuration references: [response headers](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/headers), [distDir](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/distDir).
