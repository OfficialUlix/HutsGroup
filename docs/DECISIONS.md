# Decision Log

This document records the architectural and significant technical decisions for the Huts Group project.

## [D-001] Project Documentation & Initialization
- **Date:** 2026-01-24
- **Context:** The project existed as a set of flat files without version control or documentation.
- **Decision:** Initialize a Git repository and establish a `/docs` folder structure as the "Single Source of Truth".
- **Why:** To ensure maintainability, track history, and provide context for future development.
- **Trade-offs:** Minimal overhead in maintaining documentation.
- **Impact:** All future changes must be logged and justified.

## [D-002] Tech Stack Continuation
- **Date:** 2026-01-24
- **Context:** Existing site uses Vanilla JS and CSS.
- **Decision:** Continue using Vanilla JS and CSS without introducing build tools (Webpack/Vite) or Frameworks (React/Vue) for now.
- **Why:** The site is simple, performant, and currently meets requirements. Adding a build step would add unnecessary complexity for a static brochure site.
- **Trade-offs:** Lack of componentization (Vue/React style). Manual asset management.
- **Impact:** Development remains simple (edit & refresh).

## [D-003] Netlify Forms Migration
- **Date:** 2026-01-24
- **Context:** User requested migration from Formspree to Netlify Forms for native hosting integration.
- **Decision:** Replace Formspree `action` with `data-netlify="true"`, add honeypot field, and ensure proper `form-name` identification.
- **Why:** Reduces third-party dependency and utilizes the project's hosting platform capabilities.
- **Trade-offs:** None.

## [D-004] Production Asset & Tracking Configuration
- **Date:** 2026-01-24
- **Context:** Project contained placeholder GA IDs and external placeholder images.
- **Decision:** Apply production GA ID (`G-PKSPVHR6RN`) and replace external `placehold.co` images with local assets from `assets/img`.
- **Why:** Essential for launch readiness and privacy (avoiding external image tracking).
- **Trade-offs:** Re-use of some assets until specific industry shots are provided.

## [D-005] Mobile Alignment & Grid Layout
- **Date:** 2026-01-24
- **Context:** User reported offset alignment in "Intro", "Industries", and "Contact" sections on mobile.
- **Decision:**
    1. Update CSS Grid columns to `minmax(280px, 1fr)` and `justify-content: center`.
    2. Force center alignment for Section Titles and Subtitles on mobile breakpoints.
    3. Refactor inline styles in `index.html` to a dedicated `.section-header-row` class.
- **Why:** To ensure a polished, professional appearance on smaller screens where default grid alignment creates visual imbalance.
- **Trade-offs:** Slight refactor of inline styles to CSS classes (D-002 exception for responsiveness).
