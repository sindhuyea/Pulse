import React from 'react'
import { User, Users, Home, Trees, Zap, Turtle } from 'lucide-react'
import { PREFERENCE_KEYS, PREFERENCE_OPTIONS } from '../state/inputState'
import './styles/PreferenceToggles.css'

/**
 * Figma Make–style toggles: track with two crossfading themed backgrounds + thumb with icon.
 * Motion: track transition 300ms, thumb and background opacity 500ms ease-in-out.
 */

function ToggleSparkle({ trigger }) {
  return (
    <div key={trigger} className="pref-sparkle" aria-hidden>
      <span className="pref-sparkle-dot" />
      <span className="pref-sparkle-dot pref-sparkle-dot-2" />
      <span className="pref-sparkle-dot pref-sparkle-dot-3" />
    </div>
  )
}

function AloneTogetherToggle({ value, onChange }) {
  const isAlone = value === 'alone'
  const [sparkle, setSparkle] = React.useState(0)

  const handleClick = () => {
    onChange(isAlone ? 'together' : 'alone')
    setSparkle((s) => s + 1)
  }

  return (
    <div className="pref-figma-wrap">
      <button
        type="button"
        className="pref-figma-track"
        onClick={handleClick}
        aria-label={isAlone ? 'Switch to together' : 'Switch to alone'}
      >
        <ToggleSparkle trigger={sparkle} />
        {/* Alone background */}
        <div className={`pref-figma-bg ${isAlone ? 'pref-figma-bg-on' : 'pref-figma-bg-off'}`}>
          <div className="pref-figma-gradient pref-figma-gradient-calm" />
          <div className="pref-figma-detail pref-alone-spotlight" />
          <div className="pref-figma-detail pref-alone-chair" />
          <div className="pref-figma-detail pref-alone-tree" />
          <div className="pref-figma-detail pref-alone-meditation" />
        </div>
        {/* Together background */}
        <div className={`pref-figma-bg ${!isAlone ? 'pref-figma-bg-on' : 'pref-figma-bg-off'}`}>
          <div className="pref-figma-gradient pref-figma-gradient-warm" />
          <div className="pref-figma-detail pref-together-glow-1" />
          <div className="pref-figma-detail pref-together-glow-2" />
          <div className="pref-figma-detail pref-together-person-1" />
          <div className="pref-figma-detail pref-together-person-2" />
          <div className="pref-figma-detail pref-together-person-3" />
          <div className="pref-figma-detail pref-together-trees" />
          <div className="pref-figma-detail pref-together-heart" />
        </div>
        <div className={`pref-figma-thumb ${isAlone ? 'pref-figma-thumb-left' : 'pref-figma-thumb-right'}`}>
          {isAlone ? (
            <User className="pref-figma-icon" size={20} strokeWidth={1.75} />
          ) : (
            <Users className="pref-figma-icon" size={20} strokeWidth={1.75} />
          )}
        </div>
      </button>
      <span key={value} className="pref-figma-label">{value}</span>
    </div>
  )
}

function InsideOutsideToggle({ value, onChange }) {
  const isInside = value === 'inside'
  const [sparkle, setSparkle] = React.useState(0)

  const handleClick = () => {
    onChange(isInside ? 'outside' : 'inside')
    setSparkle((s) => s + 1)
  }

  return (
    <div className="pref-figma-wrap">
      <button
        type="button"
        className="pref-figma-track"
        onClick={handleClick}
        aria-label={isInside ? 'Switch to outside' : 'Switch to inside'}
      >
        <ToggleSparkle trigger={sparkle} />
        <div className={`pref-figma-bg ${isInside ? 'pref-figma-bg-on' : 'pref-figma-bg-off'}`}>
          <div className="pref-figma-gradient pref-figma-gradient-interior" />
          <div className="pref-figma-detail pref-inside-furniture-1" />
          <div className="pref-figma-detail pref-inside-furniture-2" />
          <div className="pref-figma-detail pref-inside-window" />
          <div className="pref-figma-detail pref-inside-glow" />
        </div>
        <div className={`pref-figma-bg ${!isInside ? 'pref-figma-bg-on' : 'pref-figma-bg-off'}`}>
          <div className="pref-figma-gradient pref-figma-gradient-sky" />
          <div className="pref-figma-detail pref-outside-moon" />
          <div className="pref-figma-detail pref-outside-moon-glow" />
          <div className="pref-figma-detail pref-outside-cloud-1" />
          <div className="pref-figma-detail pref-outside-cloud-2" />
          <div className="pref-figma-detail pref-outside-tree-1" />
          <div className="pref-figma-detail pref-outside-tree-2" />
          <div className="pref-figma-detail pref-outside-tree-3" />
          <div className="pref-figma-detail pref-outside-tree-canopy-2" />
          <div className="pref-figma-detail pref-outside-grass" />
        </div>
        <div className={`pref-figma-thumb ${isInside ? 'pref-figma-thumb-left' : 'pref-figma-thumb-right'}`}>
          {isInside ? (
            <Home className="pref-figma-icon" size={20} strokeWidth={1.75} />
          ) : (
            <Trees className="pref-figma-icon" size={20} strokeWidth={1.75} />
          )}
        </div>
      </button>
      <span key={value} className="pref-figma-label">{value}</span>
    </div>
  )
}

