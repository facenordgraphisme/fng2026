import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { RefreshCcw, Zap, Brain, Search, Smartphone, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Refonte Site Internet AI-Friendly — Hautes-Alpes | Face Nord Graphisme",
  description: "Refonte de site internet optimisée pour Google et les IA (ChatGPT, Perplexity, AI Overviews). Mobile-first, Core Web Vitals, schema.org. Artisans et PME du 05. À partir de 800 € HT.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/refonte-ai-friendly" },
  openGraph: { title: "Refonte Site Internet AI-Friendly | Face Nord Graphisme", description: "Refontes web optimisées pour Google ET les moteurs IA. Performance, schema.org, mobile-first. Devis gratuit pour les PME des Hautes-Alpes." },
};

const data: ServicePageData = {
  badge: "Refonte site web",
  headline: "Refonte de site internet AI-Friendly dans les Hautes-Alpes",
  intro: "Votre site date d'avant 2022 ? Il n'est pas visible sur ChatGPT, Perplexity ou les AI Overviews de Google. Une refonte AI-Friendly optimise simultanément votre référencement classique et votre présence dans les réponses des IA. À partir de 800 € HT.",
  heroPhotoId: "photo-1581291518857-4e27b48ff24e",
  heroPhotoAlt: "Développeur web comparant l'ancienne et la nouvelle version d'un site sur deux écrans",
  pricingFrom: "dès 800 € HT",
  pricingLabel: "Refonte landing page ou one-page",
  stats: [
    { value: "dès 800€", label: "Refonte landing page" },
    { value: "> 90/100", label: "PageSpeed Mobile cible" },
    { value: "2-4 sem", label: "Délai livraison" },
    { value: "2 en 1", label: "SEO classique + IA" },
  ],
  features: [
    { icon: Brain, title: "Optimisation pour les moteurs IA", desc: "Balises schema.org complètes, blocs question/réponse, données structurées LocalBusiness et FAQPage. Votre site est citable par ChatGPT, Perplexity et les AI Overviews de Google.", stat: "GEO — Generative Engine Optimization" },
    { icon: Zap, title: "Performance maximale (Core Web Vitals)", desc: "LCP < 2,5 s, CLS < 0,1, INP < 200 ms. Code minimal, images WebP compressées, lazy loading natif. Votre score PageSpeed Mobile passe de 30-50 à 90+.", stat: "Core Web Vitals conformes" },
    { icon: Smartphone, title: "Mobile-first recalibré", desc: "67 % des recherches locales se font sur mobile. Refonte complète de l'expérience mobile : typographie, tailles tactiles, navigation, vitesse de chargement 3G.", stat: "67 % recherches = mobile" },
    { icon: Search, title: "Architecture SEO restructurée", desc: "Hiérarchie H1/H2/H3 repensée, balises title et meta réécrits, maillage interne revu, URLs canoniques corrigées. Chaque page cible 1 mot-clé principal.", stat: "Audit + refonte sémantique" },
    { icon: RefreshCcw, title: "Migration sans perte de trafic", desc: "Redirections 301 complètes depuis l'ancienne URL vers la nouvelle, conservation du jus SEO, soumission du nouveau sitemap à Google Search Console.", stat: "0 trafic perdu" },
    { icon: TrendingUp, title: "Contenu local actualisé", desc: "Réécriture des textes avec les mots-clés locaux ciblés (Gap, Briançon, Embrun), ajout de la double saisonnalité Hautes-Alpes, intégration des avis Google et témoignages.", stat: "Textes SEO inclus" },
  ],
  process: [
    { num: "01", title: "Audit de l'existant", desc: "Analyse du site actuel : vitesse, SEO, mobile, contenu. Rapport priorisé des problèmes à corriger pour le gain maximum." },
    { num: "02", title: "Maquettes & validation", desc: "Nouvelle architecture, wireframes et design validés avec vous. Aucun développement avant votre accord." },
    { num: "03", title: "Refonte & optimisations", desc: "Développement, intégration des schema.org IA-friendly, redirections 301, tests complets sur mobile et desktop." },
    { num: "04", title: "Migration & suivi", desc: "Bascule vers le nouveau site, soumission GSC, surveillance des positions pendant 30 jours. Aucune régression acceptée." },
  ],
  bodyBlocks: [
    {
      heading: "Pourquoi une refonte AI-Friendly est différente d'une refonte classique",
      paragraphs: [
        "Une refonte classique améliore le design et la vitesse. Une refonte AI-Friendly fait bien plus : elle restructure votre contenu pour que ChatGPT, Perplexity et les AI Overviews de Google puissent le lire, comprendre et citer. En 2026, 30 à 40 % des recherches d'information passent par un moteur IA avant Google — si votre site n'est pas structuré pour ces nouveaux circuits, vous manquez un tiers de vos prospects.",
        "Concrètement : schema.org LocalBusiness complet (NAP, horaires, zone d'intervention), balises FAQPage pour chaque section de questions, blocs de réponse directe de 120-180 mots faciles à extraire, et maillage interne logique que les IA peuvent traverser. Ce n'est pas qu'une question de code — c'est une façon différente d'organiser l'information.",
      ],
    },
    {
      heading: "Les 5 signes que votre site a besoin d'une refonte",
      paragraphs: [
        "1. Votre site met plus de 3 secondes à charger sur mobile — 60 % de vos visiteurs partent avant d'avoir lu la première ligne. 2. Votre PageSpeed Mobile est sous 50/100 — Google le pénalise dans son classement. 3. Vos textes n'apparaissent jamais dans les réponses de ChatGPT ou Perplexity pour vos services locaux. 4. Votre site n'a pas de mentions légales conformes RGPD ou de formulaire de contact sécurisé. 5. Le design date de plus de 4 ans — Google et les utilisateurs y lisent un signal de manque de sérieux.",
        "Si vous cochez 2 de ces 5 points, le coût d'opportunité d'un site non refait dépasse rapidement le prix de la refonte. Chaque mois de mauvais positionnement, ce sont des prospects qui vont chez vos concurrents.",
      ],
    },
  ],
  pricingItems: [
    "Audit complet du site actuel (vitesse, SEO, mobile, contenu)",
    "Nouveau design sur-mesure ou refonte de l'existant",
    "Optimisation Core Web Vitals (LCP, CLS, INP)",
    "Schema.org IA-friendly (LocalBusiness, FAQPage, BreadcrumbList)",
    "Redirections 301 complètes depuis l'ancienne URL",
    "Réécriture des textes SEO avec mots-clés locaux",
    "Soumission Google Search Console + suivi 30 jours",
  ],
  faqs: [
    { q: "Combien coûte une refonte de site dans les Hautes-Alpes ?", a: "Une refonte landing page ou one-page démarre à 800 € HT. Un site vitrine 4-6 pages : 1 200 à 2 500 € HT selon le volume de contenu. Un site e-commerce ou avec réservation : 2 500 à 5 000 € HT. Le prix dépend du nombre de pages, de la quantité de textes à réécrire et de la complexité des intégrations. Devis gratuit en 48 h." },
    { q: "Est-ce qu'une refonte va faire perdre mon référencement actuel ?", a: "Non, si les redirections sont bien gérées. Nous cartographions toutes vos URLs actuelles et mettons en place des redirections 301 vers les nouvelles. Google transfère le 'jus SEO' dans les 2 à 4 semaines. En parallèle, le site renforcé (vitesse + schema.org + contenu) améliore rapidement vos positions." },
    { q: "Qu'est-ce qu'un site 'AI-Friendly' concrètement ?", a: "Un site AI-Friendly contient des données structurées schema.org complètes (type d'activité, localisation, horaires, prix indicatifs), des blocs question/réponse clairement identifiés (balises FAQPage), des réponses directes en 120-180 mots que les IA peuvent extraire et citer, et un maillage interne logique. ChatGPT, Perplexity et Google AI Overviews peuvent alors comprendre votre activité et vous mentionner comme référence locale." },
    { q: "Combien de temps prend une refonte ?", a: "Une refonte landing page ou one-page : 5 à 10 jours ouvrés. Un site vitrine 4-6 pages : 2 à 4 semaines. Un site e-commerce : 4 à 8 semaines. Ces délais incluent les phases de maquettage et validation avec vous — pas seulement le développement." },
    { q: "Puis-je garder mon ancien site pendant la refonte ?", a: "Oui. Nous travaillons sur un domaine de développement ou de staging. Votre site actuel reste en ligne jusqu'à la validation complète de la nouvelle version. La bascule se fait en quelques minutes, généralement le matin pour limiter l'impact sur le trafic." },
  ],
  related: [
    { href: "/blog/refonte-site-internet-5-signes", badge: "Refonte", label: "5 signes qu'il est temps de refaire votre site", desc: "Checklist des signaux d'alerte à surveiller sur votre site actuel." },
    { href: "/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026", badge: "SEO + IA", label: "SEO classique vs référencement IA en 2026", desc: "Quelle stratégie adopter pour être visible à la fois sur Google et les IA." },
    { href: "/referencement-seo-hautes-alpes", badge: "SEO", label: "Référencement SEO Hautes-Alpes", desc: "Audit SEO, Google Business Profile, stratégie de contenu pour le 05." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Refonte de site internet AI-Friendly",
    provider: { "@type": "LocalBusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Refonte de sites internet optimisée SEO et IA pour artisans et PME des Hautes-Alpes.",
    offers: { "@type": "Offer", priceCurrency: "EUR", price: "800", priceSpecification: { "@type": "UnitPriceSpecification", price: "800", priceCurrency: "EUR", unitText: "à partir de" } },
  },
};

export default function RefonteAiFriendlyPage() {
  return <ServicePageLayout data={data} />;
}
