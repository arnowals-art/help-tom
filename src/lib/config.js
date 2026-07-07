/* ================================================================
   DONEERLINKS INSTELLEN — Tikkie en/of ING betaalverzoek
   ================================================================

   Vul hieronder één van beide links in, of allebei. De site toont
   automatisch een doneerknop voor elke link die ingevuld is.
   Zolang beide leeg zijn, laat de site zien dat de doneerknop nog
   niet actief is.

   TIKKIE
   1. Open de Tikkie-app en maak een nieuw betaalverzoek aan.
      Kies de optie waarbij de betaler zelf het bedrag bepaalt.
   2. Kopieer de link (https://tikkie.me/pay/...) en plak hem
      hieronder tussen de aanhalingstekens.
   LET OP: een Tikkie is maar 14 dagen geldig — vervang de link
   elke twee weken. Er geldt ook een maximum per betaling.

   ING BETAALVERZOEK
   1. Open de ING-app → Betaalverzoek maken.
      Laat het bedrag open zodat mensen zelf kiezen, en zet de
      geldigheid op het maximum.
   2. Kopieer de link (https://betaalverzoek.ing.nl/...) en plak
      hem hieronder.
   LET OP: ook een ING betaalverzoek verloopt na een tijdje en
   kan een maximum aantal betalingen hebben — check het in de app
   en vervang de link op tijd.

   NA HET INVULLEN de site opnieuw online zetten:
     npm run build && npx gh-pages -d dist
   ================================================================ */

export const TIKKIE_URL = ''
export const ING_URL = ''
