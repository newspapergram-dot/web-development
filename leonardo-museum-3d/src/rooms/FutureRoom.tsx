import { useMemo, useState } from 'react';
import { RoomChrome } from '../components/RoomChrome';
import { Stage3D } from '../components/Stage3D';
import { buildGuardianScene } from '../three/scenes';
import type { GuardianNode, Room } from '../types';

interface FutureRoomProps {
  readonly room: Room;
}

/**
 * Room 3 — EarthSphere Guardian Core (Future, 2055). An active holographic
 * interface wrapper with four interactive sub-nodes mapping the Guardian Core's
 * domains.
 */
export function FutureRoom({ room }: FutureRoomProps) {
  const builder = useMemo(() => buildGuardianScene(room.theme.accent), [room.theme.accent]);
  const feature = room.feature;
  const initialNode: GuardianNode | null = feature.kind === 'guardian' ? feature.core.nodes[0] ?? null : null;
  const [activeNodeId, setActiveNodeId] = useState<string | null>(initialNode?.id ?? null);

  if (feature.kind !== 'guardian') {
    return null;
  }

  const { core } = feature;
  const activeNode = core.nodes.find((node) => node.id === activeNodeId) ?? null;

  return (
    <RoomChrome room={room}>
      <div className="guardian">
        <div className="guardian__hologram">
          <Stage3D
            builder={builder}
            options={{ cameraZ: 6, fov: 55 }}
            caption="A holographic wireframe digital twin of Earth, orbited by four pulsing guardian nodes."
          />
          <p className="guardian__designation" aria-hidden="true">
            {core.designation}
          </p>
          <span className="guardian__status">
            <span className="guardian__status-dot" aria-hidden="true" /> SYSTEM ONLINE · REAL-TIME TWIN
          </span>
        </div>

        <div className="guardian__interface">
          <div className="nodes" role="tablist" aria-label="Guardian Core sub-systems">
            {core.nodes.map((node) => {
              const active = node.id === activeNodeId;
              return (
                <button
                  key={node.id}
                  type="button"
                  role="tab"
                  id={`tab-${node.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${node.id}`}
                  className="nodes__tab"
                  data-state={active ? 'active' : 'idle'}
                  onClick={() => setActiveNodeId(node.id)}
                >
                  <span className="nodes__tab-name">{node.name}</span>
                  <span className="nodes__tab-tag">{node.tagline}</span>
                </button>
              );
            })}
          </div>

          {activeNode && (
            <div
              className="node-detail"
              id={`panel-${activeNode.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeNode.id}`}
              aria-live="polite"
            >
              <h3 className="node-detail__name">{activeNode.name}</h3>
              <p className="node-detail__desc">{activeNode.description}</p>
              <ul className="node-detail__items">
                {activeNode.items.map((item) => (
                  <li key={item} className="node-detail__item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </RoomChrome>
  );
}
