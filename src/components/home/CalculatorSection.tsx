"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { useSettings } from "@/components/providers/SettingsProvider";
import { formatPrice, convertPrice } from "@/lib/currency";

export function CalculatorSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { currency } = useSettings();
  
  // Calculator State (Base values in GBP)
  const [monthlyBillGBP, setMonthlyBillGBP] = useState(150);
  const [hasSolar, setHasSolar] = useState(false);

  // --- Advanced Logic ---
  const annualBill = monthlyBillGBP * 12;
  const savingsFactor = hasSolar ? 0.85 : 0.65; // Optimized for BESS efficacy
  const annualSavings = annualBill * savingsFactor;
  const fiveYearSavings = annualSavings * 5.25; // Factoring in grid inflation (approx 5%)
  const co2SavedPerYear = (annualBill / 0.15) * 0.4; // Extrapolated from kWh/£ logic (~400g per kWh)
  const treesEquivalent = Math.floor(co2SavedPerYear / 20); // 20kg per tree/year

  // --- Canvas Animation ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dots: Array<{
      x: number; y: number; baseX: number; baseY: number;
      vx: number; vy: number; radius: number; baseGlow: number; glowPulse: number; pulseSpeed: number;
    }> = [];

    const gap = 30;
    const returnSpeed = 0.05;
    const mouseRadius = 150;
    const distortionStrength = 10;
    
    let mouse = { x: -1000, y: -1000 };

    const initCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      dots = [];
      const cols = Math.floor(canvas.width / gap);
      const rows = Math.floor(canvas.height / gap);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * gap + gap/2,
            y: j * gap + gap/2,
            baseX: i * gap + gap/2,
            baseY: j * gap + gap/2,
            vx: 0,
            vy: 0,
            radius: Math.random() * 1.5 + 0.5,
            baseGlow: Math.random() * 0.5 + 0.1,
            glowPulse: 0,
            pulseSpeed: Math.random() * 0.05 + 0.01
          });
        }
      }
    };

    initCanvas();

    window.addEventListener("resize", initCanvas);
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const baseColor = isDark ? "245, 138, 61" : "245, 138, 61"; // Primary Arc Orange

      dots.forEach(dot => {
        // Physics push
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          dot.vx -= Math.cos(angle) * force * distortionStrength;
          dot.vy -= Math.sin(angle) * force * distortionStrength;
        }

        // Return spring
        dot.vx += (dot.baseX - dot.x) * returnSpeed;
        dot.vy += (dot.baseY - dot.y) * returnSpeed;

        // Friction
        dot.vx *= 0.8;
        dot.vy *= 0.8;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Pulse glow
        dot.glowPulse += dot.pulseSpeed;
        const currentGlow = dot.baseGlow + Math.sin(dot.glowPulse) * 0.3;

        // Draw
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${Math.max(0.1, currentGlow)})`;
        ctx.shadowBlur = Math.max(0, currentGlow * 10);
        ctx.shadowColor = `rgb(${baseColor})`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for performance
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full py-16 overflow-hidden bg-foreground">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60"
      />
      
      {/* Content overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-10 items-center">
        
        <div className="flex-1 text-background">
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4 tracking-tight leading-tight">
            How much could you save with AmpereArc?
          </h2>
          <p className="text-xl text-background/80 mb-6 max-w-md">
            Use our quick calculator to find out what switching to smart energy storage could do for your home.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-[420px] bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        >
          <div className="mb-4 flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/5">
            <h3 className="font-bold text-xl font-heading text-background">Impact Analysis</h3>
            <div className="bg-primary/20 text-primary px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-primary/20">
              {currency}
            </div>
          </div>

          <div className="space-y-6">
            {/* Input Slider */}
            <div className="group">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-semibold text-background/60 group-hover:text-primary transition-colors">
                  Average Monthly Bill (GBP)
                </label>
                <div className="text-2xl font-black font-heading text-primary">
                  {formatPrice(convertPrice(monthlyBillGBP, currency), currency)}
                </div>
              </div>
              <div className="relative h-4 w-full bg-white/10 rounded-full mb-2">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary/50 to-primary rounded-full"
                  style={{ width: `${((monthlyBillGBP - 50) / 950) * 100}%` }}
                />
                <input
                  type="range"
                  min="50" max="1000" step="5"
                  value={monthlyBillGBP}
                  onChange={(e) => setMonthlyBillGBP(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none z-20"
                  style={{ transform: 'scaleY(4)' }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-background/30 font-bold">
                <span>{formatPrice(convertPrice(50, currency), currency)}</span>
                <span>{formatPrice(convertPrice(1000, currency), currency)}</span>
              </div>
            </div>

            {/* Checkbox */}
            <label className="relative flex items-center p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer group hover:bg-white/10 transition-all active:scale-[0.98]">
              <input
                type="checkbox"
                checked={hasSolar}
                onChange={(e) => setHasSolar(e.target.checked)}
                className="w-6 h-6 accent-primary rounded-lg border-2 border-primary/50 transition-colors mr-4"
              />
              <div className="flex-1">
                <div className="text-sm font-bold text-background leading-none mb-1">I have solar panels already</div>
                <div className="text-[11px] text-background/40">use existing solar panel generation in estimate</div>
              </div>
              {hasSolar && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="bg-primary/20 text-primary text-[10px] font-black px-2 py-1 rounded-md"
                >
                  ACTIVE
                </motion.span>
              )}
            </label>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                <div className="text-[9px] font-black text-background/30 uppercase tracking-[0.2em] mb-1">Annual Savings</div>
                <div className="text-2xl font-black font-heading text-primary">
                  {formatPrice(convertPrice(annualSavings, currency), currency)}
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                <div className="text-[9px] font-black text-background/30 uppercase tracking-[0.2em] mb-1">5-Year Saving</div>
                <div className="text-2xl font-black font-heading text-background">
                  {formatPrice(convertPrice(fiveYearSavings, currency), currency)}
                </div>
              </div>
              <div className="col-span-2 bg-primary group hover:bg-primary/90 transition-colors p-4 rounded-[1.5rem] flex items-center justify-between shadow-xl shadow-primary/20 cursor-pointer">
                <div>
                  <div className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-0.5">Carbon Impact</div>
                  <div className="text-xl font-black text-white">
                    {Math.round(co2SavedPerYear).toLocaleString()}kg <span className="text-xs font-medium opacity-60">CO₂ / year</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] mb-0.5">Eco Score</div>
                  <div className="text-xl font-black text-white">
                    {treesEquivalent} <span className="text-xs font-medium opacity-60">Trees</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.location.href = '/contact'}
              className="relative w-full py-4 rounded-full overflow-hidden group"
            >
               <div className="absolute inset-0 bg-background transition-transform duration-500 group-hover:scale-[1.02]" />
               <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/30" />
               <span className="relative z-10 font-black text-xs uppercase tracking-[0.3em] text-foreground">
                 Get a Quote
               </span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
