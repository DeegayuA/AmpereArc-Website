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

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const logosCount = isMobile ? 6 : (isTablet ? 8 : 10);
  const visibleLogos = partners.slice(0, logosCount);

  return (
    <section className="py-10 px-6 md:px-12 bg-background border-t border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center font-heading font-bold text-2xl mb-8 text-foreground/80 tracking-tight">
          Empowering Energy Independence Around the Globe
        </h3>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {visibleLogos.map((logo, index) => (
            <motion.div
              key={logo.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative h-12 w-full max-w-[120px] group cursor-pointer"
            >
              <img
                src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${logo.slug}.svg`}
                alt={`${logo.name} Logo`}
                className="w-full h-full object-contain filter grayscale brightness-0 opacity-30 dark:invert dark:brightness-0 dark:invert-[1] dark:opacity-40 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
