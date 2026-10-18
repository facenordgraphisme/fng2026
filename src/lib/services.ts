// Catalogue unique des prestations — source de vérité pour les cartes de
// l'accueil, la page /prestations, le menu et le footer. Les pages détaillées
// (src/app/<slug>/page.tsx) gardent leur propre contenu long.

import { PenTool, ShoppingCart, RefreshCcw, Search, Shield, AppWindow } from "lucide-react";
import type { ComponentType } from "react";

export interface ServiceExample {
  title: string;
  /** Page portfolio du projet */
  href: string;
  image: string;
}

export interface ServiceCard {
  href: string;
  /** Libellé court pour le menu et le footer */
  navLabel: string;
  icon: ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  title: string;
  /** La situation du client, formulée comme il se la pose */
  problem: string;
  /** Ce que je fais pour lui, en une phrase */
  promise: string;
  /** Résultats concrets */
  outcomes: string[];
  tech?: string;
  pricingFrom: string;
  example?: ServiceExample;
}

export const SERVICES: ServiceCard[] = [
  {
    href: "/creation-site-internet-hautes-alpes",
    navLabel: "Site vitrine",
    icon: PenTool,
    title: "Site internet vitrine",
    problem: "Pas encore de site, ou un site qui ne vous apporte aucun client ?",
    promise: "Je crée un site clair et rapide qui présente votre activité et transforme vos visiteurs en appels et demandes de devis.",
    outcomes: ["Design sur-mesure, à votre image", "Vous le modifiez vous-même, sans technicien", "Optimisé pour Google dès la mise en ligne"],
    pricingFrom: "dès 500 € HT",
    example: { title: "La Montagne Guide", href: "/portfolio/la-montagne-guide", image: "/assets/portfolio/lamontagneguide-home.webp" },
  },
  {
    href: "/boutique-e-commerce-hautes-alpes",
    navLabel: "E-commerce",
    icon: ShoppingCart,
    title: "Boutique en ligne & réservation",
    problem: "Vous voulez vendre vos produits ou vos activités en ligne, sans commission ?",
    promise: "Vos clients commandent, réservent et paient en ligne, 24 h/24. Vous gérez tout depuis une interface simple.",
    outcomes: ["Paiement par carte sécurisé (Stripe)", "Produits, stocks et commandes gérés par vous", "Calendrier de réservation en ligne"],
    tech: "WooCommerce · Sanity · Stripe",
    pricingFrom: "dès 800 € HT",
    example: { title: "GAEC des Valentins", href: "/portfolio/gaec-des-valentins", image: "/assets/portfolio/gaecdesvalentins-home.png" },
  },
  {
    href: "/refonte-ai-friendly",
    navLabel: "Refonte de site",
    icon: RefreshCcw,
    title: "Refonte « prête pour l'IA »",
    problem: "Votre site a vieilli : lent, mal affiché sur mobile, plus visible nulle part ?",
    promise: "Je modernise votre site existant et je le structure pour qu'il soit compris et recommandé par Google et par les IA.",
    outcomes: ["Design moderne et rapide sur mobile", "Votre référencement actuel est conservé", "Lisible par ChatGPT, Gemini et Perplexity"],
    pricingFrom: "dès 400 € HT",
    example: { title: "Voyageurs des Alpes", href: "/portfolio/voyageurs-des-alpes", image: "/assets/portfolio/voyageursdesalpes-home.webp" },
  },
  {
    href: "/referencement-seo-hautes-alpes",
    navLabel: "Référencement Google & IA",
    icon: Search,
    title: "Référencement Google & IA",
    problem: "Vos clients ne vous trouvent pas sur Google, ni quand ils interrogent ChatGPT ?",
    promise: "J'améliore votre position sur Google (SEO) et votre présence dans les réponses des intelligences artificielles (GEO).",
    outcomes: ["Audit clair et plan d'action priorisé", "Fiche Google Business Profile optimisée", "Contenus structurés pour être cités par les IA"],
    tech: "SEO local · GEO",
    pricingFrom: "sur devis",
    example: { title: "ÉvasionSki", href: "/portfolio/evasionski", image: "/assets/portfolio/evasionski-home.webp" },
  },
  {
    href: "/maintenance-site-internet-hautes-alpes",
    navLabel: "Maintenance",
    icon: Shield,
    title: "Maintenance & sécurité",
    problem: "Pas le temps de gérer les mises à jour, les sauvegardes et les petites modifs ?",
    promise: "Je veille sur votre site chaque mois pour qu'il reste rapide, sécurisé et à jour. Vous vous concentrez sur votre métier.",
    outcomes: ["Mises à jour et sauvegardes automatiques", "Surveillance 24/7 et intervention rapide", "1 h de modifications incluse chaque mois"],
    tech: "WordPress · Next.js",
    pricingFrom: "dès 20 € HT/mois",
  },
  {
    href: "/developpement-application-web",
    navLabel: "Application web",
    icon: AppWindow,
    title: "Application web sur-mesure",
    problem: "Votre organisation tient sur Excel, papier et coups de fil ?",
    promise: "Je développe l'outil en ligne taillé pour votre métier : plateforme de réservation, espace client, tableau de bord, logiciel SaaS.",
    outcomes: ["Planning, réservations, paiements et comptes", "Accessible partout, sur ordinateur et mobile", "Pensé avec vous, évolutif dans le temps"],
    tech: "Next.js · Base de données · Stripe",
    pricingFrom: "sur devis",
    example: { title: "Outplanners", href: "/portfolio/outplanners", image: "/assets/portfolio/outplanners-home.webp" },
  },
];
