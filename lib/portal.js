'use strict';
// Gedeelde hulpfuncties voor het partnerportaal. Geheime sleutels staan alleen in Vercel (Environment Variables).
const TZ = 'Europe/Amsterdam';
const SB_URL = (process.env.SUPABASE_URL || 'https://rekmlbiemfjjccrmdklk.supabase.co').replace(/\/$/, '');
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_zQTjz4cLuarl_qof20FJIg_5IU6QCun'; // publieke sleutel, zelfde als op de website
const ADMIN = (process.env.ADMIN_EMAIL || 'jordysegers@hotmail.com').toLowerCase();
// Betalingen van precies dit bedrag (borg) tellen niet mee als omzet. 0 = uitzetten.
const DEPOSIT = process.env.DEPOSIT_CENTS === undefined ? 3000 : (parseInt(process.env.DEPOSIT_CENTS, 10) || 0);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_PAGES = 50; // 50 x 100 = max 5000 betalingen per aanvraag

class HttpError extends Error { constructor(status, code, message) { super(message || code); this.status = status; this.code = code; } }

// ---------- tijd (Amsterdam) ----------
function parts(ts) {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(new Date(ts));
  const o = {}; p.forEach(x => { o[x.type] = x.value; }); return o;
}
function offsetMs(ts) { const o = parts(ts); return Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour, +o.minute, +o.second) - Math.floor(ts / 1000) * 1000; }
function localMidnight(y, m, d) { const g = Date.UTC(y, m - 1, d); const c = g - offsetMs(g); return g - offsetMs(c); }
function dayKey(ts) { const o = parts(ts); return o.year + '-' + o.month + '-' + o.day; }
const RANGES = { today: 'Vandaag', week: 'Laatste 7 dagen', month: 'Deze maand', lastmonth: 'Vorige maand', year: 'Dit jaar' };
function rangeFor(key, now) {
  if (!RANGES[key]) key = 'week';
  const o = parts(now), y = +o.year, m = +o.month, d = +o.day;
  let from, to = now;
  if (key === 'today') from = localMidnight(y, m, d);
  else if (key === 'week') from = localMidnight(y, m, d - 6);
  else if (key === 'month') from = localMidnight(y, m, 1);
  else if (key === 'lastmonth') { from = localMidnight(y, m - 1, 1); to = localMidnight(y, m, 1) - 1; }
  else from = localMidnight(y, 1, 1);
  return { key, label: RANGES[key], from, to };
}
function dayList(from, to) {
  const out = []; const o = parts(from); let y = +o.year, m = +o.month, d = +o.day;
  for (let i = 0; i < 400; i++) {
    const t = localMidnight(y, m, d + i); if (t > to) break;
    out.push(dayKey(t + 12 * 3600 * 1000));
  }
  return out;
}

// ---------- Supabase (met de token van de ingelogde gebruiker, dus RLS blijft gelden) ----------
function bearer(req) {
  const h = (req.headers && (req.headers.authorization || req.headers.Authorization)) || '';
  const m = /^Bearer\s+(.+)$/i.exec(h); return m ? m[1].trim() : '';
}
async function whoami(token) {
  if (!token) throw new HttpError(401, 'geen_token', 'Niet ingelogd.');
  const r = await fetch(SB_URL + '/auth/v1/user', { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + token } });
  if (!r.ok) throw new HttpError(401, 'ongeldige_sessie', 'Je sessie is verlopen. Log opnieuw in.');
  const u = await r.json();
  if (!u || !u.email) throw new HttpError(401, 'ongeldige_sessie', 'Je sessie is verlopen. Log opnieuw in.');
  const email = String(u.email).toLowerCase();
  return { id: u.id, email, admin: email === ADMIN };
}
async function sbGet(path, token) {
  const r = await fetch(SB_URL + '/rest/v1/' + path, { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + token } });
  if (!r.ok) throw new HttpError(502, 'database', 'De database gaf een fout (' + r.status + ').');
  return r.json();
}
const PARTNER_SEL = 'id,name,email,share_pct,active,partner_readers(reader_id,label)';

