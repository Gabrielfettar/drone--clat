// Rend les visuels fixes du hero et les illustrations depuis la route /studio.
// Usage : npm run build && npx next start -p 3100, puis node scripts/render-stills.js
// Les images produites sont des RENDUS 3D, jamais des photos de chantier.
const {chromium}=require('playwright');const sharp=require(process.cwd()+'/node_modules/sharp');
const jobs=[['poster',1920,1080],['poster-mobile',900,860],['roof-before',1600,1200],['roof-after',1600,1200],['house-before',1600,1200],['house-after',1600,1200],['facade',1600,1200],['cladding',1600,1200],['drone',1600,1200],['overview',1600,1200]];
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
for(const [k,w,h] of jobs){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto((process.env.STUDIO_URL||'http://localhost:3100')+'/studio/?still='+k,{waitUntil:'load'});await p.waitForTimeout(6000);
const buf=await p.screenshot();const dir=k.startsWith('poster')?'public/hero/':'public/illustrations/';
await sharp(buf).webp({quality:80}).toFile(dir+k+'.webp');if(k==='poster')await sharp(buf).resize(1200,630,{fit:'cover',position:'right'}).jpeg({quality:82}).toFile('public/og-default.jpg');console.log(k);await p.close();}
await b.close();})();
