import ShareButtons from './ShareButtons.jsx'
import { formatEuro } from '../lib/format.js'
import { DEMO_MODE } from '../lib/mollie.js'

export default function ThankYou({ amount, onBack }) {
  return (
    <div className="thanks">
      <div className="thanks-card">
        {DEMO_MODE && (
          <p className="thanks-demo">
            Let op: dit is nog de voorbeeldversie. Er is géén geld
            afgeschreven.
          </p>
        )}
        <h1>Dank je wel.</h1>
        <p>
          {amount
            ? `Je donatie van ${formatEuro(amount)} is binnen.`
            : 'Je donatie is binnen.'}{' '}
          Dank je wel, ook namens mijn vader en moeder.
        </p>
        <p>
          Zou je deze pagina ook willen doorsturen? Zo bereiken we meer
          mensen dan we zelf kennen.
        </p>
        <ShareButtons />
        <button className="btn btn-outline" onClick={onBack}>
          Terug naar de pagina
        </button>
      </div>
    </div>
  )
}
