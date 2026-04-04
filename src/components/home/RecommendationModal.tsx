"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X, ArrowLeft, Home, Building2, Zap, Battery, Shield,
  TrendingUp, Car, MapPin, ChevronRight, Loader2, Globe, Sun, User, Phone, Mail, CheckCircle2, ChevronUp, ShoppingCart
} from "lucide-react";
import { products } from "@/lib/data";
import { calculateSystem, getAvailableCountries, getTariff, SystemDesign, SystemInputs } from "@/lib/solar-engine";
import { currencies } from "@/lib/currency";
import { useSettings } from "@/components/providers/SettingsProvider";
import { SolarWizardResult } from "./SolarWizardResult";

interface Props { 
  isOpen: boolean; 
  onClose: () => void;
  quickUsageKwh?: number;
  quickEvKm?: number;
}

type StepId = "project"|"phase"|"usage"|"peak_load"|"backup"|"goal"|"ev"|"location"|"contact"|"roof"|"result";

const STEPS: { id: StepId; label: string }[] = [
  { id: "project",  label: "Property" },
  { id: "phase",    label: "Supply" },
  { id: "usage",    label: "Usage" },
  { id: "roof",     label: "Roof" },
  { id: "peak_load",label: "Instant Power" },
  { id: "backup",   label: "Backup" },
  { id: "goal",     label: "Goal" },
  { id: "ev",       label: "EV & Range" },
  { id: "location", label: "Location" },
  { id: "contact",  label: "Contact" },
  { id: "result",   label: "Results" },
];

const BACKUP_OPTIONS = [
  { hours: 8,   label: "8 Hours",  desc: "Covers evening peak" },
  { hours: 12,  label: "12 Hours", desc: "Full overnight protection" },
  { hours: 24,  label: "1 Day",    desc: "Full 24h autonomy" },
  { hours: 72,  label: "3 Days",   desc: "Weather event resilience" },
  { hours: 168, label: "1 Week",   desc: "Maximum independence" },
];

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
  center:              { opacity: 1, x: 0 },
  exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -50 : 50 }),
};

const defaultAnswers = {
  isCommercial: false,
  isThreePhase: false,
  monthlyUsageKwh: 250,
  needsBackup: false,
  backupHours: 8,
  goalMaxIncome: false,
  offGrid: false,
  needsEV: false,
  evChargingKw: 7,
  evKmPerDay: 40,           // New
  name: "",                 // New
  phone: "",                // New
  email: "",                // New
  city: "",
  countryCode: "LK",
  roofAreaM2: null as number | null,
  roofOverridden: false,
  instantPeakKw: 2,
  usageMode: "units" as "units" | "bill",
  selectedBatteryId: "" as string,
};

