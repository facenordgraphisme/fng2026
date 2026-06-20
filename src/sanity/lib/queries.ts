import { groq } from "next-sanity";
import { normalizeProject } from "@/lib/portfolioImages";

export const authorQuery = groq`*[_type == "author"][0] {
  _id, name, slug, role, bio, linkedin, website,
  photo { "url": asset->url }
}`;

export async function getAuthor() {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked');
    const data = await client.fetch(authorQuery, {}, { cache: 'no-store' });
    if (data) return data;
    throw new Error('No author document');
  } catch {
    return {
      name: "François-Xavier Pin",
      role: "Développeur web & graphiste — Hautes-Alpes (05)",
      bio: "Basé à Puy-Sanières, près d'Embrun, je crée des sites internet et des identités visuelles pour les entreprises des Hautes-Alpes depuis plus de 10 ans. Passionné de montagne, j'accompagne artisans, commerçants et prestataires touristiques du département 05 pour développer leur présence en ligne.",
      photo: { url: "/assets/about-img1.png" },
      linkedin: null,
      website: "https://www.facenordgraphisme.fr",
    };
  }
}

// We keep these queries for when the user successfully links their Sanity Studio

export const serviceQuery = groq`*[_type == "service"] | order(_createdAt asc) {
  _id, title, slug, description, icon
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0] {
  _id, title, slug, description, icon, mainImage { "url": asset->url }, secondaryImage { "url": asset->url }, 
  content[] {
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    }
  }, 
  seoTitle, seoDescription
}`;

export const projectQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id, title, slug,
  "mainImageSanity": mainImage.asset->url,
  imageUrl,
  tags, sector, year,
  description
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id, title, slug,
  "mainImageSanity": mainImage.asset->url,
  imageUrl,
  tags, sector, year, relatedSlugs,
  description, link,
  content[] {
    ...,
    _type == "image" => {
      ...,
      "url": asset->url
    }
  },
  "gallerySanity": gallery[]{ "url": asset->url },
  galleryUrls,
  seoTitle, seoDescription
}`;

export const postQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, mainImage { "url": select(defined(asset) => asset->url, externalUrl), alt }, publishedAt, lastUpdated, excerpt
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug,
  mainImage { "url": select(defined(asset) => asset->url, externalUrl), alt, caption },
  publishedAt, lastUpdated,
  body[] {
    ...,
    _type == "image" => {
      ...,
      "url": select(defined(asset) => asset->url, externalUrl),
      alt,
      caption
    }
  },
  seoTitle, seoDescription
}`;

// Fetching wrappers that provide robust fallback text matching the original site exactly


