import * as THREE from 'three';
import type { StageBuilder } from './useThreeStage';

/**
 * Each factory returns a {@link StageBuilder}: a pure description of one room's
 * hero 3D object. They share a parchment/holographic vocabulary but are tuned
 * per era. All geometries, materials and lights are disposed on teardown.
 */

interface Disposable {
  dispose(): void;
}

function disposeAll(items: readonly Disposable[]): void {
  for (const item of items) {
    item.dispose();
  }
}

/** Room 0 — Il Portale: a luminous particle tunnel converging toward the motto. */
export function buildPortalScene(accent: string): StageBuilder {
  return ({ scene }) => {
    const color = new THREE.Color(accent);
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const radii = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const radius = 0.6 + Math.random() * 2.4;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3 + 0] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = -Math.random() * 14;
      radii[i] = radius;
      speeds[i] = 1.4 + Math.random() * 2.6;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color,
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const ringGeometry = new THREE.TorusGeometry(2.6, 0.012, 8, 120);
    const ringMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25 });
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i += 1) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.z = -i * 3;
      scene.add(ring);
      rings.push(ring);
    }

    const attr = geometry.getAttribute('position') as THREE.BufferAttribute;

    return {
      update: (elapsed, delta, pointer) => {
        for (let i = 0; i < count; i += 1) {
          let z = attr.getZ(i) + speeds[i] * delta;
          if (z > 2) {
            z = -14;
          }
          attr.setZ(i, z);
        }
        attr.needsUpdate = true;
        points.rotation.z = elapsed * 0.04;
        for (const ring of rings) {
          ring.position.z += delta * 2.2;
          if (ring.position.z > 2.5) {
            ring.position.z = -12;
          }
        }
        scene.rotation.x = pointer.y * 0.12;
        scene.rotation.y = pointer.x * 0.12;
      },
      dispose: () => disposeAll([geometry, material, ringGeometry, ringMaterial]),
    };
  };
}

/** Room 1 — a rotating Ballistae Imperialis rendered as a luminous blueprint. */
export function buildBallistaScene(accent: string): StageBuilder {
  return ({ scene }) => {
    const color = new THREE.Color(accent);
    const rig = new THREE.Group();
    scene.add(rig);

    const lineMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 });
    const solidMaterial = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.5,
      roughness: 0.4,
      emissive: color.clone().multiplyScalar(0.12),
    });

    const tracked: Disposable[] = [lineMaterial, solidMaterial];

    const addBeam = (w: number, h: number, d: number, x: number, y: number, z: number): void => {
      const geo = new THREE.BoxGeometry(w, h, d);
      tracked.push(geo);
      const mesh = new THREE.Mesh(geo, solidMaterial);
      mesh.position.set(x, y, z);
      rig.add(mesh);
      const edges = new THREE.EdgesGeometry(geo);
      tracked.push(edges);
      rig.add(new THREE.LineSegments(edges, lineMaterial));
    };

    // Base frame (Structura Lignea).
    addBeam(3.4, 0.16, 0.16, 0, -0.8, 0.5);
    addBeam(3.4, 0.16, 0.16, 0, -0.8, -0.5);
    addBeam(0.16, 0.16, 1.2, -1.5, -0.8, 0);
    addBeam(0.16, 0.16, 1.2, 1.5, -0.8, 0);
    // Vertical torsion posts.
    addBeam(0.18, 1.5, 0.18, -1.1, -0.1, 0);
    addBeam(0.18, 1.5, 0.18, 1.1, -0.1, 0);
    // Sliding channel (Canalis).
    addBeam(2.6, 0.1, 0.22, 0, 0.55, 0);

    // Torsion springs (Tormentum).
    const springGeo = new THREE.TorusGeometry(0.32, 0.09, 10, 28);
    tracked.push(springGeo);
    const springLeft = new THREE.Mesh(springGeo, solidMaterial);
    springLeft.position.set(-1.1, 0.4, 0);
    springLeft.rotation.y = Math.PI / 2;
    const springRight = springLeft.clone();
    springRight.position.x = 1.1;
    rig.add(springLeft, springRight);

    // Throwing arms (Bracchium).
    const armGeo = new THREE.CylinderGeometry(0.05, 0.08, 1.5, 12);
    tracked.push(armGeo);
    const armLeft = new THREE.Mesh(armGeo, solidMaterial);
    armLeft.position.set(-1.1, 0.9, 0);
    const armRight = armLeft.clone();
    armRight.position.x = 1.1;
    rig.add(armLeft, armRight);

    const key = new THREE.DirectionalLight(0xfff2d0, 1.5);
    key.position.set(3, 4, 5);
    const ambient = new THREE.AmbientLight(0x4a361c, 1.1);
    scene.add(key, ambient);

    let charge = 0;
    return {
      update: (elapsed, delta, pointer) => {
        rig.rotation.y = elapsed * 0.35 + pointer.x * 0.5;
        rig.rotation.x = -0.18 + pointer.y * 0.25;
        // Animate the throwing arms loading and releasing.
        charge = (charge + delta * 0.6) % 1;
        const draw = charge < 0.8 ? charge / 0.8 : 1 - (charge - 0.8) / 0.2;
        const swing = -0.5 - draw * 0.7;
        armLeft.rotation.z = swing;
        armRight.rotation.z = -swing;
      },
      dispose: () => disposeAll(tracked),
    };
  };
}

