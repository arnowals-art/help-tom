/* ================================================================
   ING BETAALVERZOEK INSTELLEN
   ================================================================

   1. Open de ING-app → Betaalverzoek maken.
      Laat het bedrag open zodat mensen zelf kiezen, en zet de
      geldigheid op het maximum.
   2. Kopieer de link (https://betaalverzoek.ing.nl/...) en plak
      hem hieronder tussen de aanhalingstekens.
   3. Zet de site opnieuw online:
        npm run build && npx gh-pages -d dist

   LET OP:
   - Een ING betaalverzoek verloopt na een tijdje en kan een
     maximum aantal betalingen hebben — check het in de app en
     vervang de link hier op tijd door een nieuwe.
   - ING geeft niet automatisch aan de site door wie er betaald
     heeft. De teller en de steunbetuigingen houd je daarom zelf
     bij in src/data/donations.js — zie de uitleg daar.

   Zolang de link hieronder leeg is, laat de site zien dat de
   doneerknop nog niet actief is.
   ================================================================ */

export const ING_URL = 'https://www.ing.nl/payreq/m/?trxid=xZlbYma2K3nAoJUOaRRGQtZPNP1Z2Z3L'
