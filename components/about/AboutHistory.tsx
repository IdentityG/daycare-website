"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { History, Quote } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHistory({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scale-up entry — Home Contact pattern
    gsap.fromTo(".history-card",
      { scale: 0.9, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    );
    gsap.fromTo(".history-content",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".history-card", start: "top 60%" }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#FAFAFA] px-6 md:px-12 relative overflow-hidden">
      {/* Background Orb — Home Contact style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="w-[800px] h-[800px] bg-gradient-to-tr from-kid-pink/20 to-kid-blue/20 rounded-full blur-[120px] mix-blend-multiply opacity-50 absolute" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Dark glassmorphic card — Home Contact card pattern */}
        <div className="history-card bg-gradient-to-br from-[#1e1b4b] to-[#3b0764] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row relative border-4 border-white/50 backdrop-blur-3xl">
          {/* Inner blobs */}
          <div className="absolute top-[-10%] right-1/2 w-80 h-80 bg-kid-green/30 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-kid-pink/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay pointer-events-none" />

          {/* LEFT: Visual */}
          <div className="p-10 lg:p-20 lg:w-5/12 flex flex-col justify-center relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-kid-pink mb-8 shadow-md">
              <History className="w-10 h-10" />
            </div>
            <Quote className="w-16 h-16 text-white/10 mb-6" />
            <div className="h-2 w-24 bg-gradient-to-r from-kid-pink to-transparent rounded-full mb-8" />
            <p className="text-2xl md:text-3xl font-bold text-white leading-tight italic opacity-90">
              "Every child is a unique seed with boundless potential."
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { val: "15+", label: "Years Exp.", color: "text-kid-yellow" },
                { val: "500+", label: "Graduates", color: "text-kid-pink" },
                { val: "100%", label: "Safe Space", color: "text-kid-green" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`text-3xl font-black ${s.color} mb-1`}>{s.val}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Content — frosted white panel */}
          <div className="p-10 lg:p-20 lg:w-7/12 bg-white/95 backdrop-blur-xl relative z-10 lg:rounded-l-[3rem] shadow-[-20px_0_40px_rgba(0,0,0,0.05)] border-l border-white">
            <span className="history-content px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-kid-purple font-extrabold text-sm uppercase tracking-wider mb-6 inline-table w-max shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              Our Foundation
            </span>
            <h2 className="history-content text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] drop-shadow-sm mt-6">
              {dict.about.history.title}
            </h2>
            <p className="history-content text-slate-600 text-lg leading-relaxed font-medium">
              {dict.about.history.story}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
