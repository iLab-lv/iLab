# Mobile LCP investigation after Performance Pass 1

19 November 2026 (Europe/Riga). Original source: `ba0c2b1`; current source: the existing, uncommitted Pass 1 implementation.

**The large LCP swings come from a first-paint/entrance-animation race amplified by Lighthouse's simulation. They are not evidence that the heading waits 10–12 seconds for its font.** The race exists in the original code. It can also hide a headline that has already appeared.

**Pass 1 is not certified LCP-neutral.** Its first matched LV batch worsens in both simulated and observed LCP. Later unchanged-code controls recover substantially, so an isolated font-caused regression has not been established. Keep the font/CLS work; do not claim the mobile LCP problem is solved or dismiss the worse samples.

Investigation only: application source, typography assets, analytics, consent, protected landings, dependencies and historical reports are unchanged. Nothing was staged, committed, pushed or deployed.

## Matched measurements and limitations

Two isolated production-mode builds served the original and current sources on localhost. The original was extracted with `git archive`; the live working tree was never switched. Both used the existing dependencies/environment and warmed LV/RU server caches. No production results are pooled with these measurements.

Lighthouse 12.8.2 / installed Chrome 157; serial, fresh browser profiles; no consent interaction. Primary measurements use the historical CLI's chrome-launcher defaults, mobile 412 × 823, DPR 1.75, simulated 150 ms RTT / 1,638.4 Kbps / 4× CPU. Each build/locale has three samples. Values below are medians [min–max], in seconds except TBT.

| Locale / build | Simulated FCP | Simulated LCP | Observed trace LCP | TBT ms |
| --- | ---: | ---: | ---: | ---: |
| LV original | 2.26 | 3.97 [3.78–11.92] | 1.35 [0.87–3.54] | 1,369 |
| LV Pass 1 | 1.88 | 11.97 [11.38–12.03] | 3.56 [3.49–3.57] | 1,123 |
| RU original | 3.56 | 10.97 [10.89–11.07] | 3.46 [3.42–3.49] | 1,521 |
| RU Pass 1 | 1.88 | 10.60 [10.58–10.89] | 3.42 [3.40–3.45] | 1,295 |

Independent Puppeteer observations apply **request-level** CDP throttling: 150 ms latency, 1,638.4 Kbps down / 750 Kbps up and 4× CPU, with the same mobile viewport/UA and fresh profiles. These are a separate measurement stratum, not Lighthouse's simulated network or its unthrottled recording. Three observer-only repetitions per build/locale give:

| Locale | Original observed LCP | Pass 1 observed LCP |
| --- | ---: | ---: |
| LV | 2.54 [2.34–3.46] | 3.49 [3.49–3.76] |
| RU | 3.57 [2.56–3.63] | 4.41 [3.46–4.43] |

The later **unchanged Pass 1 LV normal controls** return **2.50 [2.39–3.44] s**, three samples. This within-code variation is comparable to the apparent applied-throttling regression above. Early observed LCP can also precede a later hide/reveal, so it does not establish when the headline remains visible.

**A quiet, stable host was not achieved.** Before each primary run, the harness waited up to 30 seconds for two successive ≤15% busy CPU samples; all 12 gates failed. Final preflight CPU use was 28–63%. Calibration indices were 1,008.5–1,655. The primary Node API channel suppresses native slow-host warnings, but none crossed the installed CLI warning threshold of ≤1,000; later CLI-channel analytics controls also emitted no warnings. Absence of a warning does not certify stability. The temporary baseline was moved outside the IDE workspace; no user process or development server was stopped.

Four additional balanced browser traces provide filmstrips; their timings are excluded from the observer-only medians. An earlier Puppeteer-launched Lighthouse series uses different default browser flags and is excluded from the primary table. Interrupted connection-refused attempts and an incomplete server-restart font sample are also excluded and retained in the evidence notes.

## What actually happens to the headline

