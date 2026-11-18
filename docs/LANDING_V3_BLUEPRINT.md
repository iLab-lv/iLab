# Landing V3 blueprint — approval draft

17 November 2026. Scope: Git preservation, audit and proposal only. No V3 route or landing implementation has been created.

## A. Preserved baseline

| Check | Verified result |
| --- | --- |
| Starting branch | `feature/redesign-integration`, one commit ahead of its locally recorded upstream |
| Baseline | `148ba080e372d10db5ea4f523a4102b007a5a8ee` (`fin`) |
| Initial working tree | Clean, including non-ignored untracked files; no preservation commit or stash needed |
| Backup branch | `backup/pre-landing-v3-2026-11-17` at the baseline |
| Active development branch | `feature/landing-v3` at the same baseline |
| Preservation | All three commit IDs matched; tracked-file diff against backup was empty after switching |
| Remote handling | Both branches created locally. No fetch, push, remote configuration change or deployment performed; live remote branch existence was not queried |

The requested branches did not previously exist among local branches or locally recorded remote refs. Existing backups and branches were left intact. Ignored environment files and generated files were neither staged nor committed. This proposal remains an uncommitted documentation file.

## Evidence and orchestration

Read project `AGENTS.md`, global Codex instructions, `config.toml`, existing agent definitions, the relevant component architecture and imagery notes. Reused installed roles/configuration; installed or recreated nothing. Explorer and Designer received separate initial assignments, followed by Implementer feasibility and QA risk reviews. Specialist sessions lacked repository/browser tools, so their completed reviews used source snapshots supplied by the primary agent. They were advisory reviews, not independent filesystem or runtime verification. The primary verified the actual source and reconciled the recommendations below.

Applied `frontend-design`, `design-taste-frontend`, `web-design-guidelines`, `web-perf`, `accessibility-audit` and `webapp-testing` guidance at the proposal/risk level. The supplied dark/cyan neon direction overrides conflicting taste-skill defaults about glow, accent phrases and animation. No random visual direction, new fonts or mandatory motion layer is proposed.

