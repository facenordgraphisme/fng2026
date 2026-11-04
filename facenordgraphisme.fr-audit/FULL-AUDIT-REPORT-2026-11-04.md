# Audit SEO complet : facenordgraphisme.fr

**Date :** 2026-11-04
**Périmètre :** 42 pages indexables (toutes celles du sitemap), plus 3 URL en 404 découvertes par les liens internes
**Type d'activité :** service local, développeur web freelance dans les Hautes-Alpes
**Détails par catégorie :** [findings-2026-11-04/](findings-2026-11-04/)

## Synthèse

### Score : 60/100

> **Correction du 2026-11-04, après connexion de Search Console :** la première version indiquait 64/100 et « aucun problème critique ». C'était faux sur l'indexation : **10 articles de blog sur 13 ne sont pas indexés**, et le trafic ne progresse pas. Voir [search-console.md](findings-2026-11-04/search-console.md). Ces constats décrivent le site avant les corrections du même jour.

| Catégorie | Score | Poids |
|---|---:|---:|
| SEO technique | 72 | 22 % |
| Qualité du contenu | 50 | 23 % |
| SEO on-page | 60 | 20 % |
| Données structurées | 68 | 10 % |
| Performance | 45 | 10 % |
| Préparation à la recherche IA | 55 | 10 % |
| Images | 85 | 5 % |

Le score de 71 d'août utilisait d'autres catégories et d'autres poids : les deux chiffres ne se comparent pas directement. Ces notes restent une appréciation guidée par les constats, pas une mesure.

**Un problème critique :** Google lit 10 articles sur 13 et choisit de ne pas les indexer. Aucun blocage technique n'est en cause, ce qui en fait un problème de valeur perçue et d'autorité.

### Les problèmes principaux

0. **10 articles sur 13 ne sont pas indexés,** et les positions sur les requêtes cibles reculent depuis septembre.
1. **Les prix se contredisent.** Les pages clés affichent deux grilles différentes, et le schema reprend l'ancienne.
2. **Le préchargeur masque le contenu environ 4 à 5 s** à chaque arrivée depuis Google.
3. **La 3D tourne en permanence :** environ 40 s de thread principal dans Lighthouse mobile.
4. **12 liens internes mènent à des 404,** et une ancienne URL portfolio n'a pas de redirection.
5. **L'autorité externe reste faible,** et la fiche Google n'est pas reliée au site.

### Les 5 corrections rapides

1. Ajouter 4 redirections 301.
2. Corriger les métadonnées cassées de 4 articles.
3. Retirer le double suffixe du titre de `/portfolio`.
4. Rendre absolues les images du schema portfolio.
5. Ajouter le lien de crédit sur Outplanners et le demander à Voyageurs des Alpes.

## Limites de cet audit

- **Search Console connecté après coup :** voir [search-console.md](findings-2026-11-04/search-console.md). GA4 reste non connecté.
- **Spam Update de septembre 2026 (24 sept. au 8 oct.) :** les impressions baissent déjà dans la période qui commence le 18 septembre. Aucune cause ne peut être établie.
- **Pas de CrUX :** le trafic Chrome est insuffisant, toutes les performances viennent de tests de laboratoire.
- **Fiche Google, Pages Jaunes et LinkedIn non revérifiés :** les deux derniers renvoient 403 à l'outil, et la fiche Google n'a pas été consultée. Leur état connu date du 2026-09-17.
- **Backlinks partiels :** seules les homepages des 10 sites du portfolio ont été contrôlées, sans outil de liens complet.
- **Exécution :** audit mené en une seule passe plutôt qu'avec les sous-agents spécialisés. Captures limitées à 3 modèles de page, sans analyse de clusters ni de concurrents.

## Suivi du plan d'août

| Action d'août | État au 2026-11-04 |
|---|---|
| Double suffixe des titres portfolio | Corrigé sur les fiches, reste sur `/portfolio` |
| Redirection du slug Rêves d'Aventures | **Toujours absente,** et le slug live s'est inversé |
| Images relatives du schema portfolio | Ouvert, désormais 10 pages |
| Articles dans `llms.txt` | Ouvert |
| `author.sameAs` | Ouvert, toujours vide |
| Liens internes cassés | Ouvert, 12 liens vers 3 URL |
| Article orphelin `reservation-directe` | Corrigé, 6 liens entrants |
| LCP mobile | Meilleur chiffre (1,0 s sur la homepage), mais le préchargeur masque l'attente réelle |
| Code splitting de la 3D | Fait, mais la scène reste active partout |
| Caractères cassés dans les métadonnées | Ouvert, 4 articles |
| Orthographe de Puy-Sanières | Ouvert |
| Liens sociaux morts | Ouvert |
| Reprise du calendrier éditorial | Ouvert, aucun article depuis le 2026-06-07 |

## Constats détaillés

### Prix contradictoires (Élevé)

| Offre | Homepage et `/prestations` | Page service |
|---|---:|---:|
| Site vitrine | 500 € | 800 € |
| Boutique et réservation | 800 € | 2 500 € |
| Refonte | 400 € | 800 € |
| Maintenance | 20 €/mois | 50 €/mois (30 € sur `/villes/gap`) |

Le commit `2da1437` n'a modifié que `src/lib/services.ts`. Les anciens tarifs restent dans les balises meta, le schema `Service`, `llms.txt`, les pages villes et l'article sur les prix. `/faq` donne une autre référence, autour de 1000 €.

Un prospect qui clique sur « dès 500 € » arrive sur « dès 800 € ». Pour un service local, c'est un problème de confiance immédiat, et les moteurs IA peuvent citer n'importe laquelle de ces versions.

