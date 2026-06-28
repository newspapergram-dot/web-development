import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EntranceRoom } from './rooms/EntranceRoom';
import { RomeRoom } from './rooms/RomeRoom';
import { IndustrialRoom } from './rooms/IndustrialRoom';
import { FutureRoom } from './rooms/FutureRoom';
import {
  CLOSING_MESSAGE,
  MUSEUM_ACRONYM,
  MUSEUM_MOTTO,
  MUSEUM_TITLE,
  ROOMS,
} from './data/museum';
import type { Room, RoomId } from './types';

function renderRoom(room: Room) {
  switch (room.id) {
    case 'entrance-2026':
      return <EntranceRoom room={room} />;
    case 'rome-27bc':
      return <RomeRoom room={room} />;
    case 'industrial-1865':
      return <IndustrialRoom room={room} />;
    case 'future-2055':
      return <FutureRoom room={room} />;
    default:
      return null;
  }
}

export default function App() {
  const [currentId, setCurrentId] = useState<RoomId>(ROOMS[0].id);

  const currentRoom = useMemo(
    () => ROOMS.find((room) => room.id === currentId) ?? ROOMS[0],
    [currentId],
  );

  const goToIndex = useCallback((index: number) => {
    const next = ROOMS[(index + ROOMS.length) % ROOMS.length];
    setCurrentId(next.id);
  }, []);

  const themeStyle = {
    '--accent': currentRoom.theme.accent,
    '--accent-soft': currentRoom.theme.accentSoft,
    '--bg': currentRoom.theme.background,
  } as React.CSSProperties;

  return (
    <div className="museum" data-theme={currentRoom.theme.key} style={themeStyle}>
      <a className="skip-link" href="#room-main">
        Skip to current room
      </a>

      <header className="masthead">
        <div className="masthead__brand">
          <span className="masthead__acronym">{MUSEUM_ACRONYM}</span>
          <span className="masthead__full">{MUSEUM_TITLE}</span>
        </div>
        <p className="masthead__motto">{MUSEUM_MOTTO}</p>
      </header>

      <nav className="rail" aria-label="Museum rooms">
        <ol className="rail__list">
          {ROOMS.map((room) => {
            const active = room.id === currentRoom.id;
            return (
              <li key={room.id}>
                <button
                  type="button"
                  className="rail__button"
                  data-state={active ? 'active' : 'idle'}
                  aria-current={active ? 'step' : undefined}
                  onClick={() => setCurrentId(room.id)}
                >
                  <span className="rail__index">{String(room.index).padStart(2, '0')}</span>
                  <span className="rail__meta">
                    <span className="rail__year">{room.year}</span>
                    <span className="rail__name">{room.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <main id="room-main" className="stage" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.section
            key={currentRoom.id}
            className="room"
            aria-label={`${currentRoom.title}, ${currentRoom.era}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {renderRoom(currentRoom)}
          </motion.section>
        </AnimatePresence>

        <div className="pager">
          <button
            type="button"
            className="pager__button"
            onClick={() => goToIndex(currentRoom.index - 1)}
            disabled={currentRoom.index === 0}
          >
            ← Previous room
          </button>
          <span className="pager__progress" aria-hidden="true">
            {currentRoom.index + 1} / {ROOMS.length}
          </span>
          <button
            type="button"
            className="pager__button"
            onClick={() => goToIndex(currentRoom.index + 1)}
            disabled={currentRoom.index === ROOMS.length - 1}
          >
            Next room →
          </button>
        </div>

        {currentRoom.index === ROOMS.length - 1 && (
          <footer className="closing">
            <p className="closing__label">Uscita · La Sala degli Specchi</p>
            <p className="closing__text">{CLOSING_MESSAGE}</p>
          </footer>
        )}
      </main>
    </div>
  );
}
