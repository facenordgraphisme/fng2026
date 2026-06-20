import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, PenTool, ShoppingCart, RefreshCcw, Search, Shield, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Prestations Web & SEO — Création, Refonte, Maintenance | Hautes-Alpes",
  description: "Création de site internet, e-commerce, référencement SEO, refonte AI-Friendly, maintenance et optimisation IA. Services web pour artisans et PME des Hautes-Alpes. Devis gratuit.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/prestations" },
  openGraph: { title: "Prestations Web & SEO Hautes-Alpes | Face Nord Graphisme", description: "6 prestations web pour développer votre présence en ligne dans les Hautes-Alpes. Devis gratuit sous 48 h.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/home_intro.png", width: 1200, height: 630, alt: "Face Nord Graphisme - Création de site internet dans les Hautes-Alpes" }] },
};

const services = [
  {
    icon: PenTool,
    title: "Création de site internet",
    href: "/creation-site-internet-hautes-alpes",
    badge: "Vitrine & landing page",
    pricingFrom: "dès 800 € HT",
    desc: "Site professionnel, mobile-first, optimisé SEO. Design 100 % sur-mesure pour artisans, commerçants et PME du 05.",
    bullets: ["Design 100 % sur-mesure", "PageSpeed Mobile > 85/100", "SEO on-page intégré dès la construction", "HTTPS, RGPD + GA4 inclus"],
  },
  {
    icon: ShoppingCart,
    title: "Boutique e-commerce",
    href: "/boutique-e-commerce-hautes-alpes",
    badge: "WooCommerce & réservation",
    pricingFrom: "dès 2 500 € HT",
    desc: "Vendez vos produits ou vos séjours directement en ligne. WooCommerce, paiement Stripe, réservation avec calendrier.",
    bullets: ["WooCommerce sur-mesure", "Paiement Stripe + 3D Secure", "Réservation en ligne intégrée", "Emails automatiques de confirmation"],
  },
  {
    icon: RefreshCcw,
    title: "Refonte AI-Friendly",
    href: "/refonte-ai-friendly",
    badge: "Refonte & modernisation",
    pricingFrom: "dès 800 € HT",
    desc: "Votre site date d'avant 2022 ? Refonte technique et visuelle optimisée pour Google et les moteurs IA (ChatGPT, Perplexity).",
    bullets: ["Core Web Vitals conformes", "Schema.org IA-Ready complet", "Redirections 301 sans perte SEO", "Contenu local actualisé"],
  },
  {
    icon: Search,
    title: "Référencement SEO",
    href: "/referencement-seo-hautes-alpes",
    badge: "SEO local & Google Business",
    pricingFrom: "sur devis",
    desc: "Apparaissez en tête de Google pour les recherches locales à Gap, Briançon et Embrun. Audit technique, GBP et stratégie de contenu.",
    bullets: ["Audit SEO technique complet", "Optimisation Google Business Profile", "Stratégie de contenu locale", "Suivi mensuel Search Console + GA4"],
  },
  {
    icon: Shield,
    title: "Maintenance site internet",
    href: "/maintenance-site-internet-hautes-alpes",
    badge: "WordPress & Next.js",
    pricingFrom: "dès 50 € HT/mois",
    desc: "Mises à jour sécurisées, sauvegardes quotidiennes, monitoring 24/7 et assistance technique mensuelle.",
    bullets: ["Mises à jour testées en staging", "Sauvegardes quotidiennes chiffrées", "Monitoring uptime 24/7", "1 h d'assistance mensuelle incluse"],
  },
  {
    icon: Brain,
    title: "Référencement IA",
    href: "/referencement-ia",
    badge: "GEO — Nouveau",
    pricingFrom: "sur devis",
    desc: "Soyez cité par ChatGPT, Perplexity et les AI Overviews de Google. Stratégie GEO (Generative Engine Optimization) pour les PME du 05.",
    bullets: ["Audit de présence dans les IA", "Contenu structuré citable (120-180 mots)", "Schema.org FAQPage + LocalBusiness", "Monitoring mensuel des citations"],
  },
];

