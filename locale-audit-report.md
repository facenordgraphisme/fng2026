# Locale Audit Report — Face Nord Graphisme
**Site :** www.facenordgraphisme.fr  
**Audit Date :** 2026-06-05  
**Scope :** Monolingual FR — locale correctness & SEO parity

---

## Summary

| Statut | Nb |
|--------|----|
| Corrections appliquées | 4 |
| Points critiques restants | 0 |
| Avertissements restants | 0 |

---

## Phase 1 — Discovery

- **Langue unique :** Français (fr-FR)
- **i18n packages :** Aucun (next-intl, i18next, react-i18n absents)
- **Fichiers hreflang :** Aucun — normal pour un site monolangue
- **Champ `lang` dans Sanity :** Absent — sans objet pour l'instant

---

## Phase 4 — SEO Locale Audit (résultats avant corrections)

| Élément | Blog [slug] | Statut |
|---------|-------------|--------|
| `html lang="fr"` (layout.tsx) | ✅ présent | OK |
| `og:locale` dans blog/[slug]/page.tsx | ❌ absent | **Corrigé** |
| `og:locale` dans root layout | ✅ `fr_FR` | OK |
| `inLanguage` dans WebSite schema (layout.tsx) | ✅ `fr-FR` | OK |
| `inLanguage` dans BlogPosting schema | ❌ absent | **Corrigé** |
| `canonical` | ✅ présent | OK |
| hreflang | N/A (site monolangue) | OK |

---

## Phase 5 — Hreflang

Non applicable. Site 100 % français, aucune version traduite. Aucun tag hreflang nécessaire.

---

## Corrections appliquées

### 1 — `og:locale: "fr_FR"` sur les pages articles ✅

**Fichier :** [src/app/blog/[slug]/page.tsx](src/app/blog/%5Bslug%5D/page.tsx)

```ts
// Ajouté dans l'objet openGraph :
locale: 'fr_FR',
```

Avant la correction, Next.js n'héritait PAS du `locale: "fr_FR"` du root layout sur les pages `/blog/[slug]` : chaque page article publiait des balises Open Graph sans `og:locale`.

---

### 2 — `inLanguage: "fr-FR"` dans BlogPosting schema ✅

**Fichier :** [src/app/blog/[slug]/page.tsx](src/app/blog/%5Bslug%5D/page.tsx)

```ts
// Ajouté dans l'objet blogSchema :
"inLanguage": "fr-FR",
```

Permet aux moteurs de recherche et aux crawlers IA de confirmer explicitement la langue du contenu au niveau de chaque article.

---

### 3 — Sitemap `lastmod` utilise `lastUpdated` ✅

**Fichier :** [src/app/sitemap.ts](src/app/sitemap.ts)  
**Query :** [src/sanity/lib/queries.ts](src/sanity/lib/queries.ts)

`postQuery` inclut maintenant `lastUpdated`. Dans `sitemap.ts`, `lastModified` utilise `post.lastUpdated` en priorité :

```ts
lastModified: post.lastUpdated
  ? new Date(post.lastUpdated)
  : post.publishedAt
    ? new Date(post.publishedAt)
    : new Date(),
```

Garantit que les crawlers Google voient la vraie date de mise à jour quand un article est refreshé depuis Sanity Studio.

---

### 4 — seoDescriptions >160 chars raccourcies ✅

Deux articles dépassaient la limite de 160 caractères pour les meta descriptions :

| Article | Avant | Après |
|---------|-------|-------|
| `google-business-profile` | 162 chars | **157 chars** |
| `prix-site-internet` | 170 chars | **156 chars** |

Patches appliqués via l'API Sanity (transaction `glsFk1SvfGcE5pcbzYMZoe`).

---

## Fichiers modifiés dans ce projet

| Fichier | Modification |
|---------|-------------|
| [src/app/blog/[slug]/page.tsx](src/app/blog/%5Bslug%5D/page.tsx) | `og:locale: 'fr_FR'` + `"inLanguage": "fr-FR"` |
| [src/app/sitemap.ts](src/app/sitemap.ts) | `lastModified` utilise `lastUpdated || publishedAt` |
| [src/sanity/lib/queries.ts](src/sanity/lib/queries.ts) | `postQuery` inclut `lastUpdated` |

---

## Checks passés (aucune action requise)

| Check | Résultat |
|-------|----------|
| `html lang="fr"` dans root layout | ✅ |
| `og:locale: "fr_FR"` dans root layout | ✅ |
| `inLanguage: "fr-FR"` dans WebSite schema | ✅ |
| Slugs en français | ✅ tous localisés |
| Alt texts en français | ✅ |
| Tags/catégories localisés | ✅ |
| Canonical URLs cohérentes | ✅ |
| Hreflang (N/A monolangue) | ✅ |

---

*Rapport généré par Claude Code — 2026-06-05 | Site monolangue FR*
