# R7.4E.5 — six FAQ groups: production migration and integration verification

**Production creation completed and directly verified. Browser visual QA remains unverified because all requested local navigations timed out.**

## Environment and migration

- Repository: `C:/Users/info/Desktop/website/iLab`; branch `feature/redesign-integration` verified. Existing uncommitted work preserved.
- Fresh live identity check: project **ilab-v2**, database **(default)**, location **europe-central2**.
- Reused `lib/faq/faqMigration.mjs` (`planFaqMigration` / `applyFaqMigration`) and unchanged `lib/faq/faqMigration.manifest.json`.
- Added narrowly scoped production runner: `scripts/createApprovedFaqGroups.mjs`. It pins the reviewed manifest SHA-256 `6af5528c8e721282285dc5c698d44f8486a400f4b2f7c520ac500bca85570bf7`, validates exact schema/IDs/counts/orders/copy/link schemes, checks the target and backup hashes, then invokes the existing create-only transaction. The original emulator-only preparation-script safeguard remains intact.

```bash
node scripts/createApprovedFaqGroups.mjs --dry-run
node scripts/createApprovedFaqGroups.mjs --apply
node scripts/createApprovedFaqGroups.mjs --dry-run
```

| Run (UTC) | Create / already / conflict | Result |
|---|---|---|
| 2026-11-06T19:40:14.125Z | 6 planned / 0 / 0 | Preflight passed; no writes |
| 2026-11-06T19:40:42.237Z–2026-11-06T19:40:45.004Z | 6 created / 0 / 0 | Atomic create-if-absent, then read-back passed |
| 2026-11-06T19:40:49.591Z | 0 planned / 6 / 0 | Idempotent; no writes |

Exactly **six documents / 26 items created**; faqGroups now has **32 documents**. No failures. All transaction reads precede writes; transaction.create enforces absence. A matching existing record is left unchanged; conflicting managed content aborts. No update, delete or unrestricted set/merge is used.

## Created records and read-back

| Exact document ID | Scope / key | Locale | Questions | Group / item orders |
|---|---|---|---:|---|
| category_fotoaparatu-remonts_lv | category / fotoaparatu-remonts | lv | 6 | 10 / 10, 20, 30, 40, 50, 60 |
| service_iphone-plates-remonts_lv | service / iphone-plates-remonts | lv | 4 | 10 / 10, 20, 30, 40 |
| page_cenas_lv | page / cenas | lv | 3 | 20 / 10, 20, 30 |
| category_fotoaparatu-remonts_ru | category / fotoaparatu-remonts | ru | 6 | 10 / 10, 20, 30, 40, 50, 60 |
| service_iphone-plates-remonts_ru | service / iphone-plates-remonts | ru | 4 | 10 / 10, 20, 30, 40 |
| page_cenas_ru | page / cenas | ru | 3 | 20 / 10, 20, 30 |

Every record was read directly from production and compared against every manifest content field: scope/key/locale/title, publication=true, group and item ordering, exact question strings and answer HTML. Timestamp fields createdAt/updatedAt were set using server timestamps and verified as native Firestore Timestamps. All 26 localized items match the prepared content; no answers, HTML or destinations were rewritten. The existing source-parity tests passed. No obsolete warranty/location wording was found in this content, so no editorial replacement was necessary. Totals: camera 12, board repair 8, prices 6. No Basic questions appended.

Original 26 groups: compared against fresh **post-Stage-2** pre-migration snapshots, using deep equality of all stored data **and Firestore updateTime equality**. All 26 unchanged after creation and during the idempotence check. The old backup was not used as a content baseline or restore input. The completed 534 corrections were neither re-run nor reversed.

## Backup protection

Read-only SHA-256 checks passed before and after apply, after the idempotence check, and at report finalization:

- `.env-backups/firestore/full-20261106T172745Z-c64e7b7407/firestore.full.export.json`: `1e6e1ccb50a9ed43ed706e9315e2a8c1b1ca6cd2e1859a5246969e696160a7cf`.
- `tmp/devices.export.json`: `8b66fdf84dbaa0ccfd9ee81f773cc828bb07519cc275c719606ab9be40910d87`.
- `tmp/categories.export.json`: `295dc803736ae67eedd0ba0689dc34968a3dc66ef722479c0cd7369056d9e1bc`.

No backup or earlier report was modified, moved, renamed, deleted or regenerated. No exporter ran. Logs are separate under the Git-ignored `.env-stage3-results/`; no credentials or unrelated record contents were logged.

## Frontend and directory integration

No application change was required. Existing LV/RU adapters already select the exact new scopes through getFaqGroups:

