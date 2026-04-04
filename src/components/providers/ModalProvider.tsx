"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isRecommendationOpen: boolean;
  setRecommendationOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isRecommendationOpen, setRecommendationOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isRecommendationOpen, setRecommendationOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
