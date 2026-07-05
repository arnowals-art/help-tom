import HeartLine from './HeartLine.jsx'

export default function Hero() {
  return (
    <header className="hero">
      <div className="container hero-inner">
        <div>
          <h1>Help mijn vader zijn kleinkinderen zien opgroeien</h1>
          <p className="hero-sub">
            Mijn vader Tom (59) heeft sclerodermie. In Nederland en Duitsland
            komt hij niet in aanmerking voor de behandeling die hem kan
            helpen. In Israël wel, maar die moeten we zelf betalen.
          </p>
          <a href="#doneer" className="btn btn-gold btn-big">
            Doneer voor Toms behandeling
          </a>
          <p className="hero-cta-note">Veilig betalen via iDEAL. Elk bedrag helpt.</p>
        </div>

        <div className="hero-photo">
          {/*
            Vervang deze placeholder door de echte familiefoto:
            zet bijv. `familiefoto.jpg` in de map /public en gebruik
            <img src="/familiefoto.jpg" alt="Tom met zijn kleinkind" />
          */}
          <div className="photo-placeholder">
            <strong>Familiefoto</strong>
            <span>
              Plaats hier de foto van Tom met zijn kleinkind
              <br />
              (vervang de placeholder in Hero.jsx)
            </span>
          </div>
        </div>
      </div>

      <div className="heartline-wrap">
        <HeartLine />
      </div>
    </header>
  )
}
