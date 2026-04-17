"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CircleArrowOutUpRight,
} from "lucide-react";

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
    id: "02",
    name: "Notexa",
    description:
      "A full-stack platform for buying and selling academic notes with Razorpay payments, role-based authentication, and an AI-powered chatbot for user assistance.",
    tech: ["Next.js", "Node.js", "MongoDB", "Razorpay", "AI (RAG)"],
    image: imgSpiderman,
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
  {
    id: "04",
    name: "E-Commerce",
    description:
      "Developed a E-Commerce website, where users can browse a lot of products , serach items, filters , etc. Though it is a simulated store, all the items are fake",
    tech: ["React", "Firebase", "Tailwind CSS", "Redux"],
    image: imgSpiderman,
    link: "https://the-aura-mart.netlify.app",
    blend: "mix-blend-luminosity grayscale",
  },
  {
    id: "01 🏠",
    name: "New Product",
    description: "New Product Coming Soon",
    tech: ["Comin Soon"],
    image: imgSpiderman,
    link: "",
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
          Project_ID // {project.id}
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
              <span className="flex items-center justify-center gap-2 group-hover/link:-translate-y-full transition-transform duration-300">
                Try This{" "}
                <CircleArrowOutUpRight size={14} className="text-red-600" />
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

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const currentIndex = useRef(0);
  const cardsPerView = useRef(3);

  // ✅ RESPONSIVE CARDS COUNT
  const getCardsPerView = () => {
    if (window.innerWidth < 768) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const slide = (dir: "left" | "right") => {
    if (!trackRef.current || !sliderRef.current) return;

    cardsPerView.current = getCardsPerView();

    const cardWidth = sliderRef.current.offsetWidth / cardsPerView.current;

    const maxIndex = MISSIONS.length - cardsPerView.current;

    if (dir === "right" && currentIndex.current < maxIndex) {
      currentIndex.current++;
    }

    if (dir === "left" && currentIndex.current > 0) {
      currentIndex.current--;
    }

    gsap.to(trackRef.current, {
      x: -currentIndex.current * cardWidth,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  // ✅ RESET POSITION ON RESIZE
  useEffect(() => {
    const handleResize = () => {
      currentIndex.current = 0;
      gsap.set(trackRef.current, { x: 0 });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ANIMATION (same as yours)
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
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
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
      className="w-full min-h-screen bg-[#030303] py-20 md:py-32 px-4 md:px-12 lg:px-24 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* HEADER */}
        <div
          ref={headerRef}
          className="mb-12 md:mb-24 flex flex-col xl:flex-row xl:items-end justify-between border-b border-white/10 pb-6 md:pb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4">
            Featured
            <span className="ml-3 bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Builds
            </span>
          </h2>

          <p className="text-gray-400 text-sm md:text-lg max-w-sm md:text-right">
            A collection of real-world projects focused on performance,
            scalability, and user experience.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative" ref={sliderRef}>
          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={() => slide("left")}
              className="text-white bg-black/60 border border-white/20 p-2 md:p-3 rounded-full hover:border-red-500"
            >
              <ArrowLeftIcon size={18} />
            </button>

            <button
              onClick={() => slide("right")}
              className="text-white bg-black/60 border border-white/20 p-2 md:p-3 rounded-full hover:border-red-500"
            >
              <ArrowRightIcon size={18} />
            </button>
          </div>

          {/* VIEWPORT */}
          <div className="overflow-hidden">
            {/* TRACK */}
            <div ref={trackRef} className="flex gap-4 md:gap-8">
              {MISSIONS.map((project, i) => (
                <div
                  key={i}
                  className="
                    min-w-full
                    md:min-w-[50%]
                    lg:min-w-[33.333%]
                  "
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GRID BG */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />
    </section>
  );
}
