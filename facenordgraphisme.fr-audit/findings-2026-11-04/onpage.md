# On-Page SEO : 60/100

Audit du 2026-11-04.

## Ce qui fonctionne

- Un seul H1 par page
- Titres et descriptions uniques, présents partout
- Aucune page orpheline dans le crawl
- Pages villes avec H1 ciblés (ville + service)

## Constats

### 12 liens internes vers 3 URL en 404 (High)

/blog/gbp-artisans-hautes-alpes (4 liens), /blog/visibilite-en-ligne-artisans-commerces-hautes-alpes (3 liens) et /blog/le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes (5 liens). Pages sources : /villes/gap, /villes/briancon et 5 articles.

**Recommandation :** Ajouter des 301 vers les articles actuels, puis corriger les href dans Sanity et dans les données des villes.

### Caractères cassés dans les métadonnées de 4 articles (High)

Titres : « R�servations en ligne », « d�s 800 ? », « quelle strat�gie ». Descriptions : « cr�er » et « co�te … d�s 800 ? HT ». Ces textes sont visibles dans les résultats Google et le problème est ouvert depuis août.

**Recommandation :** Corriger seoTitle et metaDescription dans Sanity sur les 4 articles.

### H1 de pages services sans service ni zone (Medium)

Depuis la refonte d'octobre, plusieurs H1 sont orientés bénéfice sans terme recherché : « L'outil en ligne taillé pour votre métier », « Vendez vos produits et vos activités en ligne, sans commission », « Soyez trouvé sur Google… ». Autres H1 génériques : « Prêt à atteindre de nouveaux sommets ? » (/contact), « Mon Portfolio ». Le lien avec le classement n'est pas mesuré.

**Recommandation :** Garder l'accroche en sous-titre et mettre service + Hautes-Alpes dans le H1, comme sur la homepage et les villes.

### Titres trop longs (Medium)

21 pages sur 42 dépassent 70 caractères (jusqu'à 95), et seront probablement tronquées. /portfolio contient deux fois « | Face Nord Graphisme ».

**Recommandation :** Viser environ 60 caractères, retirer le suffixe de marque des pages longues et corriger le double suffixe dans src/app/portfolio/page.tsx:10.

### Risque de cannibalisation sur « création site internet Hautes-Alpes » (Medium)

La homepage, /creation-site-internet-hautes-alpes et /blog/guide-creation-site-internet-artisan-hautes-alpes visent la même requête. /referencement-seo-hautes-alpes et /referencement-ia se chevauchent aussi sur le GEO. Hypothèse à vérifier dans Search Console.

**Recommandation :** Comparer les pages qui s'affichent par requête dans Search Console, puis désigner une page cible par intention.

### Liens sociaux morts (Low)

Facebook et Instagram pointent vers href="#" sur toutes les pages (src/components/Header.tsx:207 et 210).

**Recommandation :** Mettre les vraies URL ou supprimer les icônes.
