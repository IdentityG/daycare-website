"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PlayCircle, Star, ShieldCheck, Sparkles, Heart } from "lucide-react";

interface HeroProps {
  dict: any;
}

export default function Hero({ dict }: HeroProps) {
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
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden bg-gradient-to-br from-kid-blue/10 via-white to-kid-pink/10"
    >
      {/* Background Decorative Abstract Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="parallax-bg absolute top-[10%] left-[5%] w-64 h-64 bg-kid-yellow/20 rounded-full blur-3xl"></div>
        <div className="parallax-bg absolute bottom-[20%] right-[10%] w-96 h-96 bg-kid-purple/20 rounded-full blur-3xl"></div>
        <Sparkles className="parallax-fg absolute top-32 left-10 md:left-20 w-10 h-10 text-kid-yellow opacity-60" />
        <Star className="parallax-fg absolute bottom-40 left-1/2 w-8 h-8 text-kid-pink opacity-60" />
        <Heart className="parallax-fg absolute top-40 right-1/2 w-12 h-12 text-kid-green opacity-60" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="flex flex-col items-start text-left max-w-2xl mx-auto lg:mx-0">
          
          {/* IMPROVED CONTRAST: Badge */}
          <div className="reveal-text overflow-hidden mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-50 border border-pink-200 shadow-sm text-pink-600 font-extrabold text-sm uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5" />
              <span>Premium Childcare Center</span>
            </div>
          </div>
          
          <div className="overflow-hidden mb-6 pb-2">
            <h1 className="reveal-text text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              {dict.hero.title.split(' ').slice(0, -2).join(' ')}{' '}
              {/* IMPROVED CONTRAST: Gradient Text */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                {dict.hero.title.split(' ').slice(-2).join(' ')}
              </span>
            </h1>
          </div>
          
          <div className="overflow-hidden mb-10">
            {/* IMPROVED CONTRAST: Subtitle */}
            <p className="reveal-text text-lg sm:text-xl text-slate-700 font-medium leading-relaxed max-w-xl">
              {dict.hero.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            {/* IMPROVED CONTRAST: Primary Button */}
            <button className="hero-btn group relative px-8 py-4 bg-slate-900 text-white font-extrabold text-lg rounded-full w-full sm:w-auto shadow-[0_8px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">{dict.hero.cta}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
            
            {/* IMPROVED CONTRAST: Secondary Button */}
            <button className="hero-btn group flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-800 font-extrabold text-lg rounded-full w-full sm:w-auto border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm hover:shadow-md transition-all duration-300">
              <PlayCircle className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
              <span>{dict.hero.secondaryCta}</span>
            </button>
          </div>
        </div>

        {/* RIGHT: VISUALS & FLOATING CARDS */}
        <div className="hero-visual relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto mt-10 lg:mt-0">
          
          <div className="relative w-full h-full rounded-[40%_60%_70%_30%/40%_50%_60%_50%] overflow-hidden border-[8px] border-white shadow-2xl z-10 transition-all duration-1000 hover:rounded-[50%_50%_50%_50%]">
            <img 
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop" 
              alt="Happy children playing" 
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
          </div>

          <div className="floating-card float-up-down absolute top-10 -left-6 md:-left-12 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-500">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-xl">4.9/5</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Parents Love Us</p>
            </div>
          </div>

          <div className="floating-card float-down-up absolute bottom-12 -right-4 md:-right-8 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white flex items-center gap-4">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1503454537195-1dc534b47cb9?w=100&h=100&fit=crop&crop=faces" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Kid 1" />
              <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=100&h=100&fit=crop&crop=faces" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Kid 2" />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-500 text-white flex items-center justify-center font-bold text-xs">+</div>
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-xl">500+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Happy Kids</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Advanced SVG Wave blending into next section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#ffffff" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
}