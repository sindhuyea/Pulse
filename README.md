# Pulse

A mobile-first, AI-powered stress companion that narrows overwhelming options into 2–3 small, practical interventions based on how you feel right now. Calm, human, poetic, and non-clinical.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown (e.g. `http://localhost:5173`).

## User journey

1. **Home** — “start check in” with soft breathing glow
2. **Body check** — Tap glowing orbs on the body outline to map stress, or “I don’t know”
3. **Tarot cards** (if “I don’t know”) — Pick one of three nature-themed cards
4. **Reflection** — AI-style haiku + preference toggles (alone/together, inside/outside, quick/slow) → “guide me”
5. **Recommendations** — 2–3 intervention cards; “more” returns home

## Tech

- **React 18** + **Vite**
- **State:** `src/state/inputState.js` (body areas, tarot choice, preferences)
- **Mock AI:** `src/lib/mockAI.js` (haiku + recommendations by input)
- **Animations:** CSS (`animations.css`) — pulse, breathe, fade-in, card lift
- Styling uses your design tokens (Cormorant Garamond, Manrope, `--bg-color`, etc.)

## Structure

- `src/components/screens/` — Home, BodyCheck, TarotCard, Reflection, Recommendation
- `src/components/` — BodyOutline (orbs), PreferenceToggles, RecommendationCard
- `src/lib/` — mockAI, animations.css

Replace mock AI with real APIs by keeping the same `getHaiku(inputSummary)` and `getRecommendations(inputSummary, count)` interfaces.
