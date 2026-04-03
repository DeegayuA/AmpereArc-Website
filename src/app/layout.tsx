import type { Metadata } from "next";
import { Genos, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { DevBanner } from "@/components/layout/DevBanner";

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
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        <Providers>
          <Header />
          <DevBanner />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
