# R7.4E — FAQ consolidation plan and implementation

## R7.4E.2 implementation status — 2026-11-06

Implementation is authorized by R7.4E.2; **production Firestore writes remain unauthorized**. The R7.4E.1 findings below are retained as the audit baseline, not the current implementation contract.

- Canonical Service renderer: `app/_components/sections/faq/ServiceFaq.jsx` and `ServiceFaq.module.scss`, extracted from the approved homepage. One presentation, native independent details, first item open, plus/minus, unchanged Service motion runtime, optional localized title/subtitle/link. Home retains six items, its link and no subtitle/numbering. Legacy `HomeFaq` and generic `Faq` exports remain unchanged for protected AdsV2/LP/temp consumers.
- All applicable Service consumers in matrix B now import the canonical renderer. Existing brand visibility, category/model inheritance and absent iPhone audio FAQ remain intact. Grouped pages use the same deduplicated groups for display and schema. Legacy FAQ-specific internal skin overrides were removed from the catalog/recovery skins; page composition still owns outer spacing.
- Admin now retains original ID and revision, recognizes page scopes, labels Global/Contacts explicitly, validates request and stored identity, and updates only an existing matching record in a transaction. Unsupported/mismatched IDs/scopes reject; stale edits return 409. Publication/order/hidden/unknown metadata and legacy answers survive ordinary saves. Only intentional item reorder changes its sort values. Authentication remains required. No new group-management UI or production save test.
- `lib/faq/getFaqGroups.js` remains the cached server reader. It supports `contact_<locale>` and `page_cenas_<locale>`, distinguishes missing/unpublished/empty/read-error states and safely falls back/omits supplementary FAQs. It normalizes answer HTML once and deduplicates groups before display/schema. Unknown scopes do not acquire unrelated basic content. Back-cover uses an explicit basic fallback; its two proposed specific documents remain deferred.
- Camera, board and prices resolve Firebase first with exact transition content from `lib/faq/faqMigration.manifest.json`; their original source arrays remain as rollout parity references. A missing migration therefore does not remove existing public FAQs. Do not retire these references until authorized live data availability/parity is verified.
- Directory inclusion is explicit in `lib/faq/faqPolicy.js`: existing groups plus Camera/Board/Prices, only when their actual Firebase documents are published and nonempty. Transition fallbacks never create entries. New groups append after the existing directory buckets, preserving existing order/index anchors; localized headings, TOC and contact-link adaptation remain. No production data means no new live directory entries yet.
- Home schema uses the same final six items. Camera/board/prices use resolved content for both output paths; booking has FAQPage only for its actual visible basic items. FAQ HTML is allowlisted, unsafe attributes/URL schemes excluded, and approved formatting/links preserved. R7.3 metadata/canonicals/hreflang and non-FAQ graph types are retained.
- Exact review artifact: [FAQ_MIGRATION_CONTENT_DIFF.md](FAQ_MIGRATION_CONTENT_DIFF.md); machine manifest: [faqMigration.manifest.json](../../lib/faq/faqMigration.manifest.json). Read-only production check found all six target IDs absent. `scripts/prepareFaqMigration.mjs` defaults to a dry-run manifest, supports a read-only production check and **local-emulator-only apply**. It has no production apply mode. The transaction validates all six records before create-only preconditions; matching documents stay untouched, any conflict aborts. Production groups are not modified.
- Validation: **86 automated tests pass**, including 14 Admin identity/metadata/legacy/transaction tests and 8 shared FAQ/reader/migration tests. Focused ESLint, scoped whitespace checks and the final isolated production build pass (existing Sass deprecation warnings remain). **26 production-browser states** passed at 375/1440px: home LV/RU, iPhone hub, grouped phone screen service, camera LV/RU, prices LV/RU, Contacts, FAQ directory LV/RU, board and back-cover. Visible/schema question-answer parity, counts, initial states and absence of overflow passed; browser console errors: zero. Home desktop/mobile typography and spacing match the previous approved production preview. Enter/Space, focus-visible, independent open items, reduced motion, interrupted animation and native no-JS interaction passed. The directory preserves only its first group initially open. Hash comparison confirms **159 protected landing/legacy files unchanged**. Representative FAQ screenshots were reviewed; temporary build/browser artifacts remain outside the repository.

