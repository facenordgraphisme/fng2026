import HomeHero from "@/components/HomeHero";
import AnimatedText from "@/components/AnimatedText";
import RecentPosts from "@/components/RecentPosts";
import Link from "next/link";
import Image from "next/image";
import { getServices, getProjects, getHomepage } from "@/sanity/lib/queries";
import * as LucideIcons from "lucide-react";
import { MapPin, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  const rawTitle = homepage.seoTitle || "Création de Site Internet Hautes-Alpes (Embrun, Gap)";
  // Avoid double "Face Nord Graphisme" suffix: the root layout title template
  // appends "| Face Nord Graphisme" to any title that isn't marked absolute.
  const title = rawTitle.includes("Face Nord Graphisme") ? { absolute: rawTitle } : rawTitle;
  const description = homepage.seoDescription || "Expert en création de site web, e-commerce et SEO basé à Embrun dans les Hautes-Alpes. Accompagnement local sur Gap, Guillestre, Briançon et alentours.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://www.facenordgraphisme.fr",
    },
    openGraph: {
      title: "Face Nord Graphisme | Création de site internet Hautes-Alpes",
      description: "Expert en création de site web et SEO basé à Embrun. Accompagnement local sur Gap, Briançon et Guillestre.",
      url: "https://www.facenordgraphisme.fr",
      type: "website",
      siteName: "Face Nord Graphisme",
      locale: "fr_FR",
      images: [{ url: "/assets/home_intro.png", width: 1200, height: 630, alt: "Face Nord Graphisme - Création de site internet dans les Hautes-Alpes" }],
    }
  };
}

