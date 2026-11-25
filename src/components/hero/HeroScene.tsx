'use client';
/**
 * Scène 3D du hero : « maquette d'architecte » d'une maison contemporaine de l'Oise,
 * toiture en tuiles moussue nettoyée par un drone relié au sol (tuyau d'eau depuis
 * une unité de pompage). Rinçage à l'eau uniquement : aucun produit n'est montré.
 * Tout est généré en code (aucun asset lourd) : ~0 Ko de modèle à télécharger.
 */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export type Still = { cam: [number, number, number]; look: [number, number, number]; clean: number; drone: [number, number] | null; fov?: number };
export const STILLS: Record<string, Still> = {
  poster: { cam: [17.5, 12, 37], look: [-9, 5.2, 0], clean: 0.5, drone: [0.55, 0.6] },
  'poster-mobile': { cam: [15.5, 12, 34.5], look: [2.5, 6.6, 0], clean: 0.5, drone: [0.55, 0.6] },
  'roof-before': { cam: [4, 15.5, 17], look: [0.5, 7, 1.5], clean: 0, drone: null, fov: 34 },
  'roof-after': { cam: [4, 15.5, 17], look: [0.5, 7, 1.5], clean: 1, drone: null, fov: 34 },
  facade: { cam: [6, 4.5, 24], look: [1, 4.2, 0], clean: 1, drone: null, fov: 32 },
  cladding: { cam: [20, 5, 17], look: [8, 2.6, 0], clean: 1, drone: null, fov: 34 },
  drone: { cam: [3.5, 11.5, 11.5], look: [-0.5, 9.2, 4.2], clean: 0.35, drone: [0.5, 0.5], fov: 30 },
  'house-before': { cam: [12.5, 9.5, 20.5], look: [1.5, 5, 0], clean: 0, drone: null, fov: 33 },
  'house-after': { cam: [12.5, 9.5, 20.5], look: [1.5, 5, 0], clean: 1, drone: null, fov: 33 },
  overview: { cam: [30, 26, 40], look: [2, 3, 2], clean: 0.6, drone: [0.7, 0.7], fov: 30 },
};

export type HudSink = (d: { alt: number; pass: number; passes: number; pct: number; phase: string }) => void;

/* ---------- Géométrie de référence ---------- */
const W = 10.8;              // longueur du pan (x), débords compris
const RIDGE_Y = 9.05;
const EAVE_Y = 5.3;
const EAVE_Z = 4.45;
const SLOPE = Math.hypot(EAVE_Z, RIDGE_Y - EAVE_Y);
const NORMAL = new THREE.Vector3(0, EAVE_Z, RIDGE_Y - EAVE_Y).normalize();
const ANGLE = Math.atan2(RIDGE_Y - EAVE_Y, EAVE_Z);
const PASSES = 5;

/** Point sur le pan avant : u ∈ [0,1] le long du faîtage, v ∈ [0,1] du faîtage vers l'égout. */
function roofPoint(u: number, v: number, out = new THREE.Vector3()) {
  return out.set(-W / 2 + W * u, RIDGE_Y - (RIDGE_Y - EAVE_Y) * v, EAVE_Z * v);
}

