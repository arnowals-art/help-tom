import { useRef, useState } from 'react'

const ArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
)

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

const quotes = [
  {
    paragraphs: [
      'Na de Heere willen wij iedereen heel hartelijk bedanken voor jullie medeleven en bovenal voor het gebed.',
      'In vier dagen tijd is het ongelofelijke bedrag van €100.000 opgehaald. We zijn er stil van en diep dankbaar.',
      'De donatieknop hebben we inmiddels verwijderd. Voor verdere updates over de behandeling in Israel kunt u deze website blijven volgen.',
    ],
  },
  {
    image: {
      src: 'kringloop.jpg',
      alt: 'Kringloopwinkel in Geldermalsen',
    },
    paragraphs: [
      'Het is ongelofelijk hoeveel mensen er doneren voor de behandeling van onze vader. Vandaag wordt zelfs de opbrengst van de kringloop in Geldermalsen gedoneerd ten behoeve van de behandeling. Heel hartelijk dank iedereen ❤️',
    ],
  },
  {
    caption: 'Arno & familie Wals 🍀',
    paragraphs: [
      'Papa wordt stil als hij ziet hoeveel mensen voor hem klaarstaan. Wat een geweldige mensen hebben we om ons heen. Zelfs mensen die pa niet kennen, staan voor hem klaar. Dat is echte naastenliefde.',
      'Heel hartelijk dank aan iedereen die heeft gedoneerd of gedeeld. Jullie betekenen meer dan jullie weten.',
    ],
  },
]

export default function FamilyNote() {
  const [index, setIndex] = useState(0)

  const go = (delta) => {
    setIndex((current) => Math.min(quotes.length - 1, Math.max(0, current + delta)))
  }

  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const touch = useRef({ x: 0, y: 0, active: false, horizontal: null })

  const onTouchStart = (e) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY, active: true, horizontal: null }
    setDragging(true)
  }

  const onTouchMove = (e) => {
    if (!touch.current.active) return
    const t = e.touches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    if (touch.current.horizontal === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      touch.current.horizontal = Math.abs(dx) > Math.abs(dy)
    }
    if (!touch.current.horizontal) return
    // wrijving aan de randen
    const atEdge = (index === 0 && dx > 0) || (index === quotes.length - 1 && dx < 0)
    setDrag(atEdge ? dx / 3 : dx)
  }

  const onTouchEnd = () => {
    if (!touch.current.active) return
    touch.current.active = false
    setDragging(false)
    const threshold = 50
    if (drag <= -threshold) go(1)
    else if (drag >= threshold) go(-1)
    setDrag(0)
  }

  return (
    <section id="bericht-familie">
      <div className="container family-note-wrap">
        <div className="quote-carousel">
          <button
            type="button"
            className="quote-nav quote-nav-prev"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Vorige bericht"
          >
            <ArrowLeft />
          </button>

          <div className="quote-viewport">
            <div
              className={`quote-track${dragging ? ' is-dragging' : ''}`}
              style={{
                transform: `translateX(calc(${index} * (-100% - var(--quote-pad)) + ${drag}px))`,
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {quotes.map((quote, i) => (
                <figure
                  className={`family-note quote-slide${quote.image ? ' has-image' : ''}`}
                  key={i}
                  aria-hidden={i !== index}
                >
                  <div className="quote-body">
                    <blockquote>
                      {quote.paragraphs.map((text, p) => (
                        <p key={p}>{text}</p>
                      ))}
                    </blockquote>
                    {quote.caption ? <figcaption>{quote.caption}</figcaption> : null}
                  </div>
                  {quote.image && (
                    <div className="quote-image">
                      <img src={quote.image.src} alt={quote.image.alt} />
                    </div>
                  )}
                </figure>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="quote-nav quote-nav-next"
            onClick={() => go(1)}
            disabled={index === quotes.length - 1}
            aria-label="Volgende bericht"
          >
            <ArrowRight />
          </button>

          <div className="quote-dots" role="tablist" aria-label="Berichten">
            {quotes.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`quote-dot${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Bericht ${i + 1}`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
