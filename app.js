(function(){
'use strict';
var DEF={
 contact:{kvk:'76119890',btw:'NL003047446B03',tel:'+31 6 21135776',email:'info@chargeloop.nl',facebook:'',instagram:'',linkedin:''},
 faq:[
 {id:'d1',cat:'Huren en betalen',order:1,home:true,slug:'prijs',q:'Wat kost een powerbank huren?',a:'Je betaalt €3,00 per uur. Vanaf 3 uur gaat het dagtarief in, en dat is nooit hoger dan €7,50 per dag. Daarnaast reserveren we €30 borg. Die krijg je bij het inleveren terug, min de huurkosten. Op sommige locaties kan het tarief afwijken.'},
 {id:'d2',cat:'Huren en betalen',order:2,home:true,q:'Waarom is er geen app?',a:'Omdat je er niets aan hebt. Je pinpas of telefoon is genoeg: tikken, pakken en gaan. Geen download, geen account en geen QR-code.'},
 {id:'d3',cat:'Huren en betalen',order:3,home:true,q:'Past de kabel op mijn telefoon?',a:'Ja. USB-C, Lightning en Micro USB zitten vast aan de powerbank. Er zit dus altijd een kabel bij die past.'},
 {id:'d3b',cat:'Huren en betalen',order:3.5,q:'Hoe snel is mijn telefoon opgeladen?',a:'Onze powerbanks zijn snelladers. Gemiddeld heb je in ongeveer 60 minuten een volle telefoon. Het precieze verschil hangt af van je toestel en hoe leeg het was.'},
 {id:'d4',cat:'Huren en betalen',order:4,q:'Hoe betaal ik?',a:'Contactloos bij de terminal op het station, met je bankpas of met je telefoon (bijvoorbeeld Apple Pay of Google Pay). De betaling loopt via een beveiligde terminal.'},
 {id:'d5',cat:'Inleveren',order:5,home:true,q:'Waar lever ik de powerbank in?',a:'In elk ChargeLoop-station. Het hoeft niet het station te zijn waar je hem pakte. Op de kaart zie je waar onze stations staan.'},
 {id:'d6',cat:'Inleveren',order:6,home:true,q:'Hoelang mag ik hem houden?',a:'Je hebt 4 dagen. Breng je de powerbank daarna nog niet terug, dan mag je hem houden en houden wij de €30 borg definitief in.'},
 {id:'d7',cat:'Inleveren',order:7,q:'Wanneer krijg ik mijn borg terug?',a:'Zodra je de powerbank inlevert. De huurkosten gaan van de borg af en de rest krijg je terug.'},
 {id:'d8',cat:'Storing en hulp',order:8,q:'Het station of de powerbank doet het niet. Wat nu?',a:'Vervelend! Stuur ons een bericht via het contactformulier of bel ons, en vertel erbij welk station het is. Dan lossen we het zo snel mogelijk op.'},
 {id:'d9',cat:'Voor bedrijven',order:9,q:'Wat kost een station voor mijn zaak?',a:'Niets vooraf. Er zijn geen aanschaf-, huur- of vaste kosten. ChargeLoop regelt de techniek, het onderhoud en de service, en jij ontvangt tot 20% van elke verhuur via jouw locatie.'},
 {id:'d10',cat:'Voor bedrijven',order:10,q:'Welk station past bij mijn locatie?',a:'We hebben stations met 6, 12, 24 en 48 powerbanks. Laat je gegevens achter via de aanvraagpagina, dan kijken we samen welk formaat past bij jouw drukte en ruimte.'},
 {id:'d11',cat:'Voor bedrijven',order:11,q:'Staat mijn zaak ook op de kaart?',a:'Ja. Zodra er een station staat, komt jouw locatie op onze stationskaart, zodat mensen je makkelijk kunnen vinden.'},
 {id:'e1',cat:'Evenementen',order:13,q:'Wat kost het voor een evenement?',a:'Dat hangt af van de duur van het evenement en het aantal stations. Vertel kort over je evenement, dan doen we een voorstel zonder verplichtingen.'},
{id:'e2',cat:'Evenementen',order:14,q:'Hoeveel stations hebben we nodig?',a:'Dat bepalen we samen, op basis van het aantal bezoekers en de plekken op het terrein. Voor grote drukte hebben we stations met 24 en 48 slots.'},
{id:'e3',cat:'Evenementen',order:15,q:'Wie regelt de opbouw en het beheer?',a:'We stemmen met je af hoe de stations worden geplaatst en beheerd tijdens het evenement, zodat jij er zo min mogelijk werk aan hebt.'},
{id:'e4',cat:'Evenementen',order:16,q:'Hoe snel kan een bezoeker een powerbank huren?',a:'Binnen 10 seconden. Pas of telefoon tegen het station, powerbank pakken en klaar. Zonder app en zonder account.'},
{id:'d12',cat:'Voor bedrijven',order:12,q:'Hoe werkt een locatie aandragen?',a:'Ken je een zaak waar een ChargeLoop-station thuishoort? Vul het formulier in. Draait er na een maand een station, dan maken wij €50 aan jou over.'}
 ],
 stations:[
 {id:'s1',naam:'Voorbeeldlocatie 1',adres:'Wordt aangepast in beheer',plaats:'Goes',lat:51.5041,lng:3.8886,status:'soon',slots:6,demo:true},
 {id:'s2',naam:'Voorbeeldlocatie 2',adres:'Wordt aangepast in beheer',plaats:'Middelburg',lat:51.4988,lng:3.6136,status:'soon',slots:6,demo:true}
 ]};
var C={};
function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}
if(!location.hash)window.scrollTo(0,0);window.addEventListener('pageshow',function(e){if(e.persisted&&!location.hash)window.scrollTo(0,0)});
var dbp=null;
function getDb(){return Promise.resolve(window.SBDB||null)}
async function col(name){
 var db=await getDb();
 if(db){try{var s=await db.collection(name).get();if(s.docs.length){var r=s.docs.map(function(d){var o=Object.assign({},d.data());o.id=d.id;return o});if(name==='stations'){var off=false;try{var od=await db.doc('settings/demo_off').get();off=!!(od&&od.exists&&od.data().off)}catch(e){}if(!off){var have={};r.forEach(function(x){have[x.id]=1});DEF.stations.forEach(function(x){if(!have[x.id])r.unshift(Object.assign({},x))})}}return r}}catch(e){}}
 return DEF[name].map(function(x){return Object.assign({},x)})}
async function contact(){
 var db=await getDb();
 if(db){try{var d=await db.doc('settings/contact').get();if(d.exists)return Object.assign({},DEF.contact,d.data())}catch(e){}}
 return Object.assign({},DEF.contact)}
window.CL={DEF:DEF,col:col,contact:contact,getDb:getDb,esc:esc,el:el};
/* ---------- taal ---------- */
var page=document.body.dataset.page||'';
var LANG='nl';
try{LANG=localStorage.getItem('cl_lang')||''}catch(e){}
if(!LANG){var wm=/^cl:(nl|en)$/.exec(window.name||'');LANG=wm?wm[1]:'nl'}
var lq=/[?&]lang=(nl|en)/.exec(location.search);if(lq)LANG=lq[1];
if(page==='beheer')LANG='nl';
function saveLang(l){try{localStorage.setItem('cl_lang',l)}catch(e){}window.name='cl:'+l}
var EN=Object.assign({},window.CL_EN||{});
function fnv(s){var b=unescape(encodeURIComponent(s)),h=0x811c9dc5;for(var i=0;i<b.length;i++){h^=b.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h.toString(16)}
function t(s){if(LANG!=='en'||!s)return s;var v=EN[fnv(String(s).replace(/\s+/g,' ').trim())];return v?v:s}
function N(s){return s}
var SKIPN={script:1,style:1,svg:1,textarea:1};
function trText(n){var p=n.parentNode;if(!p||SKIPN[p.nodeName.toLowerCase()])return;var src=n._nl!==undefined?n._nl:n.nodeValue;if(!/[A-Za-zÀ-ſ]/.test(src))return;
 var m=/^(\s*)([\s\S]*?)(\s*)$/.exec(src),core=m[2].replace(/\s+/g,' '),out=t(core);
 if(out===core&&n._nl===undefined)return;if(n._nl===undefined)n._nl=src;n.nodeValue=m[1]+out+m[3]}
var ATT=['placeholder','aria-label','alt','title'];
function trEl(e){if(!e.getAttribute)return;ATT.forEach(function(a){var v=e.getAttribute(a);if(!v&&e['_o_'+a]===undefined)return;var k='_o_'+a,src=e[k]!==undefined?e[k]:v,o=t(src.replace(/\s+/g,' ').trim());if(o!==src||e[k]!==undefined){e[k]=src;e.setAttribute(a,o)}})}
function trTree(root){if(LANG!=='en'||!root)return;if(root.nodeType===3){trText(root);return}if(root.nodeType!==1)return;trEl(root);var w=document.createTreeWalker(root,5),n;while((n=w.nextNode())){if(n.nodeType===3)trText(n);else trEl(n)}}
window.trTree=trTree;
document.documentElement.lang=LANG;
var imgp=null;
function imgs(){if(!imgp)imgp=(async function(){var db=await getDb(),m={};if(!db)return m;try{var s=await db.collection('settings').get();s.docs.forEach(function(d){var x=d.data();if(d.id.indexOf('img_')===0&&x.src)m[d.id.slice(4)]=x.src;if(d.id==='i18n'&&x.m)m.__i18n=x.m})}catch(e){}return m})();return imgp}
async function applyImgs(){var m=await imgs();
 document.querySelectorAll('[data-img]').forEach(function(e){var k=e.dataset.img;if(!m[k])return;if(e.tagName==='IMG'){e.src=m[k]}else{e.innerHTML='<img src="'+m[k]+'" alt="" style="display:block;width:100%;height:100%;object-fit:cover;border-radius:inherit">';e.classList.add('hasimg')}});
 var fl=document.querySelector('#ftr .lg');if(fl&&m.logo_footer){fl.innerHTML='<img src="'+m.logo_footer+'" alt="ChargeLoop">';fl.classList.add('plain');trTree(fl)}}
/* ---------- header / footer ---------- */
var FLAG={nl:'<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="6.67" fill="#AE1C28"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#21468B"/></svg>',
 en:'<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.6"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#C8102E" stroke-width="3.4"/></svg>'};
var CHEV='<svg class="chev" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var PINI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>';
var hdr=document.getElementById('hdr');
var bpages={bedrijven:1,festivals:1,verwijs:1};
if(hdr){hdr.innerHTML='<div class="pill"><a class="lg" href="/" aria-label="ChargeLoop, naar de homepage"><img data-img="logo" src="logo.jpg" alt="ChargeLoop"></a>'+
 '<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>'+
 '<nav class="main" id="nav"><a href="/#hoe-het-werkt">Hoe het werkt</a><a href="voor-bedrijven#stations">Onze modellen</a>'+
 '<div class="dd'+(bpages[page]?' on':'')+'"><button class="ddb" type="button" aria-expanded="false" aria-haspopup="true">Voor bedrijven'+CHEV+'</button><div class="ddm"><div class="ddi"><a href="voor-bedrijven">Partner worden</a><a href="festivals">Evenementen &amp; Festivals</a></div></div></div>'+
 '<a href="faq"'+(page==='faq'?' class="on"':'')+'>FAQ</a><a href="contact"'+(page==='contact'?' class="on"':'')+'>Contact</a>'+
 '<div class="lang"><button class="lb" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Taal"><span class="fl">'+FLAG[LANG]+'</span><span class="lc">'+LANG.toUpperCase()+'</span>'+CHEV+'</button><div class="lm"><div class="ddi"><button type="button" data-l="nl"><span class="fl">'+FLAG.nl+'</span>Nederlands</button><button type="button" data-l="en"><span class="fl">'+FLAG.en+'</span>English</button></div></div></div>'+
 '<a class="btn btn-or find" href="vind-een-station">'+PINI+'Vind een station</a></nav></div>';
 var bg=hdr.querySelector('.burger'),nv=document.getElementById('nav');
 function closeAll(){hdr.querySelectorAll('.dd,.lang').forEach(function(x){x.classList.remove('open');var b=x.querySelector('button');if(b)b.setAttribute('aria-expanded','false')})}
 bg.addEventListener('click',function(){var o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
 hdr.querySelectorAll('.ddb,.lb').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();var p=b.parentNode,o=!p.classList.contains('open');closeAll();p.classList.toggle('open',o);b.setAttribute('aria-expanded',o)})});
 document.addEventListener('click',closeAll);document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll()});
 hdr.querySelectorAll('[data-l]').forEach(function(b){b.addEventListener('click',function(){saveLang(b.dataset.l);var u=location.href.replace(/([?&])lang=(nl|en)&?/,'$1').replace(/[?&]$/,'');location.href=u})});
 nv.addEventListener('click',function(e){if(e.target.closest('a'))nv.classList.remove('open')});
 document.addEventListener('click',function(e){if(!e.target.closest('#hdr')){nv.classList.remove('open');bg.setAttribute('aria-expanded','false');closeAll()}});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){nv.classList.remove('open');closeAll()}})}
