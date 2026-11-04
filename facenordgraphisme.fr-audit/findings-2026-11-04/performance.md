# Performance (CWV) : 45/100

Audit du 2026-11-04.

## Ce qui fonctionne

- LCP mesuré à 1,0 s sur la homepage mobile et 2,9 s sur la page service
- CLS de 0 à 0,009
- Poids total de 700 à 810 Ko
- TTFB de 200 à 450 ms sur la plupart des pages

## Constats

### Préchargeur plein écran à chaque arrivée (High)

Mesuré sur 3 modèles de page en mobile : le H1 reste couvert et le défilement bloqué à 4 s, puis la page est libre à 5 s. L'état isPreloaderDone est en mémoire et repart donc de zéro à chaque chargement complet, y compris pour tout visiteur venant de Google. Le LCP de 1,0 s de la homepage intervient avant la fin de ce rideau et ne traduit donc pas l'attente réelle.

**Recommandation :** Supprimer le préchargeur sur les pages d'entrée, ou le limiter à une version très courte, jouée une seule fois par session (sessionStorage) et désactivée avec prefers-reduced-motion.

### Canvas WebGL actif pendant toute la visite (High)

HeroScene est monté dans LayoutWrapper, sur toutes les pages hors /studio, et ne se démonte jamais, même une fois invisible après le défilement. Lighthouse mobile : TBT de 8,1 à 15,1 s, TTI de 43 à 44 s, 40 s de thread principal dont 39,7 s en « Other » contre 1,2 s d'évaluation JS. La cause est très probablement cette boucle de rendu, aggravée par le rendu logiciel de PSI. Un vrai téléphone avec GPU fera mieux, mais il consomme aussi de la batterie.

**Recommandation :** Afficher la 3D sur la homepage uniquement, ou la remplacer par une image statique sur mobile. La mettre en pause hors écran (frameloop="demand" ou démontage), puis relancer Lighthouse pour confirmer la cause.

### Aucune donnée terrain (Info)

CrUX n'a pas de données pour ce site, faute de trafic Chrome suffisant. Tous les chiffres sont des mesures de laboratoire, et le TBT n'est pas comparable à celui d'août, mesuré avec un autre outil.

**Recommandation :** Ajouter le suivi web-vitals (INP en particulier) ou Vercel Speed Insights.
