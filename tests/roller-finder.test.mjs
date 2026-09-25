import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const context = {window:{},document:{getElementById:()=>({})},Intl,Number,Math,Array,String};
vm.runInNewContext(fs.readFileSync(path.join(root,'products.js'),'utf8'),context);
const script = fs.readFileSync(path.join(root,'roller-finder','finder.js'),'utf8').replace(/\s+render\(\);\s*\}\)\(\);\s*$/,'\n})();');
vm.runInNewContext(script,context);

const finder = context.window.RKFinder;
assert.equal(context.window.PRODUCTS.length,43);
assert.equal(finder.conservativeRange(context.window.PRODUCTS.find(p=>p.slug==='falcon-blei')),50);
assert.ok(context.window.PRODUCTS.every(p=>finder.localThumb(p)?.src.startsWith('/assets/')));
assert.equal(finder.localThumb(context.window.PRODUCTS.find(p=>p.slug==='flow-li')).archive,true);

const cabin = finder.candidatesFor({type:'Kabinenroller',speed:45,distance:25,charge:'removable',budget:7000});
assert.ok(cabin.length>0);
assert.ok(cabin.every(({product})=>product.category==='Kabinenroller'&&product.price<=7000&&finder.removable(product)));
assert.ok(!cabin.some(({product})=>product.slug==='e-move'||product.slug==='flow-li'));

const longCheap = finder.candidatesFor({type:'E-Roller',speed:45,distance:100,charge:'unknown',budget:2000});
assert.equal(longCheap.length,0);

const fast = finder.candidatesFor({type:'Highspeed & 125er',speed:80,distance:25,charge:'unknown',budget:5000});
assert.equal(fast.length,0); // Missing range data must never become a confident recommendation.

console.log('Roller-Finder: Auswahl und Ausschlüsse geprüft.');

