# R8.1 — Comprehensive pre-release audit

Audit: 2026-11-08, approximately 19:01–19:31 UTC. Repository: `C:/Users/info/Desktop/website/iLab`, branch `feature/redesign-integration`, origin `https://github.com/iLab-lv/iLab.git`.

## 1. Executive summary

**No confirmed P0 release blocker. One P1 and four P2 findings.** Core representative Service journeys work in the isolated production candidate. The production build passes, but the complete unit suite and standalone type verification are not green. **Conditional readiness: resolve R8-01 and reconcile the stale test contracts before treating the release verification gate as complete.** This audit does not authorize deployment.

No application, configuration, environment, Firebase, security-rule, Shop or Ads changes were made. No real booking was submitted. No commit, push or deployment was performed. Historical R7 reports were left intact.

The apparent large Process → Reviews gap is **not reproduced as an empty scrolling gap**. Its desktop sticky-animation runway explains the misleading full-page appearance; adjacent section boundaries touch during normal scrolling.

## 2. Release readiness and evidence boundaries

The audit used the current uncommitted source, not a historical commit. An isolated snapshot under ignored `.env-r81-audit/working-source` preserved the root `.next` and existing user servers. All 737 copied source/config/test/manifest files were hash-compared against the working tree; the final comparison found zero changes to those original files. Public assets and installed dependencies were shared read-only through junctions. Environment values were loaded in memory and not copied into the snapshot or report.

Evidence labels below distinguish **browser reproduction**, **tool output**, **source-established behavior**, and **risk/opportunity**. Passing sampled routes is not proof about every model or the eventual deployment environment. Production-domain GET checks establish availability of the currently deployed Shop/Ads, not deployment of this candidate.

Relevant R7 shared-section, FAQ consolidation/migration, SEO/dependency remediation, hydration-root-cause and device-selector records were reviewed. Existing design/testing/SEO/architecture skills were applied. The requested `schema-markup` skill was not installed; it was not reinstalled. Rendered JSON-LD inspection and existing schema tests supplied validation instead. No external Google rich-results validation or search-console data was available.

## 3. Test and build verification

| Check | Result and interpretation |
|---|---|
| Isolated production build | **PASS**, one build; completed 19:10:10 UTC; all 119 static outputs generated. Sass/cache warnings do not constitute build failures. |
| Existing unit suite | **123 pass / 2 fail / 125 total**, no skipped tests. Both failures are stale source-test contracts, detailed in R8-02. |
| ESLint, app/lib/scripts/middleware/Next config | **0 errors / 15 warnings**, exit 0. Warnings include raw images, hook dependencies, unused suppressions and a legacy font rule. No automatic fixes run. |
| Standalone TypeScript 5.9.2 | **FAIL**: `jsconfig.json:4` uses unsupported `ignoreDeprecations: "6.0"`. |
| Diagnostic type check with CLI-only `--ignoreDeprecations 5.0` | **FAIL**, four generated route-module errors for unsupported `pageHeader` exports. No config file changed; see R8-01. |
| React hydration-replay production fixture | **26 checks pass**, zero hydration errors or replaced DOM. |
| React hydration-replay development fixture | **26 checks pass**, zero hydration errors or replaced DOM. |
| Representative rendered matrix | **29 valid requested routes return 200**, plus the corrected RU battery service checked separately: **30 successful representative routes**. No captured page-level JavaScript errors. One initial guessed RU battery URL returned 404; it is not an application defect. |
| Responsive geometry | Home LV/RU, Samsung brand, iPhone 13 and Contacts checked at **360, 390, 768, 1024, 1440px**. No document horizontal overflow. Representative screenshots reviewed, not a pixel-parity exercise. |
| Dependency audit | Production: **0 critical, 0 high, 11 moderate, 1 low** vulnerability entries. Including development: **0 critical, 0 high, 17 moderate, 1 low**. These are dependency entries, not counts of independently exploitable application defects. |

Runtime: Node 22.22.2; Next 15.5.29; npm React/React DOM 19.1.10; TypeScript 5.9.2; installed Chrome driven by existing Playwright. No packages installed or upgraded.

