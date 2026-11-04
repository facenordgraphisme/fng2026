# Technical SEO : 78/100

Audit du 2026-11-04.

## Ce qui fonctionne

- robots.txt valide, seul /studio/ est bloqué
- Sitemap : 42 URL, toutes en 200 et auto-canoniques
- Contenu principal présent dans le HTML sans JavaScript
- HSTS, nosniff, X-Frame-Options, Referrer-Policy et Permissions-Policy en place
- Les URL inconnues renvoient un vrai 404

## Constats

### Redirection manquante sur un slug portfolio (High)

/portfolio/reves-d-aventures, l'URL conservée lors de l'audit d'août, renvoie 404. Le slug live est désormais /portfolio/reves-daventures. Le correctif d'août prévoyait le sens inverse et n'a pas été appliqué.

**Recommandation :** Ajouter une 301 de /portfolio/reves-d-aventures vers /portfolio/reves-daventures dans next.config.ts.

### lastmod du sitemap toujours égal à la date du jour (Medium)

src/app/api/sitemap/route.ts:67 attribue la date courante aux 29 URL hors blog (statiques, villes, portfolio). Cette date ne reflète aucune modification réelle.

**Recommandation :** Utiliser le _updatedAt de Sanity ou une date codée en dur par page. Omettre lastmod si la date n'est pas fiable.

### Deux redirections depuis http:// (Low)

http://facenordgraphisme.fr redirige vers https://facenordgraphisme.fr, puis vers https://www. Trois sites clients pointent aussi vers le domaine sans www.

**Recommandation :** Rediriger http directement vers https://www dans les domaines Vercel si possible. Pas urgent.

### Pas de Content-Security-Policy (Low)

Lighthouse signale l'absence de CSP. Aucun effet direct sur le classement.

**Recommandation :** À traiter comme bonne pratique de sécurité, sans priorité SEO.
