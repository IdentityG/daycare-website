"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Baby, Puzzle, BookOpen, ArrowRight, Sparkles, Clock, Users, Star, Play, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Programs({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const programsData = [
    {
      ...dict.programs.infant,
      icon: Baby,
      color: "#3B82F6",
      lightColor: "#DBEAFE",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Sensory Play", "Tummy Time", "Music & Movement"],
      schedule: "7:00 AM - 6:00 PM",
      ratio: "1:3",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop"
    },
    {
      ...dict.programs.toddler,
      icon: Puzzle,
      color: "#F59E0B",
      lightColor: "#FEF3C7",
      gradient: "from-amber-500 to-orange-500",
      features: ["Creative Arts", "Social Skills", "Outdoor Exploration"],
      schedule: "7:00 AM - 6:00 PM",
      ratio: "1:4",
      image: "https://images.unsplash.com/photo-1503454537195-1dc534c77eba?w=800&auto=format&fit=crop"
    },
    {
      ...dict.programs.preschool,
      icon: BookOpen,
      color: "#10B981",
      lightColor: "#D1FAE5",
      gradient: "from-emerald-500 to-teal-500",
      features: ["Pre-Reading", "Math Concepts", "Science Discovery"],
      schedule: "7:00 AM - 6:00 PM",
      ratio: "1:6",
      image: "https://images.unsplash.com/photo-1587691592099-24045742c181?w=800&auto=format&fit=crop"
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
      
      // 1. Header Animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".programs-header",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      headerTl
        .fromTo(".header-badge",
          { y: 30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
        .fromTo(".header-title .word",
          { y: 50, opacity: 0, rotateX: -45 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(".header-subtitle",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );

      // 2. Program Cards - Horizontal Scroll Effect on Desktop
      const cards = gsap.utils.toArray<HTMLElement>(".program-card");
      
      cards.forEach((card, index) => {
        // Initial reveal animation
        gsap.fromTo(card,
          { 
            y: 100, 
            opacity: 0,
            rotateY: index % 2 === 0 ? -15 : 15
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        // Parallax effect on scroll
        gsap.to(card.querySelector(".card-image"), {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      // 3. Floating decorations
      gsap.utils.toArray<HTMLElement>(".float-decoration").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -25 : 25,
          rotation: i % 2 === 0 ? 10 : -10,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

      // 4. Stats counter animation
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = el.getAttribute("data-value") || "0";
        const isPercentage = target.includes("%");
        const numValue = parseInt(target.replace(/\D/g, ""));
        
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: numValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            onUpdate: function() {
              el.innerText = Math.round(Number(el.innerText)) + (isPercentage ? "%" : "+");
            }
          }
        );
      });

      // 5. CTA Section Animation
      gsap.fromTo(".cta-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [] });

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div 
          className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-[100px]"
          style={{ background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)" }}
        />
        <div 
          className="absolute bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-25 blur-[120px]"
          style={{ background: "linear-gradient(135deg, #10B981 0%, #F59E0B 100%)" }}
        />
        
        {/* Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #0F172A 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }}
        />

        {/* Floating Shapes */}
        <div className="float-decoration absolute top-32 left-[10%]">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rotate-12" />
        </div>
        <div className="float-decoration absolute top-60 right-[15%]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20" />
        </div>
        <div className="float-decoration absolute bottom-60 left-[20%]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 -rotate-12" />
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="programs-header text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="header-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-sm uppercase tracking-wider mb-6 shadow-xl shadow-slate-900/20">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{dict.programs.badge}</span>
          </div>
          
          <h2 className="header-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6" style={{ perspective: "1000px" }}>
            {dict.programs.title.split(' ').map((word: string, i: number) => (
              <span key={i} className="word inline-block mr-4" style={{ transformStyle: "preserve-3d" }}>
                {word}
              </span>
            ))}
          </h2>
          
          <p className="header-subtitle text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover age-appropriate programs designed to nurture your child's unique potential
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 md:mb-24">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "500+", label: "Happy Children" },
            { value: "98%", label: "Parent Satisfaction" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div 
                className="stat-number text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                data-value={stat.value}
              >
                0
              </div>
              <div className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Program Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {programsData.map((prog, i) => (
            <div
              key={i}
              className="program-card group relative"
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ perspective: "1000px" }}
            >
              <div 
                className={`relative bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 ${
                  activeCard === i 
                    ? "shadow-2xl scale-[1.02]" 
                    : "hover:shadow-xl"
                }`}
                style={{ 
                  transformStyle: "preserve-3d",
                  boxShadow: activeCard === i 
                    ? `0 25px 50px -12px ${prog.color}30` 
                    : undefined
                }}
              >
                {/* Image Container */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <div className="card-image absolute inset-0">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-40"
                    style={{ background: `linear-gradient(180deg, transparent 0%, ${prog.color}90 100%)` }}
                  />
                  
                  {/* Age Badge */}
                  <div 
                    className="absolute top-4 left-4 px-4 py-2 rounded-xl font-bold text-sm backdrop-blur-md border border-white/30 text-white shadow-lg"
                    style={{ background: `${prog.color}CC` }}
                  >
                    {prog.age}
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                      style={{ color: prog.color }}
                    >
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </button>
                  </div>

                  {/* Floating Icon */}
                  <div 
                    className="absolute bottom-4 right-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: prog.color }}
                  >
                    <prog.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300" 
                    style={{ 
                      backgroundImage: activeCard === i ? `linear-gradient(135deg, ${prog.color}, ${prog.color}CC)` : undefined 
                    }}
                  >
                    {prog.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {prog.desc}
                  </p>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {prog.features.map((feature, fi) => (
                      <span
                        key={fi}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-default"
                        style={{ 
                          background: hoveredFeature === i * 10 + fi ? prog.color : prog.lightColor,
                          color: hoveredFeature === i * 10 + fi ? "white" : prog.color
                        }}
                        onMouseEnter={() => setHoveredFeature(i * 10 + fi)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Info Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{prog.schedule.split(' - ')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{prog.ratio}</span>
                      </div>
                    </div>
                    
                    <button 
                      className="flex items-center gap-1 font-bold text-sm transition-all duration-300 group/btn"
                      style={{ color: prog.color }}
                    >
                      <span>Details</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div 
                  className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ borderColor: prog.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section relative">
          <div 
            className="relative rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)"
            }}
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 blur-[80px]"
                style={{ background: "linear-gradient(135deg, #3B82F6 0%, #10B981 100%)" }}
              />
              <div 
                className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-15 blur-[60px]"
                style={{ background: "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)" }}
              />
              
              {/* Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-amber-400 font-bold text-sm mb-6">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>Limited Spots Available</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Ready to Give Your Child the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Best Start?
                  </span>
                </h3>
                
                <p className="text-slate-300 text-lg leading-relaxed">
                  Schedule a tour today and see why families choose Good Seed Daycare
                </p>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Schedule Tour
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-lg backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                  Call Us
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10">
                {[
                  "Licensed & Accredited",
                  "CPR Certified Staff",
                  "Secure Facility",
                  "Organic Meals"
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}