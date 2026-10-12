# Stratégie de visibilité — facenordgraphisme.fr

**Date :** 2026-09-17 (mis à jour le même jour après vérification de la fiche Google Business Profile réelle)
**Déclencheur :** Google Search Console — 28 derniers jours : 3 clics, 717 impressions, CTR 0,4%, position moyenne 43,9. Fonctionnalités IA générative : 0 impression.
**Contexte :** Deux audits techniques déjà réalisés (15/06/2026, score 48/100 → 22/08/2026, score 71/100). Le technique est aujourd'hui globalement sain. Ce document répond à la question : *pourquoi ça ne se traduit toujours pas en trafic, et que faire maintenant ?*

> **Correction du 17/09 :** la première version de ce document affirmait à tort qu'aucune fiche Google Business Profile n'existait. Une vérification par capture d'écran a montré qu'une fiche existe bel et bien (5,0★, 2 avis) — l'audit du 22/08 n'avait pu vérifier que l'absence de lien vers elle *depuis le site*, pas son existence côté Google (outil non accessible). Le diagnostic ci-dessous est corrigé en conséquence.

---

## 1. Diagnostic — pourquoi zéro clic malgré un site techniquement propre

### Ce que dit la Search Console

| Requête | Impressions (28j) | Position moyenne |
|---|---|---|
| agence seo hautes-alpes | 69 | 46,0 |
| création site internet gap | 69 | 52,0 |
| agence seo gap | 44 | 66,1 |
| création site internet mairie hautes-alpes 05 | 26 | 40,8 |
| seo referencement naturel gap | 23 | 58,3 |
| création site internet 05 | 17 | 41,6 |
| agence web gap | 17 | 69,9 |
| conception site web gap | 11 | — |
| référencement ia auch | 11 | — |
| site e-commerce 05 | 10 | — |

**Lecture :** le site apparaît (717 impressions, donc il est indexé et Google le montre) mais **jamais avant la page 4-7** des résultats. À ces positions, le CTR naturel est proche de 0% quel que soit le secteur — ce n'est pas une anomalie technique, c'est la conséquence directe et attendue d'un classement aussi bas. **Aucune de ces requêtes ne rate cause d'un bug** : le problème n'est plus le site lui-même, c'est son autorité aux yeux de Google.

### Les deux audits précédents avaient déjà identifié — et jamais corrigé — la vraie cause

Sur les 3 catégories qui pèsent le plus sur le classement des requêtes locales/commerciales, rien n'a bougé en 3 mois :