Primary evidence: current local source, live [original landing](https://riga.ilab.lv/) and [AdsV2](https://ilab.lv/adsV2) content/metadata through Firecrawl, two live first-screen screenshots (original desktop 1280 × 900; V2 mobile 390 × 844), historical screenshots used only as context, and inspection of both actual branch-photo assets. The interactive browser host was unavailable. No forms were submitted. No runtime flow tests, full accessibility audit, Lighthouse/trace, Core Web Vitals measurements or A/B results are claimed.

### Verified source map

| Responsibility | Source and implication |
| --- | --- |
| Original route | `middleware.js` rewrites non-asset requests on `riga.ilab.lv`, or with `ads=1`, to `/ads`; direct `/ads` on the main host is blocked. `app/ads/page.jsx` and `layout.jsx` compose the original campaign. |
| Original CTA system | `app/ads/_components/ui/providers/LandingCtaProvider.jsx`, dock and forms own campaign branch/lead sheets; do not confuse them with the normal service-site provider. |
| V2 entry and styling | `app/adsV2/page.jsx`, `layout.jsx`, `AdsV2.jsx`, `AdsV2.module.scss`; settings/reviews loaded on the server, with query-based LV/RU selection. |
| V2 copy and inquiry | `app/adsV2/sourceContent.js` contains copied campaign copy and static price examples. `LeadForm.jsx` supports booking, price and delivery inquiries using `/api/booking`. |
| Authoritative business data | `lib/siteSettings.js`: cached remote `settings/site` with `app/data/site.config.js` fallback; provides locations, hours, contacts and pin positions. |
| Reviews | `lib/reviews/getReviewsSummary.js` reads cached place summaries and localized featured reviews using configured place IDs. Review-model helpers handle totals/plurals. |
| Maps versus photos | Current original `LandingLocations` renders cards only. V2 `HomeLocations` in `app/(site)/HomeInteractions.jsx` renders a local map bitmap with selectable button pins. Newer shared `FullLocations` renders photos rather than a map. These are distinct implementations. |
| Location reuse | `app/_components/sections/full-locations/`: `getLocationPhoto`, `locationState`, `useLocationClock`; `contact-actions/ContactActions.jsx` provides real contact/directions links. Older `app/(site)/sections/locations/LocationsMap.jsx` has SVG framing logic if needed. |
| Visual foundations | `app/(site)/serviceFonts.js`, `serviceFoundation.module.scss`; opt-in signature text in `app/_components/sections/headings/`. |
| Tracking | `app/layout.jsx` loads existing GTM and a separate consent-gated OpenAI pixel. No explicit lead-success analytics events found in original/V2 campaign source. External GTM trigger definitions were not available for audit. |

## B. Original versus V2: decisions

Client feedback sets the direction; neither analytics nor evidence of measured conversion superiority was supplied.

| Area | Original strength / weakness | V2 strength / weakness | V3 treatment |
| --- | --- | --- | --- |
| First screen and promise | Immediate broken-phone imagery, strong cyan same-day phrase, branch names and four trust items. iPhone-specific headline narrows apparent coverage; no inline hero CTA. | Broader phone-repair promise, cleaner composition and booking handler. Mobile CSS hides hero actions below 1024px; small header booking is the remaining first-screen booking route. | Keep direct problem/solution language and cyan emphasis; explicitly name Riga, preserve broader phone coverage, qualify timing, keep in-flow booking visible on mobile/tablet. |
| CTA hierarchy | Fixed booking/prices and branch phone/WhatsApp are easy to identify. Hero relies on peripheral controls. | Hero booking/contact, desktop booking/prices, mobile WhatsApp/call, final prices/call/WhatsApp create inconsistent priorities. | One primary inquiry action repeated in hero, contextual repairs, process and closing; persistent mobile booking plus contact. |
| Social proof | Full reviews immediately after hero; strong reassurance, potentially long carousel. | Live rating/count in hero, but full reviews follow services and brands; up to four excerpts per branch lengthen the page. | Live hero badge plus compact reviews immediately after hero: one useful excerpt per branch initially, with read-more/all-reviews links. |
| Speed and convenience | Early conditional speed and parts-availability message, booking strip. | Retains useful copy but later, after reviews; large light speed band interrupts dark flow. | Compact dark convenience section before problems; retain stock/queue caveat and price approval. Avoid another oversized visual chapter. |
| Problem identification | Six recognizable issues and service details. Default screen dominates before other choices, especially on mobile. | Clear selected repair and fault-prefilled booking, but selectors still follow the large default repair detail. | Put six issue choices before detail in DOM/mobile order, followed by one selected preview and contextual CTA. Include a route for unknown/other problems. |
| Prices and guarantees | Concrete examples and up-to-one-year reassurance; static examples can age. | Same inherited examples; LV/RU screen-time copy differs. Pricing action navigates away to `/cenas`. | Keep price-before-work reassurance and qualified warranty. Offer on-page price inquiry; retain detailed price-page link. Show numeric prices only from verified matching catalog records. |
| Coverage | Strong iPhone repair focus; broader capability less explicit. | Apple, Samsung, Xiaomi, Huawei logos and cautious other-device inquiry. | Preserve coverage in a compact band after problems; keep other-device inquiry without inventing supported models or blanket guarantees. |
| Statistics/trust | Experience, repaired-device count, diagnostics, parts and data care support credibility. | Separate stats repeat hero/review proof; rounded average differs from hero rating range. | Merge validated experience/device totals into reviews/convenience; retain diagnosis, warranty, parts and data-care information in context/FAQ. Do not silently discard useful content. |
| Local trust | Two practical location cards with phone, WhatsApp, hours and directions; current source contains no map. | Map with selectable branches and status, but no real service-point photos. | Landing-specific map plus authentic photos, synchronized branch selection and direct branch actions. |
| Process | Four plain steps start with contacting the shop. | Five steps explicitly include diagnosis, price agreement and warranty; longer presentation. | Use three concise visible stages while preserving all five operational facts: contact/bring or send; diagnose and approve price/time; repair/check and return with applicable warranty. |
| Parcel service | Useful existing delivery inquiry, four carriers and return-shipping promise. | Preserves modes and carrier choices. | Keep a separate compact parcel section and existing delivery fields; verify the return-shipping conditions before restating an unconditional offer. |
| FAQ and closing | Useful objection coverage, direct final offer. Closing booking absent. | Reused FAQ behavior, polished closing, also no booking action. | Keep six practical objections; close with booking first, WhatsApp/call alternatives and locality reassurance. |

## C. Exact recommended section sequence

Header and persistent actions frame these ten content sections; a compact legal/contact footer follows.

| Order / section | Purpose and content | Next action | Reuse / new work after approval |
| --- | --- | --- | --- |
| 1. Sales hero | Phone repairs in Riga, live Google proof, short qualified same-day benefit, free diagnostics and price agreement; two identifiable branches. | **Pieteikt remontu / Записаться**; secondary **Precizēt cenu / Уточнить стоимость**. | New V3 composition using existing logo, NavBar, Button, fonts/tokens and review helpers. Reuse existing product artwork with truthful alt text. |
| 2. Early social proof | Branch-specific ratings/counts and one real excerpt from each; validated experience/repair totals can sit here as supporting text. | Read full reviews; understated booking link. | Existing review data/model and expandable text logic; compact V3 presentation rather than changing V2 review limits globally. |
| 3. Speed and convenience | Popular repairs often same day when parts are available, diagnostics, agreed price, convenient locations; parts-preparation invitation. | Primary booking inquiry. | Adapt `getSpeedContent`; remove duplicate location/rating claims and reconcile LV/RU timings. |
| 4. Common problems | Screen, battery, back glass, charging, camera, moisture; visible choices first, selected details, conditional timing, parts/warranty caveats, price inquiry. | Booking with selected fault; price inquiry with same context. | Reuse service IDs/content and V2 prefill pattern, with V3 selector/detail composition. No six duplicated forms. |
| 5. Devices and brands | Existing four brands plus cautious tablet/computer/other-device message. No large model-selection task before inquiry. | Ask about a device through existing price inquiry, with optional device prefill. | Existing logos/coverage; model field remains editable. Reuse live catalog only if a later optional suggestion control is justified. |
| 6. Locations: map + photos | Two explicit branches; selected map marker, actual photo, address, status, full hours, notices and directions all agree. | Call, WhatsApp, directions, or booking prefilled with that branch. | New V3 section composed from settings, photo registry, availability helpers and ContactActions; reuse existing map image/pin-position source. |
| 7. Repair process | Contact or bring/send; diagnostics and approval; repair, testing and return with warranty. Clarify that a request is followed up by the shop. | Primary booking inquiry. | Reuse approved process facts from existing process content; compact V3 presentation without altering shared five-step content. |
| 8. Delivery / parcel | Four current carriers, application-before-shipping instruction, approval and return steps, verified cost conditions. | **Pieteikt ar piegādi / Заявка с доставкой**. | Existing delivery copy/assets and `LeadForm` delivery mode; preserve carrier/location/return/comment fields. |
| 9. FAQ | Timing, walk-ins, warranty, part options, Face ID/True Tone limits and data care; link parcel detail where relevant. | Small booking/contact prompt after objections. | Existing localized FAQ content and native details behavior; no new FAQ dependency. |
| 10. Final conversion | One short local reassurance, decisive offer and restrained neon composition. | Primary booking; WhatsApp and phone alternatives; price inquiry as a quieter link. | V3-specific close using shared controls and the same inquiry controller. |

Keep reviews/convenience brief so paid visitors reach problem selection quickly. This restores early proof without putting a long testimonial wall before repair decisions. Brands and statistics become supporting information rather than additional tall sales chapters.

## D. Visual direction

**Idea:** a clear route from a broken device to a real Riga workshop. The memorable treatment is the cyan repair promise; real locations supply credibility.

- Keep Geologica, existing square controls, aligned edges and the current 1440px container. Use existing spacing tokens with tighter V3 section rhythm: approximately 64–96px desktop and 40–56px mobile as a starting composition, reviewed in context. Avoid copying the service homepage's oversized gaps wholesale.
- Reuse palette roles: ground `#070a0d`; surfaces `#0c1115` / `#131a20`; ink `#f2f5f7`; muted text `#aeb8c0`; controls `#47c6e2`; signature `#22d3ee`. No global token changes.
- Hero: left-aligned headline, short lead, proof and actions beside a supporting repair-product image on desktop. On phones, copy and primary CTA precede media. Draft H1: **“Telefonu remonts Rīgā.” / “Ремонт телефонов в Риге.”** Draft lead explains screen/battery/other repairs, often same day if the part is available. This keeps speed persuasive without promising every repair immediately. Final LV/RU copy is reviewed together.
- Apply the existing hero-glow token to one meaningful phrase; use the softer section token on selected problem/location/closing headings. Reuse `SignatureAccent` where suitable: its opt-in stylesheet explicitly protects AdsV2. Limit radial illumination to hero and final offer; no glow on every review or repair card.
- Controls use existing interactive/micro-glow tokens, plus clear focus styling. No constant pulsing, flicker, scroll theatrics or full-screen blur. Essential copy and CTAs remain visible without animation initialization.
- Existing V2 hero is generated product artwork, documented in `docs/ads-v2-imagery/INDEX.md`; it may illustrate repair but must not be described as a real iLab technician. The current V2 alt text makes that claim and should not be copied to V3.
- Use the actual Domina and Spice photos via `getLocationPhoto(id, locale)`. Domina is landscape; Spice is portrait. Preserve signage and reception area with the registry's existing crop positions. Do not force both into a shallow landscape crop or synthesize replacement shops.

**Location composition:** on desktop, roughly 60% map / 40% selected-branch panel, with a two-location selector and visible photo thumbnails so both real workshops are apparent. Selected panel contains the larger photo and operational details. On mobile: branch selector, selected photo, address/hours/actions, then a compact map; both branch controls remain visible without swiping. Selecting either marker or branch control updates one `selectedLocationId`, the highlight, photo and details. Branch-specific actions pass that exact ID.

Recommended map means the existing **interactive branch-selection map**: local cartography with clickable/keyboard-operable pins, not a new third-party pan/zoom SDK. Full navigation remains in Google Maps/Waze. Reuse the map source and settings pin positions; keep both branches visible and emphasize the selected one. A slippy map would be a separate scope/dependency choice, not implied by the current implementation. Photos/address/contact remain useful if map loading fails.

## E. Conversion and measurement contract

**Primary path:** visitor identifies the service → opens the same inquiry drawer → device/fault and any explicitly chosen branch are prefilled → submits an inquiry → shop follows up. This is not automatic appointment confirmation.

| Action | Behavior |
| --- | --- |
| Booking | Consistent `Pieteikt remontu / Записаться`; hero, contextual repair detail, convenience/process, persistent controls and final section all use the same controller and booking mode. |
| Price inquiry | `Precizēt cenu / Уточнить стоимость` opens existing price mode, which does not require a visit date. Useful for uncertain models/repair cost and other devices. |
| Detailed prices | Keep the real `/cenas` destination as an explicit navigation link. Reuse price-brand/model helpers only when context is known; merge campaign query parameters carefully rather than overwriting an existing query/hash. No invented RU prices URL. |
| Phone / WhatsApp | Direct branch action when the visitor explicitly acts on a named branch. Generic contact opens the existing branch-selection pattern; do not silently send everyone to Domina. |
| Mobile persistent actions | Two slots: primary booking and secondary contact. Contact opens branch phone/WhatsApp choices. This adds a tap relative to the current phone/WhatsApp dock, but gives booking permanent visibility; test channel outcomes rather than assuming improvement. Hide/inert while a drawer is open, reserve content padding and safe-area space. |
| Context | Keep existing allowlisted service IDs and `form=booking|price|delivery`; preserve `lang`, campaign query and hash on language switch. Carry selected fault/device/branch internally, not visitor-entered personal data in URLs. Reset stale device-specific faults when device changes. |
| Device/model | Editable model field in existing form; do not gate inquiry behind a new multistep selector. Any future suggestions use the real public catalog and retain an “other/not sure” path. |

Preserve the existing `/api/booking` contract, required fields, honeypot and duplicate-submit guard. Reuse `app/adsV2/LeadForm.jsx` without modifying V2 where compatible; it imports its own CSS module and localized field copy, so the V3 scope must supply the same foundation variables. Existing form IDs include `ads-v2` but are safe only with one active form instance. A shared extraction is justified only if the approved requirements cannot be composed through existing props; any extraction then needs explicit V2 regression checks.

The current form checks HTTP success only; the API returns `{ok:true}` after email acceptance and `{ok:true, skipped:true}` for honeypot submissions. Any V3 conversion instrumentation must also inspect the response body and must not count skipped/error responses. Preserve the honeypot's outward anti-abuse behavior. Do not label inquiry acknowledgement as a confirmed appointment.

Booking currently has tomorrow as its earliest date and fixed requested time windows. Same-day enquiries remain available by phone/WhatsApp; do not advertise same-day online availability that the form does not offer. Check branch hours/overrides against the requested windows before traffic activation. Avoid changing the global booking policy as a side effect of a landing redesign.

**Proposed measurement, pending existing GTM trigger mapping:** CTA click/open, repair selection, branch selection, phone/WhatsApp click, directions click, form start, accepted inquiry and inquiry error. Use existing event names where they already exist. Suggested payload fields: `page_variant`, `preview`, `locale`, `placement`, `lead_type`, `service_id`, `branch_id` and channel; no name, phone, free-text fault/comment or full form contents. Contact clicks measure intent, not completed calls/conversations.

Keep the global tracking bootstrap, respect existing consent behavior, and verify external GTM triggers before adding success events to prevent double counting. No consent overhaul or second analytics SDK. Filter preview/test traffic before ad reporting; no real lead submissions during QA. Actual uplift requires a later controlled traffic comparison with accepted enquiries and channel outcomes.

## F. Technical boundary and safe preview

Proposed route-owned files after approval: `app/adsV3/page.jsx`, `layout.jsx`, `AdsV3.jsx`, `AdsV3.module.scss`, colocated `adsV3.i18n.js`, and small CTA/locations client modules where necessary. Keep section ownership in the route initially; promote reusable code only when there is a demonstrated second consumer. No new dependencies.

- Server entry loads existing cached settings/reviews and only the required pricing subset if numeric prices are approved. Prefer server-rendered static sections and small interactive boundaries; avoid copying the full V2 client page plus its motion runtime.
- Reuse NavBar, Logo, Button and the service variant of FullscreenPanel. Own one V3 inquiry state/controller. Do not mount the normal service `UiDialogsProvider` beside the campaign controller; `docs/component-architecture.md` explicitly treats them as separate integration boundaries.
- Reuse pure location photo/availability/link helpers; compose a V3 map/photo view. Do not replace or modify shared `FullLocations` to reintroduce maps, and do not copy all of `HomeInteractions` just for marker selection. Older map components contain embedded defaults/polling; never import them without overriding their business data and reviewing behavior.
- `/adsV3` and `/adsV3?lang=ru` work on localhost/main-host preview without `ads=1`. Riga-host URLs still rewrite to the original. Preserve that host routing and all original/V2 files.
- Route metadata: localized preview title/description, explicit `noindex,nofollow` including Googlebot; no sitemap or public navigation entry. Use a clean preview self-canonical without campaign parameters, rather than inheriting the main homepage identity or pointing the experiment at the production landing. Verify emitted HTML; canonical is not a substitute for noindex. Keep crawler access sufficient to read noindex. Preview hosting stays protected/local until separately authorized.
- V2 has no route-level canonical; root OpenGraph URL inherits the main site. V3 should explicitly define its preview metadata instead of copying that inheritance accidentally. No production canonical, hreflang or advertising-host changes.
- Normalize `lang` to `lv|ru`. Mark the whole V3 content, header and dialog subtree with the chosen language. Root `<html lang>` currently derives from `/ru` pathname only; query-based RU requires explicit verification of document/subtree language and a narrowly scoped solution if document-level alignment is needed. Do not expand this into a sitewide locale refactor.

## G. Risks and approval gates

These are architecture risks and acceptance criteria, not a completed WCAG or performance certification.

| Risk | Required treatment/check before traffic |
| --- | --- |
| Branch identity/content drift | Live pages/settings fallback say Spice Life, photo registry says Spice Home. Confirm intended display name against authoritative settings and approved business copy; retain branch ID `spice`, address/contact source and existing links. Do not rename global data during this audit. |
| Overclaiming proof | Reconcile LV/RU repair-time differences; verify static 10+/20K+ business claims and delivery-cost promise. Use actual branch review ratings/counts; do not present the unweighted rounded branch average as a precise combined Google rating. Missing review data must not produce invented fallback stars. |
| Price drift and scope | Current examples are hardcoded. Use `getStartingServicePrices`/existing catalog resolvers only for the exact supported category/brand/service and preserve exclusions; otherwise show a price inquiry and real price-page link. |
| Inquiry correctness | Mock success, skipped, failure and duplicate submission. Check prefill, branch/date/time, error recovery and acceptance semantics. No real email/production writes in tests; unchanged API/auth/Firebase boundaries. |
| Keyboard and semantics | Issue selector and map/branch controls expose names and selection state; use a proper button group or full tab semantics. No unexpected navigation/focus jump from mere selection. Check keyboard/close/focus return for drawer and errors: WCAG 2.1.1, 2.1.2, 3.2.2, 3.3.1, 4.1.2. |
| Readability and fixed UI | Verify photo alt/structure, contrast, visible focus, unobscured focus, labels and touch targets. Test 320px reflow and 200% text, RU labels and on-screen keyboard: WCAG 1.1.1, 1.3.1, 1.4.3, 1.4.4, 1.4.10, 1.4.11, 2.4.4, 2.4.6, 2.4.7, 2.4.11, 2.5.8, 3.3.2. Prefer 44px practical touch controls; this is a design target, not the WCAG minimum. No new authentication flow is proposed. |
| Image/map load | Existing map PNG is 1,312,431 bytes versus the 71,064-byte hero WebP. Lazy-load/responsively serve or derive a V3 map variant, keep its coordinate geometry, and reserve dimensions. Branch 640px assets are 36,832/40,800 bytes; reuse their responsive sources. Prioritize only actual first-screen media. No measured latency/savings claim yet. |
| Motion and hydration | No content/CTA hidden pending animation; reduced-motion path, stable image slots and inexpensive feedback. Do not inherit V2's mobile CTA-hiding rule or unnecessarily import all motion code. |
| Analytics/indexing | Verify noindex and clean canonical for LV/RU preview, exclude test traffic, validate consent and deduplication against real GTM configuration. Do not treat clicks or honeypot responses as accepted enquiries. |

The accessibility checklist informed these gates; rendered contrast, reflow, zoom, focus overlap, screen-reader behavior and all unexercised flows remain unverified. Current inspection does not establish full-page conformance for either existing landing.

## H. Small implementation passes — only after blueprint approval

1. **Preview shell and conversion contract:** read installed Next.js guides before framework edits; add isolated LV/RU route, scoped foundations, metadata and one inquiry controller. Verify routing/noindex and mocked submission contracts. No host switch or public navigation.
2. **Hero:** implement the approved copy, truthful media, proof and mobile-visible actions; review desktop and phone before extending the page.
3. **Early proof and convenience:** compact reviews and reconciled trust/speed copy; review density and time to reach problem selection.
4. **Problems and coverage:** six visible choices, contextual booking/price requests, cautious device coverage and verified pricing only. Check selection/prefill and both locales.
5. **Locations:** synchronize map, real photos and details; review crops, keyboard selection, hours/overrides, named-branch contact and directions.
6. **Process, parcel, FAQ and close:** preserve useful content and delivery fields, add final primary booking; review the full conversion sequence and dock overlap.
7. **Integration milestone:** focused lint/tests throughout; then appropriate full tests, lint and production build. Use ESLint directly if the existing `next lint` script is incompatible with the installed Next.js version. Run full conversion/accessibility/representative responsive checks, with final five-width review (375/768/1024/1280/1600) plus 320px reflow/zoom checks. Collect performance measurements on the production build. Confirm original/V2 preserved; any approved shared extraction expands their regression scope. No staging, commit, push or deployment without separate authorization.

**Approval requested:** the ten-section sequence, booking-first CTA system, compact early proof, retained dark/cyan neon language, map-plus-real-photo composition, and isolated preview architecture. Content discrepancies above must be reconciled during the relevant implementation pass. Stop here until architecture and visual direction are approved.
