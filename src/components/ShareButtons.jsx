import { useState } from 'react'

// TODO: vervang door het echte domein zodra de site live staat.
const SITE_URL = 'https://helptom.nl'
const SHARE_TEXT =
  'Mijn vader Tom (59) heeft sclerodermie. In Nederland komt hij niet in ' +
  'aanmerking voor de behandeling die hem kan helpen, in Israël wel. We ' +
  'proberen het geld samen bij elkaar te krijgen. Lees zijn verhaal: '

// `text` en `title` zijn de tekst waarmee de pagina gedeeld wordt. Zonder
// die props delen we het verhaal van de campagne (de homepage).
export default function ShareButtons({ text = SHARE_TEXT, title = 'Help Tom' }) {
  const [copied, setCopied] = useState(false)

  // Volledige URL inclusief pad (belangrijk op bijv. GitHub Pages,
  // waar de site op een subpad staat).
  const url = typeof window !== 'undefined' && window.location.origin.startsWith('http')
    ? window.location.origin + window.location.pathname
    : SITE_URL

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Fallback voor oudere browsers
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Instagram heeft geen web-deellink; we kopiëren de link zodat
  // mensen hem in hun story of bio kunnen plakken.
  const shareInstagram = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch {
        /* gebruiker annuleerde — val terug op kopiëren */
      }
    }
    copyLink()
  }

  return (
    <div className="share-row">
      <a
        className="share-btn"
        href={`https://wa.me/?text=${encodeURIComponent(text + url)}`}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <a
        className="share-btn"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
      <button className="share-btn" onClick={shareInstagram}>
        Instagram
      </button>
      <button className="share-btn" onClick={copyLink}>
        {copied ? 'Link gekopieerd' : 'Kopieer link'}
      </button>
    </div>
  )
}
