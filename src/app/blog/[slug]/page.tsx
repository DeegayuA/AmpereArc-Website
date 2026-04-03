"use client";

import { useParams, useRouter } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogPostDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl font-bold font-heading mb-4">Post not found</h1>
        <Link href="/blog" className="text-primary font-black uppercase tracking-widest text-xs">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 text-xs font-bold text-foreground/60 uppercase tracking-[0.3em] font-heading">
                <span className="px-3 py-1 bg-primary text-white rounded-md tracking-widest leading-none">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{post.readTime}</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-bold font-heading text-foreground tracking-tighter leading-[1.1]">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Metadata Sidebar */}
          <aside className="md:w-1/4 hidden md:block">
            <div className="sticky top-32 space-y-8">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors group"
              >
                <span className="p-2 border border-foreground/10 rounded-full group-hover:border-primary/50">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </span>
                Back
              </button>
              
              <div className="pt-8 border-t border-foreground/5">
                <div className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] mb-4">Written by</div>
                <div className="flex items-center gap-3 font-heading font-bold text-foreground">
                  AmpereArc Insights Team
                </div>
              </div>
            </div>
          </aside>

          {/* ArticleBody */}
          <article className="flex-1">
             <div 
               className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
                        prose-p:text-foreground/70 prose-p:leading-relaxed
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-foreground prose-strong:font-black
                        prose-li:text-foreground/70"
               dangerouslySetInnerHTML={{ __html: post.content }} 
             />
             
             {/* Interaction Footer */}
             <div className="mt-16 pt-12 border-t border-foreground/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Share this</div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border border-foreground/10 hover:border-primary/50 transition-colors cursor-pointer" />
                    ))}
                  </div>
                </div>
                
                <Link href="/blog" className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 group">
                  More Articles
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
             </div>
          </article>
        </div>
      </section>
    </div>
  );
}
