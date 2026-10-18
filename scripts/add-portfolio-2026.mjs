/**
 * add-portfolio-2026.mjs
 *
 * Ajoute les 4 réalisations récentes au portfolio Sanity :
 *   la-montagne-guide, evasionski, voyageurs-des-alpes, outplanners.
 * Les images sont servies depuis public/assets/portfolio/*.webp (imageUrl /
 * galleryUrls), comme les projets existants.
 *
 * Safe to re-run: createOrReplace() is idempotent.
 * Run: node --env-file=.env.local scripts/add-portfolio-2026.mjs
 */

import { createClient } from '@sanity/client';
import crypto from 'crypto';

const client = createClient({
  projectId: 'k4x2bvj1',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => crypto.randomBytes(6).toString('hex');
const block = (text, style = 'normal') => ({
  _type: 'block', _key: key(), style, markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
});
const img = (name) => `/assets/portfolio/${name}.webp`;

const PROJECTS = [
  {
    _id: 'portfolio-la-montagne-guide',
    title: 'La Montagne Guide',
    slug: 'la-montagne-guide',
    link: 'https://www.la-montagne-guide.fr/',
    year: '2026',
    sector: 'Guide de haute montagne',
    tags: ['Guide de montagne', 'Site vitrine', 'Next.js & Sanity'],
    description: "Site vitrine immersif pour Nicolas Draperi, guide de haute montagne UIAGM installé dans les Écrins : alpinisme, ski de randonnée, escalade, cascade de glace et voyages.",
    seoTitle: 'La Montagne Guide — Site de guide de haute montagne (Écrins)',
    seoDescription: "Création du site de Nicolas Draperi, guide de haute montagne dans les Écrins : pages activités, prochaines sorties, blog. Next.js et Sanity, par Face Nord Graphisme.",
    imageUrl: img('lamontagneguide-home'),
    galleryUrls: [img('lamontagneguide-alpinisme'), img('lamontagneguide-sorties'), img('lamontagneguide-guide')],
    relatedSlugs: ['evasionski', 'voyageurs-des-alpes', 'reves-daventures'],
    content: [
      block('Le projet', 'h2'),
      block("Nicolas Draperi est guide de haute montagne (UIAGM / IFMGA) depuis 2011, installé au pied du massif des Écrins. Il exerce de façon indépendante et artisanale : des sorties et des voyages construits sur mesure avec chaque client, de la randonnée glaciaire aux grandes courses, du ski de randonnée à la cascade de glace."),
      block("L'objectif : un site qui fasse rêver dès la première image, qui présente clairement chaque activité et qui donne envie de prendre contact pour construire son aventure."),
      block('Un site immersif, pensé comme une source d\'inspiration', 'h2'),
      block("Design sombre et grandes photos de montagne, typographie forte, navigation simple. Chaque activité — alpinisme, ski, escalade, parapente alpinisme, cascade de glace, voyages — dispose de sa propre page avec niveaux, exemples de courses et conditions."),
      block("« Vivez vos rêves de montagne » — une promesse portée par les images du guide, au cœur de chaque page.", 'blockquote'),
      block('Prochaines sorties et contact direct', 'h2'),
      block("Une page « Prochaines sorties » présente le calendrier des départs filtrable par activité, et un bouton de contact WhatsApp permet d'échanger en un clic avec le guide. Le site est disponible en français et en anglais."),
      block('Technique & référencement', 'h2'),
      block("Site développé en Next.js avec le CMS Sanity : Nicolas met à jour lui-même ses sorties, ses articles de blog et ses ressources. Pages rapides, données structurées et contenus pensés pour les recherches « guide de haute montagne Écrins », « alpinisme Hautes-Alpes » ou « ski de randonnée Écrins »."),
    ],
  },
  {
    _id: 'portfolio-evasionski',
    title: 'ÉvasionSki',
    slug: 'evasionski',
    link: 'https://www.evasionski.fr/',
    year: '2026',
    sector: 'Moniteur de ski de randonnée',
    tags: ['Ski de randonnée', 'SEO', 'Next.js & Sanity'],
    description: "Site de Toni Mancini, moniteur de ski de randonnée dans les Hautes-Alpes : journées, freerando, stages et raids du Queyras aux Écrins, jusqu'en Norvège, avec calendrier des départs.",
    seoTitle: 'ÉvasionSki — Site de moniteur de ski de randonnée (Hautes-Alpes)',
    seoDescription: "Création du site ÉvasionSki : sorties et raids à ski de randonnée dans le Queyras, les Écrins, l'Ubaye et en Norvège, calendrier des départs. Next.js et Sanity.",
    imageUrl: img('evasionski-home'),
    galleryUrls: [img('evasionski-stages-raids'), img('evasionski-niveau')],
    relatedSlugs: ['la-montagne-guide', 'voyageurs-des-alpes', 'outplanners'],
    content: [
      block('Le projet', 'h2'),
      block("Toni Mancini est moniteur de ski indépendant, diplômé d'État, spécialisé dans le ski de randonnée. Il encadre des journées, des sorties freerando et des stages et raids de plusieurs jours dans le Queyras, la Clarée, les Écrins, l'Ubaye — et jusqu'aux Alpes de Lyngen en Norvège."),
      block("Le site devait présenter une offre riche et variée de façon limpide, et surtout être trouvé par les skieurs qui cherchent une sortie précise dans un massif précis."),
      block('Une architecture pensée pour le référencement', 'h2'),
      block("Chaque type de sortie et chaque raid possède sa propre page, construite pour une recherche précise : « ski de randonnée Queyras », « raid à ski Ubaye », « freerando Les Orres Crévoux »… Un blog complète l'ensemble avec des articles qui répondent aux questions des skieurs (débuter, choisir son matériel, la freerando)."),
      block('Calendrier des départs et auto-évaluation', 'h2'),
      block("Un calendrier présente les prochains départs groupés avec le nombre de places, filtrable par type de sortie. Une page « Évaluer son niveau » aide chaque skieur à choisir la sortie adaptée à ses capacités avant de réserver."),
      block("« Explorez les Alpes en ski de randonnée » — du premier pas en peaux de phoque aux raids les plus engagés.", 'blockquote'),
      block('Technique', 'h2'),
      block("Site Next.js et CMS Sanity : Toni gère lui-même ses dates, ses séjours et ses articles. Pages rapides, données structurées et version anglaise pour la clientèle internationale."),
    ],
  },
  {
    _id: 'portfolio-voyageurs-des-alpes',
    title: 'Voyageurs des Alpes',
    slug: 'voyageurs-des-alpes',
    link: 'https://www.voyageurs-des-alpes.fr/',
    year: '2026',
    sector: 'Agence de voyages à pied',
    tags: ['Refonte', 'Tourisme outdoor', 'WooCommerce'],
    description: "Refonte du site de l'association A.T.L.A.S., agence de randonnées accompagnées fondée par des accompagnateurs en montagne du Pays de Serre-Ponçon : séjours en itinérance, en étoile, en refuge ou en bivouac.",
    seoTitle: 'Voyageurs des Alpes — Refonte de site de séjours randonnée',
    seoDescription: "Refonte du site Voyageurs des Alpes (association A.T.L.A.S., Serre-Ponçon) : nouveau design, catalogue de séjours filtrable, prochains départs et réservation. WordPress & WooCommerce.",
    imageUrl: img('voyageursdesalpes-home'),
    galleryUrls: [img('voyageursdesalpes-sejours'), img('voyageursdesalpes-sejour'), img('voyageursdesalpes-apropos')],
    relatedSlugs: ['evasionski', 'la-montagne-guide', 'gaec-des-valentins'],
    content: [
      block('Le projet', 'h2'),
      block("Voyageurs des Alpes est le site de l'association A.T.L.A.S., une agence de voyage associative fondée par des accompagnateurs en montagne du Pays de Serre-Ponçon. Elle propose des randonnées accompagnées tout compris dans les Alpes du Sud — Queyras, Écrins, Clarée, Ubaye, Monges — mais aussi en Italie, dans les Pyrénées ou au Maroc."),
      block("Le site existant avait vieilli : difficile à parcourir, peu adapté au mobile, et il ne mettait pas assez en avant les prochains départs. L'enjeu de la refonte était de rendre le catalogue lisible et de faciliter la réservation."),
      block('Un nouveau design, centré sur les séjours', 'h2'),
      block("Nouvelle identité visuelle immersive, avec les prochains départs mis en avant dès la page d'accueil. Le catalogue de séjours devient filtrable par niveau, format (itinérance, en étoile, refuge, bivouac), durée, saison, thème et destination : chacun trouve en quelques secondes le voyage qui lui correspond."),
      block("« Des randonnées pensées par des gens qui vivent ici, pour des gens qui veulent en voir plus. »", 'blockquote'),
      block('Fiches séjours et réservation', 'h2'),
      block("Chaque séjour dispose d'une fiche claire : programme, niveau, durée, prix par personne, dates de départ et disponibilités. La réservation s'appuie sur WooCommerce, que l'équipe gère en toute autonomie."),
      block('Une refonte prête pour Google et les IA', 'h2'),
      block("Structure de pages repensée, contenus explicites et données structurées : le site est plus rapide, plus lisible sur mobile, et ses informations clés (séjours, dates, tarifs, zones) sont compréhensibles par Google comme par les assistants IA."),
    ],
  },
  {
    _id: 'portfolio-outplanners',
    title: 'Outplanners',
    slug: 'outplanners',
    link: 'https://www.outplanners.com/',
    year: '2026',
    sector: 'Logiciel SaaS pour les pros du plein air',
    tags: ['Application web', 'SaaS', 'Réservation en ligne'],
    description: "Plateforme SaaS de réservation et de gestion pour les professionnels du plein air : réservation en ligne, planning des guides, paiements Stripe, matériel et facturation dans un seul outil.",
    seoTitle: 'Outplanners — Application web SaaS de réservation outdoor',
    seoDescription: "Conception et développement d'Outplanners, plateforme SaaS de réservation pour les pros du plein air : planning des guides, paiements Stripe, matériel. Next.js.",
    imageUrl: img('outplanners-home'),
    galleryUrls: [img('outplanners-fonctionnalites'), img('outplanners-metiers'), img('outplanners-tarifs')],
    relatedSlugs: ['evasionski', 'la-montagne-guide', 'reves-daventures'],
    content: [
      block('Le projet', 'h2'),
      block("Outplanners est une application web en abonnement (SaaS) destinée aux professionnels du plein air : canyoning, montagne hivernale, ski, escalade, VTT, parapente, kayak et bureaux d'activités. Elle réunit dans un seul outil ce qui est habituellement éparpillé entre un agenda, un tableur, un terminal de paiement et des dizaines de messages."),
      block('Un outil complet, pensé pour le terrain', 'h2'),
      block("Réservation en ligne via un widget intégrable sur le site du prestataire, réservations prises au téléphone ou au comptoir dans le même planning, paiement Stripe, planning d'équipe et vue par guide, gestion du matériel de location, conditions de participation, ventes et fichier clients, facturation automatisée."),
      block("« La plateforme de réservation pensée pour les pros du plein air. »", 'blockquote'),
      block('Un produit qui s\'adapte à chaque métier', 'h2'),
      block("À l'inscription, trois questions suffisent à configurer l'outil : le métier, la taille de l'équipe, la gestion de matériel. Les modules inutiles n'apparaissent tout simplement pas. Trois formules d'abonnement mensuel, essai gratuit de 14 jours sans carte bancaire."),
      block('Conception & développement', 'h2'),
      block("Conception de l'expérience, du site vitrine et de l'application, développement complet en Next.js : tableau de bord, comptes et rôles, paiements et abonnements Stripe, interface utilisable sur mobile par les guides sur le terrain."),
    ],
  },
];

for (const p of PROJECTS) {
  const { slug, ...rest } = p;
  await client.createOrReplace({ _type: 'project', ...rest, slug: { _type: 'slug', current: slug } });
  console.log(`✓ ${p._id}`);
}
