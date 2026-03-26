"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFAQ({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Color cycle for each FAQ item — mirrors Home Features stepColors
  const faqColors = [
    { hex: "#EC4899", grad: "from-kid-pink to-rose-500" },
    { hex: "#8B5CF6", grad: "from-kid-purple to-violet-600" },
    { hex: "#3B82F6", grad: "from-kid-blue to-indigo-500" },
    { hex: "#10B981", grad: "from-kid-green to-teal-500" },
  ];

  useGSAP(() => {
    // Header — same animation as Timeline header
    gsap.fromTo(".faq-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    // Cards stagger — same as Timeline cards
    const items = gsap.utils.toArray(".faq-item");
    items.forEach((item: any, i: number) => {
      gsap.fromTo(item,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)",
          scrollTrigger: { trigger: item, start: "top 85%" }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-[#FAFAFA]">

      {/* Background Orbs — same as Testimonials section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)" }}
        />
        <div
          className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)" }}
        />

        {/* Soft Grid — same as Timeline */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header — glassmorphic badge + title like Timeline */}
        <div className="faq-header text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center justify-center relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-kid-blue to-kid-green blur-xl opacity-30 rounded-full animate-pulse" />
            <span className="relative px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-kid-blue font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              <HelpCircle className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              {dict.contactPage.faq.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 leading-tight drop-shadow-sm">
            {dict.contactPage.faq.title}
          </h2>
        </div>

        {/* FAQ Items — glassmorphic cards like Testimonials / Timeline */}
        <div className="max-w-4xl mx-auto space-y-6">
          {dict.contactPage.faq.questions.map((item, i) => {
            const color = faqColors[i % faqColors.length];
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="faq-item cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div
                  className={`bg-white/70 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] border-2 transition-all duration-500 group relative overflow-hidden ${
                    isOpen
                      ? "border-white/60 shadow-[0_25px_50px_rgba(0,0,0,0.08)] -translate-y-1"
                      : "border-white/60 shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2"
                  }`}
                >
                  {/* Subtle hover background glow — same as Features card */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, transparent 40%, ${color.hex} 100%)` }}
                  />

                  <div className="flex items-center justify-between gap-6 relative z-10">
                    {/* Color dot + question */}
                    <div className="flex items-center gap-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: `linear-gradient(135deg, ${color.hex}, ${color.hex}DD)`, boxShadow: `0 8px 20px ${color.hex}40` }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-black text-slate-800 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300"
                        style={{ backgroundImage: `linear-gradient(135deg, ${color.hex}, ${color.hex}DD)` }}
                      >
                        {item.q}
                      </h3>
                    </div>

                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 shrink-0 ${
                      isOpen ? "text-white rotate-180 shadow-lg" : "border-slate-200 text-slate-400"
                    }`}
                      style={isOpen ? { background: `linear-gradient(135deg, ${color.hex}, ${color.hex}DD)`, borderColor: color.hex } : {}}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 pt-8 mt-8 border-t border-slate-100" : "max-h-0 opacity-0"
                  }`}>
                    <p className="text-slate-600 font-medium leading-relaxed text-lg">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA — same dark gradient card style as Home Contact */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#3b0764] rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden border-4 border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
            {/* Inner blobs */}
            <div className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-kid-green/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-kid-pink/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay pointer-events-none" />

            <div className="relative z-10">
              <h4 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-md">
                Ready to plant the seeds?
              </h4>
              <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Schedule a tour and see why families love Good Seed Daycare.
              </p>
              <button className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-kid-green to-teal-400 text-white font-black text-lg rounded-2xl shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300">
                Enrollment Application
                <Sparkles className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
