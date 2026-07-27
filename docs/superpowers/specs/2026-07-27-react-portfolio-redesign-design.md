# React Portfolio Redesign — Design

## Background

Current site (`index.html`, `css/`, `js/main.js`) is a vanilla HTML/CSS/JS single page: intro name animation → reveal project/profile content, dark mode toggle (localStorage), scroll-based nav highlighting between Project/Profile sections. Owner (우호진) is a backend developer (Java/Spring) job-hunting and wants this portfolio to serve as a long-term, growing showcase — expects to add more projects over time, each with long-form write-ups (tech-stack migration history, architecture, troubleshooting stories) similar in depth to the daallcoffee draft already written.

## Goals

- Rebuild the whole site in React so it scales cleanly as more projects are added.
- Each project can have a dedicated detail view reachable by a clean URL (e.g. `/daallcoffee`), navigated to without a full page reload, with working browser back button.
- Adding a new project in the future should require writing content, not new code.
- Visual design is being redone from scratch; only constraint is a blue–navy color tone. Layout/animation details are decided during implementation.

## Non-goals

- No CMS/admin UI — content is authored directly as files in the repo.
- No blog/comments/analytics.
- No automated test suite beyond type-checking and a successful build — this is a solo static portfolio, not a team codebase.
- hansel project does not get a detail page in this pass — home page keeps it to a one/two-line mention (no "read more" link).

## Stack

- **Vite + React 18 + TypeScript**
- **React Router** (`BrowserRouter`, clean URLs — not hash routing)
- **react-markdown** + **remark-gfm** (project write-ups are Markdown, including tables like the daallcoffee stack-migration history)
- Plain CSS (CSS Modules per component), blue–navy palette
- **GitHub Pages** deployment via GitHub Actions (build → deploy to `gh-pages` branch)

## Content model

- `src/content/projects/*.md`, one file per project.
- Frontmatter: `title`, `summary`, `techStack`, `links` (github/velog/website), `image`, `hasDetailPage` (bool).
- Body: full write-up in Markdown, rendered on the detail route via react-markdown/remark-gfm (needed for the migration-history table and code-ish inline snippets in the daallcoffee draft).
- Project list loaded at build time via Vite's `import.meta.glob` over `src/content/projects/*.md` — adding a project = adding a file, no code change.
- daallcoffee.md gets the full draft content already written; hansel gets a short frontmatter-only entry with `hasDetailPage: false` (card renders, no link to a detail route).

## Routing

- `/` — Home: intro animation, project cards, profile section (education/license/skills, ported from current data), contact icons (GitHub/email-copy/Velog).
- `/:projectId` — ProjectDetail: renders the matching project's Markdown body. 404 if `hasDetailPage` is false or slug doesn't match.
- GitHub Pages does not support arbitrary SPA path fallback natively — a `404.html` redirect trick (standard for SPA-on-GH-Pages) is required so a direct link or refresh on `/daallcoffee` doesn't 404.

## Components

- `Header` — nav (Project/Profile scroll or route links) + dark mode toggle
- `Intro` — name reveal animation (redesigned visuals, same functional role as today's start-button sequence)
- `ProjectCard` — summary card on Home, links to detail route when `hasDetailPage`
- `ProjectDetail` — markdown renderer for the detail route
- `ProfileSection` — education/license/skills, ported from existing data
- `ContactIcons` — GitHub / email clipboard-copy / Velog

## State

- Dark mode: React Context + localStorage, same persistence behavior as the current `main.js` implementation (defaults to `dark` on first visit).

## Testing / verification

- `tsc --noEmit` and `vite build` must pass.
- Manual check in-browser: dark mode toggle, intro animation, routing to a project detail page and back (including direct URL load and refresh), GitHub Pages deploy reachable at the real URL.

## Open items deferred to implementation

- Exact page layout, spacing, and animation choreography (blue–navy tone is the only fixed constraint).
- Whether `frontend-admin` (daallcoffee's separate admin app) is mentioned/linked anywhere in the UI beyond the write-up text.
