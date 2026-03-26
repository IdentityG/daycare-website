"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function CurriculumApproach({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const stepColors = [
    { hex: "#F59E0B", lightColor: "#FEF3C7" },
    { hex: "#10B981", lightColor: "#D1FAE5" },
    { hex: "#3B82F6", lightColor: "#DBEAFE" },
    { hex: "#EC4899", lightColor: "#FCE7F3" },
  ];

  useGSAP(() => {
    gsap.fromTo(".cur-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    const cards = gsap.utils.toArray(".cur-card");
    cards.forEach((card: any, i: number) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(card,
        { x: isLeft ? -100 : 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)",
          scrollTrigger: { trigger: card, start: "top 85%" }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-[#FAFAFA]">
      {/* Background — Timeline pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)" }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header — glassmorphic badge like Timeline */}
        <div className="cur-header text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center justify-center relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-kid-green to-kid-blue blur-xl opacity-30 rounded-full animate-pulse" />
            <span className="relative px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-kid-green font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              <Lightbulb className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              {dict.programsPage.curriculum.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 leading-tight drop-shadow-sm">
            {dict.programsPage.curriculum.title}
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 font-medium mt-6 max-w-2xl mx-auto leading-relaxed">
            {dict.programsPage.curriculum.subtitle}
          </p>
        </div>

        {/* Cards — glassmorphic like Testimonials cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {dict.programsPage.curriculum.points.map((point, i) => {
            const color = stepColors[i % stepColors.length];
            return (
              <div key={i} className="cur-card group">
                <div className="bg-white/70 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] border-2 border-white/60 shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 h-full relative overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, transparent 40%, ${color.hex} 100%)` }} />

                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: color.lightColor, boxShadow: `0 10px 25px ${color.hex}20` }}
                  >
                    <CheckCircle2 className="w-8 h-8" style={{ color: color.hex }} />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-black text-slate-800 mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300"
                    style={{ backgroundImage: `linear-gradient(135deg, ${color.hex}, ${color.hex}DD)` }}
                  >
                    {point.title}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
