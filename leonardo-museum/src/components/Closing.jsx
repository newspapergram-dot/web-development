import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import timelineData from '../assets/data/timelineData.json';

const { closing } = timelineData;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Closing() {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <section
      id="closing"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-400 rounded-full blur-[200px] opacity-5" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-amber-400 border border-amber-400/30 rounded-full">
            {closing.date}
          </span>
        </motion.div>

        <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 leading-relaxed mb-12">
          {closing.message}
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-xl shadow-lg shadow-amber-400/20"
              animate={{ boxShadow: ['0 0 20px rgba(201,168,76,0.2)', '0 0 40px rgba(201,168,76,0.4)', '0 0 20px rgba(201,168,76,0.2)'] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              M
            </motion.div>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-400/20"
              animate={{ boxShadow: ['0 0 20px rgba(59,130,246,0.2)', '0 0 40px rgba(59,130,246,0.4)', '0 0 20px rgba(59,130,246,0.2)'] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            >
              S
            </motion.div>
          </div>
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          className="text-2xl md:text-3xl font-bold text-amber-400 italic leading-snug mb-4"
        >
          &ldquo;{closing.cta}&rdquo;
        </motion.blockquote>

        <motion.p variants={fadeUp} className="text-slate-400 text-sm italic">
          {closing.ctaEnglish}
        </motion.p>
      </motion.div>
    </section>
  );
}
