"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Baby, GraduationCap, School, Zap, Sparkles } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramCategories({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const programs = [
    { ...dict.programs.infant, icon: Baby, color: "#F59E0B", lightColor: "#FEF3C7", grad: "from-amber-400 to-orange-500" },
    { ...dict.programs.toddler, icon: School, color: "#3B82F6", lightColor: "#DBEAFE", grad: "from-blue-400 to-indigo-500" },
    { ...dict.programs.preschool, icon: GraduationCap, color: "#8B5CF6", lightColor: "#EDE9FE", grad: "from-violet-400 to-purple-500" }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const headerTl = gsap.timeline({
        scrollTrigger: { trigger: ".pcat-header", start: "top 80%" }
      });
      headerTl
        .fromTo(".pcat-badge-glow", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
        .fromTo(".pcat-badge", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(2)" }, "-=0.3")
        .fromTo(".pcat-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");

      const cards = gsap.utils.toArray<HTMLElement>(".pcat-card");
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 100, rotationY: (index % 2 === 0 ? -20 : 20), opacity: 0 },
          { y: 0, rotationY: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" }
          }
        );
        gsap.to(card.querySelector(".pcat-icon"), {
          y: -8, rotation: 360, duration: 4, repeat: -1, yoyo: true, ease: "power2.inOut"
        });
      });
    });
    return () => mm.revert();
  }, { scope: containerRef, dependencies: [] });

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[#FAFAFA]">
      {/* Background — Features pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-kid-purple/20 to-kid-pink/20 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-kid-green/20 to-kid-yellow/20 rounded-full blur-[100px] mix-blend-multiply" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        {/* Header — Features badge pattern */}
        <div className="pcat-header text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="relative mb-8 mx-auto flex justify-center">
            <div className="pcat-badge-glow absolute inset-0 w-32 h-12 bg-gradient-to-r from-kid-pink to-orange-400 rounded-full blur-xl opacity-40 animate-pulse" />
            <div className="pcat-badge relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-kid-purple font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              <Zap className="w-5 h-5 text-kid-pink" />
              <span>{dict.programs.badge}</span>
              <Sparkles className="w-4 h-4 ml-1 text-orange-400 animate-pulse" />
            </div>
          </div>
          <h2 className="pcat-title text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] tracking-tight text-slate-900 drop-shadow-sm">
            {dict.programs.title}
          </h2>
        </div>

        {/* Cards — Features card pattern */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <div
                key={i}
                className={`pcat-card relative group cursor-pointer transition-all duration-500 ${hoveredCard === i ? 'scale-[1.02] z-20' : 'z-10'}`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                <div className="card-bg absolute inset-0 rounded-[2.5rem] -z-10 transition-all duration-700 backdrop-blur-2xl border-2 border-white/60"
                  style={{
                    background: hoveredCard === i ? `linear-gradient(135deg, white 40%, ${prog.lightColor} 100%)` : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                    boxShadow: hoveredCard === i ? `0 25px 50px -12px ${prog.color}30` : "0 15px 35px rgba(0,0,0,0.04)"
                  }}
                />
                <div className="relative p-8 lg:p-12 rounded-[2.5rem] h-full flex flex-col items-center text-center">
                  <div className="pcat-icon relative mx-auto w-24 h-24 lg:w-28 lg:h-28 mb-8 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
                    style={{
                      background: hoveredCard === i ? `linear-gradient(135deg, ${prog.color}, ${prog.color}DD)` : prog.lightColor,
                      boxShadow: hoveredCard === i ? `0 20px 40px ${prog.color}50` : `0 10px 25px ${prog.color}20`
                    }}
                  >
                    <Icon className="w-12 h-12 lg:w-14 lg:h-14 drop-shadow-lg transition-colors duration-500"
                      style={{ color: hoveredCard === i ? "white" : prog.color }}
                    />
                  </div>
                  <div className="mb-4 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-slate-500 font-bold text-sm">
                    Ages: {prog.age}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black mb-4 leading-tight transition-all duration-300"
                    style={{ color: hoveredCard === i ? prog.color : "#0F172A" }}
                  >
                    {prog.title}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-grow">{prog.desc}</p>
                  <button className="w-full py-5 rounded-2xl bg-white border border-slate-100 text-slate-900 font-black text-lg transition-all duration-500 flex items-center justify-center gap-3 shadow-sm hover:shadow-xl"
                    style={hoveredCard === i ? { background: `linear-gradient(135deg, ${prog.color}, ${prog.color}DD)`, color: "white", borderColor: "transparent", boxShadow: `0 10px 25px ${prog.color}40` } : {}}
                  >
                    Explore Program
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </div>
                <div className="absolute inset-0 rounded-[2.5rem] border-[3px] pointer-events-none transition-all duration-500"
                  style={{ borderColor: prog.color, opacity: hoveredCard === i ? 0.4 : 0, transform: hoveredCard === i ? 'scale(1.02)' : 'scale(1)' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
