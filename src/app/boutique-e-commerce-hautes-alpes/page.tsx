import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { ShoppingCart, CreditCard, Package, TrendingUp, RefreshCcw, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Boutique E-commerce Hautes-Alpes — WooCommerce & Next.js",
  description: "Création de boutique e-commerce dans les Hautes-Alpes. WooCommerce, réservation en ligne, paiement sécurisé. Pour artisans, producteurs locaux et prestataires touristiques du 05.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/boutique-e-commerce-hautes-alpes" },
  openGraph: { title: "Boutique E-commerce Hautes-Alpes | Face Nord Graphisme", description: "Sites e-commerce et réservation en ligne pour les PME du 05. WooCommerce, Stripe, paiement sécurisé. Devis gratuit." },
};

const data: ServicePageData = {
  badge: "E-commerce & réservation",
  headline: "Boutique e-commerce et réservation en ligne dans les Hautes-Alpes",
  intro: "Vendez vos produits, activités ou séjours directement en ligne. Sites e-commerce WooCommerce et modules de réservation sécurisés pour les entreprises du 05 — artisans, producteurs et prestataires touristiques.",
  path: "/boutique-e-commerce-hautes-alpes",
  breadcrumbLabel: "Boutique e-commerce",
  heroPhotoId: "photo-1556742049-0cfed4f6a45d",
  heroPhotoAlt: "Commerce local avec caisse enregistreuse et prise en main d'un smartphone pour payer en ligne",
  pricingFrom: "dès 2 500 € HT",
  pricingLabel: "Boutique ou réservation en ligne",
  stats: [
    { value: "2 500€", label: "À partir de" },
    { value: "-30%", label: "Commissions Booking/Airbnb évitées" },
    { value: "4-8 sem", label: "Délai livraison" },
    { value: "100%", label: "RGPD conforme" },
  ],
  features: [
    { icon: ShoppingCart, title: "Boutique WooCommerce sur-mesure", desc: "Gestion des produits, stocks, variations, promotions. Interface admin simple pour tout gérer vous-même sans développeur.", stat: "WordPress + WooCommerce" },
    { icon: CreditCard, title: "Paiement sécurisé (Stripe)", desc: "Carte bancaire, Apple Pay, virement. Intégration Stripe certifiée PCI-DSS. Vos clients paient en toute confiance.", stat: "Stripe + 3D Secure" },
    { icon: Package, title: "Gestion commandes & livraisons", desc: "Emails automatiques de confirmation, notifications de préparation, suivi de commande. Vos clients sont informés à chaque étape.", stat: "Emails auto inclus" },
    { icon: RefreshCcw, title: "Réservation en ligne intégrée", desc: "Calendrier de disponibilités, réservation à la date, rappels automatiques. Réduit les no-shows de 20 à 40 %.", stat: "Rappels SMS/email" },
    { icon: TrendingUp, title: "SEO e-commerce optimisé", desc: "Pages produits avec schema.org Product, breadcrumbs, sitemap dynamique. Chaque produit est indexable sur Google.", stat: "Schema Product + Review" },
    { icon: Shield, title: "Sécurité renforcée & RGPD", desc: "Certificat SSL, sauvegardes automatiques, protection anti-fraude, politique de confidentialité conforme RGPD pour les données clients.", stat: "RGPD + PCI-DSS" },
  ],
  process: [
    { num: "01", title: "Audit & stratégie", desc: "Analyse de vos produits, de vos concurrents et choix de la plateforme adaptée à votre activité." },
    { num: "02", title: "Design boutique", desc: "Maquettes de votre boutique, pages produits, tunnel d'achat et pages de paiement." },
    { num: "03", title: "Développement", desc: "Intégration WooCommerce ou module de réservation, connexion Stripe, tests paiements." },
    { num: "04", title: "Formation & lancement", desc: "Formation à l'ajout de produits, gestion des commandes. Mise en ligne + 30 jours de suivi." },
  ],
  bodyBlocks: [
    {
      heading: "E-commerce dans les Hautes-Alpes : les opportunités concrètes",
      paragraphs: [
        "Le département 05 concentre un potentiel e-commerce encore peu exploité : producteurs locaux (miel, fromages, lavande, vins), prestataires touristiques (activités outdoor, locations de matériel, hébergements), artisans d'art et créateurs. Vendre directement en ligne supprime les intermédiaires — Booking prélève 15 à 18 % de commission sur chaque réservation, Etsy 6,5 % sur chaque vente.",
        "Un site e-commerce se rembourse rapidement : si vous vendez 10 réservations/mois qui passaient par Booking à 150 € chacune, vous économisez 225 € de commissions mensuel. Sur 12 mois, c'est 2 700 € — soit le coût d'un bon site de réservation.",
      ],
    },
    {
      heading: "WooCommerce ou développement sur-mesure ?",
      paragraphs: [
        "Pour la plupart des boutiques de 5 à 200 produits, WooCommerce (WordPress) est la solution idéale : robuste, maintenable, et vous permettez de gérer vos produits vous-même. Pour des besoins spécifiques (catalogue > 500 produits, logique de prix complexe, intégration ERP), nous développons sur Next.js + headless commerce pour des performances maximales.",
        "Dans tous les cas : un panier sécurisé, des emails automatiques de confirmation, et une interface admin que vous pouvez gérer depuis votre téléphone.",
      ],
    },
  ],
  pricingItems: [
    "Boutique WooCommerce ou module de réservation sur-mesure",
    "Intégration Stripe (CB, Apple Pay, Google Pay)",
    "Gestion des stocks, variantes, promotions",
    "Emails automatiques de commande/confirmation/rappel",
    "SEO e-commerce : schema Product, sitemap dynamique",
    "Formation à l'ajout de produits et gestion des commandes",
    "Tests paiements + 30 jours de suivi après lancement",
  ],
  faqs: [
    { q: "WooCommerce ou Shopify pour mon e-commerce dans les Hautes-Alpes ?", a: "WooCommerce est préférable si vous voulez maîtriser votre plateforme, éviter les abonnements mensuels élevés (Shopify facture 32 à 79 €/mois) et avoir un code qui vous appartient totalement. Shopify peut convenir si vous vendez principalement à l'international avec des besoins très standards. Nous travaillons sur les deux." },
    { q: "Puis-je synchroniser ma boutique en ligne avec mes disponibilités Airbnb/Booking ?", a: "Oui. Nous intégrons des connecteurs iCal pour synchroniser votre calendrier de disponibilités avec Airbnb, Booking.com et d'autres plateformes. Ainsi, vous gérez vos disponibilités depuis un seul endroit et évitez les double-réservations." },
    { q: "Ma boutique sera-t-elle référencée sur Google ?", a: "Oui. Nous configurons les balises Schema.org pour chaque produit (prix, disponibilité, avis), ce qui permet à Google d'afficher des rich snippets dans les résultats. Nous optimisons aussi les titres et descriptions de chaque produit pour les requêtes locales (ex : 'miel lavande Hautes-Alpes', 'location kayak Serre-Ponçon')." },
    { q: "Que se passe-t-il si j'ai un problème technique après lancement ?", a: "30 jours de suivi sont inclus après la mise en ligne pour corriger tout bug ou problème. Au-delà, vous pouvez souscrire à notre forfait maintenance mensuel (à partir de 50 € HT/mois) qui inclut les mises à jour sécurité, les sauvegardes et 1 h d'assistance technique mensuelle." },
  ],
  related: [
    { href: "/blog/digitaliser-reservations-tourisme-hautes-alpes", badge: "Réservation", label: "Digitaliser ses réservations dans les Hautes-Alpes", desc: "Réduire les no-shows, automatiser les rappels et vendre en direct." },
    { href: "/blog/prix-site-internet-artisan-pme-hautes-alpes", badge: "Tarifs", label: "Combien coûte un site e-commerce ?", desc: "Guide complet des tarifs 2026 pour les boutiques en ligne." },
    { href: "/villes/embrun-serre-poncon", badge: "Local", label: "Agence web Embrun & Serre-Ponçon", desc: "Prestataires touristiques : vos besoins spécifiques, nos solutions." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création de boutique e-commerce",
    provider: { "@type": "LocalBusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Création de boutiques e-commerce et modules de réservation en ligne pour les entreprises des Hautes-Alpes.",
  },
};

export default function EcommercePage() {
  return <ServicePageLayout data={data} />;
}
