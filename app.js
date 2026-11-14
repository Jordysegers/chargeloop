(function(){
'use strict';
var DEF={
 contact:{kvk:'76119890',btw:'NL003047446B03',tel:'+31 6 21135776',email:'info@chargeloop.nl',adres:'Piet Heinstraat 24-101, 4461 GL Goes, Nederland',facebook:'',instagram:'',linkedin:''},
 faq:[
 {id:"u1",cat:"Huren & betalen",order:1,q:"Hoe huur ik een ChargeLoop-powerbank?",a:"Heel eenvoudig! Houd je telefoon of betaalpas tegen de betaalterminal van een ChargeLoop-station. Zodra je betaling is verwerkt, komt er automatisch een powerbank vrij. Pak hem eruit en je kunt direct opladen. Geen app, account of registratie nodig!",q_en:"How do I rent a ChargeLoop power bank?",a_en:"Very simple! Hold your phone or bank card against the payment terminal of a ChargeLoop station. As soon as your payment is processed, a power bank is released automatically. Take it out and you can start charging right away. No app, account or registration needed!"},
 {id:"u2",cat:"Huren & betalen",order:2,home:true,slug:"prijs",q:"Wat kost het huren van een powerbank?",a:"Je betaalt €3,00 per uur, met een maximum van €7,50 per dag. Daarnaast wordt €20 borg gereserveerd. Bij het terugbrengen worden de huurkosten met de borg verrekend. Het resterende bedrag krijg je terug.",q_en:"What does it cost to rent a power bank?",a_en:"You pay €3.00 per hour, with a maximum of €7.50 per day. In addition, a €20 deposit is reserved. When you return it, the rental costs are settled against the deposit. You get the remaining amount back."},
 {id:"u3",cat:"Huren & betalen",order:3,home:true,slug:"borg",q:"Hoe werkt de borg?",a:"Bij het huren wordt €20 borg gereserveerd via je betaalpas of telefoon. Zodra je de powerbank weer inlevert, worden de huurkosten hiervan afgetrokken. De rest van het bedrag krijg je terug via dezelfde betaalmethode.",q_en:"How does the deposit work?",a_en:"When you rent, a €20 deposit is reserved on your bank card or phone. As soon as you return the power bank, the rental costs are deducted from it. You get the rest back via the same payment method."},
 {id:"u4",cat:"Huren & betalen",order:4,home:true,q:"Heb ik een app nodig om een powerbank te huren?",a:"Nee! Bij ChargeLoop houden we het graag simpel. Je hebt geen app, account of registratie nodig. Houd je telefoon of betaalpas tegen de terminal en je kunt meteen op pad.",q_en:"Do I need an app to rent a power bank?",a_en:"No! At ChargeLoop we like to keep things simple. You do not need an app, account or registration. Hold your phone or bank card against the terminal and you are good to go."},
 {id:"u5",cat:"Huren & betalen",order:5,q:"Hoe kan ik betalen?",a:"Je betaalt eenvoudig contactloos met je bankpas of telefoon. Denk bijvoorbeeld aan Apple Pay of Google Pay. Houd je betaalmiddel tegen de terminal en de powerbank komt vrij.",q_en:"How can I pay?",a_en:"You simply pay contactless with your bank card or phone, for example with Apple Pay or Google Pay. Hold your payment method against the terminal and the power bank is released."},
 {id:"u6",cat:"Opladen & gebruik",order:6,home:true,q:"Past de powerbank op mijn telefoon?",a:"Ja! Onze powerbanks hebben drie ingebouwde kabels: USB-C, Lightning en Micro-USB. Daarmee kun je vrijwel iedere smartphone opladen. Je hoeft dus zelf geen kabel mee te nemen.",q_en:"Will the power bank fit my phone?",a_en:"Yes! Our power banks have three built-in cables: USB-C, Lightning and Micro-USB. That lets you charge almost any smartphone, so you do not need to bring a cable yourself."},
 {id:"u7",cat:"Opladen & gebruik",order:7,q:"Hoe snel is mijn telefoon opgeladen?",a:"Onze powerbanks ondersteunen snelladen. Afhankelijk van je toestel en het resterende batterijpercentage kan je telefoon in ongeveer 60 minuten weer volledig opgeladen zijn.",q_en:"How fast is my phone charged?",a_en:"Our power banks support fast charging. Depending on your device and the remaining battery level, your phone can be fully charged again in about 60 minutes."},
 {id:"u8",cat:"Opladen & gebruik",order:8,q:"Kan ik mijn telefoon gebruiken terwijl hij oplaadt?",a:"Natuurlijk! Je kunt je telefoon gewoon blijven gebruiken terwijl deze aan de powerbank is aangesloten. Zo blijf je bereikbaar en hoef je niet op zoek naar een stopcontact.",q_en:"Can I use my phone while it is charging?",a_en:"Of course! You can keep using your phone while it is connected to the power bank. That way you stay reachable and do not have to look for a socket."},
 {id:"u9",cat:"Terugbrengen & borg",order:9,home:true,slug:"inleveren",q:"Waar kan ik mijn powerbank terugbrengen?",a:"Bij ieder ChargeLoop-station! Je hoeft de powerbank dus niet terug te brengen naar de locatie waar je hem hebt gehuurd. Op onze stationskaart vind je alle locaties.",q_en:"Where can I return my power bank?",a_en:"At any ChargeLoop station! You do not have to return the power bank to the location where you rented it. You can find all locations on our station map."},
 {id:"u10",cat:"Terugbrengen & borg",order:10,home:true,q:"Hoe lang mag ik de powerbank houden?",a:"Je kunt de powerbank maximaal 72 uur (3 dagen) huren. Lever je hem niet binnen deze termijn in, dan vervalt je recht op teruggave van de €20 borg.",q_en:"How long can I keep the power bank?",a_en:"You can rent the power bank for a maximum of 72 hours (3 days). If you do not return it within that time, you lose your right to a refund of the €20 deposit."},
 {id:"u11",cat:"Terugbrengen & borg",order:11,q:"Wanneer krijg ik mijn borg terug?",a:"Zodra je de powerbank correct inlevert, worden de huurkosten verrekend met de borg. Het resterende bedrag wordt vrijgegeven via je oorspronkelijke betaalmethode. Hoe snel je dit op je rekening ziet, kan afhangen van je bank.",q_en:"When do I get my deposit back?",a_en:"As soon as you return the power bank correctly, the rental costs are settled against the deposit. The remaining amount is released via your original payment method. How quickly you see it on your account can depend on your bank."},
 {id:"u12",cat:"Terugbrengen & borg",order:12,q:"Wat gebeurt er als ik de powerbank niet binnen 72 uur terugbreng?",a:"Dan vervalt de volledige borg van €20. Zorg er dus voor dat je de powerbank binnen 3 dagen bij een ChargeLoop-station inlevert.",q_en:"What happens if I do not return the power bank within 72 hours?",a_en:"Then the full €20 deposit is forfeited. So make sure you return the power bank to a ChargeLoop station within 3 days."},
 {id:"u13",cat:"Hulp & storingen",order:13,slug:"storing",q:"Mijn powerbank of het station werkt niet. Wat moet ik doen?",a:"Dat is natuurlijk niet de bedoeling! Meld het probleem via ons contactformulier. Vermeld daarbij om welk station het gaat en wat er precies misgaat. We gaan ermee aan de slag en proberen het zo snel mogelijk op te lossen.",q_en:"My power bank or the station does not work. What should I do?",a_en:"That is of course not how it should be! Report the problem via our contact form. Mention which station it is and what exactly goes wrong. We will get to work on it and try to solve it as quickly as possible."},
 {id:"u14",cat:"Hulp & storingen",order:14,q:"Ik heb de powerbank ingeleverd, maar mijn borg nog niet terug. Wat nu?",a:"Soms duurt het even voordat je bank de vrijgave of terugbetaling verwerkt. Heb je na enige tijd nog niets ontvangen? Neem dan contact met ons op via het contactformulier. We kijken graag met je mee.",q_en:"I returned the power bank, but have not got my deposit back yet. What now?",a_en:"Sometimes it takes a while before your bank processes the release or refund. Still nothing after some time? Then contact us via the contact form. We are happy to look into it with you."},
 {id:"b1",cat:"Voor bedrijven & locaties",order:15,q:"Wat kost een ChargeLoop-station voor mijn bedrijf?",a:"Helemaal niets! We plaatsen het station volledig gratis. Je betaalt geen aanschafkosten, huurkosten of vaste maandelijkse kosten. Sterker nog: je ontvangt een commissie tot wel 20% over iedere verhuur via jouw locatie.",q_en:"What does a ChargeLoop station cost my business?",a_en:"Nothing at all! We place the station completely free of charge. You pay no purchase costs, rental costs or fixed monthly costs. Better still: you receive a commission of up to 20% on every rental at your location."},
 {id:"b2",cat:"Voor bedrijven & locaties",order:16,q:"Hoeveel ruimte neemt een ChargeLoop-station in beslag?",a:"Dat valt mee! We hebben verschillende formaten stations met 6, 12, 24 of 48 powerbanks. Daardoor is er voor vrijwel iedere locatie een passende oplossing. Samen kijken we welk formaat het beste past bij jouw beschikbare ruimte en het aantal bezoekers.",q_en:"How much space does a ChargeLoop station take up?",a_en:"Not much! We have stations in different sizes with 6, 12, 24 or 48 power banks, so there is a suitable solution for almost every location. Together we look at which size best fits your available space and number of visitors."},
 {id:"b3",cat:"Voor bedrijven & locaties",order:17,q:"Hoeveel werk heb ik eraan?",a:"Vrijwel niets! ChargeLoop regelt de techniek, het onderhoud en de service. Je hoeft geen powerbanks uit te geven, betalingen te verwerken of het systeem zelf te beheren. Wij zorgen ervoor dat alles werkt, zodat jij er geen omkijken naar hebt.",q_en:"How much work is it for me?",a_en:"Almost none! ChargeLoop takes care of the technology, maintenance and service. You do not have to hand out power banks, process payments or manage the system yourself. We make sure everything works, so you do not have to worry about it."},
 {id:"b4",cat:"Voor bedrijven & locaties",order:18,q:"Wat levert een ChargeLoop-station mij op?",a:"Je ontvangt tot wel 20% commissie over iedere verhuur via jouw locatie. Daarnaast bied je jouw bezoekers een handige extra service. Zo maak je jouw locatie aantrekkelijker én verdien je tegelijkertijd iets extra's.",q_en:"What does a ChargeLoop station earn me?",a_en:"You receive up to 20% commission on every rental at your location. You also offer your visitors a handy extra service. That makes your location more attractive while earning you something extra at the same time."},
 {id:"b5",cat:"Voor bedrijven & locaties",order:19,q:"Voor welke bedrijven is ChargeLoop interessant?",a:"Voor vrijwel iedere locatie waar mensen wat langer verblijven of regelmatig hun telefoon gebruiken. Denk aan cafés, restaurants, hotels, sportscholen, winkels, winkelcentra en uitgaansgelegenheden. Twijfel je of jouw locatie geschikt is? We denken graag met je mee!",q_en:"Which businesses is ChargeLoop interesting for?",a_en:"For almost any location where people stay a little longer or use their phone regularly. Think of cafés, restaurants, hotels, gyms, shops, shopping centres and nightlife venues. Not sure whether your location is suitable? We are happy to think along with you!"},
 {id:"b6",cat:"Voor bedrijven & locaties",order:20,q:"Moet ik zelf het station onderhouden?",a:"Nee, daar hoef je je geen zorgen over te maken. Wij verzorgen de techniek, het onderhoud en de service. Jij stelt alleen een geschikte plek beschikbaar en profiteert van de extra service voor je bezoekers en de commissie op verhuur.",q_en:"Do I have to maintain the station myself?",a_en:"No, you do not need to worry about that. We take care of the technology, maintenance and service. You only provide a suitable spot and benefit from the extra service for your visitors and the commission on rentals."},
 {id:"b7",cat:"Voor bedrijven & locaties",order:21,q:"Welke formaten stations zijn beschikbaar?",a:"We hebben stations met 6, 12, 24 en 48 powerbanks. Zo kunnen we zowel kleinere horecazaken als grotere, drukbezochte locaties bedienen. We adviseren je graag over het juiste formaat.",q_en:"Which station sizes are available?",a_en:"We have stations with 6, 12, 24 and 48 power banks, so we can serve both smaller hospitality venues and larger, busy locations. We are happy to advise you on the right size."},
 {id:"b8",cat:"Voor bedrijven & locaties",order:22,q:"Komt mijn locatie op de ChargeLoop-kaart te staan?",a:"Zeker! Zodra het station bij jou is geplaatst, wordt jouw locatie toegevoegd aan onze stationskaart. Zo kunnen bezoekers eenvoudig zien waar ze een ChargeLoop-powerbank kunnen huren en terugbrengen.",q_en:"Will my location appear on the ChargeLoop map?",a_en:"Definitely! As soon as the station has been placed at your location, it is added to our station map. That way visitors can easily see where they can rent and return a ChargeLoop power bank."},
 {id:"b9",cat:"Voor bedrijven & locaties",order:23,q:"Wat moet ik zelf regelen?",a:"Eigenlijk alleen een geschikte plek voor het station. We bespreken samen de mogelijkheden en verzorgen de verdere plaatsing. Ook voor techniek, onderhoud en service kun je op ons rekenen.",q_en:"What do I need to arrange myself?",a_en:"Really just a suitable spot for the station. We discuss the options together and take care of the rest of the placement. You can also count on us for technology, maintenance and service."},
 {id:"b10",cat:"Voor bedrijven & locaties",order:24,q:"Hoe kan ik ChargeLoop op mijn locatie krijgen?",a:"Leuk dat je interesse hebt! Vul het aanvraagformulier op onze website in en vertel ons iets over jouw locatie. We nemen contact met je op om de mogelijkheden te bespreken. De plaatsing is volledig gratis!",q_en:"How can I get ChargeLoop at my location?",a_en:"Great that you are interested! Fill in the request form on our website and tell us a bit about your location. We will contact you to discuss the options. Placement is completely free!"},
 {id:"e1",cat:"Voor evenementen & festivals",order:25,q:"Kan ChargeLoop ook op mijn evenement of festival staan?",a:"Absoluut! ChargeLoop is ideaal voor festivals, evenementen, beurzen en andere drukbezochte locaties. Bezoekers kunnen eenvoudig een powerbank huren en hun telefoon opladen terwijl ze van het evenement genieten.",q_en:"Can ChargeLoop also be at my event or festival?",a_en:"Absolutely! ChargeLoop is ideal for festivals, events, trade fairs and other busy locations. Visitors can easily rent a power bank and charge their phone while enjoying the event."},
 {id:"e2",cat:"Voor evenementen & festivals",order:26,q:"Wat kost ChargeLoop op een evenement?",a:"Dat hangt af van het evenement, de duur en het aantal benodigde stations. Vertel ons wat je organiseert, dan maken we graag een passend voorstel. Uiteraard geheel vrijblijvend.",q_en:"What does ChargeLoop cost at an event?",a_en:"That depends on the event, its duration and the number of stations needed. Tell us what you are organising and we will gladly make a suitable proposal, of course without any obligation."},
 {id:"e3",cat:"Voor evenementen & festivals",order:27,q:"Wie verzorgt de plaatsing en opbouw van de stations?",a:"Dat doen wij! In overleg met de organisatie verzorgen wij de plaatsing en opbouw van de ChargeLoop-stations. We stemmen vooraf samen af waar de stations het beste kunnen staan. Jij hoeft je dus nergens druk om te maken.",q_en:"Who takes care of placing and setting up the stations?",a_en:"We do! In consultation with the organisation we take care of placing and setting up the ChargeLoop stations. We agree in advance where the stations can best be placed, so you do not have to worry about anything."},
 {id:"e4",cat:"Voor evenementen & festivals",order:28,q:"Hoeveel stations hebben we nodig voor ons evenement?",a:"Dat hangt af van het aantal bezoekers, de grootte van het terrein en de verwachte drukte. We denken graag met je mee over de juiste hoeveelheid en het beste formaat. Met stations van 6, 12, 24 en 48 powerbanks kunnen we verschillende evenementen bedienen.",q_en:"How many stations do we need for our event?",a_en:"That depends on the number of visitors, the size of the site and the expected crowds. We are happy to think along about the right number and the best size. With stations of 6, 12, 24 and 48 power banks we can serve all kinds of events."},
 {id:"e5",cat:"Voor evenementen & festivals",order:29,q:"Hebben bezoekers een app nodig?",a:"Nee! Bezoekers houden simpelweg hun telefoon of betaalpas tegen de betaalterminal, pakken de powerbank en kunnen direct opladen. Geen app, geen account en geen registratie.",q_en:"Do visitors need an app?",a_en:"No! Visitors simply hold their phone or bank card against the payment terminal, take the power bank and can start charging right away. No app, no account and no registration."},
 {id:"e6",cat:"Voor evenementen & festivals",order:30,q:"Hoe snel kan een bezoeker een powerbank huren?",a:"Binnen enkele seconden! Contactloos betalen, powerbank pakken en klaar. Zo kunnen bezoekers snel weer verder genieten van het evenement.",q_en:"How quickly can a visitor rent a power bank?",a_en:"Within seconds! Pay contactless, take a power bank and done. That way visitors can quickly get back to enjoying the event."}
 ],
 stations:[
 {id:'s1',naam:'Voorbeeldlocatie 1',adres:'Wordt aangepast in beheer',plaats:'Goes',lat:51.5041,lng:3.8886,status:'soon',slots:6,uren:'Ma t/m vr 9:00 - 17:00\nZa 10:00 - 16:00',demo:true},
 {id:'s2',naam:'Voorbeeldlocatie 2',adres:'Wordt aangepast in beheer',plaats:'Middelburg',lat:51.4988,lng:3.6136,status:'soon',slots:6,uren:'Ma t/m vr 9:00 - 17:00\nZa 10:00 - 16:00',demo:true}
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
 if(db){try{var s=await db.collection(name).get();if(name==='stations'&&!s.docs.length){var o2=false;try{var d2=await db.doc('settings/demo_off').get();o2=!!(d2&&d2.exists&&d2.data().off)}catch(e){}if(o2)return []}if(s.docs.length){var r=s.docs.map(function(d){var o=Object.assign({},d.data());o.id=d.id;return o});if(name==='stations'){var off=false;try{var od=await db.doc('settings/demo_off').get();off=!!(od&&od.exists&&od.data().off)}catch(e){}if(!off){var have={};r.forEach(function(x){have[x.id]=1});DEF.stations.forEach(function(x){if(!have[x.id])r.unshift(Object.assign({},x))})}}return r}}catch(e){}}
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
function imgs(){if(!imgp)imgp=(async function(){var db=await getDb(),m={};if(!db)return m;try{var s=await db.collection('settings').get();s.docs.forEach(function(d){var x=d.data();if(d.id.indexOf('img_')===0&&x.src)m[d.id.slice(4)]=x.src;if(d.id==='i18n'&&x.m)m.__i18n=x.m;if(d.id==='seo')m.__seo=x})}catch(e){}return m})();return imgp}
async function applyImgs(){var m=await imgs();
 document.querySelectorAll('[data-img]').forEach(function(e){var k=e.dataset.img;if(!m[k])return;if(e.tagName==='IMG'){e.src=m[k]}else{e.innerHTML='<img src="'+m[k]+'" alt="" style="display:block;width:100%;height:100%;object-fit:cover;border-radius:inherit">';e.classList.add('hasimg')}});
 var fl=document.querySelector('#ftr .lg');if(fl&&m.logo_footer){fl.innerHTML='<img src="'+m.logo_footer+'" alt="ChargeLoop">';fl.classList.add('plain');trTree(fl)}}
/* ---------- SEO ---------- */
var SEO={"home":{"p":"/","n":"Home","t":"Powerbank huren zonder app | ChargeLoop","d":"Telefoon leeg? Huur een powerbank bij een ChargeLoop-station. Tik met je pinpas of telefoon, laad onderweg op en lever hem in bij elk station."},"faq":{"p":"/faq","n":"FAQ","t":"Veelgestelde vragen over powerbank huren | ChargeLoop","d":"Wat kost een powerbank huren, hoe betaal je en waar lever je hem in? Lees de antwoorden op de meest gestelde vragen over ChargeLoop."},"contact":{"p":"/contact","n":"Contact","t":"Contact | ChargeLoop","d":"Heb je een vraag over een station of je powerbank? Neem contact op met ChargeLoop via WhatsApp, e-mail of het formulier. We reageren binnen 24 uur."},"bedrijven":{"p":"/voor-bedrijven","n":"Voor bedrijven","t":"Powerbank station in je zaak, zonder kosten | ChargeLoop","d":"Zet een ChargeLoop-station in je horecazaak, winkel of sportschool. Geen investering: wij regelen installatie en onderhoud en jij verdient tot 20% mee."},"festivals":{"p":"/evenementen-en-festivals","n":"Evenementen en festivals","t":"Powerbank verhuur voor evenementen en festivals | ChargeLoop","d":"Houd bezoekers de hele dag opgeladen. ChargeLoop plaatst en beheert powerbank stations op jouw festival of evenement, zonder app en zonder rij."},"vind":{"p":"/vind-een-station","n":"Vind een station","t":"Vind een powerbank station bij jou in de buurt | ChargeLoop","d":"Bekijk op de kaart waar je een powerbank kunt huren en inleveren. Alle ChargeLoop-stations met adres en openingstijden op een rij."}};
window.CL.SEO=SEO;
function setMeta(key,name,val){var m=document.head.querySelector('meta['+key+'="'+name+'"]');if(!m){m=document.createElement('meta');m.setAttribute(key,name);document.head.appendChild(m)}m.setAttribute('content',val)}
function ld(id,o){var s=document.getElementById('ld-'+id);if(!s){s=document.createElement('script');s.type='application/ld+json';s.id='ld-'+id;document.head.appendChild(s)}s.textContent=JSON.stringify(o).replace(/</g,'\\u003c')}
window.CL.ld=ld;
(async function(){var def=SEO[page];if(!def)return;
 var pn=location.pathname.replace(/index\.html$/,'').replace(/\.html$/,'').replace(/(.)\/$/,'$1')||'/',site=location.origin;
 if(pn===def.p){var l=document.head.querySelector('link[rel="canonical"]');if(!l){l=document.createElement('link');l.rel='canonical';document.head.appendChild(l)}l.href=site+def.p;setMeta('property','og:url',site+def.p)}
 var m=await imgs(),o=(m.__seo||{})[page]||{};
 if(o.t){document.title=o.t;setMeta('property','og:title',o.t)}
 if(o.d){setMeta('name','description',o.d);setMeta('property','og:description',o.d)}
 if(page==='home'){var c=await contact(),same=[c.facebook,c.instagram,c.linkedin].filter(function(x){return /^https?:/.test(x||'')});
  var org={'@type':'Organization','@id':site+'/#org',name:'ChargeLoop',url:site+'/',logo:site+'/icon-512.png',slogan:'Tap, Charge & Return.',description:document.querySelector('meta[name="description"]').getAttribute('content')};
  if(c.email)org.email=c.email;if(c.tel)org.telephone=c.tel;if(same.length)org.sameAs=same;
  ld('org',{'@context':'https://schema.org','@graph':[org,{'@type':'WebSite','@id':site+'/#site',name:'ChargeLoop',url:site+'/',inLanguage:'nl-NL',publisher:{'@id':site+'/#org'}}]})}
})();
/* ---------- header / footer ---------- */
var FLAG={nl:'<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="6.67" fill="#AE1C28"/><rect y="6.67" width="30" height="6.67" fill="#fff"/><rect y="13.33" width="30" height="6.67" fill="#21468B"/></svg>',
 en:'<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#012169"/><path d="M0 0L30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" stroke-width="1.6"/><path d="M15 0V20M0 10H30" stroke="#fff" stroke-width="6"/><path d="M15 0V20M0 10H30" stroke="#C8102E" stroke-width="3.4"/></svg>'};
var CHEV='<svg class="chev" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var PINI='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>';

var hdr=document.getElementById('hdr');
var bpages={bedrijven:1,festivals:1,verwijs:1};
var MODELS=[[6,'Ideaal voor kleine horeca, kappers en balies'],[12,'Ideaal voor drukkere horeca, winkels en lobby’s'],[24,'Ideaal voor hotels, winkels en sportscholen'],[48,'Ideaal voor evenementen, beurzen en centra']];
var ARR='<svg class="mg-arr" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 6h13M9 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function stSvg(n,hl){var g={6:[52,62,2,3],12:[50,78,2,6],24:[32,90,2,12],48:[54,90,4,12]}[n],w=g[0],h=g[1],c=g[2],r=g[3],x=(100-w)/2,y=(100-h)/2,sy=y+h*.27,sh=h*.67,cw=w*.76/c,ch=sh/r,col=hl?'#FE6615':'#022943';
 var s='<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="#fff"/><rect x="'+(x+w*.14)+'" y="'+(y+h*.07)+'" width="'+(w*.72)+'" height="'+(h*.14)+'" rx="2" fill="#022943"/>';
 for(var i=0;i<r;i++)for(var j=0;j<c;j++)s+='<rect x="'+(x+w*.12+j*cw+.7)+'" y="'+(sy+i*ch+.7)+'" width="'+(cw-1.4)+'" height="'+(ch-1.4)+'" rx="1.2" fill="'+col+'"/>';
 return s+'</svg>'}
var MI={shop:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18l3-10h30l3 10M6 18v22h36V18M6 18c0 3 2.5 5 6 5s6-2 6-5c0 3 2.500 5 6 5s6-2 6-5c0 3 2.500 5 6 5s6-2 6-5M20 40V30h8v10"/></svg>',
 ticket:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 16h38v6a3 3 0 000 6v6H5v-6a3 3 0 000-6zM30 16v18" stroke-dasharray="3 3"/></svg>',
 phone:'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 6h6l3 9-4 3a22 22 0 0011 11l3-4 9 3v6a4 4 0 01-4 4A32 32 0 0110 10a4 4 0 014-4z"/></svg>'};
var MEGA_M='<div class="dd mega"><button class="ddb" type="button" aria-expanded="false" aria-haspopup="true">Onze modellen'+CHEV+'</button><div class="ddm"><div class="megai"><div class="mg-wrap"><div class="mg-intro"><span class="mg-pill">Modellen</span><h3>Een station voor elke plek</h3><p>Van een compact station op de bar tot een vrijstaande zuil. Wij adviseren je gratis over het beste formaat.</p><div class="mg-act"><a class="mg-lnk" href="voor-bedrijven#stations">Alle modellen vergelijken'+ARR+'</a></div></div><div class="mg-cards mg-c4">'+
 MODELS.map(function(m,i){var hl=i===0;return '<a class="mg-card'+(hl?' hl':'')+'" href="voor-bedrijven#stations"><span class="mg-tile">'+(hl?'<em class="mg-tag">Meest gekozen</em>':'')+'<img class="mg-st s'+m[0]+'" src="model-st'+m[0]+'.webp?v=1794663857" alt="">'+'</span><span class="mg-row"><b>ChargeLoop '+m[0]+'</b>'+ARR+'</span><small>'+m[1]+'</small></a>'}).join('')+
 '</div></div></div></div></div>';
var MEGA_B='<div class="dd mega'+(bpages[page]?' on':'')+'"><button class="ddb" type="button" aria-expanded="false" aria-haspopup="true">Voor bedrijven'+CHEV+'</button><div class="ddm"><div class="megai"><div class="mg-wrap"><div class="mg-intro"><span class="mg-pill">Voor bedrijven</span><h3>Meer gasten, nul investering</h3><p>Wij leveren, plaatsen en beheren het station. Jij verdient mee.</p><div class="mg-act"><a class="mg-go" href="voor-bedrijven#aanvragen">Station aanvragen'+ARR+'</a></div></div><div class="mg-cards mg-c3">'+
 '<a class="mg-card hl" href="voor-bedrijven"><span class="mg-tile mg-ic"><span class="mg-pic" data-img="mega_partner">'+MI.shop+'</span></span><span class="mg-row"><b>Partner worden</b>'+ARR+'</span><small>Wat het oplevert en hoe het werkt</small></a>'+
 '<a class="mg-card" href="evenementen-en-festivals"><span class="mg-tile mg-ic"><span class="mg-pic" data-img="mega_events">'+MI.ticket+'</span></span><span class="mg-row"><b>Evenementen &amp; festivals</b>'+ARR+'</span><small>Stations voor grote drukte</small></a>'+
 '<a class="mg-card" href="#terugbel" data-callback><span class="mg-tile mg-ic"><span class="mg-pic" data-img="mega_terugbel">'+MI.phone+'</span></span><span class="mg-row"><b>Laat ons terugbellen</b>'+ARR+'</span><small>Laat je nummer achter</small></a>'+
 '</div></div></div></div></div>';
var SIMPLE_B='<div class="dd'+(bpages[page]?' on':'')+'"><button class="ddb" type="button" aria-expanded="false" aria-haspopup="true">Voor bedrijven'+CHEV+'</button><div class="ddm"><div class="ddi"><a href="voor-bedrijven"'+(page==='bedrijven'?' class="on"':'')+'>Partner worden</a><a href="evenementen-en-festivals"'+(page==='festivals'?' class="on"':'')+'>Evenementen &amp; festivals</a></div></div></div>';
if(hdr){hdr.innerHTML='<div class="pill"><a class="lg" href="/" aria-label="ChargeLoop, naar de homepage"><img data-img="logo" src="logo.png" alt="ChargeLoop"></a>'+
 '<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>'+
 '<nav class="main" id="nav"><a href="/#hoe-het-werkt">Hoe het werkt</a>'+MEGA_M+''+
 SIMPLE_B+
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
 pinm:'<svg viewBox="0 0 24 24" fill="none" stroke="#8FA7BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
 mailm:'<svg viewBox="0 0 24 24" fill="none" stroke="#8FA7BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/></svg>',
 pinm:'<svg viewBox="0 0 24 24" fill="none" stroke="#8FA7BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.200 7-12a7 7 0 10-14 0c0 5.800 7 12 7 12z"/><circle cx="12" cy="10" r="2.500"/></svg>',
 tel:'<svg viewBox="0 0 24 24" fill="none" stroke="#FE6615" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>',
 mail:'<svg viewBox="0 0 24 24" fill="none" stroke="#FE6615" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/></svg>'};
function telhref(t){return 'tel:'+t.replace(/[^+\d]/g,'')}
var SOC={facebook:'<svg viewBox="0 0 24 24"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8S15.6 3.5 14.3 3.5c-2.700 0-4.400 1.600-4.400 4.500v2.500H7.100v3.300h2.800V22z"/></svg>',instagram:'<svg viewBox="0 0 24 24"><path d="M7.500 2h9A5.500 5.500 0 0122 7.500v9a5.500 5.500 0 01-5.500 5.500h-9A5.500 5.500 0 012 16.500v-9A5.500 5.500 0 017.500 2zm0 2A3.500 3.500 0 004 7.500v9A3.500 3.500 0 007.500 20h9a3.500 3.500 0 003.500-3.500v-9A3.500 3.500 0 0016.500 4zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.300-3.100a1.200 1.200 0 110 2.400 1.200 1.200 0 010-2.400z"/></svg>',linkedin:'<svg viewBox="0 0 24 24"><path d="M4.500 3A1.800 1.800 0 106.300 4.800 1.800 1.800 0 004.500 3zM3 8.500h3V21H3zm5.500 0h2.900v1.700c.5-.9 1.700-2 3.600-2 3.400 0 4 2.200 4 5.100V21h-3v-6.700c0-1.600 0-3.200-2-3.200s-2.400 1.500-2.400 3.100V21h-3z"/></svg>'};
var SOCN={facebook:'Facebook',instagram:'Instagram',linkedin:'LinkedIn'};
function cinfo(c){return ''+
 '<div class="ci">'+IC.pin+'<div><b>Adres</b><span>'+esc(c.adres).split(',').map(function(x){return x.trim()}).join('<br>')+'</span></div></div>'+
 '<div class="ci">'+IC.mail+'<div><b>E-mail</b><a href="mailto:'+esc(c.email)+'">'+esc(c.email)+'</a></div></div>'}
function soc(c){return ['facebook','instagram','linkedin'].map(function(k){return '<a href="'+esc(c[k]||'#')+'" target="_blank" rel="noopener" aria-label="'+SOCN[k]+'">'+SOC[k]+'</a>'}).join('')}
async function footer(){
 var f=document.getElementById('ftr');var c=await contact();C=c;
 var wa='https://wa.me/'+c.tel.replace(/[^\d]/g,'');
 document.querySelectorAll('[data-wa]').forEach(function(a){a.href=wa});document.querySelectorAll('[data-tel]').forEach(function(a){a.href=telhref(c.tel);a.textContent=c.tel});
 document.querySelectorAll('[data-soc]').forEach(function(n){n.innerHTML=soc(c)});
 if(f)f.innerHTML='<div class="wrap"><div class="fcols"><div><a class="lg plain" href="/"><img src="logo-footer.png" alt="ChargeLoop"></a><p class="fp">Tap, Charge &amp; Return. Pak een powerbank, laad op en ga weer door.</p><div class="soc">'+soc(c)+'</div></div>'+
 '<div><h4>Voor jou</h4><a href="/#hoe-het-werkt">Hoe het werkt</a><a href="vind-een-station">Vind een station</a><a href="faq">FAQ</a><a href="contact">Contact</a></div>'+
 '<div><h4>Voor bedrijven</h4><a href="voor-bedrijven">Partner worden</a><a href="voor-bedrijven#stations">Onze modellen</a><a href="evenementen-en-festivals">Evenementen &amp; festivals</a><a href="portaal">Partner inloggen</a></div>'+
 '<div><h4>Contact</h4><div class="cl">'+IC.pinm+'<span>'+esc(c.adres||DEF.contact.adres).split(',').map(function(x){return x.trim()}).join('<br>')+'</span></div><a class="cl" href="mailto:'+esc(c.email)+'">'+IC.mailm+'<span>'+esc(c.email)+'</span></a><a class="cl" href="'+wa+'" target="_blank" rel="noopener">'+IC.wa+'<span>WhatsApp</span></a></div></div>'+
 '<div class="copy"><span>© 2026 ChargeLoop<a class="adm-l" href="beheer" hidden>Beheer</a></span></div></div>';
 document.querySelectorAll('[data-contact]').forEach(function(n){n.innerHTML=cinfo(c)});document.querySelectorAll('[data-c=adres]').forEach(function(n){n.innerHTML=esc(c.adres||DEF.contact.adres).split(',').map(function(x){return x.trim()}).join('<br>')});document.querySelectorAll('[data-c=email]').forEach(function(n){n.textContent=c.email});document.querySelectorAll('[data-mail]').forEach(function(a){a.href='mailto:'+c.email});
 try{if(window.SBAUTH&&SBAUTH.session()){var al=document.querySelector('.adm-l');if(al)al.hidden=false}}catch(e){}
 trTree(document.body);applyImgs()}
footer();
/* ---------- FAQ ---------- */
function faqItem(f){var q=LANG==='en'&&f.q_en?f.q_en:f.q,a=LANG==='en'&&f.a_en?f.a_en:f.a;return '<details'+(f.slug?' id="'+esc(f.slug)+'"':'')+'><summary>'+esc(q)+'</summary><div class="a">'+esc(a).replace(/\n/g,'<br>')+'</div></details>'}
N('Overig');N('Voor gebruikers');var FAQT=function(x){return t(x)};var FAQCATI={"Voor bedrijven & locaties": {"t": "ChargeLoop op jouw locatie?", "p": ["Geef je bezoekers, gasten of klanten een handige extra service én verdien er zelf aan. Met een ChargeLoop-station bied je eenvoudig toegang tot powerbanks, zonder dat je daar zelf werk aan hebt.", "De plaatsing is altijd gratis. Je betaalt geen aanschafkosten, huurkosten of vaste maandelijkse kosten. Sterker nog: je ontvangt tot wel 20% commissie over iedere verhuur via jouw locatie."]}, "Voor evenementen & festivals": {"t": "Een lege telefoon? Niet op jouw evenement!", "p": ["Op een festival, beurs of evenement wil niemand met een lege telefoon komen te staan. Bezoekers willen foto's maken, video's delen, hun vrienden bereiken en natuurlijk bereikbaar blijven.", "Met ChargeLoop bied je bezoekers een eenvoudige oplossing. Wij verzorgen de stations en de opbouw, zodat jij je kunt richten op een geslaagd evenement."]}},FAQUSER=["Huren & betalen", "Opladen & gebruik", "Terugbrengen & borg", "Hulp & storingen"];N('Geen vragen gevonden. Probeer een ander woord.');
(async function(){
 var hs=document.querySelectorAll('[data-faq-home]'),cs=document.querySelectorAll('[data-faq-cat]'),a=document.querySelector('[data-faq-all]');
 if(!hs.length&&!a&&!cs.length)return;var all=(await col('faq')).sort(function(x,y){return (x.order||0)-(y.order||0)});
 var fl=page==='faq'?all:cs.length?all.filter(function(f){return [].some.call(cs,function(h){return h.dataset.faqCat===f.cat})}):[];
 if(fl.length)ld('faq',{'@context':'https://schema.org','@type':'FAQPage',mainEntity:fl.map(function(f){return {'@type':'Question',name:LANG==='en'&&f.q_en?f.q_en:f.q,acceptedAnswer:{'@type':'Answer',text:LANG==='en'&&f.a_en?f.a_en:f.a}}})});
 cs.forEach(function(h){var c=h.dataset.faqCat;h.innerHTML=all.filter(function(f){return f.cat===c}).map(faqItem).join('')});
 hs.forEach(function(h){var s=all.filter(function(f){return f.home});if(!s.length)s=all.slice(0,5);h.innerHTML=s.map(faqItem).join('')});
 if(a){var cats=[];all.forEach(function(f){var c=f.cat||'Overig';if(cats.indexOf(c)<0)cats.push(c)});
  function draw(q){q=(q||'').toLowerCase();var out='';cats.forEach(function(c){var it=all.filter(function(f){var qq=(LANG==='en'&&f.q_en?f.q_en:f.q)+' '+(LANG==='en'&&f.a_en?f.a_en:f.a);return (f.cat||'Overig')===c&&(!q||qq.toLowerCase().indexOf(q)>=0)});if(it.length){if(!q&&FAQUSER.indexOf(c)===0)out+='<h2 class="fq-grp">'+esc(FAQT('Voor gebruikers'))+'</h2>';if(!q&&FAQCATI[c]){out+='<h2 class="fq-grp">'+esc(FAQT(c))+'</h2><div class="fq-intro"><b>'+esc(FAQT(FAQCATI[c].t))+'</b>'+FAQCATI[c].p.map(function(x){return '<p>'+esc(FAQT(x))+'</p>'}).join('')+'</div>'}else out+='<h3>'+esc(FAQT(c))+'</h3>';out+=it.map(faqItem).join('')}});a.innerHTML=out||'<p class="nores">Geen vragen gevonden. Probeer een ander woord.</p>';
   if(!q&&location.hash){var t=document.getElementById(location.hash.slice(1));if(t&&t.tagName==='DETAILS'){t.open=true;t.scrollIntoView()}}}
  draw('');var inp=document.getElementById('fsearch');if(inp)inp.addEventListener('input',function(){draw(inp.value)})}
})();
/* ---------- init taal ---------- */
var FAQEN={};
DEF.faq.forEach(function(f){var e=FAQEN[f.id];if(e){f.q_en=e[0];f.a_en=e[1]}});
if(LANG==='en'){
 try{document.title=t(document.title)}catch(e){}
 trTree(document.body);
 new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){trTree(n)})})}).observe(document.body,{childList:true,subtree:true});
 imgs().then(function(m){if(m.__i18n){Object.assign(EN,m.__i18n);trTree(document.body)}})}

