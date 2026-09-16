import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const origin='https://rollerkompass.de';
const urls=[...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.equal(urls.length,12);
assert.equal(new Set(urls).size,urls.length);
const pages=new Map(urls.map(u=>[u,read(new URL(u).pathname.replace(/^\//,'')+'index.html')]));
const titles=new Set();
let links=0;
for(const [url,html] of pages) {
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,url+' needs one h1');
  assert.equal((html.match(/<main[ >]/g)||[]).length,1,url+' needs one main');
  assert(html.includes(`rel="canonical" href="${url}"`),url+' canonical');
  const title=html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title&&!titles.has(title),url+' unique title'); titles.add(title);
  assert(html.includes('name="description" content="'),url+' description');
  assert(!html.includes('product-photo-print'),url+' obsolete photo frame');
  assert(!html.includes('="undefined"'),url+' undefined attribute');
  for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    const data=JSON.parse(m[1]);
    assert.equal(data['@context'],'https://schema.org');
    assert(!m[1].includes('aggregateRating'),url+' unsupported ratings');
    for (const entity of data['@graph'] || []) {
      if (entity['@type']==='ProfilePage') assert(/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(entity.dateModified),url+' profile timestamp');
      if (entity['@type']!=='Product') continue;
      const offer=entity.offers;
      assert.equal(new URL(offer.url).hostname,'elektroroller-futura.de',url+' external seller');
      assert.equal(offer.availability,'https://schema.org/InStock',url+' verified availability');
      assert.equal(offer.shippingDetails.shippingDestination.addressCountry,'DE');
      assert.equal(offer.shippingDetails.shippingRate.value,99);
      assert.equal(offer.shippingDetails.deliveryTime['@type'],'ShippingDeliveryTime');
      assert.equal(offer.shippingDetails.deliveryTime.transitTime['@type'],'QuantitativeValue');
      assert.equal(offer.shippingDetails.deliveryTime.transitTime.unitCode,'DAY');
      const expectedDelivery=url.includes('/flow-li/')?[10,15]:[3,7];
      assert.deepEqual([offer.shippingDetails.deliveryTime.transitTime.minValue,offer.shippingDetails.deliveryTime.transitTime.maxValue],expectedDelivery);
      assert.equal(offer.hasMerchantReturnPolicy.merchantReturnDays,14);
      assert.equal(offer.hasMerchantReturnPolicy.returnShippingFeesAmount.value,100);
      for (const value of ['99 €','100 €','14 Tagen','15.09.2026',offer.shippingDetails.shippingSettingsLink,offer.hasMerchantReturnPolicy.merchantReturnLink]) assert(html.includes(value),url+' visible offer evidence: '+value);
      assert(!entity.aggregateRating,url+' no fabricated aggregate');
      if (url===origin+'/seniorenmobile/vita-care-neo/') {
        const review=entity.review;
        assert.equal(review['@type'],'Review');
        assert.equal(review.author.name,'Martin Dehn');
        assert.equal(review.reviewRating.ratingValue,5);
        assert.equal(review.reviewRating.bestRating,5);
        assert.equal(review.reviewRating.worstRating,1);
        assert.equal(review.datePublished,'2026-09-15');
        assert(html.includes('5 von 5 Sternen'));
        assert(html.includes('Martin arbeitet mit Elektroroller Futura zusammen.'));
        // Every structured review sentence must also be in the visible article.
        const visible=html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ');
        for(const sentence of review.reviewBody.split(/(?<=\.) /)) assert(visible.includes(sentence),url+' review text visible');
        assert(!html.includes('Ein eigener Fahr- oder Reichweitentest des Neo wird damit nicht behauptet.'));
      } else assert(!entity.review,url+' no unsupported reviews');
    }

  }
  for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const ref=new URL(m[1].replaceAll('&amp;','&'),url);
    if(ref.origin!==origin)continue;
    const filename=ref.pathname.replace(/^\//,'')+(ref.pathname.endsWith('/')?'index.html':'');
    assert(fs.existsSync(path.join(root,filename)),url+' missing local link '+ref.href);
    if(ref.hash && filename.endsWith('.html')) {
      const target=read(filename),id=decodeURIComponent(ref.hash.slice(1));
      // Legacy homepage hash navigation can reveal a catalogue card with JavaScript.
      assert(target.includes(`id="${id}"`) || (filename==='index.html'&&id.startsWith('modell-')),url+' missing anchor '+ref.href);
    }
    links++;
  }
}
const pctx={window:{}};vm.runInNewContext(read('products.js'),pctx);const products=pctx.window.PRODUCTS;
assert.equal(products.length,43);
assert.equal(products.filter(p=>p.personalPhoto).length,10);
for(const [url,count] of [['/',9],['/modelle/',43],['/kabinenroller/',6],['/seniorenmobile/',2],['/e-roller/',16]]) {
  const html=pages.get(origin+url);
  assert.equal((html.match(/class="product-card"/g)||[]).length,count,url+' static model coverage');
  const events={};
  const category=url==='/kabinenroller/'?'Kabinenroller':url==='/seniorenmobile/'?'Seniorenmobile':url==='/e-roller/'?'E-Roller':'Alle';
  const el={dataset:{category,showAll:String(url!=='/')},innerHTML:'',addEventListener:(key,fn)=>events[key]=fn,querySelector:()=>({focus(){},setSelectionRange(){}})};
  const ctx={window:{PRODUCTS:products,location:{hash:''},addEventListener(){}},document:{querySelector:s=>s==='.explorer'?el:null,addEventListener(){}},Intl};
  vm.runInNewContext(read('app.js'),ctx);
  assert.equal((el.innerHTML.match(/class="product-card"/g)||[]).length,count,url+' client model coverage');
  events.input({target:{matches:()=>true,value:'kein-modell-mit-diesem-namen'}});
  assert(el.innerHTML.includes('Kein Modell gefunden.'),url+' empty search');
}
assert.equal(products.find(p=>p.slug==='vita-care-neo').price,2499);
assert.equal(products.find(p=>p.slug==='falcon-double').price,1999);
assert(read('seniorenmobile/vita-care-neo/index.html').includes('/assets/futura-vitacare-neo-960.webp'));
console.log(`PASS: ${urls.length} canonical pages, unique metadata, valid JSON-LD, ${links} local references, static/client catalogues, search and source updates.`);
