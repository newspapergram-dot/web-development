import { useMemo } from 'react';
import { RoomChrome } from '../components/RoomChrome';
import { Stage3D } from '../components/Stage3D';
import { buildPortalScene } from '../three/scenes';
import type { Room } from '../types';

interface EntranceRoomProps {
  readonly room: Room;
}

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
        caption="Un tunnel luminoso di particelle che scorre verso il visitatore — il corridoio del tempo."
      />

      <div className="portal">
        <ul className="portal__languages" aria-label="La parola 'tecnologia' converge attraverso lingue e alfabeti">
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
          <span aria-hidden="true">&ldquo;</span>
          {feature.motto}
          <span aria-hidden="true">&rdquo;</span>
        </p>
        <p className="portal__lead">
          Due giovani professionisti entrano nel corridoio. L&apos;identità fondamentale di Leonardo
          perdura in ogni epoca: la capacità di <strong>innovare</strong> e <strong>creare valore</strong>.
        </p>
      </div>
    </RoomChrome>
  );
}
