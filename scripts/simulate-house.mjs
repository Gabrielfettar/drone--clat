#!/usr/bin/env node
/**
 * « Avant » simulé pour l'avant / après de l'accueil : une maison (photo libre) dont la toiture et la façade
 * sont encrassées par calcul (mousses, lichens, coulures). Même méthode que scripts/simulate-grime.mjs.
 *   node scripts/simulate-house.mjs [clé-photo-stock] [graine]
 * Sortie : public/illustrations/libres/sim/<clé>-avant.webp. L'« après » est la photo d'origine.
 * Ce n'est PAS un chantier Drone Éclat : l'accueil l'affiche comme simulation.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const key = process.argv[2] || 'b_toit_propre_tuiles';
const seed = Number(process.argv[3] || 7);
await mkdir(path.join(root, 'public/illustrations/libres/sim'), { recursive: true });

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


const src = path.join(root, 'public/illustrations/libres', `${key}.webp`);
const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const rand = rng(seed);
const k = w / 1600;
const n1 = grid(w, h, 200 * k, rand), n2 = grid(w, h, 60 * k, rand), n3 = grid(w, h, 16 * k, rand);
const streakX = grid(w, h, 5 * k, rand), streakY = grid(w, h, 140 * k, rand);
const spot = grid(w, h, 7 * k, rand), spot2 = grid(w, h, 26 * k, rand);
const skyMask = await skyOf(src, w, h, 30);
// Texture locale : les tuiles sont « rugueuses », l'enduit est lisse. Sert à mettre la mousse sur le toit, les coulures sur la façade.
const grey = await sharp(src).removeAlpha().greyscale().raw().toBuffer();
const greyBlur = await sharp(src).removeAlpha().greyscale().blur(2.5).raw().toBuffer();
const hp = Buffer.alloc(w * h);
for (let j = 0; j < w * h; j++) hp[j] = Math.min(255, Math.abs(grey[j] - greyBlur[j]) * 14);
const rough = await sharp(hp, { raw: { width: w, height: h, channels: 1 } }).blur(10 * k).raw().toBuffer();
const out = Buffer.alloc(data.length);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const i = (y * w + x) * 3;
  let r = data[i], g = data[i + 1], b = data[i + 2];
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const veg = clamp((g - Math.max(r, b) - 4) / 18) * 0.85;
  const keep = Math.max(veg, skyMask[y * w + x] / 255);
  // Tuiles (zones rugueuses et chaudes) : la mousse s'y installe ; l'enduit lisse prend surtout coulures et voile gris.
  const warm = clamp((rough[y * w + x] / 255 - 0.18) * 3) * clamp((r - b) / 30);
  const fbm = n1(x, y) * 0.5 + n2(x, y) * 0.32 + n3(x, y) * 0.18;
  const streak = clamp((streakX(x, y) - 0.45) * 2.2) * clamp(streakY(x, y) * 1.6 - 0.3);
  let m = clamp(fbm * 1.6 - 0.35) * (0.45 + 0.55 * warm) + streak * (0.65 - 0.3 * warm);
  m = clamp(m) * (1 - keep);
  const base = 0.75 * (1 - keep);
  r = r + (lum - r) * 0.5 * base; g = g + (lum - g) * 0.5 * base; b = b + (lum - b) * 0.5 * base;
  const dark = 1 - 0.22 * base - 0.45 * m;
  r *= dark; g *= dark; b *= dark;
  r = r + (84 - r) * 0.42 * m; g = g + (98 - g) * 0.42 * m; b = b + (52 - b) * 0.42 * m;
  // Voile vert de mousse sur la couverture
  const moss = warm * clamp(fbm * 1.8 - 0.55) * (1 - keep);
  r += (78 - r) * 0.55 * moss; g += (100 - g) * 0.55 * moss; b += (40 - b) * 0.55 * moss;
  const cluster = clamp(spot2(x, y) * 2.4 - (2.0 - 1.7 * warm)) * (1 - keep);
  const s = spot(x, y);
  if (cluster > 0 && s > 0.42) { const a = clamp((s - 0.42) * 4) * cluster; r += (70 - r) * a; g += (96 - g) * a; b += (36 - b) * a; }
  else if (cluster > 0 && s < 0.22) { const a = clamp((0.22 - s) * 5) * cluster * 0.7; r += (186 - r) * a; g += (178 - g) * a; b += (126 - b) * a; }
  out[i] = clamp(r, 0, 255); out[i + 1] = clamp(g, 0, 255); out[i + 2] = clamp(b, 0, 255);
}
const file = `${key}-avant.webp`;
await sharp(out, { raw: { width: w, height: h, channels: 3 } }).webp({ quality: 78 }).toFile(path.join(root, 'public/illustrations/libres/sim', file));
console.log('ok', 'illustrations/libres/sim/' + file);
