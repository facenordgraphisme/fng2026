/**
 * expand-post8-seo-ia.mjs
 *
 * Replaces the body of Post 8 (seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026)
 * with a fully expanded ~2,800-word article covering:
 *   - SEO classique approfondi (Core Web Vitals, E-E-A-T, Local Pack)
 *   - Référencement IA approfondi (RAG, citation signals, modèles)
 *   - Grandes différences avec tableau enrichi
 *   - Comment être cité par les IA (guide pratique)
 *   - Stratégie hybride pour artisans/PME des Hautes-Alpes
 *   - Plan d'action
 *   - SpokeCards
 *   - FAQ enrichie
 *
 * Run: node scripts/expand-post8-seo-ia.mjs
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
  b('En 2026, vos clients potentiels vous cherchent à deux endroits : sur Google et en posant des questions à ChatGPT, Gemini ou Perplexity. Ces deux surfaces de recherche fonctionnent différemment, obéissent à des règles différentes — mais elles se nourrissent toutes les deux de la même chose : un contenu de qualité, structuré et ancré dans votre expertise locale. Ce guide vous explique comment fonctionnent ces deux systèmes et comment les artisans et PME des Hautes-Alpes peuvent tirer parti des deux simultanément.'),
  b('La bonne nouvelle : vous n\'avez pas à choisir. La stratégie qui vous classe haut sur Google est précisément celle qui vous fait citer par les IA génératives. Mais certains ajustements spécifiques à l\'IA peuvent faire la différence entre apparaître dans les réponses ou rester invisible sur cette nouvelle surface.'),

  // ── Key takeaways ────────────────────────────────────────────────────────
  b('Ce qu\'il faut retenir', 'h3'),
  bullet('Google conserve 92,5 % de part de marché des moteurs de recherche en France en 2026 — le SEO classique reste le socle indispensable'),
  bullet('ChatGPT comptabilise plus de 200 millions d\'utilisateurs actifs hebdomadaires en 2026 ; Perplexity dépasse 100 millions — une masse critique impossible à ignorer'),
  bullet('Les IA génèrent du « trafic de référence » (AI referral traffic) qui commence à apparaître dans Google Analytics 4 sous le tag « chatgpt.com » ou « perplexity.ai »'),
  bullet('Les articles cités par les IA partagent 4 caractéristiques : statistiques sourcées, FAQ structurées, paragraphes courts, expertise locale prouvée'),
  bullet('La stratégie gagnante en 2026 : SEO local solide (fiche GBP + site mobile-first + avis) + contenu structuré pour les IA (FAQ, données chiffrées, titres en question)'),

  // ── SEO Classique ─────────────────────────────────────────────────────────
  b('Le SEO classique : toujours le canal n°1 pour les recherches locales', 'h2'),

  b('Qu\'est-ce que le SEO en 2026 ?', 'h3'),
  b('Le référencement naturel (Search Engine Optimization) est l\'ensemble des techniques qui permettent à votre site d\'apparaître dans les résultats organiques de Google pour des requêtes pertinentes. En 2026, Google évalue votre site sur trois piliers principaux : la qualité technique (Core Web Vitals, HTTPS, mobile-first), la pertinence du contenu (E-E-A-T : Experience, Expertise, Authoritativeness, Trustworthiness), et les signaux d\'autorité (backlinks, avis, mentions locales).'),
  b('Pour un artisan ou un commerce dans les Hautes-Alpes, le SEO local est la priorité : apparaître dans le Local Pack (les 3 résultats avec carte Google Maps) et dans les résultats organiques locaux pour des requêtes comme « plombier Gap », « hôtel Vars ski » ou « architecte Briançon ». Ces requêtes à fort intent d\'achat génèrent directement des appels et des contacts.'),

  b('Les avantages du SEO classique', 'h3'),
  bullet('Trafic gratuit et récurrent une fois les positions acquises'),
  bullet('Ciblage local très précis (ville, département, quartier)'),
  bullet('Mesurable avec précision via Google Search Console et GA4'),
  bullet('Complémentaire aux campagnes Google Ads (les deux se renforcent)'),
  bullet('Construit une autorité de domaine durable sur le long terme'),

  b('Les limites du SEO classique', 'h3'),
  bullet('Délai de 3 à 9 mois avant de voir des résultats significatifs pour un nouveau site'),
  bullet('Les premières positions sur Google sont souvent capturées par des annuaires (Pages Jaunes, Yelp, Houzz)'),
  bullet('Les résultats de recherche « zéro-clic » (réponses directes de Google) réduisent le trafic vers les sites pour certaines requêtes'),
  bullet('Nécessite une production régulière de contenu et une veille technique permanente'),

  b('L\'impact des Core Web Vitals sur le classement local', 'h3'),
  b('Depuis 2023, Google intègre les Core Web Vitals dans son algorithme de classement. Pour les artisans et PME des Hautes-Alpes, l\'enjeu est surtout mobile : vos clients cherchent souvent depuis les stations ou les villages, parfois avec une connexion 4G limitée. Un LCP (temps d\'affichage du contenu principal) supérieur à 4 secondes sur mobile peut vous faire perdre 3 à 5 positions dans les résultats locaux, directement au profit d\'un concurrent mieux optimisé.'),

  // ── Référencement sur l'IA ────────────────────────────────────────────────
  b('Le référencement sur l\'IA : la nouvelle surface à conquérir', 'h2'),

  b('Comment fonctionnent les IA génératives ?', 'h3'),
  b('Les IA génératives comme ChatGPT (OpenAI), Gemini (Google), Claude (Anthropic) et Perplexity fonctionnent sur un principe différent de Google. Elles ne renvoient pas vers des liens : elles synthétisent une réponse directe en citant (parfois) leurs sources. Certaines utilisent une navigation web en temps réel (web browsing), d\'autres s\'appuient sur leur base de connaissances entraînée jusqu\'à une date de coupure, et les plus avancées combinent les deux via un système appelé RAG (Retrieval-Augmented Generation).'),
  b('Quand un utilisateur tape « quelle agence web choisir à Gap ou Embrun ? », l\'IA va chercher des sources fiables sur le web et synthétiser une réponse. Si votre site est structuré pour être cité (contenu clair, statistiques sourcées, FAQ bien écrite), vous avez une chance d\'apparaître dans cette réponse. Si votre site est générique ou peu structuré, vous n\'existez pas pour ces systèmes.'),

  b('Pourquoi le traffic IA commence à vraiment compter', 'h3'),
  b('En 2024, le trafic de référence issu des IA représentait moins de 1 % du trafic web total. En 2026, il dépasse 5 % pour de nombreux secteurs professionnels et continue de croître à un rythme exponentiel. Perplexity affiche une croissance de 300 % de ses requêtes en un an. Google AI Overviews (ex-SGE) apparaît maintenant sur plus de 40 % des requêtes complexes en France.'),
  b('Pour les artisans et PME des Hautes-Alpes, ce trafic est particulièrement précieux car il vient de prospects en phase de recherche approfondie — des personnes qui ont déjà posé plusieurs questions à l\'IA avant de chercher un prestataire. Ce sont des leads plus qualifiés que la moyenne.'),

  b('Les 4 signaux qui font citer votre contenu par les IA', 'h3'),
  b('L\'optimisation pour les IA — qu\'on appelle aussi GEO (Generative Engine Optimization) ou AEO (Answer Engine Optimization) — repose sur des principes proches du SEO sémantique, avec quelques spécificités :'),
  bullet('Statistiques récentes et sourcées : les IA préfèrent citer des chiffres datés (« 87 % des consommateurs en 2026, source BrightLocal ») plutôt que des affirmations générales'),
  bullet('Structure en questions-réponses : les FAQ bien écrites sont idéales — les IA les scannent pour trouver des passages extraits et citables'),
  bullet('Autorité locale et niche : mentionner des lieux spécifiques (Gap, Briançon, Embrun, Vars, Orcières) et des spécialités précises (maçon restauration pierre sèche, expert-comptable professions libérales) signale l\'expertise locale à l\'IA'),
  bullet('Passages autonomes (« citation capsules ») : des paragraphes de 100 à 180 mots qui répondent à une question précise, complets en eux-mêmes, sans avoir besoin du contexte du reste de l\'article'),

  // ── Grandes différences ───────────────────────────────────────────────────
  b('SEO classique vs référencement IA : les grandes différences', 'h2'),
  b('Les deux approches ne s\'opposent pas, mais leurs mécanismes de fonctionnement et leurs indicateurs de succès diffèrent. Voici les points clés à comprendre avant de définir votre stratégie :'),

  {
    _type: 'table',
    _key: uid(),
    rows: [
      { _key: uid(), cells: ['Critère', 'SEO classique (Google)', 'Référencement IA (ChatGPT, Gemini, Perplexity)'] },
      { _key: uid(), cells: ['Objectif principal', 'Classement dans les SERP', 'Être cité dans les réponses générées'] },
      { _key: uid(), cells: ['Indicateur clé', 'Position, clics, impressions', 'Nombre de citations, trafic référant IA'] },
      { _key: uid(), cells: ['Délai de résultat', '3 à 9 mois', '1 à 4 mois (mise à jour continue)'] },
      { _key: uid(), cells: ['Contenu privilégié', 'Articles longs, mots-clés ciblés', 'FAQ structurées, passages courts et factuels'] },
      { _key: uid(), cells: ['Signaux d\'autorité', 'Backlinks, ancienneté de domaine', 'Citations dans d\'autres sources fiables'] },
      { _key: uid(), cells: ['Données structurées', 'Schema.org recommandé', 'FAQ, How-To, speakable schema utiles'] },
      { _key: uid(), cells: ['Localisation', 'Google Business Profile essentiel', 'Mentions géographiques dans le contenu'] },
      { _key: uid(), cells: ['Impact direct ventes', 'Très fort (appels, demandes devis)', 'Croissant, surtout pour les décisions complexes'] },
    ],
  },

  // ── Faut-il abandonner le SEO ? ───────────────────────────────────────────
  b('Faut-il abandonner le SEO classique pour se concentrer sur les IA ?', 'h2'),
  b('Non — et voici pourquoi cette question est un faux dilemme. En 2026, Google reste de loin le moteur dominant avec 92,5 % de part de marché en France. Même les requêtes qui déclenchent un AI Overview dans Google s\'appuient sur les sites bien référencés pour alimenter leurs réponses. Autrement dit, être bien classé sur Google augmente mécaniquement vos chances d\'être cité dans Google Gemini.'),
  b('De plus, les IA génératives elles-mêmes (ChatGPT avec Bing, Perplexity avec son moteur propre) explorent le web en temps réel. Un site rapide, sécurisé et bien structuré est la base sur laquelle tout le reste s\'appuie. Abandonner le SEO pour se concentrer uniquement sur l\'IA serait comme enlever les fondations d\'une maison pour mieux décorer le toit.'),
  b('La vraie question n\'est pas « SEO ou IA » mais « comment optimiser mon contenu pour qu\'il performe dans les deux environnements ? ». La réponse est : en créant du contenu de qualité, factuellement ancré et bien structuré — ce qui bénéficie aux deux canaux simultanément.'),

  // ── Comment être cité par les IA ──────────────────────────────────────────
  b('Comment être cité par ChatGPT, Gemini et Perplexity : guide pratique', 'h2'),
  b('Voici les 7 actions concrètes pour optimiser votre contenu pour les IA génératives, en partant de vos pages existantes :'),
  numbered('Ajoutez une section FAQ à chaque article de blog et page de service. Les questions doivent reprendre les formulations exactes que vos clients utilisent (« Combien coûte une refonte de site à Gap ? », « Comment optimiser sa fiche Google pour les Hautes-Alpes ? »)'),
  numbered('Intégrez au moins 3 statistiques récentes et sourcées par article. Précisez toujours la source et l\'année : « 87 % des consommateurs consultent Google avant de se déplacer (BrightLocal, 2026) »'),
  numbered('Structurez vos articles avec des H2 et H3 sous forme de questions. Les IA scannent les titres pour identifier les passages pertinents.'),
  numbered('Écrivez des « capsules citables » : des paragraphes de 120 à 180 mots qui répondent à une question précise de façon complète et autonome. C\'est ce format qui est le plus souvent extrait et cité.'),
  numbered('Implémentez le schéma FAQ en JSON-LD sur vos pages. Google et les IA lisent ces données structurées pour identifier les passages à extraire.'),
  numbered('Mentionnez explicitement votre zone géographique dans le contenu : « artisans et PME des Hautes-Alpes (05) », « Gap, Briançon, Embrun, Sisteron » — cela ancre votre expertise locale pour les requêtes géographiques.'),
  numbered('Obtenez des mentions dans des médias et annuaires locaux reconnus (Dauphiné Libéré, Hautes-Alpes Tourisme, CCI PACA, BTP des Alpes) : les IA suivent les citations dans des sources tierces pour évaluer votre autorité.'),

  // ── Stratégie pour les Hautes-Alpes ──────────────────────────────────────
  b('Quelle stratégie adopter en 2026 pour les Hautes-Alpes ?', 'h2'),
  b('Les artisans et PME des Hautes-Alpes (05) font face à un contexte particulier : un marché à double saisonnalité, une clientèle à la fois locale (Gap, Briançon, Embrun, Sisteron) et touristique (Vars, Orcières, Serre-Ponçon), et des concurrents qui investissent encore peu dans le digital. C\'est une opportunité unique.'),
  b('La stratégie recommandée en 2026 s\'articule en trois niveaux :'),
  b('Niveau 1 — Les fondations (priorité immédiate)'),
  bullet('Google Business Profile vérifié, complet, avec photos récentes et réponses aux avis'),
  bullet('Site web mobile-first, HTTPS, LCP < 2,5 secondes'),
  bullet('3 à 5 pages de contenu local ciblé (une par ville ou type de prestation principale)'),
  b('Niveau 2 — L\'autorité (3 à 6 mois)'),
  bullet('Blog avec 8 à 12 articles ciblant les requêtes locales à fort intent'),
  bullet('FAQ structurées avec données Schema.org sur chaque article'),
  bullet('Obtenir 20+ avis Google avec réponses personnalisées'),
  bullet('Citations dans 5 à 10 annuaires locaux de qualité'),
  b('Niveau 3 — L\'optimisation IA (6 à 12 mois)'),
  bullet('Retravailler les articles existants avec des capsules citables et des statistiques sourcées'),
  bullet('Ajouter le schéma speakable aux passages les plus importants'),
  bullet('Surveiller les citations IA via Google Analytics 4 (source : chatgpt.com, perplexity.ai)'),
  bullet('Publier des données propriétaires (études, statistiques locales) que les IA peuvent citer'),
  b('Dans les Hautes-Alpes, les secteurs où la combinaison SEO + IA peut faire la plus grande différence : le tourisme et les hébergements (concurrence nationale forte), l\'artisanat du bâtiment (forte demande locale, peu de présence digitale des concurrents), et les professions libérales (médecins, experts-comptables, notaires) qui commencent à peine à optimiser leur présence en ligne.'),

  // ── Plan d'action ────────────────────────────────────────────────────────
  b('Plan d\'action : ce que vous pouvez faire cette semaine', 'h2'),
  numbered('Vérifiez si votre trafic IA est déjà mesurable : dans Google Analytics 4, allez dans Acquisition → Vue d\'ensemble → cherchez « chatgpt.com » ou « perplexity.ai » dans les sources de trafic'),
  numbered('Auditez votre contenu existant : vos articles de blog ont-ils une section FAQ ? Des statistiques sourcées ? Des mentions géographiques explicites ? Si non, commencez par vos 3 meilleures pages.'),
  numbered('Vérifiez que votre schéma FAQ est en place sur vos pages les plus visitées (outil : Google Rich Results Test)'),
  numbered('Testez comment les IA vous voient : tapez « meilleur [votre métier] à [votre ville] » dans ChatGPT ou Perplexity. Apparaissez-vous dans la réponse ? Si non, les actions de ce guide vous aideront à y remédier.'),

  // ── SpokeCards ──────────────────────────────────────────────────────────
  spokeCard(
    'SEO Local',
    'SEO local dans les Hautes-Alpes : le guide complet',
    'Les fondations du référencement local : fiche GBP, balises SEO, citations locales et avis Google. Le guide complet pour le 05.',
    '/blog/seo-local-hautes-alpes-artisans-pme',
    'Lire le guide SEO local →'
  ),
  spokeCard(
    'Google Business Profile',
    'Créer et optimiser sa fiche Google Business Profile',
    'La fiche GBP est votre premier levier de visibilité locale — et un signal fort pour Google et les IA.',
    '/blog/gbp-artisans-hautes-alpes',
    'Optimiser ma fiche GBP →'
  ),
  spokeCard(
    'Refonte site',
    'Refonte de site : 5 signes qu\'il est temps de changer',
    'Avant d\'optimiser pour les IA, votre site doit être techniquement solide. Voici les 5 signaux à surveiller.',
    '/blog/refonte-site-internet-5-signes',
    'Vérifier les 5 signes →'
  ),
  spokeCard(
    'Visibilité',
    'Booster sa visibilité en ligne dans les Hautes-Alpes',
    'La vision d\'ensemble : GBP, réseaux sociaux, contenu local, SEO — toutes les briques d\'une stratégie digitale efficace.',
    '/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes',
    'Voir la stratégie complète →'
  ),

  // ── Pour aller plus loin ─────────────────────────────────────────────────
  b('Pour aller plus loin', 'h2'),
  linkPara('📍 ', 'SEO local Hautes-Alpes : le guide complet pour artisans et PME du 05', '/blog/seo-local-hautes-alpes-artisans-pme'),
  linkPara('📋 ', 'Optimiser sa fiche Google Business Profile dans les Hautes-Alpes', '/blog/gbp-artisans-hautes-alpes'),
  linkPara('🌐 ', 'Booster sa visibilité en ligne dans les Hautes-Alpes', '/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes'),

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faqBlock('FAQ – SEO vs Référencement sur l\'IA en 2026', [
    {
      q: 'Qu\'est-ce que le GEO (Generative Engine Optimization) ?',
      a: 'Le GEO est l\'ensemble des techniques pour optimiser votre contenu afin d\'être cité dans les réponses générées par les IA (ChatGPT, Gemini, Perplexity). Contrairement au SEO classique qui vise un classement dans les SERP, le GEO vise l\'inclusion dans les réponses synthétiques. En pratique, les deux disciplines partagent 80 % de leurs bonnes pratiques : contenu de qualité, structure claire, expertise prouvée.',
    },
    {
      q: 'Est-ce que ChatGPT indexe mon site web ?',
      a: 'ChatGPT (GPT-4 Turbo avec navigation web) peut crawl votre site via son bot « OAI-SearchBot ». Perplexity utilise « PerplexityBot ». Pour vérifier que ces bots accèdent bien à votre site, contrôlez votre fichier robots.txt : s\'il contient « Disallow: / » pour tous les bots, vous êtes invisible pour les IA. Pour les autoriser sélectivement, vous pouvez ajouter « Allow: /blog/ » spécifiquement pour OAI-SearchBot et PerplexityBot.',
    },
    {
      q: 'Google va-t-il être remplacé par les IA génératives ?',
      a: 'Pas dans un horizon de 3 à 5 ans. Google reste dominant avec 92,5 % de part de marché en France. De plus, Google lui-même intègre l\'IA générative dans ses résultats (AI Overviews) — ce qui signifie que les IA et Google coexistent et se nourrissent mutuellement. La tendance à surveiller est plutôt une fragmentation des surfaces de recherche, avec une part croissante des requêtes traitées directement par les IA.',
    },
    {
      q: 'Comment mesurer si je suis cité par les IA ?',
      a: 'Dans Google Analytics 4, allez dans Acquisition → Sources et cherchez les domaines chatgpt.com, perplexity.ai, gemini.google.com dans vos sources de trafic référant. Vous pouvez aussi utiliser des outils comme Semrush AI Toolkit ou Ahrefs Brand Monitoring pour suivre les citations de votre marque dans les réponses IA.',
    },
    {
      q: 'Le SEO local est-il concerné par l\'IA ?',
      a: 'Oui, de plus en plus. Quand un utilisateur demande à Gemini « quel plombier à Gap peut intervenir le samedi ? », l\'IA cite les entreprises qui ont une fiche Google Business Profile complète, des avis récents et un site web structuré. Le référencement local et le GEO convergent : une stratégie SEO local solide est le meilleur point de départ pour être visible sur les deux surfaces.',
    },
    {
      q: 'Faut-il investir dans du contenu long ou dans des FAQ courtes pour les IA ?',
      a: 'Les deux. Les articles longs (1 500 à 3 000 mots) renforcent l\'autorité de votre domaine aux yeux de Google. À l\'intérieur de ces articles, les FAQ structurées et les capsules citables (paragraphes de 120 à 180 mots, autonomes et factuels) sont les formats les plus souvent extraits et cités par les IA. Pensez à votre contenu long comme un conteneur, et à vos FAQ/capsules comme les passages que les IA vont extraire.',
    },
  ]),
];

// ── Run ───────────────────────────────────────────────────────────────────────

async function run() {
  const POST_ID = '747729fc-0bdc-440d-a170-c790443d1df7';
  console.log(`\n[Post 8] Replacing body (${body.length} blocks)…`);

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
