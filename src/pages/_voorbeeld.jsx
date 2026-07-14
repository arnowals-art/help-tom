import { renderUpdatePage } from '../lib/render-page.jsx'

// ===========================================================================
// SJABLOON — dit is géén pagina op de site.
//
// Bestanden in src/pages/ die met een _ beginnen worden overgeslagen bij het
// bouwen. Dit bestand staat er dus alleen als voorbeeld: het laat alle
// onderdelen zien die je in een update kunt gebruiken.
//
// Een nieuwe update maken:
// 1. Kopieer dit bestand naar src/pages/<naam-van-de-update>.jsx (zonder _).
//    De bestandsnaam is meteen de URL:
//    src/pages/update-1-augustus-2026.jsx  →  helptom.nl/update-1-augustus-2026.html
// 2. Pas `meta` en de inhoud hieronder aan, en gooi weg wat je niet gebruikt.
// 3. Zet de update ook bovenaan in de lijst in src/components/Updates.jsx,
//    met `slug: '<naam-van-de-update>'` (dus de bestandsnaam zonder .jsx).
//    Dan verschijnt hij op de homepage met een link naar deze pagina.
// Meer hoeft niet: de HTML-pagina wordt automatisch gemaakt.
// ===========================================================================

// `meta` komt in de <head>: browsertabblad, Google, en de preview op
// WhatsApp/Facebook. Alleen tekst, geen variabelen of berekeningen.
export const meta = {
  title: 'Update 14 juli 2026 — Help Tom',
  description:
    'De vertrekdatum naar Israël is definitief: zaterdag 25 juli. Het verblijf duurt ongeveer 10 weken.',
  ogTitle: 'Update 14 juli: vertrekdatum definitief op 25 juli',
  ogDescription:
    'De vertrekdatum naar Israël staat vast en het verblijf duurt langer dan gedacht: ongeveer 10 weken.',
  // ogImage: 'https://helptom.nl/familiefoto.jpg',  // standaard: og-familiefoto.jpg
}

renderUpdatePage({
  // Geef `meta` mee: dan gebruiken de deelknoppen dezelfde tekst als de
  // linkpreview op WhatsApp/Facebook.
  meta,

  // Het bolletje boven de titel.
  chip: 'Update · 14 juli 2026',

  // De kop van de pagina.
  title: 'Vertrekdatum definitief: zaterdag 25 juli',

  // Korte inleiding onder de kop. Weglaten mag.
  intro: (
    <p>
      De vertrekdatum naar Israël staat vast en het verblijf duurt langer dan gedacht: ongeveer 10
      weken.
    </p>
  ),

  // Foto onder de titel. Het bestand zet je in de map public/ en je verwijst
  // ernaar zonder pad, dus 'familiefoto.jpg'. Weglaten mag ook.
  photo: {
    src: 'familiefoto.jpg',
    alt: 'Tom met zijn familie',
  },

  // De tekst van de update. Hieronder staan alle onderdelen die je kunt
  // gebruiken — gooi weg wat je niet nodig hebt.
  body: (
    <>
      {/* De eerste alinea wordt automatisch groter weergegeven (de inleiding). */}
      <p>De vertrekdatum naar Israël is definitief vastgesteld op zaterdag 25 juli in de avond.</p>

      <p>
        Het verblijf zal naar verwachting ongeveer 10 weken duren in plaats van de eerder genoemde 7
        weken. De reden hiervoor is dat pa's medicatie de eerste drie weken onder begeleiding van het
        ziekenhuis moet worden afgebouwd. Pas daarna kan de behandeling worden{' '}
        <strong>gestart</strong>.
      </p>

      {/* Tussenkop */}
      <h2>Wat er al geregeld is</h2>

      {/* Opsomming zonder nummers */}
      <ul>
        <li>Paspoorten zijn geregeld</li>
        <li>Tickets zijn geboekt</li>
        <li>Er is een onderkomen gevonden voor Tom en zijn begeleiders</li>
      </ul>

      {/* Opsomming met nummers */}
      <h3>Hoe de eerste weken eruitzien</h3>
      <ol>
        <li>Week 1: aankomst en direct de eerste onderzoeken.</li>
        <li>Week 1 t/m 3: afbouwen van de medicatie onder begeleiding van het ziekenhuis.</li>
        <li>Week 3: opname in het Sheba Medical Center.</li>
      </ol>

      {/* Citaat */}
      <blockquote>
        <p>"Ik wil er zijn als mijn kleinkinderen opgroeien."</p>
        <cite>Tom</cite>
      </blockquote>

      {/* Kadertje om iets uit te lichten */}
      <div className="post-callout">
        <p>
          Ken je iemand die kan helpen met vervoer of verblijf in Israël? Mail dan naar{' '}
          <a href="mailto:arnowals@icloud.com">arnowals@icloud.com</a>.
        </p>
      </div>

      {/* Foto middenin het artikel, met bijschrift */}
      <figure>
        <img className="site-photo" src="kringloop.jpg" alt="De kringloopactie voor Tom" />
        <figcaption>De kringloopactie bracht de eerste bijdragen op.</figcaption>
      </figure>

      <p>
        We houden jullie op de hoogte via deze pagina. Dank voor alle steun tot nu toe — het maakt
        echt verschil.
      </p>
    </>
  ),
})
