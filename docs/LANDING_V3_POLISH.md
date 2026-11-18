# Landing V3 — coordinated visual polish

## Mobile hero composition refinement

UI changes are confined to `app/adsV3/AdsV3.module.scss` and the hero image's mobile `sizes` clauses in `AdsV3.jsx`. At widths up to 768px, the existing 1800×2000 phone asset is an absolute, centered image layer behind the content, with its natural aspect ratio, existing cyan illumination and a dark gradient protecting the text. Intrinsic image dimensions remain declared. No new image, dependency or motion was introduced.

The mobile copy uses the existing localized `t.speed` qualification as its single support statement; the longer `t.lead` is hidden only on mobile. No wording, headline, trust claim or translation was changed. The live review badge gains a compact glass treatment above the headline. Both authoritative branch names remain real links with the same preselection/scroll behavior; only their street-address lines are hidden on mobile. All four facts remain in a compact two-column grid with small circular check icons. The WhatsApp/Call Dock and its selectors are unchanged.

Below 360px, the badge uses one decorative star while retaining its full rating/count and accessible description. Names and trust text may wrap; enlarged text grows the hero naturally. Shorter screens can scroll rather than losing content to a fixed-height frame. Above 768px, the existing hero styles and composition remain in use.

Screenshots in `tmp/ads-v3-mobile-hero/` include 360/390px LV/RU after views and comparisons. LV comparison columns are original advertising landing, previous V3 and refined V3; RU comparisons show previous/refined V3. The actual original advertising route in this repository is LV-only, so no RU original is fabricated.

Validation: 13 focused unit tests, JSX-aware scoped lint, SCSS compilation and the final production build passed. The focused browser suite passed all 14 LV/RU cases at 320/360/390/430/768/1024/1440px with no browser errors. It checks the solid phone artwork bounds against the viewport/hero, distinct readable content blocks, unchanged desktop geometry, unchanged other-section dimensions, live review navigation, branch preselection, both existing contact selectors, existing scroll motion/reduced-motion teardown and 320px RU with 200% text. The 360px hero is now 594px tall instead of approximately 891–900px; at 390px it is 643.5px instead of approximately 907–923px. All four comparison images were visually reviewed. Ready for user visual review; nothing committed or deployed.

## Desktop ruler integration

V3 explicitly reuses `PageNavigationRulers` from the canonical Service component. The default export retains the main website's pathname and dialog-provider wiring; the reusable controller accepts V3's main ID, locale and drawer state. `RulerControls` and its stylesheet remain unchanged: 96px viewport-edge rails fixed below the 72px header, existing ticks/section navigation/scroll progress, and visibility from 1280px. Existing Service mono typography and muted ruler ink are restored within V3. Its desktop Dock sits 24px inside the right ruler strip; rulers hide and become inert while a V3 drawer is open. No new labels, effects or animations were added. Original Ads and AdsV2 receive no new ruler instance.

Validation: 16 focused tests, scoped JSX-aware lint and production build passed. Browser checks compared canonical main-site computed styles with V3 at 1280/1440/1920/2560px, verified hidden rulers at 390/768/1024px, and covered both languages, fixed positioning, section/range navigation, drawer hiding/restoration, CTA/content clearance and horizontal overflow. All 14 V3 viewport cases passed with no browser exceptions; original Ads and AdsV2 remain excluded. Desktop screenshots at 1280 and 1920px were reviewed.

## Follow-up: V2 markers and coordinated motion

- Map markers reuse V2's 12px cyan square and dark outlined label treatment. Selection uses the existing signal tokens. Pin activation selects the branch, then scrolls and moves focus to its details heading below the sticky header; reduced motion uses an immediate jump. Geographic coordinates and contact data remain authoritative.
- V3 topbar contact controls have square corners.
- The final production build also passes; keyboard pin activation, smooth-scroll alignment, live sequence animations and the skip-link correction were rechecked on that build at 390 and 1440px without browser errors.
- Facts reveal their value, explanation and top rule in sequence; the four repair steps use a staggered entrance. Desktop rows start together; stacked items reveal as they enter view. Content remains visible without motion.
- Side-by-side review columns share one scroll timeline and fade duration. Reading, focusing, selecting text or expanding a review pauses emphasis in both columns. Stacked mobile columns follow their own viewport position. Manual pagination remains independent per branch.
- These runtime refinements apply only to the existing `ads-v3` profile. The original landing, AdsV2 and default main-site motion are preserved.
- Focused validation: 18 unit tests and scoped ESLint pass; map and motion browser suites pass in LV/RU at 360, 390, 768, 1024 and 1440px, including paired review emphasis, reading pauses, pin-to-details focus, map geometry and reduced motion. Desktop/tablet/mobile screenshots were reviewed. The taste skill's direct CDP runner timed out; its probes were run through the existing Playwright setup instead. Existing approved typography, glow and authentic review content were retained. A V3 skip-link inheritance/contrast issue found during review was corrected.

Work remains on `feature/landing-v3`; the existing backup is preserved. Nothing staged, committed, pushed or deployed. No dependencies or assets added.

