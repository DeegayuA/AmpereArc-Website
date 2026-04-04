"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/lib/data";
import { X, ArrowRight, ArrowLeft, Home, Building2, Zap, Battery, Shield, Maximize2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useSettings } from "@/components/providers/SettingsProvider";

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "category" | "goal" | "scale" | "result";

export function RecommendationModal({ isOpen, onClose }: RecommendationModalProps) {
  const { t, formatPrice, currency } = useSettings();
  const [step, setStep] = useState<Step>("category");
  const [answers, setAnswers] = useState({
    category: "" as "Home" | "Commercial" | "",
    goal: "" as "savings" | "backup" | "autonomy" | "",
    scale: "" as "standard" | "large" | "",
  });

  const recommendations = useMemo(() => {
    if (step !== "result") return [];

    return products
      .filter((p) => p.category === answers.category)
      .map((p) => {
        let score = 0;
        
        // Goal Matching
        if (answers.goal === "backup" && p.tags.includes("backup")) score += 5;
        if (answers.goal === "savings" && p.tags.includes("savings")) score += 5;
        if (answers.goal === "autonomy" && p.tags.includes("autonomy")) score += 5;
        if (p.tags.includes("efficiency")) score += 2;

        // Scale Matching
        if (answers.scale === "large") {
          if ((p.metadata.kwh || 0) > 10) score += 5;
          if ((p.metadata.kw || 0) >= 10) score += 5;
          if (p.tags.includes("large-capacity")) score += 3;
        } else {
          if ((p.metadata.kwh || 0) <= 10 && (p.metadata.kwh || 0) > 0) score += 3;
          if ((p.metadata.kw || 0) < 10 && (p.metadata.kw || 0) > 0) score += 3;
          if (p.tags.includes("compact")) score += 4;
        }

        return { product: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 1)
      .map(r => r.product);
  }, [step, answers]);

  const handleNext = (field: keyof typeof answers, value: any, nextStep: Step) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setStep(nextStep);
  };

  const reset = () => {
    setStep("category");
    setAnswers({ category: "", goal: "", scale: "" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 translate-z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-background border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-xl md:text-2xl tracking-tight">Solution Finder</h2>
                  <p className="text-xs text-foreground/50 font-bold uppercase tracking-widest">Find your perfect system</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 rounded-full hover:bg-secondary/10 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Container */}
            <div className="p-6 md:p-10 min-h-[400px] flex flex-col">
              <AnimatePresence mode="wait">
                {step === "category" && (
                  <motion.div
                    key="category"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black font-heading leading-tight">Where will you be <span className="text-primary">installing</span> your system?</h3>
                      <p className="text-foreground/60">Select your property type so we can filter appropriate categories.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <OptionCard
                        icon={Home}
                        title="Residential"
                        desc="For homes and apartments"
                        onClick={() => handleNext("category", "Home", "goal")}
                      />
                      <OptionCard
                        icon={Building2}
                        title="Commercial"
                        desc="For businesses and industry"
                        onClick={() => handleNext("category", "Commercial", "goal")}
                      />
                    </div>
                  </motion.div>
                )}

                {step === "goal" && (
                  <motion.div
                    key="goal"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <button onClick={() => setStep("category")} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black font-heading leading-tight">What is your <span className="text-primary">primary power goal</span>?</h3>
                      <p className="text-foreground/60">This helps us prioritize backup capacity vs daily efficiency.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <OptionCard
                        icon={Zap}
                        title="Monthly Energy Savings"
                        desc="Maximize solar self-consumption and cut bills"
                        onClick={() => handleNext("goal", "savings", "scale")}
                      />
                      <OptionCard
                        icon={Shield}
                        title="Emergency Backup"
                        desc="Priority on keeping lights on during grid outages"
                        onClick={() => handleNext("goal", "backup", "scale")}
                      />
                      <OptionCard
                        icon={Battery}
                        title="Total Autonomy"
                        desc="Reach net-zero and energy independence"
                        onClick={() => handleNext("goal", "autonomy", "scale")}
                      />
                    </div>
                  </motion.div>
                )}

                {step === "scale" && (
                  <motion.div
                    key="scale"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <button onClick={() => setStep("goal")} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black font-heading leading-tight">What's the <span className="text-primary">scale</span> of your property?</h3>
                      <p className="text-foreground/60">We'll match the system's output to your typical consumption.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <OptionCard
                        icon={CheckCircle2}
                        title="Standard"
                        desc="Small to medium family home"
                        onClick={() => handleNext("scale", "standard", "result")}
                      />
                      <OptionCard
                        icon={Maximize2}
                        title="Large"
                        desc="4+ bedrooms or medium office"
                        onClick={() => handleNext("scale", "large", "result")}
                      />
                    </div>
                  </motion.div>
                )}

                {step === "result" && recommendations.length > 0 && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-3xl md:text-4xl font-black font-heading">Your Perfect Match</h3>
                      <p className="text-foreground/60">Based on your energy profile, we recommend:</p>
                    </div>

                    <div className="bg-secondary/5 border border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-48 h-48 shrink-0">
                        <Image
                          src={recommendations[0].img}
                          alt={recommendations[0].title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{recommendations[0].subCategory}</span>
                          <h4 className="text-xl md:text-2xl font-black font-heading leading-tight">{recommendations[0].title}</h4>
                        </div>
                        <p className="text-sm text-foreground/70 line-clamp-3 italic leading-relaxed">
                          "{recommendations[0].desc}"
                        </p>
                        <div className="flex items-center gap-4">
                           <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Est. Price</span>
                             <span className="text-xl font-black text-primary">{formatPrice(recommendations[0].basePrice, currency)}</span>
                           </div>
                           <button 
                             onClick={onClose}
                             className="flex-1 bg-primary text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                           >
                             Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                           </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button onClick={reset} className="text-xs font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors">
                        Restart Questionnaire
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function OptionCard({ icon: Icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative text-left p-6 rounded-3xl border border-border/50 bg-secondary/5 hover:bg-primary/5 hover:border-primary/40 transition-all active:scale-[0.98]"
    >
      <div className="w-12 h-12 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-black font-heading mb-1 group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-xs text-foreground/50 font-medium leading-relaxed group-hover:text-foreground/70">{desc}</p>
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-5 h-5 text-primary" />
      </div>
    </button>
  );
}
