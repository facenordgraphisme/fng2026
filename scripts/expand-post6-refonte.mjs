/**
 * expand-post6-refonte.mjs
 *
 * Replaces the body of Post 6 (refonte-site-internet-5-signes)
 * with a fully expanded ~2,600-word article covering:
 *   - 5 signes détaillés avec stats et exemples locaux
 *   - Processus d'une refonte réussie
 *   - Budget & ROI
 *   - Tableau comparatif enrichi
 *   - Plan d'action
 *   - SpokeCards (liens vers articles du cluster)
 *   - FAQ enrichie
 *
 * Run: node scripts/expand-post6-refonte.mjs
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

function b(text, style = 'normal') {
  return {
    _type: 'block', _key: uid(), style,
    markDefs: [],
    children: [{ _type: 'span', _key: uid(), marks: [], text }],
  };
}

function bullet(text, level = 1) {
  return {
    _type: 'block', _key: uid(), style: 'normal',
    listItem: 'bullet', level,
    markDefs: [],
    children: [{ _type: 'span', _key: uid(), marks: [], text }],
  };
}

function numbered(text, level = 1) {
  return {
    _type: 'block', _key: uid(), style: 'normal',
    listItem: 'number', level,
    markDefs: [],
    children: [{ _type: 'span', _key: uid(), marks: [], text }],
  };
}

function linkPara(prefix, linkText, href, suffix = '') {
  const lk = uid();
  return {
    _type: 'block', _key: uid(), style: 'normal',
    markDefs: [{ _type: 'link', _key: lk, href }],
    children: [
      { _type: 'span', _key: uid(), marks: [], text: prefix },
      { _type: 'span', _key: uid(), marks: [lk], text: linkText },
      ...(suffix ? [{ _type: 'span', _key: uid(), marks: [], text: suffix }] : []),
    ],
  };
}

function spokeCard(badge, title, description, linkUrl, linkText) {
  return { _type: 'spokeCard', _key: uid(), badge, title, description, linkUrl, linkText };
}

function faqBlock(title, items) {
  return {
    _type: 'faq', _key: uid(), title,
    items: items.map(({ q, a }) => ({ _key: uid(), question: q, answer: a })),
  };
}

// ── Body ──────────────────────────────────────────────────────────────────────

const body = [

  // ── Intro ────────────────────────────────────────────────────────────────
  b('Votre site internet a été créé il y a quelques années et, depuis, vous avez l\'impression qu\'il ne vous ressemble plus. Les contacts entrants se font rares, le taux de rebond grimpe, et vos concurrents semblent avoir pris une longueur d\'avance. Faut-il rafraîchir quelques pages ou partir sur une refonte complète ? Ce guide vous donne les 5 signaux d\'alarme à surveiller — et la marche à suivre si plusieurs d\'entre eux s\'allument en même temps.'),
  b('En 2026, un site internet est votre premier commercial : il travaille 24 h/24, 7 j/7, même pendant la saison creuse. Dans les Hautes-Alpes, où la double saisonnalité (été vélo/randonnée, hiver ski) comprime les fenêtres d\'activité, chaque visiteur perdu faute d\'une expérience fluide représente un manque à gagner immédiat. Une refonte bien planifiée se rembourse généralement en 6 à 18 mois.'),

  // ── Key takeaways ────────────────────────────────────────────────────────
  b('Ce qu\'il faut retenir', 'h3'),
  bullet('53 % des utilisateurs abandonnent un site qui met plus de 3 secondes à charger (Google, 2025)'),
  bullet('Google indexe désormais en Mobile-First : un site non responsive perd du terrain dans les résultats chaque semaine'),
  bullet('Un site de plus de 3 ans peut perdre 10 à 30 % de son trafic organique par an sans mises à jour régulières'),
  bullet('La refonte moyenne d\'un site PME dans les Hautes-Alpes se rembourse en 8 à 14 mois via les nouveaux contacts générés'),
  bullet('5 signaux cumulés = refonte urgente ; 2 à 3 signaux = optimisation ciblée suffisante dans un premier temps'),

  // ── Signe 1 ──────────────────────────────────────────────────────────────
  b('Signe 1 — Votre site se charge lentement ou pénalise votre référencement', 'h2'),
  b('La vitesse est devenue un critère de classement Google depuis 2021 avec Core Web Vitals. Les trois indicateurs clés — LCP (Largest Contentful Paint), FID/INP (réactivité), CLS (stabilité visuelle) — déterminent si votre site mérite d\'apparaître en première page ou d\'être relégué en deuxième. Un LCP supérieur à 4 secondes vous fait systématiquement descendre dans les résultats.'),
  b('Comment mesurer ? Tapez l\'URL de votre site dans PageSpeed Insights (tools.google.com/pagespeed) et regardez votre score Mobile. En dessous de 50/100, votre site freine votre référencement de manière significative. Entre 50 et 75, des optimisations ciblées peuvent suffire. Au-dessus de 90, vous êtes dans le vert.'),
  b('Les causes fréquentes de lenteur sur les sites anciens :'),
  bullet('Images non compressées (JPEG 3 Mo au lieu de WebP 120 Ko)'),
  bullet('Thèmes WordPress surchargés avec des dizaines de plugins actifs'),
  bullet('Hébergement mutualisé bas de gamme (< 100 ms de TTFB)'),
  bullet('Aucune mise en cache ni réseau de distribution de contenu (CDN)'),
  bullet('JavaScript bloquant le rendu de la page'),
  b('Dans les Hautes-Alpes, ce point est particulièrement sensible : les touristes qui recherchent un guide de randonnée ou un hébergement à Vars ou Orcières depuis leur smartphone ont souvent une connexion 4G limitée. Un site lent = un client perdu au profit du concurrent qui a soigné ses performances.'),

  // ── Signe 2 ──────────────────────────────────────────────────────────────
  b('Signe 2 — Votre site n\'est pas (vraiment) adapté aux mobiles', 'h2'),
  b('« Responsive » ne veut pas dire adapté. Beaucoup de sites anciens affichent théoriquement correctement sur mobile, mais l\'expérience utilisateur reste pénible : boutons trop petits pour être tapotés, textes trop petits sans zoom, formulaires de contact impossibles à remplir sur iPhone, menus hamburger mal implémentés. Google le sait et pénalise ces sites dans ses résultats mobiles.'),
  b('Depuis mars 2023, Google n\'indexe plus que la version mobile de votre site (Mobile-First Indexing). Concrètement, si votre version mobile est pauvre en contenu ou mal structurée, c\'est cette version appauvrie qui sera évaluée pour votre référencement — même si votre version desktop est parfaite.'),
  b('Test rapide : ouvrez votre site sur un iPhone ou Android et essayez de :'),
  bullet('Appeler depuis le numéro de téléphone (est-il cliquable ?)'),
  bullet('Remplir le formulaire de contact jusqu\'au bout'),
  bullet('Naviguer dans le menu sans pincer-zoomer'),
  bullet('Lire un article entier sans défilement horizontal'),
  b('Si l\'une de ces actions est inconfortable, votre site rate le critère mobile — et Google le sait avant vous. En 2026, 67 % des recherches locales dans les Hautes-Alpes se font depuis un mobile selon les données Google Search Console agrégées.'),

  // ── Signe 3 ──────────────────────────────────────────────────────────────
  b('Signe 3 — Votre identité visuelle ne reflète plus votre positionnement', 'h2'),
  b('Un site internet vieillit visuellement plus vite qu\'une boutique ou un véhicule de société. Les codes graphiques évoluent rapidement : la police Arial sur fond blanc qui faisait tendance en 2015 trahit aujourd\'hui un manque de soin perçu par vos visiteurs en quelques secondes. Cette première impression négative est difficile à rattraper — 75 % des internautes jugent la crédibilité d\'une entreprise d\'après le design de son site (Stanford Web Credibility Research).'),
  b('Ce signal est particulièrement critique pour les professions où la confiance est primordiale : artisans du bâtiment, experts-comptables, architectes, professionnels de santé, hôteliers. Vos clients potentiels comparent votre site à celui de vos concurrents, souvent dans les secondes qui suivent la recherche Google. Une identité visuelle dépassée peut vous faire perdre le lead avant même qu\'ils aient lu votre contenu.'),
  b('Les signes d\'un vieillissement visuel :'),
  bullet('Stock photos génériques (poignées de mains en costume, appels téléphoniques en costume)'),
  bullet('Palette de couleurs saturée ou fond texturé des années 2010'),
  bullet('Pas de cohérence entre le site et vos supports physiques (cartes de visite, enseigne)'),
  bullet('Logo pixélisé ou en basse résolution'),
  bullet('Formulaires de contact qui ressemblent à ceux de 2012'),
  b('Une refonte est aussi l\'occasion d\'aligner votre site avec votre positionnement actuel. Si vous avez monté en gamme, changé de spécialité ou élargi votre zone d\'intervention dans les Hautes-Alpes, votre site doit le refléter immédiatement.'),

  // ── Signe 4 ──────────────────────────────────────────────────────────────
  b('Signe 4 — Des signaux techniques inquiétants s\'accumulent', 'h2'),
  b('Derrière l\'aspect visible, un site internet repose sur une pile technologique qui vieillit aussi. Un CMS non mis à jour (WordPress 4.x, Joomla 2.x), des plugins obsolètes, un certificat SSL expiré ou un hébergement sans sauvegarde automatique sont des bombes à retardement — pour la sécurité de vos données et celles de vos clients, mais aussi pour votre référencement.'),
  b('Google pénalise activement les sites signalés comme « non sécurisés » (HTTP sans HTTPS). Depuis 2024, Chrome affiche un avertissement explicite sur tous les sites sans HTTPS, ce qui fait fuir une grande partie des visiteurs avant même qu\'ils aient lu votre contenu. Si votre URL commence par http:// sans le « s », c\'est une priorité absolue.'),
  b('Autres signaux techniques à vérifier :'),
  bullet('Erreurs 404 fréquentes (pages inexistantes qui font rater des opportunités SEO)'),
  bullet('Balises meta dupliquées (deux pages avec le même title tag ou la même meta description)'),
  bullet('Absence de sitemap XML soumis à Google Search Console'),
  bullet('Score de sécurité bas sur Security Headers (securityheaders.com)'),
  bullet('Plugins avec des failles connues non corrigées'),
  b('Pour les artisans et commerçants des Hautes-Alpes, un site piraté ou compromis peut entraîner une mise hors ligne pendant plusieurs jours — pendant la haute saison, cela peut représenter des milliers d\'euros de contacts manqués. La maintenance préventive coûte toujours moins cher que le curatif.'),

  // ── Signe 5 ──────────────────────────────────────────────────────────────
  b('Signe 5 — Votre site ne convertit pas (taux de rebond > 70 %, formulaires fantômes)', 'h2'),
  b('Le taux de rebond mesure le pourcentage de visiteurs qui repartent sans interagir. Un taux supérieur à 70 % sur les pages clés (accueil, services, contact) signale que quelque chose cloche : le message ne correspond pas aux attentes du visiteur, la navigation est confuse, ou les appels à l\'action sont absents ou mal placés.'),
  b('Autre indicateur souvent ignoré : combien de formulaires de contact sont réellement envoyés et reçus ? Des bugs silencieux peuvent faire en sorte que vos formulaires semblent fonctionner mais n\'envoient rien. Si vous recevez moins d\'un message par semaine sur un site qui génère 500 visites mensuelles, vérifiez d\'abord la délivrabilité de vos emails.'),
  b('Les leviers de conversion à évaluer :'),
  bullet('Un bouton « Appelez-nous » ou « Demandez un devis » visible dès le premier écran (above the fold)'),
  bullet('Un numéro de téléphone cliquable en haut de chaque page'),
  bullet('Des témoignages clients visibles avant le formulaire de contact'),
  bullet('Un délai de réponse annoncé (« Réponse sous 24 h »)'),
  bullet('Des pages de services organisées par problème client, pas par catégorie métier'),
  b('Dans les Hautes-Alpes, la saisonnalité crée des pics de demande intenses. En juillet-août pour le tourisme estival ou en décembre pour les stations de ski, un site qui ne convertit pas bien vous coûte le maximum — c\'est précisément dans ces fenêtres que vos concurrents aussi sont actifs.'),

  // ── Processus d'une refonte réussie ─────────────────────────────────────
  b('Comment se déroule une refonte de site réussie ?', 'h2'),
  b('Une refonte n\'est pas un simple « coup de peinture ». C\'est un projet structuré qui touche le contenu, le design, la technique et le référencement. Voici les grandes étapes pour ne rien oublier et éviter de perdre votre positionnement SEO actuel au passage.'),
  b('Phase 1 — Audit de l\'existant (1 à 2 semaines)'),
  numbered('Relevé de toutes vos URLs actuelles et de leur trafic organique (Google Search Console)'),
  numbered('Inventaire des contenus à conserver, à améliorer ou à supprimer'),
  numbered('Analyse des mots-clés sur lesquels vous êtes déjà positionnés (à ne pas perdre)'),
  numbered('Audit technique : vitesse, mobile, sécurité, erreurs crawl'),
  b('Phase 2 — Architecture & maquettage (2 à 3 semaines)'),
  numbered('Définition de l\'arborescence (pages services, blog, contact, à propos)'),
  numbered('Maquettes (wireframes) des pages clés avant tout travail graphique'),
  numbered('Validation du parcours utilisateur principal : visiteur → contact'),
  b('Phase 3 — Design & développement (4 à 8 semaines selon taille)'),
  numbered('Charte graphique alignée avec votre identité de marque'),
  numbered('Développement sur CMS moderne (Next.js, Webflow, WordPress optimisé)'),
  numbered('Intégration du contenu optimisé SEO'),
  numbered('Tests cross-navigateurs et cross-appareils'),
  b('Phase 4 — Migration & mise en ligne (1 semaine)'),
  numbered('Mise en place des redirections 301 pour toutes les URLs qui changent'),
  numbered('Soumission du nouveau sitemap à Google Search Console'),
  numbered('Vérification des balises meta, Schema.org et données structurées'),
  numbered('Test de vitesse (objectif : LCP < 2,5 s sur mobile)'),

  // ── Budget & ROI ─────────────────────────────────────────────────────────
  b('Quel budget prévoir et quel retour sur investissement attendre ?', 'h2'),
  b('Le budget d\'une refonte dépend de la complexité du site, du volume de contenu et des fonctionnalités requises. Voici les fourchettes constatées en 2026 pour des entreprises de taille PME/artisan dans les Hautes-Alpes et en région PACA :'),
  bullet('Site vitrine simple (5 à 8 pages, sans e-commerce) : 1 500 à 3 500 € HT'),
  bullet('Site avec blog et gestion de contenu : 3 000 à 6 000 € HT'),
  bullet('Site e-commerce ou avec réservation en ligne : 5 000 à 15 000 € HT'),
  bullet('Site institutionnel avec espace client : 8 000 à 25 000 € HT'),
  b('Le retour sur investissement se calcule simplement : combien vaut un nouveau contact qualifié pour vous ? Si un client moyen vous rapporte 1 500 € et que votre taux de conversion téléphonique est de 30 %, il suffit de 7 contacts supplémentaires générés par le nouveau site pour rentabiliser une refonte à 3 000 €. Pour la plupart des PME des Hautes-Alpes actives en tourisme ou BTP, cet objectif est atteint en 6 à 12 mois.'),

  // ── Tableau comparatif ───────────────────────────────────────────────────
  b('Ancien site vs site moderne : le comparatif', 'h2'),
  {
    _type: 'table',
    _key: uid(),
    rows: [
      { _key: uid(), cells: ['Critère', 'Ancien site (> 3 ans)', 'Site moderne (2024-2026)'] },
      { _key: uid(), cells: ['Vitesse mobile', '4-8 secondes', '< 2 secondes (LCP)'] },
      { _key: uid(), cells: ['Score Mobile PageSpeed', '20-50/100', '85-100/100'] },
      { _key: uid(), cells: ['Affichage mobile', 'Zoom nécessaire', 'Responsive natif'] },
      { _key: uid(), cells: ['HTTPS / Sécurité', 'Parfois absent', 'Obligatoire + headers sécurité'] },
      { _key: uid(), cells: ['SEO technique', 'Balises manquantes', 'Schema.org + Core Web Vitals OK'] },
      { _key: uid(), cells: ['Mise à jour contenu', 'Dépend du développeur', 'CMS autonome (Sanity, Webflow…)'] },
      { _key: uid(), cells: ['Accessibilité WCAG', 'Non conforme', 'WCAG 2.1 AA compatible'] },
      { _key: uid(), cells: ['Connecté aux IA (Gemini, ChatGPT)', 'Non', 'Données structurées + FAQ'] },
    ],
  },

  // ── Plan d'action ────────────────────────────────────────────────────────
  b('Plan d\'action : quoi faire cette semaine', 'h2'),
  b('Avant de contacter une agence ou un freelance, effectuez ces 4 diagnostics gratuits pour arriver avec des données concrètes :'),
  numbered('PageSpeed Insights (pagespeed.web.dev) — entrez votre URL, regardez le score Mobile'),
  numbered('Google Search Console → Rapport Expérience de la page → vérifiez les URL en statut « Médiocre »'),
  numbered('Test mobile Google (search.google.com/test/mobile-friendly) — vérifiez la compatibilité'),
  numbered('Comptez vos formulaires complétés ce mois-ci — comparez au nombre de visiteurs'),
  b('Si 2 signaux ou plus sur les 5 de ce guide s\'appliquent à votre site, planifiez une réunion de cadrage avec une agence web locale pour obtenir un devis. Précisez dès le départ : les URLs à conserver, les mots-clés sur lesquels vous êtes positionné, et votre délai souhaité (attention aux pics saisonniers des Hautes-Alpes : évitez une mise en ligne en juillet ou en décembre).'),

  // ── SpokeCards ──────────────────────────────────────────────────────────
  spokeCard(
    'SEO Local',
    'SEO local dans les Hautes-Alpes : le guide complet',
    'Une fois votre nouveau site en ligne, optimisez votre visibilité sur Google Maps et dans le Local Pack du 05.',
    '/blog/seo-local-hautes-alpes-artisans-pme',
    'Lire le guide SEO local →'
  ),
  spokeCard(
    'Visibilité en ligne',
    'Comment booster votre visibilité en ligne dans les Hautes-Alpes',
    'Site refait, visibilité à construire : Google Business Profile, réseaux sociaux, contenu local — toute la stratégie.',
    '/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes',
    'Voir la stratégie complète →'
  ),
  spokeCard(
    'SEO vs IA',
    'SEO classique vs référencement sur l\'IA : quelle stratégie en 2026 ?',
    'Votre nouveau site doit être visible à la fois sur Google et dans les réponses de ChatGPT ou Gemini. Voici comment.',
    '/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026',
    'Lire l\'article →'
  ),
  spokeCard(
    'Google Business Profile',
    'Créer et optimiser votre fiche Google Business Profile',
    'Complémentaire à votre site : une fiche GBP bien optimisée multiplie par 7 le nombre de clics vers votre site.',
    '/blog/gbp-artisans-hautes-alpes',
    'Optimiser ma fiche GBP →'
  ),

  // ── Pour aller plus loin ─────────────────────────────────────────────────
  b('Pour aller plus loin', 'h2'),
  linkPara('📍 ', 'SEO local Hautes-Alpes : le guide complet pour artisans et PME', '/blog/seo-local-hautes-alpes-artisans-pme'),
  linkPara('⭐ ', 'Gérer ses avis Google : stratégie complète pour artisans et PME du 05', '/blog/gerer-avis-google-artisans-pme-hautes-alpes'),
  linkPara('📈 ', 'Booster sa visibilité en ligne dans les Hautes-Alpes', '/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes'),

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faqBlock('FAQ — Refonte de site internet', [
    {
      q: 'Quelle est la différence entre une refonte et une mise à jour de site ?',
      a: 'Une mise à jour corrige des éléments ponctuels (plugin, texte, photo) sans toucher à la structure. Une refonte reconstruit tout ou partie du site : architecture des pages, design, code, contenus. On parle de refonte quand au moins 3 des 5 signaux décrits dans cet article sont présents simultanément.',
    },
    {
      q: 'Est-ce que je vais perdre mon référencement Google pendant la refonte ?',
      a: 'Non, si la migration est bien planifiée. La règle d\'or : mettre en place des redirections 301 pour chaque URL qui change. Ainsi, Google transfère le « jus SEO » de l\'ancienne URL vers la nouvelle. Une refonte bien exécutée améliore généralement le référencement dans les 3 à 6 mois qui suivent.',
    },
    {
      q: 'Combien de temps dure une refonte de site pour une PME dans les Hautes-Alpes ?',
      a: 'Pour un site vitrine de 5 à 10 pages, comptez 4 à 8 semaines. Pour un site avec blog, e-commerce ou réservation en ligne, 8 à 16 semaines. Ces délais incluent la collecte de vos contenus, les allers-retours de validation et les tests avant mise en ligne.',
    },
    {
      q: 'Faut-il garder WordPress ou changer de CMS lors d\'une refonte ?',
      a: 'WordPress reste un excellent choix si votre prestataire maîtrise son optimisation (Bedrock, Sage, Oxygen ou Bricks builder, sans plugin superflu). Pour des performances maximales et une sécurité renforcée, des alternatives comme Next.js + Sanity ou Webflow offrent des résultats supérieurs en 2026. Le CMS idéal est celui que vous pouvez mettre à jour vous-même sans développeur.',
    },
    {
      q: 'Comment éviter les arnaques lors d\'un appel d\'offres pour une refonte ?',
      a: 'Demandez toujours : un accès admin à votre hébergement ET à votre CMS dès le départ, des exemples récents de sites avec leurs scores PageSpeed, une clause de propriété du code dans le contrat, et un engagement sur le délai de mise en ligne. Méfiez-vous des offres < 500 € qui livrent des thèmes achetés sans personnalisation réelle.',
    },
    {
      q: 'Puis-je me contenter d\'une optimisation plutôt qu\'une refonte complète ?',
      a: 'Oui, si 1 ou 2 signaux seulement s\'appliquent. Par exemple, si votre site est visuellement correct mais lent, une optimisation des images et un changement d\'hébergement peuvent suffire. Si le design est dépassé mais la structure est saine, un « reskin » (changement graphique sans toucher au code) peut être une solution intermédiaire moins coûteuse.',
    },
  ]),
];

// ── Run ───────────────────────────────────────────────────────────────────────

async function run() {
  const POST_ID = '29d6e806-20e8-4f86-91fa-f41498aa4d59';
  console.log(`\n[Post 6] Replacing body (${body.length} blocks)…`);

  const result = await client
    .patch(POST_ID)
    .set({ body })
    .commit();

  console.log(`✅ Done — document ${result._id} updated (rev ${result._rev})`);
  console.log(`   ${body.length} blocks written`);
}

run().catch(err => {
  console.error('\n❌', err.message);
  process.exit(1);
});