export default async function Home() {
  const services = await getServices();
  const projects = await getProjects();
  const homepage = await getHomepage();

  return (
    <div className="relative w-full overflow-hidden text-[#1a1a1a] dark:text-white transition-colors duration-300">
      {/* Hero Section using new Client Component for GSAP scroll-pin wow factor */}
      <HomeHero heroData={{
        heroEyebrow: homepage.heroEyebrow,
        heroHeadline: homepage.heroHeadline,
        heroSubtext: homepage.heroSubtext,
        heroPrimaryCtaLabel: homepage.heroPrimaryCtaLabel,
        heroSecondaryCtaLabel: homepage.heroSecondaryCtaLabel,
      }} />

      {/* About Section Snippet (Overlapping Layout) */}
      <section className="py-24 bg-[#f4f7f9] dark:bg-[#111111] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center relative gap-8 md:gap-0">
            <div className="w-full md:w-6/12 md:-mr-[10%] z-10 mt-12 md:mt-0">
              <AnimatedText effect="slide-side" className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 relative transition-colors duration-300">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#1a1a1a] dark:text-white">{homepage.aboutHeading}</h2>
                <div className="text-[#666666] dark:text-[#a1a1aa] text-lg space-y-6 leading-relaxed mb-8">
                  <p>{homepage.aboutParagraph1}</p>
                  <p>{homepage.aboutParagraph2}</p>
                </div>
                <Link href="/a-propos" className="inline-block px-8 py-3 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-bold rounded-md hover:bg-[#239ea0] dark:hover:bg-[#239ea0] dark:hover:text-white shadow-md hover:-translate-y-1 active:translate-y-0 transition-[background-color,transform]">
                  {homepage.aboutCtaLabel}
                </Link>
              </AnimatedText>
            </div>
            <div className="w-full md:w-7/12 z-0">
              <AnimatedText effect="zoom-in" className="relative h-[400px] md:h-[650px] w-full rounded-3xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <Image src="/assets/home_intro.png" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-300 origin-center hover:scale-110" alt="Paysage des Hautes-Alpes, Embrun et lac de Serre-Ponçon" />
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white dark:bg-[#1a1a1a] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-4/12 flex-shrink-0">
            <AnimatedText effect="3d-flip" className="sticky top-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a1a1a] dark:text-white leading-tight">{homepage.servicesHeading}</h2>
              <p className="text-[#666666] dark:text-[#a1a1aa] text-lg mb-8 leading-relaxed">
                {homepage.servicesParagraph}
              </p>
              <Link href="/prestations" className="inline-block px-8 py-3 bg-[#239ea0] text-white font-bold rounded-md hover:bg-[#1c8486] transition-[background-color,transform] shadow-[0_10px_20px_rgba(35,158,160,0.3)] hover:-translate-y-1 active:translate-y-0">
                {homepage.servicesCtaLabel}
              </Link>
            </AnimatedText>
          </div>
          <div className="lg:w-8/12">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service: any, i: number) => {
                const href = service.slug?.current ? `/${service.slug.current}` : "/prestations";
                const iconName = service.icon || "Briefcase";
                const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Briefcase;

                return (
                  <Link href={href} key={i} className="block group h-full">
                    <AnimatedText effect="fade-up" delay={i * 0.15} className="bg-[#f4f7f9] dark:bg-[#111111] h-full rounded-2xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-[transform,box-shadow,border-color] duration-300 border border-transparent group-hover:border-[#239ea0]/30 flex flex-col items-start group-hover:-translate-y-2">
                      <div className="text-[#239ea0] bg-white dark:bg-[#1a1a1a] p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300 mb-6">
                        <IconComponent size={36} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-[#1a1a1a] dark:text-white group-hover:text-[#239ea0] transition-colors">{service.title}</h3>
                      <p className="text-[#666666] dark:text-[#a1a1aa] text-sm leading-relaxed">{service.description || service.desc}</p>
                    </AnimatedText>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* City pages strip */}
      <section className="py-16 px-6 bg-[#f4f7f9] dark:bg-[#111111] border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="md:w-4/12 shrink-0">
              <div className="flex items-center gap-2 text-[#239ea0] text-xs font-bold uppercase tracking-widest mb-2">
                <MapPin className="size-3.5" />
                {homepage.cityStripEyebrow}
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white leading-tight">
                {homepage.cityStripHeading}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {(homepage.cities || []).map((city: any) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="flex-1 border-2 border-[#e8f5f5] dark:border-[#239ea0]/20 bg-white dark:bg-[#1a1a1a] rounded-2xl px-5 py-4 hover:border-[#239ea0] hover:shadow-md transition-all group"
                >
                  <div className="font-bold text-[#1a1a1a] dark:text-white group-hover:text-[#239ea0] transition-colors text-sm mb-1 flex items-center gap-1.5">
                    <MapPin className="size-3 text-[#239ea0]" />
                    {city.name}
                  </div>
                  <div className="text-[#888] text-xs">{city.desc}</div>
                  <div className="mt-2 text-[#239ea0] text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Voir la page <ArrowRight className="size-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-24 bg-[#f4f7f9] dark:bg-[#111111] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText effect="zoom-in" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white">{homepage.portfolioHeading}</h2>
          </AnimatedText>
          <div className="grid md:grid-cols-3 gap-8">
             {projects.slice(0, 3).map((project: any, i: number) => {
                const href = project.slug?.current ? `/portfolio/${project.slug.current}` : "/portfolio";
                const bgImage = project.mainImage?.url || project.mainImage || `/assets/about-img${(i % 3) + 1}.png`;
                return (
                  <Link href={href} key={i} className="block group">
                    <AnimatedText effect="3d-flip" delay={i * 0.15} className="relative h-[400px] w-full rounded-3xl overflow-hidden group cursor-pointer shadow-lg bg-gray-200 dark:bg-gray-800">
                      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-300">
                        <Image src={bgImage} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" alt={`Projet web ${project.title} réalisé dans les Hautes-Alpes`} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="w-12 h-1 bg-[#239ea0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                      </div>
                    </AnimatedText>
                  </Link>
                );
             })}
          </div>
          <div className="mt-16 text-center">
            <Link href="/portfolio" className="inline-block px-10 py-4 bg-white dark:bg-[#1a1a1a] border-2 border-[#1a1a1a] dark:border-white/20 text-[#1a1a1a] dark:text-white font-bold rounded-md hover:bg-[#1a1a1a] dark:hover:bg-white hover:text-white dark:hover:text-[#1a1a1a] transition-colors shadow-sm cursor-pointer">
              {homepage.portfolioCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action (Reverse Overlapping) */}
      <section className="py-32 bg-white dark:bg-[#1a1a1a] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center relative gap-8 md:gap-0">
            <div className="w-full md:w-6/12 md:-ml-[10%] z-10 mt-12 md:mt-0">
              <AnimatedText effect="slide-side" delay={0.2} className="bg-white dark:bg-[#111111] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-none border border-gray-50 dark:border-white/5 relative transition-colors duration-300">
                <h2 className="text-4xl font-bold mb-6 text-[#1a1a1a] dark:text-white leading-tight">{homepage.finalCtaHeading}</h2>
                <p className="text-lg text-[#666666] dark:text-[#a1a1aa] leading-relaxed mb-10">
                  {homepage.finalCtaParagraph}
                </p>
                <Link href="/contact" className="inline-block px-10 py-4 bg-[#239ea0] text-white font-bold rounded-md hover:bg-[#1c8486] transition-[background-color,transform] shadow-[0_10px_20px_rgba(35,158,160,0.3)] hover:-translate-y-1 active:translate-y-0">
                  {homepage.finalCtaLabel}
                </Link>
              </AnimatedText>
            </div>
            <div className="w-full md:w-7/12 z-0">
              <AnimatedText effect="zoom-in" className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl bg-gray-200 dark:bg-gray-800">
                <Image src="/assets/home_cta.png" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-300" alt="Espace de travail webdesign et création de site internet à Embrun" />
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>
      <RecentPosts />
    </div>
  )
}
