import AnimatedText from "@/components/AnimatedText";
import { getProjects } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Portfolio — Réalisations web Hautes-Alpes | Face Nord Graphisme",
  description: "Découvrez les sites internet créés par Face Nord Graphisme pour des entreprises locales des Hautes-Alpes et du Verdon : restaurants, outdoor, agriculture, événementiel.",
  alternates: { canonical: "https://www.facenordgraphisme.fr/portfolio" },
  openGraph: {
    title: "Portfolio — Réalisations web Hautes-Alpes | Face Nord Graphisme",
    description: "Découvrez les sites internet créés par Face Nord Graphisme pour des entreprises locales des Hautes-Alpes et du Verdon : restaurants, outdoor, agriculture, événementiel.",
    url: "https://www.facenordgraphisme.fr/portfolio",
    siteName: "Face Nord Graphisme",
    locale: "fr_FR",
    type: "website",
  },
};

const TAG_COLORS: Record<string, string> = {
  "Restaurant": "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-700/40",
  "E-Commerce": "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/40",
  "Tourisme outdoor": "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border-sky-200 dark:border-sky-700/40",
  "Tourisme vélo": "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border-sky-200 dark:border-sky-700/40",
  "Événementiel": "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-700/40",
  "Agritourisme": "bg-lime-50 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300 border-lime-200 dark:border-lime-700/40",
  "Site bilingue": "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700/40",
  "Multilingue": "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700/40",
  "Réservation": "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-700/40",
  "Réservation en ligne": "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-700/40",
  "Location en ligne": "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-700/40",
  "SEO local": "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-700/40",
  "SEO": "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-700/40",
  "Dark mode premium": "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 border-gray-300 dark:border-white/20",
  "Identité visuelle": "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-700/40",
  "Formulaire devis": "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/40",
};

const DEFAULT_TAG = "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400 border-gray-200 dark:border-white/10";

export default async function PortfolioPage() {
  const projects = await getProjects();

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio — Réalisations web",
    "description": "Réalisations web de Face Nord Graphisme pour des entreprises locales des Hautes-Alpes et du Verdon.",
    "url": "https://www.facenordgraphisme.fr/portfolio",
    "author": {
      "@type": "LocalBusiness",
      "@id": "https://www.facenordgraphisme.fr/#localbusiness",
      "name": "Face Nord Graphisme"
    }
  };

  return (
    <div className="relative w-full min-h-screen text-[#1a1a1a] dark:text-white transition-colors duration-300 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "https://www.facenordgraphisme.fr" },
          { name: "Portfolio", url: "https://www.facenordgraphisme.fr/portfolio" },
        ]}
      />

      {/* Hero */}
      <div className="bg-[#f4f7f9] dark:bg-[#111111] pt-36 pb-24 px-6 transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedText effect="fade-up" delay={0.1}>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#239ea0] mb-5">
              Réalisations
            </p>
          </AnimatedText>
          <AnimatedText effect="fade-up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#1a1a1a] dark:text-white leading-tight tracking-tight mb-6">
              Mon <span className="text-[#239ea0]">Portfolio</span>
            </h1>
          </AnimatedText>
          <AnimatedText effect="fade-up" delay={0.3}>
            <p className="text-xl text-[#666666] dark:text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
              Sites web sur-mesure pour des entreprises locales des Hautes-Alpes et du Verdon — restaurants, prestataires outdoor, agriculture, événementiel.
            </p>
          </AnimatedText>

          {/* Stats */}
          <AnimatedText effect="fade-up" delay={0.4} className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: `${projects.length}+`, label: "Projets livrés" },
              { value: "100%", label: "Sur-mesure" },
              { value: "05 & 04", label: "Hautes-Alpes & Verdon" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-extrabold text-[#239ea0]">{stat.value}</span>
                <span className="text-xs text-[#666666] dark:text-[#a1a1aa] font-medium">{stat.label}</span>
              </div>
            ))}
          </AnimatedText>
        </div>
      </div>

      {/* Grid des projets */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project: any, index: number) => {
            const href = project.slug?.current ? `/portfolio/${project.slug.current}` : "/portfolio";
            const bgImage = project.mainImage?.url || project.mainImage || undefined;
            const tags: string[] = project.tags || [];

            return (
              <AnimatedText key={index} effect="fade-up" delay={index * 0.08}>
                <Link href={href} className="block group relative">
                  <article className="relative h-[460px] rounded-[32px] overflow-hidden bg-white dark:bg-[#1a1a1a] shadow-lg dark:shadow-none border border-gray-100 dark:border-white/5 flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                    {bgImage ? (
                      <Image
                        src={bgImage}
                        alt={`Réalisation web ${project.title} — Face Nord Graphisme Hautes-Alpes`}
                        fill
                        priority={index < 2}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#f4f7f9] dark:from-[#333333] to-white dark:to-[#1a1a1a]" />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-[#0d0d0d]/30 to-transparent z-10 transition-opacity duration-300" />

                    {/* Tags top-left */}
                    {tags.length > 0 && (
                      <div className="absolute top-5 left-5 z-20 flex flex-wrap gap-2">
                        {tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${TAG_COLORS[tag] || DEFAULT_TAG}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Arrow top-right */}
                    <div className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#239ea0] group-hover:border-[#239ea0]">
                      <ArrowRight size={16} className="text-white" />
                    </div>

                    {/* Content bottom */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-7 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {project.sector && (
                        <p className="text-[#239ea0] text-xs font-semibold uppercase tracking-wider mb-2">{project.sector}</p>
                      )}
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#239ea0] transition-colors duration-200">
                        {project.title}
                      </h2>
                      {project.description && (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-[#239ea0] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Voir le projet <ArrowRight size={14} />
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedText>
            );
          })}
        </div>

        {/* CTA bas de page */}
        <AnimatedText effect="zoom-in" delay={0.3} className="mt-24">
          <div className="text-center bg-gradient-to-br from-[#f4f7f9] to-white dark:from-[#111111] dark:to-[#1a1a1a] py-20 px-8 rounded-[40px] border border-gray-100 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#239ea0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <p className="text-sm font-semibold tracking-widest uppercase text-[#239ea0] mb-4 relative z-10">Vous avez un projet ?</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-[#1a1a1a] dark:text-white relative z-10">
              Et si votre site était le prochain ?
            </h2>
            <p className="text-lg text-[#666666] dark:text-[#a1a1aa] mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
              Je crée des sites web sur-mesure pour les entreprises des Hautes-Alpes et du Verdon. Discutons de votre projet autour d'un café (ou en visio).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#239ea0] text-white font-bold rounded-xl hover:bg-[#1c8486] transition-[background-color,transform] shadow-[0_10px_30px_rgba(35,158,160,0.3)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Démarrer un projet <ArrowRight size={18} />
              </Link>
              <Link
                href="/prestations"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white font-bold rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#239ea0] dark:hover:border-[#239ea0] transition-colors"
              >
                Mes prestations <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </AnimatedText>
      </div>
    </div>
  );
}