const cities = [
  { name: "Gap", href: "/villes/gap-hautes-alpes", desc: "Préfecture du 05. Accompagnement des commerces, artisans et professions libérales de la plus grande ville des Hautes-Alpes." },
  { name: "Briançon", href: "/villes/briancon-hautes-alpes", desc: "Double saisonnalité ski/été. Sites bilingues, réservation directe pour prestataires touristiques et activités de montagne." },
  { name: "Embrun & Serre-Ponçon", href: "/villes/embrun-serre-poncon", desc: "Capital touristique du lac. Producteurs locaux, hébergements, activités outdoor — vendre en direct sans intermédiaire." },
];

export default function PrestationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a1a1a] text-white pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#239ea0]/15 text-[#239ea0] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <MapPin className="size-3.5" />
            Hautes-Alpes (05)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
            Prestations web & SEO<br />
            <span className="text-[#239ea0]">pour les Hautes-Alpes</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            6 prestations pour développer votre présence en ligne — de la création de site à l'optimisation pour les moteurs IA. Devis gratuit sous 48 h, sans engagement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#239ea0] hover:bg-[#1d8486] text-white font-bold px-8 py-4 rounded-2xl transition-colors"
          >
            Devis gratuit sous 48 h
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-6 bg-[#f4f7f9] dark:bg-[#111111] transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.href}
                  className="bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-none hover:border-[#239ea0]/30 transition-all group flex flex-col overflow-hidden"
                >
                  {/* Card header */}
                  <div className="p-7 flex-1">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="bg-[#f0fafa] dark:bg-[#239ea0]/10 border border-[#239ea0]/20 rounded-xl p-3">
                        <Icon className="size-6 text-[#239ea0]" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#239ea0] bg-[#e8f5f5] dark:bg-[#239ea0]/10 px-3 py-1 rounded-full mt-1">
                        {s.badge}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2 group-hover:text-[#239ea0] transition-colors leading-snug">
                      {s.title}
                    </h2>
                    <p className="text-[#666] dark:text-[#a1a1aa] text-sm leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[#444] dark:text-[#a1a1aa] text-sm">
                          <CheckCircle2 className="size-4 text-[#239ea0] shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Card footer */}
                  <div className="px-7 pb-7 pt-4 border-t border-gray-50 dark:border-white/10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[#239ea0] font-black text-lg">{s.pricingFrom}</div>
                      <Link
                        href={s.href}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a1a1a] dark:text-white hover:text-[#239ea0] dark:hover:text-[#239ea0] transition-colors group/link"
                      >
                        En savoir plus
                        <ArrowRight className="size-4 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* City pages */}
      <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a] transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-white mb-3">
              Nous intervenons dans tout le département 05
            </h2>
            <p className="text-[#666] dark:text-[#a1a1aa] text-lg max-w-xl mx-auto">
              Basés à Embrun, nous accompagnons les entreprises de Gap à Briançon, de Serre-Ponçon à la Vallée de l'Ubaye.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cities.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="block border-2 border-[#e8f5f5] dark:border-white/10 rounded-2xl p-7 hover:border-[#239ea0] hover:shadow-md dark:hover:shadow-none transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="size-4 text-[#239ea0]" />
                  <span className="font-bold text-[#1a1a1a] dark:text-white group-hover:text-[#239ea0] transition-colors">
                    {c.name}
                  </span>
                </div>
                <p className="text-[#888] dark:text-[#666] text-sm leading-relaxed">{c.desc}</p>
                <div className="mt-4 text-[#239ea0] text-xs font-bold flex items-center gap-1">
                  Voir la page locale <ArrowRight className="size-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pas sûr de ce dont vous avez besoin ?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Décrivez votre projet en quelques lignes. Je vous réponds en moins de 48 h avec une recommandation et un devis indicatif — sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#239ea0] hover:bg-[#1d8486] text-white font-bold px-8 py-4 rounded-2xl transition-colors"
            >
              Démarrer mon projet
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-sm"
            >
              Lire le blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