Reproduction commands, run from the isolated snapshot using Git Bash:

```bash
node --test tests/*.test.mjs tests/*.test.cjs
node node_modules/eslint/bin/eslint.js app lib scripts middleware.js next.config.mjs --ext .js,.jsx,.mjs,.cjs --format json
node node_modules/typescript/bin/tsc --noEmit --project jsconfig.json --incremental false
node node_modules/typescript/bin/tsc --noEmit --project jsconfig.json --incremental false --ignoreDeprecations 5.0
```

The second TypeScript invocation is diagnostic, not a permanent workaround or a pass. A green Next build does not override these standalone failures. JavaScript bodies are not comprehensively type-checked by the current project contract.

Local supporting evidence is retained under ignored `.env-r81-audit/`: environment/build results, source hashes, rendered-page captures, interaction/metrics JSON and representative screenshots. These artifacts include a working snapshot and are not intended for committing. The durable deliverable is this report.

## 4. Architecture and code findings

Shared Service FAQ, reviews, process, trust, locations and model-thumbnail consumers remain distinct from protected landing renderers and the separate Shop application. The renderer/data-adapter split is maintained; no broad architectural rewrite is warranted by this audit.

The hydration fix remains version-guarded for **Next 15.5.29**, matching the installed version. `scripts/webpack/reactHydrationReplayLoader.cjs` and `next.config.mjs` retain the client-renderer transform and cache suffix. Its production/development reproduction fixtures pass. This verifies the supported webpack path; it does not establish Turbopack compatibility. Review/remove the backport deliberately on the next framework upgrade.

Pricing model adapters use `lib/content/catalogDevices.js:101–124` and the common `lib/pricing/resolveServicePricing` boundary. Direct read-only Firestore verification used project **ilab-v2**, `servicePricing.modelId == iphone-13` (11 rows) and `services.categoryId == telefonu-remonts` (12 definitions). Rendered iPhone 13 values agree with those rows: display Incell 110/OLED 150/original 170/Apple Service Pack 290 EUR; battery 70/Service Pack 120; camera 80, camera glass from 45, charge port 80, back cover from 110 and water cleaning from 50. No critical pricing discrepancy was established. Firebase remains authoritative.

Cached category/device/starting-price and FAQ readers generally revalidate after 3600 seconds; model price-row reads are direct. This is a known freshness contract, not evidence that a current price is stale. FAQ page-scope/directory policy and publication filtering remain consolidated; migrated camera/board/prices groups are not a new missing-content finding. Explicit inherited basic/category FAQ reuse is intentional.

Source-established defects are recorded as R8-01, R8-03 and R8-04 below. Existing auth/FAQ safety tests passed; inspected Admin write routes still call the shared admin-request guard. Production security rules and authenticated production writes were not exercised.

## 5. Functional verification

Rendered route families, in both LV/RU: home; iPhone and phone hubs; Samsung brand; iPhone 13 model; iPad and MacBook brand hubs; Dyson; camera; prices; FAQ directory; About; Contacts; booking; iPhone battery replacement. Correct RU battery route: `/ru/remont-iphone/zamena-batarei`.

Actual browser interactions:

- iPhone search for `iphone 13` produces four matching models; an unmatched query produces the localized empty state. A 2022 filter becomes selected and leaves two visible matching tiles. Clicking a visible tile reaches its actual model route.
- Related-model navigation reaches `/iphone-remonts/iphone-13-pro` with the corresponding H1. Model service links resolve to localized service routes and the price CTA targets `#cenas`.
- Full Locations switches to Spice Life; address, telephone, WhatsApp, email and directions reflect that branch. ArrowLeft restores Domina selection. Telephone/WhatsApp destinations match the selected public branch data. No actual call/message was initiated.
- Homepage primary booking button opens the repair dialog. Standalone booking rejects empty input with four invalid fields and sends zero requests. Filled-form HTTP 500, offline and success scenarios display the corresponding error/thank-you state. All three requests were intercepted; none reached `/api/booking`.
- Mobile menu opens after its asynchronous chunk loads; Escape closes it and returns focus to `Atvērt izvēlni`. Home language switching performs a full navigation to `/ru` and a Russian H1/shell.
- Native FAQ summary toggles with Enter, including reduced-motion context. No page-level JavaScript errors occurred in these journeys.

