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