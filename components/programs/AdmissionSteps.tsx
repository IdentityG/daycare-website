"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { UserPlus, Sparkles, Clock } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function AdmissionSteps({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const stepColors = [
    { hex: "#F59E0B", grad: "from-amber-400 to-orange-500" },
    { hex: "#10B981", grad: "from-emerald-400 to-teal-500" },
    { hex: "#3B82F6", grad: "from-blue-400 to-indigo-500" },
    { hex: "#8B5CF6", grad: "from-violet-400 to-purple-500" },
    { hex: "#EC4899", grad: "from-pink-400 to-rose-500" },
  ];

  useGSAP(() => {
    // Header — Timeline pattern
    gsap.fromTo(".step-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    // Draw connector line — Timeline line pattern
    gsap.fromTo(".step-line",
      { scaleY: 0 },
      { scaleY: 1, ease: "none", transformOrigin: "top",
        scrollTrigger: { trigger: ".step-container", start: "top 20%", end: "bottom 80%", scrub: true }
      }
    );

    // Cards slide in alternately — Timeline card pattern
    const cards = gsap.utils.toArray(".step-card");
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
        <div className="step-header text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center justify-center relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-kid-pink to-kid-purple blur-xl opacity-30 rounded-full animate-pulse" />
            <span className="relative px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-kid-pink font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              <UserPlus className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              {dict.programsPage.admission.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 leading-tight drop-shadow-sm">
            {dict.programsPage.admission.title}
          </h2>
        </div>

        {/* Timeline layout — exact Timeline pattern */}
        <div className="step-container relative max-w-5xl mx-auto">
          {/* Background Line (Glassy) */}
          <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-2 md:-ml-1 bg-white/50 backdrop-blur-sm border border-white/80 rounded-full shadow-inner" />
          {/* Animated Glowing Line */}
          <div className="step-line absolute left-[38px] md:left-1/2 top-0 bottom-0 w-2 md:-ml-1 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.6)] z-10 overflow-hidden"
            style={{ background: "linear-gradient(to bottom, #F59E0B, #10B981, #3B82F6, #8B5CF6, #EC4899)" }} />

          <div className="space-y-16 md:space-y-24">
            {dict.programsPage.admission.steps.map((step, i) => {
              const isEven = i % 2 === 0;
              const tColor = stepColors[i % stepColors.length];
              return (
                <div key={i} className={`step-card relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot Icon — Timeline pattern */}
                  <div className="absolute left-[38px] md:left-1/2 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center transform -translate-x-1/2 z-20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-125 hover:rotate-12 cursor-pointer"
                    style={{ border: `4px solid ${tColor.hex}` }}
                  >
                    <Clock className="w-6 h-6" style={{ color: tColor.hex }} />
                    <div className="absolute inset-0 rounded-full blur-md opacity-40 -z-10" style={{ backgroundColor: tColor.hex }} />
                  </div>

                  <div className="hidden md:block md:w-[45%]" />

                  {/* Card — glassmorphic like Timeline cards */}
                  <div className={`w-full md:w-[45%] pl-24 md:pl-0 ${isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'}`}>
                    <div className="bg-white/70 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] border-2 border-white/60 shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, transparent 40%, ${tColor.hex} 100%)` }} />

                      <div className={`inline-flex items-center px-5 py-2 rounded-full text-white font-extrabold text-sm mb-6 shadow-md transition-transform duration-300 group-hover:scale-105 bg-gradient-to-r ${tColor.grad}`}>
                        Step {i + 1}
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-black text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300"
                        style={{ backgroundImage: `linear-gradient(135deg, ${tColor.hex}, ${tColor.hex}DD)` }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA — dark gradient card like Home Contact */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#3b0764] rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden border-4 border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
            <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-kid-green/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-kid-pink/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay pointer-events-none" />
            <div className="relative z-10">
              <h4 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-md">
                Enroll for Upcoming Season
              </h4>
              <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Secure your child&apos;s spot in our award-winning programs today.
              </p>
              <button className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-kid-green to-teal-400 text-white font-black text-lg rounded-2xl shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300">
                Start Application
                <Sparkles className="w-6 h-6 text-kid-yellow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
