'use client';
import { BeforeAfter } from '@/components/widgets/BeforeAfter';
import { CitySwitcher, type SimPair } from './Motion';

/** Comparateur avant / après simulé sur des monuments réels, avec onglets par ville. */
export function SimSlider({ pairs }: { pairs: SimPair[] }) {
  return (
    <CitySwitcher pairs={pairs} Slider={({ pair }) => (
      <BeforeAfter before={pair.before} after={pair.after}
        alt={{ before: `${pair.caption}, avant simulé : pierre encrassée`, after: pair.caption }}
        illustration tag="Simulation"
        caption={<>« Avant » simulé, pas un chantier Drone Éclat. Photo : {pair.caption}, {pair.author}, <a href={pair.licenceUrl} target="_blank" rel="noopener license">{pair.licence}</a>, <a href={pair.commonsUrl} target="_blank" rel="noopener">Wikimedia Commons</a>, image modifiée.</>} />
    )} />
  );
}
