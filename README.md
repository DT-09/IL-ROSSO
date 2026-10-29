# IL ROSSO

**La passione non finisce mai.** An independent immersive tribute to Scuderia Ferrari, its engineering, its history, and the people who carry its colours.

## Stack

- React + TypeScript + Vite
- Three.js / React Three Fiber / Drei for the interactive concept-car study
- Motion for transitions and stateful storytelling
- GSAP is available for future scroll choreography
- Vercel for deployment

## Run locally

```bash
npm install
npm run dev
npm run build
```

## Experience architecture

- **The World** — cinematic opening and editorial manifesto
- **The Machine** — interactive 3D concept model and engineering explainers
- **The Archive** — navigable selected history with saveable chapters
- **The Pit Wall** — a clearly labelled hypothetical tyre strategy exercise
- **The Tifosi** — personal in-session collection and closing sequence

## Integrity and rights

This is an independent fan-made project and is not affiliated with or endorsed by Ferrari S.p.A. or Formula 1. Do not assume third-party photographs, logos, car designs, video, or sound are free to reuse. Replace any reference imagery with assets you own, have permission to use, or have verified licenses for before public promotion. The 3D vehicle is an original illustrative model, not an official Ferrari CAD model. Strategy outputs are hypothetical and do not use team telemetry.

Historical entries are intentionally concise. Expand the archive only with source-verified facts and documented image rights. Avoid presenting illustrative diagrams or simulated values as official data.

## Deployment

Import `DT-09/IL-ROSSO` into Vercel, use the Vite preset, set build command to `npm run build`, and output directory to `dist`. The included `vercel.json` supports SPA route fallback. Connect the production branch to enable deployments on each push.
