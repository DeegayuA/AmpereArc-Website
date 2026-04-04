import Link from "next/link";
import Image from "next/image";

export default function InstallerPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 text-foreground">
            Unlock new opportunities with AmpereArc
          </h1>
          <p className="text-xl text-foreground/80 mb-8">
            Train, install and power up your business. Combine your expertise with our innovation. Join a community of professional installers shaping the future of energy storage.
          </p>
          <div className="flex justify-center gap-4">
             <Link href="#signup" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">
                Become An Installer
             </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[500px] rounded-3xl overflow-hidden bg-muted">
            <Image 
              src="/assets/Hero_BG/installer.png" 
              alt="Installer working" 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold font-heading mb-6">Where Expertise Meets Opportunity</h2>
            <ul className="space-y-6">
              <li>
                 <strong>Expand your business</strong> 
                 <p className="text-foreground/70 text-sm mt-1">Offer your customers premium battery storage, inverters, and EV charging solutions.</p>
              </li>
              <li>
                 <strong>Simplify your workflow</strong> 
                 <p className="text-foreground/70 text-sm mt-1">Manage every project in one place with the AmpereInstaller app.</p>
              </li>
              <li>
                 <strong>Train with confidence</strong> 
                 <p className="text-foreground/70 text-sm mt-1">Access AmpereAcademy, our dedicated online learning platform.</p>
              </li>
              <li>
                 <strong>Earn recognition</strong> 
                 <p className="text-foreground/70 text-sm mt-1">Move up through our installer tiers as you complete training and grow your experience.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
