"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GooeyInput } from "@/components/ui/gooey-input";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: "Products", href: "#products" },
    { name: "Blog", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "AmpereArc Portal", href: "#" },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.header
      className={`relative w-full transition-colors duration-500 ease-in-out ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : "bg-transparent"
      }`}
    >
      {/* Top Banner - hidden on scroll */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex items-center justify-between px-6 lg:px-12 bg-secondary/10 dark:bg-black/20 text-sm overflow-hidden"
          >
            <div className="flex items-center gap-6">
              <Link href="/homeowner" className="hover:text-primary transition-colors">Homeowner</Link>
              <Link href="/commercial" className="hover:text-primary transition-colors">Commercial</Link>
              <Link href="/installer" className="hover:text-primary transition-colors">Installer</Link>
            </div>
            <div className="flex flex-row gap-4 items-center">
               <Link href="/contact" className="hover:text-primary transition-colors">Contact us</Link>
               <Link href="/get-in-touch" className="bg-primary text-primary-foreground px-4 py-1 rounded-full font-medium hover:bg-primary/90 transition-colors">
                 Get In Touch
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 h-20">
        {/* Dynamic Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10 group">
          <div className="relative w-10 h-10">
            <Image 
              src={isScrolled || isDark ? "/assets/Logos/AmpereArc-Symbol-WT.png" : "/assets/Logos/AmpereArc-Symbol-CLR.png"} 
              alt="AmpereArc Logo" 
              fill 
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <span className="font-heading font-bold text-3xl tracking-tight transition-colors duration-300">
            AmpereArc
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="font-medium hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
            <GooeyInput placeholder="Search..." collapsedWidth={120} expandedWidth={220} />
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (
                isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-secondary/10"
            aria-label="Toggle theme"
          >
            {mounted && (isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />)}
          </button>
          <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
         {mobileOpen && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="lg:hidden bg-background border-b border-border overflow-hidden"
           >
             <div className="flex flex-col p-6 gap-4">
                {links.map((link) => (
                  <Link key={link.name} href={link.href} className="font-medium text-lg border-b border-border/50 pb-2">
                    {link.name}
                  </Link>
                ))}
             </div>
           </motion.div>
         )}
      </AnimatePresence>
    </motion.header>
  );
}
