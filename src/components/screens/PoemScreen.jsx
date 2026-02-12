import React, { useState, useEffect } from 'react'
import { getHaiku } from '../../lib/mockAI'
import '../styles/PoemScreen.css'

const INTRO_FADE_IN_MS = 800
const INTRO_HOLD_MS = 1400
const INTRO_FADE_OUT_MS = 600
const INTRO_TOTAL_MS = INTRO_FADE_IN_MS + INTRO_HOLD_MS + INTRO_FADE_OUT_MS

export default function PoemScreen({ inputSummary, onContinue }) {
  const [phase, setPhase] = useState('intro') // 'intro' | 'content'
  const [haiku] = useState(() => getHaiku(inputSummary))
  const [lineVisible, setLineVisible] = useState(0)
  const [showContinue, setShowContinue] = useState(false)

  // When intro "thank you for sharing" fade-out ends, show content
  useEffect(() => {
    if (phase !== 'intro') return
    const t = setTimeout(() => setPhase('content'), INTRO_TOTAL_MS)
    return () => clearTimeout(t)
  }, [phase])

  // Content phase: haiku line-by-line reveal, then continue button
  useEffect(() => {
    if (phase !== 'content') return
    setLineVisible(0)
    setShowContinue(false)
    const t1 = setTimeout(() => setLineVisible(1), 500)
    const t2 = setTimeout(() => setLineVisible(2), 1200)
    const t3 = setTimeout(() => setLineVisible(3), 1900)
    const tContinue = setTimeout(() => setShowContinue(true), 1900 + 3500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(tContinue)
    }
  }, [phase])

  return (
    <div className="screen poem-screen">
      {phase === 'intro' && (
        <p
          className="poem-intro-phrase"
          style={{
            animation: `poem-intro-fade-in-out ${INTRO_TOTAL_MS}ms ease-in-out forwards`,
          }}
        >
          thank you for sharing
        </p>
      )}

      {phase === 'content' && (
        <div className="poem-screen-inner poem-content-enter">
          <header className="poem-content-header">
            <h1 className="poem-content-title">Pulse</h1>
            <p className="poem-content-subtitle">some words while you wait</p>
          </header>
          <div className="haiku-block poem-only">
            <div className="haiku-bubble">
              {haiku.map((line, i) => (
                <p
                  key={i}
                  className={`haiku-line serif-italic ${lineVisible > i ? 'visible' : ''}`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
          {showContinue && (
            <div className="poem-continue-wrap">
              <button
                type="button"
                className="btn-pill btn-primary"
                onClick={onContinue}
              >
                continue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
