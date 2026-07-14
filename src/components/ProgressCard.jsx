import { formatEuro } from '../lib/format.js'

export default function ProgressCard({ raised, goal, donors }) {
  const hasAmount = typeof raised === 'number' && Number.isFinite(raised)
  const pct = hasAmount ? Math.min(100, (raised / goal) * 100) : 0

  return (
    <div className="container">
      <div className="progress-card" role="status">
        <div className="progress-amounts">
          <span className="progress-raised">
            {hasAmount ? formatEuro(raised) : '—'} opgehaald
          </span>
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
            <strong>{donors}</strong> {donors === 1 ? 'steunbetuiging' : 'steunbetuigingen'}
          </span>
          <span className="urgency">Dank jullie wel 💛</span>
        </div>
      </div>
    </div>
  )
}