function QuickSlowToggle({ value, onChange }) {
  const isQuick = value === 'quick'
  const [sparkle, setSparkle] = React.useState(0)

  const handleClick = () => {
    onChange(isQuick ? 'slow' : 'quick')
    setSparkle((s) => s + 1)
  }

  return (
    <div className="pref-figma-wrap">
      <button
        type="button"
        className="pref-figma-track"
        onClick={handleClick}
        aria-label={isQuick ? 'Switch to slow' : 'Switch to quick'}
      >
        <ToggleSparkle trigger={sparkle} />
        <div className={`pref-figma-bg ${isQuick ? 'pref-figma-bg-on' : 'pref-figma-bg-off'}`}>
          <div className="pref-figma-gradient pref-figma-gradient-energetic" />
          <div className="pref-figma-detail pref-quick-streak-1" />
          <div className="pref-figma-detail pref-quick-streak-2" />
          <div className="pref-figma-detail pref-quick-streak-3" />
          <div className="pref-figma-detail pref-quick-bolt" />
          <div className="pref-figma-detail pref-quick-circle" />
          <div className="pref-figma-detail pref-quick-particle-1" />
          <div className="pref-figma-detail pref-quick-particle-2" />
          <div className="pref-figma-detail pref-quick-particle-3" />
        </div>
        <div className={`pref-figma-bg ${!isQuick ? 'pref-figma-bg-on' : 'pref-figma-bg-off'}`}>
          <div className="pref-figma-gradient pref-figma-gradient-calm" />
          <div className="pref-figma-detail pref-slow-waves-1" />
          <div className="pref-figma-detail pref-slow-waves-2" />
          <div className="pref-figma-detail pref-slow-cloud-1" />
          <div className="pref-figma-detail pref-slow-cloud-2" />
          <div className="pref-figma-detail pref-slow-stone-1" />
          <div className="pref-figma-detail pref-slow-stone-2" />
          <div className="pref-figma-detail pref-slow-curve" />
          <div className="pref-figma-detail pref-slow-ripple" />
        </div>
        <div className={`pref-figma-thumb ${isQuick ? 'pref-figma-thumb-left' : 'pref-figma-thumb-right'}`}>
          {isQuick ? (
            <Zap className="pref-figma-icon" size={20} strokeWidth={1.75} />
          ) : (
            <Turtle className="pref-figma-icon" size={20} strokeWidth={1.75} />
          )}
        </div>
      </button>
      <span key={value} className="pref-figma-label">{value}</span>
    </div>
  )
}

const TOGGLE_COMPONENTS = {
  social: AloneTogetherToggle,
  place: InsideOutsideToggle,
  pace: QuickSlowToggle,
}

export default function PreferenceToggles({ preferences, onChange }) {
  return (
    <div className="preference-toggles">
      <div className="preference-row">
        {PREFERENCE_KEYS.map((key) => {
          const Comp = TOGGLE_COMPONENTS[key]
          return (
            <Comp
              key={key}
              value={preferences[key]}
              onChange={(next) => onChange(key, next)}
            />
          )
        })}
      </div>
    </div>
  )
}
