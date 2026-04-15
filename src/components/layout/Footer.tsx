"use client";

import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const imgSpiderman = "/spiderman/spiderMan-Footer.png";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full pt-40 bg-black overflow-hidden border-t border-white/10">
      {/* SPIDER IMAGE BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src={imgSpiderman}
          alt="spiderman"
          fill
          className="object-cover object-center opacity-[0.15]"
          priority
        />
      </div>

      {/* RED GLOW */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-150 h-75 bg-red-600/20 blur-[120px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          You've Entered In My
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-pink-500 ml-2">
            Web
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 max-w-xl mb-6 text-sm md:text-base leading-relaxed">
          I’m <span className="text-white font-medium">Pritam Mandal</span> - a
          full-stack developer crafting scalable web experiences with precision.
          From idea to execution, I turn concepts into real-world products that
          perform, adapt, and evolve.
        </p>

        {/* SIGNATURE */}
        <p className="text-gray-500 max-w-lg text-xs md:text-sm italic mb-6">
          “Not just building projects - I’m building systems that people
          actually use.”
        </p>

        {/* STATUS */}
        <p className="text-red-400/70 font-mono text-xs tracking-[0.3em] uppercase mb-10">
          // Dev Mode: ON • Focus: 100% • Coffee: Required
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* SCROLL TOP */}
          <button
            onClick={scrollToTop}
            className="group relative px-8 py-3 rounded-full border border-red-500/30 text-white text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 hover:scale-105 hover:border-red-500 hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]"
          >
            <span className="absolute inset-0 bg-linear-to-r from-red-600/0 via-red-600/20 to-red-600/0 -translate-x-full group-hover:translate-x-full transition duration-700" />
            <span className="relative flex items-center gap-2">
              Back to Top
              <ArrowUp
                size={16}
                className="group-hover:-translate-y-1 transition"
              />
            </span>
          </button>

          {/* MAIN PORTFOLIO */}
          {/* <a
            href="/"
            className="group relative px-8 py-3 rounded-full border border-white/20 text-white text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 hover:scale-105 hover:border-red-500 hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]"
          >
            <span className="absolute inset-0 bg-linear-to-r from-red-600/0 via-red-600/20 to-red-600/0 -translate-x-full group-hover:translate-x-full transition duration-700" />
            <span className="relative flex items-center gap-2">
              Main Portfolio
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
              />
            </span>
          </a> */}
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent my-12" />

        {/* INFO */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-xs md:text-sm text-gray-400 mb-6">
          <span>MERN Stack Developer</span>
          <span className="hidden md:block">•</span>
          <span>Building Real-World Projects</span>
          <span className="hidden md:block">•</span>
          <span>Crafting High-Performance Web Systems</span>
        </div>

        {/* COPYRIGHT */}
        <p className="text-gray-500 text-xs md:text-sm tracking-wide">
          © {new Date().getFullYear()} Pritam Mandal
          <span className="text-red-500">
            {" "}
            - Engineering Scalable Digital Experiences
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
