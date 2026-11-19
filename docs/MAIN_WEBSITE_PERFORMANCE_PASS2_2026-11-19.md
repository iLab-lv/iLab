# Performance Pass 2: readable headlines and Service layout reads

19 November 2026. Comparison baseline: deployed main `f929b5a2bf4e84c3a27f9d2237dc899a1f3080b6` (Pass 1 + Pass 1B). Implementation remains in the existing working tree. No staging, commit, push, merge or deployment is authorized or performed in this pass.

**The candidate improves measured homepage headline presentation and reduces motion-related forced layout.** Local observed LCP medians fall **3.31 → 1.09 s LV / 3.23 → 2.33 s RU**; interaction forced-style/layout median falls **189.9 → 49.9 ms**. **The iPhone hub's simulated LCP regression remains unresolved, and this unstable host cannot certify a general performance win.** The changes are ready for review, with deployment held for that review and the remaining performance gate.

## Changes and visual tradeoff

The Service H1 now stays opaque throughout its entrance and moves upward from a **16 px offset**, retaining the original 900 ms easing and homepage's 80 ms second-line stagger. Server CSS still owns first presentation; hydration cannot restart a hidden H1. Typography, neon, final geometry and composition remain unchanged. This intentionally replaces the previous invisible-to-visible, full-height rise with a smaller readable movement.

Controlled browser experiments compared the deployed fade, an opaque full-height rise and the selected opaque 16 px rise: three fresh profiles per variant and locale, applied network/CPU throttling and normal analytics. The selected variant's observed LCP medians were **3.076 s LV / 2.956 s RU**, versus **3.692 / 4.060 s** for the fade. Its post-FCP headline tail was zero versus approximately one second. These proxy experiments are separate from direct production-build Lighthouse measurements. Filmstrips showed full-height opaque text overlapping the RU lead; that variant was rejected. The selected smaller rise remained readable without that overlap.

Service motion now snapshots entrance geometry and viewport dimensions before creating animations or inserting scan lines. Each scroll frame reads hero/review/counter geometry and relevant in-flight word opacity before writing styles, datasets or counter text. Snapshots are refreshed per frame; reversal, pagination and cleanup retain their behavior. The adapter explicitly opts in. Advertising profiles keep their existing path.

| File | Responsibility |
|---|---|
| `app/(site)/HeadlineEntrance.module.scss` | Opaque, small-offset Service H1 entrance. |
| `app/(site)/ServiceMotion.jsx` | Enables batching only for Service. |
| `app/(site)/serviceMotionRuntime.js` | Batches the demonstrated initialization/frame reads. |
| `tests/serviceMotionLayout.test.mjs` | Read-before-write ordering, viewport accessors, reversal, pagination, teardown and advertising isolation. |

## Production diagnosis

Three fresh homepage Lighthouse runs on `https://ilab.lv/` recorded scores **52–53**, simulated LCP **4.661–6.210 s** and observed trace LCP **2.326–2.528 s**. The mobile LCP node was the `remonts Rīgā.` span. Observed TTFB was **0.189–0.213 s**; element render delay **2.137–2.329 s**. There is no image load-delay/duration component for this text candidate. These timings must not be combined with simulated LCP into one breakdown.

The source-table forced-reflow totals were **205.085 / 61.451 / 42.772 ms**. In the first run, **150.346 ms** was unattributed; the motion runtime accounted for approximately **41 ms**. The nested “Top function call” table is not added again. The source locations resolve to:

| Path | Trigger and source |
|---|---|
| Initial entrances | `reveal()` reads `getBoundingClientRect()` after earlier WAAPI creation. |
| Initial scan panels | Appending a scan-line child / creating its animation precedes another panel rectangle read. |
| Scroll update | Hero transform writes precede review/counter geometry reads. |
| Review focus | Dataset/animation writes interleave with per-word `getComputedStyle()` reads. |
| Native viewport access | `innerHeight` / `scrollY` can flush pending layout too; these must be captured before writes. |
| Remaining paths | Review truncation height checks, responsive navigation measurements, navigation rulers, React scheduling and unattributed browser work remain. |

Exact deployed chunk locations, nearby source, full diagnostic panels, traces and instrumented call stacks are retained in the [evidence directory](../tmp/perf-pass2-2026-11-19/README.md). Stack instrumentation is attribution evidence, not a performance benchmark. Initial-load Lighthouse traces and scripted interaction traces are reported separately.