Outstanding approval is **only production execution of the six exact manifest records**, after reviewing the linked diff and a fresh conflict check/backup. Enabling a production apply path is part of that separately authorized rollout; then verify live LV/RU parity, directory inclusion and FAQ cache revalidation before retiring transition copy. Back-cover-specific copy/data remains a separate editorial decision. No push or deployment is authorized. Directory inclusion of the three new families is now explicitly approved by R7.4E.2.

---

## R7.4E.1 audit baseline (historical)

Audit date: 2026-11-06. Investigation only; implementation and data migration are not authorized by this document.

Repository verified: `C:/Users/info/Desktop/website/iLab`, branch `feature/redesign-integration`, origin `https://github.com/iLab-lv/iLab.git`. Existing uncommitted work preserved.

Evidence: current source and read-only Firestore reads of `faqGroups` and public category FAQ configuration. No Admin save, browser interaction test, Firebase write, build or deployment was performed. Behavior described below is established from source and actual records, not a newly reproduced browser session. Historical audit screenshots are not fresh evidence.

## A. Current architecture

### Renderers and approved presentation

There are **two active main Service FAQ renderers**:

1. `app/(site)/HomeSections.jsx:17`, `HomeFaq`, used by `HomePage.jsx:109`.
2. `app/(site)/sections/faq/Faq.jsx:27`, `Faq`, used by the catalog and information templates listed below. The grouped FAQ directory is a wrapper around this renderer, not a third renderer.

Homepage design is locked. Its source contract is:

- Native `section > header(h2, optional all-questions link) + div > details > summary + div`; first item open, independent multiple-open items, no question numbering and **no current subtitle**. Preserve that absence on home; allow an optional localized subtitle elsewhere.
- `HomePage.module.scss:10,27–28,71`: inherited Service typography/colors, H2 `clamp(30px,3vw,44px)`, square border separators, 20px questions, minimum 72px summary, 18px vertical padding, 24px gap; 14px current-color plus changes to minus when open. Answers are muted, line-height 1.55, maximum 76ch, bottom padding 24px. No rounded cards or accent-highlighted headings.
- Same file `:86–136`: header stacks below 1024px; desktop heading uses columns 1–7 and supporting link columns 9–12; section spacing increases at 1280px; page margins use existing Service tokens. There is no FAQ-specific mobile font override.
- `serviceMotionRuntime.js:176–199`: delegated summary clicks animate answer height/opacity (500ms opening, 300ms closing), cancel interrupted animations, and finalize native `open`. `ServiceMotion.jsx:30–43` disables enhancement for reduced motion or `?motion=off`. Native details remain usable without runtime/JS.
- Native summary supplies focusability, Enter/Space toggle and expanded semantics; the decorative icon is hidden from assistive technology. Home does not add custom keyboard handlers, explicit `aria-expanded`, a section `aria-labelledby`, or a local focus-visible rule. Retain native behavior and existing global focus treatment; verify keyboard/focus during later extraction. This audit did not browser-test it.
- Home returns nothing for empty items, renders answer strings as HTML, and slices to six by default. Generic Faq renders an empty section if called with no items, supports `openAll`/`openFirst`, and applies a minimal HTML sanitizer. Its passed `locale`, `variant` and `headingLevel` props have no implementation. Generic SCSS is overridden by `CatalogHubSkin.module.scss:182–190`, `ServiceRecovery.module.scss:83–91` and `RemainingPages.module.scss:76–107`; those wrappers explain current presentation differences.

