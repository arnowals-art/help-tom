import {
  PLEDGE_FORM_ACTION,
  PLEDGE_ENTRY_AMOUNT,
  PLEDGE_ENTRY_NAME,
  PLEDGE_ENTRY_MESSAGE,
  SHEET_CSV_URL,
} from './config.js'

export const PLEDGES_CONFIGURED = Boolean(PLEDGE_FORM_ACTION && PLEDGE_ENTRY_AMOUNT)

// Stuurt een toezegging naar het Google Formulier.
// "no-cors" betekent: we krijgen geen antwoord terug, maar de
// inzending komt gewoon aan in de spreadsheet.
export function submitPledge({ amount, name = '', message = '' }) {
  if (!PLEDGES_CONFIGURED) return
  const data = new URLSearchParams()
  data.append(PLEDGE_ENTRY_AMOUNT, String(amount))
  if (PLEDGE_ENTRY_NAME) data.append(PLEDGE_ENTRY_NAME, name)
  if (PLEDGE_ENTRY_MESSAGE) data.append(PLEDGE_ENTRY_MESSAGE, message)
  fetch(PLEDGE_FORM_ACTION, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data.toString(),
  }).catch(() => {
    /* geen internet o.i.d. — de betaling zelf gaat gewoon door */
  })
}

// Eenvoudige CSV-parser (kan om met komma's en quotes in berichten)
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      field = ''
      if (row.some((f) => f !== '')) rows.push(row)
      row = []
    } else {
      field += c
    }
  }
  row.push(field)
  if (row.some((f) => f !== '')) rows.push(row)
  return rows
}

// Haalt de toezeggingen op uit de gepubliceerde spreadsheet.
// Kolommen: Tijdstempel, Bedrag, Naam, Bericht (de vaste volgorde
// van het Google Formulier).
export async function fetchPledges() {
  if (!SHEET_CSV_URL) return []
  try {
    const res = await fetch(SHEET_CSV_URL)
    if (!res.ok) return []
    const rows = parseCsv(await res.text())
    return rows
      .slice(1) // koprij overslaan
      .map((cols, i) => ({
        amount: Number(
          String(cols[1] || '').replace(',', '.').replace(/[^\d.]/g, ''),
        ),
        name: (cols[2] || '').trim(),
        message: (cols[3] || '').trim(),
        date: (cols[0] || '').split(' ')[0],
        // rijvolgorde = tijdsvolgorde; hiermee sorteert de muur
        // nieuwste bovenaan
        timestamp: i + 1,
      }))
      .filter((d) => Number.isFinite(d.amount) && d.amount >= 1)
  } catch {
    return [] // spreadsheet even niet bereikbaar — site blijft werken
  }
}
