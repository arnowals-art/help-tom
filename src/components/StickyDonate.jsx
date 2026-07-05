import { formatEuro } from '../lib/format.js'

// Sticky doneerbalk — alleen zichtbaar op mobiel (zie CSS),
// en verborgen zodra de doneersectie zelf in beeld is.
export default function StickyDonate({ raised, goal, hidden }) {
  if (hidden) return null
  const pct = Math.min(100, (raised / goal) * 100)

  return (
    <div className="sticky-donate">
      <div className="mini-progress">
        <div className="mini-label">
          {formatEuro(raised)} van {formatEuro(goal)}
        </div>
        <div className="mini-track">
          <div className="mini-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <a href="#doneer" className="btn btn-gold">
        Doneer nu
      </a>
    </div>
  )
}
