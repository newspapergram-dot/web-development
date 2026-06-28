import type { Room, RoomTheme } from '../types';

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

export const MUSEUM_TITLE = 'Museo dell\'Evoluzione Leonardo';
export const MUSEUM_ACRONYM = 'MoLE';
export const MUSEUM_MOTTO = 'Tecnologia per un futuro più sicuro';

export const ROOMS: readonly Room[] = [
  {
    id: 'entrance-2026',
    index: 0,
    era: 'Il Presente',
    year: '2026',
    title: 'Il Portale',
    subtitle: 'Due professionisti entrano nel corridoio del tempo',
    narrative:
      'Benvenuti in un viaggio immersivo nel cuore del DNA Leonardo. Due giovani professionisti entrano in un tunnel luminoso. Le particelle scivolano lungo le pareti, trasformandosi lentamente in parole in molte lingue e alfabeti, convergendo in un unico motto. Il mondo cambia — le sfide, le tecnologie e i rischi cambiano — eppure l\'obiettivo perdura: creare valore e proteggere il presente per costruire un futuro più sicuro.',
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
    year: 'Età Augustea',
    title: 'Le Fondamenta · Leonardvs',
    subtitle: 'Ars ingenii ad securitatem futuri',
    narrative:
      'Nella Roma Imperiale, il Collegium Fabrorum Leonardvs mette l\'arte dell\'ingegneria al servizio della Pax Romana. Tecnica, organizzazione e strategia difendono i confini di un Impero in espansione. Il Magister traccia linee sulla pergamena: il progetto originale della Ballistae Imperialis dimostra che, fin dai tempi di Augusto, l\'approccio era rigoroso e scientifico — costruito per garantire la sicurezza e la stabilità dell\'Impero.',
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
            detail: 'Larghezza calibrata per una distribuzione ottimale della torsione lungo il telaio in quercia.',
          },
          {
            label: 'LONGITUDO',
            value: 'IX PEDES',
            detail: 'Lunghezza progettata per la massima gittata del proiettile a distanze d\'assedio.',
          },
          {
            label: 'PONDUS',
            value: 'DC LIBRAE',
            detail: 'Peso bilanciato per la mobilità in campo preservando la rigidità strutturale.',
          },
          {
            label: 'TORMENTUM',
            value: 'NERVUS BOVIS',
            detail: 'Molle di torsione in tendini che forniscono energia cinetica costante per ogni ciclo di rilascio.',
          },
        ],
        hotspots: [
          {
            id: 'structura',
            name: 'Structura Lignea',
            description: 'Telaio composito in quercia e ferro — la base rigida per la meccanica di torsione.',
            x: 24,
            y: 60,
          },
          {
            id: 'tormentum',
            name: 'Tormentum',
            description: 'Fasci di tendini intrecciati che immagazzinano e rilasciano energia meccanica con forza calibrata.',
            x: 44,
            y: 38,
          },
          {
            id: 'bracchium',
            name: 'Bracchium',
            description: 'Braccia di lancio in frassino stagionato che trasferiscono l\'energia rotazionale al proiettile.',
            x: 66,
            y: 30,
          },
          {
            id: 'canalis',
            name: 'Canalis',
            description: 'Binario di precisione scanalato che guida il dardo per una traiettoria precisa e ripetibile.',
            x: 56,
            y: 64,
          },
          {
            id: 'sucula',
            name: 'Sucula',
            description: 'Argano a cremagliera che consente il caricamento controllato da un equipaggio disciplinato di due uomini.',
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
      'Firenze, 1865. Mattoni a vista e il ritmo cadenzato dei martelli a vapore. Le Officine Leonardo segnano un cambio di paradigma: la maestria artigianale lascia il posto alla standardizzazione e alla precisione meccanica. Un manifesto di reclutamento promette istruzione e assistenza sociale, seminando l\'idea moderna di One Leonardo — la scienza al servizio della protezione comune, una tecnologia d\'avanguardia per un futuro più sicuro.',
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
              'Imponenti alberi di trasmissione e cinghie in cuoio, alimentati da tre grandi caldaie, azionano torni e martelli a vapore. Il ferro grezzo entra da una porta; componenti standardizzati e intercambiabili escono dall\'altra.',
          },
          {
            id: 'standard',
            title: 'Il Componente Standardizzato',
            content:
              'Ogni pezzo è rigorosamente lavorato da torni idraulici con tale precisione che un elemento può essere scambiato con un altro — la nascita della standardizzazione industriale italiana.',
          },
          {
            id: 'distretto',
            title: 'Il Distretto Leonardo',
            content:
              'Un villaggio di casette in mattoni ben ventilate con acqua corrente sorge accanto alle officine. Una scuola serale offre istruzione gratuita in lettura, scrittura e principi di meccanica.',
          },
          {
            id: 'commissione',
            title: 'I Committenti del Regno',
            content:
              'I committenti non sono più mercanti regionali ma i Ministeri del Regno: sistemi per mettere in sicurezza la marina mercantile nel Mediterraneo e segnalamento per le ferrovie che unificano la Nazione.',
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
      'Il corridoio si oscura; un\'interfaccia olografica a 360° prende vita. L\'EarthSphere Guardian Core genera un gemello digitale della Terra in tempo reale. È il culmine dell\'evoluzione di Leonardo — dalla costruzione di macchine fisiche alla custodia di ecosistemi digitali complessi — anticipando crisi globali e proteggendo l\'intero pianeta. La vera sfida del 2055 è garantire la resilienza di interi ecosistemi.',
    theme: THEMES['future-2055'],
    feature: {
      kind: 'guardian',
      core: {
        designation: 'EARTHSPHERE · GUARDIAN CORE',
        nodes: [
          {
            id: 'planetary-intelligence',
            name: 'Intelligenza Planetaria',
            tagline: 'Consapevolezza planetaria in tempo reale',
            description:
              'Una rete di sensori orbitali, droni autonomi e IA predittiva che fornisce una consapevolezza continua in tempo reale. Ogni dato alimenta i modelli previsionali del Guardian Core.',
            items: ['Costellazioni Satellitari', 'Sciami di Droni Autonomi', 'Griglia di Difesa Cyber', 'Motore IA Predittivo'],
            angle: 0,
          },
          {
            id: 'planetary-resilience',
            name: 'Resilienza Planetaria',
            tagline: 'Resilienza di interi ecosistemi',
            description:
              'Sistemi adattivi e auto-rigeneranti che salvaguardano le megalopoli in crescita e gli insediamenti lunari, progettando l\'infrastruttura per nuove frontiere e un clima stabile.',
            items: ['Infrastruttura Comunità Lunare', 'Sistemi di Difesa Megalopoli', 'Reti di Adattamento Climatico', 'IA Distribuzione Risorse'],
            angle: 90,
          },
          {
            id: 'one-leonardo',
            name: 'Rete One Leonardo',
            tagline: 'Un\'organizzazione, un modello digitale',
            description:
              'Un\'unica organizzazione che opera come un unico modello digitale — distribuita su più continenti, unificata nel proposito attraverso un tessuto digitale senza soluzione di continuità.',
            items: ['Rete Globale Distribuita', 'Modello Digitale Unico', 'Architettura di Comando Unificata', 'Integrazione Cross-Dominio'],
            angle: 180,
          },
          {
            id: 'custodi',
            name: 'Custodi del Pianeta',
            tagline: 'Custodia planetaria',
            description:
              'Le reti quantistiche consentono un coordinamento istantaneo; un quadro etico algoritmico assicura che ogni decisione sia al servizio dell\'umanità. Le simulazioni predittive modellano il domani prima che arrivi.',
            items: ['Motore di Simulazione Predittiva', 'Reti di Comunicazione Quantistica', 'Quadro Etico Algoritmico', 'Sistema di Allerta Precoce Planetaria'],
            angle: 270,
          },
        ],
      },
    },
  },
];

export const CLOSING_MESSAGE =
  'Il corridoio finisce dove è iniziato — La Sala degli Specchi. Il visitatore si frammenta in dati e riflessi speculari, confrontato da un\'unica domanda: chi immagina il prossimo costruttore? Portano con sé venti secoli di innovazione, e la volontà di continuare a cambiare il mondo.';

export function getRoom(id: Room['id']): Room {
  const room = ROOMS.find((candidate) => candidate.id === id);
  if (!room) {
    throw new Error(`Unknown room: ${id}`);
  }
  return room;
}
