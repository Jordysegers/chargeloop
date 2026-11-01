# Partnerportaal: wat je eenmalig moet instellen

Het portaal staat op **/portaal**. Partners loggen daar in en zien realtime hoe vaak hun terminal(s) zijn gebruikt, de omzet en hun eigen deel. Jij ziet als beheerder alle partners en stelt per partner het percentage en de terminals in.

Er zijn drie stappen. Samen kost dit ongeveer 10 minuten. Je plakt nergens een geheime sleutel in de chat of in de code: de Stripe-sleutel zet je alleen in Vercel.

## Stap 1: Database (Supabase)
1. Open Supabase, ga naar **SQL Editor** en klik **New query**.
2. Open het bestand `supabase-partners.sql`, kopieer alles, plak het en klik **Run**. Je ziet "Success".
   Dit maakt twee afgeschermde tabellen: partners en gekoppelde terminals. Een partner kan alleen de eigen regel lezen.

## Stap 2: Stripe-sleutel met alleen leesrechten
1. Ga in Stripe naar **Ontwikkelaars** (Developers), dan **API-sleutels**, en klik **Beperkte sleutel maken** (Create restricted key).
2. Geef de sleutel een naam, bijvoorbeeld "ChargeLoop portaal".
3. Zet alleen deze rechten op **Lezen** (Read) en laat al het andere op "Geen":
   - **Charges** (Betalingen / Charges and Refunds)
   - **Terminal** (Terminal Readers)
4. Maak de sleutel aan en kopieer hem. Hij begint met `rk_live_`. Hij werkt alleen om te lezen, dus er kan niets mee betaald of terugbetaald worden.

## Stap 3: Sleutel en instellingen in Vercel
1. Open het project in Vercel, ga naar **Settings** en dan **Environment Variables**.
2. Voeg toe:
   | Naam | Waarde |
   |---|---|
   | `STRIPE_SECRET_KEY` | de sleutel uit stap 2 (begint met `rk_live_`) |
   | `DEPOSIT_CENTS` | `3000` (de borg van 30 euro telt niet mee als omzet). Zet op `0` om dit uit te zetten. |
3. Ga naar **Deployments** en klik bij de nieuwste op **Redeploy**, zodat de instellingen worden meegenomen.

## Een partner toevoegen
1. Ga naar `/portaal` en log in met je beheerders-account (hetzelfde als bij Beheer).
2. Klik op **Partners beheren** en dan op **Nieuwe partner**.
3. Vul de naam, het e-mailadres, het percentage en de terminal(s) in. De terminals haalt het portaal zelf uit Stripe, je kiest ze uit een lijst. Een terminal kan maar aan één partner gekoppeld zijn.
4. Maak in Supabase een inlog aan met **hetzelfde e-mailadres**: **Authentication**, **Users**, **Add user**, **Create new user** (laat "Auto Confirm User" aan).
5. Stuur de partner de link naar `/portaal`. Via "Wachtwoord vergeten?" kiest de partner zelf een wachtwoord.
   Voor de herstellink moet in Supabase onder **Authentication**, **URL Configuration**, bij **Redirect URLs** het adres van het portaal staan, bijvoorbeeld `https://chargeloop.nl/portaal`.

## Hoe de cijfers worden berekend
- Per betaling kijkt het portaal naar de terminal waarop is betaald. Alleen betalingen op de terminals van die partner tellen.
- **Verhuren** is het aantal betaalde betalingen. **Omzet** is wat is betaald, minus terugbetalingen.
- Niet meegeteld: mislukte betalingen, alleen gereserveerde bedragen die niet zijn afgeschreven, en betalingen van precies de borg (`DEPOSIT_CENTS`).
- **Jouw deel** is het ingestelde percentage van de omzet van die terminals.
- Het scherm ververst zichzelf elke 30 seconden.

## Als er cijfers ontbreken
Log in als beheerder en ga naar Partners beheren. Zie je daar geen terminals in de lijst, dan is de Stripe-koppeling niet goed. Cijfers kloppen niet? Vergelijk een paar betalingen met het Stripe-dashboard. Bedragen zijn de bedragen zoals betaald via de terminal.