/* ---------- forms ---------- */
var FORMS={
 contact:{title:'Stuur ons een bericht',btn:'Verstuur bericht',ok:N('Bedankt! We reageren zo snel mogelijk.'),f:[['naam','Naam','text',1],['email','E-mailadres','email',1],['telefoon','Telefoonnummer','tel',0],['onderwerp','Onderwerp','select',0,['Vraag over huren','Storing','Voor bedrijven','Overig']],['bericht','Bericht','textarea',1,0,1]]},
 bedrijf:{title:'Station aanvragen',btn:'Informatie aanvragen',ok:N('Bedankt! We nemen binnen een werkdag contact met je op.'),st:3,s1:'Over je zaak',s2:'Jouw gegevens',f:[['bedrijf','Bedrijfsnaam','text',1,0,1],['soort','Wat voor zaak is het?','select',0,['Horeca','Hotel','Winkel of centrum','Sport en leisure','Evenement','Anders']],['plaats','Plaats','text',0],['naam','Naam','text',1,0,1],['email','E-mailadres','email',1],['telefoon','Telefoonnummer','tel',1]]},
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
 h+='<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><div class="full sub"'+(ms?' hidden':'')+'><button class="btn btn-or" type="submit" style="width:100%">'+d.btn+'</button></div><p class="msg full" role="status"></p><small class="full fsec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/></svg><span>Je gegevens worden vertrouwelijk verwerkt.</span></small></form>';
 host.innerHTML=h;var f=host.querySelector('form'),m=host.querySelector('.msg');
 function showOk(txt){if(!window.clOpen){m.className='msg full on';m.textContent=txt;return}var o=window.clOpen('<div class="okp"><svg class="okc" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="36"/><path d="M24 41l11 11 21-23"/></svg><h3>Gelukt!</h3><p>'+txt+'</p><button class="btn btn-or" type="button" data-ok>Sluiten</button></div>','ok');o.querySelector('[data-ok]').onclick=function(){o.querySelector('.mx').click()};window.trTree&&window.trTree(o)}
 function go(n){f.querySelectorAll('.sg').forEach(function(g){g.hidden=g.dataset.g!=n});f.querySelector('.sub').hidden=n!=2;f.querySelectorAll('.stp span').forEach(function(x){x.classList.toggle('on',x.dataset.s==n);x.classList.toggle('done',x.dataset.s<n)});m.className='msg full';var fi=f.querySelector('.sg[data-g="'+n+'"] input,.sg[data-g="'+n+'"] select');if(fi&&n==2)fi.focus()}
 if(ms){f.querySelector('[data-next]').addEventListener('click',function(){var bad=[].filter.call(f.querySelectorAll('.sg[data-g="1"] [required]'),function(i){return !i.value.trim()});if(bad.length){m.className='msg full on err';m.textContent=N('Vul de verplichte velden in.');bad[0].focus();return}go(2)});
  f.querySelector('[data-back]').addEventListener('click',function(e){e.preventDefault();go(1)})}
 f.addEventListener('submit',async function(e){e.preventDefault();
  var fd=new FormData(f);if(fd.get('website'))return;
  var bad=[].filter.call(f.querySelectorAll('[required]'),function(i){return !i.value.trim()});
  if(bad.length){m.className='msg full on err';m.textContent=N('Vul de verplichte velden in.');bad[0].focus();return}
  var data={type:ft,createdAt:Date.now(),status:'nieuw'};fd.forEach(function(v,k){if(k!=='website')data[k]=String(v).trim().slice(0,1500)});
  var b=f.querySelector('button');b.disabled=true;m.className='msg full on';m.style.color='';m.textContent=N('Even geduld...');
  try{var db=await getDb();if(!db)throw 0;await db.collection('leads').add(data);f.reset();if(ms)go(1);m.className='msg full';m.textContent='';showOk(d.ok)}
  catch(x){m.className='msg full on err';m.textContent=t(N('Versturen lukt nu niet. Mail ons via'))+' '+(C.email||DEF.contact.email)+'.'}
  b.disabled=false})}
