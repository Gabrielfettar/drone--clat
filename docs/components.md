# Bibliothèque de composants

Tous les composants consomment les tokens de `src/app/globals.css`. États gérés : survol, focus visible (anneau bleu 2 px), désactivé (`[disabled]`, opacité 45 %), chargement (`data-loading="true"` : spinner), succès / erreur (`.notice--success`, `.notice--error`, `.field-error`, `aria-invalid`).

## Primitives CSS
| Classe | Rôle |
|---|---|
| `.container`, `.section`, `.section--mist`, `.section--ink`, `.section--tight` | Mise en page |
| `.sec-head` | Tête de section asymétrique (titre / chapô) |
| `.eyebrow` | Sur-titre mono avec l’arc de la marque |
| `.h-display`, `.h-1`, `.h-2`, `.h-3`, `.lede`, `.muted`, `.mono`, `.prose` | Typographie |
| `.btn`, `.btn--ghost`, `.btn--light`, `.btn--sm`, `.btn--block` | Boutons (remplissage animé au survol) |
| `.link-arrow` | Lien d’action secondaire |
| `.input`, `.select`, `.textarea`, `.field`, `.hint`, `.field-error` | Formulaires |
| `.choices` / `.choice` | Choix en tuiles (radios accessibles) |
| `.notice` (+ `--success`, `--warning`, `--error`) | Messages |
| `.pending-tag` | Signale une donnée provisoire ou une illustration |
| `.ticks`, `.dashes` | Listes avantages / précautions |
| `.answer` | Définition directe extractible (SEO/GEO) |
| `.cards` / `.card` | Cartes, usage sélectif |
| `.layout-aside` / `.aside-card` | Contenu + colonne collante |
| `.table-wrap` / `.cmp` | Tableau comparatif défilable |
| `data-reveal` (+ `--i`) | Révélation au scroll, visible sans JS |

## Composants React
| Composant | Fichier | Notes |
|---|---|---|
| `Header` | `layout/Header.tsx` | Transparent sur le hero, se masque au scroll vers le bas, sous-menu prestations, menu mobile modal (focus piégé, Échap) |
| `Footer` | `layout/Footer.tsx` | Coordonnées « à venir » tant que non validées |
| `QuickContact` | `layout/QuickContact.tsx` | Bouton flottant après le premier écran ; appel seulement si téléphone validé ; masqué sur /contact |
| `Analytics` | `layout/Analytics.tsx` | Plausible optionnel, événements via `data-track` |
| `HeroStage` / `HeroScene` | `hero/` | Voir `architecture.md` |
| `Estimator` | `widgets/Estimator.tsx` | 7 écrans, validation par étape, photos, récapitulatif modifiable, diagnostic sans prix, envoi réel, focus géré |
| `BeforeAfter` | `widgets/BeforeAfter.tsx` | Glisser souris/doigt, `role="slider"` au clavier |
| `ZoneChecker` | `widgets/ZoneChecker.tsx` | API Géo officielle, distance réelle, carte radar SVG, secteur marqué provisoire |
| `ServiceSelector` | `widgets/ServiceSelector.tsx` | Onglets ARIA (flèches, Début, Fin) |
| `Gallery` | `widgets/Gallery.tsx` | Filtres, visionneuse `<dialog>`, balayage, zoom |
| `PrepChecklist` | `widgets/PrepChecklist.tsx` | Mémorisée en localStorage (try/catch) |
| `Faq` | `ui/Faq.tsx` | `<details>` natif + JSON-LD FAQPage |
| `PageHero`, `Breadcrumbs`, `CtaBand`, `JsonLd`, `Logo` | `ui/` | |

## Mesure des conversions (attributs `data-track`)
`cta_hero`, `cta_header`, `cta_band`, `cta_mobile_menu`, `svc_devis`, `zone_check`, `zone_to_devis`, `quick_devis`, `phone_click`, et les événements `devis_start`, `devis_submit` envoyés par l’estimateur. Les libellés de CTA sont centralisés dans les pages ; un test A/B pourra s’appuyer sur ces identifiants.
