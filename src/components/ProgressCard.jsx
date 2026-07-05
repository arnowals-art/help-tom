import { formatEuro } from '../lib/format.js'

export default function ProgressCard({ raised, goal, donors }) {
  const pct = Math.min(100, (raised / goal) * 100)

  return (
    <div className="container">
      <div className="progress-card" role="status">
        <div className="progress-amounts">
          <span className="progress-raised">{formatEuro(raised)} opgehaald</span>
          <span className="progress-goal">van {formatEuro(goal)}</span>
        </div>
        <div
          className="progress-track"
          aria-label={`${Math.round(pct)}% van het doelbedrag opgehaald`}
        >
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-meta">
          <span>
            <strong>{donors}</strong> {donors === 1 ? 'mens heeft' : 'mensen hebben'} al gedoneerd
          </span>
          <span className="urgency">De ziekte gaat door, dus elke dag telt</span>
        </div>
      </div>
    </div>
  )
}
