"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/components/providers/ModalProvider";

const backgrounds = {
  home: "/assets/Hero_BG/home.png",
  commercial: "/assets/Hero_BG/commercial.png",
  installer: "/assets/Hero_BG/installer.png",
};

export function Hero() {
  const [bg, setBg] = useState<keyof typeof backgrounds>("home");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setRecommendationOpen } = useModal();

  // Auto-advance logic
  useEffect(() => {
    if (isPaused) {
      setProgress(0);
      return;
    }

    const interval = 5000;
    const step = 50; 
    const increment = (step / interval) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          const sequence: Array<keyof typeof backgrounds> = ["home", "commercial", "installer"];
          const currentIndex = sequence.indexOf(bg);
          const nextIndex = (currentIndex + 1) % sequence.length;
          setBg(sequence[nextIndex]);
          return 0;
        }
        return prev + increment;
      });
    }, step);

    return () => clearInterval(timer);
  }, [bg, isPaused]);
  
  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const translateX = useTransform(springX, [-1, 1], [-30, 30]);
  const translateY = useTransform(springY, [-1, 1], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize to [-1, 1]
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[calc(100vh-112px)] min-h-[500px] overflow-hidden flex flex-col justify-end bg-background"
    >
      {/* Background Image with Mask */}
      <div className="absolute inset-0 z-0 bg-muted/20">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bg}
            src={backgrounds[bg]}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ 
              opacity: 1, 
              scale: 1.1, 
              x: translateX.get(),
              y: translateY.get()
            }}
            style={{
              x: translateX,
              y: translateY,
              maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
            }}
            exit={{ opacity: 0 }}
            onLoad={() => setIsLoaded(true)}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full object-cover origin-center"
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
      <div className="relative z-20 pb-24 px-6 md:px-24 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold font-heading text-foreground mb-4 leading-tight"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
          >
            Smarter, Greener Energy Storage
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 mb-6 max-w-xl font-sans"
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
            <button 
              onClick={() => setRecommendationOpen(true)}
              className="group relative inline-flex items-center justify-center p-1 rounded-sm bg-foreground text-background font-bold tracking-wider uppercase text-sm overflow-hidden h-[54px] pr-6 pl-1 decoration-transparent"
            >
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
            </button>

            {/* Secondary Button */}
            <Link href="#products" className="text-foreground hover:text-primary transition-colors font-bold tracking-widest uppercase text-sm flex items-center gap-2 group">
              View Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Triggers */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[80px] bg-background/50 backdrop-blur-md border-t border-border/30 grid grid-cols-3 divide-x divide-border/30">
        <TriggerButton
          title="Homeowner"
          desc="Lower your bills & store solar"
          href="/homeowner"
          onMouseEnter={() => setBg("home")}
          isActive={bg === "home"}
          progress={bg === "home" ? progress : 0}
        />
        <TriggerButton
          title="Commercial"
          desc="Cut costs & scale sustainably"
          href="/commercial"
          onMouseEnter={() => setBg("commercial")}
          isActive={bg === "commercial"}
          progress={bg === "commercial" ? progress : 0}
        />
        <TriggerButton
          title="Installer"
          desc="Join our trusted network"
          href="/installer"
          onMouseEnter={() => setBg("installer")}
          isActive={bg === "installer"}
          progress={bg === "installer" ? progress : 0}
        />
      </div>
    </section>
  );
}

function TriggerButton({ 
  title, desc, href, onMouseEnter, isActive, progress 
}: { 
  title: string, desc: string, href: string, onMouseEnter: () => void, isActive: boolean, progress: number 
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      className={`relative flex flex-col justify-center items-center text-center p-4 transition-all duration-500 group overflow-hidden ${
        isActive ? "bg-primary/10" : "hover:bg-primary/5"
      }`}
    >
      {isActive && (
        <>
          <motion.div
             layoutId="active-indicator"
             className="absolute top-0 left-0 right-0 h-1 bg-primary/20"
          />
          <motion.div
             className="absolute top-0 left-0 h-1 bg-primary"
             style={{ width: `${progress}%` }}
          />
        </>
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
