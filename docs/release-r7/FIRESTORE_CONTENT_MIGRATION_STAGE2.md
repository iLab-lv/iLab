# R7.4E.4 Stage 2 — production Firestore content corrections

**Database migration completed and verified.** Production project `ilab-v2`, database `(default)`, Native location `europe-central2`. Branch verified `feature/redesign-integration`; existing uncommitted work preserved. No commit, push, merge or deployment.

## Approved scope and backup

- Manifest: `FAQ_CONTENT_CORRECTIONS.firestore.json`, version 1; SHA-256 `fdd4137f37bcf4863003cf529b2c40e3f98f8682a6e808b9d445cd1a3a67616d`. Executor pins this exact reviewed file and rejects unexpected structure, paths, replacement transformations or scope.
- Protected backup: `.env-backups/firestore/full-20261106T172745Z-c64e7b7407/firestore.full.export.json`.
- Backup SHA-256: `1e6e1ccb50a9ed43ed706e9315e2a8c1b1ca6cd2e1859a5246969e696160a7cf`.
- Full export plus `tmp/devices.export.json` and `tmp/categories.export.json` matched their recorded SHA-256 hashes before and after execution and on the idempotence dry-run. Backup JSON was read-only, verified against every manifest before-value. No backup file/report was modified, moved, overwritten or regenerated; no new backup export was run.

## Execution and preservation

Utility: `scripts/runFirestoreContentCorrections.cjs` with `scripts/firestoreContentCorrections.cjs`. Git Bash commands:

```bash
node scripts/runFirestoreContentCorrections.cjs --dry-run
node scripts/runFirestoreContentCorrections.cjs --apply
node scripts/runFirestoreContentCorrections.cjs --dry-run
```

| Check | Result |
|---|---:|
| Initial dry-run pending / already / conflicts / missing | 534 / 0 / 0 / 0 |
| Documents updated | 226 |
| Fields updated | 534 |
| Warranty fields | 512 |
| Spice Home → Spice Life fields | 22 |
| Already applied during actual apply | 0 |
| Conflicted / failed fields | 0 / 0 |
| Post-apply dry-run pending / already | 0 / 534 |

Transaction started **2026-11-06T17:58:22.449Z**, apply and read-back finished **2026-11-06T17:58:30.075Z** (UTC). Collection scope: categories 4 documents / 84 fields; devices 208 / 416; faqGroups 14 / 34. Warranty count is 84 category + 416 device + 12 FAQ fields; all 22 location fields are FAQ.

All 226 fresh reads precede queued writes in one Firestore transaction. Each current string must equal the exact original or approved replacement; every FAQ scope/key/locale, question and item order is checked. Missing records or third values abort before any transaction writes. Transaction retries re-read and recheck everything. Updates touch affected top-level text maps/arrays only, with nested arrays cloned from the fresh transaction snapshot; no full-document set/create/delete exists. Metadata, including updatedAt, is preserved.

All 226 documents were read back and deep-compared against their expected full post-transaction records: **534 approved targets matched; every unrelated field, array sibling, identity, locale, order, publication/hidden flag, timestamp and link remained unchanged**. The later read-only rerun classified all 534 targets already applied. Original patch strings and markup-preserving replacements remain available in the unchanged reviewed manifest.

Detailed execution data (IDs/paths/reasons, no unrelated record contents) is in the ignored `.env-stage2-results/*-dry-run-*.json` and `*-apply-*.json`. The changed document/field inventory is also recorded below.

## Remaining Firebase and source references

Read-only scan **2026-11-06T18:01:41.624Z–2026-11-06T18:01:51.029Z**, all 17 root collections / 4,156 documents: zero matching old Spice naming or 90-day/three-month/nine-month string references. No additional Firebase patch scope was added. Numeric operational `services.defaultWarrantyDays` values were excluded from textual marketing claims and preserved. All six pending creation IDs remain absent; collection counts remain unchanged.

Active `app` and `lib` source, fallback translations and shared content were scanned case-insensitively with LV/RU inflections. No remaining obsolete customer-facing copy found; no new source-copy edits were needed. Exclusions: `app/data/site.config.js:92` is an internal Spice Home TODO comment (public label already Spice Life); `DysonRepairPage.jsx:21,44` describes a 1–3-day repair duration. Historical reports, dependencies, generated output and backups were excluded as active defects.

Final expanded read-only scan **2026-11-06T18:33:06.611Z–18:33:18.740Z** also included spelled-out and hyphenated ninety-day/three-month/nine-month variants: zero matches, unchanged collection counts and no pending FAQ creation IDs present. Recorded backup hashes were checked again at report finalization and still match.

## Validation and rendered environments

