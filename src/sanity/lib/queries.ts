import { groq } from "next-sanity";

// We keep these queries for when the user successfully links their Sanity Studio

export const serviceQuery = groq`*[_type == "service"] | order(_createdAt asc) {
  _id, title, slug, description, icon
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0] {
  _id, title, slug, description, icon, mainImage { "url": asset->url }, secondaryImage { "url": asset->url }, content
}`;

export const projectQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id, title, slug, mainImage { "url": asset->url }, description
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id, title, slug, mainImage { "url": asset->url }, description, link, content, gallery[] { "url": asset->url }
}`;

export const postQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, mainImage { "url": asset->url }, publishedAt, excerpt
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, mainImage { "url": asset->url }, publishedAt, body
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
          block("Votre site internet est bien plus qu’une simple vitrine en ligne. C’est un outil stratégique pour développer votre visibilité, inspirer confiance et convertir vos visiteurs en clients. Je crée des sites personnalisés qui allient design élégant, expérience utilisateur fluide et technologies performantes."),
          block("Site vitrine personnalisé", "h3"),
          block("Vous souhaitez présenter votre entreprise, vos services ou votre savoir-faire ? Je développe pour vous un site vitrine professionnel et unique, parfaitement adapté à votre secteur d’activité. L’objectif : valoriser votre image de marque et susciter l’intérêt de vos futurs clients."),
          block("Responsive design", "h3"),
          block("Chaque site est conçu pour être 100 % responsive : il s’adapte automatiquement à tous les écrans (ordinateur, tablette, smartphone). C’est aujourd’hui indispensable pour garantir une expérience fluide à vos visiteurs, quel que soit leur appareil."),
          block("Optimisation SEO intégrée", "h3"),
          block("Un site beau, c’est bien. Un site visible, c’est mieux. J’intègre dès la création toutes les bonnes pratiques SEO : balises structurées, temps de chargement rapide, architecture claire, contenus optimisés… pour un référencement naturel efficace sur Google, notamment sur les recherches locales à Embrun, Gap et Briançon."),
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
          block("Un site e-commerce performant ne se résume pas à une simple vitrine en ligne. Il doit rassurer, séduire et convertir. Je conçois des boutiques en ligne modernes, personnalisées, et faciles à gérer, en mettant l’accent sur l’ergonomie, la sécurité et l’optimisation mobile."),
          block("Boutique e-commerce sur mesure", "h3"),
          block("Je développe des sites e-commerce uniques, adaptés à vos produits, votre image de marque et vos objectifs. Chaque boutique est pensée pour vous différencier de la concurrence et offrir une expérience d’achat fluide et agréable."),
          block("Gestion des produits simplifiée", "h3"),
          block("Grâce à une interface claire et intuitive, vous pourrez gérer facilement vos produits, vos stocks et vos promotions — même sans connaissances techniques. Mise à jour rapide des fiches, gestion des variations, ajout de photos… tout devient simple."),
          block("Paiements sécurisés", "h3"),
          block("J’intègre des solutions de paiement fiables et sécurisées : carte bancaire, PayPal, Stripe… Conformité avec les normes en vigueur (SSL, 3D Secure) pour garantir la tranquillité d’esprit de vos clients et la vôtre.")
        ]
      },
      "refonte-ai-friendly": {
        title: "Refonte AI Friendly",
        description: "Refonte de site internet AI-Friendly à Embrun, Gap, Briançon.",
        icon: "🤖",
        mainImage: { url: "/assets/about-img1.png" },
        secondaryImage: { url: "/assets/home_cta.png" },
        content: [
          block("Un site adapté aux usages d’aujourd’hui… et de demain", "h2"),
          block("Les moteurs de recherche ne fonctionnent plus comme avant. Les internautes utilisent désormais des assistants IA (ChatGPT, Google Gemini, Alexa…) qui sélectionnent des contenus structurés, accessibles et fiables."),
          block("Refonte technique & éditoriale", "h3"),
          block("Je procède à un audit complet de votre site existant pour identifier les axes d’amélioration : ergonomie, vitesse, structure, sécurité, compatibilité mobile, pertinence des contenus… Ensemble, nous redéfinissons l’arborescence, les textes, les visuels, le message, et nous mettons à jour tout ce qui peut freiner votre visibilité ou votre expérience utilisateur."),
          block("Responsive, rapide, sécurisé", "h3"),
          block("Chaque site refondu est repensé pour être 100 % responsive, optimisé pour le SEO, et sécurisé. J’applique les meilleures pratiques techniques (certificat SSL, compression, cache, balisage sémantique…) pour booster vos performances."),
          block("Pourquoi rendre votre site AI‑friendly ?", "h3"),
          block("Parce que les IA ne se contentent plus d’extraire des liens : elles lisent, comprennent, synthétisent. Un site bien structuré peut devenir une référence pour ces outils et augmenter sa visibilité bien au-delà du référencement classique.")
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
          block("Un beau site ne suffit pas : il faut qu’il soit trouvé par les bonnes personnes. Grâce à une stratégie SEO sur mesure, je vous aide à attirer plus de visiteurs qualifiés, à augmenter votre trafic et à générer plus de contacts ou de ventes."),
          block("Audit SEO complet", "h3"),
          block("Je réalise une analyse approfondie de votre site pour identifier les freins à la visibilité (balises, vitesse, contenu, liens internes, etc.). L’objectif : établir une base claire et exploitable pour toutes les optimisations à venir."),
          block("Optimisation technique", "h3"),
          block("Structure HTML, hiérarchie des titres, balises méta, temps de chargement, mobile-first… Je corrige tous les éléments techniques qui peuvent pénaliser votre référencement naturel, afin d’améliorer vos performances sur Google."),
          block("Stratégie de contenu SEO", "h3"),
          block("Le contenu est au cœur d’un bon référencement. Je vous aide à rédiger ou optimiser des textes adaptés à vos cibles, riches en mots-clés locaux pertinents (Embrun, Gap, Briançon…), tout en restant fluides et agréables à lire.")
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
          block("Grâce à mes services de maintenance, votre site reste à jour, protégé et performant. Vous évitez ainsi les pannes, les piratages ou les lenteurs qui nuisent à votre image et à votre référencement. Je m’occupe de tout, de manière proactive, pour que vous restiez serein au quotidien."),
          block("Mises à jour régulières", "h3"),
          block("Je mets à jour votre CMS (WordPress, etc.), vos extensions et vos thèmes afin de garantir une compatibilité optimale et de limiter les risques de failles de sécurité. Chaque mise à jour est vérifiée pour assurer la stabilité de votre site."),
          block("Sauvegardes automatiques", "h3"),
          block("Je configure un système de sauvegardes régulières, sur serveur distant, afin de pouvoir restaurer rapidement votre site en cas de problème technique ou de piratage. Vos données sont protégées et récupérables."),
          block("Surveillance de sécurité", "h3"),
          block("Je mets en place des outils de protection anti-intrusion (pare-feu, antivirus, anti-spam…) et surveille en temps réel les tentatives suspectes. En cas de menace, j’interviens immédiatement pour sécuriser votre site et vos données.")
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
    if (data && data.length > 0) return data;
    throw new Error('Empty Array');
  } catch (error) {
    return [
      {
        title: "Gaudineto",
        slug: { current: "project017" },
        description: "Refonte et création de boutique en ligne.",
        mainImage: { url: "/assets/about-img1.png" }
      },
      {
        title: "Shiatsu et Magnétisme",
        slug: { current: "project002" },
        description: "Site vitrine complet pour un praticien.",
        mainImage: { url: "/assets/about-img2.png" }
      },
      {
        title: "GAEC des Valentins",
        slug: { current: "project003" },
        description: "Présentation de l'exploitation locale.",
        mainImage: { url: "/assets/about-img3.png" }
      }
    ];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const { client } = await import("./client");
    if (client.config().projectId === 'votre-project-id') throw new Error('Not linked or empty');
    const data = await client.fetch(projectBySlugQuery, { slug }, { cache: 'no-store' });
    if (data) return data;
    throw new Error('Not Found');
  } catch (error) {
    const block = (text: string, style = 'normal') => ({ _type: 'block', style, children: [{ _type: 'span', text }] });
    const contentMap: Record<string, any> = {
      "project017": {
        title: "Gaudineto",
        description: "Refonte et création de boutique en ligne.",
        link: "https://gaudineto.fr/",
        mainImage: { url: "/assets/about-img1.png" },
        gallery: [
          { url: "/assets/home_intro.png" },
          { url: "/assets/home_cta.png" },
          { url: "/assets/about-img2.png" }
        ],
        content: [
          block("A propos de ce projet.", "h3"),
          block("Gaudineto est un restaurant basé dans la commune de Moustiers-Sainte-Marie dans les Alpes de Haute Provence à proximité du sublime lac de Sainte-Croix. Avec aucun visuel et une présence en ligne nulle, j’ai conçu l’identité visuelle, les menus et le site internet de cette entreprise."),
          block("Le processus de création", "h3"),
          block("Nous avons commencé par définir ensemble un logo, une police et des couleurs pour ce restaurant à la cuisine créative et aux inspirations Provençales. Il a fallu ensuite créer une devanture à ce restaurant, des menus et une carte de visite reflétant l’image de cuisine traditionnelle."),
          block("Le site web www.gaudineto.fr", "h3"),
          block("Présentation et adresse de l'entreprise. Menus complets de la carte. Formulaire de contact pour les réservations. Galerie photo interactive mettant en valeur les plats.", "blockquote")
        ]
      },
      "project002": {
        title: "Shiatsu et Magnétisme",
        description: "Site vitrine complet pour un praticien.",
        link: "#",
        mainImage: { url: "/assets/about-img2.png" },
        gallery: [
          { url: "/assets/home_intro.png" }
        ],
        content: [
          block("A propos de ce projet.", "h3"),
          block("Création d'un site vitrine spécialisé dans les médecines douces (Shiatsu et Magnétisme). Conception d'un espace zen et rassurant pour les futurs patients du cabinet."),
          block("Le processus", "h3"),
          block("Mise en forme des contenus liés aux pratiques holistiques. Intégration d'un module de prise de rendez-vous en ligne, avec simplification des interfaces. Le logo utilise une palette de couleurs naturelles et apaisantes coordonnée avec les photos du cabinet.")
        ]
      },
      "project003": {
        title: "GAEC des Valentins",
        description: "Présentation de l'exploitation locale.",
        link: "#",
        mainImage: { url: "/assets/about-img3.png" },
        gallery: [
          { url: "/assets/home_cta.png" }
        ],
        content: [
          block("A propos de ce projet.", "h3"),
          block("Un site e-commerce et de présentation pour une exploitation agricole locale (le GAEC des Valentins). Objectif : mettre en valeur les produits du terroir, la vente en circuit court et proposer la pré-commande en ligne."),
          block("Spécificités techniques", "h3"),
          block("Gestion asynchrone des commandes de paniers fermiers. Présentation interactive des zones de livraison. Responsive design soigné avec de grandes images immersives des champs et des animaux.")
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
          block("Adresse de l’hébergeur : 61 Lordou Vironos Street, 6023 Larnaca, Chypre"),
          block("4. Propriété intellectuelle", "h2"),
          block("L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques."),
          block("La reproduction de tout ou partie de ce site sur quel que support que ce soit est formellement interdite sauf autorisation expresse du directeur de la publication."),
          block("5. Responsabilité", "h2"),
          block("Face Nord Graphisme s'efforce d'assurer l'exactitude des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toute imprécision, inexactitude ou omission décline la responsabilité de l'éditeur du site.")
        ]
      },
      "politique-de-confidentialite": {
        title: "Politique de Confidentialité",
        content: [
          block("1. Collecte des données personnelles", "h2"),
          block("Dans le cadre de l’utilisation de ce site (par exemple lors de l'utilisation de la page 'Contact'), Face Nord Graphisme est amenée à collecter des données personnelles (Nom, Prénom, Email).", "normal"),
          block("Ces données sont collectées lorsque l’utilisateur remplit un formulaire de contact ou interagit directement avec nous."),
          block("2. Finalité du traitement des données", "h2"),
          block("Les données collectées sont utilisées uniquement pour répondre aux demandes de renseignements, de devis ou de contact, et pour assurer le suivi des projets clients."),
          block("3. Conservation des données", "h2"),
          block("Les données personnelles sont conservées pendant une durée qui n’excède pas la durée nécessaire aux finalités pour lesquelles elles sont collectées et traitées. En règle générale, les informations liées à une prise de contact sont conservées pendant un maximum de 3 ans après notre dernier échange."),
          block("4. Partage des données", "h2"),
          block("Face Nord Graphisme s’engage à ne pas vendre, louer, ou céder vos données personnelles à des tiers. Les données peuvent seulement être traitées par nos partenaires techniques (hébergement, emails) dans le strict respect du RGPD."),
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
