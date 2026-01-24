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
