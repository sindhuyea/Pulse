import React, { useState } from 'react'
import '../styles/NameScreen.css'

export default function NameScreen({ onContinue }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim()) onContinue(name.trim())
  }

  return (
    <div className="screen name-screen">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">what's your name?</p>
      </header>

      <form className="name-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="name-input"
          placeholder="your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          autoFocus
          aria-label="Your name"
        />
        <button
          type="submit"
          className="btn-pill btn-primary"
          disabled={!name.trim()}
        >
          continue →
        </button>
      </form>
    </div>
  )
}
