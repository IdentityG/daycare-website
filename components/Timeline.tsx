"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate Header
    gsap.fromTo(".time-header", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    // Draw the center line based on scroll progress
    gsap.fromTo(".timeline-line",
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 50%",
          end: "bottom 80%",
          scrub: 1, // Smoothly ties height to scroll position
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
    <section ref={containerRef} className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="time-header text-center max-w-2xl mx-auto mb-20">
          <span className="px-5 py-2 rounded-full bg-kid-bg-yellow text-yellow-600 font-extrabold text-sm uppercase tracking-wider mb-4 inline-block">
            {dict.timeline.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-kid-primary mt-4">
            {dict.timeline.title}
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative max-w-5xl mx-auto">
          
          {/* Background Line (Gray) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-slate-200 rounded-full"></div>
          
          {/* Animated Glowing Line (Green) */}
          <div className="timeline-line absolute left-6 md:left-1/2 top-0 w-1 md:-ml-0.5 bg-kid-green rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10"></div>

          {/* Timeline Events */}
          <div className="space-y-12 md:space-y-24">
            {dict.timeline.events.map((event: any, i: number) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`time-card relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot Icon */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-white border-4 border-kid-green rounded-full flex items-center justify-center transform -translate-x-1/2 z-20 shadow-lg">
                    <Clock className="w-5 h-5 text-kid-green" />
                  </div>

                  {/* Empty space for desktop alternating layout */}
                  <div className="hidden md:block w-[45%]"></div>

                  {/* Card Content */}
                  <div className="w-full md:w-[45%] pl-20 md:pl-0">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                      <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-bold text-sm mb-4">
                        {event.time}
                      </div>
                      <h3 className="text-2xl font-extrabold text-kid-primary mb-2">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 font-medium">
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