Protected external consumers matter before extraction: `app/adsV2/AdsV2.jsx:20,206` imports HomeFaq; three `app/(lp)` pages import generic Faq and `app/data/faq.js`. `app/ads` and `app/landings` have their own LandingFaq renderers. `app/temp` is preview code. These are outside the main Service count/migration; preserve their current rendering/data and avoid changing them indirectly through shared exports.

### Actual Firebase model and reader

`faqGroups` contains **26 documents / 148 embedded question-answer items**: 13 scopes in each of LV/RU. All currently published; no current hidden/incomplete items were found. No separate question collection, slug field or stored page-reference list appears in these records.

| Exact document IDs (`{lv,ru}` means both documents) | Scope/key | Items per locale | Group order |
|---|---|---:|---:|
| `basic_{lv,ru}` | basic / null | 6 | 10 |
| `category_iphone-remonts_{lv,ru}` | category / iphone-remonts | 8 | 10 |
| `category_telefonu-remonts_{lv,ru}` | category / telefonu-remonts | 8 | 10 |
| `category_plansetdatoru-remonts_{lv,ru}` | category / plansetdatoru-remonts | 8 | 10 |
| `category_datoru-remonts_{lv,ru}` | category / datoru-remonts | 8 | 10 |
| `category_dyson-remonts_{lv,ru}` | category / dyson-remonts | 8 | 10 |
| `service_ekrana-maina_{lv,ru}` | service / ekrana-maina | 4 | 10 |
| `service_baterijas-maina_{lv,ru}` | service / baterijas-maina | 4 | 10 |
| `service_uzlades-ligzdas-maina_{lv,ru}` | service / uzlades-ligzdas-maina | 3 | 10 |
| `service_kameras-remonts_{lv,ru}` | service / kameras-remonts | 3 | 10 |
| `service_skalruni-mikrofona-remonts_{lv,ru}` | service / skalruni-mikrofona-remonts | 3 | 10 |
| `service_udens-bojajumu-remonts_{lv,ru}` | service / udens-bojajumu-remonts | 4 | 10 |
| `contact_{lv,ru}` | page / contacts | 7 | 20 |

Fields are `scopeType`, `scopeKey`, `locale`, localized `title`, `isPublished`, `order`, `items:[{q,aHtml,order}]`, `createdAt`, `updatedAt`. Titles are presentation text; identity is the document ID plus scope/key/locale. Item order is 10,20,… in every current group. The live answers include HTML and links; preserve them exactly, including locale-specific destinations. Category and service keys retain Latvian spelling in RU document IDs.

`lib/faq/getFaqGroups.js:35–103,143–205,221–296`:

- Accepts basic/category/service sources; constructs deterministic IDs; fetches one document per requested group concurrently, not one per question. Next cache revalidates after 3600 seconds and includes function arguments.
- Filters hidden/incomplete items, accepts legacy answer aliases, sorts items by order then question; groups by order then document ID. Combined `items` deduplicates case-insensitive trimmed question text; `groups[].items` remains intact.
- Missing/unpublished documents fall back to `faq.i18n.js`. Unknown category/service keys fall back to **basic** (`faq.i18n.js:627–643`). Existing published empty groups do not fall back in this reader. Firestore exceptions propagate; there is no error catch here.
- Some tablet/computer/Dyson adapters additionally use local fallback items when the returned list is empty. Those are contingency content, not evidence of missing live category groups. `faq.data.js` is an older parallel reader with no incoming application import found; do not build the target around it.

Association is currently a **combination of explicit route-adapter scope selection and category inheritance**, not a universal Firebase page assignment system. Category/brand data controls FAQ visibility, while route code chooses the group. `lib/content/resolvers/catalogPages.js:92–96,126,212,297` resolves `hasFaq`, defaulting to true. Current public category records have no FAQ-reference fields. Phone brand overrides: Apple/Samsung true; Huawei/Sony/OnePlus/Xiaomi false. All nine computer brand overrides, including MacBook/iMac/Mac Pro, are false. Tablet brand overrides leave FAQ visibility at its default. Model adapters independently use their category group and item count; a hidden brand FAQ does not imply no FAQ on its model pages.

