import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { CalendarCheck, Users, CreditCard, LayoutDashboard, Smartphone, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Développement d'application web sur-mesure — Hautes-Alpes",
  description: "Développement d'applications web et de logiciels SaaS sur-mesure : plateforme de réservation, planning, espace client, tableau de bord, paiements Stripe. Développeur Next.js à Embrun (Hautes-Alpes).",
  alternates: { canonical: "https://www.facenordgraphisme.fr/developpement-application-web" },
  openGraph: { title: "Application web sur-mesure | Face Nord Graphisme", description: "L'outil en ligne taillé pour votre métier : réservation, planning, espace client, SaaS. Exemple : Outplanners.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/portfolio/outplanners-home.webp", width: 1920, height: 1200, alt: "Outplanners, plateforme SaaS développée par Face Nord Graphisme" }] },
};

const data: ServicePageData = {
  badge: "Application web",
  headline: "L'outil en ligne taillé pour votre métier",
  intro: "Plateforme de réservation, planning d'équipe, espace client, tableau de bord, logiciel en abonnement (SaaS) : je conçois et développe des applications web sur-mesure, utilisables partout, sur ordinateur comme sur mobile — de l'idée jusqu'à la mise en production.",
  path: "/developpement-application-web",
  breadcrumbLabel: "Application web sur-mesure",
  pricingFrom: "sur devis",
  pricingLabel: "Après un atelier de cadrage",
  stats: [
    { value: "Next.js", label: "Technologie moderne et rapide" },
    { value: "Stripe", label: "Paiements & abonnements" },
    { value: "Mobile", label: "Utilisable sur le terrain" },
    { value: "Évolutif", label: "Livré par étapes" },
  ],
  forWho: [
    "Votre organisation tient sur Excel, papier, SMS et coups de fil",
    "Aucun logiciel du marché ne correspond vraiment à votre façon de travailler",
    "Vous voulez offrir à vos clients un espace en ligne (réservations, documents, suivi)",
    "Vous avez une idée de produit numérique ou de logiciel SaaS à lancer",
  ],
  features: [
    { icon: CalendarCheck, title: "Réservation & planning", desc: "Calendriers, créneaux, capacités, affectation des équipes : tout le monde voit le même planning, à jour en temps réel.", stat: "Temps réel" },
    { icon: CreditCard, title: "Paiements & abonnements", desc: "Paiement en ligne, acomptes, factures, abonnements mensuels : intégration complète de Stripe.", stat: "Stripe" },
    { icon: Users, title: "Comptes utilisateurs & rôles", desc: "Espace client, accès équipe, administrateur : chacun voit et fait ce qui le concerne, en toute sécurité.", stat: "Accès sécurisés" },
    { icon: LayoutDashboard, title: "Tableaux de bord", desc: "Chiffre d'affaires, réservations, activité du jour : les informations utiles en un coup d'œil.", stat: "Données claires" },
    { icon: Smartphone, title: "Pensé pour le terrain", desc: "Une interface rapide et lisible sur téléphone, pour vous et votre équipe, même en déplacement.", stat: "Mobile-first" },
    { icon: Layers, title: "Construit pour durer", desc: "Code propre et documenté, base de données solide, hébergement fiable. On commence par l'essentiel et l'outil évolue avec vous.", stat: "Livraison par étapes" },
  ],
  example: {
    title: "Outplanners",
    href: "/portfolio/outplanners",
    url: "https://www.outplanners.com",
    image: "/assets/portfolio/outplanners-home.webp",
    desc: "Plateforme SaaS de réservation et de gestion pour les professionnels du plein air (canyoning, ski, escalade, VTT, parapente, kayak…) : réservation en ligne, planning des guides, paiements et matériel dans un seul outil.",
    points: [
      "Réservation en ligne et encaissement Stripe intégrés",
      "Planning d'équipe partagé et vue par guide",
      "Configuration automatique selon le métier, abonnements mensuels",
    ],
  },
  process: [
    { num: "01", title: "Atelier de cadrage", desc: "On décrit ensemble vos utilisateurs, vos tâches répétitives et ce que l'outil doit résoudre en priorité." },
    { num: "02", title: "Prototype", desc: "Maquettes cliquables des écrans clés, testées avec vous avant d'écrire la moindre ligne de code." },
    { num: "03", title: "Développement par étapes", desc: "Une première version utile rapidement, puis des livraisons régulières que vous testez au fur et à mesure." },
    { num: "04", title: "Mise en production & suivi", desc: "Hébergement, sauvegardes, formation de vos équipes, maintenance et évolutions." },
  ],
  bodyBlocks: [
    {
      heading: "Site internet ou application web : quelle différence ?",
      paragraphs: [
        "Un site internet présente votre activité à vos visiteurs. Une application web, elle, sert à travailler : on s'y connecte pour réserver, planifier, gérer des clients, suivre des paiements ou consulter des données. Elle s'utilise dans un navigateur, sans installation, sur ordinateur, tablette et téléphone.",
        "C'est la bonne solution quand un logiciel du marché vous oblige à contourner votre façon de travailler, quand vous jonglez entre plusieurs outils, ou quand vous voulez proposer un service numérique à vos propres clients.",
      ],
    },
    {
      heading: "Outplanners : une application conçue de A à Z",
      paragraphs: [
        "Outplanners s'adresse aux guides, moniteurs et bureaux d'activités qui jonglent entre réservations téléphoniques, plannings sur papier et relances de paiement. J'ai conçu et développé la plateforme complète — réservation en ligne, planning des guides, paiements Stripe, gestion du matériel, abonnements — avec une configuration qui s'adapte automatiquement au métier de chaque utilisateur.",
        "C'est cette même démarche que je propose pour votre projet : partir de vos vrais problèmes, livrer vite une première version utile, puis faire évoluer l'outil avec vous.",
      ],
    },
  ],
  pricingItems: [
    "Atelier de cadrage et cahier des charges simplifié",
    "Prototype cliquable des écrans principaux",
    "Développement Next.js + base de données",
    "Comptes utilisateurs, rôles et sécurité",
    "Paiements et abonnements Stripe (si besoin)",
    "Hébergement, sauvegardes et mise en production",
    "Formation, maintenance et évolutions",
  ],
  faqs: [
    { q: "Combien coûte une application web sur-mesure ?", a: "Cela dépend fortement du périmètre : un outil interne simple (formulaires, planning, tableau de bord) n'a rien à voir avec une plateforme SaaS complète. Après un atelier de cadrage, je vous propose un budget précis et un découpage en étapes, pour commencer par l'essentiel." },
    { q: "Combien de temps faut-il pour développer une application ?", a: "Une première version utilisable (MVP) peut être livrée en quelques semaines pour un outil ciblé ; une plateforme complète se construit sur plusieurs mois, par livraisons successives que vous testez au fur et à mesure." },
    { q: "L'application fonctionnera-t-elle sur téléphone ?", a: "Oui. C'est une application web responsive : elle s'utilise depuis n'importe quel navigateur, sur ordinateur, tablette ou smartphone, sans passer par les stores." },
    { q: "Qui est propriétaire du code ?", a: "Pour un développement sur-mesure, le code vous appartient. Les modalités (propriété, hébergement, maintenance) sont précisées noir sur blanc dans le devis." },
    { q: "Pouvez-vous reprendre une application existante ?", a: "Oui, après un audit du code et de l'architecture, je peux reprendre, corriger ou faire évoluer une application développée par quelqu'un d'autre." },
  ],
  related: [
    { href: "/portfolio/outplanners", badge: "Étude de cas", label: "Outplanners en détail", desc: "La plateforme de réservation des pros du plein air." },
    { href: "/boutique-e-commerce-hautes-alpes", badge: "E-commerce", label: "Boutique en ligne & réservation", desc: "Un besoin plus simple ? Une boutique peut suffire." },
    { href: "/blog/digitaliser-reservations-tourisme-hautes-alpes", badge: "Tourisme", label: "Digitaliser ses réservations", desc: "Les gains concrets pour les prestataires du 05." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Développement d'application web sur-mesure",
    serviceType: "Développement d'application web",
    provider: { "@type": "ProfessionalService", "@id": "https://www.facenordgraphisme.fr/#localbusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: ["Hautes-Alpes", "France"],
    description: "Conception et développement d'applications web et de logiciels SaaS sur-mesure : réservation, planning, espace client, tableaux de bord, paiements Stripe.",
  },
};

export default function ApplicationWebPage() {
  return <ServicePageLayout data={data} />;
}
