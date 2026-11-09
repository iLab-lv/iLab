# R7.4I.2 — Hydration replay root cause and targeted fix

Date: 2026-11-07. Repository/branch: iLab Service, feature/redesign-integration. This follows the historical [R7.4I.1 investigation](HYDRATION_418_INVESTIGATION.md).

## Confirmed cause

Next 15.5.29's App Router actually serves React DOM **19.2.0-canary-0bdb9206-20250818**, independently of the npm react/react-dom 19.1.10 entries. Its HostComponent replay path does not restore the hydration cursor after a pending child suspends and resolves in a microtask during transition hydration.

The comparison on captured LV/RU iPhone 13 loads was:

| State | Observed structure |
|---|---|
| Raw response | ModelDetailSkin div → CatalogHero div → breadcrumb nav |
| Browser-parsed, JavaScript disabled | Same wrappers and nesting |
| Immediately before hydrateRoot | Same wrappers and nesting |
| Initial React expectation/first successful claim | Same outer wrapper |
| Later replay | Expected outer wrapper is claimed against its existing child; the following CatalogHero claim encounters nav |

A second trace showed the equivalent shift from QuickFacts band div to item div, followed by item div versus icon span. The normal DOM existed throughout. Initial wrapper conditions, missing server markup and parser repair at these boundaries were not the cause.

Browser-only tracing recorded repeated correct claims followed by the first wrong claim on replay. A standalone, valid-HTML fixture using the exact bundled runtime reproduced it without iLab components, Firebase, locale resolution, third-party scripts or extensions: synchronous and late-resolution controls passed; microtask-resolution children under startTransition hydration failed. This identifies the renderer mechanism rather than blaming the reported hero/facts components.

The mechanism and correction match the merged upstream [React PR #35494](https://github.com/react/react/pull/35494): restore the interrupted host's own DOM node and hydration-parent context before beginWork retries it. The corresponding restoration is present in [Next 16.4.0's tagged renderer](https://github.com/vercel/next.js/blob/v16.4.0/packages/next/src/compiled/react-dom/cjs/react-dom-client.production.js#L12721), but absent from this installed Next 15 renderer. No framework upgrade was performed.

## Correction and scope

- scripts/webpack/reactHydrationReplayLoader.cjs backports only that restoration, guarded for Next 15.5.29 and the actual bundled renderer version/expected source structure. Unexpected versions/structure fail the build; applying it twice is idempotent.
- next.config.mjs attaches the loader only to the four nonexperimental client renderer variants (production, development and profiling). A cache-version suffix prevents reuse of the prior compiled renderer. Existing redirects, rewrites and headers compare identically to the pre-task configuration.
- No node_modules files, dependency versions or lockfiles are changed. SSR, server components, page markup, data resolution, visual design, SEO and protected sections are retained.
- tests/service-catalog-brands.test.mjs now checks the existing shared QuickTrustFacts section and supported gates instead of the obsolete hasWhy requirement. No Why component changed.

This is a narrowly scoped upstream backport, not warning suppression, delayed hydration, an SSR opt-out or an effect rendering gate. Browser tracing lived only in diagnostic contexts; no application logging/instrumentation was added.

## Regression coverage

tests/react-hydration-replay.test.mjs validates all four renderer variants, version/structure rejection, idempotency, unchanged surrounding renderer code and client-only/cache integration.

tests/browser/hydration-replay.cjs protects the actual invariant: every original server DOM node must survive asynchronous-child hydration, with correct nesting and a working click handler. It covers LV/RU, synchronous children, resolution after suspension, microtask resolution and a no-transition control.

| Production fixture | Checks | Hydration errors | Server DOM replacements |
|---|---:|---:|---:|
| Original renderer (--baseline) | 26 | 20 | 20 |
| Backported renderer | 26 | 0 | 0 |

The 20 failures were exactly the microtask/transition cases; all six controls passed. The original renderer command intentionally exits nonzero. The default command is the regression assertion, not an assertion that the old bug should continue.

Run with the existing Playwright installation available through ILAB_PLAYWRIGHT_MODULE and, when needed, Chrome's path through ILAB_CHROME:

    node tests/browser/hydration-replay.cjs
    node tests/browser/hydration-replay.cjs --development

No new browser dependency was installed. Unit/application coverage: 44 focused tests passed; scoped ESLint passed. The previous hasWhy failure is closed.

## Maintenance and evidence

The backport is tied to this pinned Next/Webpack renderer. Review/remove it when upgrading to a framework renderer containing the upstream correction, and re-run the DOM-identity fixture. A future Turbopack migration requires equivalent validation; the current dev/build scripts continue to use Webpack.

Ignored local evidence: .env-r74i2-qa contains matching raw/pre-hydration/parsed HTML, claim-order traces, red/green fixture results and source/build verification. Temporary fixtures run on ephemeral task-owned servers. No production Firebase write, commit, push or deployment.

## Production verification and release assessment

An isolated production build passed (699 source files verified against the working tree). Its emitted client renderer was inspected and contains the cursor restoration; the original renderer asset hash changed. The root .next directory was not used.

| Corrected application sequence | Checks | Hydration errors / runtime exceptions |
|---|---:|---:|
| Direct mobile loads: original eight routes, five repetitions, 375px | 40 | 0 / 0 |
| Real LV/RU language-button transitions | 8 | 0 / 0 |
| Model-to-battery client links and client Back | 4 | 0 / 0 |
| Representative direct desktop loads, 1440px | 4 | 0 / 0 |
| Total | 56 | 0 / 0 |

All checks passed in a clean Chrome context. Original server page-wrapper identity was retained on every full load. Both locales were exercised. The separate development-renderer fixture also passed all 26 cases with zero hydration errors or DOM replacements.

Remaining messages: 56 console resource errors all target local /shop RSC-prefetch requests returning HTTP 500, matching the separately recorded prior warning. Shop/proxy routing was not changed. Existing Sass deprecations and isolated-build workspace/cache warnings remain; no new application runtime exceptions were observed. Routing functions (redirects, rewrites, headers) compare identically to the saved pre-task configuration.

**Resolved:** the confirmed host-replay defect is corrected, with a deterministic failing-before/passing-after DOM-identity regression and repeated application reproductions passing. #418 from this finding no longer blocks deployment. This does not certify unrelated release checks or guarantee that no other cause of #418 can ever occur. The pinned framework backport must be reviewed on upgrade.

Only task-owned test servers were stopped. No application component, Firebase data, existing backup, Shop source, dependency version or lockfile was changed by this task.
