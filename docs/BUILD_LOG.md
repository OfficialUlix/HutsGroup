# Build Log

This document tracks the evolution of the project.

## v1.0.0 (2026-01-24)
- **Status:** Initialized
- **Changes:**
  - Initialized Git repository.
  - Audited existing codebase (HTML/CSS/JS).
  - Created `/docs` directory.
  - Added `README.md`, `ARCHITECTURE.md`, `GIT_GUIDE.md`, `DECISIONS.md`.
- **Reason:** [D-001] Establish project foundation.

## v1.0.1 (2026-01-24)
- **Status:** Production Ready
- **Changes:**
  - Migrated Contact Form to Netlify Forms (Honeypot included).
  - Configured Production Google Analytics (G-PKSPVHR6RN).
  - Replaced external placeholder images with local assets.
  - Improved CTA copy for better conversion ("Get Your Quote").
- **Reason:** [D-003], [D-004] Prepare for deployment on Netlify.

## v1.0.2 (2026-01-24)
- **Status:** Polished
- **Changes:**
  - Fixed mobile alignment issues in Intro, Industries, and Contact sections.
  - Updated grid column minimums from 300/350px to 280px for better mobile fit.
  - Centered section titles and subtitles on mobile.
  - Refactored inline flex styles to `.section-header-row`.
- **Reason:** [D-005] User feedback on mobile layout.

## v1.0.3 (2026-01-24)
- **Status:** Polished
- **Changes:**
  - Positioned mobile menu button flush with the right screen edge.
  - Removed navigation container right padding on mobile.
- **Reason:** [D-006] User request for edge-to-edge navigation toggle.

## v1.0.4 (2026-01-24)
- **Status:** Polished
- **Changes:**
  - Applied `display: contents` to mobile `<nav>` element.
  - Fixed flexbox layout issue causing menu button to float in the center.
- **Reason:** [D-007] Fix "4cm offset" bug on mobile menu button.

## v1.0.5 (2026-01-24)
- **Status:** Optimized
- **Changes:**
  - Global CSS update for mobile alignment.
  - Forced center alignment on all cards, panels, and footer columns.
  - Reduced padding on glass panels to prevent crowding.
  - Stacked Contact info and Footer grids vertically.
- **Reason:** [D-008] Comprehensive mobile optimization ("grey boxes" fix).

## v1.0.6 (2026-01-24)
- **Status:** Polished
- **Changes:**
  - Increased global container width to 1300px.
  - Widened FAQ and About section text boxes to 1000px.
- **Reason:** [D-009] User request to widen text-heavy boxes.

## v1.0.7 (2026-03-11)
- **Status:** Asset Refresh
- **Changes:**
  - Updated multiple before/after gallery images in `assets/img`.
  - Added `HUTSLOGOS/` source logo assets to the repository.
- **Reason:** Save the latest approved media set and brand assets in version control.

## v1.0.8 (2026-03-11)
- **Status:** Gallery Corrected
- **Changes:**
  - Rebuilt the Visible Results section with true same-subject before/after image pairs.
  - Added dedicated cropped gallery assets in `assets/img/gallery`.
  - Updated gallery copy and captions to describe the corrected examples accurately.
- **Reason:** Replace mismatched generated photos with valid before/after examples in the live gallery.

## v1.0.9 (2026-03-12)
- **Status:** Cloudflare Forms Migration
- **Changes:**
  - Replaced the dead Netlify form markup with a Cloudflare Pages form flow.
  - Added Pages Functions for Turnstile-backed form configuration and submission handling.
  - Added a D1 schema for persistent storage of contact submissions.
  - Updated project documentation to reflect Cloudflare Pages hosting and form handling.
- **Reason:** The production site now runs on Cloudflare Pages, so form submissions need a Cloudflare-native backend instead of Netlify-specific attributes.

## v1.0.10 (2026-03-12)
- **Status:** Hosting Cleanup
- **Changes:**
  - Removed the obsolete `netlify.toml` file.
  - Left the repo aligned with Cloudflare Pages as the only active hosting target.
- **Reason:** Prevent stale Netlify configuration from causing confusion during future deployments and maintenance.

## v1.0.11 (2026-03-12)
- **Status:** Pages API Hardening
- **Changes:**
  - Made `/api/contact` explicitly POST-only.
  - Standardized the contact endpoint on JSON responses for both success and failure.
  - Restricted submitted service values to the supported frontend options.
  - Documented the exact Cloudflare Pages Git build settings for this repo.
- **Reason:** Align the production form pipeline exactly with the Cloudflare Pages deployment model and API contract.
