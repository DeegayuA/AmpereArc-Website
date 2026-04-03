"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { partners } from "@/lib/data";

export function LogoCloud() {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const logosPerPage = 10;
  const visibleLogos = partners.slice(
    currentPage * logosPerPage, 
    (currentPage + 1) * logosPerPage
  );

  return (
    <section className="py-24 px-6 md:px-12 bg-background border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center font-heading font-bold text-2xl mb-12 text-foreground/80">
          Trusted by Installers. Loved by Homeowners.
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center h-[200px] md:h-[120px]">
          <AnimatePresence mode="popLayout">
            {visibleLogos.map((logo, index) => (
              <motion.div
                key={logo.domain}
                layout
                initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: index * 0.05,
                }}
                className="relative h-12 w-full max-w-[120px] grayscale hover:grayscale-0 transition-all duration-300 dark:invert opacity-70 hover:opacity-100"
              >
                <img
                  src={`https://unavatar.io/${logo.domain}?fallback=https://logo.clearbit.com/${logo.domain}`}
                  alt={`${logo.name} Logo`}
                  className="w-full h-full object-contain filter grayscale brightness-100 contrast-125 dark:invert dark:brightness-200 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(logo.name)}&background=random&color=fff`;
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
