# Performance Pass 1B: continuous Service headline presentation

19 November 2026 (Europe/Riga). Original: `ba0c2b1`; Pass 1 and Pass 1B are uncommitted on `feature/landing-v3`.

**Late headline re-hiding is fixed in all 34 recorded fixed-build browser observations.** The server stylesheet establishes the entrance; hydration leaves it alone. The approved final design and protected landing behavior pass the comparisons below.

**LCP performance is not accepted as improved or neutral.** Lighthouse LV median is effectively unchanged, while applied-throttling browser LCP is later in the fixed build. Preserving a fade before first presentation can postpone LCP eligibility relative to an old run that paints the heading before its later re-hide. Continuous readability and a favorable early LCP entry are different outcomes. No commit, push or deployment occurred.

## Cause and implementation

The original runtime starts a Web Animations entrance during hydration: opacity 0 → 1, translateY(100%) → 0, 900 ms, positional waiting and an 80 ms line stagger, with backwards fill. Server-rendered text can already have appeared when that zero-opacity frame is installed. Cleanup, route effects and preference restarts can repeat this ownership problem. The original investigation demonstrates that an early LCP event can survive a subsequent disappearance.

Service H1 entrances now belong to the server-delivered stylesheet. CSS `@starting-style` supplies the initial opacity/translation only when the element has no previous rendered style. The normal heading remains its visible final state. Hydration does not create, replace or restart the H1 entrance. If CSS arrives after visible text, the browser already has a before-change style and does not apply the starting style. This avoids using an empty Paint Timing buffer as proof that nothing has appeared: paint reporting itself can be asynchronous. See [CSS starting styles](https://www.w3.org/TR/css-transitions-2/#defining-before-change-style) and [Paint Timing processing](https://www.w3.org/TR/paint-timing/#mark-paint-timing).

The original 900 ms easing, 100% rise and homepage's 80 ms second-line stagger remain. The position-derived 50–900 ms waiting period is intentionally removed from H1s; entrance begins with first styling instead of waiting for hydration or an observer. Other hero/section animations, scan, navigation transition, reviews and neon remain owned by the existing runtime. No headline markup, font, size, line height, crop or text shadow changes.

Reduced motion has no starting style or transition. Cancelling a transition exposes the normal visible state; restoring the preference does not reapply a starting style to an already rendered heading. New client-navigation headings can enter on their own first presentation. Browsers without `@starting-style` show the normal heading immediately. The existing `?motion=off` switch is conveyed to Service's server markup and maintained on pathname navigation, so direct diagnostic loads also disable the CSS entrance before first paint.

| File | Pass 1B responsibility |
| --- | --- |
| `app/(site)/HeadlineEntrance.module.scss` | Service-only first-style entrance and reduced-motion fallback. |
| `app/(site)/layout.jsx` | Applies its class only to the Service shell; emits the diagnostic opt-out. Existing Pass 1 font work is retained. |
| `app/(site)/ServiceMotion.jsx` | Opts out of runtime H1 ownership; maintains the diagnostic opt-out on route effects. |
| `app/(site)/serviceMotionRuntime.js` | Explicit opt-in skips only H1 WAAPI entrances. Default advertising callers retain their original frames and lifecycle. |
| `middleware.js` | Adds presentation metadata for the existing motion query; routing and advertising decisions are unchanged. |
| `tests/serviceHeadlineMotion.test.mjs` | Exercises Service versus legacy runtime ownership, unchanged section motion and cancellation. |

## Measurement contract

Three isolated production builds compare A (original archive), B (pre-edit Pass 1 snapshot) and C (Pass 1B). The active working tree was not switched. Existing public assets/dependencies are shared through junctions; existing asset hashes and the pre-edit snapshot protect the comparison. Environment credentials are read by the task wrappers without being copied into the snapshots or reports. These are new matched localhost samples; historical and production measurements are not pooled.

Lighthouse 12.8.2 / Chrome 157, serial fresh browser profiles, 412 × 823, DPR 1.75, simulated 150 ms RTT / 1,638.4 Kbps / 4× CPU. Normal GTM/GA loading and fresh consent state apply throughout. Browser observations separately use applied request-level network throttling and 4× CPU with balanced tracing. They are not Lighthouse's simulated values. First readable filmstrip frames, computed styles and transition events are kept separate from each other and from LCP.

A quiet host was **not achieved**: all 18 retained Lighthouse quiet gates failed; final preflight CPU use was 31–59%. Calibration indices were 915.5–1,625.5, with a native slow-host warning on original LV run 1. Absence of other warnings does not certify stability. One Lighthouse round overlapped artifact generation, and one browser round overlapped an accidentally started extra collector; those rounds are preserved as exploratory evidence and replaced serially for the primary comparison. No user application or development server was stopped.

## Results

Each row has three retained normal-analytics samples. Values are medians; brackets are min–max. FCP and the first LCP column are **simulated**; observed LCP comes from the recorded Lighthouse trace. Seconds except TBT/CLS.

| Locale / build | FCP | Simulated LCP [range] | Observed LCP [range] | TBT ms | CLS median |
| --- | ---: | ---: | ---: | ---: | ---: |
| LV A original | 3.12 | 12.05 [3.86–12.14] | 3.49 [1.29–3.50] | 1,508 | 0 |
| LV B Pass 1 | 1.91 | 11.54 [4.66–11.87] | 3.49 [1.01–3.52] | 1,177 | 0 |
| LV C Pass 1B | 1.91 | 11.56 [11.54–11.78] | 3.32 [3.27–3.40] | 1,265 | 0 |
| RU A original | 3.27 | 10.84 [5.06–11.11] | 3.44 [1.20–3.44] | 1,322 | 0 |
| RU B Pass 1 | 1.88 | 11.01 [10.80–11.18] | 3.43 [3.40–3.43] | 1,124 | 0 |
| RU C Pass 1B | 1.88 | 10.57 [6.98–10.64] | 3.19 [1.55–3.22] | 1,172 | 0 |

Original CLS maxima are 0.00150 LV / 0.02557 RU; all retained B/C Lighthouse CLS values are zero. Font transfer stays **208,474 bytes in every B/C sample**, versus 256,358 in A: Pass 1's saving is retained. Both GTM and GA return HTTP 200 in all 18 retained Lighthouse samples. Their implementation and consent behavior are unchanged. No tracking requests were blocked in this pass.

The separate, applied-throttling browser observations retain three samples per row, with the same tracing/visibility hooks and fresh profiles. Completion means the final recorded H1 animation-finished callback or CSS transition-end event; dispatch can lag rendering on a busy thread. Re-hide counts use computed opacity after initial paint; filmstrips provide the pixel check.

| Locale / build | Observed LCP s [range] | Late re-hide runs | Recorded entrance completion s [range] |
| --- | ---: | ---: | ---: |
| LV A | 2.48 [1.86–2.61] | 3/3 | 4.53 [4.43–4.79] |
| LV B | 2.98 [2.58–3.55] | 3/3 | 5.02 [4.81–5.16] |
| LV C | 4.43 [4.43–4.56] | 0/3 | 4.39 [4.39–4.51] |
| RU A | 2.60 [2.59–3.51] | 2/3 | 4.66 [4.52–4.97] |
| RU B | 2.79 [2.55–4.51] | 2/3 | 5.57 [5.48–6.32] |
| RU C | 4.33 [3.46–4.45] | 0/3 | 4.35 [3.47–4.49] |

The later C browser medians must not be dismissed as a score artifact. These samples do **not** establish LCP non-regression. They do establish that an early old-code LCP can precede a subsequent disappearance, and that C avoids that disappearance. The host and loading-order variation still prevent assigning all timing differences to the code change. Small RU browser shift sums persist (up to 0.00652 in both B and C); these observer sums are separate from Lighthouse CLS.

### Visibility timelines

The browser-only 4 s Next-script-delay controls use B/C's identical Pass 1 fonts. Pixel timestamps below mean **verified readable by that saved frame**, not an exact first-pixel measurement. All times are from their own navigation start.

| Control | Geologica ready | Readable frame | Motion runtime starts | Later visibility | Recorded entrance completion |
| --- | ---: | ---: | ---: | --- | ---: |
| LV B | 2.752 s | 3.828 s | 6.259 s | Headline absent at 6.440 / 6.521 s | 7.638 s |
| LV C | 2.773 s | 3.764 s | 6.073 s | Headline remains visible through initialization | 4.362 s |
| RU B | 2.802 s | 3.769 s | 6.285 s | Headline absent at 6.390 / 6.540 s | 8.224 s |
| RU C | 2.702 s | 3.774 s | 6.214 s | Headline remains visible through initialization | 4.391 s |

The font is ready long before the old re-hide. C's entrance finishes before the delayed runtime starts. See [LV](../tmp/perf-pass1b-2026-11-19/filmstrips/delayed-lv.png) and [RU](../tmp/perf-pass1b-2026-11-19/filmstrips/delayed-ru.png) filmstrips.

In retained Lighthouse C run 1, the full LV headline is readable by **2.557 s**, versus observed LCP **3.402 s** and simulated LCP **11.542 s**. RU is readable by **2.572 s**, versus **3.221 / 10.570 s**. Pixel evidence confirms significantly earlier readability than the simulated metric. It does not turn those browser timestamps into a simulated LCP breakdown or prove passing field CWV.

## Regression validation

- **163/163 tests**, focused JSX/JS lint with zero warnings, all three production builds exit **0**, and `git diff --check` pass. Existing Sass deprecation/cache warnings remain.
- **24 B/C page pairs** pass HTTP 200, SSR H1 presence, final font settings/neon shadows, heading geometry within 1 CSS px, metadata/JSON-LD, no captured page exceptions and no document overflow. These cover seven Service views and five protected views at mobile/desktop. Representative screenshot pairs were visually reviewed; no overlays or pixel-equality requirement was used.
- **34 C observations** have no sampled late re-hide or hydration-driven H1 WAAPI entrance. They cover repeated normal LV/RU loads and mobile/desktop fast loading, delayed hydration, 4× CPU, delayed fonts, reduced-motion restoration, emulated unsupported-rule fallback and `?motion=off`. Filmstrip snippets for all 24 homepage stress configurations were reviewed alongside the computed-style histories. Separate fixtures verify late stylesheet arrival and runtime cleanup/restart; the unchanged legacy control reproduces the defect.
- Final checks at **375, 412, 768, 1024 and 1350 px** pass for LV/RU home/prices. Delayed-font price shift sums remain **0.000016 LV / 0.000579 RU**, without the old 0.19 panel jump. Real client navigation and a subsequent motion-preference restart produce no late headline hide. Small existing font/control movements remain; this is not a universal zero-shift claim.
- Six non-submitting functional checks pass: booking/Escape/focus return, locator image/pin/contact, mobile navigation/Escape/focus return, keyboard price-brand switching, localized font/mono loading, and reduced-motion visibility. No booking or Firebase data was submitted.
- The regression harness initially waited for a scan on AdsV3, whose profile does not run that scan. The wait was scoped to actual Service routes and the missing checks resumed. This was a harness failure, with no application change needed.

Preservation checks cover **6,238 pre-existing files**: only the four intended existing files changed; existing Pass 1 fonts, pricing styles, analytics, dependencies, protected page source and historical reports are unchanged. The two new implementation/test files and this new report are the additions. Task servers and isolated build copies were removed after validation; the user's development server/output and shared assets/dependencies remain.

## Review decision

Retain Pass 1's font and price-CLS work. **Pass 1B is ready for review as a presentation-correctness fix; it is not accepted as an LCP performance win.** Review the intentional timing change on a representative phone before accepting it. Header, CTA and other existing entrances retain their old ownership; this pass does not claim to eliminate every hero animation flash.

Before Pass 2, agree on this entrance behavior and establish a quiet-host or representative-device normal-analytics baseline, recording readable text and LCP separately. If acceptance requires demonstrably better/non-regressed LCP, that gate remains open. Same-photo image delivery can proceed after this review against C as the explicit baseline; these results do not promise that Pass 2 will fix the long simulated path. Physical Android/iOS rendering, accepted-consent performance, production comparisons and field p75 CWV remain unmeasured.

Evidence: [task helpers and results](../tmp/perf-pass1b-2026-11-19/README.md). Historical context remains in the unchanged [audit](MAIN_WEBSITE_PERFORMANCE_AUDIT_2026-11-19.md), [Pass 1 report](MAIN_WEBSITE_PERFORMANCE_PASS1_2026-11-19.md) and [LCP investigation](MAIN_WEBSITE_MOBILE_LCP_INVESTIGATION_2026-11-19.md).
