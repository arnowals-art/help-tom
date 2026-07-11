import { useState } from 'react'
import { submitPledge } from '../lib/pledges.js'

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
        <span className="section-label">Dank jullie wel</span>
        <h2 className="section-title">Samen hebben we het gered</h2>
        <p className="donate-sub">
          <span>Na de Heere willen wij iedereen heel hartelijk bedanken voor jullie medeleven en bovenal voor het gebed.</span>
          <span>In vier dagen tijd is het ongelofelijke bedrag van €100.000 opgehaald. We zijn er stil van en diep dankbaar.</span>
          <span>Voor verdere updates over de behandeling in Israel kunt u deze website blijven volgen.</span>
        </p>

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
