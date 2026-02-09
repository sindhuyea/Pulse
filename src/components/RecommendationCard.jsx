import React from 'react'
import './styles/RecommendationCard.css'

const ICONS = {
  hum: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 6v12M9 9c0 1.5 1.5 3 3 3s3-1.5 3-3M9 15c0 1.5 1.5 3 3 3s3-1.5 3-3" />
    </svg>
  ),
  walk: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 4l-3 6 2 4 4-4" />
      <path d="M8 12l-2 4 2 2 4-4" />
    </svg>
  ),
  yoga: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="6" r="2" />
      <path d="M12 8v8M8 12l4 4 4-4" />
    </svg>
  ),
  breath: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 4v16M8 8c0 2 2 4 4 4s4-2 4-4" />
    </svg>
  ),
  call: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  stretch: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 4v16M4 12h16" />
      <path d="M8 8l4-4 4 4M8 16l4 4 4-4" />
    </svg>
  ),
}

export default function RecommendationCard({ title, description, cta, icon }) {
  const IconComponent = ICONS[icon] || ICONS.breath

  return (
    <article className="recommendation-card card-lift">
      <div className="recommendation-card-icon" aria-hidden>
        <IconComponent />
      </div>
      <div className="recommendation-card-content">
        <h3 className="recommendation-card-title">{title}</h3>
        <p className="recommendation-card-desc">{description}</p>
        <button type="button" className="recommendation-card-cta">
          {cta}
        </button>
      </div>
    </article>
  )
}
