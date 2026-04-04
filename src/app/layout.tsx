import type { Metadata } from "next";
import { Genos, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { DevBanner } from "@/components/layout/DevBanner";
import Script from "next/script";

const genos = Genos({
  variable: "--font-genos",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#3a3247",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AmpereArc Energy Storage Systems",
  description: "Smarter, Greener Energy Storage for a Sustainable Future - Leading the way in battery storage technology.",
};

import { RecommendationModal } from "@/components/home/RecommendationModal";
import { useModal } from "@/components/providers/ModalProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openSans.variable} ${genos.variable} h-full antialiased`}
    >
      <body>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,de,si,hi,es,fr,it,ja',
                autoDisplay: false,
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script 
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
        />
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <LoadingScreen />
        <Providers>
          <div className="fixed top-0 left-0 right-0 z-40 flex flex-col">
            <DevBanner />
            <Header />
          </div>
          <main className="flex-1 overflow-x-hidden pt-28">{children}</main>
          <Footer />
          <ModalContainer />
        </Providers>
      </body>
    </html>
  );
}

function ModalContainer() {
  const { isRecommendationOpen, setRecommendationOpen } = useModal();
  return (
    <RecommendationModal 
      isOpen={isRecommendationOpen} 
      onClose={() => setRecommendationOpen(false)} 
    />
  );
}