### Admin behavior

`app/(admin)/admin/faq/FaqScreen.jsx:20–42,96–98,155–211,247–367` loads `/api/faq`, filters LV/RU tabs, expands records, edits title/questions/HTML answers, adds/removes questions, reorders by array position and saves a whole group. There is **no UI for creating groups, changing scope/key/locale, assigning pages, deleting groups, or renaming IDs**. Editing title only changes display text.

`app/api/faq/route.js:18–72` lists all documents; `:78–153` authenticates POST, derives an ID from scope/key/locale and merges group fields, replacing the item array. Creation is possible through that endpoint, despite no creation UI. Deterministic IDs prevent two documents with the same canonical identity through this writer; duplicate titles remain possible. Unsupported scope is silently coerced to basic. UI normalization drops group publication/order and item order/hidden metadata; save defaults publication to true and group order to 10 and regenerates item orders. It can also discard legacy plain `a` answers because the UI retains only `aHtml`. There is no immediate FAQ cache invalidation in this path.

### JSON-LD paths

`lib/seo/jsonld.js:192–239,346–407` normalizes/deduplicates FAQ input and is called through `buildRepairPageJsonLd`. Most adapters derive rendered items and schema from the same selected list and use the same visibility gate. The following distinctions must survive consolidation:

- Home `page.jsx:31–44` and RU equivalent build schema from all basic items, while HomeFaq slices to six. Live basic groups have exactly six, so **no current truncation discrepancy** is established; a seventh configured item would create one.
- Service adapters, e.g. phone screen `page.jsx:217–260`, render each `groups[].items` but deduplicate their schema union. Repeated questions across groups could therefore appear twice visibly and once in schema; no hidden schema-only group is required by this design.
- About and Contacts LV/RU adapters build schema from their actual reader output. About does not check group publication; Contacts does. FAQ-directory LV/RU adapters (`buj/page.jsx:115–181,210–230`, RU equivalent) scan all locale-suffixed documents, filter hidden questions but **do not check group publication**, and derive headings from ID mappings rather than stored titles. `BujPage.jsx:109–114` also rewrites contact-answer `#locations` links to the localized Contacts URL; preserve this contextual link adaptation. Current records are all published, so publication handling differences are latent.
- Prices (`cenas/page.jsx:210–225`, RU equivalent), camera (`fotoaparatu-remonts/page.jsx:39–51`, RU equivalent) and board repair (`iphone-plates-remonts/page.jsx:103–157`, RU equivalent) pass the same local copy used visibly to their schema builders.
- Booking adds visible basic FAQs in `PierakstiesPage.jsx:101,115`; its route adapters do not emit FAQPage. This is absent schema, not unrelated hidden schema content. iPhone audio has neither visible FAQ nor FAQ schema.

These are source/data parity findings, not a new rendered-output audit. Keep R7.3 metadata/canonical/localization code untouched in this pass and intact in implementation.

## B. FAQ usage matrix

Paths below are template roots under `app/(site)`; RU counterparts select `locale='ru'` and the same canonical keys. Generic `Faq` is the renderer unless stated otherwise.

