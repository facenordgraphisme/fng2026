import { getLegalBySlug } from "@/sanity/lib/queries";
import AnimatedText from "@/components/AnimatedText";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Portable text renderer tailored for legal pages
const renderBlock = (block: any, index: number) => {
  if (block._type !== 'block') return null;
  const text = block.children?.map((c: any) => c.text).join('') || '';
  
  switch (block.style) {
    case 'h2':
      return <h2 key={index} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-[#1a1a1a] dark:text-white leading-tight">{text}</h2>;
    case 'h3':
      return <h3 key={index} className="text-xl md:text-2xl font-bold mt-10 mb-5 text-[#1a1a1a] dark:text-white">{text}</h3>;
    case 'blockquote':
      return <blockquote key={index} className="border-l-4 border-[#239ea0] pl-6 my-8 italic text-xl font-medium text-[#666] dark:text-[#a1a1aa] bg-[#f4f7f9] dark:bg-white/5 py-6 rounded-r-xl shadow-sm">{text}</blockquote>;
    case 'normal':
    default:
      if (!text.trim()) return <br key={index} />;
      return <p key={index} className="text-[#666] dark:text-[#a1a1aa] text-lg md:text-xl leading-relaxed mb-6">{text}</p>;
  }
};

export default async function MentionsLegalesPage() {
  let post: any = null;
  
  try {
    post = await getLegalBySlug('mentions-legales');
  } catch (err) {
    console.error(err);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="relative w-full min-h-screen text-[#1a1a1a] dark:text-white transition-colors duration-300 bg-white dark:bg-[#111111]">
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <AnimatedText effect="fade-up" delay={0.1}>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#666] dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-white transition-colors mb-12 group bg-[#f4f7f9] dark:bg-white/5 px-5 py-2.5 rounded-full">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
        </AnimatedText>

        <AnimatedText effect="fade-up" delay={0.2} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white leading-[1.1] tracking-tight">
            {post.title}
          </h1>
        </AnimatedText>
      </div>

      {post.content && Array.isArray(post.content) && (
        <article className="max-w-4xl mx-auto px-6 pb-32">
          <AnimatedText effect="fade-up" delay={0.3}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.map((block: any, i: number) => renderBlock(block, i))}
            </div>
          </AnimatedText>
        </article>
      )}
    </div>
  );
}
