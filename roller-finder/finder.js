(() => {
  'use strict';

  const root = document.getElementById('finder');
  const products = Array.isArray(window.PRODUCTS) ? window.PRODUCTS : [];
  const answers = {};
  let step = 0;

  const questions = [
    {key:'type',title:'Welche Fahrzeugart suchst du?',help:'Wenn du noch unsicher bist, vergleichen wir verschiedene Bauarten.',options:[
      ['Kabinenroller','Kabinenroller','Geschützt vor Wind und Regen'],
      ['E-Roller','E-Roller','Kompakt und offen'],
      ['Seniorenmobile','Seniorenmobil','Stabiler Aufbau und bequemer Zugang'],
      ['E-Chopper','E-Chopper','Entspanntes Fahrgefühl und markanter Stil'],
      ['Highspeed & 125er','Schneller E-Roller','Mehr als 45 km/h'],
      ['offen','Noch unsicher','Mehrere Fahrzeugarten prüfen']
    ]},
    {key:'speed',title:'Welches Mindesttempo brauchst du?',help:'Entscheidend sind deine regelmäßigen Wege. Prüfe später die Fahrzeugklasse und Fahrerlaubnis.',options:[
      [25,'25 km/h','Ruhige, kurze Wege'],[45,'45 km/h','Viele Stadt- und Alltagswege'],[80,'Über 45 km/h','Schnellere Strecken']
    ]},
    {key:'distance',title:'Wie weit fährst du an einem typischen Tag?',help:'Wir berücksichtigen nur Modelle, deren veröffentlichte Reichweite diese Strecke wenigstens rechnerisch abdeckt.',options:[
      [10,'Bis 10 km','Kurze Erledigungen'],[25,'Bis 25 km','Regelmäßige Wege'],[40,'Bis 40 km','Längere Tagesstrecken'],[60,'Bis 60 km','Reichweite ist besonders wichtig']
    ]},
    {key:'charge',title:'Wo kannst du laden?',help:'Ein entnehmbarer Akku hilft nur, wenn du ihn auf deinem Weg zur Steckdose tragen kannst.',options:[
      ['plug','Steckdose am Stellplatz','Auch ein fester Akku kommt infrage'],
      ['removable','Nur drinnen','Akku muss entnehmbar sein'],
      ['unknown','Noch nicht geklärt','Ladeart offen lassen']
    ]},
    {key:'budget',title:'Wie hoch ist dein Budget?',help:'Die Modellpreise sind Einstiegspreise; Ausstattung, Akku und Versand können den Endpreis ändern.',options:[
      [2000,'Bis 2.000 €','Preis steht im Vordergrund'],[3500,'Bis 3.500 €','Mehr Auswahl'],
      [7000,'Bis 7.000 €','Auch Kabinenroller'],[10000,'Über 7.000 €','Ausstattung hat Vorrang']
    ]}
  ];

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const euro = value => new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
  const maxSpeed = product => Math.max(0,...(String(product.speed || '').match(/\d+(?=\s*km\/h)/g) || []).map(Number));
  const conservativeRange = product => {
    const numbers = String(product.range || '').match(/\d+(?:[.,]\d+)?/g);
    return numbers ? Math.min(...numbers.map(n => Number(n.replace(',','.')))) : null;
  };
  const removable = product => /entnehmbar/i.test(product.battery || '') || ['falcon-double','falcon-double-max-range'].includes(product.slug);
  const modelUrl = product => product.detailUrl || `/modelle/#modell-${encodeURIComponent(product.slug)}`;
  const localThumb = product => {
    if (product.image && !/^https?:/i.test(product.image)) return {src:'/'+product.image.replace(/^\//,''),archive:!!product.imageNote};
    if (product.personalPhoto?.src) return {src:'/'+product.personalPhoto.src.replace(/^\//,''),archive:true};
    return null;
  };

  function candidatesFor(a) {
    const allowed = ['Kabinenroller','Seniorenmobile','E-Roller','E-Chopper','Highspeed & 125er'];
    return products.filter(p => {
      if (!allowed.includes(p.category) || (a.type !== 'offen' && p.category !== a.type)) return false;
      if (!Number.isFinite(p.price) || p.price > a.budget) return false;
      if (maxSpeed(p) < a.speed) return false;
      const range = conservativeRange(p);
      if (range === null || range < a.distance) return false;
      if (a.charge === 'removable' && !removable(p)) return false;
      return true;
    }).map(p => {
      const range = conservativeRange(p);
      const reserve = range / a.distance;
      const score = Math.min(reserve,2) * 3 + (1-p.price/a.budget) * 2 + (p.verifiedAt ? .5 : 0);
      return {product:p,range,score};
    }).sort((a,b) => b.score-a.score || a.product.price-b.product.price);
  }

  function showQuestion() {
    const q = questions[step];
    root.innerHTML = `<div class="finder-progress"><span>Frage ${step+1} von ${questions.length}</span><span>${Math.round(step/questions.length*100)} %</span></div><div class="finder-progress-bar"><span style="width:${step/questions.length*100}%"></span></div><h2 id="finder-question" tabindex="-1">${escapeHtml(q.title)}</h2><p class="finder-help">${escapeHtml(q.help)}</p><div class="finder-options" role="group" aria-labelledby="finder-question"></div><div class="finder-actions"><button class="button button-secondary" type="button" id="finder-back" ${step===0?'disabled':''}>Zurück</button><button class="button button-primary" type="button" id="finder-next" ${answers[q.key]===undefined?'disabled':''}>${step===questions.length-1?'Ergebnis ansehen':'Weiter'}</button></div><p class="finder-note">Ohne Anmeldung. Deine Antworten werden nicht gespeichert oder versendet.</p>`;
    const box = root.querySelector('.finder-options');
    q.options.forEach(([value,label,detail]) => {
      const button = document.createElement('button');
      button.className = 'finder-option';
      button.type = 'button';
      button.setAttribute('aria-pressed',String(answers[q.key] === value));
      button.innerHTML = `<strong>${escapeHtml(label)}</strong><small>${escapeHtml(detail)}</small>`;
      button.addEventListener('click',() => {
        answers[q.key] = value;
        box.querySelectorAll('.finder-option').forEach(option => option.setAttribute('aria-pressed',String(option === button)));
        root.querySelector('#finder-next').disabled = false;
      });
      box.append(button);
    });
    root.querySelector('#finder-back').addEventListener('click',() => { if(step>0){step--;showQuestion();root.querySelector('h2').focus();} });
    root.querySelector('#finder-next').addEventListener('click',() => { if(answers[q.key]!==undefined){step++;render();root.querySelector('h2').focus();} });
  }

  function showResults() {
    const ranked = candidatesFor(answers);
    const selected = answers.type === 'offen'
      ? ranked.filter((entry,index,list) => list.findIndex(other => other.product.category === entry.product.category) === index).slice(0,3)
      : ranked.slice(0,3);
root.innerHTML = `<div class="finder-results-head"><p class="eyebrow">Deine Vorauswahl</p><h2 tabindex="-1">${selected.length ? 'Diese Modelle kommen infrage.' : 'Kein verlässlicher Treffer.'}</h2><p>${selected.length ? `${selected.length} Empfehlungen aus ${products.length} erfassten Modellen mit ausreichenden Angaben für deine Auswahl.` : 'In der aktuellen Modellübersicht lässt sich diese Kombination nicht sicher empfehlen.'}</p></div><div class="finder-results"></div><div class="finder-actions"><button class="button button-secondary" type="button" id="finder-reset">Antworten ändern</button><a class="button button-primary" href="/modelle/">Alle Modelle ansehen</a></div><p class="finder-note">Die Auswahl enthält Futura-Modelle und ist kein vollständiger Marktvergleich. Preise und Reichweiten sind Herstellerangaben zum genannten Stand; eine größere Akkuvariante kann mehr kosten. Die Reihenfolge ergibt sich aus Reichweitenreserve und Preis innerhalb deiner Vorgaben, nicht aus eigenen Fahrtests. <a href="/so-vergleichen-wir/">Quellen und Transparenz</a>.</p>`;
    const list = root.querySelector('.finder-results');
    if (!selected.length) {
      list.innerHTML = '<div class="finder-empty">Prüfe zuerst Fahrzeugart, Budget und Lademöglichkeit. Bei schnelleren Modellen fehlen teilweise Reichweitenangaben; diese führen wir bewusst nicht als sicheren Treffer auf. <a href="/modelle/">Zur vollständigen Modellübersicht →</a></div>';
    }
    selected.forEach(({product:p,range}) => {
      const thumb = localThumb(p);
      const reasons = [`${maxSpeed(p)} km/h als angegebene Höchstgeschwindigkeit`, `ab ${euro(p.price)} im Budget`, `mindestens ${range} km als veröffentlichter Reichweitenwert`];
      if (answers.charge === 'removable') reasons.push('Akku als entnehmbar dokumentiert');
      const checks = ['Tatsächliche Reichweite bei Kälte, Tempo und Zuladung prüfen','Fahrzeugklasse und Fahrerlaubnis für die konkrete Variante klären'];
      if (p.category === 'Kabinenroller') checks.unshift('Einstieg, Stellplatzbreite und Türöffnung bei einer Probefahrt testen');
      else if (p.category === 'Seniorenmobile') checks.unshift('Sitz, Bedienung und Einstieg persönlich ausprobieren');
      if (answers.charge === 'removable') checks.push('Akkugewicht und Trageweg selbst testen');
      else if (answers.charge === 'unknown') checks.push('Ladeort und Akkuart vor einer Entscheidung klären');
      const article = document.createElement('article');
      article.className = 'finder-result';
      article.innerHTML = `<div class="finder-result-head"><div><p class="finder-category">${escapeHtml(p.category)}</p><h3>${escapeHtml(p.name)}</h3></div>${thumb?`<figure class="finder-thumb"><img src="${escapeHtml(thumb.src)}" alt="" loading="lazy" width="92" height="92">${thumb.archive?'<figcaption>Archivfoto</figcaption>':''}</figure>`:''}</div><div class="finder-facts"><span>${escapeHtml(p.speed || 'Tempo offen')}</span><span>${escapeHtml(p.range || 'Reichweite offen')}</span><span>ab ${euro(p.price)}</span></div><p class="finder-reason"><strong>Warum in der Auswahl:</strong> ${escapeHtml(reasons.join('; '))}.</p><p class="finder-check"><strong>Vor dem Kauf:</strong> ${escapeHtml(checks.join('; '))}.</p><a href="${escapeHtml(modelUrl(p))}">Modell bei Rollerkompass ansehen →</a>`;
      list.append(article);
    });
    root.querySelector('#finder-reset').addEventListener('click',() => {step=0;showQuestion();root.querySelector('h2').focus();});
  }

  function render() {
    if (!products.length) {root.innerHTML = '<p class="finder-empty">Die Modelldaten konnten nicht geladen werden. <a href="/modelle/">Alle Modelle ansehen</a>.</p>';return;}
    if (step < questions.length) showQuestion(); else showResults();
  }
  window.RKFinder = {candidatesFor,conservativeRange,maxSpeed,removable,localThumb};
  render();
})();

