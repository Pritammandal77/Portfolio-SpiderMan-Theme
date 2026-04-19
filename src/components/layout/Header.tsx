"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Download } from "lucide-react";

const NAV_LINKS: { name: string; href: string }[] = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLinksRef = useRef<
    (HTMLAnchorElement | HTMLButtonElement | null)[]
  >([]);
  const glowRef = useRef<HTMLDivElement | null>(null);

  // Scroll Event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial Animation
  useEffect(() => {
    const tl = gsap.timeline();

    if (navRef.current) {
      tl.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 },
      );
    }

    if (linksRef.current.length > 0) {
      tl.fromTo(
        linksRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }
  }, []);

  // Mouse Glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current || !navRef.current) return;

    const rect = navRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Mobile Menu Animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: "circle(150% at 90% 10%)",
        duration: 0.8,
        ease: "power3.inOut",
      });

      gsap.fromTo(
        mobileLinksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: "circle(0% at 90% 10%)",
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-hidden ${
          isScrolled
            ? "bg-black/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4"
            : "bg-transparent py-6"
        }`}
      >
        {/* Glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-75 h-75 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-0 md:opacity-100 transition-opacity duration-300"
        />

        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-8 h-8 text-white transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"
            >
              <path
                d="M12 2L12 22M2 12L22 12M5 5L19 19M5 19L19 5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="12"
                r="6"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </svg>
            <span className="text-white font-bold tracking-widest uppercase text-sm ml-2 opacity-90 group-hover:opacity-100 transition-opacity">
              Pritam Mandal
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
                className="relative text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center justify-center gap-3">
            <button
              ref={(el) => {
                linksRef.current[NAV_LINKS.length] = el;
              }}
              onClick={() =>
                window.open(
                  "https://wa.me/9881228004?text=Hey%20Pritam",
                  "_blank",
                )
              }
              className="relative px-6 py-2.5 rounded-full overflow-hidden group border border-white/20 text-white text-sm tracking-wider hover:border-white/60 transition"
            >
              <span className="relative z-10 group-hover:text-black transition">
                Let's Talk
              </span>

              <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
            </button>

            <a
              href="/resume/PritamMandal_FullStackDeveloper.pdf"
              download="PritamMandal_FullStackDeveloper.pdf"
            >
              <button className="relative px-6 py-2.5 flex items-center justify-center gap-2 rounded-full overflow-hidden group border border-white/20 text-white hover:text-black text-sm tracking-wider hover:border-white/60 transition">
                <span className="relative z-10 transition group-hover:text-black">
                  Download Resume
                </span>

                <Download
                  size={16}
                  className="relative z-10 transition group-hover:text-black"
                />

                <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
              </button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-px bg-white ${isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
              />
              <span
                className={`h-px bg-white ${isMobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px bg-white ${isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center"
        style={{ clipPath: "circle(0% at 90% 10%)" }}
      >
        <div className="flex flex-col space-y-8 text-center mt-10">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              ref={(el) => {
                mobileLinksRef.current[index] = el;
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-light text-gray-400 hover:text-white tracking-widest"
            >
              {link.name}
            </a>
          ))}

          <a
            href="/resume/PritamMandal_FullStackDeveloper.pdf"
            download="PritamMandal_FullStackDeveloper.pdf"
          >
            <button className="relative px-6 py-2.5 flex items-center justify-center gap-2 rounded-full overflow-hidden group border border-white/20 text-white hover:text-black text-sm tracking-wider hover:border-white/60 transition">
              <span className="relative z-10 transition group-hover:text-black">
                Download Resume
              </span>

              <Download
                size={16}
                className="relative z-10 transition group-hover:text-black"
              />
              <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
