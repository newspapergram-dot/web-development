import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import timelineData from '../assets/data/timelineData.json';

const roma = timelineData.layers[1];
const { blueprint } = roma;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

function BallistaBlueprint() {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="border-2 border-amber-700/40 rounded-lg bg-amber-950/30 backdrop-blur-sm p-6 md:p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-amber-400 tracking-[0.15em]">{blueprint.name}</h3>
          <p className="text-amber-600/80 text-sm mt-1 italic">Codex Fabrorum Leonardvs</p>
        </div>

        <div className="relative aspect-[16/9] bg-amber-950/50 rounded border border-amber-800/30 mb-6 overflow-hidden">
          <svg viewBox="0 0 100 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="80" fill="url(#grid)" />

            <line x1="15" y1="45" x2="85" y2="45" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
            <line x1="20" y1="25" x2="20" y2="65" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
            <rect x="18" y="30" width="60" height="30" rx="2" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1" strokeDasharray="3,2" />
            <path d="M 35 30 L 35 20 L 65 20 L 65 30" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="0.8" />
            <circle cx="35" cy="25" r="4" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" />
            <circle cx="65" cy="25" r="4" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8" />
            <rect x="25" y="52" width="46" height="5" rx="1" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.6" />
            <circle cx="30" cy="60" r="3" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6" />
            <line x1="30" y1="57" x2="30" y2="63" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
          </svg>

          {blueprint.components.map((comp) => (
            <button
              key={comp.id}
              className="absolute group"
              style={{ left: `${comp.x}%`, top: `${comp.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setActiveComponent(activeComponent?.id === comp.id ? null : comp)}
              onMouseEnter={() => setActiveComponent(comp)}
              aria-label={comp.name}
            >
              <motion.div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  activeComponent?.id === comp.id
                    ? 'bg-amber-400 border-amber-300 shadow-lg shadow-amber-400/40'
                    : 'bg-amber-900/60 border-amber-600/60 hover:bg-amber-700/60 hover:border-amber-400'
                }`}
                animate={activeComponent?.id === comp.id ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </motion.div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeComponent && (
            <motion.div
              key={activeComponent.id}
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="bg-amber-900/30 border border-amber-700/30 rounded-lg p-4 mb-4"
            >
              <h4 className="text-amber-400 font-semibold text-lg">{activeComponent.name}</h4>
              <p className="text-amber-200/70 text-sm mt-1 leading-relaxed">{activeComponent.description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {blueprint.specs.map((spec) => (
            <div key={spec.label} className="group relative bg-amber-950/40 border border-amber-800/20 rounded p-3 text-center cursor-help">
              <p className="text-amber-600 text-[10px] tracking-[0.2em] uppercase">{spec.label}</p>
              <p className="text-amber-400 font-bold text-sm mt-0.5">{spec.value}</p>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-slate-200 text-xs rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10">
                {spec.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LayerRoma() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="ancient-roma"
      className="relative min-h-screen py-24 bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,168,76,0.15) 40px, rgba(201,168,76,0.15) 41px)',
        }} />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="relative z-10 max-w-5xl mx-auto px-6"
      >
        <motion.div variants={fadeUp} className="text-center mb-4">
          <span className="inline-block px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-amber-500 border border-amber-700/40 rounded-full">
            {roma.year} · {roma.era}
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-center text-amber-400 mb-3 tracking-wide">
          {roma.title}
        </motion.h2>

        <motion.p variants={fadeUp} className="text-center text-amber-600 italic mb-8 tracking-wider text-sm">
          {roma.subtitle}
        </motion.p>

        <motion.p variants={fadeUp} className="text-amber-200/70 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          {roma.narrative}
        </motion.p>

        <motion.div variants={fadeUp}>
          <BallistaBlueprint />
        </motion.div>
      </motion.div>
    </section>
  );
}
