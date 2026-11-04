# Expérience visiteur et accessibilité (hors score pondéré) : 58/100

Audit du 2026-11-04.

## Ce qui fonctionne

- Homepage désormais claire : qui, quoi, où dès le H1
- Accessibilité Lighthouse de 87 à 91
- Parcours de contact simple

## Constats

### Bouton d'appel à l'action masqué par le bandeau cookies sur mobile (Medium)

À 390 px, une fois le préchargeur terminé, le bandeau occupe le bas de l'écran et cache le bouton principal sur la homepage et la page service.

**Recommandation :** Réduire le bandeau à une ligne compacte, ou raccourcir le texte du hero.

### Texte de consentement à faire vérifier (Medium)

Le bandeau dit « En continuant à naviguer, vous acceptez », alors que la CNIL ne considère pas la poursuite de la navigation comme un consentement valable. Sujet juridique plutôt que SEO.

**Recommandation :** Retirer cette phrase et vérifier qu'aucun traceur non exempté n'est déposé avant le choix.

### Défauts d'accessibilité (Low)

Bouton de menu mobile sans nom accessible, contraste de 3,24:1 pour #239ea0 sur blanc en petit texte, liens distingués par la seule couleur.

**Recommandation :** Ajouter aria-label, foncer la teinte pour le petit texte et souligner les liens dans les paragraphes.
