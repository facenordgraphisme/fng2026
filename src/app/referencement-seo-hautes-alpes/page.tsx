import { Metadata } from "next";
import ServicePageLayout, { type ServicePageData } from "@/components/ServicePageLayout";
import { MapPin, Star, FileText, BarChart3, Globe, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Référencement SEO Hautes-Alpes — Expert SEO local Gap, Briançon, Embrun",
  description: "Expert référencement Google dans les Hautes-Alpes. SEO local, optimisation GBP, audit technique, stratégie de contenu. Devis gratuit pour artisans et PME du 05.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/referencement-seo-hautes-alpes" },
  openGraph: { title: "Expert SEO Hautes-Alpes | Référencement Google local", description: "Référencement SEO local pour artisans et PME du 05. Audit, optimisation GBP, création de contenu. Apparaissez en premier sur Google." },
};

const data: ServicePageData = {
  badge: "Référencement SEO",
  headline: "Expert référencement Google dans les Hautes-Alpes",
  intro: "Apparaissez en tête des résultats Google pour les recherches locales à Gap, Briançon et Embrun. Audit SEO, optimisation technique, Google Business Profile et stratégie de contenu pour les PME du 05.",
  heroPhotoId: "photo-1460925895917-afdab827c52f",
  heroPhotoAlt: "Tableau de bord Google Analytics sur un ordinateur portable montrant les courbes de trafic et les positions SEO",
  pricingFrom: "sur devis",
  pricingLabel: "Audit SEO + stratégie personnalisée",
  stats: [
    { value: "92 %", label: "Recherches via Google" },
    { value: "3-9 mois", label: "Délai de résultats" },
    { value: "7×", label: "Clics avec GBP complet" },
    { value: "116", label: "Impressions mois/mo pour « réf. Hautes-Alpes »" },
  ],
  features: [
    { icon: MapPin, title: "SEO local & Google Business Profile", desc: "Optimisation de votre fiche GBP, cohérence NAP (Nom/Adresse/Téléphone), citations locales, gestion des avis — le triptyque du Local Pack.", stat: "7× plus de clics avec GBP complet" },
    { icon: BarChart3, title: "Audit SEO technique complet", desc: "Vitesse (Core Web Vitals), mobile-first, erreurs crawl, liens brisés, balises dupliquées, robots.txt. On identifie tout ce qui freine votre classement.", stat: "Rapport détaillé + priorisé" },
    { icon: FileText, title: "Stratégie de contenu locale", desc: "Création d'articles de blog et de pages de services ciblant les requêtes locales à fort intent (ex : 'plombier Gap', 'guide VTT Serre-Ponçon').", stat: "Contenu keyword-rich" },
    { icon: Star, title: "Gestion des avis Google", desc: "Stratégie de collecte d'avis, modèles de réponse, gestion des avis négatifs. Chaque avis récent améliore votre classement local.", stat: "+600 impressions/avis" },
    { icon: Globe, title: "Données structurées Schema.org", desc: "LocalBusiness, FAQPage, BlogPosting, Product. Ces balises JSON-LD permettent à Google et aux IA de comprendre votre activité.", stat: "Rich snippets dans les SERP" },
    { icon: TrendingUp, title: "Suivi mensuel & reporting", desc: "Tableau de bord mensuel avec vos positions, votre trafic organique et les actions à prioriser. Vous voyez l'évolution en temps réel.", stat: "Google Search Console + GA4" },
  ],
  process: [
    { num: "01", title: "Audit complet", desc: "Analyse technique, contenu, GBP et profil de backlinks. Rapport priorisé livré sous 5 jours." },
    { num: "02", title: "Feuille de route", desc: "Plan d'actions sur 6 mois : quoi optimiser, dans quel ordre, avec quels résultats attendus." },
    { num: "03", title: "Optimisations", desc: "Corrections techniques, optimisation des balises, création de contenu, citations locales." },
    { num: "04", title: "Suivi mensuel", desc: "Rapport mensuel + appel de 30 min pour ajuster la stratégie selon les évolutions de Google." },
  ],
  bodyBlocks: [
    {
      heading: "Pourquoi le SEO local est critique pour les entreprises des Hautes-Alpes",
      paragraphs: [
        "Dans les Hautes-Alpes, 92 % des consommateurs utilisent Google pour trouver un commerce ou un prestataire local avant de se déplacer. Apparaître dans le Local Pack (les 3 premiers résultats avec carte Google Maps) peut multiplier votre nombre de contacts par 3 à 5 par rapport à une position en page 2.",
        "Pour les mots-clés que vos clients tapent — « réf. Google Hautes-Alpes » (116 impressions/mois), « SEO Hautes-Alpes » (103 imp.), « création site Hautes-Alpes » (83 imp.) — la position 1 génère 10× plus de clics que la position 10. Ces requêtes représentent des dizaines de prospects chaque mois.",
      ],
    },
    {
      heading: "La double saisonnalité des Hautes-Alpes : un enjeu SEO spécifique",
      paragraphs: [
        "Les commerces et prestataires des Hautes-Alpes font face à deux pics de demande annuels : l'été (tourisme lac de Serre-Ponçon, randonnée, VTT) et l'hiver (ski Vars, Orcières, Serre-Chevalier). Être bien positionné sur Google doit s'anticiper : Google prend 3 à 6 mois pour reconnaître une page optimisée.",
        "Concrètement : si vous voulez être visible pour « guide randonnée Hautes-Alpes » en juillet, vous devez optimiser votre contenu en janvier-février. Notre stratégie SEO intègre cette saisonnalité dans le calendrier de publication.",
      ],
    },
  ],
  pricingItems: [
    "Audit SEO technique complet (rapport détaillé + priorisé)",
    "Optimisation Google Business Profile",
    "Correction des erreurs techniques bloquantes",
    "Optimisation des balises title, meta, H1-H3, schema.org",
    "Stratégie de contenu sur 6 mois (sujets + calendrier)",
    "Suivi mensuel : positions, trafic, actions prioritaires",
    "Tableau de bord Search Console + GA4",
  ],
  faqs: [
    { q: "Combien de temps faut-il pour voir des résultats SEO dans les Hautes-Alpes ?", a: "Les premières améliorations techniques (correction d'erreurs, optimisation des balises) sont indexées par Google en 2 à 4 semaines. Les positions sur les mots-clés concurrentiels évoluent généralement en 3 à 6 mois. Pour les requêtes très locales ('plombier Gap', 'guide vélo Embrun'), les résultats peuvent arriver plus vite car la concurrence SEO est souvent moins forte que dans les grandes villes." },
    { q: "Est-ce qu'une fiche Google Business Profile suffit pour apparaître en premier ?", a: "Une fiche GBP complète et bien optimisée est indispensable pour le Local Pack (les résultats avec carte). Mais elle seule ne suffit pas : vos avis Google (nombre et régularité), la cohérence de vos informations en ligne (NAP), et la qualité de votre site web sont les 3 principaux facteurs de classement local. Nous travaillons les 3 en parallèle." },
    { q: "La Double saisonnalité des Hautes-Alpes complique-t-elle le SEO ?", a: "Elle l'enrichit ! Vous avez deux « zones » de mots-clés à travailler — estivaux et hivernaux — et deux fenêtres de pics de demande. La bonne nouvelle : les concurrents locaux sont souvent peu présents sur l'une des deux saisons. C'est une opportunité que nous exploitons dans notre stratégie." },
    { q: "Peut-on faire du SEO sans toucher au site web ?", a: "Partiellement. L'optimisation GBP, les citations locales et la stratégie d'avis peuvent être faites sans modifier votre site. Mais pour des résultats durables, les optimisations techniques (vitesse, mobile, schema.org) et le contenu ciblé sur votre site sont indispensables. Nous priorisons les actions selon votre budget." },
  ],
  related: [
    { href: "/blog/seo-local-hautes-alpes-artisans-pme", badge: "Guide SEO", label: "SEO local Hautes-Alpes : le guide complet", desc: "Toutes les étapes pour dominer les résultats Google locaux." },
    { href: "/blog/gbp-artisans-hautes-alpes", badge: "GBP", label: "Optimiser sa fiche Google Business Profile", desc: "Guide complet pour créer et optimiser votre fiche GBP." },
    { href: "/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026", badge: "SEO + IA", label: "SEO classique vs référencement IA en 2026", desc: "Comment combiner les deux pour une visibilité maximale." },
  ],
  schema: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Référencement SEO local",
    provider: { "@type": "LocalBusiness", name: "Face Nord Graphisme", url: "https://www.facenordgraphisme.fr" },
    areaServed: "Hautes-Alpes",
    description: "Référencement SEO local pour artisans et PME des Hautes-Alpes (Gap, Briançon, Embrun).",
  },
};

export default function SEOPage() {
  return <ServicePageLayout data={data} />;
}