/* ---------- Pseudo-aléatoire déterministe ---------- */
function rng(seed: number) {
  return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/* ---------- Textures de toiture (canvas) ---------- */
function makeRoofTextures() {
  const TW = 1024, TH = 560;
  const tiles = document.createElement('canvas'); tiles.width = TW; tiles.height = TH;
  const bump = document.createElement('canvas'); bump.width = TW; bump.height = TH;
  const t = tiles.getContext('2d')!, b = bump.getContext('2d')!;
  const r = rng(11);
  const rows = 16, cols = 30, rh = TH / rows, cw = TW / cols;
  t.fillStyle = '#6b3121'; t.fillRect(0, 0, TW, TH);
  b.fillStyle = '#000'; b.fillRect(0, 0, TW, TH);
  for (let y = 0; y < rows; y++) {
    for (let x = -1; x <= cols; x++) {
      const px = x * cw + (y % 2) * cw * 0.5, py = y * rh;
      const h = 14 + r() * 8, s = 48 + r() * 12, l = 38 + r() * 8;
      const g = t.createLinearGradient(0, py, 0, py + rh);
      g.addColorStop(0, `hsl(${h} ${s}% ${l + 8}%)`); g.addColorStop(0.75, `hsl(${h} ${s}% ${l}%)`); g.addColorStop(1, `hsl(${h} ${s}% ${l - 13}%)`);
      t.fillStyle = g; t.fillRect(px + 1, py, cw - 2, rh - 1);
      const gb = b.createLinearGradient(0, py, 0, py + rh);
      gb.addColorStop(0, '#666'); gb.addColorStop(0.85, '#fff'); gb.addColorStop(1, '#111');
      b.fillStyle = gb; b.fillRect(px + 1, py, cw - 2, rh - 1);
      // onde de la tuile canal
      t.fillStyle = 'rgba(255,235,220,0.07)'; t.fillRect(px + cw * 0.3, py + 2, cw * 0.18, rh - 4);
    }
  }
  // mousse et lichens
  const moss = document.createElement('canvas'); moss.width = TW; moss.height = TH;
  const m = moss.getContext('2d')!;
  const greens = ['#4d5a25', '#3d4a1e', '#606b2e', '#6f6a3a', '#2f3b1a', '#56622a'];
  m.fillStyle = 'rgba(48,54,30,0.32)'; m.fillRect(0, 0, TW, TH);
  const clusters = Array.from({ length: 34 }, () => ({ x: r() * TW, y: r() * TH, s: 60 + r() * 160 }));
  for (let i = 0; i < 4200; i++) {
    const c = clusters[(r() * clusters.length) | 0];
    const row = Math.floor(Math.min(TH - 1, Math.max(0, c.y + (r() - 0.5) * c.s * 1.4)) / rh);
    const x = c.x + (r() - 0.5) * c.s * 2.2;
    const y = row * rh + rh * (0.55 + r() * 0.5), rad = 2 + r() * 10;
    m.globalAlpha = 0.35 + r() * 0.55; m.fillStyle = greens[(r() * greens.length) | 0];
    m.beginPath(); m.ellipse(x, y, rad * 1.6, rad, 0, 0, Math.PI * 2); m.fill();
  }
  for (let i = 0; i < 380; i++) { m.globalAlpha = 0.35 + r() * 0.35; m.fillStyle = r() < 0.5 ? '#cfc9a0' : '#b0b089'; m.beginPath(); m.arc(r() * TW, r() * TH, 1 + r() * 3.2, 0, Math.PI * 2); m.fill(); }
  m.globalAlpha = 1;

  const out = document.createElement('canvas'); out.width = TW; out.height = TH;
  const o = out.getContext('2d')!;
  const live = document.createElement('canvas'); live.width = TW; live.height = TH; // mousse restante
  const lv = live.getContext('2d')!;

  const map = new THREE.CanvasTexture(out); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 4;
  const bumpMap = new THREE.CanvasTexture(bump);

  const compose = () => { o.drawImage(tiles, 0, 0); o.drawImage(live, 0, 0); map.needsUpdate = true; };
  const resetMoss = (alpha = 1) => { lv.globalCompositeOperation = 'source-over'; if (alpha >= 1) lv.clearRect(0, 0, TW, TH); lv.globalAlpha = alpha; lv.drawImage(moss, 0, 0); lv.globalAlpha = 1; compose(); };
  const clean = (u: number, v: number, radius: number) => {
    const x = u * TW, y = v * TH, R = radius * TH;
    lv.globalCompositeOperation = 'destination-out';
    const g = lv.createRadialGradient(x, y, 0, x, y, R);
    g.addColorStop(0, 'rgba(0,0,0,0.9)'); g.addColorStop(0.65, 'rgba(0,0,0,0.6)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    lv.fillStyle = g; lv.beginPath(); lv.ellipse(x, y, R * 0.7, R, 0, 0, Math.PI * 2); lv.fill();
    lv.globalCompositeOperation = 'source-over';
  };
  resetMoss();
  return { map, bumpMap, clean, compose, resetMoss, dispose: () => { map.dispose(); bumpMap.dispose(); } };
}

function makeCladdingTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const x = c.getContext('2d')!; const r = rng(5);
  x.fillStyle = '#a07a55'; x.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 256; i += 8) { x.fillStyle = `hsl(28 ${30 + r() * 10}% ${36 + r() * 10}%)`; x.fillRect(i, 0, 7, 128); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(i + 7, 0, 1, 128); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(3, 1);
  return t;
}

/* ---------- Maison ---------- */
function House({ roofMap, roofBump }: { roofMap: THREE.Texture; roofBump: THREE.Texture }) {
  const cladding = useMemo(makeCladdingTexture, []);
  const bodyGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-4, 0); s.lineTo(4, 0); s.lineTo(4, 5.5); s.lineTo(0, 8.85); s.lineTo(-4, 5.5); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 10, bevelEnabled: false });
    g.translate(0, 0, -5); g.rotateY(Math.PI / 2);
    return g;
  }, []);
  const wall = <meshStandardMaterial color="#f4f3ef" roughness={0.92} />;
  const glass = <meshStandardMaterial color="#5b7891" roughness={0.08} metalness={0.55} envMapIntensity={1} />;
  const frame = <meshStandardMaterial color="#20262c" roughness={0.6} />;
  const roofMats = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: '#4a2418', roughness: 0.9 });
    const top = new THREE.MeshStandardMaterial({ map: roofMap, bumpMap: roofBump, bumpScale: 2.2, roughness: 0.82 });
    return [edge, edge, top, edge, edge, edge];
  }, [roofMap, roofBump]);
  const backMats = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: '#4a2418', roughness: 0.9 });
    const top = new THREE.MeshStandardMaterial({ map: roofMap, bumpMap: roofBump, bumpScale: 2.2, roughness: 0.82 });
    return [edge, edge, top, edge, edge, edge];
  }, [roofMap, roofBump]);
  const mid = roofPoint(0.5, 0.5);

  return (
    <group>
      <mesh geometry={bodyGeo} castShadow receiveShadow>{wall}</mesh>
      {/* pan avant (texture vivante) */}
      <mesh position={[mid.x, mid.y + 0.09, mid.z]} rotation={[ANGLE, 0, 0]} castShadow receiveShadow material={roofMats}>
        <boxGeometry args={[W, 0.18, SLOPE]} />
      </mesh>
      {/* pan arrière */}
      <mesh position={[mid.x, mid.y + 0.09, -mid.z]} rotation={[-ANGLE, 0, 0]} castShadow receiveShadow material={backMats}>
        <boxGeometry args={[W, 0.18, SLOPE]} />
      </mesh>
      {/* faîtage */}
      <mesh position={[0, RIDGE_Y + 0.12, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, W, 10]} />
        <meshStandardMaterial color="#7a3a26" roughness={0.85} />
      </mesh>
      {/* menuiseries façade avant (z = 4) */}
      <mesh position={[-1.6, 1.55, 4.02]}><boxGeometry args={[4.6, 2.7, 0.08]} />{frame}</mesh>
      <mesh position={[-1.6, 1.55, 4.07]}><boxGeometry args={[4.4, 2.5, 0.04]} />{glass}</mesh>
      <mesh position={[2.55, 1.25, 4.02]}><boxGeometry args={[1.15, 2.4, 0.08]} />{frame}</mesh>
      <mesh position={[2.55, 1.25, 4.07]}><boxGeometry args={[1.0, 2.25, 0.04]} /><meshStandardMaterial color="#2c3640" roughness={0.5} /></mesh>
      {[-2.6, 0.2, 2.8].map((x) => (
        <group key={x}>
          <mesh position={[x, 4.2, 4.02]}><boxGeometry args={[1.25, 1.3, 0.08]} />{frame}</mesh>
          <mesh position={[x, 4.2, 4.07]}><boxGeometry args={[1.1, 1.15, 0.04]} />{glass}</mesh>
        </group>
      ))}
      {/* fenêtre de pignon */}
      <mesh position={[5.02, 5.4, 0]}><boxGeometry args={[0.08, 1.6, 0.9]} />{glass}</mesh>
      {/* aile en bardage bois, toit plat */}
      <group position={[8.6, 0, 0.6]}>
        <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 3.4, 6.6]} />
          <meshStandardMaterial map={cladding} roughness={0.85} />
        </mesh>
        <mesh position={[0, 3.48, 0]} castShadow receiveShadow><boxGeometry args={[7.5, 0.18, 6.9]} /><meshStandardMaterial color="#e8e7e2" roughness={0.9} /></mesh>
        <mesh position={[0.6, 1.5, 3.32]}><boxGeometry args={[4.4, 2.3, 0.06]} />{glass}</mesh>
      </group>
      {/* terrasse */}
      <mesh position={[0.5, 0.06, 6.2]} receiveShadow><boxGeometry args={[12, 0.12, 4]} /><meshStandardMaterial color="#d9d6cf" roughness={0.95} /></mesh>
      {/* gouttière */}
      <mesh position={[0, EAVE_Y - 0.12, EAVE_Z + 0.12]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.1, 0.1, W, 8]} /><meshStandardMaterial color="#9aa1a8" metalness={0.5} roughness={0.4} /></mesh>
    </group>
  );
}

