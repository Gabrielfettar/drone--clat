#!/usr/bin/env node
/**
 * Fabrique un « avant » simulé pour chaque ville : la photo libre du bâtiment (Wikimedia Commons)
 * est salie par calcul (voile gris-vert, coulures verticales, taches de lichen), le ciel est épargné.
 *   node scripts/simulate-grime.mjs [slug…]
 * Entrée : cities.json, champ `simulation: { photo: <index>, seed? }` (photo 0 par défaut).
 * Sortie : public/villes/sim/<slug>-avant.webp. L'« après » est la photo d'origine, non modifiée.
 * Ce n'est PAS un chantier Drone Éclat : la page l'affiche comme simulation, avec l'attribution
 * de l'œuvre d'origine et la mention de la modification (exigée par les licences CC BY / BY-SA).
 */
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cities = JSON.parse(await readFile(path.join(root, 'src/content/data/cities.json'), 'utf8'));
const only = process.argv.slice(2);
await mkdir(path.join(root, 'public/villes/sim'), { recursive: true });

function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function grid(w, h, cell, rand) {
  const gw = Math.ceil(w / cell) + 2, gh = Math.ceil(h / cell) + 2, g = new Float32Array(gw * gh);
  for (let i = 0; i < g.length; i++) g[i] = rand();
  return (x, y) => {
    const fx = x / cell, fy = y / cell, ix = Math.floor(fx), iy = Math.floor(fy);
    const tx = fx - ix, ty = fy - iy, sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const a = g[iy * gw + ix], b = g[iy * gw + ix + 1], c = g[(iy + 1) * gw + ix], d = g[(iy + 1) * gw + ix + 1];
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  };
}
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);

/**
 * Masque du ciel : sur une version réduite, on part du bord haut et on s'étend aux pixels voisins
 * « de ciel » (bleus, ou blancs peu saturés) sans franchir de contour net. Le masque est ensuite flouté.
 */
async function skyOf(src, w, h, tol = 22) {
  const W = 320, H = Math.round((h / w) * W);
  const { data } = await sharp(src).removeAlpha().resize(W, H).raw().toBuffer({ resolveWithObject: true });
  const at = (x, y) => (y * W + x) * 3;
  const cand = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = at(x, y), r = data[i], g = data[i + 1], b = data[i + 2];
    const sat = Math.max(r, g, b) - Math.min(r, g, b), lum = (r + g + b) / 3;
    cand[y * W + x] = (b - r > 18 && b >= g - 4) || (lum > 110 && sat < 38 && b >= r - 8) ? 1 : 0;
  }
  const grad = (i, j) => Math.abs(data[i] - data[j]) + Math.abs(data[i + 1] - data[j + 1]) + Math.abs(data[i + 2] - data[j + 2]);
  const m = new Uint8Array(W * H), q = [];
  for (let x = 0; x < W; x++) if (cand[x]) { m[x] = 255; q.push(x); }
  while (q.length) {
    const p = q.pop(), x = p % W, y = (p - x) / W;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const n = ny * W + nx; if (m[n] || !cand[n] || grad(p * 3, n * 3) > tol) continue;
      m[n] = 255; q.push(n);
    }
  }
  // Morceaux de ciel isolés (entre deux tours, sous une arche) : lisses et « de ciel », même sans lien au bord haut.
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const p = y * W + x; if (m[p] || !cand[p]) continue;
    let g = 0; for (const n of [p - 1, p + 1, p - W, p + W, p - W - 1, p + W + 1]) g = Math.max(g, grad(p * 3, n * 3));
    if (g < 9) m[p] = 230;
  }
  const { data: big } = await sharp(Buffer.from(m), { raw: { width: W, height: H, channels: 1 } })
    .median(3).blur(1.4).resize(w, h).extractChannel(0).raw().toBuffer({ resolveWithObject: true });
  return big;
}

async function simulate(c) {
  const idx = c.simulation?.photo ?? 0;
  const p = c.photos[idx];
  if (!p?.file) return null;
  const src = path.join(root, 'public/villes', p.file);
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const rand = rng((c.simulation?.seed ?? 0) + [...c.slug].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7));
  const k = w / 1600;
  const n1 = grid(w, h, 220 * k, rand), n2 = grid(w, h, 70 * k, rand), n3 = grid(w, h, 18 * k, rand);
  const streakX = grid(w, h, 5 * k, rand), streakY = grid(w, h, 160 * k, rand);
  const spot = grid(w, h, 9 * k, rand), spot2 = grid(w, h, 30 * k, rand);
  const skyMask = await skyOf(src, w, h, c.simulation?.skyTolerance);
  const out = Buffer.alloc(data.length);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 3;
      let r = data[i], g = data[i + 1], b = data[i + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      // Végétation (arbres, pelouses) : on la laisse vivante, seule la pierre et la toiture s'encrassent.
      const veg = clamp((g - Math.max(r, b) - 4) / 18) * 0.85;
      const keep = Math.max(veg, skyMask[y * w + x] / 255, clamp((y / h - 0.9) / 0.1) * 0.6);
      const fbm = n1(x, y) * 0.5 + n2(x, y) * 0.32 + n3(x, y) * 0.18;
      const streak = clamp((streakX(x, y) - 0.45) * 2.2) * clamp(streakY(x, y) * 1.6 - 0.3);
      let m = clamp(fbm * 1.5 - 0.35) * 0.75 + streak * 0.45;
      m = clamp(m) * (1 - keep);
      // Encrassement général : désaturation, assombrissement, teinte gris-olive.
      const base = 0.7 * (1 - keep);
      const grey = lum;
      r = r + (grey - r) * 0.45 * base; g = g + (grey - g) * 0.45 * base; b = b + (grey - b) * 0.45 * base;
      const dark = 1 - 0.2 * base - 0.42 * m;
      r *= dark; g *= dark; b *= dark;
      r = r + (92 - r) * 0.38 * m; g = g + (96 - g) * 0.38 * m; b = b + (62 - b) * 0.38 * m;
      // Mousses et lichens : petites taches vert sombre et jaune-gris, par grappes.
      const cluster = clamp(spot2(x, y) * 1.8 - 0.75) * (1 - keep);
      const s = spot(x, y);
      if (cluster > 0 && s > 0.62) { const a = clamp((s - 0.62) * 6) * cluster * 0.85; r += (58 - r) * a; g += (72 - g) * a; b += (38 - b) * a; }
      else if (cluster > 0 && s < 0.2) { const a = clamp((0.2 - s) * 6) * cluster * 0.6; r += (176 - r) * a; g += (170 - g) * a; b += (128 - b) * a; }
      out[i] = clamp(r, 0, 255); out[i + 1] = clamp(g, 0, 255); out[i + 2] = clamp(b, 0, 255);
    }
  }
  const file = `${c.slug}-avant.webp`;
  await sharp(out, { raw: { width: w, height: h, channels: 3 } }).webp({ quality: 76 }).toFile(path.join(root, 'public/villes/sim', file));
  return { file, photo: idx };
}

for (const c of cities) {
  if (only.length && !only.includes(c.slug)) continue;
  const r = await simulate(c);
  console.log(r ? `ok ${c.slug} → sim/${r.file} (photo ${r.photo + 1})` : `ignoré ${c.slug}`);
}