| Page family / actual template consumer | Current component | Content source | Firebase group | Locale behavior | Required change |
|---|---|---|---|---|---|
| `/`, `/ru`: `HomePage.jsx` | HomeFaq | Firebase-first | basic | Explicit locale; six-item limit | Extract approved presentation unchanged; use same final six for schema |
| iPhone hub: `(catalog)/iphone-remonts/{page,IphoneRepairPage}.jsx`; RU `remont-iphone` | Faq | Firebase-first | category_iphone-remonts | Explicit LV/RU | Shared renderer; preserve hasFaq gate and `iphone-faq` |
| iPhone model: `iphone-remonts/[device]/{page,IphoneDevicePage}.jsx` | Faq | Inherits hub FAQ | category_iphone-remonts | Explicit LV/RU | Shared renderer; no new model group |
| Phone hub and `[brand]`: `telefonu-remonts/{PhoneRepairPage,[brand]/PhoneBrandPage}.jsx` and route adapters | Faq | Firebase-first category inheritance | category_telefonu-remonts | Explicit LV/RU | Shared renderer; retain brand visibility overrides |
| Phone `[brand]/[device]/page.jsx` → `_components/sections/device-detail/DeviceDetailPage.jsx:44` | Faq | Category inheritance | category_telefonu-remonts | Explicit LV/RU | Shared renderer; no brand/model copies |
| Phone six `(services)` adapters and `Phone*ServicePage.jsx` | Faq, grouped | Firebase service + explicitly requested basic | matching six service keys + basic | Explicit LV/RU | Shared renderer per group; one final ordered list for schema |
| iPhone screen/battery/water/back-cover `(services)` adapters and `Iphone*ServicePage.jsx` | Faq, grouped | Firebase-first; back-cover currently falls back to basic | service_ekrana-maina / baterijas-maina / udens-bojajumu-remonts / **missing aizmugures-vacina-maina** | Explicit LV/RU | Renderer; resolve back-cover editorial gap separately |
| iPhone camera/charge-port `(services)` adapters | Faq, grouped | Firebase service + basic | service_kameras-remonts / uzlades-ligzdas-maina + basic | Explicit LV/RU | Preserve explicit combination; do not append basic globally |
| iPhone audio: `skalruni-mikrofona-remonts/page.jsx:91–129`, RU `remont-dinamika-mikrofona` | Dormant Faq slot in IphoneAudioServicePage | No items supplied; hasVisibleFaq defaults false | None requested | LV/RU copy; includeFaq false | No new group needed; preserve absence unless separately requested |
| iPhone board: `iphone-plates-remonts/page.jsx:103`, RU `remont-platy-iphone/page.jsx:103` | Faq in IphoneBoardRepairServicePage | **Hardcoded**, four items each | None | Separate LV/RU arrays | Migrate existing copy and switch renderer |
| Tablet hub, brand and model: `plansetdatoru-remonts/{page,TabletRepairPage,[brand]/page,[brand]/TabletBrandPage,[brand]/[device]/page}.jsx` | Faq; models via DeviceDetailPage | Firebase category; local empty-list contingency on hub/brand | category_plansetdatoru-remonts | LV/RU; includes iPad | Shared renderer; legitimate category inheritance |
| Computer hub/brand/model: equivalent `datoru-remonts` templates, ComputerRepairPage/ComputerBrandPage/DeviceDetailPage | Faq | Firebase category; local empty-list contingency on hub/brand | category_datoru-remonts | LV/RU; includes MacBook | Keep current brand hasFaq=false, retain model behavior |
| Dyson: `dyson-remonts/{page,DysonRepairPage}.jsx` | Faq | Firebase category; local empty-list contingency | category_dyson-remonts | LV/RU | Shared renderer, existing gate |
| Camera: `fotoaparatu-remonts/page.jsx`, RU `remont-fotoapparatov`; PhotoRepairPage.jsx:59,141 | Faq | **Hardcoded** photoRepairContent.js:108,154; six items each | None | Content registry selects LV/RU | Migrate exact existing pairs, same data for schema |
| About: `(info)/par-mums/page.jsx:65`, AboutPage.jsx:444; RU `o-nas` | Faq | Direct Firebase basic reader | basic | Explicit LV/RU | Reuse canonical reader; preserve `about-faq` |
| Contacts: `(info)/kontakti/page.jsx:65`, ContactsPage.jsx:476; RU `kontakty` | Faq | Direct Firebase page reader | contact | Explicit LV/RU | Preserve IDs/page scope; shared reader and renderer |
| Prices: `(info)/cenas/CenasPage.jsx:48,102,196`; RU `ceny` adapter | Faq | **Hardcoded**, three items each | None | getCenasPageStrings(locale) | Migrate exact arrays and schema input |
| FAQ directory: `(info)/buj/{page,BujPage}.jsx`; RU `faq` adapter | Faq per group | Direct collection scan | All nonempty locale-suffixed groups | Document-ID suffix; no cross-locale fallback | Shared reader/renderer; keep TOC/anchors; publication gate |
| Booking: `(info)/pieraksties-remontam/PierakstiesPage.jsx:101–115`; RU `zapisatsja-na-remont` | Faq | Firebase-first basic | basic | Explicit LV/RU | Shared renderer; decide schema from final visible data in integration |

