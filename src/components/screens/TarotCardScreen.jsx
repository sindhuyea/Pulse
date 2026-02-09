import React, { useState } from 'react'
import { TAROT_CARDS } from '../../state/inputState'
import '../styles/TarotCardScreen.css'

const FLIP_DURATION_MS = 950

export default function TarotCardScreen({ onSelectCard }) {
  const [flippedId, setFlippedId] = useState(null)

  function handleSelect(cardId) {
    if (flippedId) return
    setFlippedId(cardId)
    setTimeout(() => onSelectCard(cardId), FLIP_DURATION_MS)
  }

  return (
    <div className="screen tarot-screen">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">that's alright! pick a card below instead</p>
      </header>

      <div className="tarot-cards">
        {TAROT_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`tarot-card ${flippedId === card.id ? 'flipped' : ''}`}
            onClick={() => handleSelect(card.id)}
            aria-label={`Pick card: ${card.name}`}
            disabled={!!flippedId}
          >
            <div className="tarot-card-inner">
              <div className="tarot-card-face tarot-card-front">
                <span className={`tarot-icon tarot-icon-${card.id}`} aria-hidden>
                  {card.id === 'waves' && <WavesIcon />}
                  {card.id === 'stones' && <StonesIcon />}
                  {card.id === 'wind' && <WindIcon />}
                </span>
              </div>
              <div className="tarot-card-face tarot-card-back">
                <span className="tarot-card-label">{card.name}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function WavesIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 24c4-4 8-4 12 0s8 4 12 0 8-4 12 0" />
      <path d="M4 30c4-4 8-4 12 0s8 4 12 0 8-4 12 0" />
      <path d="M4 18c4-4 8-4 12 0s8 4 12 0 8-4 12 0" />
    </svg>
  )
}

function StonesIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <ellipse cx="24" cy="20" rx="8" ry="5" />
      <ellipse cx="24" cy="28" rx="10" ry="6" />
      <ellipse cx="24" cy="36" rx="6" ry="4" />
      <path d="M8 42h32" />
    </svg>
  )
}

function WindIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 20c2-2 6-2 10 2s6 8 12 8 8-2 10-4" />
      <path d="M8 28c4-2 8 0 12 4s8 6 14 6" />
      <path d="M12 36c6 0 10-2 14 2" />
    </svg>
  )
}