(function(){var wt=document.querySelector('.wt');if(!wt)return;var hs=wt.querySelectorAll('.hs'),wi=wt.querySelectorAll('.wi'),cur=0,timer=null;
 function set(i){cur=i;hs.forEach(function(h,k){h.classList.toggle('on',k===i)});wi.forEach(function(w,k){w.classList.toggle('on',k===i)})}
 function stop(){if(timer){clearInterval(timer);timer=null}}
 hs.forEach(function(h){h.addEventListener('click',function(){stop();set(+h.dataset.i)})});wi.forEach(function(w){w.addEventListener('click',function(){stop();set(+w.dataset.i)})});
 timer=setInterval(function(){set((cur+1)%wi.length)},4500);})();
window.buildForm=buildForm;document.querySelectorAll('[data-form]').forEach(buildForm);
/* ---------- map ---------- */
function ChMapOSM(box,opts){
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
 window.addEventListener('resize',draw);if(window.ResizeObserver)new ResizeObserver(function(){draw()}).observe(box);
 return {draw:draw,setView:function(a,b,zz){lat=a;lng=b;if(zz)z=zz;draw()},
  set:function(list){marks.forEach(function(m){m.el.remove()});marks=list.map(function(s){var b=document.createElement('button');b.className='mk';b.type='button';b.setAttribute('aria-label',s.naam);b.innerHTML=PIN.replace('COL',s.status!=='soon'?'#FE6615':'#022943');b.addEventListener('click',function(ev){ev.stopPropagation();opts.onpick&&opts.onpick(s)});mlayer.appendChild(b);return {lat:+s.lat,lng:+s.lng,el:b,s:s}});draw()},
  fit:function(){if(!marks.length)return;var la=marks.map(function(m){return m.lat}),lo=marks.map(function(m){return m.lng});var minA=Math.min.apply(0,la),maxA=Math.max.apply(0,la),minO=Math.min.apply(0,lo),maxO=Math.max.apply(0,lo);lat=(minA+maxA)/2;lng=(minO+maxO)/2;var zz=13;while(zz>5){var a=px(maxA,minO,zz),b=px(minA,maxO,zz);if(Math.abs(b.x-a.x)<box.clientWidth*.7&&Math.abs(b.y-a.y)<box.clientHeight*.7)break;zz--}z=zz;draw()},
  select:function(id){marks.forEach(function(m){m.el.classList.toggle('sel',m.s.id===id)})}}}

