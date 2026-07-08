import { useState } from 'react'

export const IBAN = 'NL89INGB0119439174'
export const IBAN_DISPLAY = 'NL89 INGB 0119 4391 74'
export const IBAN_NAME = 'RS Wals'

// Rekeningnummer met kopieerknop. Een IBAN verloopt nooit en kan
// niet vollopen; daarom gebruiken we dit voor "eigen bedrag".
export default function IbanBlock() {
  const [copied, setCopied] = useState(false)

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(IBAN)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* kopiëren niet beschikbaar — het nummer staat er leesbaar */
    }
  }

  return (
    <div className="iban-note">
      <p className="iban-number">
        <strong>{IBAN_DISPLAY}</strong>
        <br />
        t.a.v. {IBAN_NAME}
      </p>
      <button className="share-btn" onClick={copyIban}>
        {copied ? 'IBAN gekopieerd' : 'Kopieer IBAN'}
      </button>
    </div>
  )
}
