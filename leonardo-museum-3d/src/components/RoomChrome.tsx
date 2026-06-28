import type { ReactNode } from 'react';
import type { Room } from '../types';

interface RoomChromeProps {
  readonly room: Room;
  readonly children: ReactNode;
}

/** Consistent header + narrative scaffold shared by every room. */
export function RoomChrome({ room, children }: RoomChromeProps) {
  return (
    <div className="room__inner">
      <header className="room__header">
        <p className="room__eyebrow">
          <span className="room__index">Room {room.index}</span>
          <span aria-hidden="true">·</span>
          <span>{room.year}</span>
          <span aria-hidden="true">·</span>
          <span>{room.era}</span>
        </p>
        <h2 className="room__title">{room.title}</h2>
        <p className="room__subtitle">{room.subtitle}</p>
        <p className="room__narrative">{room.narrative}</p>
      </header>
      {children}
    </div>
  );
}
