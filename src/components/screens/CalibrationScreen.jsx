import React, { useState, useRef, useCallback } from 'react'
import bodyOutlineSvg from '../../assets/body-outline.svg?raw'
import { CALIBRATION_PARTS, savePositions, clearPositions } from '../../lib/orbPositions'
import '../styles/CalibrationScreen.css'

export default function CalibrationScreen({ onDone }) {
  const [step, setStep] = useState(0)
  const [positions, setPositions] = useState({})
  const [pendingPosition, setPendingPosition] = useState(null)
  const wrapRef = useRef(null)

  const current = CALIBRATION_PARTS[step]
  const isLast = step === CALIBRATION_PARTS.length - 1
  const hasPending = pendingPosition !== null

  const handleBodyClick = useCallback(
    (e) => {
      const el = wrapRef.current
      if (!el || !current) return
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setPendingPosition({ x, y })
    },
    [current]
  )

  const handleConfirm = useCallback(() => {
    if (!current || !pendingPosition) return
    const next = { ...positions, [current.key]: pendingPosition }
    setPositions(next)
    setPendingPosition(null)
    if (isLast) {
      savePositions(next)
    } else {
      setStep((s) => s + 1)
    }
  }, [current, pendingPosition, positions, isLast])

  const handleDone = () => {
    if (typeof onDone === 'function') onDone()
    else window.history.replaceState({}, '', window.location.pathname)
    window.location.reload()
  }

  const handleRedo = () => {
    clearPositions()
    setPositions({})
    setPendingPosition(null)
    setStep(0)
  }

  const allDone = isLast && current && positions[current.key] !== undefined

  const subtitle = allDone
    ? 'Positions saved. Reload the app to use them.'
    : hasPending
      ? `Happy with this? Click the body again to move the “${current?.label}” orb, or confirm below.`
      : `Click on the body where the “${current?.label}” orb should be.`

  return (
    <div className="calibration-screen">
      <div className="calibration-header">
        <h1 className="calibration-title">Pulse</h1>
        <p className="calibration-subtitle">{subtitle}</p>
      </div>

      <div
        ref={wrapRef}
        className="calibration-body-wrap body-outline-wrap"
        onClick={allDone ? undefined : handleBodyClick}
        role={allDone ? undefined : 'button'}
        tabIndex={allDone ? undefined : 0}
        onKeyDown={
          allDone
            ? undefined
            : (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  e.currentTarget.click()
                }
              }
            }
        aria-label={allDone ? undefined : `Click to set position for ${current?.label}`}
      >
        <div
          className="body-svg-inner"
          aria-hidden
          dangerouslySetInnerHTML={{ __html: bodyOutlineSvg }}
        />
        {CALIBRATION_PARTS.filter(({ key }) => positions[key]).map(({ key }) => {
          const pos = positions[key]
          return (
            <div
              key={key}
              className="calibration-preview-orb"
              style={{
                left: `calc(${pos.x}% - 15.5px)`,
                top: `calc(${pos.y}% - 15.5px)`,
              }}
            >
              <span className="orb-center">
                <span className="orb-glow">
                  <span className="orb-ring orb-ring-90" />
                  <span className="orb-ring orb-ring-75" />
                  <span className="orb-dot" />
                </span>
              </span>
            </div>
          )
        })}
        {hasPending && current && (
          <div
            className="calibration-preview-orb calibration-preview-orb-pending"
            style={{
              left: `calc(${pendingPosition.x}% - 15.5px)`,
              top: `calc(${pendingPosition.y}% - 15.5px)`,
            }}
          >
            <span className="orb-center">
              <span className="orb-glow">
                <span className="orb-ring orb-ring-90" />
                <span className="orb-ring orb-ring-75" />
                <span className="orb-dot" />
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="calibration-actions">
        {allDone ? (
          <>
            <button type="button" className="btn-pill btn-primary" onClick={handleDone}>
              Use these positions
            </button>
            <button type="button" className="btn-pill btn-secondary" onClick={handleRedo}>
              Redo calibration
            </button>
          </>
        ) : hasPending ? (
          <>
            <button type="button" className="btn-pill btn-primary" onClick={handleConfirm}>
              Confirm and continue
            </button>
            <p className="calibration-step">
              Step {step + 1} of {CALIBRATION_PARTS.length}
            </p>
          </>
        ) : (
          <p className="calibration-step">
            Step {step + 1} of {CALIBRATION_PARTS.length}
          </p>
        )}
      </div>
    </div>
  )
}
