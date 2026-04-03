"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const backgrounds = {
  home: "/assets/Hero_BG/Home.jpeg",
  commercial: "/assets/Hero_BG/Commercial.jpg",
  installer: "/assets/Hero_BG/Installer.jpeg",
};

export function Hero() {
  const [bg, setBg] = useState<keyof typeof backgrounds>("home");
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden flex flex-col justify-end bg-background">
      {/* Background Image with Mask */}
      <div className="absolute inset-0 z-0 bg-muted/20">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bg}
            src={backgrounds[bg]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onLoad={() => setIsLoaded(true)}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full object-cover"
            style={{
              maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
            }}
          />
        </AnimatePresence>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/40 dark:bg-background/60" />
      </div>

      {/* Blueprint Scale Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute left-[4%] md:left-[8%] top-0 bottom-0 w-[1px] bg-primary/20 dark:bg-primary/20" />
        <div className="absolute right-[4%] md:right-[8%] top-0 bottom-0 w-[1px] bg-primary/20 dark:bg-primary/20" />
        <div className="absolute top-[18%] left-0 right-0 h-[1px] bg-primary/20 dark:bg-primary/20" />
        <div className="absolute bottom-[22%] left-0 right-0 h-[1px] bg-primary/20 dark:bg-primary/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 pb-40 px-6 md:px-24 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold font-heading text-foreground mb-6 leading-tight"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
          >
            Smarter, Greener Energy Storage
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-xl font-sans"
          >
            At AmpereArc, we manufacture world-leading systems that put power back in your hands. Future-proof your energy supply today.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            {/* Primary Button */}
            <Link href="#how-it-works" className="group relative inline-flex items-center justify-center p-1 rounded-sm bg-foreground text-background font-bold tracking-wider uppercase text-sm overflow-hidden h-[54px] pr-6 pl-1 decoration-transparent">
              {/* Dot Grid Box */}
              <div className="w-[46px] h-[46px] bg-primary rounded-sm relative flex flex-wrap content-between justify-between p-2 mr-4 overflow-hidden">
                <div className="absolute inset-0 flex flex-wrap content-between justify-between p-2 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
                   {/* Normal State Dots */}
                   {Array.from({ length: 25 }).map((_, i) => (
                     <div key={`dot1-${i}`} className="w-1 h-1 bg-yellow-900/40 rounded-full" />
                   ))}
                </div>
                <div className="absolute inset-0 flex flex-wrap content-between justify-between p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90">
                   {/* Hover State Dots */}
                   {Array.from({ length: 25 }).map((_, i) => (
                     <div key={`dot2-${i}`} className="w-1 h-1 bg-white rounded-full" />
                   ))}
                </div>
              </div>
              <span className="z-10 transition-transform duration-300 group-hover:translate-x-2">Find out how it works</span>
            </Link>

            {/* Secondary Button */}
            <Link href="#products" className="text-foreground hover:text-primary transition-colors font-bold tracking-widest uppercase text-sm flex items-center gap-2 group">
              View Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Triggers */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[100px] bg-background/50 backdrop-blur-md border-t border-border/30 grid grid-cols-3 divide-x divide-border/30">
        <TriggerButton
          title="Homeowner"
          desc="Lower your bills & store solar"
          href="/homeowner"
          onMouseEnter={() => setBg("home")}
          isActive={bg === "home"}
        />
        <TriggerButton
          title="Commercial"
          desc="Cut costs & scale sustainably"
          href="/commercial"
          onMouseEnter={() => setBg("commercial")}
          isActive={bg === "commercial"}
        />
        <TriggerButton
          title="Installer"
          desc="Join our trusted network"
          href="/installer"
          onMouseEnter={() => setBg("installer")}
          isActive={bg === "installer"}
        />
      </div>
    </section>
  );
}

function TriggerButton({ title, desc, href, onMouseEnter, isActive }: { title: string, desc: string, href: string, onMouseEnter: () => void, isActive: boolean }) {
  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      className={`relative flex flex-col justify-center items-center text-center p-4 transition-all duration-500 group overflow-hidden ${
        isActive ? "bg-primary/10" : "hover:bg-primary/5"
      }`}
    >
      {isActive && (
        <motion.div
           layoutId="active-indicator"
           className="absolute top-0 left-0 right-0 h-1 bg-primary"
        />
      )}
      <h3 className={`font-heading font-bold text-xl md:text-2xl transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground"}`}>
        {title}
      </h3>
      <p className="text-xs md:text-sm text-foreground/70 hidden md:block">
        {desc}
      </p>
      
      {/* Background glow on hover */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 transition-opacity duration-700 ${isActive ? "opacity-100" : ""}`} />
    </Link>
  );
}
