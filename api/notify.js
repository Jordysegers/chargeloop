'use strict';
// POST /api/notify
// Stuurt een melding naar info@ als iemand een formulier op de site invult, via Resend.
// Nodig in Vercel (Environment Variables):
//   RESEND_API_KEY  de API-sleutel uit Resend (verplicht)
//   MAIL_FROM       afzender, bijv. "ChargeLoop Website <website@chargeloop.nl>" (domein moet geverifieerd zijn in Resend)
//   MAIL_TO         ontvanger, standaard info@chargeloop.nl

const TYPES = {
  contact: 'Contactformulier',
  bedrijf: 'Station aanvragen (bedrijf)',
  festival: 'Evenement aanmelden',
  terugbel: 'Terugbelverzoek',
  locatie: 'Locatie getipt',
};

const hits = new Map(); // eenvoudige rem tegen misbruik, per IP
function limited(ip) {
  const now = Date.now(), w = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => now - t < w);
  list.push(now); hits.set(ip, list);
  return list.length > 8;
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, n);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');
  let raw = '';
  for await (const ch of req) { raw += ch; if (raw.length > 40000) throw new Error('te groot'); }
  return JSON.parse(raw || '{}');
}

function reply(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return reply(res, 405, { ok: false, error: 'Alleen POST.' });
    const key = process.env.RESEND_API_KEY;
    if (!key) return reply(res, 503, { ok: false, error: 'RESEND_API_KEY ontbreekt.' });

    // Alleen verzoeken vanaf de eigen site
    const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim().toLowerCase();
    const origin = String(req.headers.origin || '');
    if (origin) { let oh = ''; try { oh = new URL(origin).host.toLowerCase(); } catch (e) {} if (oh !== host) return reply(res, 403, { ok: false, error: 'Onbekende herkomst.' }); }

    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'onbekend';
    if (limited(ip)) return reply(res, 429, { ok: false, error: 'Te veel verzoeken.' });

    const b = await readBody(req);
    if (b.website) return reply(res, 200, { ok: true }); // honeypot ingevuld: stil negeren
    const type = TYPES[b.type] ? b.type : 'contact';
    const fields = (Array.isArray(b.fields) ? b.fields : []).slice(0, 25)
      .map(f => [clean(f && f[0], 80), clean(f && f[1], 2000)])
      .filter(f => f[0] && f[1]);
    if (!fields.length) return reply(res, 400, { ok: false, error: 'Geen gegevens.' });

    const replyTo = clean(b.email, 200);
    const validReply = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(replyTo) ? replyTo : '';
    const naam = clean(b.naam, 120);
    const page = clean(b.page, 200);
    const label = TYPES[type];
    const subject = 'Nieuw via de website: ' + label + (naam ? ' – ' + naam : '');

    const rows = fields.map(([k, v]) =>
      '<tr><td style="padding:8px 14px 8px 0;color:#56677A;vertical-align:top;white-space:nowrap">' + esc(k) + '</td>' +
      '<td style="padding:8px 0;color:#022943;vertical-align:top">' + esc(v).replace(/\n/g, '<br>') + '</td></tr>').join('');
    const html =
      '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#022943;max-width:600px">' +
      '<div style="background:#022943;color:#fff;padding:18px 22px;border-radius:12px 12px 0 0">' +
      '<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#FE6615;font-weight:bold">Nieuw formulier</div>' +
      '<div style="font-size:20px;font-weight:bold;margin-top:4px">' + esc(label) + '</div></div>' +
      '<div style="border:1px solid #E8E1D8;border-top:0;padding:18px 22px;border-radius:0 0 12px 12px">' +
      '<table style="border-collapse:collapse;width:100%">' + rows + '</table>' +
      (validReply ? '<p style="margin:18px 0 0;color:#56677A;font-size:13px">Beantwoord deze mail om direct te reageren aan ' + esc(validReply) + '.</p>' : '') +
      (page ? '<p style="margin:6px 0 0;color:#56677A;font-size:13px">Verstuurd vanaf ' + esc(page) + '</p>' : '') +
      '<p style="margin:6px 0 0;color:#56677A;font-size:13px">Je vindt deze aanvraag ook in Beheer onder Aanvragen.</p>' +
      '</div></div>';
    const text = label + '\n\n' + fields.map(([k, v]) => k + ': ' + v).join('\n') + (page ? '\n\nVerstuurd vanaf ' + page : '');

    const payload = {
      from: process.env.MAIL_FROM || 'ChargeLoop Website <website@chargeloop.nl>',
      to: (process.env.MAIL_TO || 'info@chargeloop.nl').split(',').map(s => s.trim()).filter(Boolean),
      subject, html, text,
    };
    if (validReply) payload.reply_to = validReply;

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { console.error('Resend fout', r.status, j); return reply(res, 502, { ok: false, error: 'Versturen via Resend mislukt.' }); }
    return reply(res, 200, { ok: true, id: j.id || null });
  } catch (e) {
    console.error('notify', e);
    return reply(res, 500, { ok: false, error: 'Er ging iets mis.' });
  }
};
