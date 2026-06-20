import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { Brain, MessageSquare, FileText, Search, Globe, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Référencement IA — GEO & AI Overviews | Hautes-Alpes",
  description: "Optimisez votre visibilité dans ChatGPT, Perplexity et les AI Overviews de Google. Stratégie GEO (Generative Engine Optimization) pour artisans et PME des Hautes-Alpes. Devis gratuit.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/referencement-ia" },
  openGraph: { title: "Référencement IA & GEO Hautes-Alpes | Face Nord Graphisme", description: "Soyez cité par ChatGPT, Perplexity et Google AI Overviews. Stratégie GEO + contenu structuré pour les PME du 05.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/home_intro.png", width: 1200, height: 630, alt: "Face Nord Graphisme - Création de site internet dans les Hautes-Alpes" }] },
};

const data: ServicePageData = {
  badge: "Référencement IA",
  headline: "Référencement IA & GEO pour les Hautes-Alpes",
  intro: "En 2026, 30 à 40 % des recherches d'information passent par un moteur IA avant Google. Être cité par ChatGPT, Perplexity ou les AI Overviews de Google, c'est le nouveau Local Pack. Stratégie GEO (Generative Engine Optimization) sur-mesure pour les entreprises du 05.",
  path: "/referencement-ia",
  breadcrumbLabel: "Référencement IA",
  heroPhotoId: "photo-1677442135703-1787eea5ce01",
  heroPhotoAlt: "Interface de chat avec une IA affichant une réponse sur les meilleurs prestataires locaux",
  pricingFrom: "sur devis",
  pricingLabel: "Audit GEO + stratégie sur 6 mois",
  stats: [
    { value: "30-40 %", label: "Recherches passant par une IA" },
    { value: "4", label: "Signaux clés de citation IA" },
    { value: "3-6 mois", label: "Délai de résultats GEO" },
    { value: "2×", label: "Visibilité cumulée SEO + IA" },
  ],
  features: [
    { icon: Brain, title: "Audit GEO — Generative Engine Optimization", desc: "Analyse de votre présence actuelle dans ChatGPT, Perplexity et Google AI Overviews. Identification des 4 signaux de citation (autorité, fraîcheur, structure, entités) et des lacunes à combler.", stat: "Rapport GEO détaillé" },
    { icon: FileText, title: "Contenu structuré pour les IA", desc: "Réécriture ou création de sections de contenu en blocs de 120-180 mots, format question/réponse explicite, réponses directes en début de paragraphe. Chaque bloc est extractible et citable.", stat: "Format citable par les LLM" },
    { icon: Globe, title: "Schema.org IA-Ready complet", desc: "LocalBusiness, FAQPage, Article, HowTo, Speakable. Les balises JSON-LD permettent aux moteurs IA de comprendre votre activité, votre zone et vos services sans ambiguïté.", stat: "JSON-LD IA-Ready" },
    { icon: MessageSquare, title: "Stratégie de mentions externes", desc: "Identification des sources tierces citées par les IA pour votre secteur (annuaires, presse locale, associations). Plan d'action pour obtenir des mentions sur ces sources.", stat: "Sources citées par les LLM" },
    { icon: Search, title: "Optimisation Google AI Overviews", desc: "Les AI Overviews de Google privilegient les pages avec données structurées, contenu à fort intent informatif et backlinks qualitatifs. Nous optimisons simultanément les 3 leviers.", stat: "AI Overviews + SGE" },
    { icon: TrendingUp, title: "Suivi mensuel des citations IA", desc: "Monitoring mensuel de vos mentions dans les 3 principaux moteurs IA (ChatGPT, Perplexity, Google AI Overviews) pour les requêtes locales de votre secteur.", stat: "Rapport mensuel GEO" },
  ],
  process: [
    { num: "01", title: "Audit GEO", desc: "Test de vos requêtes locales dans ChatGPT, Perplexity et Google AI Overviews. Analyse des sources citées, identification des 4 signaux manquants." },
    { num: "02", title: "Stratégie de contenu", desc: "Plan de contenu structuré : blocs cibles, questions à traiter, format question/réponse, schema.org à implémenter." },
    { num: "03", title: "Optimisation", desc: "Réécriture des pages clés, ajout des données structurées, création de contenu informatif citable, plan de mentions externes." },
    { num: "04", title: "Suivi & itérations", desc: "Monitoring mensuel des citations, ajustements selon les évolutions des algorithmes IA, rapport d'avancement." },
  ],
  bodyBlocks: [
    {
      heading: "SEO classique vs référencement IA : deux logiques, un seul objectif",
      paragraphs: [
        "Le SEO classique optimise pour les algorithmes de Google : PageRank, Core Web Vitals, mots-clés. Le référencement IA (GEO) optimise pour les LLM : autorité perçue, fraîcheur des sources, structure extractible, richesse des entités. En 2026, les deux ne s'opposent pas — ils se complètent. Un contenu bien structuré pour les IA est aussi mieux compris par Google.",
        "La différence cruciale : les IA ne classent pas, elles citent. ChatGPT ne vous met pas en position 1 — il vous mentionne ou ne vous mentionne pas du tout. L'enjeu GEO, c'est d'être dans le champ des sources que l'IA considère comme fiables pour votre catégorie dans les Hautes-Alpes.",
      ],
    },
    {
      heading: "Les 4 signaux que les IA utilisent pour vous citer",
      paragraphs: [
        "Après analyse des sources citées par ChatGPT et Perplexity pour des requêtes locales, 4 signaux ressortent systématiquement : 1. Autorité externe — des mentions sur des sources tierces reconnues (presse locale, annuaires sectoriels, associations professionnelles). 2. Fraîcheur — du contenu daté récemment, avec des statistiques à jour (2025-2026). 3. Structure extractible — des réponses directes en début de paragraphe, format question/réponse, longueur de 120-180 mots. 4. Entités claires — votre nom, localisation, secteur, zone d'intervention explicitement nommés sans ambiguïté.",
        "Pour les Hautes-Alpes, la bonne nouvelle : les IA ont peu de sources locales de qualité. Être la référence de votre secteur à Gap, Briançon ou Embrun est encore accessible car la concurrence GEO locale est quasi inexistante. C'est maintenant que ça se joue.",
      ],
    },
  ],
  pricingItems: [
    "Audit GEO complet (ChatGPT, Perplexity, Google AI Overviews)",
    "Rapport des sources citées par les IA pour votre secteur",
    "Plan de contenu structuré avec blocs citables (120-180 mots)",
    "Implémentation schema.org IA-Ready (LocalBusiness, FAQPage, Article)",
    "Plan de mentions externes (annuaires, presse, associations)",
    "Optimisation des pages clés pour les AI Overviews Google",
    "Suivi mensuel des citations IA + rapport d'avancement",
  ],
  faqs: [
    { q: "Qu'est-ce que le GEO (Generative Engine Optimization) ?", a: "Le GEO est l'optimisation de votre contenu et de votre présence en ligne pour être cité par les moteurs IA génératifs : ChatGPT, Perplexity, Gemini, et les AI Overviews de Google. Contrairement au SEO qui optimise pour des positions dans une liste de résultats, le GEO optimise pour être mentionné comme source fiable dans une réponse générée par une IA." },
    { q: "Est-ce que le référencement IA remplace le SEO classique ?", a: "Non — les deux se complètent. Le SEO classique reste indispensable pour le trafic Google (positions, Local Pack, Google Business Profile). Le GEO étend votre visibilité aux moteurs IA qui traitent 30 à 40 % des recherches informatives. Une stratégie combinée maximise votre surface de présence sur tous les canaux de recherche." },
    { q: "Comment savoir si je suis déjà cité par ChatGPT ou Perplexity ?", a: "Testez vous-même : tapez 'meilleur [votre activité] à [votre ville]' dans ChatGPT ou Perplexity. Si vous n'apparaissez pas, vos concurrents peut-être oui. Notre audit GEO formalise ce diagnostic en testant 20 à 30 requêtes locales pertinentes pour votre secteur." },
    { q: "Combien de temps pour être cité par les IA ?", a: "Les IA mettent à jour leurs sources plus rapidement que Google pour l'indexation, mais plus lentement pour changer leurs réponses habituelles. Les premières citations apparaissent généralement en 3 à 6 mois pour les requêtes locales peu concurrentielles. Pour les requêtes génériques, le délai est plus long." },
    { q: "Le référencement IA est-il utile pour mon activité locale dans les Hautes-Alpes ?", a: "Oui — et particulièrement dans les Hautes-Alpes. La plupart des prestataires locaux n'ont pas de contenu structuré pour les IA. Être le premier artisan, restaurateur ou prestataire touristique du 05 à optimiser son contenu pour ChatGPT et Perplexity vous donne une avance de 2 à 3 ans sur vos concurrents." },
  ],
  related: [
    { href: "/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026", badge: "SEO + IA", label: "SEO classique vs référencement IA en 2026", desc: "Guide complet pour combiner les deux stratégies." },
    { href: "/referencement-seo-hautes-alpes", badge: "SEO", label: "Référencement SEO Hautes-Alpes", desc: "Audit SEO, GBP et stratégie de contenu pour le 05." },
    { href: "/refonte-ai-friendly", badge: "Refonte", label: "Refonte site internet AI-Friendly", desc: "Refonte technique + contenu optimisé pour Google ET les IA." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Référencement IA — GEO (Generative Engine Optimization)",
    provider: { "@type": "LocalBusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Optimisation de la visibilité dans les moteurs IA (ChatGPT, Perplexity, Google AI Overviews) pour artisans et PME des Hautes-Alpes.",
  },
};

export default function ReferencementIaPage() {
  return <ServicePageLayout data={data} />;
}
