# SKAZINE — Agent Instructions

## Project

SKAZINE is the world-class hub for ska, rocksteady, reggae, 2 Tone, ska-punk, and adjacent scenes.

## Mission

Promote the music. Support the bands. Document the scene. Fill the rooms. Connect the people keeping the genre alive.

## Core platform sections

- Bands
- Shows
- Festivals
- Scene Map
- Radio / DJs / stations
- Writers / bloggers / photographers
- Playlists
- City scenes
- Submit
- Partner / sponsors

## Tool workflow

- **Cursor** builds locally.
- **ChatGPT** provides product direction, prompts, and review.
- **Browser preview** is the approval surface.
- **GitHub** is used only after local approval.
- **Figma / design references** are inspiration and future design-system material, not automatic implementation instructions.

## Hard rules

- Do not push without explicit user approval.
- Do not deploy without explicit user approval.
- Do not touch DNS.
- Do not ask for or accept pasted tokens.
- Do not merge to `main` without explicit approval.
- Do not make broad redesigns without a narrow approved prompt.
- Prefer small, reviewable changes.
- Always report changed files with `git status --short` and `git diff --stat`.
- Keep local preview available at http://localhost:8000/ when possible.

## Design rule

Do not attempt pixel-perfect recreation of AI-generated mockups. Use references for art direction only:

- black / off-white palette
- olive and muted red accents
- restrained checker accents
- editorial music magazine feel
- directory / platform clarity
- not SaaS
- not WordPress-looking
- not generic dark cards
