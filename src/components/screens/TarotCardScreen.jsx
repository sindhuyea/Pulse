import React, { useState } from 'react'
import { TAROT_CARDS } from '../../state/inputState'
import tarotWavesImg from '../../assets/tarot/tarot-waves.png'
import tarotStonesImg from '../../assets/tarot/tarot-stones.png'
import tarotWindImg from '../../assets/tarot/tarot-wind.png'
import '../styles/TarotCardScreen.css'

const TAROT_IMAGES = {
  waves: tarotWavesImg,
  stones: tarotStonesImg,
  wind: tarotWindImg,
}

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
            className={`tarot-card tarot-card-outline ${flippedId === card.id ? 'flipped' : ''}`}
            onClick={() => handleSelect(card.id)}
            aria-label={`Pick card: ${card.name}`}
            disabled={!!flippedId}
          >
            <div className="tarot-card-inner">
              <div className="tarot-card-face tarot-card-front">
                <span className={`tarot-icon tarot-icon-${card.id}`} aria-hidden>
                  <img
                    src={TAROT_IMAGES[card.id]}
                    alt=""
                    className="tarot-card-image"
                  />
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