## Files and scope

- V3: `AdsV3.jsx`, `AdsV3.module.scss`, `AdsV3Sections.jsx`, `AdsV3Sections.module.scss`, `page.jsx`.
- Shared opt-in adapters: `app/(site)/serviceMotionRuntime.js`, and `ReviewLocation.jsx`, `ServiceReviews.jsx`, `ReviewsCompact.jsx` under `app/_components/sections/reviews/`.
- Added `tests/browser/ads-v3-polish.cjs` and this handoff.

The original advertising landing, AdsV2 source, section order, approved copy, review data/calculations, booking/contact behavior, responsive Dock, pricing, analytics and noindex metadata are preserved. Locations code, map coordinates and photographs are unchanged. No rulers were added.

## Reviews

Reused the main website's `startServiceMotion` runtime and `HomeReview` word spans. The existing effect is scroll-driven word emphasis, not an automatic review carousel. V3 opts into `profile: 'ads-v3'`; other callers retain the default profile. Inactive review words stop at 0.65 opacity instead of the original 0.2. Pointer/focus interaction, selected text and expanded reviews keep the group fully readable. No timer replaces content while it is being read.

V3 alone opts into `softTransitions` on the existing review components. Manual pagination fades out for 160ms, then reuses the existing incoming animation. Repeated clicks during the outgoing transition are ignored; controls remain focusable. Collapsed text/metadata space and a responsive area-height reservation prevent short/long pairs or an odd final pair from moving the controls. Expansion remains available; review text and Google links retain their semantic markup and accessible navigation feedback.

## Hero and selected reveals

Moved the existing badge above the H1, retaining its data and `#reviews` link. Spacing replaces its previous below-copy spacing rather than adding another element. LV/RU wrapping, mobile location links and Dock clearance are retained.

The shared runtime drives artwork from scale 1.0 to 1.07 and vertical translation up to 1%, directly from hero scroll progress. Text and controls do not transform. A passive scroll listener schedules at most one animation frame; there is no catch-up loop, sticky behavior or scroll lock.

Selected speed, repair, brand, process, delivery and closing headings reveal once over 360ms with an 8px translation. Speed facts and the four process steps use at most 105ms of stagger. Offscreen content is not hidden while waiting for IntersectionObserver. The V3 profile excludes the runtime's counters, scan lines, broad heading animation and accordion interception. FAQ and Locations retain their existing behavior.

## Surfaces and closing CTA

Added low-opacity petrol illumination around repairs, a quieter brand field and a slightly different process surface. Brand hover illumination is temporary and does not scale the logos; Samsung retains its existing white-logo treatment.

The final CTA has a stronger static cyan/petrol radial field, a dark surface gradient, restrained top-edge light, the existing signature text glow and a clearer primary price action. Existing closing copy and price/call/WhatsApp actions are unchanged. No pulsing, flickering or animated gradient.

## Safeguards and verification

- Reduced motion stops the V3 native runtime and restores image/text styles; existing scoped CSS also disables CSS motion. Manual pagination becomes immediate, and the existing Locations transition already honors the preference.
- Animations/observers/listeners are cleaned up; cancelled animations are removed from the runtime's tracking set. No new animation library, duplicate motion owner or continuous decorative loop.
- Scoped lint including JSX and production build passed. Existing legacy Sass/autoprefixer warnings remain.
- Repository suite: 157 tests passed. Shared review tests were repeated after the final transition guard and cleanup adjustment: 6 passed.
- Motion browser checks: LV/RU at 360, 390, 768, 1024 and 1440px. Badge order, actual word-focus changes, readable opacity, interaction lock, explicit outgoing/incoming pagination, rapid repeat clicks, stable review height, stable hero layout, scroll transform, selected reveals, FAQ, Locations, reduced motion and overflow are checked.
- Full landing regression: 14 locale/viewport combinations and 31 flow checks, including original advertising/AdsV2 booking and Dock comparisons, focus, touch, text enlargement and mocked booking error/retry/success. Two booking requests are mocked; no real enquiries are sent.
- Default shared behavior is checked through AdsV2's live hero motion and the main website's SSR review opt-out. The latter avoids unrelated catalog prefetch traffic during this focused local check.
- Captures in ignored `tmp/ads-v3-polish/`: LV/RU desktop/mobile hero and full page, plus LV/RU desktop reviews and final CTA. Section captures hide fixed chrome only for the screenshot; interaction checks use the normal page.

## Review notes

Stable review slots reserve some whitespace for short reviews; this is intentional to keep navigation steady. Existing RU closing copy still starts with Latvian `Radusies problēma?`; it was preserved under the copy constraint. The pre-existing static repair-price/timing and Spice Life/Home naming discrepancies remain documented in the assembly/location handoffs. No other polish pass or publication was started.

## Mobile spacing, speed emphasis and motion refinement — 2026-11-18

