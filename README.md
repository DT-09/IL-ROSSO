# IL ROSSO

**La passione non finisce mai.**  
An independent, research-led Ferrari knowledge and culture atlas.

IL ROSSO is not an official Ferrari property, a newswire, or a static fan landing page. It is an independent digital project that connects Ferrari history, machines, drivers, circuits, race strategy and tifosi culture.

> Ferrari, Scuderia Ferrari and related marks belong to their respective owners. IL ROSSO is not affiliated with, endorsed by, or sponsored by Ferrari S.p.A., Formula One, the FIA or FIA WEC.

## Product architecture

- **Discover** — cinematic editorial entrance, scroll-led historical narrative, film room, and connected Ferrari continuum.
- **The Archive** — source-linked chronology from the Scuderia’s 1929 foundation through the 2025 endurance record. Filter by historical category and open source notes.
- **Machines** — selected car dossiers spanning early sports racers, GTs, Formula One and the 499P.
- **Drivers** — selected Ferrari championship figures and career context.
- **Circuits** — editorial circuit profiles with track character and Ferrari context.
- **Race Analysis** — an editorial reading room for tyre performance, pit-stop context and endurance racing, using historical and technical explanation rather than a racing simulator.
- **Tifosi** — the culture of Monza, Maranello and race-day rituals.
- **Cinematic layer** — original prancing-horse crest, scroll-progress indicator, reveal transitions, optional user-activated ambient tone, and an embedded official Ferrari Hypercar film.
- **The Vault** — save archive entries and dossiers locally in the current browser.
- **Tifosi Notebook** — keep private race-day memories and notes locally on the current device.

## Accuracy policy

- The Scuderia Ferrari racing team was founded in 1929; Ferrari’s first car, the 125 S, appeared in 1947. These are distinct milestones.
- Ferrari entered the Formula One World Championship in 1950.
- The Drivers’ Championship began in 1950. The Constructors’ Championship began in 1958. The 1952 Ascari title is a Drivers’ title, not a Constructors’ title.
- Historical entries include external source links. Those links are research starting points, not a substitute for checking primary records.
- Race analysis is explanatory and historical. It does not simulate driving or provide operational racing advice.
- The machine catalogue is intentionally selective. It does not claim to be exhaustive.
- Current-season standings and live timing are not represented as live data.

## Sources

Primary and authoritative reference points include:
- [Ferrari — Company history](https://www.ferrari.com/en-EN/history)
- [Ferrari — Historical highlights](https://www.ferrari.com/content/dam/ferrari-fcom/old/pdf/cos_ferrari_inizio_celebrazioni_70_anni_eng.pdf)
- [Formula 1 — Ferrari year by year](https://www.formula1.com/en/information/ferrari-year-by-year.61yfcjhl05vSlmNJB1SIJ0)
- [FIA World Endurance Championship](https://www.fiawec.com/)
- [24 Hours of Le Mans](https://www.lemans.org/en)

## Stack

React 19 · TypeScript · Vite · Lucide React.

## Run locally

```bash
npm ci
npm run dev
npm run build
```

## Cloudflare Pages

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`
- Node.js: 20 or newer

## Privacy and accessibility

The Vault uses browser local storage only. There is no account system or remote profile. Navigation, filters, search, modals and notebook controls are keyboard-operable. Reduced-motion preferences are respected. Ambient audio is opt-in and generated locally; it never starts automatically. The embedded Ferrari film is hosted by YouTube and remains user-initiated.
