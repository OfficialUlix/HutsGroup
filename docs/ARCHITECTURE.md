# System Architecture

## Overview
The Huts Group website is a **static client-side application**. It relies on standard web technologies (HTML/CSS/JS) without a backend processor (like PHP or Node.js). Hosting is assumed to be a static file server (e.g., Netlify, Vercel, GitHub Pages, or standard Apache/Nginx).

## Directory Structure

```
/
├── index.html          # Main landing page (Single Page Application feel)
├── privacy.html        # Static privacy policy page
├── style.css           # Main stylesheet (contains all styles)
├── script.js           # Main logic (DOM manipulation, events)
├── assets/             # Static assets
│   ├── img/            # Images (Before/After, Hero, etc.)
│   └── favicon.svg     # Site icon
└── docs/               # Project documentation (Source of Truth)
```

## detailed Design

### 1. Styling Strategy (`style.css`)
The project uses a **CSS Variable** driven theme defined in `:root`.
- **Colors:** Defined abstractly (e.g., `--bg-dark`, `--accent-primary`) to allow easy theming changes.
- **Glassmorphism:** A utility class `.glass-panel` provides the signature look using `backdrop-filter: blur()`.
- **Responsiveness:**
  - Mobile-first approach where applicable.
  - Media queries handle breakpoints at `968px` (Tablets/Small Laptops) and `640px` (Mobile).
  - Flexbox and CSS Grid are used for layout (`.tech-grid`, `.gallery-grid`).

### 2. Interaction Logic (`script.js`)
The JavaScript is lightweight and event-driven. It waits for `DOMContentLoaded`.

- **Navigation:**
  - Background becomes opaque on scroll (`.navbar.scrolled`).
  - Mobile menu toggle logic.
- **Scroll Reveal:**
  - Uses `IntersectionObserver` API to trigger `.reveal.active` classes on scroll for fade-in animations.
- **FAQ:**
  - Accordion pattern: expanding one item closes others.
- **Smooth Scroll:**
  - Intercepts anchor links to provide smooth scrolling with header offset calculation.
- **Cookie Consent:**
  - Checks `localStorage` for `cookieConsent`. Shows banner if missing.

### 3. Third-Party Integrations
- **Google Analytics:** Implemented via standard tracking snippet in `<head>`.
- **Formspree:** Used for the contact form submission. The form `action` attribute points to the Formspree endpoint.
- **WhatsApp:** Direct links using `wa.me` protocol.

## Data Flow
1.  **User Visits:** Browser requests `index.html`.
2.  **Assets Load:** CSS, JS, Images, Fonts loaded from server/CDNs.
3.  **Interaction:** User interacts with DOM elements (handled by `script.js`).
4.  **Submission:**
    - **Contact Form:** POST request -> Formspree -> Email Notification.
    - **Analytics:** Data -> Google Analytics.
