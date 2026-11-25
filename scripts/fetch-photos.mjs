#!/usr/bin/env node
/**
 * Télécharge les photos libres de droit du site et complète leurs crédits.
 *   node scripts/fetch-photos.mjs
 *
 * - Villes (src/content/data/cities.json) : fichiers Wikimedia Commons. Auteur, licence et dimensions
 *   sont lus via l'API Commons ; un fichier sans licence libre (CC0, domaine public, CC BY, CC BY-SA) est ignoré.
 * - Illustrations (src/content/data/stock.json) : entrées Wikimedia Commons (même traitement) ou
 *   photos d'autres banques libres (Unsplash, Pexels, Pixabay) dont l'auteur et la licence sont déjà renseignés.
 * Les images sont converties en WebP (1600 px de large au plus) dans public/villes/ et public/illustrations/libres/.
 * Le script est relançable : une photo déjà présente n'est pas retéléchargée.
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const UA = { 'User-Agent': 'drone-eclat-site/1.0 (photo credits fetcher)' };
const FREE = /^(CC0|Public domain|PD|CC BY(-SA)?( [0-9.]+)?)/i;
const strip = (s) => (s ?? '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim();
const exists = (p) => access(p).then(() => true, () => false);

async function commonsInfo(commonsUrl) {
  const title = 'File:' + decodeURIComponent(commonsUrl.split('/File:')[1]);
  const q = new URLSearchParams({ action: 'query', format: 'json', titles: title, prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: '1600' });
  const r = await fetch('https://commons.wikimedia.org/w/api.php?' + q, { headers: UA });
  const page = Object.values((await r.json()).query.pages)[0];
  if (!page.imageinfo) return null;
  const ii = page.imageinfo[0], md = ii.extmetadata ?? {};
  const licence = strip(md.LicenseShortName?.value);
  if (!FREE.test(licence)) { console.warn('  licence non libre :', title, licence); return null; }
  return {
    url: ii.thumburl || ii.url,
    author: strip(md.Artist?.value).slice(0, 120) || 'Auteur inconnu',
    licence,
    licenceUrl: md.LicenseUrl?.value || (/public domain|^PD|CC0/i.test(licence) ? 'https://creativecommons.org/publicdomain/zero/1.0/deed.fr' : null),
    commonsUrl: ii.descriptionurl,
  };
}

async function save(url, outAbs) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const img = sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true });
  const info = await img.webp({ quality: 78 }).toFile(outAbs);
  if (info.width < 600) throw new Error(`trop petite (${info.width}px)`);
  return { width: info.width, height: info.height };
}

async function processList(list, dirRel, nameOf) {
  const dirAbs = path.join(root, 'public', dirRel);
  await mkdir(dirAbs, { recursive: true });
  let ok = 0;
  for (const [item, p] of list) {
    const file = nameOf(item, p);
    try {
      if (p.file && p.author && p.licence && await exists(path.join(dirAbs, p.file))) { ok++; continue; }
      let url = p.imageUrl;
      if (p.commonsUrl && /commons\.wikimedia\.org/.test(p.commonsUrl)) {
        const info = await commonsInfo(p.commonsUrl);
        if (!info) { p.file = null; continue; }
        Object.assign(p, { author: info.author, licence: info.licence, licenceUrl: info.licenceUrl, commonsUrl: info.commonsUrl });
        url = info.url;
      }
      if (!url || !p.author || !p.licence) { console.warn('  incomplet, ignoré :', file); p.file = null; continue; }
      const dim = await save(url, path.join(dirAbs, file));
      Object.assign(p, { file, ...dim });
      ok++; console.log('  ok', dirRel + '/' + file, `${dim.width}×${dim.height}`, '·', p.licence);
    } catch (e) {
      console.warn('  échec', file, e.message); p.file = null;
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  return ok;
}

const citiesPath = path.join(root, 'src/content/data/cities.json');
const cities = JSON.parse(await readFile(citiesPath, 'utf8'));
console.log('Villes…');
const nCity = await processList(cities.flatMap((c) => c.photos.map((p) => [c, p])), 'villes', (c, p) => `${c.slug}-${c.photos.indexOf(p) + 1}.webp`);
await writeFile(citiesPath, JSON.stringify(cities, null, 1) + '\n');

const stockPath = path.join(root, 'src/content/data/stock.json');
let nStock = 0;
if (await exists(stockPath)) {
  const stock = JSON.parse(await readFile(stockPath, 'utf8'));
  console.log('Illustrations…');
  nStock = await processList(stock.map((p) => [p, p]), 'illustrations/libres', (p) => `${p.key}.webp`);
  await writeFile(stockPath, JSON.stringify(stock, null, 1) + '\n');
}
console.log(`Terminé : ${nCity} photos de villes, ${nStock} illustrations.`);
