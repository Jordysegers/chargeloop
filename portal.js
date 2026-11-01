/* ChargeLoop partnerportaal: inloggen, cijfers per terminal en beheer van partners. */
(function(){
var root=document.getElementById('pt');if(!root)return;
var C=window.SB_CONFIG||null,DEMO=!C,KEY='cl_session',ADMIN_MAIL='jordysegers@hotmail.com';
var RANGES=[['today','Vandaag'],['week','7 dagen'],['month','Deze maand'],['lastmonth','Vorige maand'],['year','Dit jaar']];
var st={range:'week',view:'overview',partnerId:null,data:null,tab:'cijfers',timer:null,first:true,readers:null,partners:null,demoAdmin:false,email:'',loading:false};
function $(s,r){return (r||document).querySelector(s)}
function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var EUR=new Intl.NumberFormat('nl-NL',{style:'currency',currency:'EUR'});
function eur(c){return EUR.format((c||0)/100)}
function pct(n){return String(Number(n)).replace('.',',')+'%'}
var TZ='Europe/Amsterdam';
function fmtTime(ms){return new Date(ms).toLocaleTimeString('nl-NL',{timeZone:TZ,hour:'2-digit',minute:'2-digit',second:'2-digit'})}
function fmtDT(ms){return new Date(ms).toLocaleString('nl-NL',{timeZone:TZ,day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}
function ago(ms){if(!ms)return 'nog niet';var s=Math.max(0,(Date.now()-ms)/1000);if(s<60)return 'zojuist';if(s<3600)return Math.floor(s/60)+' min geleden';if(s<86400)return Math.floor(s/3600)+' uur geleden';return fmtDT(ms)}
function toast(t,err){var n=$('#pt-toast');if(!n){n=document.createElement('p');n.id='pt-toast';n.setAttribute('role','status');document.body.appendChild(n)}n.className='pt-toast on'+(err?' err':'');n.textContent=t;clearTimeout(n._t);n._t=setTimeout(function(){n.className='pt-toast'},6000)}

/* ---------- sessie (zelfde opslag als de beheeromgeving) ---------- */
function rd(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function wr(s){try{s?localStorage.setItem(KEY,JSON.stringify(s)):localStorage.removeItem(KEY)}catch(e){}}
async function aj(path,body,method,tok,q){var h={'apikey':C.key,'Content-Type':'application/json'};if(tok)h.Authorization='Bearer '+tok;var r=await fetch(C.url+'/auth/v1'+path+(q||''),{method:method||'POST',headers:h,body:body?JSON.stringify(body):undefined});var j=await r.json().catch(function(){return{}});if(!r.ok){var e=new Error(j.msg||j.error_description||j.message||'Mislukt');e.code=j.error_code||j.code||r.status;throw e}return j}
function keep(j,email){var s={access_token:j.access_token,refresh_token:j.refresh_token,expires_at:Date.now()+(j.expires_in||3600)*1000-60000,email:(j.user&&j.user.email)||email||''};wr(s);return s}
async function token(){var s=rd();if(!s)return null;if(Date.now()<s.expires_at)return s.access_token;try{var j=await aj('/token?grant_type=refresh_token',{refresh_token:s.refresh_token});var n=keep(j,s.email);if(!n.email)n.email=s.email;wr(n);return n.access_token}catch(e){wr(null);return null}}
function isAdmin(){if(DEMO)return st.demoAdmin;var s=rd();return !!(s&&String(s.email||'').toLowerCase()===ADMIN_MAIL)}

/* ---------- gegevenslaag: echt of demo ---------- */
var N=DEMO?demoLayer():realLayer();
function realLayer(){
 async function call(url,opt){var t=await token();if(!t){var e=new Error('Niet ingelogd');e.code='geen_sessie';throw e}opt=opt||{};opt.headers=Object.assign({Authorization:'Bearer '+t},opt.headers||{});var r=await fetch(url,opt);var j=await r.json().catch(function(){return{}});if(!r.ok||j.ok===false){var er=new Error(j.message||j.msg||('Fout '+r.status));er.code=j.error||j.code||r.status;er.status=r.status;throw er}return j}
 function rest(path,method,body,prefer){return token().then(function(t){if(!t){var e=new Error('Niet ingelogd');e.code='geen_sessie';throw e}var h={apikey:C.key,Authorization:'Bearer '+t,'Content-Type':'application/json'};if(prefer)h.Prefer=prefer;return fetch(C.url+'/rest/v1/'+path,{method:method||'GET',headers:h,body:body?JSON.stringify(body):undefined})}).then(async function(r){var j=r.status===204?null:await r.json().catch(function(){return null});if(!r.ok){var e=new Error((j&&(j.message||j.hint))||('Fout '+r.status));e.code=(j&&j.code)||r.status;e.status=r.status;throw e}return j})}
 return {
  portal:function(range,pid){return call('/api/portal?range='+encodeURIComponent(range)+(pid?'&partner='+encodeURIComponent(pid):''))},
  readers:function(){return call('/api/readers')},
  list:function(){return rest('partners?select=id,name,email,share_pct,active,partner_readers(reader_id,label)&order=name.asc')},
  savePartner:async function(p){
   var body={name:p.name,email:p.email,share_pct:p.share_pct,active:p.active},id=p.id;
   if(id)await rest('partners?id=eq.'+id,'PATCH',body);else{var r=await rest('partners','POST',body,'return=representation');id=r[0].id}
   var have={};(p._orig||[]).forEach(function(x){have[x.reader_id]=1});var want={};p.readers.forEach(function(x){want[x.reader_id]=1});
   for(var k in have)if(!want[k])await rest('partner_readers?reader_id=eq.'+encodeURIComponent(k)+'&partner_id=eq.'+id,'DELETE');
   for(var i=0;i<p.readers.length;i++){var x=p.readers[i];if(have[x.reader_id])await rest('partner_readers?reader_id=eq.'+encodeURIComponent(x.reader_id),'PATCH',{label:x.label});else await rest('partner_readers','POST',{reader_id:x.reader_id,partner_id:id,label:x.label})}
   return id},
  deletePartner:function(id){return rest('partners?id=eq.'+id,'DELETE')}
 }}
function demoLayer(){
 var seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
 var P=[{id:'d1',name:'Café De Haven',email:'info@dehaven.nl',share_pct:20,active:true,partner_readers:[{reader_id:'tmr_demo_1',label:'Bar'},{reader_id:'tmr_demo_2',label:'Terras'}]},
  {id:'d2',name:'Hotel Zeezicht',email:'balie@zeezicht.nl',share_pct:15,active:true,partner_readers:[{reader_id:'tmr_demo_3',label:'Lobby'}]},
  {id:'d3',name:'Festival Zeeland',email:'crew@festival.nl',share_pct:25,active:true,partner_readers:[{reader_id:'tmr_demo_4',label:'Hoofdpodium'},{reader_id:'tmr_demo_5',label:'Camping'},{reader_id:'tmr_demo_6',label:'Foodcourt'}]}];
 function dkey(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
 function span(range){var n=new Date(),d0=new Date(n.getFullYear(),n.getMonth(),n.getDate()),from,to=n;
  if(range==='today')from=d0;else if(range==='week')from=new Date(d0.getTime()-6*864e5);else if(range==='month')from=new Date(n.getFullYear(),n.getMonth(),1);else if(range==='lastmonth'){from=new Date(n.getFullYear(),n.getMonth()-1,1);to=new Date(n.getFullYear(),n.getMonth(),0,23,59,59)}else from=new Date(n.getFullYear(),0,1);return {from:from,to:to}}
 function build(p,range){var s=span(range),share=p.share_pct/100,days=[],map={};seed=p.id.length*13+p.share_pct;
  for(var t=new Date(s.from);t<=s.to;t=new Date(t.getTime()+864e5)){var k=dkey(t),w=t.getDay()===5||t.getDay()===6?1.7:1,n=Math.round((2+rnd()*5)*w*p.partner_readers.length);var g=0;for(var i=0;i<n;i++)g+=[300,300,450,600,750][Math.floor(rnd()*5)];if(range==='today'){n=Math.round(n*.5);g=Math.round(g*.5)}var o={d:k,rentals:n,gross_cents:g,partner_cents:Math.round(g*share)};days.push(o);map[k]=o}
  var rentals=0,gross=0;days.forEach(function(x){rentals+=x.rentals;gross+=x.gross_cents});
  var tot=0,readers=p.partner_readers.map(function(r,i){var f=(i===0?.55:.45/Math.max(1,p.partner_readers.length-1)),g=Math.round(gross*(p.partner_readers.length===1?1:f)),n=Math.round(rentals*(p.partner_readers.length===1?1:f));tot+=Math.round(g*share);return {id:r.reader_id,label:r.label,rentals:n,gross_cents:g,partner_cents:Math.round(g*share),last_at:Date.now()-Math.round(rnd()*50)*60000}});
  var recent=[],tt=Date.now()-3*60000;for(var j=0;j<12;j++){var a=[300,450,600,750,300][Math.floor(rnd()*5)];tt-=(6+Math.round(rnd()*30))*60000;recent.push({at:tt,amount_cents:a,partner_cents:Math.round(a*share),reader:p.partner_readers[j%p.partner_readers.length].label})}
  return {id:p.id,name:p.name,email:p.email,share_pct:p.share_pct,active:p.active,totals:{gross_cents:gross,partner_cents:tot,rentals:rentals,avg_cents:rentals?Math.round(gross/rentals):0},readers:readers,days:days,recent:recent}}
 function wait(v){return new Promise(function(r){setTimeout(function(){r(JSON.parse(JSON.stringify(v)))},250)})}
 var LABEL={today:'Vandaag',week:'Laatste 7 dagen',month:'Deze maand',lastmonth:'Vorige maand',year:'Dit jaar'};
 return {
  portal:function(range,pid){var rg={key:range,label:LABEL[range]};if(st.demoAdmin&&!pid)return wait({ok:true,admin:true,range:rg,generated_at:Date.now(),partners:P.map(function(p){return build(p,range)})});
   var p=P.filter(function(x){return x.id===(pid||'d1')})[0];return wait({ok:true,admin:st.demoAdmin,range:rg,generated_at:Date.now(),partner:build(p,range)})},
  readers:function(){return wait({ok:true,readers:[{id:'tmr_demo_1',label:'Bar',status:'online'},{id:'tmr_demo_2',label:'Terras',status:'online'},{id:'tmr_demo_3',label:'Lobby',status:'online'},{id:'tmr_demo_4',label:'Hoofdpodium',status:'online'},{id:'tmr_demo_5',label:'Camping',status:'offline'},{id:'tmr_demo_6',label:'Foodcourt',status:'online'},{id:'tmr_demo_7',label:'Nieuw station',status:'online'}],linked:[]})},
  list:function(){return wait(P)},
  savePartner:function(p){if(!p.id){p.id='d'+(P.length+1+Math.floor(Math.random()*999));P.push({id:p.id,name:p.name,email:p.email,share_pct:p.share_pct,active:p.active,partner_readers:p.readers.map(function(r){return {reader_id:r.reader_id,label:r.label}})})}else{var x=P.filter(function(q){return q.id===p.id})[0];x.name=p.name;x.email=p.email;x.share_pct=p.share_pct;x.active=p.active;x.partner_readers=p.readers.map(function(r){return {reader_id:r.reader_id,label:r.label}})}return wait(p.id)},
  deletePartner:function(id){P=P.filter(function(x){return x.id!==id});return wait(1)}}}

/* ---------- schermen ---------- */
function shell(inner){root.innerHTML=inner}
function loginView(msg,mode){
 stop();var forgot=mode==='forgot';
 shell('<div class="pt-login"><div class="pt-card"><span class="label">Partnerportaal</span><h2>'+(forgot?'Wachtwoord vergeten':'Inloggen')+'</h2><p class="pt-sub">'+(forgot?'Vul je e-mailadres in. Je krijgt een link om een nieuw wachtwoord te kiezen.':'Bekijk realtime hoe vaak jouw ChargeLoop-station is gebruikt en wat jouw deel is.')+'</p><form id="pt-lf" class="it"><label>E-mailadres<input id="pt-e" type="email" autocomplete="username" required></label>'+(forgot?'':'<label>Wachtwoord<input id="pt-p" type="password" autocomplete="current-password" required></label>')+'<p id="pt-m" class="pt-m'+(msg&&msg.ok?' ok':'')+'" role="alert">'+esc(msg&&msg.t||'')+'</p><div class="acts"><button type="submit" class="btn btn-or">'+(forgot?'Stuur link':'Inloggen')+'</button></div></form><p class="pt-alt"><a href="#" id="pt-sw">'+(forgot?'Terug naar inloggen':'Wachtwoord vergeten?')+'</a></p>'+(DEMO?'':'<p class="pt-hint">Nog geen account? Je krijgt je inloggegevens van ChargeLoop zodra je partner bent.</p>')+'</div></div>');
 $('#pt-sw').onclick=function(e){e.preventDefault();loginView(null,forgot?'':'forgot')};
 $('#pt-lf').onsubmit=async function(e){e.preventDefault();var m=$('#pt-m');m.className='pt-m';m.textContent='Bezig...';var em=$('#pt-e').value.trim();
  try{if(forgot){await aj('/recover',{email:em},'POST',null,'?redirect_to='+encodeURIComponent(location.origin+'/portaal'));loginView({ok:1,t:'Als dit e-mailadres bekend is, is er een mail onderweg. Check ook je spam.'},'forgot')}
  else{var j=await aj('/token?grant_type=password',{email:em,password:$('#pt-p').value});keep(j,em);start()}}
  catch(x){m.className='pt-m';m.textContent=forgot?'Versturen mislukt. Probeer het later opnieuw.':'Inloggen mislukt: controleer je e-mailadres en wachtwoord.'}}}
function passwordView(){
 stop();shell('<div class="pt-login"><div class="pt-card"><span class="label">Partnerportaal</span><h2>Kies een wachtwoord</h2><p class="pt-sub">Dit wachtwoord gebruik je voortaan om in te loggen.</p><form id="pt-pf" class="it"><label>Nieuw wachtwoord (minimaal 8 tekens)<input id="pt-n" type="password" autocomplete="new-password" minlength="8" required></label><p id="pt-m" class="pt-m" role="alert"></p><div class="acts"><button type="submit" class="btn btn-or">Opslaan</button></div></form></div></div>');
 $('#pt-pf').onsubmit=async function(e){e.preventDefault();var m=$('#pt-m');m.textContent='Bezig...';try{var t=await token();await aj('/user',{password:$('#pt-n').value},'PUT',t);start()}catch(x){m.textContent='Opslaan mislukt: '+(x.message||'probeer het opnieuw')}}}
function msgView(title,text,logout){stop();shell('<div class="pt-login"><div class="pt-card"><h2>'+esc(title)+'</h2><p class="pt-sub">'+text+'</p>'+(logout?'<div class="acts"><button class="btn btn-navy" id="pt-lo2">Uitloggen</button></div>':'')+'</div></div>');if(logout)$('#pt-lo2').onclick=logoutNow}
function logoutNow(){wr(null);st.data=null;st.partnerId=null;st.view='overview';st.first=true;DEMO?demoStart():loginView()}

function bar(who,extra){return '<div class="pt-bar"><div><span class="label">'+(isAdmin()?'Beheerder':'Partner')+'</span><h2>'+esc(who)+'</h2></div><div class="pt-bar-r"><span class="pt-live" id="pt-live"><i></i><span>Live</span></span>'+(extra||'')+'<button class="pt-link" id="pt-lo">Uitloggen</button></div></div>'}
function rangeTabs(){return '<div class="tabs pt-tabs" role="group" aria-label="Periode">'+RANGES.map(function(r){return '<button data-r="'+r[0]+'" class="'+(st.range===r[0]?'on':'')+'" aria-pressed="'+(st.range===r[0])+'">'+r[1]+'</button>'}).join('')+'</div>'}
function bind(){var lo=$('#pt-lo');if(lo)lo.onclick=logoutNow;root.querySelectorAll('[data-r]').forEach(function(b){b.onclick=function(){st.range=b.getAttribute('data-r');load(true)}})}

/* ---------- grafiek ---------- */
var MON=['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'],DAY=['zo','ma','di','wo','do','vr','za'];
function chart(days){
 var pts=days.map(function(d){var p=d.d.split('-');var dt=new Date(+p[0],+p[1]-1,+p[2]);return {v:d.partner_cents,n:d.rentals,g:d.gross_cents,l:dt.getDate()+' '+MON[dt.getMonth()],ll:days.length<=10?DAY[dt.getDay()]+' '+dt.getDate():dt.getDate()+' '+MON[dt.getMonth()],t:DAY[dt.getDay()]+' '+dt.getDate()+' '+MON[dt.getMonth()]}});
 if(days.length>62){var g={},o=[];days.forEach(function(d){var k=d.d.slice(0,7);if(!g[k]){g[k]={v:0,n:0,g:0,l:MON[+k.slice(5)-1],ll:MON[+k.slice(5)-1],t:MON[+k.slice(5)-1]+' '+k.slice(0,4)};o.push(g[k])}g[k].v+=d.partner_cents;g[k].n+=d.rentals;g[k].g+=d.gross_cents});pts=o}
 var max=0;pts.forEach(function(p){if(p.v>max)max=p.v});
 if(!max)return '<p class="pt-empty">Nog geen verhuren in deze periode.</p>';
 var W=Math.max(280,Math.min(720,Math.round((root.clientWidth||720)-(root.clientWidth<600?44:56)))),H=W<420?190:220,pl=4,pr=4,pt=22,pb=26,n=pts.length,bw=(W-pl-pr)/n,gap=Math.min(12,bw*.28),ch=H-pt-pb,every=Math.ceil(n/7),s='';
 pts.forEach(function(p,i){var h=Math.max(p.v?3:0,Math.round(p.v/max*ch)),x=pl+i*bw+gap/2,w=Math.max(2,bw-gap),y=pt+ch-h;
  s+='<g class="pt-b"><rect x="'+x.toFixed(1)+'" y="'+pt+'" width="'+w.toFixed(1)+'" height="'+ch+'" fill="transparent"/>'+(h?'<rect class="pt-bar-r" x="'+x.toFixed(1)+'" y="'+y+'" width="'+w.toFixed(1)+'" height="'+h+'" rx="'+Math.min(8,w/2).toFixed(1)+'"/>':'')+'<title>'+esc(p.t+': '+eur(p.v)+' voor jou, '+p.n+' '+(p.n===1?'verhuur':'verhuren'))+'</title></g>';
  if(i%every===0||i===n-1&&every===1)s+='<text x="'+(x+w/2).toFixed(1)+'" y="'+(H-7)+'" text-anchor="middle">'+esc(n<=10?p.ll:(n>31?p.l:p.ll))+'</text>'});
 return '<svg class="pt-chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Staafgrafiek van jouw deel per '+(days.length>62?'maand':'dag')+'"><text x="'+pl+'" y="12" class="pt-max">'+esc(eur(max))+'</text><line x1="0" x2="'+W+'" y1="'+(pt+ch)+'" y2="'+(pt+ch)+'" class="pt-base"/>'+s+'</svg>'}

/* ---------- dashboard van één partner ---------- */
function dash(d,rangeLabel,backBtn){
 var t=d.totals;
 return '<div class="pt-kpis"><div class="pt-k main"><small>Jouw deel</small><b>'+eur(t.partner_cents)+'</b><span>'+pct(d.share_pct)+' van de totale omzet · '+esc(rangeLabel)+'</span></div>'+
 '<div class="pt-k"><small>Verhuren</small><b>'+t.rentals+'</b><span>'+(t.rentals===1?'keer gebruikt':'keer gebruikt')+'</span></div>'+
 '<div class="pt-k"><small>Totale omzet</small><b>'+eur(t.gross_cents)+'</b><span>via jouw terminals</span></div>'+
 '<div class="pt-k"><small>Gemiddeld</small><b>'+eur(t.avg_cents)+'</b><span>per verhuur</span></div></div>'+
 '<div class="pt-card"><div class="pt-ch"><h3>Verloop</h3><span class="pt-sub">Jouw deel per '+(d.days.length>62?'maand':'dag')+'</span></div>'+chart(d.days)+'</div>'+
 '<div class="pt-card"><h3>Terminals</h3>'+(d.readers.length?'<div class="pt-t"><div class="pt-th"><span>Terminal</span><span>Verhuren</span><span>Omzet</span><span>Jouw deel</span><span>Laatste verhuur</span></div>'+d.readers.map(function(r){return '<div class="pt-tr"><span data-l="Terminal"><b>'+esc(r.label)+'</b></span><span data-l="Verhuren">'+r.rentals+'</span><span data-l="Omzet">'+eur(r.gross_cents)+'</span><span data-l="Jouw deel"><b>'+eur(r.partner_cents)+'</b></span><span data-l="Laatste verhuur">'+(r.last_at?ago(r.last_at):'-')+'</span></div>'}).join('')+'</div>':'<p class="pt-empty">Er zijn nog geen terminals aan dit account gekoppeld.</p>')+'</div>'+
 '<div class="pt-card"><h3>Laatste verhuren</h3>'+(d.recent.length?'<ul class="pt-rec">'+d.recent.map(function(r){return '<li><span class="pt-dot"></span><div><b>'+esc(r.reader)+'</b><small>'+esc(fmtDT(r.at))+'</small></div><div class="pt-amt"><b>'+eur(r.partner_cents)+'</b><small>van '+eur(r.amount_cents)+'</small></div></li>'}).join('')+'</ul>':'<p class="pt-empty">Nog geen verhuren in deze periode.</p>')+'</div>'+
 '<p class="pt-note">Omzet is wat klanten via de terminal betaald hebben voor het huren, zonder borg en na terugbetalingen. Dit scherm ververst zichzelf elke 30 seconden.</p>'}

function render(){
 var d=st.data;if(!d)return;var admin=isAdmin(),html='',who;
 if(admin&&d.partners){ // overzicht van alle partners
  html=bar('Alle partners','')+tabsAdmin()+(st.tab==='beheer'?'<div id="pt-manage"></div>':rangeTabs()+overview(d));
 }else{
  var p=d.partner;who=p.name;
  var back=admin?'<button class="pt-link" id="pt-back">← Alle partners</button>':'';
  html=bar(who,back)+rangeTabs()+(d.truncated?'<p class="pt-warn">Er zijn heel veel betalingen in deze periode. De cijfers zijn mogelijk niet volledig. Kies een kortere periode.</p>':'')+dash(p,d.range.label);
 }
 root.innerHTML=html;bind();stamp();
 var b=$('#pt-back');if(b)b.onclick=function(){st.partnerId=null;st.view='overview';load(true)};
 root.querySelectorAll('[data-open]').forEach(function(r){r.onclick=function(){st.partnerId=r.getAttribute('data-open');load(true)}});
 root.querySelectorAll('[data-tab]').forEach(function(b){b.onclick=function(){st.tab=b.getAttribute('data-tab');render();if(st.tab==='beheer')manage()}});
 if(admin&&d.partners&&st.tab==='beheer')manage();
}
function tabsAdmin(){return '<div class="tabs pt-tabs"><button data-tab="cijfers" class="'+(st.tab==='cijfers'?'on':'')+'">Cijfers</button><button data-tab="beheer" class="'+(st.tab==='beheer'?'on':'')+'">Partners beheren</button></div>'}
function overview(d){
 var gt=0,pt=0,rn=0;d.partners.forEach(function(p){gt+=p.totals.gross_cents;pt+=p.totals.partner_cents;rn+=p.totals.rentals});
 return '<div class="pt-kpis"><div class="pt-k main"><small>Totale omzet</small><b>'+eur(gt)+'</b><span>'+esc(d.range.label)+' · alle partners</span></div><div class="pt-k"><small>Verhuren</small><b>'+rn+'</b><span>keer gebruikt</span></div><div class="pt-k"><small>Naar partners</small><b>'+eur(pt)+'</b><span>afgesproken percentage</span></div><div class="pt-k"><small>Voor ChargeLoop</small><b>'+eur(gt-pt)+'</b><span>na partnerdeel</span></div></div>'+
 '<div class="pt-card"><h3>Partners</h3>'+(d.partners.length?'<div class="pt-t pt-t6"><div class="pt-th"><span>Partner</span><span>%</span><span>Verhuren</span><span>Omzet</span><span>Aan partner</span><span>Voor jou</span></div>'+d.partners.map(function(p){return '<div class="pt-tr click" tabindex="0" role="button" data-open="'+esc(p.id)+'"><span data-l="Partner"><b>'+esc(p.name)+'</b>'+(p.active?'':' <em class="pt-off">inactief</em>')+'<small>'+p.readers.length+' '+(p.readers.length===1?'terminal':'terminals')+'</small></span><span data-l="%">'+pct(p.share_pct)+'</span><span data-l="Verhuren">'+p.totals.rentals+'</span><span data-l="Omzet">'+eur(p.totals.gross_cents)+'</span><span data-l="Aan partner">'+eur(p.totals.partner_cents)+'</span><span data-l="Voor jou"><b>'+eur(p.totals.gross_cents-p.totals.partner_cents)+'</b></span></div>'}).join('')+'</div><p class="pt-sub" style="margin-top:12px">Klik op een partner om te zien wat die partner ziet.</p>':'<p class="pt-empty">Nog geen partners. Maak er een aan onder "Partners beheren".</p>')+'</div>'+
 (d.truncated?'<p class="pt-warn">Er zijn heel veel betalingen in deze periode. De cijfers zijn mogelijk niet volledig. Kies een kortere periode.</p>':'')}
function stamp(){var n=$('#pt-live span');if(n&&st.stamp)n.textContent='Live · '+fmtTime(st.stamp)}

/* ---------- laden en verversen ---------- */
async function load(spin){
 if(st.loading)return;st.loading=true;
 if(spin&&st.data){root.classList.add('busy')}
 try{
  var d=await N.portal(st.range,st.partnerId);st.data=d;st.stamp=d.generated_at||Date.now();root.classList.remove('busy');
  if(st.first&&!DEMO){st.first=false}
  if(!(isAdmin()&&d.partners&&st.tab==='beheer'&&$('#pt-manage')))render();else stamp();
  schedule();
 }catch(e){
  root.classList.remove('busy');
  if(e.code==='geen_sessie'||e.code==='ongeldige_sessie'||e.status===401){wr(null);loginView({t:'Je sessie is verlopen. Log opnieuw in.'})}
  else if(e.code==='geen_partner'||e.code==='niet_actief'){msgView(e.code==='niet_actief'?'Account niet actief':'Nog geen toegang',esc(e.message),true)}
  else if(e.code==='stripe_niet_gekoppeld'||e.code==='stripe_geen_toegang'){
   if(isAdmin()){shell(bar('Beheerder','')+'<div class="pt-card"><h3>Stripe is nog niet gekoppeld</h3><p class="pt-sub">'+esc(e.message)+'</p><p class="pt-sub">Zie het stappenplan <b>PORTAAL-STAPPEN.md</b>. Je kunt ondertussen wel partners aanmaken.</p><div class="acts"><button class="btn btn-navy" id="pt-tomanage">Partners beheren</button></div></div>');bind();var m=$('#pt-tomanage');if(m)m.onclick=function(){st.tab='beheer';st.data={admin:true,partners:[],range:{label:''}};render()}}
   else msgView('Even geduld','De cijfers zijn nu niet beschikbaar. We werken eraan. Probeer het later opnieuw.',true)}
  else{if(st.data){toast('Verversen mislukt, ik probeer het zo opnieuw.',true);schedule()}else msgView('Er ging iets mis',esc(e.message||'Probeer het zo opnieuw.'),true)}
 }finally{st.loading=false}
}
function schedule(){stop();if(st.tab==='beheer'&&isAdmin()&&!st.partnerId)return;st.timer=setTimeout(function(){if(document.hidden){schedule();return}load(false)},30000)}
function stop(){clearTimeout(st.timer);st.timer=null}
document.addEventListener('visibilitychange',function(){if(!document.hidden&&st.data&&!st.loading&&st.timer!==null&&Date.now()-(st.stamp||0)>20000)load(false)});

/* ---------- beheer van partners (alleen beheerder) ---------- */
var M={list:[],readers:[],linked:{}};
async function manage(){
 var host=$('#pt-manage');if(!host)return;host.innerHTML='<div class="pt-card"><p class="pt-sub">Laden...</p></div>';
 try{
  var r=await Promise.all([N.list(),N.readers().catch(function(e){return {readers:[],linked:[],err:e.message}})]);
  M.list=r[0]||[];M.readers=r[1].readers||[];M.err=r[1].err||'';M.linked={};M.list.forEach(function(p){(p.partner_readers||[]).forEach(function(x){M.linked[x.reader_id]=p.id})});
  drawManage();
 }catch(e){host.innerHTML='<div class="pt-card"><p class="pt-sub">Laden mislukt: '+esc(e.message||'')+'. Is de SQL uit <b>supabase-partners.sql</b> al uitgevoerd in Supabase?</p></div>'}
}
function readerOpts(sel,partnerId){
 var o='<option value="">Kies een terminal</option>',seen={};
 M.readers.forEach(function(r){seen[r.id]=1;var other=M.linked[r.id]&&M.linked[r.id]!==partnerId;o+='<option value="'+esc(r.id)+'"'+(r.id===sel?' selected':'')+(other?' disabled':'')+'>'+esc((r.label?r.label+' · ':'')+r.id+(r.status?' · '+r.status:'')+(other?' (al gekoppeld)':''))+'</option>'});
 if(sel&&!seen[sel])o+='<option value="'+esc(sel)+'" selected>'+esc(sel)+'</option>';
 return o}
function partnerCard(p){
 var id=p.id||'nieuw';
 return '<form class="it pt-pf" data-id="'+esc(id)+'"><div class="pt-pfh"><b>'+esc(p.name||'Nieuwe partner')+'</b>'+(p.id?'<small>'+esc(p.email)+'</small>':'')+'</div>'+
 '<div class="pt-row"><label>Naam<input name="name" value="'+esc(p.name||'')+'" required placeholder="Bijvoorbeeld Café De Haven"></label><label>E-mailadres (voor inloggen)<input name="email" type="email" value="'+esc(p.email||'')+'" required></label></div>'+
 '<div class="pt-row"><label>Percentage van de totale omzet<span class="pt-pct"><input name="share" type="number" min="0" max="100" step="0.5" value="'+esc(p.share_pct!=null?p.share_pct:20)+'" required><i>%</i></span></label><label class="pt-chk"><input name="active" type="checkbox"'+(p.active===false?'':' checked')+'> Actief (mag inloggen)</label></div>'+
 '<div class="pt-rd"><b>Gekoppelde terminals</b><div class="pt-rdl">'+((p.partner_readers||[]).map(function(r){return rdRow(r.reader_id,r.label,p.id)}).join(''))+'</div><button type="button" class="pt-link" data-add>+ Terminal toevoegen</button>'+(M.err?'<small class="pt-warnt">Terminals ophalen uit Stripe lukt nog niet ('+esc(M.err)+').</small>':'')+'</div>'+
 '<p class="pt-m" role="alert"></p><div class="acts"><button type="submit">Opslaan</button>'+(p.id?'<button type="button" class="del" data-del>Verwijderen</button>':'<button type="button" class="del" data-cancel>Annuleren</button>')+'</div></form>'}
function rdRow(rid,label,pid){return '<div class="pt-rdr"><select name="rid">'+readerOpts(rid,pid)+'</select><input name="rlabel" value="'+esc(label||'')+'" placeholder="Naam, bijv. Bar"><button type="button" class="pt-x" data-rm aria-label="Terminal loskoppelen">×</button></div>'}
function drawManage(){
 var host=$('#pt-manage');if(!host)return;
 host.innerHTML='<div class="pt-card"><div class="pt-ch"><h3>Partners beheren</h3><button class="btn btn-or pt-sm" id="pt-new">+ Nieuwe partner</button></div>'+
 '<details class="pt-how"><summary>Hoe geef ik een partner toegang?</summary><ol><li>Maak hier de partner aan: naam, e-mailadres, percentage en de terminal(s).</li><li>Maak in Supabase een inlog aan met <b>hetzelfde e-mailadres</b>: Authentication, Users, Add user, Create new user (laat "Auto Confirm User" aan).</li><li>Stuur de partner de link naar dit portaal en het wachtwoord. Via "Wachtwoord vergeten?" kiest de partner zelf een eigen wachtwoord.</li></ol></details>'+
 '<div id="pt-forms">'+(M.list.length?M.list.map(partnerCard).join(''):'<p class="pt-empty">Nog geen partners.</p>')+'</div></div>';
 $('#pt-new').onclick=function(){var f=$('#pt-forms');if($('.pt-pf[data-id="nieuw"]',f))return;var w=document.createElement('div');w.innerHTML=partnerCard({active:true,partner_readers:[{reader_id:'',label:''}]});f.insertBefore(w.firstChild,f.firstChild);wire(f.firstChild);f.firstChild.querySelector('input[name=name]').focus()};
 host.querySelectorAll('.pt-pf').forEach(wire)}
function wire(f){
 var id=f.getAttribute('data-id'),m=f.querySelector('.pt-m');
 f.querySelector('[data-add]').onclick=function(){var w=document.createElement('div');w.innerHTML=rdRow('','',id==='nieuw'?null:id);f.querySelector('.pt-rdl').appendChild(w.firstChild);bindRm(f)};
 bindRm(f);
 f.querySelectorAll('select[name=rid]').forEach(function(s){s.onchange=autoLabel});
 var del=f.querySelector('[data-del]');if(del)del.onclick=async function(){if(!confirm('Deze partner en de koppelingen met de terminals verwijderen? Het inlogaccount in Supabase blijft bestaan.'))return;try{await N.deletePartner(id);toast('Partner verwijderd.');manage()}catch(e){m.textContent='Verwijderen mislukt: '+(e.message||'')}};
 var can=f.querySelector('[data-cancel]');if(can)can.onclick=function(){f.remove()};
 f.onsubmit=async function(e){e.preventDefault();m.className='pt-m';m.textContent='Bezig...';
  var base=M.list.filter(function(x){return x.id===id})[0];
  var rows=[].slice.call(f.querySelectorAll('.pt-rdr')).map(function(r){return {reader_id:r.querySelector('select').value,label:r.querySelector('input').value.trim()}}).filter(function(r){return r.reader_id});
  var ids={},dup=false;rows.forEach(function(r){if(ids[r.reader_id])dup=true;ids[r.reader_id]=1});if(dup){m.textContent='Een terminal staat dubbel in de lijst.';return}
  var p={id:id==='nieuw'?null:id,name:f.name.value.trim(),email:f.email.value.trim().toLowerCase(),share_pct:parseFloat(String(f.share.value).replace(',','.')),active:f.active.checked,readers:rows,_orig:base?(base.partner_readers||[]):[]};
  if(!(p.share_pct>=0&&p.share_pct<=100)){m.textContent='Vul een percentage tussen 0 en 100 in.';return}
  try{await N.savePartner(p);toast('Opgeslagen.');manage()}
  catch(x){var t=String(x.message||'');m.textContent=/duplicate|23505|unique/i.test(t+x.code)?'Dit e-mailadres of deze terminal is al in gebruik bij een andere partner.':'Opslaan mislukt: '+t}}}
function bindRm(f){f.querySelectorAll('[data-rm]').forEach(function(b){b.onclick=function(){b.parentNode.remove()}});f.querySelectorAll('select[name=rid]').forEach(function(s){s.onchange=autoLabel})}
function autoLabel(e){var s=e.target,inp=s.parentNode.querySelector('input');if(!inp.value){var r=M.readers.filter(function(x){return x.id===s.value})[0];if(r&&r.label)inp.value=r.label}}

/* ---------- start ---------- */
function hashSession(){
 var h=location.hash.replace(/^#/,'');if(h.indexOf('access_token=')<0)return null;
 var p={};h.split('&').forEach(function(kv){var i=kv.indexOf('=');p[kv.slice(0,i)]=decodeURIComponent(kv.slice(i+1))});
 try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
 if(!p.access_token)return null;
 wr({access_token:p.access_token,refresh_token:p.refresh_token||'',expires_at:Date.now()+(parseInt(p.expires_in||'3600',10))*1000-60000,email:''});
 return p.type||'';
}
async function start(){
 st.first=true;st.view='overview';st.tab='cijfers';st.partnerId=null;st.data=null;
 shell('<div class="pt-card"><p class="pt-sub">Even laden...</p></div>');
 // e-mailadres uit de sessie halen als dat ontbreekt (na uitnodiging of herstellink)
 var s=rd();if(s&&!s.email){try{var t=await token();var u=await (await fetch(C.url+'/auth/v1/user',{headers:{apikey:C.key,Authorization:'Bearer '+t}})).json();s=rd();s.email=u.email||'';wr(s)}catch(e){}}
 load(false)}
function demoStart(){
 st.first=true;st.tab='cijfers';st.partnerId=null;st.data=null;
 var b=document.getElementById('pt-demo');
 if(!b){b=document.createElement('div');b.id='pt-demo';b.className='pt-demo';root.parentNode.insertBefore(b,root)}
 b.innerHTML='<b>Voorbeeld met nepgegevens.</b> Zo ziet het portaal eruit. <span class="pt-demos"><button class="'+(!st.demoAdmin?'on':'')+'" data-d="p">Als partner</button><button class="'+(st.demoAdmin?'on':'')+'" data-d="a">Als beheerder</button></span>';
 b.querySelectorAll('[data-d]').forEach(function(x){x.onclick=function(){st.demoAdmin=x.getAttribute('data-d')==='a';st.partnerId=null;st.tab='cijfers';demoStart()}});
 load(false)}
var ty=DEMO?null:hashSession();
if(DEMO)demoStart();
else if(ty==='recovery'||ty==='invite')passwordView();
else if(rd())start();
else loginView();
})();