Quick Contacts and Full Locations retain branch-specific contact destinations; mobile conversion actions remain available. Contact-link hrefs were inspected, not used to contact staff. No claim is made about actual Resend delivery, staff receipt, external map applications or analytics conversion attribution.

## 6. Technical SEO

All 29 successful full metadata captures have a title, description, canonical and three locale alternates. Captured canonical URLs use the production domain and are present in the **514 unique URL** Service sitemap. Both dedicated iPad hub URLs are included; the historical nested-hub omission is not reproduced. Representative LV/RU canonicals and alternate targets are reciprocal.

`/robots.txt` advertises Service and Shop sitemaps and excludes API/Admin/Ads paths. Main-site `/ads` returns 404. Host-specific Ads robots behavior was verified separately using curl's explicit `Host: riga.ilab.lv` header; it serves the Ads robots asset. The earlier Node-fetch Host override did not select the virtual host and is not reliable host-routing evidence.

Breadcrumbs and internal hub/model/service links are present. Selector search/year state remains client-side rather than generating crawlable duplicate parameter URLs. Route/sitemap generation and reciprocal representative metadata support consistency; this was not an exhaustive HTTP crawl of every sitemap URL or a Search Console orphan/indexing audit. No new confirmed indexing or metadata defect was found. Similar model copy remains a content-quality risk to monitor, not a demonstrated penalty or release blocker.

## 7. Actual JSON-LD

Browser-captured JSON-LD parses across all 29 successful full captures. Global Organization, WebSite and two LocalBusiness entities coexist with page WebPage, breadcrumbs and applicable Service/FAQ/HowTo/ItemList structures. No duplicate graph IDs, dangling local graph references, obsolete `primaryEntity`, unsupported `RepairService` or `TermsOfService` types were found in this set. Provider/entity URL relationships remain coherent between locales.

Visible FAQ question order/count matches FAQPage question order/count wherever FAQPage exists, including both six-item home lists, category inheritance, camera, prices, Contacts and the directory. No hidden FAQ group or locale mismatch was established. The corrected RU battery capture also parses as JSON-LD. Booking's visible FAQ without FAQPage remains an intentional absence, not schema-only hidden content.

Business/branch and review presentation were consistent with captured public data; no unsupported warranty discrepancy was established. `lib/content/catalogDevices.js:159` still hardcodes `InStock` for priced offers. **Unverified semantic risk:** whether that means service availability or actual parts stock requires business confirmation; no out-of-stock contradiction was reproduced. Do not count this as confirmed incorrect schema. Browser/source validation does not guarantee eligibility for Google rich results.

## 8. Visual and responsive findings

Reviewed desktop/home/model/brand/Contacts and mobile/home/brand viewport captures. The approved dark editorial system, square separators, cyan supporting accents, large contained model imagery and recent hero CTA/location hierarchy remain coherent. No renewed Russian header overlap or horizontal-overflow defect was reproduced at the checked widths. Cookie consent initially overlays lower content as expected; dismissing it restores the unobstructed mobile composition.

**Process → Reviews investigation:** at 1440×1000, the process section measures about 1730px including its sticky runway. At successive normal-scroll offsets, its bottom and Reviews top remain equal (approximately 1729.9, 1229.9, 729.9, 229.9 and -270.1 viewport pixels). Step highlighting progresses and the content remains visible while sticky. There is no intervening spacer section. `HomePage.module.scss:105` adds 720px only for desktop/no-preference motion; `HomeMotion.jsx:69–71` consumes that runway. Reviews has its ordinary 112–176px section inset. Full-page captures flatten sticky positioning and exaggerate perceived emptiness. **No P1 spacing defect; no redesign recommendation.**

Minor late homepage reflow is measured separately in R8-05. Pixel-perfect matching and all offscreen visual states were not required or claimed.

## 9. Conversion findings

