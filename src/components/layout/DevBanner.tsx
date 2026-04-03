"use client";

import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DevBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const dismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-primary/10 border-b border-primary/20 sticky top-0 z-[60] backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-3 text-xs md:text-sm font-medium text-primary">
            <AlertCircle className="w-4 h-4" />
            <span>Website still in development - for internal use only</span>
            <button 
              onClick={dismiss}
              className="ml-4 p-1 hover:bg-primary/20 rounded-full transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
