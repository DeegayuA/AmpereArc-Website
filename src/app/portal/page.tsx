"use client";

import { motion } from "framer-motion";
import { Lock, Key, ArrowRight, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import Link from "next/link";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
        
        {/* Animated Grid lines snippet */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[1px] h-full bg-primary/40 mx-20 shrink-0" />
          <div className="w-[1px] h-full bg-primary/40 mx-20 shrink-0" />
          <div className="w-[1px] h-full bg-primary/40 mx-20 shrink-0" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
            <Lock className="w-3 h-3" />
            <span>Secure Access Point</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black font-heading leading-tight tracking-tighter"
          >
            AmpereArc <br />
            <span className="text-primary italic">Partner Cloud</span>
          </motion.h1>

          <p className="text-xl text-foreground/60 leading-relaxed max-w-lg">
            Manage your energy grid, monitor system health, and access advanced diagnostics—all from a single, unified dashboard.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
             <Feature icon={ShieldCheck} text="Secure MFA Login" />
             <Feature icon={Zap} text="Real-time Monitoring" />
             <Feature icon={Globe} text="Global Grid Map" />
             <Feature icon={Cpu} text="AI Diagnostics" />
          </div>
        </div>

        {/* Login Card Tease */}
        <motion.div
           initial={{ opacity: 0, y: 20, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="relative group p-1"
        >
          {/* Animated Glow Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-[3rem]" />
          
          <div className="bg-background/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 md:p-12 space-y-8 relative overflow-hidden">
            <div className="space-y-2">
              <h2 className="text-3xl font-black font-heading">Login to Cloud</h2>
              <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest">Enter your credentials</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  disabled
                  className="w-full bg-white/5 border border-border/50 rounded-2xl p-5 text-sm outline-none cursor-not-allowed opacity-50"
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  disabled
                  className="w-full bg-white/5 border border-border/50 rounded-2xl p-5 text-sm outline-none cursor-not-allowed opacity-50"
                />
              </div>
            </div>

            <button disabled className="w-full bg-primary text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl shadow-xl shadow-primary/20 opacity-40 cursor-not-allowed">
              Authenticating...
            </button>

            <div className="pt-6 border-t border-border/50 flex flex-col gap-4 text-center">
              <span className="text-xs text-foreground/40 font-medium">Don't have a partner account?</span>
              <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all flex items-center justify-center gap-2">
                Contact Sales Support <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Banner for Status */}
            <div className="absolute bottom-4 left-4 right-4 bg-primary text-[10px] font-black uppercase tracking-widest text-white text-center py-2 rounded-xl">
              System Update in Progress
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-foreground/70">{text}</span>
    </div>
  );
}