var WAVE='<svg viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V118C1250 150 1070 66 830 96C610 124 430 156 230 124C130 108 55 98 0 108Z" fill="#022943" fill-opacity=".2"/><path d="M0 0H1440V92C1270 62 1100 124 870 100C650 78 480 34 270 76C160 98 70 96 0 82Z" fill="#022943" fill-opacity=".45"/><path d="M0 0H1440V58C1300 86 1150 34 960 50C760 68 600 104 400 76C250 54 110 44 0 68Z" fill="#08375D"/></svg>';
document.querySelectorAll('[data-wave]').forEach(function(n){n.classList.add('wavebox');n.innerHTML=WAVE});
var PIN='<svg viewBox="0 0 34 34" aria-hidden="true"><path d="M17 33C17 33 4 20 4 12.5a13 13 0 0126 0C30 20 17 33 17 33z" fill="COL"/><circle cx="17" cy="12.5" r="5" fill="#fff"/></svg>';
var IC={pin:'<svg viewBox="0 0 24 24" fill="none" stroke="#FE6615" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
 wa:'<svg viewBox="0 0 24 24" fill="#8FA7BC"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 1.8a8.2 8.2 0 11-4.2 15.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 0112 3.8zM8.5 7.4c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3 2.4.9 2.9.7 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4l-1.9-.9c-.3-.1-.5-.1-.7.1l-.9 1.1c-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.5-2-.2-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.5-.6-.5z"/></svg>',
 mailm:'<svg viewBox="0 0 24 24" fill="none" stroke="#8FA7BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/></svg>',
 pinm:'<svg viewBox="0 0 24 24" fill="none" stroke="#8FA7BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.200 7-12a7 7 0 10-14 0c0 5.800 7 12 7 12z"/><circle cx="12" cy="10" r="2.500"/></svg>',
 tel:'<svg viewBox="0 0 24 24" fill="none" stroke="#FE6615" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>',
 mail:'<svg viewBox="0 0 24 24" fill="none" stroke="#FE6615" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/></svg>'};
