import React from 'react'
import RecommendationCard from '../RecommendationCard'
import '../styles/RecommendationScreen.css'

export default function RecommendationScreen({ recommendations, stressPatternSummary, onMore, onViewInsights }) {
  return (
    <div className="screen recommendation-screen recommendation-screen-personalized">
      <header className="screen-header">
        <h1 className="screen-title">Pulse</h1>
        <p className="screen-subtitle">here's what we recommend</p>
      </header>

      <div className="recommendation-list">
        {stressPatternSummary && (
          <article className="recommendation-card recommendation-card-personalized recommendation-card-summary">
            <div className="recommendation-card-main">
              <span className="recommendation-card-icon-wrap recommendation-card-summary-icon" aria-hidden />
              <div className="recommendation-card-text">
                <h3 className="recommendation-card-title">what your choices suggest</h3>
                <p className="recommendation-card-desc">{stressPatternSummary}</p>
              </div>
            </div>
          </article>
        )}
        {recommendations.map((rec) => (
          <RecommendationCard
            key={rec.id}
            title={rec.title}
            body={rec.body}
            insight={rec.insight}
            icon={rec.icon}
            actionLabel={rec.actionLabel}
            actionHref={rec.actionHref}
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
