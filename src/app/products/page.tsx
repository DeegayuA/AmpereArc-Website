"use client";

import { motion } from "framer-motion";
import { ProductsBentoGrid } from "@/components/home/ProductsBentoGrid";
import { useSettings } from "@/components/providers/SettingsProvider";
import { ArrowDown } from "lucide-react";

export default function ProductsPage() {
  const { t } = useSettings();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        {/* Background Decorative Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] -z-10 rounded-full" />
        
        <div className="max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.4em] text-primary"
          >
            <span className="w-8 h-[1px] bg-primary/30" />
            <span>Product Catalog 2024</span>
            <span className="w-8 h-[1px] bg-primary/30" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black font-heading leading-tight tracking-tighter"
          >
            Engineering the <br />
            <span className="text-primary italic">Future of Power</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our comprehensive suite of energy storage systems, hybrid inverters, and smart energy management tools for home and industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-10 flex justify-center"
          >
            <div className="p-4 rounded-full border border-border/50 animate-bounce">
              <ArrowDown className="w-5 h-5 text-primary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="pb-32">
        <ProductsBentoGrid />
      </section>
      
      {/* Contact Teaser */}
      <section className="py-24 px-6 md:px-12 bg-secondary/5 border-t border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black font-heading">Need a custom solution?</h2>
            <p className="text-lg text-foreground/60">Our engineers can design a bespoke system tailored to your unique energy profile.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-full shadow-2xl shadow-primary/20"
          >
            Talk to an Expert
          </motion.button>
        </div>
      </section>
    </div>
  );
}
