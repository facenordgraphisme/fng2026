# Plan d'action SEO : facenordgraphisme.fr (2026-11-04)

Issu de [FULL-AUDIT-REPORT-2026-11-04.md](FULL-AUDIT-REPORT-2026-11-04.md).

## Priorité Critique : articles non indexés et pages cibles

Ajouté après connexion de Search Console, voir [search-console.md](findings-2026-11-04/search-console.md).

1. **Ne plus publier de nouveaux articles pour l'instant.** Google écarte déjà 10 articles sur 13.
2. **Fusionner les sujets qui se recoupent** avec des redirections : SEO local, fiche Google et avis d'un côté ; IA, GEO et signaux de citation de l'autre.
3. **Enrichir 3 ou 4 articles prioritaires** avec ce que seule l'expérience de Face Nord peut apporter : cas clients réels, chiffres de projets, captures, sources liées. Commencer par l'article sur les prix.
4. **Demander l'indexation manuellement** dans Search Console, seulement pour les articles retravaillés. L'Indexing API ne convient pas : elle est réservée aux offres d'emploi et aux diffusions en direct.
5. **Clarifier la cible de chaque requête :** Gap sur `/villes/gap-hautes-alpes`, département sur `/creation-site-internet-hautes-alpes`, et retirer les termes généraux de `/villes/briancon-hautes-alpes`.
6. **Reprendre les H1 et titres des pages services** (action 8) : elle passe avant le reste de la phase 2.
7. **Retirer l'ancien `post-sitemap.xml`** dans Search Console (action de votre part).

## Phase 1 : Corrections rapides (semaine 1)

Actions 1 à 3 et 6 à 7 réalisées le 2026-11-04, sauf les métadonnées cassées de 3 articles. Le code reste à déployer.

### 1. Fixer une seule grille tarifaire (Élevé)

Décision à prendre : les prix du commit `2da1437` (500 / 800 / 400 / 20 €) sont-ils les bons ? Une fois tranché, aligner :

- les balises meta, le contenu et le schema de `src/app/creation-site-internet-hautes-alpes/page.tsx`, `boutique-e-commerce-hautes-alpes/page.tsx`, `refonte-ai-friendly/page.tsx` et `maintenance-site-internet-hautes-alpes/page.tsx`
- `src/app/villes/[slug]/page.tsx`, dont les 30 €/mois de Gap et le « dès 800€ »
- `public/llms.txt`
- `/faq` et `/blog/prix-site-internet-artisan-pme-hautes-alpes` dans Sanity

### 2. Ajouter 4 redirections 301 dans `next.config.ts` (Élevé)

| Depuis | Vers |
|---|---|
| `/blog/gbp-artisans-hautes-alpes` | `/blog/google-business-profile-artisans-hautes-alpes` |
| `/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes` | `/blog/etre-visible-en-ligne-dans-les-hautes-alpes` |
| `/blog/le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes` | `/blog/etre-visible-en-ligne-dans-les-hautes-alpes` |
| `/portfolio/reves-d-aventures` | `/portfolio/reves-daventures` |

Corriger ensuite les 12 liens à la source : `/villes/gap`, `/villes/briancon`, et les articles `prix-site-internet`, `refonte-site-internet-5-signes`, `seo-vs-referencement`, `google-business-profile`, `digitaliser-reservations`.

### 3. Corriger les métadonnées cassées dans Sanity (Élevé)

- `prix-site-internet-artisan-pme-hautes-alpes` : titre et description
- `digitaliser-reservations-tourisme-hautes-alpes` : titre
- `seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026` : titre
- `google-business-profile-artisans-hautes-alpes` : description

### 4. Corrections de code ciblées (Moyen)

- `src/app/portfolio/page.tsx:10` : retirer le suffixe de marque en double.
- Schema `CreativeWork` : rendre les images absolues sur les 10 pages portfolio.
- `src/components/Header.tsx:207` et `:210` : mettre les vraies URL sociales ou supprimer les icônes.

### 5. Vérifier la fiche Google (Élevé, action de votre part)

Contrôler la catégorie principale, le téléphone et les avis, puis fournir l'URL de la fiche. Elle sera ajoutée à `sameAs` et reliée à la mention « Noté 5/5 sur Google ».

## Phase 2 : Visiteurs et pages cibles (semaines 2-3)

### 6. Retirer ou écourter le préchargeur (Élevé)

Fichier : `src/components/Preloader.tsx`. Il couvre le contenu environ 4 à 5 s à chaque arrivée. La solution la plus simple est de le supprimer. Sinon, le limiter à moins d'une seconde, une fois par session, et le désactiver avec `prefers-reduced-motion`.

### 7. Limiter la 3D (Élevé)

Fichier : `src/components/LayoutWrapper.tsx:22`. Monter la scène sur la homepage uniquement, avec une image statique sur mobile, et l'arrêter hors écran. Relancer ensuite Lighthouse pour confirmer que le TBT baisse.

### 8. Reprendre les titres et H1 (Moyen)

- Mettre service + Hautes-Alpes dans le H1 de `/developpement-application-web`, `/boutique-e-commerce-hautes-alpes`, `/referencement-seo-hautes-alpes`, `/refonte-ai-friendly`, `/maintenance-site-internet-hautes-alpes` et `/creation-site-internet-hautes-alpes`.
- Ramener les titres d'environ 21 pages vers 60 caractères.

### 9. Consolider les données structurées (Moyen)

- Publier une entité `Person` sur `/a-propos` et renseigner le LinkedIn de l'auteur dans Sanity.
- Réutiliser `@id #localbusiness` dans `src/app/villes/[slug]/page.tsx:272`.
- Écrire « Puy-Sanières » dans `src/app/layout.tsx:93` et `:150`.
- Exprimer les prix avec `minPrice`.
- Ne pas ajouter `AggregateRating` : cela remplace la recommandation des audits précédents.

### 10. Autres corrections (Moyen)

- `src/app/api/sitemap/route.ts:67` : ne plus déclarer la date du jour en `lastmod`.
- Bandeau cookies : le compacter sur mobile et retirer « En continuant à naviguer ».
- Pages villes : passer au « je ».
- Accessibilité : `aria-label` sur le bouton de menu mobile et contraste de `#239ea0`.
- Open Graph : compléter les 9 pages concernées.

## Phase 3 : Autorité et contenu (mois 2)

C'est le plus grand levier restant pour le classement, et il dépend surtout d'actions hors du code.

- Demander des avis Google aux clients récents, avec un flux régulier.
- Réclamer Bing Places, Apple Business Connect et Pages Jaunes.
- Ajouter le crédit sur outplanners.com et le demander à Voyageurs des Alpes.
- Obtenir au moins un lien hors cercle client : CCI ou presse locale, à partir d'un lancement de projet.
- Actualiser les articles, en commençant par celui sur les prix, et lier les statistiques à leurs sources.
- Publier le pilier e-commerce.
- Ajouter 2 ou 3 guides à `public/llms.txt` (faible priorité).

## Phase 4 : Suivi (continu)

- Connecter Search Console à l'outil (fichier `service_account.json`) ou exporter les données à chaque audit.
- Suivre les requêtes de septembre : « création site internet gap », « agence seo hautes-alpes », etc.
- Ajouter le suivi Web Vitals pour obtenir un INP réel.
- Refaire un audit 8 à 12 semaines après les phases 1 et 2.
