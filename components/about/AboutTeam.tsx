"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Users2, Linkedin, Twitter, Mail, Star } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTeam({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const stepColors = [
    { hex: "#EC4899", grad: "from-kid-pink to-rose-500" },
    { hex: "#3B82F6", grad: "from-kid-blue to-indigo-500" },
    { hex: "#10B981", grad: "from-kid-green to-teal-500" },
    { hex: "#F59E0B", grad: "from-kid-yellow to-orange-500" },
  ];

  useGSAP(() => {
    // Header — Timeline pattern
    gsap.fromTo(".team-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );
    // Cards — Testimonials stagger
    const cards = gsap.utils.toArray(".team-card");
    cards.forEach((card: any, i: number) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)",
          scrollTrigger: { trigger: card, start: "top 85%" }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-[#FAFAFA]">
      {/* Background Orbs — Testimonials pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] rounded-full opacity-40 blur-[120px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] mix-blend-multiply"
          style={{ background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header — glassmorphic badge like Timeline */}
        <div className="team-header text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-kid-pink to-kid-purple blur-xl opacity-30 rounded-full animate-pulse" />
            <span className="relative px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-kid-purple font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
              <Users2 className="w-4 h-4 inline-block mr-2 -mt-0.5" />
              {dict.about.team.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mt-4 leading-tight drop-shadow-sm">
            {dict.about.team.title}
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 font-medium mt-4 max-w-2xl mx-auto leading-relaxed">
            Dedicated professionals committed to nurturing your child's growth.
          </p>
        </div>

        {/* Cards — Testimonials glassmorphic card pattern */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.about.team.members.map((member, i) => {
            const color = stepColors[i % stepColors.length];
            return (
              <div key={i} className="team-card group">
                <div className="bg-white/70 backdrop-blur-xl p-8 pb-10 rounded-[2rem] border-2 border-white/60 shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 text-center relative overflow-hidden">
                  {/* Hover glow — Features card pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, transparent 40%, ${color.hex} 100%)` }} />

                  {/* Avatar */}
                  <div className="relative mb-8 inline-block">
                    <div className={`absolute inset-[-8px] bg-gradient-to-br ${color.grad} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md`} />
                    <div className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${color.grad} border-[6px] border-white shadow-xl flex items-center justify-center text-white text-4xl font-black group-hover:scale-105 transition-transform duration-500`}
                      style={{ boxShadow: `0 15px 30px ${color.hex}30` }}
                    >
                      {member.name.charAt(0)}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300"
                    style={{ backgroundImage: `linear-gradient(135deg, ${color.hex}, ${color.hex}DD)` }}
                  >
                    {member.name}
                  </h3>
                  <p className={`font-black text-sm uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${color.grad} mb-4`}>
                    {member.role}
                  </p>
                  <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full mb-4 group-hover:w-20 transition-all duration-500"
                    style={{ backgroundColor: `${color.hex}30` }} />
                  <p className="text-slate-600 font-medium leading-relaxed mb-6 px-2">
                    {member.bio}
                  </p>

                  {/* Social — reveal on hover */}
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {[Twitter, Linkedin, Mail].map((Icon, idx) => (
                      <button key={idx} className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-white hover:shadow-lg transition-all"
                        style={{ ['--tw-shadow-color' as any]: `${color.hex}40` }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = color.hex; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