An initial batching prototype missed native viewport getters. Its complete measurements are retained in `matched/` as preliminary evidence, excluded from final acceptance. The test harness was corrected to model getters, and the candidate was rebuilt before final measurement. Batching follows the browser guidance to [read geometry before writing styles](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing); it does not promise zero browser layout work.

## Critical network dependencies

The production dependency-tree longest chains ended in CSS at **1.098–1.264 s**. Render-blocking estimates were **0–100 ms** in these runs. Service fonts remain the Pass 1 WOFF2 assets; the shared Inter preload remains because ownership across protected consumers has not been established as safely removable. No additional preload, CSS delivery or font change is retained.

The document discovers CSS and font preloads; CSS makes the server H1 paintable. First-party React/Next and Service chunks hydrate the page. GTM loads GA asynchronously and contributes CPU/network contention; it need not appear on the CSS critical chain to affect loading or Lighthouse simulation. Large lazy service images can also start near the viewport and compete for bandwidth. Their delivery remains unchanged in this rendering pass. A dependency graph alone does not prove every request on the simulated path is required for reading text.

GTM injection, scheduling, consent, events and configuration are unchanged. Final comparisons use normal analytics. No Firebase data/schema, pricing implementation, dependency, image, protected landing or Shop change is included.

## Matched build results

A is the deployed-source production build; C is this candidate. Three serial fresh-Chrome samples per build/page, alternating order, normal GTM/GA, fresh consent state and warmed route caches. Lighthouse 12.8.2 / Chrome 157. Mobile: 412 × 823, DPR 1.75, simulated 150 ms RTT / 1,638.4 Kbps / 4× CPU. Desktop: 1350 × 940, DPR 1, 40 ms / 10,240 Kbps / 1× CPU. Both builds use localhost and the same existing dependencies/environment; no production score is pooled with these results.

**A stable quiet host was not achieved:** all 30 quiet gates failed; final preflight CPU utilization was approximately **31–87%**. Calibration indices ranged **825–1,613.5**. Native slow-host warnings occurred on `A-ru-3`, `A-iphone-3`, `C-iphone-3` and `C-prices-3`; those samples remain included. No concurrent task build or second browser collector ran during this final series. Variations in host CPU, analytics completion and live server data/cache timing prevent attributing every delta to these changes.

Values below are **median [minimum–maximum]**. FCP and simulated LCP are Lighthouse model outputs. Observed LCP and its breakdown describe the recorded browser trace. Forced reflow means the source-table sum over the recorded load trace, not TBT, field INP or the interaction measurement.

| Page / build | Score | FCP s | Observed LCP s | Simulated LCP s | TBT ms | CLS | Forced reflow ms | Critical chain s |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| lv A | 49 [43–49] | 1.90 [1.88–1.90] | 3.31 [3.28–3.34] | 11.65 [11.48–11.91] | 911 [901–1551] | 0.00000 [0.00000–0.00000] | 52.62 [0.00–99.56] | 3.36 [3.35–3.41] |
| lv C | 54 [45–57] | 1.90 [1.88–1.98] | 1.09 [1.00–2.37] | 4.76 [4.51–11.35] | 1354 [1182–1669] | 0.00000 [0.00000–0.00000] | 0.00 [0.00–43.16] | 2.53 [2.30–3.37] |
| ru A | 45 [44–51] | 1.91 [1.89–1.93] | 3.23 [1.95–3.36] | 10.62 [5.03–10.76] | 1360 [1261–2052] | 0.00000 [0.00000–0.00000] | 38.04 [0.00–336.71] | 3.31 [2.74–3.46] |
| ru C | 49 [45–55] | 1.92 [1.92–1.94] | 2.33 [0.92–2.45] | 7.19 [4.75–10.63] | 1516 [931–1570] | 0.00000 [0.00000–0.00000] | 42.86 [30.90–312.25] | 3.31 [2.17–3.55] |
| iphone A | 44 [43–50] | 2.04 [2.04–2.08] | 2.69 [1.87–3.31] | 5.98 [5.97–10.55] | 1572 [1561–3359] | 0.00033 [0.00033–0.00033] | 374.96 [77.02–439.03] | 3.38 [2.25–3.41] |
| iphone C | 43 [41–45] | 2.22 [2.03–2.64] | 2.44 [2.43–2.54] | 9.59 [5.50–10.62] | 1482 [1401–2409] | 0.00033 [0.00033–0.00033] | 30.50 [0.00–31.61] | 3.40 [3.02–3.53] |
| prices A | 56 [49–57] | 1.75 [1.74–1.86] | 3.24 [2.93–4.12] | 4.49 [4.17–4.80] | 1280 [972–3193] | 0.00000 [0.00000–0.00002] | 43.79 [35.45–96.98] | 2.38 [2.06–2.88] |
| prices C | 62 [52–62] | 1.74 [1.74–2.38] | 2.47 [2.11–3.94] | 3.89 [3.57–3.89] | 1107 [1033–2192] | 0.00000 [0.00000–0.00002] | 30.04 [0.00–125.32] | 2.61 [2.29–4.12] |
| home-desktop A | 91 [90–94] | 0.52 [0.52–0.55] | 0.94 [0.87–1.06] | 1.24 [1.13–1.25] | 199 [135–200] | 0.00057 [0.00057–0.00335] | 271.56 [263.96–273.17] | 2.19 [2.04–2.57] |
| home-desktop C | 94 [94–94] | 0.54 [0.53–0.55] | 0.91 [0.89–0.94] | 1.24 [1.23–1.25] | 134 [127–134] | 0.00335 [0.00057–0.00335] | 216.64 [38.45–226.08] | 2.13 [2.08–2.19] |

