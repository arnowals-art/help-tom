
// De WhatsApp-kanaallink. Eén plek, zodat de knoppen elders (Hero, sticky
// balk) dezelfde link gebruiken.
export const WHATSAPP_URL =
  'https://chat.whatsapp.com/FOwhbYSC7KY5bIwIwar2go?s=sw&p=i&mlu=0'

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

// Het WhatsApp-logo als klein inline-icoon voor op de knop.
function WhatsAppIcon() {
  return (
    <svg className="wa-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Updates() {
  return (
    <section id="updates">
      <div className="container narrow">
        <span className="section-label">Updates</span>
        <h2 className="section-title">Hoe het met Tom gaat</h2>
        <div className="timeline">
          {/* Aankondiging: updates lopen voortaan via het WhatsApp-kanaal. */}
          <div className="timeline-item channel-item">
            <span className="timeline-date">24 juli 2026</span>
            <p>
              Vanaf nu delen we updates via ons WhatsApp-kanaal. Zo
              blijf je direct op de hoogte en mis je niets. Volg ons kanaal om
              op de voet te volgen hoe het met Tom gaat.
            </p>
            <a
              className="btn btn-whatsapp"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon /> Volg het WhatsApp-kanaal →
            </a>
          </div>

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
