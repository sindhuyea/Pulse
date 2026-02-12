import React from 'react'
import PreferenceToggles from '../PreferenceToggles'
import '../styles/ReflectionScreen.css'

export default function ReflectionScreen({
  preferences,
  onPreferenceChange,
  onGuideMe,
}) {
  return (
    <div className="screen reflection-screen">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">what do you need right now?</p>
      </header>

      <div className="reflection-preferences">
        <PreferenceToggles preferences={preferences} onChange={onPreferenceChange} />
      </div>

      <div className="reflection-cta">
        <button type="button" className="btn-pill btn-primary" onClick={onGuideMe}>
          guide me
        </button>
      </div>
    </div>
  )
}
