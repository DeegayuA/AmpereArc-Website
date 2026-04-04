"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GooeyInput } from "@/components/ui/gooey-input";
import { Menu, X, Sun, Moon, Search, ChevronDown, Rocket, Users, Building2, UserCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import { SettingsDropdown } from "@/components/ui/settings-dropdown";
import { useSettings } from "@/components/providers/SettingsProvider";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const links = [
    { name: t.nav.products, href: "/products" },
    { name: t.nav.blog, href: "/blog" },
    { name: t.nav.caseStudies, href: "/case-studies" },
    { name: t.nav.portal, href: "/portal" },
  ];

  const solutions = [
    { name: t.nav.homeowner, href: "/homeowner", icon: Users, desc: "Residential storage solutions" },
    { name: t.nav.commercial, href: "/commercial", icon: Building2, desc: "Industrial & enterprise power" },
    { name: t.nav.installer, href: "/installer", icon: UserCircle2, desc: "Partner program & resources" },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 py-4 lg:py-6"
        style={{
          paddingTop: isScrolled ? "1rem" : "1.5rem",
        }}
      >
        <motion.div
          layout
          className={`relative flex items-center justify-between px-6 lg:px-10 transition-all duration-500 ease-in-out ${
            isScrolled 
              ? "w-[95%] lg:w-[85%] h-16 rounded-full bg-background/70 backdrop-blur-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)]" 
              : "w-full h-20 bg-transparent border-transparent"
          }`}
        >
          {/* Brand Protected from Translation */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3 relative z-10 group notranslate shrink-0">
            <div className="relative w-8 h-8 lg:w-10 lg:h-10">
              <Image
                src="/assets/Logos/AmpereArc-Symbol-CLR.png"
                alt="AmpereArc Logo"
                fill
                className={`object-contain transition-all duration-500 ease-in-out ${isScrolled
                    ? (isDark ? "brightness-100" : "grayscale-0")
                    : "brightness-100"
                  }`}
                sizes="40px"
                priority
              />
            </div>
            <span className="font-sans font-medium text-xl lg:text-3xl tracking-tighter transition-colors duration-300 text-foreground">
              AmpereArc
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {/* Solutions Dropdown */}
            <div 
              className="flex"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest transition-colors text-foreground/70 hover:text-primary whitespace-nowrap">
                {t.nav.solutions}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-12 w-72 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-[2rem] shadow-2xl p-3 grid gap-1 overflow-hidden"
                  >
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-300 hover:bg-primary/10"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black uppercase tracking-wider text-foreground">{item.name}</span>
                          <span className="text-[10px] text-foreground/50 leading-tight">{item.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {links.map((link, idx) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`font-bold text-xs uppercase tracking-widest transition-colors text-foreground/70 hover:text-primary whitespace-nowrap ${
                  idx > 0 ? "hidden xl:block" : "block"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            <GooeyInput
              placeholder="Search..."
              collapsedWidth={isScrolled ? 80 : 100}
              expandedWidth={isScrolled ? 150 : 200}
              className="z-10 hidden xl:block"
              onOpenChange={setIsSearchOpen}
            />

            <SettingsDropdown />

            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 border ${
                isDark
                  ? "bg-primary/10 text-primary border-primary/20 hover:border-primary/50"
                  : "bg-secondary/10 dark:bg-white/5 border-secondary/20 hover:border-primary/30 text-foreground"
              }`}
              aria-label="Toggle theme"
            >
              {mounted ? (
                isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            <Link 
              href="/contact" 
              className="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-lg bg-primary text-white hover:bg-primary/90 shadow-primary/20"
            >
              {t.nav.getInTouch}
            </Link>
          </div>

          {/* Mobile Toggle Group */}
          <div className="flex items-center gap-3 lg:hidden">
            <SettingsDropdown />
            <button 
              className="p-2 rounded-full border border-border/50 transition-colors text-foreground" 
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu Overhaul */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 left-4 right-4 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] shadow-2xl p-6 lg:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-4">Navigation</span>
                  {links.map((link) => (
                    <Link key={link.name} href={link.href} className="text-xl font-bold px-4 py-2 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="grid gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-4">Solutions</span>
                  <div className="grid grid-cols-1 gap-2">
                    {solutions.map((item) => (
                      <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 bg-secondary/5 rounded-2xl">
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="font-bold text-sm">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 pt-4 border-t border-border/50">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Appearance</span>
                    <button onClick={toggleTheme} className="flex items-center gap-2 font-bold text-sm">
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      {isDark ? "Light Mode" : "Dark Mode"}
                    </button>
                  </div>
                  <Link href="/contact" className="bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                    {t.nav.getInTouch}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
