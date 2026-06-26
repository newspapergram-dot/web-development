import { useEffect } from 'react';
import { useMuseum } from '../context/MuseumContext';

export function useScrollSpy(sectionIds) {
  const { setActiveEra } = useMuseum();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const most = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActiveEra(most.target.id);
        }
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: '-10% 0px -10% 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, setActiveEra]);
}
