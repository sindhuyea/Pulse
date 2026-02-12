import React from 'react'
import RecommendationCard from '../RecommendationCard'
import '../styles/RecommendationScreen.css'

export default function RecommendationScreen({ recommendations, onMore, onViewInsights }) {
  return (
    <div className="screen recommendation-screen recommendation-screen-personalized">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">here's what we recommend</p>
      </header>

      <div className="recommendation-list">
        {recommendations.map((rec) => (
          <RecommendationCard
            key={rec.id}
            title={rec.title}
            body={rec.body}
            insight={rec.insight}
            icon={rec.icon}
          />
        ))}
      </div>

      <div className="recommendation-footer">
        {onViewInsights && (
          <button type="button" className="btn-pill btn-primary recommendation-footer-btn" onClick={onViewInsights}>
            your insights
          </button>
        )}
        <button type="button" className="btn-pill btn-secondary recommendation-footer-btn" onClick={onMore}>
          cancel
        </button>
      </div>
    </div>
  )
}
