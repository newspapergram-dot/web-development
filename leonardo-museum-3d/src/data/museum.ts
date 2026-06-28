import type { Room, RoomTheme } from '../types';

/**
 * Canonical museum content, transcribed from the GP5 briefing (TASK 1 & TASK 2).
 * Kept as a typed constant so every room is driven by real data — never mocks.
 */

const THEMES: Record<Room['id'], RoomTheme> = {
  'entrance-2026': {
    key: 'present',
    accent: '#c9a84c',
    accentSoft: 'rgba(201, 168, 76, 0.16)',
    background: '#0b1220',
    fog: '#0b1220',
  },
  'rome-27bc': {
    key: 'rome',
    accent: '#d8a657',
    accentSoft: 'rgba(216, 166, 87, 0.18)',
    background: '#170d04',
    fog: '#1a0f05',
  },
  'industrial-1865': {
    key: 'industrial',
    accent: '#c0743a',
    accentSoft: 'rgba(192, 116, 58, 0.18)',
    background: '#16110d',
    fog: '#17120e',
  },
  'future-2055': {
    key: 'future',
    accent: '#46b1ff',
    accentSoft: 'rgba(70, 177, 255, 0.18)',
    background: '#020814',
    fog: '#03101f',
  },
};

export const MUSEUM_TITLE = 'Museum of Leonardo Evolution';
export const MUSEUM_ACRONYM = 'MoLE';
export const MUSEUM_MOTTO = 'Technology for a safer future';

