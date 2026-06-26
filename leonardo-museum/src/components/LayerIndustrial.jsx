import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import timelineData from '../assets/data/timelineData.json';

const industrial = timelineData.layers[2];
const { newspaper } = industrial;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

function NewspaperSection() {
  const [expandedArticle, setExpandedArticle] = useState(null);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-amber-50 text-stone-900 rounded-sm shadow-2xl overflow-hidden border border-stone-300">
        <div className="border-b-4 border-double border-stone-800 px-6 pt-6 pb-4 text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-500 mb-1">{newspaper.edition}</p>
          <h3 className="text-3xl md:text-4xl font-black tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            {newspaper.masthead}
          </h3>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-px flex-1 bg-stone-300" />
            <p className="text-xs text-stone-500 italic">{newspaper.date}</p>
            <div className="h-px flex-1 bg-stone-300" />
          </div>
        </div>

        <div className="px-6 py-4 border-b border-stone-200">
          <h4 className="text-lg md:text-xl font-bold text-center leading-snug" style={{ fontFamily: 'Georgia, serif' }}>
            {newspaper.headline}
          </h4>
        </div>

        <div className="grid md:grid-cols-2 gap-0 divide-x divide-stone-200">
          {newspaper.articles.map((article, i) => (
            <motion.article
              key={article.title}
              className="p-5 cursor-pointer hover:bg-amber-100/50 transition-colors border-b border-stone-200"
              onClick={() => setExpandedArticle(expandedArticle === i ? null : i)}
            >
              <h5 className="font-bold text-sm mb-2 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="text-2xl font-black text-stone-300 leading-none">{String.fromCharCode(167)}</span>
                {article.title}
              </h5>
              <AnimatePresence>
                {expandedArticle === i ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-stone-600 leading-relaxed overflow-hidden"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {article.content}
                  </motion.p>
                ) : (
                  <p className="text-xs text-stone-400 italic">Click to read...</p>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>

        <div className="px-6 py-3 bg-stone-100 text-center">
          <p className="text-[9px] tracking-[0.3em] uppercase text-stone-400">
            Officine Leonardo · Lungarno · Firenze · Anno MDCCCLXV
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LayerIndustrial() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      id="industrial-1865"
      className="relative min-h-screen py-24 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute" style={{
            left: `${15 + i * 15}%`, top: '50%', transform: 'translate(-50%, -50%)',
            width: '80px', height: '80px', border: '3px solid rgba(184,115,51,0.2)',
            borderRadius: '50%',
          }} />
        ))}
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="relative z-10 max-w-5xl mx-auto px-6"
      >
        <motion.div variants={fadeUp} className="text-center mb-4">
          <span className="inline-block px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-orange-400 border border-orange-800/40 rounded-full">
            {industrial.year} · {industrial.era}
          </span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-center text-orange-300 mb-3">
          {industrial.title}
        </motion.h2>

        <motion.p variants={fadeUp} className="text-center text-orange-500/80 tracking-[0.25em] uppercase text-sm mb-8">
          {industrial.subtitle}
        </motion.p>

        <motion.p variants={fadeUp} className="text-stone-300 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          {industrial.narrative}
        </motion.p>

        <motion.div variants={fadeUp}>
          <NewspaperSection />
        </motion.div>
      </motion.div>
    </section>
  );
}
