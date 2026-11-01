'use strict';
const L = require('../lib/portal');

// GET /api/portal?range=today|week|month|lastmonth|year[&partner=<uuid>]
// Partner: krijgt alleen de eigen cijfers. Beheerder: zonder partner=... een overzicht van alle partners.
module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') throw new L.HttpError(405, 'methode', 'Alleen GET.');
    const token = L.bearer(req);
    const user = await L.whoami(token);
    const q = req.query || {};
    const now = Date.now();
    const range = L.rangeFor(String(q.range || 'week'), now);
    const rangeOut = { key: range.key, label: range.label, from: range.from, to: range.to };

    let partners;
    if (user.admin) {
      if (q.partner) {
        if (!L.UUID.test(String(q.partner))) throw new L.HttpError(400, 'ongeldig_id', 'Ongeldige partner.');
        partners = await L.sbGet('partners?select=' + L.PARTNER_SEL + '&id=eq.' + q.partner, token);
        if (!partners.length) throw new L.HttpError(404, 'onbekende_partner', 'Partner niet gevonden.');
      } else {
        partners = await L.sbGet('partners?select=' + L.PARTNER_SEL + '&order=name.asc', token);
      }
    } else {
      // RLS: een partner ziet alleen de eigen regel; wat de browser meestuurt over andere partners wordt genegeerd.
      partners = await L.sbGet('partners?select=' + L.PARTNER_SEL + '&email=eq.' + encodeURIComponent(user.email), token);
      if (!partners.length) throw new L.HttpError(403, 'geen_partner', 'Dit account is niet gekoppeld aan een partner. Neem contact op met ChargeLoop.');
      if (!partners[0].active) throw new L.HttpError(403, 'niet_actief', 'Dit partneraccount staat op inactief.');
    }

    const wantsStripe = partners.some(p => (p.partner_readers || []).length);
    let charges = [], truncated = false;
    if (wantsStripe) ({ charges, truncated } = await L.listChargesCached(range));

    const out = partners.map(p => {
      const s = L.summarize(charges, p, range);
      return { id: p.id, name: p.name, email: p.email, share_pct: Number(p.share_pct), active: p.active, ...s };
    });

    if (user.admin && !q.partner) {
      return L.send(res, 200, { ok: true, admin: true, range: rangeOut, truncated, generated_at: now, partners: out });
    }
    return L.send(res, 200, { ok: true, admin: user.admin, range: rangeOut, truncated, generated_at: now, partner: out[0] });
  } catch (e) { return L.fail(res, e); }
};
