"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Dramatic Scale-up Entry
    gsap.fromTo(".contact-card",
      { scale: 0.9, opacity: 0, y: 50 },
      {
        scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    );

    // Staggered Form Inputs Reveal
    gsap.fromTo(".form-element",
      { x: 30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".contact-card", start: "top 60%" }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#FAFAFA] px-6 md:px-12 relative overflow-hidden">
      
      {/* Absolute Background Orbs behind the card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="w-[800px] h-[800px] bg-gradient-to-tr from-kid-pink/20 to-kid-blue/20 rounded-full blur-[120px] mix-blend-multiply opacity-50 absolute"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Massive Contact Card */}
        <div className="contact-card bg-gradient-to-br from-[#1e1b4b] to-[#3b0764] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row relative border-4 border-white/50 backdrop-blur-3xl">
          
          {/* Decorative Background Blobs inside card */}
          <div className="absolute top-[-10%] right-1/2 w-80 h-80 bg-kid-green/30 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-kid-pink/30 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Inner Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay pointer-events-none"></div>

          {/* LEFT: Info Section */}
          <div className="p-10 lg:p-20 lg:w-5/12 flex flex-col justify-center relative z-10">
            <span className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-kid-green font-extrabold text-sm uppercase tracking-wider mb-6 inline-table w-max shadow-lg">
              {dict.contact.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] drop-shadow-md">
              {dict.contact.title}
            </h2>
            <p className="text-slate-300 text-lg mb-12 leading-relaxed">
              {dict.contact.subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-kid-yellow group-hover:bg-kid-yellow group-hover:text-amber-900 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-white font-medium text-lg group-hover:text-kid-yellow transition-colors">{dict.contact.info.address}</span>
              </div>
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-kid-pink group-hover:bg-kid-pink group-hover:text-pink-950 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-white font-medium text-lg group-hover:text-kid-pink transition-colors">{dict.contact.info.phone}</span>
              </div>
              <div className="flex items-center gap-5 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-kid-blue group-hover:bg-kid-blue group-hover:text-blue-950 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-white font-medium text-lg group-hover:text-kid-blue transition-colors">{dict.contact.info.email}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Form Section */}
          <div className="p-10 lg:p-20 lg:w-7/12 bg-white/95 backdrop-blur-xl relative z-10 lg:rounded-l-[3rem] shadow-[-20px_0_40px_rgba(0,0,0,0.05)] border-l border-white">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
              
              <div className="form-element flex flex-col gap-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">{dict.contact.form.name}</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:bg-white focus:border-kid-green focus:ring-4 focus:ring-kid-green/20 transition-all font-bold text-slate-800 shadow-inner"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="form-element flex flex-col gap-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">{dict.contact.form.email}</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:bg-white focus:border-kid-blue focus:ring-4 focus:ring-kid-blue/20 transition-all font-bold text-slate-800 shadow-inner"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="form-element flex flex-col gap-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">{dict.contact.form.message}</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border-2 border-slate-100 px-6 py-4 rounded-2xl outline-none focus:bg-white focus:border-kid-pink focus:ring-4 focus:ring-kid-pink/20 transition-all font-bold text-slate-800 shadow-inner resize-none"
                  placeholder="..."
                ></textarea>
              </div>

              <button className="form-element mt-4 flex items-center justify-center gap-3 w-full bg-gradient-to-r from-kid-green to-teal-400 text-white font-black text-lg px-8 py-5 rounded-2xl shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300">
                <span>{dict.contact.form.submit}</span>
                <Send className="w-5 h-5 pointer-events-none" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}