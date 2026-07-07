/* ================================================================
   DONATIES BIJHOUDEN
   ================================================================

   Tikkie geeft niet automatisch door wie er betaald heeft, dus
   deze lijst houd je zelf bij. Zo doe je dat:

   1. Kijk in de Tikkie-app wie er betaald hebben.
   2. Voeg per donatie een regel toe aan de lijst hieronder,
      NIEUWSTE BOVENAAN. Bijvoorbeeld:

        { amount: 25, name: 'Jan de Vries', message: 'Sterkte Tom!', date: '7 juli 2026' },
        { amount: 10, name: '', message: '', date: '6 juli 2026' },

      - amount:  het bedrag in euro's (verplicht)
      - name:    laat leeg ('') voor "Anoniem" — vraag even of
                 iemand met naam genoemd wil worden
      - message: een berichtje voor op de muur, mag leeg
      - date:    de datum als tekst

   3. Zet de site opnieuw online:
        npm run build && npx gh-pages -d dist

   De voortgangsbalk en het aantal donateurs op de site worden
   automatisch uit deze lijst berekend.
   ================================================================ */

export const DONATIONS = [
  // { amount: 25, name: 'Jan de Vries', message: 'Sterkte Tom!', date: '7 juli 2026' },
]
