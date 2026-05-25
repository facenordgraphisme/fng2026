/**
 * rewrite-post7-pilier.mjs
 *
 * Rewrites Post 7 "Guide complet de la visibilité en ligne pour les commerçants
 * des Hautes-Alpes" as a proper 3 800-word pillar page covering all 6 levers:
 * GBP → SEO local → Avis → Site web → Balises SEO → IA referencing + Réseaux sociaux.
 * Each section links out to the relevant deep-dive guide via spokeCard.
 *
 * Run: node scripts/rewrite-post7-pilier.mjs
 */

import { createClient } from '@sanity/client';
import crypto from 'crypto';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = createClient({
  projectId: 'k4x2bvj1',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const uid = () => crypto.randomBytes(6).toString('hex');

// ── Block helpers ───────────────────────────────────────────────────────────

const b = (text, style = 'normal') => ({
  _type: 'block', _key: uid(), style,
  markDefs: [],
  children: [{ _type: 'span', _key: uid(), marks: [], text }],
});

const bStrong = (parts) => {
  // parts: array of { text, strong? }
  return {
    _type: 'block', _key: uid(), style: 'normal',
    markDefs: [],
    children: parts.map(p => ({
      _type: 'span', _key: uid(),
      marks: p.strong ? ['strong'] : [],
      text: p.text,
    })),
  };
};

const bullet = (text) => ({
  _type: 'block', _key: uid(), style: 'normal',
  listItem: 'bullet', level: 1,
  markDefs: [],
  children: [{ _type: 'span', _key: uid(), marks: [], text }],
});

const bulletStrong = (parts) => ({
  _type: 'block', _key: uid(), style: 'normal',
  listItem: 'bullet', level: 1,
  markDefs: [],
  children: parts.map(p => ({
    _type: 'span', _key: uid(),
    marks: p.strong ? ['strong'] : [],
    text: p.text,
  })),
});

const quote = (text) => ({
  _type: 'block', _key: uid(), style: 'blockquote',
  markDefs: [],
  children: [{ _type: 'span', _key: uid(), marks: [], text }],
});

const capsule = (text) => ({
  _type: 'block', _key: uid(), style: 'capsule',
  markDefs: [],
  children: [{ _type: 'span', _key: uid(), marks: [], text }],
});

const spoke = (badge, title, description, linkUrl, linkText) => ({
  _type: 'spokeCard', _key: uid(),
  badge,
  title,
  description,
  linkUrl,
  linkText,
});

const faqBlock = (title, items) => ({
  _type: 'faq', _key: uid(),
  title,
  items: items.map(([q, a]) => ({ _key: uid(), question: q, answer: a })),
});

// ── Body content ────────────────────────────────────────────────────────────

const body = [

  // ── INTRO ─────────────────────────────────────────────────────────────────

  b('Dans les Hautes-Alpes, être visible en ligne n\'est plus une option. Que vous soyez restaurateur à Embrun, plombier à Gap, guide de montagne près de Briançon ou propriétaire d\'un gîte autour de Serre-Ponçon, vos futurs clients vous cherchent sur Google avant de pousser votre porte. Ceux qui ne vous trouvent pas appellent votre concurrent.'),

  b('La bonne nouvelle : la visibilité en ligne ne s\'achète pas. Elle se construit, levier après levier, avec des outils majoritairement gratuits. Ce guide vous donne la carte complète de ce qui fonctionne en 2026 dans le département 05 — et les liens vers chaque guide détaillé pour approfondir chaque axe.'),

  // ── KEY TAKEAWAYS ─────────────────────────────────────────────────────────

  b('Ce qu\'il faut retenir', 'h3'),
  bullet('92 % des consommateurs utilisent Google pour trouver un commerce avant de se déplacer (BrightLocal, 2026)'),
  bullet('Les 6 leviers de la visibilité locale : GBP · SEO local · Avis · Site web · Balises SEO · IA'),
  bullet('Dans les Hautes-Alpes, la double saisonnalité impose une stratégie spécifique à chaque période'),
  bullet('Un profil Google Business Profile complet génère 7x plus de clics qu\'un profil incomplet'),
  bullet('Les IA (ChatGPT, Perplexity, AI Overviews) représentent un canal en croissance rapide à intégrer dès maintenant'),

  // ── SECTION 1 : GBP ───────────────────────────────────────────────────────

  b('1. Google Business Profile : votre deuxième devanture', 'h2'),

  b('En 2026, 93 % des recherches locales sur Google affichent un Local Pack — les 3 fiches qui apparaissent sur la carte, juste sous la zone de recherche. Si vous n\'y êtes pas, vous n\'existez pas pour les touristes et les nouveaux arrivants qui découvrent le territoire. La fiche Google Business Profile est votre outil numéro un, et il est entièrement gratuit.'),

  b('Pour les commerces des Hautes-Alpes, GBP a une particularité critique : la double saisonnalité. Vos horaires d\'été et d\'hiver sont différents, votre clientèle aussi. Un touriste skieur en janvier n\'a pas les mêmes besoins qu\'un randonneur en août. Votre fiche doit refléter ces changements en temps réel — Google pénalise les fiches dont les horaires ne correspondent pas à la réalité.'),

  b('Les éléments qui font réellement la différence : des photos récentes et variées (façade, équipe, réalisations — minimum 10), une description avec vos mots-clés locaux précis, une catégorie principale exacte (pas "Entrepreneur" mais "Électricien"), et des Google Posts hebdomadaires qui montrent à Google que votre fiche est vivante. Les fiches avec plus de 100 photos reçoivent 520 % d\'appels supplémentaires que celles avec moins de 10.'),

  b('Un point souvent négligé : la cohérence NAP (Nom, Adresse, Téléphone). Votre raison sociale, adresse et numéro doivent être rigoureusement identiques sur votre fiche GBP, votre site, les Pages Jaunes, Mappy et tous les annuaires. Toute divergence affaiblit votre autorité locale aux yeux de Google.'),

  quote('Les artisans itinérants des Hautes-Alpes (plombiers, électriciens, paysagistes) peuvent configurer une zone de chalandise sans adresse physique — ils restent éligibles au Local Pack pour toutes les communes couvertes.'),

  spoke(
    'Guide détaillé →',
    'Google Business Profile : le guide complet pour artisans et commerçants des Hautes-Alpes',
    'Création, vérification, optimisation des photos et posts, gestion saisonnière et stratégie d\'avis : le guide pas-à-pas pour dominer Google Maps dans le 05.',
    '/blog/google-business-profile-artisans-hautes-alpes',
    'Lire le guide GBP complet'
  ),

  // ── SECTION 2 : SEO LOCAL ─────────────────────────────────────────────────

  b('2. Le SEO local : être trouvé quand vos clients cherchent votre métier', 'h2'),

  b('Le SEO local, c\'est l\'ensemble des techniques qui font apparaître votre activité en tête des résultats quand quelqu\'un tape "plombier Gap urgence" ou "restaurant terrasse Embrun". Ce n\'est pas du hasard — c\'est un ensemble de signaux cohérents que vous envoyez à Google sur votre activité, votre localisation et votre expertise.'),

  b('Dans les Hautes-Alpes, les requêtes locales ont des spécificités qui nécessitent une approche adaptée. Vos clients utilisent des noms de vallées (Ubaye, Clarée, Guisane, Queyras), de lacs (Serre-Ponçon), de stations (Montgenèvre, Vars, Risoul, Serre-Chevalier) ou de cols. Un site qui ne parle que de "Hautes-Alpes" en générique rate toutes ces requêtes géographiques plus précises — souvent moins concurrentielles et plus convergeantes.'),

  b('Selon l\'étude annuelle de Whitespark (2026), les 6 facteurs qui déterminent votre classement dans le Local Pack sont, dans l\'ordre : la pertinence et complétude de votre fiche GBP, la proximité géographique par rapport au chercheur, la notoriété (liens entrants, mentions), les signaux on-page de votre site (balises, contenu localisé), les citations sur des annuaires locaux, et les avis. Chacun peut être travaillé indépendamment — et chaque amélioration se cumule.'),

  bStrong([
    { text: 'Une spécificité à connaître : ', strong: true },
    { text: 'le SEO local prend 3 à 6 mois pour produire des effets durables. Les résultats ne sont pas immédiats, mais ils sont persistants. Une position conquise sur "menuisier Embrun" se conserve bien plus longtemps — et coûte bien moins cher sur la durée — que de la publicité payante.' },
  ]),

  spoke(
    'Guide détaillé →',
    'SEO local dans les Hautes-Alpes : le guide complet pour artisans et PME du 05',
    'Les 6 facteurs du Local Pack Google, l\'optimisation GBP et site coordonnée, les citations locales, la saisonnalité alpine et la mesure des résultats sans se noyer dans les chiffres.',
    '/blog/seo-local-hautes-alpes-artisans-pme',
    'Lire le guide SEO local complet'
  ),

  // ── SECTION 3 : AVIS ──────────────────────────────────────────────────────

  b('3. Les avis Google : votre réputation qui travaille pour vous 24h/24', 'h2'),

  b('97 % des consommateurs lisent des avis avant de choisir un artisan ou un commerce de proximité (BrightLocal, 2026). Dans les Hautes-Alpes, ce chiffre prend une dimension particulière : les touristes qui ne vous connaissent pas, qui ne reviendront peut-être qu\'une fois par an, se fient quasi exclusivement aux avis pour choisir entre votre restaurant et celui d\'en face, entre votre location et la suivante.'),

  b('Chaque avis Google génère en moyenne 600 impressions supplémentaires sur votre fiche, 80 visites de site et 16 appels directs. Ce n\'est pas un chiffre abstrait — un seul client satisfait qui prend 90 secondes pour laisser un avis peut vous amener 15 nouveaux contacts dans le mois. Multiplié par vos 20 meilleurs clients de la saison, vous voyez l\'impact potentiel.'),

  b('La stratégie de collecte la plus efficace : le SMS post-prestation, avec 38 % de taux d\'engagement contre 27 % par email (BirdEye, 2026). Envoyez un message simple avec le lien court de votre fiche GBP dans les 24 heures suivant la prestation — c\'est là que le client est le plus satisfait. Répondez à tous vos avis, positifs comme négatifs : répondre dans les 24 heures améliore votre note de 0,12 point en moyenne, et chaque réponse est lue par les futurs clients.'),

  quote('Les erreurs qui plombent silencieusement votre réputation en ligne : acheter de faux avis (Google les détecte et peut supprimer l\'ensemble de vos avis), ne demander des avis qu\'en haute saison, répondre avec un copier-coller générique, ou ignorer les avis 3 étoiles — qui représentent souvent des clients récupérables.'),

  spoke(
    'Guide détaillé →',
    'Comment gérer ses avis Google : guide pratique pour artisans et PME des Hautes-Alpes',
    '5 méthodes de collecte, modèles de réponse aux avis positifs et négatifs, gestion de crise, et les erreurs à éviter absolument pour ne pas perdre votre réputation en ligne.',
    '/blog/gerer-avis-google-artisans-pme-hautes-alpes',
    'Lire le guide avis Google complet'
  ),

  // ── SECTION 4 : SITE WEB ──────────────────────────────────────────────────

  b('4. Votre site web : l\'actif digital qui vous appartient vraiment', 'h2'),

  b('La fiche GBP et les avis vous rendent trouvable. Votre site web vous rend crédible — et convertit un visiteur curieux en client qui appelle, réserve ou passe commande. C\'est aussi le seul actif numérique que vous possédez vraiment : contrairement à une page Facebook ou une fiche Google, votre site ne peut pas être supprimé ou modifié par une décision d\'algorithme externe.'),

  b('En 2026, un site performant pour un commerce des Hautes-Alpes doit répondre à des contraintes spécifiques. Il doit charger en moins de 3 secondes — même avec une connexion limitée en zone de montagne. Il doit être irréprochable sur mobile, car 60 % des recherches locales en France se font depuis un smartphone. Et il doit inclure un numéro de téléphone cliquable visible immédiatement, sans avoir à scroller.'),

  b('53 % des utilisateurs quittent un site qui met plus de 3 secondes à charger (Google, 2024). Un site non adapté mobile perd jusqu\'à 30 % de son trafic organique annuellement, et Google le pénalise directement dans ses résultats depuis l\'adoption de l\'indexation Mobile-First. Ces chiffres ne sont pas des projections — ils se traduisent en appels perdus et en clients chez le concurrent.'),

  bStrong([
    { text: '5 signes que votre site a besoin d\'une refonte : ', strong: true },
    { text: 'chargement supérieur à 3 secondes, affichage non adapté au mobile, design daté (plus de 3 ans), absence de formulaire de contact simple, ou aucune page de service géolocalisée. Si vous cochez 2 de ces cases, la refonte est probablement rentable dès la première année.' },
  ]),

  spoke(
    'Guide détaillé →',
    'Refonte de site internet : 5 signes qu\'il est temps de changer',
    'Comment diagnostiquer un site vieillissant, évaluer l\'impact sur votre SEO et votre conversion, et planifier une refonte qui génère un retour sur investissement concret.',
    '/blog/refonte-site-internet-5-signes',
    'Lire le guide refonte de site'
  ),

  // ── SECTION 5 : BALISES SEO ───────────────────────────────────────────────

  b('5. Les balises SEO : 160 caractères qui font la différence dans les résultats', 'h2'),

  b('Pour chaque page de votre site, Google affiche un titre (balise title) et une description (méta description) dans ses résultats. Ces quelques dizaines de caractères sont la première chose que voit votre futur client — avant même de cliquer. En 2025, Google a réécrit 76 % des balises title présentes sur le web, souvent moins bien que si le propriétaire les avait rédigées. La raison principale : elles étaient soit absentes, soit génériques, soit trop longues.'),

  b('Pour un artisan ou commerçant des Hautes-Alpes, la formule gagnante pour le title tag suit le schéma : [Métier] à [Ville] — [Bénéfice clé] | [Nom commercial]. Exemple : "Plombier à Gap — Intervention rapide 24h/24 | Dupont Plomberie" (50 caractères). Cette formule combine le mot-clé cherché, la localisation précise, et un argument de conversion. Elle respecte aussi la limite de 50 à 60 caractères au-delà de laquelle Google tronque ou réécrit.'),

  b('La méta description ne pèse pas directement sur votre classement — mais elle influence fortement si quelqu\'un clique ou non sur votre lien plutôt que sur celui du concurrent. Incluez systématiquement un chiffre ou une statistique : les CTR (taux de clic) sont jusqu\'à 36 % plus élevés sur les titres qui contiennent un nombre (Backlinko, 2025).'),

  spoke(
    'Guide détaillé →',
    'Balises title et méta description : le guide pratique pour les PME des Hautes-Alpes',
    'Formules par type d\'activité, exemples locaux Gap-Embrun-Briançon, audit en 5 étapes et checklist pour corriger vos balises en une demi-journée.',
    '/blog/balises-title-meta-description-pme-hautes-alpes',
    'Lire le guide balises SEO'
  ),

  // ── SECTION 6 : SEO VS IA ─────────────────────────────────────────────────

  b('6. Le référencement sur les IA : le nouveau canal à ne pas ignorer', 'h2'),

  b('ChatGPT, Perplexity, Google AI Overviews... En 2026, une part croissante des internautes ne tape plus une requête dans Google — ils posent une question à une intelligence artificielle et reçoivent une réponse synthétisée, parfois assortie de recommandations de prestataires locaux. Ce n\'est pas encore le canal dominant (Google conserve 92 % des recherches en France), mais c\'est celui qui progresse le plus vite — et qui a la capacité de recommander votre commerce directement par nom.'),

  b('La bonne nouvelle : les optimisations pour être cité par les IA sont quasi identiques au SEO classique. Un site bien structuré, avec des statistiques sourcées, des FAQ claires, des titres explicites et un contenu qui répond directement aux questions sera automatiquement mieux référencé par les deux. La différence principale : les IA favorisent les réponses directes et les contenus organisés en questions-réponses, plutôt que les textes commerciaux.'),

  bStrong([
    { text: 'Testez votre visibilité IA dès maintenant : ', strong: true },
    { text: 'tapez votre métier et votre ville dans Perplexity.ai ("plombier Gap recommandé", "guide randonnée Écrins avis"). Votre nom apparaît-il ? Si non, c\'est un signal que vos contenus en ligne ne sont pas encore suffisamment structurés pour être détectés par les IA.' },
  ]),

  spoke(
    'Guide détaillé →',
    'SEO vs Référencement sur l\'IA : quelle stratégie adopter en 2026 ?',
    'Comparatif des deux approches, critères de citation par ChatGPT et Perplexity, et stratégie hybride pour les entreprises des Hautes-Alpes.',
    '/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026',
    'Lire le guide SEO vs IA'
  ),

  // ── SECTION 7 : RÉSEAUX SOCIAUX ───────────────────────────────────────────

  b('7. Les réseaux sociaux : amplifier votre visibilité locale', 'h2'),

  b('Les réseaux sociaux ne remplacent pas le SEO, mais ils l\'amplifient. Facebook reste le réseau le plus utilisé par les 35-65 ans dans les zones rurales et semi-rurales — soit une grande part de la clientèle locale fidèle des Hautes-Alpes. Instagram est incontournable pour les activités visuelles (restauration, hébergement, tourisme d\'aventure, artisanat d\'art). TikTok progresse chez les moins de 35 ans mais reste chronophage pour peu de retour local.'),

  b('L\'erreur la plus courante : publier de façon intensive pendant 2 mois après la création du compte, puis abandonner. L\'algorithme des réseaux sociaux pénalise l\'irrégularité bien plus que la fréquence basse. Deux posts par semaine pendant 12 mois valent infiniment mieux que 10 posts par semaine pendant 6 semaines. Pour les Hautes-Alpes, calquez votre calendrier éditorial sur les temps forts locaux : ouverture de la saison ski, fêtes du lac, marchés de Noël, rentrée scolaire, dates de fermeture inter-saison.'),

  bStrong([
    { text: 'Un conseil pratique souvent ignoré : ', strong: true },
    { text: 'taguez systématiquement votre localisation dans chaque post (Instagram et Facebook utilisent ces données pour recommander votre contenu aux personnes géographiquement proches, y compris les touristes présents dans la région pour quelques jours seulement).' },
  ]),

  b('Autre levier souvent sous-estimé : les groupes Facebook locaux (groupe des habitants d\'Embrun, groupe ski Serre-Chevalier, groupe co-voiturage Gap...). Participer authentiquement à ces communautés — sans spammer — vous donne une visibilité locale ciblée qu\'aucun budget publicitaire ne peut vraiment reproduire.'),

  // ── SECTION 8 : PLAN D'ACTION ─────────────────────────────────────────────

  b('Quel plan d\'action pour commencer cette semaine ?', 'h2'),

  b('Vous n\'avez pas besoin de tout faire en même temps. La visibilité se construit par couches successives, et chaque levier activé renforce les autres. Voici l\'ordre de priorité recommandé pour un commerce des Hautes-Alpes qui part de zéro ou qui veut structurer sa présence.'),

  b('Semaine 1 — La base non négociable', 'h3'),

  bulletStrong([{ text: 'Créez ou revendiquez votre fiche Google Business Profile ', strong: true }, { text: 'sur business.google.com. Vérifiez-la (courrier Google, code SMS ou vidéo). Remplissez 100 % des champs disponibles. Ajoutez 10 photos minimum.' }]),
  bulletStrong([{ text: 'Vérifiez que votre site est mobile-friendly ', strong: true }, { text: 'avec Google Search Console ou PageSpeed Insights. Un score Core Web Vitals en rouge est une urgence.' }]),
  bulletStrong([{ text: 'Envoyez un SMS à vos 5 meilleurs clients ', strong: true }, { text: 'avec un lien direct vers votre fiche GBP pour laisser un avis. Ne demandez pas à des amis ou à la famille — Google le détecte.' }]),

  b('Semaine 2 — Consolider les signaux SEO', 'h3'),

  bulletStrong([{ text: 'Auditez vos balises title et méta description ', strong: true }, { text: 'avec un outil comme SEOptimer.com. Corrigez celles qui sont vides, dupliquées ou trop longues. Priorisez votre page d\'accueil et vos pages de service principales.' }]),
  bulletStrong([{ text: 'Créez votre profil sur les 5 annuaires locaux essentiels : ', strong: true }, { text: 'Pages Jaunes, Mappy, Yelp France, Apple Maps Connect, et Bing Places. Assurez-vous que votre NAP est rigoureusement identique partout.' }]),
  bulletStrong([{ text: 'Testez votre visibilité sur Perplexity.ai ', strong: true }, { text: 'en tapant votre métier + ville. Prenez note de ce qui remonte — vos concurrents y sont peut-être déjà.' }]),

  b('Semaine 3–4 — Créer du contenu local', 'h3'),

  bulletStrong([{ text: 'Rédigez une page de service géolocalisée ', strong: true }, { text: 'pour chacune de vos prestations principales : "installation chaudière Gap", "rénovation cuisine Embrun", etc. Une page = une ville = un métier = un mot-clé.' }]),
  bulletStrong([{ text: 'Publiez votre premier Google Post ', strong: true }, { text: 'sur votre fiche GBP. Une actualité, une promotion saisonnière, ou un conseil pratique. Idéalement une fois par semaine par la suite.' }]),
  bulletStrong([{ text: 'Mettez en place une routine de collecte d\'avis ', strong: true }, { text: 'automatisée : un SMS type à envoyer en fin de prestation, avec le lien court de votre fiche. L\'objectif : 1 à 2 nouveaux avis par semaine régulièrement.' }]),

  capsule('Rappel important : la visibilité en ligne se construit sur la durée. Ne mesurez pas vos résultats après 2 semaines — attendez 3 mois pour les premiers effets SEO significatifs, 6 mois pour consolider vos positions. Mais les appels et les demandes de contact viennent bien avant que votre positionnement soit optimal.'),

  // ── FAQ ───────────────────────────────────────────────────────────────────

  faqBlock('Questions fréquentes sur la visibilité en ligne dans les Hautes-Alpes', [
    [
      'Combien de temps faut-il pour être visible sur Google dans les Hautes-Alpes ?',
      'Pour une fiche Google Business Profile, les premiers effets sont visibles en 2 à 4 semaines après vérification et optimisation complète. Pour le SEO de votre site web, comptez 3 à 6 mois pour des positions stables sur des mots-clés locaux. Dans les Hautes-Alpes, la concurrence est souvent plus faible qu\'en zone urbaine dense — ce qui accélère les résultats.',
    ],
    [
      'Est-ce que Google Business Profile suffit ou faut-il aussi un site web ?',
      'Les deux se complètent. GBP vous rend trouvable sur Google Maps et dans le Local Pack — c\'est votre priorité absolue. Mais votre site web vous rend crédible : il héberge vos avis, vos réalisations, vos tarifs, et toutes les pages de service géolocalisées qui alimentent votre SEO à long terme. Sans site, votre visibilité restera limitée aux requêtes directes. Avec un site bien optimisé, vous cumulez les deux signaux.',
    ],
    [
      'Les réseaux sociaux améliorent-ils le référencement sur Google ?',
      'Pas directement — Google n\'utilise pas les signaux sociaux comme facteur de classement officiel. Mais ils contribuent indirectement : un contenu partagé sur Facebook ou Instagram génère du trafic vers votre site (signal positif pour Google), renforce la notoriété de votre marque, et peut générer des backlinks si des blogs ou sites locaux reprennent vos contenus. Considérez les réseaux sociaux comme un amplificateur de visibilité, pas comme un remplaçant du SEO.',
    ],
    [
      'Faut-il faire de la publicité Google Ads pour être visible rapidement ?',
      'Google Ads permet d\'être visible immédiatement, y compris sur les requêtes les plus concurrentielles. Mais c\'est un robinet : la visibilité s\'arrête dès que vous coupez le budget. Le SEO local et GBP sont des investissements qui continuent à produire des résultats après l\'effort initial. La stratégie optimale pour une PME des Hautes-Alpes : 80 % d\'effort sur le SEO organique et GBP, 20 % de budget Ads ciblé sur les périodes de haute saison.',
    ],
    [
      'La visibilité en ligne est-elle différente pour les prestataires touristiques du 05 ?',
      'Oui, significativement. Les prestataires touristiques (guides, hébergements, locations de matériel, restaurants de montagne) font face à une saisonnalité prononcée et à une clientèle principalement non locale. Leur stratégie doit intégrer des plateformes spécifiques (Booking.com, Airbnb, TripAdvisor, Viator) en plus du SEO et GBP classiques. La digitalisation des réservations est aussi un enjeu clé pour maximiser le remplissage en haute saison.',
    ],
  ]),

  // ── CONCLUSION ────────────────────────────────────────────────────────────

  b('Construire votre visibilité locale, pilier par pilier', 'h2'),

  b('La visibilité en ligne d\'un commerce dans les Hautes-Alpes repose sur 6 piliers interdépendants : une fiche GBP optimisée et vivante, un SEO local qui parle le langage géographique du département, une stratégie d\'avis qui transforme vos clients en ambassadeurs, un site web performant qui convertit, des balises SEO qui incitent au clic, et une présence naissante sur les IA qui représenteront une part croissante des découvertes de commerces locaux.'),

  b('Vous n\'avez pas besoin de maîtriser les 6 leviers dès le départ. Chaque action isolée produit des résultats. Mais c\'est leur combinaison — et surtout leur cohérence dans le temps — qui crée une visibilité durable et difficile à concurrencer. Un plombier de Gap avec 80 avis, une fiche GBP irréprochable, un site mobile-first et 3 pages de service géolocalisées sera quasi inattaquable sur ses requêtes locales.'),

];

// ── Run ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`Writing ${body.length} blocks to Post 7 (Visibilité en ligne)...`);

  await client
    .patch('029aba02-674a-42e9-90a3-7710e43cbfbb')
    .set({ body })
    .commit();

  console.log('✅ Post 7 body replaced successfully.');
  console.log(`   Blocks: ${body.length}`);
  console.log(`   Estimated word count: ~${body
    .filter(b => b._type === 'block')
    .reduce((sum, b) => sum + (b.children || []).reduce((s, c) => s + (c.text || '').split(' ').length, 0), 0)} words`);
}

run().catch(err => {
  console.error('\n❌', err.message);
  process.exit(1);
});
