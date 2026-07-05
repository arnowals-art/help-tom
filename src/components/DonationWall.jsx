import { useState } from 'react'
import { formatEuro } from '../lib/format.js'

const SHOW_FIRST = 8

function timeAgo(timestamp) {
  if (!timestamp) return ''
  const diff = Date.now() - timestamp
  const min = Math.floor(diff / 60000)
  if (min < 1) return 'zojuist'
  if (min < 60) return `${min} ${min === 1 ? 'minuut' : 'minuten'} geleden`
  const hours = Math.floor(min / 60)
  if (hours < 24) return `${hours} uur geleden`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? 'dag' : 'dagen'} geleden`
  return new Date(timestamp).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
  })
}

export default function DonationWall({ donations }) {
  const [showAll, setShowAll] = useState(false)

  // Nieuwste bovenaan
  const sorted = [...donations].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
  const visible = showAll ? sorted : sorted.slice(0, SHOW_FIRST)

  return (
    <section className="wall" id="steunbetuigingen">
      <div className="container narrow">
        <span className="section-label">Steunbetuigingen</span>
        <h2 className="section-title">Zij doneerden al</h2>

        {sorted.length === 0 ? (
          <div className="wall-empty">
            <p>Er zijn nog geen donaties.</p>
            <p>
              <a href="#doneer">Jij kunt de eerste zijn.</a>
            </p>
          </div>
        ) : (
          <>
            <div className="wall-list">
              {visible.map((d, i) => {
                const name = d.name?.trim() || 'Anoniem'
                return (
                  <div className="wall-item" key={d.timestamp || i}>
                    <div className="wall-avatar" aria-hidden="true">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="wall-body">
                      <div className="wall-head">
                        <strong>{name}</strong>
                        <span className="wall-amount">{formatEuro(d.amount)}</span>
                        <span className="wall-time">{timeAgo(d.timestamp)}</span>
                      </div>
                      {d.message?.trim() && <p className="wall-message">{d.message}</p>}
                    </div>
                  </div>
                )
              })}
            </div>

            {sorted.length > SHOW_FIRST && !showAll && (
              <button className="btn btn-outline wall-more" onClick={() => setShowAll(true)}>
                Toon alle {sorted.length} donaties
              </button>
            )}
          </>
        )}
      </div>
    </section>
  )
}
