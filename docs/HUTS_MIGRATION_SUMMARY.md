# Huts Group Migration Summary

Date: 2026-03-12

## What We Changed

### 1. Corrected the gallery assets

- Replaced the broken generated "before/after" examples in the Visible Results section.
- Rebuilt the gallery using matched same-subject source images from the archive.
- Added dedicated cropped gallery assets under `assets/img/gallery`.

### 2. Versioned and pushed the gallery release

- Saved the asset refresh as `v1.0.7`.
- Saved the corrected gallery as `v1.0.8`.
- Pushed `main` and the `v1.0.8` tag to GitHub.

### 3. Repaired git sync and authentication

- Removed the dead token that was embedded directly in the `origin` remote URL.
- Reconfigured `origin` to use a clean GitHub HTTPS URL.
- Stored working GitHub credentials in the macOS keychain.
- Enabled `fetch.prune=true` so stale remote refs are cleaned up automatically.
- Refreshed tracking so `main` and `origin/main` match correctly.

### 4. Replaced the dead Netlify form path

- Confirmed the repo was still using Netlify-specific form attributes even though hosting had moved to Cloudflare Pages.
- Removed the Netlify form markup from `index.html`.
- Added a Cloudflare-compatible frontend flow:
  - fetches a public Turnstile site key from `/api/contact-config`
  - renders Turnstile explicitly in the form
  - posts enquiries to `/api/contact`
  - shows clear success and error states to the user

### 5. Added a Cloudflare-native form backend

- Added `functions/api/contact-config.js`
  - returns the public Turnstile site key from Cloudflare Pages environment settings
- Added `functions/api/contact.js`
  - validates required fields
  - rejects honeypot spam
  - validates Turnstile server-side with Cloudflare
  - stores valid submissions in D1

### 6. Added persistent lead storage

- Added `cloudflare/d1/contact_submissions.sql`
- Defined the `contact_submissions` table so enquiries are stored in D1 instead of being lost if inbox notifications fail

### 7. Updated project documentation

- Updated `README.md`
- Updated `docs/ARCHITECTURE.md`
- Updated `docs/DECISIONS.md`
- Updated `docs/BUILD_LOG.md`
- Added `docs/CLOUDFLARE_FORMS.md`

### 8. Removed stale hosting config

- Deleted the obsolete `netlify.toml`
- Left Cloudflare Pages as the only active hosting path represented in the repo

## Why We Changed It

- Netlify form attributes do nothing on Cloudflare Pages.
- Cloudflare Pages does not give you a Netlify-style built-in form inbox.
- A Cloudflare-native flow keeps hosting, bot protection, and lead capture on the same platform.
- D1 is a safer source of truth than relying on inbox delivery alone.
- The repo documentation had drifted from reality and needed to be brought back into sync.

## Current Technical Shape

- Frontend form: `index.html` + `script.js`
- Bot protection: Cloudflare Turnstile
- Backend endpoint: `functions/api/contact.js`
- Public config endpoint: `functions/api/contact-config.js`
- Lead storage: Cloudflare D1 via `CONTACTS_DB`

## Required Cloudflare Setup Still Needed

The code is implemented, but production submissions will not work until Cloudflare is configured with:

- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `CONTACTS_DB` D1 binding
- a Pages redeploy after those bindings are added

## Recommendation Going Forward

- Keep D1 as the source of truth for submissions.
- Add email notifications only as a secondary delivery layer.
- Continue using normal `git fetch`, `git pull`, and `git push` against the cleaned `origin` remote so local and GitHub stay aligned.
