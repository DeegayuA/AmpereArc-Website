export type Locale = "en" | "de" | "si" | "hi" | "es" | "fr" | "it";

export interface TranslationSchema {
  nav: {
    products: string;
    blog: string;
    caseStudies: string;
    portal: string;
    homeowner: string;
    commercial: string;
    installer: string;
    contact: string;
    getInTouch: string;
    solutions: string;
  };
  products: {
    title: string;
    subtitle: string;
    description: string;
    hardware: string;
    price: string;
    limitedPrice: string;
    exploreSpecs: string;
    explore: string;
  };
}

export const locales = [
  { code: "en", label: "English", country: "US" },
  { code: "de", label: "Deutsch", country: "DE" },
  { code: "es", label: "Español", country: "ES" },
  { code: "fr", label: "Français", country: "FR" },
  { code: "it", label: "Italiano", country: "IT" },
  { code: "si", label: "සිංහල", country: "LK" },
  { code: "hi", label: "हिन्दी", country: "IN" },
] as const;

const en: TranslationSchema = {
  nav: {
    products: "Products",
    blog: "Blog",
    caseStudies: "Case Studies",
    portal: "AmpereArc Portal",
    homeowner: "Homeowner",
    commercial: "Commercial",
    installer: "Installer",
    contact: "Contact",
    getInTouch: "Get In Touch",
    solutions: "Solutions",
  },
  products: {
    title: "Intelligent Energy.",
    subtitle: "At Your Fingertips.",
    description: "Precision hardware optimized for world-class efficiency. Select your domain to explore the collection.",
    hardware: "Hardware",
    price: "Price",
    limitedPrice: "Limited Price",
    exploreSpecs: "Explore Specs",
    explore: "Explore",
  },
};

const de: TranslationSchema = {
  nav: {
    products: "Produkte",
    blog: "Magazin",
    caseStudies: "Fallbeispiele",
    portal: "AmpereArc Portal",
    homeowner: "Hausbesitzer",
    commercial: "Gewerbe",
    installer: "Installateur",
    contact: "Kontakt",
    getInTouch: "Anfrage Senden",
    solutions: "Lösungen",
  },
  products: {
    title: "Intelligente Energie.",
    subtitle: "Direkt Erleben.",
    description: "Präzisions-Hardware für weltklasse Effizienz. Wählen Sie einen Bereich, um die Kollektion zu erkunden.",
    hardware: "Hardware",
    price: "Preis",
    limitedPrice: "Aktionspreis",
    exploreSpecs: "Technische Daten",
    explore: "Entdecken",
  },
};

export const translations: Record<Locale, TranslationSchema> = {
  en,
  de,
  // Use English as base for others; Google Translate will handle the UI
  es: en,
  fr: en,
  it: en,
  si: en,
  hi: en,
};
