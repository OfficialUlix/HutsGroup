# Cloudflare Pages Contact Form

This project no longer uses Netlify for form handling. The contact form is now designed for **Cloudflare Pages + Turnstile + D1**.

## What Changed

- `index.html` now posts the contact form to `/api/contact`.
- `script.js` fetches `/api/contact-config` to obtain the public Turnstile site key.
- `functions/api/contact.js` validates the Turnstile token and stores the enquiry in D1.
- `cloudflare/d1/contact_submissions.sql` defines the storage table used by the form backend.

## Required Cloudflare Setup

The form will not work in production until these are configured in Cloudflare.

## Recommended Cloudflare Pages Build Settings

This repo is a plain static site at the project root with Pages Functions in the root `functions/` directory.

- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`
- Deploy command: `exit 0`

Do not configure `wrangler deploy` or `wrangler pages deploy` as the deploy command inside Cloudflare Pages Git builds.

### 1. Create a Turnstile Widget

1. In Cloudflare, go to `Turnstile`.
2. Create a widget for the live domain, for example `hutsgroup.co.uk`.
3. Copy the **site key** and **secret key**.

### 2. Create a D1 Database

1. In Cloudflare, go to `Workers & Pages` -> `D1`.
2. Create a database named something like `huts-contact`.
3. Run the SQL in `cloudflare/d1/contact_submissions.sql`.

### 3. Add Pages Bindings

In the Cloudflare Pages project for this site, add:

- `TURNSTILE_SITE_KEY` as a plain text environment variable
- `TURNSTILE_SECRET_KEY` as a secret
- `CONTACTS_DB` as a D1 binding pointing at the database from step 2

### 4. Redeploy the Site

After the bindings are in place, redeploy the Pages project so the Functions can access them.

## How Submissions Flow

1. The browser loads the page.
2. The page requests `/api/contact-config`.
3. The public Turnstile key is returned.
4. The user completes the verification widget.
5. The browser submits the form to `/api/contact`.
6. The Function validates the Turnstile token against Cloudflare.
7. If valid, the Function inserts the lead into D1.

`/api/contact` accepts `POST` only and returns JSON for both success and failure.

## Important Notes

- Cloudflare Pages does **not** provide Netlify-style built-in form inboxes.
- This implementation treats D1 as the source of truth for leads.
- If you want email notifications, add them on top of this storage flow rather than replacing it.
- Until the bindings above are configured, the frontend will show a setup warning and keep the submit button disabled.

## Suggested Next Step for Email

Once submissions are landing in D1 reliably, add one of these:

- A separate Worker that reads new D1 rows and sends notifications
- A webhook from the submission Function into your automation stack
- An email notification service layered on top of the D1-backed source of truth