function telhref(t){return 'tel:'+t.replace(/[^+\d]/g,'')}
var SOC={facebook:'<svg viewBox="0 0 24 24"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8S15.6 3.5 14.3 3.5c-2.700 0-4.400 1.600-4.400 4.500v2.500H7.100v3.300h2.800V22z"/></svg>',instagram:'<svg viewBox="0 0 24 24"><path d="M7.500 2h9A5.500 5.500 0 0122 7.500v9a5.500 5.500 0 01-5.500 5.500h-9A5.500 5.500 0 012 16.500v-9A5.500 5.500 0 017.500 2zm0 2A3.500 3.500 0 004 7.500v9A3.500 3.500 0 007.500 20h9a3.500 3.500 0 003.500-3.500v-9A3.500 3.500 0 0016.500 4zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.300-3.100a1.200 1.200 0 110 2.400 1.200 1.200 0 010-2.400z"/></svg>',linkedin:'<svg viewBox="0 0 24 24"><path d="M4.500 3A1.800 1.800 0 106.300 4.800 1.800 1.800 0 004.500 3zM3 8.500h3V21H3zm5.500 0h2.900v1.700c.5-.9 1.700-2 3.600-2 3.400 0 4 2.200 4 5.100V21h-3v-6.700c0-1.600 0-3.200-2-3.200s-2.400 1.500-2.400 3.100V21h-3z"/></svg>'};
var SOCN={facebook:'Facebook',instagram:'Instagram',linkedin:'LinkedIn'};
function cinfo(c){return '<div class="ci">'+IC.tel+'<div><b>Terugbelverzoek</b><a href="#terugbel" data-callback>Laat je nummer achter</a></div></div>'+
 '<div class="ci">'+IC.mail+'<div><b>E-mail</b><a href="mailto:'+esc(c.email)+'">'+esc(c.email)+'</a></div></div>'}
