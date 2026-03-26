"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Leaf, ShieldCheck, Heart, Sparkles, Star, Sun, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy({ dict }: { dict: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Kill any existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger?.toString().includes('phil-') || 
          trigger.vars.trigger?.toString().includes('feature-') ||
          trigger.vars.trigger?.toString().includes('scrub-')) {
        trigger.kill();
      }
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
      
      // 1. Simple Fade In for Text Elements
      gsap.fromTo(".scrub-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".scrub-text",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Badge Animation
      gsap.fromTo(".phil-badge",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".phil-badge",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Description Line Animation
      gsap.fromTo(".description-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".description-container",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // 4. Feature Cards Stagger
      gsap.fromTo(".feature-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // 5. Image Reveal Animation
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".phil-image-wrapper",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      imgTl
        .fromTo(".phil-image-wrapper",
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1, ease: "power4.out" }
        )
        .fromTo(".phil-image",
          { scale: 1.3 },
          { scale: 1, duration: 1.2, ease: "power3.out" },
          "<"
        )
        .fromTo(".image-content",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );

      // 6. Stamp Animation
      gsap.fromTo(".stamp-container",
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ".stamp-container",
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );

      // 7. Continuous Stamp Rotation
      gsap.to(".stamp-text", {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none"
      });

      // 8. Floating Elements Animation
      gsap.utils.toArray<HTMLElement>(".floating-el").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -20 : 20,
          duration: 2.5 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      });

      // 9. Stats Counter Animation
      gsap.fromTo(".stat-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-row",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // 10. Rating Badge Animation
      gsap.fromTo(".rating-badge",
        { x: -50, opacity: 0, rotation: -10 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".phil-image-wrapper",
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

    });

    // Cleanup function
    return () => {
      mm.revert();
    };

  }, { scope: containerRef, dependencies: [] });

  const features = [
    {
      icon: ShieldCheck,
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-400/20",
      glowClass: "group-hover:shadow-emerald-400/25",
      title: dict.philosophy.point1,
    },
    {
      icon: Heart,
      colorClass: "text-pink-400",
      bgClass: "bg-pink-400/20",
      glowClass: "group-hover:shadow-pink-400/25",
      title: dict.philosophy.point2,
    },
    {
      icon: Star,
      colorClass: "text-amber-400",
      bgClass: "bg-amber-400/20",
      glowClass: "group-hover:shadow-amber-400/25",
      title: "Creative Excellence",
    },
    {
      icon: Sparkles,
      colorClass: "text-violet-400",
      bgClass: "bg-violet-400/20",
      glowClass: "group-hover:shadow-violet-400/25",
      title: "Joyful Learning",
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden rounded-t-[2.5rem] -mt-10 z-20"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)"
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
          style={{ background: "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)" }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-25 blur-[100px]"
          style={{ background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)" }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* Floating Icons */}
        <div className="floating-el absolute top-24 left-[10%] text-amber-400/20">
          <Sun className="w-12 h-12" />
        </div>
        <div className="floating-el absolute top-40 right-[15%] text-blue-400/15">
          <Cloud className="w-16 h-16" />
        </div>
        <div className="floating-el absolute bottom-32 left-[20%] text-pink-400/15">
          <Star className="w-10 h-10" />
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* LEFT COLUMN - Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            
            {/* Badge */}
            <div className="phil-badge inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">
                {dict.philosophy.badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8">
              <span className="scrub-text block text-white">
                {dict.philosophy.title.split(' ')[0]}
              </span>
              <span className="scrub-text block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                {dict.philosophy.title.split(' ').slice(1).join(' ')}
              </span>
            </h2>

            {/* Description */}
            <div className="description-container relative mb-12">
              <div 
                className="description-line absolute left-0 top-0 bottom-0 w-1 rounded-full origin-top"
                style={{ background: "linear-gradient(180deg, #10B981 0%, #3B82F6 50%, #EC4899 100%)" }}
              />
              <p className="scrub-text text-lg md:text-xl text-slate-300 leading-relaxed pl-6 max-w-xl">
                {dict.philosophy.description}
              </p>
            </div>

            {/* Feature Cards */}
            <div className="features-grid grid sm:grid-cols-2 gap-4 md:gap-5 mb-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`feature-card group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-xl ${feature.glowClass} cursor-pointer`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${feature.bgClass} ${feature.colorClass} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-white font-bold text-lg leading-snug group-hover:text-emerald-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="stats-row flex flex-wrap gap-8 pt-8 border-t border-white/10">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "500+", label: "Happy Families" },
                { value: "100%", label: "Love & Care" }
              ].map((stat, i) => (
                <div key={i} className="stat-item text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Visual */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Rating Badge */}
              <div className="rating-badge absolute -top-4 -left-4 md:top-6 md:-left-6 z-30 bg-white rounded-2xl p-4 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-extrabold text-lg leading-none">5.0</div>
                    <div className="text-slate-500 text-xs mt-0.5">200+ Reviews</div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="phil-image-wrapper relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                <div className="aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop"
                    alt="Teacher and child learning together"
                    className="phil-image w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent" />
                
                {/* Bottom Content */}
                <div className="image-content absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="text-emerald-400 font-bold text-sm">Trusted by Parents</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    "A nurturing place where children bloom with joy and confidence."
                  </p>
                </div>

                {/* Border Frame */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/10 pointer-events-none" />
              </div>

              {/* Rotating Stamp */}
              <div className="stamp-container absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 z-20">
                <div className="relative w-28 h-28 md:w-36 md:h-36">
                  {/* Outer Ring */}
                  <div 
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                      boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4)"
                    }}
                  />
                  
                  {/* Inner Circle */}
                  <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
                    <Leaf className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 relative z-10" />
                  </div>
                  
                  {/* Rotating Text */}
                  <svg 
                    viewBox="0 0 100 100" 
                    className="stamp-text absolute inset-0 w-full h-full"
                  >
                    <defs>
                      <path
                        id="textCircle"
                        d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                        fill="none"
                      />
                    </defs>
                    <text 
                      className="text-[8px] md:text-[7px] font-bold uppercase tracking-[0.2em] fill-emerald-400"
                    >
                      <textPath href="#textCircle" startOffset="0%">
                        • GOOD SEED DAYCARE • EST 2024 • NURTURE & GROW •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div 
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-60 pointer-events-none"
                style={{ background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)" }}
              />
              <div 
                className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
        <svg 
          viewBox="0 0 1440 64" 
          fill="none" 
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0 32C240 64 480 64 720 32C960 0 1200 0 1440 32V64H0V32Z"
            fill="rgba(255,255,255,0.02)"
          />
        </svg>
      </div>
    </section>
  );
}