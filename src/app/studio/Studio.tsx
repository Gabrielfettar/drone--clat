'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { STILLS, type Still } from '@/components/hero/HeroScene';

const HeroScene = dynamic(() => import('@/components/hero/HeroScene'), { ssr: false });

export function Studio() {
  const [still, setStill] = useState<Still | null>(null);
  useEffect(() => { const k = new URLSearchParams(location.search).get('still') ?? 'poster'; setStill(STILLS[k] ?? STILLS.poster); document.body.classList.add('studio'); }, []);
  if (!still) return null;
  return <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'linear-gradient(180deg,#dcebf7,#f1f5f2)' }}><HeroScene still={still} reduced={false} active onReady={() => {}} onHud={() => {}} /></div>;
}
