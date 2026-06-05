# Blog Audit Report — Face Nord Graphisme
**Site :** www.facenordgraphisme.fr  
**Audit Date :** 2026-06-05  
**Source :** Sanity API (project `k4x2bvj1`, dataset `production`)  
**Total articles :** 9  
**Score moyen post-corrections :** 79/100

---

## Toutes les corrections appliquées dans cette session

| # | Fix | Détail | Statut |
|---|-----|--------|--------|
| 1 | Title template overflow | `[slug]/page.tsx` : `title: { absolute: "… \| Face Nord Graphisme" }` — template root layout contourné | ✅ |
| 2 | 9 seoTitles raccourcis | Tous ≤ 38 chars → total ≤ 60 chars avec suffixe | ✅ |
| 3 | 4 liens internes cassés | `/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes` (×3) + `/blog/gbp-artisans-hautes-alpes` (×1) corrigés | ✅ |
| 4 | 4 alt texts images principales | `digitaliser-reservations`, `refonte-site-internet`, `le-guide-complet-visibilite`, `seo-vs-ia` | ✅ |
| 5 | seoDescription `le-guide-complet` | Étendue 141 → 161 chars | ✅ |
| 6 | postQuery externalUrl | `queries.ts` : `select(defined(asset) => asset->url, externalUrl)` pour le listing | ✅ |
| 7 | Image principale `prix-site-internet` | `mainImage.externalUrl` + alt ajoutés dans Sanity | ✅ |
| 8 | SpokeCards `gerer-avis-google` | H2 "Pour aller plus loin" + 2 cartes (seo-local, google-business-profile) | ✅ |
| 9 | SpokeCards `balises-title-meta` | H2 "Pour aller plus loin" + 3 cartes (seo-local, GBP, gerer-avis) | ✅ |
| 10 | SpokeCards `le-guide-complet` | H2 "Pour aller plus loin" + 3 cartes (seo-local, GBP, seo-vs-ia) | ✅ |
| 11 | SpokeCard → `prix-site-internet` | Carte ajoutée dans `seo-local` après le dernier bloc → résout l'orphelinat | ✅ |
| 12 | FAQ `seo-local-hautes-alpes` | 5 questions sur le SEO local 05 ajoutées en fin d'article | ✅ |
| 13 | FAQ `le-guide-complet-visibilite` | 5 questions sur la visibilité en ligne ajoutées | ✅ |
| 14 | Enrichissement `digitaliser-reservations` | +2 H2, tableau comparatif 4 outils, 3 H3, 6 paragraphes, 2 images body (+~18 blocs) | ✅ |
| 15 | Schéma `postType.ts` | Champs `lastUpdated` et `excerpt` ajoutés | ✅ |
| 16 | `postBySlugQuery` | `lastUpdated` ajouté à la query GROQ | ✅ |
| 17 | `blogSchema.dateModified` | `page.tsx:279` → utilise `post.lastUpdated` en priorité | ✅ |

---

## Health Overview — État final

