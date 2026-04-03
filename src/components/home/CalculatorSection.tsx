"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// --- Currency Config ---
const rates = { GBP: 1, USD: 1.25, EUR: 1.15, LKR: 380, INR: 104, AUD: 1.9 };
const symbols = { GBP: "£", USD: "$", EUR: "€", LKR: "Rs", INR: "₹", AUD: "A$" };
type Currency = keyof typeof rates;

export function CalculatorSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Calculator State
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [monthlyBill, setMonthlyBill] = useState(100);
  const [hasSolar, setHasSolar] = useState(false);

  // Simple Dummy Logic
  const savingsPercent = hasSolar ? 0.8 : 0.6;
  const annualSavings = (monthlyBill * 12 * savingsPercent) * rates[currency];

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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-md bg-background rounded-3xl p-8 shadow-2xl border border-border"
        >
          <div className="mb-6 flex justify-between items-center">
            <h3 className="font-bold text-lg font-heading text-foreground">Estimate Savings</h3>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-muted text-foreground border-none rounded-md px-3 py-1 text-sm outline-none font-bold"
            >
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-6">
            <div>
               <label className="block text-sm font-medium text-foreground/80 mb-2">
                 Average Monthly Bill ({symbols[currency]})
               </label>
               <input 
                 type="range" 
                 min="50" max="1000" step="10"
                 value={monthlyBill}
                 onChange={(e) => setMonthlyBill(Number(e.target.value))}
                 className="w-full accent-primary"
               />
               <div className="text-right font-mono font-bold text-primary mt-1">
                 {symbols[currency]} {Math.round(monthlyBill * rates[currency]).toLocaleString()}
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-foreground/80 mb-2 cursor-pointer flex items-center gap-3">
                 <input 
                   type="checkbox" 
                   checked={hasSolar} 
                   onChange={(e) => setHasSolar(e.target.checked)}
                   className="w-5 h-5 accent-primary rounded-sm"
                 />
                 I already have Solar Panels
               </label>
            </div>

            <div className="pt-6 border-t border-border/60">
              <div className="text-sm text-foreground/60 uppercase font-bold tracking-wider mb-2">Estimated Annual Savings</div>
              <div className="text-5xl font-black font-heading text-primary">
                {symbols[currency]} {Math.round(annualSavings).toLocaleString()}
              </div>
            </div>

            <button className="w-full bg-foreground text-background py-3 rounded-full font-bold hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
              Get A Exact Quote
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
