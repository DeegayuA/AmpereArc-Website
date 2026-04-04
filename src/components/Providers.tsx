"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { SettingsProvider } from "@/components/providers/SettingsProvider";

import { ModalProvider } from "@/components/providers/ModalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <SettingsProvider>
        <ModalProvider>
          <MotionConfig reducedMotion="user">
            {children}
          </MotionConfig>
        </ModalProvider>
      </SettingsProvider>
    </NextThemesProvider>
  );
}
