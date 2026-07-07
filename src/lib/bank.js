// Leest de bankstand die de GitHub Action elk uur publiceert
// (zie .github/workflows/bankteller.yml en scripts/update-bank.js).
// Zolang de bankkoppeling nog niet actief is bestaat dit bestand
// niet en valt de site terug op de toezeggingen-teller.

const BANK_JSON_URL =
  'https://raw.githubusercontent.com/arnowals-art/help-tom/data/bank.json'

export async function fetchBankStats() {
  try {
    const res = await fetch(BANK_JSON_URL, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    if (typeof data.raised === 'number' && typeof data.donors === 'number') {
      return data
    }
  } catch {
    /* geen bankdata beschikbaar — site werkt gewoon door */
  }
  return null
}