The final mobile candidate remains the LV `remonts Rīgā.` / RU `Ремонт телефонов` span. Source markup/CSS initially permits visible text. During hydration, [`ServiceMotion`](../app/(site)/ServiceMotion.jsx) starts the unchanged [`serviceMotionRuntime`](../app/(site)/serviceMotionRuntime.js), whose heading entrance uses opacity 0 → 1, translateY(100%) → 0, 900 ms duration, positional delay and an 80 ms line stagger, with `fill: both`.

Two paths are recorded:

- **Paint first:** the heading registers as LCP before motion initializes. Motion can subsequently hide and reveal it without replacing that early LCP entry.
- **Motion first:** the heading's zero-opacity initial state excludes it from initial LCP consideration. The lead paragraph becomes a candidate; the heading replaces it near entrance completion/cancellation. Chromium excludes opacity-zero content from LCP. [LCP definition and eligibility](https://web.dev/articles/lcp).

The same original LV build demonstrates both paths with nearly identical calibration indices:

| Original LV sample | CPU index | First paint / candidate | Heading animation created | Final observed LCP | Simulated LCP |
| --- | ---: | --- | ---: | ---: | ---: |
| Run 3 | 1,602.5 | Heading at 0.869 s | 1.114 s | 0.869 s | 3.780 s |
| Run 2 | 1,621 | Lead at 2.344 s | 0.903 s | Heading at 3.544 s | 11.921 s |

Thus CPU calibration alone cannot explain the difference. Resource arrival, rendering and hydration scheduling change which path wins. This investigation does not isolate every cause of the initial-paint scheduling difference.

The RU original high-LCP filmstrip has no headline at **2.392 s**, a clearly readable headline at **2.804 s**, and the final heading LCP event at **3.415 s**; simulated LCP is **10.974 s**. The text is visible substantially earlier than either its simulated estimate or, in this example, its final observed candidate event. [Saved frames](../tmp/lcp-investigation-2026-11-19/README.md).

Conversely, an applied-throttling current sample records LCP at **3.552 s**, sampled heading opacity 1 at **3.626–4.444 s**, opacity 0 at **4.798 s**, and completed entrance near **5.94 s**. An early LCP is not proof of uninterrupted readability. Sampled computed styles describe rendering eligibility; the filmstrip provides pixel evidence. H1 replacement was not recorded in the browser checks; the demonstrated hydration effect is opacity/transform scheduling, rather than replacement of its text nodes.

## Why simulation turns this into 10–12 seconds

Installed Lantern constructs its LCP graphs using the **observed LCP cutoff**, including qualifying scripts/resources completed before that point and additional layout tasks. A later cutoff can admit GTM → GA → collection requests and more image contention. These requests are not all prerequisites for reading the heading. High-run model tails explicitly reach Google Analytics/DoubleClick collection requests. Large service photos also enter the model; excluding their nodes alone does not eliminate the long analytics path.

Six saved LV traces were replayed offline. Every original simulated LCP was reproduced **exactly**. Changing only the model's assumed cutoff produces large jumps on the same input trace:

| Saved trace | Assumed cutoff → simulated LCP | Later cutoff → simulated LCP |
| --- | --- | --- |
| Original LV run 1 | 1.5 s → 4.83 s | 3.0 s → 12.17 s |
| Pass 1 LV run 1 | 1.0 s → 4.62 s | 2.5 s → 11.27 s |

This is a sensitivity experiment, not a proposed rendering change or a predicted saving. The simulator is deterministic for fixed input; the browser's recorded ordering/candidate changes its input. Lighthouse documents that simulation estimates an alternate load from an unthrottled recording and has edge cases. [Versioned throttling documentation](https://github.com/GoogleChrome/lighthouse/blob/v12.8.2/docs/throttling.md).

## Fonts, motion, analytics and server timing

