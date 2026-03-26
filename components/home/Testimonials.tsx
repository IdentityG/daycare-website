"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star, Quote } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

export default function Testimonials({ dict }: { dict: Dictionary }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Infinite Marquee Animation
    const tl = gsap.to(scrollRef.current, {
      xPercent: -50, // Moves exactly half the width (since we double the cards)
      ease: "none",
      duration: 30, // Speed of the marquee
      repeat: -1,
    });

    // Pause on hover
    const container = containerRef.current;
    
    const handleMouseEnter = () => tl.pause();
    const handleMouseLeave = () => tl.play();

    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, { scope: containerRef });

  // We duplicate the reviews array to create the seamless infinite scrolling loop
  const duplicatedReviews = [...dict.testimonials.reviews, ...dict.testimonials.reviews];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#FAFAFA]" ref={containerRef}>
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] rounded-full opacity-40 blur-[120px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)" }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)" }}
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

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 px-6 relative z-10">
        <div className="inline-flex items-center justify-center relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-kid-pink to-kid-purple blur-xl opacity-30 rounded-full animate-pulse" />
          <span className="relative px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-kid-purple font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            {dict.testimonials.badge}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 leading-tight drop-shadow-sm">
          {dict.testimonials.title}
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex cursor-grab active:cursor-grabbing py-8">
        
        {/* Edge Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

        {/* Inner Scroll Track */}
        <div ref={scrollRef} className="flex gap-8 px-4 w-max items-center">
          {duplicatedReviews.map((review: any, i: number) => (
            <div 
              key={i} 
              className="w-[350px] md:w-[450px] shrink-0 bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-white/60 shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group"
            >
              <Quote className="w-12 h-12 text-kid-pink/20 mb-6 group-hover:text-kid-pink transition-colors duration-500 transform group-hover:-rotate-12" />
              
              <p className="text-slate-600 text-lg leading-relaxed mb-8 italic min-h-[100px] font-medium">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white"
                  style={{
                    background: `linear-gradient(135deg, ${["#EC4899", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"][i % 5]} 0%, ${["#BE185D", "#6D28D9", "#1D4ED8", "#047857", "#B45309"][i % 5]} 100%)`
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-lg group-hover:text-kid-purple transition-colors duration-300">{review.name}</h4>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">{review.role}</p>
                </div>
                <div className="ml-auto flex gap-1 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}