import ShareButtons from './ShareButtons.jsx'
import IbanBlock from './IbanBlock.jsx'
import { formatEuro } from '../lib/format.js'
import { ING_URLS } from '../lib/config.js'

export default function ThankYou({
  amount,
  ingOpened,
  payUrl,
  prefilled,
  duplicate,
  transfer,
  onBack,
}) {
  return (
    <div className="thanks">
      <div className="thanks-card">
        <h1>Dank je wel.</h1>

        {transfer ? (
          <>
            <p>
              {amount
                ? `Maak je donatie van ${formatEuro(amount)} over op:`
                : 'Maak je donatie over op:'}
            </p>
            <IbanBlock />
          </>
        ) : (
          <>
            <p>
              {ingOpened
                ? 'Het betaalscherm van ING is in een nieuw tabblad geopend.'
                : 'Het betaalscherm van ING kon niet automatisch openen.'}{' '}
              {amount
                ? `Rond je donatie van ${formatEuro(amount)} daar af.${prefilled ? ' Het bedrag staat al voor je klaar.' : ' Vul hetzelfde bedrag in.'}`
                : 'Rond je donatie daar af.'}
            </p>
            {!ingOpened && (
              <p>
                <a
                  className="btn btn-gold"
                  href={payUrl || ING_URLS.open}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open het ING-betaalscherm
                </a>
              </p>
            )}
            <p className="thanks-retry">
              Betaling mislukt of afgebroken?{' '}
              <a href={payUrl || ING_URLS.open} target="_blank" rel="noreferrer">
                Probeer het hier opnieuw
              </a>
              . Je komt niet dubbel op de teller.
            </p>
          </>
        )}

        {duplicate && (
          <p className="thanks-retry-note">
            Je eerdere poging stond al genoteerd, dus je telt niet dubbel
            mee.
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
