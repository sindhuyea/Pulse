/**
 * Central input state for the Pulse check-in flow.
 * Tracks body stress areas, tarot choice, and preferences for mock AI.
 */

export const BODY_AREAS = [
  'head',
  'shoulders',
  'chest',
  'lower back',
  'hands',
  'legs',
];

export const TAROT_CARDS = [
  { id: 'waves', name: 'waves', theme: 'flow' },
  { id: 'stones', name: 'stones', theme: 'grounding' },
  { id: 'wind', name: 'wind', theme: 'breath' },
];

export const PREFERENCE_KEYS = ['social', 'place', 'pace'];
export const PREFERENCE_OPTIONS = {
  social: { left: 'alone', right: 'together' },
  place: { left: 'inside', right: 'outside' },
  pace: { left: 'quick', right: 'slow' },
};

export function createInitialState() {
  return {
    screen: 'home',
    userName: '',
    bodyStressAreas: [],
    usedTarot: false,
    tarotChoice: null,
    preferences: {
      social: 'alone',
      place: 'inside',
      pace: 'quick',
    },
  };
}

export function toggleBodyArea(state, area) {
  const set = new Set(state.bodyStressAreas);
  if (set.has(area)) set.delete(area);
  else set.add(area);
  return { ...state, bodyStressAreas: [...set] };
}

export function setTarotChoice(state, cardId) {
  return {
    ...state,
    usedTarot: true,
    tarotChoice: cardId,
  };
}

export function setPreference(state, key, value) {
  return {
    ...state,
    preferences: { ...state.preferences, [key]: value },
  };
}

export function getStressInputSummary(state) {
  const areas = state.bodyStressAreas.length ? state.bodyStressAreas : null;
  const tarot = state.usedTarot ? state.tarotChoice : null;
  return { areas, tarot, preferences: state.preferences };
}
