// Voeg hier nieuwe updates toe (nieuwste bovenaan).
const UPDATES = [
  {
    date: '5 juli 2026',
    text: 'We zijn begonnen. Dank jullie wel.',
  },
]

export default function Updates() {
  return (
    <section id="updates">
      <div className="container narrow">
        <span className="section-label">Updates</span>
        <h2 className="section-title">Hoe het met Tom gaat</h2>
        <div className="timeline">
          {UPDATES.map((u) => (
            <div className="timeline-item" key={u.date + u.text}>
              <span className="timeline-date">{u.date}</span>
              <p>{u.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
