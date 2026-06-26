import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import timelineData from '../assets/data/timelineData.json';

const future = timelineData.layers[3];
const { guardianCore } = future;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const ICONS = {
  satellite: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M13 7L9 3 5 7l4 4M7 13l-4 4 4 4 4-4M21 13l-4-4-4 4 4 4M11 21l4-4 4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
      <path d="M12 7v4M7.5 17.5L11 13M16.5 17.5L13 13" strokeLinecap="round" />
      <circle cx="12" cy="13" r="2" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  ),
};

function GuardianCore() {
  const [activeNode, setActiveNode] = useState(null);
  const nodes = guardianCore.nodes;

  const positions = [
    { x: '50%', y: '5%' },
    { x: '90%', y: '45%' },
    { x: '50%', y: '85%' },
    { x: '10%', y: '45%' },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-square max-h-[600px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-32 h-32 rounded-full border border-blue-500/30 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          <motion.div
            className="w-20 h-20 rounded-full border border-cyan-400/40 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white/80" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute w-64 h-64 rounded-full border border-blue-500/10"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 30, ease: 'linear' }, scale: { repeat: Infinity, duration: 4 } }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full border border-blue-400/5"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        />
      </div>

      {nodes.map((node, i) => {
        const pos = positions[i];
        const isActive = activeNode === node.id;
        return (
          <motion.button
            key={node.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: pos.x, top: pos.y }}
            onClick={() => setActiveNode(isActive ? null : node.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                isActive
                  ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/30'
                  : 'bg-slate-900/60 border-blue-500/20 hover:border-blue-400/50'
              }`}
              animate={isActive ? { boxShadow: ['0 0 20px rgba(59,130,246,0.3)', '0 0 40px rgba(59,130,246,0.5)', '0 0 20px rgba(59,130,246,0.3)'] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-blue-400'}`}>
                {ICONS[node.icon]}
              </div>
              <span className={`text-xs font-semibold text-center max-w-[120px] leading-tight ${isActive ? 'text-white' : 'text-blue-200'}`}>
                {node.name}
              </span>
            </motion.div>
          </motion.button>
        );
      })}

      <AnimatePresence>
        {activeNode && (() => {
          const node = nodes.find(n => n.id === activeNode);
          return (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 z-20"
            >
              <div className="bg-slate-900/95 border border-blue-500/30 rounded-xl p-5 backdrop-blur-md shadow-2xl">
                <h4 className="text-cyan-400 font-bold text-sm mb-2">{node.name}</h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-3">{node.description}</p>
                <ul className="space-y-1">
                  {node.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-blue-200/80">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

export default function LayerFuture() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="future-2055"
      className="relative min-h-screen py-24 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[160px] opacity-10" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-cyan-400 rounded-full blur-[120px] opacity-10" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="relative z-10 max-w-5xl mx-auto px-6"
      >
        <motion.div variants={fadeUp} className="text-center mb-4">
          <span className="inline-block px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-blue-400 border border-blue-500/30 rounded-full">
            {future.year} · {future.era}
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-center text-white mb-3">
          {future.title}
        </motion.h2>

        <motion.p variants={fadeUp} className="text-center text-blue-400 tracking-[0.25em] uppercase text-sm mb-8">
          {future.subtitle}
        </motion.p>

        <motion.p variants={fadeUp} className="text-slate-300 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          {future.narrative}
        </motion.p>

        <motion.div variants={fadeUp}>
          <GuardianCore />
        </motion.div>
      </motion.div>
    </section>
  );
}
