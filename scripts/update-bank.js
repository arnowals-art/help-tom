/* ================================================================
   BANKTELLER — haalt ontvangen donaties op via GoCardless
   Bank Account Data (PSD2) en schrijft bank.json.

   Draait automatisch elk uur via GitHub Actions
   (.github/workflows/bankteller.yml). Benodigde secrets in de
   GitHub-repo (Settings → Secrets → Actions):
     GC_SECRET_ID   — van bankaccountdata.gocardless.com
     GC_SECRET_KEY  — idem
     GC_ACCOUNT_ID  — het rekening-ID na de eenmalige ING-toestemming

   Optionele repo-variabele (Settings → Variables → Actions):
     FILTER_KEYWORD — tel alleen bijschrijvingen waarvan de
                      omschrijving dit woord bevat (handig als de
                      rekening ook voor andere dingen wordt gebruikt)

   LET OP: de ING-toestemming verloopt elke ±90 dagen. Als deze
   workflow rood wordt (GitHub mailt je dan), vernieuw de
   toestemming — zie README, kopje "Bankkoppeling vernieuwen".
   ================================================================ */

const fs = require('fs')

const BASE = 'https://bankaccountdata.gocardless.com/api/v2'
const { GC_SECRET_ID, GC_SECRET_KEY, GC_ACCOUNT_ID } = process.env
const START_DATE = process.env.START_DATE || '2026-07-07'
const FILTER_KEYWORD = (process.env.FILTER_KEYWORD || '').trim().toLowerCase()

async function main() {
  if (!GC_SECRET_ID || !GC_SECRET_KEY || !GC_ACCOUNT_ID) {
    throw new Error('GC_SECRET_ID, GC_SECRET_KEY en GC_ACCOUNT_ID moeten gezet zijn')
  }

  // 1. Toegangstoken ophalen
  const tokenRes = await fetch(`${BASE}/token/new/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret_id: GC_SECRET_ID, secret_key: GC_SECRET_KEY }),
  })
  if (!tokenRes.ok) throw new Error(`Token ophalen mislukt: ${tokenRes.status} ${await tokenRes.text()}`)
  const { access } = await tokenRes.json()

  // 2. Transacties ophalen vanaf de startdatum van de actie
  const txRes = await fetch(
    `${BASE}/accounts/${GC_ACCOUNT_ID}/transactions/?date_from=${START_DATE}`,
    { headers: { Authorization: `Bearer ${access}` } },
  )
  if (!txRes.ok) throw new Error(`Transacties ophalen mislukt: ${txRes.status} ${await txRes.text()}`)
  const data = await txRes.json()
  const booked = data.transactions?.booked || []

  // 3. Alleen bijschrijvingen tellen (bedrag > 0), eventueel
  //    gefilterd op een trefwoord in de omschrijving
  const incoming = booked.filter((t) => {
    const amount = Number(t.transactionAmount?.amount)
    if (!Number.isFinite(amount) || amount <= 0) return false
    if (t.transactionAmount?.currency && t.transactionAmount.currency !== 'EUR') return false
    if (FILTER_KEYWORD) {
      const text = JSON.stringify(t).toLowerCase()
      if (!text.includes(FILTER_KEYWORD)) return false
    }
    return true
  })

  const raised = Math.round(incoming.reduce((sum, t) => sum + Number(t.transactionAmount.amount), 0))
  const donors = incoming.length

  fs.writeFileSync(
    'bank.json',
    JSON.stringify({ raised, donors, updatedAt: new Date().toISOString() }, null, 2),
  )
  console.log(`bank.json geschreven: €${raised} van ${donors} donaties (sinds ${START_DATE})`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
