import { MuseumProvider } from './context/MuseumContext';
import { useScrollSpy } from './hooks/useScrollSpy';
import Timeline from './components/Timeline';
import LayerPresent from './components/LayerPresent';
import LayerRoma from './components/LayerRoma';
import LayerIndustrial from './components/LayerIndustrial';
import LayerFuture from './components/LayerFuture';
import Closing from './components/Closing';
import Brochure from './components/Brochure';

const SECTION_IDS = ['present-2026', 'ancient-roma', 'industrial-1865', 'future-2055', 'closing'];

function MuseumJourney() {
  useScrollSpy(SECTION_IDS);

  return (
    <main className="bg-slate-900 text-white selection:bg-amber-400/30 selection:text-white">
      <Timeline />
      <LayerPresent />
      <LayerRoma />
      <LayerIndustrial />
      <LayerFuture />
      <Closing />
      <Brochure />
    </main>
  );
}

export default function App() {
  return (
    <MuseumProvider>
      <MuseumJourney />
    </MuseumProvider>
  );
}