- 15 focused tests passed: `node --test tests/firestore-content-corrections.test.cjs tests/service-faq-content.test.mjs tests/service-faq.test.mjs`.
- Tests cover approved replacements, original/third/missing values, FAQ identity/order, idempotence/already-applied states, nested preservation, transaction validation before writes, full-record read-back, LV/RU rendering and FAQPage parity.
- Scoped ESLint on the two new scripts and migration test passed. No application/framework change required a build. Scoped whitespace validation is recorded at completion.

Browser method: headless installed Chrome via temporary Playwright, read-only navigation; no forms submitted. Tested local instances separately from the deployed website. The initial browser connector was unavailable. No screenshot parity or full 514-route crawl was performed.

| Environment | Verified result |
|---|---|
| Local current source, hard-refresh header | LV and RU homepages returned 200; Spice Life and qualified up-to-one-year wording; no obsolete strings in visible/collapsed FAQ copy, metadata or JSON-LD; 6 displayed FAQ items = 6 schema questions per locale, exact normalized question/answer parity. Second accordion toggled open in both locales; no empty FAQ answers or unsafe FAQ links. |
| Other representative local routes | **Incomplete**: repeated compilation/navigation timeouts prevented successful family-wide validation. A separate cache attempt initially shared the default cache; a genuinely isolated directory initially returned harness 404s because Windows junction route discovery failed. These are test-environment failures, not classified application defects. A private source-copy retry also timed out during compilation. |
| Deployed sample | LV /, RU /ru, LV /kontakti and RU /ru/kontakty returned 200. LV homepage contained visible nine-month copy plus 90-day FAQ/schema wording. The other three samples contained no matching old text. All four showed Spice Life and some qualified one-year copy. Deployed pages use the older FAQ renderer; canonical-component DOM parity checks do not apply, so deployed FAQ parity was not asserted. |

Actual local route attempts recorded across the cache-bypass and isolated browser runs: `/`, `/ru`, `/iphone-remonts`, `/ru/remont-iphone`, `/telefonu-remonts`, `/ru/remont-telefonov`, `/plansetdatoru-remonts`, `/ru/remont-planshetov`, `/datoru-remonts`, `/ru/remont-noutbukov`, `/dyson-remonts`, `/ru/remont-dyson`, `/fotoaparatu-remonts`, `/ru/remont-fotoapparatov`, `/kontakti`, `/ru/kontakty`, `/par-mums`, `/ru/o-nas`, `/cenas`, `/ru/ceny`, `/buj`, `/ru/faq`, `/pieraksties-remontam`, `/ru/zapisatsja-na-remont`, `/iphone-remonts/ekrana-maina`, `/ru/remont-iphone/zamena-ekrana`, `/telefonu-remonts/ekrana-maina`, `/ru/remont-telefonov/zamena-ekrana`, `/telefonu-remonts/samsung`, `/ru/remont-telefonov/samsung`, `/iphone-remonts/iphone-13`, `/ru/remont-iphone/iphone-13`. Only the two homepage passes above are accepted as successful current-content checks; timeout/404 attempts are not passes. Initial stale-cache probes are also not counted as passes.

Planned representative families included iPhone/phone/tablet/computer/Dyson/camera, Contacts/About/Prices/directory/booking, individual screen-repair services, Samsung brand and iPhone 13 model in both locales. **Full rendered acceptance is not achieved** for these families. Link markup/destinations are preserved by exact replacement tests, but a complete rendered FAQ-link destination check was not completed.

Private raw summaries: `.env-stage2-results/rendered-final-checks.json`, `rendered-isolated-checks.json` and temporary `ilab-stage2-render-*.log` files. Private local verification files/source copies are ignored by Git and separate from all backups. Temporary Stage 2 server/browser processes were stopped using their own captured PID files; the pre-existing user server was not intentionally stopped.

## Cache and deployment limits

FAQ reader `lib/faq/getFaqGroups.js` uses `unstable_cache` with a 3,600-second interval and no FAQ tag/invalidation endpoint. No new invalidation infrastructure or production deployment was introduced. Initial local requests reproduced stale LV FAQ/schema content; development hard-refresh `Cache-Control: no-cache` requests showed corrected LV/RU homepage FAQs with matching schemas. Ordinary cached clients/production pages may continue to show older content until revalidation or deployment. No claim is made that every visitor immediately sees refreshed content.

Deployed-site initial read-only sample: `https://ilab.lv/` still visibly contained a nine-month warranty claim and old 90-day FAQ/schema wording; sampled `/ru`, `/kontakti`, `/ru/kontakty` had no matching obsolete strings and displayed Spice Life / qualified one-year wording. This is a separate deployed build/cache result, not a failed database write. Current source has no nine-month claim; the live homepage needs frontend release/cache follow-up. No deployment was performed.

No real forms/bookings were submitted. No unrelated records/settings, Security Rules or six-document migration were changed. No application source was edited in this stage. Backup files and earlier reports remain untouched.

