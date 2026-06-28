import * as THREE from 'three';

interface TransitionContext {
  readonly canvas: HTMLCanvasElement;
  readonly fromColor: string;
  readonly toColor: string;
  readonly onComplete: () => void;
}

export function runCorridorTransition({ canvas, fromColor, toColor, onComplete }: TransitionContext): () => void {
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);

  const scene = new THREE.Scene();
  const from = new THREE.Color(fromColor);
  const to = new THREE.Color(toColor);
  scene.background = from.clone();
  scene.fog = new THREE.FogExp2(from.getHex(), 0.08);

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 200);
  camera.position.set(0, 1.6, 0);
  camera.lookAt(0, 1.6, -50);

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.9,
    metalness: 0.1,
    emissive: from,
    emissiveIntensity: 0.05,
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0f0f0f,
    roughness: 0.85,
    metalness: 0.2,
    emissive: from,
    emissiveIntensity: 0.03,
  });

  const ceilMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.95,
    metalness: 0.05,
  });

  const corridorLength = 100;
  const corridorWidth = 4;
  const corridorHeight = 4;

  const floorGeo = new THREE.PlaneGeometry(corridorWidth, corridorLength);
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -corridorLength / 2);
  scene.add(floor);

  const ceiling = new THREE.Mesh(floorGeo, ceilMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, corridorHeight, -corridorLength / 2);
  scene.add(ceiling);

  const wallGeo = new THREE.PlaneGeometry(corridorLength, corridorHeight);
  const leftWall = new THREE.Mesh(wallGeo, wallMat);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-corridorWidth / 2, corridorHeight / 2, -corridorLength / 2);
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(wallGeo, wallMat);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(corridorWidth / 2, corridorHeight / 2, -corridorLength / 2);
  scene.add(rightWall);

  const archGeo = new THREE.TorusGeometry(1.8, 0.06, 8, 32, Math.PI);
  const archMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    emissive: from,
    emissiveIntensity: 0.3,
    metalness: 0.6,
    roughness: 0.4,
  });

  for (let i = 0; i < 12; i++) {
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.set(0, corridorHeight / 2 + 0.2, -8 - i * 7);
    arch.rotation.z = Math.PI;
    scene.add(arch);
  }

  const lightStripGeo = new THREE.PlaneGeometry(0.04, corridorLength);
  const lightStripMat = new THREE.MeshBasicMaterial({
    color: from,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
  });
  const stripLeft = new THREE.Mesh(lightStripGeo, lightStripMat);
  stripLeft.rotation.x = -Math.PI / 2;
  stripLeft.position.set(-corridorWidth / 2 + 0.01, 0.01, -corridorLength / 2);
  const stripRight = stripLeft.clone();
  stripRight.position.x = corridorWidth / 2 - 0.01;
  scene.add(stripLeft, stripRight);

  const particleCount = 400;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * corridorWidth * 0.8;
    particlePositions[i * 3 + 1] = Math.random() * corridorHeight;
    particlePositions[i * 3 + 2] = -Math.random() * corridorLength;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: from,
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  const ambient = new THREE.AmbientLight(0x222222, 0.8);
  scene.add(ambient);

  for (let i = 0; i < 6; i++) {
    const light = new THREE.PointLight(from.getHex(), 1.5, 18);
    light.position.set(0, corridorHeight - 0.5, -10 - i * 14);
    scene.add(light);
  }

  const duration = 1.8;
  const startTime = performance.now();
  let raf = 0;
  let disposed = false;

  const animate = (): void => {
    if (disposed) return;

    const elapsed = (performance.now() - startTime) / 1000;
    const t = Math.min(elapsed / duration, 1);

    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    camera.position.z = -eased * (corridorLength - 5);

    const lerpedColor = from.clone().lerp(to, eased);
    scene.fog = new THREE.FogExp2(lerpedColor.getHex(), 0.06 + eased * 0.04);
    (scene.background as THREE.Color).copy(lerpedColor);

    lightStripMat.color.copy(lerpedColor);
    archMat.emissive.copy(lerpedColor);
    particleMat.color.copy(lerpedColor);
    wallMat.emissive.copy(lerpedColor);
    floorMat.emissive.copy(lerpedColor);

    const pAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < particleCount; i++) {
      let z = pAttr.getZ(i) + 0.3;
      if (z > camera.position.z + 5) {
        z = camera.position.z - corridorLength * 0.6;
      }
      pAttr.setZ(i, z);
    }
    pAttr.needsUpdate = true;

    const shake = Math.max(0, 1 - t) * 0.015;
    camera.position.x = Math.sin(elapsed * 12) * shake;
    camera.position.y = 1.6 + Math.sin(elapsed * 6) * shake * 0.5;

    renderer.render(scene, camera);

    if (t >= 1) {
      onComplete();
      return;
    }

    raf = requestAnimationFrame(animate);
  };

  raf = requestAnimationFrame(animate);

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    renderer.dispose();
    floorGeo.dispose();
    wallGeo.dispose();
    archGeo.dispose();
    lightStripGeo.dispose();
    particleGeo.dispose();
    wallMat.dispose();
    floorMat.dispose();
    ceilMat.dispose();
    archMat.dispose();
    lightStripMat.dispose();
    particleMat.dispose();
  };
}
