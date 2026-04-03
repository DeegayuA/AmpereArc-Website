import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-10 pb-6 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

        {/* Newsletter Column */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/Logos/AmpereArc-Symbol-WT.png"
              alt="AmpereArc Logo"
              width={40}
              height={40}
            />
            <span className="font-heading font-bold text-3xl tracking-tight text-white">
              AmpereArc
            </span>
          </Link>
          <p className="text-secondary-foreground/80">
            Join our newsletter for tips, savings, and smarter living.
          </p>
          <div className="flex bg-background/10 rounded-full p-1 border border-secondary-foreground/20">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border-none outline-none px-4 w-full text-white placeholder:text-white/50"
            />
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-colors flex items-center justify-center">
              <span className="sr-only">Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-white mb-2">Solutions</h3>
          <Link href="/homeowner" className="hover:text-primary transition-colors">Homeowner</Link>
          <Link href="/commercial" className="hover:text-primary transition-colors">Commercial</Link>
          <Link href="/installer" className="hover:text-primary transition-colors">Installer</Link>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-white mb-2">Resources</h3>
          <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
          <Link href="/firmware" className="hover:text-primary transition-colors">Firmware Updates</Link>
          <Link href="/app" className="hover:text-primary transition-colors">Download The App</Link>
          <Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link>
          <Link href="/portal" className="hover:text-primary transition-colors">AmpereArc Portal</Link>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-white mb-2">Contact</h3>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          <div className="flex flex-col gap-2 mt-2">
            <Link href="tel:+447766130423" className="hover:text-primary transition-colors text-sm">+44 7766 130423</Link>
            <Link href="mailto:Info@amperearc.com" className="hover:text-primary transition-colors text-sm">Info@amperearc.com</Link>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-lg text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors duration-300">
                <IconBrandFacebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors duration-300">
                <IconBrandInstagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors duration-300">
                <IconBrandLinkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors duration-300">
                <IconBrandYoutube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-secondary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60">
        <p>© 2026 AmpereArc. All rights reserved.</p>
        <div className="flex flex-col md:flex-row gap-6">
          <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">General Terms & Conditions (EU)</Link>
          <p className="text-secondary-foreground/40 hidden md:block">|</p>
          <Link href="https://github.com/DeegayuA" target="_blank" className="text-primary hover:underline transition-colors lowercase">
            Visit the author
          </Link>
        </div>
      </div>
    </footer>
  );
}
