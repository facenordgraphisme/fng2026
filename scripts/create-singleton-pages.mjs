/**
 * create-singleton-pages.mjs
 *
 * Creates/updates the 4 singleton page documents in Sanity, seeded with the
 * exact copy that was previously hardcoded in the React components:
 *   • homepage    → src/app/page.tsx + src/components/HomeHero.tsx
 *   • aboutPage   → src/app/a-propos/page.tsx
 *   • contactPage → src/app/contact/page.tsx
 *   • faqPage     → src/app/faq/page.tsx
 *
 * Fixed document IDs match the singleton structure in sanity.config.ts.
 * Safe to re-run: createOrReplace() is idempotent.
 *
 * Run: node scripts/create-singleton-pages.mjs
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

// ── Documents ─────────────────────────────────────────────────────────────────

const HOMEPAGE = {
  _id: 'homepage',
  _type: 'homepage',
  heroEyebrow: 'Création de sites internet',
  heroHeadline: 'Propulsez votre entreprise vers de nouveaux sommets',
  heroSubtext: 'Face Nord Graphisme propulse votre activité locale grâce à un site web performant, moderne et taillé sur-mesure pour vos clients.',
  heroPrimaryCtaLabel: 'Démarrer un projet',
  heroSecondaryCtaLabel: 'Voir les projets',
  aboutHeading: 'Passionné par le web, ancré à Embrun',
  aboutParagraph1: "Au-delà de ma passion pour l'informatique et les nouvelles technologies, je suis un amoureux de la montagne et des sports outdoor. Je comprends et partage les valeurs de notre magnifique région des Hautes-Alpes.",
  aboutParagraph2: "Professionnel du tourisme, commerce local ou association sportive, je saurai mettre en valeur votre activité en harmonie avec l'esprit et le cadre exceptionnel de notre territoire.",
  aboutCtaLabel: 'En savoir plus',
  servicesHeading: 'Ce que je peux faire pour vous',
  servicesParagraph: 'Un site web professionnel pour attirer, convaincre et développer votre activité localement ou à distance.',
  servicesCtaLabel: 'Toutes les prestations',
  cityStripEyebrow: 'Interventions locales',
  cityStripHeading: 'Basé à Embrun, actif dans tout le 05',
  cities: [
    { _key: uid(), name: 'Gap', href: '/villes/gap-hautes-alpes', desc: 'Commerces & professions libérales' },
    { _key: uid(), name: 'Briançon', href: '/villes/briancon-hautes-alpes', desc: 'Tourisme & double saisonnalité' },
    { _key: uid(), name: 'Embrun & Serre-Ponçon', href: '/villes/embrun-serre-poncon', desc: 'Producteurs & prestataires outdoor' },
  ],
  portfolioHeading: 'Dernières réalisations',
  portfolioCtaLabel: 'Voir tous les projets',
  finalCtaHeading: 'Gagnez en visibilité, crédibilité, clients',
  finalCtaParagraph: 'Je suis à votre écoute pour échanger autour de vos besoins, idées ou questions. Contactez-moi pour un devis gratuit et donnons vie à votre projet.',
  finalCtaLabel: 'Discutons de votre projet',
  seoTitle: 'Création de Site Internet Hautes-Alpes (Embrun, Gap)',
  seoDescription: 'Expert en création de site web, e-commerce et SEO basé à Embrun dans les Hautes-Alpes. Accompagnement local sur Gap, Guillestre, Briançon et alentours.',
};

const ABOUT_PAGE = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroHeading: 'Vous souhaitez créer un site internet dans les Hautes-Alpes ?',
  heroParagraph1: "Pour mettre en valeur votre entreprise vous souhaitez un site web qui a autant de panache que l'ascension d'une montagne ? Vous êtes au bon endroit. La personne qui va vous créer un site internet dans les Hautes-Alpes, c'est moi, François-Xavier Pin.",
  heroParagraph2: "Je vis à Puy-Sanières dans les Alpes (05). C'est un magnifique village perché, surplombant le lac de Serre-Ponçon. Fervent passionné de ski, de vélo ainsi que de développement web, je suis convaincu que la montagne et la création de sites web partagent cette même quête de dépassement, cette même passion pour l'aventure et l'innovation.",
  section1Heading: 'Une expertise locale pour créer un site web dans les Hautes-Alpes.',
  section1Body: "Installé aux portes d'Embrun, entre Gap et Briançon, je suis parfaitement positionné pour comprendre les besoins spécifiques des entreprises locales et des projets web de notre région. Que vous soyez une entreprise cherchant à renforcer votre présence en ligne ou un particulier souhaitant concrétiser un projet web, je suis là pour vous accompagner à chaque étape. J'aime quand un projet me permet de collaborer avec des artisans et entreprises des Hautes-Alpes (Briançon, Guillestre, Embrun, Gap ou encore Tallard), mais je peux aussi proposer mes services à distance.",
  section2Heading: 'Le Webdesign : une passion devenue métier.',
  section2Body1: "Passionné d'informatique depuis mon plus jeune âge, j'ai toujours été fasciné par les nouvelles technologies. J'avais 15 ans lorsque j'ai fait mes premiers pas dans le monde du balisage HTML. Une expérience précoce qui a marqué le début d'un véritable intérêt pour le web design et le développement.",
  section2Body2: "Après avoir passé une dizaine d'années à travailler dans le secteur saisonnier en montagne, j'ai converti ma passion en métier. Mon expertise me permet désormais de vous accompagner partout en France.",
  section3Heading: 'Mes compétences techniques au service de votre identité en ligne.',
  section3Body: "Ma formation initiale sur la suite Adobe et la création de sites WordPress m'ont permis d'acquérir des bases solides en design et en gestion de contenu. Par la suite, j'ai approfondi mes connaissances en apprenant les différents langages de développement front-end. C'est ainsi que je suis capable de créer des sites web au design unique, sans aucune limite créative ou technique. J'aime relever des défis et je suis prêt pour le vôtre.",
  section4Heading: 'Pourquoi me choisir pour créer un site internet ?',
  section4Intro: "À l'ère du numérique, avoir un site internet est bien plus qu'une simple présence en ligne. C'est un investissement stratégique qui contribuera à développer votre activité :",
  section4Checklist: [
    'Visible 24/24h et 7/7j, soyez accessible à tout moment.',
    'Attirez et convertissez de nouveaux clients grâce à une expérience utilisateur fluide.',
    'Renforcez votre crédibilité avec un site moderne et professionnel.',
    'Démarquez-vous des concurrents grâce à un design unique.',
  ],
  section4CtaLabel: 'Contactez-moi',
  seoTitle: 'À Propos | Développeur Web Hautes-Alpes (Embrun)',
  seoDescription: "Découvrez Face Nord Graphisme, votre partenaire local pour la création de sites internet dans les Hautes-Alpes. Basé à Embrun, j'accompagne les pros du 05.",
};

const CONTACT_PAGE = {
  _id: 'contactPage',
  _type: 'contactPage',
  eyebrow: 'Me Contacter',
  heading: 'Prêt à atteindre de nouveaux sommets ?',
  introParagraph: "Vous êtes basé à Embrun, à Gap, à Briançon ou ailleurs dans les Hautes-Alpes ? Vous cherchez à créer un site internet professionnel ou une boutique en ligne pour développer votre activité ? Je vous accompagne dans la réalisation de votre projet digital.",
  phoneLabel: 'Par téléphone',
  phoneNumber: '06 51 11 39 28',
  phoneHref: 'tel:0651113928',
  emailLabel: 'Par e-mail',
  emailAddress: 'contact@facenordgraphisme.fr',
  addressLabel: 'Mon adresse',
  addressLines: ['Basé à Puy-Sanières,', '45 Impasse du Serre', '05200 Puy-Sanières'],
  mapsUrl: 'https://www.google.com/maps/place/Le+Serre,+05200+Puy-Sani%C3%A8res',
  mapsLinkLabel: 'Me trouver sur Google Maps',
  seoTitle: 'Contactez une agence web dans les Hautes-Alpes | Embrun',
  seoDescription: 'Un projet de site web dans le 05 ? Contactez Face Nord Graphisme, basé à Embrun. Devis gratuit pour Gap, Briançon, Guillestre et alentours.',
};

const FAQ_PAGE = {
  _id: 'faqPage',
  _type: 'faqPage',
  eyebrow: 'FAQ',
  heading: 'Foire Aux Questions',
  introParagraph: 'Retrouvez ici les réponses aux questions les plus fréquentes concernant la création de sites internet et mes prestations web.',
  items: [
    {
      _key: uid(),
      question: "Quel est le prix pour la création d'un site internet ?",
      answer: "Chaque projet est unique ! Le tarif dépend de vos besoins (site vitrine simple, e-commerce complexe, refonte, etc.). Un site vitrine de base peut démarrer autour de 1000€, tandis qu'une boutique en ligne complète nécessitera un budget plus important. Contactez-moi pour obtenir un devis gratuit et personnalisé.",
    },
    {
      _key: uid(),
      question: 'Combien de temps faut-il pour créer un site web ?',
      answer: 'En général, il faut compter entre 3 et 6 semaines pour un site vitrine, et entre 2 et 3 mois pour un site e-commerce, sous réserve de validation rapide des étapes et de la fourniture des contenus (textes, photos, logos).',
    },
    {
      _key: uid(),
      question: 'Est-ce que je pourrai modifier mon site moi-même ?',
      answer: "Absolument. Tous mes sites sont conçus avec des CMS (systèmes de gestion de contenu) modernes et intuitifs. Une fois le site en ligne, je vous fournis une formation pour que vous soyez autonome sur la modification de vos textes, images, ou l'ajout d'articles/produits.",
    },
    {
      _key: uid(),
      question: 'Comment se passe la maintenance du site une fois en ligne ?',
      answer: 'Vous pouvez choisir de gérer la maintenance vous-même, mais je recommande fortement de souscrire à un forfait de maintenance mensuel ou annuel. Cela inclut les mises à jour techniques, de sécurité, les sauvegardes régulières et une assistance en cas de problème technique.',
    },
    {
      _key: uid(),
      question: 'Mon site sera-t-il bien référencé sur Google ?',
      answer: "Dès la création, votre site sera optimisé techniquement pour le SEO (vitesse, balises, structure, images). C'est ce qu'on appelle le SEO technique On-Page. Cependant, pour arriver en première position sur des mots-clés très concurrentiels, il faudra envisager une stratégie SEO complète sur le long terme (rédaction de contenu régulier, stratégie de liens entrants).",
    },
    {
      _key: uid(),
      question: 'Travaillez-vous uniquement avec des clients dans les Hautes-Alpes ?',
      answer: "Bien que j'apprécie particulièrement travailler avec les acteurs locaux autour d'Embrun, Gap, Briançon ou Guillestre pour pouvoir se rencontrer physiquement, je suis tout à fait en mesure d'accompagner des clients partout en France. Les outils de visio-conférence et de partage d'écran nous permettent de collaborer très efficacement à distance.",
    },
  ],
  closingHeading: "Vous n'avez pas trouvé votre réponse ?",
  closingParagraph: 'N\'hésitez pas à me contacter directement. Je me ferai un plaisir de discuter de votre projet et de répondre à toutes vos interrogations.',
  closingCtaLabel: 'Posez-moi votre question',
  seoTitle: 'Foire Aux Questions (FAQ) | Agence Web Embrun',
  seoDescription: 'Trouvez les réponses à vos questions sur la création de site internet, le SEO, les tarifs et la maintenance web avec Face Nord Graphisme dans les Hautes-Alpes.',
};

// ── Run ───────────────────────────────────────────────────────────────────────

async function run() {
  const docs = [HOMEPAGE, ABOUT_PAGE, CONTACT_PAGE, FAQ_PAGE];
  console.log(`\n[Singleton Pages] Creating/updating ${docs.length} documents…`);

  for (const doc of docs) {
    console.log(`  ${doc._type} (_id: ${doc._id})`);
    await client.createOrReplace(doc);
  }

  console.log('\n✅ Done — 4 pages are now live and editable in Studio:');
  console.log('   /studio → Page d\'accueil / Page À Propos / Page Contact / Page FAQ');
}

run().catch((err) => {
  console.error('\n❌', err.message);
  process.exit(1);
});