| Signal | État constaté (17/09/2026) | Poids dans le classement local (Whitespark 2026) |
|---|---|---|
| **Google Business Profile** | **Existe, mais mal exploitée.** Catégorie principale = **"Graphiste"** (ne correspond à aucune des requêtes ciblées : "agence seo gap", "création site internet gap"...). Téléphone absent de la fiche (Google le signale lui-même). Aucun lien depuis le site vers la fiche (pas de `sameAs`, pas d'embed Maps) — vérifié dans le code. | **25-32%**, dont la **catégorie principale est LE facteur n°1 à elle seule** |
| **Avis clients** | **2 avis, 5,0★, mais vieux de ~7 mois et marqués "non vérifiés" par Google.** Aucune fraîcheur récente, très en dessous du seuil de 10 avis. Aucun `AggregateRating` schema sur le site. | **20%**, seuil déclencheur à 10 avis, chute possible après 18 jours sans nouvel avis |
| **Backlinks / autorité externe** | **5 liens au total**, tous depuis vos propres projets clients. Domaine toujours absent de Common Crawl (signal d'un domaine très jeune/peu autoritaire). | **~26%** |
| **Citations locales** | Pages Jaunes existe mais **non réclamée** ("C'est votre entreprise ?"). Rien au-delà + LinkedIn. | Inclus dans NAP/Citations (15%) |

GBP + Avis + Liens + Citations représentent **plus de 70% du poids du classement local**, et sur les quatre, la fiche GBP est en place mais **mal catégorisée et sous-alimentée** — c'est un problème de configuration/entretien, pas de création from scratch. C'est une meilleure nouvelle que le diagnostic initial : corriger la catégorie et relancer les avis sont des actions rapides (quelques minutes à quelques jours), pas un chantier de plusieurs mois comme créer une fiche de zéro.

### Sur le "0 résultat GEO" (IA générative)

Cohérent avec ce qui précède : les moteurs IA (AI Overviews, ChatGPT, Perplexity) s'appuient encore plus fortement sur les signaux de citation/autorité que Google Search classique (3 des 5 facteurs de visibilité IA les plus importants sont liés aux citations, et les mentions de marque corrèlent 3x plus fort que les liens classiques). Sans présence sur Yelp/TripAdvisor/BBB/Bing Places ni citations, il n'y a rien à sourcer. Ce n'est pas un bug séparé — c'est le même trou d'autorité qui bloque à la fois Google Search et l'IA générative.

### Le facteur temps

Le domaine reste jeune et à profil de liens très mince. Même avec une exécution parfaite à partir d'aujourd'hui, un classement compétitif sur des requêtes commerciales comme "agence seo gap" prend généralement **6 à 12 mois**, le temps que Google accumule confiance (citations + avis + liens + ancienneté). Ce n'est pas un problème à résoudre en 2 semaines — c'est un chantier à mener en continu, avec les premiers résultats mesurables (amélioration de position, pas encore de volume) attendus vers 8-12 semaines si le plan ci-dessous est exécuté sérieusement.

---

## 2. Ce qui n'est PAS le problème (pour ne pas se disperser)

- **Pas un problème d'indexation** : 717 impressions prouvent que Google connaît et affiche le site.
- **Pas un problème technique bloquant** : sitemap, canonicals, schema, headers de sécurité sont déjà corrigés (score technique 84/100).
- **Pas un problème de volume de contenu insuffisant en soi** : 13 articles de blog solides existent déjà. Le vrai problème est qu'aucun n'a de signal d'autorité externe pour le porter dans les résultats.

Éviter le piège classique : ajouter encore plus de pages/contenu ne résoudra rien tant que le socle d'autorité (GBP, avis, liens) reste à zéro. C'est un ordre d'exécution, pas une question de tout faire en même temps.

---

## 3. Plan d'action priorisé

### Phase 1 — Fondations d'autorité locale (Semaines 1-2) — LE PLUS IMPORTANT

**1.1 Corriger la catégorie de la fiche Google Business Profile — priorité absolue, 5 minutes**
- Dans le tableau de bord GBP (business.google.com), changer la catégorie principale de **"Graphiste"** vers quelque chose qui matche réellement les requêtes ciblées : **"Agence de conception de sites Internet"** ou **"Agence de marketing"** / **"Consultant en référencement"** selon ce qui est disponible dans la taxonomie Google. "Graphiste" ne sera jamais déclenché par une recherche "agence seo gap" ou "création site internet gap" — c'est probablement la raison à elle seule de la quasi-invisibilité sur ces requêtes.
- Ajouter 3-4 catégories secondaires (SEO, e-commerce, développement web).
- **Ajouter le numéro de téléphone** — Google le signale comme manquant, c'est un clic dans "Ajouter les informations manquantes".
- Ajouter des photos (bureau, réalisations, portrait) — corrélé à +45% de demandes d'itinéraire.
- Vérifier/valider la modification actuellement "en cours d'examen" pour s'assurer qu'elle correspond bien à ces corrections.
- Une fois ces changements faits, donnez-moi l'URL exacte de la fiche (le lien "Google" affiché dans le panneau, ex. `g.page/...` ou `google.com/maps/place/...`) : j'ajoute le `sameAs` dans le schema JSON-LD du site (`src/app/layout.tsx`) et un embed/CTA vers la fiche sur `/contact`.

**1.2 Claim Bing Places et Apple Business Connect**
- Bing Places alimente ChatGPT, Copilot et Alexa — c'est le chemin le plus direct vers la visibilité IA actuellement à 0.
- Apple Business Connect : usage doublé en un an (27%), gratuit à réclamer.

**1.3 Relancer la collecte d'avis Google — la fiche existe mais est à l'arrêt depuis ~7 mois**
- 2 avis (Thomas Panoff, Guillaume Cauvin), 5,0★, mais aucun nouveau depuis ~7 mois et Google les marque "non vérifiés". C'est un signal de staleness qui peut activement nuire au classement (règle des 18 jours).
- Contacter les clients récents (L'Instant Verdon, Rêves d'Aventures, Gaudineto, GAEC des Valentins, ACT Event Pro, Verdon E-Bike) pour un avis Google — ce sont vos clients les plus chauds et déjà volontaires (ils vous créditent déjà sur leur site).
- Objectif : atteindre 10 avis, puis maintenir un flux régulier plutôt qu'un pic ponctuel.
- Répondre à chaque avis, y compris les 2 existants s'ils n'ont pas de réponse (88% des consommateurs favorisent les entreprises qui répondent).

### Phase 2 — Citations et backlinks (Semaines 2-6)

**2.1 Construire le socle de citations locales**
- **Réclamer la fiche Pages Jaunes existante** ([pagesjaunes.fr/pros/64138941](https://www.pagesjaunes.fr/pros/64138941)) — elle existe (NAP correct) mais affiche "C'est votre entreprise ?", donc non revendiquée : pas de description, pas de photos, pas de contrôle. Un clic pour la réclamer, puis la compléter.
- Société.com (déjà avec le SIRET public), CCI Hautes-Alpes, annuaires tourisme locaux (pertinent vu vos clients tourisme).
- Soumission aux agrégateurs de données (Data Axle, Foursquare) pour diffusion automatique.
- NAP strictement identique partout : réutiliser exactement "Puy-Sanières" (avec le trait d'union — corriger l'incohérence identifiée dans `layout.tsx` en même temps, cf. section 4).

**2.2 Backlinks au-delà du cercle client**
- Le profil actuel (5 liens, tous clients) est un point de départ sain mais insuffisant seul. Pistes réalistes pour une petite structure locale :
  - Adhésion CCI Hautes-Alpes / réseaux d'entrepreneurs locaux (Trust Flow élevé, +80% de visites selon GlueUp).
  - Articles invités ou mentions sur des sites d'actualité économique locale (Le Dauphiné, DICI, etc.) — un lancement de projet client est un bon prétexte.
  - Poursuivre le crédit systématique "Propulsé par Face Nord Graphisme" sur chaque futur site client (déjà en place, à maintenir).

### Phase 3 — Contenu et maillage (en parallèle, à partir de Semaine 3)

**3.1 Réactiver le calendrier éditorial**
- Aucun article publié depuis 3 mois (dernier commit de contenu avant le 22/08). Le cluster E-commerce (Cluster 4 du plan `blog-strategy.md`) est toujours vide.
- Recentrer les prochains articles sur du **longue traîne réaliste** plutôt que sur des requêtes ultra-concurrentielles : "agence seo hautes-alpes" (position 46) est un objectif à 6-12 mois ; des variantes plus spécifiques ("création site internet [secteur] Hautes-Alpes", "prix site internet artisan 05") sont atteignables plus vite.

**3.2 Corriger les 2 liens internes cassés et l'article orphelin**
- Toujours en attente depuis juin (`findings-2026-08-22/cluster.md`) — 15 minutes de travail, zéro excuse.

### Phase 4 — Nettoyage technique restant (peut se faire en tâche de fond)

Ces points n'expliquent pas le manque de trafic mais restent à clore (déjà documentés dans `facenordgraphisme.fr-audit/ACTION-PLAN-2026-08-22.md`, Phase 1 et 3) :
- Consolider le schema `LocalBusiness` des pages villes avec l'entité canonique (`@id` partagé) + ajouter `geo`/`openingHoursSpecification`.
- Uniformiser "Puy-Sanières" (avec trait d'union) partout, y compris `layout.tsx`.
- Remplacer ou supprimer les liens sociaux morts (`href="#"`) dans `Header.tsx`.
- Ajouter `Review`/`AggregateRating` schema une fois les avis collectés (Phase 1.3).

---

## 4. Ce que je peux faire dès maintenant, techniquement

Dès que vous me donnez l'URL exacte de la fiche GBP (visible dans le panneau : lien "Google" à côté de la note), je peux directement :
- Intégrer le `sameAs` GBP + un CTA/embed vers la fiche dans le schema et la page `/contact`.
- Ajouter `Review`/`AggregateRating` schema avec les 2 avis réels existants (et les futurs, au fur et à mesure).
- Corriger l'incohérence "Puy Sanières"/"Puy-Sanières" et les 2 liens internes cassés (rapide, indépendant du reste).
- Consolider le schema `LocalBusiness` des pages villes.

Le reste (changer la catégorie GBP, ajouter le téléphone manquant, relancer les avis, réclamer Pages Jaunes, adhérer à la CCI) demande une action humaine de votre côté dans les interfaces Google/Pages Jaunes — je n'y ai pas accès.

---

## 5. Suivi

- Ré-auditer la Search Console dans 4-6 semaines pour voir si la position moyenne (43,9 aujourd'hui) commence à descendre — c'est le premier signal à surveiller, avant même le volume de clics.
- Objectif réaliste à 3 mois : sortir des positions 40-70 pour atteindre 15-30 sur les requêtes les plus spécifiques (ville + service), pas encore le top 10 sur les requêtes génériques les plus concurrentielles.
- Objectif à 6-12 mois : présence stable dans le pack local pour "agence [service] gap/hautes-alpes" une fois GBP + avis + citations matures.
