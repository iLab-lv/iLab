# V3 responsive CTA contract

This correction supersedes Pass 1C's desktop Call/WhatsApp configuration. Original advertising landing = behavior reference; V3/AdsV2 = visual reference.

## Original implementation inspected

`app/ads/layout.jsx` mounts `LandingCtaDock`, which mounts `LandingBottomBar`, `LandingBranchSheet` and `LandingLeadSheet` under `LandingCtaProvider`. These are separate from the main website's global `BottomBar`.

| Viewport | Original action order and labels | Behavior |
| --- | --- | --- |
| Above 768 px | **Pieteikt remontu**, then **Uzzināt cenu** | Primary button opens booking mode via `openBookingForm`; secondary link navigates to `https://ilab.lv/cenas` with `_self`. |
| 768 px and below | **WhatsApp**, then **Zvanīt** | `openBranchSheet('whatsapp'/'call')` offers both configured branches. Selecting one follows that branch's contact URL and closes the sheet. Escape/backdrop dismiss it. |

Desktop dock is fixed 24 px from the bottom-right. Mobile dock is fixed 12 px from both sides and 12 px plus bottom safe-area from the bottom. Both persist while scrolling. The original booking overlay covers the dock; V3 explicitly hides its docks while a drawer is open.

The original desktop buttons both use accent tone and render cyan; booking is the first/primary variant and pricing is the second/secondary variant. V3 preserves that action order while using AdsV2's cyan primary and outlined secondary styling.

Booking has a branch radio group inside the form (original defaults to the first branch); no separate location selector precedes it. The pricing link requires no branch selection and does not open a price-inquiry form.

The original dock and lead-sheet components are hardcoded Latvian, including when `lang=ru` is supplied; there are **no original RU dock labels** to reproduce. V3 retains its existing **Записаться** and **Позвонить**, and uses **Узнать цену** for the pricing action. Its price destinations come from the existing localized site CTA content: LV `/cenas`, RU `/ru/ceny`, on `https://ilab.lv`.

## V3 implementation

- Same action order, 768 px inclusive breakpoint, fixed placement, booking operation and same-tab price navigation. Mobile hero actions are hidden through 768 px; desktop hero booking/contact remain available above that width.
- Existing V3 `FullscreenPanel` and unchanged AdsV2 `LeadForm` remain in use. Mobile contact selection uses the existing V3 contact drawer and shared `locationLinks` helper with authoritative settings; no phone numbers or new contact/booking systems were introduced.
- Selecting either branch closes the contact drawer before following its link, with the original contact links' `_blank` behavior and `noopener noreferrer`. Keyboard focus restores to the opener. Both branches remain available regardless of inquiry prefills.
- Dock styles are local to V3; the shared/main website dock component and stylesheet are untouched. Cyan/outline desktop hierarchy, V3 mobile glass surface, safe-area spacing, bottom content clearance and hidden-drawer behavior are retained.
- Existing anonymous preview tracking adds the desktop `prices` intent; it remains consent-gated and contains no contact/form data.

Changed: `app/adsV3/AdsV3.jsx`, `AdsV3.module.scss`, `adsV3.i18n.js`, `adsV3.model.js`, both V3 test files and this document. Original/AdsV2/shared components remain unchanged. No commit, push or deployment.

## Verification

Focused ESLint, 22 relevant unit/integration tests and production build (including lint/type checks) passed. Existing build warnings remain outside V3.

Production browser verification passed: 14 LV/RU viewports, 27 V3 flow checks, original/AdsV2 booking regressions, and direct original-versus-V3 comparisons at 390, 768, 769 and 1440 px. These compare action order/labels, fixed bottom positioning through scrolling, desktop booking and same-tab pricing, both mobile contact destinations and close-on-selection. V3 drawer hiding, keyboard focus/restore, enlarged-text reflow, content clearance and no horizontal overflow passed. No page/hydration errors occurred. Contact navigation was intercepted and both booking submissions were mocked; no calls, messages or emails were sent.

Results and representative original/V3 desktop/mobile screenshots are kept locally in ignored `tmp/ads-v3-cta/`: `results.json`, `build.log`, `original-390.png`, `original-1440.png`, `lv-390.png`, `lv-1440.png` and matching RU screenshots.
### Desktop alignment refinement

V3 follows AdsV2's viewport-edge placement: 24px from the right and bottom below 1280px, then 32px at 1280px and above. The former ruler-width inset is removed. The right ruler's interactive range remains above the Dock; drawer hiding, localized actions and mobile placement are unchanged.
