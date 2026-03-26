"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, Globe, Baby, ChevronDown } from "lucide-react";

interface NavbarProps {
    dict: any;
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
                    ? "bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(15,23,42,0.08)] py-3 border-b border-slate-100"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* LOGO - Improved Contrast */}
                <Link href={`/${lang}`} className="nav-logo flex items-center gap-3 group">
                    <div className="bg-kid-primary p-2 rounded-2xl shadow-md group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                        <Baby className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-extrabold text-2xl text-kid-primary tracking-tight">
                        Good<span className="text-kid-green">Seed</span> {/* Changed to Green for the nature theme! */}
                    </span>
                </Link>

                {/* DESKTOP LINKS - Darker text for readability */}
                <div className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md px-2 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            className="nav-link px-5 py-2 rounded-full text-sm font-bold text-slate-600 hover:text-kid-primary hover:bg-slate-100 transition-all relative group"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* ACTIONS */}
                <div className="hidden md:flex items-center gap-5">

                    {/* Language Dropdown - High Contrast */}
                    <div className="nav-action relative" onMouseEnter={() => setIsLangOpen(true)} onMouseLeave={() => setIsLangOpen(false)}>
                        <button className="flex items-center gap-2 px-3 py-2 rounded-full font-bold text-slate-700 hover:text-kid-blue transition-colors">
                            <Globe className="w-5 h-5 text-kid-blue" />
                            <span className="uppercase text-sm">{lang}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
                        </button>

                        <div className={`absolute top-full right-0 mt-2 w-40 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 origin-top-right ${isLangOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                            <div className="p-2 flex flex-col gap-1">
                                {languages.map((l) => (
                                    <Link
                                        key={l.code}
                                        href={redirectedPathName(l.code)}
                                        className={`block px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${lang === l.code ? "bg-kid-bg-blue text-kid-blue" : "text-slate-600 hover:bg-slate-50 hover:text-kid-primary"
                                            }`}
                                    >
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA BUTTON - Bold & Readable */}
                    <Link
                        href={`/${lang}/contact`}
                        className="nav-action px-7 py-3 bg-kid-primary text-white font-extrabold text-sm rounded-full shadow-[0_8px_20px_rgba(15,23,42,0.25)] hover:shadow-[0_8px_25px_rgba(15,23,42,0.4)] hover:-translate-y-1 transition-all duration-300"
                    >
                        {dict.hero.cta}
                    </Link>
                </div>

                {/* MOBILE HAMBURGER - Darker Icon */}
                <button
                    className="nav-action md:hidden relative z-50 p-2 text-kid-primary bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${isMobileOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}>
                <div className="flex flex-col items-center gap-6 text-center w-full px-8">
                    {navLinks.map((link, i) => (
                        <Link
                            key={i}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="text-3xl font-extrabold text-kid-primary hover:text-kid-pink transition-colors w-full border-b border-slate-100 pb-4"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="flex gap-4 mt-6 bg-slate-100 p-2 rounded-full border border-slate-200 shadow-inner">
                        {languages.map((l) => (
                            <Link
                                key={l.code}
                                href={redirectedPathName(l.code)}
                                onClick={() => setIsMobileOpen(false)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${lang === l.code ? "bg-white shadow-sm text-kid-blue" : "text-slate-500"
                                    }`}
                            >
                                {l.code.toUpperCase()}
                            </Link>
                        ))}
                    </div>

                    <Link
                        href={`/${lang}/contact`}
                        onClick={() => setIsMobileOpen(false)}
                        className="mt-4 px-10 py-4 bg-kid-primary text-white font-extrabold text-lg rounded-full w-full shadow-xl"
                    >
                        {dict.hero.cta}
                    </Link>
                </div>
            </div>
        </nav>
    );
}