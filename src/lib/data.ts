export const siteConfig = {
  hideAllPrices: true
};

export const categories = ["Home", "Commercial"];

export const subCategories = [
  "BESS (Battery Energy Storage)",
  "Inverters",
  "EV Chargers",
  "Smart Meters",
  "Solar Panels",
  "Industrial Solutions",
  "Panel Boards"
];

export interface Product {
  id: string;
  title: string;
  desc: string;
  category: "Home" | "Commercial";
  subCategory: string;
  basePrice: number; // USD
  discountPercentage: number;
  img: string;
  className?: string;
  tags: string[];
  /** If false, used in installations but NOT shown on the public products page */
  visible?: boolean;
  /** Brand/manufacturer name for third-party products */
  brand?: string;
  metadata: {
    kw?: number;              // Inverter rated power (kW)
    kwh?: number;             // Battery capacity (kWh)
    wp?: number;              // Solar panel watt-peak
    chargingKw?: number;      // EV charger output (kW)
    phases?: number;          // Required supply phases (1 or 3)
    minHomePhasesRequired?: number; // Min home phases needed (3 = 3-phase home only)
    offGridCapable?: boolean; // Can operate in island/off-grid mode
    dod?: number;             // Depth of discharge (0.8 = 80%)
  };
}

export const products: Product[] = [

  // ── INVERTERS ──────────────────────────────────────────────────────────────
  {
    id: "h-inv-5kw-1ph",
    title: "AmpereArc 5kW Hybrid Inverter (1 Phase)",
    desc: "Intelligent single-phase hybrid inverter with built-in MPPT, smart monitoring and rapid shutdown safety. Ideal for compact residential solar systems.",
    category: "Home",
    subCategory: "Inverters",
    basePrice: 860,
    discountPercentage: 10,
    img: "/assets/Products/5kW_Hybrid_Inveter_1Phase.png",
    className: "md:col-span-2 md:row-span-1",
    tags: ["efficiency", "safety", "compact", "single-phase"],
    metadata: { kw: 5, phases: 1 }
  },
  {
    id: "h-inv-10kw-3ph",
    title: "AmpereArc 10kW Hybrid Inverter (3 Phase)",
    desc: "High-efficiency three-phase hybrid inverter with dual MPPT, integrated battery management and seamless backup switching. Perfect for large homes on three-phase supply.",
    category: "Home",
    subCategory: "Inverters",
    basePrice: 1150,
    discountPercentage: 15,
    img: "/assets/Products/10kW_Hybrid_Inveter_3Phase.png",
    className: "md:col-span-2 md:row-span-2",
    tags: ["high-power", "backup", "efficiency", "three-phase"],
    metadata: { kw: 10, phases: 3 }
  },
  {
    id: "c-inv-15kw-3ph",
    title: "AmpereArc 15kW Commercial Inverter (3 Phase)",
    desc: "Mid-range three-phase hybrid inverter for SME businesses and medium commercial installations. Easy scalability with modular design and remote monitoring.",
    category: "Commercial",
    subCategory: "Inverters",
    basePrice: 1360,
    discountPercentage: 10,
    img: "/assets/Products/5kW_Hybrid_Inveter_1Phase.png",
    className: "md:col-span-1 md:row-span-1",
    tags: ["three-phase", "commercial", "efficiency"],
    metadata: { kw: 15, phases: 3 }
  },
  {
    id: "c-inv-30kw-3ph",
    title: "AmpereArc 30kW Commercial Inverter (3 Phase)",
    desc: "Industrial-grade three-phase hybrid inverter for large commercial rooftop and ground-mount solar arrays. Built for extreme reliability and maximum yield.",
    category: "Commercial",
    subCategory: "Inverters",
    basePrice: 1800,
    discountPercentage: 12,
    img: "/assets/Products/10kW_Hybrid_Inveter_3Phase.png",
    className: "md:col-span-2 md:row-span-2",
    tags: ["high-power", "three-phase", "commercial", "efficiency"],
    metadata: { kw: 30, phases: 3 }
  },

  // ── BATTERIES ──────────────────────────────────────────────────────────────
  {
    id: "h-bess-4.8kwh",
    title: "AmpereArc 4.8kWh Residential Battery",
    desc: "Entry-level energy storage — compact, scalable, and efficient for typical family homes. Pairs perfectly with the 5kW inverter for starter solar installations.",
    category: "Home",
    subCategory: "BESS (Battery Energy Storage)",
    basePrice: 1700,
    discountPercentage: 20,
    img: "/assets/Products/4.8kW_Battery.png",
    className: "md:col-span-1 md:row-span-1",
    tags: ["compact", "entry-level", "savings"],
    metadata: { kwh: 4.8, dod: 0.8 }
  },
  {
    id: "h-bess-16.8kwh",
    title: "AmpereArc 16.8kWh High-Capacity Battery",
    desc: "Our flagship residential storage solution. High-density lithium-ion providing reliable all-night power for large homes and small commercial applications.",
    category: "Home",
    subCategory: "BESS (Battery Energy Storage)",
    basePrice: 4800,
    discountPercentage: 18,
    img: "/assets/Products/16.8kW_Battery.png",
    className: "md:col-span-2 md:row-span-1",
    tags: ["large-capacity", "autonomy", "backup"],
    metadata: { kwh: 16.8, dod: 0.8 }
  },
  {
    id: "h-bess-16.8kwh-slim",
    title: "AmpereArc 16.8kWh Slimline Battery",
    desc: "Advanced energy storage in a sleek space-saving design. Full 16.8kWh capacity in a slim wall-mount form factor — premium aesthetics without compromise.",
    category: "Home",
    subCategory: "BESS (Battery Energy Storage)",
    basePrice: 5000,
    discountPercentage: 12,
    img: "/assets/Products/16.8kW_Battery_2.png",
    className: "md:col-span-1 md:row-span-1",
    tags: ["slim", "modern", "large-capacity"],
    metadata: { kwh: 16.8, dod: 0.8 }
  },
  {
    id: "c-bess-50kwh",
    title: "AmpereArc 50kWh Industrial Battery Stack",
    desc: "Container-grade industrial BESS for enterprises, factories and data centres. Modular and scalable from 50kWh to multi-MWh with active liquid cooling.",
    category: "Commercial",
    subCategory: "BESS (Battery Energy Storage)",
    basePrice: 8500,
    discountPercentage: 15,
    img: "/assets/Products/16.8kW_Battery.png",
    className: "md:col-span-2 md:row-span-2",
    tags: ["industrial", "large-capacity", "backup", "scalable"],
    metadata: { kwh: 50, dod: 0.9 }
  },

  // ── SOLAR PANELS ───────────────────────────────────────────────────────────
  {
    id: "panel-500w",
    title: "AmpereArc 500W AI Solar Panel",
    desc: "Next-generation 500Wp AI-optimised monocrystalline panel. Embedded micro-optimisers maximise yield in partial shade. 30-year linear performance warranty.",
    category: "Home",
    subCategory: "Solar Panels",
    basePrice: 110,
    discountPercentage: 10,
    img: "/assets/Products/AI-500w_Solar_Panel.png",
    className: "md:col-span-1 md:row-span-1",
    tags: ["residential", "ai-optimised", "efficiency", "monocrystalline"],
    visible: false,
    metadata: { wp: 500 }
  },
  {
    id: "panel-720w",
    title: "AmpereArc 720W AI Solar Panel",
    desc: "Industry-leading 720Wp bifacial panel with AI-assisted MPPT per string. Rear-side generation adds up to 25% extra yield. Designed for large commercial arrays.",
    category: "Commercial",
    subCategory: "Solar Panels",
    basePrice: 140,
    discountPercentage: 8,
    img: "/assets/Products/AI-720W_Solar_Panel.png",
    className: "md:col-span-2 md:row-span-1",
    tags: ["commercial", "high-power", "bifacial", "ai-optimised"],
    visible: false,
    metadata: { wp: 720 }
  },

  // ── EV CHARGERS ────────────────────────────────────────────────────────────
  {
    id: "ev-7kw",
    title: "AmpereArc 7kW Smart EV Charger",
    desc: "Solar-boost EV charger. Intelligently triggers charging when solar generation is at its peak. Compatible with both single and three-phase homes.",
    category: "Home",
    subCategory: "EV Chargers",
    basePrice: 480,
    discountPercentage: 12,
    img: "/assets/Products/AI-EV_Charger_7kw-22kw.png",
    className: "md:col-span-1 md:row-span-1",
    tags: ["ev", "smart", "solar-boost", "universal"],
    metadata: { chargingKw: 7, phases: 1, minHomePhasesRequired: 1 }
  },
  {
    id: "ev-11kw",
    title: "AmpereArc 11kW Smart EV Charger",
    desc: "Fast EV charging with solar integration. Optimized for modern luxury EVs. Requires three-phase home supply. Smart scheduling and solar surplus detection.",
    category: "Home",
    subCategory: "EV Chargers",
    basePrice: 550,
    discountPercentage: 10,
    img: "/assets/Products/AI-EV_Charger_7kw-22kw.png",
    className: "md:col-span-1 md:row-span-1",
    tags: ["ev", "three-phase", "fast-charge"],
    metadata: { chargingKw: 11, phases: 3, minHomePhasesRequired: 3 }
  },
  {
    id: "ev-40kw",
    title: "AmpereArc 40kW DC EV Charger",
    desc: "High-speed DC fast charging station with OCPP 1.6J support. Requires three-phase supply. Charges most EVs in under 2 hour.",
    category: "Home",
    subCategory: "EV Chargers",
    basePrice: 12000,
    discountPercentage: 10,
    img: "/assets/Products/AI-EV_Charger_7kw-22kw.png",
    className: "md:col-span-1 md:row-span-1",
    tags: ["ev", "three-phase", "ultra-fast"],
    metadata: { chargingKw: 40, phases: 3, minHomePhasesRequired: 3 }
  },
  {
    id: "c-ev-22kw-3ph",
    title: "AmpereArc 22kW Commercial EV Charger",
    desc: "Three-phase commercial EV charging station for car parks, business premises and fleet operations. OCPP compliant.",
    category: "Commercial",
    subCategory: "EV Chargers",
    basePrice: 640,
    discountPercentage: 10,
    img: "/assets/Products/AI-EV_Charger_7kw-22kw.png",
    className: "md:col-span-1 md:row-span-1",
    tags: ["ev", "commercial", "three-phase", "fast-charge"],
    metadata: { chargingKw: 22, phases: 3, minHomePhasesRequired: 3 }
  },

  // ── HIDDEN / INSTALLATION PRODUCTS ─────────────────────────────────────────
  {
    id: "ev-3.6kw",
    title: "AmpereArc 3.6kW Eco EV Charger",
    desc: "Budget charger for older EVs. Reliable and simple.",
    category: "Home",
    subCategory: "EV Chargers",
    basePrice: 400,
    discountPercentage: 8,
    img: "/assets/Products/AI-EV_Charger_7kw-22kw.png",
    tags: ["ev", "budget", "single-phase"],
    visible: false,
    metadata: { chargingKw: 3.6, phases: 1, minHomePhasesRequired: 1 }
  },
  {
    id: "hidden-offgrid-inv-5kw-1ph",
    title: "5kW Off-Grid Inverter (1 Phase)",
    desc: "Pure off-grid inverter.",
    category: "Home",
    subCategory: "Inverters",
    basePrice: 700,
    discountPercentage: 10,
    img: "/assets/Products/5kW_Hybrid_Inveter_1Phase.png",
    tags: ["off-grid", "backup", "single-phase"],
    visible: false,
    metadata: { kw: 5, phases: 1, offGridCapable: true }
  },
  {
    id: "hidden-offgrid-inv-10kw-3ph",
    title: "10kW Off-Grid Inverter (3 Phase)",
    desc: "Pure off-grid 3-phase inverter.",
    category: "Commercial",
    subCategory: "Inverters",
    basePrice: 900,
    discountPercentage: 10,
    img: "/assets/Products/10kW_Hybrid_Inveter_3Phase.png",
    tags: ["off-grid", "three-phase", "commercial"],
    visible: false,
    metadata: { kw: 10, phases: 3, offGridCapable: true }
  },
  {
    id: "hidden-bess-10kwh",
    title: "10kWh LFP Stack Battery",
    desc: "LifePO4 battery module.",
    category: "Home",
    subCategory: "BESS (Battery Energy Storage)",
    basePrice: 1200,
    discountPercentage: 12,
    img: "/assets/Products/16.8kW_Battery.png",
    tags: ["off-grid", "large-capacity"],
    visible: false,
    metadata: { kwh: 10, dod: 0.8 }
  },
  {
    id: "c-bess-100kwh",
    title: "100kWh Industrial Battery Stack",
    desc: "Industrial grade storage.",
    category: "Commercial",
    subCategory: "BESS (Battery Energy Storage)",
    basePrice: 14000,
    discountPercentage: 12,
    img: "/assets/Products/16.8kW_Battery.png",
    tags: ["industrial", "off-grid"],
    visible: false,
    metadata: { kwh: 100, dod: 0.9 }
  },
];

export const partners: { name: string; slug: string }[] = [];
