export type Vinyl = {
  id: string;
  title: string;
  artist: string;
  price: number;
  description: string;
  image: any; // Image source (local require or URL)
  tracks: string[];
  gender: 'feminino' | 'masculino';
  isCustom?: boolean;
};

export const vinyls: Vinyl[] = [
  {
    id: 'taylor-midnights',
    title: 'Midnights',
    artist: 'Taylor Swift',
    price: 200,
    description:
      'Midnights é o décimo álbum de estúdio de Taylor Swift, lançado em 2022. Uma coleção de reflexões noturnas com produção pop moderna e letras íntimas.',
    image: require('../assets/taylor.png'),
    gender: 'feminino',
    tracks: [
      'Lavender Haze',
      'Maroon',
      'Anti-Hero',
      'Snow on the Beach',
      'You’re on Your Own, Kid',
      'Midnight Rain',
      'Question...?'
    ],
  },
  {
    id: 'madonna-bedtime-stories',
    title: 'Bedtime Stories',
    artist: 'Madonna',
    price: 200,
    description:
      'Bedtime Stories é o sexto álbum de Madonna, lançado em 1994, explorando R&B e pop suave em uma vibe noturna e relaxante.',
    image: require('../assets/madonna.png'),
    gender: 'feminino',
    tracks: [
      'Secret',
      'Take a Bow',
      'Bedtime Story',
      'Human Nature',
      'Love Tried to Welcome Me',
      'Sanctuary',
      'Inside of Me'
    ],
  },
  {
    id: 'lily-west-end-girl',
    title: 'West End Girl',
    artist: 'Lily Allen',
    price: 200,
    description:
      'West End Girl é um single icônico de Lily Allen de 2006, com letras satíricas sobre a vida urbana em Londres.',
    image: require('../assets/lilly.png'),
    gender: 'feminino',
    tracks: ['West End Girl', 'Not Fair (B-side)', 'Littlest Things (Live)'],
  },
  {
    id: 'sabrina-mans-best-friend',
    title: "Mans Best Friend",
    artist: 'Sabrina Carpenter',
    price: 200,
    description:
      'Mans Best Friend é um single pop de Sabrina Carpenter com uma batida contagiante e letras sobre empoderamento pessoal.',
    image: require('../assets/sabrina.png'),
    gender: 'feminino',
    tracks: ['Mans Best Friend', 'Feather', 'Archer (Acoustic)'],
  },
];
