"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Sparkles, Star, Heart } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

export default function ContactHero({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      };
      gsap.to(".c-parallax-bg", {
        x: mouseRef.current.x * 20,
        y: mouseRef.current.y * 20,
        ease: "power2.out",
        duration: 1,
      });
      gsap.to(".c-parallax-fg", {
        x: mouseRef.current.x * -30,
        y: mouseRef.current.y * -30,
        ease: "power2.out",
        duration: 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    gsap.set(containerRef.current, { visibility: "visible" });

    tl.fromTo(".c-reveal",
      { y: 100, opacity: 0, rotateZ: 5 },
      { y: 0, opacity: 1, rotateZ: 0, duration: 1, stagger: 0.15, ease: "power4.out" }
    );

    gsap.to(".c-float-up", {
      y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(".c-float-down", {
      y: 15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5,
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      style={{ visibility: "hidden" }}
      className="relative min-h-[85vh] flex items-center pt-28 pb-20 overflow-hidden bg-[#FAFAFA] z-10"
    >
      {/* Background — identical pattern to Home Hero */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="c-parallax-bg absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-kid-pink/30 to-kid-purple/30 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="c-parallax-bg absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-kid-blue/30 to-kid-green/30 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="c-parallax-bg absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-gradient-to-tr from-yellow-300/20 to-orange-300/20 rounded-full blur-[80px] mix-blend-multiply" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        {/* Floating Icons — parallax like Home Hero */}
        <Sparkles className="c-parallax-fg absolute top-32 left-10 md:left-24 w-12 h-12 text-kid-yellow opacity-80 drop-shadow-lg" />
        <Star className="c-parallax-fg absolute bottom-40 left-1/3 w-10 h-10 text-kid-pink opacity-80 drop-shadow-lg" fill="currentColor" />
        <Heart className="c-parallax-fg absolute top-40 right-1/4 w-14 h-14 text-kid-green opacity-80 drop-shadow-lg" fill="currentColor" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-5xl">

        {/* Badge — same glassmorphic pattern as Home Hero */}
        <div className="c-reveal overflow-hidden mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-kid-purple font-extrabold text-sm uppercase tracking-wider relative overflow-hidden group hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)] transition-all cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-kid-purple/0 via-kid-purple/10 to-kid-purple/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <ShieldCheck className="w-5 h-5 text-kid-pink" />
            <span>{dict.contactPage.hero.badge}</span>
          </div>
        </div>

        {/* Title — exactly Home Hero pattern: slate-900 + gradient last words */}
        <div className="overflow-hidden mb-6 pb-2">
          <h1 className="c-reveal text-5xl sm:text-6xl lg:text-[5.5rem] font-black text-slate-900 leading-[1.05] tracking-tight drop-shadow-sm">
            {dict.contactPage.hero.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kid-pink via-purple-500 to-kid-blue inline-block pb-2">
              {dict.contactPage.hero.title.split(' ').slice(-1).join(' ')}
            </span>
          </h1>
        </div>

        {/* Subtitle — slate-600 like Home Hero */}
        <div className="overflow-hidden mb-12">
          <p className="c-reveal text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {dict.contactPage.hero.subtitle}
          </p>
        </div>
      </div>

      {/* Wave divider — same SVG as Home Hero */}
      <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg className="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L1200 120 1200 0C1200 0 962.5 106.5 600 106.5 237.5 106.5 0 0 0 0L0 120Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
