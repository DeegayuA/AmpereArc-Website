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
    <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-heading mb-6"
          >
            Trusted Worldwide
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/80 font-sans"
          >
            With thousands of installations across multiple continents, AmpereArc is shaping the future of energy storage.
          </motion.p>
        </div>

        <div className="relative mx-auto h-[500px] w-full max-w-5xl overflow-hidden rounded-3xl bg-secondary shadow-lg shadow-black/5 dark:shadow-none border border-border">
          <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end pointer-events-none">
            <h3 className="max-w-md text-3xl font-extrabold tracking-tight text-white font-heading">
              Clean Energy At Scale
            </h3>
            <p className="mt-4 max-w-sm text-secondary-foreground/80 text-sm">
              From homes to businesses, we provide scalable solutions that support global net-zero goals.
            </p>
          </div>
          
          <div className="absolute right-[-20%] bottom-[-20%] z-0 w-[80%] h-[120%] pointer-events-auto">
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
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
      </div>
    </section>
  );
}
