"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { kbArticles, KBArticle } from "@/lib/kb-data";
import { Search, Book, Shield, Zap, TrendingUp, ArrowRight, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "Solar Basics", "Hardware", "Financials", "Installation", "Company"];

export default function KnowledgeBasePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = kbArticles.filter(a => {
    const matchesCat = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest"
          >
            <HelpCircle className="w-3 h-3"/> Support Center
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-heading tracking-tighter"
          >
            Knowledge <span className="text-primary italic">Base</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground/60 max-w-2xl mx-auto"
          >
            Everything you need to know about switching to intelligent solar energy. From tech specs to financial ROI.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto relative group"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary/5 border border-border/50 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
            />
          </motion.div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar px-4">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                : "bg-secondary/5 border-border/50 text-foreground/40 hover:border-primary/20 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/knowledge/${article.slug}`} className="group block h-full">
                  <div className="bg-secondary/5 border border-border/40 rounded-3xl p-8 hover:bg-background h-full transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                       <HelpCircle className="w-32 h-32 text-primary rotate-12" />
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                          {article.category}
                        </span>
                        <span className="text-[10px] font-bold text-foreground/30">{article.readTime}</span>
                      </div>
                      
                      <h3 className="text-2xl font-black font-heading leading-tight group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-foreground/50 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="pt-4 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                           {article.tags.slice(0, 2).map(t => (
                             <span key={t} className="text-[9px] font-black uppercase tracking-tighter text-foreground/20 italic">#{t}</span>
                           ))}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all group-hover:translate-x-1">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 px-4">
            <p className="text-xl font-bold text-foreground/20 italic mb-4">No articles found matching your query.</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("All");}} className="text-primary font-black uppercase text-xs hover:underline">
              Reset Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-primary rounded-[3rem] p-10 md:p-20 text-center space-y-8 relative overflow-hidden group shadow-2xl shadow-primary/30 mx-4"
        >
           <HelpCircle className="absolute -top-20 -left-20 w-64 h-64 text-white/10 -rotate-12 transition-transform group-hover:rotate-0 duration-1000" />
           <div className="relative z-10 max-w-2xl mx-auto space-y-6">
             <h2 className="text-4xl md:text-6xl font-black font-heading text-white tracking-tighter">Still have questions?</h2>
             <p className="text-lg text-white/70 font-medium leading-relaxed">
               Our solar experts are available 24/7 to help you design the perfect energy system for your specific needs.
             </p>
             <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/contact" className="bg-white text-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                  Contact Support
                </Link>
                <Link href="/portal" className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                  Access Portal
                </Link>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