export async function getServices() {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked or empty');
    const data = await client.fetch(serviceQuery, {}, { cache: 'no-store' });
    if (data && data.length > 0) return data;
    throw new Error('Empty Array');
  } catch (error) {
    return [
      {
        title: "Site internet",
        slug: { current: "creation-site-internet-hautes-alpes" },
        description: "Création de site vitrine à Embrun, Gap, Briançon et dans les Hautes-Alpes. Présentez votre activité en ligne grâce à un site clair, rapide et efficace.",
        icon: "💻"
      },
      {
        title: "E-Commerce",
        slug: { current: "boutique-e-commerce-hautes-alpes" },
        description: "Création de site e-commerce. Vendez vos produits en ligne avec une boutique sur mesure, performante et sécurisée.",
        icon: "🛒"
      },
      {
        title: "Refonte AI Friendly",
        slug: { current: "refonte-ai-friendly" },
        description: "Refonte de site internet. Un site moderne, rapide, sécurisé et structuré pour être compris par les IA et les moteurs de recherche.",
        icon: "🤖"
      },
      {
        title: "SEO",
        slug: { current: "referencement-seo-hautes-alpes" },
        description: "Référencement naturel (SEO). Attirez des visiteurs qualifiés grâce à un audit complet, une optimisation technique et une stratégie de contenu.",
        icon: "🔍"
      },
      {
        title: "Maintenance",
        slug: { current: "maintenance-site-internet-hautes-alpes" },
        description: "Maintenance de site web. Gardez votre site à jour, protégé et performant avec une maintenance régulière et proactive.",
        icon: "🛡️"
      },
      {
        title: "Référencement IA",
        slug: { current: "referencement-ia" },
        description: "Soyez cité par ChatGPT, Perplexity et les AI Overviews. Stratégie GEO (Generative Engine Optimization) pour les PME des Hautes-Alpes.",
        icon: "Brain"
      }
    ];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked or empty');
    const data = await client.fetch(serviceBySlugQuery, { slug }, { cache: 'no-store' });
    if (data) return data;
    throw new Error('Not Found');
  } catch (error) {
    // Generate fallback content based on the slug using the requested text structure
    const block = (text: string, style = 'normal') => ({ _type: 'block', style, children: [{ _type: 'span', text }] });
    const contentMap: Record<string, any> = {
      "creation-site-internet-hautes-alpes": {
        title: "Site internet",
        description: "Création de site vitrine à Embrun, Gap, Briançon et dans les Hautes-Alpes.",
        icon: "💻",
        mainImage: { url: "/assets/home_intro.png" },
        secondaryImage: { url: "/assets/about-img2.png" },
        content: [
          block("Un site web qui vous ressemble", "h2"),
          block("Votre site internet est bien plus qu'une simple vitrine en ligne. C'est un outil stratégique pour développer votre visibilité, inspirer confiance et convertir vos visiteurs en clients. Je crée des sites personnalisés qui allient design élégant, expérience utilisateur fluide et technologies performantes."),
          block("Site vitrine personnalisé", "h3"),
          block("Vous souhaitez présenter votre entreprise, vos services ou votre savoir-faire ? Je développe pour vous un site vitrine professionnel et unique, parfaitement adapté à votre secteur d'activité. L'objectif : valoriser votre image de marque et susciter l'intérêt de vos futurs clients."),
          block("Responsive design", "h3"),
          block("Chaque site est conçu pour être 100 % responsive : il s'adapte automatiquement à tous les écrans (ordinateur, tablette, smartphone). C'est aujourd'hui indispensable pour garantir une expérience fluide à vos visiteurs, quel que soit leur appareil."),
          block("Optimisation SEO intégrée", "h3"),
          block("Un site beau, c'est bien. Un site visible, c'est mieux. J'intègre dès la création toutes les bonnes pratiques SEO : balises structurées, temps de chargement rapide, architecture claire, contenus optimisés… pour un référencement naturel efficace sur Google, notamment sur les recherches locales à Embrun, Gap et Briançon."),
          block("Sécurité et performance", "h3"),
          block("Un site sécurisé et rapide inspire confiance et améliore le taux de conversion. Je mets en place des solutions fiables (certificat SSL, cache, protection anti-spam…) pour garantir la sécurité de vos données et offrir des performances optimales à vos visiteurs.")
        ]
      },
      "boutique-e-commerce-hautes-alpes": {
        title: "E-Commerce",
        description: "Création de site e-commerce à Embrun, Gap, Briançon.",
        icon: "🛒",
        mainImage: { url: "/assets/home_cta.png" },
        secondaryImage: { url: "/assets/about-img3.png" },
        content: [
          block("Un site e-commerce pensé pour la conversion", "h2"),
          block("Un site e-commerce performant ne se résume pas à une simple vitrine en ligne. Il doit rassurer, séduire et convertir. Je conçois des boutiques en ligne modernes, personnalisées, et faciles à gérer, en mettant l'accent sur l'ergonomie, la sécurité et l'optimisation mobile."),
          block("Boutique e-commerce sur mesure", "h3"),
          block("Je développe des sites e-commerce uniques, adaptés à vos produits, votre image de marque et vos objectifs. Chaque boutique est pensée pour vous différencier de la concurrence et offrir une expérience d'achat fluide et agréable."),
          block("Gestion des produits simplifiée", "h3"),
          block("Grâce à une interface claire et intuitive, vous pourrez gérer facilement vos produits, vos stocks et vos promotions — même sans connaissances techniques. Mise à jour rapide des fiches, gestion des variations, ajout de photos… tout devient simple."),
          block("Paiements sécurisés", "h3"),
          block("J'intègre des solutions de paiement fiables et sécurisées : carte bancaire, PayPal, Stripe… Conformité avec les normes en vigueur (SSL, 3D Secure) pour garantir la tranquillité d'esprit de vos clients et la vôtre.")
        ]
      },
      "refonte-ai-friendly": {
        title: "Refonte AI Friendly",
        description: "Refonte de site internet AI-Friendly à Embrun, Gap, Briançon.",
        icon: "🤖",
        mainImage: { url: "/assets/about-img1.png" },
        secondaryImage: { url: "/assets/home_cta.png" },
        content: [
          block("Un site adapté aux usages d'aujourd'hui… et de demain", "h2"),
          block("Les moteurs de recherche ne fonctionnent plus comme avant. Les internautes utilisent désormais des assistants IA (ChatGPT, Google Gemini, Alexa…) qui sélectionnent des contenus structurés, accessibles et fiables."),
          block("Refonte technique & éditoriale", "h3"),
          block("Je procède à un audit complet de votre site existant pour identifier les axes d'amélioration : ergonomie, vitesse, structure, sécurité, compatibilité mobile, pertinence des contenus… Ensemble, nous redéfinissons l'arborescence, les textes, les visuels, le message, et nous mettons à jour tout ce qui peut freiner votre visibilité ou votre expérience utilisateur."),
          block("Responsive, rapide, sécurisé", "h3"),
          block("Chaque site refondu est repensé pour être 100 % responsive, optimisé pour le SEO, et sécurisé. J'applique les meilleures pratiques techniques (certificat SSL, compression, cache, balisage sémantique…) pour booster vos performances."),
          block("Pourquoi rendre votre site AI‑friendly ?", "h3"),
          block("Parce que les IA ne se contentent plus d'extraire des liens : elles lisent, comprennent, synthétisent. Un site bien structuré peut devenir une référence pour ces outils et augmenter sa visibilité bien au-delà du référencement classique.")
        ]
      },
      "referencement-seo-hautes-alpes": {
        title: "SEO",
        description: "Référencement naturel (SEO) à Embrun, Gap, Briançon.",
        icon: "🔍",
        mainImage: { url: "/assets/home_cta.png" },
        secondaryImage: { url: "/assets/home_intro.png" },
        content: [
          block("Attirez des visiteurs qualifiés grâce au SEO", "h2"),
          block("Un beau site ne suffit pas : il faut qu'il soit trouvé par les bonnes personnes. Grâce à une stratégie SEO sur mesure, je vous aide à attirer plus de visiteurs qualifiés, à augmenter votre trafic et à générer plus de contacts ou de ventes."),
          block("Audit SEO complet", "h3"),
          block("Je réalise une analyse approfondie de votre site pour identifier les freins à la visibilité (balises, vitesse, contenu, liens internes, etc.). L'objectif : établir une base claire et exploitable pour toutes les optimisations à venir."),
          block("Optimisation technique", "h3"),
          block("Structure HTML, hiérarchie des titres, balises méta, temps de chargement, mobile-first… Je corrige tous les éléments techniques qui peuvent pénaliser votre référencement naturel, afin d'améliorer vos performances sur Google."),
          block("Stratégie de contenu SEO", "h3"),
          block("Le contenu est au cœur d'un bon référencement. Je vous aide à rédiger ou optimiser des textes adaptés à vos cibles, riches en mots-clés locaux pertinents (Embrun, Gap, Briançon…), tout en restant fluides et agréables à lire.")
        ]
      },
      "maintenance-site-internet-hautes-alpes": {
        title: "Maintenance",
        description: "Maintenance de site web à Embrun, Gap, Briançon – Fiabilité & sécurité",
        icon: "🛡️",
        mainImage: { url: "/assets/about-img3.png" },
        secondaryImage: { url: "/assets/about-img1.png" },
        content: [
          block("Concentrez-vous sur votre activité, je veille sur votre site", "h2"),
          block("Grâce à mes services de maintenance, votre site reste à jour, protégé et performant. Vous évitez ainsi les pannes, les piratages ou les lenteurs qui nuisent à votre image et à votre référencement. Je m'occupe de tout, de manière proactive, pour que vous restiez serein au quotidien."),
          block("Mises à jour régulières", "h3"),
          block("Je mets à jour votre CMS (WordPress, etc.), vos extensions et vos thèmes afin de garantir une compatibilité optimale et de limiter les risques de failles de sécurité. Chaque mise à jour est vérifiée pour assurer la stabilité de votre site."),
          block("Sauvegardes automatiques", "h3"),
          block("Je configure un système de sauvegardes régulières, sur serveur distant, afin de pouvoir restaurer rapidement votre site en cas de problème technique ou de piratage. Vos données sont protégées et récupérables."),
          block("Surveillance de sécurité", "h3"),
          block("Je mets en place des outils de protection anti-intrusion (pare-feu, antivirus, anti-spam…) et surveille en temps réel les tentatives suspectes. En cas de menace, j'interviens immédiatement pour sécuriser votre site et vos données.")
        ]
      }
    };

    if (contentMap[slug]) {
      return { ...contentMap[slug], slug: { current: slug } };
    }
    return null;
  }
}

