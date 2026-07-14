import Footer from './Footer.jsx'
import HeartLine from './HeartLine.jsx'
import ShareButtons from './ShareButtons.jsx'
import { UPDATES } from './Updates.jsx'

// De layout van één update-pagina. De inhoud komt uit het paginabestand
// in src/pages/:
//   chip   tekst in het bolletje boven de titel (bijv. "Update · 14 juli")
//   title  de kop
//   intro  korte inleiding onder de kop
//   photo  { src, alt }  optionele foto onder de titel
//   body   de tekst van de update zelf
// De slug van deze pagina komt uit de URL (update-14-juli-2026.html →
// 'update-14-juli-2026'), zodat we deze update niet nóg een keer tonen in
// de lijst met andere updates onderaan.
function currentSlug() {
  if (typeof window === 'undefined') return ''
  const file = window.location.pathname.split('/').pop() ?? ''
  return file.replace(/\.html$/, '')
}

export default function UpdatePost({ meta, photo, chip, title, intro, body }) {
  const slug = currentSlug()
  const others = UPDATES.filter((u) => u.slug !== slug).slice(0, 3)

  // De deeltekst komt uit de `meta` van de pagina, zodat WhatsApp dezelfde
  // tekst toont als de linkpreview. De URL bepaalt ShareButtons zelf.
  const shareText = `${meta?.ogTitle ?? meta?.title ?? title}${
    meta?.ogDescription ? ` — ${meta.ogDescription}` : ''
  }\n\nLees de update: `

  return (
    <>
      <header className="post-hero">
        <div className="container narrow post-hero-inner">
          <a className="post-back" href="/">
            ← Terug naar de homepagina
          </a>

          {chip && <span className="hero-chip">{chip}</span>}
          <h1>{title}</h1>
          {intro && <div className="hero-sub post-intro">{intro}</div>}

          {photo && (
            <div className="post-photo">
              <img className="site-photo" src={photo.src} alt={photo.alt} />
            </div>
          )}
        </div>

        <div className="heartline-wrap">
          <HeartLine />
        </div>
      </header>

      <article className="post-body">
        <div className="container narrow prose">{body}</div>
      </article>

      <section className="post-help">
        <div className="container narrow">
          <h2>Deel deze update</h2>
          <ShareButtons text={shareText} title={meta?.ogTitle ?? meta?.title ?? title} />
        </div>
      </section>

      {others.length > 0 && (
        <section className="post-more">
          <div className="container narrow">
            <span className="section-label">Updates</span>
            <h2 className="section-title">Andere updates</h2>
            <div className="timeline">
              {others.map((u) => (
                <div className="timeline-item" key={u.date}>
                  <span className="timeline-date">{u.date}</span>
                  {u.text}
                  {u.slug && (
                    <a className="timeline-link" href={`./${u.slug}.html`}>
                      Lees deze update op een eigen pagina →
                    </a>
                  )}
                </div>
              ))}
            </div>
            <a className="timeline-link post-more-all" href="./index.html#updates">
              Alle updates →
            </a>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