The homepage shows reviews before the H1, primary booking/prices actions before quieter branch information, and persistent mobile contact/booking access. Model prices, related models, service explanations and branch-specific contact destinations provide usable routes toward booking. No new CTA group or layout change is justified by the sampled journeys.

Booking error and retry states work in the intercepted browser flows. Actual email delivery and production analytics are operational release checks, not passed by simulation. Do not infer conversion lift, loss or tracking accuracy from this audit. Smaller response-hygiene and layout-stability improvements are R8-04/R8-05.

## 10. Performance and accessibility

One local unthrottled 390px run recorded the homepage hero image as LCP at about **1.98s**, with approximately **160KB transferred script responses** in that capture. The hero has high fetch priority; lower imagery is lazy; fonts are self-hosted with swap. These are local diagnostics, not field Core Web Vitals or a mobile-network benchmark. One run recorded layout shift 0.126; focused normal/reduced-motion repeats were approximately 0.0176/0.0173 and attributed a 29px hero reflow. No consistent failing field CLS claim is justified (R8-05).

Keyboard menu Escape/focus return, location-tab arrows and native FAQ Enter passed. Empty booking fields expose invalid states and localized alerts. Sampled homepage buttons have accessible names. The muted 13px location label measures approximately **4.52:1** against its dark background; it is not a confirmed contrast failure. Some inline text links are below 24px high; inline-target exceptions/spacing must be considered before calling them failures. No blanket accessibility-conformance claim is made.

Confirmed nested main landmarks are R8-03. Automated full accessibility scanning, screen-reader sessions, field CWV, complete JS-off journeys and every modal keyboard state remain outside the completed checks. Reduced-motion/native FAQ behavior was checked; continuous scroll listeners inspected use passive handlers/requestAnimationFrame and cleanup. No new leak was reproduced.

## 11. Shop and Ads isolation

- `next.config.mjs:524+` retains `/shop` and `/shop/:path*` rewrites to the separate Shop origin; middleware excludes the Shop prefix. No Shop source was modified.
- First sandboxed local requests failed with outbound **EACCES**, including Firestore and Shop proxy calls. Repeating with network access produced **200 ordinary Shop, 200 RSC prefetch, 200 Ads preview**. The historical local 500s were not reproduced as candidate application defects once connectivity was available.
- Read-only external GETs returned **200** for `https://i-lab-shop.vercel.app/shop`, `https://ilab.lv/shop` and `https://riga.ilab.lv/`.
- Explicit curl Host-header requests select the existing Ads page and Ads robots asset; main-site direct `/ads` returns 404. Active middleware routes to `/ads`, not AdsV2. No activation or tracking configuration change occurred.
- No real Ads form submission, conversion pixel event or authenticated Shop checkout was performed. Existing legacy Ads form/accessibility findings from R7 are not newly reproduced or promoted into Service release blockers here.

## 12. Prioritized remediation

### R8-01 — P1: standalone type verification is broken

**Evidence: confirmed tool/source; small scope.** `jsconfig.json:4` requests `ignoreDeprecations: "6.0"`, rejected by installed TypeScript 5.9.2 (TS5103). With a CLI-only compatible value, generated Next route contracts report TS2344 for `pageHeader` exports in:

- `app/(site)/(catalog)/datoru-remonts/[brand]/[device]/page.jsx:40` (`headerProps:44`).
- `app/(site)/(catalog)/plansetdatoru-remonts/[brand]/[device]/page.jsx:39` (`headerProps:43`).
- `app/(site)/ru/(catalog)/remont-noutbukov/[brand]/[device]/page.jsx:40` (`headerProps:44`).
- `app/(site)/ru/(catalog)/remont-planshetov/[brand]/[device]/page.jsx:39` (`headerProps:43`).

**Impact:** the intended independent verification gate cannot pass; these exports violate generated page-module contracts. The actual build passes and no corresponding runtime failure was observed, so this is **not P0**. **Correction:** align the supported compiler option with the installed compiler and move nonstandard page exports to a supported adapter/config boundary, preserving current header behavior; rerun the focused type check. Do not merely suppress generated errors.

### R8-02 — P2: two tests encode superseded component contracts