function soc(c){return ['facebook','instagram','linkedin'].map(function(k){return '<a href="'+esc(c[k]||'#')+'" target="_blank" rel="noopener" aria-label="'+SOCN[k]+'">'+SOC[k]+'</a>'}).join('')}
async function footer(){
 var f=document.getElementById('ftr');var c=await contact();C=c;
 var wa='https://wa.me/'+c.tel.replace(/[^\d]/g,'');
 document.querySelectorAll('[data-wa]').forEach(function(a){a.href=wa});document.querySelectorAll('[data-tel]').forEach(function(a){a.href=telhref(c.tel);a.textContent=c.tel});
 document.querySelectorAll('[data-soc]').forEach(function(n){n.innerHTML=soc(c)});
 if(f)f.innerHTML='<div class="wrap"><div class="fcols"><div><a class="lg" href="/"><img src="logo.jpg" alt="ChargeLoop"></a><p class="fp">Tap, Charge &amp; Go. Altijd en overal opgeladen.</p><div class="soc">'+soc(c)+'</div></div>'+
 '<div><h4>Voor jou</h4><a href="/#hoe-het-werkt">Hoe het werkt</a><a href="vind-een-station">Vind een station</a><a href="faq">FAQ</a><a href="contact">Contact</a></div>'+
 '<div><h4>Voor bedrijven</h4><a href="voor-bedrijven">Partner worden</a><a href="voor-bedrijven#stations">Onze modellen</a><a href="festivals">Evenementen &amp; festivals</a><a href="tip-een-locatie">Tip een locatie</a></div>'+
 '<div><h4>Contact</h4><a class="cl" href="'+wa+'" target="_blank" rel="noopener">'+IC.wa+'<span>WhatsApp</span></a><a class="cl" href="mailto:'+esc(c.email)+'">'+IC.mailm+'<span>'+esc(c.email)+'</span></a></div></div>'+
 '<div class="copy"><span>© 2026 ChargeLoop</span><span>KvK '+esc(c.kvk||DEF.contact.kvk)+' · BTW '+esc(c.btw||DEF.contact.btw)+'</span></div></div>';
 document.querySelectorAll('[data-contact]').forEach(function(n){n.innerHTML=cinfo(c)});
 trTree(document.body);applyImgs()}
footer();
/* ---------- FAQ ---------- */
function faqItem(f){var q=LANG==='en'&&f.q_en?f.q_en:f.q,a=LANG==='en'&&f.a_en?f.a_en:f.a;return '<details'+(f.slug?' id="'+esc(f.slug)+'"':'')+'><summary>'+esc(q)+'</summary><div class="a">'+esc(a).replace(/\n/g,'<br>')+'</div></details>'}
N('Huren en betalen');N('Inleveren');N('Storing en hulp');N('Voor bedrijven');N('Overig');N('Geen vragen gevonden. Probeer een ander woord.');
(async function(){
 var hs=document.querySelectorAll('[data-faq-home]'),cs=document.querySelectorAll('[data-faq-cat]'),a=document.querySelector('[data-faq-all]');
 if(!hs.length&&!a&&!cs.length)return;var all=(await col('faq')).sort(function(x,y){return (x.order||0)-(y.order||0)});
 cs.forEach(function(h){var c=h.dataset.faqCat;h.innerHTML=all.filter(function(f){return f.cat===c}).map(faqItem).join('')});
 hs.forEach(function(h){var s=all.filter(function(f){return f.home});if(!s.length)s=all.slice(0,5);h.innerHTML=s.map(faqItem).join('')});
 if(a){var cats=[];all.forEach(function(f){var c=f.cat||'Overig';if(cats.indexOf(c)<0)cats.push(c)});
  function draw(q){q=(q||'').toLowerCase();var out='';cats.forEach(function(c){var it=all.filter(function(f){var qq=(LANG==='en'&&f.q_en?f.q_en:f.q)+' '+(LANG==='en'&&f.a_en?f.a_en:f.a);return (f.cat||'Overig')===c&&(!q||qq.toLowerCase().indexOf(q)>=0)});if(it.length)out+='<h3>'+esc(c)+'</h3>'+it.map(faqItem).join('')});a.innerHTML=out||'<p class="nores">Geen vragen gevonden. Probeer een ander woord.</p>';
   if(!q&&location.hash){var t=document.getElementById(location.hash.slice(1));if(t&&t.tagName==='DETAILS'){t.open=true;t.scrollIntoView()}}}
  draw('');var inp=document.getElementById('fsearch');if(inp)inp.addEventListener('input',function(){draw(inp.value)})}
})();
/* ---------- init taal ---------- */
var FAQEN={e1:['What does it cost for an event?','That depends on the length of the event and the number of stations. Tell us briefly about your event and we will make a proposal with no obligation.'],e2:['How many stations do we need?','We decide that together, based on the number of visitors and the spots on site. For big crowds we have stations with 24 and 48 slots.'],e3:['Who takes care of setup and management?','We agree with you how the stations are placed and managed during the event, so you have as little work as possible.'],e4:['How fast can a visitor rent a power bank?','Within 10 seconds. Card or phone against the station, take a power bank and done. No app and no account.'],d1:['What does it cost to rent a power bank?','You pay €3.00 per hour. From 3 hours on the daily rate applies, which is never more than €7.50 per day. We also reserve a €30 deposit. You get the rest back when you return the power bank.'],
d2:['Why is there no app?','Because you do not need one. Your bank card or phone is enough: tap, grab and go. No download, no account and no QR code.'],
d3:['Will the cable fit my phone?','Yes. USB-C, Lightning and Micro USB are attached to the power bank, so there is always a cable that fits.'],
d3b:['How fast is my phone charged?','Our power banks are fast chargers. On average you have a full phone in about 60 minutes. The exact time depends on your device and how empty it was.'],
d4:['How do I pay?','Contactless at the terminal on the station, with your bank card or your phone (for example Apple Pay or Google Pay). Payment runs through a secure terminal.'],
d5:['Where do I return the power bank?','At any ChargeLoop station. It does not have to be the station where you picked it up. The map shows where our stations are.'],
d6:['How long can I keep it?','You have 4 days. If you have not returned the power bank after that, you can keep it and we keep the €30 deposit.'],
d7:['When do I get my deposit back?','As soon as you return the power bank. The rental costs are deducted from the deposit and you get the rest back.'],
d8:['The station or power bank does not work. What now?','Sorry about that! Send us a message via the contact form or call us, and tell us which station it is. We will fix it as soon as possible.'],
d9:['What does a station for my business cost?','Nothing up front. There are no purchase, rental or fixed costs. ChargeLoop takes care of the technology, maintenance and service, and you receive up to 20% of every rental at your location.'],
d10:['Which station suits my location?','We have stations with 6, 12, 24 and 48 power banks. Leave your details via the request page and we will work out together which size fits your footfall and space.'],
d11:['Will my business be on the map?','Yes. As soon as a station is installed, your location appears on our station map so people can find you easily.'],
d12:['How does tipping a location work?','Do you know a business where a ChargeLoop station belongs? Fill in the form. If a station is running there after a month, we will pay you €50.']};
DEF.faq.forEach(function(f){var e=FAQEN[f.id];if(e){f.q_en=e[0];f.a_en=e[1]}});
if(LANG==='en'){
 try{document.title=t(document.title)}catch(e){}
 trTree(document.body);
 new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){trTree(n)})})}).observe(document.body,{childList:true,subtree:true});
 imgs().then(function(m){if(m.__i18n){Object.assign(EN,m.__i18n);trTree(document.body)}})}

