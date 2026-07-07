/* ================================================================
   HANDMATIGE DONATIES EN CORRECTIES
   ================================================================

   De teller en de steunbetuigingen lopen normaal automatisch via
   de Google Spreadsheet (zie src/lib/config.js). Deze lijst is
   voor aanvullingen die daar niet in staan, bijvoorbeeld:

   - donaties die rechtstreeks zijn overgemaakt zonder de site
   - contant gegeven bedragen

   Voeg per donatie een regel toe, nieuwste bovenaan:

     { amount: 25, name: 'Jan de Vries', message: 'Sterkte Tom!', date: '7 juli 2026' },
     { amount: 10, name: '', message: '', date: '6 juli 2026' },

   - amount:  het bedrag in euro's (verplicht)
   - name:    laat leeg ('') voor "Anoniem"
   - message: een berichtje voor op de muur, mag leeg
   - date:    de datum als tekst

   Daarna de site opnieuw online zetten:
     npm run build && npx gh-pages -d dist

   Staat er iets verkeerd in de spreadsheet (bijv. een toezegging
   die nooit betaald is)? Verwijder dan die rij in de spreadsheet
   zelf — daar hoef je de site niet voor bij te werken.
   ================================================================ */

export const DONATIONS = [
  // { amount: 25, name: 'Jan de Vries', message: 'Sterkte Tom!', date: '7 juli 2026' },
]