- Camera: `app/(site)/(catalog)/fotoaparatu-remonts/page.jsx:40` and RU `remont-fotoapparatov/page.jsx:40`; shared `app/_components/page-sections/photo-repair/PhotoRepairPage.jsx:142` renders the same faqItems supplied to buildRepairPageJsonLd.
- Board: `app/(site)/(catalog)/iphone-remonts/(services)/iphone-plates-remonts/page.jsx:141,158,173` and RU equivalent `remont-iphone/(services)/remont-platy-iphone/page.jsx`; the colocated IphoneBoardRepairServicePage imports ServiceFaq and receives the resolved items.
- Prices: `app/(site)/(info)/cenas/page.jsx:229` and RU `ceny/page.jsx:231` create resolvedLabels from the reader and use those labels for both visible FAQs and schema; CenasPage.jsx uses ServiceFaq.

Existing canonical Board URLs are **/iphone-remonts/iphone-plates-remonts** and **/ru/remont-iphone/remont-platy-iphone** (`lib/seo/staticPageSeo.js:216–217`). The task's short Board URLs were also attempted; routing/canonicals were not changed.

Directory policy remains `lib/faq/faqPolicy.js`: exact explicit category/service/page mappings; only published nonempty groups; new groups append at orders 400/410/420, preserving existing group buckets and anchors. `BujPage.jsx:30–32,63–65` supplies LV **Fotoaparātu remonts / iPhone plates remonts / Cenas** and RU **Ремонт фотоаппаратов / Ремонт платы iPhone / Цены**. Both directory adapters use this policy and the existing shared renderer/TOC. No competing mapping or change to other groups was introduced.

## Live reader / renderer / schema checks

At **2026-11-06T19:42:39.244Z**, a read-only harness executed the actual canonical reader against production Firestore, bypassing its cache wrapper for verification only. Fallback functions were made to fail the check if invoked. Every new group resolved as **published**, with its exact ID, expected 6/4/3 items and exact localized text/HTML.

The same resolved items were fed into the actual ServiceFaq React renderer and buildFaqLd. Rendered details counts and FAQPage counts/order/questions/cleaned answers matched for all six groups. This is a live-data/static-render pipeline check, **not browser visual QA**. Directory reader returned **16 distinct published groups per locale**, including all three new groups each; no duplicates. Existing focused tests also cover unpublished exclusion, directory policy and shared renderer compatibility.

Both back-cover IDs remain absent: `service_aizmugures-vacina-maina_lv` and `service_aizmugures-vacina-maina_ru`. Their explicit Basic fallback remains unchanged and covered by focused tests.

## Browser verification and cache limitations

Headless installed Chrome/Playwright used read-only requests and a development Cache-Control: no-cache header. Initial attempts found no server listening; the standard repository Next dev server was started and all eight requested pages plus both canonical Board URLs were attempted with bounded 20-second navigation limits.

| Local route | Browser result |
|---|---|
| /fotoaparatu-remonts | Navigation timed out; not visually verified |
| /ru/remont-fotoapparatov | Navigation timed out; not visually verified |
| /iphone-plates-remonts | Navigation timed out; not visually verified |
| /ru/remont-platy-iphone | Navigation timed out; not visually verified |
| /iphone-remonts/iphone-plates-remonts | Navigation timed out; not visually verified |
| /ru/remont-iphone/remont-platy-iphone | Navigation timed out; not visually verified |
| /cenas | Navigation timed out; not visually verified |
| /ru/ceny | Navigation timed out; not visually verified |
| /buj | Navigation timed out; not visually verified |
| /ru/faq | Navigation timed out; not visually verified |

**No visual/layout/accordion pass is claimed.** The server remained in compilation and logged webpack cache restoration warnings (`invalid block type`). No global design, webpack configuration or cache infrastructure was changed to work around this. The temporary standard server was stopped; the browser process had already exited. No forms or bookings were submitted.

FAQ cache remains the existing 3,600-second unstable_cache reader (`lib/faq/getFaqGroups.js:283`), without a FAQ tag/invalidation endpoint. No new invalidation infrastructure or deployment was introduced. Cached pages may temporarily retain equivalent transitional fallback content, and cached directories may omit the new groups until revalidation. The direct live-reader result proves data availability; it does not prove immediate browser/deployed-page refresh. Production deployment rendering was not checked in this task.

## Focused checks and boundary

- **26 tests passed**: 12 from `tests/service-faq.test.mjs` + `tests/service-faq-content.test.mjs`, and 14 from `tests/service-faq-admin.test.mjs`.
- Covers six identities/content/count/order/source parity; atomic create-only idempotence and conflicts; metadata preservation; LV/RU shared rendering and FAQ schema; directory/unpublished policy; back-cover fallback; protected exports and Admin identity/page-scope behavior.
- New runner scoped ESLint passed. Scoped git diff --check and new-file whitespace checks passed. No application code change required lint/build expansion or a route crawl.
- No application/Admin/SEO/routing/design change; no Rules, indexes or unrelated settings/data change. No Ads/Shop implementation touched. Existing FAQ groups were unchanged. No full-site regression or visual pass is claimed.
- No commit, push, merge, reset, stash, clean or deployment. No next migration/refactor started. Stopped after the six-record creation and verification.

Execution summaries, exact record inventory and live integration evidence: `.env-stage3-results/*-dry-run-*.json`, `*-apply-*.json`, `live-integration.json`, `browser-results.json`.
