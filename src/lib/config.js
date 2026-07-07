/* ================================================================
   INSTELLINGEN: ING-LINK EN AUTOMATISCHE TELLER
   ================================================================

   --- 1. ING BETAALVERZOEK ---------------------------------------

   Maak in de ING-app een betaalverzoek (bedrag open laten,
   geldigheid op maximum) en plak de link hieronder. Vervang hem
   op tijd als het verzoek verloopt.

   --- 2. AUTOMATISCHE TELLER (Google Formulier + Spreadsheet) ----

   Bezoekers kiezen eerst hun bedrag op de site en gaan daarna
   pas naar ING. Die toezegging stuurt de site naar een Google
   Formulier, en de site leest de bijbehorende spreadsheet weer
   uit voor de teller en de steunbetuigingen. Eenmalig instellen,
   duurt ongeveer 10 minuten:

   a. Ga naar https://forms.google.com en maak een nieuw formulier
      met PRECIES DRIE vragen, alle drie het type "Kort antwoord",
      in deze volgorde:
        1. Bedrag
        2. Naam
        3. Bericht

   b. Klik rechtsboven op de drie puntjes → "Vooraf ingevulde link
      ophalen". Vul bij alle drie de vragen iets in en klik op
      "Link ophalen". In die link zie je drie codes staan zoals
      entry.1234567890 — dat zijn de codes voor hieronder
      (de eerste hoort bij Bedrag, de tweede bij Naam, de derde
      bij Bericht).

   c. PLEDGE_FORM_ACTION: open het formulier via "Verzenden" →
      linkje, kopieer de URL en vervang aan het einde
      /viewform door /formResponse.

   d. Ga in het formulier naar het tabblad "Antwoorden" en klik op
      het spreadsheet-icoon om een gekoppelde Google Spreadsheet te
      maken. Open die spreadsheet en kies:
      Bestand → Delen → Publiceren op internet → kies het eerste
      tabblad en "Kommagescheiden waarden (.csv)" → Publiceren.
      Plak de link die je krijgt bij SHEET_CSV_URL.

   e. Zet de site opnieuw online:
        npm run build && npx gh-pages -d dist

   BEHEER: de spreadsheet is jouw controle-lijst. Zie je in de
   ING-app dat een toezegging niet betaald is, of staat er onzin
   tussen? Verwijder die rij gewoon uit de spreadsheet — binnen
   een paar minuten klopt de site weer.

   Zolang deze velden leeg zijn werkt de site ook: de doneerknop
   doet het gewoon, alleen loopt de teller dan niet automatisch
   mee (alleen via src/data/donations.js).
   ================================================================ */

export const ING_URL = 'https://www.ing.nl/payreq/m/?trxid=xZlbYma2K3nAoJUOaRRGQtZPNP1Z2Z3L'

export const PLEDGE_FORM_ACTION = ''   // https://docs.google.com/forms/d/e/XXXX/formResponse
export const PLEDGE_ENTRY_AMOUNT = ''  // entry.XXXXXXXXXX (hoort bij Bedrag)
export const PLEDGE_ENTRY_NAME = ''    // entry.XXXXXXXXXX (hoort bij Naam)
export const PLEDGE_ENTRY_MESSAGE = '' // entry.XXXXXXXXXX (hoort bij Bericht)
export const SHEET_CSV_URL = ''        // https://docs.google.com/spreadsheets/d/e/XXXX/pub?output=csv