Other informational pages have no active FAQ section to migrate. Sharing basic/category content is intentional reuse; it is not a missing per-page group. Hardcoded `faq.i18n.js` and category/template fallback helpers duplicate maintenance paths but are not the primary live source for the populated groups above.

## C. Duplicate “Basic” investigation

There are **two displayed Basic entries per locale**, not two copies of one Firestore ID:

| Exact ID | Stored scope/key | Stored title | Items | Created / updated (UTC) |
|---|---|---|---:|---|
| basic_lv | basic / null | Biežāk uzdotie jautājumi | 6 | 2026-03-22 19:27:58 / same |
| contact_lv | page / contacts | Biežāk uzdotie jautājumi par saziņu un filiālēm | 7 | 2026-05-21 17:49:48 / same |
| basic_ru | basic / null | Часто задаваемые вопросы | 6 | 2026-03-22 19:27:58 / 2026-05-22 20:46:34 |
| contact_ru | page / contacts | Частые вопросы о связи и филиалах | 7 | 2026-05-21 17:49:48 / same |

Basic contains repair speed, price, warranty, booking, location and data-safety questions. Contacts contains branch locations, walk-in/booking, choosing a branch, service availability, opening hours, price agreement and WhatsApp. Related subjects have different questions/answers; these are distinct scopes, not duplicate content records. Basic is referenced by home/About/booking and explicit service combinations/fallbacks; contact is referenced by Contacts; both appear in the FAQ directory.

**Verified cause:** `scripts/importContactFaqToFirestore.cjs:1–17,89–100` defines the existing `page/contacts` model and `contact_<locale>` IDs. API GET retains that scope. `FaqScreen.jsx:23–27` recognizes only category/service and changes every other scope to basic; `:35–42` consequently labels both records “Basic”. The existing locale filter works, so the two rows within one tab are not LV/RU records mixed together. The coercion was verified against all four live records; no browser save was attempted.

**Save consequence established from code:** opening `contact_lv` and saving sends `scopeType:basic, scopeKey:null, locale:lv` without its ID. POST derives `basic_lv` and replaces that document's items/title. The contact document remains unchanged, and the local UI does not reload/remap it. Equivalent RU behavior applies. No evidence establishes that this overwrite has already occurred; timestamps alone do not prove edit history.

Resolution: `basic_lv/basic_ru` remain canonical global records; `contact_lv/contact_ru` remain canonical contact records. **Merge/delete cleanup count: zero.** Correct Admin scope recognition and visible labels (e.g. “Global · LV · basic_lv”, “Contacts · LV · contact_lv”), preserve/validate original document identity on saves, and explicitly support the contact ID exception. Merely changing labels would leave the save defect. Reject unsupported scope/identity rather than silently coercing it. Keep original group/item metadata on round trips. No data rename is needed to resolve the duplicate label.

## D. Missing groups

Count precisely: **three migratable scopes / six locale documents**, plus **one requested-but-absent scope / two locale documents requiring editorial review**. Thus four candidate scopes/eight documents; only six have suitable existing page-specific content ready to migrate. None exists in the current 26-document snapshot.

