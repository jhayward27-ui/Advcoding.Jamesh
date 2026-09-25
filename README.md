# Advcoding.Jamesh — Elevate

A website that helps people get better at any sport. Pick the sport you want to
improve at and Elevate gives you a focused set of training videos — both
on-field **skill drills** and **weight-room** workouts — so you can train the
full picture.

This repository contains the first working version of that idea, built as a
single-page web app.

## Tech stack

- [Vite](https://vite.dev/) build tooling
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- Plain CSS (no UI framework)

## Getting started

Requires Node.js 20+ (developed on Node 22).

```bash
npm ci        # install dependencies
npm run dev   # start the dev server at http://localhost:5173
```

## Available scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Vite dev server (port 5173)    |
| `npm run build`     | Type-check and build for production      |
| `npm run preview`   | Preview the production build             |
| `npm run lint`      | Run ESLint                               |
| `npm run typecheck` | Run the TypeScript compiler (no emit)    |

## Project structure

```
src/
  data/sports.ts        # curated catalog of sports + training videos
  components/            # SportGrid, TrainingView, VideoCard, VideoModal
  App.tsx                # app shell, search, and view switching
  types.ts               # shared types
```

## How it works

1. The landing page shows a searchable grid of sports.
2. Selecting a sport opens its training program, split into
   **On-field skill training** and **Weight room** sections.
3. Clicking a video opens an in-page player.

Add or edit entries in `src/data/sports.ts` to grow the catalog.

## Cloud Agent environment

`.cursor/environment.json` configures the Cursor Cloud Agent environment:
`npm ci` installs dependencies and the `dev` terminal serves the app on port
5173.
