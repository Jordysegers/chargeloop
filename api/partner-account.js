'use strict';
const L = require('../lib/portal');

// POST /api/partner-account  { email, password }  (alleen beheerder)
// Maakt een inlogaccount voor een bestaande partner aan, of wijzigt het wachtwoord als het account al bestaat.
// Het wachtwoord wordt alleen doorgestuurd naar Supabase en nergens opgeslagen of gelogd.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') throw new L.HttpError(405, 'methode', 'Alleen POST.');
    const user = await L.whoami(L.bearer(req));
    if (!user.admin) throw new L.HttpError(403, 'geen_beheerder', 'Alleen voor de beheerder.');
    let b = req.body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
    b = b || {};
    const email = String(b.email || '').trim().toLowerCase();
    const password = String(b.password || '');
    if (!EMAIL.test(email)) throw new L.HttpError(400, 'ongeldig_email', 'Vul een geldig e-mailadres in.');
    if (password.length < 8) throw new L.HttpError(400, 'wachtwoord_te_kort', 'Gebruik minimaal 8 tekens.');
    if (Buffer.byteLength(password, 'utf8') > 72) throw new L.HttpError(400, 'wachtwoord_te_lang', 'Maximaal 72 tekens.');
    if (email === L.ADMIN) throw new L.HttpError(400, 'beheerder', 'Het wachtwoord van de beheerder wijzig je via "Wachtwoord wijzigen" in het portaal.');
    const token = L.bearer(req);
    const rows = await L.sbGet('partners?select=id&email=ilike.' + encodeURIComponent(email), token);
    if (!rows.length) throw new L.HttpError(404, 'geen_partner', 'Sla de partner eerst op voordat je een wachtwoord instelt.');

    let created = true;
    let r = await L.sbAdmin('POST', '/auth/v1/admin/users', { email, password, email_confirm: true });
    if (!r.ok && (r.json.error_code === 'email_exists' || r.json.code === 'email_exists' || r.status === 422 && /already|registered/i.test(JSON.stringify(r.json)))) {
      const u = await L.findUserByEmail(email);
      if (!u) throw new L.HttpError(502, 'account_niet_gevonden', 'Het account bestaat al maar kon niet worden gevonden.');
      created = false;
      r = await L.sbAdmin('PUT', '/auth/v1/admin/users/' + u.id, { password, email_confirm: true });
    }
    if (!r.ok) {
      const code = r.json.error_code || r.json.code || '';
      if (code === 'weak_password') throw new L.HttpError(400, 'wachtwoord_afgewezen', 'Supabase vindt dit wachtwoord te zwak. Kies een langer of moeilijker wachtwoord.');
      if (r.status === 401 || r.status === 403) throw new L.HttpError(502, 'service_sleutel_ongeldig', 'Supabase weigert de sleutel. Controleer SUPABASE_SERVICE_ROLE_KEY in Vercel (de Secret key).');
      throw new L.HttpError(502, 'supabase', 'Supabase gaf een fout (' + r.status + ').');
    }
    return L.send(res, 200, { ok: true, created });
  } catch (e) { return L.fail(res, e); }
};