export async function getProjects() {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked or empty');
    const data = await client.fetch(projectQuery, {}, { cache: 'no-store' });
    if (data && data.length > 0) return data.map(normalizeProject);
    throw new Error('Empty Array');
  } catch (error) {
    return [
      {
        title: "Gaudineto",
        slug: { current: "gaudineto" },
        tags: ["Restaurant", "Site bilingue", "Identité visuelle"],
        description: "Site bilingue FR/EN et identité visuelle complète pour un restaurant gastronomique à Moustiers-Sainte-Marie, aux portes des Gorges du Verdon.",
        mainImage: { url: "/assets/portfolio/gaudineto-home.png" }
      },
      {
        title: "GAEC des Valentins",
        slug: { current: "gaec-des-valentins" },
        tags: ["E-Commerce", "Agritourisme", "SEO local"],
        description: "Boutique e-commerce et site vitrine pour un élevage d'agneau en circuit court dans les Hautes-Alpes, labellisé Hautes-Alpes Naturellement.",
        mainImage: { url: "/assets/portfolio/gaecdesvalentins-home.png" }
      },
      {
        title: "L'Instant Verdon",
        slug: { current: "linstant-verdon" },
        tags: ["Tourisme outdoor", "Site bilingue", "Réservation"],
        description: "Site vitrine bilingue et réservation pour un syndicat de prestataires outdoor au cœur des Gorges du Verdon — canyoning, escalade, parcours aventure.",
        mainImage: { url: "/assets/portfolio/linstantverdon-home.png" }
      },
      {
        title: "Rêves d'Aventures",
        slug: { current: "reves-daventures" },
        tags: ["Tourisme outdoor", "Réservation en ligne", "SEO"],
        description: "Site avec réservation en ligne pour un prestataire de sports outdoor dans les Hautes-Alpes — escalade, canyoning, VTT, via ferrata autour de Serre-Ponçon.",
        mainImage: { url: "/assets/portfolio/revesdaventures-home.png" }
      },
      {
        title: "Verdon E-Bike",
        slug: { current: "verdon-ebike" },
        tags: ["Tourisme vélo", "Location en ligne", "Multilingue"],
        description: "Site de location de VAE multilingue pour explorer les Gorges du Verdon à vélo électrique — Route des Crêtes, itinéraires guidés, La Palud-sur-Verdon.",
        mainImage: { url: "/assets/portfolio/verdonebike-home.png" }
      },
      {
        title: "ACT Event Pro",
        slug: { current: "act-event-pro" },
        tags: ["Événementiel", "Dark mode premium", "Formulaire devis"],
        description: "Site vitrine dark mode premium pour un DJ et prestataire événementiel des Hautes-Alpes — mariages, festivals, concerts en Région Sud.",
        mainImage: { url: "/assets/portfolio/acteventpro-home.png" }
      },
    ];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked or empty');
    const data = await client.fetch(projectBySlugQuery, { slug }, { cache: 'no-store' });
    if (data) return normalizeProject(data);
    throw new Error('Not Found');
  } catch (error) {
    const block = (text: string, style = 'normal') => ({ _type: 'block', style, children: [{ _type: 'span', text }] });
    const contentMap: Record<string, any> = {
      "gaudineto": {
        title: "Gaudineto",
        tags: ["Restaurant", "Site bilingue", "Identité visuelle"],
        sector: "Restauration gastronomique",
        year: "2024",
        description: "Site bilingue FR/EN et identité visuelle complète pour un restaurant gastronomique à Moustiers-Sainte-Marie, aux portes des Gorges du Verdon.",
        seoTitle: "Gaudineto — Site bilingue restaurant gastronomique Moustiers-Sainte-Marie | Face Nord Graphisme",
        seoDescription: "Création du site bilingue FR/EN et de l'identité visuelle du restaurant Gaudineto à Moustiers-Sainte-Marie (Verdon). Design dark élégant, réservation en ligne, galerie photo.",
        link: "https://gaudineto.fr/",
        mainImage: { url: "/assets/portfolio/gaudineto-home.png" },
        gallery: [
          { url: "/assets/portfolio/gaudineto-apropos-menu.png" },
          { url: "/assets/portfolio/gaudineto-interieur.png" },
          { url: "/assets/portfolio/gaudineto-reservation.png" },
        ],
        relatedSlugs: ["linstant-verdon", "verdon-ebike", "act-event-pro"],
        content: [
          block("Le projet", "h2"),
          block("Gaudineto est un restaurant gastronomique installé dans les murs d'une ancienne boulangerie du XIVe siècle à Moustiers-Sainte-Marie, village classé parmi les Plus Beaux Villages de France. L'établissement propose une cuisine créative et raffinée, ancrée dans les produits locaux et la saisonnalité de Provence-Alpes-Côte d'Azur."),
          block("La mission était double : créer une identité visuelle forte qui reflète l'élégance du lieu, et développer un site web bilingue (français/anglais) capable d'attirer aussi bien la clientèle locale que les touristes internationaux qui visitent les Gorges du Verdon chaque été."),
          block("Identité visuelle & direction artistique", "h2"),
          block("Création from scratch du logotype avec le monogramme 'G' stylisé, décliné dans une palette crème, or et noir profond. Sélection typographique haut de gamme pour refléter le positionnement gastronomique. La charte graphique a été déclinée sur les menus imprimés, les cartes de visite et les supports digitaux — une cohérence totale entre le print et le web."),
          block("Site vitrine bilingue FR/EN", "h2"),
          block("Le site est entièrement bilingue (français/anglais) pour capter la clientèle internationale de passage dans le Verdon. Il intègre une galerie photo immersive des plats et de la salle, la présentation du chef et de sa cuisine, un système de réservation en ligne avec confirmation automatique, et des boutons d'appel rapide (téléphone, WhatsApp) pour faciliter la prise de contact."),
          block("Le design dark élégant, avec ses tons crème et or sur fond sombre, traduit visuellement l'expérience gastronomique : raffinée, lumineuse et mémorable.", "blockquote"),
          block("SEO local & performances", "h2"),
          block("Optimisation SEO pour les requêtes 'restaurant Moustiers-Sainte-Marie', 'gastronomique Gorges du Verdon', 'restaurant Provence Verdon'. Balisage LocalBusiness Schema.org avec coordonnées, horaires et avis. Score PageSpeed > 90/100. Le site s'affiche en première page sur les recherches locales pour le restaurant."),
        ]
      },
      "gaec-des-valentins": {
        title: "GAEC des Valentins",
        tags: ["E-Commerce", "Agritourisme", "SEO local"],
        sector: "Agriculture & circuit court",
        year: "2023",
        description: "Boutique e-commerce et site vitrine pour un élevage d'agneau en circuit court dans les Hautes-Alpes, labellisé Hautes-Alpes Naturellement.",
        seoTitle: "GAEC des Valentins — E-commerce agneau Hautes-Alpes | Face Nord Graphisme",
        seoDescription: "Création de la boutique e-commerce et du site vitrine du GAEC des Valentins (Châteauroux-les-Alpes). Vente directe d'agneau en ligne, label Hautes-Alpes Naturellement, SEO local.",
        link: "https://gaecdesvalentins.fr/",
        mainImage: { url: "/assets/portfolio/gaecdesvalentins-home.png" },
        gallery: [
          { url: "/assets/portfolio/gaecdesvalentins-home-2.png" },
          { url: "/assets/portfolio/gaecdesvalentins-colis.png" },
          { url: "/assets/portfolio/gaecdesvalentins-activites.png" },
        ],
        relatedSlugs: ["reves-daventures", "linstant-verdon", "verdon-ebike"],
        content: [
          block("Le projet", "h2"),
          block("Le GAEC des Valentins est un élevage ovin familial situé à Châteauroux-les-Alpes, dans les Hautes-Alpes, spécialisé dans l'élevage d'agneaux de qualité en plein air. Titulaire du label Hautes-Alpes Naturellement, l'exploitation mise sur la transparence, la proximité et la vente en circuit court — à la ferme, sur les marchés, et désormais en ligne."),
          block("L'enjeu principal était de créer un outil numérique qui permette aux éleveurs de vendre leurs colis d'agneau directement en ligne, tout en racontant l'histoire de la ferme et en développant l'agritourisme autour des visites et activités pour les familles."),
          block("Boutique e-commerce WooCommerce", "h2"),
          block("Développement d'une boutique WooCommerce sur-mesure permettant de commander des colis d'agneau en ligne (colis familiaux, professionnels, formats multiples). Paiement sécurisé via Stripe, gestion des stocks, emails de confirmation automatiques et suivi de commande. La boutique est pensée pour être autonome : les éleveurs la mettent à jour eux-mêmes depuis l'interface d'administration WordPress."),
          block("Site vitrine & agritourisme", "h2"),
          block("Au-delà de la boutique, le site valorise la vie de la ferme : présentation de l'élevage, des valeurs (bien-être animal, environnement), des activités à la ferme pour les familles et les scolaires (visite des agneaux, contact avec les animaux chaque samedi). Une section blog permet de partager les actualités de la saison et d'améliorer le référencement naturel."),
          block("'Goûtez l'agneau du GAEC des Valentins, vous en tomberez amoureux' — une promesse de qualité directement de la ferme à votre table.", "blockquote"),
          block("SEO local & résultats", "h2"),
          block("Référencement ciblé sur les requêtes 'agneau Hautes-Alpes', 'vente directe agneau 05', 'colis agneau Embrun', 'Hautes-Alpes Naturellement'. Intégration des avis Google (4,9/5) en page d'accueil pour renforcer la confiance. Le site génère régulièrement des commandes en ligne, notamment depuis Gap, Briançon et la région PACA."),
        ]
      },
      "linstant-verdon": {
        title: "L'Instant Verdon",
        tags: ["Tourisme outdoor", "Site bilingue", "Réservation"],
        sector: "Sports outdoor & nature",
        year: "2024",
        description: "Site vitrine bilingue et système de réservation pour un syndicat de prestataires outdoor au cœur des Gorges du Verdon — canyoning, escalade, parcours aventure.",
        seoTitle: "L'Instant Verdon — Site outdoor bilingue Gorges du Verdon | Face Nord Graphisme",
        seoDescription: "Création du site bilingue FR/EN de L'Instant Verdon, syndicat de prestataires outdoor dans les Gorges du Verdon. Canyoning, escalade, parcours aventure. Design immersif, réservation en ligne.",
        link: "https://linstantverdon.com/",
        mainImage: { url: "/assets/portfolio/linstantverdon-home.png" },
        gallery: [
          { url: "/assets/portfolio/linstantverdon-activites.png" },
          { url: "/assets/portfolio/linstantverdon-equipe.png" },
          { url: "/assets/portfolio/linstantverdon-apropos.png" },
        ],
        relatedSlugs: ["reves-daventures", "verdon-ebike", "gaec-des-valentins"],
        content: [
          block("Le projet", "h2"),
          block("L'Instant Verdon est un syndicat local de travailleurs indépendants créé en 2016 et restructuré en 2025, basé à La Palud-sur-Verdon au cœur des Gorges du Verdon. Angèle Kanapa et Emma Aglié représentent aujourd'hui le collectif, qui rassemble des guides et moniteurs certifiés pour offrir des expériences outdoor authentiques dans l'un des plus beaux sites naturels d'Europe."),
          block("L'enjeu était de créer un site à la hauteur du cadre exceptionnel des Gorges du Verdon : immersif, moderne, bilingue (français/anglais pour capter les touristes étrangers), et capable de convertir les visiteurs en réservations directes."),
          block("Design immersif & identité visuelle", "h2"),
          block("Conception d'un design dark & immersif avec des photos aériennes et plongeantes des Gorges du Verdon en hero plein écran. Le logo au caducée stylisé et les accents turquoise rappellent la couleur unique des eaux du Verdon. Chaque section est pensée pour faire ressentir l'aventure avant même de partir."),
          block("'Là où l'aventure rencontre la nature' — une promesse visuelle tenue de la première image à la dernière ligne.", "blockquote"),
          block("Activités & réservation en ligne", "h2"),
          block("Présentation des activités phares : canyoning dans les gorges, escalade sur les falaises calcaires, parcours aventure multi-activités. Chaque activité dispose de sa propre page avec niveau, durée, équipement fourni et tarifs. Système de réservation en ligne intégré avec calendrier de disponibilités, sélection du groupe et paiement sécurisé."),
          block("Site bilingue FR/EN & SEO tourisme", "h2"),
          block("Le site est entièrement bilingue (français/anglais) pour capter la clientèle internationale qui visite les Gorges du Verdon chaque été. SEO optimisé pour les requêtes 'canyoning Verdon', 'escalade Gorges du Verdon', 'guide outdoor Verdon', 'activités Verdon'. Intégration des avis clients et des réseaux sociaux pour renforcer la confiance."),
        ]
      },
      "act-event-pro": {
        title: "ACT Event Pro",
        tags: ["Événementiel", "Dark mode premium", "Formulaire devis"],
        sector: "DJ & prestation événementielle",
        year: "2024",
        description: "Site vitrine dark mode premium pour un DJ et prestataire événementiel des Hautes-Alpes — mariages, festivals, concerts, événements d'entreprise en Région Sud.",
        seoTitle: "ACT Event Pro — Site DJ événementiel Hautes-Alpes | Face Nord Graphisme",
        seoDescription: "Création du site vitrine dark mode d'ACT Event Pro, DJ et prestataire événementiel basé dans les Hautes-Alpes. Mariages, festivals, concerts. Formulaire devis, galerie, SEO.",
        link: "https://www.act-event-pro.fr/",
        mainImage: { url: "/assets/portfolio/acteventpro-home.png" },
        gallery: [
          { url: "/assets/portfolio/acteventpro-prestations.png" },
          { url: "/assets/portfolio/acteventpro-apropos.png" },
          { url: "/assets/portfolio/acteventpro-passion.png" },
        ],
        relatedSlugs: ["gaudineto", "reves-daventures", "linstant-verdon"],
        content: [
          block("Le projet", "h2"),
          block("ACT Event Pro est né d'une passion pour la musique et d'une double compétence rare dans le milieu : la direction technique et la sensibilité artistique. Né à Marseille, ancré dans les Hautes-Alpes, le prestataire couvre mariages, festivals, concerts et événements d'entreprise dans toute la Région Sud — et au-delà."),
          block("Le défi était de créer un site qui impose immédiatement le positionnement haut de gamme, donne envie de contacter pour un devis, et soit efficacement référencé sur les requêtes événementielles locales."),
          block("Design dark mode premium", "h2"),
          block("Conception d'un site vitrine entièrement en dark mode, avec une identité visuelle forte basée sur le logo triangle 'A' doré sur fond sombre. Typographies premium, effets de parallaxe subtils, galerie photo et vidéo des prestations. Le résultat : un site qui ressemble à la scène — professionnel, impactant, mémorable."),
          block("'L'alliance unique d'une sensibilité artistique et d'une rigueur technique' — visible dès la première seconde sur le site.", "blockquote"),
          block("Prestations & formulaire devis", "h2"),
          block("Pages dédiées à chaque prestation : DJ mariage, soirée 100% personnalisée, location de matériel son et lumière. Formulaire de demande de devis avec sélection du type d'événement, de la date, de la jauge et de la zone géographique. Chaque leads est qualifié avant même le premier contact téléphonique."),
          block("SEO & visibilité régionale", "h2"),
          block("SEO optimisé pour les requêtes 'DJ mariage Hautes-Alpes', 'sonorisation événement 05', 'DJ Alpes du Sud', 'prestataire événementiel Briançon Gap Embrun'. Page 'À propos' avec storytelling détaillé pour renforcer les signaux E-E-A-T et la confiance des moteurs de recherche."),
        ]
      },
      "reves-daventures": {
        title: "Rêves d'Aventures",
        tags: ["Tourisme outdoor", "Réservation en ligne", "SEO"],
        sector: "Sports outdoor & activités de plein air",
        year: "2023",
        description: "Site avec réservation en ligne pour un prestataire de sports outdoor dans les Hautes-Alpes — escalade, canyoning, VTT, via ferrata autour de Serre-Ponçon.",
        seoTitle: "Rêves d'Aventures — Site réservation outdoor Hautes-Alpes | Face Nord Graphisme",
        seoDescription: "Création du site de Rêves d'Aventures, prestataire outdoor dans les Hautes-Alpes. Escalade, canyoning, via ferrata, VTT autour de Serre-Ponçon. Calendrier de réservation en ligne.",
        link: "https://www.revesdaventures.fr/",
        mainImage: { url: "/assets/portfolio/revesdaventures-home.png" },
        gallery: [
          { url: "/assets/portfolio/revesdaventures-calendrier.png" },
          { url: "/assets/portfolio/revesdaventures-activites.png" },
        ],
        relatedSlugs: ["linstant-verdon", "verdon-ebike", "gaec-des-valentins"],
        content: [
          block("Le projet", "h2"),
          block("Rêves d'Aventures propose des expériences de pleine nature sur mesure autour de Serre-Ponçon, Embrun et Manosque dans les Hautes-Alpes. Escalade, canyoning, VTT, via ferrata, windsurf, kayak — toutes les activités sont guidées par des professionnels diplômés d'État, pour des sorties accessibles à tous les niveaux."),
          block("Le besoin était clair : un site moderne capable de gérer des réservations en ligne pour un catalogue d'activités varié, avec un calendrier de disponibilités en temps réel et une expérience utilisateur fluide sur mobile."),
          block("Architecture UX & catalogue d'activités", "h2"),
          block("Conception d'une architecture centrée sur la conversion : catalogue d'activités filtrable par type (eau, montagne, multi-activités) et par niveau. Chaque fiche activité présente la durée, le niveau requis, l'équipement fourni, le tarif et les prochaines disponibilités. Le parcours de réservation est optimisé pour minimiser les abandons."),
          block("'Vivre les sports de pleine nature à travers des expériences sur mesure' — du kayak sur le lac de Serre-Ponçon à la via ferrata de Roche-Rousse.", "blockquote"),
          block("Calendrier de réservation en ligne", "h2"),
          block("Intégration d'un calendrier de réservation interactif avec les prochains départs disponibles, filtrage par type d'activité, sélection de la taille du groupe et paiement sécurisé. Le planning est mis à jour en temps réel par le prestataire depuis l'interface d'administration. Section 'Prochains départs' pour booster les ventes à court terme."),
          block("SEO tourisme & résultats", "h2"),
          block("Optimisation SEO pour les requêtes 'canyoning Hautes-Alpes', 'escalade Serre-Ponçon', 'guide outdoor 05', 'via ferrata Embrun', 'activités famille Hautes-Alpes'. Intégration des réseaux sociaux et des photos des sorties pour nourrir le contenu. Le site génère régulièrement des réservations directes, sans intermédiaire."),
        ]
      },
      "verdon-ebike": {
        title: "Verdon E-Bike",
        tags: ["Tourisme vélo", "Location en ligne", "Multilingue"],
        sector: "Location de vélos électriques",
        year: "2024",
        description: "Site multilingue de location de VAE pour explorer les Gorges du Verdon à vélo électrique — Route des Crêtes, itinéraires guidés, La Palud-sur-Verdon.",
        seoTitle: "Verdon E-Bike — Site location VAE Gorges du Verdon | Face Nord Graphisme",
        seoDescription: "Création du site multilingue de Verdon E-Bike, location de vélos à assistance électrique à La Palud-sur-Verdon. Route des Crêtes, VTTAE, VTC, itinéraires Gorges du Verdon.",
        link: "https://verdonebike.com/",
        mainImage: { url: "/assets/portfolio/verdonebike-home.png" },
        gallery: [
          { url: "/assets/portfolio/verdonebike-locations.png" },
          { url: "/assets/portfolio/verdonebike-velos.png" },
          { url: "/assets/portfolio/verdonebike-equipe.png" },
        ],
        relatedSlugs: ["linstant-verdon", "reves-daventures", "gaudineto"],
        content: [
          block("Le projet", "h2"),
          block("Verdon E-Bike est un magasin de location de vélos électriques situé à La Palud-sur-Verdon, point de départ idéal pour parcourir la Route des Crêtes des Gorges du Verdon en VTT à assistance électrique (VTTAE) ou VTC électrique. Bernard, Guillaume et Pascal Cauvin accompagnent leurs clients pour une aventure accessible à tous, même sans entraînement spécifique."),
          block("L'objectif était de créer un site multilingue (FR/EN/DE) capable d'attirer les touristes internationaux, de présenter la flotte de vélos, les itinéraires et de permettre la réservation en ligne."),
          block("Design dark & identité visuelle sport", "h2"),
          block("Conception d'un design dark avec des accents vert néon — dynamique, moderne, rappelant l'énergie du vélo électrique et le paysage vertigineux des Gorges du Verdon. Logo animé, navigation claire, galerie immersive des falaises et du canyon en arrière-plan. Le site donne immédiatement envie d'enfourcher un vélo."),
          block("'Les Gorges du Verdon en vélo électrique — l'accès au grand spectacle pour tous les niveaux.'", "blockquote"),
          block("Flotte, itinéraires & réservation", "h2"),
          block("Pages dédiées à chaque modèle de vélo (Cube Nuride Hybrid Performance 625, Cube Nuride Hybrid Pro 600) avec photos, caractéristiques et tarifs de location. Fiches itinéraires détaillées avec dénivelé, distance, durée et niveau. Formulaire de réservation avec sélection de la date, du modèle de vélo, de la durée et du nombre de cyclistes."),
          block("Site multilingue & SEO tourisme", "h2"),
          block("Le site est disponible en français, anglais et allemand pour capter les touristes européens. SEO optimisé pour 'location vélo électrique Verdon', 'VTTAE Gorges du Verdon', 'Route des Crêtes VAE', 'location ebike La Palud-sur-Verdon'. Score PageSpeed Mobile > 86/100. Présence forte sur les requêtes locales et les recherches touristiques liées au Verdon."),
        ]
      }
    };

    if (contentMap[slug]) {
      return { ...contentMap[slug], slug: { current: slug } };
    }
    return null;
  }
}

