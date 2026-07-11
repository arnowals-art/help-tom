import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import ProgressCard from './components/ProgressCard.jsx'
import Story from './components/Story.jsx'
import Treatment from './components/Treatment.jsx'
import WhyDonate from './components/WhyDonate.jsx'
import Updates from './components/Updates.jsx'
import FamilyNote from './components/FamilyNote.jsx'
import DonationWall from './components/DonationWall.jsx'
import DonateSection from './components/DonateSection.jsx'
import StickyDonate from './components/StickyDonate.jsx'
import ThankYou from './components/ThankYou.jsx'
import Footer from './components/Footer.jsx'
import ShareButtons from './components/ShareButtons.jsx'
import HeartLine from './components/HeartLine.jsx'
import { ING_URLS } from './lib/config.js'
import { fetchPledges } from './lib/pledges.js'
import { fetchBankStats } from './lib/bank.js'
import { fetchRaised } from './lib/amount.js'
import { DONATIONS } from './data/donations.js'

const GOAL = 100000

export default function App() {
  // Toezeggingen uit de Google Spreadsheet (zie src/lib/config.js)
  const [pledges, setPledges] = useState([])
  // Toezeggingen die deze bezoeker zojuist zelf deed
  const [ownPledges, setOwnPledges] = useState([])
  // Echte bankstand via de bankkoppeling (zie src/lib/bank.js)
  const [bank, setBank] = useState(null)
  // Handmatig ingevoerd bedrag uit amount.json (zie src/lib/amount.js)
  const [raisedOverride, setRaisedOverride] = useState(null)
  const [view, setView] = useState('home')
  const [lastPledge, setLastPledge] = useState(null)
  const [donateVisible, setDonateVisible] = useState(false)

  // De muur toont steunbetuigingen (spreadsheet + eigen toezegging);
  // handmatige aanvullingen uit donations.js tellen overal mee.
  const donations = [...DONATIONS, ...pledges, ...ownPledges]

  // Teller: zodra de bankkoppeling actief is telt de échte bankstand
  // (plus handmatige aanvullingen zoals contant geld); anders de
  // toezeggingen van de site.
  const manualRaised = DONATIONS.reduce((sum, d) => sum + d.amount, 0)
  // const raised = bank
  //   ? bank.raised + manualRaised
  //   : donations.reduce((sum, d) => sum + d.amount, 0)
  const donors = bank ? bank.donors + DONATIONS.length : donations.length

  // Het getoonde "opgehaald"-bedrag komt uit amount.json. Dat bestand
  // bestaat ALLEEN op de gh-pages-branch (de live site), NIET in deze
  // repo/main en dus ook niet lokaal. Daarom:
  //   - live (gh-pages): raisedOverride = het bedrag uit amount.json
  //   - lokaal / als amount.json ontbreekt: raisedOverride blijft null
  //     → terugval op een streepje ("—") in de teller.
  // Het bedrag bijwerken doe je door raised in amount.json op de
  // gh-pages-branch aan te passen (zie CLAUDE.md), niet in de code.
  const raised = raisedOverride

  useEffect(() => {
    fetchPledges().then((list) => list.length && setPledges(list))
    fetchBankStats().then(setBank)
    fetchRaised().then((value) => value != null && setRaisedOverride(value))
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
    // Een herhaalde poging (bijv. na een mislukte betaling) telt
    // niet nog een keer mee.
    if (!pledge.duplicate) {
      setOwnPledges((prev) => [...prev, pledge])
    }
    setLastPledge(pledge)
    setView('thanks')
    window.scrollTo(0, 0)
  }

  // Een achtergelaten bericht verschijnt meteen bij de steunbetuigingen,
  // zonder paginawissel (de donatie zelf loopt via de bankrekening).
  const handleMessagePosted = (msg) => {
    setOwnPledges((prev) => [...prev, msg])
  }

  if (view === 'thanks') {
    return (
      <ThankYou
        amount={lastPledge?.amount}
        ingOpened={lastPledge?.ingOpened}
        payUrl={lastPledge?.payUrl}
        prefilled={lastPledge?.prefilled}
        duplicate={lastPledge?.duplicate}
        transfer={lastPledge?.transfer}
        onBack={() => {
          setView('home')
          window.scrollTo(0, 0)
        }}
      />
    )
  }

  return (
    <>
      {!ING_URLS.open && (
        <div className="demo-note">
          Voorbeeldversie: de doneerknop staat nog niet aan. Er kan nog geen
          geld worden overgemaakt.
        </div>
      )}

      <Hero />
      <ProgressCard
        raised={raised}
        goal={GOAL}
        donors={donors}
      />
      <FamilyNote />
      <Story />
      <HeartLine className="heartline-divider" color="#1B3A6B" />
      <Treatment />
      <WhyDonate />
      <HeartLine className="heartline-divider" color="#1B3A6B" />
      <Updates />
      <DonationWall donations={donations} />
      <DonateSection onMessagePosted={handleMessagePosted} />

      <div className="share-section">
        <div className="container narrow">
          <h2>Deel deze pagina</h2>
          <p>
            Wil je deze pagina delen? Dat kan met de onderstaande links.
          </p>
          <ShareButtons />
        </div>
      </div>

      <Footer />
      <StickyDonate raised={raised} goal={GOAL} hidden={donateVisible} />
    </>
  )
}
