# R7 pre-deployment QA and regression audit

Audit date: **November 4, 2026 (Europe/Riga)**. Intended release: November 5, 2026. Original R7 was audit only; the authorized R7.1, R7.2 and R7.3 remediations are recorded below. No staging, commits, pushes, merges, deployments, Firebase writes or real inquiries/orders.

## Executive summary

**Current verdict after R7.3: READY WITH CONDITIONS. R7.1 PASS; R7.2 PASS; R7.3 PASS.** The dependency-security blocker **R7-12 is resolved for the local release candidate**: Next.js 15.5.29, patched image/CSS/Firebase transport dependencies, and zero critical/high entries in both production and complete dependency audits. R7.2 closes R7-01 (pricing) and R7-02 (header); R7.3 closes R7-05/06/07/11 (technical SEO). Five original P2 findings remain open, as do the operational checks and the intermittent hydration observation documented below. This is not deployment approval or a claim that production has already been patched.

| Priority | Findings | Evidence status |
| --- | ---: | --- |
| P0 | 0 | No confirmed critical failure |
| P1 | 0 open / 1 resolved | R7-12 resolved by R7.1; neither former R6 blocker reproduced |
| P2 | 5 open / 6 resolved | R7-01/02 resolved by R7.2; R7-05/06/07/11 resolved by R7.3; original evidence retained below |
| P3 | 0 | Planned polish is listed separately rather than counted as defects |

Original R7 dependency baseline: 27 production entries (4 critical, 11 high, 11 moderate, 1 low). R7.1 reduces this to **12 production entries: 11 moderate, 1 low**, assessed below. Both audits still exit 1 because residual findings remain. Package counts are not unique vulnerabilities or verified exploits.

Remaining P2 items are Russian selector fallback strings (R7-03), protected Riga landing form errors/focus (R7-04), nested main landmarks (R7-08), public booking diagnostics (R7-09), and text contrast (R7-10). Historical findings below retain the original R7 evidence; current remediation results take precedence.

Unverified release risks are actual email delivery, deployed Firebase rules and their pending Shop rollout, remote analytics/conversion configuration, and real-device/browser coverage. These are verification gaps, not confirmed production failures.

## R7.1 — Security dependency remediation, November 4, 2026

**Result: PASS. R7-12 closed for the current local candidate.** Changed files: `package.json`, `package-lock.json`, this report. Application code, tests, configuration, middleware, Ads, Shop, content, translations, pricing and styling are unchanged. All work remains uncommitted. No global Codex setting was changed and no subagent was used.

### Version selection and changes

| Direct package | Before | After |
| --- | --- | --- |
| Next.js | 15.4.8 | **15.5.29** |
| React / React DOM | 19.1.0 | **19.1.10** |
| eslint-config-next | 15.4.6 | **15.5.29** |

The registry's latest stable Next 15 release was 15.5.29. Its [November 3 release](https://github.com/vercel/next.js/releases/tag/v15.5.29) includes security fixes beyond October's 15.5.28, including response/header disclosure and SVG rejection fixes. The [October security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026) establishes the earlier image/RSC fixes and sharp security floor. React stays on the existing 19.1 minor; Node 22.22.2 and ESLint 9.33.0 satisfy the selected packages' peer/engine requirements. No Next 16 migration was performed. Installed Next contained no bundled guides directory; its README and the official version-15 upgrade guide were consulted.

Other manifest dependencies, including Firebase 12.7.0, Firebase Admin 13.6.0, Resend 6.4.2 and Sass 1.90.0, retain their previous versions/ranges. Named compatible transitive updates replace vulnerable implementations; no indiscriminate update, `npm audit fix --force`, audit suppression or application workaround was used.

Two scoped overrides are necessary because upstream pins prevent ordinary updates: **Next → PostCSS 8.5.32**, and **@firebase/firestore → @grpc/grpc-js 1.14.7**. These install actual patched code in the same major API lines. The former replaces Next's exact 8.4.31 dependency; the latter replaces Firestore's `~1.9.0` dependency and deduplicates it with the patched Admin transport. npm initially retained a stale nested gRPC lock entry: isolated npm re-resolution removed that entry, and both the installed tree and fresh `npm ci` verified the intended version. Revisit the overrides when upstream dependency ranges permit their removal. Compatibility evidence includes a full build and a real Node Firebase SDK read returning nine iPhone 12 pricing rows, including the expected battery price of 70.

### Classification of the 27 original production entries

All rows below were present in `npm audit --omit=dev`; “build” describes actual use despite installation as a production dependency. **D** = direct, **T** = transitive. Severity is the original registry classification, not a claim of application exploitability. “Residual” means still reported and assessed in the following subsection.

| Package | Severity / relationship | Current role/exposure and result |
| --- | --- | --- |
| next | Critical / D | Public App Router/image/rewrite paths; **15.5.29**, original advisories cleared |
| fast-xml-parser | Critical / T | Optional Admin Storage XML; **4.5.3 → 4.5.7**, critical/high fixed; residual moderate builder issue |
| protobufjs | Critical / T | Firestore transport/schema handling; **7.5.4 → 7.6.6**, cleared |
| websocket-driver | Critical / T | Realtime Database chain, unused by Service's Firestore flows; **0.7.4 → 0.7.5**, cleared |
| @fastify/busboy | High / T | Admin multipart helper; **3.2.0 → 3.2.4**, cleared |
| @grpc/grpc-js | High / T | Outgoing Firebase transport; root/nested copies replaced by **1.14.7**, cleared |
| form-data | High / T | Outgoing HTTP multipart helper; **2.5.5 → 2.5.6**, cleared |
| immutable | High / T | Sass/build data structures, no public collection input; **5.1.3 → 5.1.9**, cleared |
| jws | High / T | Authentication/JWT chain; **3.2.2 → 3.2.3**, **4.0.0 → 4.0.1**, cleared |
| nanoid | High / T | CSS/tool-generated identifiers; **3.3.11 → 3.3.20**, cleared |
| node-forge | High / T | Admin credential/crypto helper; **1.3.1 → 1.4.3**, cleared |
| picomatch | High / T | File/glob tools; **2.3.1 → 2.3.2** (nested 4.x also patched), cleared |
| postcss | High / T | CSS build processing, trusted repository CSS; **8.4.31 → 8.5.32**, cleared |
| sharp | High / T | Public image optimizer; **0.34.5 → 0.35.5**, cleared; actual optimized GETs return 200 |
| source-map-js | High / T | Build source maps; **1.2.1 → 1.2.2**, cleared |
| @protobufjs/utf8 | Moderate / T | Protobuf decoding helper; **1.1.2**, cleared |
| @google-cloud/firestore | Moderate / T | Used server SDK; residual inherited UUID finding |
| @google-cloud/storage | Moderate / T | Optional Storage SDK, no Service Storage flow; residual XML/UUID findings |
| firebase-admin | Moderate / D | Used for auth/server reads; own UUID copy **11.1.0 → 11.1.1**; inherited Firestore finding remains |
| gaxios | Moderate / T | Trusted outgoing Google HTTP calls; residual inherited UUID finding |
| google-gax | Moderate / T | Firestore transport wrapper; residual inherited UUID chain |
| resend | Moderate / D | Only `emails.send` used; residual inherited Svix/UUID finding, no affected webhook/buffer call found |
| retry-request | Moderate / T | Outgoing retry wrapper; residual inherited UUID chain |
| svix | Moderate / T | Resend webhook dependency, no Service webhook handler; residual UUID finding |
| teeny-request | Moderate / T | Outgoing HTTP helper; residual UUID finding; inspected identifier use is `v4()` |
| uuid | Moderate / T | Compatible Admin copy patched; older range-bound SDK copies remain; inspected consumers use `v4()` |
| @tootallnate/once | Low / T | Outgoing proxy helper; residual local callback/control-flow issue, no public input path demonstrated |

