/* ================================================================
   MOLLIE INTEGRATIE — LEES DIT VOOR JE LIVE GAAT
   ================================================================

   Mollie-betalingen (iDEAL, creditcard, PayPal) kunnen NIET direct
   vanuit de browser worden aangemaakt: de Mollie API key is geheim
   en mag nooit in frontend-code staan. Je hebt dus één klein
   backend-endpoint nodig. Zo zet je het op:

   STAP 1 — Mollie account
   - Maak een account op https://www.mollie.com
   - Dashboard → Developers → API keys
   - Kopieer je "Live API key" (begint met live_) — test eerst
     met de "Test API key" (begint met test_)
   - Zet iDEAL, creditcard en PayPal aan onder Settings → Payment methods

   STAP 2 — Backend endpoint (bijv. Vercel/Netlify serverless functie)
   Maak een bestand `api/create-payment.js`:

     import { createMollieClient } from '@mollie/api-client';

     // API key ALLEEN via environment variable, nooit hardcoden:
     const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

     export default async function handler(req, res) {
       const { amount, name, message } = req.body;
       const payment = await mollie.payments.create({
         amount: { currency: 'EUR', value: Number(amount).toFixed(2) },
         description: 'Donatie — Help Tom',
         redirectUrl: 'https://JOUW-DOMEIN.nl/?bedankt=1',
         webhookUrl: 'https://JOUW-DOMEIN.nl/api/mollie-webhook',
         // Naam en bericht reizen mee met de betaling, zodat de
         // webhook ze na een geslaagde betaling op de donatiemuur
         // kan zetten:
         metadata: { name, message },
       });
       res.json({ checkoutUrl: payment.getCheckoutUrl() });
     }

   STAP 3 — Webhook + donatielijst
   Mollie roept `api/mollie-webhook.js` aan als een betaling slaagt.
   Sla daar de donatie op (bedrag + naam + bericht uit payment.metadata)
   in een database of simpele KV-store:

     export default async function handler(req, res) {
       const payment = await mollie.payments.get(req.body.id);
       if (payment.isPaid()) {
         await saveDonation({           // jouw opslagfunctie
           amount: Number(payment.amount.value),
           name: payment.metadata?.name || '',
           message: payment.metadata?.message || '',
           timestamp: Date.now(),
         });
       }
       res.status(200).end();
     }

   Maak daarnaast `api/donations.js` dat de opgeslagen lijst teruggeeft
   als JSON-array: [{ amount, name, message, timestamp }, ...]
   De site haalt die lijst op en vult er de teller, de voortgangsbalk
   en de donatiemuur mee (zie App.jsx).

   TIP: laat mensen zelf kiezen of hun naam zichtbaar mag zijn — een
   lege naam wordt op de site automatisch "Anoniem".

   STAP 4 — Frontend aansluiten
   Zet hieronder DEMO_MODE op false. De functie stuurt de bezoeker
   dan door naar de echte Mollie checkout-pagina.

   ================================================================ */

// Zet op false zodra je backend-endpoint (stap 2) live staat.
export const DEMO_MODE = true;

export async function startMolliePayment(amount, { name = '', message = '' } = {}) {
  if (DEMO_MODE) {
    // DEMO: simuleert een geslaagde betaling na korte "verwerking",
    // zodat de hele flow (bedankpagina, teller, donatiemuur) al werkt.
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true, demo: true };
  }

  // ECHT: vraag de checkout-URL op bij je eigen backend en
  // stuur de bezoeker door naar Mollie (iDEAL / creditcard / PayPal).
  const res = await fetch('/api/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, name, message }),
  });
  if (!res.ok) throw new Error('Betaling kon niet worden gestart');
  const { checkoutUrl } = await res.json();
  window.location.href = checkoutUrl;
  return { ok: true, redirected: true };
}