/* ---------- Google Maps (alleen als er een sleutel is ingesteld; anders de OpenStreetMap-kaart hierboven) ---------- */
var _gp=null;
function loadGmaps(){if(_gp)return _gp;_gp=new Promise(function(res,rej){if(window.google&&google.maps){res();return}
 var done=false,to=setTimeout(function(){if(!done){done=true;rej(new Error('timeout'))}},9000);
 window.__clgm=function(){if(done)return;done=true;clearTimeout(to);res()};
 var s=document.createElement('script');s.async=true;s.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(window.CL_GMAPS_KEY)+'&callback=__clgm&language='+(LANG==='en'?'en':'nl')+'&region=NL';
 s.onerror=function(){if(!done){done=true;clearTimeout(to);rej(new Error('load'))}};document.head.appendChild(s)});_gp.catch(function(){_gp=null});return _gp}
function ChMapG(box,opts){
 var g=document.createElement('div');g.style.cssText='position:absolute;left:0;top:0;right:0;bottom:0';box.insertBefore(g,box.firstChild);
 var m=new google.maps.Map(g,{center:{lat:opts.lat,lng:opts.lng},zoom:opts.z||9,disableDefaultUI:true,zoomControl:true,mapTypeControl:true,mapTypeControlOptions:{mapTypeIds:['roadmap','satellite']},clickableIcons:false,gestureHandling:'greedy'}),marks=[],selId=null;
 function icon(s,sel){var u='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(PIN.replace('COL',s.status!=='soon'?'#FE6615':'#022943').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" '));var k=sel?42:34;return {url:u,scaledSize:new google.maps.Size(k,k),anchor:new google.maps.Point(k/2,k)}}
 if(opts.onclick)m.addListener('click',function(e){opts.onclick(e.latLng.lat(),e.latLng.lng())});
 return {draw:function(){google.maps.event.trigger(m,'resize')},
  setView:function(a,b,zz){m.setCenter({lat:+a,lng:+b});if(zz)m.setZoom(zz)},
  set:function(list){marks.forEach(function(x){x.mk.setMap(null)});marks=list.map(function(s){var mk=new google.maps.Marker({position:{lat:+s.lat,lng:+s.lng},map:m,title:s.naam,icon:icon(s,s.id===selId),zIndex:s.id===selId?5:3});mk.addListener('click',function(){opts.onpick&&opts.onpick(s)});return {mk:mk,s:s}})},
  fit:function(){if(!marks.length)return;var b=new google.maps.LatLngBounds();marks.forEach(function(x){b.extend(x.mk.getPosition())});m.fitBounds(b,40);google.maps.event.addListenerOnce(m,'idle',function(){if(m.getZoom()>13)m.setZoom(13)})},
  select:function(id){selId=id;marks.forEach(function(x){var on=x.s.id===id;x.mk.setIcon(icon(x.s,on));x.mk.setZIndex(on?5:3)})},
  destroy:function(){g.remove()}}}
function ChMap(box,opts){
 if(!window.CL_GMAPS_KEY)return ChMapOSM(box,opts);
 var impl=null,q=[],last={set:null,sel:undefined,view:null},api={};
 function flush(){q.splice(0).forEach(function(c){impl[c[0]].apply(impl,c[1])})}
 ['draw','setView','set','fit','select'].forEach(function(n){api[n]=function(){var a=arguments;if(n==='set')last.set=a;if(n==='select')last.sel=a;if(n==='setView')last.view=a;if(impl)return impl[n].apply(impl,a);q.push([n,a])}});
 function osm(){if(impl&&impl.destroy)impl.destroy();[].slice.call(box.children).forEach(function(c){if(!c.classList.contains('pop'))c.remove()});impl=ChMapOSM(box,opts);if(last.set)impl.set.apply(impl,last.set);if(last.view)impl.setView.apply(impl,last.view);if(last.sel)impl.select.apply(impl,last.sel);flush()}
 window.gm_authFailure=function(){osm()};
 loadGmaps().then(function(){try{impl=ChMapG(box,opts);flush()}catch(e){osm()}},function(){osm()});
 return api}
window.CL.ChMap=ChMap;window.CL.loadGmaps=loadGmaps;window.CL.PIN=PIN;
var mb=document.getElementById('kaartbox');
if(mb){(async function(){
 var st=(await col('stations')).filter(function(s){return s.lat&&s.lng});
 var lst=page==='vind'?st.filter(function(s){return !s.demo&&s.status!=='soon'&&s.naam}):[];
 if(lst.length)ld('stations',{'@context':'https://schema.org','@type':'ItemList',name:'ChargeLoop-stations',itemListElement:lst.map(function(s,i){var a={'@type':'PostalAddress',addressCountry:'NL'};if(s.adres)a.streetAddress=s.adres;if(s.plaats)a.addressLocality=s.plaats;return {'@type':'ListItem',position:i+1,item:{'@type':'Place',name:s.naam,address:a,geo:{'@type':'GeoCoordinates',latitude:+s.lat,longitude:+s.lng}}}})});
 var cm=mb.querySelector('.cmap'),rows=mb.querySelector('.rows'),q=mb.querySelector('input'),sel=null,pop=null;
 var map=ChMap(cm,{lat:51.5,lng:3.8,z:9,onpick:pick});
 var OHD={ma:1,maandag:1,di:2,dinsdag:2,wo:3,woensdag:3,do:4,donderdag:4,vr:5,vrijdag:5,za:6,zaterdag:6,zo:7,zondag:7},OHN=['Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag','Zondag'];function ohFull(l){return l.replace(/[A-Za-z]+/g,function(w){var k=OHD[w.toLowerCase()];if(k)return t(OHN[k-1]);if(/^(tm|tot)$/i.test(w))return w;return w}).replace(/t\/m/gi,t('t/m')).replace(/(t\/m|\bto\b|[,&])\s+([A-Z])/g,function(m,x,y){return x+' '+y.toLowerCase()}).replace(/^./,function(c){return c.toUpperCase()})}function ohDn(i){var n=t(OHN[i-1]);return LANG==='en'?n:n.toLowerCase()}
 function ohDays(p){p=p.toLowerCase().replace(/\./g,'').trim();var all=[1,2,3,4,5,6,7];if(/dagelijks|elke dag|alle dagen/.test(p))return all;
  var m=p.match(/^([a-z]+)\s*(?:t\/m|tm|tot|-|–)\s*([a-z]+)$/);if(m&&OHD[m[1]]&&OHD[m[2]]){var a=OHD[m[1]],b=OHD[m[2]],r=[],i=a;for(var k=0;k<8;k++){r.push(i);if(i===b)break;i=i%7+1}return r}
  var r2=[];p.split(/[,&\/\s]+|\ben\b/).forEach(function(x){if(OHD[x])r2.push(OHD[x])});return r2}
 function ohParse(txt){var out=[];String(txt||'').split(/\n+/).forEach(function(l){l=l.trim();if(!l)return;
  var m=l.match(/^(.*?)[\s:]+(?:(\d{1,2})(?:[:.](\d{2}))?\s*[-–—]\s*(\d{1,2})(?:[:.](\d{2}))?|gesloten)$/i);if(!m)return;
  var d=ohDays(m[1]);if(!d.length)return;out.push({d:d,l:l,s:m[2]!==undefined?(+m[2])*60+(+m[3]||0):null,e:m[4]!==undefined?(+m[4])*60+(+m[5]||0):null,label:m[1].trim()})});return out}
 function ohNow(){try{var p={};new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
  var wd={Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:7}[p.weekday];return {d:wd,m:(+p.hour%24)*60+(+p.minute)}}catch(e){return null}}
 function hm(x){x=x%1440;var h=Math.floor(x/60),m=x%60;return (h<10?'0':'')+h+':'+(m<10?'0':'')+m}
 function ohInfo(txt){var rows=ohParse(txt);if(!rows.length)return null;var n=ohNow();if(!n)return {rows:rows};
  function rng(r,day){return r.d.indexOf(day)>=0&&r.s!==null}
  var open=null;rows.forEach(function(r){if(r.s===null)return;var e=r.e<=r.s?r.e+1440:r.e;
   if(rng(r,n.d)&&n.m>=r.s&&n.m<e)open={until:r.e};
   var py=(n.d+5)%7+1;if(r.e<=r.s&&rng(r,py)&&n.m<r.e)open={until:r.e}});
  if(open)return {rows:rows,open:true,txt:t('Nu open')+' · '+t('tot')+' '+hm(open.until)};
  var best=null;for(var k=0;k<8&&!best;k++){var day=(n.d-1+k)%7+1,c=[];rows.forEach(function(r){if(rng(r,day)&&(k>0||r.s>n.m))c.push(r.s)});if(c.length){c.sort(function(a,b){return a-b});best={k:k,day:day,s:c[0]}}}
  return {rows:rows,open:false,txt:t('Gesloten')+(best?' · '+t('Opent')+' '+(best.k===0?t('vandaag'):ohDn(best.day))+' '+hm(best.s):'')}}
 function ohChip(s){var i=s.uren?ohInfo(s.uren):null;if(!i||i.open===undefined)return '';return '<span class="ohs '+(i.open?'on':'off')+'"><i class="dot"></i>'+esc(i.txt)+'</span>'}
 function ohAll(rows){var cov={};rows.forEach(function(r){r.d.forEach(function(d){cov[d]=1})});var out=rows.slice();for(var d=1;d<=7;d++)if(!cov[d])out.push({d:[d],s:null,e:null,label:OHN[d-1]});return out}
 function ohBlock(s){if(!s.uren)return '';var i=ohInfo(s.uren);if(!i)return '<div class="ohb"><span class="oht">'+N('Openingstijden')+'</span>'+esc(s.uren).replace(/\n+/g,'<br>')+'</div>';
  return '<div class="ohb">'+(i.txt?'<span class="ohs '+(i.open?'on':'off')+'"><i class="dot"></i>'+esc(i.txt)+'</span>':'')+'<ul>'+ohAll(i.rows).map(function(r){var tm=r.s===null?t('Gesloten'):hm(r.s)+' – '+hm(r.e);return '<li><span>'+esc(ohFull(r.label))+'</span><b>'+tm+'</b></li>'}).join('')+'</ul></div>'}
 function stat(s){return s.status==='soon'?'<span class="pillst soon">'+N('Binnenkort')+'</span>':''}
 function pick(s){sel=s.id;map.select(s.id);rows.querySelectorAll('.row').forEach(function(r){r.classList.toggle('sel',r.dataset.id===s.id)});
  if(pop)pop.remove();pop=el('<div class="pop"><b>'+esc(s.naam)+'</b><br>'+esc(s.adres||'')+(s.adres?', ':'')+esc(s.plaats||'')+'<br>'+stat(s)+ohBlock(s)+'</div>');cm.appendChild(pop);map.setView(+s.lat,+s.lng,Math.max(12,14))}
 function list(){var v=(q.value||'').toLowerCase(),f=st.filter(function(s){return !v||(s.naam+' '+s.plaats+' '+(s.adres||'')).toLowerCase().indexOf(v)>=0});
  rows.innerHTML=f.length?f.map(function(s){return '<button class="row'+(s.id===sel?' sel':'')+'" data-id="'+esc(s.id)+'"><b>'+esc(s.naam)+'</b><small>'+esc(s.adres||'')+(s.adres?', ':'')+esc(s.plaats||'')+'</small>'+(s.uren?ohChip(s)||'<small class="oh">'+esc(s.uren).replace(/\n+/g,' · ')+'</small>':'')+stat(s)+'</button>'}).join(''):'<p style="color:var(--muted);padding:8px">'+N('Geen station gevonden. We breiden snel uit!')+'</p>';
  map.set(f);map.select(sel)}
 rows.addEventListener('click',function(e){var r=e.target.closest('.row');if(!r)return;pick(st.find(function(s){return s.id===r.dataset.id}))});
 var lp=mb.querySelector('.lst');if(lp&&!st.some(function(s){return s.status!=='soon'})){if(!st.length){var sk=document.createElement('div');sk.className='skel';sk.setAttribute('aria-hidden','true');sk.innerHTML=[0,1,2,3,4].map(function(i){return '<div class="sk"><i class="sk-p"></i><span><u></u><u></u></span><em></em></div>'}).join('');lp.insertBefore(sk,lp.firstChild)}var nt=document.createElement('div');nt.className='mapnote';nt.innerHTML='<b>'+N('Binnenkort vind je hier onze eerste stations')+'</b><p>'+N('Met adres en openingstijden, zodra een station actief is.')+'</p><div class="mn-a"><a class="btn btn-or" href="voor-bedrijven#aanvragen">'+N('Station voor jouw zaak')+'</a></div>';var bt=lp.querySelector('.lstbtn');if(bt)bt.style.display='none';lp.appendChild(nt);if(!st.length){q.hidden=true;rows.hidden=true}}
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
 window.clOpen=open;document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
 function spec(card){var img=card.querySelector('.lvx').cloneNode(true);var nm=card.dataset.name;
  var o=open('<div class="mdp"><div class="mdi'+(card.classList.contains('feat')?' feat':'')+'">'+img.outerHTML+(card.querySelector('.mslots')?card.querySelector('.mslots').outerHTML:'')+'</div><div class="mdt"><span class="label">Specificaties</span><h3>'+nm+'</h3>'+card.querySelector('.mdet').innerHTML+'<div class="btnrow l"><a class="btn btn-or" href="#aanvragen" data-go>Station aanvragen</a></div></div></div>','spec');
  o.querySelector('[data-go]').addEventListener('click',function(e){e.preventDefault();close();var t=document.getElementById('aanvragen');if(t)t.scrollIntoView({behavior:'smooth'})});window.trTree&&window.trTree(o)}
 document.querySelectorAll('.mdl').forEach(function(c){c.addEventListener('click',function(){spec(c)});c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();spec(c)}})});
 document.addEventListener('click',function(e){var a=e.target.closest('[data-callback]');if(!a)return;e.preventDefault();var o=open('<div class="mcb"><span class="label">Terugbelverzoek</span><h3>Laat ons terugbellen</h3><p>Laat je nummer achter en we bellen je terug. Je hoeft zelf niet te bellen.</p><div data-form="terugbel"></div></div>','cb');window.buildForm(o.querySelector('[data-form]'));window.trTree&&window.trTree(o)});
})();
/* ---------- vaste CTA-balk (mobiel) ---------- */
(function(){var pg=document.body.dataset.page;if(pg==='beheer'||pg==='verwijs'||pg==='portaal')return;var form=document.getElementById('aanvragen');
 var lbl=pg==='festivals'?'Evenement aanmelden':'Gratis station aanvragen';
 var bar=document.createElement('div');bar.id='sbar';
 bar.innerHTML='<div class="sb-t"><b>'+(pg==='festivals'?'ChargeLoop op jouw evenement':'ChargeLoop in jouw zaak')+'</b></div><a class="sb-b" href="'+(form?'#aanvragen':'voor-bedrijven#aanvragen')+'">'+(pg==='festivals'?'Evenement aanmelden':'Gratis station aanvragen')+'</a><button type="button" class="sb-x" aria-label="Sluiten">&times;</button>';
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
