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
  // Bedrag is optioneel: een bericht achterlaten kan zonder bedrag
  // (de donatie zelf loopt via de bankoverschrijving).
  if (amount != null && amount !== '') data.append(PLEDGE_ENTRY_AMOUNT, String(amount))
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

// Tijdstempel uit het formulier ("7-7-2026 21:39:34") naar millis.
function parseTimestamp(s) {
  const m = String(s)
    .trim()
    .match(/^(\d{1,2})-(\d{1,2})-(\d{4})[ T](\d{1,2}):(\d{2}):(\d{2})$/)
  if (!m) return null
  return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5], +m[6]).getTime()
}

// Identieke inzendingen (zelfde bedrag, naam én bericht) binnen dit
// tijdsvenster tellen als één donatie. Dit vangt dubbele registraties
// op na een mislukte betaling: mensen proberen het dan binnen een
// paar minuten opnieuw.
//
// BELANGRIJK: volledig anonieme rijen zonder bericht worden NOOIT
// samengevoegd. Twee anonieme gevers met hetzelfde bedrag kort na
// elkaar zijn niet te onderscheiden van een dubbele registratie;
// die controleer je handmatig met de bankapp ernaast.
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000

function removeDuplicates(list) {
  const kept = []
  for (const p of list) {
    const identifiable = p.name !== '' || p.message !== ''
    const isDuplicate =
      identifiable &&
      kept.some(
        (k) =>
          k.amount === p.amount &&
          k.name === p.name &&
          k.message === p.message &&
          k.time != null &&
          p.time != null &&
          p.time - k.time < DUPLICATE_WINDOW_MS,
      )
    if (!isDuplicate) kept.push(p)
  }
  return kept
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
    const list = rows
      .slice(1) // koprij overslaan
      .map((cols, i) => {
        const parsed = Number(
          String(cols[1] || '').replace(',', '.').replace(/[^\d.]/g, ''),
        )
        return {
          // Bedrag is optioneel (0 als er geen bedrag is); de muur toont
          // het niet meer, maar 0 houdt de deduplicatie werkbaar.
          amount: Number.isFinite(parsed) ? parsed : 0,
          name: (cols[2] || '').trim(),
          message: (cols[3] || '').trim(),
          date: (cols[0] || '').split(' ')[0],
          time: parseTimestamp(cols[0]),
          // rijvolgorde = tijdsvolgorde; hiermee sorteert de muur
          // nieuwste bovenaan
          timestamp: i + 1,
        }
      })
      // Toon rijen met een naam of bericht (of, uit oudere data, een bedrag).
      .filter((d) => d.name || d.message || d.amount > 0)
    return removeDuplicates(list)
  } catch {
    return [] // spreadsheet even niet bereikbaar — site blijft werken
  }
}
