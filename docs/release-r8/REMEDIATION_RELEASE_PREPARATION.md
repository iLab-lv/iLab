# R8.2 — Remediation and release preparation

Date: 2026-11-08. Repository: `C:/Users/info/Desktop/website/iLab`; branch `feature/redesign-integration`; base commit `ea79068ddc72110b66ab1f38ae698a343b80fbdc`.

**Scope correction, 2026-11-09 (Europe/Riga):** the user explicitly approved including the existing AdsV2 source, assets and reference coverage in the repository and feature-branch Preview. This supersedes the earlier exclusion below. The six `app/adsV2` source files and three `public/images/ads-v2` assets were reviewed; AdsV2 remains a noindex manual preview route. No active Ads host rewrite, Shop rewrite or Firebase record is changed. Re-test and build the complete staged candidate, then commit/push `feature/redesign-integration` only if verification passes. No main merge or Production deployment is authorized.

**Scope-corrected verification passed:** the exact staged Service-plus-AdsV2 candidate passes **131/131 unit tests**, AdsV2 scoped lint (**0 errors / 0 warnings**), standalone type verification (**exit 0, no diagnostics**) and the isolated production build (**exit 0**, completed **2026-11-09 06:55:55 UTC / 08:55:55 Riga**). The former missing-reference failures are resolved by including the actual project files; no tests were weakened. The index remained unchanged during verification. The report-only result update does not change the verified application/test/assets inputs. Staged Ads middleware and Shop rewrite code match HEAD. The candidate is prepared for the authorized feature-branch commit/push and automatic Preview; Production remains unapproved.

**Checkpoint: R8-01 through R8-04 are corrected and local verification passes. No staging, commit, push, merge, deployment or production-setting change was made.** Live Vercel configuration/domain confirmation and explicit final release approval remain outstanding. R8.1 remains the historical audit; this document records its targeted follow-up.

**Authorized follow-up:** the user subsequently approved committing and pushing the Service redesign to **`feature/redesign-integration` only**, allowing its automatic Vercel **Preview** build. This supersedes the proposed separate release-branch name below. Production merge/deployment is still prohibited; the user will review Preview manually. Temporary/audit artifacts, backups and unpublished AdsV2 work remain local. The exact staged Service candidate is verified before publication; no Production environment values or Firebase records are changed.

**Publication stopped before commit/push:** GitHub feature-branch push permission passed a dry run, but the Service-only staging selection excludes the unpublished `app/adsV2` files required as references by four existing tests. The exact staged candidate therefore has **127/131 passing tests**, with ENOENT failures in `navigation-rulers.test.mjs:40`, `quick-contacts.test.mjs:58`, `service-faq.test.mjs:148` and `service-r73-seo.test.mjs:92`. This is a commit-selection/reference-fixture dependency, not a regression in the four R8.2 fixes or the original 131/131 full-working-tree result. Per the user's stop-on-blocker instruction, the additional candidate build was stopped. No tests were weakened and no excluded AdsV2 work was published. The 302 reviewed changed paths remain staged; this blocker note is an unstaged report update. No commit, push, Preview deployment, main merge or Production action occurred. Preview environment variables cannot be checked without a resulting Preview. Resolve the reference-fixture/publication boundary before retrying.

## Corrections and modified files

| Issue | Files changed in this pass | Result |
|---|---|---|
| R8-01 | `jsconfig.json`; `app/_components/sections/device-detail/modelPageHeader.js` (new); four model route adapters listed below | Supported `ignoreDeprecations: "5.0"` for installed TypeScript 5.9.2. Removed unsupported `pageHeader`/`headerProps` route exports. Shared JavaScript helper supplies the same localized `#cenas` CTA through existing page props, only when prices exist. |
| R8-02 | `tests/quick-trust-facts.test.mjs`, `tests/service-model-presentation.test.mjs` | Assert one intentional homepage trust strip using its home configuration. Replace obsolete location imports with the live HubLocations → FullLocations adapter contract: one anchor, LV/RU, branch data, map pins and hours. Existing shared-location behavior tests remain. Added localized/hidden price-CTA assertions. |
| R8-03 | `app/(site)/(catalog)/iphone-remonts/IphoneRepairPage.jsx`, `app/(site)/(catalog)/telefonu-remonts/PhoneRepairPage.jsx` | Inner main becomes div, retaining its exact CSS class and contents. The Service layout retains the main landmark. Shared templates cover both locales. |
| R8-04 | `app/api/booking/route.js`; `tests/booking-api-response.test.mjs` (new) | Success returns `{ok:true}`. Operational failures return `{ok:false}` with HTTP 500; existing clients select their localized fallback. Sender/recipient configuration, provider IDs/errors and exception text are absent from those responses. Existing server logs retain diagnostics. Validation, honeypot, recipient selection, email payload and status behavior are preserved. |

Four model adapters:

- `app/(site)/(catalog)/datoru-remonts/[brand]/[device]/page.jsx`
- `app/(site)/(catalog)/plansetdatoru-remonts/[brand]/[device]/page.jsx`
- `app/(site)/ru/(catalog)/remont-noutbukov/[brand]/[device]/page.jsx`
- `app/(site)/ru/(catalog)/remont-planshetov/[brand]/[device]/page.jsx`

