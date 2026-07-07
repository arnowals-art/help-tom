/* ================================================================
   INSTELLINGEN: ING-BETAALVERZOEKEN EN AUTOMATISCHE TELLER
   ================================================================

   --- 1. ING BETAALVERZOEKEN (per bedrag) ------------------------

   De site heeft bedragknoppen (€10 / €25 / €50 / €100 / eigen
   bedrag). Voor elk vast bedrag kun je in de ING-app een eigen
   betaalverzoek aanmaken (Betaalverzoek → vast bedrag invullen →
   geldigheid op maximum). Kiest een bezoeker dan bijv. €25, dan
   opent het ING-scherm met €25 al ingevuld.

   - Plak per bedrag de bijbehorende link hieronder.
   - 'open' is het betaalverzoek ZONDER vast bedrag; dat wordt
     gebruikt voor "eigen bedrag" én als vangnet voor elke
     bedragknop waarvan de link (nog) leeg is.
   - LET OP: betaalverzoeken verlopen. Vernieuw ze op tijd in de
     ING-app en vervang de links hier (daarna: npm run build &&
     npx gh-pages -d dist).

   --- 2. AUTOMATISCHE TELLER (Google Formulier + Spreadsheet) ----

   Al ingesteld en werkend. De toezeggingen van de site komen in
   jouw Google Spreadsheet; de site leest ze terug voor de teller
   en de steunbetuigingen. Beheer = rijen aanpassen/verwijderen in
   de spreadsheet.
   ================================================================ */

export const ING_URLS = {
  open: 'https://www.ing.nl/payreq/m/?trxid=l6GQjj4uKhRZt5CSnGjse5lp88rFWisn',
  10: 'https://www.ing.nl/payreq/m/?trxid=5PN0OXkCFj1Sf7SuHkgyqbwjAGLPo16X',
  50: 'https://www.ing.nl/payreq/m/?trxid=oiWk69MK3ffBd1YAwuz7dc52QmvTfxLx',
  100: 'https://www.ing.nl/payreq/m/?trxid=d8L3AS89H3sABOSArpiaJjgTqtqiCf2g',
}

// De link voor een gekozen bedrag: het vaste verzoek als dat er
// is, anders het open verzoek.
export function ingUrlForAmount(amount) {
  return ING_URLS[amount] || ING_URLS.open
}

export const PLEDGE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSd4pyyEgpYacXebu4JCMc9rxtY5mkqnk31oSfo0ngmmK8ow0g/formResponse'
export const PLEDGE_ENTRY_AMOUNT = 'entry.629332172'  // Bedrag
export const PLEDGE_ENTRY_NAME = 'entry.1843448379'   // Naam
export const PLEDGE_ENTRY_MESSAGE = 'entry.643455977' // Bericht

export const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/14AJEhtdxRAlNRgh6Zlrx6irdPD8PS5a5mOTKlnXGUGU/gviz/tq?tqx=out:csv'
