# Schema / Structured Data : 68/100

Audit du 2026-11-04.

## Ce qui fonctionne

- Graphe Organization, WebSite et ProfessionalService sur toutes les pages
- BlogPosting, BreadcrumbList, Service et CreativeWork présents
- JSON-LD analysable sur toutes les pages crawlées

## Constats

### Images CreativeWork en URL relative (Medium)

Les 10 pages portfolio déclarent une image du type /assets/portfolio/….

**Recommandation :** Préfixer avec https://www.facenordgraphisme.fr.

### Entités d'auteur et d'entreprise incomplètes (Medium)

author.sameAs est vide sur les 13 articles, author.url pointe vers la homepage, et /a-propos ne publie aucune entité Person alors que l'@id #fxpin y renvoie. Le GBP est absent de sameAs.

**Recommandation :** Renseigner le LinkedIn de l'auteur dans Sanity, publier Person sur /a-propos et ajouter l'URL de la fiche GBP.

### LocalBusiness des villes séparé de l'entité principale (Medium)

Les 3 pages villes déclarent un LocalBusiness sans @id, avec « Puy-Sanières », tandis que le graphe global indique « Puy Sanières ».

**Recommandation :** Réutiliser l'@id #localbusiness et unifier l'orthographe dans src/app/layout.tsx:93 et 150.

### Prix du schema à revoir (Medium)

Service.offers reprend les anciens tarifs (800 € sur la page vitrine) et utilise unitText pour dire « à partir de », un usage inadapté.

**Recommandation :** Aligner sur la grille retenue et utiliser minPrice dans priceSpecification.

### Ne pas ajouter AggregateRating sur le site (Info)

Les audits précédents le recommandaient. Google n'affiche pas d'étoiles pour des avis auto-publiés par un LocalBusiness sur son propre site.

**Recommandation :** Abandonner cette action et concentrer l'effort sur les avis de la fiche Google.