### Préchargeur et 3D (Élevé)

Mesures sur Chromium mobile (390 px), sur la homepage, une page service et une page ville :

- **À 4 s :** le H1 est encore couvert et le défilement bloqué.
- **À 5 s :** la page est utilisable.

`globalState.isPreloaderDone` est conservé en mémoire : chaque chargement complet rejoue l'animation, donc toute arrivée depuis Google. Le texte reste présent dans le HTML, ce qui écarte un problème d'indexation : le risque porte sur les visiteurs, pas sur l'exploration par Google.

La scène `HeroScene` est montée dans `LayoutWrapper` pour toutes les pages hors `/studio` et ne s'arrête jamais.

| Page (PSI) | Perf. | LCP | TBT | TTI | CLS |
|---|---:|---:|---:|---:|---:|
| Homepage, mobile | 61 | 1,0 s | 15,1 s | 44,4 s | 0 |
| Homepage, bureau | 60 | 0,3 s | 20,0 s | 33,6 s | 0,007 |
| Page service, mobile | 51 | 2,9 s | 8,1 s | 42,9 s | 0 |
| Page service, bureau | 61 | 0,6 s | 21,9 s | 34,4 s | 0,009 |

Sur la homepage mobile, 39,7 s sur 41,2 s sont classés « Other », contre 1,2 s d'évaluation JavaScript. Cela désigne très probablement la boucle de rendu WebGL, exagérée par le rendu logiciel de PSI. Les vrais appareils feront mieux : ces chiffres montrent un risque, pas l'expérience exacte d'un visiteur. Une nouvelle mesure après correction confirmera la cause.

Un run mobile sur la page service a aussi signalé `robots.txt` comme invalide. Le fichier est correct et les trois autres runs n'ont rien signalé : il s'agit probablement d'un échec de lecture ponctuel.

### Technique

Base saine : exploration ouverte, sitemap propre, URL canoniques correctes, contenu sans JavaScript et en-têtes de sécurité présents. Restent :

- **Élevé :** `/portfolio/reves-d-aventures` en 404 sans redirection.
- **Moyen :** `lastmod` égal à la date du jour sur 29 URL (`src/app/api/sitemap/route.ts:67`).
- **Faible :** deux redirections depuis `http://`, pas de CSP.

### Contenu

- **Forces :** articles longs, pages villes réellement différenciées (19 à 23 % de similarité), témoignages nommés et process clairs sur les pages services.
- **Moyen :** aucune publication depuis le 7 juin, et `dateModified` égal à la date de publication partout.
- **Moyen :** 10 articles sur 13 n'ont aucun lien externe malgré leurs pourcentages.
- **Moyen :** « je » et freelance sur la homepage, « nous » et agence sur les pages villes.

### On-page

- **Élevé :** 12 liens cassés (`/blog/gbp-artisans-hautes-alpes` : 4, `/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes` : 3, `/blog/le-guide-complet-…` : 5).
- **Élevé :** caractères cassés visibles dans Google, par exemple « Prix site web Hautes-Alpes : d�s 800 ? ».
- **Moyen :** plusieurs H1 de pages services ne contiennent plus de terme recherché depuis octobre.
- **Moyen :** 21 pages sur 42 ont un titre de plus de 70 caractères (jusqu'à 95).
- **Moyen (hypothèse) :** trois pages visent « création site internet Hautes-Alpes », et deux se chevauchent sur le référencement IA. À vérifier dans Search Console.

### Données structurées

- **Moyen :** images `CreativeWork` relatives sur 10 pages.
- **Moyen :** `sameAs` de l'auteur vide, pas d'entité `Person` sur `/a-propos`, fiche Google absente.
- **Moyen :** `LocalBusiness` des villes sans `@id`, et deux orthographes de Puy-Sanières.
- **Moyen :** prix `Service` périmés, et `unitText` utilisé à la place de `minPrice`.
- **Changement de recommandation :** ne pas ajouter `AggregateRating`. Google n'affiche pas d'étoiles pour les avis qu'un LocalBusiness publie sur son propre site.

### Recherche IA

Les robots IA ont accès au site, `llms.txt` est valide et le contenu se lit sans JavaScript. La limite principale est l'absence de sources tierces : domaine absent du Common Crawl en cache (janvier à mars 2026), citations non consolidées, statistiques peu sourcées.

### Local et autorité

- **Positif :** 8 sites clients sur 10 ont un lien suivi vers le site sur leur homepage, contre 5 liens recensés en septembre.
- **Élevé :** « Noté 5/5 sur Google » n'est relié ni à la fiche ni au schema.
- **Moyen :** pas de crédit sur voyageurs-des-alpes.fr ni sur outplanners.com.
- **Faible :** « Basé à Embrun » alors que l'adresse est à Puy-Sanières.

Une évaluation à 5,0 sur seulement 2 avis (état de septembre) reste un signal mince : c'est le prochain levier local à activer.

### Images

Alt présent à 100 %, formats optimisés et seulement 18 Kio d'économies possibles. Restent une image de partage absente sur `/portfolio` et 5 articles illustrés par des photos Unsplash.

### Expérience mobile et accessibilité

- **Moyen :** sur mobile, le bandeau cookies masque le bouton principal.
- **Moyen :** « En continuant à naviguer, vous acceptez » n'est pas un consentement valable selon la CNIL. À vérifier, avec la question des traceurs déposés avant le choix.
- **Faible :** bouton de menu sans nom accessible, contraste de 3,24:1 sur le petit texte turquoise.

## Plan d'action

Voir [ACTION-PLAN-2026-11-04.md](ACTION-PLAN-2026-11-04.md).
