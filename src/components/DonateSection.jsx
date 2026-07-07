import { ING_URL } from '../lib/config.js'

export default function DonateSection() {
  return (
    <section className="donate" id="doneer">
      <div className="container narrow">
        <span className="section-label">Doneren</span>
        <h2 className="section-title">Help mee met de behandeling</h2>
        <p className="donate-sub">
          Alles wat je kunt missen helpt ons om het bedrag bij elkaar te
          krijgen. Dank je wel.
        </p>

        {ING_URL ? (
          <a
            className="btn btn-gold btn-big"
            href={ING_URL}
            target="_blank"
            rel="noreferrer"
          >
            Doneer via ING betaalverzoek
          </a>
        ) : (
          /* De ING-link is nog niet ingesteld — zie src/lib/config.js */
          <button className="btn btn-gold btn-big" disabled>
            Doneerknop binnenkort actief
          </button>
        )}

        <p className="pay-note">
          Je betaalt veilig via iDEAL en kiest zelf je bedrag. Werkt met
          elke Nederlandse bank, niet alleen ING.
        </p>
        <p className="pay-fineprint">
          Wil je met een berichtje bij de steunbetuigingen staan? Mail naar{' '}
          <a href="mailto:arnowals@icloud.com">arnowals@icloud.com</a>, dan
          zetten we het erbij.
        </p>
        <p className="pay-fineprint">Donaties zijn helaas niet fiscaal aftrekbaar</p>
      </div>
    </section>
  )
}