Total: **12 code/config/test files**, plus this report. The application remains JavaScript/JSX. No homepage hero/font change (R8-05), dependency change, React renderer patch change, Firebase data/rules change, Shop rewrite change or Ads activation was made. Existing unrelated work was preserved.

## Verification

| Check | Result |
|---|---|
| Full unit suite, including `.mjs` and `.cjs` | **131/131 pass**, final rerun after test-harness lint correction. |
| Scoped ESLint: affected application/helper and test files | **0 errors / 0 warnings**, exit 0. |
| Standalone type verification, no CLI workaround | **PASS**, exit 0 and no diagnostics, using the supported `jsconfig.json`. |
| One isolated production build | **PASS**, Next 15.5.29, 119 static outputs; completed **20:31:42 UTC**. Existing Sass/cache and isolated-root lockfile warnings are non-fatal. |
| Existing production hydration fixture | **26/26 pass**, zero hydration errors/replaced DOM. Version guard remains Next 15.5.29. |
| LV/RU iPhone/phone hub output and tablet/computer model CTAs | **8/8 HTTP 200**, one main landmark on every page; all four model pages retain prices, their localized CTA and `#cenas` destination. |
| Booking response contract | Five isolated handler tests pass: default/Spice routing, reply-to and escaped content; multipart price/delivery payloads; missing configuration/provider rejection/exception; request-parsing exception; required-field/honeypot behavior. No real email or Firebase request is possible through the mocked boundaries. |

Verification uses ignored `.env-r82-verification/working-source`, preserving the root `.next` and user servers. Final inputs comprise 739 source/test/config files, the unchanged `vercel.json` cron configuration inspected separately, and 298 hashed public assets. Candidate content fingerprint: `b9c5b31430c4fe09a700732a4bb277e2fb043d765724b984504f16a01e2cf6ca`. This identifies the verified working-tree inputs, **not a Git commit or a Vercel deployment**. Local manifests/results remain ignored; no credentials are copied into them. The task-owned server on port 3017 was stopped after verification.

Rendered checks used `/iphone-remonts`, `/ru/remont-iphone`, `/telefonu-remonts`, `/ru/remont-telefonov`, and LV/RU counterparts of `/plansetdatoru-remonts/ipad/pro-11-m4-2024` and `/datoru-remonts/macbook/macbook-air-13-m4-2025-a3240`. Two safe local API requests also verified HTTP 400 for an empty payload and HTTP 500 with exactly `{ok:false}` for malformed JSON; no valid booking/email was sent.

Commands run in the isolated snapshot:

```bash
node --test tests/*.test.mjs tests/*.test.cjs
node node_modules/typescript/bin/tsc --noEmit --project jsconfig.json --incremental false
# ESLint was limited to the 11 affected JavaScript/JSX/test files.
# Production build: installed Next CLI, with environment loaded in memory.
```

The two lint errors encountered initially were test-harness variables named `module`; both were renamed, then the full unit suite and scoped lint were rerun successfully. No generated route error was suppressed. No broad R8.1 browser sweep was repeated.

## Production facts and outstanding confirmation