- Mobile hero top padding increases from 28px to 64px. Badge spacing, artwork position and minimum hero height increase together; desktop hero geometry stays unchanged.
- The speed promise now sits on a richer petrol/cyan field. Larger facts emphasize the existing 20–40 minute qualification, and a dark framed strip gives the existing booking action a clearer destination. Copy, availability qualifications and contact data are unchanged.
- Selected headings reveal over 700ms with a 24px rise; accompanying text follows after 100ms. The speed booking strip joins the existing fact/step choreography. No new dependency, continuous loop or hidden initial content.
- Resting a pointer over reviews no longer disables their scroll-driven word fades. Desktop columns retain their shared timeline; words transition over 420ms with a short capped stagger. Keyboard focus, text selection and expanded reviews retain the full-reading state; reduced motion restores static text. Manual pagination retains its outgoing/incoming transition.

Validation: scoped ESLint, SCSS compilation, 15 focused unit tests and production build pass. Production browser suites pass 14 LV/RU layout cases (320–1440px) and 10 motion cases (360–1440px), including 200% RU text, contact selectors, synchronized review emphasis, pointer-over-column scrolling, pagination, focus, reduced motion and overflow. The highlighted booking action opens the existing drawer in LV/RU; the Dock hides while it is open. No browser errors. Main-site review opt-out and AdsV2 default motion remain intact.

Desktop/mobile/tablet screenshots and taste probes were reviewed. The requested gradient, approved glows, canonical rulers and existing typography/content take precedence over the skill's generic style bans. Local preview verification required clearing one generated failed-review cache entry after an earlier restricted-network fetch; no production data changed. Nothing staged, committed, pushed or deployed.

## V2 light speed field, trust band and repeatable reveals

- The speed section uses V2's light paper (`#e9eef1`), dark text and a darker teal repair-time accent. Its framed booking action keeps the existing booking flow.
- Added V2's trust band immediately after speed and before common repairs. The existing localized `10+` and `20K+` claims are reused. Review volume comes from the same server-loaded summary as the hero/reviews and rounds down to tens; the rating preserves the real branch range. Unavailable review data omits that figure. Desktop uses three large columns; narrow screens use number/text rows. Canonical rulers discover the new semantic section automatically.
- V3 headings, facts, booking content, process steps and trust figures replay whenever their stable containers leave and re-enter view. Active entrance effects cancel on exit into the readable CSS state. The existing review scroll fades remain independent. Reduced motion disconnects the enhancement and restores static content; the main-site/default profile keeps its existing behavior.

Validation: 21 focused unit tests, scoped lint, SCSS compilation and production build pass. Production browser checks pass 10 LV/RU motion cases at 320–1440px (including repeat visits and trust-band ruler navigation), plus 14 hero/layout cases covering contact flows, 200% RU text and overflow. No production browser errors. Desktop, tablet and small-phone speed/trust screenshots were reviewed. The original landing and AdsV2 sources remain unchanged; nothing staged, committed, pushed or deployed.

## Speed hierarchy and canonical V2 map markers

- The speed section uses a flat dark field with the repair-time qualification as its primary visual. The other two facts sit beside it on desktop and beneath it in two columns on mobile. A quieter booking row with a cyan leading edge retains the existing action and copy.
- V3 map buttons now use the actual `HomePage.module.scss` `mapPin` and `selected` classes used by V2. These own the 12px square, label font/variation/padding, default/selected colors, and two staggered 2.4s pulse outlines (second outline delayed 1.2s). Local CSS only anchors the square to the image coordinates, keeps the 48px hit area independent of zoom, and places labels inward so both remain accessible. Labels can wrap when visitors enlarge text.
- Pin selection still scrolls and focuses the existing branch details. Map controls, data, photos and contact flows remain intact. The source styles' reduced-motion treatment is reused; no V2 or main-site source edits.

Validation: 14 focused unit tests, scoped lint, SCSS compilation and the final production build pass. The map suite passes 10 LV/RU cases at five widths, comparing actual V2/V3 selected/unselected square and label styles plus both pulse timings and reduced-motion states; geometry, zoom/pan, pin-to-details scrolling and contacts also pass. Six production checks at 320/768/1440px in LV/RU pass the new speed hierarchy, booking drawer, pin animation, scroll/focus and overflow checks without browser errors. The speed heading also supports 200% RU text after a scoped wrapping correction. Desktop/tablet/mobile captures were reviewed. Nothing staged, committed, pushed or deployed.
### Rating and trust counters

The V3 motion profile now includes the existing review rating counters instead of skipping numeric animation. Trust figures use the website's 1200ms cubic count-up; review ratings use a faster 600ms count-up. Both replay when their stable containers return into view and restore their exact final values when leaving or enabling reduced motion. Mobile figures keep their suffixes on one line at a size that fits the shared number column. Numeric widths are reserved to keep suffixes and `/ 5` steady. The approved experience figure is now `13+` in LV/RU; AdsV2's source copy and main-site behavior remain unchanged.

Validation: 11 focused unit tests, scoped lint and SCSS compilation pass. Four LV/RU browser cases at 390/1440px verify all five counters on two visits, visible intermediate values, monotonic growth, stable digit widths, live viewport resizing, reduced-motion teardown and no horizontal overflow or runtime errors.
