import { getPostBySlug, getAuthor } from "@/sanity/lib/queries";
import AnimatedText from "@/components/AnimatedText";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Fragment } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  let post: any = null;
  try {
    post = await getPostBySlug(resolvedParams.slug);
  } catch (err) {}
  
  if (!post) return { title: { absolute: "Article non trouvé | Face Nord Graphisme" } };

  const rawTitle = post.seoTitle || post.title;
  const title = { absolute: `${rawTitle} | Face Nord Graphisme` };
  const description = post.seoDescription || `Lisez notre article sur le blog de Face Nord Graphisme, agence web dans les Hautes-Alpes (05).`;
  const url = `https://www.facenordgraphisme.fr/blog/${resolvedParams.slug}`;
  const mainImage = post.mainImage?.url || "/assets/home_intro.png";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Face Nord Graphisme',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: post.publishedAt,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [mainImage],
    },
  };
}

const renderInline = (block: any) => {
  if (!block.children?.length) return null;
  return block.children.map((child: any, i: number) => {
    const marks: string[] = child.marks || [];
    if (!marks.length) return <Fragment key={i}>{child.text}</Fragment>;

    const linkDef = block.markDefs?.find((d: any) => marks.includes(d._key) && d._type === 'link');
    if (linkDef) {
      const isExternal = /^https?:\/\//.test(linkDef.href || '');
      return isExternal ? (
        <a key={i} href={linkDef.href} target="_blank" rel="noopener noreferrer"
           className="text-[#239ea0] hover:underline font-medium">{child.text}</a>
      ) : (
        <Link key={i} href={linkDef.href} className="text-[#239ea0] hover:underline font-medium">{child.text}</Link>
      );
    }

    let el: React.ReactNode = child.text;
    if (marks.includes('strong')) el = <strong key={i}>{el}</strong>;
    if (marks.includes('em')) el = <em key={i}>{el}</em>;
    return <Fragment key={i}>{el}</Fragment>;
  });
};

