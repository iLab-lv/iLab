# R7.4E.3 — FAQ content corrections

2026-11-06. Branch verified: `feature/redesign-integration`. No production writes, imports, staging, commits, push or deployment.

## Result and exact production proposal

**No nine-month claim was found** in the relevant current Service sources, prepared FAQ records or inspected public Firebase content. The live inconsistency is **90 days**, not nine months. Every proposed duration change below concerns a general iLab repair statement, not a historical case or manufacturer warranty. All changes use the qualified maximum “garantija/garantiju līdz 1 gadam” or “гарантия/гарантию до 1 года”; existing conditions and surrounding wording remain.

| Location | Obsolete general 90-day wording | Spice Home | Disposition |
|---|---:|---:|---|
| Live faqGroups | 12 fields | 22 fields | 34 proposed field patches, 14 documents |
| Live categories | 84 fields | 0 | Proposed copy-only patches, 4 documents |
| Live devices | 416 fields | 0 | Proposed copy-only patches, 208 documents |
| Repository copy/import/export sources | 616 occurrences | 24 occurrences | **640 literal content occurrences corrected**, 7 files |

Counts are textual occurrences/fields, not distinct policies; source exports repeat live copy. Six pending FAQ creation documents contain neither obsolete phrase and remain unchanged. Their 26 questions, identities, HTML and ordering remain intact.

**Exact before/after manifest:** [FAQ_CONTENT_CORRECTIONS.firestore.json](FAQ_CONTENT_CORRECTIONS.firestore.json). It contains all **534 proposed field patches across 226 records**, including exact collection/document IDs, path segments, locale, original and corrected strings and reason. FAQ entries additionally include the original question, zero-based item index, item order and expected scope/key/locale. The manifest is a review artifact, not an executable production migration.

## Affected FAQ records

All edits below are exact string-field changes; complete original/corrected text for each entry is in the linked manifest. Index is zero-based.

| Document ID | Locale | Affected item / order / field |
|---|---|---|
| basic_lv | lv | item 2 / order 30 / aHtml; item 3 / order 40 / aHtml; item 4 / order 50 / aHtml |
| basic_ru | ru | item 2 / order 30 / aHtml; item 3 / order 40 / aHtml; item 4 / order 50 / aHtml |
| category_datoru-remonts_lv | lv | item 6 / order 70 / aHtml; item 7 / order 80 / aHtml |
| category_datoru-remonts_ru | ru | item 6 / order 70 / aHtml; item 7 / order 80 / aHtml |
| category_dyson-remonts_lv | lv | item 5 / order 60 / aHtml; item 6 / order 70 / aHtml |
| category_dyson-remonts_ru | ru | item 5 / order 60 / aHtml; item 6 / order 70 / aHtml |
| category_iphone-remonts_lv | lv | item 1 / order 20 / aHtml; item 6 / order 70 / aHtml |
| category_iphone-remonts_ru | ru | item 1 / order 20 / aHtml; item 6 / order 70 / aHtml |
| category_plansetdatoru-remonts_lv | lv | item 4 / order 50 / aHtml; item 5 / order 60 / aHtml |
| category_plansetdatoru-remonts_ru | ru | item 4 / order 50 / aHtml; item 5 / order 60 / aHtml |
| category_telefonu-remonts_lv | lv | item 5 / order 60 / aHtml; item 6 / order 70 / aHtml |
| category_telefonu-remonts_ru | ru | item 5 / order 60 / aHtml; item 6 / order 70 / aHtml |
| contact_lv | lv | item 0 / order 10 / aHtml; item 2 / order 30 / aHtml; item 2 / order 30 / q; item 4 / order 50 / aHtml |
| contact_ru | ru | item 0 / order 10 / aHtml; item 2 / order 30 / aHtml; item 2 / order 30 / q; item 4 / order 50 / aHtml |

The other 12 FAQ documents have no matching obsolete copy. All 26 current FAQ locale documents were read; the six prepared creation IDs are still absent from that collection snapshot. No FAQ identity, publication state, order, hidden metadata, links or timestamps were modified.

## Repository corrections

