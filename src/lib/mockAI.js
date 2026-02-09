/**
 * Mock AI layer: haiku and intervention recommendations.
 * Language is poetic, human, supportive — not clinical.
 */

const HAIKU_BY_BODY = {
  head: [
    'Thoughts like clouds that drift',
    'The mind can rest when it slows',
    'This moment is enough',
  ],
  shoulders: [
    'Weight you did not choose',
    'Shoulders can lay down their load',
    'You are allowed rest',
  ],
  chest: [
    'Heavy chest at dawn',
    'Breath like waves upon the shore',
    'You are not alone',
  ],
  'lower back': [
    'The body remembers',
    'Lower back holds what you carry',
    'Ground here, then release',
  ],
  hands: [
    'Hands that do so much',
    'Rest them now upon your heart',
    'Nothing more is asked',
  ],
  legs: [
    'Roots need not run deep',
    'Stand or sit — both are enough',
    'Your legs have brought you here',
  ],
};

const HAIKU_BY_TAROT = {
  waves: [
    'Nothing stays the same',
    'Flow like water, bend like reeds',
    'Change is not your foe',
  ],
  stones: [
    'Stack one stone at a time',
    'Balance comes from being here',
    'The ground holds you now',
  ],
  wind: [
    'The wind does not strive',
    'Breathe in, breathe out, that is all',
    'Let the air carry you',
  ],
};

const INTERVENTIONS = [
  {
    id: 'humming',
    title: 'humming reset',
    description: 'quick · inside · alone',
    cta: 'hum with me →',
    tags: ['quick', 'inside', 'alone'],
    icon: 'hum',
  },
  {
    id: 'walk',
    title: 'your designed reset walk',
    description: 'slow · outside · alone/together',
    cta: 'start my walk →',
    tags: ['slow', 'outside'],
    icon: 'walk',
  },
  {
    id: 'yoga',
    title: 'gentle yoga session',
    description: 'slow · inside · together',
    cta: 'start session →',
    tags: ['slow', 'inside', 'together'],
    icon: 'yoga',
  },
  {
    id: 'breath',
    title: 'three breaths',
    description: 'quick · inside · alone',
    cta: 'breathe with me →',
    tags: ['quick', 'inside', 'alone'],
    icon: 'breath',
  },
  {
    id: 'call',
    title: 'reach out to one person',
    description: 'quick · anywhere · together',
    cta: 'who might I call? →',
    tags: ['quick', 'together'],
    icon: 'call',
  },
  {
    id: 'stretch',
    title: 'shoulder and neck release',
    description: 'quick · inside · alone',
    cta: 'guide me →',
    tags: ['quick', 'inside', 'alone'],
    icon: 'stretch',
  },
];

/**
 * Returns a haiku array [line1, line2, line3] based on current input.
 */
export function getHaiku(inputSummary) {
  const { areas, tarot } = inputSummary;
  let pool = [];

  if (areas && areas.length > 0) {
    const chosen = areas[Math.floor(Math.random() * areas.length)];
    pool = HAIKU_BY_BODY[chosen] || HAIKU_BY_BODY.chest;
  } else if (tarot) {
    pool = HAIKU_BY_TAROT[tarot] || HAIKU_BY_TAROT.stones;
  } else {
    pool = HAIKU_BY_BODY.chest;
  }

  if (Array.isArray(pool[0])) {
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }
  return pool;
}

/**
 * Returns 2–3 intervention cards based on preferences and stress input.
 */
export function getRecommendations(inputSummary, count = 3) {
  const { preferences } = inputSummary;
  const wantAlone = preferences.social === 'alone';
  const wantInside = preferences.place === 'inside';
  const wantQuick = preferences.pace === 'quick';

  const scored = INTERVENTIONS.map((item) => {
    let score = 0;
    if (wantAlone && item.tags.includes('alone')) score += 2;
    if (!wantAlone && item.tags.includes('together')) score += 2;
    if (wantInside && item.tags.includes('inside')) score += 2;
    if (!wantInside && item.tags.includes('outside')) score += 2;
    if (wantQuick && item.tags.includes('quick')) score += 2;
    if (!wantQuick && item.tags.includes('slow')) score += 2;
    return { ...item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count);
}
