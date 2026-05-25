/**
 * create-post9-prix-site.mjs
 *
 * Creates a new high-commercial-intent post:
 *   "Combien coûte un site internet pour artisan ou PME dans les Hautes-Alpes ?"
 *   Slug: prix-site-internet-artisan-pme-hautes-alpes
 *
 * Covers:
 *   - Tarifs transparents Face Nord Graphisme (dès 800 € HT)
 *   - Landing page / site vitrine / e-commerce : 3 niveaux de budget
 *   - Ce qui fait varier le prix
 *   - L'impact de l'IA sur les tarifs en 2026 (honest take)
 *   - Agence locale vs freelance vs DIY (tableau comparatif)
 *   - Plan d'action / CTA devis
 *   - SpokeCards cluster
 *   - FAQ enrichie
 *
 * Run: node scripts/create-post9-prix-site.mjs
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

function numbered(text) {
  return {
    _type: 'block', _key: uid(), style: 'normal',
    listItem: 'number', level: 1,
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
  b('« Combien ça coûte ? » — c\'est systématiquement la première question que posent les artisans et commerçants des Hautes-Alpes avant de se lancer dans un projet web. Pourtant, peu d\'agences répondent clairement à cette question sur leur site. Chez Face Nord Graphisme, nous avons fait le choix de la transparence : nos tarifs débutent à 800 € HT pour une landing page ou un site one-page, et nous adaptons chaque projet à la réalité de votre activité et de vos objectifs.'),
  b('En 2026, l\'accélération des outils de développement assistés par l\'IA a changé la donne : créer un site web professionnel prend moins de temps qu\'il y a trois ans. Nous répercutons ce gain de productivité sur nos tarifs — ce qui nous permet de proposer des sites performants à des prix accessibles aux artisans, commerçants et prestataires touristiques du 05. Voici un guide complet pour comprendre ce qui détermine le coût d\'un site et estimer le budget adapté à votre situation.'),

  // ── Key takeaways ────────────────────────────────────────────────────────
  b('Ce qu\'il faut retenir', 'h3'),
  bullet('Les tarifs Face Nord Graphisme débutent à 800 € HT pour une landing page ou un site one-page'),
  bullet('3 facteurs font principalement monter le prix : le nombre de pages, les fonctionnalités sur-mesure, et la production de contenu (textes, photos)'),
  bullet('L\'IA accélère le développement web en 2026 : les sites standards coûtent moins cher à produire qu\'il y a 3 ans — nous vous faisons profiter de ce gain'),
  bullet('Un site non optimisé (trop lent, non mobile, mal référencé) coûte plus cher en opportunités perdues qu\'une refonte'),
  bullet('Devis gratuit sous 48 h : décrivez votre projet, obtenez une estimation claire sans engagement'),

  // ── Section 1 : Landing page ─────────────────────────────────────────────
  b('Landing page et site one-page : à partir de 800 € HT', 'h2'),
  b('La landing page — ou site one-page — est la solution idéale pour lancer rapidement une présence web professionnelle ou promouvoir une offre spécifique (saison estivale, nouveau service, promotion hivernale). En une seule page bien conçue, on y retrouve l\'essentiel : votre activité, vos services, vos témoignages, un formulaire de contact et votre numéro de téléphone cliquable.'),
  b('Ce format est particulièrement adapté pour :'),
  bullet('Un artisan ou commerçant qui n\'a pas encore de site et veut être visible rapidement sur Google'),
  bullet('Un prestataire touristique voulant une page dédiée pour une activité saisonnière (randonnée, VTT, ski de rando à Vars ou Orcières)'),
  bullet('Un professionnel libéral souhaitant une page simple de présentation avec prise de contact'),
  bullet('Une campagne locale ciblée avec un objectif de conversion précis (réservations, appels)'),
  b('Ce qui est inclus dans l\'offre à partir de 800 € HT :'),
  bullet('Design sur-mesure (pas de thème générique acheté sur Envato)'),
  bullet('Responsive mobile natif — optimisé pour les smartphones dès la conception'),
  bullet('Balises SEO de base (title, meta description, H1, alt images)'),
  bullet('Formulaire de contact avec envoi sécurisé'),
  bullet('Certificat HTTPS inclus'),
  bullet('Hébergement et nom de domaine conseillés (non inclus, ~15 à 30 €/an)'),
  bullet('Délai de livraison : 5 à 10 jours ouvrés'),

  // ── Section 2 : Site vitrine ─────────────────────────────────────────────
  b('Site vitrine complet : de 1 200 à 2 500 € HT', 'h2'),
  b('Le site vitrine multipages est la solution standard pour une entreprise qui veut présenter l\'ensemble de ses services, son équipe, ses réalisations et son actualité. Il comprend généralement 5 à 10 pages et un CMS (système de gestion de contenu) qui vous permet de mettre à jour vos textes et images sans intervention technique.'),
  b('Ce format convient à :'),
  bullet('Artisans du bâtiment (maçon, électricien, plombier, menuisier) souhaitant présenter leurs réalisations avec photos'),
  bullet('Commerces de proximité dans les Hautes-Alpes (Gap, Briançon, Embrun, Sisteron) avec plusieurs gammes de produits ou services'),
  bullet('Hébergements touristiques (chambres d\'hôtes, gîtes, camping) avec une page par type d\'hébergement'),
  bullet('Professions libérales ou de santé souhaitant une présentation détaillée et un formulaire de prise de rendez-vous'),
  b('En plus des éléments de la landing page, ce niveau inclut :'),
  bullet('Architecture du site et maquettes validées avec vous avant développement'),
  bullet('Blog ou actualités intégré (avec CMS pour publier vous-même)'),
  bullet('Optimisation SEO avancée : maillage interne, données structurées Schema.org, sitemap XML'),
  bullet('Intégration Google Business Profile et Google Analytics 4'),
  bullet('Formation à la mise à jour du CMS (1 h en visio)'),
  bullet('Délai de livraison : 2 à 4 semaines'),

  // ── Section 3 : Réservation / e-commerce ────────────────────────────────
  b('Site avec réservation en ligne ou e-commerce léger : 2 500 à 5 000 € HT', 'h2'),
  b('Dès que votre site doit gérer des transactions — réservations de séjour, ventes de produits, prise de rendez-vous avec paiement en ligne — la complexité technique augmente. Ce niveau de projet nécessite l\'intégration de modules spécialisés, des tests de sécurité renforcés et souvent une connexion à des outils tiers (Stripe, Calendly, un PMS hôtelier, un logiciel de caisse).'),
  b('Ce format est adapté pour :'),
  bullet('Prestataires touristiques des Hautes-Alpes (activités outdoor, locations de matériel, hébergements) souhaitant automatiser leurs réservations'),
  bullet('Artisans ou commerçants vendant quelques produits ou prestations en ligne (boutique légère, 5 à 50 références)'),
  bullet('Restaurants ou traiteurs avec prise de commande ou réservation en ligne'),
  b('Ce qui différencie ce niveau :'),
  bullet('Module de réservation ou panier e-commerce sécurisé (Stripe, PayPal, virement)'),
  bullet('Synchronisation avec un agenda ou un système de disponibilités'),
  bullet('Emails automatiques de confirmation et de rappel (réduction des no-shows de 20 à 40 %)'),
  bullet('Tests de charge et sécurité renforcés (RGPD, cookies, mentions légales)'),
  bullet('Délai de livraison : 4 à 8 semaines'),

  // ── Ce qui fait varier le prix ────────────────────────────────────────────
  b('Ce qui fait monter (ou baisser) le prix d\'un site web', 'h2'),
  b('Au-delà du type de site, plusieurs paramètres ajustent le devis final. En étant transparent sur ces variables, vous pouvez vous-même identifier ce qui est indispensable et ce qui peut attendre une V2.'),
  b('Facteurs qui font monter le prix :'),
  bullet('Production de contenu déléguée à l\'agence (rédaction SEO, shooting photo, vidéo) — comptez 300 à 800 € supplémentaires selon le volume'),
  bullet('Site multilingue (français + anglais pour capter les touristes étrangers) — +30 à 50 % du devis de base'),
  bullet('Intégrations tierces complexes (logiciel de caisse, CRM, ERP, API externe)'),
  bullet('Délai très court (livraison sous 5 jours) — supplément de 20 à 30 % pour la priorité'),
  bullet('Volume de pages important (> 20 pages de contenu unique)'),
  b('Facteurs qui font baisser le prix :'),
  bullet('Vous fournissez les textes et les photos déjà prêts — économie de 200 à 500 €'),
  bullet('Vous avez une charte graphique existante (logo, couleurs, typographies définies)'),
  bullet('Délai flexible : plus vous nous laissez de temps, plus nous pouvons optimiser sans surcoût'),
  bullet('Projet simple et périmètre clairement défini dès le départ (évite les allers-retours coûteux)'),

  // ── Impact de l'IA sur les tarifs ────────────────────────────────────────
  b('L\'IA fait-elle baisser les prix des sites web en 2026 ?', 'h2'),
  b('Oui — et il vaut mieux en parler franchement. Les outils de développement assistés par l\'IA (GitHub Copilot, Cursor, v0 de Vercel) ont considérablement accéléré la production de code depuis 2023. Ce qui prenait 3 jours en prend maintenant 1. Nous utilisons ces outils en interne chez Face Nord Graphisme, et nous répercutons ce gain de productivité sur nos tarifs plutôt que de le garder comme marge supplémentaire.'),
  b('Ce que l\'IA peut faire (et fait baisser les prix) :'),
  bullet('Générer le code HTML/CSS de composants répétitifs (en-tête, pied de page, cartes de services)'),
  bullet('Créer des premières ébauches de contenu que le rédacteur humain affine ensuite'),
  bullet('Automatiser les tests de compatibilité et de performance'),
  bullet('Accélérer l\'intégration de données structurées (Schema.org, JSON-LD)'),
  b('Ce que l\'IA ne remplace pas (et qui garde sa valeur) :'),
  bullet('La stratégie : comprendre votre activité, vos clients, vos concurrents locaux dans les Hautes-Alpes'),
  bullet('L\'UX design : concevoir un parcours utilisateur qui convertit des visiteurs en contacts'),
  bullet('Le SEO local : savoir quels mots-clés cibler pour Gap, Briançon ou Embrun, et comment construire l\'autorité de votre domaine'),
  bullet('La relation client : répondre à vos questions, vous former, être disponible après la livraison'),
  b('Notre position : l\'IA est un outil qui nous permet de vous livrer un meilleur site, plus rapidement, à un tarif accessible. Elle ne remplace pas l\'expertise, elle l\'amplifie. C\'est pour cela que nos tarifs peuvent démarrer à 800 € sans sacrifier la qualité.'),

  // ── Comparatif agence / freelance / DIY ─────────────────────────────────
  b('Agence locale, freelance ou DIY (Wix, Squarespace) : que choisir ?', 'h2'),
  b('C\'est une vraie question — et chaque option a ses avantages selon votre situation. Voici un comparatif honnête :'),
  {
    _type: 'table',
    _key: uid(),
    rows: [
      { _key: uid(), cells: ['Critère', 'DIY (Wix / Squarespace)', 'Freelance', 'Agence locale (Face Nord)'] },
      { _key: uid(), cells: ['Coût initial', '0 à 30 €/mois', '500 à 2 000 €', 'à partir de 800 € HT'] },
      { _key: uid(), cells: ['Coût sur 3 ans', '1 000 à 1 500 €', '500 à 2 500 €', '800 à 3 000 €'] },
      { _key: uid(), cells: ['Temps investi', '10 à 30 h de votre temps', '2 à 5 h de votre temps', '2 à 4 h de votre temps'] },
      { _key: uid(), cells: ['SEO local', 'Limité (code non optimisé)', 'Variable selon compétences', 'Inclus et optimisé'] },
      { _key: uid(), cells: ['Performance mobile', 'Médiocre (LCP 5-8 s)', 'Bonne si compétent', 'Excellente (LCP < 2 s)'] },
      { _key: uid(), cells: ['Disponibilité après livraison', 'Support technique générique', 'Variable, turnover élevé', 'Disponible localement'] },
      { _key: uid(), cells: ['Connaissance du marché local', 'Aucune', 'Rare', 'Oui — Hautes-Alpes 05'] },
      { _key: uid(), cells: ['Propriété du code', 'Non (lié à la plateforme)', 'Oui', 'Oui — vous êtes propriétaire'] },
    ],
  },
  b('Le DIY sur Wix ou Squarespace peut sembler économique à court terme, mais il a un coût caché : votre temps, et surtout les performances SEO sacrifiées. Ces plateformes génèrent un code lourd qui pénalise les Core Web Vitals et donc votre classement Google. Pour un artisan ou un prestataire touristique des Hautes-Alpes, où la visibilité locale sur Google est directement liée à votre chiffre d\'affaires, c\'est un frein réel.'),

  // ── Ce qui est inclus chez Face Nord ─────────────────────────────────────
  b('Ce qui est toujours inclus chez Face Nord Graphisme', 'h2'),
  b('Quelle que soit la formule choisie, voici les éléments systématiquement inclus dans chaque projet :'),
  bullet('Design graphique sur-mesure aligné avec votre identité visuelle (pas de thème acheté et revendu)'),
  bullet('Optimisation SEO on-page : balises title et meta, H1 unique, images compressées en WebP, sitemap XML'),
  bullet('Score PageSpeed Mobile > 85/100 garanti à la livraison'),
  bullet('HTTPS inclus, mentions légales et politique de confidentialité conformes RGPD'),
  bullet('Propriété totale du site : vous avez accès admin à l\'hébergement et au CMS dès le départ'),
  bullet('Devis gratuit et détaillé sous 48 h, sans engagement'),
  bullet('Suivi de 30 jours après mise en ligne pour corriger les éventuels bugs'),

  // ── Plan d'action / CTA ──────────────────────────────────────────────────
  b('Comment obtenir un devis pour votre projet ?', 'h2'),
  b('Obtenir un devis précis prend 10 minutes de votre côté. Voici comment procéder pour que nous puissions vous répondre rapidement avec une estimation réaliste :'),
  numbered('Notez le type de site souhaité (landing page, vitrine, e-commerce ou réservation)'),
  numbered('Listez les pages dont vous avez besoin (exemple : Accueil, Services, Réalisations, À propos, Contact)'),
  numbered('Précisez si vous avez déjà des textes et des photos, ou si vous souhaitez qu\'on s\'en charge'),
  numbered('Indiquez votre délai souhaité et si vous avez des contraintes de calendrier (haute saison, déménagement, lancement de service)'),
  numbered('Contactez-nous via le formulaire de contact — nous vous répondons sous 48 h avec une estimation détaillée'),
  b('Si vous n\'êtes pas encore sûr de ce dont vous avez besoin, pas de problème : un premier appel de 20 minutes suffit pour cadrer votre projet et identifier la solution la plus adaptée à votre situation et à votre budget.'),

  // ── SpokeCards ──────────────────────────────────────────────────────────
  spokeCard(
    'Refonte site',
    'Refonte de site internet : 5 signes qu\'il est temps de changer',
    'Vous avez déjà un site mais il ne performe plus ? Découvrez les 5 signaux qui indiquent qu\'une refonte s\'impose.',
    '/blog/refonte-site-internet-5-signes',
    'Voir les 5 signes →'
  ),
  spokeCard(
    'SEO Local',
    'SEO local dans les Hautes-Alpes : le guide complet',
    'Une fois votre site en ligne, il faut le faire remonter sur Google. Le guide SEO local complet pour le 05.',
    '/blog/seo-local-hautes-alpes-artisans-pme',
    'Lire le guide SEO →'
  ),
  spokeCard(
    'Google Business Profile',
    'Optimiser sa fiche Google Business Profile',
    'Complémentaire à votre site : une fiche GBP bien optimisée génère des appels et des visites en magasin.',
    '/blog/gbp-artisans-hautes-alpes',
    'Optimiser ma fiche GBP →'
  ),
  spokeCard(
    'Réservation en ligne',
    'Digitaliser ses réservations dans les Hautes-Alpes',
    'Vous êtes prestataire touristique ? Automatisez vos réservations et réduisez les no-shows de 20 à 40 %.',
    '/blog/digitaliser-reservations-tourisme-hautes-alpes',
    'Découvrir les solutions →'
  ),

  // ── Pour aller plus loin ─────────────────────────────────────────────────
  b('Pour aller plus loin', 'h2'),
  linkPara('🔧 ', 'Refonte de site internet : 5 signes qu\'il est temps de changer', '/blog/refonte-site-internet-5-signes'),
  linkPara('📍 ', 'SEO local Hautes-Alpes : le guide complet pour artisans et PME du 05', '/blog/seo-local-hautes-alpes-artisans-pme'),
  linkPara('🌐 ', 'Booster sa visibilité en ligne dans les Hautes-Alpes', '/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes'),

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faqBlock('FAQ — Prix d\'un site internet dans les Hautes-Alpes', [
    {
      q: 'Combien coûte un site internet professionnel dans les Hautes-Alpes ?',
      a: 'Chez Face Nord Graphisme, nos tarifs débutent à 800 € HT pour une landing page ou un site one-page, entre 1 200 et 2 500 € HT pour un site vitrine complet, et de 2 500 à 5 000 € HT pour un site avec réservation ou e-commerce léger. Le tarif final dépend principalement du nombre de pages, des fonctionnalités requises et de si vous fournissez vous-même les textes et photos.',
    },
    {
      q: 'Faut-il payer une maintenance mensuelle en plus du prix de création ?',
      a: 'La maintenance n\'est pas obligatoire si vous êtes autonome sur votre CMS. Nous proposons un suivi de 30 jours inclus après chaque livraison. Au-delà, une maintenance mensuelle (mises à jour sécurité, sauvegardes, petites modifications) est disponible sur devis, généralement entre 30 et 80 € HT/mois selon les besoins. L\'hébergement et le nom de domaine restent à votre charge directement auprès de l\'hébergeur (environ 15 à 30 €/an).',
    },
    {
      q: 'Est-ce qu\'un site à 800 € est vraiment professionnel ?',
      a: 'Oui — à condition qu\'il soit conçu sur-mesure et non avec un thème générique mal adapté. Notre offre à 800 € inclut un design personnalisé, un responsive mobile optimisé, les bases du SEO et un score PageSpeed > 85/100 sur mobile. Pour une activité locale dans les Hautes-Alpes, une landing page bien construite surclasse largement un site vitrine classique mal optimisé à 3 000 €. La qualité ne dépend pas du prix seul, mais de la façon dont le budget est utilisé.',
    },
    {
      q: 'Combien de temps faut-il pour créer un site internet ?',
      a: 'Pour une landing page, comptez 5 à 10 jours ouvrés. Pour un site vitrine complet, 2 à 4 semaines. Pour un site avec réservation ou e-commerce, 4 à 8 semaines. Ces délais démarrent une fois que vous avez fourni les contenus (textes et photos) et validé la maquette. Un délai trop court augmente le tarif de 20 à 30 %.',
    },
    {
      q: 'Qu\'est-ce que l\'IA change au prix des sites web ?',
      a: 'Les outils de développement assistés par l\'IA (Copilot, Cursor, v0) ont réduit le temps de production des sites standards de 30 à 50 % entre 2023 et 2026. Chez Face Nord Graphisme, nous utilisons ces outils et répercutons ce gain sur nos tarifs. Ce qui coûtait 1 500 € en 2022 peut aujourd\'hui être livré à 800 € avec la même qualité. Cette tendance va se poursuivre — mais la stratégie, le SEO local et la connaissance du marché des Hautes-Alpes restent des compétences humaines irremplaçables.',
    },
    {
      q: 'Je suis en dehors de Gap ou Briançon, vous intervenez quand même ?',
      a: 'Oui — nous travaillons avec des clients dans tout le département des Hautes-Alpes (05) et au-delà. La totalité du projet peut se faire à distance (visio, email, partage de fichiers). Pour les projets importants, un déplacement de cadrage est possible sur les secteurs de Gap, Briançon, Embrun, Sisteron, Vars et Orcières. Nous connaissons le tissu économique local et les spécificités du marché touristique alpin.',
    },
    {
      q: 'Repartez-vous avec la propriété du site après livraison ?',
      a: 'Oui, toujours. Vous avez les accès admin à l\'hébergement, au CMS et à tous les fichiers du site dès la livraison. Il n\'y a aucun abonnement obligatoire pour garder votre site en ligne. Vous restez libre de le confier à un autre prestataire ou de le gérer vous-même à tout moment.',
    },
  ]),
];

// ── Document ──────────────────────────────────────────────────────────────────

const doc = {
  _id: 'post-prix-site-internet-hautes-alpes',
  _type: 'post',
  title: 'Combien coûte un site internet pour artisan ou PME dans les Hautes-Alpes ?',
  slug: { _type: 'slug', current: 'prix-site-internet-artisan-pme-hautes-alpes' },
  publishedAt: '2026-05-26T07:00:00.000Z',
  seoTitle: 'Prix d\'un site internet dans les Hautes-Alpes — devis dès 800 € HT',
  seoDescription: 'Combien coûte un site internet professionnel dans les Hautes-Alpes ? Landing page, site vitrine, e-commerce : tarifs transparents dès 800 € HT pour artisans et PME du 05.',
  body,
};

// ── Run ───────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n[Post 9] Creating document "${doc.title}"`);
  console.log(`   Slug : ${doc.slug.current}`);
  console.log(`   Blocks: ${body.length}`);

  // createOrReplace to allow re-runs without duplicate errors
  const result = await client.createOrReplace(doc);
  console.log(`✅ Done — document ${result._id} created (rev ${result._rev})`);
  console.log(`   Preview: https://facenordgraphisme.fr/blog/${doc.slug.current}`);
}

run().catch(err => {
  console.error('\n❌', err.message);
  process.exit(1);
});