| File | Warranty occurrences | Branch-name occurrences |
|---|---:|---:|
| app/_components/sections/quick-facts/quickFacts.i18n.js | 0 | 6 |
| app/_components/sections/before-visiting/beforeVisiting.i18n.js | 0 | 2 |
| app/_components/page-sections/iphone-remonts/locations/IphoneLocationsSection.jsx | 0 | 8 |
| scripts/importContactFaqToFirestore.cjs | 0 | 8 |
| scripts/importCategoriesToFirestore.cjs | 115 | 0 |
| scripts/categories.export.meta-final-reviewed-v8.json | 85 | 0 |
| scripts/devices.export.meta-final-reviewed-v10.json | 416 | 0 |

The three application content files correct **16 public branch-name occurrences**. The remaining changes correct reusable category/metadata exports and FAQ/category import copy so a later authorized import cannot reintroduce obsolete text. `scripts/updateSeoMetadataFromExports.cjs` explicitly uses the two corrected export files as its defaults; these are reusable inputs, not historical audit evidence. No import/update script was run.

The FAQ fallback file `app/(site)/sections/faq/faq.i18n.js` already has the approved warranty/name wording; it was checked and retained. No fallback was removed. No runtime replacement, renderer, reader, Admin/API, route, SEO graph or layout change was introduced. Prepared `lib/faq/faqMigration.manifest.json` and its R7.4E.2 diff remain unchanged; original camera/board/prices copy still passes source-parity tests.

## Non-FAQ findings and retained conditions

Read-only inspection covered public `settings/site`, 4 category documents (including nested brand copy), 211 device documents' public copy fields and 22 service definitions. Settings contain no obsolete name/claim. Category/device corrections are all fully specified in the same manifest; no database update occurred.

Service-specific operational `defaultWarrantyDays` values are **90, 0 and 365**. Seventeen services have a numeric 90-day default; these are specific operational conditions, not an unconditional general marketing promise. They are deliberately **not** changed by this copy proposal. Pricing overrides, receipt/terms exclusions, IDs and relationships are likewise unchanged. No manufacturer/historical warranty text requiring a separate editorial decision was found.

Read-only checks of protected Ads/AdsV2/landings/LP source found no matching obsolete phrases; those implementations remain untouched. One remaining “Spice Home” occurrence in `app/data/site.config.js:92` is an internal TODO comment about the schedule, not displayed copy; its existing public label already says Spice Life. The comment, stable `spice` ID, address, map destinations, phones and hours remain untouched. Historical reports/snapshots were not rewritten.

## Validation

- **12 focused tests pass**: `node --test tests/service-faq-content.test.mjs tests/service-faq.test.mjs`.
- Tests cover clean LV/RU fallbacks, qualified warranty wording, reviewed patch scope, unchanged markup/links, corrected real-renderer/schema parity, sibling metadata and six-document migration structure/source parity.
- Targeted rescan finds no obsolete claims/names in current Service public source copy, FAQ fallbacks or reusable import/export inputs; only the explicitly excluded internal TODO remains.
- Scoped `git diff --check` and JSON parsing pass. These are literal content/data edits; no new build, route crawl or browser suite was necessary. No lint/build was run.
- Visible FAQ and JSON-LD still share the same resolver and corrected source content. **Live Firebase-backed wording remains unchanged until the proposed production patches are approved and applied**; tests verify the proposed corrected state without masking live content in rendering.

## Approval boundary and safe later application

Approval is required for the **534 exact copy-field patches in the linked manifest** (34 FAQ, 84 category, 416 device), separately from R7.4E.2's six-record creation migration. No production execution is included here.

Before any authorized write: back up affected records; fresh-read each document in a transaction; validate all expected original strings and FAQ identity/question/order before mutating anything; abort/review any mismatch. Use the fresh read version as the write precondition. For array-backed `items` or `brands`, clone the current array and change only listed strings, preserving every other item/property; array indices in the manifest are **not Firestore dot-update paths**. Update only affected fields/arrays plus appropriate `updatedAt`, never replace an entire group/document. Preserve all other timestamps and metadata. Reruns must treat already-corrected fields as unchanged and stop on any third value. Test isolated fixtures before execution, then verify LV/RU visible/schema parity and FAQ/site/content cache refresh. Roll back only changed strings using backups and the same conflict checks.
