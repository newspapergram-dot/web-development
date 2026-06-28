import { useThreeStage, type StageBuilder, type StageOptions } from '../three/useThreeStage';

interface Stage3DProps {
  readonly builder: StageBuilder;
  /** Accessible description of the (decorative) 3D object for assistive tech. */
  readonly caption: string;
  readonly options?: StageOptions;
  readonly className?: string;
}

/**
 * Declarative wrapper around the imperative Three.js stage. The canvas itself is
 * `aria-hidden`; the surrounding figure exposes a text caption so the experience
 * remains meaningful without WebGL.
 */
export function Stage3D({ builder, caption, options, className }: Stage3DProps) {
  const mountRef = useThreeStage(builder, [builder], options);

  return (
    <figure className={className ? `stage3d ${className}` : 'stage3d'}>
      <div ref={mountRef} className="stage3d__canvas" role="presentation" />
      <figcaption className="stage3d__caption">{caption}</figcaption>
    </figure>
  );
}
