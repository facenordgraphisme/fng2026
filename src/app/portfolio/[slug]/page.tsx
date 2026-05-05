import { getProjectBySlug } from "@/sanity/lib/queries";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let project: any = null;
  try {
    project = await getProjectBySlug(resolvedParams.slug);
  } catch (err) {}
  
  if (!project) return { title: "Projet non trouvé" };
  
  return {
    title: project.seoTitle || `${project.title} | Réalisation Web Hautes-Alpes`,
    description: project.seoDescription || project.description || `Découvrez la réalisation du projet ${project.title} par Face Nord Graphisme (Embrun, Hautes-Alpes).`
  };
}

// Portable text renderer (similar to the one in prestations)
const renderBlock = (block: any, index: number) => {
  if (block._type === 'image') {
    if (!block.url) return null;
    return (
      <div key={index} className="my-10 relative w-full h-[350px] md:h-[500px] rounded-[32px] overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-800">
        <Image src={block.url} alt={block.alt || 'Illustration du projet'} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" className="object-cover" />
      </div>
    );
  }

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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let project: any = null;
  
  try {
    project = await getProjectBySlug(slug);
  } catch (err) {
    console.error(err);
  }

  if (!project) {
    notFound();
  }

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.seoTitle || project.title,
    "description": project.seoDescription || project.description,
    "image": project.mainImage?.url ? [project.mainImage.url] : [],
    "url": project.link && project.link !== '#' ? project.link : `https://www.facenordgraphisme.fr/portfolio/${slug}`,
    "author": {
      "@type": "LocalBusiness",
      "@id": "https://www.facenordgraphisme.fr/#localbusiness",
      "name": "Face Nord Graphisme"
    }
  };

  return (
    <div className="relative w-full min-h-screen text-[#1a1a1a] dark:text-white transition-colors duration-300 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      {/* Hero Section */}
      <div className="bg-[#f4f7f9] dark:bg-[#111111] pt-32 pb-32 px-6 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          <AnimatedText effect="fade-up" delay={0.1}>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] transition-colors mb-10 group bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Retour au Portfolio
            </Link>
          </AnimatedText>

          <AnimatedText effect="fade-up" delay={0.2} className="mb-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#1a1a1a] dark:text-white leading-tight">
              {project.title}
            </h1>
          </AnimatedText>
          
          <AnimatedText effect="fade-up" delay={0.3}>
            <p className="text-xl md:text-2xl text-[#666666] dark:text-[#a1a1aa] max-w-3xl mx-auto leading-relaxed mt-4">
              {project.description}
            </p>
          </AnimatedText>

          {project.link && project.link !== '#' && (
            <AnimatedText effect="fade-up" delay={0.4} className="mt-10">
               <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-bold rounded-xl hover:bg-[#239ea0] dark:hover:bg-[#239ea0] dark:hover:text-white transition-colors shadow-lg">
                 Visiter le site web <ExternalLink size={20} />
               </a>
            </AnimatedText>
          )}
        </div>
      </div>

      {/* Main Image Banner */}
      {project.mainImage?.url && (
        <div className="max-w-6xl mx-auto px-6 mt-0 md:-mt-20 relative z-20">
          <AnimatedText effect="zoom-in" delay={0.35} className="relative w-full h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-gray-800">
            <div className="absolute inset-0 bg-black/5 mix-blend-overlay z-10 pointer-events-none" />
            <Image src={project.mainImage.url} alt={`Création du site internet ${project.title} dans les Hautes-Alpes`} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover hover:scale-105 transition-transform duration-1000" />
          </AnimatedText>
        </div>
      )}

      {/* Content Section */}
      {((project.content && Array.isArray(project.content)) || project.description) && (
        <div className="max-w-4xl mx-auto px-6 mt-20 md:mt-32">
          <AnimatedText effect="fade-up" delay={0.4} className="bg-white dark:bg-[#1a1a1a] p-8 md:p-16 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {project.content && Array.isArray(project.content) 
                ? project.content.map((block: any, i: number) => renderBlock(block, i))
                : <p className="text-[#666666] dark:text-[#a1a1aa] text-lg leading-relaxed">{project.description}</p>
              }
            </div>
          </AnimatedText>
        </div>
      )}

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
         <div className="max-w-6xl mx-auto px-6 mt-24">
            <AnimatedText effect="fade-up" className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] dark:text-white">Galerie du Projet</h2>
            </AnimatedText>
            
            <div className="grid md:grid-cols-2 gap-8">
               {project.gallery.map((img: any, i: number) => {
                  if (!img.url) return null;
                  return (
                    <AnimatedText key={i} effect="fade-up" delay={i * 0.15} className={`relative w-full rounded-[32px] overflow-hidden shadow-xl border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-gray-800 ${i === 0 && project.gallery.length % 2 !== 0 ? 'md:col-span-2 h-[400px] md:h-[600px]' : 'h-[300px] md:h-[450px]'}`}>
                      <Image src={img.url} alt={`Aperçu du projet web ${project.title} Hautes-Alpes - Vue ${i+1}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" className="object-cover hover:scale-105 transition-transform duration-1000" />
                    </AnimatedText>
                  )
               })}
            </div>
         </div>
      )}

      {/* Call to action */}
      <div className="max-w-4xl mx-auto px-6 mt-32">
        <AnimatedText effect="zoom-in" delay={0.5} className="text-center bg-gradient-to-br from-[#f4f7f9] to-white dark:from-[#111111] dark:to-[#1a1a1a] py-20 px-8 rounded-[40px] border border-gray-100 dark:border-white/5 relative overflow-hidden group">
           <div className="absolute inset-0 bg-[#239ea0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
           <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1a1a1a] dark:text-white relative z-10">Un projet similaire en tête ?</h3>
           <p className="text-lg text-[#666666] dark:text-[#a1a1aa] mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
             Contactez-moi pour discuter de vos besoins. Nous construirons ensemble la solution idéale pour votre entreprise.
           </p>
           <Link href="/contact" className="relative z-10 inline-block px-10 py-5 bg-[#239ea0] text-white font-bold text-lg rounded-xl hover:bg-[#1c8486] transition-all shadow-[0_10px_30px_rgba(35,158,160,0.3)] hover:-translate-y-1">
             Démarrer un projet
           </Link>
        </AnimatedText>
      </div>
    </div>
  );
}
