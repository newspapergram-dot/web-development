import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function LayerPresent() {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <section
      id="present-2026"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-[128px]" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-400/20 to-transparent" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 border border-amber-400/30 rounded-full">
            18 Giugno 2026
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Il Museo{' '}
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
            Leonardo
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          Two young professionals step into the long corridor of the Leonardo Museum —
          a journey through millennia of innovation, creation, and the unrelenting will to build the future.
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-lg">M</div>
            <div className="text-left">
              <p className="text-white font-medium text-sm">Marco</p>
              <p className="text-slate-400 text-xs">Systems Engineer</p>
            </div>
          </div>
          <div className="w-px h-10 bg-slate-600" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">S</div>
            <div className="text-left">
              <p className="text-white font-medium text-sm">Sofia</p>
              <p className="text-slate-400 text-xs">Innovation Analyst</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
          <p className="text-amber-400/70 text-sm tracking-widest uppercase">Begin the Journey</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-amber-400/40 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-2.5 bg-amber-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
