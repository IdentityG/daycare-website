"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate Header
    gsap.fromTo(".time-header", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    // Draw the center line based on scroll progress using scaleY (Better Performance)
    gsap.fromTo(".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        }
      }
    );

    // Slide in timeline cards alternately
    const cards = gsap.utils.toArray(".time-card");
    cards.forEach((card: any, i: number) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(card,
        { x: isLeft ? -100 : 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-[#FAFAFA]">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)" }}
        />
        <div 
          className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)" }}
        />
        
        {/* Soft Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="time-header text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center justify-center relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-kid-yellow to-kid-green blur-xl opacity-30 rounded-full animate-pulse" />
            <span className="relative px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-kid-green font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              {dict.timeline.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 leading-tight drop-shadow-sm">
            {dict.timeline.title}
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative max-w-5xl mx-auto">
          
          {/* Background Line (Glassy) */}
          <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-2 md:-ml-1 bg-white/50 backdrop-blur-sm border border-white/80 rounded-full shadow-inner"></div>
          
          {/* Animated Glowing Line (Dynamic Gradient) */}
          <div 
            className="timeline-line absolute left-[38px] md:left-1/2 top-0 bottom-0 w-2 md:-ml-1 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)] z-10 overflow-hidden"
            style={{ background: "linear-gradient(to bottom, #F59E0B, #10B981, #3B82F6, #8B5CF6, #EC4899)" }}
          ></div>

          {/* Timeline Events */}
          <div className="space-y-16 md:space-y-24">
            {dict.timeline.events.map((event: any, i: number) => {
              const isEven = i % 2 === 0;
              const stepColors = [
                { hex: "#F59E0B", tw: "amber-500", grad: "from-amber-400 to-orange-500" },
                { hex: "#10B981", tw: "emerald-500", grad: "from-emerald-400 to-teal-500" },
                { hex: "#3B82F6", tw: "blue-500", grad: "from-blue-400 to-indigo-500" },
                { hex: "#8B5CF6", tw: "violet-500", grad: "from-violet-400 to-purple-500" },
                { hex: "#EC4899", tw: "pink-500", grad: "from-pink-400 to-rose-500" },
              ];
              const tColor = stepColors[i % stepColors.length];

              return (
                <div key={i} className={`time-card relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot Icon */}
                  <div 
                    className="absolute left-[38px] md:left-1/2 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center transform -translate-x-1/2 z-20 shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-125 hover:rotate-12 cursor-pointer"
                    style={{ border: `4px solid ${tColor.hex}` }}
                  >
                    <Clock className="w-6 h-6" style={{ color: tColor.hex }} />
                    <div 
                      className="absolute inset-0 rounded-full blur-md opacity-40 -z-10"
                      style={{ backgroundColor: tColor.hex }}
                    ></div>
                  </div>

                  {/* Empty space for desktop alternating layout */}
                  <div className="hidden md:block md:w-[45%]"></div>

                  {/* Card Content (Glassmorphism) */}
                  <div className={`w-full md:w-[45%] pl-24 md:pl-0 ${isEven ? 'md:pr-12 lg:pr-16 text-left md:text-right' : 'md:pl-12 lg:pl-16 text-left'}`}>
                    <div className="bg-white/70 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] border-2 border-white/60 shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                      
                      {/* Subtle hover background glow */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, transparent 40%, ${tColor.hex} 100%)` }}
                      ></div>
                      
                      <div className={`inline-flex items-center px-5 py-2 rounded-full text-white font-extrabold text-sm mb-6 shadow-md transition-transform duration-300 group-hover:scale-105 bg-gradient-to-r ${tColor.grad}`}>
                        {event.time}
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-black text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300"
                        style={{ backgroundImage: `linear-gradient(135deg, ${tColor.hex}, ${tColor.hex}DD)` }}
                      >
                        {event.title}
                      </h3>

                      <p className="text-slate-600 font-medium leading-relaxed">
                        {event.desc}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}