import AnimatedText from "@/components/AnimatedText";
import { getProjects } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen text-[#1a1a1a] dark:text-white transition-colors duration-300">
      <AnimatedText>
        <h1 className="text-5xl md:text-6xl font-black mb-16 text-center tracking-tight text-[#1a1a1a] dark:text-white">
          Mon <span className="text-[#239ea0]">Portfolio</span>
        </h1>
      </AnimatedText>
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project: any, index: number) => {
          const href = project.slug?.current ? `/portfolio/${project.slug.current}` : "/portfolio";
          const bgImage = project.mainImage?.url || project.mainImage || undefined;
          return (
            <Link href={href} key={index} className="block group">
              <AnimatedText className="relative h-96 rounded-3xl overflow-hidden bg-white dark:bg-[#1a1a1a] shadow-lg dark:shadow-none border border-gray-100 dark:border-white/5 flex items-center justify-center transition-colors duration-300">
                {bgImage ? (
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${bgImage})` }} />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#f4f7f9] dark:from-[#333333] to-white dark:to-[#1a1a1a] transition-transform duration-700 group-hover:scale-105" />
                )}
                {/* Always visible overlay for text clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/40 to-transparent z-10" />
                
                <div className="absolute bottom-8 left-8 right-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-[#239ea0] transition-colors">{project.title}</h2>
                  {project.description && <p className="text-gray-200 opacity-80 group-hover:opacity-100 transition-opacity line-clamp-2">{project.description}</p>}
                </div>
              </AnimatedText>
            </Link>
          );
        })}
      </div>
    </div>
  )
}
