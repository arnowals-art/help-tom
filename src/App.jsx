import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import ProgressCard from './components/ProgressCard.jsx'
import Story from './components/Story.jsx'
import Treatment from './components/Treatment.jsx'
import WhyDonate from './components/WhyDonate.jsx'
import Updates from './components/Updates.jsx'
import DonationWall from './components/DonationWall.jsx'
import DonateSection from './components/DonateSection.jsx'
import StickyDonate from './components/StickyDonate.jsx'
import Footer from './components/Footer.jsx'
import ShareButtons from './components/ShareButtons.jsx'
import HeartLine from './components/HeartLine.jsx'
import { TIKKIE_URL, ING_URL } from './lib/config.js'
import { DONATIONS } from './data/donations.js'

const GOAL = 150000

export default function App() {
  const [donateVisible, setDonateVisible] = useState(false)

  // Teller en muur komen uit de handmatig bijgehouden lijst
  // in src/data/donations.js (zie de uitleg in dat bestand).
  const raised = DONATIONS.reduce((sum, d) => sum + d.amount, 0)
  const donors = DONATIONS.length

  // Verberg de sticky doneerbalk zodra de doneersectie in beeld is.
  useEffect(() => {
    const el = document.getElementById('doneer')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setDonateVisible(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {!TIKKIE_URL && !ING_URL && (
        <div className="demo-note">
          Voorbeeldversie: de doneerknop staat nog niet aan. Er kan nog geen
          geld worden overgemaakt.
        </div>
      )}

      <Hero />
      <ProgressCard raised={raised} goal={GOAL} donors={donors} />
      <Story />
      <HeartLine className="heartline-divider" color="#1B3A6B" />
      <Treatment />
      <WhyDonate />
      <HeartLine className="heartline-divider" color="#1B3A6B" />
      <Updates />
      <DonationWall donations={DONATIONS} />
      <DonateSection />

      <div className="share-section">
        <div className="container narrow">
          <h2>Deel deze pagina</h2>
          <p>
            Ken je mensen die zouden willen helpen? Stuur ze deze pagina
            door. Dat helpt net zo goed als een donatie.
          </p>
          <ShareButtons />
        </div>
      </div>

      <Footer />
      <StickyDonate raised={raised} goal={GOAL} hidden={donateVisible} />
    </>
  )
}
