"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Home, Building2, LayoutGrid, Zap, Battery, Car, Sun, ArrowRight } from "lucide-react";
import { products, categories, subCategories } from "@/lib/data";
import { useSettings } from "@/components/providers/SettingsProvider";
import { convertPrice, formatPrice } from "@/lib/currency";

export function ProductsBentoGrid() {
  const [activeCat, setActiveCat] = useState("Home");
  const [activeSub, setActiveSub] = useState("BESS (Battery Energy Storage)");
  const [visibleCount, setVisibleCount] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useSettings();

  // Reset expansion when navigation changes
  useEffect(() => {
    setVisibleCount(2);
  }, [activeCat, activeSub]);

  // Detect mobile/tablet for progressive disclosure
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.category === activeCat && p.subCategory === activeSub);
  }, [activeCat, activeSub]);

  /**
   * SE LEVEL MASONRY HASHING
   * Generates a repeatable but unique layout pattern for each (Category + SubCategory)
   */
  const gridProducts = useMemo(() => {
    const hash = (str: string) => {
      let h = 0;
      for (let i = 0; i < str.length; i++) {
        h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
      }
      return Math.abs(h);
    };

    const seed = hash(activeCat + activeSub);

    return filteredProducts.map((p, idx) => {
      // Deterministic "random" layout based on seed and index
      const val = (seed + idx) % 10;

      let spans = "";
      if (val === 0) spans = "md:col-span-2 md:row-span-2"; // Large square
      else if (val === 2 || val === 5) spans = "md:col-span-2 md:row-span-1"; // Wide rectangle
      else spans = "md:col-span-1 md:row-span-1"; // Standard

      return { ...p, spans };
    });
  }, [filteredProducts, activeCat, activeSub]);

  const displayedProducts = useMemo(() => {
    if (isMobile) {
      return gridProducts.slice(0, visibleCount);
    }
    return gridProducts;
  }, [gridProducts, isMobile, visibleCount]);

  return (
    <section id="products" className="py-12 px-6 md:px-12 bg-muted/30 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4 text-foreground tracking-tight leading-[1.1]">
              {t.products.title} <br />
              <span className="text-primary italic">{t.products.subtitle}</span>
            </h2>
            <p className="text-lg text-foreground/70 font-sans max-w-lg">
              {t.products.description}
            </p>
          </div>
        </div>

        {/* Dual-Panel Domain Selection (Always Side-by-Side) */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat as any)}
              className={`relative overflow-hidden group h-24 md:h-32 rounded-2xl md:rounded-[2rem] border-2 transition-all duration-700 flex flex-col md:flex-row items-center justify-center md:justify-between p-4 md:p-8 ${activeCat === cat
                  ? "bg-primary text-white border-primary shadow-2xl shadow-primary/20 scale-[1.01]"
                  : "bg-card text-foreground border-border/60 hover:border-primary/40 hover:bg-primary/5"
                }`}
            >
              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-1">
                <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] ${activeCat === cat ? "text-white/70" : "text-primary/70"}`}>
                  {t.products.explore}
                </span>
                <span className="text-xl md:text-3xl font-heading font-black">
                  {cat === "Home" ? t.nav.homeowner : t.nav.commercial}
                </span>
              </div>

              <div className={`hidden md:flex p-4 rounded-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 ${activeCat === cat ? "bg-white/20" : "bg-primary/5 text-primary"}`}>
                {cat === "Home" ? <Home className="w-8 h-8" /> : <Building2 className="w-8 h-8" />}
              </div>

              {/* Mobile Icon (Smaller) */}
              <div className="md:hidden mt-2">
                {cat === "Home" ? <Home className="w-5 h-5 opacity-40" /> : <Building2 className="w-5 h-5 opacity-40" />}
              </div>

              {/* Decorative Glow */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${activeCat === cat ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 blur-[80px] rounded-full" />
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 blur-[80px] rounded-full" />
              </div>
            </button>
          ))}
        </div>

        {/* Sub-Category Chip Navigation */}
        <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide mb-8 border-b border-border/40">
          {subCategories.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSub(sub)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border ${activeSub === sub
                  ? "bg-foreground text-background border-foreground shadow-lg scale-105"
                  : "bg-card text-foreground/60 border-border/80 hover:border-primary/40 hover:text-primary"
                }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* High-Density Grid Architecture */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {gridProducts.length > 0 ? (
              <motion.div
                key={`${activeCat}-${activeSub}`}
                initial={{ opacity: 0, scale: 0.99, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.99, y: -10 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[14rem] md:auto-rows-[18rem] grid-flow-dense"
              >
                {displayedProducts.map((item, idx) => (
                  <BentoCard key={item.id} item={item} index={idx} isMobile={isMobile} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[300px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-border rounded-3xl"
              >
                <div className="text-xl font-bold mb-2">Portfolio Coming Soon</div>
                <p className="text-muted-foreground text-sm">We are standardizing our hardware for this category.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* High-Performance Expansion Button */}
          {isMobile && visibleCount < filteredProducts.length && (
            <div className="mt-12 flex justify-center lg:hidden">
              <button
                onClick={() => setVisibleCount(prev => prev + 2)}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-background border border-border text-foreground text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-xl shadow-black/5"
              >
                View More <ChevronDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}

          {isMobile && visibleCount >= filteredProducts.length && filteredProducts.length > 2 && (
            <div className="mt-12 flex justify-center lg:hidden">
              <button
                onClick={() => setVisibleCount(2)}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-background border border-border text-foreground text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-xl shadow-black/5"
              >
                Show Less <ChevronUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ item, index, isMobile }: { item: typeof products[0] & { spans: string }, index: number, isMobile: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { currency, t } = useSettings();

  const discountedPrice = item.basePrice * (1 - item.discountPercentage / 100);
  const currentBasePrice = convertPrice(item.basePrice, currency);
  const currentDiscountedPrice = convertPrice(discountedPrice, currency);

  // Determine if the card is "large" or "small" for styling adjustments
  const isLarge = item.spans.includes("col-span-2");
  const isSquare = item.spans.includes("row-span-2");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
      whileHover="hover"
      className={`relative rounded-xl md:rounded-[2.5rem] overflow-hidden bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 shadow-lg group transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 ${isMobile ? 'col-span-1 row-span-1' : item.spans}`}
    >
      {/* Background Asset */}
      <div className="absolute inset-0 z-0 bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={item.img}
          alt={item.title}
          fill
          onLoad={() => setIsLoaded(true)}
          className={`object-contain transition-all duration-1000 ease-out group-hover:scale-105 group-hover:-translate-y-4 ${
            isMobile || !isLarge ? 'p-6' : 'p-12'
          } ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] z-[1]" />
      </div>

      {/* Discount Badge */}
      <div className={`absolute z-20 ${isMobile ? 'top-3 left-3' : 'top-6 left-6'}`}>
        <div className="bg-primary text-white px-2 py-0.5 md:px-4 md:py-2 rounded-full text-[8px] md:text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20">
          -{item.discountPercentage}%
        </div>
      </div>

      {/* Content Engine */}
      <div className={`absolute inset-0 flex flex-col justify-end z-10 transition-all duration-500 ${
        isMobile || !isLarge ? 'p-3' : 'p-6'
      } group-hover:p-4`}>
        {/* Info Module */}
        <div className={`relative overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-3xl rounded-2xl md:rounded-[2.5rem] border border-white/30 dark:border-white/10 group-hover:border-primary/50 transition-all duration-700 shadow-2xl ${
          isMobile || !isLarge ? 'p-3 md:p-4' : 'p-6 md:p-8'
        }`}>
          <div className="flex flex-col gap-1 md:gap-2">
            <div className={`flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] ${
              isMobile || !isLarge ? 'text-[6px]' : 'text-[10px]'
            }`}>
              <span>{t.products.hardware}</span>
              <div className="h-[0.5px] w-3 bg-primary/40" />
            </div>
            
            <motion.h3
              className={`font-black font-heading text-foreground leading-[1.1] ${
                isMobile || !isLarge ? 'text-xs md:text-xl' : 'text-xl md:text-4xl'
              }`}
            >
              {item.title}
            </motion.h3>

            {isLarge && !isMobile && (
              <p className="text-foreground/70 text-[10px] md:text-sm line-clamp-1 font-medium mt-1">
                {item.desc}
              </p>
            )}

            <div className="flex items-center justify-between mt-2 md:mt-4">
              <div className="flex flex-col">
                <span className={`font-black uppercase tracking-widest text-foreground/40 leading-none ${
                  isMobile || !isLarge ? 'text-[5px]' : 'text-[8px]'
                }`}>{t.products.price}</span>
                <div className="flex items-baseline gap-2">
                  <span className={`font-black font-heading text-primary leading-none ${
                    isMobile || !isLarge ? 'text-sm md:text-2xl' : 'text-xl md:text-5xl'
                  }`}>
                    {formatPrice(currentDiscountedPrice, currency)}
                  </span>
                  <span className={`font-bold text-foreground/30 line-through decoration-primary/40 decoration-1 transition-all ${
                    isMobile || !isLarge ? 'text-[8px] md:text-base' : 'text-xs md:text-2xl'
                  } opacity-60`}>
                    {formatPrice(currentBasePrice, currency)}
                  </span>
                </div>
              </div>
              
              <button className={`flex items-center justify-center bg-primary text-white transition-all shrink-0 hover:scale-105 active:scale-95 ${
                isMobile || !isLarge ? 'w-8 h-8 md:w-10 md:h-10 rounded-lg' : 'w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl'
              } shadow-lg shadow-primary/30`}>
                <ArrowRight className={isMobile || !isLarge ? 'w-4 h-4' : 'w-6 h-6 md:w-8 md:h-8'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