/* ---------- Environnement ---------- */
function Trees() {
  const items = useMemo(() => {
    const r = rng(3);
    return [[-13, -7, 1.0], [-9, -12, 1.25], [15, -10, 1.15], [20, -3, 0.95], [4, -14, 1.3], [-4, -16, 1.1]].map(([x, z, s]) => ({ x, z, s: s as number, r: r() }));
  }, []);
  return (
    <group>
      {items.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]} scale={t.s}>
          <mesh position={[0, 1.4, 0]} castShadow><cylinderGeometry args={[0.12, 0.18, 2.8, 6]} /><meshStandardMaterial color="#8d8478" roughness={1} /></mesh>
          <mesh position={[0, 4 + t.r, 0]} castShadow><icosahedronGeometry args={[2.2 + t.r * 0.6, 1]} /><meshStandardMaterial color={i % 2 ? '#b5c8a0' : '#a3ba8c'} roughness={1} flatShading /></mesh>
        </group>
      ))}
      {/* haie */}
      <mesh position={[-2, 0.55, 10.5]} castShadow receiveShadow><boxGeometry args={[22, 1.1, 0.9]} /><meshStandardMaterial color="#aebf9c" roughness={1} /></mesh>
    </group>
  );
}

/* ---------- Drone ---------- */
const NOZZLE_LOCAL = new THREE.Vector3(0, -0.83, 1.03);

