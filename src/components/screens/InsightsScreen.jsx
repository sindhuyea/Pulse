import React from 'react'
import { TrendingUp, Clock, Target } from 'lucide-react'
import '../styles/InsightsScreen.css'

const MOCK_STATS = { sessions: 12, successRate: 85, dayStreak: 3 }

const MOCK_PATTERNS = [
  {
    id: 'social',
    icon: TrendingUp,
    title: 'Social connection is your strongest pattern',
    description: 'Reaching out to friends reduces your stress by an average of 60% on workdays',
    tint: 'insights-tint-green',
  },
  {
    id: 'time',
    icon: Clock,
    title: 'Best time for interventions',
    description: 'You tend to engage most effectively with stress management between 6–8 PM',
    tint: 'insights-tint-blue',
  },
  {
    id: 'movement',
    icon: Target,
    title: 'Movement works better than meditation',
    description: 'Real-world activities like yoga classes show 40% higher effectiveness for you',
    tint: 'insights-tint-lavender',
  },
]

export default function InsightsScreen({ onBackToHome }) {
  return (
    <div className="screen insights-screen">
      <header className="screen-header">
        <h1 className="screen-title">Your insights</h1>
        <p className="screen-subtitle">Pulse is learning what works best for you.</p>
      </header>

      <section className="insights-stats">
        <div className="insights-stat-card">
          <span className="insights-stat-value">{MOCK_STATS.sessions}</span>
          <span className="insights-stat-label">Sessions</span>
        </div>
        <div className="insights-stat-card">
          <span className="insights-stat-value">{MOCK_STATS.successRate}%</span>
          <span className="insights-stat-label">Success rate</span>
        </div>
        <div className="insights-stat-card">
          <span className="insights-stat-value">{MOCK_STATS.dayStreak}</span>
          <span className="insights-stat-label">Day streak</span>
        </div>
      </section>

      <section className="insights-patterns">
        <h2 className="insights-section-title">Key patterns</h2>
        <div className="insights-pattern-list">
          {MOCK_PATTERNS.map(({ id, icon: Icon, title, description, tint }) => (
            <div key={id} className={`insights-pattern-card ${tint}`}>
              <span className="insights-pattern-icon" aria-hidden>
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <div className="insights-pattern-content">
                <h3 className="insights-pattern-title">{title}</h3>
                <p className="insights-pattern-desc">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="insights-why">
        <div className="insights-why-card">
          <h3 className="insights-why-title">Why this matters</h3>
          <p className="insights-why-body">
            Pulse isn’t diagnosing or prescribing—it’s reflecting back what genuinely works for <em>you</em>. This helps you avoid self-improvement burnout and build confidence in managing stress your way.
          </p>
        </div>
      </section>

      <div className="insights-cta">
        <button
          type="button"
          className="btn-pill btn-primary insights-back-btn"
          onClick={onBackToHome}
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
