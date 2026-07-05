import { useEffect, useRef, useState } from 'react'
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
import { startMolliePayment, DEMO_MODE } from './lib/mollie.js'

const GOAL = 150000

// Donaties worden lokaal bewaard zodat de demo-flow werkt.
// LET OP: zodra Mollie live staat, hoort de echte stand uit je
// backend te komen (zie uitleg in src/lib/mollie.js, stap 3).
const STORAGE_KEY = 'help-tom-donaties'

function loadDonations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      // Oud formaat ({raised, donors}) of nieuw formaat (array)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    /* opnieuw beginnen bij corrupte data */
  }
  return []
}

export default function App() {
  const [donations, setDonations] = useState(loadDonations)
  const [view, setView] = useState('home')
  const [lastAmount, setLastAmount] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [donateVisible, setDonateVisible] = useState(false)

  const raised = donations.reduce((sum, d) => sum + d.amount, 0)
  const donors = donations.length

  // Als Mollie na een echte betaling terugstuurt naar /?bedankt=1
  // tonen we meteen de bedankpagina.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('bedankt') === '1') {
      setView('thanks')
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // Buiten demo-modus komt de echte lijst donaties van je backend
  // (gevuld door de Mollie-webhook, zie src/lib/mollie.js stap 3).
  useEffect(() => {
    if (DEMO_MODE) return
    fetch('/api/donations')
      .then((res) => (res.ok ? res.json() : []))
      .then((list) => Array.isArray(list) && setDonations(list))
      .catch(() => {
        /* backend nog niet beschikbaar; teller blijft op 0 */
      })
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

  const addDonation = (donation) => {
    setDonations((prev) => {
      const next = [...prev, donation]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const handleDonate = async (amount, { name = '', message = '' } = {}) => {
    setProcessing(true)
    try {
      const result = await startMolliePayment(amount, { name, message })
      if (result.demo) {
        // Demo-modus: betaling gesimuleerd, donatie direct toevoegen.
        addDonation({ amount, name, message, timestamp: Date.now() })
        setLastAmount(amount)
        setView('thanks')
        window.scrollTo(0, 0)
      }
      // Bij een echte betaling stuurt startMolliePayment de bezoeker
      // door naar Mollie; de bedankpagina volgt via /?bedankt=1.
    } catch {
      alert('Er ging iets mis bij het starten van de betaling. Probeer het opnieuw.')
    } finally {
      setProcessing(false)
    }
  }

  if (view === 'thanks') {
    return (
      <ThankYou
        amount={lastAmount}
        onBack={() => {
          setView('home')
          window.scrollTo(0, 0)
        }}
      />
    )
  }

  return (
    <>
      {DEMO_MODE && (
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
      <DonateSection onDonate={handleDonate} processing={processing} />

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
