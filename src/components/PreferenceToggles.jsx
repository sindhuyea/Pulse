import React from 'react'
import './styles/PreferenceToggles.css'
import { PREFERENCE_KEYS, PREFERENCE_OPTIONS } from '../state/inputState'

export default function PreferenceToggles({ preferences, onChange }) {
  return (
    <div className="preference-toggles">
      <p className="preference-prompt">I need something...</p>
      <div className="preference-row">
        {PREFERENCE_KEYS.map((key) => (
          <div key={key} className="preference-group">
            <span className="preference-label-top">
              {PREFERENCE_OPTIONS[key].left}
            </span>
            <button
              type="button"
              className="preference-pill"
              onClick={() => {
                const current = preferences[key]
                const next =
                  current === PREFERENCE_OPTIONS[key].left
                    ? PREFERENCE_OPTIONS[key].right
                    : PREFERENCE_OPTIONS[key].left
                onChange(key, next)
              }}
              aria-label={`Toggle ${key}: currently ${preferences[key]}`}
            >
              <span
                className="preference-knob"
                style={{
                  transform:
                    preferences[key] === PREFERENCE_OPTIONS[key].right
                      ? 'translateX(22px)'
                      : 'translateX(0)',
                }}
              />
            </button>
            <span className="preference-label-bottom">
              {PREFERENCE_OPTIONS[key].right}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
