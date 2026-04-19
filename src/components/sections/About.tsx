"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const imgMan = "/man/pritamImgNew.jpg";
const imgSpiderman = "/spiderman/man-spider.png";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);

  // Scroll Animation
  useEffect(() => {
    if (
      !sectionRef.current ||
      !textContainerRef.current ||
      !imageContainerRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      const textElements = textContainerRef.current
        ? Array.from(
            textContainerRef.current.querySelectorAll<HTMLElement>(
              ".stagger-reveal",
            ),
          )
        : [];

      const imgElement = imageContainerRef.current;

      tl.fromTo(
        imgElement,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
      ).fromTo(
        textElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.8",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || !maskRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    gsap.to(maskRef.current, {
      "--x": `${x}%`,
      "--y": `${y}%`,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!maskRef.current) return;

    gsap.to(maskRef.current, {
      "--x": "50%",
      "--y": "50%",
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-900/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* LEFT IMAGE */}
        <div
          ref={imageContainerRef}
          className="relative w-full aspect-4/5 max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden cursor-crosshair group shadow-2xl border border-white/5"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={imgMan}
            alt="Developer Persona"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
          />

          <div
            ref={maskRef}
            className="absolute inset-0 w-full h-full"
            style={{
              ["--x" as any]: "50%",
              ["--y" as any]: "50%",
              clipPath: "circle(15% at var(--x) var(--y))",
            }}
          >
            <img
              src={imgSpiderman}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Story & Details */}
        <div
          ref={textContainerRef}
          className="flex flex-col justify-center space-y-10"
        >
          <div className="overflow-hidden ">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-300">
              About
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-pink-500 ml-2">
                Me
              </span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="stagger-reveal text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              I’m Pritam Mandal, a Fullstack Developer focused on building
              real-world, scalable web applications. I work with the MERN stack
              to create seamless user experiences backed by efficient and
              reliable backend systems. From designing clean interfaces to
              developing secure APIs, I enjoy turning ideas into functional
              digital products.
            </p>
          </div>

          {/* Expertise Highlights */}
          <div className="overflow-hidden">
            <div className="stagger-reveal grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-white/10 max-w-xl">
              {[
                "MERN Stack Development",
                "REST APIs & Backend Logic",
                "Responsive UI Design",
                "State Management (Redux)",
              ].map((skill, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors duration-300" />
                  <span className="text-gray-300 text-sm md:text-base font-medium tracking-wide uppercase group-hover:text-white transition-colors duration-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Block */}
          <div className="overflow-hidden mt-6">
            <blockquote className="stagger-reveal border-l-4 border-red-500/50 pl-6 py-2">
              <p className="text-xl md:text-2xl text-gray-200 font-serif italic">
                “I don’t just build projects. <br /> I build systems that solve
                real problems.”
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
