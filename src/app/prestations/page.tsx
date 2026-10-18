import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Prestations web — Site vitrine, e-commerce, refonte, SEO | Hautes-Alpes",
  description: "Site vitrine, boutique en ligne, refonte, référencement Google & IA, maintenance et application web sur-mesure. Développeur web à Embrun pour les entreprises des Hautes-Alpes. Devis gratuit.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/prestations" },
  openGraph: { title: "Prestations Web & SEO Hautes-Alpes | Face Nord Graphisme", description: "6 prestations web pour développer votre présence en ligne dans les Hautes-Alpes. Devis gratuit sous 48 h.", siteName: "Face Nord Graphisme", locale: "fr_FR", images: [{ url: "/assets/home_intro.png", width: 1200, height: 630, alt: "Face Nord Graphisme - Création de site internet dans les Hautes-Alpes" }] },
};

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
            Ce que je peux faire<br />
            <span className="text-[#239ea0]">pour votre entreprise</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Créer votre site, vendre en ligne, moderniser un site vieillissant, être trouvé sur Google et par les IA, ou développer l&apos;outil métier qui vous manque. Choisissez votre situation — je vous réponds sous 48 h, sans engagement.
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
            {SERVICES.map((s) => (
              <ServiceCard key={s.href} service={s} showExample headingLevel="h2" />
            ))}
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
