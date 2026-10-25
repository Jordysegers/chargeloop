# ChargeLoop online zetten (Supabase + Vercel)

## Deel 1: Supabase (de database)
1. Open je project in Supabase en klik links op **SQL Editor** > **New query**.
2. Open het bestand `supabase.sql`, kopieer alles, plak het in de editor en klik **Run**. Je ziet "Success".
3. Klik links op **Authentication** > **Users** > **Add user** > **Create new user**.
   Vul je e-mailadres en een wachtwoord in en laat "Auto Confirm User" aanstaan. Dit is je inlog voor Beheer.
4. Ga naar **Authentication** > **Sign In / Providers** en zet **Allow new users to sign up** UIT. Zo kan niemand anders een account maken.

## Deel 2: Vercel (de website)
Met GitHub (aanbevolen):
1. Maak op github.com een nieuwe, lege repository (bijvoorbeeld `chargeloop-site`).
2. Klik **Add file** > **Upload files**, sleep alle bestanden uit deze map erin (geen zip, de losse bestanden) en klik **Commit changes**.
3. Ga naar vercel.com > **Add New** > **Project**, kies je repository en klik **Deploy**. Framework Preset: **Other**. Verder niets invullen.
4. Na een minuut staat de site online op een adres als `chargeloop-site.vercel.app`.

Eigen domein: in Vercel bij **Settings** > **Domains** voeg je `chargeloop.nl` toe en volg je de DNS-aanwijzingen.

## Beheer
Ga naar `jouwadres/beheer.html` en log in met het e-mailadres en wachtwoord uit stap 3.
Wijzigingen staan meteen op de site. Nieuwe berichten uit de formulieren zie je onder **Berichten**.

## Later aanpassen
Een bestand wijzigen in GitHub (of mij een nieuwe versie laten maken) en opnieuw committen: Vercel zet de nieuwe versie zelf online.