## Changed document and field inventory

Paths use zero-based array indices and identify logical text targets; array indices were not sent as Firestore dot paths.

| Document | Changed fields |
|---|---|
| categories/datoru-remonts | `bodyHtml.lv`, `bodyHtml.ru`, `brands[0].page.bodyHtml.lv`, `brands[0].page.bodyHtml.ru`, `brands[0].page.lead.lv`, `brands[0].page.lead.ru`, `brands[1].page.bodyHtml.lv`, `brands[1].page.bodyHtml.ru`, `brands[1].page.lead.lv`, `brands[1].page.lead.ru`, `brands[2].page.bodyHtml.lv`, `brands[2].page.bodyHtml.ru`, `brands[2].page.lead.lv`, `brands[2].page.lead.ru`, `brands[3].page.bodyHtml.lv`, `brands[3].page.bodyHtml.ru`, `brands[3].page.lead.lv`, `brands[3].page.lead.ru`, `brands[4].page.bodyHtml.lv`, `brands[4].page.bodyHtml.ru`, `brands[5].page.bodyHtml.lv`, `brands[5].page.bodyHtml.ru`, `brands[6].page.bodyHtml.lv`, `brands[6].page.bodyHtml.ru`, `brands[7].page.bodyHtml.lv`, `brands[7].page.bodyHtml.ru`, `brands[8].page.bodyHtml.lv`, `brands[8].page.bodyHtml.ru`, `lead.lv`, `lead.ru` |
| categories/dyson-remonts | `bodyHtml.lv`, `bodyHtml.ru`, `lead.lv`, `lead.ru` |
| categories/plansetdatoru-remonts | `bodyHtml.lv`, `bodyHtml.ru`, `brands[0].page.bodyHtml.lv`, `brands[0].page.bodyHtml.ru`, `brands[0].page.lead.lv`, `brands[0].page.lead.ru`, `brands[1].page.bodyHtml.lv`, `brands[1].page.bodyHtml.ru`, `brands[1].page.lead.lv`, `brands[1].page.lead.ru`, `brands[2].page.bodyHtml.lv`, `brands[2].page.bodyHtml.ru`, `brands[2].page.lead.lv`, `brands[2].page.lead.ru`, `brands[3].page.bodyHtml.lv`, `brands[3].page.bodyHtml.ru`, `brands[3].page.lead.lv`, `brands[3].page.lead.ru`, `brands[4].page.bodyHtml.lv`, `brands[4].page.bodyHtml.ru`, `brands[4].page.lead.lv`, `brands[4].page.lead.ru`, `lead.lv`, `lead.ru` |
| categories/telefonu-remonts | `bodyHtml.lv`, `bodyHtml.ru`, `brands[0].page.bodyHtml.lv`, `brands[0].page.bodyHtml.ru`, `brands[0].page.lead.lv`, `brands[0].page.lead.ru`, `brands[1].page.bodyHtml.lv`, `brands[1].page.bodyHtml.ru`, `brands[1].page.lead.lv`, `brands[1].page.lead.ru`, `brands[2].page.bodyHtml.lv`, `brands[2].page.bodyHtml.ru`, `brands[3].page.bodyHtml.lv`, `brands[3].page.bodyHtml.ru`, `brands[3].page.lead.lv`, `brands[3].page.lead.ru`, `brands[4].page.bodyHtml.lv`, `brands[4].page.bodyHtml.ru`, `brands[4].page.lead.lv`, `brands[4].page.lead.ru`, `brands[5].page.bodyHtml.lv`, `brands[5].page.bodyHtml.ru`, `brands[5].page.lead.lv`, `brands[5].page.lead.ru`, `lead.lv`, `lead.ru` |
| devices/10-2-7th-gen-2019 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/10-2-8th-gen-2020 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/10-2-9th-gen-2021 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/10-9-10th-gen-2022 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/9-7-5th-gen-2017 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/9-7-6th-gen-2018 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/air-10-5-3rd-gen-2019 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/air-10-9-4th-gen-2020 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/air-10-9-5th-gen-m1-2022 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/air-11-6th-gen-m2-2024 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/air-13-6th-gen-m2-2024 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/air-1st-gen-2013 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/air-2nd-gen-2014 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a02 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a03 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a04s | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a05s | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a06 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a10 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a10s | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a12 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a13 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a14-4g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a14-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a15-4g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a15-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a16-4g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a16-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a17-4g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a17-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a20e | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a21s | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a22-4g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a22-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a23-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a24-4g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a25-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a32-4g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a32-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a33 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a34 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a35 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a36 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a40 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a41 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a50 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a51 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a52 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a52s | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a53-5g | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a54 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a55 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a56 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a7 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a70 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a71 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-a72 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-note10 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-note10-lite | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-note10-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-note20 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-note20-ultra | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s20 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s20-fe | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s20-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s20-ultra | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s21 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s21-fe | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s21-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s21-ultra | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s22 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s22-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s22-ultra | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s23 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s23-fe | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s23-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s23-ultra | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s24 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s24-fe | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s24-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s24-ultra | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s25 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s25-edge | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s25-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s25-ultra | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s26 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s26-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-s26-ultra | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-xcover-5 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-xcover-6 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-xcover-7 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-xcover-7-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-xcover-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-flip | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-flip3 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-flip4 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-flip5 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-flip6 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-flip7 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-fold | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-fold2 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-fold3 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-fold4 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-fold5 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-fold6 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/galaxy-z-fold7 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-11 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-11-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-11-pro-max | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-12 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-12-mini | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-12-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-12-pro-max | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-13 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-13-mini | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-13-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-13-pro-max | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-14 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-14-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-14-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-14-pro-max | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-15 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-15-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-15-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-15-pro-max | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-16 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-16-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-16-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-16-pro-max | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-16e | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-17 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-17-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-17-pro-max | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-4 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-4s | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-5 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-5c | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-5s | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-6 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-6-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-6s | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-6s-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-7 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-7-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-8 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-8-plus | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-air | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-se-1 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-se-2 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-se-3 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-x | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-xr | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-xs | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/iphone-xs-max | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-11-2015-a1465 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-2015-a1466 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-2017-a1466 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-2018-a1932 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-2019-a1932 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-intel-2020-a2179 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-m1-2020-a2337 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-m2-2022-a2681 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-m3-2024-a3113 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-13-m4-2025-a3240 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-15-m2-2023-a2941 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-15-m3-2024-a3114 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-air-15-m4-2025-a3241 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-13-2015-a1502 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-13-2016-a1708-a1706 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-13-2018-a1989 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-13-2019-a1989-a2159 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-13-intel-2020-a2251-a2289 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-13-m1-2020-a2338 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-13-m2-2022-a2338 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-14-m1-pro-max-2021-a2442 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-14-m2-pro-max-2023-a2779 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-14-m3-pro-max-2024-a2992 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-14-m4-pro-max-2025-a3185 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-15-2015-a1398 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-15-2016-a1707 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-15-2018-a1990 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-15-2019-a1990 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-16-2019-a2141 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-16-m1-pro-max-2021-a2485 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-16-m2-pro-max-2023-a2780 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-16-m3-pro-max-2024-a2991 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/macbook-pro-16-m4-pro-max-2025-a3186 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/mini-4th-gen-2015 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/mini-5th-gen-2019 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/mini-6th-gen-2021 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/mini-7th-gen-2024 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/p30-pro | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-10-5-2017 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-11-2018 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-11-2020 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-11-m1-2021 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-11-m2-2022 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-11-m4-2024 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-12-9-2015 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-12-9-2017 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-12-9-2018 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-12-9-2020 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-12-9-m1-2021 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-12-9-m2-2022 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-13-m4-2024 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/pro-9-7-2016 | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/xiaomi-redmi-13-c | `bodyHtml.lv`, `bodyHtml.ru` |
| devices/xiaomi-redmi-note-10-4g | `bodyHtml.lv`, `bodyHtml.ru` |
| faqGroups/basic_lv | `items[2].aHtml`, `items[3].aHtml`, `items[4].aHtml` |
| faqGroups/basic_ru | `items[2].aHtml`, `items[3].aHtml`, `items[4].aHtml` |
| faqGroups/category_datoru-remonts_lv | `items[6].aHtml`, `items[7].aHtml` |
| faqGroups/category_datoru-remonts_ru | `items[6].aHtml`, `items[7].aHtml` |
| faqGroups/category_dyson-remonts_lv | `items[5].aHtml`, `items[6].aHtml` |
| faqGroups/category_dyson-remonts_ru | `items[5].aHtml`, `items[6].aHtml` |
| faqGroups/category_iphone-remonts_lv | `items[1].aHtml`, `items[6].aHtml` |
| faqGroups/category_iphone-remonts_ru | `items[1].aHtml`, `items[6].aHtml` |
| faqGroups/category_plansetdatoru-remonts_lv | `items[4].aHtml`, `items[5].aHtml` |
| faqGroups/category_plansetdatoru-remonts_ru | `items[4].aHtml`, `items[5].aHtml` |
| faqGroups/category_telefonu-remonts_lv | `items[5].aHtml`, `items[6].aHtml` |
| faqGroups/category_telefonu-remonts_ru | `items[5].aHtml`, `items[6].aHtml` |
| faqGroups/contact_lv | `items[0].aHtml`, `items[2].aHtml`, `items[2].q`, `items[4].aHtml` |
| faqGroups/contact_ru | `items[0].aHtml`, `items[2].aHtml`, `items[2].q`, `items[4].aHtml` |
