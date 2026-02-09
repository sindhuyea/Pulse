import React from 'react'
import RecommendationCard from '../RecommendationCard'
import '../styles/RecommendationScreen.css'

export default function RecommendationScreen({ recommendations, onMore }) {
  return (
    <div className="screen recommendation-screen">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">a few ways to ease this....</p>
      </header>

      <div className="recommendation-list">
        {recommendations.map((rec) => (
          <RecommendationCard
            key={rec.id}
            title={rec.title}
            description={rec.description}
            cta={rec.cta}
            icon={rec.icon}
          />
        ))}
      </div>

      <div className="recommendation-more">
        <button type="button" className="btn-pill btn-secondary" onClick={onMore}>
          more
        </button>
      </div>
    </div>
  )
}
