"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Camera, ShieldCheck } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function ProgramFacilities({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".facility-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    const items = gsap.utils.toArray(".facility-item");
    items.forEach((item: any, i: number) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(item,
        { x: isLeft ? -100 : 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)",
          scrollTrigger: { trigger: item, start: "top 85%" }
        }
      );
    });
  }, { scope: containerRef });

  const images = [
    "C:/Users/babay/.gemini/antigravity/brain/67575005-6d79-43ec-ba67-efde8f5129bf/tech_lab_daycare_new_1774514993934.png",
    "C:/Users/babay/.gemini/antigravity/brain/67575005-6d79-43ec-ba67-efde8f5129bf/eco_garden_daycare_1774514897486.png",
    "C:/Users/babay/.gemini/antigravity/brain/67575005-6d79-43ec-ba67-efde8f5129bf/art_studio_daycare_1774514920115.png",
    "C:/Users/babay/.gemini/antigravity/brain/67575005-6d79-43ec-ba67-efde8f5129bf/zen_zone_daycare_new_1774515081630.png"
  ];

  const cardColors = [
    { hex: "#3B82F6", grad: "from-kid-blue to-indigo-500" },
    { hex: "#10B981", grad: "from-kid-green to-teal-500" },
    { hex: "#EC4899", grad: "from-kid-pink to-rose-500" },
    { hex: "#8B5CF6", grad: "from-kid-purple to-violet-600" },
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#FAFAFA] px-6 md:px-12 relative overflow-hidden">
      {/* Background — Home Contact pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="w-[800px] h-[800px] bg-gradient-to-tr from-kid-blue/20 to-kid-green/20 rounded-full blur-[120px] mix-blend-multiply opacity-50 absolute" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        {/* Header — glassmorphic badge */}
        <div className="facility-header text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center justify-center relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-kid-blue to-kid-purple blur-xl opacity-30 rounded-full animate-pulse" />
            <span className="relative px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-kid-blue font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              <Camera className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              {dict.programsPage.facilities.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 leading-tight drop-shadow-sm">
            {dict.programsPage.facilities.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {dict.programsPage.facilities.cards.map((card, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <div
                key={i}
                className="facility-item group relative h-[500px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.04)] border-2 border-white/60 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)]"
              >
                {/* Image Background */}
                <div className="absolute inset-0 bg-slate-900 overflow-hidden">
                  <img
                    src={images[i % images.length]}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
                  />
                  <div className={`absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-br ${color.grad}`} />
                </div>

                <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-end text-left z-20">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"
                      style={{ backgroundColor: color.hex }} />
                    <div className="relative w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 group-hover:translate-x-4 transition-transform duration-500 drop-shadow-md">
                    {card.title}
                  </h3>
                  <p className="text-white/80 font-medium text-lg md:text-2xl leading-relaxed max-w-xl group-hover:translate-x-4 transition-transform duration-500 delay-100">
                    {card.desc}
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