export async function getPosts() {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked or empty');
    const data = await client.fetch(postQuery, {}, { cache: 'no-store' });
    if (data && data.length > 0) return data;
    throw new Error('Empty Array');
  } catch (error) {
    return [
      {
        title: "Les tendances UX/UI en 2026",
        slug: { current: "tendances-ux-ui-2026" },
        publishedAt: new Date().toISOString(),
        mainImage: { url: "/assets/about-img1.png" },
      },
      {
        title: "Pourquoi refondre son site internet ?",
        slug: { current: "pourquoi-refondre-son-site" },
        publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        mainImage: { url: "/assets/about-img2.png" },
      }
    ];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked or empty');
    const data = await client.fetch(postBySlugQuery, { slug }, { cache: 'no-store' });
    if (data) return data;
    throw new Error('Not Found');
  } catch (error) {
    const block = (text: string, style = 'normal') => ({ _type: 'block', style, children: [{ _type: 'span', text }] });
    const contentMap: Record<string, any> = {
      "tendances-ux-ui-2026": {
        title: "Les tendances UX/UI en 2026",
        publishedAt: new Date().toISOString(),
        mainImage: { url: "/assets/about-img1.png" },
        body: [
          block("L'expérience utilisateur au centre", "h2"),
          block("En 2026, l'intelligence artificielle générative et l'hyper-personnalisation dominent le secteur du web design. Les sites s'adaptent dynamiquement aux préférences de chaque visiteur."),
          block("Le retour du minimalisme fonctionnel", "h3"),
          block("Fini le superflu. Les interfaces tendent vers un design épuré où chaque élément a une utilité précise. Cela améliore non seulement la vitesse de chargement mais aussi l'accessibilité globale.")
        ]
      },
      "pourquoi-refondre-son-site": {
        title: "Pourquoi refondre son site internet ?",
        publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        mainImage: { url: "/assets/about-img2.png" },
        body: [
          block("L'importance de rester à la page", "h2"),
          block("Votre site web est votre vitrine numérique. S'il a plus de 3 ans, il est probablement déjà obsolète d'un point de vue technologique et SEO."),
          block("La compatibilité mobile et AI-Friendly", "h3"),
          block("Avec l'avènement de l'indexation Mobile-First et l'importance des assistants IA, un code sémantique et irréprochable est indispensable pour garantir votre visibilité.")
        ]
      }
    };

    if (contentMap[slug]) {
      return { ...contentMap[slug], slug: { current: slug } };
    }
    return null;
  }
}

