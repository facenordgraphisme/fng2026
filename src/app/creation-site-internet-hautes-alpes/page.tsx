import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { Smartphone, Zap, Search, Lock, PenTool, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Création Site Internet Hautes-Alpes",
  description: "Création de site internet professionnel dans les Hautes-Alpes (Gap, Briançon, Embrun). Site vitrine sur-mesure, mobile-first, optimisé SEO. Devis gratuit dès 800 € HT.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/creation-site-internet-hautes-alpes" },
  openGraph: { title: "Création de site internet Hautes-Alpes | Face Nord Graphisme", description: "Sites vitrines professionnels pour artisans et PME du 05. Design sur-mesure, SEO local, mobile-first. À partir de 800 € HT.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/home_intro.png", width: 1200, height: 630, alt: "Face Nord Graphisme - Création de site internet dans les Hautes-Alpes" }] },
};

const data: ServicePageData = {
  badge: "Création de site internet",
  headline: "Création de site internet dans les Hautes-Alpes",
  intro: "Un site web professionnel, rapide et visible sur Google pour les artisans, commerçants et PME de Gap, Briançon, Embrun et de tout le département 05. À partir de 800 € HT.",
  path: "/creation-site-internet-hautes-alpes",
  breadcrumbLabel: "Création de site internet",
  heroPhotoId: "photo-1467232004584-a241de8bcf5d",
  heroPhotoAlt: "Conception d'un site internet — maquettage sur tableau blanc avec wireframes et notes de design",
  pricingFrom: "dès 800 € HT",
  pricingLabel: "Landing page ou site one-page",
  stats: [
    { value: "dès 800€", label: "Landing page" },
    { value: "> 85/100", label: "PageSpeed Mobile" },
    { value: "5-10 j", label: "Délai livraison" },
    { value: "100%", label: "Propriété du code" },
  ],
  features: [
    { icon: PenTool, title: "Design 100% sur-mesure", desc: "Pas de thème acheté revendu. Chaque site est conçu à partir de zéro pour coller à votre identité visuelle et à vos objectifs.", stat: "Pas de template générique" },
    { icon: Smartphone, title: "Mobile-first natif", desc: "Votre site s'affiche parfaitement sur tous les appareils. Google indexe en priorité la version mobile — on commence par là.", stat: "67 % des recherches locales = mobile" },
    { icon: Zap, title: "Performances optimisées", desc: "LCP < 2,5 s, images WebP compressées, code minimal. Un site rapide retient les visiteurs et améliore votre classement.", stat: "Core Web Vitals conformes" },
    { icon: Search, title: "SEO on-page intégré", desc: "Balises title et meta, H1 unique, schema.org, sitemap XML soumis à Google. Le référencement commence dès la construction du site.", stat: "3 mois pour les premiers résultats" },
    { icon: Lock, title: "Sécurité & conformité RGPD", desc: "HTTPS obligatoire, mentions légales, politique de confidentialité, cookie banner. Votre site est conforme dès la mise en ligne.", stat: "SSL + RGPD inclus" },
    { icon: BarChart3, title: "Mesures et suivi", desc: "Google Analytics 4 et Search Console configurés à la livraison. Suivez vos visiteurs, vos positions et l'évolution de votre trafic.", stat: "GA4 + GSC inclus" },
  ],
  process: [
    { num: "01", title: "Cadrage", desc: "Appel de 30 min pour définir vos objectifs, votre cible et le périmètre du site." },
    { num: "02", title: "Maquettes", desc: "Wireframes et design validés avec vous avant tout développement." },
    { num: "03", title: "Développement", desc: "Code propre, optimisé et 100% responsive. Vous suivez l'avancement." },
    { num: "04", title: "Mise en ligne", desc: "Tests, déploiement, soumission GSC et formation CMS. Suivi 30 jours inclus." },
  ],
  bodyBlocks: [
    {
      heading: "Pourquoi votre site est votre actif digital le plus important",
      paragraphs: [
        "Dans les Hautes-Alpes, 93 % des consommateurs cherchent un artisan, un restaurant ou un prestataire de services sur Google avant de les contacter. Un site internet professionnel, bien positionné sur les recherches locales de Gap, Briançon ou Embrun, est votre meilleur commercial — il travaille 24 h/24, 7 j/7, même pendant la saison creuse.",
        "Un site sans optimisation, lent ou non adapté au mobile vous coûte plus cher en opportunités perdues qu'une refonte. 53 % des utilisateurs quittent un site qui met plus de 3 secondes à charger. Sur mobile, ce chiffre monte à 60 %.",
      ],
    },
    {
      heading: "Ce qui différencie nos sites des templates génériques",
      paragraphs: [
        "Chez Face Nord Graphisme, nous ne revendons pas de thèmes Wordpress achetés 60 € sur ThemeForest. Chaque site est conçu à partir de votre charte graphique (ou créée avec vous), avec une architecture pensée pour vos clients, pas pour une entreprise générique.",
        "Résultat : un score PageSpeed Mobile > 85/100 garanti, un design qui correspond à votre image, et un référencement de base intégré dès la construction — pas ajouté après coup en option payante.",
      ],
    },
  ],
  pricingItems: [
    "Design graphique sur-mesure aligné avec votre identité",
    "Responsive mobile natif — testé sur iOS et Android",
    "SEO on-page : title, meta, H1, images WebP, sitemap",
    "HTTPS + mentions légales conformes RGPD",
    "Formulaire de contact avec envoi sécurisé",
    "Google Analytics 4 et Search Console configurés",
    "Formation au CMS (1 h) + suivi 30 jours",
  ],
  faqs: [
    { q: "Quelle est la différence entre une landing page et un site vitrine ?", a: "Une landing page (ou one-page) est une page unique qui concentre l'essentiel de votre activité, vos services et votre formulaire de contact. Elle coûte à partir de 800 € HT et se livre en 5 à 10 jours. Un site vitrine complet comprend plusieurs pages (services, réalisations, blog, à propos) pour une présentation plus détaillée — à partir de 1 200 € HT, livré en 2 à 4 semaines." },
    { q: "Est-ce que mon site apparaîtra sur Google une fois en ligne ?", a: "Votre site sera indexé par Google dans les 2 à 4 semaines suivant la mise en ligne (soumission via Search Console incluse). Apparaître en première page pour vos mots-clés locaux prend généralement 3 à 9 mois — ce délai est normal pour un nouveau site. Nous mettons en place dès la création tous les éléments techniques qui accélèrent l'indexation." },
    { q: "Pouvez-vous créer un site pour mon activité à Gap, Briançon ou Embrun ?", a: "Oui. Nous accompagnons des entreprises dans tout le département 05. Les échanges se font à distance (visio, email) ou en présentiel à Embrun/Gap selon votre préférence. Nous connaissons la réalité économique et touristique des Hautes-Alpes, ce qui nous permet de créer un contenu localement pertinent." },
    { q: "Puis-je modifier mon site moi-même après livraison ?", a: "Oui. Tous nos sites intègrent un CMS (Content Management System) que vous pouvez utiliser depuis votre téléphone ou ordinateur sans aucune connaissance technique. Formation incluse à la livraison." },
    { q: "Que se passe-t-il si je n'ai pas de textes ni de photos ?", a: "Pas de problème. Nous proposons la rédaction SEO de vos textes (+300 à 800 € HT selon le volume) et la sélection ou production de photos adaptées. Ces services sont facturés en option et précisés dans le devis." },
  ],
  related: [
    { href: "/blog/prix-site-internet-artisan-pme-hautes-alpes", badge: "Tarifs", label: "Combien coûte un site internet dans les Hautes-Alpes ?", desc: "Guide complet des tarifs 2026 avec exemples concrets." },
    { href: "/blog/seo-local-hautes-alpes-artisans-pme", badge: "SEO local", label: "SEO local : le guide complet pour le 05", desc: "Comment apparaître en première page pour les recherches locales." },
    { href: "/blog/refonte-site-internet-5-signes", badge: "Refonte", label: "5 signes qu'il est temps de refaire votre site", desc: "Checklist des signaux d'alerte à surveiller sur votre site actuel." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création de site internet",
    provider: { "@type": "LocalBusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Création de sites internet professionnels pour artisans et PME des Hautes-Alpes.",
    offers: { "@type": "Offer", priceCurrency: "EUR", price: "800", priceSpecification: { "@type": "UnitPriceSpecification", price: "800", priceCurrency: "EUR", unitText: "à partir de" } },
  },
};

export default function CreationSiteInternetPage() {
  return <ServicePageLayout data={data} />;
}
