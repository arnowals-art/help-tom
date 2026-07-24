import { formatEuro } from '../lib/format.js'
import { WHATSAPP_URL } from './Updates.jsx'

// Sticky doneerbalk — alleen zichtbaar op mobiel (zie CSS),
// en verborgen zodra de doneersectie zelf in beeld is.
export default function StickyDonate({ raised, goal, hidden }) {
  if (hidden) return null
  const hasAmount = typeof raised === 'number' && Number.isFinite(raised)
  const pct = hasAmount ? Math.min(100, (raised / goal) * 100) : 0

  return (
    <div className="sticky-donate">
      <div className="mini-progress">
        <div className="mini-label">
          {hasAmount ? formatEuro(raised) : '—'} van {formatEuro(goal)}
        </div>
        <div className="mini-track">
          <div className="mini-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="btn btn-gold"
      >
        Laatste nieuws
      </a>
    </div>
  )
}
