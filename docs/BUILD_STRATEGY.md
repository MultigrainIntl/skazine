# SKAZINE Build Strategy

## Tool roles

| Tool | Role |
|------|------|
| **Cursor** | Local build environment — code, structure, static prototype, JSON data |
| **ChatGPT** | Product direction, prompts, review, scope decisions |
| **Browser** | Approval surface — visual and functional sign-off before git remote |
| **GitHub** | Version control only after local approval |
| **Figma / design images** | Reference and future design-system material — not the active build engine |

## Local preview workflow

1. From repo root: `python3 -m http.server 8000`
2. Open http://localhost:8000/
3. Hard refresh (Cmd+Shift+R) after CSS/JS changes
4. Review in browser before requesting commit or push

## Branch / approval workflow

1. Work on a feature branch (e.g. `skazine-clean-platform-prototype`), not `main`
2. Make small, reviewable changes aligned to an approved prompt
3. Report `git status --short` and `git diff --stat` after each build pass
4. User approves in browser preview
5. Commit locally only when asked
6. Push / merge to `main` only with explicit user approval

## SKAZINE page structure

| Route | Purpose |
|-------|---------|
| `/` | Homepage — platform overview, featured content, CTAs |
| `/bands/` | Band directory |
| `/shows/` | Show listings |
| `/festivals/` | Festivals & weekenders |
| `/map/` | Scene map |
| `/radio/` | Radio, DJs, stations |
| `/writers/` | Writers, bloggers, photographers |
| `/playlists/` | Curated playlists |
| `/cities/` | City scene directories |
| `/submit/` | Submit / join the directory |
| `/partner/` | Partner & sponsors |

Legacy routes (`/artists/`, `/articles/`, `/genres/`, `/about/`) may remain during transition but are not the primary IA.

## Future data model

Static JSON in `data/` is the current prototype layer:

- `data/bands.json`
- `data/shows.json`
- `data/festivals.json`
- `data/radio.json`
- `data/writers.json`
- `data/cities.json`

Future phases may add a real backend, CMS, or build step — not in scope until explicitly approved.

## Design principles

- **Editorial magazine** — strong hierarchy, readable typography, intentional whitespace
- **Directory clarity** — users find bands, shows, festivals, cities fast
- **Restrained ska identity** — black/off-white, olive CTAs, muted red accents, checker strips used sparingly
- **Structured content** — build from data and components, not from cropped mockup assets
- **Professional prototype** — working links, consistent nav, no placeholder collage art

## What not to do

- Do not push, deploy, or touch DNS without explicit approval
- Do not merge to `main` without explicit approval
- Do not recreate AI-generated mockups pixel-for-pixel
- Do not use cropped asset-pack images as implementation blueprints
- Do not paste or request API tokens in chat
- Do not run broad redesigns without a narrow, approved task
- Do not add CMS, payments, accounts, or backend unless explicitly requested
- Do not treat Figma exports as automatic build instructions
