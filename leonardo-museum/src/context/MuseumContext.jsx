import { createContext, useContext, useState, useCallback } from 'react';

const MuseumContext = createContext(null);

const ERAS = ['present-2026', 'ancient-roma', 'industrial-1865', 'future-2055', 'closing'];

export function MuseumProvider({ children }) {
  const [activeEra, setActiveEra] = useState(ERAS[0]);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [activeNode, setActiveNode] = useState(null);

  const navigateToEra = useCallback((eraId) => {
    const el = document.getElementById(eraId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <MuseumContext.Provider value={{
      activeEra, setActiveEra,
      brochureOpen, setBrochureOpen,
      selectedObject, setSelectedObject,
      activeNode, setActiveNode,
      navigateToEra, eras: ERAS
    }}>
      {children}
    </MuseumContext.Provider>
  );
}

export function useMuseum() {
  const ctx = useContext(MuseumContext);
  if (!ctx) throw new Error('useMuseum must be used within MuseumProvider');
  return ctx;
}
