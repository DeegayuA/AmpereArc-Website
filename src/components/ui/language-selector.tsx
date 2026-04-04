"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, ChevronDown, Check } from "lucide-react";
import { locales, Locale } from "@/lib/i18n";
import { useSettings } from "@/components/providers/SettingsProvider";

export function LanguageSelector() {
  const { locale, setLocale } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find(l => l.code === locale);

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
        <Languages className="w-3.5 h-3.5" />
        {currentLocale?.label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-40 bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="p-2 grid gap-1">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLocale(l.code as Locale);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    locale === l.code
                      ? "bg-primary/10 text-primary font-bold"
                      : "hover:bg-primary/5 text-foreground/70 hover:text-primary"
                  }`}
                >
                  <span>{l.label}</span>
                  {locale === l.code && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
