import React, { useState, useEffect } from 'react'
import PreferenceToggles from '../PreferenceToggles'
import { getHaiku } from '../../lib/mockAI'
import '../styles/ReflectionScreen.css'

export default function ReflectionScreen({
  inputSummary,
  preferences,
  onPreferenceChange,
  onGuideMe,
}) {
  const [haiku, setHaiku] = useState(() => getHaiku(inputSummary))
  const [lineVisible, setLineVisible] = useState(0)

  useEffect(() => {
    setLineVisible(0)
    const t1 = setTimeout(() => setLineVisible(1), 500)
    const t2 = setTimeout(() => setLineVisible(2), 1200)
    const t3 = setTimeout(() => setLineVisible(3), 1900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [haiku])

  function refreshHaiku() {
    setHaiku(getHaiku(inputSummary))
  }

  return (
    <div className="screen reflection-screen">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">thank you for sharing</p>
      </header>

      <div className="haiku-block">
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
        <button
          type="button"
          className="haiku-refresh"
          onClick={refreshHaiku}
        >
          refresh
        </button>
      </div>

      <div className="reflection-preferences">
        <PreferenceToggles preferences={preferences} onChange={onPreferenceChange} />
      </div>

      <div className="reflection-cta">
        <button type="button" className="btn-pill btn-primary btn-large" onClick={onGuideMe}>
          guide me
        </button>
      </div>
    </div>
  )
}
