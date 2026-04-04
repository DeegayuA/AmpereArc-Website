"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CurrencyCode } from "@/lib/currency";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("preferred-currency") as CurrencyCode;
    if (saved) {
      setCurrency(saved);
    } else {
      // Optional: Auto-detect region here
    }
  }, []);

  const handleSetCurrency = (code: CurrencyCode) => {
    setCurrency(code);
    localStorage.setItem("preferred-currency", code);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
