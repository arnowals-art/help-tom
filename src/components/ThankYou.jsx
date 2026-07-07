import ShareButtons from './ShareButtons.jsx'
import { formatEuro } from '../lib/format.js'
import { ING_URL } from '../lib/config.js'

export default function ThankYou({ amount, ingOpened, onBack }) {
  return (
    <div className="thanks">
      <div className="thanks-card">
        <h1>Dank je wel.</h1>
        <p>
          {ingOpened
            ? 'Het betaalscherm van ING is in een nieuw tabblad geopend.'
            : 'Het betaalscherm van ING kon niet automatisch openen.'}{' '}
          {amount
            ? `Rond je donatie van ${formatEuro(amount)} daar af — vul hetzelfde bedrag in.`
            : 'Rond je donatie daar af.'}
        </p>
        {!ingOpened && (
          <p>
            <a className="btn btn-gold" href={ING_URL} target="_blank" rel="noreferrer">
              Open het ING-betaalscherm
            </a>
          </p>
        )}
        <p>
          Je staat zo bij de steunbetuigingen op de pagina. Dank je wel,
          ook namens mijn vader en moeder.
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
