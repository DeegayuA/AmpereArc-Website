"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const categories = ["Home", "Commercial"];
const subCategories = [
  "BESS (Battery Energy Storage Systems)",
  "Inverters",
  "EV Chargers",
  "Smart Energy Meters",
  "Electrical Panel Boards",
  "Data Loggers",
  "Home & Industrial Automation"
];

// Sample grid data
const gridItems = [
  {
    title: "AmpereArc All-In-One",
    desc: "Seamless integration of battery and inverter.",
    prevBill: "$250",
    nowBill: "$40",
    savings: "84%",
    className: "col-span-1 md:col-span-1",
    img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Hybrid Inverter XT",
    desc: "Maximized solar efficiency for larger homes.",
    prevBill: "$300",
    nowBill: "$60",
    savings: "80%",
    className: "col-span-1 md:col-span-1",
    img: "https://images.unsplash.com/photo-1592833159057-6fcdd4582e07?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "EV Fast Charger",
    desc: "Power your vehicle from your battery storage.",
    prevBill: "$150",
    nowBill: "$20",
    savings: "86%",
    className: "col-span-1 md:col-span-1",
    img: "https://images.unsplash.com/photo-1652796123023-e2cc5f3efac6?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Commercial BESS Stack",
    desc: "Scalable power for heavy industrial usage.",
    prevBill: "$2,500",
    nowBill: "$800",
    savings: "68%",
    className: "col-span-1 md:col-span-2",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Smart Meter",
    desc: "Real-time analytics and tariff tracking.",
    prevBill: "-",
    nowBill: "-",
    savings: "Opt.",
    className: "col-span-1 md:col-span-1",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  }
];

export function ProductsBentoGrid() {
  const [activeCat, setActiveCat] = useState("Home");
  const [activeSub, setActiveSub] = useState("BESS (Battery Energy Storage Systems)");

  return (
    <section id="products" className="py-24 px-6 md:px-12 bg-muted/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-foreground">
            Smarter Products. Superior Savings.
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Explore our range of intelligent hardware designed to give you complete control over your home or commercial energy ecosystem.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0 flex flex-col gap-8">
            <div className="flex gap-2 p-1 bg-border/40 rounded-lg">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${
                    activeCat === cat ? "bg-background shadow-sm text-primary" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 border-l-2 border-border/60 pl-4">
              {subCategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSub(sub)}
                  className={`text-left py-2 px-3 rounded-md transition-colors text-sm font-medium ${
                    activeSub === sub ? "bg-primary/10 text-primary border-l-2 -ml-[18px] border-primary" : "text-foreground/70 hover:bg-border/30 hover:text-foreground"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </aside>

          {/* Bento Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[25rem]">
            {gridItems.map((item, i) => (
              <BentoCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ item }: { item: typeof gridItems[0] }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <motion.div
      whileHover="hover"
      className={`relative rounded-3xl overflow-hidden bg-card border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.01)] group ${item.className}`}
    >
      {/* Skeleton / Fallback BG */}
      <div className={`absolute inset-0 bg-muted animate-pulse ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} />
      
      {/* Background Image filling skeleton strictly */}
      <Image 
        src={item.img} 
        alt={item.title} 
        fill 
        onLoad={() => setIsLoaded(true)}
        className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-60 opacity-80 ${isLoaded ? 'blur-0 scale-100' : 'blur-xl scale-110'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      
      {/* Content wrapper */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Animated Horizontal text on hover */}
        <div className="overflow-hidden mb-4">
          <motion.h3 
            variants={{
              initial: { x: 0 },
              hover: { x: 8 }
            }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="text-2xl font-bold font-heading text-card-foreground mb-2"
          >
            {item.title}
          </motion.h3>
          <motion.p 
            variants={{
              initial: { x: 0, opacity: 0.8 },
              hover: { x: 8, opacity: 1 }
            }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.05 }}
            className="text-card-foreground/80 text-sm max-w-[80%]"
          >
            {item.desc}
          </motion.p>
        </div>

        {/* Savings Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 bg-background/80 backdrop-blur-md rounded-xl p-4 border border-border/50">
           <div>
             <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Previous</div>
             <div className="font-mono text-foreground/50 line-through">{item.prevBill}</div>
           </div>
           <div>
             <div className="text-xs text-muted-foreground uppercase font-bold mb-1">With Us</div>
             <div className="font-mono font-bold text-foreground">{item.nowBill}</div>
           </div>
           <div className="text-right">
             <div className="text-xs text-primary uppercase font-bold mb-1">Savings</div>
             <div className="font-heading font-black text-2xl text-primary leading-none">{item.savings}</div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
