"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PlayCircle, Star, ShieldCheck, Sparkles, Heart } from "lucide-react";

import { Dictionary } from "@/types/dictionary";

interface HeroProps {
  dict: Dictionary;
  lang: string;
}

export default function Hero({ dict, lang }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      };

      gsap.to(".parallax-bg", {
        x: mouseRef.current.x * 20,
        y: mouseRef.current.y * 20,
        ease: "power2.out",
        duration: 1,
      });
      gsap.to(".parallax-fg", {
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

    tl.fromTo(
      ".reveal-text",
      { y: 100, opacity: 0, rotateZ: 5 },
      { y: 0, opacity: 1, rotateZ: 0, duration: 1, stagger: 0.15, ease: "power4.out" }
    )
      .fromTo(
        ".hero-btn",
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.5"
      )
      .fromTo(
        ".hero-visual",
        { scale: 0.9, opacity: 0, x: 50 },
        { scale: 1, opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        ".floating-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.5)" },
        "-=0.5"
      );

    gsap.to(".float-up-down", {
      y: -15, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    gsap.to(".float-down-up", {
      y: 15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5,
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      style={{ visibility: "hidden" }}
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden bg-[#FAFAFA] z-10"
    >
      {/* Background Decorative Abstract Shapes & Glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Soft Animated Background Gradients */}
        <div className="parallax-bg absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-kid-pink/30 to-kid-purple/30 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="parallax-bg absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-kid-blue/30 to-kid-green/30 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="parallax-bg absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-gradient-to-tr from-yellow-300/20 to-orange-300/20 rounded-full blur-[80px] mix-blend-multiply"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        {/* Floating Icons */}
        <Sparkles className="parallax-fg absolute top-32 left-10 md:left-24 w-12 h-12 text-kid-yellow opacity-80 drop-shadow-lg" />
        <Star className="parallax-fg absolute bottom-40 left-1/3 w-10 h-10 text-kid-pink opacity-80 drop-shadow-lg" fill="currentColor" />
        <Heart className="parallax-fg absolute top-40 right-1/4 w-14 h-14 text-kid-green opacity-80 drop-shadow-lg" fill="currentColor" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10 mt-10 lg:mt-0">

        {/* LEFT: TEXT CONTENT */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

          {/* IMPROVED CONTRAST: Glossy Badge */}
          <div className="reveal-text overflow-hidden mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-kid-purple font-extrabold text-sm uppercase tracking-wider relative overflow-hidden group hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)] transition-all cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-kid-purple/0 via-kid-purple/10 to-kid-purple/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <ShieldCheck className="w-5 h-5 text-kid-pink" />
              <span>Premium Childcare Experience</span>
            </div>
          </div>

          <div className="overflow-hidden mb-6 pb-2">
            <h1 className="reveal-text text-5xl sm:text-6xl lg:text-[5.5rem] font-black text-slate-900 leading-[1.05] tracking-tight drop-shadow-sm">
              {dict.hero.title.split(' ').slice(0, -2).join(' ')}{' '}
              {/* Vibrant Gradient Text */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kid-pink via-purple-500 to-kid-blue inline-block pb-2">
                {dict.hero.title.split(' ').slice(-2).join(' ')}
              </span>
            </h1>
          </div>

          <div className="overflow-hidden mb-12">
            <p className="reveal-text text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
              {dict.hero.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 w-full sm:w-auto">
            {/* Primary Action Button - Glowing Gradient */}
            <Link
              href={`/${lang}/programs`}
              className="hero-btn group relative px-8 py-4 bg-gradient-to-r from-kid-pink to-orange-400 text-white font-black text-lg rounded-full w-full sm:w-auto shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)] hover:-translate-y-1 transition-all duration-300 border border-white/20 select-none flex items-center justify-center text-center"
            >
              <span className="relative z-10 block w-full text-center">{dict.hero.cta}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-kid-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </Link>

            {/* Secondary Action Button - Glassmorphic */}
            <Link
              href={`/${lang}/contact`}
              className="hero-btn group flex items-center justify-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-md text-slate-800 font-extrabold text-lg rounded-full w-full sm:w-auto border border-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white transition-all duration-300 select-none"
            >
              <PlayCircle className="w-6 h-6 text-kid-blue fill-kid-blue/20 group-hover:scale-110 group-hover:text-kid-purple transition-all duration-300" />
              <span className="group-hover:text-kid-purple transition-colors duration-300">{dict.hero.secondaryCta}</span>
            </Link>
          </div>
        </div>

        {/* RIGHT: VIBRANT VISUALS & FLOATING CARDS */}
        <div className="hero-visual relative w-full aspect-square max-w-[550px] mx-auto lg:ml-auto mt-8 lg:mt-0">

          {/* Main Glowing Background behind image */}
          <div className="absolute inset-4 bg-gradient-to-tr from-kid-pink via-kid-purple to-kid-blue rounded-full blur-3xl opacity-30 animate-pulse"></div>

          <div className="relative w-full h-full rounded-[40%_60%_70%_30%/40%_50%_60%_50%] overflow-hidden border-8 border-white/80 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 transition-all duration-1000 hover:rounded-[50%_50%_50%_50%] group bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop"
              alt="Happy children playing"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
            />
            {/* Inner Sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-kid-purple/20 via-transparent to-white/30 mix-blend-overlay"></div>
          </div>

          {/* Trust Badge 1 - Left Floating */}
          <div className="floating-card float-up-down absolute top-8 -left-2 sm:-left-8 z-20 bg-white/90 backdrop-blur-xl px-5 py-3.5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-white/60 flex items-center gap-4">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-2.5 rounded-xl text-yellow-500 shadow-sm border border-yellow-200/50">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-500" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-xl leading-none mb-1">4.9/5</p>
              <p className="text-[10px] font-black text-kid-purple uppercase tracking-wider">Parents Love Us</p>
            </div>
          </div>

          {/* Trust Badge 2 - Right Floating */}
          <div className="floating-card float-down-up absolute bottom-12 -right-2 sm:-right-8 z-20 bg-white/90 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-white/60 flex items-center gap-4">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop&crop=faces" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" alt="Teacher" />
              <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=100&h=100&fit=crop&crop=faces" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" alt="Kid" />
              <div className="w-10 h-10 rounded-full border-[3px] border-white bg-gradient-to-br from-kid-green to-teal-400 text-white flex items-center justify-center font-black text-sm shadow-sm relative z-10">
                +
              </div>
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-xl leading-none mb-1">500+</p>
              <p className="text-[10px] font-black text-kid-green uppercase tracking-wider">Happy Kids</p>
            </div>
          </div>

        </div>
      </div>

      {/* Advanced SVG Wave blending into next section */}
      <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg className="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L1200 120 1200 0C1200 0 962.5 106.5 600 106.5 237.5 106.5 0 0 0 0L0 120Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
}