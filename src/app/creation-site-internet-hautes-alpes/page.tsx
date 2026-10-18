import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { Smartphone, Zap, Search, PencilLine, PenTool, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Création de site internet vitrine — Hautes-Alpes",
  description: "Création de site internet vitrine dans les Hautes-Alpes (Embrun, Gap, Briançon). Design sur-mesure, rapide sur mobile, modifiable par vous et optimisé pour Google. Dès 800 € HT, devis gratuit.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/creation-site-internet-hautes-alpes" },
  openGraph: { title: "Création de site internet Hautes-Alpes | Face Nord Graphisme", description: "Un site vitrine clair et rapide qui transforme vos visiteurs en clients. Design sur-mesure, SEO local, mobile-first. Dès 800 € HT.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/portfolio/lamontagneguide-home.webp", width: 1920, height: 1200, alt: "Site vitrine La Montagne Guide réalisé par Face Nord Graphisme" }] },
};

const data: ServicePageData = {
  badge: "Site vitrine",
  headline: "Un site internet qui présente votre activité et vous amène des clients",
  intro: "Je conçois des sites vitrines sur-mesure pour les artisans, commerçants, guides et pros du tourisme des Hautes-Alpes : clairs, rapides sur mobile, faciles à modifier et optimisés pour Google dès le premier jour.",
  path: "/creation-site-internet-hautes-alpes",
  breadcrumbLabel: "Création de site internet",
  pricingFrom: "dès 800 € HT",
  pricingLabel: "Site one-page · vitrine complète dès 1 200 € HT",
  stats: [
    { value: "dès 800 €", label: "Site one-page" },
    { value: "2-4 sem.", label: "Pour un site vitrine" },
    { value: "100 %", label: "Le site vous appartient" },
    { value: "30 j", label: "De suivi après la mise en ligne" },
  ],
  forWho: [
    "Vous n'avez pas encore de site et vos clients vous cherchent sur Google",
    "Vous dépendez d'une page Facebook ou d'une plateforme pour être trouvé",
    "Vous voulez recevoir des demandes de devis et des appels, pas juste exister en ligne",
    "Vous voulez pouvoir changer vos textes et photos vous-même",
  ],
  features: [
    { icon: PenTool, title: "Un design à votre image", desc: "Pas de modèle générique : le site est dessiné pour votre activité, votre clientèle et votre identité visuelle. Vous validez les maquettes avant tout développement.", stat: "Maquettes validées avec vous" },
    { icon: Smartphone, title: "Parfait sur téléphone", desc: "La majorité de vos visiteurs arrivent depuis un mobile. Le site est conçu d'abord pour eux : lisible, rapide, boutons d'appel et d'itinéraire à portée de pouce.", stat: "Mobile-first" },
    { icon: Zap, title: "Rapide à charger", desc: "Images optimisées, code léger, hébergement performant. Un site rapide garde vos visiteurs et il est mieux classé par Google.", stat: "Core Web Vitals au vert" },
    { icon: Search, title: "Visible sur Google dès le départ", desc: "Titres, descriptions, structure des pages, données structurées et fiche Google Business Profile : le référencement local est intégré à la construction, pas ajouté en option.", stat: "SEO local inclus" },
    { icon: PencilLine, title: "Vous restez autonome", desc: "Une interface simple pour modifier vos textes, photos, horaires ou actualités depuis votre ordinateur ou votre téléphone. Formation incluse.", stat: "Formation incluse" },
    { icon: BarChart3, title: "Des résultats mesurables", desc: "Statistiques de visites et suivi Google Search Console installés à la livraison : vous savez combien de personnes vous trouvent, et comment.", stat: "Statistiques incluses" },
  ],
  example: {
    title: "La Montagne Guide — Nicolas Draperi",
    href: "/portfolio/la-montagne-guide",
    url: "https://www.la-montagne-guide.fr",
    image: "/assets/portfolio/lamontagneguide-home.webp",
    desc: "Site vitrine d'un guide de haute montagne basé dans les Écrins : une vitrine immersive qui présente ses activités et ses prochaines sorties, et qui transforme les visiteurs en demandes de séjour.",
    points: [
      "Pages dédiées à chaque activité : alpinisme, ski, escalade, cascade de glace",
      "Calendrier des prochaines sorties et contact WhatsApp en un clic",
      "Contenus modifiables par le guide lui-même (Sanity)",
    ],
  },
  process: [
    { num: "01", title: "On fait connaissance", desc: "30 min d'échange (visio ou rendez-vous) pour comprendre votre activité, vos clients et vos objectifs." },
    { num: "02", title: "Maquettes", desc: "Je vous présente l'organisation des pages et le design. On ajuste ensemble jusqu'à validation." },
    { num: "03", title: "Développement", desc: "Je construis le site, j'intègre vos contenus et vous suivez l'avancement en ligne." },
    { num: "04", title: "Mise en ligne", desc: "Tests, mise en ligne, déclaration à Google et formation. Suivi de 30 jours inclus." },
  ],
  bodyBlocks: [
    {
      heading: "Pourquoi un site vitrine reste indispensable en 2026",
      paragraphs: [
        "Avant d'appeler un artisan, de réserver une sortie ou de pousser la porte d'une boutique, presque tout le monde passe par Google — et de plus en plus par ChatGPT ou Gemini. Votre site est l'endroit où vous maîtrisez entièrement votre image : vos services, vos tarifs, vos photos, vos avis, vos coordonnées.",
        "Une page Facebook ou une fiche sur une plateforme ne suffit pas : vous ne la contrôlez pas, elle est mal référencée, et elle met vos concurrents juste à côté de vous. Un site bien construit travaille pour vous 24 h/24, y compris pendant la saison où vous n'avez pas le temps de répondre au téléphone.",
      ],
    },
    {
      heading: "Un site sur-mesure, sans complexité pour vous",
      paragraphs: [
        "Je m'occupe de tout : nom de domaine, hébergement, design, intégration des textes et des photos, référencement, mise en ligne. Si vous n'avez pas de textes, je peux les rédiger avec vous à partir d'un simple échange.",
        "Selon votre besoin, le site est construit sous WordPress ou en Next.js avec le CMS Sanity — dans les deux cas, vous disposez d'une interface simple pour le faire vivre, et le code vous appartient.",
      ],
    },
  ],
  pricingItems: [
    "Design sur-mesure aligné avec votre identité",
    "Site adapté au mobile, testé sur iPhone et Android",
    "Référencement local : titres, descriptions, structure, sitemap",
    "Fiche Google Business Profile vérifiée et optimisée",
    "Formulaire de contact, HTTPS et mentions légales RGPD",
    "Statistiques de visites et Google Search Console",
    "Formation à l'administration + suivi 30 jours",
  ],
  faqs: [
    { q: "Combien coûte un site vitrine dans les Hautes-Alpes ?", a: "Un site one-page (une seule page qui présente l'essentiel) démarre à 800 € HT. Un site vitrine de plusieurs pages (services, réalisations, à propos, contact, blog) démarre à 1 200 € HT. Le prix final dépend du nombre de pages, de la rédaction des textes et des fonctionnalités. Le devis est gratuit et détaillé." },
    { q: "En combien de temps mon site sera-t-il en ligne ?", a: "Comptez 1 à 2 semaines pour un site one-page et 2 à 4 semaines pour un site vitrine complet. Le délai dépend surtout de la rapidité de validation des maquettes et de la fourniture des contenus (textes, photos, logo)." },
    { q: "Mon site apparaîtra-t-il sur Google ?", a: "Oui : le site est déclaré à Google dès sa mise en ligne et il est indexé en général sous 2 à 4 semaines. Être en première page sur des recherches comme « votre métier + votre ville » demande ensuite quelques mois ; tout ce qui accélère ce travail (structure, vitesse, fiche Google Business Profile) est intégré dès la création." },
    { q: "Puis-je modifier mon site moi-même ?", a: "Oui. Vous disposez d'une interface d'administration simple pour changer vos textes, photos, horaires ou actualités, depuis un ordinateur ou un téléphone. Une formation est incluse à la livraison." },
    { q: "Je n'ai ni textes ni photos, est-ce un problème ?", a: "Non. Je peux rédiger les textes avec vous à partir d'un entretien, et sélectionner des photos adaptées ou vous conseiller pour un reportage photo. Ces options sont chiffrées clairement dans le devis." },
    { q: "Travaillez-vous en dehors d'Embrun ?", a: "Oui, dans tout le département : Gap, Briançon, Guillestre, Serre-Ponçon, Queyras… Les échanges se font en rendez-vous ou en visio selon votre préférence, et je travaille aussi avec des clients partout en France." },
  ],
  related: [
    { href: "/blog/prix-site-internet-artisan-pme-hautes-alpes", badge: "Tarifs", label: "Combien coûte un site internet dans les Hautes-Alpes ?", desc: "Les tarifs 2026 détaillés, avec exemples concrets." },
    { href: "/blog/seo-local-hautes-alpes-artisans-pme", badge: "SEO local", label: "SEO local : le guide complet pour le 05", desc: "Comment apparaître en première page pour les recherches locales." },
    { href: "/portfolio", badge: "Réalisations", label: "Voir tous les sites réalisés", desc: "Guides de montagne, restaurants, producteurs, prestataires outdoor." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création de site internet vitrine",
    serviceType: "Création de site internet",
    provider: { "@type": "ProfessionalService", "@id": "https://www.facenordgraphisme.fr/#localbusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Création de sites internet vitrines sur-mesure pour artisans, commerçants et professionnels du tourisme des Hautes-Alpes.",
    offers: { "@type": "Offer", priceCurrency: "EUR", price: "800", priceSpecification: { "@type": "UnitPriceSpecification", price: "800", priceCurrency: "EUR", unitText: "à partir de" } },
  },
};

export default function CreationSiteInternetPage() {
  return <ServicePageLayout data={data} />;
}
