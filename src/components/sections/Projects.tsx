"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const imgSpiderman = "/spiderman/man-spider.png";
const imgMan = "/man/pritamImgNew.jpg";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  blend: string;
};

const MISSIONS: Project[] = [
  {
    id: "01",
    name: "Roomioo",
    description:
      "A platform where users can find roommates/flatmates based on preferences or lifestyle.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    image: imgSpiderman,
    link: "https://roomioo.vercel.app",
    blend: "mix-blend-luminosity brightness-75",
  },
  {
    id: "02",
    name: "Notexa",
    description:
      "A full-stack platform for buying and selling academic notes with Razorpay payments, role-based authentication, and an AI-powered chatbot for user assistance.",
    tech: ["Next.js", "Node.js", "MongoDB", "Razorpay", "AI (RAG)"],
    image: imgMan,
    link: "https://notexahub.vercel.app",
    blend: "mix-blend-luminosity grayscale",
  },
  {
    id: "03",
    name: "DevStackr",
    description:
      "A developer social platform with real-time chat, post system, and customizable profiles, enabling developers to connect and collaborate efficiently.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Redux"],
    image: imgSpiderman,
    link: "https://devstackr.netlify.app",
    blend: "mix-blend-overlay brightness-125 saturate-150",
  },
];

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        opacity: 1,
        duration: 0.2,
      });
    }

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: -x * 20,
        y: -y * 20,
        scale: 1.1,
        ease: "power2.out",
        duration: 0.4,
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateY: 0,
        rotateX: 0,
        ease: "power3.out",
        duration: 0.6,
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "power3.out",
        duration: 0.6,
      });
    }
  };

  return (
    <div
      className="project-card relative w-full h-112.5 rounded-xl overflow-hidden cursor-pointer group bg-black border border-white/10"
      style={{ transformStyle: "preserve-3d" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-900">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.name}
          className={`absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center ${project.blend} transition-all duration-[1.5s]`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent z-10" />
      </div>

      <div
        ref={glowRef}
        className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
      />

      <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/40 rounded-xl transition-colors duration-500 z-20 pointer-events-none" />

      <div
        className="absolute inset-0 z-30 p-8 flex flex-col justify-end pointer-events-none"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="text-red-500/80 font-mono text-xs tracking-[0.3em] mb-2 font-bold uppercase transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          File_ID // {project.id}
        </div>

        <h3 className="text-3xl font-bold tracking-tight text-white mb-3 leading-none drop-shadow-xl font-sans">
          {project.name}
        </h3>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-light max-w-[90%]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
          {project.tech.map((tool) => (
            <span
              key={tool}
              className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/20 rounded-full text-gray-300 font-medium"
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-auto pointer-events-auto w-fit">
          <a
            href={project.link}
            target="_blank"
            className="flex items-center space-x-2 text-sm uppercase tracking-[0.2em] font-medium text-white group/link relative"
          >
            <span className="relative overflow-hidden block">
              <span className="block group-hover/link:-translate-y-full transition-transform duration-300">
                Try This
              </span>
              <span className="block absolute inset-0 translate-y-full group-hover/link:translate-y-0 transition-transform duration-300 text-red-400">
                Live Link
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
        );
      }

      const cards = sectionRef.current?.querySelectorAll(".project-card");

      if (cards) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.6",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full min-h-screen bg-[#030303] py-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-360 mx-auto w-full relative z-10">
        <div
          ref={headerRef}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white font-sans leading-none drop-shadow-lg mb-4">
            Featured
            <span className="font-serif italic font-light text-transparent bg-clip-text bg-linear-to-r from-red-500 to-pink-500 ml-3">
              Builds
            </span>
          </h2>

          <p className="text-gray-400 font-light tracking-wide text-base md:text-lg max-w-sm mt-6 md:mt-0 leading-relaxed md:text-right">
            A collection of real-world projects focused on performance,
            scalability, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 place-items-center">
          {MISSIONS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />
    </section>
  );
}