| Item | Evidence / status |
|---|---|
| GitHub default branch | Read-only repository API: **main**. This does not by itself prove Vercel's production-branch setting. |
| Remote main | `git ls-remote`: `a3b0aef44c8bff915d1aea612ef712d8cca58cac`. Local `origin/main` matches. |
| Working branch | Local `feature/redesign-integration` at `ea79068…` with substantial uncommitted redesign work. No remote branch of that exact name was returned. |
| Latest Production-labeled GitHub deployment record | ID **6962055419**, SHA **a3b0aef44c8bff915d1aea612ef712d8cca58cac**, success dated **2026-10-09 13:37:21 UTC**. [Recorded deployment URL](https://ilab-website-dftm6935q-igors-projects-3008cc51.vercel.app). |
| Currently assigned `ilab.lv` deployment | **Not verified.** A historical successful deployment record is not proof of today's domain assignment or retention/rollback eligibility. |
| Vercel project, production branch, runtime/build settings and Production env scope | **Not verified in the signed-in dashboard.** No local Vercel project link, CLI or standard CLI auth file was found. Browser-extension host was unavailable; native Computer Use then ended because it could not determine the browser URL confidently enough to enforce policy. UI access was stopped. Confirmation has been requested; no access workaround or settings change was attempted. |
| Local platform configuration | Unchanged `vercel.json` contains only `crons: [{path:"/api/reviews/cron", schedule:"0 6 * * *"}]`; no local build/root/branch/rewrite override. Dashboard overrides remain unverified. |

Before release, confirm the Service Vercel project (historical deployment names indicate `ilab-website` in `igors-projects-3008cc51`), repository link, production branch, current deployment ID/URL, assigned domains, runtime version, build command/root and eligible retained rollback deployment. Treat that project identification as historical evidence until the dashboard confirms it. Do not change the production branch merely to deploy this feature.

Environment **names/status only** were inspected locally. Core local Firebase server/client and booking variables are present. Production values/scopes have **not** been verified:

- Server Firebase: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (newline handling retained). Expected project: `ilab-v2`.
- Browser Firebase: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`; retain configured storage-bucket/messaging values for existing integrations.
- Booking: `RESEND_API_KEY`, `BOOKING_FROM`, `BOOKING_TO_DEFAULT`, `BOOKING_TO_SPICE`. `BOOKING_REPLY_TO` remains optional and is absent locally.
- Reviews refresh: retain `GOOGLE_MAPS_API_KEY`; verify Production `CRON_SECRET` for the reviews cron scheduled in `vercel.json`. It is absent locally, so local presence cannot establish Production cron configuration.

Do not copy local secrets to a report/commit, overwrite Production values, or assume Preview and Production scopes match. Actual email delivery and receipt remain untested; no operational test email was sent.

## Shop, Ads and remaining risks

Shop rewrites remain `/shop` and `/shop/:path*` → `https://i-lab-shop.vercel.app/shop…`; middleware still excludes the Shop prefix. Riga host routing remains the existing `app/ads/**` implementation, and Service direct-Ads blocking remains intact. No middleware or rewrite edit was made. AdsV2 remains unselected by active host middleware. No Shop repository was touched.

R8-05's intermittent hero reflow remains unchanged by explicit instruction. The R8.1 moderate/low dependency advisory risk, real production email/analytics, field performance and Production configuration confirmation remain outside these four fixes. No new dependency audit or full-site regression sweep was run unnecessarily.

## Proposed release strategy — after explicit final approval only

1. **Resolve the Production confirmation above first.** Record the actual current production deployment URL/ID, commit, domains and rollback eligibility. If `main` is not the configured production branch, revise this plan; do not change settings or silently target another branch.
2. Recheck the working-tree fingerprint and remote heads. Create a local `release/r8.2-service` branch from the current feature HEAD, preserving all work. Review an explicit file allowlist for the **complete approved redesign plus R8.2 fixes**, not just these 12 files: the candidate depends on earlier uncommitted shared components/assets. Exclude credentials, `.env*`, backup exports, isolated build/QA directories and unrelated temporary work. Keep active Ads/Shop routing unchanged. Avoid blanket `git add -A`.
3. Stage only that reviewed list, inspect `git diff --cached --stat` and the complete staged diff, then commit as `release: finalize Service redesign and R8 remediation`. Record the exact release SHA and source/assets fingerprint. If the committed runtime tree differs from the verified candidate, verify the relevant difference before publishing. No force push, reset or history rewrite.
4. Push `release/r8.2-service` and open a GitHub PR to the **confirmed existing production branch**. Verify the Preview build is Ready at that exact SHA and smoke-check affected LV/RU hubs/model CTA/booking response behavior. Preview secrets must be configured appropriately; do not infer them from local presence.
5. Under approval that explicitly covers the production release, merge the reviewed PR to `main` (if confirmed). Observe the existing Vercel Git integration's Production build; verify its commit/tree, Production environment and Ready/Current status with `ilab.lv` domains. A Preview promotion is **not** an artifact-equivalent shortcut: Vercel documents a rebuild using Production environment variables. [Vercel deployment promotion documentation](https://vercel.com/docs/deployments/promoting-a-deployment).
6. Smoke-check `ilab.lv` LV/RU, model prices/booking/language, main landmarks, sitemap/robots, ordinary/RSC Shop access and active `riga.ilab.lv` Ads. An actual delivery/recipient/analytics test needs separate explicit authorization. Do not activate AdsV2. Monitor runtime/hydration/email-provider logs without publishing diagnostics.

Suggested Git Bash commands for the approved commit/push phase, **not executed**:

```bash
git switch -c release/r8.2-service
# Stage the reviewed explicit path list; inspect the full staged diff first.
git diff --cached --stat
git diff --cached
git commit -m "release: finalize Service redesign and R8 remediation"
git rev-parse HEAD
git push -u origin release/r8.2-service
```

PR creation/merge and production rollout are subsequent release actions, not part of this remediation checkpoint. Pushing the configured production branch may automatically deploy; approval must precede that action.

## Rollback

Before rollout, retain the **actual current production deployment**, not merely the historical GitHub record above. Confirm its eligible status and that the approving operator has Production rollback permission. On a failed release, use the Service project's **Instant Rollback**, select that recorded deployment, verify `ilab.lv`/Riga domains and confirm; then smoke-check Service, Shop and active Ads. This reassigns domains to an existing build; it does not restore Firebase data or rebuild with current environment values. No database restoration is part of this release. Eligibility depends on plan/retention (Hobby supports the immediately preceding eligible deployment). [Vercel Instant Rollback documentation](https://vercel.com/docs/instant-rollback).

After rollback, Vercel disables automatic production-domain assignment until normal release behavior is deliberately restored. Keep that state visible to the release operator. Reconcile the source branch through a reviewed revert/fix PR afterward; do not reset or force-push shared history. No rollback or release action has been performed here.
