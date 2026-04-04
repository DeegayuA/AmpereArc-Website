"use client";

import { useState } from "react";
import { SystemDesign, MONTHS_SHORT } from "@/lib/solar-engine";
import { motion, AnimatePresence } from "framer-motion";
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
  const maxGen = Math.max(...monthly.map(m => m.generationKwh)) || 1;
  const totalAnnualBenefit = annualSavingsUsd + evFuelSavingsUsd;

  const [copied, setCopied] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

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
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading leading-tight break-words">
          Achieve <span className="text-primary">Energy Freedom</span> & Save <span className="text-primary">{fmtUsd(totalAnnualBenefit/12)}</span> /mo
        </h3>
        <p className="text-sm text-foreground/40 font-bold uppercase tracking-[0.1em]">{panelCount} High-Efficiency Panels · {city}, {country.name}</p>
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
                <p className="text-2xl sm:text-3xl xl:text-4xl font-black font-heading text-emerald-600 break-words">{fmtUsd(evFuelSavingsUsd)}</p>
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
            <div className="flex items-baseline gap-2 flex-wrap">
              <p className="text-3xl sm:text-4xl font-black font-heading text-primary break-words">{breakEvenYears}</p>
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

      {/* Technical Deep Dive Toggle */}
      <div className="flex justify-center -mt-2">
        <button 
          onClick={() => setShowMoreInfo(!showMoreInfo)}
          className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-secondary/10 border border-border/40 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 hover:border-primary/20 transition-all text-foreground/60 hover:text-primary"
        >
          {showMoreInfo ? "Hide Technical Details" : "View Full Seasonality & Specs"}
          <TrendingUp className={`w-3 h-3 transition-transform duration-500 ${showMoreInfo ? 'rotate-180' : ''}`}/>
        </button>
      </div>

      <AnimatePresence>
        {showMoreInfo && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-6"
          >
            {/* Environmental Impact Marketing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 text-center">
                <Sun className="w-6 h-6 text-emerald-500 mx-auto mb-2"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Carbon Avoided</p>
                <p className="text-xl font-black">{Math.round(annualGenerationKwh * 0.4).toLocaleString()} kg</p>
                <p className="text-[9px] text-foreground/40 font-bold mt-1">CO₂ emissions saved/yr</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
                <CalendarDays className="w-6 h-6 text-primary mx-auto mb-2"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Total Yield</p>
                <p className="text-xl font-black">{(annualGenerationKwh * 25 / 1000).toFixed(1)} MWh</p>
                <p className="text-[9px] text-foreground/40 font-bold mt-1">25-year lifetime generation</p>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 text-center">
                <Zap className="w-6 h-6 text-amber-500 mx-auto mb-2"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">Grid Independence</p>
                <p className="text-xl font-black">{Math.min(100, Math.round((annualGenerationKwh / (annualGenerationKwh + (annualSavingsUsd/0.15))) * 100))}%</p>
                <p className="text-[9px] text-foreground/40 font-bold mt-1">Annual energy autonomy</p>
              </div>
            </div>

            {/* Detailed Monthly Table */}
            <div className="bg-secondary/5 border border-border/40 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary"/>
                <h4 className="text-xs font-black uppercase tracking-widest">Monthly Generation Breakdown</h4>
              </div>
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-primary/50">
                <table className="w-full text-left text-[11px] border-collapse min-w-[300px]">
                  <thead>
                    <tr className="border-b border-border/20 text-foreground/40 font-black uppercase tracking-widest">
                      <th className="py-2">Month</th>
                      <th className="py-2">Daily Sun</th>
                      <th className="py-2 text-right">Generation</th>
                      <th className="py-2 text-right">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthly.map((m, i) => (
                      <tr key={i} className="border-b border-border/10 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="py-2 font-black text-foreground/80">{m.month}</td>
                        <td className="py-2 font-black text-foreground/40">{m.peakSunHours}h</td>
                        <td className="py-2 text-right font-black text-primary">{m.generationKwh.toLocaleString()} kWh</td>
                        <td className="py-2 text-right font-black">{fmtUsd(m.savingsUsd)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technical Hardware Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-background border border-border/40 rounded-2xl p-5 space-y-3">
                 <div className="flex items-center gap-2 mb-2">
                   <Sun className="w-4 h-4 text-primary"/>
                   <span className="text-[10px] font-black uppercase tracking-widest">Panel Specifications</span>
                 </div>
                 <div className="flex justify-between text-[11px]">
                   <span className="text-foreground/40 font-bold">Total Capacity</span>
                   <span className="font-black text-foreground">{systemKwp} kWp</span>
                 </div>
                 <div className="flex justify-between text-[11px]">
                   <span className="text-foreground/40 font-bold">Panel Area</span>
                   <span className="font-black text-foreground">{(panelCount * 2.1).toFixed(1)} m²</span>
                 </div>
                 <div className="flex justify-between text-[11px]">
                   <span className="text-foreground/40 font-bold">Module Quantity</span>
                   <span className="font-black text-foreground">{panelCount} Units</span>
                 </div>
               </div>
               <div className="bg-background border border-border/40 rounded-2xl p-5 space-y-3">
                 <div className="flex items-center gap-2 mb-2">
                   <Zap className="w-4 h-4 text-primary"/>
                   <span className="text-[10px] font-black uppercase tracking-widest">Inverter Specs</span>
                 </div>
                 <div className="flex justify-between text-[11px]">
                   <span className="text-foreground/40 font-bold">Output Phase</span>
                   <span className="font-black text-foreground">{inverters.product.metadata.phases}-Phase</span>
                 </div>
                 <div className="flex justify-between text-[11px]">
                   <span className="text-foreground/40 font-bold">Inverter Count</span>
                   <span className="font-black text-foreground">{inverters.count} Unit(s)</span>
                 </div>
                 <div className="flex justify-between text-[11px]">
                   <span className="text-foreground/40 font-bold">Efficiency</span>
                   <span className="font-black text-foreground">98.5% (Max)</span>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seasonal Generation Chart */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"/>
             <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Seasonal Production Breakdown</span>
           </div>
           <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">{annualGenerationKwh.toLocaleString()} kWh Projected / Yr</p>
        </div>
        <div className="flex items-end justify-between h-40 gap-1 md:gap-3">
           {monthly.map((m, i) => {
             const hPercent = Math.max(8, (m.generationKwh / maxGen) * 100);
             return (
               <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative h-full justify-end">
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-foreground text-background text-[9px] font-black px-2 py-1 rounded-md z-20 whitespace-nowrap shadow-xl scale-90 group-hover:scale-100">
                   {fmtUsd(m.savingsUsd)} savings
                 </div>
                 <div className="w-full relative bg-amber-500/5 rounded-t-xl rounded-b-md flex items-end overflow-hidden h-full border border-amber-500/10">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${hPercent}%` }}
                      transition={{ delay: i * 0.05, type: "spring", stiffness: 50, damping: 15 }}
                      className="w-full bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 group-hover:from-primary group-hover:to-amber-500 transition-all duration-500"
                    />
                 </div>
                 <span className="text-[9px] font-black uppercase text-foreground/30 group-hover:text-amber-600 transition-colors">{m.month}</span>
               </div>
             );
           })}
        </div>
      </div>

      {/* Itemized Investment Quote */}
      <div className="space-y-3 pt-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-1">Detailed Cost Breakdown</p>
        <div className="bg-secondary/5 border border-border/40 rounded-3xl overflow-hidden shadow-inner">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="border-b border-border/40 text-[10px] font-black uppercase tracking-widest text-foreground/40 bg-background/50">
                  <th className="p-4 px-5 rounded-tl-3xl">Component</th>
                  <th className="p-4 text-center">Qty</th>
                  <th className="p-4 text-right hidden sm:table-cell">Unit</th>
                  <th className="p-4 text-right rounded-tr-3xl">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { l: "Solar Panels - " + panels.product.title, c: panels.count, u: panels.discountedUnitPriceUsd, t: panels.discountedTotalUsd },
                  { l: "Inverter - " + inverters.product.title, c: inverters.count, u: inverters.discountedUnitPriceUsd, t: inverters.discountedTotalUsd },
                  batteries && { l: "Energy Storage - " + batteries.product.title, c: batteries.count, u: batteries.discountedUnitPriceUsd, t: batteries.discountedTotalUsd },
                  evCharger && { l: "EV Charger - " + evCharger.product.title, c: evCharger.count, u: evCharger.discountedUnitPriceUsd, t: evCharger.discountedTotalUsd },
                ].filter(Boolean).map((item: any, i) => (
                  <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-background/40 transition-colors">
                    <td className="p-4 px-5 font-bold text-foreground sm:max-w-none max-w-[150px] truncate" title={item.l}>{item.l}</td>
                    <td className="p-4 px-5 text-center text-foreground/60 font-medium">x{item.c}</td>
                    <td className="p-4 px-5 text-right text-foreground/60 hidden sm:table-cell">{fmtUsd(item.u)}</td>
                    <td className="p-4 px-5 text-right font-black">{fmtUsd(item.t)}</td>
                  </tr>
                ))}
                
                {/* Installation & BOS */}
                <tr className="border-t border-border/30 bg-background/30">
                  <td colSpan={2} className="p-3 px-5 sm:hidden"></td>
                  <td colSpan={3} className="p-3 px-5 text-right text-[10px] font-bold text-foreground/40 uppercase tracking-widest hidden sm:table-cell">Installation & Certification</td>
                  <td className="p-3 px-5 sm:hidden text-right text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Install</td>
                  <td className="p-3 px-5 text-right font-black">{fmtUsd(costBreakdown.installation)}</td>
                </tr>
                <tr className="bg-background/30">
                  <td colSpan={2} className="p-3 px-5 sm:hidden"></td>
                  <td colSpan={3} className="p-3 px-5 text-right text-[10px] font-bold text-foreground/40 uppercase tracking-widest hidden sm:table-cell">Balance of Systems (Wiring/Mounts/Accessories)</td>
                  <td className="p-3 px-5 sm:hidden text-right text-[10px] font-bold text-foreground/40 uppercase tracking-widest">B.O.S.</td>
                  <td className="p-3 px-5 text-right font-black">{fmtUsd(costBreakdown.bos)}</td>
                </tr>

                {/* Final Total */}
                <tr className="bg-primary/5 text-primary border-t-2 border-primary/20">
                  <td colSpan={2} className="p-5 sm:hidden"></td>
                  <td colSpan={3} className="p-5 text-right font-black text-xs uppercase tracking-widest hidden sm:table-cell">Net Investment Amount</td>
                  <td className="p-5 sm:hidden text-right font-black text-xs uppercase tracking-widest">Total</td>
                  <td className="p-5 text-right font-black text-xl">{fmtUsd(costBreakdown.discountedTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Final Summary Card & Quick Intake */}
      <div className="bg-foreground text-background rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CalendarDays className="absolute -bottom-10 -right-10 w-48 h-48 text-background/5 -rotate-12"/>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] opacity-40">Guaranteed Return</h4>
              <p className="text-4xl sm:text-6xl font-black font-heading text-primary leading-none">{fmtUsd(lifetimeSavings25Yr)}</p>
              <p className="text-[10px] font-bold opacity-30 mt-2 uppercase tracking-widest">Calculated net profit over 25 years (Inflation adjusted)</p>
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <button onClick={shareWA} className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20">
                Send to WhatsApp <MessageCircle className="w-4 h-4"/>
              </button>
              <button onClick={copyText} className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                {copied ? "Copied!" : "Copy Details"} <Copy className="w-4 h-4"/>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/5">
               <h5 className="text-xl font-black font-heading mb-4">Would you like to install this system?</h5>
               <p className="text-sm opacity-50 mb-6">Our technical team will review your local grid conditions and send you a fully itemized official project proposal.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-2">Your Name</label>
                    <input type="text" placeholder="Designate project owner..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-white"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest opacity-40 px-2">WhatsApp Number</label>
                    <input type="tel" placeholder="+ (Country Code) ..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-primary transition-all text-white"/>
                  </div>
                  <button className="md:col-span-2 bg-white text-foreground py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all shadow-2xl">
                    Submit Project for Engineering Review
                  </button>
               </div>
            </div>
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
