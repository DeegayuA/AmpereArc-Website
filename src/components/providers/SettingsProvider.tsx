"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CurrencyCode, countryToCurrency, localeToCurrency } from "@/lib/currency";
import { Locale, translations, TranslationSchema, locales } from "@/lib/i18n";

interface SettingsContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TranslationSchema;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage/Auto-Detect on mount
  useEffect(() => {
    setMounted(true);
    const savedCurrency = localStorage.getItem("preferred-currency") as CurrencyCode;
    const savedLocale = localStorage.getItem("preferred-locale") as Locale;

    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
    
    // Check if there's a google translate cookie already
    const googTrans = document.cookie.split("; ").find(row => row.startsWith("googtrans="));
    if (googTrans) {
      const lang = googTrans.split("/").pop() as Locale;
      if (lang && locales.some(l => l.code === lang)) {
        setLocale(lang);
      }
    } else if (savedLocale) {
      setLocale(savedLocale);
    }

    // Only auto-detect if no manual override exists
    if (!savedCurrency || (!savedLocale && !googTrans)) {
      autoDetectSettings(savedCurrency, savedLocale);
    }
  }, []);

  const autoDetectSettings = async (existingCurrency?: string, existingLocale?: string) => {
    try {
      // Avoid execution during SSR (though useEffect should cover this)
      if (typeof window === "undefined") return;

      // 1. Initial guess from Browser Navigator
      const browserLocale = navigator.language;
      const browserLanguage = browserLocale.split("-")[0] as Locale;
      
      if (!existingLocale && locales.some(l => l.code === browserLanguage)) {
        setLocale(browserLanguage);
      }

      if (!existingCurrency && localeToCurrency[browserLocale]) {
        setCurrency(localeToCurrency[browserLocale]);
      }

      // 2. IP Geolocation Fallback for more precise currency
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();

      if (data.country_code) {
        if (!existingCurrency) {
          const detectedCurrency = countryToCurrency[data.country_code];
          if (detectedCurrency) setCurrency(detectedCurrency);
        }
        
        if (!existingLocale && !locales.some(l => l.code === browserLanguage)) {
          if (data.country_code === "DE") setLocale("de");
          else if (data.country_code === "LK") setLocale("si");
          else if (data.country_code === "IN") setLocale("hi");
          else setLocale("en");
        }
      }
    } catch (error) {
      console.warn("Auto-detection failed:", error);
    }
  };

  const handleSetCurrency = (code: CurrencyCode) => {
    setCurrency(code);
    localStorage.setItem("preferred-currency", code);
  };

  const handleSetLocale = (l: Locale) => {
    setLocale(l);
    localStorage.setItem("preferred-locale", l);
    
    // Google Translate Cookie logic
    // Format: /source/target (e.g. /en/de)
    const cookieValue = `/en/${l}`;
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${window.location.hostname};`;
    
    // Reload to apply translation
    window.location.reload();
  };

  // Provide a stable translation object even before mount to prevent hydration mismatch
  const t = translations[locale];

  return (
    <SettingsContext.Provider 
      value={{ 
        currency, 
        setCurrency: handleSetCurrency, 
        locale, 
        setLocale: handleSetLocale,
        t 
      }}
    >
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
