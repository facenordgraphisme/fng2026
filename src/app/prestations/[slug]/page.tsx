import { getServiceBySlug } from "@/sanity/lib/queries";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Simple portable text renderer matching the current aesthetic
const renderBlock = (block: any, index: number) => {
  if (block._type !== 'block') return null;
  const text = block.children?.map((c: any) => c.text).join('') || '';
  
  switch (block.style) {
    case 'h2':
      return <h2 key={index} className="text-3xl lg:text-4xl font-bold mt-12 mb-6 text-[#1a1a1a] dark:text-white leading-tight">{text}</h2>;
    case 'h3':
      return <h3 key={index} className="text-2xl font-bold mt-10 mb-5 text-[#1a1a1a] dark:text-white">{text}</h3>;
    case 'blockquote':
      return <blockquote key={index} className="border-l-4 border-[#239ea0] pl-6 my-8 italic text-xl text-[#666666] dark:text-[#a1a1aa] bg-gray-50 dark:bg-white/5 py-6 rounded-r-xl">{text}</blockquote>;
    case 'normal':
    default:
      if (!text.trim()) return <br key={index} />;
      return <p key={index} className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed mb-6 text-lg">{text}</p>;
  }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let service: any = null;
  
  try {
    service = await getServiceBySlug(slug);
  } catch (err) {
    console.error(err);
  }

  if (!service) {
    notFound();
  }

  return (
    <div className="relative w-full min-h-screen text-[#1a1a1a] dark:text-white transition-colors duration-300 pb-24">
      {/* Hero Section */}
      <div className="bg-[#f4f7f9] dark:bg-[#111111] pt-32 pb-24 px-6 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#239ea0]/30 to-transparent" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedText effect="fade-up" delay={0.1}>
            <Link href="/prestations" className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] transition-colors mb-10 group bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Retour aux Prestations
            </Link>
          </AnimatedText>

          <AnimatedText effect="fade-up" delay={0.2} className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="text-5xl md:text-7xl text-[#239ea0] bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl shadow-md border border-gray-50 dark:border-white/5 flex-shrink-0">
              {service.icon || "✨"}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#1a1a1a] dark:text-white leading-tight">
              {service.title}
            </h1>
          </AnimatedText>
          
          <AnimatedText effect="fade-up" delay={0.3}>
            <p className="text-xl md:text-2xl text-[#666666] dark:text-[#a1a1aa] max-w-3xl leading-relaxed mt-6">
              {service.description}
            </p>
          </AnimatedText>
        </div>
      </div>

      {/* Main Image Banner */}
      {service.mainImage?.url && (
        <div className="max-w-5xl mx-auto px-6 mt-16">
          <AnimatedText effect="zoom-in" delay={0.35} className="relative w-full h-[350px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-gray-800">
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay z-10 pointer-events-none" />
            <Image src={service.mainImage.url} alt={service.title} fill className="object-cover hover:scale-105 transition-transform duration-1000" />
          </AnimatedText>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 mt-16 md:mt-24">
        <AnimatedText effect="fade-up" delay={0.4} className="bg-white dark:bg-[#1a1a1a] p-8 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
          <div className="prose prose-lg dark:prose-invert max-w-none">
             {service.content && Array.isArray(service.content) 
               ? service.content.map((block: any, i: number) => renderBlock(block, i))
               : <p className="text-[#666666] dark:text-[#a1a1aa] text-lg leading-relaxed">{service.description}</p>
             }
          </div>
        </AnimatedText>
        
        {/* Secondary Image */}
        {service.secondaryImage?.url && (
          <AnimatedText effect="fade-up" delay={0.45} className="mt-16 relative w-full h-[300px] md:h-[400px] rounded-[32px] overflow-hidden shadow-xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-gray-800">
            <Image src={service.secondaryImage.url} alt={service.title} fill className="object-cover hover:scale-105 transition-transform duration-1000" />
          </AnimatedText>
        )}
        
        {/* CTA Section */}
        <AnimatedText effect="zoom-in" delay={0.5} className="mt-24 text-center bg-gradient-to-br from-[#f4f7f9] to-white dark:from-[#111111] dark:to-[#1a1a1a] py-20 px-8 rounded-[40px] border border-gray-100 dark:border-white/5 relative overflow-hidden group">
           <div className="absolute inset-0 bg-[#239ea0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
           <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a1a] dark:text-white relative z-10">Prêt à démarrer votre projet ?</h3>
           <p className="text-lg text-[#666666] dark:text-[#a1a1aa] mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
             Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé pour ce service spécifique.
           </p>
           <Link href="/contact" className="relative z-10 inline-block px-10 py-5 bg-[#239ea0] text-white font-bold text-lg rounded-xl hover:bg-[#1c8486] transition-all shadow-[0_10px_30px_rgba(35,158,160,0.3)] hover:-translate-y-1">
             Demander un devis gratuit
           </Link>
        </AnimatedText>
      </div>
    </div>
  );
}
