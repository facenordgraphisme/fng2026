# Search Console : données du 2026-11-04

Propriété `sc-domain:facenordgraphisme.fr`. Données brutes dans [raw/gsc/](raw/gsc/). Ces mesures portent sur le site en ligne, avant le déploiement des corrections du 2026-11-04.

## Indexation (inspection des 42 URL du sitemap)

- **32 URL indexées, 10 non indexées.**
- **Les 10 non indexées sont toutes des articles de blog,** soit 10 articles sur 13. Statut : « Crawled - currently not indexed ».
- Pour ces 10 URL : robots autorisés, indexation autorisée, page récupérée sans erreur, canonique conforme. Aucun blocage technique n'est donc en cause : Google a lu ces pages et choisi de ne pas les indexer. Il ne donne pas la raison.

| Article non indexé | Dernier crawl |
|---|---:|
| seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026 | 2026-11-02 |
| digitaliser-reservations-tourisme-hautes-alpes | 2026-10-27 |
| prix-site-internet-artisan-pme-hautes-alpes | 2026-10-04 |
| geo-referencement-ia-artisans-pme-hautes-alpes | 2026-08-24 |
| reservation-directe-eviter-commissions-booking-hautes-alpes | 2026-08-01 |
| gerer-avis-google-artisans-pme-hautes-alpes | 2026-07-30 |
| seo-local-hautes-alpes-artisans-pme | 2026-07-23 |
| google-business-profile-artisans-hautes-alpes | 2026-07-20 |
| refonte-site-internet-5-signes | 2026-06-20 |
| balises-title-meta-description-pme-hautes-alpes | 2026-06-02 |

Articles indexés : `guide-creation-site-internet-artisan-hautes-alpes`, `4-signaux-citation-ia-artisans`, `etre-visible-en-ligne-dans-les-hautes-alpes`.

**Hypothèses (non prouvées) :** site à faible autorité, articles longs de structure très proche, peu de sources liées, sujets qui se recoupent (SEO local, fiche Google, avis ; IA, GEO, signaux de citation), et texte peu distinct de ce qui existe déjà sur ces sujets généraux.

## Trafic

| Période | Clics | Impressions | Position moyenne |
|---|---:|---:|---:|
| 7 août au 3 sept. (28 j) | 3 | 723 | environ 50 |
| 5 oct. au 2 nov. (28 j) | 6 | 355 | environ 55 |

| Sur 14 jours | Clics | Impressions | Position |
|---|---:|---:|---:|
| 21 août au 3 sept. | 2 | 356 | 47,0 |
| 4 au 17 sept. | 1 | 328 | 36,3 |
| 18 sept. au 1er oct. | 2 | 130 | 45,5 |
| 2 au 15 oct. | 4 | 199 | 50,9 |
| 16 au 29 oct. | 2 | 151 | 61,8 |

- Les impressions chutent dès la période commençant le 18 septembre. C'est avant la refonte du 18 octobre, et la Spam Update (24 sept. au 8 oct.) commence pendant cette période. Rien ne permet d'en attribuer la cause.
- La position continue de reculer en octobre. Ce recul coïncide avec la refonte des pages services et la suppression des termes recherchés dans leurs H1, sans preuve de lien.
- Les volumes restent faibles : ces tendances sont à lire avec prudence.
- 83 % des impressions viennent de l'ordinateur (295 sur 355), 16 % du mobile.
- Aucun des 6 clics n'apparaît au niveau des requêtes : ils relèvent de requêtes masquées par Google. Les pages cliquées : homepage 4, `/a-propos` 1, `/villes/briancon-hautes-alpes` 1.

## Requêtes cibles

| Requête | Impressions, août puis oct. | Position, août puis oct. |
|---|---:|---:|
| création site internet gap | 72 → 48 | 51,5 → 66,9 |
| agence seo hautes-alpes | 66 → 27 | 47,0 → 54,3 |
| agence seo gap | 47 → 14 | 70,2 → 90,3 |
| création site internet mairie hautes-alpes 05 | 32 → 14 | 35,9 → 87,9 |
| seo referencement naturel gap | 27 → 26 | 62,9 → 79,0 |
| création site internet hautes alpes | 22 → 30 | 62,6 → 66,7 |

Aucune requête cible n'est dans les 25 premières positions avec au moins 3 impressions.

## Pages

- **`/villes/gap-hautes-alpes` : 0 impression en 28 jours,** alors qu'elle est indexée. Dernier crawl le 2026-07-21. Sur « création site internet gap », c'est `/creation-site-internet-hautes-alpes` qui s'affiche.
- **`/villes/briancon-hautes-alpes` ressort sur des requêtes générales** (« création site internet hautes alpes », « site e commerce 05 »), avec jusqu'à 4 pages pour une même requête. La cannibalisation supposée dans l'audit se confirme.
- **Autres pages indexées sans aucune impression :** `/developpement-application-web`, `/maintenance-site-internet-hautes-alpes`, `/referencement-ia`, `/faq`, `/blog`, 5 fiches portfolio et `/blog/etre-visible-en-ligne-dans-les-hautes-alpes`.
- Bruit de requêtes : « imprimerie embrun » (8 impressions), probablement lié au mot « graphisme ».

## Autres points

- **Sitemap :** `https://www.facenordgraphisme.fr/sitemap.xml` est sans erreur, 42 URL. Un ancien `https://facenordgraphisme.fr/post-sitemap.xml` (WordPress, 2025) reste déclaré et peut être retiré.
- **`/portfolio/reves-d-aventures` :** inconnue de Google. La gravité « Élevé » de l'audit était surestimée, la redirection reste une simple précaution.
- **`/blog/le-guide-complet-…` :** ancienne URL connue de Google, non indexée (dernier crawl le 2026-06-28). La redirection reste utile.
- **GA4 :** toujours non connecté, aucun identifiant de propriété configuré.
