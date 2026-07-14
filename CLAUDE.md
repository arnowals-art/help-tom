# CLAUDE.md

## Nieuwe update-pagina ("ik wil een nieuwe post/update-pagina")

Als de gebruiker om een nieuwe update- of postpagina vraagt, doe je precies dit.
Vraag eerst naar de inhoud (datum, titel, tekst, eventueel een foto) als die nog
ontbreekt.

**Stap 1 — paginabestand aanmaken.** Kopieer `src/pages/_voorbeeld.jsx` (het
sjabloon; bestanden met een `_` ervoor worden niet gebouwd en zijn dus géén
pagina op de site) naar `src/pages/<slug>.jsx`. De bestandsnaam ís de URL:
`src/pages/update-1-augustus-2026.jsx` → `helptom.nl/update-1-augustus-2026.html`.
Gebruik een slug met de datum erin, in kleine letters met streepjes.

**Stap 2 — inhoud invullen** in dat nieuwe bestand:

```jsx
import { renderUpdatePage } from '../lib/render-page.jsx'

// Komt in de <head>: browsertabblad, Google en de linkpreview op WhatsApp/Facebook.
// Moet een pure object-literal met tekst blijven — geen variabelen of berekeningen,
// want plugins/update-pages.js leest dit uit de broncode.
export const meta = {
  title: 'Update 1 augustus 2026 — Help Tom',
  description: 'Korte samenvatting voor Google.',
  ogTitle: 'Titel zoals hij in WhatsApp verschijnt',
  ogDescription: 'Tekst zoals hij in WhatsApp verschijnt.',
  // ogImage: 'https://helptom.nl/familiefoto.jpg',   // standaard: og-familiefoto.jpg
}

renderUpdatePage({
  meta,                              // hiermee delen de deelknoppen dezelfde tekst
  chip: 'Update · 1 augustus 2026',  // bolletje boven de titel
  title: 'De kop van de update',
  intro: <p>Korte inleiding onder de kop.</p>,          // mag weg
  photo: { src: 'familiefoto.jpg', alt: 'Tom met zijn familie' },  // mag weg
  body: <>...</>,                    // de tekst van de update
})
```

**Stap 3 — de update op de homepage zetten.** Voeg hem bovenaan toe in de
`UPDATES`-lijst in `src/components/Updates.jsx`, met
`slug: '<bestandsnaam zonder .jsx>'`. Daardoor verschijnt de update in de tijdlijn
op de homepage met een link naar de detailpagina, en wordt hij op de detailpagina
zelf uit "Andere updates" gefilterd (de slug wordt uit de URL afgeleid).

**Wat je NIET hoeft te doen:** geen HTML-bestand maken en niets in
`vite.config.js` aanpassen. `plugins/update-pages.js` scant `src/pages/`, leest
`meta` en genereert de HTML-pagina (titel, description, Open Graph) automatisch
bij `npm run dev` en `npm run build`. De gegenereerde `*.html` in de projectmap
staan in `.gitignore` — niet committen, niet met de hand bewerken.

**Body-elementen** (staan allemaal als voorbeeld in `src/pages/_voorbeeld.jsx`):
alinea's (de eerste wordt automatisch groter als lead), `<strong>`, `<h2>`/`<h3>`,
`<ul>`/`<ol>`, `<blockquote>` met `<cite>`, een uitgelicht kadertje
`<div className="post-callout">`, en een `<figure>` met
`<img className="site-photo">` + `<figcaption>` voor een foto middenin het artikel.

**Foto's** zet je in `public/` en verwijs je aan zonder pad, dus
`src="familiefoto.jpg"`.

**Controleren:** draai `npm run build` (of `npm run dev`) en check dat
`dist/<slug>.html` bestaat.
