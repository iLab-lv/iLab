# Landing V3 — Pass 1

Implemented on `feature/landing-v3`. The original landing, AdsV2, shared components, booking form internals, Firebase data, middleware and SEO templates are unchanged. The backup remains at `148ba080e372d10db5ea4f523a4102b007a5a8ee`. Nothing was staged, committed, pushed or deployed. The approved blueprint is preserved.

## Preview and files

- Route: `/adsV3`; Russian: `/adsV3?lang=ru`.
- Local production preview: `http://localhost:3116/adsV3` and `http://localhost:3116/adsV3?lang=ru`.
- Do not add `ads=1`: that flag intentionally selects the original advertising landing.
- Created `app/adsV3/{page.jsx,layout.jsx,AdsV3.jsx,AdsV3.module.scss,adsV3.i18n.js,adsV3.model.js}`.
- Added focused contracts in `tests/ads-v3.test.mjs` and local browser verification in `tests/browser/ads-v3.cjs`.
- Route metadata is explicitly `noindex,nofollow`, including Googlebot, with localized preview metadata and a clean preview canonical. No public navigation or sitemap entry was added.

## Hero copy

| | Latvian | Russian |
| --- | --- | --- |
| Headline | Telefonu remonts Rīgā. | Ремонт телефонов в Риге. |
| Lead | Saplīsis ekrāns, vāja baterija vai neuzlādējas? Palīdzēsim atkal lietot telefonu. | Разбит экран, быстро садится батарея или телефон не заряжается? Поможем вернуть его в работу. |
| Qualified speed benefit | Biežākos remontus veicam tajā pašā dienā, ja detaļa ir uz vietas. | Частые неисправности устраняем в тот же день, если нужная деталь есть в наличии. |
| Primary / secondary | Pieteikt remontu / Sazināties | Записаться / Связаться |

The desktop hero pairs a large repair headline and signature cyan phrase with the existing AdsV2 product artwork. Mobile puts the offer, booking/contact actions, trust and branch names before the image. Shared Geologica typography, dark surfaces, signature heading glow and opt-in button glow are retained; a restrained radial light supports the image. There is no new generated imagery, pulse animation or finished placeholder section. The footer identifies the preview.

## Conversion behavior and trust

- One V3 drawer controller serves hero, header and persistent mobile actions. Booking renders the existing `app/adsV2/LeadForm.jsx` inside the shared accessible FullscreenPanel; submission/validation/date/time behavior is unchanged.
- Contact opens branch choices using existing ContactActions, directions and availability helpers. Named branch buttons open that branch's real contact information. No new communication service was introduced.
- Below 1024px, the fixed dock has booking first and contact second. It respects safe-area insets, disappears/becomes inert with the page background while a drawer is open, and reserves bottom content space. Scoped rules allow labels to wrap at enlarged text sizes without changing shared buttons.
- Existing allowlisted service/branch query context can prefill the inquiry; supported `form` modes remain available. Language links preserve campaign parameters and the fragment. All V3 text, including dialogs, has the selected locale; a route-local effect aligns and restores the document language without changing the root layout.
- Ratings/counts come from `getReviewsSummary` and existing review normalization/plural helpers. V3 displays a branch rating range rather than inventing a combined rating. Missing proof is omitted. Location names/contacts come from `getSiteSettings`.
- Free diagnostics, price agreement before work and warranty wording are taken from existing campaign/service copy. No prices, fixed repair duration, warranty duration or business totals were added.

## Analytics

GTM's existing `dataLayer` receives one `ads_v3_cta_click` per action, with `page_variant: ads_v3`, `preview: true`, `action: booking|contact`, `placement: hero|mobile_dock|header`, and `locale`. No personal form values are included. Events require the existing accepted analytics-consent cookie; missing/rejected consent does not queue events or replay them later.

The four required combinations are hero booking/contact and mobile-dock booking/contact. No analytics dependency, global bootstrap, GTM tag configuration or lead-success conversion event was added. External GTM reporting/filter setup remains a launch concern; preview events must not be counted as ad conversions.

## Verification

- Focused ESLint passed for V3 and both test files; the production build passed, including Next's lint/type validation. Existing Sass/autoprefixer/cache warnings remain outside V3. The sandbox-blocked initial build was rerun successfully with access to the existing read-only Firebase loaders.
- All 19 focused tests passed: V3 query/proof/tracking contracts, existing booking API response tests, drawer safeguards and review behavior.
- Production browser checks passed for LV/RU at **320, 360, 390, 768, 1024 and 1440px**: correct locale/metadata, visible hero booking, expected dock breakpoint, loaded image, heading glow and no horizontal overflow.
- Hero/dock actions, keyboard containment, Escape, focus return, branch phone/WhatsApp destinations, contextual prefill and language-query preservation passed. Empty-form validation, failure/retry, busy/duplicate prevention and success focus were exercised with **two intercepted requests**; no real inquiry/email was sent.
- Both locales passed 200% text enlargement with labels inside their controls and final content reachable above the dock. A short 390×480 keyboard viewport kept the focused field reachable; direct touch on the dock opened booking. These are browser simulations, not a physical-device or full screen-reader audit.
- AdsV2 and the original landing (`/?ads=1`, the local host-rewrite preview) returned successfully and opened their existing booking forms. Git confirms no tracked-source changes to either implementation or their shared systems.
- Final desktop/mobile screenshots in both languages were inspected. Local artifacts are under ignored `tmp/ads-v3-pass1/`. The taste skill's bundled inspector could not complete because its CDP connection timed out; Playwright supplied the rendered checks/screenshots. No Lighthouse, field performance or full WCAG certification is claimed.

## Remaining boundaries / Pass 2

The reused booking form still starts online requests from tomorrow and uses its existing time windows; same-day questions remain available through contact. Its existing HTTP-success handling, including honeypot responses, is unchanged; V3 emits no lead-success event. No global branch-name correction was made: the current authoritative display name remains Spice Life.

Review the hero before extending the page. Pass 2 should add compact early reviews and the speed/convenience section using approved data and copy. Maps/photos, problem selection, device coverage, parcel content, FAQ and final conversion section remain for their later passes.