| Proposed stable IDs | Pages/scope and locale | Existing content source | Order and basic relationship |
|---|---|---|---|
| category_fotoaparatu-remonts_lv / category_fotoaparatu-remonts_ru | Camera LV/RU | photoRepairContent.js:108–115,154–161: existing six pairs each | Group 10, items 10–60 in current array order; no appended basic |
| service_iphone-plates-remonts_lv / service_iphone-plates-remonts_ru | iPhone board/microsoldering LV/RU | LV iphone-plates-remonts/page.jsx:103–120; RU remont-platy-iphone/page.jsx:103–120: four items each | Group 10, items 10–40; preserve specific scope, no appended basic |
| page_cenas_lv / page_cenas_ru | Prices `/cenas`, `/ru/ceny` | CenasPage.jsx:48–61,102–115: three items each | Group 20, items 10–30; no appended basic; page scope reuses existing contact model |
| service_aizmugures-vacina-maina_lv / service_aizmugures-vacina-maina_ru | Existing iPhone back-cover LV/RU service requests | **Editorial gap:** no back-cover entry in faq.i18n.js and no suitable page-specific FAQ array. Current visible source is generic basic fallback | Proposed group 10; future approved items 10,20,…; do not seed a duplicate basic list |

The back-cover fallback is functioning as coded, not a Firebase query failure. During migration retain that current fallback explicitly until approved specific copy exists, or obtain approval to remove that generic section. Do not invent answers or publish empty groups that would suppress the fallback. A dedicated group is needed only to replace that generic content with relevant back-cover answers.

No missing category groups for iPhone/phones/tablets/computers/Dyson; no required brand/model/About/booking/contact duplicates. iPhone audio has no visible FAQ requirement in its current adapter. If FAQs are later requested there, the existing `service_skalruni-mikrofona-remonts_<locale>` can be evaluated without creating another scope.

## E. Shared component design

Use one server-rendered Service FAQ component extracted from the homepage markup/styles, with **no visual variants**. Preserve home exactly, including no numbering/subtitle, initial open state, all-questions link, six-item limit and native/motion behavior. Optional localized title/subtitle are content overrides only. Retain section IDs, grouped-service anchors, directory TOC and surrounding page layout; do not carry the old nested-card CSS overrides into the canonical component.

Route/server adapters pass a validated content reference or ordered reference list to the shared reader, then pass the resolved localized items, title/subtitle, section ID and optional supporting link to the renderer. The renderer itself does not query Firestore. Preserve scope/key/locale fields and existing IDs; add page scope to the current reader, resolving `page/contacts` to legacy `contact_<locale>`, and `page/cenas` to `page_cenas_<locale>`. No competing collection or per-question query model.

Reuse `getFaqGroups` normalization/cache, replacing parallel direct reads with a consistent contract. Fetch requested group documents together at the adapter boundary (existing Promise.all or Firestore getAll), normalize once, and derive a final ordered visible list once. Grouped pages may retain nonvisual group headings/anchors; no hidden group may feed schema. Preserve effective existing group order and question text; adding basic must remain an explicit per-template choice.

Missing/unpublished, published-empty and read-error are different states. Retain existing per-page fallback/omit behavior through the transition; make back-cover's generic fallback explicit. After the six ready documents are verified and consumers switched, retire hardcoded answers from public source paths. Future missing/error handling should serve valid cached FAQ content when available, otherwise omit FAQ plus its schema without failing the rest of the page; do not substitute LV into RU or unrelated basic into arbitrary scopes. Changing this error handling is future implementation, not an assertion that current readers already do it. No client loading flash or independent item fetching is needed.

Keep current HTML copy/links intact, with a shared reviewed answer-rendering boundary; resolve the current raw-HTML versus minimal-sanitizer difference during extraction, using allowed existing formatting and safe links. This is part of preserving the answer contract, not a separate security audit.

