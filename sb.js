/* Supabase-koppeling: zelfde db-interface als eerder (collection/doc), nu op Supabase (tabel "kv"). */
(function(){
var C=window.SB_CONFIG,KEY='cl_session',REST=C.url+'/rest/v1/kv',AUTH=C.url+'/auth/v1';
function rd(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
function wr(s){try{s?localStorage.setItem(KEY,JSON.stringify(s)):localStorage.removeItem(KEY)}catch(e){}}
function err(code,msg){return {code:code,message:msg}}
async function post(path,body){var r=await fetch(AUTH+path,{method:'POST',headers:{'apikey':C.key,'Content-Type':'application/json'},body:JSON.stringify(body)});var j=await r.json().catch(function(){return{}});if(!r.ok)throw err(j.error_code||j.code||r.status,j.msg||j.error_description||j.message||'Inloggen mislukt');return j}
function keep(j){var s={access_token:j.access_token,refresh_token:j.refresh_token,expires_at:Date.now()+(j.expires_in||3600)*1000-60000,email:(j.user&&j.user.email)||''};wr(s);return s}
async function token(){var s=rd();if(!s)return null;if(Date.now()<s.expires_at)return s.access_token;try{var j=await post('/token?grant_type=refresh_token',{refresh_token:s.refresh_token});s.email=s.email||'';var n=keep(j);if(!n.email)n.email=s.email;wr(n);return n.access_token}catch(e){wr(null);return null}}
async function H(extra){var h={'apikey':C.key,'Content-Type':'application/json'},t=await token();if(t)h['Authorization']='Bearer '+t;for(var k in extra)h[k]=extra[k];return h}
async function call(url,opt){var r=await fetch(url,opt);if(!r.ok){var j=await r.json().catch(function(){return{}});throw err(j.code||r.status,j.message||('HTTP '+r.status))}return r}
function snap(row){return {id:row.id,exists:true,data:function(){return row.data}}}
function qs(c,id){return 'collection=eq.'+encodeURIComponent(c)+(id!=null?'&id=eq.'+encodeURIComponent(id):'')}
function newId(){var a='abcdefghijklmnopqrstuvwxyz0123456789',s='';for(var i=0;i<20;i++)s+=a[Math.floor(Math.random()*36)];return s}
function docRef(c,id){
 if(!c||!id)throw new TypeError('db doc(): ongeldig pad "'+c+'/'+id+'"');
 return {id:id,
  get:async function(){var r=await call(REST+'?select=id,data&'+qs(c,id),{headers:await H()});var a=await r.json();return a.length?snap(a[0]):{id:id,exists:false,data:function(){return undefined}}},
  set:async function(d){await call(REST+'?on_conflict=collection,id',{method:'POST',headers:await H({'Prefer':'resolution=merge-duplicates,return=minimal'}),body:JSON.stringify({collection:c,id:id,data:d,updated_at:new Date().toISOString()})})},
  delete:async function(){await call(REST+'?'+qs(c,id),{method:'DELETE',headers:await H({'Prefer':'return=minimal'})})}}}
function colRef(c){return {
 get:async function(){var r=await call(REST+'?select=id,data&order=updated_at.asc&'+qs(c),{headers:await H()});var a=await r.json();return {docs:a.map(snap)}},
 doc:function(id){return docRef(c,id)},
 add:async function(d){var id=newId();await call(REST,{method:'POST',headers:await H({'Prefer':'return=minimal'}),body:JSON.stringify({collection:c,id:id,data:d})});return docRef(c,id)}}}
window.SBDB={collection:colRef,doc:function(p){var i=String(p).indexOf('/');return docRef(String(p).slice(0,i),String(p).slice(i+1))}};
window.SBAUTH={
 session:function(){return rd()},
 login:async function(email,pw){var j=await post('/token?grant_type=password',{email:email,password:pw});var s=keep(j);if(!s.email)s.email=email;wr(s);return s},
 logout:function(){wr(null)}};
})();
