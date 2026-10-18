import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { MapPin, Star, FileText, BarChart3, Brain, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Référencement Google & IA (SEO + GEO) — Hautes-Alpes",
  description: "Améliorez le référencement de votre site sur Google et dans les intelligences artificielles (ChatGPT, Gemini, Perplexity). SEO local et GEO pour les entreprises des Hautes-Alpes. Devis gratuit.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/referencement-seo-hautes-alpes" },
  openGraph: { title: "Référencement Google & IA Hautes-Alpes | Face Nord Graphisme", description: "Soyez trouvé sur Google et recommandé par les IA. Audit, Google Business Profile, contenus et données structurées pour les PME du 05.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/portfolio/evasionski-home.webp", width: 1920, height: 1200, alt: "Site ÉvasionSki réalisé par Face Nord Graphisme" }] },
};

const data: ServicePageData = {
  badge: "Référencement Google & IA",
  headline: "Soyez trouvé sur Google… et recommandé par les intelligences artificielles",
  intro: "Vos clients vous cherchent sur Google, sur Maps, et de plus en plus en posant la question à ChatGPT ou Gemini. J'améliore votre position sur Google (SEO) et votre présence dans les réponses des IA (GEO), avec un plan d'action clair et des résultats suivis chaque mois.",
  path: "/referencement-seo-hautes-alpes",
  breadcrumbLabel: "Référencement Google & IA",
  pricingFrom: "sur devis",
  pricingLabel: "Audit + accompagnement sur mesure",
  stats: [
    { value: "SEO", label: "Google, Maps, Local Pack" },
    { value: "GEO", label: "ChatGPT, Gemini, Perplexity" },
    { value: "3-6 mois", label: "Pour des résultats durables" },
    { value: "Mensuel", label: "Rapport de suivi" },
  ],
  forWho: [
    "Votre site existe mais ne vous amène presque aucun contact",
    "Vos concurrents apparaissent avant vous sur « votre métier + votre ville »",
    "Votre fiche Google Maps est incomplète ou a peu d'avis",
    "Quand on demande à ChatGPT un prestataire comme vous dans le 05, vous n'êtes pas cité",
  ],
  features: [
    { icon: Wrench, title: "Audit et plan d'action clair", desc: "J'analyse votre site, votre fiche Google et votre présence dans les IA, puis je vous remets un plan priorisé, expliqué sans jargon.", stat: "Rapport priorisé" },
    { icon: MapPin, title: "SEO local & Google Business Profile", desc: "Fiche Google optimisée, informations cohérentes partout sur le web, présence dans les annuaires utiles : c'est ce qui vous fait apparaître sur Maps.", stat: "Local Pack Google" },
    { icon: FileText, title: "Contenus qui répondent aux recherches", desc: "Pages de services et articles ciblant ce que vos clients tapent vraiment (« guide ski de rando Queyras », « menuisier Gap »…).", stat: "Rédaction SEO" },
    { icon: Brain, title: "Visibilité dans les IA (GEO)", desc: "Informations explicites, réponses directes aux questions fréquentes, données structurées et mentions sur des sources fiables : ce que les IA utilisent pour recommander une entreprise.", stat: "ChatGPT · Gemini · Perplexity" },
    { icon: Star, title: "Avis clients", desc: "Une méthode simple pour obtenir régulièrement des avis et y répondre : un facteur clé du classement local et de la confiance.", stat: "Stratégie d'avis" },
    { icon: BarChart3, title: "Suivi mensuel", desc: "Positions, trafic, appels, citations dans les IA : un rapport clair chaque mois et les prochaines actions.", stat: "Search Console + statistiques" },
  ],
  example: {
    title: "ÉvasionSki — Toni Mancini",
    href: "/portfolio/evasionski",
    url: "https://www.evasionski.fr",
    image: "/assets/portfolio/evasionski-home.webp",
    desc: "Site d'un moniteur de ski de randonnée conçu dès le départ pour le référencement : chaque sortie et chaque massif a sa propre page, pensée pour une recherche précise.",
    points: [
      "Une page par sortie : Queyras, Clarée, Ubaye, Norvège…",
      "Articles de blog qui répondent aux questions des skieurs",
      "Données structurées et structure claire, lisibles par Google et les IA",
    ],
  },
  process: [
    { num: "01", title: "Audit", desc: "Site, fiche Google, concurrents et tests dans ChatGPT / Gemini sur vos recherches clés." },
    { num: "02", title: "Plan d'action", desc: "Les actions qui rapportent le plus, dans le bon ordre, avec un budget clair." },
    { num: "03", title: "Optimisations", desc: "Corrections techniques, contenus, fiche Google, données structurées, mentions externes." },
    { num: "04", title: "Suivi", desc: "Rapport mensuel et ajustements selon l'évolution de Google et des IA." },
  ],
  bodyBlocks: [
    {
      heading: "SEO et GEO : deux façons d'être trouvé",
      paragraphs: [
        "Le SEO (référencement naturel) vous fait remonter dans la liste des résultats Google et sur Google Maps. Le GEO (Generative Engine Optimization) vise autre chose : être la réponse que donnent ChatGPT, Gemini, Perplexity ou les réponses IA de Google quand on leur demande un prestataire. Une IA ne classe pas dix liens — elle cite deux ou trois noms. Autant que ce soit le vôtre.",
        "Les deux se travaillent ensemble : un site rapide, bien structuré, avec des informations claires et des contenus utiles est à la fois mieux classé par Google et mieux compris par les IA. C'est pourquoi je les propose dans un même accompagnement.",
      ],
    },
    {
      heading: "Pourquoi c'est une opportunité dans les Hautes-Alpes",
      paragraphs: [
        "Sur la plupart des recherches locales du 05 — un métier suivi de Gap, Briançon, Embrun ou d'une vallée — la concurrence en référencement reste modérée, et peu d'entreprises ont adapté leur site aux IA. Quelques mois de travail sérieux suffisent souvent à prendre une avance durable.",
        "La double saisonnalité (hiver et été) se prépare : une page doit être en place plusieurs mois avant la saison visée pour être bien positionnée au bon moment. Le calendrier des actions en tient compte.",
      ],
    },
  ],
  pricingItems: [
    "Audit SEO et GEO complet, expliqué simplement",
    "Optimisation de la fiche Google Business Profile",
    "Corrections techniques (vitesse, structure, balises)",
    "Données structurées schema.org (entreprise, services, FAQ)",
    "Contenus ciblés sur vos recherches locales",
    "Tests de visibilité dans ChatGPT, Gemini et Perplexity",
    "Rapport mensuel et plan d'actions",
  ],
  faqs: [
    { q: "Quelle différence entre SEO et GEO ?", a: "Le SEO améliore votre position dans les résultats Google et sur Maps. Le GEO améliore vos chances d'être cité dans les réponses des intelligences artificielles (ChatGPT, Gemini, Perplexity, AI Overviews de Google). Les deux reposent sur des bases communes — un site clair, rapide et fiable — et se travaillent ensemble." },
    { q: "En combien de temps voit-on des résultats ?", a: "Les corrections techniques et la fiche Google produisent souvent des effets en quelques semaines. Pour des positions solides sur des recherches concurrentielles, comptez 3 à 6 mois. Les citations dans les IA suivent un rythme comparable." },
    { q: "Pouvez-vous garantir la première place sur Google ou dans ChatGPT ?", a: "Non, et personne ne le peut honnêtement : Google et les IA décident seuls. Je m'engage sur un travail transparent, des actions mesurables et un suivi chiffré chaque mois." },
    { q: "Faut-il refaire mon site pour être mieux référencé ?", a: "Pas forcément. Beaucoup d'actions (fiche Google, contenus, données structurées, corrections techniques) se font sur le site existant. Si le site est trop ancien pour être optimisé correctement, je vous le dirai et je vous proposerai une refonte." },
    { q: "Comment savoir si les IA me citent déjà ?", a: "Posez la question à ChatGPT ou Perplexity : « quel [votre métier] recommandes-tu à [votre ville] ? ». Lors de l'audit, je teste de façon systématique une vingtaine de questions que se posent vos clients." },
  ],
  related: [
    { href: "/referencement-ia", badge: "GEO", label: "Référencement IA : la méthode en détail", desc: "Les signaux qui font qu'une IA vous cite." },
    { href: "/blog/google-business-profile-artisans-hautes-alpes", badge: "Google Maps", label: "Optimiser sa fiche Google Business Profile", desc: "Le guide pour apparaître sur Maps." },
    { href: "/blog/seo-local-hautes-alpes-artisans-pme", badge: "SEO local", label: "SEO local Hautes-Alpes : le guide complet", desc: "Toutes les étapes pour les recherches locales." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Référencement Google & IA (SEO et GEO)",
    serviceType: "Référencement naturel",
    provider: { "@type": "ProfessionalService", "@id": "https://www.facenordgraphisme.fr/#localbusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Référencement local sur Google (SEO) et optimisation de la visibilité dans les moteurs d'intelligence artificielle (GEO) pour les entreprises des Hautes-Alpes.",
  },
};

export default function SEOPage() {
  return <ServicePageLayout data={data} />;
}
