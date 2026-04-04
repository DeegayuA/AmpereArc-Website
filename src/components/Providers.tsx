"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { SettingsProvider } from "@/components/providers/SettingsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      <SettingsProvider>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </SettingsProvider>
    </NextThemesProvider>
  );
}
