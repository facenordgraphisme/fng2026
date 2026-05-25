/**
 * create-portfolio-projects.mjs
 *
 * Generates browser-mockup SVG cover images for each portfolio project,
 * uploads them to Sanity, then creates/replaces the 5 project documents.
 *
 * Run: node scripts/create-portfolio-projects.mjs
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { createClient } from '@sanity/client';
import crypto from 'crypto';

const client = createClient({
  projectId: 'k4x2bvj1',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const uid = () => crypto.randomBytes(6).toString('hex');
const b = (text, style = 'normal') => ({
  _type: 'block', _key: uid(), style,
  children: [{ _type: 'span', _key: uid(), text }],
  markDefs: [],
});

// ── SVG browser mockup generator ──────────────────────────────────────────────

const xmlEsc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

function makeBrowserMockup(cfg) {
  const {
    bgColor, navBg = '#f8f8f8', navTextColor = '#666',
    heroBg, accentColor, siteName, siteNameSize = 44,
    tagline, url, navItems, tags,
    heroTextColor = '#fff', subTextColor = 'rgba(255,255,255,0.75)',
  } = cfg;

  const W = 1200, H = 750;
  const wx = 60, wy = 58, ww = 1080, wh = 578;
  const barH = 40, navH = 46, heroH = 228;
  const contentY = wy + barH + navH + heroH;
  const tagY = wy + wh + 28;  // ~664

  const navHTML = navItems.map((item, i) =>
    `<text x="${wx + 120 + i * 185}" y="${wy + barH + navH / 2 + 5}" font-family="Arial,sans-serif" font-size="12" fill="${navTextColor}">${xmlEsc(item)}</text>`
  ).join('');

  // Tag pills — 4 tags evenly spaced across 1200px
  const tagHTML = tags.map((tag, i) =>
    `<rect x="${52 + i * 275}" y="${tagY}" width="255" height="30" rx="15" fill="rgba(255,255,255,0.18)"/>` +
    `<text x="${52 + i * 275 + 127}" y="${tagY + 19}" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="rgba(255,255,255,0.92)" font-weight="600">${xmlEsc(tag)}</text>`
  ).join('');

  // Content simulation — text placeholder lines + card grid
  const bx = wx, by = contentY;
  const contentSim = [
    `<rect x="${bx+44}" y="${by+22}" width="420" height="13" rx="6" fill="#e8e8e8"/>`,
    `<rect x="${bx+44}" y="${by+44}" width="310" height="10" rx="5" fill="#eeeeee"/>`,
    `<rect x="${bx+44}" y="${by+62}" width="370" height="10" rx="5" fill="#eeeeee"/>`,
    `<rect x="${bx+540}" y="${by+16}" width="495" height="82" rx="8" fill="${heroBg}" opacity="0.15"/>`,
    `<rect x="${bx+44}" y="${by+100}" width="228" height="128" rx="8" fill="#f0f0f0"/>`,
    `<rect x="${bx+290}" y="${by+100}" width="228" height="128" rx="8" fill="#f0f0f0"/>`,
    `<rect x="${bx+536}" y="${by+100}" width="228" height="128" rx="8" fill="#f0f0f0"/>`,
    `<rect x="${bx+782}" y="${by+100}" width="254" height="128" rx="8" fill="${accentColor}" opacity="0.13"/>`,
  ].join('');

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<rect width="${W}" height="${H}" fill="${bgColor}"/>
<rect x="${wx+6}" y="${wy+6}" width="${ww}" height="${wh}" rx="16" fill="rgba(0,0,0,0.22)"/>
<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="16" fill="#ffffff"/>
<rect x="${wx}" y="${wy}" width="${ww}" height="${barH}" rx="16" fill="#232323"/>
<rect x="${wx}" y="${wy + barH / 2}" width="${ww}" height="${barH / 2}" fill="#232323"/>
<circle cx="${wx+22}" cy="${wy+20}" r="7" fill="#ff5f57"/>
<circle cx="${wx+44}" cy="${wy+20}" r="7" fill="#ffbd2e"/>
<circle cx="${wx+66}" cy="${wy+20}" r="7" fill="#28ca41"/>
<rect x="${wx+82}" y="${wy+11}" width="560" height="18" rx="9" fill="#363636"/>
<text x="${wx+362}" y="${wy+23}" text-anchor="middle" font-family="monospace,Arial" font-size="10" fill="#aaaaaa">${xmlEsc(url)}</text>
<rect x="${wx}" y="${wy+barH}" width="${ww}" height="${navH}" fill="${navBg}"/>
<line x1="${wx}" y1="${wy+barH+navH}" x2="${wx+ww}" y2="${wy+barH+navH}" stroke="#e4e4e4" stroke-width="1"/>
${navHTML}
<rect x="${wx}" y="${wy+barH+navH}" width="${ww}" height="${heroH}" fill="${heroBg}"/>
<text x="${wx+62}" y="${wy+barH+navH+92}" font-family="Georgia,'Times New Roman',serif" font-size="${siteNameSize}" fill="${heroTextColor}" font-weight="700" letter-spacing="1">${xmlEsc(siteName)}</text>
<text x="${wx+62}" y="${wy+barH+navH+136}" font-family="Arial,sans-serif" font-size="16" fill="${subTextColor}">${xmlEsc(tagline)}</text>
<rect x="${wx+62}" y="${wy+barH+navH+160}" width="164" height="36" rx="8" fill="${accentColor}"/>
<text x="${wx+144}" y="${wy+barH+navH+183}" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#ffffff" font-weight="700">Découvrir ›</text>
${contentSim}
${tagHTML}
</svg>`;
}

// ── Upload SVG → Sanity ────────────────────────────────────────────────────────

async function uploadSvg(svgString, filename) {
  console.log(`  ↑ Uploading ${filename}...`);
  const buf = Buffer.from(svgString, 'utf8');
  const asset = await client.assets.upload('image', buf, {
    filename,
    contentType: 'image/svg+xml',
  });
  console.log(`  ✓ Uploaded: ${asset._id}`);
  return asset._id;
}

// ── Project definitions ────────────────────────────────────────────────────────

const projects = [
  {
    _id: 'project-gaudineto',
    slug: 'gaudineto',
    title: 'Gaudineto',
    link: 'https://gaudineto.fr/',
    description: 'Identité visuelle complète et site bilingue pour un restaurant gastronomique aux portes des Gorges du Verdon.',
    svgConfig: {
      bgColor: '#18120a',
      navBg: '#fdf9f2',
      navTextColor: '#7a6a50',
      heroBg: '#1e1a14',
      accentColor: '#c9a06e',
      siteName: 'GAUDINETO',
      siteNameSize: 52,
      tagline: 'Restaurant créatif · Moustiers-Sainte-Marie',
      url: 'gaudineto.fr',
      navItems: ['Accueil', 'Menus', 'À propos', 'Réservation', 'Contact'],
      tags: ['Site vitrine', 'Identité visuelle', 'Bilingue FR/EN', 'Réservation en ligne'],
      heroTextColor: '#f5efe0',
      subTextColor: 'rgba(201,160,110,0.9)',
    },
    content: [
      b('À propos du projet', 'h2'),
      b("Gaudineto est un restaurant gastronomique installé dans les murs d'une ancienne boulangerie du XIVe siècle à Moustiers-Sainte-Marie, à mi-chemin entre les Gorges du Verdon et le lac de Sainte-Croix. L'établissement propose une cuisine créative et raffinée, ancrée dans les produits locaux et la saisonnalité."),
      b("Le client arrivait sans aucune présence en ligne : pas de logo, pas de site, pas de menu digital. L'enjeu était de construire une identité visuelle cohérente depuis zéro, capable d'accueillir une clientèle touristique internationale."),
      b('Identité visuelle & print', 'h3'),
      b("Création du logotype, de la palette de couleurs (crème chaud, or brun, noir profond) et des typographies. Déclinaison sur les menus imprimés, la carte des vins et les cartes de visite. L'identité visuelle reflète l'esprit d'une cuisine créative aux inspirations provençales, servie dans un cadre historique."),
      b('Site vitrine bilingue', 'h3'),
      b("Développement d'un site vitrine bilingue (français/anglais) avec galerie photo, présentation des menus, intégration Google Maps et gestion des avis. Formulaire de réservation en ligne, bouton de contact WhatsApp pour les réservations rapides, intégration des réseaux sociaux. Performance : PageSpeed Mobile > 88/100."),
      b("Un site élégant, épuré et rapide — à l'image de la cuisine créative du chef. Premier contact digital pour une clientèle qui vient parfois de toute l'Europe.", 'blockquote'),
    ],
    seoTitle: 'Gaudineto — Site bilingue & identité visuelle pour un restaurant gastronomique',
    seoDescription: "Création de l'identité visuelle, des menus imprimés et du site vitrine bilingue (FR/EN) pour le restaurant Gaudineto à Moustiers-Sainte-Marie.",
  },

  {
    _id: 'project-gaec-des-valentins',
    slug: 'gaec-des-valentins',
    title: 'GAEC des Valentins',
    link: 'https://gaecdesvalentins.fr/',
    description: 'Site vitrine et boutique e-commerce pour un élevage d\'agneau en vente directe dans les Hautes-Alpes.',
    svgConfig: {
      bgColor: '#b8d4e6',
      navBg: '#ffffff',
      navTextColor: '#444',
      heroBg: '#1a6b9a',
      accentColor: '#3ea832',
      siteName: 'GAEC des Valentins',
      siteNameSize: 40,
      tagline: 'Agneau des Hautes-Alpes élevé avec passion · Vente directe',
      url: 'gaecdesvalentins.fr',
      navItems: ['Accueil', 'Nos Agneaux', 'Activités', 'Blog', 'Contact'],
      tags: ['Site vitrine', 'Boutique WooCommerce', 'Vente directe', 'SEO local'],
      heroTextColor: '#ffffff',
      subTextColor: 'rgba(255,255,255,0.8)',
    },
    content: [
      b('À propos du projet', 'h2'),
      b("Le GAEC des Valentins est un élevage ovin situé à Châteauroux-les-Alpes dans les Hautes-Alpes (05), spécialisé dans la production et la vente directe d'agneau de qualité. L'exploitation est labellisée Hautes-Alpes Naturellement et propose également des activités agritouristiques pour les familles."),
      b("Le besoin : créer une boutique en ligne permettant de vendre des colis d'agneau directement aux particuliers, avec présentation claire de l'exploitation, de ses valeurs et de ses activités de découverte."),
      b('Boutique e-commerce WooCommerce', 'h3'),
      b("Développement d'une boutique WooCommerce sur-mesure avec les colis d'agneau (poids, coupes, options), gestion des stocks et des délais de préparation, paiement en ligne sécurisé. Emails automatiques de confirmation et de suivi de commande. Interface administrateur simple pour mettre à jour les disponibilités selon les périodes d'abattage."),
      b('Site vitrine & SEO local', 'h3'),
      b("Site vitrine complet avec présentation de l'élevage, des pratiques agricoles et du cadre exceptionnel des Hautes-Alpes. Blog pour les actualités de l'exploitation. Section activités agritouristiques avec galerie. Intégration des avis Google (note 4,9/5). Optimisation SEO locale pour les requêtes 'agneau Hautes-Alpes', 'vente directe agneau 05', 'GAEC Châteauroux'."),
      b("Un site qui fait le lien entre une exploitation agricole authentique et les consommateurs qui cherchent à acheter local, en direct du producteur.", 'blockquote'),
    ],
    seoTitle: "GAEC des Valentins — Boutique e-commerce agneau Hautes-Alpes",
    seoDescription: "Création de la boutique WooCommerce et du site vitrine pour le GAEC des Valentins, élevage d'agneau en vente directe à Châteauroux-les-Alpes.",
  },

  {
    _id: 'project-act-event-pro',
    slug: 'act-event-pro',
    title: 'ACT Event Pro',
    link: 'https://www.act-event-pro.fr/',
    description: 'Site vitrine premium dark mode pour un DJ et prestataire événementiel basé dans les Hautes-Alpes.',
    svgConfig: {
      bgColor: '#080808',
      navBg: '#111111',
      navTextColor: '#888888',
      heroBg: '#0c0c0c',
      accentColor: '#f0c040',
      siteName: 'ACT EVENT PRO',
      siteNameSize: 48,
      tagline: 'DJ · Sonorisation · Lumières · Sud-Est de la France',
      url: 'act-event-pro.fr',
      navItems: ['Accueil', 'Prestations', 'Galerie', 'À Propos', 'Devis'],
      tags: ['Site vitrine', 'DJ et Evenementiel', 'Formulaire devis', 'SEO Hautes-Alpes'],
      heroTextColor: '#ffffff',
      subTextColor: 'rgba(240,192,64,0.9)',
    },
    content: [
      b('À propos du projet', 'h2'),
      b("ACT Event Pro est une entreprise de DJ, sonorisation et éclairage professionnel basée dans les Hautes-Alpes, couvrant le Sud-Est de la France et au-delà. L'entreprise intervient sur des mariages, festivals, concerts et événements d'entreprise, en combinant sensibilité artistique et rigueur technique."),
      b("L'objectif : créer un site premium qui reflète le positionnement haut de gamme de l'entreprise, attire des clients pour des prestations à forte valeur ajoutée, et génère des demandes de devis qualifiées."),
      b('Design dark mode & identité premium', 'h3'),
      b("Conception d'un site vitrine en dark mode avec typographies soignées, contrastes blanc/noir/or. Le design s'inspire de l'univers visuel des grands événements et festivals — ambiance scénique, lumières dorées, photos d'ambiance plein format. L'accent or (#f0c040) renforce le positionnement premium."),
      b('Fonctionnalités & SEO', 'h3'),
      b("Présentation détaillée des prestations (DJ performance, sonorisation sur mesure, location de matériel). Galerie interactive des événements réalisés. Section témoignages clients. Carousel des logos clients. Formulaire de devis avec sélection du type d'événement, de la date et de la zone géographique. Optimisation SEO locale : 'DJ mariage Hautes-Alpes', 'sonorisation événement 05', 'location matériel sono Gap'."),
      b("L'alliance unique de la sensibilité artistique et de la rigueur technique — un positionnement qui se lit immédiatement dès la première page.", 'blockquote'),
    ],
    seoTitle: 'ACT Event Pro — Site vitrine premium DJ & événementiel Hautes-Alpes',
    seoDescription: "Création du site vitrine dark mode premium pour ACT Event Pro, DJ et prestataire sonorisation/lumière dans les Hautes-Alpes.",
  },

  {
    _id: 'project-reves-daventures',
    slug: 'reves-daventures',
    title: "Rêves d'Aventures",
    link: 'https://www.revesdaventures.fr/',
    description: 'Site vitrine et réservation en ligne pour un prestataire de sports outdoor dans les Hautes-Alpes.',
    svgConfig: {
      bgColor: '#1a2f4a',
      navBg: '#f4f4f4',
      navTextColor: '#444',
      heroBg: '#1e3a58',
      accentColor: '#f5a623',
      siteName: "Rêves d'Aventures",
      siteNameSize: 42,
      tagline: 'Climbing · Canyoning · Kayak · VTT · Hautes-Alpes',
      url: 'revesdaventures.fr',
      navItems: ['Accueil', 'Activités', 'Planning', 'Niveaux', 'Contact'],
      tags: ['Site vitrine', 'Réservation en ligne', 'Activités outdoor', 'SEO tourisme'],
      heroTextColor: '#ffffff',
      subTextColor: 'rgba(245,166,35,0.9)',
    },
    content: [
      b('À propos du projet', 'h2'),
      b("Rêves d'Aventures est un prestataire de sports de pleine nature basé dans les Hautes-Alpes, proposant des expériences guidées sur-mesure : escalade, canyoning, VTT de montagne, via ferrata, windsurf et kayak. L'offre est structurée en trois formats : mono-activité, duo-activité et programmes multi-jours personnalisés."),
      b("L'enjeu : présenter une offre complexe de manière claire et accessible pour des clients de tous niveaux, avec un système de réservation adapté à la saisonnalité estivale des Hautes-Alpes."),
      b('Architecture & UX', 'h3'),
      b("Conception de l'architecture d'information pour 3 formats d'activités × 3 niveaux (Découverte, Aventure, Warrior). Chaque activité dispose de sa propre fiche avec description, niveau requis, durée, tarif et photos d'ambiance. La navigation est conçue pour que les visiteurs trouvent rapidement l'activité adaptée à leur niveau et à leur groupe."),
      b('Réservation & SEO tourisme', 'h3'),
      b("Intégration d'un calendrier de disponibilités avec réservation en ligne. Section planning interactif pour visualiser les sorties à venir. FAQ intégrée. Optimisation SEO tourisme pour les requêtes 'canyoning Hautes-Alpes', 'escalade lac de Serre-Ponçon', 'guide outdoor 05', 'via ferrata Embrun'. Intégration Instagram pour valoriser les photos des sorties."),
      b("Vivre les sports de pleine nature à travers des expériences sur mesure — un positionnement fort qui attire des clients cherchant autre chose qu'une activité touristique standard.", 'blockquote'),
    ],
    seoTitle: "Rêves d'Aventures — Site vitrine & réservation sports outdoor Hautes-Alpes",
    seoDescription: "Création du site vitrine et du système de réservation pour Rêves d'Aventures, prestataire de sports outdoor dans les Hautes-Alpes.",
  },

  {
    _id: 'project-verdon-ebike',
    slug: 'verdon-ebike',
    title: 'Verdon E-Bike',
    link: 'https://verdonebike.com/',
    description: 'Site vitrine et location en ligne pour un prestataire de vélos à assistance électrique dans les Gorges du Verdon.',
    svgConfig: {
      bgColor: '#1a3829',
      navBg: '#f4f8f4',
      navTextColor: '#3a6048',
      heroBg: '#1f4532',
      accentColor: '#5acd7a',
      siteName: 'VERDON E-BIKE',
      siteNameSize: 48,
      tagline: 'Location VAE · Gorges du Verdon · Sorties guidées',
      url: 'verdonebike.com',
      navItems: ['Accueil', 'Location', 'Sorties', 'Nos Vélos', 'Contact'],
      tags: ['Site vitrine', 'Location en ligne', 'Itinéraires VAE', 'SEO tourisme'],
      heroTextColor: '#ffffff',
      subTextColor: 'rgba(90,205,122,0.9)',
    },
    content: [
      b('À propos du projet', 'h2'),
      b("Verdon E-Bike est un prestataire de location de vélos à assistance électrique (VTTAE et VTC) spécialisé dans les circuits dans les Gorges du Verdon. L'entreprise propose des sorties guidées par des accompagnateurs certifiés et des locations libre-service pour explorer le canyon à son rythme."),
      b("L'enjeu : capter les touristes cherchant des activités outdoor dans les Gorges du Verdon, avec un catalogue clair des vélos et des sorties disponibles, et un système de réservation en ligne."),
      b('Présentation de la flotte & circuits', 'h3'),
      b("Pages dédiées à chaque type de vélo disponible (VTTAE, VTC, options famille) avec spécifications techniques, tarifs par durée, et photos. Section itinéraires avec fiches détaillées pour chaque circuit : dénivelé, durée, niveau, points d'intérêt. Galerie photo immersive des Gorges du Verdon pour donner envie aux visiteurs."),
      b('Réservation & SEO', 'h3'),
      b("Formulaire de réservation/location avec sélection de la date, du type de vélo, de la durée et du nombre de participants. Section témoignages clients. Partenaires locaux et logistique de départ. Optimisation SEO tourisme pour les requêtes 'location vélo électrique Verdon', 'sortie VAE Gorges du Verdon', 'VTTAE Castellane', 'balade vélo electrique Verdon'. Performance : PageSpeed Mobile > 86/100."),
      b("Les Gorges du Verdon en vélo électrique — l'accès au grand spectacle pour tous les niveaux, en toute autonomie ou accompagné.", 'blockquote'),
    ],
    seoTitle: "Verdon E-Bike — Site vitrine location VAE Gorges du Verdon",
    seoDescription: "Création du site vitrine et du système de réservation pour Verdon E-Bike, prestataire de location de vélos électriques dans les Gorges du Verdon.",
  },
];

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Creating portfolio projects (${projects.length} sites)\n`);

  for (const project of projects) {
    console.log(`\n── ${project.title} ──────────────────────────────`);

    // 1. Generate & upload SVG
    const svg = makeBrowserMockup(project.svgConfig);
    const assetId = await uploadSvg(svg, `portfolio-${project.slug}.svg`);

    // 2. Build Sanity document
    const doc = {
      _id: project._id,
      _type: 'project',
      title: project.title,
      slug: { _type: 'slug', current: project.slug },
      link: project.link,
      description: project.description,
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      },
      content: project.content,
      seoTitle: project.seoTitle,
      seoDescription: project.seoDescription,
    };

    // 3. Create or replace in Sanity
    console.log(`  ✎ Creating/updating Sanity document...`);
    const result = await client.createOrReplace(doc);
    console.log(`  ✓ Project saved: ${result._id}`);
  }

  console.log('\n✅ All portfolio projects created successfully!\n');
  console.log('Projects created:');
  projects.forEach(p => console.log(`  • /portfolio/${p.slug} — ${p.link}`));
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
