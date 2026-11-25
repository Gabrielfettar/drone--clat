import { ACCEPTED, MAX_FILE_MB, MAX_FILES } from './lead';

/** Vérifie le type réel d'une image par sa signature binaire (et non par son extension ou son type déclaré). */
export function sniffImage(buf: Uint8Array): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp';
  const brand = String.fromCharCode(...buf.slice(4, 12));
  if (brand.startsWith('ftyp') && /heic|heix|hevc|mif1|msf1|heif/.test(brand.slice(4))) return 'image/heic';
  return null;
}

export type CheckedFile = { name: string; type: string; data: Buffer };

export async function checkFiles(files: File[]): Promise<{ ok: true; files: CheckedFile[] } | { ok: false; error: string }> {
  const real = files.filter((f) => f && f.size > 0);
  if (real.length > MAX_FILES) return { ok: false, error: `${MAX_FILES} photos maximum.` };
  const out: CheckedFile[] = [];
  for (const f of real) {
    if (f.size > MAX_FILE_MB * 1024 * 1024) return { ok: false, error: `Chaque photo doit faire moins de ${MAX_FILE_MB} Mo.` };
    const data = Buffer.from(await f.arrayBuffer());
    const type = sniffImage(data);
    if (!type || !ACCEPTED.includes(type)) return { ok: false, error: 'Seules les photos JPEG, PNG, WebP ou HEIC sont acceptées.' };
    const ext = type.split('/')[1].replace('jpeg', 'jpg');
    const safe = f.name.normalize('NFKD').replace(/[^\w.-]+/g, '_').replace(/\.[^.]*$/, '').slice(0, 40) || 'photo';
    out.push({ name: `${safe}.${ext}`, type, data });
  }
  return { ok: true, files: out };
}
