import React from 'react'
import BodyOutline from '../BodyOutline'
import '../styles/BodyCheckScreen.css'

export default function BodyCheckScreen({
  userName,
  bodyStressAreas,
  onToggleArea,
  onConfirm,
  onIDontKnow,
}) {
  const canConfirm = bodyStressAreas.length > 0

  return (
    <div className="screen body-check-screen">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">
          {userName ? (
            <>
              welcome {userName}!<br />
              where in your body do you feel stress?
            </>
          ) : (
            'where in your body do you feel stress?'
          )}
        </p>
      </header>

      <div className="body-check-main">
        <BodyOutline selectedAreas={bodyStressAreas} onSelectArea={onToggleArea} />
      </div>

      <div className="body-check-actions">
        <button
          type="button"
          className="btn-pill btn-primary"
          disabled={!canConfirm}
          onClick={canConfirm ? onConfirm : undefined}
        >
          continue →
        </button>
        <button type="button" className="btn-pill btn-secondary" onClick={onIDontKnow}>
          I don't know
        </button>
      </div>
    </div>
  )
}