/* ---------- forms ---------- */
var FORMS={
 contact:{title:'Stuur ons een bericht',btn:'Verstuur bericht',ok:N('Bedankt! We reageren zo snel mogelijk.'),f:[['naam','Naam','text',1],['email','E-mailadres','email',1],['telefoon','Telefoonnummer','tel',0],['onderwerp','Onderwerp','select',0,['Vraag over huren','Storing','Voor bedrijven','Overig']],['bericht','Bericht','textarea',1,0,1]]},
 bedrijf:{title:'Station aanvragen',btn:'Informatie aanvragen',ok:N('Bedankt! We nemen binnen een werkdag contact met je op.'),st:3,s1:'Over je zaak',s2:'Jouw gegevens',f:[['bedrijf','Bedrijfsnaam','text',1],['soort','Wat voor zaak is het?','select',0,['Horeca','Hotel','Winkel of centrum','Sport en leisure','Evenement','Anders']],['plaats','Plaats','text',0],['naam','Naam','text',1],['email','E-mailadres','email',1],['telefoon','Telefoonnummer','tel',1]]},
 festival:{title:'',btn:'Verstuur aanvraag',ok:N('Bedankt! We reageren binnen een werkdag met een voorstel.'),st:4,s1:'Over het evenement',s2:'Jouw gegevens',f:[['evenement','Naam van het evenement','text',1],['datum','Datum of periode','text',0],['bezoekers','Verwachte bezoekers','text',0],['plaats','Plaats of locatie','text',0],['naam','Naam','text',1],['bedrijf','Organisatie','text',1],['email','E-mailadres','email',1],['telefoon','Telefoonnummer','tel',1],['opmerking','Opmerking (optioneel)','textarea',0,0,1]]},
 terugbel:{title:'',btn:'Bel mij terug',ok:N('Bedankt! We bellen je zo snel mogelijk terug.'),f:[['naam','Naam','text',1],['telefoon','Telefoonnummer','tel',1],['moment','Wanneer kunnen we je het beste bellen?','select',0,['Ochtend','Middag','Avond','Maakt niet uit']],['bedrijf','Bedrijf of evenement (optioneel)','text',0],['opmerking','Waar gaat het over? (optioneel)','text',0,0,1]]},
 locatie:{title:'',btn:'Locatie aandragen',ok:N('Bedankt voor je tip! Draait er over een maand een station, dan krijg je €50.'),f:[['naam','Jouw naam','text',1],['email','Jouw e-mailadres','email',1],['bedrijf','Naam van de locatie','text',1],['plaats','Plaats','text',1],['opmerking','Contactpersoon of opmerking (optioneel)','text',0,0,1]]}};
