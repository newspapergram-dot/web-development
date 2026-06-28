# MoLE — Museum of Leonardo Evolution (React + TypeScript + Three.js)

An elite, immersive, production-grade museum website that walks the visitor through
distinct, **click-accessible chronological rooms**, each with a real **Three.js** 3D
object and interactive, accessible UI.

> Content transcribed from the GP5 briefing (TASK 1 & TASK 2). A self-contained,
> build-free single-file edition lives at
> [`../claude-design/leonardo-museum-3d.html`](../claude-design/leonardo-museum-3d.html).

## Rooms

- **Room 0 — Il Portale (2026):** particle-tunnel portal; the motto *“Technology for a
  safer future”* converges across languages. Core identity: innovate & create value.
- **Room 1 — Le Fondamenta · Leonardvs (Imperial Rome):** an animated 3D **Ballistae
  Imperialis** blueprint with hot-spots/tooltips mapping its technical data
  (LATITUDO V PEDES, LONGITUDO IX PEDES, …).
- **Room 2 — Officine Leonardo (1865):** heavy mechanical aesthetic, interlocking steam
  gears, and a dynamic interactive **La Nazione** archive.
- **Room 3 — EarthSphere Guardian Core (2055):** an active holographic interface with
  four interactive sub-nodes — Planetary Intelligence, Planetary Resilience,
  One Leonardo Network, and Custodi del Pianeta.

## Architecture

```
src/
├── types.ts                 # Fully-typed domain model (no `any`, no mock objects)
├── data/museum.ts           # Canonical, typed museum content
├── three/
│   ├── useThreeStage.ts     # Reusable, typed Three.js render-loop hook (auto-disposing)
│   └── scenes.ts            # One disposable 3D scene builder per room
├── components/              # Stage3D, Hotspot, RoomChrome
├── rooms/                   # EntranceRoom, RomeRoom, IndustrialRoom, FutureRoom
└── App.tsx                  # Room router, navigation rail, transitions, theming
```

Each room is a modular component owning **independent room state** (selected hot-spot,
open archive dispatch, active guardian node) and exposing explicit interaction states
(`idle` / `hover` / `active` / `focus-visible`) with full keyboard and ARIA support.

### Agentic build process

- **Sub-Agent 1 — Architect/Builder:** generated the modular, fully-typed components and
  3D scenes.
- **Sub-Agent 2 — Verifier/Linter:** enforced `tsc --noEmit`, `eslint --max-warnings 0`,
  a production `vite build`, and a headless runtime smoke test — rejecting any component
  lacking accessibility states or containing unhandled mock objects.

## Commands

```bash
npm install
npm run dev         # start the dev server
npm run typecheck   # tsc --noEmit  → 0 errors
npm run lint        # eslint --max-warnings 0  → 0 warnings
npm run build       # tsc + vite build  → clean production bundle
```

Stack: React 18, TypeScript (strict), Vite 6, Three.js r171, Framer Motion.
