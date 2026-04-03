"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GooeyInput } from "@/components/ui/gooey-input";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      className={`relative w-full transition-colors duration-500 ease-in-out ${isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : "bg-transparent"
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
              src="/assets/Logos/AmpereArc-Symbol-CLR.png"
              alt="AmpereArc Logo"
              fill
              className={`object-contain transition-all duration-500 ease-in-out ${isScrolled
                  ? (isDark ? "brightness-0 invert opacity-100" : "grayscale brightness-0 opacity-80")
                  : "brightness-100 invert-0 opacity-100"
                }`}
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
          <GooeyInput
            placeholder="Search..."
            collapsedWidth={120}
            expandedWidth={220}
            className="z-10"
          />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full bg-transparent backdrop-blur-md border transition-all duration-300 ${isDark
                ? "text-primary border-white/20 hover:border-primary/50"
                : "text-zinc-800 border-zinc-800 hover:border-zinc-900"
              } ${!isDark && !isScrolled ? "text-white border-white/40 hover:border-white" : ""}`}
            aria-label="Toggle theme"
          >
            {mounted ? (
              isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />
            ) : (
              <div className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2 rounded-full border transition-all duration-300 ${isDark
                ? "text-white border-white/20"
                : "text-zinc-800 border-zinc-800"
              } ${!isDark && !isScrolled ? "text-white border-white/40" : ""}`}
            aria-label="Search"
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-300 ${isDark
                ? "text-white border-white/20"
                : "text-zinc-800 border-zinc-800"
              } ${!isDark && !isScrolled ? "text-white border-white/40" : ""}`}
            aria-label="Toggle theme"
          >
            {mounted && (isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />)}
          </button>
          <button className={`p-2 ${!isDark && !isScrolled ? "text-white" : "text-foreground"}`} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background border-b border-border/50 px-6 py-4"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, case studies..."
                autoFocus
                className="w-full bg-secondary/5 border border-border rounded-full py-3 px-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