// ---------- Stripe (alleen lezen) ----------
function stripeKey() {
  const k = process.env.STRIPE_SECRET_KEY || '';
  if (!k) throw new HttpError(503, 'stripe_niet_gekoppeld', 'Stripe is nog niet gekoppeld. Voeg STRIPE_SECRET_KEY toe in Vercel.');
  return k;
}
async function stripeGet(path, params) {
  const q = Object.keys(params || {}).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
  const r = await fetch('https://api.stripe.com/v1' + path + (q ? '?' + q : ''), { headers: { Authorization: 'Bearer ' + stripeKey() } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = (j.error && j.error.message) || ('HTTP ' + r.status);
    if (r.status === 401 || r.status === 403) throw new HttpError(502, 'stripe_geen_toegang', 'Stripe weigert de sleutel of mist rechten: ' + msg);
    throw new HttpError(502, 'stripe', 'Stripe gaf een fout: ' + msg);
  }
  return j;
}
async function listCharges(fromMs, toMs) {
  const all = []; let after = null, truncated = false;
  for (let page = 0; page < MAX_PAGES; page++) {
    const p = { limit: 100, 'created[gte]': Math.floor(fromMs / 1000), 'created[lte]': Math.floor(toMs / 1000) };
    if (after) p.starting_after = after;
    const j = await stripeGet('/charges', p);
    const data = j.data || []; all.push(...data);
    if (!j.has_more || !data.length) return { charges: all, truncated: false };
    after = data[data.length - 1].id;
    if (page === MAX_PAGES - 1) truncated = true;
  }
  return { charges: all, truncated };
}
// Korte cache (per serverinstantie): meerdere partners en geopende schermen belasten Stripe zo niet telkens opnieuw.
const CACHE = new Map();
async function listChargesCached(range) {
  stripeKey(); // geen sleutel? dan direct een nette fout, ook als er nog iets in de cache staat
  const ttl = range.key === 'lastmonth' ? 300000 : 20000;
  const k = range.key + ':' + Math.floor(range.from / 1000);
  const hit = CACHE.get(k);
  if (hit && Date.now() - hit.at < ttl) return hit.val;
  const val = await listCharges(range.from, range.to);
  CACHE.set(k, { at: Date.now(), val });
  if (CACHE.size > 20) CACHE.delete(CACHE.keys().next().value);
  return val;
}
function readerOf(c) { const d = c && c.payment_method_details; return (d && d.card_present && d.card_present.reader) || null; }
// Netto bedrag van een betaling (in centen) of 0 als die niet meetelt (mislukt, alleen gereserveerd, borg, terugbetaald).
function netOf(c) {
  if (!c || c.status !== 'succeeded' || !c.paid || c.captured === false) return 0;
  const cap = typeof c.amount_captured === 'number' ? c.amount_captured : c.amount;
  if (DEPOSIT && cap === DEPOSIT) return 0;
  const net = cap - (c.amount_refunded || 0);
  return net > 0 ? net : 0;
}

// Rekent de cijfers uit voor een of meer partners met een lijst betalingen.
function summarize(charges, partner, range) {
  const share = Number(partner.share_pct) / 100;
  const label = {}; (partner.partner_readers || []).forEach(r => { label[r.reader_id] = r.label || r.reader_id; });
  const days = {}; dayList(range.from, range.to).forEach(k => { days[k] = { d: k, rentals: 0, gross_cents: 0, partner_cents: 0 }; });
  const readers = {}; Object.keys(label).forEach(id => { readers[id] = { id, label: label[id], rentals: 0, gross_cents: 0, partner_cents: 0, last_at: null }; });
  const recent = []; let rentals = 0, gross = 0;
  charges.forEach(c => {
    const rid = readerOf(c); if (!rid || !readers[rid]) return;
    const net = netOf(c); if (!net) return;
    const at = c.created * 1000, k = dayKey(at);
    rentals++; gross += net;
    const r = readers[rid]; r.rentals++; r.gross_cents += net; if (!r.last_at || at > r.last_at) r.last_at = at;
    if (days[k]) { days[k].rentals++; days[k].gross_cents += net; }
    recent.push({ at, amount_cents: net, partner_cents: Math.round(net * share), reader: r.label });
  });
  Object.values(readers).forEach(r => { r.partner_cents = Math.round(r.gross_cents * share); });
  Object.values(days).forEach(x => { x.partner_cents = Math.round(x.gross_cents * share); });
  recent.sort((a, b) => b.at - a.at);
  const partner_cents = Object.values(readers).reduce((s, r) => s + r.partner_cents, 0);
  return {
    totals: { gross_cents: gross, partner_cents, rentals, avg_cents: rentals ? Math.round(gross / rentals) : 0 },
    readers: Object.values(readers).sort((a, b) => b.gross_cents - a.gross_cents),
    days: Object.values(days),
    recent: recent.slice(0, 25)
  };
}

function send(res, status, body) { res.statusCode = status; res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(body)); }
function fail(res, e) {
  if (e instanceof HttpError) return send(res, e.status, { ok: false, error: e.code, message: e.message });
  console.error('portaal-fout', e && e.message);
  return send(res, 500, { ok: false, error: 'serverfout', message: 'Er ging iets mis. Probeer het zo opnieuw.' });
}

module.exports = { TZ, ADMIN, DEPOSIT, UUID, HttpError, parts, localMidnight, dayKey, rangeFor, dayList, bearer, whoami, sbGet, PARTNER_SEL, stripeGet, listCharges, listChargesCached, readerOf, netOf, summarize, send, fail };
