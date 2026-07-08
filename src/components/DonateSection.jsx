import { useState } from 'react'
import { submitPledge } from '../lib/pledges.js'
import { IBAN, IBAN_DISPLAY, IBAN_NAME } from './IbanBlock.jsx'

// Kopieerbaar veld: klik = waarde naar klembord, met korte bevestiging.
function CopyRow({ label, value, copyValue }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* kopiëren niet beschikbaar — de waarde staat er leesbaar */
    }
  }

  return (
    <button type="button" className="bank-row" onClick={copy}>
      <span className="bank-row-text">
        <span className="bank-label">{label}</span>
        <span className="bank-value">{value}</span>
      </span>
      <span className="bank-copy">{copied ? 'Gekopieerd ✓' : 'Kopieer'}</span>
    </button>
  )
}

export default function DonateSection({ onMessagePosted }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    // Alleen een berichtje — geen bedrag. De donatie zelf maakt de
    // bezoeker over via de bankrekening hierboven.
    submitPledge({ name, message })
    onMessagePosted?.({
      name,
      message,
      date: '',
      timestamp: Date.now(),
    })
    setSent(true)
  }

  return (
    <section className="donate" id="doneer">
      <div className="container narrow">
        <span className="section-label">Doneren</span>
        <h2 className="section-title">Help mee met de behandeling</h2>
        <p className="donate-sub">
          Je maakt je bijdrage rechtstreeks over naar onderstaande rekening.
          Elk bedrag helpt — dank je wel.
        </p>

        <div className="bank-card">
          <CopyRow
            label="Rekeningnummer (IBAN)"
            value={IBAN_DISPLAY}
            copyValue={IBAN}
          />
          <CopyRow
            label="Ten name van"
            value={IBAN_NAME}
            copyValue={IBAN_NAME}
          />
        </div>

        <p className="pay-fineprint">Donaties zijn helaas niet fiscaal aftrekbaar.</p>

        <div className="message-form">
          <h3 className="message-title">Bericht achterlaten</h3>
          <p className="donate-sub">
            Laat een bemoediging achter voor Tom en de familie. Je bericht
            verschijnt bij de steunbetuigingen.
          </p>

          {sent ? (
            <p className="message-thanks">Bedankt voor je bericht 💛</p>
          ) : (
            <>
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
                  placeholder="Bericht voor Tom en de familie"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                className="btn btn-gold btn-big"
                onClick={handleSend}
                disabled={!name.trim() && !message.trim()}
              >
                Plaats bericht
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
