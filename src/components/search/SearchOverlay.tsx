"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Package, BookOpen, Newspaper, Landmark, ArrowRight, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data";
import { kbArticles } from "@/lib/kb-data";
import { blogPosts } from "@/lib/blog-data";
import { caseStudies } from "@/lib/case-studies-data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  // Clear query on close
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const results = useMemo(() => {
    if (query.trim().length < 2) return null;

    const q = query.toLowerCase();

    return {
      products: products
        .filter(p => (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) && p.visible !== false)
        .slice(0, 4),
      kb: kbArticles
        .filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some(t => t.includes(q)))
        .slice(0, 4),
      blog: blogPosts
        .filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
        .slice(0, 4),
      cases: caseStudies
        .filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
        .slice(0, 4)
    };
  }, [query]);

  const hasResults = results && (
    results.products.length > 0 || 
    results.kb.length > 0 || 
    results.blog.length > 0 || 
    results.cases.length > 0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-background/80 backdrop-blur-3xl"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-4 rounded-full bg-secondary/20 hover:bg-primary/20 text-foreground transition-all group z-[110]"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          </button>

          {/* Search Input Container */}
          <div className="w-full max-w-5xl mx-auto pt-32 px-6">
            <div className="relative group">
               <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity" />
               <input 
                 autoFocus
                 type="text"
                 placeholder="Search products, guides, blogs, and cases..."
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 className="w-full bg-transparent border-b-2 border-border/50 focus:border-primary py-8 pl-14 text-3xl md:text-5xl font-black font-heading outline-none transition-all placeholder:text-foreground/10 uppercase tracking-tighter"
               />
            </div>

            {/* Results Engine */}
            <div className="mt-12 overflow-y-auto max-h-[60vh] no-scrollbar pb-20">
              {!query && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Search className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black font-heading uppercase tracking-widest text-foreground/20 italic">Start Typing to search</h3>
                  <p className="text-foreground/20 text-xs font-bold max-w-xs">Scan our entire ecosystem for hardware specs, financial guides, and real-world results.</p>
                </div>
              )}

              {query && !hasResults && (
                <div className="py-20 text-center">
                  <p className="text-2xl font-black font-heading text-foreground/20 italic uppercase tracking-widest">No matching frequencies found</p>
                </div>
              )}

              {results && hasResults && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Category: Products */}
                  {results.products.length > 0 && (
                    <Section title="Products" icon={Package}>
                      {results.products.map(p => (
                        <ResultItem 
                          key={p.id} 
                          href="/products" 
                          title={p.title} 
                          desc={p.desc} 
                          cat={p.subCategory}
                          onClick={onClose}
                        />
                      ))}
                    </Section>
                  )}

                  {/* Category: Knowledge Base */}
                  {results.kb.length > 0 && (
                    <Section title="Knowledge Base" icon={BookOpen}>
                      {results.kb.map(a => (
                        <ResultItem 
                          key={a.id} 
                          href={`/knowledge/${a.slug}`} 
                          title={a.title} 
                          desc={a.excerpt} 
                          cat="Guide"
                          onClick={onClose}
                        />
                      ))}
                    </Section>
                  )}

                  {/* Category: Blog */}
                  {results.blog.length > 0 && (
                    <Section title="Insights" icon={Newspaper}>
                      {results.blog.map(b => (
                        <ResultItem 
                          key={b.id} 
                          href={`/blog/${b.slug}`} 
                          title={b.title} 
                          desc={b.excerpt} 
                          cat="Article"
                          onClick={onClose}
                        />
                      ))}
                    </Section>
                  )}

                  {/* Category: Case Studies */}
                  {results.cases.length > 0 && (
                    <Section title="Case Studies" icon={Landmark}>
                      {results.cases.map(c => (
                        <ResultItem 
                          key={c.id} 
                          href="/case-studies" 
                          title={c.title} 
                          desc={c.desc} 
                          cat={c.location}
                          onClick={onClose}
                        />
                      ))}
                    </Section>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border/50 pb-4">
        <Icon className="w-4 h-4 text-primary" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">{title}</h4>
      </div>
      <div className="grid gap-2">
        {children}
      </div>
    </div>
  );
}

function ResultItem({ href, title, desc, cat, onClick }: { href: string; title: string; desc: string; cat: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="group block">
      <div className="p-5 rounded-2xl bg-secondary/5 border border-border/20 hover:bg-primary/5 hover:border-primary/20 transition-all flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <span className="text-[8px] font-black uppercase tracking-widest text-primary/60 px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">{cat}</span>
             <h5 className="text-lg font-black font-heading leading-tight group-hover:text-primary transition-colors">{title}</h5>
          </div>
          <p className="text-xs text-foreground/40 line-clamp-1">{desc}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-foreground/10 group-hover:text-primary transition-all group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
