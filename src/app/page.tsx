import { Hero } from "@/components/home/Hero";
import { GlobeSection } from "@/components/home/GlobeSection";
import { ProductsBentoGrid } from "@/components/home/ProductsBentoGrid";
import { LogoCloud } from "@/components/home/LogoCloud";
import { CalculatorSection } from "@/components/home/CalculatorSection";

export const metadata = {
  title: "AmpereArc | Home",
  description: "Next-generation energy storage and management solutions.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <GlobeSection />
      <ProductsBentoGrid />
      <LogoCloud />
      <CalculatorSection />
    </>
  );
}
