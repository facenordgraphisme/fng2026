import AnimatedText from "@/components/AnimatedText";
import { getServices } from "@/sanity/lib/queries";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prestations Web & SEO | Hautes-Alpes, Embrun, Gap",
  description: "Développement de sites vitrines, e-commerce, design UX/UI et optimisation SEO. Services digitaux sur-mesure pour votre entreprise dans les Hautes-Alpes."
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen text-[#1a1a1a] dark:text-white transition-colors duration-300">
      <AnimatedText>
        <h1 className="text-5xl md:text-6xl font-black mb-16 text-center tracking-tight text-[#1a1a1a] dark:text-white">
          Mes <span className="text-[#239ea0]">Prestations</span>
        </h1>
      </AnimatedText>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: any, index: number) => {
          const href = service.slug?.current ? `/prestations/${service.slug.current}` : "/prestations";
          
          // Get the requested icon from Lucide, fallback to Briefcase
          const iconName = service.icon || "Briefcase";
          const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Briefcase;

          return (
            <Link href={href} key={index} className="block group h-full">
              <AnimatedText className="h-full p-10 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-300 group-hover:border-[#239ea0]/30 group-hover:shadow-[0_20px_50px_rgba(35,158,160,0.1)] dark:group-hover:shadow-[0_20px_50px_rgba(35,158,160,0.15)] group-hover:-translate-y-2 flex flex-col items-start">
                <div className="text-[#239ea0] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform origin-left mb-6">
                  <IconComponent size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-[#1a1a1a] dark:text-white group-hover:text-[#239ea0] transition-colors">{service.title}</h2>
                <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed">{service.description || service.desc}</p>
              </AnimatedText>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
