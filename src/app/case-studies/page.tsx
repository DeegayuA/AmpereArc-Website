"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies-data";

export default function CaseStudiesPage() {
  const projects = caseStudies;
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black font-heading leading-tight tracking-tighter"
          >
            Real Impact, <br />
            <span className="text-primary italic">Real Results</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-foreground/60 leading-relaxed"
          >
            Discover how AmpereArc systems are transforming energy independence for homeowners and global industries alike.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer bg-secondary/5 border border-border/40 rounded-[2.5rem] overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                  <project.icon className="w-3 h-3 text-primary" />
                  {project.type}
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{project.location}</span>
                  <h3 className="text-2xl font-black font-heading">{project.title}</h3>
                </div>
                
                <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2">
                  {project.desc}
                </p>
                
                <div className="pt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-foreground/30">Business Impact</span>
                    <span className="text-lg font-black text-foreground">{project.impact}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110 shadow-lg shadow-primary/20">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-primary rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group"
        >
          {/* Abstract Pattern */}
          <div className="absolute inset-0 opacity-10 flex flex-wrap content-between justify-between p-12 pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full" />
            ))}
          </div>
          
          <div className="relative z-10 text-white space-y-4">
            <h2 className="text-4xl md:text-5xl font-black font-heading">Have a larger project in mind?</h2>
            <p className="text-white/80 text-lg">Download our corporate case study deck or request a feasibility study.</p>
          </div>
          
          <Link href="/contact" className="relative z-10 bg-white text-primary px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
            Inquire Today
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
