import { formatEuro } from '../lib/format.js'

export default function ProgressCard({ raised, goal, donors, bankUpdatedAt }) {
  const hasAmount = typeof raised === 'number' && Number.isFinite(raised)
  const pct = hasAmount ? Math.min(100, (raised / goal) * 100) : 0

  const updatedLabel = bankUpdatedAt
    ? new Date(bankUpdatedAt).toLocaleString('nl-NL', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

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
          <span className="urgency">De ziekte gaat door, dus elke dag telt</span>
        </div>
        {updatedLabel ? (
          <p className="bank-note">
            Stand van de rekening, automatisch bijgewerkt ({updatedLabel})
          </p>
        ) : (
          <p className="bank-note">
            Dit bedrag wordt periodiek bijgewerkt. Door de vele donaties kan de
            actuele stand iets achterlopen.
          </p>
        )}
      </div>
    </div>
  )
}
