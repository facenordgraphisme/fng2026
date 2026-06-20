/**
 * Script de migration portfolio → Sanity
 * Usage: node scripts/sync-portfolio.mjs
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: 'k4x2bvj1',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: 'skgjCVUfV8G3ydCnjgCQSqUa4KsWOorBreHZHcCC1OEp2DHjfZDg1q2Qp7CsnspOrVGpOuccvuKnNCZedEG7eyMVkQp06ZicPsUKtrnEPg41joJWpJ1D1rtXDJpjUcZyqRpQfnzwzibzyAQW7NTPWyFQk00hmrXhqQXMSaIcqn8NFdFBIPIf',
  useCdn: false,
});

const block = (text, style = 'normal') => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2),
  style,
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text }],
  markDefs: [],
});

const PROJECTS = [
  {
    _id: 'portfolio-gaudineto',
    _type: 'project',
    title: 'Gaudineto',
    slug: { _type: 'slug', current: 'gaudineto' },
    imageUrl: '/assets/portfolio/gaudineto-home.png',
    galleryUrls: [
      '/assets/portfolio/gaudineto-apropos-menu.png',
      '/assets/portfolio/gaudineto-interieur.png',
      '/assets/portfolio/gaudineto-reservation.png',
    ],
    tags: ['Restaurant', 'Site bilingue', 'Identité visuelle'],
    sector: 'Restauration gastronomique',
    year: '2024',
    relatedSlugs: ['linstant-verdon', 'verdon-ebike', 'act-event-pro'],
    link: 'https://gaudineto.fr/',
    description: 'Site bilingue FR/EN et identité visuelle complète pour un restaurant gastronomique à Moustiers-Sainte-Marie, aux portes des Gorges du Verdon.',
    seoTitle: 'Gaudineto — Site bilingue restaurant gastronomique Moustiers-Sainte-Marie | Face Nord Graphisme',
    seoDescription: 'Création du site bilingue FR/EN et de l\'identité visuelle du restaurant Gaudineto à Moustiers-Sainte-Marie (Verdon). Design dark élégant, réservation en ligne, galerie photo.',
    content: [
      block('Le projet', 'h2'),
      block('Gaudineto est un restaurant gastronomique installé dans les murs d\'une ancienne boulangerie du XIVe siècle à Moustiers-Sainte-Marie, village classé parmi les Plus Beaux Villages de France. L\'établissement propose une cuisine créative et raffinée, ancrée dans les produits locaux et la saisonnalité de Provence-Alpes-Côte d\'Azur.'),
      block('La mission était double : créer une identité visuelle forte qui reflète l\'élégance du lieu, et développer un site web bilingue (français/anglais) capable d\'attirer aussi bien la clientèle locale que les touristes internationaux qui visitent les Gorges du Verdon chaque été.'),
      block('Identité visuelle & direction artistique', 'h2'),
      block('Création from scratch du logotype avec le monogramme « G » stylisé, décliné dans une palette crème, or et noir profond. Sélection typographique haut de gamme pour refléter le positionnement gastronomique. La charte graphique a été déclinée sur les menus imprimés, les cartes de visite et les supports digitaux — une cohérence totale entre le print et le web.'),
      block('Site vitrine bilingue FR/EN', 'h2'),
      block('Le site est entièrement bilingue (français/anglais) pour capter la clientèle internationale de passage dans le Verdon. Il intègre une galerie photo immersive des plats et de la salle, la présentation du chef et de sa cuisine, un système de réservation en ligne avec confirmation automatique, et des boutons d\'appel rapide (téléphone, WhatsApp) pour faciliter la prise de contact.'),
      block('Le design dark élégant, avec ses tons crème et or sur fond sombre, traduit visuellement l\'expérience gastronomique : raffinée, lumineuse et mémorable.', 'blockquote'),
      block('SEO local & performances', 'h2'),
      block('Optimisation SEO pour les requêtes « restaurant Moustiers-Sainte-Marie », « gastronomique Gorges du Verdon », « restaurant Provence Verdon ». Balisage LocalBusiness Schema.org avec coordonnées, horaires et avis. Score PageSpeed > 90/100. Le site s\'affiche en première page sur les recherches locales pour le restaurant.'),
    ],
  },
  {
    _id: 'portfolio-gaec-des-valentins',
    _type: 'project',
    title: 'GAEC des Valentins',
    slug: { _type: 'slug', current: 'gaec-des-valentins' },
    imageUrl: '/assets/portfolio/gaecdesvalentins-home.png',
    galleryUrls: [
      '/assets/portfolio/gaecdesvalentins-home-2.png',
      '/assets/portfolio/gaecdesvalentins-colis.png',
      '/assets/portfolio/gaecdesvalentins-activites.png',
    ],
    tags: ['E-Commerce', 'Agritourisme', 'SEO local'],
    sector: 'Agriculture & circuit court',
    year: '2023',
    relatedSlugs: ['reves-daventures', 'linstant-verdon', 'verdon-ebike'],
    link: 'https://gaecdesvalentins.fr/',
    description: 'Boutique e-commerce et site vitrine pour un élevage d\'agneau en circuit court dans les Hautes-Alpes, labellisé Hautes-Alpes Naturellement.',
    seoTitle: 'GAEC des Valentins — E-commerce agneau Hautes-Alpes | Face Nord Graphisme',
    seoDescription: 'Création de la boutique e-commerce et du site vitrine du GAEC des Valentins (Châteauroux-les-Alpes). Vente directe d\'agneau en ligne, label Hautes-Alpes Naturellement, SEO local.',
    content: [
      block('Le projet', 'h2'),
      block('Le GAEC des Valentins est un élevage ovin familial situé à Châteauroux-les-Alpes, dans les Hautes-Alpes, spécialisé dans l\'élevage d\'agneaux de qualité en plein air. Titulaire du label Hautes-Alpes Naturellement, l\'exploitation mise sur la transparence, la proximité et la vente en circuit court — à la ferme, sur les marchés, et désormais en ligne.'),
      block('L\'enjeu principal était de créer un outil numérique qui permette aux éleveurs de vendre leurs colis d\'agneau directement en ligne, tout en racontant l\'histoire de la ferme et en développant l\'agritourisme autour des visites et activités pour les familles.'),
      block('Boutique e-commerce WooCommerce', 'h2'),
      block('Développement d\'une boutique WooCommerce sur-mesure permettant de commander des colis d\'agneau en ligne (colis familiaux, professionnels, formats multiples). Paiement sécurisé via Stripe, gestion des stocks, emails de confirmation automatiques et suivi de commande. La boutique est pensée pour être autonome : les éleveurs la mettent à jour eux-mêmes depuis l\'interface d\'administration WordPress.'),
      block('Site vitrine & agritourisme', 'h2'),
      block('Au-delà de la boutique, le site valorise la vie de la ferme : présentation de l\'élevage, des valeurs (bien-être animal, environnement), des activités à la ferme pour les familles et les scolaires (visite des agneaux, contact avec les animaux chaque samedi). Une section blog permet de partager les actualités de la saison et d\'améliorer le référencement naturel.'),
      block('« Goûtez l\'agneau du GAEC des Valentins, vous en tomberez amoureux » — une promesse de qualité directement de la ferme à votre table.', 'blockquote'),
      block('SEO local & résultats', 'h2'),
      block('Référencement ciblé sur les requêtes « agneau Hautes-Alpes », « vente directe agneau 05 », « colis agneau Embrun », « Hautes-Alpes Naturellement ». Intégration des avis Google (4,9/5) en page d\'accueil pour renforcer la confiance. Le site génère régulièrement des commandes en ligne, notamment depuis Gap, Briançon et la région PACA.'),
    ],
  },
  {
    _id: 'portfolio-linstant-verdon',
    _type: 'project',
    title: 'L\'Instant Verdon',
    slug: { _type: 'slug', current: 'linstant-verdon' },
    imageUrl: '/assets/portfolio/linstantverdon-home.png',
    galleryUrls: [
      '/assets/portfolio/linstantverdon-activites.png',
      '/assets/portfolio/linstantverdon-equipe.png',
      '/assets/portfolio/linstantverdon-apropos.png',
    ],
    tags: ['Tourisme outdoor', 'Site bilingue', 'Réservation'],
    sector: 'Sports outdoor & nature',
    year: '2024',
    relatedSlugs: ['reves-daventures', 'verdon-ebike', 'gaec-des-valentins'],
    link: 'https://linstantverdon.com/',
    description: 'Site vitrine bilingue et système de réservation pour un syndicat de prestataires outdoor au cœur des Gorges du Verdon — canyoning, escalade, parcours aventure.',
    seoTitle: 'L\'Instant Verdon — Site outdoor bilingue Gorges du Verdon | Face Nord Graphisme',
    seoDescription: 'Création du site bilingue FR/EN de L\'Instant Verdon, syndicat de prestataires outdoor dans les Gorges du Verdon. Canyoning, escalade, parcours aventure. Design immersif, réservation en ligne.',
    content: [
      block('Le projet', 'h2'),
      block('L\'Instant Verdon est un syndicat local de travailleurs indépendants créé en 2016 et restructuré en 2025, basé à La Palud-sur-Verdon au cœur des Gorges du Verdon. Angèle Kanapa et Emma Aglié représentent aujourd\'hui le collectif, qui rassemble des guides et moniteurs certifiés pour offrir des expériences outdoor authentiques dans l\'un des plus beaux sites naturels d\'Europe.'),
      block('L\'enjeu était de créer un site à la hauteur du cadre exceptionnel des Gorges du Verdon : immersif, moderne, bilingue (français/anglais pour capter les touristes étrangers), et capable de convertir les visiteurs en réservations directes.'),
      block('Design immersif & identité visuelle', 'h2'),
      block('Conception d\'un design dark & immersif avec des photos aériennes et plongeantes des Gorges du Verdon en hero plein écran. Le logo au caducée stylisé et les accents turquoise rappellent la couleur unique des eaux du Verdon. Chaque section est pensée pour faire ressentir l\'aventure avant même de partir.'),
      block('« Là où l\'aventure rencontre la nature » — une promesse visuelle tenue de la première image à la dernière ligne.', 'blockquote'),
      block('Activités & réservation en ligne', 'h2'),
      block('Présentation des activités phares : canyoning dans les gorges, escalade sur les falaises calcaires, parcours aventure multi-activités. Chaque activité dispose de sa propre page avec niveau, durée, équipement fourni et tarifs. Système de réservation en ligne intégré avec calendrier de disponibilités, sélection du groupe et paiement sécurisé.'),
      block('Site bilingue FR/EN & SEO tourisme', 'h2'),
      block('Le site est entièrement bilingue (français/anglais) pour capter la clientèle internationale qui visite les Gorges du Verdon chaque été. SEO optimisé pour les requêtes « canyoning Verdon », « escalade Gorges du Verdon », « guide outdoor Verdon », « activités Verdon ». Intégration des avis clients et des réseaux sociaux pour renforcer la confiance.'),
    ],
  },
  {
    _id: 'portfolio-reves-daventures',
    _type: 'project',
    title: 'Rêves d\'Aventures',
    slug: { _type: 'slug', current: 'reves-daventures' },
    imageUrl: '/assets/portfolio/revesdaventures-home.png',
    galleryUrls: [
      '/assets/portfolio/revesdaventures-calendrier.png',
      '/assets/portfolio/revesdaventures-activites.png',
    ],
    tags: ['Tourisme outdoor', 'Réservation en ligne', 'SEO'],
    sector: 'Sports outdoor & activités de plein air',
    year: '2023',
    relatedSlugs: ['linstant-verdon', 'verdon-ebike', 'gaec-des-valentins'],
    link: 'https://www.revesdaventures.fr/',
    description: 'Site avec réservation en ligne pour un prestataire de sports outdoor dans les Hautes-Alpes — escalade, canyoning, VTT, via ferrata autour de Serre-Ponçon.',
    seoTitle: 'Rêves d\'Aventures — Site réservation outdoor Hautes-Alpes | Face Nord Graphisme',
    seoDescription: 'Création du site de Rêves d\'Aventures, prestataire outdoor dans les Hautes-Alpes. Escalade, canyoning, via ferrata, VTT autour de Serre-Ponçon. Calendrier de réservation en ligne.',
    content: [
      block('Le projet', 'h2'),
      block('Rêves d\'Aventures propose des expériences de pleine nature sur mesure autour de Serre-Ponçon, Embrun et Manosque dans les Hautes-Alpes. Escalade, canyoning, VTT, via ferrata, windsurf, kayak — toutes les activités sont guidées par des professionnels diplômés d\'État, pour des sorties accessibles à tous les niveaux.'),
      block('Le besoin était clair : un site moderne capable de gérer des réservations en ligne pour un catalogue d\'activités varié, avec un calendrier de disponibilités en temps réel et une expérience utilisateur fluide sur mobile.'),
      block('Architecture UX & catalogue d\'activités', 'h2'),
      block('Conception d\'une architecture centrée sur la conversion : catalogue d\'activités filtrable par type (eau, montagne, multi-activités) et par niveau. Chaque fiche activité présente la durée, le niveau requis, l\'équipement fourni, le tarif et les prochaines disponibilités. Le parcours de réservation est optimisé pour minimiser les abandons.'),
      block('« Vivre les sports de pleine nature à travers des expériences sur mesure » — du kayak sur le lac de Serre-Ponçon à la via ferrata de Roche-Rousse.', 'blockquote'),
      block('Calendrier de réservation en ligne', 'h2'),
      block('Intégration d\'un calendrier de réservation interactif avec les prochains départs disponibles, filtrage par type d\'activité, sélection de la taille du groupe et paiement sécurisé. Le planning est mis à jour en temps réel par le prestataire depuis l\'interface d\'administration. Section « Prochains départs » pour booster les ventes à court terme.'),
      block('SEO tourisme & résultats', 'h2'),
      block('Optimisation SEO pour les requêtes « canyoning Hautes-Alpes », « escalade Serre-Ponçon », « guide outdoor 05 », « via ferrata Embrun », « activités famille Hautes-Alpes ». Intégration des réseaux sociaux et des photos des sorties pour nourrir le contenu. Le site génère régulièrement des réservations directes, sans intermédiaire.'),
    ],
  },
  {
    _id: 'portfolio-verdon-ebike',
    _type: 'project',
    title: 'Verdon E-Bike',
    slug: { _type: 'slug', current: 'verdon-ebike' },
    imageUrl: '/assets/portfolio/verdonebike-home.png',
    galleryUrls: [
      '/assets/portfolio/verdonebike-locations.png',
      '/assets/portfolio/verdonebike-velos.png',
      '/assets/portfolio/verdonebike-equipe.png',
    ],
    tags: ['Tourisme vélo', 'Location en ligne', 'Multilingue'],
    sector: 'Location de vélos électriques',
    year: '2024',
    relatedSlugs: ['linstant-verdon', 'reves-daventures', 'gaudineto'],
    link: 'https://verdonebike.com/',
    description: 'Site multilingue de location de VAE pour explorer les Gorges du Verdon à vélo électrique — Route des Crêtes, itinéraires guidés, La Palud-sur-Verdon.',
    seoTitle: 'Verdon E-Bike — Site location VAE Gorges du Verdon | Face Nord Graphisme',
    seoDescription: 'Création du site multilingue de Verdon E-Bike, location de vélos à assistance électrique à La Palud-sur-Verdon. Route des Crêtes, VTTAE, VTC, itinéraires Gorges du Verdon.',
    content: [
      block('Le projet', 'h2'),
      block('Verdon E-Bike est un magasin de location de vélos électriques situé à La Palud-sur-Verdon, point de départ idéal pour parcourir la Route des Crêtes des Gorges du Verdon en VTT à assistance électrique (VTTAE) ou VTC électrique. Bernard, Guillaume et Pascal Cauvin accompagnent leurs clients pour une aventure accessible à tous, même sans entraînement spécifique.'),
      block('L\'objectif était de créer un site multilingue (FR/EN/DE) capable d\'attirer les touristes internationaux, de présenter la flotte de vélos, les itinéraires et de permettre la réservation en ligne.'),
      block('Design dark & identité visuelle sport', 'h2'),
      block('Conception d\'un design dark avec des accents vert néon — dynamique, moderne, rappelant l\'énergie du vélo électrique et le paysage vertigineux des Gorges du Verdon. Logo animé, navigation claire, galerie immersive des falaises et du canyon en arrière-plan. Le site donne immédiatement envie d\'enfourcher un vélo.'),
      block('« Les Gorges du Verdon en vélo électrique — l\'accès au grand spectacle pour tous les niveaux. »', 'blockquote'),
      block('Flotte, itinéraires & réservation', 'h2'),
      block('Pages dédiées à chaque modèle de vélo (Cube Nuride Hybrid Performance 625, Cube Nuride Hybrid Pro 600) avec photos, caractéristiques et tarifs de location. Fiches itinéraires détaillées avec dénivelé, distance, durée et niveau. Formulaire de réservation avec sélection de la date, du modèle de vélo, de la durée et du nombre de cyclistes.'),
      block('Site multilingue & SEO tourisme', 'h2'),
      block('Le site est disponible en français, anglais et allemand pour capter les touristes européens. SEO optimisé pour « location vélo électrique Verdon », « VTTAE Gorges du Verdon », « Route des Crêtes VAE », « location ebike La Palud-sur-Verdon ». Score PageSpeed Mobile > 86/100. Présence forte sur les requêtes locales et les recherches touristiques liées au Verdon.'),
    ],
  },
  {
    _id: 'portfolio-act-event-pro',
    _type: 'project',
    title: 'ACT Event Pro',
    slug: { _type: 'slug', current: 'act-event-pro' },
    imageUrl: '/assets/portfolio/acteventpro-home.png',
    galleryUrls: [
      '/assets/portfolio/acteventpro-prestations.png',
      '/assets/portfolio/acteventpro-apropos.png',
      '/assets/portfolio/acteventpro-passion.png',
    ],
    tags: ['Événementiel', 'Dark mode premium', 'Formulaire devis'],
    sector: 'DJ & prestation événementielle',
    year: '2024',
    relatedSlugs: ['gaudineto', 'reves-daventures', 'linstant-verdon'],
    link: 'https://www.act-event-pro.fr/',
    description: 'Site vitrine dark mode premium pour un DJ et prestataire événementiel des Hautes-Alpes — mariages, festivals, concerts, événements d\'entreprise en Région Sud.',
    seoTitle: 'ACT Event Pro — Site DJ événementiel Hautes-Alpes | Face Nord Graphisme',
    seoDescription: 'Création du site vitrine dark mode d\'ACT Event Pro, DJ et prestataire événementiel basé dans les Hautes-Alpes. Mariages, festivals, concerts. Formulaire devis, galerie, SEO.',
    content: [
      block('Le projet', 'h2'),
      block('ACT Event Pro est né d\'une passion pour la musique et d\'une double compétence rare dans le milieu : la direction technique et la sensibilité artistique. Né à Marseille, ancré dans les Hautes-Alpes, le prestataire couvre mariages, festivals, concerts et événements d\'entreprise dans toute la Région Sud — et au-delà.'),
      block('Le défi était de créer un site qui impose immédiatement le positionnement haut de gamme, donne envie de contacter pour un devis, et soit efficacement référencé sur les requêtes événementielles locales.'),
      block('Design dark mode premium', 'h2'),
      block('Conception d\'un site vitrine entièrement en dark mode, avec une identité visuelle forte basée sur le logo triangle « A » doré sur fond sombre. Typographies premium, effets de parallaxe subtils, galerie photo et vidéo des prestations. Le résultat : un site qui ressemble à la scène — professionnel, impactant, mémorable.'),
      block('« L\'alliance unique d\'une sensibilité artistique et d\'une rigueur technique » — visible dès la première seconde sur le site.', 'blockquote'),
      block('Prestations & formulaire devis', 'h2'),
      block('Pages dédiées à chaque prestation : DJ mariage, soirée 100% personnalisée, location de matériel son et lumière. Formulaire de demande de devis avec sélection du type d\'événement, de la date, de la jauge et de la zone géographique. Chaque lead est qualifié avant même le premier contact téléphonique.'),
      block('SEO & visibilité régionale', 'h2'),
      block('SEO optimisé pour les requêtes « DJ mariage Hautes-Alpes », « sonorisation événement 05 », « DJ Alpes du Sud », « prestataire événementiel Briançon Gap Embrun ». Page « À propos » avec storytelling détaillé pour renforcer les signaux E-E-A-T et la confiance des moteurs de recherche.'),
    ],
  },
];

async function run() {
  console.log('🚀 Démarrage de la migration portfolio → Sanity\n');

  // Récupérer les docs existants pour nettoyer les doublons par slug
  const existing = await client.fetch(`*[_type == "project"]{ _id, slug }`);
  console.log(`📦 ${existing.length} projet(s) existant(s) dans Sanity`);

  // Supprimer les anciens documents qui ne font pas partie de nos IDs contrôlés
  const ourIds = PROJECTS.map(p => p._id);
  const toDelete = existing.filter(d => !ourIds.includes(d._id));
  if (toDelete.length > 0) {
    console.log(`🗑  Suppression de ${toDelete.length} ancien(s) document(s)...`);
    const tx = client.transaction();
    for (const doc of toDelete) tx.delete(doc._id);
    await tx.commit();
  }

  // Créer ou remplacer chaque projet
  let successCount = 0;
  for (const project of PROJECTS) {
    try {
      await client.createOrReplace(project);
      console.log(`✅ ${project.title}`);
      successCount++;
    } catch (err) {
      console.error(`❌ ${project.title}: ${err.message}`);
    }
  }

  console.log(`\n✨ Migration terminée — ${successCount}/${PROJECTS.length} projets synchronisés`);
}

run().catch(err => {
  console.error('Erreur fatale:', err);
  process.exit(1);
});
