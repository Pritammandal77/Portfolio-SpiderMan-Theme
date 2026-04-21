"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type ContactItem = {
  name: string;
  value: string;
  link: string;
};

const CONTACTS: ContactItem[] = [
  {
    name: "Email",
    value: "pritampmandal@email.com",
    link: "mailto:pritampmandal@email.com",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/pritam",
    link: "https://www.linkedin.com/in/pritam-mandal-871510281",
  },
  {
    name: "GitHub",
    value: "https://github.com/Pritammandal77",
    link: "https://github.com/Pritammandal77",
  },
  {
    name: "Instagram",
    value: "@pritamm_mandal",
    link: "https://www.instagram.com/pritamm_mandal",
  },
  // { name: "Phone", value: "+919881228004", link: "tel:9881228004" },
];

function Contact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // NODE ENTRY
      gsap.from(".node", {
        opacity: 0,
        scale: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // WEB DRAW
      linesRef.current.forEach((line) => {
        if (!line) return;

        const length = line.getTotalLength();

        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      });

      // CENTER PULSE
      gsap.to(".pulse-ring", {
        scale: 2.5,
        opacity: 0,
        repeat: -1,
        duration: 2,
        ease: "power2.out",
      });

      // FLOATING NODES
      gsap.to(".node", {
        y: "+=10",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // CLICK EFFECT
  const triggerSignal = () => {
    gsap.fromTo(
      ".node",
      { boxShadow: "0 0 0 rgba(255,0,0,0)" },
      {
        boxShadow: "0 0 25px rgba(255,0,0,0.8)",
        duration: 0.4,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
      },
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-200 h-200 bg-red-600/10 blur-[200px] rounded-full" />
      </div>

      {/* SVG */}
      <svg className="absolute w-full h-full pointer-events-none">
        <g stroke="white" strokeOpacity="0.08" strokeWidth="1">
          {[
            ["50%", "50%", "20%", "25%"],
            ["50%", "50%", "80%", "25%"],
            ["50%", "50%", "25%", "75%"],
            ["50%", "50%", "75%", "75%"],
            ["50%", "50%", "50%", "10%"],
          ].map((line, i) => (
            <line
              key={i}
              ref={(el) => {
                linesRef.current[i] = el;
              }}
              x1={line[0]}
              y1={line[1]}
              x2={line[2]}
              y2={line[3]}
            />
          ))}
        </g>
      </svg>

      {/* CENTER */}
      <div
        className="absolute flex items-center justify-center cursor-pointer"
        onClick={triggerSignal}
      >
        <div className="pulse-ring absolute w-40 h-40 border border-red-500/40 rounded-full" />
        <div className="pulse-ring absolute w-40 h-40 border border-red-500/20 rounded-full" />

        <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden border-2 border-red-500 shadow-[0_0_50px_rgba(255,0,0,0.8)]">
          <Image
            src="/spiderman/Logo.jpg"
            alt="Image"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      {/* NODES */}
      <div className="relative w-full h-full">
        {CONTACTS.map((item, i) => {
          const positions = [
            "top-[18%] left-[18%]",
            "top-[18%] right-[18%]",
            "bottom-[18%] left-[22%]",
            "bottom-[18%] right-[22%]",
            "top-[65%] left-[50%] -translate-x-1/2",
          ];

          return (
            <a
              key={i}
              href={item.link}
              target="_blank"
              className={`node absolute ${positions[i]} group`}
            >
              <div
                className="relative w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white text-xs text-center p-2 backdrop-blur-md bg-white/5 transition-all duration-500 
              group-hover:scale-110 
              group-hover:border-red-500 
              group-hover:shadow-[0_0_30px_rgba(255,0,0,0.8)]"
              >
                {item.name}

                <div className="absolute inset-0 rounded-full border border-red-500/40 animate-ping" />
                <div className="absolute inset-0 rounded-full border border-red-500/0 animate-ping [animation-delay:1s]" />
              </div>

              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                {item.value}
              </div>
            </a>
          );
        })}
      </div>

      {/* HEADING */}
      <div className="absolute top-36 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-300">
          Spider
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-pink-500 ml-2">
            Network
          </span>
        </h2>
        <p className="text-gray-400 mt-4">
          Tap to signal points, to connect with pritam
        </p>
      </div>
    </section>
  );
}

export default Contact;
