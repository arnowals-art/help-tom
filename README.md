# Help Tom — crowdfunding website

Crowdfundingpagina voor Tom Wals (59, Geldermalsen) om zijn CAR-T
celtherapie bij het Sheba Medical Center in Israël mogelijk te maken.
Doelbedrag: €100.000 (totale kosten incl. reis ca. €150.000).

**Live:** https://arnowals-art.github.io/help-tom/

## Starten

```bash
npm install
npm run dev        # lokaal bekijken op http://localhost:5173
npm run build      # productie-build in /dist
```

## Wijzigingen online zetten

```bash
npm run build && npx gh-pages -d dist
```

Na een minuut of twee staat de nieuwe versie op de live-link.
(Commit en push daarnaast je wijzigingen naar GitHub: `git add -A &&
git commit -m "..." && git push`.)

## Voordat je de link breed deelt — checklist

1. **ING betaalverzoek instellen**
   - Maak in de ING-app een betaalverzoek (bedrag open laten,
     geldigheid op maximum) en plak de link in `src/lib/config.js`
     (daar staat de uitleg)
   - LET OP: een ING betaalverzoek verloopt — zet een herinnering
     om hem op tijd te vervangen
   - Zolang de link leeg is, toont de site "doneerknop staat nog
     niet aan"

2. **Familiefoto's toevoegen**
   - Zet de foto's in de map `public/` (bijv. `familiefoto.jpg` en `tom.jpg`)
   - Vervang de placeholders in `src/components/Hero.jsx` en
     `src/components/Story.jsx` (de comments in die bestanden leggen uit hoe)
   - Zet ook een foto van 1200×630 px als `public/og-familiefoto.jpg` —
     die verschijnt als voorbeeld bij het delen op WhatsApp/Facebook

3. **Automatische teller aanzetten (Google Formulier + Spreadsheet)**
   - Bezoekers kiezen eerst hun bedrag op de site en gaan daarna pas
     naar het ING-betaalscherm; die toezegging komt automatisch in
     een Google Spreadsheet en de site leest die weer uit
   - Eenmalig instellen (±10 minuten): volg het stappenplan in
     `src/lib/config.js`
   - Beheer: klopt een toezegging niet met wat er echt binnenkomt in
     de ING-app? Verwijder of corrigeer die rij in de spreadsheet —
     de site past zich vanzelf aan (geen her-deploy nodig)
   - Donaties buiten de site om (overschrijving, contant) voeg je toe
     in `src/data/donations.js`

4. **Domein (optioneel)**
   - Wil je een eigen domein zoals helptom.nl? Koppel het in de
     GitHub-repo onder Settings → Pages → Custom domain
   - Vervang daarna ook `https://helptom.nl` in
     `src/components/ShareButtons.jsx`

## Later upgraden naar Mollie (automatische teller)

In `src/lib/mollie.js` staat een compleet stappenplan voor echte
iDEAL/creditcard/PayPal-betalingen via Mollie, inclusief webhook
waarmee de teller en de muur automatisch bijgewerkt worden. Dat
vraagt een klein backend-endpoint; de frontend-code is er al op
voorbereid.

## Structuur

- `src/App.jsx` — hoofdcomponent, teller
- `src/lib/config.js` — de doneerlink (ING betaalverzoek)
- `src/data/donations.js` — handmatig bijgehouden donatielijst
- `src/components/` — alle secties (hero, verhaal, behandeling, doneer, …)
- `src/index.css` — alle styling (kleuren bovenin als CSS-variabelen)

Deze pagina is opgezet door Arno Wals, zoon van Tom.