export function RecommendationModal({ isOpen, onClose, quickUsageKwh, quickEvKm }: Props) {
  const { currency } = useSettings();
  const [step, setStep] = useState<StepId>("project");
  const [dir, setDir] = useState(1);
  const [liveRates, setLiveRates] = useState<Record<string, number> | null>(null);
  const [design, setDesign] = useState<SystemDesign | null>(null);
  const [isCalc, setIsCalc] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("AI Design Engine initializing...");
  const [answers, setAnswers] = useState(defaultAnswers);
  const [liveDesign, setLiveDesign] = useState<SystemDesign | null>(null);
  const [showLiveSummary, setShowLiveSummary] = useState(false);

  // --- Real-time Design Engine ---
  useEffect(() => {
    const inputs: SystemInputs = {
      monthlyUsageKwh: answers.monthlyUsageKwh,
      isCommercial: answers.isCommercial,
      isThreePhase: answers.isThreePhase,
      needsBackup: answers.needsBackup || answers.offGrid,
      backupHours: answers.backupHours,
      goalMaxIncome: answers.goalMaxIncome,
      offGrid: answers.offGrid,
      needsEV: answers.needsEV,
      evChargingKw: answers.evChargingKw,
      evKmPerDay: answers.evKmPerDay,
      countryCode: answers.countryCode,
      roofAreaM2: answers.roofOverridden ? answers.roofAreaM2 : null,
      instantPeakKw: answers.instantPeakKw,
      selectedBatteryId: answers.selectedBatteryId,
    };
    try {
      const design = calculateSystem(inputs, products);
      setLiveDesign(design);
    } catch(e) {}
  }, [answers, products]);

  useEffect(() => {
    if (!isOpen) return;
    if (!liveRates) {
      fetch("https://open.er-api.com/v6/latest/USD")
        .then(r => r.json()).then(d => d.rates && setLiveRates(d.rates)).catch(() => {});
    }
    
    // Auto-detect location & Trigger Quick Calcs
    const fetchIP = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_code) {
          setAnswers(prev => ({ 
            ...prev, 
            countryCode: data.country_code, 
            city: data.city || "" 
          }));
          return data;
        }
      } catch (e) {
        // Fallback to ip-api
        try {
          const res = await fetch("http://ip-api.com/json/");
          const data = await res.json();
          if (data.countryCode) {
            setAnswers(prev => ({ 
              ...prev, 
              countryCode: data.countryCode, 
              city: data.city || "" 
            }));
            return data;
          }
        } catch(e2) {}
      }
      return null;
    };

    const init = async () => {
      const loc = await fetchIP();
      if (quickUsageKwh !== undefined) {
         setAnswers(prev => ({
          ...prev,
          monthlyUsageKwh: quickUsageKwh,
          needsEV: (quickEvKm ?? 0) > 0,
          evKmPerDay: quickEvKm ?? 40,
          isCommercial: false,
          isThreePhase: false,
          needsBackup: false,
          usageMode: "bill",
          // Use the detected location if it returns, else preserve default
          countryCode: loc?.country_code || loc?.countryCode || prev.countryCode,
          city: loc?.city || prev.city
        }));
        // Small delay to ensure state propagates before calc starts
        setTimeout(() => runCalc(), 100);
      }
    };

    init();
  }, [isOpen, quickUsageKwh]);

  const set = useCallback(<K extends keyof typeof defaultAnswers>(k: K, v: typeof defaultAnswers[K]) =>
    setAnswers(prev => ({ ...prev, [k]: v })), []);

  const go = (next: StepId, forward = true) => { setDir(forward ? 1 : -1); setStep(next); };

  const reset = () => { setStep("project"); setDesign(null); setAnswers(defaultAnswers); };

  const runCalc = async () => {
    setIsCalc(true);
    // Auto-save lead first
    try {
      await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: { name: answers.name, phone: answers.phone, email: answers.email },
          location: { city: answers.city, country: answers.countryCode },
          answers
        })
      });
    } catch(e) {}

    const inputs: SystemInputs = {
      monthlyUsageKwh: answers.monthlyUsageKwh,
      isCommercial: answers.isCommercial,
      isThreePhase: answers.isThreePhase,
      needsBackup: answers.needsBackup || answers.offGrid,
      backupHours: answers.backupHours,
      goalMaxIncome: answers.goalMaxIncome,
      offGrid: answers.offGrid,
      needsEV: answers.needsEV,
      evChargingKw: answers.evChargingKw,
      evKmPerDay: answers.evKmPerDay,
      countryCode: answers.countryCode,
      roofAreaM2: answers.roofOverridden ? answers.roofAreaM2 : null,
      instantPeakKw: answers.instantPeakKw,
      selectedBatteryId: answers.selectedBatteryId,
    };
    
    setLoadingMsg("Analyzing roof spatial footprint...");
    await new Promise(r => setTimeout(r, 600));

    setLoadingMsg("Sizing intelligent inverters for peak load...");
    await new Promise(r => setTimeout(r, 700));

    setLoadingMsg("Calculating seasonal power generation...");
    await new Promise(r => setTimeout(r, 600));

    setLoadingMsg("Finalizing your 25-year ROI...");
    await new Promise(r => setTimeout(r, 500));

    setDesign(calculateSystem(inputs, products));
    setIsCalc(false);
    go("result");
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const stepIdx = STEPS.findIndex(s => s.id === step);
  const countries = getAvailableCountries();

  const fmtUsd = (usd: number) => {
    const cur = currencies.find(c => c.code === currency);
    const rate = liveRates?.[currency] ?? cur?.rate ?? 1;
    const local = usd * rate;
    try { return new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(local); }
    catch { return `${cur?.symbol ?? "$"}${Math.round(local).toLocaleString()}`; }
  };

  const tariff = getTariff(answers.countryCode);
  const exchangeRate = liveRates?.[currency] ?? 1;
  const unitPriceLocal = (tariff?.tariff_usd ?? 0.15) * exchangeRate;
  
  const setUsageFromBill = (billLocal: number) => {
    const units = Math.round(billLocal / (unitPriceLocal || 1));
    set("monthlyUsageKwh", units);
  };

  const billFromUsage = Math.round(answers.monthlyUsageKwh * unitPriceLocal);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-5 lg:p-10 pointer-events-none">
          {/* OVERLAY - Uses pointer-events-auto to block background */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} 
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl pointer-events-auto" 
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-[95vw] lg:max-w-7xl max-h-[92dvh] flex flex-col lg:flex-row bg-background rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 pointer-events-auto"
          >
            {/* LEFT SIDEBAR */}
            <div className="hidden lg:flex flex-col w-96 shrink-0 bg-gradient-to-br from-primary via-primary to-primary/80 p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
                {Array.from({length:96}).map((_,i)=><div key={i} className="inline-block w-2 h-2 rounded-full bg-white m-1.5"/>)}
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-12">
                  <p className="text-white/50 text-xs font-black uppercase tracking-[0.3em] mb-2">AmpereArc</p>
                  <h2 className="text-white font-black font-heading text-4xl leading-tight">Solar Solution<br/>Wizard</h2>
                </div>
                <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {STEPS.filter(s=>s.id!=="result").map((s,i)=>{
                    const done=stepIdx>i, active=s.id===step;
                    return (
                      <div key={s.id} className={`flex items-center gap-4 py-1.5 transition-all ${active?"opacity-100":done?"opacity-55":"opacity-25"}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-all ${active?"bg-white text-primary scale-110 shadow-lg shadow-white/20":done?"bg-white/30 text-white":"border border-white/30 text-white/50"}`}>
                          {done?"✓":i+1}
                        </div>
                        <span className={`text-xs font-bold tracking-wide ${active?"text-white":"text-white/60"}`}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="lg:hidden h-1 bg-primary/10">
                <div className="h-full bg-primary transition-all duration-500" style={{width:`${(stepIdx/(STEPS.length-1))*100}%`}}/>
              </div>

              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary fill-primary"/>
                  </div>
                  <div>
                    <p className="font-heading font-black text-sm leading-tight">{STEPS.find(s=>s.id===step)?.label}</p>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">
                      {step!=="result"?`Step ${stepIdx+1} of ${STEPS.length-1}`:"Your System Design"}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary/10 transition-colors">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={step} custom={dir} variants={slide}
                    initial="enter" animate="center" exit="exit"
                    transition={{duration:0.22,ease:"easeInOut"}}
                    className="p-5 lg:p-9 min-h-full">

                    {/* ── PROJECT ── */}
                    {step==="project"&&(
                      <Wrap title="Start your project" sub="Choose your property type to begin.">
                        <Grid2>
                          <Card icon={Home} title="Residential" desc="Homes, Villas & Apartments"
                            note="Optimized for self-consumption and battery storage."
                            onClick={()=>{set("isCommercial",false);go("phase");}}/>
                          <Card icon={Building2} title="Commercial" desc="Offices, Factories & SME"
                            note="Industrial grade 3-phase high-power solutions."
                            onClick={()=>{set("isCommercial",true);set("isThreePhase",true);go("usage");}}/>
                        </Grid2>
                      </Wrap>
                    )}

                    {/* ── PHASE ── */}
                    {step==="phase"&&(
                      <Wrap title="Electrical Supply" sub="What type of phase is connected to your home?" onBack={()=>go("project",false)}>
                        <Grid2>
                          <Card icon={Zap} title="Single Phase" desc="Standard Home Supply"
                            note="Most common for apartments and small family houses."
                            onClick={()=>{set("isThreePhase",false);go("usage");}}/>
                          <Card icon={Zap} title="Three Phase" desc="High Power Supply"
                            note="Essential for large HVAC, pumps, or fast EV charging."
                            onClick={()=>{set("isThreePhase",true);go("usage");}}/>
                        </Grid2>
                      </Wrap>
                    )}

                    {/* ── USAGE ── */}
                    {step==="usage"&&(
                      <Wrap title="Energy Profile" sub="How much electricity do you consume?" onBack={()=>go(answers.isCommercial?"project":"phase",false)}>
                        <div className="space-y-6">
                           {/* Mode Toggle */}
                           <div className="flex p-1 bg-secondary/5 border border-border/50 rounded-2xl">
                             <button onClick={()=>set("usageMode","units")} 
                               className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${answers.usageMode==="units"?"bg-background shadow-xl text-primary":"text-foreground/40"}`}>
                               Units (kWh)
                             </button>
                             <button onClick={()=>set("usageMode","bill")} 
                               className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${answers.usageMode==="bill"?"bg-background shadow-xl text-primary":"text-foreground/40"}`}>
                               Bill Amount ({currency})
                             </button>
                           </div>

                           <div className="bg-secondary/5 border border-border/50 rounded-2xl p-6 text-center group">
                            {answers.usageMode === "units" ? (
                              <>
                                <input type="number" 
                                    value={answers.monthlyUsageKwh}
                                    onFocus={e => e.target.select()}
                                    onChange={e=>set("monthlyUsageKwh", Math.max(0, parseInt(e.target.value)||0))}
                                    className="w-full text-center text-6xl font-black font-heading bg-transparent outline-none text-primary"/>
                                <p className="text-xl font-bold text-foreground/40 mt-2">kWh per Month</p>
                                <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mt-1 italic">
                                  ~ {fmtUsd(billFromUsage/exchangeRate)} Est. Monthly Bill
                                </p>
                              </>
                            ) : (
                              <>
                                <input type="number" 
                                    value={billFromUsage}
                                    onFocus={e => e.target.select()}
                                    onChange={e=>setUsageFromBill(Math.max(0, parseInt(e.target.value)||0))}
                                    className="w-full text-center text-6xl font-black font-heading bg-transparent outline-none text-primary"/>
                                <p className="text-xl font-bold text-foreground/40 mt-2">{currency} per Month</p>
                                <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mt-1 italic">
                                  ~ {answers.monthlyUsageKwh} kWh Energy Consumption
                                </p>
                              </>
                            )}
                          </div>

                          <div>
                            <input type="range" min={5} max={answers.isCommercial?5000:1500}
                               value={answers.monthlyUsageKwh}
                               onChange={e=>set("monthlyUsageKwh", parseInt(e.target.value))}
                               className="w-full accent-primary"/>
                            <div className="flex justify-between items-center mt-2 px-1">
                              <p className="text-[10px] uppercase font-black tracking-widest text-foreground/30">
                                Estimated Panels Needed
                              </p>
                              <p className="text-xs font-black text-primary">
                                ~{liveDesign?.panelCount || 0} Panels
                              </p>
                            </div>
                          </div>
                          <NavBtn onClick={()=>go("roof")}/>
                        </div>
                      </Wrap>
                    )}

                    {/* ── PEAK LOAD ── */}
                    {step==="peak_load"&&(
                      <Wrap title="Peak Instant Power" sub="What are your highest simultaneous loads?" onBack={()=>go("roof",false)}>
                        <div className="space-y-6">
                           <div className="bg-secondary/5 border border-border/50 rounded-2xl p-6 text-center">
                            <input type="number" 
                                value={answers.instantPeakKw}
                                onFocus={e => e.target.select()}
                                onChange={e=>set("instantPeakKw", Math.max(0, parseInt(e.target.value)||0))}
                                className="w-full text-center text-6xl font-black font-heading bg-transparent outline-none text-primary"/>
                            <p className="text-xl font-bold text-foreground/40 mt-2">Max Peak kW</p>
                          </div>
                          <div>
                            <input type="range" min={1} max={answers.isCommercial?100:30}
                               value={answers.instantPeakKw}
                               onChange={e=>set("instantPeakKw", parseInt(e.target.value))}
                               className="w-full accent-primary"/>
                            <p className="text-[10px] text-foreground/40 font-bold mt-2">
                              Your inverter size needs to match your instant peak usage if you run heavy appliances like Heat Pumps, A/C, or Welding simultaneously.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                             {[
                               {l: "A/C Unit", v: 2}, {l: "Heat Pump", v: 5},
                               {l: "Water Heater", v: 3}, {l: "EV Charger", v: 7},
                               {l: "Welder/Heavy", v: 10}, {l: "Induction Ovens", v: 6}
                             ].map(item => (
                               <button key={item.l} onClick={() => set("instantPeakKw", (answers.instantPeakKw || 0) + item.v)}
                                 className="p-3 rounded-xl border border-border/50 bg-white text-center hover:bg-primary/5 hover:border-primary/50 transition-colors">
                                 <span className="block font-black text-xs">+{item.v}kW</span>
                                 <span className="text-[9px] opacity-70">{item.l}</span>
                               </button>
                             ))}
                          </div>
                          <NavBtn onClick={()=>go("backup")}/>
                        </div>
                      </Wrap>
                    )}

                    {/* ── BACKUP ── */}
                    {step==="backup"&&(
                      <Wrap title="Backup Requirements" sub="Stay powered during outages." onBack={()=>go("peak_load",false)}>
                        <div className="space-y-4">
                          <Grid3>
                            <Card icon={Zap} title="No Backup" desc="Grid-tied only" note="Purely for bill savings." selected={!answers.needsBackup && !answers.offGrid} onClick={()=>{set("needsBackup",false);set("offGrid",false);go("goal");}}/>
                            <Card icon={Shield} title="Grid Backup" desc="Battery + Solar" note="Essential power during load shedding." selected={answers.needsBackup && !answers.offGrid} onClick={()=>{set("needsBackup",true);set("offGrid",false);}}/>
                            <Card icon={Sun} title="Off-Grid" desc="100% Independent" note="No grid connection required." selected={answers.offGrid} onClick={()=>{set("offGrid",true);set("needsBackup",false);}}/>
                          </Grid3>
                          {(answers.needsBackup || answers.offGrid) && (
                            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="p-5 bg-primary/5 rounded-2xl border border-primary/20 mt-4 space-y-6">
                              <div>
                                <p className="text-sm font-black mb-3">1. Select Backup Duration</p>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                  {BACKUP_OPTIONS.map(o=>(
                                    <button key={o.hours} onClick={()=>set("backupHours",o.hours)} className={`p-3 rounded-xl border text-center transition-all ${answers.backupHours===o.hours?"bg-primary text-white":"bg-white border-border/50 text-foreground"}`}>
                                      <span className="block font-black text-xs">{o.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-black mb-3">2. Choose Your Battery Storage</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {products
                                    .filter(p => p.subCategory === 'BESS (Battery Energy Storage)' && p.category === (answers.isCommercial ? 'Commercial' : 'Home'))
                                    .map(p => {
                                      const selected = answers.selectedBatteryId === p.id || (!answers.selectedBatteryId && p.id === (answers.isCommercial ? "c-bess-50kwh" : "h-bess-16.8kwh"));
                                      return (
                                        <button key={p.id} onClick={() => set("selectedBatteryId", p.id)}
                                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${selected ? "border-primary bg-primary/5" : "border-border/50 bg-white hover:border-primary/30"}`}>
                                          <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-secondary/10 shrink-0">
                                            <Image src={p.img} alt={p.title} fill className="object-cover"/>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-black font-heading truncate ${selected ? "text-primary" : ""}`}>{p.title}</p>
                                            <p className="text-[10px] font-bold text-foreground/40">{p.metadata.kwh}kWh LFP</p>
                                            <p className="text-[11px] font-black mt-1">{fmtUsd(p.basePrice * (1 - p.discountPercentage/100))}</p>
                                          </div>
                                          {selected && <CheckCircle2 className="w-5 h-5 text-primary shrink-0"/>}
                                        </button>
                                      );
                                    })
                                  }
                                </div>
                              </div>
                              <NavBtn className="mt-4" onClick={()=>go("goal")}/>
                            </motion.div>
                          )}
                        </div>
                      </Wrap>
                    )}

                    {/* ── GOAL ── */}
                    {step==="goal"&&(
                      <Wrap title="Your Main Goal" sub="Optimise your solar investment." onBack={()=>go("backup",false)}>
                        <Grid2>
                          <Card icon={ChevronRight} title="Net Zero Bill" desc="Eliminate your monthly cost" note="System sized to match your historical usage." onClick={()=>{set("goalMaxIncome",false);go("ev");}}/>
                          <Card icon={TrendingUp} title="Maximum Income" desc="Become a local power producer" note="Export surplus for maximum ROI." onClick={()=>{set("goalMaxIncome",true);go("ev");}}/>
                        </Grid2>
                      </Wrap>
                    )}

                    {/* ── EV ── */}
                    {step==="ev"&&(
                      <Wrap title="Range & EV Charging" sub="Include smart EV charging in your design." onBack={()=>go("goal",false)}>
                        <div className="space-y-6">
                          <Grid2>
                            <Card icon={Car} title="Add Smart EV Charger" desc="Charge for free via Solar" 
                              note="Includes smart solar-sync hardware"
                              selected={answers.needsEV} onClick={()=>set("needsEV",true)}/>
                            <Card icon={Car} title="Skip EV Charging" desc="Continue without EV hardware" 
                              note="You can add this later"
                              selected={!answers.needsEV} onClick={()=>{set("needsEV",false);go("location");}}/>
                          </Grid2>
                          {answers.needsEV && (
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-4 pt-4 border-t border-border/50">
                               <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20">
                                <label className="text-sm font-black flex justify-between">
                                  Daily Driving Distance <span>{answers.evKmPerDay} km</span>
                                </label>
                                <input type="range" min={5} max={200} step={5} value={answers.evKmPerDay}
                                  onChange={e=>set("evKmPerDay", parseInt(e.target.value))}
                                  className="w-full h-3 bg-primary/20 rounded-full accent-primary my-4"/>
                                <p className="text-[10px] text-foreground/40 font-bold">This helps calculate your fuel savings vs ICE vehicles.</p>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[{kw:3.6,l:"Slow"},{kw:7,l:"7kW (Standard)"},{kw:11,l:"11kW (3P Only)"},{kw:22,l:"22kW (3P Only)"}].map(o=>{
                                  const disabled = o.kw > 7 && !answers.isThreePhase;
                                  return (
                                    <button key={o.kw} disabled={disabled} onClick={()=>set("evChargingKw",o.kw)} 
                                      className={`p-3 rounded-xl border text-center transition-all ${disabled?"opacity-30 cursor-not-allowed":answers.evChargingKw===o.kw?"bg-primary text-white":"bg-white border-border/50"}`}>
                                      <span className="block font-black text-xs">{o.kw}kW</span>
                                      <span className="text-[9px] opacity-70">{o.l}</span>
                                    </button>
                                  );
                                })}
                              </div>
                              <NavBtn onClick={()=>go("location")}/>
                            </motion.div>
                          )}
                        </div>
                      </Wrap>
                    )}

                    {/* ── LOCATION ── */}
                    {step==="location"&&(
                      <Wrap title="Where's the project?" sub="Location determines solar irradiance and grid tariffs." onBack={()=>go("ev",false)}>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase text-foreground/40">Country</label>
                               <div className="relative">
                                 <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                                 <select value={answers.countryCode} onChange={e=>set("countryCode", e.target.value)}
                                   className="w-full pl-11 pr-4 py-4 bg-secondary/5 border border-border/50 rounded-2xl text-sm font-bold appearance-none">
                                   {countries.map(c=><option key={c.code} value={c.code}>{c.name}</option>)}
                                 </select>
                               </div>
                            </div>
                            <div className="space-y-1">
                               <label className="text-[10px] font-black uppercase text-foreground/40">City</label>
                               <div className="relative">
                                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                                 <input type="text" placeholder="e.g. London, New York" value={answers.city} onChange={e=>set("city", e.target.value)}
                                   className="w-full pl-11 pr-4 py-4 bg-secondary/5 border border-border/50 rounded-2xl text-sm font-bold"/>
                               </div>
                            </div>
                          </div>
                          <NavBtn onClick={()=>go("contact")}/>
                        </div>
                      </Wrap>
                    )}

                    {/* ── CONTACT ── */}
                    {step==="contact"&&(
                      <Wrap title="Contact Information" sub="Enter your details to generate your personalized solar design." onBack={()=>go("location",false)}>
                        <div className="space-y-4 pt-2">
                           <div className="relative">
                             <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                             <input type="text" placeholder="Full Name" value={answers.name} 
                               onFocus={e => e.target.select()}
                               onChange={e=>set("name", e.target.value)}
                               className="w-full pl-11 pr-4 py-4 bg-secondary/5 border border-border/50 rounded-2xl text-sm font-bold outline-none focus:border-primary"/>
                           </div>
                           <div className="relative">
                             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                             <input type="tel" placeholder="WhatsApp / Phone Number" value={answers.phone} 
                               onFocus={e => e.target.select()}
                               onChange={e=>set("phone", e.target.value)}
                               className="w-full pl-11 pr-4 py-4 bg-secondary/5 border border-border/50 rounded-2xl text-sm font-bold outline-none focus:border-primary"/>
                           </div>
                           <div className="relative">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30"/>
                             <input type="email" placeholder="Email Address" value={answers.email} onChange={e=>set("email", e.target.value)}
                               className="w-full pl-11 pr-4 py-4 bg-secondary/5 border border-border/50 rounded-2xl text-sm font-bold outline-none focus:border-primary"/>
                           </div>
                           <NavBtn disabled={!answers.name || !answers.phone || isCalc} onClick={runCalc} label={isCalc ? "Processing..." : "Generate Final Quote"}/>
                           {!answers.name && <p className="text-[10px] text-center text-foreground/30">Name and phone are required to continue.</p>}
                        </div>
                      </Wrap>
                    )}

                    {/* ── ROOF ── */}
                    {step==="roof"&&(
                      <RoofStep answers={answers} set={set} onBack={()=>go("usage",false)} onNext={()=>go("peak_load")} isCalc={isCalc} liveDesign={liveDesign}/>
                    )}

                    {/* ── RESULT ── */}
                    {step==="result"&&(
                      design
                        ? <SolarWizardResult design={design} fmtUsd={fmtUsd} currency={currency} onReset={reset} onClose={onClose} liveRates={liveRates} city={answers.city} countryCode={answers.countryCode}/>
                        : (
                          <div className="flex flex-col items-center justify-center gap-6 py-32">
                            <motion.div 
                              animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.7, 1, 0.7] 
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="relative w-24 h-24 flex items-center justify-center"
                            >
                              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                              <Image 
                                src="/assets/Logos/AmpereArc-Symbol-CLR.png" 
                                alt="AmpereArc" 
                                width={80} 
                                height={80} 
                                className="relative z-10 object-contain"
                              />
                            </motion.div>
                            <div className="flex flex-col items-center gap-2 text-center mt-4 h-12">
                              <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 text-primary animate-spin"/>
                                <p className="text-foreground/40 font-black uppercase tracking-widest text-[11px]">AI Design Engine</p>
                              </div>
                              <p className="text-lg font-heading font-black max-w-[250px]">{loadingMsg}</p>
                            </div>
                          </div>
                        )
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* LIVE SUMMARY FOOTER */}
              {step !== "project" && step !== "result" && liveDesign && (
                <div className="shrink-0 border-t border-border/50 bg-secondary/5 backdrop-blur-md relative z-[1001]">
                   <AnimatePresence>
                     {showLiveSummary && (
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }} 
                         animate={{ height: "auto", opacity: 1 }} 
                         exit={{ height: 0, opacity: 0 }}
                         className="overflow-hidden bg-background border-b border-border/50"
                       >
                         <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Current System Configuration</h4>
                              <span className="text-[10px] font-black uppercase text-primary">Live Update</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <SummaryItem label="Solar Yield" value={`${liveDesign.systemKwp} kWp`} sub={`${liveDesign.panelCount} Panels`}/>
                               <SummaryItem label="Inverter" value={`${liveDesign.inverters.count}x`} sub={liveDesign.inverters.product.title}/>
                               {liveDesign.batteries && <SummaryItem label="Storage" value={liveDesign.batteries.product.metadata.kwh + "kWh"} sub={liveDesign.batteries.product.title}/>}
                               {liveDesign.evCharger && <SummaryItem label="EV Smart" value="Enabled" sub={liveDesign.evCharger.product.title}/>}
                            </div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                   
                   <div className="flex items-center justify-between p-4 px-6 lg:px-9">
                      <button 
                        onClick={() => setShowLiveSummary(!showLiveSummary)}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <ShoppingCart className="w-5 h-5"/>
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 leading-none mb-1">Your Estimate</p>
                          <div className="flex items-center gap-2">
                             <span className="font-black font-heading text-lg leading-none">{fmtUsd(liveDesign.costBreakdown.discountedTotal)}</span>
                             <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${showLiveSummary ? 'rotate-180' : ''}`}/>
                          </div>
                        </div>
                      </button>
                      <div className="flex gap-2">
                         <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[9px] font-black uppercase tracking-tighter border border-emerald-500/20">
                           {liveDesign.breakEvenYears} Year Break-Even
                         </span>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}

function SummaryItem({label, value, sub}: {label: string, value: string, sub: string}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-secondary/5">
       <div className="flex-1">
         <p className="text-[9px] font-black uppercase tracking-widest text-foreground/40">{label}</p>
         <p className="text-xs font-black truncate">{value}</p>
         <p className="text-[10px] text-foreground/50 truncate font-medium">{sub}</p>
       </div>
    </div>
  );
}

function RoofStep({answers,set,onBack,onNext,isCalc,liveDesign}:any){
  const cat = answers.isCommercial?"Commercial":"Home";
  const area = cat==="Commercial"?2.55:2.10;
  
  // Current design panel count from AI Engine
  const recommendedCount = liveDesign?.panelCount || 0;
  const currentTotalM2 = Math.ceil(recommendedCount * area);

  // Simple estRoof for slider range
  const estRoof = Math.ceil((answers.monthlyUsageKwh/30) * 1.5 * area); 
  const roofArea = answers.roofAreaM2 ?? estRoof;
  const maxRange = Math.max(estRoof * 3, 400);

  // If the engine had to downsize due to roof, we show warning
  const isDownsized = liveDesign?.panelCount < Math.ceil((answers.monthlyUsageKwh/30) / (((cat==="Commercial"?720:500)/1000)*5*0.78));
  const isCritical = recommendedCount === 0;

  useEffect(() => {
    if (!answers.roofOverridden && answers.roofAreaM2 === null) {
      set("roofAreaM2", estRoof);
    }
  }, [estRoof, answers.roofOverridden, answers.roofAreaM2, set]);

  return(
    <Wrap title="Roof Capacity" sub="Adjust your available roof space to see how it affects your system size." onBack={onBack}>
      <div className="space-y-6">
        <div className={`relative overflow-hidden rounded-[2.5rem] p-9 border-2 transition-all duration-500 ${isCritical ? "bg-red-500/5 border-red-500/30" : isDownsized ? "bg-orange-500/5 border-orange-500/30" : "bg-primary/5 border-primary/20"}`}>
           <Sun className={`absolute -bottom-6 -right-6 w-32 h-32 rotate-12 transition-colors ${isCritical ? "text-red-500/10" : isDownsized ? "text-orange-500/10" : "text-primary/10"}`}/>
           <div className="relative z-10 flex justify-between items-end">
              <div>
                <p className={`text-6xl font-black font-heading transition-colors ${isCritical ? "text-red-600" : isDownsized ? "text-orange-600" : "text-primary"}`}>{recommendedCount}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mt-2">Recommended Panels</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black">{roofArea} m²</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Available Space</p>
              </div>
           </div>

           {/* Warnings */}
           <div className="mt-6 pt-6 border-t border-current/10">
             {isCritical ? (
               <p className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                 <X className="w-3.5 h-3.5"/> Roof too small for AI system design
               </p>
             ) : isDownsized ? (
               <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                 <Zap className="w-3.5 h-3.5 fill-orange-600"/> Downsized to fit your available roof
               </p>
             ) : (
               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                 <CheckCircle2 className="w-3.5 h-3.5"/> Optimal space for your energy goals
               </p>
             )}
           </div>
        </div>

        <div className="space-y-4">
          <input type="range" min={0} max={maxRange} step={5} value={roofArea}
              onChange={e=>{set("roofAreaM2",parseInt(e.target.value));set("roofOverridden",true);}}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"/>
          <div className="flex justify-between text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">
            <span>Small Roof</span>
            <span>Large Factory/Estate</span>
          </div>
        </div>
        
        <button onClick={onNext} disabled={isCritical}
          className={`w-full font-black uppercase tracking-widest text-xs py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 ${isCritical ? "bg-red-500 text-white cursor-not-allowed" : "bg-primary text-white shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"}`}>
          {isCritical ? "Roof Space Required" : <>Continue to Peak Load <ChevronRight className="w-5 h-5"/></>}
        </button>
      </div>
    </Wrap>
  );
}

function Wrap({title,sub,children,onBack}:{title:string;sub:string;children:React.ReactNode;onBack?:()=>void}){
  return(
    <div className="space-y-5 h-full">
      {onBack&&<button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:-translate-x-1 transition-transform"><ArrowLeft className="w-3 h-3"/>Back</button>}
      <div><h3 className="text-3xl font-black font-heading leading-tight">{title}</h3><p className="text-sm text-foreground/50 mt-1">{sub}</p></div>
      {children}
    </div>
  );
}
function Grid2({children}:{children:React.ReactNode}){return<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;}
function Grid3({children}:{children:React.ReactNode}){return<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{children}</div>;}
function Card({icon:Icon,title,desc,note,onClick,selected}:{icon:any;title:string;desc:string;note:string;onClick:()=>void;selected?:boolean}){
  return(
    <button onClick={onClick} className={`group relative text-left p-5 rounded-2xl border-2 transition-all duration-200 ${selected?"border-primary bg-primary/5":"border-border/50 hover:border-primary/40 bg-secondary/5"}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all ${selected?"bg-primary text-white":"bg-background border border-border/50 group-hover:bg-primary group-hover:text-white"}`}><Icon className="w-5 h-5"/></div>
      <h4 className={`font-black font-heading text-base transition-colors ${selected?"text-primary":"group-hover:text-primary"}`}>{title}</h4>
      <p className="text-xs text-foreground/50 font-medium mb-1">{desc}</p>
      <p className="text-[10px] text-foreground/30 italic">{note}</p>
    </button>
  );
}
function NavBtn({onClick,label="Continue →",className="",disabled=false}:{onClick:()=>void;label?:string;className?:string;disabled?:boolean}){
  return<button onClick={onClick} disabled={disabled} className={`w-full bg-foreground text-background font-black uppercase tracking-widest text-xs py-4 rounded-2xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-30 ${className}`}>{label}</button>;
}
function Badge({label}:{label:string}){
  return<div className="text-[9px] text-white/70 font-bold bg-white/10 rounded-lg px-2 py-1">{label}</div>;
}
