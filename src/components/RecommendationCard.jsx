import React from 'react'
import { Wind, Footprints, Sparkles, Activity, Phone, StretchVertical } from 'lucide-react'
import './styles/RecommendationCard.css'

const CARD_ICONS = {
  hum: Wind,
  walk: Footprints,
  yoga: Sparkles,
  breath: Activity,
  call: Phone,
  stretch: StretchVertical,
}

function SparkIcon() {
  return (
    <svg className="rec-insight-spark" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 1v14M1 8h14M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </svg>
  )
}

export default function RecommendationCard({ title, body, insight, icon, actionLabel, actionHref }) {
  const IconComponent = CARD_ICONS[icon] || CARD_ICONS.breath

  return (
    <article className="recommendation-card recommendation-card-personalized">
      <div className="recommendation-card-main">
        <span className="recommendation-card-icon-wrap" aria-hidden>
          {IconComponent && <IconComponent size={24} strokeWidth={1.5} />}
        </span>
        <div className="recommendation-card-text">
          <h3 className="recommendation-card-title">{title}</h3>
          <p className="recommendation-card-desc">{body}</p>
        </div>
      </div>
      {insight && (
        <div className="recommendation-card-insight">
          <SparkIcon />
          <span>{insight}</span>
        </div>
      )}
      {actionLabel && (
        <div className="recommendation-card-action">
          {actionHref ? (
            <a
              href={actionHref}
              target="_blank"
              rel="noopener noreferrer"
              className="recommendation-card-action-btn"
            >
              {actionLabel}
            </a>
          ) : (
            <button type="button" className="recommendation-card-action-btn">
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </article>
  )
}