export const cityPageBySlugQuery = groq`*[_type == "cityPage" && slug.current == $slug][0] {
  _id, city, slug, headline, intro,
  body[] {
    ...,
    _type == "image" => {
      ...,
      "url": select(defined(asset) => asset->url, externalUrl),
      alt, caption
    }
  },
  seoTitle, seoDescription
}`;

export async function getCityPageBySlug(slug: string) {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked');
    const data = await client.fetch(cityPageBySlugQuery, { slug }, { cache: 'no-store' });
    if (data) return data;
    throw new Error('Not Found');
  } catch {
    return null;
  }
}

export async function getAllCityPageSlugs(): Promise<string[]> {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') return [];
    const data = await client.fetch(
      `*[_type == "cityPage"]{ "slug": slug.current }`,
      {},
      { cache: 'no-store' }
    );
    return (data || []).map((d: any) => d.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export const legalBySlugQuery = groq`*[_type == "legal" && slug.current == $slug][0] {
  _id, title, slug, content
}`;

export async function getLegalBySlug(slug: string) {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked or empty');
    const data = await client.fetch(legalBySlugQuery, { slug }, { cache: 'no-store' });
    if (data) return data;
    throw new Error('Not Found');
  } catch (error) {
    const block = (text: string, style = 'normal') => ({ _type: 'block', style, children: [{ _type: 'span', text }] });
    const contentMap: Record<string, any> = {
      "mentions-legales": {
        title: "Mentions Légales",
        content: [
          block("1. Éditeur du site", "h2"),
          block("Le site www.facenordgraphisme.fr est édité par la micro-entreprise Face Nord Graphisme, représentée par François-Xavier Pin."),
          block("Siège social : 45 impasse du Serre 05200 Puy Sanières"),
          block("SIRET : 919495200"),
          block("Email de contact : contact@facenordgraphisme.fr"),
          block("2. Directeur de la publication", "h2"),
          block("François-Xavier Pin"),
          block("3. Hébergement du site", "h2"),
          block("Ce site est hébergé par Hostinger."),
          block("Adresse de l'hébergeur : 61 Lordou Vironos Street, 6023 Larnaca, Chypre"),
          block("4. Propriété intellectuelle", "h2"),
          block("L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques."),
          block("La reproduction de tout ou partie de ce site sur quel que support que ce soit est formellement interdite sauf autorisation expresse du directeur de la publication."),
          block("5. Responsabilité", "h2"),
          block("Face Nord Graphisme s'efforce d'assurer l'exactitude des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toute imprécision, inexactitude ou omission décline la responsabilité de l'éditeur du site.")
        ]
      },
      "politique-de-confidentialite": {
        title: "Politique de Confidentialité",
        content: [
          block("1. Collecte des données personnelles", "h2"),
          block("Dans le cadre de l'utilisation de ce site (par exemple lors de l'utilisation de la page 'Contact'), Face Nord Graphisme est amenée à collecter des données personnelles (Nom, Prénom, Email).", "normal"),
          block("Ces données sont collectées lorsque l'utilisateur remplit un formulaire de contact ou interagit directement avec nous."),
          block("2. Finalité du traitement des données", "h2"),
          block("Les données collectées sont utilisées uniquement pour répondre aux demandes de renseignements, de devis ou de contact, et pour assurer le suivi des projets clients."),
          block("3. Conservation des données", "h2"),
          block("Les données personnelles sont conservées pendant une durée qui n'excède pas la durée nécessaire aux finalités pour lesquelles elles sont collectées et traitées. En règle générale, les informations liées à une prise de contact sont conservées pendant un maximum de 3 ans après notre dernier échange."),
          block("4. Partage des données", "h2"),
          block("Face Nord Graphisme s'engage à ne pas vendre, louer, ou céder vos données personnelles à des tiers. Les données peuvent seulement être traitées par nos partenaires techniques (hébergement, emails) dans le strict respect du RGPD."),
          block("5. Cookies", "h2"),
          block("Ce site utilise des cookies strictement nécessaires à son bon fonctionnement et, le cas échéant, des outils d'analyse d'audience respectueux de la vie privée. Vous pouvez configurer vos préférences via le bandeau dédié."),
          block("6. Vos droits", "h2"),
          block("Conformément à la réglementation applicable (loi Informatique et Libertés et RGPD), vous disposez d'un droit d'accès, de rectification, de portabilité, d'effacement de vos données ou de limitation de leur traitement. Pour exercer ces droits, contactez : contact@facenordgraphisme.fr.")
        ]
      }
    };

    if (contentMap[slug]) {
      return { ...contentMap[slug], slug: { current: slug } };
    }
    return null;
  }
}