JSON-LD must consume the **same final localized, filtered, deduplicated, limited list** as the visible accordion. Apply page visibility gates and home truncation before schema generation; select HTML answers consistently (current render helpers prefer aHtml, while jsonld.js prefers a when both exist). Preserve R7.3 graph IDs, metadata, canonicals and existing non-FAQ schema. Do not introduce FAQ schema for the currently empty audio slot. Booking's optional FAQPage addition belongs to the later integration using its actual visible basic items.

Admin's smallest correction is support for existing page scope/identity and clear labels, plus metadata-preserving saves. Group creation/assignment/rename/delete UI is not required for this migration: existing route mappings can remain explicit, and an authorized idempotent migration can create the six proposed records. Add controlled creation only if separately desired; no free-text renaming of IDs or automatic group deletion.

## F. Migration sequence — future authorization required

1. Review/authorize a concrete patch and record manifest. Back up affected FAQ documents with IDs, fields, metadata and item order; record current consumer mappings and content hashes. Preserve all 26 current documents. Do not run the existing broad import scripts against production: their overwrite modes are not a safe targeted migration.
2. Correct Admin identity/page-scope handling first, with fixtures covering all four Basic/Contacts records. Verify a contact save targets only contact_<locale>, global save only basic_<locale>, and publication/order/hidden/plain-answer metadata survives. No production save test during this audit.
3. Build an emulator/isolated-fixture migration for the six ready documents. Use stable IDs, create-if-absent/precondition checks and exact existing LV/RU text, links and ordering. Re-running must make no changes to matching records; conflicting existing data must stop for review. Exclude the two editorial back-cover documents until approved copy exists. No deletes/renames.
4. Extend the existing cached reader for page scope and exact legacy contact mapping; test locale, ordering, hidden/publication, empty/missing/error and explicit fallback behavior. Invalidate/revalidate FAQ cache after authorized writes (current TTL can otherwise retain old content for an hour).
5. Extract the locked homepage renderer with unchanged home output; switch one representative Service adapter per family, then equivalent LV/RU templates. Preserve protected Ads/AdsV2/LP/temp consumers through compatible exports/wrappers. Preserve section visibility, IDs/TOC and layout; remove obsolete Service-only presentation overrides as their consumers move.
6. Migrate source selection and schema together for camera, board and prices. Verify final visible FAQ text/order/count equals FAQPage data for both locales; test home limit, grouped-service duplicates and unpublished directory records. Keep back-cover fallback until its separate editorial decision. Remove hardcoded source arrays only after parity checks pass.
7. Validate representative home, hub, enabled/disabled brand, model, grouped service, camera, board, prices, contact, directory and booking routes in LV/RU; keyboard Enter/Space/focus, interrupted animation, JS-off/native fallback, reduced motion and representative desktop/mobile widths. Use appropriate focused automated checks, then release-level checks at the later integration milestone. No full build/screenshot suite was needed for this document-only audit.
8. Rollback: revert the frontend/Admin/reader patch as a unit to restore previous adapters, invalidate FAQ cache, and restore changed existing documents only from their exact backups with conflict checks. Newly added documents can remain unreferenced initially; do not delete them until all consumers, including the collection-scanning FAQ directory, have been checked. Reverting adapters alone does not hide new groups from that directory, so include an explicit directory allowlist/publication policy in the migration patch and its rollback. Keep backups and original IDs throughout.

## G. Decisions requiring explicit approval

1. Authorize the later implementation and targeted Firebase migration after reviewing exact code and six-document LV/RU content diff. This audit does not grant that authorization.
2. Approve back-cover-specific LV/RU FAQ copy, or explicitly choose to retain/remove its current generic basic fallback. No suitable specific answers were found to migrate unchanged.
3. Approve which newly created groups should also appear in `/buj` and `/ru/faq` and their localized directory headings. The current scan automatically exposes every nonempty locale group; prices/board headings are not in its current ID-label map. The implementation must make this choice explicit before data creation/switching.

Validation of this deliverable: source tracing plus actual read-only Firebase records; only this plan is an intended repository change. No application/Admin/schema/data edits, merge/deletion, staging, commit or deployment.
