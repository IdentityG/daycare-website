"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Baby, MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  dict: Dictionary;
  lang: string;
}

export default function Footer({ dict, lang }: FooterProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".footer-col",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  const navLinks = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.about, href: `/${lang}/about` },
    { name: dict.nav.programs, href: `/${lang}/programs` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ];

  return (
    <footer ref={containerRef} className="bg-gradient-to-b from-[#1e1b4b] to-[#0f172a] pt-32 pb-10 relative overflow-hidden -mt-10">
      
      {/* Decorative Top SVG Wave linking the sections */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none z-20">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.38,201.27,117.89,242.92,112.8,283.47,100.91,321.39,56.44Z" fill="#FAFAFA"></path>
        </svg>
      </div>

      {/* Decorative Glowing Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-kid-pink/20 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-kid-blue/20 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Mission */}
          <div className="footer-col">
            <Link href={`/${lang}`} className="flex items-center gap-3 group mb-8 w-max">
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-2xl shadow-lg border border-white/20 group-hover:rotate-12 group-hover:bg-white/20 transition-all duration-300">
                <Baby className="w-8 h-8 text-kid-pink drop-shadow-md" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-3xl text-white tracking-tight drop-shadow-sm">
                Good<span className="text-kid-green">Seed</span>
              </span>
            </Link>
            <p className="text-slate-300 leading-relaxed mb-8 font-medium text-lg">
              {dict.footer.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-kid-blue hover:text-white hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)] transition-all duration-300 backdrop-blur-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-kid-pink hover:text-white hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(236,72,153,0.3)] transition-all duration-300 backdrop-blur-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-kid-yellow hover:text-amber-900 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(245,158,11,0.3)] transition-all duration-300 backdrop-blur-sm">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col lg:pl-12">
            <h4 className="text-xl font-extrabold text-white mb-8 relative inline-block">
              {dict.footer.quickLinks}
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-kid-pink to-transparent rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-slate-300 hover:text-white font-medium text-lg transition-colors flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-kid-green opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col">
            <h4 className="text-xl font-extrabold text-white mb-8 relative inline-block">
              {dict.contact.badge}
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-kid-yellow to-transparent rounded-full"></div>
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-slate-300 font-medium text-lg group">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-kid-green/20 group-hover:border-kid-green/50 transition-colors">
                  <MapPin className="w-5 h-5 text-kid-green" />
                </div>
                <span className="mt-1">{dict.contact.info.address}</span>
              </li>
              <li className="flex items-start gap-4 text-slate-300 font-medium text-lg group">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-kid-pink/20 group-hover:border-kid-pink/50 transition-colors">
                  <Phone className="w-5 h-5 text-kid-pink" />
                </div>
                <span className="mt-1">{dict.contact.info.phone}</span>
              </li>
              <li className="flex items-start gap-4 text-slate-300 font-medium text-lg group">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-kid-blue/20 group-hover:border-kid-blue/50 transition-colors">
                  <Mail className="w-5 h-5 text-kid-blue" />
                </div>
                <span className="mt-1">{dict.contact.info.email}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="footer-col">
            <h4 className="text-xl font-extrabold text-white mb-8 relative inline-block">
              {dict.footer.newsletter.title}
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-kid-blue to-transparent rounded-full"></div>
            </h4>
            <p className="text-slate-300 font-medium mb-8 text-lg leading-relaxed">
              {dict.footer.newsletter.desc}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder={dict.footer.newsletter.placeholder} 
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 text-white px-5 py-4 rounded-xl outline-none focus:border-kid-blue focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] focus:bg-white/10 transition-all placeholder:text-slate-400 font-medium text-lg"
              />
              <button className="w-full bg-gradient-to-r from-kid-blue to-cyan-500 text-white font-extrabold text-lg py-4 rounded-xl shadow-[0_10px_25px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all duration-300">
                {dict.footer.newsletter.button}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-col border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 font-medium text-base text-center md:text-left">
            © {new Date().getFullYear()} Good Seed Daycare. {dict.footer.rights}
          </p>
          <div className="flex gap-8 text-base font-medium text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">{dict.footer.privacy}</Link>
            <Link href="#" className="hover:text-white transition-colors">{dict.footer.terms}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}