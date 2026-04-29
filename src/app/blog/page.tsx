import AnimatedText from "@/components/AnimatedText";
import { getPosts } from "@/sanity/lib/queries";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Web & SEO | Astuces digitales Hautes-Alpes",
  description: "Actualités, conseils en création de site internet et référencement SEO pour développer votre visibilité locale dans les Hautes-Alpes (05)."
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <AnimatedText>
        <h1 className="text-5xl md:text-6xl font-black mb-16 text-center tracking-tight text-[#1a1a1a]">
          Le <span className="text-[#239ea0]">Blog</span>
        </h1>
      </AnimatedText>

      {posts.length === 0 ? (
        <AnimatedText className="text-center p-16 bg-white border border-gray-100 shadow-sm rounded-3xl">
          <p className="text-[#666666] text-xl">Aucun article n'a encore été publié.</p>
          <p className="text-gray-400 mt-2">Revenez très bientôt !</p>
        </AnimatedText>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post: any, index: number) => {
            const href = post.slug?.current ? `/blog/${post.slug.current}` : "/blog";
            const imageUrl = post.mainImage?.url || post.mainImage;
            return (
              <Link href={href} key={index} className="block group">
                <AnimatedText className="flex flex-col bg-white border border-gray-100 shadow-[0_10px_20px_rgba(0,0,0,0.03)] rounded-3xl hover:shadow-[0_15px_30px_rgba(35,158,160,0.1)] hover:-translate-y-2 transition-all overflow-hidden h-full">
                  {imageUrl ? (
                    <div className="h-48 w-full overflow-hidden">
                      <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform" style={{ backgroundImage: `url(${imageUrl})` }} />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-[#f4f7f9] flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                  <div className="p-8 flex-grow">
                    <p className="text-sm font-bold text-[#239ea0] mb-2">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : 'Récent'}</p>
                    <h2 className="text-xl font-bold text-[#1a1a1a] leading-tight group-hover:text-[#239ea0] transition-colors">{post.title}</h2>
                    {post.excerpt && <p className="text-[#666666] mt-3 line-clamp-3 text-sm">{post.excerpt}</p>}
                  </div>
                </AnimatedText>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
