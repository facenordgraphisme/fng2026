/**
 * create-city-pages.mjs
 *
 * Creates 3 city landing pages in Sanity:
 *   • Gap          → /villes/gap-hautes-alpes
 *   • Briançon     → /villes/briancon-hautes-alpes
 *   • Embrun       → /villes/embrun-serre-poncon
 *
 * Run: node scripts/create-city-pages.mjs
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

// ── Helpers ───────────────────────────────────────────────────────────────────

function b(text, style = 'normal') {
  return {
    _type: 'block', _key: uid(), style,
    markDefs: [],
    children: [{ _type: 'span', _key: uid(), marks: [], text }],
  };
}

function bullet(text) {
  return {
    _type: 'block', _key: uid(), style: 'normal',
    listItem: 'bullet', level: 1,
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

// ── City content ──────────────────────────────────────────────────────────────

const GAP = {
  _id: 'city-page-gap',
  _type: 'cityPage',
  city: 'Gap',
  slug: { _type: 'slug', current: 'gap-hautes-alpes' },
  headline: 'Agence web à Gap — Création de site internet dans les Hautes-Alpes',
  intro: 'Face Nord Graphisme accompagne les artisans, commerçants et PME de Gap avec des sites web performants, optimisés SEO, livrés à partir de 800 € HT.',
  seoTitle: 'Agence web Gap (05) — Création site internet | Face Nord Graphisme',
  seoDescription: 'Création de site internet à Gap dans les Hautes-Alpes. Site vitrine, e-commerce, SEO local : devis gratuit sous 48 h pour les artisans et PME de la préfecture du 05.',
  body: [
    b('Pourquoi choisir une agence web locale à Gap ?', 'h2'),
    b('Gap est la préfecture des Hautes-Alpes et le centre économique du département. Avec plus de 38 000 habitants et un bassin de vie qui dépasse les 60 000 personnes (communes de l\'agglomération incluses), Gap concentre une densité d\'artisans, commerçants, professions libérales et PME parmi les plus importantes du département. Pour ces entreprises, être visible sur Google dans les recherches locales — « plombier Gap », « restaurant Gap 05 », « architecte Gap » — est directement lié au chiffre d\'affaires.'),
    b('Face Nord Graphisme est basée à Puy-Sanières (15 min d\'Embrun, 45 min de Gap) et travaille régulièrement avec des entreprises gapençaises. Nous connaissons le tissu économique local, la saisonnalité des activités alpines et les spécificités du marché des Hautes-Alpes. Cette proximité se traduit concrètement : pas de délai de communication, disponibilité pour un rendez-vous en visio ou en présentiel, et une stratégie digitale adaptée à votre contexte local.'),

    b('Les types d\'entreprises que nous accompagnons à Gap', 'h2'),
    bullet('Artisans du bâtiment (maçons, électriciens, plombiers, menuisiers, couvreurs) : site vitrine avec galerie de réalisations et formulaire de devis'),
    bullet('Commerces de centre-ville : boutiques, épiceries spécialisées, librairies, fleuristes — site avec catalogue produits ou click & collect'),
    bullet('Professions libérales : médecins, kinésithérapeutes, ostéopathes, experts-comptables, avocats — page de présentation avec prise de rendez-vous'),
    bullet('Restaurateurs et traiteurs : menu en ligne, réservation de table, actualités et événements'),
    bullet('Prestataires de services : agences immobilières, cabinets d\'assurance, auto-écoles, centres de formation — site vitrine multi-services'),
    bullet('Associations et structures publiques : sites institutionnels, portails d\'information locale'),

    b('Création de site internet à Gap : ce qui est inclus', 'h2'),
    b('Quelle que soit la formule choisie, voici ce qui est systématiquement inclus dans nos projets pour les entreprises gapençaises :'),
    bullet('Design graphique sur-mesure aligné avec votre identité visuelle (logo, couleurs, typographie)'),
    bullet('Responsive mobile natif — optimisé pour les recherches sur smartphone à Gap et dans l\'agglo'),
    bullet('SEO on-page : balises title et meta, H1 unique, images compressées en WebP, sitemap XML soumis à Google'),
    bullet('Score PageSpeed Mobile > 85/100 garanti à la livraison (Core Web Vitals conformes)'),
    bullet('HTTPS, mentions légales et politique de confidentialité conformes RGPD'),
    bullet('Propriété totale du code et de l\'hébergement — aucun abonnement obligatoire'),
    bullet('Devis détaillé sous 48 h, sans engagement'),

    b('Tarifs pour les entreprises de Gap', 'h2'),
    b('Nos tarifs sont transparents et pensés pour être accessibles aux PME et artisans du 05 :'),
    bullet('Landing page ou site one-page : à partir de 800 € HT — idéal pour une activité simple ou une offre saisonnière'),
    bullet('Site vitrine complet (5 à 10 pages + blog) : 1 200 à 2 500 € HT — pour une présentation complète de votre activité'),
    bullet('Site avec réservation en ligne ou e-commerce léger : 2 500 à 5 000 € HT'),
    b('Ces tarifs incluent le design, le développement, l\'optimisation SEO de base et un mois de suivi après mise en ligne. Pour comparer avec le marché et comprendre ce qui fait varier le prix d\'un projet web, consultez notre guide complet.'),

    b('Gap et le SEO local : les requêtes à ne pas manquer', 'h2'),
    b('Dans les Hautes-Alpes, les requêtes locales à fort intent d\'achat (celles qui génèrent directement des appels et des contacts) suivent des patterns prévisibles. Pour une entreprise gapençaise, les recherches les plus fréquentes et les plus rentables à capturer sont :'),
    bullet('« [métier] Gap » — plombier Gap, électricien Gap, notaire Gap, restaurant Gap'),
    bullet('« [métier] Hautes-Alpes 05 » — artisan hautes-alpes, agence immobilière hautes-alpes'),
    bullet('« [métier] près de Gap » — utilisée par les habitants des communes périphériques'),
    bullet('« [produit/service] Gap » — fenêtres PVC Gap, cuisine équipée Gap, cours de yoga Gap'),
    b('Pour chacune de ces requêtes, votre classement dépend de trois leviers : votre fiche Google Business Profile (GBP), les avis Google récents, et votre site web technique. Un site lent ou mal optimisé vous fera perdre des positions face à des concurrents qui ont fait l\'effort d\'optimiser le leur.'),

    b('Comment obtenir un devis pour votre projet à Gap ?', 'h2'),
    numbered('Complétez le formulaire de contact en décrivant votre projet (type de site, nombre de pages, fonctionnalités souhaitées)'),
    numbered('Nous vous répondons sous 48 h avec une estimation détaillée et sans engagement'),
    numbered('Si le devis vous convient, nous planifions un appel de cadrage de 30 minutes pour préciser les détails'),
    numbered('Le projet démarre dès validation du devis — les délais typiques vont de 1 semaine (landing page) à 4 semaines (site complet)'),

    spokeCard('Guide tarifaire', 'Combien coûte un site internet dans les Hautes-Alpes ?', 'Tarifs détaillés par type de site, ce qui fait varier le prix et l\'impact de l\'IA sur les coûts en 2026.', '/blog/prix-site-internet-artisan-pme-hautes-alpes', 'Voir les tarifs →'),
    spokeCard('SEO Local', 'SEO local dans les Hautes-Alpes : le guide complet', 'Une fois votre site en ligne, optimisez votre visibilité sur Google Maps et dans le Local Pack de Gap.', '/blog/seo-local-hautes-alpes-artisans-pme', 'Lire le guide SEO →'),
    spokeCard('Google Business Profile', 'Optimiser sa fiche GBP à Gap', 'La fiche GBP est votre premier levier de visibilité locale à Gap — créez-la ou optimisez-la avec ce guide.', '/blog/gbp-artisans-hautes-alpes', 'Optimiser ma fiche →'),

    faqBlock('FAQ — Agence web à Gap', [
      {
        q: 'Face Nord Graphisme intervient-elle directement à Gap ?',
        a: 'Oui. Nous sommes basés à Puy-Sanières (entre Embrun et Gap) et travaillons régulièrement avec des entreprises gapençaises. Les échanges peuvent se faire entièrement à distance (visio, email) ou en présentiel à Gap pour les projets importants.',
      },
      {
        q: 'Quel est le délai pour créer un site pour mon entreprise à Gap ?',
        a: 'Pour une landing page ou un site one-page, comptez 5 à 10 jours ouvrés. Pour un site vitrine complet (5-10 pages + blog), 2 à 4 semaines. Ces délais démarrent dès que vous avez fourni vos textes et photos (ou dès que nous avons commencé la rédaction si vous nous la déléguez).',
      },
      {
        q: 'Est-ce qu\'un site créé par Face Nord Graphisme apparaîtra sur Google pour les recherches à Gap ?',
        a: 'Oui, si les bonnes pratiques SEO sont respectées dès la création. Nous intégrons systématiquement l\'optimisation on-page (balises, structure, vitesse) et vous guidons sur la configuration de Google Business Profile pour les recherches locales à Gap. Le positionnement dans le Local Pack de Google dépend aussi du nombre et de la qualité de vos avis Google.',
      },
      {
        q: 'Puis-je modifier moi-même le contenu de mon site après livraison ?',
        a: 'Oui. Tous nos sites incluent un CMS (système de gestion de contenu) que vous pouvez utiliser sans connaissance technique. Nous faisons systématiquement une formation de 1 h à la prise en main après livraison.',
      },
      {
        q: 'Proposez-vous un service de maintenance pour les sites des entreprises de Gap ?',
        a: 'Oui. Un suivi de 30 jours est inclus après chaque mise en ligne. Au-delà, des forfaits de maintenance mensuelle sont disponibles (mises à jour sécurité, sauvegardes, petites modifications) à partir de 30 € HT/mois.',
      },
    ]),
  ],
};

const BRIANCON = {
  _id: 'city-page-briancon',
  _type: 'cityPage',
  city: 'Briançon',
  slug: { _type: 'slug', current: 'briancon-hautes-alpes' },
  headline: 'Agence web à Briançon — Création de site internet Hautes-Alpes',
  intro: 'Face Nord Graphisme crée des sites web pour les artisans, commerçants et hôteliers du secteur briançonnais. Présence locale, tarifs accessibles, sites optimisés pour les recherches estivales et hivernales.',
  seoTitle: 'Agence web Briançon (05) — Création site internet | Face Nord Graphisme',
  seoDescription: 'Création de site internet à Briançon dans les Hautes-Alpes. Sites vitrine, e-commerce et réservation pour artisans, commerçants et hôteliers du Briançonnais — devis gratuit sous 48 h.',
  body: [
    b('Briançon : une économie à double saisonnalité qui exige une présence en ligne solide', 'h2'),
    b('Briançon, ville fortifiée classée au patrimoine mondial de l\'UNESCO, est l\'une des villes d\'altitude les plus hautes d\'Europe (1 326 m). Avec environ 12 000 habitants et un bassin économique qui attire chaque année des centaines de milliers de touristes (ski en hiver à Serre-Chevalier, randonnée et vélo en été), les entreprises briançonnaises font face à un défi particulier : être trouvables en toutes saisons, par une clientèle à la fois locale et internationale.'),
    b('La double saisonnalité — hiver décembre-avril / été juin-septembre — crée deux pics de demande intenses entrecoupés de périodes plus creuses. Un site web performant, mis à jour et bien positionné sur Google et Google Maps est l\'outil le plus efficace pour capter les touristes qui planifient leur séjour en ligne, souvent 2 à 6 semaines à l\'avance.'),

    b('Les entreprises que nous accompagnons à Briançon', 'h2'),
    bullet('Hôtels, gîtes, chalets et chambres d\'hôtes : site de réservation directe pour réduire les commissions Booking/Airbnb'),
    bullet('Moniteurs de ski, guides de haute montagne et prestataires outdoor : site vitrine avec module de réservation en ligne'),
    bullet('Restaurateurs et traiteurs : menu en ligne, réservation de table, actualités saison'),
    bullet('Commerces de sport et de montagne (location, vente, réparation) : catalogue produits et horaires saisonniers'),
    bullet('Artisans du bâtiment : galerie de réalisations, formulaire de devis, mise en avant des avis Google'),
    bullet('Professions libérales et de santé : médecins, kinésithérapeutes, dentistes — page de présentation et prise de rendez-vous'),

    b('Les enjeux spécifiques d\'un site web pour Briançon', 'h2'),
    b('Un site pour une entreprise briançonnaise doit répondre à plusieurs défis que n\'ont pas les sites génériques :'),
    bullet('Bilingue ou multilingue : une part significative de votre clientèle ski est anglophone, néerlandophone ou italienne (Briançon est à 20 min de la frontière italienne). Une version anglaise basique peut doubler vos contacts internationaux.'),
    bullet('Adapté aux recherches depuis les smartphones en montagne : connexion 4G parfois limitée, nécessité d\'un site ultra-rapide (LCP < 2 s) pour ne pas perdre les visiteurs impatients.'),
    bullet('Gestion de la saisonnalité dans le contenu : la même entreprise peut offrir des activités complètement différentes en été et en hiver — votre site doit le refléter clairement.'),
    bullet('Liens vers les remontées mécaniques, offices du tourisme et stations partenaires pour crédibiliser votre offre.'),

    b('Référencement local à Briançon : être trouvé sur Google Maps', 'h2'),
    b('Pour une activité touristique à Briançon, l\'enjeu principal est d\'apparaître dans le Local Pack de Google (les 3 premiers résultats avec carte) pour les requêtes à fort intent comme « moniteur ski Briançon », « hôtel Serre-Chevalier », « restaurant Briançon » ou « guide randonnée Écrins ». Pour cela, trois leviers sont indispensables :'),
    numbered('Une fiche Google Business Profile complète, vérifiée et régulièrement mise à jour (photos, horaires saisonniers, publications)'),
    numbered('Un site web rapide et mobile-first avec les balises SEO correctement renseignées et les données structurées Schema.org'),
    numbered('Un flux régulier d\'avis Google authentiques — chaque avis récent génère en moyenne 600 impressions et améliore votre classement dans les résultats locaux'),

    b('Tarifs pour les entreprises du Briançonnais', 'h2'),
    bullet('Landing page saisonnière (1 page, offre spécifique été ou hiver) : à partir de 800 € HT'),
    bullet('Site vitrine complet (présentation, services, galerie, contact) : 1 200 à 2 500 € HT'),
    bullet('Site avec réservation en ligne intégrée (activités, hébergement) : 2 500 à 5 000 € HT'),
    bullet('Option multilingue français + anglais : +30 à 40 % du tarif de base'),

    spokeCard('Réservation en ligne', 'Digitaliser ses réservations dans les Hautes-Alpes', 'Guide pratique pour automatiser vos réservations, réduire les no-shows et capter les clients qui réservent la nuit depuis leur smartphone.', '/blog/digitaliser-reservations-tourisme-hautes-alpes', 'Lire le guide →'),
    spokeCard('Visibilité en ligne', 'Booster sa visibilité en ligne dans les Hautes-Alpes', 'La stratégie complète : GBP, avis Google, site mobile-first, SEO local — pour être trouvé toute l\'année à Briançon.', '/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes', 'Voir la stratégie →'),
    spokeCard('Prix site internet', 'Combien coûte un site internet dans les Hautes-Alpes ?', 'Tarifs détaillés, ce qui fait varier le prix, impact de l\'IA : le guide complet pour budgéter votre projet web.', '/blog/prix-site-internet-artisan-pme-hautes-alpes', 'Voir les tarifs →'),

    faqBlock('FAQ — Agence web à Briançon', [
      {
        q: 'Faites-vous des sites web en anglais pour les clients étrangers à Briançon ?',
        a: 'Oui. Nous proposons des sites bilingues français/anglais, avec une gestion séparée des contenus par langue depuis le CMS. Pour les entreprises qui accueillent une clientèle italienne (proche de la frontière), une version italienne est également possible. La traduction professionnelle est incluse ou facturée en option selon le volume de texte.',
      },
      {
        q: 'Pouvez-vous intégrer un système de réservation directe pour éviter les commissions Booking ou Airbnb ?',
        a: 'Oui. Nous intégrons des modules de réservation directe compatibles avec les systèmes de disponibilités standards (iCal, PMS hôtelier). Un site avec réservation directe amortit son coût en quelques mois si vous capturez ne serait-ce que 5 à 10 réservations qui seraient autrement passées par Booking (à 15-18 % de commission).',
      },
      {
        q: 'Comment gérer les changements d\'horaires entre la saison été et la saison hiver sur mon site ?',
        a: 'Avec le CMS autonome fourni avec chaque site, vous pouvez modifier vos horaires, vos offres et vos tarifs vous-même, à tout moment, depuis votre téléphone. Nous vous formons à cette gestion lors de la livraison du site.',
      },
      {
        q: 'Mon activité est très saisonnière — est-ce que ça vaut quand même la peine d\'investir dans un site professionnel ?',
        a: 'Encore plus. Une activité saisonnière concentre ses revenus sur 3 à 5 mois — chaque client manqué pendant cette fenêtre représente un manque à gagner maximal. Un site performant, bien positionné sur Google, travaille 24 h/24 pendant et avant les saisons. Les touristes planifient leur séjour en ligne des semaines à l\'avance : si vous n\'êtes pas visible à ce moment-là, le concurrent l\'est.',
      },
    ]),
  ],
};

const EMBRUN = {
  _id: 'city-page-embrun',
  _type: 'cityPage',
  city: 'Embrun',
  slug: { _type: 'slug', current: 'embrun-serre-poncon' },
  headline: 'Agence web à Embrun et Serre-Ponçon — Votre partenaire digital local',
  intro: 'Face Nord Graphisme est basée à Puy-Sanières, à 5 minutes d\'Embrun. Nous créons des sites web pour les artisans, commerçants et prestataires touristiques du secteur Serre-Ponçon depuis plus de 10 ans.',
  seoTitle: 'Agence web Embrun / Serre-Ponçon (05) — Face Nord Graphisme',
  seoDescription: 'Agence web basée à Embrun (Puy-Sanières). Création de site internet pour artisans et prestataires touristiques du secteur Serre-Ponçon — devis gratuit, disponible en présentiel.',
  body: [
    b('Face Nord Graphisme : votre agence web de proximité à Embrun', 'h2'),
    b('Nous ne sommes pas une agence parisienne qui prétend « accompagner les artisans locaux ». Face Nord Graphisme est basée à Puy-Sanières, à 5 minutes d\'Embrun, sur les rives du lac de Serre-Ponçon. Depuis plus de 10 ans, nous accompagnons les entreprises locales — artisans, commerçants, hôteliers, prestataires de loisirs — pour construire leur présence en ligne avec des outils performants et des tarifs adaptés à la réalité économique des Hautes-Alpes.'),
    b('Cette proximité n\'est pas anecdotique. Nous pouvons rencontrer nos clients en présentiel à Embrun, Chorges, Savines-le-Lac, Guillestre ou Gap. Nous connaissons la saisonnalité du lac de Serre-Ponçon, les spécificités du tourisme nautique et de montagne, et les défis des entreprises locales face à une concurrence de plus en plus digitalisée.'),

    b('Serre-Ponçon : un territoire touristique à fort potentiel digital', 'h2'),
    b('Le lac de Serre-Ponçon est l\'un des plus grands lacs artificiels d\'Europe occidentale et accueille plus de 500 000 visiteurs par an. En été, kitesurf, voile, kayak, randonnée et VTT ; en hiver, ski à Orcières-Merlette, ski de fond dans l\'Embrunais et tourisme thermal à Chorges. Cette double saisonnalité crée des opportunités commerciales importantes pour les entreprises locales — à condition d\'être trouvables en ligne au bon moment.'),
    b('Selon les données Google Trends pour le secteur, les recherches liées au lac de Serre-Ponçon atteignent leur pic 3 à 6 semaines avant les vacances d\'été — principalement depuis des smartphones, souvent le soir après 20 h. Un prestataire de location de bateaux ou un hébergement qui n\'apparaît pas dans ces recherches laisse passer des dizaines de réservations potentielles chaque semaine de haute saison.'),

    b('Nos réalisations dans le secteur d\'Embrun', 'h2'),
    b('Voici les types de projets que nous réalisons pour les entreprises du secteur :'),
    bullet('Sites de prestataires nautiques et activités outdoor : location de paddles, clubs de voile, guides VTT, écoles de kitesurf sur le lac'),
    bullet('Hébergements et locations saisonnières : chambres d\'hôtes, gîtes, camping, résidences de vacances — avec modules de réservation directe'),
    bullet('Artisans du bâtiment et de la rénovation : maçons, charpentiers, électriciens — galerie de réalisations et formulaires de devis'),
    bullet('Commerces et épiceries locales : présence en ligne, horaires, click & collect'),
    bullet('Praticiens de santé et professions libérales basés à Embrun, Chorges, Guillestre'),

    b('Disponibilité et réactivité : l\'avantage de l\'agence locale', 'h2'),
    b('Travailler avec une agence locale, c\'est avoir un interlocuteur disponible rapidement et qui comprend votre contexte sans qu\'on lui explique. Pas besoin de décrire ce qu\'est le lac de Serre-Ponçon, la clientèle des Orres ou les enjeux de la saison estivale dans l\'Embrunais : on le vit au quotidien, comme vous.'),
    b('Concrètement, cela se traduit par :'),
    bullet('Réunion de cadrage possible en présentiel à Embrun ou en visio — à votre convenance'),
    bullet('Réactivité sur les modifications urgentes en haute saison (changement de tarifs, mise à jour des disponibilités, ajout d\'une offre promotionnelle)'),
    bullet('Connaissance des annuaires et médias locaux pour votre référencement (Hautes-Alpes Tourisme, Serre-Ponçon Tourisme, Embrun Agglo, La Provence, Dauphiné Libéré)'),
    bullet('Accompagnement dans la durée : pas d\'agence qui disparaît après livraison'),

    b('Tarifs pour les entreprises d\'Embrun et du secteur Serre-Ponçon', 'h2'),
    bullet('Landing page / site one-page (idéal pour une activité nautique ou saisonnière) : à partir de 800 € HT'),
    bullet('Site vitrine complet avec blog (hébergement, prestataire outdoor, artisan) : 1 200 à 2 500 € HT'),
    bullet('Site avec réservation en ligne ou e-commerce (activités, locations, produits locaux) : 2 500 à 5 000 € HT'),
    b('Un devis précis et gratuit vous sera communiqué sous 48 h après que vous nous ayez décrit votre projet. Pour les clients du secteur Embrun-Serre-Ponçon, un rendez-vous en présentiel est possible à tout moment.'),

    {
      _type: 'block', _key: uid(), style: 'blockquote',
      markDefs: [],
      children: [{ _type: 'span', _key: uid(), marks: [], text: '"Être à 5 minutes d\'Embrun, c\'est comprendre que votre pic de réservations arrive avant le 14 juillet, pas après. On optimise votre site pour que vous soyez trouvable quand vos clients planifient — pas quand ils sont déjà chez le concurrent."' }],
    },

    spokeCard('Réservation en ligne', 'Digitaliser ses réservations dans les Hautes-Alpes', 'Automatisez vos réservations, réduisez les no-shows de 20 à 40 % et capturez les clients qui réservent depuis leur smartphone le soir.', '/blog/digitaliser-reservations-tourisme-hautes-alpes', 'Lire le guide →'),
    spokeCard('Avis Google', 'Gérer ses avis Google pour artisans et PME', 'Chaque avis Google génère 600 impressions en moyenne. Stratégie de collecte, réponses types et gestion des avis négatifs.', '/blog/gerer-avis-google-artisans-pme-hautes-alpes', 'Voir la stratégie →'),
    spokeCard('Prix site internet', 'Combien coûte un site internet dans les Hautes-Alpes ?', 'Guide complet sur les tarifs, ce qui fait varier le prix et l\'impact de l\'IA sur les coûts de création web en 2026.', '/blog/prix-site-internet-artisan-pme-hautes-alpes', 'Voir les tarifs →'),

    faqBlock('FAQ — Agence web à Embrun et Serre-Ponçon', [
      {
        q: 'Face Nord Graphisme peut-elle se déplacer à Embrun pour notre projet ?',
        a: 'Oui, absolument. Étant basés à Puy-Sanières (5 min d\'Embrun), nous proposons des rendez-vous en présentiel pour le cadrage du projet, la présentation des maquettes et la formation au CMS. La plupart des échanges se font à distance (visio, email, partage d\'écran), mais la proximité géographique permet d\'intervenir rapidement si besoin.',
      },
      {
        q: 'Mon activité est liée au lac de Serre-Ponçon — comment être visible en ligne pour les touristes qui planifient leur séjour ?',
        a: 'Il faut être présent au moment où ils cherchent, c\'est-à-dire 3 à 6 semaines avant les vacances. Cela passe par un site web rapide et bien indexé par Google, une fiche Google Business Profile complète avec photos récentes et activités, et des avis récents qui rassurent les futurs visiteurs. Nous configurons également les données structurées Schema.org pour que vos activités et vos horaires apparaissent directement dans les résultats Google.',
      },
      {
        q: 'Puis-je avoir un site en français ET en anglais pour capter les touristes étrangers ?',
        a: 'Oui. Nous proposons des sites bilingues. Sur le secteur de Serre-Ponçon, une version anglaise de votre site peut faire la différence auprès des touristes néerlandais, anglais et allemands qui représentent une part significative des visiteurs estivaux du lac.',
      },
      {
        q: 'Je vends des produits locaux (miel, fromage, lavande) — pouvez-vous créer une boutique en ligne ?',
        a: 'Oui. Un e-commerce léger (5 à 30 produits) est inclus dans notre offre "réservation/e-commerce" à partir de 2 500 € HT. Cela inclut un panier sécurisé (Stripe), la gestion des stocks depuis le CMS, et les emails automatiques de confirmation de commande. Idéal pour les producteurs locaux qui veulent vendre en direct sans passer par des plateformes comme Etsy ou Amazon.',
      },
      {
        q: 'Combien de temps faut-il pour créer un site pour ma location saisonnière à Serre-Ponçon ?',
        a: 'Pour une landing page simple (présentation + réservation directe via lien Airbnb/Booking ou formulaire), comptez 5 à 10 jours. Pour un site complet avec galerie, disponibilités en temps réel et paiement en ligne, 4 à 6 semaines. Nous planifions toujours les mises en ligne hors des pics saisonniers (pas en juillet ni en décembre) pour maximiser la stabilité au lancement.',
      },
    ]),
  ],
};

// ── Run ───────────────────────────────────────────────────────────────────────

async function run() {
  const pages = [GAP, BRIANCON, EMBRUN];
  console.log(`\n[City Pages] Creating ${pages.length} documents…`);

  for (const page of pages) {
    console.log(`  ${page.city} → /villes/${page.slug.current} (${page.body.length} blocks)`);
    await client.createOrReplace(page);
  }

  console.log('\n✅ Done — 3 city pages created:');
  pages.forEach(p => console.log(`   https://facenordgraphisme.fr/villes/${p.slug.current}`));
}

run().catch(err => {
  console.error('\n❌', err.message);
  process.exit(1);
});
