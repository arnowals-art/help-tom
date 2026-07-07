import { useState } from 'react'
import { ING_URLS, ingUrlForAmount } from '../lib/config.js'
import { submitPledge } from '../lib/pledges.js'
import { formatEuro } from '../lib/format.js'

const PRESETS = [10, 25, 50, 100]

// Onthoud de laatste toezegging in deze browser, zodat een mislukte
// betaling opnieuw geprobeerd kan worden zonder dat dezelfde donatie
// nóg een keer wordt geregistreerd.
const DEDUPE_KEY = 'help-tom-laatste-toezegging'
const DEDUPE_WINDOW_MS = 60 * 60 * 1000 // 1 uur

function isRecentDuplicate(amount, name, message) {
  try {
    const raw = localStorage.getItem(DEDUPE_KEY)
    if (!raw) return false
    const last = JSON.parse(raw)
    return (
      last.amount === amount &&
      last.name === name &&
      last.message === message &&
      Date.now() - last.at < DEDUPE_WINDOW_MS
    )
  } catch {
    return false
  }
}

function rememberPledge(amount, name, message) {
  try {
    localStorage.setItem(
      DEDUPE_KEY,
      JSON.stringify({ amount, name, message, at: Date.now() }),
    )
  } catch {
    /* privémodus zonder opslag — dan geen deduplicatie */
  }
}

export default function DonateSection({ onPledged }) {
  const [selected, setSelected] = useState(50)
  const [custom, setCustom] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const amount = custom !== '' ? Number(custom) : selected

  const handleDonate = () => {
    setError('')
    if (!amount || amount < 1 || Number.isNaN(amount)) {
      setError('Vul een geldig bedrag in (minimaal €1).')
      return
    }

    // Toezegging vastleggen voor de teller en de steunbetuigingen —
    // tenzij deze bezoeker net exact dezelfde toezegging deed
    // (bijv. na een mislukte betaling): dan alleen opnieuw betalen.
    const duplicate = isRecentDuplicate(amount, name, message)
    if (!duplicate) {
      submitPledge({ amount, name, message })
      rememberPledge(amount, name, message)
    }

    // Door naar het ING-betaalscherm (nieuw tabblad).
    // Voor de vaste bedragen staat het bedrag daar al ingevuld.
    const payUrl = ingUrlForAmount(amount)
    const opened = window.open(payUrl, '_blank', 'noopener')

    onPledged({
      amount,
      name,
      message,
      payUrl,
      duplicate,
      prefilled: Boolean(ING_URLS[amount]),
      timestamp: Date.now(),
      ingOpened: Boolean(opened),
    })
  }

  return (
    <section className="donate" id="doneer">
      <div className="container narrow">
        <span className="section-label">Doneren</span>
        <h2 className="section-title">Help mee met de behandeling</h2>
        <p className="donate-sub">
          Kies je bedrag, daarna opent het betaalscherm van ING. Alles wat
          je kunt missen helpt ons. Dank je wel.
        </p>

        <div className="amounts">
          {PRESETS.map((v) => (
            <button
              key={v}
              className={`amount-btn ${custom === '' && selected === v ? 'active' : ''}`}
              onClick={() => {
                setSelected(v)
                setCustom('')
              }}
            >
              €{v}
            </button>
          ))}
          <label className="custom-amount">
            <span>€</span>
            <input
              type="number"
              min="1"
              placeholder="Eigen bedrag"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
          </label>
        </div>

        <div className="donate-fields">
          <input
            type="text"
            maxLength={60}
            placeholder="Je naam (mag leeg — dan sta je er als Anoniem)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows={2}
            maxLength={280}
            placeholder="Bericht voor Tom en de familie (niet verplicht)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {ING_URLS.open ? (
          <button className="btn btn-gold btn-big" onClick={handleDonate}>
            {amount && !Number.isNaN(amount) && amount >= 1
              ? `Doneer ${formatEuro(amount)} via ING`
              : 'Doneer via ING'}
          </button>
        ) : (
          /* De ING-link is nog niet ingesteld — zie src/lib/config.js */
          <button className="btn btn-gold btn-big" disabled>
            Doneerknop binnenkort actief
          </button>
        )}

        {error && <p className="pay-error">{error}</p>}

        <p className="pay-note">
          Je betaalt veilig via een betaalverzoek, rechtstreeks naar Tom.
          Vul daar hetzelfde bedrag in. Werkt met elke Nederlandse bank,
          niet alleen ING.
        </p>
        <p className="pay-fineprint">Donaties zijn helaas niet fiscaal aftrekbaar</p>
      </div>
    </section>
  )
}
