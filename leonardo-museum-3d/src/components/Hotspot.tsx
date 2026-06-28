import type { Hotspot as HotspotData } from '../types';

interface HotspotProps {
  readonly hotspot: HotspotData;
  readonly active: boolean;
  readonly onActivate: (id: string) => void;
}

/**
 * A keyboard- and pointer-accessible hot-spot. Exposes explicit `idle`,
 * `hover`, `active` and `focus-visible` states (the a11y contract enforced by
 * the Verifier) via `data-state`, `aria-pressed` and native focus styling.
 */
export function Hotspot({ hotspot, active, onActivate }: HotspotProps) {
  return (
    <button
      type="button"
      className="hotspot"
      data-state={active ? 'active' : 'idle'}
      aria-pressed={active}
      aria-label={`${hotspot.name}. ${hotspot.description}`}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      onClick={() => onActivate(hotspot.id)}
      onMouseEnter={() => onActivate(hotspot.id)}
      onFocus={() => onActivate(hotspot.id)}
    >
      <span className="hotspot__pulse" aria-hidden="true" />
      <span className="hotspot__dot" aria-hidden="true" />
      <span className="hotspot__label">{hotspot.name}</span>
    </button>
  );
}