function Drone({ droneRef }: { droneRef: React.RefObject<THREE.Group | null> }) {
  const rotors = useRef<THREE.Mesh[]>([]);
  const dark = <meshStandardMaterial color="#23292f" roughness={0.45} metalness={0.3} />;
  const arms: [number, number][] = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
  useFrame((_, dt) => { rotors.current.forEach((r, i) => { if (r) r.rotation.y += dt * (i % 2 ? -42 : 42); }); });
  return (
    <group ref={droneRef} scale={0.62}>
      {/* corps */}
      <mesh castShadow><boxGeometry args={[1.1, 0.42, 1.3]} />{dark}</mesh>
      <mesh position={[0, 0.26, 0]}><boxGeometry args={[0.8, 0.12, 0.9]} /><meshStandardMaterial color="#f2f4f6" roughness={0.4} /></mesh>
      <mesh position={[0, 0.33, 0.25]}><boxGeometry args={[0.3, 0.02, 0.2]} /><meshStandardMaterial color="#0091EB" emissive="#0091EB" emissiveIntensity={0.6} /></mesh>
      {/* bras, moteurs, hélices */}
      {arms.map(([sx, sz], i) => (
        <group key={i}>
          <mesh position={[sx * 0.85, 0.05, sz * 0.85]} rotation={[0, Math.atan2(sx, sz), 0]} castShadow>
            <boxGeometry args={[0.12, 0.1, 1.5]} />{dark}
          </mesh>
          <mesh position={[sx * 1.4, 0.16, sz * 1.4]} castShadow><cylinderGeometry args={[0.14, 0.14, 0.22, 12]} />{dark}</mesh>
          <mesh ref={(m) => { if (m) rotors.current[i] = m; }} position={[sx * 1.4, 0.3, sz * 1.4]}>
            <cylinderGeometry args={[0.78, 0.78, 0.01, 28]} />
            <meshStandardMaterial color="#c9d3dc" transparent opacity={0.22} depthWrite={false} />
          </mesh>
          <mesh position={[sx * 1.4, 0.3, sz * 1.4]}><boxGeometry args={[1.5, 0.015, 0.08]} /><meshStandardMaterial color="#111" /></mesh>
          <mesh position={[sx * 1.4, 0.18, sz * 1.4]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color={sz > 0 ? '#ff4b4b' : '#3dff8a'} emissive={sz > 0 ? '#ff4b4b' : '#3dff8a'} emissiveIntensity={1.4} /></mesh>
        </group>
      ))}
      {/* train d'atterrissage */}
      {[-0.45, 0.45].map((x) => (
        <group key={x}>
          <mesh position={[x, -0.45, 0]}><boxGeometry args={[0.05, 0.5, 0.05]} />{dark}</mesh>
          <mesh position={[x, -0.7, 0]}><boxGeometry args={[0.06, 0.05, 1.2]} />{dark}</mesh>
        </group>
      ))}
      {/* lance de rinçage orientée vers la toiture */}
      <mesh position={[0, -0.49, 0.665]} rotation={[2.32, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 1.0, 8]} /><meshStandardMaterial color="#c8ced4" metalness={0.7} roughness={0.25} /></mesh>
      <mesh position={[0, -0.83, 1.03]} rotation={[2.32, 0, 0]}><cylinderGeometry args={[0.04, 0.075, 0.14, 8]} /><meshStandardMaterial color="#0091EB" /></mesh>
      {/* caméra de contrôle */}
      <mesh position={[0, -0.3, -0.45]}><sphereGeometry args={[0.13, 12, 12]} /><meshStandardMaterial color="#111" roughness={0.2} /></mesh>
    </group>
  );
}

/* ---------- Tuyau d'alimentation (drone captif) ---------- */
const PUMP = new THREE.Vector3(4.5, 0.6, 11.5);
function Hose({ droneRef }: { droneRef: React.RefObject<THREE.Group | null> }) {
  const mesh = useRef<THREE.Mesh>(null);
  const tmp = useMemo(() => ({ a: new THREE.Vector3(), c: new THREE.Vector3() }), []);
  useFrame(() => {
    const d = droneRef.current; if (!d || !mesh.current) return;
    tmp.a.copy(d.position).add(new THREE.Vector3(0, -0.2, 0));
    tmp.c.copy(PUMP).lerp(tmp.a, 0.5); tmp.c.y = Math.min(PUMP.y, tmp.a.y) + (Math.abs(tmp.a.y - PUMP.y)) * 0.15;
    const curve = new THREE.QuadraticBezierCurve3(PUMP, tmp.c, tmp.a);
    const g = new THREE.TubeGeometry(curve, 40, 0.045, 6, false);
    mesh.current.geometry.dispose(); mesh.current.geometry = g;
  });
  return (
    <group>
      <mesh ref={mesh} castShadow><bufferGeometry /><meshStandardMaterial color="#1b2630" roughness={0.6} /></mesh>
      {/* unité de pompage au sol */}
      <mesh position={[PUMP.x, 0.45, PUMP.z]} castShadow><boxGeometry args={[1.4, 0.9, 0.9]} /><meshStandardMaterial color="#0A1F37" roughness={0.5} /></mesh>
      <mesh position={[PUMP.x, 0.92, PUMP.z]}><boxGeometry args={[1.42, 0.06, 0.92]} /><meshStandardMaterial color="#0091EB" /></mesh>
      {/* balisage de sécurité */}
      {[[1.5, 9.5], [7.5, 9.5], [1.5, 14], [7.5, 14]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.4, z]} castShadow><coneGeometry args={[0.22, 0.8, 10]} /><meshStandardMaterial color={i % 2 ? '#f5f5f5' : '#ff6a1a'} /></mesh>
      ))}
    </group>
  );
}

