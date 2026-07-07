# Help Tom — crowdfunding website

Crowdfundingpagina voor Tom Wals (59, Geldermalsen) om zijn CAR-T
celtherapie bij het Sheba Medical Center in Israël mogelijk te maken.
Doelbedrag: €150.000.

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

1. **Doneerlink instellen (Tikkie en/of ING betaalverzoek)**
   - Maak in de Tikkie-app en/of de ING-app een betaalverzoek en
     plak de link(s) in `src/lib/config.js` (daar staat de uitleg)
   - De site toont automatisch een knop voor elke ingevulde link
   - LET OP: een Tikkie is 14 dagen geldig en ook een ING
     betaalverzoek verloopt — zet een herinnering om ze op tijd te
     vervangen
   - Zolang beide links leeg zijn, toont de site "doneerknop staat
     nog niet aan"

2. **Familiefoto's toevoegen**
   - Zet de foto's in de map `public/` (bijv. `familiefoto.jpg` en `tom.jpg`)
   - Vervang de placeholders in `src/components/Hero.jsx` en
     `src/components/Story.jsx` (de comments in die bestanden leggen uit hoe)
   - Zet ook een foto van 1200×630 px als `public/og-familiefoto.jpg` —
     die verschijnt als voorbeeld bij het delen op WhatsApp/Facebook

3. **Teller en steunbetuigingen bijhouden**
   - Tikkie en ING geven niet automatisch aan de site door wie er
     betaald heeft
   - Voeg donaties zelf toe in `src/data/donations.js` (uitleg staat
     in dat bestand) en zet de site opnieuw online
   - De voortgangsbalk en het aantal donateurs rekenen zichzelf uit
   - Wie geen naam wil: laat het naamveld leeg, dan staat er "Anoniem"

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
- `src/lib/config.js` — de doneerlinks (Tikkie / ING betaalverzoek)
- `src/data/donations.js` — handmatig bijgehouden donatielijst
- `src/components/` — alle secties (hero, verhaal, behandeling, doneer, …)
- `src/index.css` — alle styling (kleuren bovenin als CSS-variabelen)

Deze pagina is opgezet door Arno Wals, zoon van Tom.
