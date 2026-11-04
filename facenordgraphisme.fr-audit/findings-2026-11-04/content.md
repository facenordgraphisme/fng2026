# Content Quality : 62/100

Audit du 2026-11-04.

## Ce qui fonctionne

- 13 articles de 1 500 à 3 800 mots
- Pages villes différenciées (19 à 23 % de similarité)
- Pages services refaites avec témoignages nommés, process et FAQ
- Auteur nommé et parcours local clair

## Constats

### Tarifs contradictoires sur tout le site (High)

Le commit 2da1437 du 2026-10-18 a baissé les prix dans src/lib/services.ts uniquement. Vitrine : 500 € sur la homepage, 800 € sur la page service. Boutique : 800 € contre 2 500 €. Refonte : 400 € contre 800 €. Maintenance : 20 € contre 50 €, et 30 € sur /villes/gap. La FAQ indique environ 1000 €. Un prospect voit deux prix différents en un clic.

**Recommandation :** Fixer la grille officielle, puis aligner les pages services, /villes, /faq, le schema, public/llms.txt et l'article sur les prix.

### Aucun nouvel article depuis le 2026-06-07 (Medium)

Cinq mois sans publication. dateModified est égal à datePublished sur les 13 articles. Le cluster e-commerce reste vide alors qu'il figure au plan éditorial.

**Recommandation :** Actualiser d'abord les articles existants, en priorité l'article sur les prix, puis publier le pilier e-commerce.

### Statistiques rarement sourcées (Medium)

10 articles sur 13 n'ont aucun lien externe, alors qu'ils contiennent de 3 à 34 mentions de pourcentages. Exemple : reservation-directe avec 34 mentions et 0 lien. Tous les pourcentages ne sont pas forcément des statistiques externes.

**Recommandation :** Lier chaque statistique à sa source d'origine ou la retirer si elle est introuvable.

### Positionnement incohérent : je ou nous, freelance ou agence (Medium)

La homepage et les pages services parlent de « développeur web freelance » et utilisent « je ». Les pages villes utilisent « nous » (5 à 12 occurrences) et « agence web ». Cinq titres parlent d'« agence ».

**Recommandation :** Passer les pages villes à la première personne. Garder « agence web » seulement comme mot-clé assumé, avec une mention claire de l'interlocuteur unique.