**Evidence: confirmed test/source; small scope.** `tests/quick-trust-facts.test.mjs:73` forbids homepage QuickTrustFacts although R7.5E explicitly added it. `tests/service-model-presentation.test.mjs:27` reads removed `IphoneLocationsSection.jsx`; its location contract was superseded by Full Locations consolidation. These produce the two unit failures.

**Impact:** a red suite obscures future regressions; neither failure proves a broken current user journey. **Correction:** update assertions to the approved homepage/shared location contracts while retaining meaningful count, anchor and branch-behavior coverage. No application rollback is indicated.

### R8-03 — P2: nested main landmarks on iPhone/phone hubs

**Evidence: browser and source confirmed; small scope.** `/iphone-remonts`, `/ru/remont-iphone`, `/telefonu-remonts`, `/ru/remont-telefonov` render two main elements. Layout owner: `app/(site)/layout.jsx:51`; nested roots: `IphoneRepairPage.jsx:88`, `PhoneRepairPage.jsx:59` in their catalog directories.

**Impact:** redundant document landmarks confuse assistive navigation; no broken core navigation or hydration failure reproduced. **Correction:** retain the layout main and use a non-main page wrapper, preserving IDs/styles. Historical R7-08 remains present; no broad layout refactor needed.

### R8-04 — P2: public booking responses expose diagnostics

**Evidence: source-established; small scope; not a real email reproduction.** `app/api/booking/route.js:116–139,252–276` returns debug fields in success/configuration/provider-error paths, including sender/recipient configuration, provider result ID/error and exception text.

**Impact:** unnecessary operational information can be returned to unauthenticated submitters. No private key disclosure or serious exploit was established. **Correction:** return localized/stable public outcomes and keep operational diagnostics in protected server logs; preserve real error visibility for customers. Historical R7-09 persists.

### R8-05 — P2: minor late mobile hero reflow

**Evidence: browser-measured optimization opportunity; small/medium scope depending on attribution.** `/` at 390×900: repeated load captures show hero actions/location row/image moving down approximately 29px after initial layout. Relevant presentation boundary: `app/(site)/HomePage.module.scss:19–34`; font setup `serviceFonts.js:4–22` uses swap with `adjustFontFallback:false`.

**Impact:** a small visual jump; isolated first-run CLS 0.126 did not persist in focused repeats (~0.017). This is **not a confirmed field CWV failure**. **Correction:** attribute the late text/font/review layout change and reserve stable initial metrics before adjusting styles; consider metric-compatible font fallback. Font causation is a hypothesis, not proven by the observer. Preserve the approved composition.

### Risks tracked separately — excluded from confirmed totals

Production dependency advisories remain concentrated in Firebase/Google transport/storage and Resend/Svix chains (11 moderate, 1 low entries), with further development-tool advisories. No new high/critical advisory or reachable exploit was established. Plan a controlled dependency follow-up with authentication, FAQ, booking and hydration checks; do not run indiscriminate major upgrades or `audit fix --force` during release review.

The hardcoded offer availability semantic risk, field CWV, real email/analytics, deployed rule enforcement and exhaustive sitemap crawling remain unverified, as described above. They are not extra confirmed P0/P1 findings.

## 13. Recommended release checklist

1. Resolve R8-01 and make the supported standalone type check pass; reconcile R8-02's approved contracts and obtain a green unit run.
2. Apply any separately authorized small fixes as targeted patches. Recheck only affected behavior, then perform the release gate once on the final candidate; no fixes are included in this audit.
3. Confirm production environment and an explicitly authorized real booking/delivery/receipt check, including both branch recipients. Confirm analytics with the actual consent policy in a controlled session.
4. On the approved deployment candidate, smoke-check LV/RU model pricing/booking/language, sitemap/robots, active Riga Ads and separate Shop ordinary/RSC requests. Keep AdsV2 inactive.
5. Monitor deployed runtime/hydration errors and field CWV after rollout; preserve rollback and the version-guarded React patch contract during framework updates.

**Final confirmed totals: P0 0 / P1 1 / P2 4.** No production data was changed. Stop at this report; implementation and deployment remain separate decisions.
