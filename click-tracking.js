/* Rollerkompass: anonymous aggregate outbound clicks. No cookies or visitor IDs. */
(function () {
  "use strict";
  if (window.__rkClicksInstalled) return;
  window.__rkClicksInstalled = true;
  const ENDPOINT = "https://rollerkompass-klickstatistik.martin-dehn1.chatgpt.site/api/collect";
  const MODELS = [{"slug":"flow-li","name":"Flow Li","urls":["https://elektroroller-futura.de/shop/elektromobilitaet-fuer-senioren/elektro-kabinenroller-flow"]},{"slug":"vita-care-neo","name":"VitaCare Neo","urls":["https://elektroroller-futura.de/shop/elektromobilitaet-fuer-senioren/vita-care-neo"]},{"slug":"falcon-blei","name":"Falcon Blei","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-kaufen-falcon-2?affp=17205#/farbe-schwarz","https://elektroroller-futura.de/shop/elektroroller/e-scooter-kaufen-falcon-2"]},{"slug":"vita-care-4000","name":"Vita Care 4000","urls":["https://elektroroller-futura.de/shop/elektromobilitaet-fuer-senioren/vita-care-4000"]},{"slug":"falcon-double","name":"Falcon Double","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-falcon?affp=17205#/geschwindigkeit_auswahlen-45_km_h/farbe-schwarz/anzahl_lithium_ionen_akkus-1_lithium_akku_80_km_reichweite","https://elektroroller-futura.de/shop/elektroroller/e-scooter-falcon"]},{"slug":"cruise-li","name":"Cruise Li","urls":["https://elektroroller-futura.de/shop/elektromobilitaet-fuer-senioren/elektro-kabinenroller-cruise-li"]},{"slug":"limaq7-li","name":"LimaQ7 Li","urls":["https://elektroroller-futura.de/shop/elektro-kabinenroller-futura/kabinenroller-limaq7-li-45-kmh-lithium-akku-3000-watt"]},{"slug":"falcon-double-max-range","name":"Falcon Double Max Range","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-falcon-30ah?affp=17205#/farbe-schwarz/anzahl_lithium_ionen_akkus-1_lithium_akku_100_km_reichweite"]},{"slug":"futura-two-li","name":"FUTURA TWO Li","urls":["https://elektroroller-futura.de/futura-two-futura-30"]},{"slug":"raven","name":"Raven","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-chopper-raven?affp=17205#/farbe-light_grey/anzahl_lithium_ionen_akkus-60v_40ah_100km_reichweite"]},{"slug":"angry-blake","name":"Angry Blake","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-chopper-x10?affp=17205#/farbe-schwarz"]},{"slug":"blake","name":"Blake","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-chopper-blake?affp=17205#/farbe-light_grey/anzahl_lithium_ionen_akkus-60v_40ah_100km_reichweite"]},{"slug":"hl-6-premium-duo","name":"HL 6.0 Premium Duo","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-6-premium-duo?affp=17205#/farbe-mattschwarz"]},{"slug":"hl-6-premium","name":"HL 6.0 Premium","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-6-premium?affp=17205#/farbe-mattschwarz"]},{"slug":"hl-6","name":"HL 6.0","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-chopper-11?affp=17205#/farbe-bordeaux_rot/geschwindigkeit_auswahlen-45_km_h"]},{"slug":"hl-6-android","name":"HL 6.0 Android","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-chopper-6-android?affp=17205#/farbe-mattschwarz/geschwindigkeit_auswahlen-45_km_h/lithium_akku_-hl_60_55ah_60v_lithium_akku"]},{"slug":"mars","name":"Mars","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-e-motorrad-mars?affp=17205"]},{"slug":"campster","name":"Campster","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-campster-25-kmh-wohnmobil?affp=17205"]},{"slug":"city-go","name":"City Go","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-merlin?affp=17205#/farbe-mattschwarz/geschwindigkeit_auswahlen-45_km_h"]},{"slug":"future-s","name":"FUTURE-S","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-future-s?affp=17205#/farbe-gelb"]},{"slug":"future","name":"Future","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-future?affp=17205#/geschwindigkeit_auswahlen-45_km_h/farbe-gelb"]},{"slug":"long-runner-blei","name":"Long Runner Blei","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-long-runner-blei?affp=17205#/farbe-mattschwarz/geschwindigkeit_auswahlen-25_km_h"]},{"slug":"long-runner-lithium","name":"Long Runner Lithium","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-long-runner?affp=17205#/farbe-mattschwarz/geschwindigkeit_auswahlen-45_km_h/anzahl_lithium_ionen_akkus-1_x_li_akku_60v_30ah_80_km_reichweite"]},{"slug":"volt-max","name":"Volt-Max","urls":["https://elektroroller-futura.de/shop/elektroroller/volt-max?affp=17205#/farbe-grun/geschwindigkeit_auswahlen-45_km_h/anzahl_lithium_ionen_akkus-1_lithium_akku_80_km_reichweite"]},{"slug":"e-groove","name":"E-Groove","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-power?affp=17205"]},{"slug":"m300-eec","name":"M300 EEC","urls":["https://elektroroller-futura.de/shop/elektroroller/elektro-enduro-strassenzulassung?affp=17205"]},{"slug":"volt-ranger","name":"Volt Ranger","urls":["https://elektroroller-futura.de/shop/elektroroller/volt-ranger?affp=17205"]},{"slug":"classico-highspeed","name":"Classico Highspeed","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-classico-li-highspeed?affp=17205#/farbe-blue"]},{"slug":"classico-li","name":"Classico Li","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-classico-li?affp=17205#/geschwindigkeit_auswahlen-45_km_h/farbe-rot/anzahl_lithium_ionen_akkus-1_lithium_ionen_akku_60km_reichweite_000_"]},{"slug":"futura-hawk","name":"FUTURA HAWK","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-hawk-blei-gel-akku?affp=17205#/farbe-mattschwarz"]},{"slug":"hl-6-sale","name":"HL 6.0 Sale","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-chopper-6?affp=17205#/farbe-mattschwarz/geschwindigkeit_auswahlen-45_km_h/lithium_akku_-hl_60_30ah_60v_lithium_akku"]},{"slug":"thunder-s","name":"THUNDER-S","urls":["https://elektroroller-futura.de/shop/elektroroller/thunder?affp=17205#/farbe-light_grey"]},{"slug":"angry-hawk","name":"ANGRY HAWK","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-e-motorrad?affp=17205#/farbe-light_grey"]},{"slug":"city-go-rs","name":"City Go RS","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-merlin?affp=17205#/farbe-bordeaux_rot/geschwindigkeit_auswahlen-45_km_h"]},{"slug":"robo-s","name":"ROBO-S","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-robo-s?affp=17205#/farbe-schwarz"]},{"slug":"eagle","name":"Eagle","urls":["https://elektroroller-futura.de/eagle-one"]},{"slug":"x9-plus-30ah","name":"X9 Plus 30 Ah","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-chopper-x9-30ah?affp=17205#/farbe-mattschwarz/geschwindigkeit_auswahlen-45_km_h/anzahl_lithium_ionen_akkus-60v_30ah_75km_reichweite"]},{"slug":"x9-plus-20ah","name":"X9 Plus 20 Ah","urls":["https://elektroroller-futura.de/shop/elektroroller/e-scooter-chopper-x9-20?affp=17205"]},{"slug":"eagle-li","name":"Eagle Li","urls":["https://elektroroller-futura.de/eagle-one"]},{"slug":"hawk-2","name":"HAWK 2.0","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-hawk-2?affp=17205#/farbe-mattschwarz/geschwindigkeit_auswahlen-45_km_h/anzahl_lithium_ionen_akkus-1_lithium_ionen_akku_60km_reichweite_000_"]},{"slug":"elettrico-2","name":"Elettrico 2.0","urls":["https://elektroroller-futura.de/shop/elektroroller/elektroroller-elettrico-2?affp=17205#/geschwindigkeit_auswahlen-45_km_h/farbe-weiss/anzahl_lithium_ionen_akkus-1_lithium_ionen_akku_60km_reichweite_000_"]},{"slug":"futura-3-li","name":"Futura 3.0 Li","urls":["https://elektroroller-futura.de/futura-two-futura-30"]},{"slug":"e-move","name":"E-Move","urls":["https://elektroroller-futura.de/shop/elektromobilitaet-fuer-senioren/elektro-kabinenroller-e-move"]}];
  const PATHS = ["/","/so-vergleichen-wir/","/e-roller/","/e-roller/falcon/","/ueber-martin-dehn/","/kabinenroller/","/kabinenroller/flow-li/","/seniorenmobile/","/seniorenmobile/vita-care-neo/","/ratgeber/probefahrt-checkliste/","/modelle/"];
  const pageOptions = new URLSearchParams(window.location.search);
  if (pageOptions.get("rk_tracking") === "off") return;
  const production = ["rollerkompass.de", "www.rollerkompass.de"].includes(window.location.hostname);
  const testing = pageOptions.get("rk_test") === "1";
  if (!production && !testing) return;
  let page = window.location.pathname.replace(/index\.html$/, "");
  if (!page.endsWith("/")) page += "/";
  if (!PATHS.includes(page)) return;
  function urlPath(value) {
    try { const u = new URL(value, window.location.origin); return u.origin + u.pathname.replace(/\/$/, ""); }
    catch (_) { return null; }
  }
  function resolve(anchor) {
    let url;
    try {url = new URL(anchor.href, window.location.origin);} catch (_) {return null;}
    if (url.hostname !== "elektroroller-futura.de" || url.protocol !== "https:") return null;
    let model = MODELS.find(m => m.slug === anchor.dataset.rkModel);
    const card = anchor.closest('[id^="modell-"]');
    if (!model && card) model = MODELS.find(m => "modell-" + m.slug === card.id);
    const candidates = MODELS.filter(m => m.urls.some(u => urlPath(u) === urlPath(url.href)));
    if (!model && candidates.length === 1) model = candidates[0];
    if (!model && candidates.length > 1) {
      const article = anchor.closest("article");
      const heading = article && article.querySelector("h3,h4");
      const label = heading && heading.textContent.trim().replace(/\s*[→↗]\s*$/, "");
      model = candidates.find(m => m.name === label);
    }
    // Unmapped/ambiguous links are not assigned to an arbitrary model.
    if (!model || !candidates.some(m => m.slug === model.slug)) return null;
    const section = anchor.closest("section");
    const heading = section && section.querySelector("h2");
    const source = /quelle|produktseite|datenblatt/i.test(anchor.textContent) ||
      /quellen und einordnung/i.test(heading ? heading.textContent : "");
    const kind = anchor.dataset.rkKind === "source" || anchor.dataset.rkKind === "offer"
      ? anchor.dataset.rkKind : source ? "source" : "offer";
    return {model:model.slug, path:page, kind, ...(testing ? {test:true} : {})};
  }
  function track(event) {
    if (!event.isTrusted || event.defaultPrevented) return;
    if (event.type === "click" && event.button !== 0) return;
    if (event.type === "auxclick" && event.button !== 1) return;
    const anchor = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!anchor || anchor.hasAttribute("download")) return;
    const payload = resolve(anchor);
    if (!payload) return;
    // Never await, cancel, rewrite, or delay the actual affiliate link.
    try {
      fetch(ENDPOINT, {method:"POST",body:JSON.stringify(payload),headers:{"Content-Type":"text/plain;charset=UTF-8"},
        credentials:"omit",referrerPolicy:"no-referrer",mode:"cors",keepalive:true,cache:"no-store"}).catch(function () {});
    } catch (_) {}
  }
  document.addEventListener("click", track);
  document.addEventListener("auxclick", track);
})();
