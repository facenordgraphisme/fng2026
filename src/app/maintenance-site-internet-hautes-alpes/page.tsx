import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { Shield, RefreshCcw, Clock, Bell, Lock, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Maintenance Site Internet Hautes-Alpes — WordPress & Next.js",
  description: "Maintenance de site internet dans les Hautes-Alpes. Mises à jour WordPress, sauvegardes, sécurité, corrections de bugs. Forfaits maintenance dès 50 € HT/mois pour artisans et PME du 05.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/maintenance-site-internet-hautes-alpes" },
  openGraph: { title: "Maintenance Site Internet Hautes-Alpes | Face Nord Graphisme", description: "Forfaits maintenance WordPress et Next.js pour PME du 05. Sauvegardes, mises à jour, sécurité, corrections bugs. Dès 50 € HT/mois." },
};

const data: ServicePageData = {
  badge: "Maintenance web",
  headline: "Maintenance de site internet dans les Hautes-Alpes",
  intro: "Votre site tourne en arrière-plan — mais sans maintenance, une mise à jour WordPress cassée, un plugin vulnérable ou un formulaire de contact silencieux peut vous coûter des clients. Forfaits maintenance WordPress et Next.js dès 50 € HT/mois pour les entreprises du 05.",
  heroPhotoId: "photo-1518770660439-4636190af475",
  heroPhotoAlt: "Tableau de bord de monitoring avec métriques de disponibilité et alertes de sécurité serveur",
  pricingFrom: "dès 50 € HT/mois",
  pricingLabel: "Forfait maintenance essentiel",
  stats: [
    { value: "50€/mois", label: "Forfait essentiel" },
    { value: "43 %", label: "Sites WordPress piratés via plugins obsolètes" },
    { value: "99,9 %", label: "Uptime surveillé" },
    { value: "24 h", label: "Délai intervention critique" },
  ],
  features: [
    { icon: RefreshCcw, title: "Mises à jour WordPress sécurisées", desc: "Mise à jour de WordPress core, thème et plugins testée en staging avant déploiement. Aucune mise à jour appliquée sans vérification préalable.", stat: "Test staging obligatoire" },
    { icon: Shield, title: "Sauvegardes automatiques quotidiennes", desc: "Backup complet (fichiers + base de données) chiffré et stocké hors-site. Restauration complète en moins de 2 heures en cas d'incident.", stat: "Rétention 30 jours" },
    { icon: Lock, title: "Monitoring sécurité & malware", desc: "Scan quotidien de malware, firewall WAF, blocage des tentatives de connexion par force brute, alertes immédiates en cas de compromission.", stat: "Scan quotidien" },
    { icon: Bell, title: "Monitoring disponibilité 24/7", desc: "Alerte SMS/email dans les 5 minutes si votre site tombe. Rapport mensuel d'uptime. Vous êtes informé avant vos clients.", stat: "Alerte en < 5 min" },
    { icon: Clock, title: "Assistance technique mensuelle", desc: "1 heure d'assistance incluse chaque mois : correction de bugs, ajout d'un contenu, modification de texte ou d'image. Sans avoir à payer une intervention.", stat: "1 h/mois incluse" },
    { icon: BarChart3, title: "Rapport mensuel & tableau de bord", desc: "Rapport mensuel avec les actions effectuées, l'uptime, les mises à jour appliquées et les points à surveiller. Vous savez exactement ce qui a été fait.", stat: "Rapport PDF mensuel" },
  ],
  process: [
    { num: "01", title: "Audit initial", desc: "Analyse complète du site : versions, plugins, sécurité, sauvegardes existantes. Rapport et plan d'action." },
    { num: "02", title: "Mise en conformité", desc: "Correction des vulnérabilités critiques, mise en place des sauvegardes et du monitoring avant de commencer le forfait." },
    { num: "03", title: "Forfait mensuel", desc: "Mises à jour, sauvegardes, monitoring, 1 h d'assistance. Rapport mensuel envoyé chaque début de mois." },
    { num: "04", title: "Escalade si besoin", desc: "Pour les incidents majeurs (piratage, mise à jour cassée), intervention prioritaire en moins de 24 h incluse dans tous les forfaits." },
  ],
  bodyBlocks: [
    {
      heading: "Pourquoi la maintenance WordPress est critique pour votre activité",
      paragraphs: [
        "En 2025, 43 % des sites WordPress piratés l'ont été à cause d'un plugin ou d'un thème non mis à jour. Une faille de sécurité peut mener à un blacklistage Google en quelques heures — votre site disparaît des résultats et une bannière rouge s'affiche à vos visiteurs. La remise en ligne après un piratage prend en moyenne 3 à 5 jours et coûte 3 à 10 fois le prix d'une maintenance annuelle.",
        "Pour les Hautes-Alpes avec sa double saisonnalité, une panne pendant juillet-août ou en plein week-end de ski peut signifier des dizaines de réservations ou de contacts manqués. Un forfait maintenance à 50 € HT/mois est une assurance, pas une dépense.",
      ],
    },
    {
      heading: "WordPress ou Next.js : même exigence de maintenance",
      paragraphs: [
        "WordPress demande des mises à jour régulières de son écosystème (core, thème, plugins). Next.js et les sites headless nécessitent des mises à jour des dépendances npm, une surveillance des vulnérabilités connues (CVE), et un renouvellement des certificats SSL. Nous maintenons les deux types d'architectures.",
        "Pour les sites e-commerce et de réservation en particulier, la maintenance inclut une vérification mensuelle du tunnel de paiement : formulaires, emails de confirmation, intégration Stripe. Un paiement silencieusement échoué est un client perdu sans raison apparente.",
      ],
    },
  ],
  pricingItems: [
    "Mises à jour WordPress core, thème et plugins (testées en staging)",
    "Sauvegardes quotidiennes chiffrées hors-site (rétention 30 jours)",
    "Monitoring disponibilité 24/7 avec alerte < 5 min",
    "Scan malware quotidien + firewall WAF",
    "1 h d'assistance technique mensuelle (bugs, contenu, images)",
    "Rapport mensuel des actions effectuées",
    "Intervention prioritaire 24 h pour incidents critiques",
  ],
  faqs: [
    { q: "Puis-je souscrire à la maintenance pour un site que vous n'avez pas créé ?", a: "Oui. Nous commençons par un audit initial (offert pour les nouvelles souscriptions) pour évaluer l'état du site : versions, plugins, sécurité, sauvegardes existantes. Si des corrections urgentes sont nécessaires, nous vous les signalons avant de commencer le forfait mensuel. Nous reprenons en charge des sites WordPress, WooCommerce, Elementor, et sites Next.js." },
    { q: "Que se passe-t-il si mon site est piraté malgré la maintenance ?", a: "En cas de compromission avérée, nous intervenons en priorité dans les 24 heures : nettoyage du malware, analyse de la faille, restauration à partir de la dernière sauvegarde saine, soumission de la demande de révision à Google si le site a été blacklisté. Le coût de l'intervention est couvert par le forfait maintenance." },
    { q: "Est-ce que la maintenance inclut les modifications de contenu ?", a: "Chaque forfait inclut 1 heure d'assistance mensuelle que vous pouvez utiliser pour des corrections de bugs, des modifications de texte ou d'image, ou des ajouts simples. Pour des développements plus importants (nouvelles pages, nouvelles fonctionnalités), nous facturons au taux horaire ou établissons un devis." },
    { q: "Puis-je résilier le forfait à tout moment ?", a: "Oui. Nos forfaits sont sans engagement annuel. Vous pouvez résilier avec un préavis de 30 jours. En cas de résiliation, nous vous transmettons un rapport final de l'état du site et les accès nécessaires pour continuer avec un autre prestataire." },
    { q: "La maintenance couvre-t-elle le nom de domaine et l'hébergement ?", a: "Le forfait maintenance couvre les actions techniques sur votre site (code, base de données, sécurité). Les frais d'hébergement et de nom de domaine sont distincts et restent à votre charge. Nous pouvons gérer votre hébergement pour vous si vous le souhaitez — contactez-nous pour un devis." },
  ],
  related: [
    { href: "/creation-site-internet-hautes-alpes", badge: "Création", label: "Création de site internet Hautes-Alpes", desc: "Nouveau site vitrine professionnel à partir de 800 € HT." },
    { href: "/refonte-ai-friendly", badge: "Refonte", label: "Refonte site internet AI-Friendly", desc: "Modernisez votre site pour Google et les moteurs IA." },
    { href: "/blog/prix-site-internet-artisan-pme-hautes-alpes", badge: "Tarifs", label: "Combien coûte un site internet ?", desc: "Guide complet des tarifs 2026 création, refonte et maintenance." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Maintenance de site internet",
    provider: { "@type": "LocalBusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Maintenance WordPress et Next.js pour artisans et PME des Hautes-Alpes. Sauvegardes, sécurité, mises à jour.",
    offers: { "@type": "Offer", priceCurrency: "EUR", price: "50", priceSpecification: { "@type": "UnitPriceSpecification", price: "50", priceCurrency: "EUR", unitText: "par mois à partir de" } },
  },
};

export default function MaintenancePage() {
  return <ServicePageLayout data={data} />;
}
