import { useState } from 'react'

const SHOW_FIRST = 8
const SHOW_STEP = 8

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
  // Aantal zichtbare berichten; groeit met SHOW_STEP per klik.
  const [visibleCount, setVisibleCount] = useState(SHOW_FIRST)

  // Nieuwste bovenaan: handmatige lijst staat al op volgorde,
  // entries met timestamp worden daarbinnen gesorteerd.
  const sorted = [...donations].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
  const visible = sorted.slice(0, visibleCount)
  const remaining = sorted.length - visible.length

  return (
    <section className="wall" id="steunbetuigingen">
      <div className="container narrow">
        <span className="section-label">Steunbetuigingen</span>
        <h2 className="section-title">Bemoedigingen voor Tom</h2>

        {sorted.length === 0 ? (
          <div className="wall-empty">
            <p>Er zijn nog geen berichten.</p>
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
                        <span className="wall-time">{d.date || timeAgo(d.timestamp)}</span>
                      </div>
                      {d.message?.trim() && <p className="wall-message">{d.message}</p>}
                    </div>
                  </div>
                )
              })}
            </div>

            {remaining > 0 && (
              <button
                className="btn btn-outline wall-more"
                onClick={() => setVisibleCount((n) => n + SHOW_STEP)}
              >
                Toon meer ({remaining} resterend)
              </button>
            )}
          </>
        )}
      </div>
    </section>
  )
}
