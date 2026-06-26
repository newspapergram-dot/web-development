import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMuseum } from '../context/MuseumContext';
import memoryObjects from '../assets/data/memoryObjects.json';

const eraStyles = {
  'ancient-roma': {
    badge: 'bg-amber-900/80 text-amber-400 border-amber-700/50',
    card: 'border-amber-700/30 hover:border-amber-500/50',
    accent: 'text-amber-400',
    bg: 'bg-amber-950/40',
  },
  'industrial-revolution': {
    badge: 'bg-stone-800/80 text-orange-400 border-orange-700/50',
    card: 'border-orange-700/30 hover:border-orange-500/50',
    accent: 'text-orange-400',
    bg: 'bg-stone-900/40',
  },
  'future-2055': {
    badge: 'bg-blue-950/80 text-blue-400 border-blue-500/50',
    card: 'border-blue-500/30 hover:border-blue-400/50',
    accent: 'text-blue-400',
    bg: 'bg-blue-950/40',
  },
};

function ObjectCard({ object, era }) {
  const [flipped, setFlipped] = useState(false);
  const style = eraStyles[era.id];

  return (
    <div className="perspective-1000 w-full" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`w-full rounded-xl border ${style.card} backdrop-blur-sm p-6 ${style.bg}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${style.bg} border ${style.card} flex items-center justify-center ${style.accent}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-slate-500 text-xs italic">Click to reveal</span>
          </div>
          <h4 className={`${style.accent} font-bold text-lg mb-1`}>{object.title}</h4>
          <p className="text-slate-400 text-sm italic mb-3">{object.subtitle}</p>
          <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{object.description}</p>
        </div>

        <div
          className={`absolute inset-0 w-full rounded-xl border ${style.card} backdrop-blur-sm p-6 ${style.bg}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className={`${style.accent} font-bold text-lg mb-4`}>{object.title}</h4>
          <div className="space-y-3">
            {Object.entries(object.details).map(([key, value]) => (
              <div key={key}>
                <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase">{key}</p>
                <p className="text-slate-200 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs mt-4 italic">Click to return</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Brochure() {
  const { brochureOpen, setBrochureOpen } = useMuseum();

  return (
    <>
      <button
        onClick={() => setBrochureOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-4 py-3 rounded-full shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 flex items-center gap-2 font-semibold text-sm group"
        aria-label="Open Brochure"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 group-hover:rotate-12 transition-transform">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5V5a2 2 0 0 1 2-2h14v14H6.5A2.5 2.5 0 0 0 4 19.5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden md:inline">Oggetti della Memoria</span>
      </button>

      <AnimatePresence>
        {brochureOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setBrochureOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-slate-900/95 backdrop-blur-md border-l border-slate-700/50 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-white">Oggetti della Memoria</h2>
                    <p className="text-slate-400 text-sm mt-1">Memory artifacts across the ages</p>
                  </div>
                  <button
                    onClick={() => setBrochureOpen(false)}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {memoryObjects.eras.map((era) => (
                  <div key={era.id} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded-full border ${eraStyles[era.id].badge}`}>
                        {era.year}
                      </span>
                      <h3 className={`font-semibold text-sm ${eraStyles[era.id].accent}`}>{era.name}</h3>
                      <span className="text-slate-600 text-xs">— {era.period}</span>
                    </div>
                    <div className="space-y-4">
                      {era.objects.map(obj => (
                        <ObjectCard key={obj.id} object={obj} era={era} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
