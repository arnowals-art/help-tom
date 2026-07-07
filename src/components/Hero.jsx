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
          <p className="hero-cta-note">
            Veilig betalen via betaalverzoek, rechtstreeks naar Tom. Elk
            bedrag helpt.
          </p>
        </div>

        <div className="hero-photo">
          <img
            className="site-photo"
            src="tom-kleinkind.jpg"
            alt="Tom met zijn eerste kleinkind op schoot"
          />
        </div>
      </div>

      <div className="heartline-wrap">
        <HeartLine />
      </div>
    </header>
  )
}