/** Room 2 — interlocking steam-era gears for the Officine Leonardo. */
export function buildOfficineScene(accent: string): StageBuilder {
  return ({ scene }) => {
    const color = new THREE.Color(accent);
    const tracked: Disposable[] = [];

    const makeGear = (radius: number, teeth: number, thickness: number): THREE.Mesh => {
      const shape = new THREE.Shape();
      const inner = radius * 0.62;
      const toothDepth = radius * 0.16;
      const step = (Math.PI * 2) / (teeth * 2);
      for (let i = 0; i <= teeth * 2; i += 1) {
        const r = i % 2 === 0 ? radius : radius - toothDepth;
        const a = i * step;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) {
          shape.moveTo(x, y);
        } else {
          shape.lineTo(x, y);
        }
      }
      const hole = new THREE.Path();
      hole.absarc(0, 0, inner * 0.4, 0, Math.PI * 2, true);
      shape.holes.push(hole);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 1,
        steps: 1,
      });
      geo.center();
      tracked.push(geo);
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.85,
        roughness: 0.35,
        emissive: color.clone().multiplyScalar(0.08),
      });
      tracked.push(mat);
      return new THREE.Mesh(geo, mat);
    };

    const gearA = makeGear(1.3, 18, 0.3);
    gearA.position.set(-0.9, 0.2, 0);
    const gearB = makeGear(0.95, 13, 0.3);
    gearB.position.set(1.0, -0.1, 0.1);
    const gearC = makeGear(0.6, 9, 0.3);
    gearC.position.set(0.35, 1.25, -0.2);
    scene.add(gearA, gearB, gearC);

    const key = new THREE.DirectionalLight(0xffd9a8, 1.6);
    key.position.set(-4, 3, 6);
    const rim = new THREE.DirectionalLight(0x6699ff, 0.5);
    rim.position.set(5, -2, -4);
    const ambient = new THREE.AmbientLight(0x3a2a1c, 1.2);
    scene.add(key, rim, ambient);

    return {
      update: (elapsed, _delta, pointer) => {
        gearA.rotation.z = elapsed * 0.6;
        gearB.rotation.z = -elapsed * 0.6 * (18 / 13);
        gearC.rotation.z = -elapsed * 0.6 * (18 / 9);
        scene.rotation.y = pointer.x * 0.3;
        scene.rotation.x = pointer.y * 0.2;
      },
      dispose: () => disposeAll(tracked),
    };
  };
}

/** Room 3 — a holographic Earth twin orbited by four guardian sub-nodes. */
export function buildGuardianScene(accent: string): StageBuilder {
  return ({ scene }) => {
    const color = new THREE.Color(accent);
    const tracked: Disposable[] = [];
    const core = new THREE.Group();
    scene.add(core);

    const sphereGeo = new THREE.IcosahedronGeometry(1.5, 3);
    tracked.push(sphereGeo);
    const wireMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.45 });
    tracked.push(wireMat);
    const globe = new THREE.Mesh(sphereGeo, wireMat);
    core.add(globe);

    const glowGeo = new THREE.IcosahedronGeometry(1.46, 2);
    tracked.push(glowGeo);
    const glowMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    tracked.push(glowMat);
    core.add(new THREE.Mesh(glowGeo, glowMat));

    // Orbital rings.
    const ringGeo = new THREE.TorusGeometry(2.3, 0.008, 8, 160);
    tracked.push(ringGeo);
    const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 });
    tracked.push(ringMat);
    const ringX = new THREE.Mesh(ringGeo, ringMat);
    ringX.rotation.x = Math.PI / 2;
    const ringY = new THREE.Mesh(ringGeo, ringMat);
    ringY.rotation.y = Math.PI / 3;
    scene.add(ringX, ringY);

    // Four orbiting guardian nodes.
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    tracked.push(nodeGeo);
    const nodeMat = new THREE.MeshBasicMaterial({ color });
    tracked.push(nodeMat);
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i += 1) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      scene.add(node);
      nodes.push(node);
    }

    const ambient = new THREE.AmbientLight(0x0a2240, 1.0);
    scene.add(ambient);

    return {
      update: (elapsed, _delta, pointer) => {
        globe.rotation.y = elapsed * 0.18;
        core.rotation.x = pointer.y * 0.3;
        core.rotation.y = pointer.x * 0.3;
        ringX.rotation.z = elapsed * 0.1;
        ringY.rotation.z = -elapsed * 0.12;
        nodes.forEach((node, i) => {
          const a = elapsed * 0.4 + (i * Math.PI) / 2;
          node.position.set(Math.cos(a) * 2.3, Math.sin(a * 1.3) * 0.6, Math.sin(a) * 2.3);
          const pulse = 1 + Math.sin(elapsed * 2 + i) * 0.25;
          node.scale.setScalar(pulse);
        });
      },
      dispose: () => disposeAll(tracked),
    };
  };
}
