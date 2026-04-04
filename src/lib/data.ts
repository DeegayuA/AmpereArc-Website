export const categories = ["Home", "Commercial"];

export const subCategories = [
  "BESS (Battery Energy Storage)",
  "Inverters",
  "EV Chargers",
  "Smart Meters",
  "Solar Panels",
  "Industrial Solutions"
];

export interface Product {
  id: string;
  title: string;
  desc: string;
  category: "Home" | "Commercial";
  subCategory: string;
  basePrice: number;
  discountPercentage: number;
  img: string;
  className?: string;
}

export const products: Product[] = [
  { 
    id: "h-inv-10kw", 
    title: "AmpereArc 10kW Hybrid Inverter", 
    desc: "A powerful, high-efficiency hybrid inverter featuring dual MPPT trackers and integrated energy management. Designed for seamless transition to backup power during grid outages.", 
    category: "Home", 
    subCategory: "Inverters", 
    basePrice: 3200,
    discountPercentage: 15,
    img: "/assets/Products/10kW_Hybrid_Inveter.png", 
    className: "md:col-span-2 md:row-span-2" 
  },
  { 
    id: "h-bess-16.8kw", 
    title: "AmpereArc 16.8kWh High-Capacity Battery", 
    desc: "Our flagship energy storage solution. This high-density lithium-ion battery provides reliable, long-lasting power for large residential estates and small commercial applications.", 
    category: "Home", 
    subCategory: "BESS (Battery Energy Storage)", 
    basePrice: 6500,
    discountPercentage: 18,
    img: "/assets/Products/16.8kW_Battery.png", 
    className: "md:col-span-2 md:row-span-1" 
  },
  { 
    id: "h-bess-16.8kw-slim", 
    title: "AmpereArc 16.8kWh Slimline Battery", 
    desc: "Advanced energy storage in a space-saving, aesthetically pleasing design. Perfectly suited for modern homes where space is at a premium without compromising on capacity.", 
    category: "Home", 
    subCategory: "BESS (Battery Energy Storage)", 
    basePrice: 6800,
    discountPercentage: 12,
    img: "/assets/Products/16.8kW_Battery_2.png", 
    className: "md:col-span-1 md:row-span-1" 
  },
  { 
    id: "h-bess-4.8kw", 
    title: "AmpereArc 4.8kWh Residential Battery", 
    desc: "The ideal entry-level energy storage system. Compact, scalable, and highly efficient, it's designed to optimize solar self-consumption for typical family homes.", 
    category: "Home", 
    subCategory: "BESS (Battery Energy Storage)", 
    basePrice: 2400,
    discountPercentage: 20,
    img: "/assets/Products/4.8kW_Battery.png", 
    className: "md:col-span-1 md:row-span-1" 
  },
  { 
    id: "h-inv-5kw", 
    title: "AmpereArc 5kW Hybrid Inverter", 
    desc: "An intelligent single-phase hybrid inverter that maximizes solar harvest. It features built-in smart monitoring and rapid shutdown capabilities for enhanced safety.", 
    category: "Home", 
    subCategory: "Inverters", 
    basePrice: 1800,
    discountPercentage: 10,
    img: "/assets/Products/5kW_Hybrid_Inveter.png", 
    className: "md:col-span-2 md:row-span-1" 
  }
];

export const partners = [
  { name: "Apple", slug: "apple" },
  { name: "Tesla", slug: "tesla" },
  { name: "Google", slug: "google" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Amazon", slug: "amazon" },
  { name: "NVIDIA", slug: "nvidia" },
  { name: "Meta", slug: "meta" },
  { name: "Samsung", slug: "samsung" },
  { name: "Toyota", slug: "toyota" },
  { name: "Mercedes-Benz", slug: "mercedes-benz" },
  { name: "Porsche", slug: "porsche" },
  { name: "BMW", slug: "bmw" },
  { name: "Sony", slug: "sony" },
  { name: "Nike", slug: "nike" },
  { name: "Adidas", slug: "adidas" },
  { name: "Coca-Cola", slug: "cocacola" },
  { name: "Pepsi", slug: "pepsi" },
  { name: "Starbucks", slug: "starbucks" },
  { name: "Visa", slug: "visa" },
  { name: "Mastercard", slug: "mastercard" }
];