export const ROOMS: readonly Room[] = [
  {
    id: 'entrance-2026',
    index: 0,
    era: 'The Present',
    year: '2026',
    title: 'Il Portale',
    subtitle: 'Two professionals enter the corridor of time',
    narrative:
      'Benvenuti in un viaggio immersivo nel cuore del DNA Leonardo. Two young professionals step into a luminous tunnel. Particles drift across the walls, slowly resolving into words in many languages and alphabets, converging on a single motto. The world changes — challenges, technologies and risks change — yet the objective endures: create value and protect the present to build a safer future.',
    theme: THEMES['entrance-2026'],
    feature: {
      kind: 'portal',
      motto: MUSEUM_MOTTO,
      languages: [
        'Technology',
        'Tecnologia',
        'Technologie',
        'Tecnología',
        'Τεχνολογία',
        'تقنية',
        '技術',
        'Технология',
        'Teknologi',
        'Ars',
      ],
    },
  },
  {
    id: 'rome-27bc',
    index: 1,
    era: 'Impero Romano',
    year: 'Augustan Age',
    title: 'Le Fondamenta · Leonardvs',
    subtitle: 'Ars ingenii ad securitatem futuri',
    narrative:
      'In Imperial Rome, the Collegium Fabrorum Leonardvs places the art of engineering at the service of the Pax Romana. Technique, organisation and strategy defend the borders of an expanding Empire. The Magister traces lines on parchment: the original project for the Ballistae Imperialis proves that, since the days of Augustus, the approach was rigorous and scientific — built to guarantee the security and stability of the Empire.',
    theme: THEMES['rome-27bc'],
    feature: {
      kind: 'blueprint',
      blueprint: {
        name: 'BALLISTAE IMPERIALIS',
        codex: 'Codex Fabrorum Leonardvs',
        specs: [
          {
            label: 'LATITUDO',
            value: 'V PEDES',
            detail: 'Width calibrated for optimal torsion distribution across the oak frame.',
          },
          {
            label: 'LONGITUDO',
            value: 'IX PEDES',
            detail: 'Length engineered for maximum projectile range at siege distances.',
          },
          {
            label: 'PONDUS',
            value: 'DC LIBRAE',
            detail: 'Weight balanced for field mobility while preserving structural rigidity.',
          },
          {
            label: 'TORMENTUM',
            value: 'NERVUS BOVIS',
            detail: 'Sinew torsion springs delivering consistent kinetic energy per release cycle.',
          },
        ],
        hotspots: [
          {
            id: 'structura',
            name: 'Structura Lignea',
            description: 'Oak-and-iron composite frame — the rigid foundation for torsion mechanics.',
            x: 24,
            y: 60,
          },
          {
            id: 'tormentum',
            name: 'Tormentum',
            description: 'Twisted sinew bundles store and release mechanical energy with calibrated force.',
            x: 44,
            y: 38,
          },
          {
            id: 'bracchium',
            name: 'Bracchium',
            description: 'Throwing arms of seasoned ash transfer rotational energy to the projectile.',
            x: 66,
            y: 30,
          },
          {
            id: 'canalis',
            name: 'Canalis',
            description: 'Precision-grooved track guiding the bolt for an accurate, repeatable trajectory.',
            x: 56,
            y: 64,
          },
          {
            id: 'sucula',
            name: 'Sucula',
            description: 'Ratcheted winch enabling controlled loading by a disciplined two-man crew.',
            x: 32,
            y: 78,
          },
        ],
      },
    },
  },
  {
    id: 'industrial-1865',
    index: 2,
    era: 'Rivoluzione Industriale',
    year: '1865',
    title: 'Officine Leonardo',
    subtitle: 'Ingegno · Lavoro · Futuro',
    narrative:
      'Florence, 1865. Exposed brick and the rhythmic beat of steam hammers. The Officine Leonardo mark a paradigm shift: artisan mastery gives way to standardisation and mechanical precision. A recruitment manifesto promises instruction and social welfare, seeding the modern idea of One Leonardo — science placed at the service of common protection, a vanguard technology for a safer future.',
    theme: THEMES['industrial-1865'],
    feature: {
      kind: 'archive',
      archive: {
        masthead: 'LA NAZIONE',
        edition: 'Edizione Straordinaria',
        date: 'Firenze · Lunedì 16 Ottobre 1865',
        headline: 'Le Officine Leonardo Inaugurano il Futuro Industriale della Nazione',
        articles: [
          {
            id: 'vapore',
            title: 'La Macchina a Vapore',
            content:
              'Imposing transmission shafts and leather belts, fed by three great boilers, drive lathes and steam hammers. Raw iron enters one door; standardised, interchangeable components emerge from another.',
          },
          {
            id: 'standard',
            title: 'Il Componente Standardizzato',
            content:
              'Every part is rigorously parcelled out by hydraulic lathes so precisely that one piece may be exchanged for another — the birth of Italian industrial standardisation.',
          },
          {
            id: 'distretto',
            title: 'Il Distretto Leonardo',
            content:
              'A village of well-ventilated brick cottages with running water rises beside the works. An evening school offers free instruction in reading, writing and the principles of mechanics.',
          },
          {
            id: 'commissione',
            title: 'I Committenti del Regno',
            content:
              'The patrons are no longer regional merchants but the Ministries of the Kingdom: systems to secure the merchant marine in the Mediterranean and signalling for the railways unifying the Nation.',
          },
        ],
      },
    },
  },
  {
    id: 'future-2055',
    index: 3,
    era: 'Il Futuro',
    year: '2055',
    title: 'EarthSphere Guardian Core',
    subtitle: 'Custodi del Pianeta',
    narrative:
      'The corridor darkens; a 360° holographic interface flickers to life. The EarthSphere Guardian Core renders a real-time digital twin of the Earth. It is the culmination of Leonardo’s evolution — from building physical machines to stewarding complex digital ecosystems — anticipating global crises and protecting the whole planet. The true challenge of 2055 is to guarantee the resilience of entire ecosystems.',
    theme: THEMES['future-2055'],
    feature: {
      kind: 'guardian',
      core: {
        designation: 'EARTHSPHERE · GUARDIAN CORE',
        nodes: [
          {
            id: 'planetary-intelligence',
            name: 'Planetary Intelligence',
            tagline: 'Real-time planetary awareness',
            description:
              'A mesh of orbital sensors, autonomous drones and predictive AI delivering continuous, real-time awareness. Every data point feeds the Guardian Core’s forecasting models.',
            items: ['Satellite Constellations', 'Autonomous Drone Swarms', 'Cyber Defence Grid', 'Predictive AI Engine'],
            angle: 0,
          },
          {
            id: 'planetary-resilience',
            name: 'Planetary Resilience',
            tagline: 'Resilience of entire ecosystems',
            description:
              'Adaptive, self-healing systems safeguard growing megalopolises and lunar settlements, engineering the infrastructure for new frontiers and a stable climate.',
            items: ['Lunar Community Infrastructure', 'Megalopolis Defence Systems', 'Climate Adaptation Networks', 'Resource Distribution AI'],
            angle: 90,
          },
          {
            id: 'one-leonardo',
            name: 'One Leonardo Network',
            tagline: 'One organisation, one digital model',
            description:
              'A single organisation operating as one digital model — distributed across continents, unified in purpose through a seamless digital fabric.',
            items: ['Distributed Global Network', 'Single Digital Model', 'Unified Command Architecture', 'Cross-Domain Integration'],
            angle: 180,
          },
          {
            id: 'custodi',
            name: 'Custodi del Pianeta',
            tagline: 'Planetary guardianship',
            description:
              'Quantum networks enable instantaneous coordination; an algorithmic ethics framework ensures every decision serves humanity. Predictive simulations model tomorrow before it arrives.',
            items: ['Predictive Simulation Engine', 'Quantum Communication Networks', 'Algorithmic Ethics Framework', 'Planetary Early Warning System'],
            angle: 270,
          },
        ],
      },
    },
  },
];

export const CLOSING_MESSAGE =
  'The corridor ends where it began — La Sala degli Specchi. The visitor fragments into mirrored data and reflections, confronted with a single question: who imagines the next builder? They carry twenty centuries of innovation, and the will to keep changing the world.';

export function getRoom(id: Room['id']): Room {
  const room = ROOMS.find((candidate) => candidate.id === id);
  if (!room) {
    throw new Error(`Unknown room: ${id}`);
  }
  return room;
}
