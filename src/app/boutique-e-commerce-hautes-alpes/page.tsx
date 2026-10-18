import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { ShoppingCart, CreditCard, Package, CalendarCheck, Search, PencilLine } from "lucide-react";

export const metadata: Metadata = {
  title: "Création de boutique en ligne & réservation — Hautes-Alpes",
  description: "Création de site e-commerce et de réservation en ligne dans les Hautes-Alpes : WooCommerce, Sanity, paiement Stripe. Vendez vos produits et activités sans commission. Dès 2 500 € HT.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/boutique-e-commerce-hautes-alpes" },
  openGraph: { title: "Boutique en ligne Hautes-Alpes | Face Nord Graphisme", description: "Vendez vos produits, séjours et activités en ligne, sans commission. WooCommerce, Sanity, paiement Stripe.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/portfolio/gaecdesvalentins-home.png", width: 2560, height: 1048, alt: "Boutique en ligne du GAEC des Valentins réalisée par Face Nord Graphisme" }] },
};

const data: ServicePageData = {
  badge: "Boutique en ligne",
  headline: "Vendez vos produits et vos activités en ligne, sans commission",
  intro: "Boutique en ligne ou réservation d'activités : vos clients choisissent, réservent et paient en ligne, 24 h/24. Vous gérez vos produits, stocks et commandes depuis une interface simple — et vous ne reversez rien à une plateforme.",
  path: "/boutique-e-commerce-hautes-alpes",
  breadcrumbLabel: "Boutique en ligne & réservation",
  pricingFrom: "dès 2 500 € HT",
  pricingLabel: "Boutique ou réservation en ligne",
  stats: [
    { value: "dès 2 500 €", label: "Boutique clé en main" },
    { value: "0 %", label: "Commission sur vos ventes" },
    { value: "4-8 sem.", label: "Délai de réalisation" },
    { value: "Stripe", label: "Paiement sécurisé" },
  ],
  forWho: [
    "Vous vendez des produits (producteur, artisan, créateur) et voulez les vendre en ligne",
    "Vous proposez des activités ou séjours et voulez des réservations payées à l'avance",
    "Vous en avez assez de reverser 15 à 20 % de commission aux plateformes",
    "Vous gérez aujourd'hui vos commandes par téléphone, mail ou SMS",
  ],
  features: [
    { icon: ShoppingCart, title: "Une boutique simple à gérer", desc: "Ajoutez un produit, changez un prix, gérez vos stocks et vos promotions en quelques clics, sans connaissance technique.", stat: "Formation incluse" },
    { icon: CreditCard, title: "Paiement sécurisé par Stripe", desc: "Carte bancaire, Apple Pay, Google Pay, avec authentification 3D Secure. L'argent arrive directement sur votre compte.", stat: "Stripe + 3D Secure" },
    { icon: CalendarCheck, title: "Réservation en ligne", desc: "Calendrier de disponibilités, nombre de places, acomptes ou paiement complet, rappels automatiques : idéal pour les sorties, stages et séjours.", stat: "Calendrier & places" },
    { icon: Package, title: "Commandes automatisées", desc: "Emails de confirmation, notifications de préparation et récapitulatifs envoyés automatiquement à vos clients et à vous.", stat: "Emails automatiques" },
    { icon: Search, title: "Produits visibles sur Google", desc: "Chaque produit ou activité a sa page optimisée, avec prix et disponibilité lisibles par Google et les IA.", stat: "Données Product" },
    { icon: PencilLine, title: "La bonne technologie pour vous", desc: "WooCommerce pour un catalogue classique et autonome, ou une solution sur-mesure (Next.js + Sanity + Stripe) pour une expérience plus rapide et des besoins spécifiques.", stat: "WooCommerce ou sur-mesure" },
  ],
  example: {
    title: "GAEC des Valentins",
    href: "/portfolio/gaec-des-valentins",
    url: "https://gaecdesvalentins.fr",
    image: "/assets/portfolio/gaecdesvalentins-home.png",
    desc: "Élevage d'agneaux à Châteauroux-les-Alpes : les éleveurs vendent leurs colis de viande directement en ligne, sans intermédiaire, et mettent à jour leur boutique eux-mêmes.",
    points: [
      "Boutique WooCommerce avec colis et formats multiples",
      "Paiement Stripe et emails de confirmation automatiques",
      "Valorisation de la ferme et des activités pour les familles",
    ],
  },
  process: [
    { num: "01", title: "Cadrage", desc: "Vos produits ou activités, votre logistique, vos modes de paiement : on choisit ensemble la solution adaptée." },
    { num: "02", title: "Design", desc: "Maquettes de la boutique, des fiches produits et du parcours d'achat, validées avec vous." },
    { num: "03", title: "Développement", desc: "Mise en place du catalogue, de Stripe, des emails et des réservations. Tests de paiement complets." },
    { num: "04", title: "Lancement", desc: "Formation à la gestion des commandes, mise en ligne et 30 jours de suivi." },
  ],
  bodyBlocks: [
    {
      heading: "Vendre en direct : ce que ça change pour une entreprise du 05",
      paragraphs: [
        "Producteurs, artisans, guides, loueurs de matériel, hébergeurs : dans les Hautes-Alpes, beaucoup d'activités passent encore par le téléphone ou par des plateformes qui prélèvent 15 à 20 % de commission. Une boutique ou un module de réservation sur votre propre site vous permet d'encaisser directement, de garder la relation avec vos clients et de vendre même quand vous êtes sur le terrain.",
        "L'investissement se rentabilise vite : quelques dizaines de réservations par saison qui ne passent plus par une plateforme suffisent souvent à couvrir le coût du site.",
      ],
    },
    {
      heading: "WooCommerce ou sur-mesure avec Sanity et Stripe ?",
      paragraphs: [
        "WooCommerce (WordPress) est la solution idéale pour un catalogue classique de quelques produits à quelques centaines : robuste, autonome, avec de nombreuses extensions. C'est la base de boutiques comme celle du GAEC des Valentins ou du site de Voyageurs des Alpes.",
        "Pour une expérience plus rapide, une logique de réservation spécifique ou un design sans compromis, je développe une solution sur-mesure en Next.js, avec Sanity pour gérer les contenus et Stripe pour les paiements. Je vous recommande l'option la plus simple qui répond vraiment à votre besoin.",
      ],
    },
  ],
  pricingItems: [
    "Boutique WooCommerce ou solution sur-mesure (Sanity + Stripe)",
    "Paiement Stripe : CB, Apple Pay, Google Pay",
    "Gestion des stocks, variantes et promotions",
    "Réservation en ligne avec calendrier et places (si besoin)",
    "Emails automatiques de commande et de confirmation",
    "Pages produits optimisées pour Google",
    "Formation + 30 jours de suivi après lancement",
  ],
  faqs: [
    { q: "WooCommerce, Shopify ou sur-mesure : que choisir ?", a: "WooCommerce convient à la plupart des boutiques : vous êtes propriétaire de votre site et il n'y a pas d'abonnement à la plateforme. Shopify peut convenir à de la vente très standardisée mais coûte un abonnement mensuel et des frais. Le sur-mesure (Next.js + Sanity + Stripe) est pertinent pour des réservations complexes ou une expérience très rapide. Je vous conseille selon votre activité, pas selon mes préférences." },
    { q: "Comment suis-je payé ?", a: "Les paiements passent par Stripe et arrivent directement sur votre compte bancaire, en général sous quelques jours. Stripe prélève uniquement ses frais de transaction (de l'ordre de 1,5 % + 0,25 € par paiement par carte européenne). Je ne prends aucune commission." },
    { q: "Puis-je gérer des réservations avec un nombre de places limité ?", a: "Oui : dates, créneaux, nombre de places, acompte ou paiement total, options (location de matériel, repas…). Les places restantes se mettent à jour automatiquement." },
    { q: "Ma boutique sera-t-elle bien référencée ?", a: "Oui : chaque produit ou activité dispose de sa propre page optimisée (titre, description, données structurées de prix et de disponibilité), ce qui permet à Google et aux IA de comprendre et d'afficher votre offre." },
    { q: "Que se passe-t-il en cas de problème après le lancement ?", a: "30 jours de suivi sont inclus. Ensuite, le forfait maintenance (dès 50 € HT/mois) couvre les mises à jour, les sauvegardes, la vérification du tunnel de paiement et 1 h de modifications par mois." },
  ],
  related: [
    { href: "/blog/reservation-directe-eviter-commissions-booking-hautes-alpes", badge: "Réservation", label: "Réservation directe : éviter les commissions", desc: "Comment récupérer vos marges face aux plateformes." },
    { href: "/blog/digitaliser-reservations-tourisme-hautes-alpes", badge: "Tourisme", label: "Digitaliser ses réservations dans les Hautes-Alpes", desc: "Réduire les no-shows et automatiser les rappels." },
    { href: "/developpement-application-web", badge: "Sur-mesure", label: "Besoin d'un vrai outil de réservation ?", desc: "Planning, guides, paiements : découvrez les applications web sur-mesure." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création de boutique en ligne et réservation",
    serviceType: "Création de site e-commerce",
    provider: { "@type": "ProfessionalService", "@id": "https://www.facenordgraphisme.fr/#localbusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Création de boutiques en ligne (WooCommerce, Sanity, Stripe) et de systèmes de réservation pour les entreprises des Hautes-Alpes.",
    offers: { "@type": "Offer", priceCurrency: "EUR", price: "2500", priceSpecification: { "@type": "UnitPriceSpecification", price: "2500", priceCurrency: "EUR", unitText: "à partir de" } },
  },
};

export default function EcommercePage() {
  return <ServicePageLayout data={data} />;
}