function buildForm(host){
 var ft=host.dataset.form,d=FORMS[ft];if(!d)return;
 var h='<form class="fm" novalidate>';
 var ms=d.st?1:0;
 if(ms)h+='<div class="stp full"><span class="on" data-s="1"><b>1</b> '+d.s1+'</span><i></i><span data-s="2"><b>2</b> '+d.s2+'</span></div>';
 d.f.forEach(function(f,ix){if(ms&&ix===0)h+='<div class="sg full" data-g="1">';if(ms&&ix===d.st)h+='<div class="nx full"><button class="btn btn-or" type="button" data-next style="width:100%">Volgende stap</button></div></div><div class="sg full" data-g="2" hidden>';var n=f[0],full=(f[2]==='textarea'||f[5])?' class="full"':'';
  var inp=f[2]==='select'?'<select name="'+n+'"><option value="">Kies</option>'+f[4].map(function(o){return '<option value="'+esc(o)+'">'+o+'</option>'}).join('')+'</select>':f[2]==='textarea'?'<textarea name="'+n+'"'+(f[3]?' required':'')+'></textarea>':'<input name="'+n+'" type="'+f[2]+'"'+(f[3]?' required':'')+' autocomplete="'+(n==='naam'?'name':n==='email'?'email':n==='telefoon'?'tel':'off')+'">';
  h+='<label'+full+'>'+f[1]+inp+'</label>'});
 if(ms)h+='<a href="#" class="bk" data-back>← Vorige stap</a>';
 if(ms)h+='</div>';
 h+='<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><div class="full sub"'+(ms?' hidden':'')+'><button class="btn btn-or" type="submit" style="width:100%">'+d.btn+'</button></div><p class="msg full" role="status"></p><small class="full">Je gegevens worden vertrouwelijk verwerkt.</small></form>';
 host.innerHTML=h;var f=host.querySelector('form'),m=host.querySelector('.msg');
 function go(n){f.querySelectorAll('.sg').forEach(function(g){g.hidden=g.dataset.g!=n});f.querySelector('.sub').hidden=n!=2;f.querySelectorAll('.stp span').forEach(function(x){x.classList.toggle('on',x.dataset.s==n)});m.className='msg full';var fi=f.querySelector('.sg[data-g="'+n+'"] input,.sg[data-g="'+n+'"] select');if(fi&&n==2)fi.focus()}
 if(ms){f.querySelector('[data-next]').addEventListener('click',function(){var bad=[].filter.call(f.querySelectorAll('.sg[data-g="1"] [required]'),function(i){return !i.value.trim()});if(bad.length){m.className='msg full on err';m.textContent=N('Vul de verplichte velden in.');bad[0].focus();return}go(2)});
  f.querySelector('[data-back]').addEventListener('click',function(e){e.preventDefault();go(1)})}
 f.addEventListener('submit',async function(e){e.preventDefault();
  var fd=new FormData(f);if(fd.get('website'))return;
  var bad=[].filter.call(f.querySelectorAll('[required]'),function(i){return !i.value.trim()});
  if(bad.length){m.className='msg full on err';m.textContent=N('Vul de verplichte velden in.');bad[0].focus();return}
  var data={type:ft,createdAt:Date.now(),status:'nieuw'};fd.forEach(function(v,k){if(k!=='website')data[k]=String(v).trim().slice(0,1500)});
  var b=f.querySelector('button');b.disabled=true;m.className='msg full on';m.style.color='';m.textContent=N('Even geduld...');
  try{var db=await getDb();if(!db)throw 0;await db.collection('leads').add(data);f.reset();if(ms)go(1);m.className='msg full on';m.textContent=d.ok}
  catch(x){m.className='msg full on err';m.textContent=t(N('Versturen lukt nu niet. Mail ons via'))+' '+(C.email||DEF.contact.email)+'.'}
  b.disabled=false})}
(function(){var wt=document.querySelector('.wt');if(!wt)return;var hs=wt.querySelectorAll('.hs'),wi=wt.querySelectorAll('.wi'),cur=0,timer=null;
 function set(i){cur=i;hs.forEach(function(h,k){h.classList.toggle('on',k===i)});wi.forEach(function(w,k){w.classList.toggle('on',k===i)})}
 function stop(){if(timer){clearInterval(timer);timer=null}}
 hs.forEach(function(h){h.addEventListener('click',function(){stop();set(+h.dataset.i)})});wi.forEach(function(w){w.addEventListener('click',function(){stop();set(+w.dataset.i)})});
 timer=setInterval(function(){set((cur+1)%wi.length)},4500);})();
window.buildForm=buildForm;document.querySelectorAll('[data-form]').forEach(buildForm);
/* ---------- map ---------- */
function ChMap(box,opts){
 var T=256,z=opts.z||9,lat=opts.lat,lng=opts.lng,marks=[],tiles={},layer=document.createElement('div'),mlayer=document.createElement('div');
 layer.className='mlay';mlayer.className='mlay';mlayer.style.zIndex=2;box.appendChild(layer);box.appendChild(mlayer);
 var zc=el('<div class="zoom"><button aria-label="Inzoomen">+</button><button aria-label="Uitzoomen">–</button></div>');box.appendChild(zc);
 box.appendChild(el('<div class="attr"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" style="color:inherit">© OpenStreetMap-bijdragers</a></div>'));
 function px(la,ln,zz){var s=T*Math.pow(2,zz),r=la*Math.PI/180;return {x:(ln+180)/360*s,y:(1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*s}}
 function ll(x,y,zz){var s=T*Math.pow(2,zz),n=Math.PI-2*Math.PI*y/s;return {lat:180/Math.PI*Math.atan(.5*(Math.exp(n)-Math.exp(-n))),lng:x/s*360-180}}
 function draw(){var w=box.clientWidth,h=box.clientHeight,c=px(lat,lng,z),x0=c.x-w/2,y0=c.y-h/2,n=Math.pow(2,z),need={};
  for(var tx=Math.floor(x0/T);tx<=Math.floor((x0+w)/T);tx++)for(var ty=Math.floor(y0/T);ty<=Math.floor((y0+h)/T);ty++){if(ty<0||ty>=n)continue;var k=z+'/'+(((tx%n)+n)%n)+'/'+ty+'/'+tx;need[k]=1;
   var im=tiles[k];if(!im){im=new Image();im.className='t';im.alt='';im.draggable=false;im.src='https://tile.openstreetmap.org/'+z+'/'+(((tx%n)+n)%n)+'/'+ty+'.png';im.onload=function(){okTiles++;fb.classList.remove('on')};im.onerror=function(){this.style.display='none'};layer.appendChild(im);tiles[k]=im}
   im.style.left=Math.round(tx*T-x0)+'px';im.style.top=Math.round(ty*T-y0)+'px'}
  for(var k2 in tiles)if(!need[k2]){tiles[k2].remove();delete tiles[k2]}
  marks.forEach(function(m){var p=px(m.lat,m.lng,z);m.el.style.left=Math.round(p.x-x0)+'px';m.el.style.top=Math.round(p.y-y0)+'px'})}
 var drag=null,moved=false,okTiles=0;var fb=el('<div class="mfb"><div>De kaart kan hier niet worden geladen.<br>Gebruik de lijst of <a href="https://www.openstreetmap.org/#map=9/'+lat+'/'+lng+'" target="_blank" rel="noopener">open OpenStreetMap</a>.</div></div>');box.insertBefore(fb,mlayer);setTimeout(function(){if(!okTiles)fb.classList.add('on')},5000);
 box.addEventListener('pointerdown',function(e){if(e.target.closest('.zoom,.pop,.mk'))return;drag={x:e.clientX,y:e.clientY,c:px(lat,lng,z)};moved=false;box.setPointerCapture(e.pointerId)});
 box.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>3)moved=true;var p=ll(drag.c.x-dx,drag.c.y-dy,z);lat=Math.max(-80,Math.min(80,p.lat));lng=p.lng;draw()});
 box.addEventListener('pointerup',function(e){if(drag&&!moved&&opts.onclick){var r=box.getBoundingClientRect(),c=px(lat,lng,z),p=ll(c.x-box.clientWidth/2+e.clientX-r.left,c.y-box.clientHeight/2+e.clientY-r.top,z);opts.onclick(p.lat,p.lng)}drag=null});
 function setZ(n){z=Math.max(3,Math.min(18,n));draw()}
 zc.children[0].onclick=function(){setZ(z+1)};zc.children[1].onclick=function(){setZ(z-1)};
 box.addEventListener('wheel',function(e){if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();setZ(z+(e.deltaY<0?1:-1))},{passive:false});
 window.addEventListener('resize',draw);
 return {draw:draw,setView:function(a,b,zz){lat=a;lng=b;if(zz)z=zz;draw()},
  set:function(list){marks.forEach(function(m){m.el.remove()});marks=list.map(function(s){var b=document.createElement('button');b.className='mk';b.type='button';b.setAttribute('aria-label',s.naam);b.innerHTML=PIN.replace('COL',s.status!=='soon'?'#FE6615':'#022943');b.addEventListener('click',function(ev){ev.stopPropagation();opts.onpick&&opts.onpick(s)});mlayer.appendChild(b);return {lat:+s.lat,lng:+s.lng,el:b,s:s}});draw()},
  fit:function(){if(!marks.length)return;var la=marks.map(function(m){return m.lat}),lo=marks.map(function(m){return m.lng});var minA=Math.min.apply(0,la),maxA=Math.max.apply(0,la),minO=Math.min.apply(0,lo),maxO=Math.max.apply(0,lo);lat=(minA+maxA)/2;lng=(minO+maxO)/2;var zz=13;while(zz>5){var a=px(maxA,minO,zz),b=px(minA,maxO,zz);if(Math.abs(b.x-a.x)<box.clientWidth*.7&&Math.abs(b.y-a.y)<box.clientHeight*.7)break;zz--}z=zz;draw()},
  select:function(id){marks.forEach(function(m){m.el.classList.toggle('sel',m.s.id===id)})}}}
