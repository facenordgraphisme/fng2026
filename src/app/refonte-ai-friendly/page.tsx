import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { RefreshCcw, Zap, Brain, Search, Smartphone, PencilLine } from "lucide-react";

export const metadata: Metadata = {
  title: "Refonte de site internet prête pour l'IA — Hautes-Alpes",
  description: "Refonte de site internet vieillissant dans les Hautes-Alpes : design moderne, rapide sur mobile, référencement conservé et structure lisible par Google, ChatGPT et Gemini. Dès 800 € HT.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/refonte-ai-friendly" },
  openGraph: { title: "Refonte de site internet prête pour l'IA | Face Nord Graphisme", description: "Modernisez un site vieillissant et rendez-le visible sur Google et dans les réponses des IA. Référencement conservé.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/portfolio/voyageursdesalpes-home.webp", width: 1920, height: 1200, alt: "Refonte du site Voyageurs des Alpes par Face Nord Graphisme" }] },
};

const data: ServicePageData = {
  badge: "Refonte de site",
  headline: "Redonnez une seconde vie à votre site — visible sur Google et par les IA",
  intro: "Votre site a quelques années, il est lent, mal affiché sur mobile ou il n'apparaît plus nulle part ? Je le modernise et je le restructure pour qu'il soit compris et recommandé par Google comme par ChatGPT, Gemini ou Perplexity — sans perdre le référencement acquis.",
  path: "/refonte-ai-friendly",
  breadcrumbLabel: "Refonte de site internet",
  pricingFrom: "dès 800 € HT",
  pricingLabel: "Refonte one-page · site complet sur devis",
  stats: [
    { value: "dès 800 €", label: "Refonte one-page" },
    { value: "2-4 sem.", label: "Pour un site vitrine" },
    { value: "301", label: "Redirections : référencement conservé" },
    { value: "2 en 1", label: "Google + moteurs IA" },
  ],
  forWho: [
    "Votre site a plus de 4-5 ans et ça se voit",
    "Il est lent ou difficile à utiliser sur téléphone",
    "Vous n'arrivez plus à le modifier vous-même (ou plus personne ne s'en occupe)",
    "Vos concurrents apparaissent sur Google et dans ChatGPT, pas vous",
  ],
  features: [
    { icon: Smartphone, title: "Un design moderne, pensé mobile", desc: "Nouvelle mise en page, typographie et navigation : votre site inspire confiance au premier coup d'œil, sur téléphone comme sur ordinateur.", stat: "Mobile-first" },
    { icon: Zap, title: "Un site rapide", desc: "Images, code et hébergement optimisés. Un site qui se charge vite retient les visiteurs et remonte dans Google.", stat: "Core Web Vitals au vert" },
    { icon: RefreshCcw, title: "Votre référencement conservé", desc: "Toutes vos anciennes adresses sont redirigées vers les nouvelles pages : vous ne perdez ni vos positions ni vos liens.", stat: "Redirections 301" },
    { icon: Brain, title: "Lisible par les IA", desc: "Contenus organisés en questions/réponses, informations clés explicites (activité, zone, tarifs), données structurées : ChatGPT, Gemini et Perplexity comprennent qui vous êtes et peuvent vous citer.", stat: "Structure « IA-ready »" },
    { icon: Search, title: "Contenus remis à jour", desc: "Textes réécrits pour vos clients et pour les recherches locales (votre métier + Embrun, Gap, Briançon…), avis clients mis en avant.", stat: "Rédaction incluse" },
    { icon: PencilLine, title: "De nouveau autonome", desc: "Une interface d'administration simple pour mettre à jour votre site sans dépendre d'un prestataire.", stat: "Formation incluse" },
  ],
  example: {
    title: "Voyageurs des Alpes",
    href: "/portfolio/voyageurs-des-alpes",
    url: "https://www.voyageurs-des-alpes.fr",
    image: "/assets/portfolio/voyageursdesalpes-home.webp",
    desc: "Refonte complète du site de l'association A.T.L.A.S., agence de voyages fondée par des accompagnateurs en montagne du Pays de Serre-Ponçon : un site plus moderne, où l'on trouve en quelques secondes le séjour qui nous correspond.",
    points: [
      "Nouveau design immersif et prochains départs dès l'accueil",
      "Catalogue de séjours filtrable par niveau, format, durée et saison",
      "Fiches séjours claires avec tarifs, dates et réservation",
    ],
  },
  process: [
    { num: "01", title: "Audit de l'existant", desc: "Vitesse, mobile, référencement, contenus, visibilité dans les IA : je vous remets un diagnostic clair et priorisé." },
    { num: "02", title: "Nouvelle structure", desc: "Organisation des pages, maquettes et liste des redirections, validées avec vous." },
    { num: "03", title: "Refonte", desc: "Développement sur un site de test : votre site actuel reste en ligne pendant les travaux." },
    { num: "04", title: "Bascule & suivi", desc: "Mise en ligne, redirections, déclaration à Google et surveillance des positions pendant 30 jours." },
  ],
  bodyBlocks: [
    {
      heading: "Pourquoi « prête pour l'IA » ?",
      paragraphs: [
        "De plus en plus de vos clients posent leurs questions directement à ChatGPT, Gemini, Perplexity ou aux réponses IA de Google (« quel guide pour faire le Pelvoux ? », « un plombier à Embrun disponible ce week-end ? »). Ces outils citent les sites qu'ils comprennent le mieux : ceux qui disent clairement qui ils sont, où ils interviennent, ce qu'ils proposent et à quel prix.",
        "Une refonte « prête pour l'IA », c'est une refonte classique (design, vitesse, mobile) à laquelle j'ajoute ce travail de structure : informations clés explicites, réponses directes aux questions fréquentes, données structurées schema.org et pages organisées logiquement. Ce qui aide les IA aide aussi Google — et vos visiteurs.",
      ],
    },
    {
      heading: "Les signes qu'il est temps de refaire votre site",
      paragraphs: [
        "Le site met plus de 3 secondes à s'afficher sur un téléphone. Il faut zoomer pour lire ou cliquer. Le design date d'une autre époque. Vous ne pouvez plus le modifier facilement. Il n'apparaît plus sur Google pour votre métier et votre ville. Si vous vous reconnaissez dans deux de ces points, votre site vous fait probablement perdre des clients chaque mois.",
      ],
    },
  ],
  pricingItems: [
    "Audit du site actuel (vitesse, mobile, SEO, visibilité IA)",
    "Nouveau design sur-mesure, pensé mobile",
    "Optimisation de la vitesse (Core Web Vitals)",
    "Structure et données schema.org lisibles par les IA",
    "Redirections 301 de toutes les anciennes pages",
    "Réécriture des textes clés pour vos clients et Google",
    "Déclaration à Google Search Console + suivi 30 jours",
  ],
  faqs: [
    { q: "Vais-je perdre mon référencement avec une refonte ?", a: "Non, si la migration est bien préparée. Je liste toutes vos adresses actuelles et je mets en place des redirections 301 vers les nouvelles pages, puis je surveille vos positions pendant 30 jours. En général, le site refait (plus rapide, mieux structuré) gagne des positions dans les semaines qui suivent." },
    { q: "Que veut dire concrètement « visible par les IA » ?", a: "Les assistants comme ChatGPT, Gemini ou Perplexity recommandent des entreprises en s'appuyant sur les sites qu'ils comprennent bien. Je rends vos informations explicites (activité, zone d'intervention, services, tarifs), j'ajoute des réponses directes aux questions que se posent vos clients et des données structurées. Cela augmente vos chances d'être cité — sans garantie absolue, car ces outils évoluent en permanence." },
    { q: "Peut-on garder le contenu ou le design actuel ?", a: "Oui. On peut conserver votre identité visuelle, vos textes ou une partie de la structure si elle fonctionne. La refonte s'adapte à ce qui mérite d'être gardé." },
    { q: "Mon site actuel reste-t-il en ligne pendant les travaux ?", a: "Oui. Je travaille sur un site de test ; votre site actuel reste accessible jusqu'à la bascule, qui ne prend que quelques minutes." },
    { q: "Combien coûte une refonte ?", a: "À partir de 800 € HT pour un site one-page, de 1 200 à 2 500 € HT pour un site vitrine de plusieurs pages, davantage pour un site e-commerce ou de réservation. Le devis est gratuit et détaillé après un premier audit rapide." },
  ],
  related: [
    { href: "/blog/refonte-site-internet-5-signes", badge: "Refonte", label: "5 signes qu'il est temps de refaire votre site", desc: "La checklist des signaux d'alerte." },
    { href: "/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026", badge: "SEO + IA", label: "SEO classique vs référencement IA", desc: "Comment être visible sur Google et dans les IA." },
    { href: "/referencement-seo-hautes-alpes", badge: "Référencement", label: "Référencement Google & IA", desc: "Pour aller plus loin après la refonte." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Refonte de site internet prête pour l'IA",
    serviceType: "Refonte de site internet",
    provider: { "@type": "ProfessionalService", "@id": "https://www.facenordgraphisme.fr/#localbusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Refonte de sites internet vieillissants : design moderne, vitesse, référencement conservé et structure lisible par Google et les moteurs IA.",
    offers: { "@type": "Offer", priceCurrency: "EUR", price: "800", priceSpecification: { "@type": "UnitPriceSpecification", price: "800", priceCurrency: "EUR", unitText: "à partir de" } },
  },
};

export default function RefonteAiFriendlyPage() {
  return <ServicePageLayout data={data} />;
}
