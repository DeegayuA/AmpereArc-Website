export const currencies = [
  { code: "USD", symbol: "$", rate: 1.0, label: "US Dollar" },
  { code: "GBP", symbol: "£", rate: 0.81, label: "British Pound" },
  { code: "EUR", symbol: "€", rate: 0.95, label: "Euro" },
  { code: "LKR", symbol: "Rs", rate: 320.0, label: "Sri Lankan Rupee" },
  { code: "INR", symbol: "₹", rate: 84.0, label: "Indian Rupee" },
  { code: "AUD", symbol: "A$", rate: 1.55, label: "Australian Dollar" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

export const countryToCurrency: Record<string, CurrencyCode> = {
  US: "USD",
  GB: "GBP",
  LK: "LKR",
  IN: "INR",
  AU: "AUD",
  // Eurozone
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", BE: "EUR", NL: "EUR",
  AT: "EUR", IE: "EUR", FI: "EUR", PT: "EUR", GR: "EUR"
};

export const localeToCurrency: Record<string, CurrencyCode> = {
  "en-US": "USD",
  "en-GB": "GBP",
  "en-LK": "LKR",
  "en-IN": "INR",
  "en-AU": "AUD",
  "de-DE": "EUR",
};

export function convertPrice(basePrice: number, code: CurrencyCode): number {
  const currency = currencies.find((c) => c.code === code);
  if (!currency) return basePrice;
  return basePrice * currency.rate;
}

export function formatPrice(price: number, code: CurrencyCode): string {
  const currency = currencies.find((c) => c.code === code);
  if (!currency) return `$${price.toFixed(2)}`;
  
  // Use Intl.NumberFormat for better localization
  const localeMap: Record<CurrencyCode, string> = {
    USD: "en-US",
    GBP: "en-GB",
    EUR: "de-DE",
    LKR: "en-LK",
    INR: "en-IN",
    AUD: "en-AU",
  };

  return new Intl.NumberFormat(localeMap[code] || "en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(price);
}