/* ---------- Gouttelettes ---------- */
const N_DROPS = 260;
function Spray({ droneRef, active }: { droneRef: React.RefObject<THREE.Group | null>; active: React.RefObject<boolean> }) {
  const points = useRef<THREE.Points>(null);
  const data = useMemo(() => ({
    pos: new Float32Array(N_DROPS * 3), vel: new Float32Array(N_DROPS * 3), life: new Float32Array(N_DROPS), i: 0,
  }), []);
  const geo = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(data.pos, 3)); return g; }, [data]);
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    const d = droneRef.current; if (!d) return;
    if (active.current) {
      for (let k = 0; k < 6; k++) {
        const i = data.i; data.i = (data.i + 1) % N_DROPS;
        v.copy(NOZZLE_LOCAL); d.localToWorld(v);
        data.pos[i * 3] = v.x; data.pos[i * 3 + 1] = v.y; data.pos[i * 3 + 2] = v.z;
        const dir = NORMAL.clone().multiplyScalar(-1);
        data.vel[i * 3] = dir.x * 7 + (Math.random() - 0.5) * 1.4;
        data.vel[i * 3 + 1] = dir.y * 7 + (Math.random() - 0.5) * 0.8;
        data.vel[i * 3 + 2] = dir.z * 7 + (Math.random() - 0.5) * 0.8;
        data.life[i] = 0.32;
      }
    }
    for (let i = 0; i < N_DROPS; i++) {
      if (data.life[i] <= 0) { data.pos[i * 3 + 1] = -100; continue; }
      data.life[i] -= dt; data.vel[i * 3 + 1] -= 9.8 * dt;
      data.pos[i * 3] += data.vel[i * 3] * dt; data.pos[i * 3 + 1] += data.vel[i * 3 + 1] * dt; data.pos[i * 3 + 2] += data.vel[i * 3 + 2] * dt;
    }
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });
  return <points ref={points} geometry={geo} frustumCulled={false}><pointsMaterial color="#e6f5ff" size={0.07} transparent opacity={0.85} depthWrite={false} /></points>;
}

