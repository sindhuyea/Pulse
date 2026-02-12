import React from 'react'
import '../styles/HomeScreen.css'
import { BackgroundPaths } from '../ui/background-paths'

export default function HomeScreen({ onCheckIn }) {
  return (
    <div className="screen home-screen">
      <BackgroundPaths backgroundOnly={true} color="#C28AC9" />
      <div className="holo-blur home-glow animate-pulse-glow" aria-hidden />
      <header className="home-header">
        <h1 className="home-title">Pulse</h1>
        <p className="home-tagline">calm for the moment you're in</p>
      </header>
      <div className="home-cta-wrap">
        <button
          type="button"
          className="btn-pill btn-primary btn-cta animate-breathe"
          onClick={onCheckIn}
        >
          start check in →
        </button>
      </div>
    </div>
  )
}
