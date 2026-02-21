import React, { useMemo } from 'react'
import bodyOutlineSvg from '../assets/body-outline.svg?raw'
import { getStoredPositions } from '../lib/orbPositions'
import './styles/BodyOutline.css'

const LABELS = {
  head: 'head',
  shoulders: 'shoulders',
  chest: 'chest',
  'lower back': 'lower back',
  hands: 'hands',
  legs: 'legs',
}

// Nudge orbs up: head 2.5%; all others 5.5%
const HEAD_Y_NUDGE = 2.5
const ORB_Y_NUDGE = 5.5
const SHOULDER_Y_NUDGE = 3.5

const nudgeY = (y, nudge) => Math.max(1, y - nudge)

// Defaults when no calibration is stored; head/chest/stomach/legs 5% left, shoulder 10% left
const DEFAULT_ENTRIES = [
  { area: 'head', x: 45, y: 9 },
  { area: 'shoulders', x: 65, y: 22.5 },
  { area: 'chest', x: 45, y: 29.5 },
  { area: 'lower back', x: 45, y: 42.5 },
  { area: 'hands', x: 76, y: 52.5 },
  { area: 'legs', x: 56.5, y: 69.5 },
]

function buildEntriesFromStored(stored) {
  if (!stored) return null
  const entries = [
    { area: 'head', x: stored.head.x - 5, y: nudgeY(stored.head.y, HEAD_Y_NUDGE) },
    { area: 'shoulders', x: 65, y: nudgeY(stored.shoulders.y, SHOULDER_Y_NUDGE) },
    { area: 'chest', x: stored.chest.x - 5, y: nudgeY(stored.chest.y, ORB_Y_NUDGE) },
    { area: 'lower back', x: stored.lowerBack.x - 5, y: nudgeY(stored.lowerBack.y, ORB_Y_NUDGE) },
    { area: 'hands', x: stored.hands.x, y: nudgeY(stored.hands.y, ORB_Y_NUDGE) },
    { area: 'legs', x: stored.legs.x - 5, y: nudgeY(stored.legs.y, ORB_Y_NUDGE) },
  ]
  return entries
}

const LABEL_ANIM_MS = 250

export default function BodyOutline({ selectedAreas, onSelectArea }) {
  const [hoveredArea, setHoveredArea] = React.useState(null)
  const [exitingHover, setExitingHover] = React.useState(null)
  const [exitingSelected, setExitingSelected] = React.useState([])
  const prevHoveredRef = React.useRef(null)
  const prevSelectedRef = React.useRef(selectedAreas)
  const exitTimeoutRef = React.useRef(null)

  const orbEntries = useMemo(() => {
    const stored = getStoredPositions()
    return buildEntriesFromStored(stored) || DEFAULT_ENTRIES
  }, [])

  // On de-hover: run slide-out then clear
  React.useEffect(() => {
    if (hoveredArea === null && prevHoveredRef.current !== null) {
      const entry = orbEntries.find((e) => e.area === prevHoveredRef.current)
      if (entry) setExitingHover({ area: prevHoveredRef.current, y: entry.y })
    } else if (hoveredArea !== null) {
      setExitingHover(null)
    }
    prevHoveredRef.current = hoveredArea
  }, [hoveredArea, orbEntries])

  React.useEffect(() => {
    if (!exitingHover) return
    const t = setTimeout(() => setExitingHover(null), LABEL_ANIM_MS)
    return () => clearTimeout(t)
  }, [exitingHover])

  // On deselect: run slide-out for removed area(s) then clear
  React.useEffect(() => {
    const prev = prevSelectedRef.current
    const removed = prev.filter((a) => !selectedAreas.includes(a))
    if (removed.length > 0) {
      const withY = removed
        .map((area) => {
          const entry = orbEntries.find((e) => e.area === area)
          return entry ? { area, y: entry.y } : null
        })
        .filter(Boolean)
      setExitingSelected((ex) => [...ex, ...withY])
    }
    prevSelectedRef.current = selectedAreas
  }, [selectedAreas, orbEntries])

  React.useEffect(() => {
    if (exitingSelected.length === 0) return
    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
    exitTimeoutRef.current = setTimeout(() => {
      setExitingSelected([])
      exitTimeoutRef.current = null
    }, LABEL_ANIM_MS)
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
    }
  }, [exitingSelected])

  const showLabels =
    hoveredArea ||
    selectedAreas.length > 0 ||
    exitingHover ||
    exitingSelected.length > 0

  return (
    <div className="body-outline-wrap">
      <div className="body-svg-inner" aria-hidden>
        <div
          className="body-fill"
          style={{ clipPath: 'url(#bodyOutlineClip)' }}
          aria-hidden
        />
        <div className="body-svg-layer" dangerouslySetInnerHTML={{ __html: bodyOutlineSvg }} />
      </div>
      {orbEntries.map(({ area, x, y }, i) => (
        <button
          key={`${area}-${i}`}
          type="button"
          className={`body-orb ${selectedAreas.includes(area) ? 'selected' : ''}`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            '--orb-delay': `${(i * 0.22) % 1.4}s`,
            '--orb-duration': `${1.15 + (i % 4) * 0.14}s`,
          }}
          onClick={() => onSelectArea(area)}
          onMouseEnter={() => setHoveredArea(area)}
          onMouseLeave={() => setHoveredArea(null)}
          aria-label={LABELS[area]}
          aria-pressed={selectedAreas.includes(area)}
        >
          <span className="ball" />
        </button>
      ))}
      {showLabels && (
        <div className="body-labels-side" aria-hidden>
          {hoveredArea && (() => {
            const entry = orbEntries.find((e) => e.area === hoveredArea)
            return entry ? (
              <span
                className="body-label body-label-hover"
                style={{ top: `${entry.y}%` }}
              >
                {LABELS[hoveredArea]}
              </span>
            ) : null
          })()}
          {selectedAreas.map((area) => {
            const entry = orbEntries.find((e) => e.area === area)
            return entry ? (
              <span
                key={area}
                className="body-label body-label-selected"
                style={{ top: `${entry.y}%` }}
              >
                {LABELS[area]}
              </span>
            ) : null
          })}
          {exitingHover && (
            <span
              className="body-label body-label-exit"
              style={{ top: `${exitingHover.y}%` }}
            >
              {LABELS[exitingHover.area]}
            </span>
          )}
          {exitingSelected.map(({ area, y }) => (
            <span
              key={`exit-${area}-${y}`}
              className="body-label body-label-exit"
              style={{ top: `${y}%` }}
            >
              {LABELS[area]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
