import { motion } from 'framer-motion';
import { useMuseum } from '../context/MuseumContext';
import timelineData from '../assets/data/timelineData.json';

const dots = [
  { id: 'present-2026', label: '2026', color: 'bg-amber-400' },
  { id: 'ancient-roma', label: 'Roma', color: 'bg-amber-600' },
  { id: 'industrial-1865', label: '1865', color: 'bg-orange-700' },
  { id: 'future-2055', label: '2055', color: 'bg-blue-500' },
  { id: 'closing', label: 'Fine', color: 'bg-amber-400' },
];

export default function Timeline() {
  const { activeEra, navigateToEra } = useMuseum();

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-amber-400/30 to-transparent left-1/2 -translate-x-1/2" />
      {dots.map((dot) => {
        const isActive = activeEra === dot.id;
        return (
          <button
            key={dot.id}
            onClick={() => navigateToEra(dot.id)}
            className="relative group flex items-center"
            aria-label={`Navigate to ${dot.label}`}
          >
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? `${dot.color} border-white scale-125 shadow-lg shadow-amber-400/30`
                  : 'bg-slate-700 border-slate-500 hover:border-amber-400/60'
              }`}
              animate={isActive ? { scale: [1, 1.3, 1.15] } : {}}
              transition={{ duration: 0.5 }}
            />
            <span className={`absolute right-6 text-xs font-medium whitespace-nowrap px-2 py-1 rounded transition-all duration-200 ${
              isActive
                ? 'opacity-100 bg-slate-800/90 text-amber-400 translate-x-0'
                : 'opacity-0 group-hover:opacity-100 bg-slate-800/70 text-slate-300 translate-x-2 group-hover:translate-x-0'
            }`}>
              {dot.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
