import { useState } from 'react'
import { formatEuro } from '../lib/format.js'

const PRESETS = [10, 25, 50, 100]

export default function DonateSection({ onDonate, processing }) {
  const [selected, setSelected] = useState(25)
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
    onDonate(amount, { name: name.trim(), message: message.trim() })
  }

  return (
    <section className="donate" id="doneer">
      <div className="container narrow">
        <span className="section-label">Doneren</span>
        <h2 className="section-title">Help mee met de behandeling</h2>
        <p className="donate-sub">
          Alles wat je kunt missen helpt ons om het bedrag bij elkaar te
          krijgen. Dank je wel.
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
            maxLength={50}
            placeholder="Je naam (mag leeg blijven, dan sta je er als Anoniem)"
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

        <button
          className="btn btn-gold btn-big"
          onClick={handleDonate}
          disabled={processing}
        >
          {processing
            ? 'Even geduld...'
            : `Doneer ${amount && !Number.isNaN(amount) && amount >= 1 ? formatEuro(amount) : ''}`}
        </button>

        {error && <p className="pay-error">{error}</p>}

        <p className="pay-note">Veilig betalen via iDEAL, creditcard of PayPal</p>
        <p className="pay-fineprint">Donaties zijn helaas niet fiscaal aftrekbaar</p>
      </div>
    </section>
  )
}