window.CL.ChMap=ChMap;window.CL.PIN=PIN;
var mb=document.getElementById('kaartbox');
if(mb){(async function(){
 var st=(await col('stations')).filter(function(s){return s.lat&&s.lng});
 var cm=mb.querySelector('.cmap'),rows=mb.querySelector('.rows'),q=mb.querySelector('input'),sel=null,pop=null;
 var map=ChMap(cm,{lat:51.5,lng:3.8,z:9,onpick:pick});
 function stat(s){return s.status==='soon'?'<span class="pillst soon">'+N('Binnenkort')+'</span>':''}
 function pick(s){sel=s.id;map.select(s.id);rows.querySelectorAll('.row').forEach(function(r){r.classList.toggle('sel',r.dataset.id===s.id)});
  if(pop)pop.remove();pop=el('<div class="pop"><b>'+esc(s.naam)+'</b><br>'+esc(s.adres||'')+(s.adres?', ':'')+esc(s.plaats||'')+'<br>'+stat(s)+(s.slots?' <span style="color:var(--muted)">'+esc(s.slots)+' powerbanks</span>':'')+'<br><a href="https://www.google.com/maps/dir/?api=1&destination='+s.lat+','+s.lng+'" target="_blank" rel="noopener" style="color:var(--or);font-weight:600">Route</a></div>');cm.appendChild(pop);map.setView(+s.lat,+s.lng,Math.max(12,14))}
 function list(){var v=(q.value||'').toLowerCase(),f=st.filter(function(s){return !v||(s.naam+' '+s.plaats+' '+(s.adres||'')).toLowerCase().indexOf(v)>=0});
  rows.innerHTML=f.length?f.map(function(s){return '<button class="row'+(s.id===sel?' sel':'')+'" data-id="'+esc(s.id)+'"><b>'+esc(s.naam)+'</b><small>'+esc(s.adres||'')+(s.adres?', ':'')+esc(s.plaats||'')+'</small>'+stat(s)+'</button>'}).join(''):'<p style="color:var(--muted);padding:8px">'+N('Geen station gevonden. We breiden snel uit!')+'</p>';
  map.set(f);map.select(sel)}
 rows.addEventListener('click',function(e){var r=e.target.closest('.row');if(!r)return;pick(st.find(function(s){return s.id===r.dataset.id}))});
 q.addEventListener('input',list);list();map.fit();if(st.length===1)map.setView(+st[0].lat,+st[0].lng,12);
 if(st.some(function(s){return s.demo})){var n=mb.querySelector('.demo');if(n)n.hidden=false}
})()}
(async function(){var n=document.querySelector('[data-stcount]');if(!n)return;var st=await col('stations');n.textContent=st.length;var l=document.querySelector('[data-stlabel]');if(l)l.textContent=st.length===1?'station':'stations'})();
})();

