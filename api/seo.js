'use strict';
// GET /sitemap.xml en /robots.txt (via rewrites in vercel.json).
// Het adres komt uit het verzoek zelf, zodat dit klopt op elk domein waar de site op draait.
const PAGES = ['/', '/vind-een-station', '/voor-bedrijven', '/evenementen-en-festivals', '/faq', '/contact'];

module.exports = (req, res) => {
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim().replace(/[^A-Za-z0-9.:-]/g, '');
  const site = 'https://' + host.replace(/^www\./i, '');
  const f = (req.query && req.query.f) || '';
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  if (f === 'robots') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send('User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ' + site + '/sitemap.xml\n');
    return;
  }
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    PAGES.map((p) => '  <url><loc>' + site + p + '</loc></url>').join('\n') + '\n</urlset>\n');
};
