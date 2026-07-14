
export const UPDATES = [
  {
    date: '14 juli 2026',
    text: <>
      <p>De vertrekdatum naar Israël is definitief vastgesteld op zaterdag 25 juli in de avond.</p>
      <p>Het verblijf zal naar verwachting ongeveer 10 weken duren in plaats van de eerder genoemde 7 weken. De reden hiervoor is dat pa's medicatie de eerste drie weken onder begeleiding van het ziekenhuis moet worden afgebouwd. Pas daarna kan de behandeling worden gestart.
      </p>
    </>,
  },
  {
    date: '11 juli 2026',
    text: <>
      <p>Alle voorbereidingen voor het vertrek op zaterdag 25 juli zijn in volle gang. </p>
      <ul className="timeline-ul-list">
        <li>Paspoorten zijn geregeld</li>
        <li>Tickets zijn geboekt</li>
        <li>Onderkomen; er is een onderkomen geregeld voor Tom en zijn begeleiders.</li>
      </ul>
      <p>De eerste weken zal Arno met Tom meegaan, en wanneer ze aankomen zal de dag erna direct gestart worden met de onderzoeken die nodig zijn als voorbereiding voor de behandeling.</p>
      <p>In week 3 zal Tom opgenomen worden in het ziekenhuis.</p>
    </>,
  },
  {
    date: '8 juli 2026',
    text: <p>Er is een datum: op 25 juli vertrekken we naar Israël. Op 26 juli beginnen de onderzoeken bij het Sheba Medical Center.</p>,
  },
  {
    date: '5 juli 2026',
    text: <p>We zijn begonnen. Dank jullie wel.</p>,
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
            <div className="timeline-item" key={u.date}>
              <span className="timeline-date">{u.date}</span>
              {u.text}
              {u.slug && (
                <a className="timeline-link" href={`./${u.slug}.html`}>
                  Lees deze update op een eigen pagina →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
