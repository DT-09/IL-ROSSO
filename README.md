# IL ROSSO

**La passione non finisce mai.**  
An independent digital fan museum exploring Scuderia Ferrari through its machines, competition, engineering, history and people.

> IL ROSSO is a fan-made editorial project. It is not affiliated with, endorsed by, or sponsored by Ferrari S.p.A., Formula 1, FIA or FIA WEC.

## The experience

- **IL VARCO** — cinematic entrance and editorial manifesto.
- **LA MACCHINA** — original interactive 3D open-wheel concept study. Orbit and inspect an illustrative model; it is not official Ferrari CAD or a replica.
- **FORMULA ONE** — the Scuderia’s championship story and current competition.
- **ENDURANCE** — the 499P, Le Mans and the long-distance discipline.
- **AERODYNAMICS** — explainers for downforce, drag and balance.
- **IL MITO** — selected road and racing machines from the 125 S to the 499P.
- **L’ARCHIVIO** — selected historical milestones.
- **I TIFOSI** — the people, rituals and culture around the team.
- **THE GALLERY** — curated imagery with source attribution and an accessible lightbox.
- **YOUR ARCHIVE** — save selected historical chapters locally in the current browser.

## Stack

React 19 + TypeScript + Vite · Three.js + React Three Fiber + Drei · Motion · Cloudflare Pages.

## Run locally

```bash
npm ci
npm run dev
npm run build
```

## Cloudflare Pages

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`
- Node.js: 20 or newer

The `public/_redirects` file provides SPA fallback routing. GitHub Actions runs the production build on pushes and pull requests.

## Accuracy and rights

- Historical milestones are concise editorial summaries. See the [Formula 1 Ferrari year-by-year archive](https://www.formula1.com/en/information/ferrari-year-by-year.61yfcjhl05vSlmNJB1SIJ0) and [Ferrari's official history](https://www.ferrari.com/en-EN/history).
- Current-season figures change. Link to official championship sources rather than freezing live statistics into the page.
- Third-party photographs, logos, video and trademarks remain the property of their respective owners. Their appearance or source link does not grant reuse rights. Verify permission and licence terms before commercial use or redistribution.
- The 3D model is original illustrative artwork, not an official Ferrari design, CAD model or telemetry visual.
- Engineering explanations are educational. The tyre-strategy exercise is hypothetical and does not use team telemetry.

## Accessibility and privacy

Responsive layouts, visible focus states, keyboard-operable controls and reduced-motion handling are part of the interface. The personal archive uses browser local storage only; no account or remote data collection is implemented.