;(function(){var b=document.createElement('button');b.id='totop';b.type='button';b.setAttribute('aria-label','Terug naar boven');b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';document.body.appendChild(b);
b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
function u(){b.classList.toggle('on',window.scrollY>500)}window.addEventListener('scroll',u,{passive:true});u()})();
/* ---------- levendigheid ---------- */
(function(){try{
 var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;if(RM||!('IntersectionObserver' in window))return;
 var sel='main .head,main .card,main .usp,main .nums>div,main .crow,main .evc,main .br,main .gx>*,main .gsteps>*,main .what>*,main .fcard,main .cta,main .lineup>*,main .flat3>*,main .faq>*,main .tagwrap,main .priceline,main .bat,main .tl3';
 var els=[].slice.call(document.querySelectorAll(sel)).filter(function(e){return !e.closest('.rv-skip')});
 var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);var b=en.target.matches('.nums>div')?en.target.querySelector('b:not([data-stcount])'):null;if(b)count(b)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 els.forEach(function(e){var sib=e.parentElement?[].indexOf.call(e.parentElement.children,e):0;e.style.setProperty('--d',Math.min(sib,5)*90+'ms');e.classList.add('rv');io.observe(e)});
 function count(b){var t=b.textContent.trim();if(!/^\d+$/.test(t))return;var n=+t,s=performance.now(),d=900;if(n<1)return;b.textContent='0';(function f(now){var p=Math.min(1,(now-s)/d);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f);else b.textContent=t})(s)}
}catch(e){}})();

(function(){var mc=document.querySelector('.mc');if(!mc)return;var pv=document.querySelector('.mprev'),nx=document.querySelector('.mnext');
 function upd(){pv.disabled=mc.scrollLeft<8;nx.disabled=mc.scrollLeft+mc.clientWidth>=mc.scrollWidth-8}
 function step(d){var c=mc.querySelector('.mdl');mc.scrollBy({left:d*(c.offsetWidth+24),behavior:'smooth'})}
 pv.addEventListener('click',function(){step(-1)});nx.addEventListener('click',function(){step(1)});mc.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd()})();

/* ---------- popup + terugbel + modelspecs ---------- */
(function(){var ov=null,last=null;
 function close(){if(!ov)return;ov.classList.remove('on');var o=ov;ov=null;setTimeout(function(){o.remove()},250);document.body.classList.remove('mlock');if(last&&last.focus)last.focus()}
 function open(html,cls){close();last=document.activeElement;ov=document.createElement('div');ov.className='mov '+(cls||'');ov.innerHTML='<div class="mbox" role="dialog" aria-modal="true"><button class="mx" type="button" aria-label="Sluiten">&times;</button>'+html+'</div>';document.body.appendChild(ov);document.body.classList.add('mlock');
  ov.addEventListener('click',function(e){if(e.target===ov||e.target.closest('.mx'))close()});requestAnimationFrame(function(){ov.classList.add('on')});var f=ov.querySelector('input,select,button.btn');if(f&&window.innerWidth>700)f.focus();return ov}
 document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
 function spec(card){var img=card.querySelector('.lvx').cloneNode(true);var nm=card.dataset.name;
  var o=open('<div class="mdp"><div class="mdi">'+img.outerHTML+'</div><div class="mdt"><span class="label">Specificaties</span><h3>'+nm+'</h3>'+card.querySelector('.mdet').innerHTML+'<div class="btnrow l"><a class="btn btn-or" href="#aanvragen" data-go>Station aanvragen</a></div></div></div>','spec');
  o.querySelector('[data-go]').addEventListener('click',function(e){e.preventDefault();close();var t=document.getElementById('aanvragen');if(t)t.scrollIntoView({behavior:'smooth'})});window.trTree&&window.trTree(o)}
 document.querySelectorAll('.mdl').forEach(function(c){c.addEventListener('click',function(){spec(c)});c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();spec(c)}})});
 document.addEventListener('click',function(e){var a=e.target.closest('[data-callback]');if(!a)return;e.preventDefault();var o=open('<div class="mcb"><span class="label">Terugbelverzoek</span><h3>Wij bellen jou terug</h3><p>Laat je nummer achter, dan bellen we je binnen een werkdag. Je hoeft zelf niet te bellen.</p><div data-form="terugbel"></div></div>','cb');window.buildForm(o.querySelector('[data-form]'));window.trTree&&window.trTree(o)});
})();
/* ---------- vaste CTA-balk (mobiel) ---------- */
(function(){var pg=document.body.dataset.page;if(pg==='beheer'||pg==='verwijs')return;var form=document.getElementById('aanvragen');
 var lbl=pg==='festivals'?'Evenement aanmelden':'Gratis station aanvragen';
 var bar=document.createElement('div');bar.id='sbar';
 bar.innerHTML='<div class="sb-t"><b>'+(pg==='festivals'?'ChargeLoop op jouw festival':'ChargeLoop in jouw zaak')+'</b></div><a class="sb-b" href="'+(form?'#aanvragen':'voor-bedrijven#aanvragen')+'">'+(pg==='festivals'?'Evenement aanmelden':'Gratis station aanvragen')+'</a><button type="button" class="sb-x" aria-label="Sluiten">&times;</button>';
 document.body.appendChild(bar);window.trTree&&window.trTree(bar);
 if(form)bar.querySelector('.sb-b').addEventListener('click',function(e){e.preventDefault();var go=function(b){window.scrollTo({top:form.getBoundingClientRect().top+window.scrollY+48,behavior:b})};go('smooth');setTimeout(function(){go('auto')},900)});
 bar.querySelector('.sb-x').addEventListener('click',function(){gone=1;upd()});
 var gone=0,tick=0;
 function upd(){tick=0;var vh=window.innerHeight,hero=document.querySelector('.top'),ftr=document.getElementById('ftr'),past=hero?hero.getBoundingClientRect().bottom<0:window.scrollY>300,hid=0;
  if(form){var r=form.getBoundingClientRect();if(r.top<vh*.75&&r.bottom>0)hid=1}
  if(ftr&&ftr.getBoundingClientRect().top<vh)hid=1;
  if(window.scrollY+vh>document.documentElement.scrollHeight-40)hid=1;
  var on=past&&!hid&&!gone;bar.classList.toggle('on',on);document.body.classList.toggle('hassbar',on)}
 function req(){if(!tick){tick=1;requestAnimationFrame(upd)}}
 window.addEventListener('scroll',req,{passive:true});window.addEventListener('resize',req);setTimeout(upd,400);
})();
