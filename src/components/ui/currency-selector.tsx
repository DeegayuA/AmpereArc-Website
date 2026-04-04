"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { currencies, CurrencyCode } from "@/lib/currency";
import { useSettings } from "@/components/providers/SettingsProvider";

export function CurrencySelector() {
  const { currency, setCurrency } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCurrency = currencies.find(c => c.code === currency);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-wider"
      >
        <Globe className="w-3.5 h-3.5" />
        {currentCurrency?.code} ({currentCurrency?.symbol})
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="p-2 grid gap-1">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code as CurrencyCode);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    currency === c.code
                      ? "bg-primary text-white"
                      : "hover:bg-primary/10 text-foreground/70 hover:text-primary"
                  }`}
                >
                  <div className="flex flex-col items-start leading-none">
                    <span className="font-bold">{c.code}</span>
                    <span className="text-[10px] opacity-60 mt-0.5">{c.label}</span>
                  </div>
                  <span className="font-mono font-bold opacity-80">{c.symbol}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
