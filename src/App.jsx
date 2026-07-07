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
import ThankYou from './components/ThankYou.jsx'
import Footer from './components/Footer.jsx'
import ShareButtons from './components/ShareButtons.jsx'
import HeartLine from './components/HeartLine.jsx'
import { ING_URL } from './lib/config.js'
import { fetchPledges } from './lib/pledges.js'
import { DONATIONS } from './data/donations.js'

const GOAL = 150000

export default function App() {
  // Toezeggingen uit de Google Spreadsheet (zie src/lib/config.js)
  const [pledges, setPledges] = useState([])
  // Toezeggingen die deze bezoeker zojuist zelf deed
  const [ownPledges, setOwnPledges] = useState([])
  const [view, setView] = useState('home')
  const [lastPledge, setLastPledge] = useState(null)
  const [donateVisible, setDonateVisible] = useState(false)

  // Handmatige correcties/aanvullingen + spreadsheet + eigen toezeggingen
  const donations = [...DONATIONS, ...pledges, ...ownPledges]
  const raised = donations.reduce((sum, d) => sum + d.amount, 0)
  const donors = donations.length

  useEffect(() => {
    fetchPledges().then((list) => list.length && setPledges(list))
  }, [])

  // Verberg de sticky doneerbalk zodra de doneersectie in beeld is.
  useEffect(() => {
    if (view !== 'home') return
    const el = document.getElementById('doneer')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setDonateVisible(entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [view])

  const handlePledged = (pledge) => {
    setOwnPledges((prev) => [...prev, pledge])
    setLastPledge(pledge)
    setView('thanks')
    window.scrollTo(0, 0)
  }

  if (view === 'thanks') {
    return (
      <ThankYou
        amount={lastPledge?.amount}
        ingOpened={lastPledge?.ingOpened}
        onBack={() => {
          setView('home')
          window.scrollTo(0, 0)
        }}
      />
    )
  }

  return (
    <>
      {!ING_URL && (
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
      <DonationWall donations={donations} />
      <DonateSection onPledged={handlePledged} />

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