| Page / build | Observed TTFB s | Observed element render delay s |
|---|---:|---:|
| lv A | 0.107 [0.080–0.153] | 3.197 [3.187–3.201] |
| lv C | 0.164 [0.142–0.173] | 0.926 [0.827–2.231] |
| ru A | 0.222 [0.091–0.240] | 3.135 [1.706–3.142] |
| ru C | 0.156 [0.113–0.157] | 2.212 [0.758–2.291] |
| iphone A | 0.164 [0.154–0.459] | 2.228 [1.707–3.161] |
| iphone C | 0.286 [0.151–0.518] | 2.254 [1.926–2.277] |
| prices A | 1.887 [1.514–2.499] | 1.413 [1.357–1.618] |
| prices C | 1.982 [1.584–2.601] | 0.528 [0.490–1.339] |
| home-desktop A | 0.095 [0.071–0.102] | 0.735 [0.722–0.859] |
| home-desktop C | 0.078 [0.070–0.103] | 0.720 [0.693–0.788] |

All mobile candidates remain hero text: LV `remonts Rīgā.`, RU `Ремонт телефонов`, iPhone hub H1 and prices H1. They have no resource-load-delay or resource-load-duration subparts. Desktop LCP remains the approved repair photograph: A resource delay **0.010 [0.009–0.011] s**, duration **0.089 [0.070–0.095] s**; C delay **0.009 [0.009–0.010] s**, duration **0.080 [0.077–0.111] s**. Per-part medians need not add to the median LCP.

LV observed LCP improves **3.31 → 1.09 s**, RU **3.23 → 2.33 s**, prices **3.24 → 2.47 s**. Homepage observed element-render delay falls substantially. The iPhone hub has no established rendering improvement: observed LCP is **2.69 → 2.44 s** with overlapping ranges, render-delay medians are essentially unchanged, FCP worsens and simulated LCP rises **5.98 → 9.59 s**. That regression signal remains unresolved; it is not hidden behind other routes' gains. Desktop simulated LCP is effectively unchanged.

TBT worsens in the homepage medians despite the layout changes. Analytics remains an external CPU/network dependency; neither that variation nor the score changes are isolated effects of this implementation. Every retained sample downloads both main GTM and GA scripts with HTTP 200. Font transfer is unchanged at **208,474 bytes** in all 30 samples.

Motion-runtime-attributed load reflow medians fall **48.71 → 0 ms LV**, **38.04 → 25.49 RU**, **116.10 → 18.63 iPhone**, **31.29 → 2.91 prices**, **69.23 → 7.28 desktop**. Zero means no qualifying source entry in that trace, not zero browser layout. Total RU reflow does not improve; large unattributed work remains in some samples. Current residual runtime sources include the initial viewport/geometry snapshot and frame-boundary reads after external invalidation; removing repeated self-induced flushes does not remove necessary layout.

Critical-chain medians/ranges remain variable, including a longer price-page chain. Since no network implementation changed, a shorter measured chain is not claimed as a separate network optimization. `/cenas` observed TTFB is **1.51–2.50 s A / 1.58–2.60 s C**, which remains a server/data-path issue outside this focused change.