// Portable text renderer tailored for blog posts
const renderBlock = (block: any, index: number) => {
  if (block._type === 'table') {
    const { rows } = block;
    if (!rows || rows.length === 0) return null;
    
    return (
      <div key={index} className="overflow-x-auto mb-10 w-full rounded-2xl shadow-sm border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row: any, rowIndex: number) => (
              <tr key={row._key || rowIndex} className={rowIndex === 0 ? "bg-[#f4f7f9] font-bold text-[#1a1a1a]" : "hover:bg-gray-50 transition-colors"}>
                {row.cells.map((cell: string, cellIndex: number) => {
                  const CellTag = rowIndex === 0 ? 'th' : 'td';
                  return (
                    <CellTag 
                      key={cellIndex} 
                      className={`px-6 py-4 whitespace-normal text-sm md:text-base ${rowIndex === 0 ? 'text-left tracking-wider' : 'text-[#444]'}`}
                    >
                      {cell}
                    </CellTag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block._type === 'list') {
    const Tag = block.listItem === 'bullet' ? 'ul' : 'ol';
    return (
      <Tag key={index} className={`mb-10 space-y-4 ${block.listItem === 'bullet' ? 'list-disc ml-8' : 'list-decimal ml-8'}`}>
        {block.items.map((item: any, i: number) => (
          <li key={item._key || i} className="text-[#444] text-lg leading-[1.8] pl-2">
            {renderInline(item)}
          </li>
        ))}
      </Tag>
    );
  }

  if (block._type === 'toc') {
    return (
      <div key={index} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-6 md:p-8 my-10">
        <strong className="block text-[#1a1a1a] text-sm md:text-base font-bold uppercase tracking-wider mb-4">
          {block.title || 'Sommaire'}
        </strong>
        <ol className="list-decimal ml-6 space-y-2">
          {block.items?.map((item: any, i: number) => (
            <li key={i} className="text-[#444] text-sm md:text-base">
              <a href={`#${item.anchor}`} className="text-[#239ea0] hover:underline transition-colors">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (block._type === 'spokeCard') {
    return (
      <div key={index} className="border-2 border-[#e8f5f5] rounded-2xl p-6 md:p-8 my-10 bg-white shadow-sm hover:shadow-md transition-shadow">
        {block.badge && (
          <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-[#239ea0] mb-2">
            {block.badge}
          </div>
        )}
        {block.title && <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-3">{block.title}</h3>}
        {block.description && <p className="text-[#666] text-sm md:text-base mb-6 leading-relaxed">{block.description}</p>}
        {block.linkUrl && (
          <Link href={block.linkUrl} className="text-[#239ea0] font-bold text-sm md:text-base hover:underline inline-flex items-center gap-1">
            {block.linkText || 'En savoir plus'} →
          </Link>
        )}
      </div>
    );
  }

  if (block._type === 'faq') {
    const { title, items } = block;
    if (!items || items.length === 0) return null;
    
    return (
      <div key={index} className="mb-12">
        {title && <h3 className="text-2xl font-bold mb-6 text-[#1a1a1a]">{title}</h3>}
        <div className="space-y-4">
          {items.map((item: any, i: number) => (
            <details key={item._key || i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm [&_summary::-webkit-details-marker]:hidden open:shadow-md transition-all duration-300">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-5 md:p-6 font-bold text-[#1a1a1a] text-lg outline-none group-open:text-[#239ea0] transition-colors">
                {item.question}
                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180 text-[#239ea0]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 md:px-6 md:pb-6">
                <p className="text-[#666666] leading-relaxed text-base md:text-lg">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    );
  }

  if (block._type === 'image') {
    if (!block.url) return null;
    const isSvg = block.url.toLowerCase().includes('.svg');
    if (isSvg) {
      return (
        <figure key={index} className="my-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.url} alt={block.alt || ''} className="w-full rounded-2xl" style={{ height: 'auto' }} />
          {block.caption && <figcaption className="text-sm text-[#888] text-center mt-2 italic">{block.caption}</figcaption>}
        </figure>
      );
    }
    return (
      <figure key={index} className="my-12">
        <div className="relative w-full h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] bg-gray-100">
          <Image src={block.url} alt={block.alt || 'Illustration de l\'article'} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" className="object-cover" />
        </div>
        {block.caption && <figcaption className="text-sm text-[#888] text-center mt-2 italic">{block.caption}</figcaption>}
      </figure>
    );
  }

  if (block._type !== 'block') return null;
  const plainText = block.children?.map((c: any) => c.text).join('') || '';

  switch (block.style) {
    case 'h2':
      return <h2 key={index} className="text-3xl font-bold mt-16 mb-8 text-[#1a1a1a] leading-tight">{renderInline(block)}</h2>;
    case 'h3':
      return <h3 key={index} className="text-2xl font-bold mt-12 mb-6 text-[#1a1a1a]">{renderInline(block)}</h3>;
    case 'blockquote':
      return (
        <blockquote key={index} className="border-l-4 border-[#239ea0] pl-6 md:pl-8 my-10 bg-[#f4f7f9] py-8 rounded-r-2xl shadow-sm italic text-[#333] text-lg md:text-xl leading-relaxed">
          {renderInline(block)}
        </blockquote>
      );
    case 'capsule':
      return (
        <div key={index} className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-6 md:p-8 my-10 italic text-[#555] text-base md:text-lg leading-relaxed shadow-sm">
          {renderInline(block)}
        </div>
      );
    case 'citation':
      return (
        <div key={index} className="bg-[#1a1a1a] text-white p-8 md:p-12 rounded-[32px] my-12 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.89543 10.9124 7 12.017 7H19.017C20.1216 7 21.017 7.89543 21.017 9V15C21.017 17.7614 18.7784 20 16.017 20H14.017V21ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017C-0.535279 13 -1.017 12.5523 -1.017 12V9C-1.017 7.89543 -0.121571 7 0.983 7H8.017C9.12157 7 10.017 7.89543 10.017 9V15C10.017 17.7614 7.77843 20 5.017 20H3.017V21Z" /></svg>
          </div>
          <p className="text-white text-xl md:text-2xl font-medium leading-relaxed relative z-10 m-0">
            {renderInline(block)}
          </p>
        </div>
      );
    case 'normal':
    default:
      if (!plainText.trim()) return <br key={index} />;
      return <p key={index} className="text-[#444] text-lg leading-[1.8] mb-8 tracking-wide font-normal">{renderInline(block)}</p>;
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [post, author] = await Promise.all([
    getPostBySlug(slug).catch((err) => { console.error(err); return null; }),
    getAuthor().catch(() => null),
  ]);

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

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitle || post.title,
    "description": post.seoDescription,
    "image": post.mainImage?.url ? [post.mainImage.url] : [],
    "datePublished": post.publishedAt || new Date().toISOString(),
    "dateModified": post.lastUpdated || post.publishedAt || new Date().toISOString(),
    "author": [{
      "@type": "Person",
      "@id": "https://www.facenordgraphisme.fr/a-propos#fxpin",
      "name": author?.name || "François-Xavier Pin",
      "url": author?.website || "https://www.facenordgraphisme.fr/a-propos",
      "jobTitle": author?.role,
      "image": author?.photo?.url,
      "sameAs": author?.linkedin ? [author.linkedin] : [],
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Face Nord Graphisme",
      "url": "https://www.facenordgraphisme.fr",
    },
    "inLanguage": "fr-FR",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.facenordgraphisme.fr/blog/${slug}`,
    },
  };

  const faqBlocks = post.body?.filter((block: any) => block._type === 'faq') || [];
  const faqItems = faqBlocks.flatMap((block: any) => block.items || []);
  
  let faqSchema = null;
  if (faqItems.length > 0) {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map((item: any) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  }

  return (
    <div className="relative w-full min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "https://www.facenordgraphisme.fr" },
          { name: "Blog", url: "https://www.facenordgraphisme.fr/blog" },
          { name: post.title, url: `https://www.facenordgraphisme.fr/blog/${slug}` },
        ]}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
          <div className="relative w-full h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-gray-100">
            <Image src={post.mainImage.url} alt={`Illustration de l'article : ${post.title}`} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
          </div>
        </div>
      )}

      {/* Article Body */}
      {((post.body && Array.isArray(post.body)) || post.excerpt) && (
        <article className="max-w-3xl mx-auto px-6 mb-32">
          <AnimatedText effect="fade-up" delay={0.4}>
            <div className="prose prose-lg max-w-none prose-headings:text-[#1a1a1a] prose-a:text-[#239ea0] hover:prose-a:text-[#1c8486] prose-img:rounded-3xl">
              {post.body && Array.isArray(post.body) 
                ? (() => {
                    const groupedBody = post.body.reduce((acc: any[], block: any) => {
                      const lastBlock = acc[acc.length - 1];
                      if (block.listItem && lastBlock && lastBlock._type === 'list' && lastBlock.listItem === block.listItem) {
                        lastBlock.items.push(block);
                      } else if (block.listItem) {
                        acc.push({ _type: 'list', listItem: block.listItem, items: [block] });
                      } else {
                        acc.push(block);
                      }
                      return acc;
                    }, []);
                    return groupedBody.map((block: any, i: number) => renderBlock(block, i));
                  })()
                : <p className="text-[#444] text-xl leading-relaxed">{post.excerpt}</p>
              }
            </div>
          </AnimatedText>
        </article>
      )}

      {/* Author Card */}
      {author && (
        <div className="max-w-3xl mx-auto px-6 mb-16">
          <AnimatedText effect="fade-up" delay={0.45}>
            <div className="flex items-start gap-6 bg-[#f4f7f9] rounded-3xl p-8 border border-gray-100">
              {author.photo?.url && (
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src={author.photo.url}
                    alt={`Photo de ${author.name}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-[#239ea0] mb-1">Rédigé par</p>
                <h3 className="text-xl font-black text-[#1a1a1a] mb-0.5">{author.name}</h3>
                {author.role && (
                  <p className="text-sm text-[#888] mb-3">{author.role}</p>
                )}
                {author.bio && (
                  <p className="text-[#555] leading-relaxed text-base">{author.bio}</p>
                )}
                <div className="flex items-center gap-4 mt-4">
                  <Link
                    href="/a-propos"
                    className="text-sm font-bold text-[#239ea0] hover:underline"
                  >
                    En savoir plus →
                  </Link>
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#666] hover:text-[#239ea0] transition-colors"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </AnimatedText>
        </div>
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
