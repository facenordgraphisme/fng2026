import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedText from './AnimatedText'
import { getPosts } from '@/sanity/lib/queries'

export default async function RecentPosts() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="py-24 bg-[#f4f7f9] dark:bg-[#111111] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <AnimatedText effect="slide-side">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-6">Derniers articles du blog</h2>
              <p className="text-[#666666] dark:text-[#a1a1aa] text-lg leading-relaxed">
                Conseils, actualités et guides pratiques pour booster votre présence en ligne dans les Hautes-Alpes.
              </p>
            </AnimatedText>
          </div>
          <AnimatedText effect="fade-up" delay={0.2}>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-2 px-8 py-3 bg-[#f4f7f9] dark:bg-[#111111] text-[#1a1a1a] dark:text-white font-bold rounded-full hover:bg-[#239ea0] hover:text-white dark:hover:bg-[#239ea0] transition-[background-color,color] group shadow-sm">
              Voir tous les articles
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </AnimatedText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post: any, i: number) => {
            const date = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });

            return (
              <Link href={`/blog/${post.slug.current}`} key={post._id} className="group">
                <AnimatedText effect="fade-up" delay={i * 0.1} className="h-full bg-white dark:bg-[#1a1a1a] p-5 rounded-[2rem] shadow-sm hover:shadow-[0_20px_50px_rgba(35,158,160,0.1)] transition-[box-shadow,border-color] duration-300 border border-transparent hover:border-[#239ea0]/10 flex flex-col">
                  <div className="relative h-64 w-full rounded-[1.5rem] overflow-hidden mb-6 shadow-sm bg-gray-100 dark:bg-gray-800">
                    <Image 
                      src={post.mainImage?.url || "/assets/about-img1.png"} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      alt={post.title} 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-sm text-[#239ea0] text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                        Briefs
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 px-2 flex-grow">
                    <p className="text-xs font-bold text-[#239ea0] uppercase tracking-wider">{date}</p>
                    <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white group-hover:text-[#239ea0] transition-colors leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#666666] dark:text-[#a1a1aa] line-clamp-2 text-sm leading-relaxed">
                      {post.excerpt || "Conseils et expertise pour votre stratégie digitale locale."}
                    </p>
                  </div>
                  <div className="pt-6 px-2 mt-auto">
                    <div className="flex items-center text-[#1a1a1a] dark:text-white font-bold text-sm group-hover:text-[#239ea0] transition-colors">
                      Lire l'article
                      <div className="ml-2 w-8 h-8 rounded-full bg-[#f4f7f9] dark:bg-[#111111] flex items-center justify-center group-hover:bg-[#239ea0] group-hover:text-white transition-[background-color,color] duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                      </div>
                    </div>
                  </div>
                </AnimatedText>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 px-10 py-4 bg-[#239ea0] text-white font-bold rounded-full hover:bg-[#1c8486] transition-[background-color] shadow-lg">
            Voir tous les articles
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
