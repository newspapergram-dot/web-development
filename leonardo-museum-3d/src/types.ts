/**
 * Shared, fully-typed domain model for the Museum of Leonardo Evolution (MoLE).
 * Every room consumes a strongly-typed slice of this model — no `any`, no mock objects.
 */

export type RoomId =
  | 'entrance-2026'
  | 'rome-27bc'
  | 'industrial-1865'
  | 'future-2055';

export type ThemeKey = 'present' | 'rome' | 'industrial' | 'future';

/** Visual identity for a room, mapped to CSS custom properties at runtime. */
export interface RoomTheme {
  readonly key: ThemeKey;
  readonly accent: string;
  readonly accentSoft: string;
  readonly background: string;
  readonly fog: string;
}

/** A single technical specification displayed on a blueprint or data panel. */
export interface SpecEntry {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
}

/** An interactive hot-spot anchored to a 2D position over a 3D stage. */
export interface Hotspot {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  /** Horizontal anchor as a percentage of the stage width (0–100). */
  readonly x: number;
  /** Vertical anchor as a percentage of the stage height (0–100). */
  readonly y: number;
}

/** Room 1 — the Ballistae Imperialis blueprint and its torsion-engine hot-spots. */
export interface Blueprint {
  readonly name: string;
  readonly codex: string;
  readonly specs: readonly SpecEntry[];
  readonly hotspots: readonly Hotspot[];
}

/** A single dispatch in the dynamic "La Nazione" archive of Room 2. */
export interface ArchiveArticle {
  readonly id: string;
  readonly title: string;
  readonly content: string;
}

/** Room 2 — the "La Nazione" extraordinary edition archive. */
export interface NewspaperArchive {
  readonly masthead: string;
  readonly edition: string;
  readonly date: string;
  readonly headline: string;
  readonly articles: readonly ArchiveArticle[];
}

/** A sub-node orbiting the EarthSphere Guardian Core in Room 3. */
export interface GuardianNode {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly items: readonly string[];
  /** Orbital angle in degrees used to place the node around the holographic core. */
  readonly angle: number;
}

/** Room 3 — the EarthSphere Guardian Core holographic command centre. */
export interface GuardianCore {
  readonly designation: string;
  readonly nodes: readonly GuardianNode[];
}

/** Discriminated payload so each room renders the correct interactive feature. */
export type RoomFeature =
  | { readonly kind: 'portal'; readonly motto: string; readonly languages: readonly string[] }
  | { readonly kind: 'blueprint'; readonly blueprint: Blueprint }
  | { readonly kind: 'archive'; readonly archive: NewspaperArchive }
  | { readonly kind: 'guardian'; readonly core: GuardianCore };

/** A complete, self-contained museum room. */
export interface Room {
  readonly id: RoomId;
  readonly index: number;
  readonly era: string;
  readonly year: string;
  readonly title: string;
  readonly subtitle: string;
  readonly narrative: string;
  readonly theme: RoomTheme;
  readonly feature: RoomFeature;
}

/** Interaction states every interactive control must expose (a11y contract). */
export type InteractionState = 'idle' | 'hover' | 'active' | 'focus-visible';
