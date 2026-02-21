import React from 'react'
import { User, Users, Home, Trees, Zap, Turtle } from 'lucide-react'
import { PREFERENCE_KEYS } from '../state/inputState'
import './styles/PreferenceToggles.css'

/**
 * Continuous preference sliders (0–100). Both ends labeled with icon + text.
 * Values are stored as numbers; mock AI derives booleans at 50.
 */

function SliderSparkle({ trigger }) {
  return (
    <div key={trigger} className="pref-sparkle pref-sparkle-slider" aria-hidden>
      <span className="pref-sparkle-dot" />
      <span className="pref-sparkle-dot pref-sparkle-dot-2" />
      <span className="pref-sparkle-dot pref-sparkle-dot-3" />
    </div>
  )
}

function PreferenceSlider({
  value,
  leftLabel,
  rightLabel,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onChange,
}) {
  const sliderValue = typeof value === 'number' ? value : 0
  const [sparkle, setSparkle] = React.useState(0)

  const handleInputChange = (e) => {
    const num = Number(e.target.value)
    onChange(num)
    setSparkle((s) => s + 1)
  }

  return (
    <div className="pref-slider-wrap">
      <div className="pref-slider-row">
        <div className="pref-slider-end pref-slider-end-left" aria-hidden>
          <LeftIcon size={20} strokeWidth={1.75} className="pref-slider-end-icon" />
          <span className="pref-slider-end-text">{leftLabel}</span>
        </div>
        <div className="pref-slider-track-wrap">
          <SliderSparkle trigger={sparkle} />
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={handleInputChange}
            className="pref-slider-input"
            aria-label={`${leftLabel} to ${rightLabel}; current ${sliderValue}`}
          />
          <div
            className="pref-slider-thumb-fill"
            style={{ width: `${sliderValue}%` }}
            aria-hidden
          />
        </div>
        <div className="pref-slider-end pref-slider-end-right" aria-hidden>
          <RightIcon size={20} strokeWidth={1.75} className="pref-slider-end-icon" />
          <span className="pref-slider-end-text">{rightLabel}</span>
        </div>
      </div>
    </div>
  )
}

const SLIDER_CONFIG = {
  social: {
    leftLabel: 'alone',
    rightLabel: 'together',
    leftIcon: User,
    rightIcon: Users,
  },
  place: {
    leftLabel: 'inside',
    rightLabel: 'outside',
    leftIcon: Home,
    rightIcon: Trees,
  },
  pace: {
    leftLabel: 'quick',
    rightLabel: 'slow',
    leftIcon: Zap,
    rightIcon: Turtle,
  },
}

export default function PreferenceToggles({ preferences, onChange }) {
  return (
    <div className="preference-toggles preference-toggles-sliders">
      <div className="preference-row">
        {PREFERENCE_KEYS.map((key) => {
          const config = SLIDER_CONFIG[key]
          const raw = preferences[key]
          const value = typeof raw === 'number' ? raw : (raw === config.rightLabel ? 100 : 0)
          return (
            <PreferenceSlider
              key={key}
              value={value}
              leftLabel={config.leftLabel}
              rightLabel={config.rightLabel}
              leftIcon={config.leftIcon}
              rightIcon={config.rightIcon}
              onChange={(next) => onChange(key, next)}
            />
          )
        })}
      </div>
    </div>
  )
}
