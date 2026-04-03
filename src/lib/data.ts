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
  prevBill: string;
  nowBill: string;
  savings: string;
  img: string;
  className?: string;
}

export const products: Product[] = [
  // HOME PRODUCTS - BESS
  {
    id: "h-bess-1",
    title: "EcoStack Home 10kWh",
    desc: "Premium lithium-ion storage with integrated BMS for complete home backup.",
    category: "Home",
    subCategory: "BESS (Battery Energy Storage)",
    prevBill: "$280",
    nowBill: "$45",
    savings: "84%",
    img: "https://images.unsplash.com/photo-1620714223084-8dfacc6dfd8d?q=80&w=800&auto=format&fit=crop",
    className: "col-span-1 md:col-span-2"
  },
  {
    id: "h-bess-2",
    title: "ArcWall Slim 5kWh",
    desc: "Space-saving wall-mounted battery for smaller residential systems.",
    category: "Home",
    subCategory: "BESS (Battery Energy Storage)",
    prevBill: "$150",
    nowBill: "$30",
    savings: "80%",
    img: "https://images.unsplash.com/photo-1548332191-0c54a3956272?q=80&w=600&auto=format&fit=crop"
  },
  
  // HOME PRODUCTS - Inverters
  {
    id: "h-inv-1",
    title: "Hybrid Core 5kW",
    desc: "Intelligent string inverter with dual MPPT for maximum solar harvest.",
    category: "Home",
    subCategory: "Inverters",
    prevBill: "$320",
    nowBill: "$65",
    savings: "79%",
    img: "https://images.unsplash.com/photo-1508514177221-18d14037b7b2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "h-inv-2",
    title: "MicroGen 800W",
    desc: "Plug-and-play microinverter for balcony solar and small arrays.",
    category: "Home",
    subCategory: "Inverters",
    prevBill: "$60",
    nowBill: "$10",
    savings: "83%",
    img: "https://images.unsplash.com/photo-1558449028-s548c6073bbd?q=80&w=600&auto=format&fit=crop"
  },

  // HOME PRODUCTS - EV Chargers
  {
    id: "h-ev-1",
    title: "ArcCharge Smart 7kW",
    desc: "WiFi-enabled EV charger with solar-only charging modes.",
    category: "Home",
    subCategory: "EV Chargers",
    prevBill: "$120",
    nowBill: "$15",
    savings: "87%",
    img: "https://images.unsplash.com/photo-1617788130097-14a95585149a?q=80&w=600&auto=format&fit=crop",
    className: "col-span-1 md:col-span-1"
  },

  // COMMERCIAL PRODUCTS - BESS
  {
    id: "c-bess-1",
    title: "MegaStack Container 1MWh",
    desc: "Utility-scale energy storage for grid stabilization and industrial peak shaving.",
    category: "Commercial",
    subCategory: "BESS (Battery Energy Storage)",
    prevBill: "$12,000",
    nowBill: "$3,800",
    savings: "68%",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    className: "col-span-1 md:col-span-3"
  },
  {
    id: "c-bess-2",
    title: "RackHub 100kWh",
    desc: "Modular rack-based storage for server rooms and hospitals.",
    category: "Commercial",
    subCategory: "BESS (Battery Energy Storage)",
    prevBill: "$1,500",
    nowBill: "$450",
    savings: "70%",
    img: "https://images.unsplash.com/photo-1558449028-22c972338b09?q=80&w=800&auto=format&fit=crop"
  },

  // COMMERCIAL PRODUCTS - Industrial
  {
    id: "c-ind-1",
    title: "HV String Inverter 250kW",
    desc: "High-voltage inverter for utility-scale solar farms.",
    category: "Commercial",
    subCategory: "Industrial Solutions",
    prevBill: "$5,000",
    nowBill: "$1,200",
    savings: "76%",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    className: "col-span-1 md:col-span-2"
  },

  // COMMERCIAL PRODUCTS - Smart Meters
  {
    id: "c-meter-1",
    title: "ArcSense Industrial Meter",
    desc: "Next-gen power quality analyzer with 5G connectivity.",
    category: "Commercial",
    subCategory: "Smart Meters",
    prevBill: "Varies",
    nowBill: "Optimized",
    savings: "25%",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop"
  }
];

export const partners = [
  { name: "Tesla", domain: "tesla.com" },
  { name: "ABB", domain: "abb.com" },
  { name: "Schneider", domain: "schneider-electric.com" },
  { name: "Siemens", domain: "siemens.com" },
  { name: "Enphase", domain: "enphase.com" },
  { name: "SolarEdge", domain: "solaredge.com" },
  { name: "Sungrow", domain: "sungrowpower.com" },
  { name: "GE Renewable Energy", domain: "ge.com" },
  { name: "Vestas", domain: "vestas.com" },
  { name: "Orsted", domain: "orsted.com" },
  { name: "Fronius", domain: "fronius.com" },
  { name: "SMA", domain: "sma.de" },
  { name: "Panasonic", domain: "panasonic.com" },
  { name: "LG Energy Solution", domain: "lgensol.com" },
  { name: "CATL", domain: "catl.com" },
  { name: "Sila Nanotechnologies", domain: "silanano.com" },
  { name: "BYD", domain: "byd.com" },
  { name: "NextEra Energy", domain: "nexteraenergy.com" },
  { name: "Iberdrola", domain: "iberdrola.com" },
  { name: "EDF Renewables", domain: "edf-re.com" }
];
