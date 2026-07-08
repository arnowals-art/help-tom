// Leest het handmatig ingevoerde "opgehaald"-bedrag uit amount.json.
//
// amount.json staat in public/ en wordt bij de build meegedeployd naar
// de site (te bereiken als /amount.json). Het bedrag kan TUSSEN deploys
// door direct op de gh-pages-branch worden aangepast (potloodje in
// GitHub) — dan is het meteen live, zonder rebuild.
//
// LET OP: bij een nieuwe `npm run build && npx gh-pages -d dist` wordt
// /amount.json overschreven met de waarde uit public/amount.json.
// Werk dus vóór een deploy public/amount.json bij naar de actuele stand,
// anders springt de teller terug.

const AMOUNT_URL = `${import.meta.env.BASE_URL}amount.json`

export async function fetchRaised() {
  try {
    // Cache-buster + no-store, zodat een verse waarde snel doorkomt.
    const res = await fetch(`${AMOUNT_URL}?t=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    if (typeof data.raised === 'number' && Number.isFinite(data.raised)) {
      return data.raised
    }
  } catch {
    /* niet bereikbaar — de site valt terug op de ingebouwde waarde */
  }
  return null
}