| Métrique | Avant session | Après session |
|----------|---------------|---------------|
| Titles hors gabarit Google (>60 chars) | 9 | **0** ✅ |
| Liens internes cassés | 4 | **0** ✅ |
| Pages orphelines (0 lien entrant) | 1 | **0** ✅ |
| Pages cul-de-sac (0 lien sortant) | 3 | **0** ✅ |
| Articles sans FAQ | 3 | **1** (refonte-site ← acceptable avec 4 spokeCards) |
| Images principales sans alt text | 5 | **0** ✅ |
| Articles scoring <70 | 4 | **1** (`digitaliser-reservations`, en cours d'enrichissement) |
| Cannibalisation thématique | 0 | 0 ✅ |
| Contenu périmé (>90 jours) | 0 | 0 ✅ |

---

## Scores par article — État final

| Article | Score | Content | SEO | E-E-A-T | Technical | AI Citation |
|---------|-------|---------|-----|---------|-----------|-------------|
| [seo-local-hautes-alpes-artisans-pme](/blog/seo-local-hautes-alpes-artisans-pme) | **88/100** | 23/25 | 18/20 | 17/20 | 14/15 | 16/20 |
| [google-business-profile-artisans-hautes-alpes](/blog/google-business-profile-artisans-hautes-alpes) | **84/100** | 21/25 | 17/20 | 17/20 | 14/15 | 15/20 |
| [refonte-site-internet-5-signes](/blog/refonte-site-internet-5-signes) | **81/100** | 21/25 | 17/20 | 15/20 | 13/15 | 15/20 |
| [seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026](/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026) | **80/100** | 20/25 | 17/20 | 14/20 | 14/15 | 15/20 |
| [prix-site-internet-artisan-pme-hautes-alpes](/blog/prix-site-internet-artisan-pme-hautes-alpes) | **79/100** | 20/25 | 15/20 | 14/20 | 13/15 | 17/20 |
| [gerer-avis-google-artisans-pme-hautes-alpes](/blog/gerer-avis-google-artisans-pme-hautes-alpes) | **78/100** | 20/25 | 16/20 | 14/20 | 13/15 | 15/20 |
| [balises-title-meta-description-pme-hautes-alpes](/blog/balises-title-meta-description-pme-hautes-alpes) | **78/100** | 20/25 | 16/20 | 13/20 | 13/15 | 16/20 |
| [le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes](/blog/le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes) | **74/100** | 18/25 | 15/20 | 13/20 | 13/15 | 15/20 |
| [digitaliser-reservations-tourisme-hautes-alpes](/blog/digitaliser-reservations-tourisme-hautes-alpes) | **72/100** | 18/25 | 14/20 | 13/20 | 14/15 | 13/20 |

**Score moyen : 79/100** — tous les articles au-dessus de 70.

---

## Maillage interne — État final

```
seo-local-hautes-alpes-artisans-pme (HUB principal — 88/100)
  ← 4 liens entrants (google-business-profile, refonte, seo-vs-ia, prix-site)
  → google-business-profile, gerer-avis, balises, /contact, /referencement-seo, /referencement-ia
  + [NOUVEAU] FAQ 5 questions ✅
  + [NOUVEAU] SpokeCard → prix-site-internet ✅

google-business-profile-artisans-hautes-alpes (Spoke 1.1 — 84/100)
  ← 3 liens entrants (seo-local, digitaliser, seo-vs-ia)
  → gerer-avis, seo-vs-ia, digitaliser, seo-local, le-guide-complet, /prestations

gerer-avis-google-artisans-pme-hautes-alpes (Spoke 1.2 — 78/100)
  ← 3 liens entrants (seo-local, google-business-profile, refonte)
  + [NOUVEAU] SpokeCards → seo-local, google-business-profile ✅

balises-title-meta-description-pme-hautes-alpes (Spoke 1.3 — 78/100)
  ← 1 lien entrant (seo-local)
  + [NOUVEAU] SpokeCards → seo-local, google-business-profile, gerer-avis ✅

refonte-site-internet-5-signes (Satellite — 81/100)
  ← 2 liens entrants (prix-site, digitaliser)
  → seo-local, gerer-avis, le-guide-complet, /refonte-ai-friendly, /creation-site

le-guide-complet-de-la-visibilite-en-ligne (Hub secondaire — 74/100)
  ← 5 liens entrants (google-business-profile, digitaliser, seo-vs-ia, refonte, prix-site)
  + [NOUVEAU] SpokeCards → seo-local, google-business-profile, seo-vs-ia ✅
  + [NOUVEAU] FAQ 5 questions ✅

seo-vs-referencement-sur-l-ia (Comparatif — 80/100)
  ← 1 lien entrant (google-business-profile)
  → seo-local, google-business-profile, le-guide-complet, /referencement-ia

digitaliser-reservations-tourisme-hautes-alpes (Niche — 72/100)
  ← 1 lien entrant (google-business-profile)
  → google-business-profile, le-guide-complet, refonte
  + [NOUVEAU] Tableau comparatif 4 outils, 2 nouvelles sections, 2 images ✅

prix-site-internet-artisan-pme-hautes-alpes (Commercial — 79/100)
  ← [NOUVEAU] 1 lien entrant depuis seo-local ✅  (résout l'orphelinat)
  → refonte, seo-local, le-guide-complet, /creation-site, /boutique, /maintenance
```

---

## Cannibalisation thématique

Aucune. Les 9 articles couvrent des intents distincts et se renforcent mutuellement via le maillage.

---

## Fraîcheur du contenu

| Article | Publié | Jours | Refresh recommandé |
|---------|--------|-------|--------------------|
| `prix-site-internet` | 2026-05-26 | 10 j | Août 2026 |
| `seo-local-hautes-alpes` | 2026-05-14 | 22 j | Août 2026 |
| `gerer-avis-google` | 2026-05-12 | 24 j | Août 2026 |
| `balises-title-meta` | 2026-05-10 | 26 j | Août 2026 |
| `google-business-profile` | 2026-05-09 | 27 j | Août 2026 |
| `digitaliser-reservations` | 2026-05-05 | 31 j | Août 2026 |
| `refonte-site-internet` | 2026-04-24 | 42 j | Septembre 2026 |
| `le-guide-complet-visibilite` | 2026-04-22 | 44 j | Septembre 2026 |
| `seo-vs-ia` | 2026-04-14 | 52 j | Septembre 2026 |

---

## Actions restantes (faible priorité)

| # | Quoi | Où | Effort |
|---|------|-----|--------|
| 1 | Renseigner le champ `excerpt` sur les 9 articles | Sanity Studio | 5 min/article |
| 2 | seoDescription `prix-site-internet` (170 chars, -10 chars) | Sanity Studio | 2 min |
| 3 | seoDescription `google-business-profile` (162 chars, -2 chars) | Sanity Studio | 2 min |
| 4 | Ajouter 1 lien entrant depuis `refonte-site-internet` vers `prix-site-internet` | Sanity Studio | 5 min |
| 5 | `digitaliser-reservations` : seoDescription 147 chars (cible 150+) | Sanity Studio | 2 min |

---

## Fichiers modifiés dans ce projet

| Fichier | Modification |
|---------|-------------|
| [src/app/blog/[slug]/page.tsx](src/app/blog/%5Bslug%5D/page.tsx) | `title: { absolute }` + `dateModified` depuis `lastUpdated` |
| [src/sanity/lib/queries.ts](src/sanity/lib/queries.ts) | `postQuery` avec `externalUrl` + `postBySlugQuery` avec `lastUpdated` |
| [src/sanity/schemaTypes/postType.ts](src/sanity/schemaTypes/postType.ts) | Champs `lastUpdated` et `excerpt` ajoutés |

---

*Rapport généré par Claude Code — 2026-06-05 | Sanity project `k4x2bvj1`*
