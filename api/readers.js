'use strict';
const L = require('../lib/portal');

// GET /api/readers  (alleen beheerder)
// Geeft de terminals uit Stripe terug, plus welke terminal-ID's in de laatste betalingen voorkomen (om koppelingen te controleren).
module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') throw new L.HttpError(405, 'methode', 'Alleen GET.');
    const user = await L.whoami(L.bearer(req));
    if (!user.admin) throw new L.HttpError(403, 'geen_beheerder', 'Alleen voor de beheerder.');
    const readers = [];
    let after = null;
    for (let i = 0; i < 10; i++) {
      const p = { limit: 100 }; if (after) p.starting_after = after;
      const j = await L.stripeGet('/terminal/readers', p);
      (j.data || []).forEach(r => readers.push({ id: r.id, label: r.label || '', status: r.status || '', device_type: r.device_type || '', serial: r.serial_number || '' }));
      if (!j.has_more || !(j.data || []).length) break;
      after = j.data[j.data.length - 1].id;
    }
    // Welke terminals zie je terug in de laatste 100 betalingen?
    const seen = {}; let withoutReader = 0, total = 0;
    try {
      const c = await L.stripeGet('/charges', { limit: 100 });
      (c.data || []).forEach(x => { total++; const r = L.readerOf(x); if (r) seen[r] = (seen[r] || 0) + 1; else withoutReader++; });
    } catch (e) { /* alleen een controle, mag falen */ }
    // Welke terminals zijn al gekoppeld?
    const token = L.bearer(req);
    const linked = await L.sbGet('partner_readers?select=reader_id,partner_id', token);
    return L.send(res, 200, { ok: true, readers, linked, recent: { total, without_reader: withoutReader, by_reader: seen } });
  } catch (e) { return L.fail(res, e); }
};
