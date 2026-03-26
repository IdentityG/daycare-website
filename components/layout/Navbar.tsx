"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, Globe, Baby, ChevronDown } from "lucide-react";
import { Dictionary } from "@/types/dictionary";

interface NavbarProps {
    dict: Dictionary;
    lang: string;
}

export default function Navbar({ dict, lang }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        gsap.set(navRef.current, { visibility: "visible" });

        tl.fromTo(".nav-logo", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
            .fromTo(".nav-link", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.4")
            .fromTo(".nav-action", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.4");
    }, { scope: navRef });

    const redirectedPathName = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    const navLinks = [
        { name: dict.nav.home, href: `/${lang}` },
        { name: dict.nav.about, href: `/${lang}/about` },
        { name: dict.nav.programs, href: `/${lang}/programs` },
        { name: dict.nav.contact, href: `/${lang}/contact` },
    ];

    const languages = [
        { code: "en", label: "English" },
        { code: "am", label: "አማርኛ" },
        { code: "om", label: "Afaan Oromoo" },
    ];

    return (
        <nav
            ref={navRef}
            style={{ visibility: "hidden" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] py-3 border-b border-white/50"
                    : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* LOGO - More Vibrant & Playful */}
                <Link href={`/${lang}`} className="nav-logo flex items-center gap-3 group">
                    <div className="bg-gradient-to-br from-kid-pink to-kid-purple p-2.5 rounded-2xl shadow-[0_4px_15px_rgba(236,72,153,0.3)] group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300">
                        <Baby className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-black text-2xl text-slate-800 tracking-tight">
                        Good<span className="text-kid-green">Seed</span>
                    </span>
                </Link>

                {/* DESKTOP LINKS - Glassmorphic Pill */}
                <div className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-xl px-2 py-1.5 rounded-full border border-white/60 shadow-sm">
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            className={`nav-link px-5 py-2 rounded-full text-sm font-bold transition-all relative group ${
                                pathname === link.href || pathname === link.href + '/' 
                                ? "bg-white text-kid-pink shadow-sm" 
                                : "text-slate-600 hover:text-kid-green hover:bg-white/60"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* ACTIONS */}
                <div className="hidden md:flex items-center gap-5">

                    {/* Language Dropdown - Playful UI */}
                    <div className="nav-action relative" onMouseEnter={() => setIsLangOpen(true)} onMouseLeave={() => setIsLangOpen(false)}>
                        <button className="flex items-center gap-2 px-3 py-2 rounded-full font-bold text-slate-700 hover:text-kid-purple transition-colors bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/80 hover:shadow-sm">
                            <Globe className="w-5 h-5 text-kid-purple" />
                            <span className="uppercase text-sm">{lang}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
                        </button>

                        <div className={`absolute top-full right-0 mt-3 w-44 bg-white/90 backdrop-blur-2xl border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden transition-all duration-300 origin-top-right ${isLangOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                            <div className="p-2 flex flex-col gap-1">
                                {languages.map((l) => (
                                    <Link
                                        key={l.code}
                                        href={redirectedPathName(l.code)}
                                        className={`block px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${lang === l.code ? "bg-gradient-to-r from-kid-purple/10 to-transparent text-kid-purple border-l-4 border-kid-purple" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"
                                            }`}
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA BUTTON - Gradient Glow */}
                    <Link
                        href={`/${lang}/contact`}
                        className="nav-action px-7 py-3 bg-gradient-to-r from-kid-pink to-orange-400 text-white font-extrabold text-sm rounded-full shadow-[0_8px_20px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_25px_rgba(236,72,153,0.5)] hover:-translate-y-1 transition-all duration-300 border border-white/20 relative overflow-hidden group"
                    >
                        <span className="relative z-10">{dict.hero.cta}</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </Link>
                </div>

                {/* MOBILE HAMBURGER - Glassmorphic */}
                <button
                    className="nav-action md:hidden relative z-50 p-2.5 text-slate-800 bg-white/60 backdrop-blur-md border border-white/50 shadow-sm hover:bg-white rounded-full transition-colors"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* MOBILE MENU OVERLAY - Fun Blur */}
            <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${isMobileOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}>
                <div className="flex flex-col items-center justify-center gap-6 text-center w-[90%] max-w-sm bg-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden" style={{ transform: isMobileOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)", transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                    
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-kid-pink/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-kid-blue/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative z-10 w-full">
                        {navLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`block w-full text-2xl font-extrabold transition-colors py-3 border-b border-slate-100 last:border-0 ${
                                    pathname === link.href || pathname === link.href + '/' 
                                    ? "text-kid-pink" 
                                    : "text-slate-700 hover:text-kid-green"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex gap-2 justify-center mt-6 bg-slate-50 p-1.5 rounded-full border border-slate-100">
                            {languages.map((l) => (
                                <Link
                                    key={l.code}
                                    href={redirectedPathName(l.code)}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${lang === l.code ? "bg-white shadow-sm text-kid-purple border border-slate-100" : "text-slate-400"
                                        }`}
                                >
                                    {l.code.toUpperCase()}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={`/${lang}/contact`}
                            onClick={() => setIsMobileOpen(false)}
                            className="mt-8 flex justify-center py-4 bg-gradient-to-r from-kid-pink to-orange-400 text-white font-extrabold text-lg rounded-full w-full shadow-[0_8px_20px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_25px_rgba(236,72,153,0.5)] border border-white/20 transition-all group"
                        >
                            {dict.hero.cta}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}