Full audit before: **33 entries (4 critical / 15 high / 13 moderate / 1 low)**. Six additional original development-only entries were `@humanfs/node`, `ajv`, `brace-expansion`, `flatted`, `js-yaml`, `minimatch`; they are lint/file/config tooling, not public request handlers. Named compatible updates addressed their high findings. Full audit after: **18 entries (0 critical / 0 high / 17 moderate / 1 low)**. Production after: **12 entries (0 critical / 0 high / 11 moderate / 1 low)**. Six development-only moderates now comprise minimatch and five inheriting TypeScript-ESLint packages; counts include inherited advisories and are not unique CVE totals.

### Remaining risk assessment

- **UUID and its inheriting SDKs (moderate):** the [vendor advisory](https://github.com/uuidjs/uuid/security/advisories/GHSA-w5hq-g745-h8pq) affects `v3/v5/v6` with caller-provided output buffers/offsets. Service has no such call; inspected Google-gax, Storage, teeny-request and Svix consumers use `v4()`. The directly compatible Admin UUID patch was applied. Range-bound older copies require parent/SDK changes; npm proposes an Admin major upgrade for parts of the chain. A forced cross-major UUID override or broad SDK modernization is not justified for this currently unexposed API shape. Reassess if those APIs become reachable.
- **fast-xml-parser (moderate):** the remaining [builder advisory](https://github.com/NaturalIntelligence/fast-xml-parser/security/advisories/GHSA-gh4j-gqv2-49f6) requires attacker-controlled XML comment/CDATA data. The optional Storage SDK contains a builder, but Service does not call Storage/transfer-manager or generate user-supplied XML. Parser 5.7+ fixes it; forcing a major parser into Storage's 4.x range adds compatibility risk for an unused flow. Critical/high parser issues are fixed in installed 4.5.7.
- **once (low):** callback-scoping issue in an older outgoing proxy chain; no untrusted callback/agent selection was found. A patched major exists; defer the parent proxy-chain update rather than alter otherwise working Google SDK behavior.
- **Development minimatch chain (moderate):** the [pattern-amplification advisory](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249) remains under TypeScript-ESLint's range-bound minimatch 9.0.9. Lint uses repository-controlled patterns; no production glob input endpoint exists. Resolving it requires coordinated tooling changes outside this security stabilization pass.

These are scoped source/API assessments, not proofs that every SDK feature is safe. No applicable unassessed critical/high dependency risk remains in the audited tree. Further broad SDK/tooling updates are not required to clear R7-12 for the current implementation; the residuals remain visible in audit output and must be reconsidered if exposed features change. A clean production-platform build and the original hosted operational checks still belong to deployment preparation.

### Validation and compatibility

Clean-install production build: **`ewfVXkV-FXeRjn-hjpRs_`**, Next **15.5.29**, **119 generated entries**, temporary preview port 3108. Existing environment values were loaded in memory after installation; no `.env` file was copied and no write/import script ran.

| Check | Result |
| --- | --- |
| `npm ci --no-fund --no-audit` in isolated source snapshot | **Pass**, 513 packages installed from the updated lockfile |
| `npm ls --all --json` | **Exit 0**, no invalid/unsatisfied dependency; npm lists two lockfile-present optional Sharp WASM artifacts as extraneous on Windows, also reproducible after clean install; native optimizer verified |
| Production/full `npm audit --json` | Still exit 1 for residuals: **12 / 18 entries**; **zero critical/high** in both scopes |
| `npm test` | **32/32 pass**, existing tests unchanged |
| `npm run lint` | **Pass**; Next 15.5 warns that `next lint` is deprecated for Next 16; script migration is unnecessary here |
| `next build` after clean install | **Pass**; existing Sass/autoprefixer warnings remain |
| Reused full crawl, run once | **514 × 200**, two intended 307 aliases, one 308; zero broken links/fragments; metadata, H1, language, canonical, alternate, robots and JSON-LD inventories exactly match R7 on all 514 pages |
| Redirect regression | **28/28 sources, 128/128 destinations pass** |
| Firebase | Clean build/server Admin reads work; public Node SDK reads **9 iPhone 12 pricing rows** through patched transport; final **8/8 pricing keyboard/brand/model cases pass**, no runtime exceptions |
| Booking/navigation | LV/RU required validation, mocked 422/error and 200/success/focus pass; **4 intercepted POSTs, 0 real submissions**; **2/2 model → service → booking journeys pass** |
| Ads | Riga Host `/`, service-looking path and robots remain correct; normal-host `/ads` stays 404, V2 remains noindex preview; production/local H1 geometry, headings and contacts match at **375/1440px** |
| Shop | `/shop`, `/shop/iphone`, sitemap, sampled CSS/JS return 200; browser Service → Shop and brand navigation work; brand's actual absolute `https://ilab.lv/` Service link resolves correctly |
| Security/404/image smoke | Anonymous admin reads 401, admin page redirects to login/noindex, four unknown routes 404/noindex; native optimized image GETs return 200 |
| Scope/preservation | Only manifest, lockfile and this report changed against the **6,061-file R7.1 baseline**; scoped `git diff --check` passes; no source/test/config/business/UI changes |

The initial concurrent browser run observed an intermittent recoverable React hydration #418 event during same-tab pricing/navigation; a diagnostic same-tab run also observed it. Its cause is **unproven**, not classified as an established pre-existing defect. The final strict eight-case pricing repeat, four fresh production page loads and three development loads recorded zero such errors; the original R7 runtime's eight-case pricing comparison also passed. No persistent functional failure was found and no speculative application workaround was added. Retain this observation for the final real-device/navigation smoke before deployment. An early fixed-delay Shop sample and a relative-return-link assumption were corrected with DOM-readiness checks and the actual absolute Service link; they are not application defects.

The first root install completed with a Windows cleanup warning for the old SWC DLL held by the pre-existing development process. The clean snapshot installs and builds the new native stack successfully; that existing development server was not stopped or treated as the patched test server. Restart it normally to load updated dependencies. All R7.1-created preview/diagnostic/baseline servers are stopped after verification. Transient logs/JSON evidence remain outside the repository at `C:/Users/info/AppData/Local/Temp/ilab-r71-DDfNP2`; no screenshot collection was added.

**Release action:** R7-12 is cleared locally. The 11 original P2 issues, hydration observation and hosted/manual checks remain; no R7.2 work or deployment is authorized or started by this result.

## R7.2 — Adaptive header and pricing consistency, November 4, 2026

**Result: PASS. R7-01 and R7-02 closed for the local candidate.** Nine original P2 findings and the previously recorded operational/manual checks remain. R7-04 is explicitly deferred; Ads is unchanged. This is not deployment approval.

**Header:** every navigation item previously rendered into a shrinking grid cell, allowing intrinsic content to extend into Shop/actions; no active priority-overflow implementation existed. Service now opts in through its layout: the existing switcher sits beside the logo, before navigation. Its icon, colors, hover/focus treatment, established /shop destination and localized single label (Veikals / Магазин) remain. The duplicate actions switcher is disabled for this Service state; shared landing consumers retain their arrangement.

DesktopNav measures available width and control widths, reserving More before retaining the ordered links that fit. Lower-priority parent links and children move into the existing More dropdown without losing destinations. ResizeObserver and font readiness refresh measurements. The existing hamburger/drawer remains below 1024px; adaptive 1024–1199px text uses the established 14px size instead of the former 12px squeeze.

| LV and RU width | Regular links beside More | Result |
| --- | ---: | --- |
| 375 / 768 | Existing mobile menu | Labeled switcher; drawer open/focus/Escape pass |
| 1024 | 3 | Readable labels; lower destinations in More |
| 1280 | 4 | No collision or clipping |
| 1366 | 5 | All regular links fit |
| 1440 | 4 | Existing full utility CTAs return, reducing available navigation space |
| 1600 | 5 | All regular links restored |

**Pricing:** manual administration and model pages use servicePricing. modelServices is the stale legacy store used by the general phone selector, not an authoritative override source: iPhone 12 original/OLED were 170/130 there versus published 190/140, and Galaxy S26 Ultra has no legacy rows. Live services definitions own exact variant IDs, applicability, embedded families and order; the separate serviceFamilies collection is empty. Prices join model slug and exact service ID.

The general selector now reads servicePricing and services, using the model-page item resolver extracted to lib/pricing/resolveServicePricing.js. Legacy presentation IDs map only to exact catalog IDs, including the direct iPhone-camera consumer. Active/hidden flags, numeric/null values, starting-from flags, localized labels, families and sorting are preserved. Explicit requested order keeps a missing original price from borrowing another variant's price. No lowest-price selection, model exception, legacy-price fallback, Firebase writes or schema changes were introduced; the unused legacy helper remains untouched.

Read-only Firebase and **13/13 rendered cases** verify Galaxy S26 Ultra original screen **320 €** and battery **90 €** in LV/RU; camera on request beside camera glass **60 €**; Xiaomi Redmi 13C on request; iPhone 12 original/OLED/Incell **190/140/100 €** in dedicated LV/RU and general selectors; direct LV/RU camera **80 €**. Four model-page checks preserve these amounts and iPhone battery **70 €**. Tests also cover absent rows, inactive/hidden/non-numeric prices and exact variant priority.

**Validation:** **39/39 tests**, lint and scoped git diff --check pass. Final isolated Next.js **15.5.29** build **nCwstaWB4BrLT4PuIjsX0**, **119 generated entries**, passes; existing Sass/autoprefixer and next lint deprecation warnings remain. Required LV/RU widths plus four shrink/grow repeats pass (**18/18 states**): one labeled switcher, stable 72px height, no horizontal overflow, no missing destinations and zero pointer-hit failures, including RU 1440px and dropdown links. Four representative screenshots were visually reviewed. **12/12 route responses, 4/4 model prices, 2/2 locale switches and 2/2 model → service → booking-dialog journeys pass**, with zero runtime exceptions and no submissions. Browser checks wait for route/data readiness and use text content inside collapsed model series. The 514-route crawl was not repeated.

All changes remain uncommitted. Preservation was checked against **9,390 existing tracked/untracked files**; only scoped header/pricing/test/report files changed. Ads/AdsV2, middleware, Shop, SEO metadata, rules, forms, CTA Dock, dependencies, fonts/tokens and R7.1 updates are preserved. The user's dev server stayed running; build/preview output used an isolated .next directory, and the isolated preview was stopped after checks. No staging, commits, pushes, merges, global setting changes or deployment occurred.

## R7.3 — Technical SEO and deployed Shop sitemap, November 5, 2026

**Result: PASS for the local candidate.** R7-05, R7-06, R7-07 and R7-11 are resolved. Five original P2 findings and the existing hosted/manual conditions remain; no deployment is authorized by this result.

| Issue / affected routes | Confirmed cause and correction | Final evidence / remaining limit |
| --- | --- | --- |
| R7-07: global branches, page graphs, LV/RU Terms | Invalid RepairService and TermsOfService types and primaryEntity property were confirmed against the fresh [official Schema.org vocabulary](https://schema.org/version/latest/schemaorg-current-https.jsonld). Retain LocalBusiness; use WebPage for Terms; retain mainEntity and remove its invalid duplicate. Rendered checks also exposed global www entity IDs conflicting with non-www page references: global IDs now use existing SITE_URL, and Terms references use the same organization ID. Business data and Firebase remain unchanged. | 52 JSON-LD scripts across 26 rendered pages parse, use recognized types/properties and have no unresolved local references or contradictory sampled entity names. Localized WebPage data and breadcrumb entries pass. Valid FAQPage/Service/Organization data is retained; recognized vocabulary is distinct from Google eligibility. |
| R7-05: /plansetdatoru-remonts/ipad and /ru/remont-planshetov/ipad | Dedicated-hub handling previously discarded the nested suffix. Preserve the full configured suffix while translating the category through existing route mappings. | Sitemap 512 → 514 unique URLs: exactly these two additions, zero removals. Both are canonical/indexable rendered pages. All entries match the existing valid-route inventory, with reciprocal LV/RU/x-default alternates and no preview/internal URLs. |
| R7-11: Huawei P30 Pro LV/RU, shared Service metadata | A visible device-photo path was incorrectly selected for social metadata and returned 404. The shared metadata builder now consistently uses the already approved global OG artwork, retaining its existing LV/RU language variants and global image alt text. Specific titles, descriptions and their overrides remain. No artwork was created or changed. | Both existing JPEG assets return 200 publicly and locally; local images are 1200×630. All 26 sampled pages emit one correct OG image and matching Twitter image, including P30 Pro. |
| R7-06: root robots / deployed Shop sitemap | Root robots advertised only Service. The current deployed Shop sitemap was independently verified before adding its URL using the existing metadata route. | Root robots advertises https://ilab.lv/sitemap.xml and https://ilab.lv/shop/sitemap.xml; existing allow/disallow rules are unchanged. Riga-host robots remains isolated. |

**Live Shop:** public and upstream sitemap endpoints return direct **200 application/xml**, identical valid XML, **744 unique public URLs**; no internal host, localhost, query, admin/API or /shop/shop entries. Six samples from the currently deployed Shop return 200 without indexing prohibitions and appear in the sitemap. Their HTML has **no canonical tags**: this is a separate Shop-side follow-up, not evidence of a broken sitemap or a reason to require the unfinished Shop redesign. Local Service proxy /shop and /shop/sitemap.xml pass. Shop source, deployment and rewrites are unchanged.

**Metadata/hreflang:** 26 representative LV/RU pages cover home, iPhone hub/model/service, Samsung and Huawei models, tablet/iPad hubs, computer hub/model, Dyson, camera and Terms. Each retains the recorded specific title/description, one self-canonical and correct reciprocal LV/RU/x-default URLs. Six actual language-button destination captures agree with these pairs. No slug or canonical/hreflang template changes were necessary.

**Validation:** **45/45 tests**, lint and scoped diff check pass. Final isolated Next.js **15.5.29** production build **nsmspTr9tfmkL-Oro52ta** passes with **119 generated entries**. Existing Sass/autoprefixer and next-lint deprecation warnings remain. An initial restricted build could not fetch the existing Inter font; the network-enabled build passed. Final rendered checks record zero runtime exceptions. Raw HTTP Ads-host root/robots checks pass with standard next start; main-host /ads remains 404. The loopback-specific preview binding and Node fetch Host override were unsuitable harness configurations, corrected without application routing edits. No full crawl or visual comparison was repeated.

Changed files: app/robots.js; app/sitemap.js; lib/seo/{siteSchema.js,jsonld.js,buildSeoMetadata.js}; LV noteikumi and RU pravila page adapters; tests/service-r73-seo.test.mjs; this report. Preservation checks cover 9,394 existing files: only the nine intended files changed/added, none are missing or unexpected, and final code matches the built snapshot. Existing R7.1/R7.2 work and all protected areas are preserved. The isolated preview is stopped and the pre-existing dev server remains untouched. Temporary evidence remains outside the repository at C:/Users/info/AppData/Local/Temp/ilab-r73-DiRpwa; no screenshot archive was created.

**Limits and safety:** local vocabulary/rendered validation was performed; neither the external Schema.org validator nor Google Rich Results Test was run. Search Console discovery/indexing and post-deployment checks remain manual/hosted work. Existing stock-availability semantics, operational checks and the earlier intermittent hydration observation remain as previously recorded. No Firebase writes, inquiries, orders, staging, commits, pushes, merges, global configuration changes or deployment occurred. All changes remain uncommitted; no R7.4 work was started.

## Audited state and boundaries

- Service: `C:/Users/info/Desktop/website/iLab`, branch `feature/redesign-integration`, origin `https://github.com/iLab-lv/iLab.git`, HEAD `ea79068ddc72110b66ab1f38ae698a343b80fbdc`.
- The substantial existing modified/untracked work was recorded before validation. A SHA-256 baseline covered **6,060 existing files** in application, public assets, tests, documentation and relevant configuration. Preservation was checked again at completion; this report is the only repository addition made by R7.
- Reference: `C:/Users/info/Desktop/website/iLabRedesign`, branch `main`, origin `https://github.com/askoldas/iLabRedesign.git`; read only. Shop: `C:/Users/info/Desktop/shop`, branch `home_design`, origin `https://github.com/iLab-lv/iLab-shop.git`; read only, 144 porcelain status entries. No obsolete clone was used. Git ownership exceptions were command-local; no global configuration changed.
- Production baseline: actual HTTP responses from `https://ilab.lv`, `https://riga.ilab.lv` and `/shop`, plus rendered Ads comparisons. The hosted storefront was observed; its exact correspondence to the uncommitted local Shop release was not established.
- Final isolated build: **`SQpCBQNvWSnjs2bnJe-yg`**, Next.js **15.4.8**, 119 generated entries. A source copy and dependency junction were built outside the repository and served on port **3107**. The pre-existing development server and root `.next` were left in place. Existing environment values were loaded into child process memory; no credentials file was copied into the preview or report.
- Terminal work used Git Bash through the host's required executable launcher. The initial environment-discovery command used the host's PowerShell default before the attachment's shell restriction was read; it performed reads only. No PowerShell application/file mutations followed.

Reviewed documentation includes the redesign migration/component contracts, `REDESIGN_VISUAL_AUDIT.md`, R1 index, R2–R6 reports, R6 link remediation and hero correction notes, Ads V2 boundaries, and Shop S2.1/rules rollout notes. Historical evidence was not overwritten or treated as a current result. Applied skills: webapp-testing, seo-audit and the locally found web-design-guidelines. The requested schema-markup skill was unavailable; actual JSON-LD and the official vocabulary were checked directly.

## Regression matrix

| Area | Result and practical limit |
| --- | --- |
| Routing | **Pass.** 517 unique destinations: 514 HTTP 200 pages, two intended 307 aliases, one 308 alias. Zero broken internal-link destinations or dangling fragments. Four unknown route/brand/model probes returned 404 with noindex. All 128 static internal redirect destinations and 28 previously affected redirect sources passed; 426 configured rules inventoried. |
| Localization | **Pass with P2 exceptions.** Actual LV/RU document language, localized route families, reciprocal alternates, mobile menus and tested locale switches work. Some selector fallbacks remain Latvian (R7-03). |
| Firebase | **Live reads verified, with pricing inconsistency.** Admin SDK reads and network-enabled browser pricing reads succeeded; no fixtures were presented as live data. See data contracts below and R7-01. |
| Interactions | **Pass with protected-form exception.** Eight menu/FAQ/locator keyboard cases, two locale switches, two model → service → booking journeys, contact drawers, and eight pricing selector cases passed. Standard booking validation/error/success passed in both locales. Ads error/focus deficiencies remain (R7-04). |
| SEO metadata | **Pass with limited asset exception.** All 514 intended pages had titles, descriptions, one expected canonical, LV/RU/x-default alternates and no unexpected noindex. Sampled rendered head metadata had no duplicate conflicting keys. OG/Twitter output exists; Huawei P30 Pro OG image is 404 (R7-11). |
| JSON-LD | **Parsing passes; semantic corrections needed.** All crawled blocks and 76 rendered states parsed. No contradictory same-ID entities found in 40 sampled routes. Valid primary Service/LocalBusiness structures remain, alongside unsupported vocabulary (R7-07) and an availability verification gap. |
| Sitemap/hreflang | **Pass with omissions.** Service XML parses: 512 unique canonical HTTPS URLs, reciprocal matching alternates, no private/Ads/preview entries. Both iPad brand pages are missing. Shop XML parses with 744 URLs but is not advertised by root robots (R7-05/06). |
| Protected Ads | **Routing/fallback preserved.** Real production and local Host-header checks agree. At 375/1440px, Ads H1 geometry, type size, headings and contact links match production. No automatic Ads V2 activation. Original forms retain R7-04. |
| Shop proxy | **Observed pass.** Local and hosted `/shop` and `/shop/sitemap.xml` return 200; sampled proxied CSS returns 200. Clicking Service → Shop → `/shop/iphone` works; reverse Service links exist. No loop observed in these journeys. Shop SEO/auth/checkout is outside the Service release approval. |
| Responsive UI | **Pass with P2 exceptions.** 76 states across 40 routes; 12 representatives at 375/768/1024/1440px. No document overflow, missing visible images or JS runtime exceptions. Six representative screenshots were visually inspected. Russian header hit-testing fails at 1440px (R7-02); focused contrast checks fail (R7-10). |
| Build/tests/lint | **Pass.** 32/32 existing tests; lint without warnings/errors; network-enabled production build succeeds. Initial font download failure was environmental. Existing Sass/autoprefixer warnings remain. |
| Security configuration | **R7.1 follow-up: dependency gate cleared locally.** Next.js 15.5.29 and patched transitive code pass the checks above; zero critical/high audit entries. Moderate/low residuals are assessed in R7.1. Original admin/secret-isolation checks remain valid; booking diagnostics remain exposed in unchanged source (R7-09). No penetration-test or deployed-rules certification is claimed. |

### Current architecture and resolved historical regressions

The main site uses `(site)` with separate LV/RU adapters and shared content/pricing/SEO helpers. iPhone has a dedicated hub/model family; other phones, tablets and computers use category/brand/model routes. Individual repair routes exist for phone/iPhone services; tablet/computer service cards are intentionally informational. Camera, Dyson and information pages retain their own adapters. `(lp)`, `landings`, original `ads` and the noindex `adsV2` preview remain separate consumers. `/shop` and descendants bypass Service middleware and use the existing beforeFiles proxy to `https://i-lab-shop.vercel.app/shop`.

- **Camera fix stays resolved:** Russian camera H1 glyphs fit at all four requested widths; at 375px glyph bounds are x=20…355. The discretionary break and full supporting text were visually inspected. Desktop title/image overlap is intentional, with readable text above the image.
- **Tablet/computer link fix stays resolved:** sampled LV/RU tablet model cards retain five service articles and zero service links; computer cards retain six and zero links. The full crawl found no unsupported service destinations. Phone model links still navigate to real services and open booking drawers.
- Earlier broken FAQ/process fragments, obsolete computer spelling, Lenovo/iPhone SE redirects and RU contact alias remain resolved in fresh crawl/redirect checks.

## Prioritized issue register

R7-12 was **P1 and blocked deployment**, and is **resolved locally by R7.1**. R7-01 through R7-11 remain **P2**, do not individually block deployment under this audit's severity criteria, and require correction or explicit acceptance. “Confirmed” distinguishes directly observed versions/output/behavior from an untested exposure hypothesis or an old report.

### R7-12 — Production dependency stack contains unpatched framework vulnerabilities

**Original severity:** P1. **Current status:** **Resolved by R7.1 for the local candidate; no longer blocks it.** See R7.1 above for installed versions, audit residuals, regression checks and limitations. The original R7 evidence below is retained; it does not describe the updated local installation. Production deployment remains separate and unperformed.

**Expected:** a supported patched framework/runtime dependency set with current security findings addressed or individually shown inapplicable. **Actual/evidence:** the isolated build and installed package both identify **Next.js 15.4.8**, with **sharp 0.34.5**, React/react-dom 19.1.0. The read-only production audit returns 27 affected package entries. The vendor's [App Router RSC DoS advisory](https://github.com/vercel/next.js/security/advisories/GHSA-mwv6-3258-q52c) explicitly includes 15.4.8 and describes requests that can hang the server. Its [security update](https://nextjs.org/blog/security-update-2025-12-11) documents additional fixes and says an upgrade is required. Thus a successful build does not make this framework version suitable for release.

Current vendor advisories also include [SVG optimizer RCE](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw), fixed in Next 15.5.28/16.4.1 or mitigated for that particular issue by sharp >=0.35.5. This issue is conditional on glibc Linux/image input exposure; the production binary/platform and attacker-controlled image reachability were not verified. Do **not** report demonstrated RCE/P0. The latest Server-Actions-specific DoS also requires an action: this build's server-reference manifest contains zero registered actions, so that particular advisory is not used as the blocker proof. The earlier vendor App Router advisory and unpatched package inventory remain the basis for the P1 gate.

The audit also flags actual installed `protobufjs@7.5.4` (Firebase/Admin Firestore chains), `fast-xml-parser@4.5.3` (Admin Storage chain), and `websocket-driver@0.7.4` (Firebase Realtime Database chain) as critical package entries. Installation alone does not prove these public Service routes accept the malicious inputs required by each advisory; assess/update those chains instead of labeling them confirmed remote compromises. Registry counts include inherited findings and are not unique CVE counts.

**Correction:** select a currently supported patched Next/React/sharp combination addressing the complete current advisory set, then review the Firebase/Admin/Resend transitive findings and lockfile. The cited October 2026 Next advisories list 15.5.28/16.4.1; confirm the chosen release against all current advisories rather than stopping at an older historical fix such as 15.4.10. Do not run an automatic forced dependency upgrade without compatibility review. After a separately authorized dependency change, rerun audit, tests, lint, production build, routing/metadata, protected Ads and Shop proxy smoke. No dependency or lockfile was changed during R7. Installed vulnerability state is confirmed; platform-specific exploitation and current production deployment version were not asserted.

### R7-01 — Phone repair selector uses incomplete legacy pricing

**Status:** Confirmed. **Routes:** `/telefonu-remonts/ekrana-maina`, `/ru/remont-telefonov/zamena-ekrana`; compare `/telefonu-remonts/samsung/galaxy-s26-ultra`.

**Expected:** The same model/service shows the same published price across model and service views. **Actual/evidence:** selecting Galaxy S26 Ultra renders “Remonta cena / pēc pieprasījuma” in both phone-service selectors, while its model page displays original screen replacement **320 €**. Read-only Firebase verification found no `modelServices` rows for this model but a `servicePricing` original-display row priced 320. The client reader in `app/(site)/components/service-pricelist/BrandPickerPricelist.jsx:163` reads the legacy collection; model adapters read `servicePricing` through `lib/content/catalogDevices.js:106`.

**Correction:** establish the authoritative pricing contract and align/migrate the phone-service reader with explicit service-ID mapping and missing/hidden-price behavior. Retest older and newer models in both locales. Do not bulk overwrite Firebase to conceal the divergence. This is an existing parallel-data-path problem; no redesign introduction is established.

### R7-02 — Russian desktop More menu is covered by Shop

**Status:** Confirmed. **Component:** `app/(site)/ui/navbar/NavBar.module.scss:266`, responsive rules at 340–354.

**Expected:** each navigation target has an unobstructed pointer area. **Actual/evidence:** at 1440px on `/ru`, “Ещё” spans x=886.47…952.41; hit-testing its center resolves to the `/shop` anchor. The rendered Russian camera screenshot shows the same overlap. Sampled 1024px menus and desktop keyboard dropdown entry work.

**Correction:** fit the complete Russian navigation/actions at the desktop breakpoint and verify real pointer targets. This functional collision is distinct from the planned switcher relocation, which alone is cosmetic.

### R7-03 — Russian selectors retain Latvian fallback strings

**Status:** Confirmed. **Components:** `app/(site)/components/service-pricelist/ServicePricelist.jsx:124`, `BrandPickerPricelist.jsx:226`; service-series metadata consumed by the sections variant.

**Expected:** Russian interface/fallback messages. **Actual/evidence:** the RU phone screen selector displays “Remonta cena”, “pēc pieprasījuma”, “Citi modeļi”; RU iPhone screen pricing includes “iPhone 18 sērija” among Russian series labels. The component source also hardcodes the Latvian Firebase error message.

**Correction:** pass the existing locale through the legacy price component and localize fallback/error strings; complete missing RU series metadata with an appropriate fallback. Existing localization issue, freshly reproduced.

### R7-04 — Original Ads lead sheets give silent errors and miss initial focus

**Status:** Confirmed. **Routes:** `/?ads=1&form=price`, `booking`, `delivery`; original Riga-host landing. **Owner:** `app/landings/_components/ui/forms/LandingLeadForm.jsx:59–84` and its sheet callers.

**Expected:** visible/localized validation or server error, focus within an opened modal, and an announced success state. **Actual/evidence:** all three sheets stayed open without alert/status text after intercepted 422 responses; focus was initially outside the modal. All three displayed success after intercepted 200 responses. Six requests were fulfilled by CDP; none reached the endpoint. `onError` is optional and the current flow does not surface it.

**Correction:** add error/validation presentation and initial focus through a separately scoped protected-Ads change, preserving the approved landing and fallback. Source and production comparison indicate this is retained behavior, not a newly switched Ads implementation.

### R7-05 — Service sitemap omits both iPad brand pages

**Status:** Confirmed. **Routes:** `/plansetdatoru-remonts/ipad`, `/ru/remont-planshetov/ipad`. **Owner:** `app/sitemap.js:180–190`.

**Expected:** both linked canonical/indexable brand pages included. **Actual/evidence:** each returns 200 with correct metadata; neither is among the 512 XML URLs. The dedicated-hub branch retains only the first path segment, collapsing the nested iPad hub to the tablet category before de-duplication.

**Correction:** preserve the complete dedicated path and correct localized equivalent, retaining existing URLs/alternates. This is the still-reproducible R6 sitemap omission.

### R7-06 — Reachable Shop sitemap lacks root discovery

**Status:** Confirmed. **Owner:** `app/robots.js:22` and unchanged Shop rewrites in `next.config.mjs`.

**Expected:** root-domain discovery advertises the separate Shop sitemap as well as Service's. **Actual/evidence:** hosted and local `/shop/sitemap.xml` return valid XML, 744 URLs; root robots contains only `Sitemap: https://ilab.lv/sitemap.xml`. The root sitemap is a Service URL set and does not reference Shop's sitemap. `/shop/robots.txt` returns 404; root robots owns discovery for this origin.

**Correction:** schedule explicit Service-side Shop sitemap advertisement, keeping Service sitemap behavior intact. Independently confirm Search Console submission; lack of robots advertisement does not prove Shop is unindexed. No change implemented.

### R7-07 — JSON-LD contains unsupported Schema.org vocabulary

**Status:** Confirmed against rendered data and the official vocabulary. **Owners:** `lib/seo/siteSchema.js:198`, `lib/seo/jsonld.js:134`, LV/RU Terms page adapters at line 36.

**Expected:** recognized types/properties while preserving valid entities. **Actual/evidence:** global branch entities include `RepairService` alongside valid `LocalBusiness`; Terms uses `TermsOfService` as a type; WebPage emits `primaryEntity` alongside valid `mainEntity`. The official current vocabulary contains neither of those two class names nor that property. All JSON still parses; the valid primary LocalBusiness/Service entities remain, so this is not treated as total structured-data loss.

**Correction:** remove/replace unsupported terms using justified existing schema types/properties, retaining correct entities and references. Revalidate rendered graphs. Source predates the current uncommitted recovery; no redesign attribution is established. Vocabulary: [Schema.org current JSON-LD](https://schema.org/version/latest/schemaorg-current-https.jsonld).

### R7-08 — Catalog hubs expose nested main landmarks

**Status:** Confirmed. **Owners:** `app/(site)/layout.jsx:49` plus hub implementations, e.g. `IphoneRepairPage.jsx:86` and `PhoneRepairPage.jsx:55`.

**Expected:** one main landmark per document. **Actual/evidence:** iPhone, phone, tablet and computer hubs in both locales expose two `<main>` elements; iPhone representative states reproduce it at all four widths. The shell already owns `main#main`.

**Correction:** keep one shell landmark and use an appropriate non-main wrapper in the hub bodies. Preserve the skip-link destination, section semantics and styling. Reproduces R6-FUNC-01.

### R7-09 — Public booking responses expose operational diagnostics

**Status:** Likely / source-supported; response branches are explicit, but live sending/error delivery was not exercised. **Owner:** `app/api/booking/route.js:116–138`, 251–279.

**Expected:** a minimal public success/error contract; provider diagnostics confined to appropriate server logging. **Actual/source evidence:** success returns a `debug` object containing sender/recipient metadata and provider ID; errors can include provider errors or caught exception messages. No private key or API-key value is returned by the inspected object.

**Correction:** remove diagnostic response fields and return safe localized/error-code contracts without altering delivery behavior. This is pre-existing endpoint behavior, not a demonstrated redesign regression. Honeypot and frontend pending-submit guards exist; server rate limits, bounded field validation and idempotency are not demonstrated by this review.

### R7-10 — Low-contrast CTA and secondary text persists

**Status:** Confirmed computed solid-background samples, with visible CTA context inspected. **Owners:** `app/(site)/components/service-pricelist/ServicePricelist.module.scss` (`ctaBtn`), legacy `LandingButton` styles, homepage secondary-text roles.

**Expected:** readable normal-sized text meeting 4.5:1 contrast. **Actual/evidence:** iPhone screen service LV/RU price CTA text, 17px/500, measures **1.84:1** on `#47c6e2`; a 15.2px/700 call label measures **1.65:1** on `#22d3ee`. Homepage review/branch secondary labels measure **4.32:1** on `#0c1115`. Image/gradient backgrounds and opacity effects were excluded from the calculation.

**Correction:** use established accessible foreground/background pairings within the approved system and recheck affected controls. This reproduces the relevant R6 contrast finding; it is not a request for a new visual direction.

### R7-11 — Huawei P30 Pro Open Graph image returns 404

**Status:** Confirmed. **Routes:** `/telefonu-remonts/huawei/p30-pro` and its RU counterpart.

**Expected:** OG image resolves to a valid public asset or supported fallback. **Actual/evidence:** rendered metadata points to `https://ilab.lv/images/devices/huawei/huawei-p30-pro.webp`; GET returns 404. The visible model template uses its intended neutral fallback, explaining why browser-visible image checks pass while social metadata still fails.

**Correction:** supply the correct authorized asset or apply the established fallback to metadata as well as the visible image. Preserve model-specific title/canonical. This extends the previously known missing source-photo finding to its current OG impact.

## Data, SEO and operational evidence

### Firebase contracts

Read-only live counts: **211 devices, 4 categories, 22 services, 1,655 servicePricing rows, 1,240 modelServices rows, 26 faqGroups**. The standalone `serviceFamilies` collection is empty; current grouping uses embedded service family fields, so the empty collection alone is not a defect. `settings/site` and both referenced `places` documents exist. Ratings/counts matched rendered values: Domina 4.9/856, Spice 5.0/389, total 1,245. No fabricated fallback review values were needed for these checks.

Server adapters join active applicable services with model pricing, omit hidden rows, sort and format locale-aware numeric/request prices. iPhone 12 model and screen selector agree on original/OLED/Incell **190/140/100 €**. iPad 2019 battery/display samples are 90/140 €, and the MacBook battery sample is 100 €. These reads are separate from the legacy phone selector discrepancy in R7-01. Admin/server readers use Firebase Admin; direct browser readers still depend on public `modelServices` reads.

The Shop proposed rules preserve public reads for Service catalog/pricing collections and deny client writes. Server Admin operations bypass those rules and remain dependent on Service's own active-admin session checks. The current deployed rules were not independently retrieved: do not treat the proposal or earlier Shop findings as proof of today's deployed policy. Repeat a coordinated compatibility/security check immediately before that separate rollout.

Model offers currently assert `InStock` unconditionally (`catalogDevices.js:322`), while visible pricing qualifies stock availability. **Source-supported semantic risk:** actual inventory/part availability was not verified, so this audit does not assert that a particular stock claim is false. Confirm the business meaning and data authority before changing schema.

### SEO scope and baseline

All 422 historical model-route baseline cases preserve status, canonical, title and description. One H1 differs for the corrected Galaxy S26 Ultra year; it is not a broken URL. Fourteen actual hosted route comparisons preserve titles/descriptions. Thirteen also match canonicals exactly; RU iPhone screen now correctly uses the ASCII `/ru/remont-iphone/zamena-ekrana`, correcting the production mixed-script spelling documented in the existing SEO diff. It is an intentional correction, not replacement with homepage metadata.

Breadcrumb destinations were included in the full internal-link/fragment crawl. Rendered FAQ questions matched visible content across the 40 browser routes; no duplicate contradictory same-ID entities were detected. JSON parsing is not equivalent to vocabulary/rich-result validation: R7-07 remains open. FAQ markup is not a promised Google rich-result enhancement: Google's [current documentation updates](https://developers.google.com/search/updates#june-2026) state that FAQ rich results were discontinued in May 2026. Valid existing FAQ markup was not removed.

Normal robots excludes `/api/`, `/admin`, `/ads/`. Unknown pages are noindex. `/adsV2` and `/temp/iphone-remonts` are public preview endpoints with noindex/nofollow and are absent from the sitemap; no private-data exposure was demonstrated there. Legacy LP metadata remains its existing behavior, including generic titles on the three `(lp)` routes; it was not silently rewritten during this audit.

### Ads and Shop protection

Both hosted and local raw HTTP Host-header checks confirm `/` and service-looking paths on `riga.ilab.lv` serve original Ads with canonical `https://riga.ilab.lv`; its robots allows crawling, matching production. The main-host `/ads` returns 404. `adsV2` remains an explicit noindex preview, never the host rewrite target. Protected Ads, landings, middleware and robots source have no diff from HEAD; shared styling was additionally checked against rendered production Ads. Contact destinations match production; phone/WhatsApp links were inspected without launching calls/messages.

Shop's proxy, HTML, assets and sampled internal navigation work. Hosted Shop has its own generic metadata on its root, and `/shop/robots.txt` is absent; these observations do not authorize changes in the Shop repository or certify Shop checkout/admin release readiness. Shop Service links include the public Service origin; browser navigation through the local proxy is evidence of integration behavior, not proof that every uncommitted Shop change is deployed.

## Test results and reproducibility

Existing repository commands, unchanged:

```bash
git branch --show-current
git remote -v
git rev-parse HEAD
git status --porcelain=v1
npm test
npm run lint
npm audit --omit=dev --json
npm ls next sharp fast-xml-parser protobufjs websocket-driver --omit=dev --depth=8
```

- Tests: **32 passed, 0 failed/skipped**; these are mainly source-contract tests plus admin-policy behavior, supplemented by runtime checks here.
- Lint: **exit 0**, no ESLint warnings/errors in the configured scope.
- Production dependency audit: **exit 1**, 27 affected package entries: 4 critical / 11 high / 11 moderate / 1 low (npm classifications). R7-12 is the P1 release gate; exploit reachability was not inferred from counts. The installed dependency tree was checked against the audit.
- Production: `node <Service>/node_modules/next/dist/bin/next build` in the isolated source snapshot, existing environment inherited in memory. First restricted attempt: **exit 1**, failed to fetch existing Inter Google font (`EACCES`). Network-enabled retry: **exit 0**, build `SQpCBQNvWSnjs2bnJe-yg`, 119 generated entries. Existing Sass mixed-declaration/global-function and autoprefixer warnings are nonfatal.

Temporary evidence/harness location: `C:/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f` (outside repository; includes transient screenshots and JSON/logs). Browser automation used installed headless Chrome/CDP because Python Playwright was unavailable; no dependency was installed. Read-only harnesses adapted historical tools in temporary files without changing repository tests or historical assertions/evidence. From Service's root in Git Bash, the executed harness pattern was:

```bash
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/preview/../seo-crawl.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/redirects.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/matrix.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/functional.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/booking.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/navigation.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/pricing.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/extra-browser.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/protected-shop.mjs
node /c/Users/info/AppData/Local/Temp/ilab-r7-oEsX3f/accessibility.mjs
```

| Runtime check | Result |
| --- | --- |
| Full route/link/fragment crawl | 514 pages pass; 3 intended aliases; zero broken link/fragment destinations |
| Redirect regression | 28/28 sources, 128/128 internal destinations pass |
| Responsive/rendered matrix | 76 states / 40 routes; zero document overflow, visible broken images or runtime exceptions; nested landmarks and other P2 items remain |
| Service controls | 8/8 mobile menu/FAQ/locator keyboard cases; 2/2 locale switches; 2/2 model/service/booking journeys; 2/2 separate contact drawer open/close/focus cases |
| Standard booking | 2/2 locale cases pass: four required-field errors, first-error focus, mocked 422 feedback, mocked 200 success/focus; 4 intercepted POSTs |
| Protected original Ads forms | 3/3 mock success cases; 0/3 visible mock-error-feedback cases; initial focus outside all 3 sheets; 6 intercepted POSTs |
| Pricing selectors | 8/8 keyboard/brand/model cases pass; targeted live model comparison separately exposes R7-01 |
| Sitemap XML | Service 512 URLs / Shop 744 URLs; both parse without XML errors |
| Protected Ads render | 2 production/local width pairs match measured H1 geometry, heading content and contact targets |
| Security probes | anonymous admin protected/read checks behave as above; 162 client JS chunks contain no matched private-key/Resend-key material |
| Dependency security | **Fail:** npm audit exits 1; 27 production package entries; Next 15.4.8 vendor-affected version confirmed (R7-12) |
| Focused accessibility | 8 routes, first 10 Tab stops in viewport, skip links resolve, zero sampled running reduced-motion CSS animations; contrast defects remain |

The combined functional harness exits **1** because protected form checks fail and the restricted browser logged network-denied resources; its passing service-control results are listed separately. Network-enabled pricing checks passed. The initial responsive run logged two Firebase offline errors on phone-service selectors under restrictions; these are not reported as production outages. A browser harness navigation-context failure was corrected and the focused Ads/Shop check rerun successfully. Four optimized-image HEAD 500 responses were investigated: every corresponding GET returned 200 image data, so they are not customer image defects. No real booking API request was sent, and no analytics/conversion endpoint was exercised.

## Remaining visual polish

- Planned Service/Shop switcher relocation between logo and navigation remains a separate visual task. Its current position alone is not a blocker; fix/accept the actual Russian pointer collision separately.
- Desktop LV labels at narrow desktop widths remain dense but sampled hit targets work. Minor breadcrumb/link styling and process/benefit presentation differences from earlier reports are not new redesign work for R7.
- Supply the missing Huawei source photo or retain the neutral visible fallback; fix the OG reference independently. Address existing Sass warnings during maintenance rather than confusing them with a failed build.

## Release checklist and recommended order

1. **Before November 5: clear the P1 dependency gate R7-12 first.** Review/update the framework and affected dependency chains in a separately authorized fix pass, validate the lockfile and rerun security/build/regression checks. Do not deploy this audited dependency snapshot. Then correct or explicitly accept R7-01/02/04 (pricing, Russian navigation, protected form errors/focus). Keep original Ads routing and fallback unchanged unless a separate switch is approved.
2. Address/accept schema vocabulary, contrast and Russian selector fallbacks (R7-07/10/03); then sitemap discovery/omissions and OG asset (R7-05/06/11), landmark duplication and safe booking responses (R7-08/09). Verify the stock-availability schema contract rather than guessing inventory.
3. Rebuild the actual final release source with deployment environment values and network access; rerun only affected checks plus the release regression smoke. This build proves the audited snapshot, not later edits.
4. Confirm booking recipient/from configuration and operational delivery using an expressly authorized test recipient or mail sandbox. No live customer inquiry was sent here. Remote GTM/Ads conversion triggers and consent behavior need their own authorized hosted check; blocked tracking in QA is not conversion certification.
5. Before the separate Shop rules rollout, inspect the currently deployed policy and rerun anonymous/public pricing reads, active-admin writes in an isolated environment, and denied-write cases. Do not deploy rules based only on the proposal reviewed here.
6. Verify final hosted LV/RU metadata, unknown-route 404s, sitemap discovery, real Riga-host fallback and `/shop` assets/navigation after any approved deployment. Confirm representative iOS Safari/Android behavior and modal focus on a real device; this audit used desktop Chromium emulation. Search Console indexing and field performance were not measured.
7. Obtain explicit deployment approval and retain the known production rollback revision. R7 supplies an assessment only; **stop here without implementing fixes or deploying**.
