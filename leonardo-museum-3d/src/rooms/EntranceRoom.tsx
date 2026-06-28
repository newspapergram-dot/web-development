import { useMemo } from 'react';
import { RoomChrome } from '../components/RoomChrome';
import { Stage3D } from '../components/Stage3D';
import { buildPortalScene } from '../three/scenes';
import type { Room } from '../types';

interface EntranceRoomProps {
  readonly room: Room;
}

/**
 * Room 0 — Il Portale (Present, 2026). A luminous particle tunnel where words in
 * many languages converge on a single motto: "Technology for a safer future".
 */
export function EntranceRoom({ room }: EntranceRoomProps) {
  const builder = useMemo(() => buildPortalScene(room.theme.accent), [room.theme.accent]);
  const feature = room.feature;

  if (feature.kind !== 'portal') {
    return null;
  }

  return (
    <RoomChrome room={room}>
      <Stage3D
        builder={builder}
        options={{ cameraZ: 4, fov: 70 }}
        caption="A luminous particle tunnel streaming toward the visitor — the corridor of time."
      />

      <div className="portal">
        <ul className="portal__languages" aria-label="The word 'technology' converging across languages and alphabets">
          {feature.languages.map((word, index) => (
            <li
              key={word}
              className="portal__word"
              style={{ animationDelay: `${index * 0.18}s` }}
            >
              {word}
            </li>
          ))}
        </ul>
        <p className="portal__motto">
          <span aria-hidden="true">“</span>
          {feature.motto}
          <span aria-hidden="true">”</span>
        </p>
        <p className="portal__lead">
          Two young professionals enter the corridor. The core identity of Leonardo endures across
          every era: the capacity to <strong>innovate</strong> and <strong>create value</strong>.
        </p>
      </div>
    </RoomChrome>
  );
}
