# Drone Éclat — Charte de marque et design system

## Positionnement
« L’entretien de toiture et de façade par drone, prouvé, local et transparent, dans l’Oise. »
Drone Éclat n’est pas « une entreprise qui a un drone » : c’est un spécialiste de l’intervention en hauteur sans exposition humaine, qui dit aussi quand le drone n’est pas la bonne solution (orientation vers un couvreur).

Ton : professionnel, direct, concret, rassurant. Phrases courtes. On écrit depuis le point de vue du client (« votre toit », « vos photos »). Jamais de superlatifs invérifiables, de prix non validés, de promesse réglementaire (voir `regulation.md`).

## Logo
- Source : kit fourni (marine + bleu, drone qui pulvérise au-dessus d’un toit, arc).
- Version redessinée (`public/favicon.svg`, `src/components/ui/Logo.tsx`) : géométrie symétrique, arc détaché des rotors, jet qui ne touche plus le toit.
- Wordmark : DRONE / ÉCLAT en Archivo Extra Bold, chasse étendue 125 %. « ÉCLAT » toujours en bleu.
- Zone de protection : la hauteur de l’arc tout autour. Taille mini : 28 px de haut pour le pictogramme.
- **Point ouvert** : la baseline « Pulvérisation » du kit d’origine est à requalifier tant que l’application de produits par drone n’est pas validée (voir `regulation.md`). Le site utilise « Nettoyage · Démoussage · Traitement ».

## Couleurs
| Rôle | Token | Valeur | Usage |
|---|---|---|---|
| Principale | `--c-ink` | #0A1F37 | Texte, fonds sombres, logo |
| Principale | `--c-blue` | #0091EB | Accent de marque, CTA, arc |
| Principale | `--c-blue-strong` | #0071C2 | Texte bleu sur blanc (contraste AA) |
| Secondaire | `--c-slate` / `--c-tile` / `--c-moss` / `--c-sky` | | Matières du métier : 3D, illustrations, data |
| Neutres | `--c-paper`, `--c-mist`, `--c-mist-2`, `--c-line`, `--c-muted` | | Neutres à biais bleu |
| Fonctionnelles | `--c-success`, `--c-warning`, `--c-error` (+ `-soft`) | | États de formulaire, notices |

Règle : un seul accent (bleu). Le bleu n’est jamais utilisé en aplat de grande surface ; le marine porte les sections fortes.

## Typographie
- Titres : **Archivo** (variable, chasse 105–125 %, graisse 700–800). Personnalité « ingénierie / aérien ».
- Texte : **Instrument Sans** 400–600.
- Données : **IBM Plex Mono** 400–500 pour les étiquettes, mesures, HUD (ALT, PASSE, TRAITÉ).
- Échelle fluide : `--t-xs` 12 → `--t-4xl` 84 px (clamp). Corps 17 px, interligne 1,6, ~65 caractères par ligne.

## Signes distinctifs (reconnaissable sans logo)
1. **L’arc** du logo : sur-titres (`.eyebrow::before`), arcs dessinés au chargement des pages intérieures, cercle du bandeau CTA.
2. **Le HUD** : étiquettes mono en capitales espacées, données de vol en direct dans le hero.
3. **La maquette d’architecte** : scènes 3D claires, matières neutres, seule la toiture est colorée.
4. **Les filets** : sections structurées par des filets fins (1 px) plutôt que par des cartes.

## Espacements, grille, rayons, ombres
- Base 4 px : `--s-1` (4) à `--s-10` (128). Sections : `--section` (64 → 136 px).
- Conteneur 1280 px, gouttière fluide 16 → 40 px. Grilles asymétriques 5/7 ou 4/8.
- Rayons : 2 / 6 / 12 / 20 / pilule. Boutons en pilule, champs en 6, panneaux en 20.
- Ombres : `--sh-1` (posé), `--sh-2` (survol, panneau), `--sh-3` (média, modale).

## Mouvement
| Usage | Durée | Courbe |
|---|---|---|
| Micro-interactions (survol, focus) | 160–280 ms | `--ease-out` |
| Panneaux, onglets, menus | 280–600 ms | `--ease-out` |
| Révélations au scroll | 900 ms, décalage 70 ms | `--ease-out` |
| Hero : entrée du texte | 1,1 s, décalée | `--ease-out` |
| Hero 3D : intro caméra 3,2 s, approche drone 3,2 s, passes ~20 s | | cubique |

Principes : chaque animation a un état de repos lisible ; rien ne bloque la lecture ; `prefers-reduced-motion` coupe tout (le hero affiche une image fixe).

## Iconographie et photographie
- Pas d’emoji, pas d’icônes décoratives génériques. Les listes utilisent des coches et tirets dessinés.
- Photos : uniquement des chantiers Drone Éclat réels, datés, avec accord client. Lumière naturelle, cadrage frontal ou 3/4, avant/après pris du même point de vue.
- Tant qu’il n’y en a pas : illustrations 3D maison, **toujours étiquetées « Illustration 3D »**. Aucune image de stock présentée comme une réalisation.