/* ---------- Zone d'intervention (contour) ---------- */
function ZoneOutline({ visible }: { visible: React.RefObject<number> }) {
  const mat = useRef<THREE.LineDashedMaterial>(null);
  const line = useMemo(() => {
    const pts = [roofPoint(0.03, 0.03), roofPoint(0.97, 0.03), roofPoint(0.97, 0.97), roofPoint(0.03, 0.97), roofPoint(0.03, 0.03)]
      .map((p) => p.add(NORMAL.clone().multiplyScalar(0.25)));
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineDashedMaterial({ color: '#0091EB', dashSize: 0.35, gapSize: 0.2, transparent: true, opacity: 0 });
    const l = new THREE.Line(g, m); l.computeLineDistances(); return l;
  }, []);
  useEffect(() => { mat.current = line.material as THREE.LineDashedMaterial; }, [line]);
  useFrame(() => { if (mat.current) mat.current.opacity = visible.current ?? 0; });
  return <primitive object={line} />;
}

/* ---------- Chorégraphie ---------- */
type Phase = 'intro' | 'approach' | 'clean' | 'hold' | 'reset';

function Director({ onHud, reduced, onReady, still }: { onHud: HudSink; reduced: boolean; onReady: () => void; still?: Still }) {
  const { camera, size, gl } = useThree();
  const tex = useMemo(makeRoofTextures, []);
  const drone = useRef<THREE.Group>(null);
  const spraying = useRef(false);
  const zone = useRef(0);
  const st = useRef({ t: 0, phase: 'intro' as Phase, phaseT: 0, dist: 0, lastUV: null as null | [number, number], hudT: 0 });
  const pointer = useRef({ x: 0, y: 0 });
  // Défilement : 0 en haut de page, 1 quand le hero a quitté l'écran. Pilote la caméra et accélère le nettoyage.
  const scroll = useRef({ p: 0, eased: 0, lastY: 0, boost: 0 });
  const sun = useRef<THREE.DirectionalLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const tmp = useMemo(() => ({ p: new THREE.Vector3(), look: new THREE.Vector3(), cam: new THREE.Vector3() }), []);

  // Chemin de nettoyage en serpentin, de haut en bas.
  const path = useMemo(() => {
    const pts: [number, number][] = [];
    for (let i = 0; i < PASSES; i++) {
      const v = 0.1 + (0.8 * i) / (PASSES - 1);
      pts.push(i % 2 ? [0.94, v] : [0.06, v], i % 2 ? [0.06, v] : [0.94, v]);
    }
    const seg: number[] = [0];
    for (let i = 1; i < pts.length; i++) seg.push(seg[i - 1] + Math.hypot((pts[i][0] - pts[i - 1][0]) * W, (pts[i][1] - pts[i - 1][1]) * SLOPE));
    return { pts, seg, total: seg[seg.length - 1] };
  }, []);
  const at = (d: number): { u: number; v: number; idx: number } => {
    const { pts, seg } = path;
    for (let i = 1; i < pts.length; i++) if (seg[i] >= d) { const k = (d - seg[i - 1]) / (seg[i] - seg[i - 1] || 1); return { u: pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, v: pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k, idx: i }; }
    const l = pts[pts.length - 1]; return { u: l[0], v: l[1], idx: pts.length - 1 };
  };

  useEffect(() => {
    const m = (e: PointerEvent) => { pointer.current.x = e.clientX / window.innerWidth - 0.5; pointer.current.y = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', m, { passive: true });
    const sc = () => {
      const y = window.scrollY, sr = scroll.current;
      sr.p = Math.min(1, Math.max(0, y / (window.innerHeight * 0.9)));
      sr.boost += Math.abs(y - sr.lastY); sr.lastY = y;
    };
    sc(); window.addEventListener('scroll', sc, { passive: true });
    gl.domElement.style.opacity = '0';
    requestAnimationFrame(() => { gl.domElement.style.transition = 'opacity 1.2s cubic-bezier(.16,1,.3,1)'; gl.domElement.style.opacity = '1'; onReady(); });
    if (still) {
      for (let d = 0; d < path.total * still.clean; d += 0.12) { const p = at(d); tex.clean(p.u, p.v, 0.13); }
      if (still.clean >= 1) { for (let v = 0; v <= 1; v += 0.02) for (let u = 0; u <= 1; u += 0.02) tex.clean(u, v, 0.1); }
      tex.compose(); zone.current = 0;
      const cam = camera as THREE.PerspectiveCamera; cam.position.set(...still.cam); if (still.fov) { cam.fov = still.fov; cam.updateProjectionMatrix(); } cam.lookAt(...still.look);
      if (drone.current) { if (still.drone) { roofPoint(still.drone[0], still.drone[1], drone.current.position).add(NORMAL.clone().multiplyScalar(2.3)); drone.current.rotation.set(0, Math.PI, 0); } else drone.current.visible = false; }
      spraying.current = !!still.drone;
    } else if (reduced) {
      // État figé : toiture à moitié nettoyée, drone en vol stationnaire.
      for (let d = 0; d < path.total * 0.55; d += 0.12) { const p = at(d); tex.clean(p.u, p.v, 0.13); }
      tex.compose(); st.current.phase = 'clean'; st.current.dist = path.total * 0.55; zone.current = 1;
    }
    return () => { window.removeEventListener('pointermove', m); window.removeEventListener('scroll', sc); tex.dispose(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, rawDt) => {
    if (still) return;
    const dt = Math.min(rawDt, 1 / 20);
    const s = st.current; s.t += reduced ? 0 : dt; s.phaseT += reduced ? 0 : dt;
    const portrait = size.width / size.height < 1.25; // scène compacte (mobile, sous le texte) : maison centrée

    // --- caméra
    const intro = Math.min(1, s.t / 3.2), e = 1 - Math.pow(1 - intro, 3);
    const sr = scroll.current;
    sr.eased += ((reduced ? 0 : sr.p) - sr.eased) * 0.08;
    const sp = sr.eased, spE = sp * sp * (3 - 2 * sp);
    const orbit = reduced ? 0 : Math.sin(s.t * 0.06) * 0.12 + pointer.current.x * 0.08 - spE * 0.55;
    const radius = (portrait ? 46 : 50) - e * 8 - spE * 16;
    const baseAng = 0.42 + orbit;
    tmp.cam.set(Math.sin(baseAng) * radius, 15 - e * 3 + pointer.current.y * -1.2 + spE * 7, Math.cos(baseAng) * radius);
    camera.position.lerp(tmp.cam, reduced ? 1 : 0.08);
    // la maison est cadrée à droite en paysage, en bas en portrait
    tmp.look.set(portrait ? 2.5 : -9, portrait ? 6.6 : 5.2, 0);
    camera.lookAt(tmp.look);

    // --- lumière (mise en lumière progressive)
    if (sun.current) sun.current.intensity = 0.4 + e * 2.4;
    if (hemi.current) hemi.current.intensity = 0.5 + e * 0.5;

    // --- drone
    const d = drone.current; if (!d) return;
    const hover = Math.sin(s.t * 2.1) * 0.06;
    const clean = (dist: number) => {
      const p = at(dist); roofPoint(p.u, p.v, tmp.p).add(NORMAL.clone().multiplyScalar(2.3));
      return { pos: tmp.p.clone(), p };
    };

    if (s.phase === 'intro') {
      d.position.set(26, 16, 10); spraying.current = false;
      if (s.phaseT > 1.6) { s.phase = 'approach'; s.phaseT = 0; }
    } else if (s.phase === 'approach') {
      const k = Math.min(1, s.phaseT / 3.2), ek = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      const target = clean(0).pos;
      d.position.set(THREE.MathUtils.lerp(26, target.x, ek), THREE.MathUtils.lerp(16, target.y, ek) + Math.sin(k * Math.PI) * 1.5, THREE.MathUtils.lerp(10, target.z, ek));
      zone.current = Math.min(1, Math.max(0, (s.phaseT - 1.6) / 1));
      if (k >= 1) { s.phase = 'clean'; s.phaseT = 0; s.dist = 0; s.lastUV = null; }
    } else if (s.phase === 'clean') {
      // Le défilement accélère le nettoyage (« scrollez, ça nettoie »), plafonné pour rester fluide.
      const boost = Math.min(scroll.current.boost * 0.012, 3.5); scroll.current.boost = 0;
      if (!reduced) s.dist = Math.min(path.total, s.dist + dt * 2.4 + boost);
      const { pos, p } = clean(s.dist);
      d.position.copy(pos); d.position.y += hover;
      spraying.current = !reduced;
      if (!reduced) {
        const steps = s.lastUV ? Math.max(1, Math.ceil(Math.hypot(p.u - s.lastUV[0], p.v - s.lastUV[1]) / 0.004)) : 1;
        for (let i = 1; i <= steps; i++) {
          const u = s.lastUV ? s.lastUV[0] + (p.u - s.lastUV[0]) * (i / steps) : p.u;
          const v = s.lastUV ? s.lastUV[1] + (p.v - s.lastUV[1]) * (i / steps) : p.v;
          tex.clean(u, v, 0.125);
        }
        s.lastUV = [p.u, p.v]; tex.compose();
      }
      zone.current = 1;
      if (s.dist >= path.total) { s.phase = 'hold'; s.phaseT = 0; }
    } else if (s.phase === 'hold') {
      spraying.current = false;
      const end = clean(path.total).pos;
      d.position.lerp(end.add(new THREE.Vector3(0, 1.2, 1)), 0.02); d.position.y += hover * 0.2;
      zone.current = Math.max(0, 1 - s.phaseT / 1.5);
      if (s.phaseT > 4) { s.phase = 'reset'; s.phaseT = 0; }
    } else if (s.phase === 'reset') {
      tex.resetMoss(0.06);
      const start = clean(0).pos; d.position.lerp(start, 0.03);
      if (s.phaseT > 1.8) { tex.resetMoss(1); s.phase = 'clean'; s.phaseT = 0; s.dist = 0; s.lastUV = null; }
    }
    // orientation : la lance vise la toiture
    // drone à plat, face au pan ; légère inclinaison dans le sens du déplacement
    const lean = s.phase === 'clean' && !reduced ? (at(s.dist).idx % 2 ? 0.06 : -0.06) : 0;
    d.rotation.set(s.phase === 'approach' ? 0.12 : 0, Math.PI, THREE.MathUtils.lerp(d.rotation.z, lean, 0.05));

    // --- HUD (10 fois par seconde)
    s.hudT += dt;
    if (s.hudT > 0.1 || reduced) {
      s.hudT = 0;
      const p = at(s.dist);
      onHud({ alt: d.position.y, pass: Math.min(PASSES, Math.ceil(p.idx / 2)), passes: PASSES, pct: s.phase === 'clean' || s.phase === 'hold' ? Math.round((s.dist / path.total) * 100) : 0, phase: s.phase });
    }
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={['#eaf4ff', '#d8d2c4', 0.9]} />
      <directionalLight ref={sun} position={[-14, 22, 16]} intensity={2.6} castShadow
        shadow-mapSize={typeof window !== 'undefined' && window.innerWidth < 900 ? [1024, 1024] : [1536, 1536]} shadow-bias={-0.0004} shadow-normalBias={0.04}
        shadow-camera-left={-22} shadow-camera-right={22} shadow-camera-top={22} shadow-camera-bottom={-22} shadow-camera-far={70} />
      <ambientLight intensity={0.18} />
      <House roofMap={tex.map} roofBump={tex.bumpMap} />
      <Trees />
      <Drone droneRef={drone} />
      <Hose droneRef={drone} />
      <Spray droneRef={drone} active={spraying} />
      <ZoneOutline visible={zone} />
      {/* sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial color="#dfe6d6" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-4, 0.01, 9.5]} receiveShadow><planeGeometry args={[3, 9]} /><meshStandardMaterial color="#ecebe6" roughness={1} /></mesh>
      <ContactShadows position={[0, 0.02, 0]} opacity={0.35} scale={40} blur={2.6} far={12} resolution={512} frames={1} />
    </>
  );
}

export default function HeroScene({ onHud, reduced, onReady, active, still }: { onHud: HudSink; reduced: boolean; onReady: () => void; active: boolean; still?: Still }) {
  // Appareils tactiles / petits écrans : résolution et ombres allégées.
  const light = typeof window !== 'undefined' && !still && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900);
  return (
    <Canvas
      shadows
      dpr={light ? [1, 1.5] : [1, 1.75]}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true, preserveDrawingBuffer: !!still }}
      camera={{ fov: 30, near: 0.5, far: 220, position: [20, 12, 30] }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.05;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        scene.fog = new THREE.Fog('#e9f1f8', 45, 120);
      }}
      aria-hidden="true"
    >
      <Director onHud={onHud} reduced={reduced} onReady={onReady} still={still} />
    </Canvas>
  );
}
