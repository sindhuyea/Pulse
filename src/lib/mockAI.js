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
    tagLine: 'quick · inside · alone',
    body: "A calming practice that helps reduce anxiety quickly. Gently hum a single note for one full exhale and feel the vibration in your chest.",
    insight: "This has helped you before during mental overload on workdays",
    cta: 'hum with me →',
    actionLabel: 'hum with me',
    actionHref: null,
    tags: ['quick', 'inside', 'alone'],
    icon: 'hum',
  },
  {
    id: 'walk',
    title: 'your designed reset walk',
    tagLine: 'slow · outside · alone/together',
    body: "We've mapped a short walk near you meant for decompression — quiet streets, gentle pacing, and natural pauses.",
    insight: "Movement and fresh air tend to help more than solo techniques on busy days",
    cta: 'start my walk →',
    actionLabel: 'Open in Maps',
    actionHref: 'https://www.google.com/maps',
    tags: ['slow', 'outside'],
    icon: 'walk',
  },
  {
    id: 'yoga',
    title: 'gentle yoga session',
    tagLine: 'slow · inside · together',
    body: "Join a local or online yoga class focused on opening the chest and releasing tension. Moves are slow, supportive, and grounding.",
    insight: "Social connection tends to help more than solo techniques on workdays",
    cta: 'find session →',
    actionLabel: 'Find a session',
    actionHref: 'https://www.google.com/search?q=yoga+class+near+me',
    tags: ['slow', 'inside', 'together'],
    icon: 'yoga',
  },
  {
    id: 'breath',
    title: 'three breaths',
    tagLine: 'quick · inside · alone',
    body: "Breathe in for four, hold for four, breathe out for six. Three rounds to reset your nervous system and soften your chest.",
    insight: "Quick resets work well for you when time is limited",
    cta: 'breathe with me →',
    actionLabel: 'breathe with me',
    actionHref: null,
    tags: ['quick', 'inside', 'alone'],
    icon: 'breath',
  },
  {
    id: 'call',
    title: 'reach out to one person',
    tagLine: 'quick · anywhere · together',
    body: "Send a short message or call someone who grounds you. You don't need to explain — just connect.",
    insight: "Past sessions show connecting with friends reduces your stress",
    cta: 'who might I call? →',
    actionLabel: 'Open contacts',
    actionHref: null,
    tags: ['quick', 'together'],
    icon: 'call',
  },
  {
    id: 'stretch',
    title: 'shoulder and neck release',
    tagLine: 'quick · inside · alone',
    body: "Simple stretches to release tension in your shoulders and neck. Five minutes at your desk or on the floor.",
    insight: "Body-based practices fit your preference for quick, inside options",
    cta: 'guide me →',
    actionLabel: 'guide me',
    actionHref: null,
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

/** At most one recommendation from this set (breathwork / body work). */
const BREATHWORK_BODY_IDS = new Set(['humming', 'breath', 'stretch', 'yoga']);

/** Always include at least one non-traditional recommendation (connection, movement, creative). */
const NON_TRADITIONAL_IDS = new Set(['walk', 'call', 'humming']);

/** Boost intervention ids when user selected these body areas (so recommendations match body scan). */
const BODY_AREA_BOOST = {
  head: ['breath', 'humming'],
  shoulders: ['stretch', 'yoga'],
  chest: ['breath', 'humming'],
  'lower back': ['stretch', 'yoga', 'walk'],
  hands: ['humming', 'breath'],
  legs: ['walk'],
};

/** Boost intervention ids when user chose this tarot card (so recommendations match tarot pull). */
const TAROT_BOOST = {
  waves: ['breath', 'walk'],
  stones: ['stretch', 'yoga'],
  wind: ['breath', 'humming'],
};

/**
 * Returns 2–3 intervention cards based on preferences, body areas, and tarot.
 * Toggles (preferences) drive the main fit; body scan and tarot add relevance so the journey feels connected.
 * Caps breathwork/body work at 1; always includes at least one non-traditional recommendation.
 */
export function getRecommendations(inputSummary, count = 3) {
  const { preferences, areas, tarot } = inputSummary;
  const wantAlone = preferences.social < 50;
  const wantInside = preferences.place < 50;
  const wantQuick = preferences.pace < 50;

  const scored = INTERVENTIONS.map((item) => {
    let score = 0;
    if (wantAlone && item.tags.includes('alone')) score += 2;
    if (!wantAlone && item.tags.includes('together')) score += 2;
    if (wantInside && item.tags.includes('inside')) score += 2;
    if (!wantInside && item.tags.includes('outside')) score += 2;
    if (wantQuick && item.tags.includes('quick')) score += 2;
    if (!wantQuick && item.tags.includes('slow')) score += 2;
    if (areas && areas.length > 0) {
      for (const area of areas) {
        const ids = BODY_AREA_BOOST[area];
        if (ids && ids.includes(item.id)) score += 1;
      }
    }
    if (tarot && TAROT_BOOST[tarot] && TAROT_BOOST[tarot].includes(item.id)) score += 1;
    return { ...item, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const out = [];
  let breathworkBodyUsed = false;
  let hasNonTraditional = false;

  for (const item of scored) {
    if (out.length >= count) break;
    const isBreathworkBody = BREATHWORK_BODY_IDS.has(item.id);
    if (isBreathworkBody && breathworkBodyUsed) continue;
    const isNonTraditional = NON_TRADITIONAL_IDS.has(item.id);
    out.push(item);
    if (isBreathworkBody) breathworkBodyUsed = true;
    if (isNonTraditional) hasNonTraditional = true;
  }

  if (!hasNonTraditional && out.length > 0) {
    const inOut = new Set(out.map((r) => r.id));
    const nonTraditionalOnly = scored.filter(
      (item) => NON_TRADITIONAL_IDS.has(item.id) && !BREATHWORK_BODY_IDS.has(item.id) && !inOut.has(item.id)
    );
    const anyNonTraditional = scored.filter((item) => NON_TRADITIONAL_IDS.has(item.id) && !inOut.has(item.id));
    const toAdd = nonTraditionalOnly[0] || anyNonTraditional[0];
    if (toAdd) {
      out.pop();
      out.push(toAdd);
    }
  }

  return out.map((item) => ({
    ...item,
    insight: getContextAwareInsight(item, inputSummary),
  }));
}

/**
 * Returns a 2–3 line summary of what the user's choices suggest about their stress pattern.
 * Same tone: warm, human, non-clinical.
 */
export function getStressPatternSummary(inputSummary) {
  const { preferences, areas, tarot } = inputSummary;
  const wantAlone = preferences.social < 50;
  const wantInside = preferences.place < 50;
  const wantQuick = preferences.pace < 50;

  const social = wantAlone ? 'time alone' : 'connection with others';
  const place = wantInside ? 'somewhere indoors' : 'getting outside';
  const pace = wantQuick ? 'something quick' : 'a slower, gentler pace';

  let bodyLine = '';
  if (areas && areas.length > 0) {
    const list = areas.length === 1 ? areas[0] : areas.slice(0, -1).join(', ') + ' and ' + areas[areas.length - 1];
    bodyLine = ` You're holding tension in your ${list}, which often goes with mental or emotional load.`;
  }

  let tarotLine = '';
  if (tarot === 'waves') tarotLine = " Today's draw leans toward flow and change.";
  if (tarot === 'stones') tarotLine = " Today's draw leans toward grounding and steadiness.";
  if (tarot === 'wind') tarotLine = " Today's draw leans toward breath and release.";

  return `You're drawn to ${social}, ${place}, and ${pace}.${bodyLine}${tarotLine}`;
}

function getContextAwareInsight(item, inputSummary) {
  const { areas, tarot } = inputSummary;
  const base = item.insight;
  if (areas && areas.length > 0) {
    return `${base} Based on where you're holding tension today.`;
  }
  if (tarot) {
    return `${base} Reflecting today's draw.`; // template literal: apostrophe ok
  }
  return base;
}
