"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Heart, Shield, Star, Users, Zap, Sparkles } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function AboutValues({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const icons = [Shield, Users, Star, Heart];
  const stepColors = [
    { hex: "#F59E0B", grad: "from-amber-400 to-orange-500", lightColor: "#FEF3C7" },
    { hex: "#10B981", grad: "from-emerald-400 to-teal-500", lightColor: "#D1FAE5" },
    { hex: "#3B82F6", grad: "from-blue-400 to-indigo-500", lightColor: "#DBEAFE" },
    { hex: "#EC4899", grad: "from-pink-400 to-rose-500", lightColor: "#FCE7F3" },
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // Header — same as Features header
      const headerTl = gsap.timeline({
        scrollTrigger: { trigger: ".val-header", start: "top 80%", toggleActions: "play none none none" }
      });
      headerTl
        .fromTo(".val-badge-glow", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
        .fromTo(".val-badge", { y: 30, opacity: 0, rotation: -180 }, { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(2)" }, "-=0.3")
        .fromTo(".val-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(".val-subtitle", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5");

      // Cards 3D reveal — same as Features cards
      const cards = gsap.utils.toArray<HTMLElement>(".val-card");
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 100, rotationY: (index % 2 === 0 ? -20 : 20), rotationX: -30, opacity: 0 },
          { y: 0, rotationY: 0, rotationX: 0, opacity: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
        gsap.to(card.querySelector(".val-icon"), {
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
        {/* Header — Features glassmorphic badge */}
        <div className="val-header text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="relative mb-8 mx-auto flex justify-center">
            <div className="val-badge-glow absolute inset-0 w-32 h-12 bg-gradient-to-r from-kid-yellow to-kid-green rounded-full blur-xl opacity-40 animate-pulse" />
            <div className="val-badge relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-kid-green font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
              <Zap className="w-5 h-5 text-kid-yellow" />
              <span>{dict.about.values.badge}</span>
              <Sparkles className="w-4 h-4 ml-1 text-kid-green animate-pulse" />
            </div>
          </div>
          <h2 className="val-title text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] mb-6 tracking-tight text-slate-900 drop-shadow-sm">
            {dict.about.values.title}
          </h2>
        </div>

        {/* Cards — Features card pattern */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {dict.about.values.cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            const color = stepColors[i % stepColors.length];
            return (
              <div
                key={i}
                className={`val-card relative group cursor-pointer transition-all duration-500 ${hoveredCard === i ? 'scale-[1.02] z-20' : 'z-10'}`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                <div
                  className="card-bg absolute inset-0 rounded-[2.5rem] -z-10 transition-all duration-700 backdrop-blur-2xl border-2 border-white/60"
                  style={{
                    background: hoveredCard === i
                      ? `linear-gradient(135deg, white 40%, ${color.lightColor} 100%)`
                      : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                    boxShadow: hoveredCard === i
                      ? `0 25px 50px -12px ${color.hex}30`
                      : "0 15px 35px rgba(0,0,0,0.04)"
                  }}
                />
                <div className="relative p-8 lg:p-10 rounded-[2.5rem] transition-all duration-500 h-full flex flex-col items-center">
                  <div
                    className="val-icon relative mx-auto w-20 h-20 lg:w-24 lg:h-24 mb-6 lg:mb-8 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
                    style={{
                      background: hoveredCard === i ? `linear-gradient(135deg, ${color.hex}, ${color.hex}DD)` : color.lightColor,
                      boxShadow: hoveredCard === i ? `0 20px 40px ${color.hex}50` : `0 10px 25px ${color.hex}20`
                    }}
                  >
                    <Icon className="w-10 h-10 lg:w-12 lg:h-12 drop-shadow-lg transition-colors duration-500"
                      style={{ color: hoveredCard === i ? "white" : color.hex }}
                    />
                  </div>
                  <div className="text-center flex-grow flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-black mb-4 leading-tight transition-all duration-300"
                      style={{ color: hoveredCard === i ? color.hex : "#0F172A" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-slate-600 font-medium leading-relaxed mb-6 px-2 flex-grow">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-[2.5rem] border-[3px] pointer-events-none transition-all duration-500"
                  style={{ borderColor: color.hex, opacity: hoveredCard === i ? 0.4 : 0, transform: hoveredCard === i ? 'scale(1.02)' : 'scale(1)' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
