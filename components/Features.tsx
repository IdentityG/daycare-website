"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GraduationCap, ShieldCheck, Apple, Palette, Users, Heart, Star, Clock, Sparkles, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Extended feature data with animations and sub-features
  const featuresData = [
    {
      title: dict.features.cards[0]?.title || "Academic Excellence",
      desc: dict.features.cards[0]?.desc || "Proven curriculum designed to ignite curiosity and build foundational skills",
      icon: GraduationCap,
      color: "#3B82F6",
      lightColor: "#DBEAFE",
      subFeatures: ["STEM Curriculum", "Language Immersion", "Cognitive Development"],
      stats: "94%",
      statLabel: "Success Rate"
    },
    {
      title: dict.features.cards[1]?.title || "Safety First",
      desc: dict.features.cards[1]?.desc || "Advanced security systems and trained staff ensure your child is always protected",
      icon: ShieldCheck,
      color: "#10B981",
      lightColor: "#D1FAE5",
      subFeatures: ["24/7 Security", "CPR Certified", "Secure Entry"],
      stats: "100%",
      statLabel: "Safety Compliant"
    },
    {
      title: dict.features.cards[2]?.title || "Nutrition & Wellness",
      desc: dict.features.cards[2]?.desc || "Organic meals and daily physical activities promote healthy growth and development",
      icon: Apple,
      color: "#F59E0B",
      lightColor: "#FEF3C7",
      subFeatures: ["Organic Meals", "Daily Exercise", "Sleep Schedules"],
      stats: "5+",
      statLabel: "Meals Daily"
    },
    {
      title: dict.features.cards[3]?.title || "Creative Expression",
      desc: dict.features.cards[3]?.desc || "Art, music, and movement programs unleash your child's imagination and creativity",
      icon: Palette,
      color: "#EC4899",
      lightColor: "#FCE7F3",
      subFeatures: ["Art Studio", "Music Lessons", "Dance & Movement"],
      stats: "50+",
      statLabel: "Creative Programs"
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
      
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
            el.innerText = Math.round(Number(el.innerText));
          }
        });
      });

    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [] });

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)"
      }}
    >
      {/* Background Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-[3px] h-[3px] rounded-full"
            style={{
              backgroundColor: [
                "#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"
              ][i % 5],
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Background Decorative Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-3xl opacity-20 blur-xl" 
        style={{ background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)" }} />
      <div className="absolute bottom-24 right-12 w-72 h-72 rounded-[50%] opacity-15 blur-2xl" 
        style={{ background: "linear-gradient(135deg, #10B981 0%, #F59E0B 100%)" }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 3px 3px, #64748b 1px, transparent 0)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="container mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        
        {/* Advanced Header */}
        <div className="feat-header text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="relative mb-8 mx-auto">
            <div className="badge-glow absolute inset-0 w-24 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-xl opacity-75 animate-pulse" />
            <div className="header-badge relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white font-bold text-sm uppercase tracking-wider shadow-2xl shadow-slate-900/30 border border-white/20 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span>{dict.features.badge}</span>
              <Sparkles className="w-4 h-4 ml-1 animate-pulse" />
            </div>
          </div>
          
          <h2 
            className="header-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {dict.features.title.split('').map((char: string, i: number) => (
              char === ' ' ? 
              <span key={i} className="char inline-block w-6 h-24 md:h-28" /> :
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
            Everything your child needs to thrive, from world-class curriculum to nurturing caregivers
          </p>
        </div>

        {/* Features Grid */}
        <div className="feat-grid grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {featuresData.map((feature, i) => (
            <div
              key={i}
              className={`feat-card relative group cursor-pointer transition-all duration-500 ${hoveredCard === i ? 'scale-[1.02]' : ''}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ 
                perspective: "1200px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Card Background */}
              <div 
                className="card-bg absolute inset-0 rounded-3xl -z-10 transition-all duration-700"
                style={{
                  background: hoveredCard === i ? 
                    `linear-gradient(135deg, ${feature.lightColor}22 0%, white 100%)` :
                    "linear-gradient(135deg, white 0%, #f8fafc 100%)",
                  boxShadow: hoveredCard === i ? 
                    `0 25px 50px -12px ${feature.color}40` : 
                    "0 10px 30px rgba(0,0,0,0.05)"
                }}
              />

              {/* Card Content */}
              <div className="relative p-8 lg:p-10 rounded-3xl transition-all duration-500 hover:bg-white/50 backdrop-blur-sm">
                
                {/* Icon Container */}
                <div 
                  className="feat-icon relative mx-auto w-20 h-20 lg:w-24 lg:h-24 mb-6 lg:mb-8 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500"
                  style={{
                    background: hoveredCard === i ? 
                      `linear-gradient(135deg, ${feature.color}, ${feature.color}CC)` : 
                      feature.lightColor,
                    boxShadow: hoveredCard === i ? 
                      `0 15px 35px ${feature.color}40` : 
                      `0 10px 25px ${feature.color}20`
                  }}
                >
                  <feature.icon 
                    className="w-10 h-10 lg:w-12 lg:h-12 text-white drop-shadow-lg"
                    style={{ filter: hoveredCard === i ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" : undefined }}
                  />
                  
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl blur-xl opacity-50"
                    style={{ 
                      backgroundColor: feature.color,
                      opacity: hoveredCard === i ? 1 : 0.3
                    }}
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl lg:text-2xl font-black mb-4 leading-tight transition-all duration-300"
                    style={{
                      backgroundImage: hoveredCard === i ? 
                        `linear-gradient(135deg, ${feature.color}, ${feature.color}CC)` : 
                        "none",
                      backgroundClip: hoveredCard === i ? "text" : undefined,
                      WebkitBackgroundClip: hoveredCard === i ? "text" : undefined,
                      color: hoveredCard === i ? "transparent" : "#0F172A"
                    }}
                  >
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 lg:text-lg leading-relaxed mb-6 px-2">
                    {feature.desc}
                  </p>

                  {/* Stat Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 border text-slate-700 font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="stat-count text-lg font-black" data-target={feature.stats}>
                      0
                    </div>
                    <span>{feature.statLabel}</span>
                  </div>

                  {/* Sub-features */}
                  <div className={`mt-6 pt-4 border-t border-slate-100 transition-all duration-500 ${
                    hoveredCard === i ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0'
                  }`}>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {feature.subFeatures.map((subFeat: string, si: number) => (
                        <span 
                          key={si}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-slate-100 to-slate-200 hover:bg-slate-200 transition-all cursor-default shadow-sm"
                          style={{ color: "#475569" }}
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
                className="absolute inset-0 rounded-3xl border-4 pointer-events-none opacity-0 transition-opacity duration-300"
                style={{ 
                  borderColor: feature.color,
                  opacity: hoveredCard === i ? 1 : 0
                }}
              />

              {/* Card Tilt Effect */}
              <div className={`absolute inset-[-10px] rounded-3xl bg-gradient-to-r opacity-0 transition-all duration-500 pointer-events-none ${
                hoveredCard === i ? 'opacity-100' : ''
              }`}
                style={{ background: `${feature.color}08` }}
              />
            </div>
          ))}

          {/* Center Divider for 2-column layout */}
          <div className="hidden xl:block absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
            <div 
              className="w-px h-64 bg-gradient-to-b from-slate-200 to-slate-300 opacity-50"
              style={{ filter: "blur(1px)" }}
            />
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="flex justify-center gap-4 mt-16 md:mt-24">
          {[
            { label: "Tour Facility", icon: Users, color: "#3B82F6" },
            { label: "Meet Teachers", icon: Heart, color: "#10B981" }
          ].map((btn, i) => (
            <button
              key={i}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 hover:-translate-y-2"
              style={{ 
                background: "linear-gradient(135deg, white 0%, #f8fafc 100%)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                style={{ 
                  background: hoveredCard === i ? btn.color : `${btn.color}20`,
                  color: hoveredCard === i ? "white" : btn.color
                }}
              >
                <btn.icon className="w-5 h-5" />
              </div>
              <span className="transition-colors duration-300" 
                style={{ color: hoveredCard === i ? btn.color : "#0F172A" }}
              >
                {btn.label}
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm" 
                style={{ backgroundColor: `${btn.color}20` }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}