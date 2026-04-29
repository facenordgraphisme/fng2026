import { getPostBySlug } from "@/sanity/lib/queries";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let post: any = null;
  try {
    post = await getPostBySlug(resolvedParams.slug);
  } catch (err) {}
  
  if (!post) return { title: "Article non trouvé" };
  
  return {
    title: post.seoTitle || `${post.title} | Blog SEO & Web (05)`,
    description: post.seoDescription || post.excerpt || `Lisez notre article "${post.title}" sur le blog de Face Nord Graphisme, agence web dans les Hautes-Alpes.`
  };
}

// Portable text renderer tailored for blog posts
const renderBlock = (block: any, index: number) => {
  if (block._type !== 'block') return null;
  const text = block.children?.map((c: any) => c.text).join('') || '';
  
  switch (block.style) {
    case 'h2':
      return <h2 key={index} className="text-3xl font-bold mt-16 mb-8 text-[#1a1a1a] leading-tight">{text}</h2>;
    case 'h3':
      return <h3 key={index} className="text-2xl font-bold mt-12 mb-6 text-[#1a1a1a]">{text}</h3>;
    case 'blockquote':
      return <blockquote key={index} className="border-l-4 border-[#239ea0] pl-6 my-10 italic text-2xl font-medium text-[#1a1a1a]/80 bg-[#f4f7f9] py-8 rounded-r-2xl shadow-sm">{text}</blockquote>;
    case 'normal':
    default:
      if (!text.trim()) return <br key={index} />;
      return <p key={index} className="text-[#444] text-lg leading-[1.8] mb-8 tracking-wide font-normal">{text}</p>;
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  let post: any = null;
  
  try {
    post = await getPostBySlug(slug);
  } catch (err) {
    console.error(err);
  }

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : 'Récemment';

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Article Header */}
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <AnimatedText effect="fade-up" delay={0.1}>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#666] hover:text-[#239ea0] transition-colors mb-12 group bg-[#f4f7f9] px-5 py-2.5 rounded-full">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Retour aux articles
          </Link>
        </AnimatedText>

        <AnimatedText effect="fade-up" delay={0.2} className="mb-8">
          <div className="flex items-center gap-2 text-[#239ea0] font-bold mb-6">
            <Clock size={16} />
            <span>Publié le {formattedDate}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1a1a1a] leading-[1.1] tracking-tight">
            {post.title}
          </h1>
        </AnimatedText>
      </div>

      {/* Main Image Banner */}
      {post.mainImage?.url && (
        <div className="max-w-6xl mx-auto px-6 mb-20 relative z-20">
          <AnimatedText effect="zoom-in" delay={0.35} className="relative w-full h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-gray-100">
            <Image src={post.mainImage.url} alt={`Illustration de l'article : ${post.title}`} fill className="object-cover" />
          </AnimatedText>
        </div>
      )}

      {/* Article Body */}
      {((post.body && Array.isArray(post.body)) || post.excerpt) && (
        <article className="max-w-3xl mx-auto px-6 mb-32">
          <AnimatedText effect="fade-up" delay={0.4}>
            <div className="prose prose-lg max-w-none prose-headings:text-[#1a1a1a] prose-a:text-[#239ea0] hover:prose-a:text-[#1c8486] prose-img:rounded-3xl">
              {post.body && Array.isArray(post.body) 
                ? post.body.map((block: any, i: number) => renderBlock(block, i))
                : <p className="text-[#444] text-xl leading-relaxed">{post.excerpt}</p>
              }
            </div>
          </AnimatedText>
        </article>
      )}

      {/* Newsletter / CTA Section */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <AnimatedText effect="zoom-in" delay={0.5} className="bg-[#f4f7f9] py-16 px-8 rounded-[40px] text-center border border-gray-100 relative overflow-hidden group">
           <h3 className="text-3xl font-bold mb-4 text-[#1a1a1a]">Ce contenu vous a plu ?</h3>
           <p className="text-[#666] mb-8 max-w-lg mx-auto text-lg leading-relaxed">
             Dites-moi tout sur votre idée de projet, et je serais ravi(e) de partager d'autres conseils adaptés à votre situation.
           </p>
           <Link href="/contact" className="inline-block px-10 py-4 bg-[#1a1a1a] text-white font-bold text-lg rounded-xl hover:bg-[#239ea0] transition-colors shadow-lg hover:-translate-y-1">
             Me contacter
           </Link>
        </AnimatedText>
      </div>
    </div>
  );
}
