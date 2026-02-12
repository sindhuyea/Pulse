import React from 'react'
import RecommendationCard from '../RecommendationCard'
import { TrendingUp } from 'lucide-react'
import '../styles/RecommendationScreen.css'

function getCurrentStateLine(inputSummary) {
  if (!inputSummary) return 'Based on today’s check-in'
  const { areas, tarot, preferences } = inputSummary
  const parts = []
  if (areas && areas.length > 0) parts.push('where you’re holding tension')
  if (tarot) parts.push('today’s draw')
  parts.push('what you need right now')
  return parts.length === 1 ? `Based on ${parts[0]}` : `Based on ${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}

export default function RecommendationScreen({ recommendations, inputSummary, onMore, onViewInsights }) {
  const currentStateLine = getCurrentStateLine(inputSummary)
  return (
    <div className="screen recommendation-screen recommendation-screen-personalized">
      <header className="screen-header">
        <h1 className="screen-title">Personalized for you</h1>
        <p className="screen-subtitle">Based on your input and past experiences</p>
      </header>

      <section className="recommendation-current-state">
        <p className="recommendation-state-label">Current state: {currentStateLine}</p>
        <p className="recommendation-state-meta">
          <TrendingUp size={14} strokeWidth={1.5} aria-hidden />
          <span>Reflecting your check-in and preferences</span>
        </p>
      </section>

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
          <button type="button" className="btn-pill btn-primary recommendation-insights-link" onClick={onViewInsights}>
            your insights
          </button>
        )}
        <button type="button" className="btn-pill btn-secondary recommendation-cancel-btn" onClick={onMore}>
          cancel
        </button>
      </div>
    </div>
  )
}
