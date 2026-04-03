"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Placeholder logos for demo
const allLogos = Array.from({ length: 20 }).map((_, i) => ({
  id: `logo-${i}`,
  src: `https://logo.clearbit.com/${[
    "tesla.com", "google.com", "microsoft.com", "apple.com", "amazon.com",
    "meta.com", "netflix.com", "spotify.com", "samsung.com", "panasonic.com",
    "lg.com", "sony.com", "intel.com", "amd.com", "nvidia.com",
    "siemens.com", "ge.com", "schneider-electric.com", "abb.com", "sunrun.com",
  ][i]}`
}));

export function LogoCloud() {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const visibleLogos = currentPage === 0 ? allLogos.slice(0, 10) : allLogos.slice(10, 20);

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
                key={logo.id}
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
                  src={logo.src}
                  alt="Partner Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
