import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface StageContext {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;
  readonly size: { width: number; height: number };
}

export interface StageController {
  /** Called once per animation frame. `elapsed` and `delta` are in seconds. */
  readonly update?: (elapsed: number, delta: number, pointer: THREE.Vector2) => void;
  /** Release any GPU resources the builder allocated. */
  readonly dispose?: () => void;
}

export type StageBuilder = (ctx: StageContext) => StageController;

export interface StageOptions {
  /** Vertical camera field-of-view in degrees. */
  readonly fov?: number;
  /** Initial camera position. */
  readonly cameraZ?: number;
  /** Honour `prefers-reduced-motion` by freezing the animation loop. */
  readonly respectReducedMotion?: boolean;
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Mounts a self-contained, fully-typed Three.js stage into a `<div>` and drives
 * its render loop. The builder is re-run whenever `deps` change; all resources
 * are disposed on teardown so rooms can mount and unmount cleanly.
 */
export function useThreeStage(
  builder: StageBuilder,
  deps: readonly unknown[],
  options: StageOptions = {},
): React.RefObject<HTMLDivElement> {
  const mountRef = useRef<HTMLDivElement>(null);
  const builderRef = useRef<StageBuilder>(builder);
  builderRef.current = builder;

  const { fov = 55, cameraZ = 6, respectReducedMotion = true } = options;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const width = mount.clientWidth || 1;
    const height = mount.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.set(0, 0, cameraZ);

    const ctx: StageContext = { scene, camera, renderer, size: { width, height } };
    const controller = builderRef.current(ctx);

    const clock = new THREE.Clock();
    const pointer = new THREE.Vector2(0, 0);
    const frozen = respectReducedMotion && prefersReducedMotion();

    const handlePointer = (event: PointerEvent): void => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('pointermove', handlePointer, { passive: true });

    let raf = 0;
    const renderFrame = (): void => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      controller.update?.(elapsed, delta, pointer);
      renderer.render(scene, camera);
      if (!frozen) {
        raf = window.requestAnimationFrame(renderFrame);
      }
    };
    renderFrame();

    const handleResize = (): void => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      ctx.size.width = w;
      ctx.size.height = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (frozen) {
        renderer.render(scene, camera);
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(mount);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', handlePointer);
      observer.disconnect();
      controller.dispose?.();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return mountRef;
}
