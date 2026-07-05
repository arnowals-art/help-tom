# Help Tom — crowdfunding website

Crowdfundingpagina voor Tom Wals (59, Geldermalsen) om zijn CAR-T
celtherapie bij het Sheba Medical Center in Israël mogelijk te maken.
Doelbedrag: €150.000.

## Starten

```bash
npm install
npm run dev        # lokaal bekijken op http://localhost:5173
npm run build      # productie-build in /dist
```

## Voordat je live gaat — checklist

1. **Familiefoto's toevoegen**
   - Zet de foto's in de map `public/` (bijv. `familiefoto.jpg` en `tom.jpg`)
   - Vervang de placeholders in `src/components/Hero.jsx` en
     `src/components/Story.jsx` (de comments in die bestanden leggen uit hoe)
   - Zet ook een foto van 1200×630 px als `public/og-familiefoto.jpg` —
     die verschijnt als voorbeeld bij het delen op WhatsApp/Facebook

2. **Mollie aansluiten (iDEAL, creditcard, PayPal)**
   - Volg het stappenplan in `src/lib/mollie.js` — daar staat precies
     hoe je je Mollie API key gebruikt en welk backend-endpoint je nodig hebt
   - Zet daarna `DEMO_MODE` in dat bestand op `false`
   - Zolang `DEMO_MODE` op `true` staat worden betalingen gesimuleerd
     (handig om de site alvast te laten zien)

3. **Domein invullen**
   - Vervang `https://helptom.nl` in `src/components/ShareButtons.jsx`
     door het echte domein
   - Vul hetzelfde domein in bij `redirectUrl` en `webhookUrl`
     in de Mollie-backend (zie `src/lib/mollie.js`)

4. **Teller en donatiemuur**
   - In demo-modus worden donaties (bedrag, naam, bericht) lokaal in de
     browser bijgehouden
   - Voor de echte stand: laat de Mollie-webhook de donaties opslaan en
     bied ze aan via `/api/donations` (uitleg in `src/lib/mollie.js`,
     stap 3) — de site vult daarmee de voortgangsbalk én de donatiemuur
   - Een donateur die geen naam invult staat op de muur als "Anoniem"

## Structuur

- `src/App.jsx` — hoofdcomponent, teller en betaalflow
- `src/components/` — alle secties (hero, verhaal, behandeling, doneer, …)
- `src/lib/mollie.js` — betaallogica + Mollie-instructies
- `src/index.css` — alle styling (kleuren bovenin als CSS-variabelen)

Deze pagina is opgezet door Arno Wals, zoon van Tom. ♥
