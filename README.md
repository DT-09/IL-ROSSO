# IL ROSSO

**La passione non finisce mai.** An independent immersive tribute to Scuderia Ferrari, its engineering, its history, and the people who carry its colours.

## Stack

- React + TypeScript + Vite
- Three.js / React Three Fiber / Drei for the interactive concept-car study
- Motion for transitions and stateful storytelling
- GSAP is available for future scroll choreography
- Cloudflare Pages for hosting and continuous deployment

## Run locally

```bash
npm install
npm run dev
npm run build
```

## Cloudflare Pages deployment

1. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
2. Select `DT-09/IL-ROSSO`.
3. Set the production branch to `main` (or the repository's default branch).
4. Build command: `npm run build`.
5. Build output directory: `dist`.
6. Framework preset: **Vite**. No environment variables are required for the current app.

Every push to the connected production branch will trigger a new deployment. The `public/_redirects` file preserves SPA route fallback on Cloudflare Pages.

## Experience architecture

- **The World** — cinematic opening and editorial manifesto
- **The Machine** — interactive 3D concept model and engineering explainers
- **The Archive** — navigable selected history with saveable chapters
- **The Pit Wall** — a clearly labelled hypothetical tyre strategy exercise
- **The Tifosi** — personal in-session collection and closing sequence

## Integrity and rights

This is an independent fan-made project and is not affiliated with or endorsed by Ferrari S.p.A. or Formula 1. Do not assume third-party photographs, logos, car designs, video, or sound are free to reuse. Replace any reference imagery with assets you own, have permission to use, or have verified licenses for before public promotion. The 3D vehicle is an original illustrative model, not an official Ferrari CAD model. Strategy outputs are hypothetical and do not use team telemetry.

Historical entries are intentionally concise. Expand the archive only with source-verified facts and documented image rights. Avoid presenting illustrative diagrams or simulated values as official data.
