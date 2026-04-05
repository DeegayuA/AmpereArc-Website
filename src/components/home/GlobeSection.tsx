"use client";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { motion } from "framer-motion";

const sampleMarkers: GlobeMarker[] = [
  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/1.webp", label: "London, UK" },
  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/2.webp", label: "New York, USA" },
  { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/3.webp", label: "Sydney, AU" },
  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/4.webp", label: "Paris, FR" },
  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/5.webp", label: "Tokyo, JP" },
  { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/6.webp", label: "Dubai, AE" },
];

export function GlobeSection() {
  return (
    <section className="py-16 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-sm font-black uppercase tracking-[0.2em] mb-8"
          >
            Product of UK 🇬🇧 <span className="opacity-40">|</span> Engineered for the World
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight mb-8 leading-[0.9] text-foreground"
          >
            Global Vision <br />
            <span className="text-primary italic">Local Engineering</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/70 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            From our design studio in the UK, AmpereArc is setting a new global standard for intelligent, high-performance energy storage solutions.
          </motion.p>
        </div>

        <div className="relative mx-auto h-[560px] md:h-[500px] w-full max-w-5xl overflow-hidden rounded-3xl bg-secondary shadow-lg shadow-black/5 dark:shadow-none border border-border flex flex-col md:block">
          {/* Subtle Glow Backdrop for Mobile */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-[radial-gradient(circle_at_50%_40%,rgba(245,138,61,0.12),transparent_70%)] md:hidden z-0" />
          
          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-end items-center text-center md:items-start md:text-left pointer-events-none">
            <h3 className="max-w-md text-3xl font-extrabold tracking-tight text-white font-heading">
              Clean Energy At Scale
            </h3>
            <p className="mt-4 max-w-sm text-secondary-foreground/80 text-sm pb-2">
              From homes to businesses, we provide scalable solutions that support global net-zero goals.
            </p>
          </div>
          
          <div className="absolute inset-x-0 md:inset-auto md:right-[-20%] md:bottom-[-20%] z-0 w-full h-[75%] md:w-[80%] md:h-[120%] top-0 md:top-auto pointer-events-auto">
            <Globe3D
              className="w-full h-full"
              markers={sampleMarkers}
              config={{
                atmosphereColor: "#F58A3D",
                atmosphereIntensity: 10,
                bumpScale: 5,
                autoRotateSpeed: 0.5,
              }}
            />
          </div>
        </div>

{/* 
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
           <div className="pt-8 md:pt-0">
             <div className="text-5xl font-heading font-black text-primary mb-2">00k+</div>
             <div className="text-foreground/70 font-medium tracking-wider uppercase text-sm">Installations Worldwide</div>
           </div>
           <div className="pt-8 md:pt-0">
             <div className="text-5xl font-heading font-black text-primary mb-2">0.0 GWh</div>
             <div className="text-foreground/70 font-medium tracking-wider uppercase text-sm">Total Energy Stored</div>
           </div>
           <div className="pt-8 md:pt-0">
             <div className="text-5xl font-heading font-black text-primary mb-2">000+ Tons</div>
             <div className="text-foreground/70 font-medium tracking-wider uppercase text-sm">CO2 Offset Annually</div>
           </div>
        </div>
        */}
      </div>
    </section>
  );
}
