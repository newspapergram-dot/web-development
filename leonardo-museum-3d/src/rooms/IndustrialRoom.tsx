import { useMemo, useState } from 'react';
import { RoomChrome } from '../components/RoomChrome';
import { Stage3D } from '../components/Stage3D';
import { buildOfficineScene } from '../three/scenes';
import type { Room } from '../types';

interface IndustrialRoomProps {
  readonly room: Room;
}

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
      <div className="officine officine--centered">
        <Stage3D
          builder={builder}
          options={{ cameraZ: 6, fov: 55 }}
          caption="Tre ingranaggi a vapore interconnessi che ruotano in sincronia — Ingegno, Lavoro, Futuro."
          className="officine__bg-stage"
        />

        <section className="gazette gazette--central" aria-label="Archivio La Nazione">
          <div className="gazette__oggetto-label" aria-hidden="true">Oggetto della Memoria</div>
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
