import type { Metadata } from "next";
import { Genos, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { DevBanner } from "@/components/layout/DevBanner";
import Script from "next/script";
import { ClientLayoutShell } from "@/components/layout/ClientLayoutShell";

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
  openGraph: {
    title: "AmpereArc Energy Storage Systems",
    description: "Smarter, Greener Energy Storage for a Sustainable Future",
    url: "https://amperearc.com",
    siteName: "AmpereArc",
    images: [
      {
        url: "/assets/Logos/AmpereArc-Symbol-CLR.png",
        width: 1200,
        height: 630,
        alt: "AmpereArc Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AmpereArc Energy Storage Systems",
    description: "Leading the way in battery storage technology.",
    images: ["/assets/Logos/AmpereArc-Symbol-CLR.png"],
  },
};

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
        <Script id="google-translate-config" strategy="afterInteractive">
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
        
        <Providers>
          <div className="fixed top-0 left-0 right-0 z-40 flex flex-col">
            <DevBanner />
            <Header />
          </div>
          
          <ClientLayoutShell>
            {/* Translate Div Must Exist on Client */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>
            <main className="flex-1 overflow-x-hidden pt-28">{children}</main>
          </ClientLayoutShell>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
