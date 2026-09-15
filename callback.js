(function(){
 'use strict';
 const form=document.getElementById('callback-form');if(!form)return;
 const status=document.getElementById('callback-status'),button=form.querySelector('button[type="submit"]');
 let id=crypto.randomUUID(),busy=false;
 form.addEventListener('submit',async function(event){
  event.preventDefault();if(busy||!form.reportValidity())return;
  const data=new FormData(form);const phone=String(data.get('phone')||'');
  if(!/^\+?[0-9 ()\-./]+$/.test(phone)||!/^\+?\d{6,15}$/.test(phone.replace(/[ ()\-./]/g,''))){status.textContent='Bitte gib eine gültige Telefonnummer ein.';status.focus();return;}
  busy=true;button.disabled=true;button.textContent='Anfrage wird gesendet …';status.textContent='';
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
  try{
   const r=await fetch('https://rollerkompass-klickstatistik.martin-dehn1.chatgpt.site/api/callbacks/collect',{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({id,name:String(data.get('name')||''),phone,model:String(data.get('model')||''),timeWindow:String(data.get('timeWindow')||''),consent:data.get('consent')==='on',consentVersion:'callback-20260915',website:String(data.get('website')||'')}),credentials:'omit',mode:'cors',referrerPolicy:'no-referrer',cache:'no-store',signal:controller.signal});
   const result=await r.json();if(!r.ok||result.ok!==true)throw new Error(result.error||'Die Anfrage konnte nicht gespeichert werden. Bitte versuche es erneut.');
   form.reset();id=crypto.randomUUID();status.textContent='Danke! Deine Rückrufanfrage ist bei Martin angekommen. Er meldet sich bei dir.';
  }catch(error){status.textContent=error.name==='AbortError'?'Die Übertragung dauert zu lange. Deine Eingaben bleiben erhalten. Bitte versuche es erneut.':error.message||'Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.';}
  finally{clearTimeout(timer);busy=false;button.disabled=false;button.textContent='Rückruf anfordern';status.focus();}
 });
})();
