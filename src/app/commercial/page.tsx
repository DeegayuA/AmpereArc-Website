import Link from "next/link";
import Image from "next/image";

export default function CommercialPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 text-foreground">
            Commercial green energy storage
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            Power your business more efficiently with a AmpereArc Commercial solution. 
            Every business relies on energy but it shouldn’t come at the expense of your bottom line or the planet.
          </p>
          <div className="flex justify-center gap-4">
             <Link href="/contact" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">
                Request a Quote
             </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-4xl font-bold font-heading mb-6">Power Your Business With Confidence</h2>
            <p className="text-lg text-foreground/70 mb-6">
              AmpereArc Commercial systems help organisations of every size reduce energy costs, unlock renewable potential, and take control of their consumption.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">✓</div>
                 <div>
                   <strong>Reduce Costs.</strong> 
                   <p className="text-foreground/70 text-sm">Save thousands on energy bills by storing low-cost electricity and using it during peak times.</p>
                 </div>
              </li>
              <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">✓</div>
                 <div>
                   <strong>Improve Resilience.</strong> 
                   <p className="text-foreground/70 text-sm">Optimise use of renewables by capturing excess solar generation for later use.</p>
                 </div>
              </li>
              <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">✓</div>
                 <div>
                   <strong>Cut Carbon.</strong> 
                   <p className="text-foreground/70 text-sm">Meet carbon reduction targets and strengthen your ESG performance.</p>
                 </div>
              </li>
            </ul>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden bg-muted">
            <Image 
              src="/assets/Hero_BG/Commercial.jpg" 
              alt="Commercial Building" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
