# Huts Group Laser Cleaning Website

This is the official website for **Huts Group**, a premier laser cleaning service provider in the UK. The site is a responsive, single-page application (SPA) style landing page with a separate privacy policy.

## Overview

- **Purpose:** Promote laser cleaning services, showcase before/after results, and capture leads via contact form/WhatsApp.
- **Target Audience:** Industrial, automotive, and heritage sectors in the UK.
- **Design:** Dark mode, glassmorphism UI, mobile-responsive.

## Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Custom properties (variables), Flexbox, Grid, Glassmorphism effects.
- **JavaScript (Vanilla):** Scroll animations, mobile navigation, FAQ accordion, cookie consent.
- **Cloudflare Pages Functions:** Contact form configuration and submission handling.
- **Cloudflare D1:** Submission storage for contact enquiries.
- **External Libraries:**
  - [FontAwesome](https://fontawesome.com) (Icons)
  - [Google Fonts](https://fonts.google.com) (Inter)

## Getting Started

Since this is a static website, no build process or backend server is required for development.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Open locally:**
    simply open `index.html` in your web browser.

## Logic & Configuration

- **Main Content:** `index.html`
- **Styles:** `style.css` (Theming via `:root` variables)
- **Interactions:** `script.js`
- **Pages Functions:** `functions/api/contact-config.js`, `functions/api/contact.js`
- **D1 Schema:** `cloudflare/d1/contact_submissions.sql`
- **Analytics:** Google Analytics (configured in `<head>` of `index.html`)
- **Forms:** Cloudflare Pages Function + Turnstile + D1 storage

## Documentation

See the `docs/` folder for detailed documentation:
- [Architecture](docs/ARCHITECTURE.md)
- [Decision Log](docs/DECISIONS.md)
- [Build Log](docs/BUILD_LOG.md)
- [Cloudflare Forms](docs/CLOUDFLARE_FORMS.md)
- [Git Guide](docs/GIT_GUIDE.md)
