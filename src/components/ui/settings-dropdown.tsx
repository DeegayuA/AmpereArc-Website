"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check, Settings2, Languages, Coins } from "lucide-react";
import { locales, Locale } from "@/lib/i18n";
import { currencies, CurrencyCode } from "@/lib/currency";
import { useSettings } from "@/components/providers/SettingsProvider";

export function SettingsDropdown() {
  const { locale, setLocale, currency, setCurrency } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"lang" | "curr">("lang");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find(l => l.code === locale);
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
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border ${
          isOpen 
            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
            : "bg-secondary/10 dark:bg-white/5 border-transparent hover:border-primary/30"
        }`}
      >
        <Globe className={`w-4 h-4 ${isOpen ? "animate-pulse" : ""}`} />
        <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
          {currentLocale?.code} / {currentCurrency?.code}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute right-0 mt-3 w-72 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex p-2 bg-secondary/10 dark:bg-white/5 border-b border-border/50">
              <button
                onClick={() => setActiveTab("lang")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                  activeTab === "lang" ? "bg-background text-primary shadow-sm" : "hover:text-primary opacity-60"
                }`}
              >
                <Languages className="w-3 h-3" /> Language
              </button>
              <button
                onClick={() => setActiveTab("curr")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                  activeTab === "curr" ? "bg-background text-primary shadow-sm" : "hover:text-primary opacity-60"
                }`}
              >
                <Coins className="w-3 h-3" /> Currency
              </button>
            </div>

            <div className="p-3 max-h-[350px] overflow-y-auto scrollbar-hide">
              {activeTab === "lang" ? (
                <div className="grid gap-1">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLocale(l.code as Locale)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm transition-all duration-300 ${
                        locale === l.code
                          ? "bg-primary text-white font-bold"
                          : "hover:bg-primary/10 text-foreground/70 hover:text-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-[10px] opacity-60 font-black uppercase">{l.code}</span>
                        <span>{l.label}</span>
                      </div>
                      {locale === l.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid gap-1">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code as CurrencyCode)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm transition-all duration-300 ${
                        currency === c.code
                          ? "bg-primary text-white font-bold"
                          : "hover:bg-primary/10 text-foreground/70 hover:text-primary"
                      }`}
                    >
                      <div className="flex flex-col items-start leading-none gap-1">
                        <span className="font-bold">{c.code} <span className="opacity-60 font-medium">({c.symbol})</span></span>
                        <span className="text-[10px] opacity-60">{c.label}</span>
                      </div>
                      {currency === c.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-primary/5 border-t border-border/50">
              <p className="text-[9px] text-foreground/40 font-medium text-center leading-relaxed">
                Settings are automatically saved and applied site-wide. Some translations powered by Google.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
