"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GraduationCap, ShieldCheck, Apple, Palette, Users, Heart, Star, Clock, Sparkles, Zap } from "lucide-react";

import { Link } from "lucide-react";
import NextLink from "next/link";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function Features({ dict, lang }: { dict: Dictionary; lang: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const featuresData = [
    {
      title: dict.features.cards[0].title,
      desc: dict.features.cards[0].desc,
      icon: GraduationCap,
      color: "#8B5CF6", // Magical Purple
      lightColor: "#EDE9FE",
      subFeatures: dict.features.cards[0].subFeatures,
      stats: "94%",
      statLabel: dict.features.cards[0].statLabel
    },
    {
      title: dict.features.cards[1].title,
      desc: dict.features.cards[1].desc,
      icon: ShieldCheck,
      color: "#10B981", // Nature Green
      lightColor: "#D1FAE5",
      subFeatures: dict.features.cards[1].subFeatures,
      stats: "100%",
      statLabel: dict.features.cards[1].statLabel
    },
    {
      title: dict.features.cards[2].title,
      desc: dict.features.cards[2].desc,
      icon: Apple,
      color: "#F59E0B", // Sunny Yellow
      lightColor: "#FEF3C7",
      subFeatures: dict.features.cards[2].subFeatures,
      stats: "5+",
      statLabel: dict.features.cards[2].statLabel
    },
    {
      title: dict.features.cards[3].title,
      desc: dict.features.cards[3].desc,
      icon: Palette,
      color: "#EC4899", // Playful Pink
      lightColor: "#FCE7F3",
      subFeatures: dict.features.cards[3].subFeatures,
      stats: "50+",
      statLabel: dict.features.cards[3].statLabel
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      
      // 1. Header Advanced Animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".feat-header",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      headerTl
        .fromTo(".badge-glow",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
        .fromTo(".header-badge",
          { y: 30, opacity: 0, rotation: -180 },
          { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(2)" },
          "-=0.3"
        )
        .fromTo(".header-title .char",
          { y: 60, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(".header-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        );

      // 2. Cards 3D Reveal & Parallax
      const cards = gsap.utils.toArray<HTMLElement>(".feat-card");
      
      cards.forEach((card, index) => {
        // Initial 3D reveal
        gsap.fromTo(card,
          { 
            y: 100, 
            rotationY: (index % 2 === 0 ? -20 : 20),
            rotationX: -30,
            opacity: 0
          },
          {
            y: 0,
            rotationY: 0,
            rotationX: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Parallax background on scroll
        gsap.to(card.querySelector(".card-bg"), {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // Icon continuous float
        gsap.to(card.querySelector(".feat-icon"), {
          y: -8,
          rotation: 360,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });

      // 3. Floating particles
      gsap.utils.toArray<HTMLElement>(".particle").forEach((particle, i) => {
        gsap.set(particle, {
          x: gsap.utils.random(-150, 150),
          y: gsap.utils.random(-150, 150)
        });
        
        gsap.to(particle, {
          x: "+=" + gsap.utils.random(-100, 100),
          y: "+=" + gsap.utils.random(-100, 100),
          scale: gsap.utils.random(0.5, 1.2),
          opacity: gsap.utils.random(0.4, 0.8),
          duration: gsap.utils.random(4, 8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      });

      // 4. Stats counter for sub-features
      gsap.utils.toArray<HTMLElement>(".stat-count").forEach((el) => {
        const target = el.getAttribute("data-target") || "0";
        gsap.to(el, {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onUpdate: function() {
            el.innerText = Math.round(Number(el.innerText)).toString();
          }
        });
      });

    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [] });

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[#FAFAFA]"
    >
      {/* Background Decorative Shapes - Vibrant Edition */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-kid-purple/20 to-kid-pink/20 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-kid-green/20 to-kid-yellow/20 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-gradient-to-r from-orange-300/10 to-kid-pink/10 rounded-full blur-[80px] mix-blend-multiply" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="container mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        
        {/* Advanced Header - Glassmorphic */}
        <div className="feat-header text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="relative mb-8 mx-auto flex justify-center">
            <div className="badge-glow absolute inset-0 w-32 h-12 bg-gradient-to-r from-kid-pink to-orange-400 rounded-full blur-xl opacity-40 animate-pulse" />
            <div className="header-badge relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 text-kid-purple font-extrabold text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
              <Zap className="w-5 h-5 text-kid-pink" />
              <span>{dict.features.badge}</span>
              <Sparkles className="w-4 h-4 ml-1 text-orange-400 animate-pulse" />
            </div>
          </div>
          
          <h2 
            className="header-title text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] mb-6 tracking-tight text-slate-900 drop-shadow-sm"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {dict.features.title.split('').map((char: string, i: number) => (
              char === ' ' ? 
              <span key={i} className="char inline-block w-4 sm:w-6 h-12 md:h-16" /> :
              <span 
                key={i} 
                className="char inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char}
              </span>
            ))}
          </h2>
          
          <p className="header-subtitle text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            {dict.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="feat-grid grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {featuresData.map((feature, i) => (
            <div
              key={i}
              className={`feat-card relative group cursor-pointer transition-all duration-500 ${hoveredCard === i ? 'scale-[1.02] z-20' : 'z-10'}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ 
                perspective: "1200px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Card Background - Frosted Glass */}
              <div 
                className="card-bg absolute inset-0 rounded-[2.5rem] -z-10 transition-all duration-700 backdrop-blur-2xl border-2 border-white/60"
                style={{
                  background: hoveredCard === i ? 
                    `linear-gradient(135deg, white 40%, ${feature.lightColor} 100%)` :
                    "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                  boxShadow: hoveredCard === i ? 
                    `0 25px 50px -12px ${feature.color}30` : 
                    "0 15px 35px rgba(0,0,0,0.04)"
                }}
              />

              {/* Card Content */}
              <div className="relative p-8 lg:p-10 rounded-[2.5rem] transition-all duration-500 h-full flex flex-col items-center">
                
                {/* Icon Container - Vibrant Gradients */}
                <div 
                  className="feat-icon relative mx-auto w-20 h-20 lg:w-24 lg:h-24 mb-6 lg:mb-8 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
                  style={{
                    background: hoveredCard === i ? 
                      `linear-gradient(135deg, ${feature.color}, ${feature.color}DD)` : 
                      feature.lightColor,
                    boxShadow: hoveredCard === i ? 
                      `0 20px 40px ${feature.color}50` : 
                      `0 10px 25px ${feature.color}20`
                  }}
                >
                  <feature.icon 
                    className="w-10 h-10 lg:w-12 lg:h-12 drop-shadow-lg transition-colors duration-500"
                    style={{ 
                      color: hoveredCard === i ? "white" : feature.color,
                      filter: hoveredCard === i ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" : undefined 
                    }}
                  />
                  
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-[2rem] blur-xl opacity-50"
                    style={{ 
                      backgroundColor: feature.color,
                      opacity: hoveredCard === i ? 1 : 0.2
                    }}
                  />
                </div>

                {/* Content */}
                <div className="text-center flex-grow flex flex-col">
                  <h3 className="text-xl lg:text-2xl font-black mb-4 leading-tight transition-all duration-300"
                    style={{ color: hoveredCard === i ? feature.color : "#0F172A" }}
                  >
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 font-medium leading-relaxed mb-6 px-2 flex-grow">
                    {feature.desc}
                  </p>

                  {/* Stat Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-300 mx-auto w-max">
                    <div className="stat-count text-lg font-black" style={{ color: feature.color }} data-target={feature.stats}>
                      0
                    </div>
                    <span className="text-slate-500 font-bold tracking-wide text-sm">{feature.statLabel}</span>
                  </div>

                  {/* Sub-features */}
                  <div className={`mt-6 pt-6 border-t border-slate-100 transition-all duration-500 ${
                    hoveredCard === i ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {feature.subFeatures.map((subFeat: string, si: number) => (
                        <span 
                          key={si}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-100 shadow-sm transition-all cursor-default"
                          style={{ color: feature.color }}
                        >
                          {subFeat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Magnetic Border Effect */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] border-[3px] pointer-events-none transition-all duration-500"
                style={{ 
                  borderColor: feature.color,
                  opacity: hoveredCard === i ? 0.4 : 0,
                  transform: hoveredCard === i ? 'scale(1.02)' : 'scale(1)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Floating Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16 md:mt-24">
          {[
            { label: dict.features.ctaTour, icon: Users, color: "#8B5CF6", href: `/${lang}/contact` },
            { label: dict.features.ctaTeachers, icon: Heart, color: "#EC4899", href: `/${lang}/about` }
          ].map((btn, i) => (
            <NextLink
              key={i}
              href={btn.href}
              className="group relative flex items-center justify-center sm:justify-start gap-4 px-8 py-4 rounded-full font-black text-sm transition-all duration-500 hover:-translate-y-2 border border-white/80 bg-white/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] w-full sm:w-auto"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${btn.color}, ${btn.color}DD)`,
                  boxShadow: `0 8px 20px ${btn.color}40`,
                }}
              >
                <btn.icon className="w-5 h-5 text-white" />
              </div>
              <span className="transition-colors duration-300 uppercase tracking-widest text-slate-800 group-hover:text-kid-purple">
                {btn.label}
              </span>
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  );
}