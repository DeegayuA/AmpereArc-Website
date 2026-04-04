"use client";

import { useState } from "react";
import { SystemDesign, MONTHS_SHORT } from "@/lib/solar-engine";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Sun, Battery, Zap, Car, TrendingUp, CalendarDays, RefreshCw,
  MessageCircle, Mail, Phone, CheckCircle2, Copy, Loader2, Gauge, Fuel
} from "lucide-react";

interface Props {
  design: SystemDesign;
  fmtUsd: (usd: number) => string;
  currency: string;
  onReset: () => void;
  onClose: () => void;
  liveRates: Record<string, number> | null;
  city: string;
  countryCode: string;
}

const BIZ_WHATSAPP = "+447766130423"; // Business WhatsApp
const BIZ_EMAIL    = "[EMAIL_ADDRESS]";
const BIZ_PHONE    = "+447766130423";

export function SolarWizardResult({
  design, fmtUsd, currency, onReset, onClose, city, countryCode
}: Props) {
  const {
    panels, inverters, batteries, evCharger,
    panelCount, systemKwp, monthly, annualGenerationKwh,
    annualSavingsUsd, evFuelSavingsUsd, costBreakdown, breakEvenYears,
    lifetimeSavings25Yr, country, offGrid,
  } = design;

  const monthlySavingsUsd = annualSavingsUsd / 12;
  const maxGen = Math.max(...monthly.map(m => m.generationKwh));
  const totalAnnualBenefit = annualSavingsUsd + evFuelSavingsUsd;

  const [copied, setCopied] = useState(false);

  const buildMessage = () => {
    return [
      `*AmpereArc Solar Quote*`,
      `📍 ${city}, ${country.name}`,
      `🌞 System: ${systemKwp}kWp ${offGrid ? 'Off-Grid' : 'Grid-Tied'}`,
      `☀️ Panels: ${panelCount}x ${panels.product.title}`,
      `⚡ Inverter: ${inverters.count}x ${inverters.product.title}`,
      batteries ? `🔋 Battery: ${batteries.count}x ${batteries.product.title}` : "",
      evCharger ? `🚗 EV Charger: ${evCharger.product.title}` : "",
      ``,
      `💰 Total Investment: ${fmtUsd(costBreakdown.discountedTotal)}`,
      `📉 Monthly Bill Saving: ${fmtUsd(monthlySavingsUsd)}`,
      evFuelSavingsUsd > 0 ? `⛽ EV Fuel Saving: ${fmtUsd(evFuelSavingsUsd/12)}/mo` : "",
      `⏱️ Break-even: ${breakEvenYears} years`,
      `🏆 25-Year Benefit: ${fmtUsd(lifetimeSavings25Yr)}`,
      ``,
      `Please contact me for installation.`
    ].filter(Boolean).join("\n");
  };

  const shareWA = () => window.open(`https://wa.me/${BIZ_WHATSAPP.replace(/\+/g,'')}?text=${encodeURIComponent(buildMessage())}`);
  const shareEmail = () => window.location.href = `mailto:${BIZ_EMAIL}?subject=Solar Quote Request&body=${encodeURIComponent(buildMessage())}`;
  const shareSMS = () => window.location.href = `sms:${BIZ_PHONE}?body=${encodeURIComponent(buildMessage())}`;
  const callBiz = () => window.location.href = `tel:${BIZ_PHONE}`;

  const copyText = () => {
    navigator.clipboard.writeText(buildMessage());
    setCopied(true);
    setTimeout(()=>setCopied(false), 2000);
  };

  return (
    <div className="space-y-7 pb-10">
      {/* Header Summary */}
      <div className="text-center space-y-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
          <Zap className="w-3 h-3 fill-primary"/> {systemKwp}kWp High-Performance System
        </motion.div>
        <h3 className="text-3xl lg:text-4xl font-black font-heading leading-tight">
          Save <span className="text-primary">{fmtUsd(totalAnnualBenefit/12)}</span> /mo
        </h3>
        <p className="text-sm text-foreground/40 font-bold">{panelCount} Panels · {country.name} · {city}</p>
      </div>

      {/* One-Click Contact Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: MessageCircle, label: "WhatsApp", color: "bg-[#25D366]", action: shareWA },
          { icon: Mail, label: "Email", color: "bg-primary", action: shareEmail },
          { icon: Phone, label: "Call", color: "bg-foreground", action: callBiz },
          { icon: MessageCircle, label: "SMS", color: "bg-blue-500", action: shareSMS },
        ].map(b => (
          <button key={b.label} onClick={b.action} className="group flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-2xl ${b.color} flex items-center justify-center text-white shadow-lg transition-transform group-active:scale-90`}>
              <b.icon className="w-6 h-6"/>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{b.label}</span>
          </button>
        ))}
      </div>

      {/* Impact Analysis Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* EV Fuel Savings Card */}
        {evFuelSavingsUsd > 0 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden">
            <Fuel className="absolute -bottom-6 -right-6 w-32 h-32 text-emerald-500/10 -rotate-12"/>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-emerald-500"/>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">EV Savings Impact</span>
              </div>
              <div>
                <p className="text-4xl font-black font-heading text-emerald-600">{fmtUsd(evFuelSavingsUsd)}</p>
                <p className="text-xs font-bold text-foreground/40 mt-1">Annual Fuel Displacement</p>
              </div>
              <div className="p-3 bg-white/50 rounded-xl border border-emerald-500/10">
                <p className="text-[11px] font-medium leading-relaxed">
                  Your solar system covers your EV charging, saving you <span className="font-black">{fmtUsd(evFuelSavingsUsd/12)}</span> every month compared to a petrol/diesel vehicle.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ROI Progress */}
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-primary"/>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Investment Returns</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black font-heading text-primary">{breakEvenYears}</p>
              <p className="text-sm font-bold text-foreground/40 uppercase">Years Break-Even</p>
            </div>
            <div className="relative h-2 bg-primary/10 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-primary w-full origin-left transition-all duration-1000"
                style={{ transform: `scaleX(${Math.min(1, 1 / (breakEvenYears / 5))})` }}/>
            </div>
          </div>
          <p className="text-[11px] text-foreground/40 mt-4 italic font-medium">After {breakEvenYears} years, your electricity becomes 100% profit.</p>
        </div>
      </div>

      {/* Seasonal Generation Chart */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-2">
             <TrendingUp className="w-5 h-5 text-amber-600"/>
             <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Seasonal Production</span>
           </div>
           <p className="text-xs font-bold text-foreground/50">{annualGenerationKwh.toLocaleString()} kWh / Year</p>
        </div>
        <div className="flex items-end justify-between h-36 gap-1 md:gap-2">
           {monthly.map((m, i) => (
             <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
               <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border/50 text-[10px] font-bold px-2 py-1 rounded-lg z-10 whitespace-nowrap shadow-xl">
                 {fmtUsd(m.savingsUsd)} savings
               </div>
               <div className="w-full relative bg-amber-500/10 rounded-t-md rounded-b-sm flex items-end overflow-hidden h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.generationKwh / maxGen) * 100}%` }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 60 }}
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-md group-hover:brightness-110 transition-all"
                  />
               </div>
               <span className="text-[9px] font-black uppercase text-foreground/40 mt-1">{m.month}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="space-y-3 pt-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">System Components</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { l: "Solar Panels", c: panelCount, p: panels.product, i: Sun },
            { l: "Inverter", c: inverters.count, p: inverters.product, i: Zap },
            batteries && { l: "Energy Storage", c: batteries.count, p: batteries.product, i: Battery },
            evCharger && { l: "EV Charger", c: 1, p: evCharger.product, i: Car },
          ].filter(Boolean).map((item: any, idx) => (
            <div key={idx} className="bg-secondary/5 border border-border/40 rounded-2xl p-4 flex flex-col gap-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-background/50 border border-border/20 p-2">
                <Image src={item.p.img} alt={item.p.title} fill className="object-contain"/>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-foreground/30">{item.c}x {item.l}</p>
                <p className="text-xs font-black truncate">{item.p.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Summary Card */}
      <div className="bg-foreground text-background rounded-3xl p-8 relative overflow-hidden">
        <CalendarDays className="absolute -bottom-10 -right-10 w-48 h-48 text-background/5 -rotate-12"/>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <h4 className="text-2xl font-black font-heading leading-tight">LIFETIME BENEFIT</h4>
            <p className="text-5xl font-black font-heading text-primary">{fmtUsd(lifetimeSavings25Yr)}</p>
            <p className="text-sm font-bold opacity-40">Net Profit over 25 years (inflation adjusted)</p>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={shareWA} className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
              Send Design to WhatsApp <MessageCircle className="w-4 h-4"/>
            </button>
            <button onClick={copyText} className="w-full border border-background/20 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-background/10 transition-colors">
              {copied ? "Design Copied!" : "Copy Full Design Details"} <Copy className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>

      {/* Reset/Redo */}
      <div className="flex justify-center pt-4">
        <button onClick={onReset} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors">
          <RefreshCw className="w-4 h-4"/> Start New Calculation
        </button>
      </div>
    </div>
  );
}
