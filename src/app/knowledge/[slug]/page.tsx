"use client";

import { useParams, useRouter } from "next/navigation";
import { kbArticles } from "@/lib/kb-data";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Printer, ChevronRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function ArticlePage() {
  const { slug } = useParams();
  const router = useRouter();
  const article = kbArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black font-heading mb-4">Article Not Found</h1>
        <p className="text-foreground/60 mb-8">We couldn't find the article you're looking for.</p>
        <Link href="/knowledge" className="text-primary font-black uppercase text-xs hover:underline">
          Back to Knowledge Base
        </Link>
      </div>
    );
  }

  const related = kbArticles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation / Meta */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Guides
          </button>
          
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" /> {article.lastUpdated}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" /> {article.readTime}
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-6 mb-16">
          <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight tracking-tighter">
            {article.title}
          </h1>
          <p className="text-xl text-foreground/60 leading-relaxed italic border-l-4 border-primary/20 pl-6">
            {article.excerpt}
          </p>
        </div>

        {/* Article Content */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-emerald max-w-none 
            prose-headings:font-heading prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-p:text-lg prose-p:leading-relaxed prose-p:text-foreground/80
            prose-li:text-lg prose-li:text-foreground/80
            prose-strong:text-primary prose-strong:font-black
            bg-secondary/5 border border-border/20 rounded-[2.5rem] p-8 md:p-12 shadow-inner"
        >
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </motion.article>

        {/* Tags & Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-border/40">
          <div className="flex flex-wrap gap-2">
            {article.tags.map(t => (
              <span key={t} className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 rounded-full text-[10px] font-bold text-foreground/60 border border-border/40">
                <Tag className="w-3 h-3" /> {t}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
             <button className="p-3 bg-secondary/10 hover:bg-primary/10 rounded-xl transition-all group" title="Share Article">
               <Share2 className="w-4 h-4 text-foreground/40 group-hover:text-primary" />
             </button>
             <button onClick={() => window.print()} className="p-3 bg-secondary/10 hover:bg-primary/10 rounded-xl transition-all group" title="Print Article">
               <Printer className="w-4 h-4 text-foreground/40 group-hover:text-primary" />
             </button>
          </div>
        </div>

        {/* Related Section */}
        {related.length > 0 && (
          <div className="mt-24 space-y-8">
            <h3 className="text-xl font-black uppercase tracking-widest text-foreground/40">Continue Learning</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map(rel => (
                <Link key={rel.id} href={`/knowledge/${rel.slug}`} className="group">
                  <div className="bg-secondary/5 border border-border/40 rounded-3xl p-6 hover:bg-background h-full transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/60 mb-2 block">{rel.category}</span>
                    <h4 className="text-lg font-black font-heading leading-tight group-hover:text-primary transition-colors mb-2">{rel.title}</h4>
                    <p className="text-xs text-foreground/40 line-clamp-2">{rel.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-primary opacity-0 group-hover:opacity-100 transition-all">
                       Read Guide <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
