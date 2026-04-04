"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial splash duration
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Main Logo Container */}
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Brand Text Protected */}
              <span className="notranslate font-heading font-black text-6xl md:text-8xl tracking-tighter text-foreground select-none">
                AmpereArc
              </span>
              
              {/* Scanning Light Effect */}
              <motion.div 
                initial={{ left: "-10%" }}
                animate={{ left: "110%" }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 0.5 
                }}
                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12 pointer-events-none"
              />
            </motion.div>

            {/* Premium Progress Indicator */}
            <div className="w-64 h-[2px] bg-foreground/5 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(245,138,61,0.5)]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40"
            >
              <span>Energizing Grid</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </motion.div>
          </div>

          {/* Decorative Corner Lines */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