**Fonts participate in loading order and candidate geometry, but no ten-second font block was found.** In the paired high-LCP LV traces, Geologica transfer finishes at **0.713 s original / 0.273 s current**, while heading LCP arrives around 3.5 s. Under applied throttling, two deliberately delayed-font runs paint the LCP heading at **2.46–2.48 s**, before the initial service-font set finishes at **4.67–4.86 s**; the third LCP is 4.52 s. Fallback text can render while native fonts load.

There is a secondary scheduling lead: current early font preloads sometimes compete with CSS in the local HTTP/1.1 tests. Two initial current samples finish the last CSS at 1.72–1.84 s, versus 1.21–1.23 s in the corresponding original samples. Later unchanged current controls finish it at 0.86–1.04 s. This does not isolate a preload defect or justify a speculative fallback/preload change, especially for production's different network conditions.

**Motion-off does not consistently solve LCP.** With normal analytics and applied throttling, three LV samples each give original motion-off **2.50 [2.41–3.53] s**, current motion-off **2.62 [2.38–3.57] s**, and later current normal controls **2.50 [2.39–3.44] s**. Removing motion is not supported as the general fix. The late re-hide remains a separately demonstrated UX problem.

**Analytics contributes CPU work and changes the simulated path.** An original RU trace contains a 132 ms pre-LCP main-thread task associated with GA, alongside first-party hydration tasks up to 246 ms. Three alternating browser-only GTM-blocked and normal-analytics Lighthouse controls give:

| Current LV control | Observed LCP s | Simulated LCP s | TBT ms |
| --- | ---: | ---: | ---: |
| Normal analytics | 3.51 [2.21–3.57] | 5.52 [4.79–11.40] | 1,570 [880–3,044] |
| GTM blocked in browser | 3.55 [3.50–3.57] | 5.73 [5.46–5.74] | 675 [564–906] |

TBT falls, while observed LCP remains similar and simulated LCP has no uniform improvement. CPU/timing variation prevents treating the difference as an isolated saving. All three final normal Lighthouse controls download **both GTM and GA with HTTP 200**; their completion moves from before to after the observed candidate, explaining different model inclusion. No tracking implementation, consent or tag setting changed. TBT is not field INP.

**Warm server timing does not explain the primary 8-second simulation swing:** primary measured response times are **68–319 ms**, with document transfer ending well before the high text-LCP events. A restarted-server observation has **13.36 s TTFB** and incomplete font loading; it is retained separately and repeated for the font control. Cold/server tails need their own timing investigation rather than font attribution.

## Decision before Pass 2

1. **Retain Pass 1, without declaring an LCP win or LCP neutrality.** The high path predates it; the worse first-batch medians remain real measurements. Loading changes may influence the paint/entrance race, and this unstable host cannot isolate that interaction conclusively.
2. **A narrow motion proposal is justified for late re-hiding, not as a proven score fix.** Coordinate the Service headline entrance with first presentation and let hydration adopt that entrance, preserving its existing frames, duration, easing, neon and reduced-motion behavior. Validate that text already presented is never hidden again. This requires a separately approved prototype and matched measurements; it was not implemented here. Shared advertising consumers must remain unchanged.
3. **Establish a quiet-host or representative-device baseline before judging Pass 2.** Record first readable text, font readiness, entrance completion, actual candidates and simulated LCP together; retain normal analytics and repeated LV/RU samples. Investigate the CSS/font scheduling lead and server tails only with controlled evidence. Keep field p75 LCP/INP/CLS separate. Image delivery remains a valid bandwidth opportunity, with no promised LCP score gain from these results.

Evidence and reproduction helpers: [`tmp/lcp-investigation-2026-11-19/`](../tmp/lcp-investigation-2026-11-19/README.md). Validation confirms 18 retained primary/control Lighthouse runs, 28 browser observations, three samples per comparison group, six exact offline replays, and unchanged hashes for all 6,237 pre-existing source/document files checked. Both task servers and generated build copies were removed after validation. The original reports remain unchanged; application test/lint suites were not rerun for this diagnostic-only work.
