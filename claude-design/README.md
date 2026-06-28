# Claude Design — Leonardo Museum 3D

`leonardo-museum-3d.html` is a **single, fully self-contained** immersive 3D website
for the **Museum of Leonardo Evolution (MoLE)**. Drop it into Claude Design (or open it
directly in any browser) — it requires **no build step and no network access**.
Three.js r171 (MIT) is bundled inline.

## The journey (chronological, click-accessible rooms)

| # | Room | Era | Interactive feature |
|---|------|-----|---------------------|
| 0 | **Il Portale** | Present · 2026 | Luminous particle tunnel; the word for *technology* converges across languages onto the motto *“Technology for a safer future.”* |
| 1 | **Le Fondamenta · Leonardvs** | Imperial Rome | Rotating 3D **Ballistae Imperialis** with hot-spots mapping its technical data (LATITUDO V PEDES, LONGITUDO IX PEDES, …). |
| 2 | **Officine Leonardo** | Industrial · 1865 | Interlocking steam gears + a dynamic **La Nazione** archive (expandable dispatches). |
| 3 | **EarthSphere Guardian Core** | Future · 2055 | Holographic Earth digital-twin orbited by four sub-nodes: Planetary Intelligence, Planetary Resilience, One Leonardo Network, Custodi del Pianeta. |

## Highlights

- Real **WebGL / Three.js** objects in every room, with pointer-reactive parallax.
- Per-room theming, keyboard-accessible navigation, `aria-*` states on every control,
  and `prefers-reduced-motion` support.
- Verified to load and run **offline** (no external requests) with all interactions working.

The same experience is also implemented as a fully-typed React + TypeScript + Vite
application under [`../leonardo-museum-3d/`](../leonardo-museum-3d/).
