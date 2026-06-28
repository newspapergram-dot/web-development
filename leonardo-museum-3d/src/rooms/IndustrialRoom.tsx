import { useMemo, useState } from 'react';
import { RoomChrome } from '../components/RoomChrome';
import { Stage3D } from '../components/Stage3D';
import { buildOfficineScene } from '../three/scenes';
import type { Room } from '../types';

interface IndustrialRoomProps {
  readonly room: Room;
}

/**
 * Room 2 — Officine Leonardo (Industrial Revolution, 1865). Heavy mechanical
 * aesthetic with a dynamic, interactive "La Nazione" archive.
 */
export function IndustrialRoom({ room }: IndustrialRoomProps) {
  const builder = useMemo(() => buildOfficineScene(room.theme.accent), [room.theme.accent]);
  const feature = room.feature;
  const firstArticleId = feature.kind === 'archive' ? feature.archive.articles[0]?.id ?? null : null;
  const [openArticle, setOpenArticle] = useState<string | null>(firstArticleId);

  if (feature.kind !== 'archive') {
    return null;
  }

  const { archive } = feature;

  return (
    <RoomChrome room={room}>
      <div className="officine">
        <Stage3D
          builder={builder}
          options={{ cameraZ: 6, fov: 55 }}
          caption="Three interlocking steam-era gears turning in mesh — Ingegno, Lavoro, Futuro."
          className="officine__stage"
        />

        <section className="gazette" aria-label="La Nazione archive">
          <header className="gazette__masthead">
            <p className="gazette__edition">{archive.edition}</p>
            <h3 className="gazette__title">{archive.masthead}</h3>
            <p className="gazette__date">{archive.date}</p>
          </header>
          <p className="gazette__headline">{archive.headline}</p>

          <ul className="archive">
            {archive.articles.map((article) => {
              const open = openArticle === article.id;
              return (
                <li key={article.id} className="archive__item">
                  <button
                    type="button"
                    className="archive__trigger"
                    data-state={open ? 'active' : 'idle'}
                    aria-expanded={open}
                    aria-controls={`article-${article.id}`}
                    onClick={() => setOpenArticle(open ? null : article.id)}
                  >
                    <span className="archive__trigger-title">{article.title}</span>
                    <span className="archive__trigger-icon" aria-hidden="true">
                      {open ? '–' : '+'}
                    </span>
                  </button>
                  <div
                    id={`article-${article.id}`}
                    className="archive__body"
                    data-open={open}
                    role="region"
                    aria-label={article.title}
                    hidden={!open}
                  >
                    <p>{article.content}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </RoomChrome>
  );
}