Three separate applied-4×-CPU interaction profiles per build exercised the same scrolling/reversal sequence, review expansion and FAQ open/close. Native Long Animation Frame script `forcedStyleAndLayoutDuration` totals fell **189.9 [176.2–214.2] → 49.9 [9.7–127.6] ms**. The motion update function's own attribution fell **178.7 [164.5–190.7] → 6.3 [0–85.4] ms**. All six runs passed the interaction checks with no page exceptions or overflow. These totals include only reported long frames, have host/analytics variation, and are neither all layout work nor field INP. Residual candidate costs include navigation rulers, React, GA and a frame-boundary geometry flush; those are not claimed fixed.

## Validation and review

- **166/166 tests pass**, focused JSX/JS lint has zero warnings, the final isolated production build exits **0**, and `git diff --check` passes. Existing Sass deprecation warnings remain. The user's development server/output was preserved.
- **24 baseline/candidate page/viewport pairs** pass HTTP 200, SSR H1 presence, final typography/neon, heading geometry within 1 CSS px, metadata/JSON-LD, no captured page exceptions and no document overflow. These cover seven Service views and five protected views at mobile/desktop. All ten protected entrance pairs also retain identical recorded H1 frames/options. Representative desktop homepage, mobile RU homepage, price and AdsV2 captures were visually reviewed alongside the entrance experiments; no overlays or pixel-equality requirement was used.
- **18 candidate headline stress observations** pass: three normal applied-throttling runs per locale, fast desktop, delayed hydration/fonts, reduced-motion restoration, motion-off and emulated missing-starting-style fallback. No sampled late re-hide or hydration H1 WAAPI entrance occurred. Saved first-paint/late-initialization filmstrips were reviewed in LV/RU. In the normal selected samples the headline is readable by **2.411 s LV / 2.855 s RU**, and remains present through runtime initialization around 4 s. These are saved-frame bounds, not exact first-readable timestamps or Lighthouse simulation.
- In the delayed-font examples, heading LCP occurs at **1.564 s LV / 1.832 s RU**, while the initial Geologica font-set completion is recorded at **5.178 / 5.053 s**. Fallback text is readable before native fonts finish. Later Inter activity is also recorded; these checks do not establish that shared Inter is globally unused.
- **20 five-width checks** (375, 412, 768, 1024, 1350 px; LV/RU home/prices) and real client navigation followed by a reduced-motion restart pass without headline hiding or overflow. Small existing movements remain; desktop CLS ranges still reach 0.00335. This is not a universal zero-shift claim.
- **Eight non-submitting functional checks** pass: booking/Escape/focus return, Dock contact/booking, deferred locator image/pin/contact, mobile navigation, keyboard price-brand change to `?brand=ipad`, localized/400–500 mono fonts and reduced-motion visibility. The six measured interaction runs also pass review expansion and FAQ open/close. No booking or Firebase data was submitted.
- All three font byte/cache checks pass; protected-host typography remains legacy-scoped. With 2.5 s font delays and 4× CPU, price shift sums remain **0.000016 LV / 0.000579 RU** and contact-aside Y remains **650.89 / 679.89 px**, preserving Pass 1's geometry fix. Observer sums are separate from Lighthouse CLS.
- The prior 24-file preservation set differs only in the three intended existing presentation files. The other source/font/report hashes match, including analytics integration and historical reports. The new layout-order test, this report and temporary task evidence are additions. Task servers were stopped after validation; the existing release worktree/build and user's development server were retained.

**Review decision:** retain the opaque small-offset entrance and Service-only read batching as measured improvements in homepage readability and motion responsiveness. Do not claim that all routes' LCP, TBT, total reflows or critical chains improve. Before deployment, review the changed entrance on a representative phone and resolve the iPhone hub's worse FCP/simulated-LCP signal using a quiet host or representative device with normal analytics. The server-heavy price path, external analytics work, navigation/review measurements and occasional long simulated paths remain follow-up items; no speculative fixes to them were retained.

No physical Android/iOS, accepted-consent performance, matched post-deployment tests or field p75 LCP/INP/CLS were collected. Production CWV remains unverified. This pass stops at local implementation/validation for review; it does not authorize deployment. Historical performance reports remain unchanged.

Evidence and reproduction helpers: [`tmp/perf-pass2-2026-11-19/`](../tmp/perf-pass2-2026-11-19/README.md).
