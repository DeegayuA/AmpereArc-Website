import Link from "next/link";
import Image from "next/image";

export default function HomeownerPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 text-foreground">
            Take control of your home energy and your bills.
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            With a AmpereArc system you can store cheaper, greener power and use it when it suits you.
            Whether you’ve got solar panels or not, our smart home solutions help you save money, 
            reduce your carbon footprint and protect against rising energy prices.
          </p>
          <div className="flex justify-center gap-4">
             <Link href="/#calculator" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">
                Try Our Calculator
             </Link>
             <Link href="#products" className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors">
                See Products
             </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[400px] rounded-3xl overflow-hidden bg-muted">
            <Image 
              src="/assets/Hero_BG/Home.jpeg" 
              alt="Homeowner" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold font-heading mb-6">How It Works</h2>
            <p className="text-lg text-foreground/70 mb-6">
              Our smart battery technology lets homeowners cut energy bills, reduce reliance on the grid, and move towards true energy independence all while helping the planet.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">1</div>
                 <div>
                   <strong>Save Money.</strong> 
                   <p className="text-foreground/70 text-sm">Store solar power during the day to use later – instead of sending it back to the grid.</p>
                 </div>
              </li>
              <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">2</div>
                 <div>
                   <strong>Save Energy.</strong> 
                   <p className="text-foreground/70 text-sm">Charge your battery overnight – on cheaper off-peak tariffs.</p>
                 </div>
              </li>
              <li className="flex gap-4 items-start">
                 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">3</div>
                 <div>
                   <strong>Save the Planet.</strong> 
                   <p className="text-foreground/70 text-sm">Deploy your stored energy – This allows the use of stored energy when fossil fuel use is high.</p>
                 </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
