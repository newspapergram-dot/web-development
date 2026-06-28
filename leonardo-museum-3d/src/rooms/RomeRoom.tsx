import { useMemo, useState } from 'react';
import { RoomChrome } from '../components/RoomChrome';
import { Stage3D } from '../components/Stage3D';
import { Hotspot } from '../components/Hotspot';
import { buildBallistaScene } from '../three/scenes';
import type { Room } from '../types';

interface RomeRoomProps {
  readonly room: Room;
}

export function RomeRoom({ room }: RomeRoomProps) {
  const builder = useMemo(() => buildBallistaScene(room.theme.accent), [room.theme.accent]);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const feature = room.feature;

  if (feature.kind !== 'blueprint') {
    return null;
  }

  const { blueprint } = feature;
  const selected = blueprint.hotspots.find((h) => h.id === activeHotspot) ?? null;

  return (
    <RoomChrome room={room}>
      <div className="blueprint">
        <div className="blueprint__stage">
          <Stage3D
            builder={builder}
            options={{ cameraZ: 6.5, fov: 50 }}
            caption="Una ricostruzione rotante della Ballistae Imperialis, con le braccia di torsione che caricano e rilasciano."
          />
          <div className="blueprint__hotspots" role="group" aria-label="Componenti della Ballistae Imperialis">
            {blueprint.hotspots.map((hotspot) => (
              <Hotspot
                key={hotspot.id}
                hotspot={hotspot}
                active={activeHotspot === hotspot.id}
                onActivate={setActiveHotspot}
              />
            ))}
          </div>
        </div>

        <div className="blueprint__panel">
          <p className="blueprint__codex">{blueprint.codex}</p>
          <h3 className="blueprint__name">{blueprint.name}</h3>

          <div className="blueprint__readout" aria-live="polite">
            {selected ? (
              <>
                <p className="blueprint__readout-title">{selected.name}</p>
                <p className="blueprint__readout-text">{selected.description}</p>
              </>
            ) : (
              <p className="blueprint__readout-text blueprint__readout-text--muted">
                Passa il mouse o seleziona un punto interattivo per ispezionare ogni componente del motore di torsione.
              </p>
            )}
          </div>

          <dl className="specs">
            {blueprint.specs.map((spec) => (
              <div key={spec.label} className="specs__item">
                <dt className="specs__label">{spec.label}</dt>
                <dd className="specs__value" title={spec.detail}>
                  {spec.value}
                </dd>
                <p className="specs__detail">{spec.detail}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </RoomChrome>
  );
}
