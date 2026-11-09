# R7.4I.1 — React hydration #418

Investigation: 2026-11-07. **Assessment: Unresolved; intermittent production release risk.** No hydration-related application change was made.

## Environment and coverage

Branch: feature/redesign-integration. Node 22.22.2, Next.js 15.5.29, React 19.1.10, Chrome 156.0.8078.80. Playwright launched headless Chrome with extensions disabled and fresh temporary profiles. Development used the existing server on port 3000; production used an isolated, source-verified build on port 3004. The user's development server and production Firebase data were not modified.

Each environment completed 33 recorded checks: two eight-URL same-tab full-load sweeps at 375×1000, eight fresh-context loads at 375×1000/1440×1000, five language/history/client-link operations, and four fresh mobile loads with normal motion enabled. Setup loads are excluded from these counts. Sweeps used reduced motion and ?motion=off; fresh-context and user-style operations omitted the query. Tests waited for an actual contact control's React event props, bounded network-idle and font readiness before continuing. No arbitrary delay was added to the application.

| Recorded checks | Production | Development |
|---|---:|---:|
| Repeated full loads (two sweeps) | 16; two #418 events | 16; none |
| Fresh contexts, mobile/desktop | 8; none | 8; none |
| Language button, Back, Forward, service link, Back | 5; one #418 | 5; none |
| Normal-motion fresh mobile loads | 4; none | 4; none |

The initial development warm-up separately attempted ten loads: seven returned 200 without hydration errors; three timed out and are not counted as passing. The first production build worker exited with Windows code 3221225794. Its retry passed compilation, lint/type checking and page generation. All 698 source hashes matched the built snapshot.

## Exact reproduction

In one reused clean context, load these eight paths in order, twice, with ?motion=off:

1. /iphone-remonts/iphone-13
2. /ru/remont-iphone/iphone-13
3. /plansetdatoru-remonts/ipad/pro-11-m4-2024
4. /datoru-remonts/macbook/macbook-air-13-m4-2025-a3240
5. /iphone-remonts/baterijas-maina
6. /ru/remont-iphone/zamena-batarei
7. /iphone-remonts/aizmugures-vacina-maina
8. /ru/remont-iphone/zamena-zadnej-kryshki

Production's second sweep emitted #418 at steps 6 and 7. A separate user-style sequence loaded /iphone-remonts/iphone-13 and clicked the real RU language button: #418 occurred on /ru/remont-iphone/iphone-13. Back, Forward, the model's battery-service link and Back then completed without #418. Equivalent development operations were clean.

Original R7.4I evidence also recorded #418 on the MacBook model above after the RU iPad model, and on RU back-cover replacement after its LV equivalent. Those original events are not assumed to share one cause.

All actions were automated, including user-style clicks. No independent manual-user or extension-enabled comparison was performed. Extension interference is unnecessary for the observed reproduction; automation timing is not fully excluded. Fresh-context successes do not close an intermittent error.

## First captured difference

Two additional production debugger replays made eleven full loads and captured five calls to React's hydration-mismatch function before recovery. These are diagnostic replays, separate from the table above.

Four captures diverged at CatalogHero's wrapper, including RU iPhone 13 and LV/RU back-cover pages:

- Expected Fiber: div with CatalogHero shell class.
- Actual next hydratable node: its child breadcrumb nav.
- The real outer ServiceRecovery/ModelDetailSkin wrapper and CatalogHero div still existed in the DOM. React had associated the parent Fiber with the inner div and was already one level deeper.

Another capture on LV battery replacement expected a QuickFacts item div but found its icon span; its parent Fiber was similarly associated with the inner item.

Relevant source: app/_components/sections/catalog-hub/CatalogHero.jsx:38; app/_components/sections/device-detail/ModelHero.jsx; app/_components/sections/quick-facts/QuickFacts.jsx; app/_components/sections/service-recovery/ServiceRecovery.jsx:13; app/(site)/(catalog)/iphone-remonts/[device]/IphoneDevicePage.jsx:47.

These identify mismatch sites, **not a confirmed component defect**. The first captured divergence was structural, not an opening-hours, locale or price text difference. Captured wrappers were present, so adding another wrapper would be speculative. No evidence establishes why the hydration cursor advanced. No general conclusion about every #418 instance follows from these five captures.

## Changes, warnings and next step

No SSR disabling, suppressHydrationWarning, artificial delay, schema change, component redesign or hydration fix was applied. No hydration regression test is claimed without an identified fix.

Separate warnings: development reported synchronous params.device/params.brand access; production emitted some local /shop RSC-prefetch HTTP 500 messages. These were recorded separately and were not proven to cause #418. Existing Sass and isolated-workspace warnings remain. R7.4I's unrelated, confirmed Russian brand-list accessible-label correction has three passing focused tests and scoped lint with one existing img advisory; an older brand-template test still expects the retired hasWhy gate.

Next diagnostic step: reduce the production route/layout hydration sequence while preserving its SSR/RSC structure and trace the earlier cursor-claim operation. Only then choose an application correction or framework-level remedy. Changing protected heroes, Quick Facts, locations, Firebase data or SEO is not justified by current evidence.

Local evidence (ignored, not committed): .env-r74i1-qa/{dev-initial,controlled-results,normal-motion-results,mismatch-captures,mismatch-dom-captures}.json. Exact operations, console messages, production stacks and debugger Fiber/DOM snapshots are retained there.

**Release assessment:** navigation recovered in the tested sequences, but production hydration recovery remains a real unresolved risk. This investigation does not establish a permanent resolution or certify release readiness. No commit, push or deployment. The owned production QA server was stopped. Final port checks found both 3004 and 3000 closed; no stop command was issued for the existing development server, and it was not restarted.


## R7.4I.2 follow-up — 2026-11-07

The historical uncertainty above is superseded by the [confirmed root cause and targeted fix](HYDRATION_418_ROOT_CAUSE_AND_FIX.md). A bundled React host-replay cursor defect was reproduced independently and corrected with a guarded upstream backport. All 56 corrected production application checks passed with zero hydration errors; deterministic regression coverage failed before and passed after. The obsolete hasWhy assertion was independently updated. This finding is resolved; the report above remains the unchanged record of the earlier investigation.
