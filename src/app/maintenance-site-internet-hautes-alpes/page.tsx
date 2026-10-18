import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { Shield, RefreshCcw, Clock, Bell, Lock, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Maintenance de site internet — WordPress & Next.js | Hautes-Alpes",
  description: "Maintenance de site internet dans les Hautes-Alpes : mises à jour, sauvegardes, sécurité, surveillance 24/7 et 1 h de modifications par mois. WordPress, WooCommerce et Next.js. Dès 50 € HT/mois, sans engagement.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/maintenance-site-internet-hautes-alpes" },
  openGraph: { title: "Maintenance de site internet Hautes-Alpes | Face Nord Graphisme", description: "Un site toujours à jour, sauvegardé et sécurisé. WordPress et Next.js. Dès 50 € HT/mois, sans engagement.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/home-realisations.webp", width: 1500, height: 1200, alt: "Sites internet maintenus par Face Nord Graphisme" }] },
};

const data: ServicePageData = {
  badge: "Maintenance",
  headline: "Votre site toujours à jour, sauvegardé et sécurisé — sans y penser",
  intro: "Un site, comme un véhicule, a besoin d'entretien : mises à jour, sauvegardes, surveillance, petites modifications. Je m'en occupe chaque mois pour que votre site reste rapide et fiable, et que vous puissiez vous concentrer sur votre métier.",
  path: "/maintenance-site-internet-hautes-alpes",
  breadcrumbLabel: "Maintenance de site internet",
  pricingFrom: "dès 50 € HT/mois",
  pricingLabel: "Forfait essentiel, sans engagement",
  stats: [
    { value: "50 €/mois", label: "Forfait essentiel" },
    { value: "24/7", label: "Surveillance de disponibilité" },
    { value: "1 h", label: "De modifications incluse / mois" },
    { value: "0", label: "Engagement de durée" },
  ],
  forWho: [
    "Vous n'avez ni le temps ni l'envie de gérer les mises à jour",
    "Votre site WordPress affiche des alertes ou des extensions obsolètes",
    "Vous voulez un interlocuteur pour vos petites modifications du quotidien",
    "Votre site est essentiel à votre activité (boutique, réservations) et ne doit pas tomber",
  ],
  features: [
    { icon: RefreshCcw, title: "Mises à jour maîtrisées", desc: "WordPress, extensions, thème ou dépendances Next.js : chaque mise à jour est vérifiée pour ne rien casser.", stat: "Testées avant application" },
    { icon: Shield, title: "Sauvegardes automatiques", desc: "Fichiers et base de données sauvegardés automatiquement et stockés hors du serveur. En cas de souci, le site est restauré rapidement.", stat: "Sauvegardes externalisées" },
    { icon: Lock, title: "Sécurité", desc: "Protection contre les tentatives d'intrusion, détection de logiciels malveillants, certificat HTTPS toujours valide.", stat: "Surveillance continue" },
    { icon: Bell, title: "Alerte en cas de panne", desc: "Si votre site devient inaccessible, je suis alerté immédiatement — souvent avant vos clients.", stat: "Monitoring 24/7" },
    { icon: Clock, title: "Vos petites modifications", desc: "1 heure par mois pour changer un texte, une photo, des horaires, ajouter une actualité ou corriger un détail.", stat: "1 h/mois incluse" },
    { icon: BarChart3, title: "Rapport mensuel", desc: "Ce qui a été fait, l'état de santé du site et les points d'attention : vous savez exactement ce que vous payez.", stat: "Transparence totale" },
  ],
  process: [
    { num: "01", title: "État des lieux", desc: "Versions, extensions, sécurité, sauvegardes existantes : un audit initial offert." },
    { num: "02", title: "Remise à niveau", desc: "Correction des points urgents et mise en place des sauvegardes et de la surveillance." },
    { num: "03", title: "Suivi mensuel", desc: "Mises à jour, contrôles, modifications demandées et rapport chaque mois." },
    { num: "04", title: "Intervention rapide", desc: "En cas de panne ou de piratage, intervention prioritaire sous 24 h ouvrées." },
  ],
  bodyBlocks: [
    {
      heading: "Pourquoi entretenir son site ?",
      paragraphs: [
        "Les sites WordPress reposent sur de nombreuses extensions mises à jour en permanence ; une extension oubliée est la porte d'entrée la plus fréquente des piratages. Un site piraté peut être signalé comme dangereux par Google, perdre ses positions et afficher un avertissement à vos visiteurs — la remise en état coûte bien plus cher qu'un entretien régulier.",
        "Dans les Hautes-Alpes, la saison ne prévient pas : une panne en juillet ou pendant les vacances de février, c'est autant de réservations et de demandes perdues. La maintenance est une assurance, au même titre que celle de votre véhicule.",
      ],
    },
    {
      heading: "WordPress, WooCommerce ou Next.js",
      paragraphs: [
        "Je maintiens les sites WordPress et WooCommerce comme les sites Next.js (avec ou sans Sanity), que je les aie créés ou non. Pour les boutiques et les sites de réservation, la maintenance inclut aussi la vérification régulière du parcours de commande et des paiements.",
      ],
    },
  ],
  pricingItems: [
    "Mises à jour vérifiées (WordPress, extensions, dépendances)",
    "Sauvegardes automatiques externalisées",
    "Surveillance de disponibilité 24/7",
    "Protection et contrôle de sécurité",
    "1 h de modifications incluse chaque mois",
    "Rapport mensuel des actions effectuées",
    "Intervention prioritaire en cas d'incident",
  ],
  faqs: [
    { q: "Pouvez-vous maintenir un site que vous n'avez pas créé ?", a: "Oui. Je commence par un audit initial offert pour faire le point (versions, extensions, sécurité, sauvegardes). S'il y a des corrections urgentes, je vous les signale et les chiffre avant de démarrer le forfait." },
    { q: "Que se passe-t-il si mon site est piraté ?", a: "J'interviens en priorité : nettoyage, correction de la faille, restauration depuis la dernière sauvegarde saine et, si besoin, demande de réexamen auprès de Google. Pour les sites sous contrat, cette intervention est incluse." },
    { q: "La maintenance inclut-elle les modifications de contenu ?", a: "Oui, dans la limite d'1 h par mois : textes, images, horaires, actualités, petits ajustements. Les évolutions plus importantes (nouvelles pages, nouvelles fonctionnalités) font l'objet d'un devis." },
    { q: "Y a-t-il un engagement ?", a: "Non. Le forfait est mensuel et résiliable avec un préavis de 30 jours. En cas d'arrêt, je vous transmets tous les accès et un état du site." },
    { q: "L'hébergement et le nom de domaine sont-ils compris ?", a: "Ils sont facturés à part, à prix coûtant ou directement par votre hébergeur. Je peux les gérer pour vous si vous le souhaitez." },
  ],
  related: [
    { href: "/refonte-ai-friendly", badge: "Refonte", label: "Votre site est trop ancien ?", desc: "Parfois, une refonte coûte moins cher que de maintenir l'existant." },
    { href: "/creation-site-internet-hautes-alpes", badge: "Création", label: "Création de site vitrine", desc: "Un nouveau site, dès 800 € HT." },
    { href: "/blog/prix-site-internet-artisan-pme-hautes-alpes", badge: "Tarifs", label: "Combien coûte un site internet ?", desc: "Création, refonte et maintenance : les tarifs 2026." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Maintenance de site internet",
    serviceType: "Maintenance de site web",
    provider: { "@type": "ProfessionalService", "@id": "https://www.facenordgraphisme.fr/#localbusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Maintenance de sites WordPress, WooCommerce et Next.js : mises à jour, sauvegardes, sécurité, surveillance et modifications mensuelles.",
    offers: { "@type": "Offer", priceCurrency: "EUR", price: "50", priceSpecification: { "@type": "UnitPriceSpecification", price: "50", priceCurrency: "EUR", unitText: "par mois à partir de" } },
  },
};

export default function MaintenancePage() {
  return <ServicePageLayout data={data} />;
}
