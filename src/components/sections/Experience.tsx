"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CertificateModal from "../ui/certificateModal";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyFull: string;
  period: string;
  duration: string;
  bullets: string[];
  tags: string[];
  certificate: string;
}

const experiences: ExperienceItem[] = [
  {
    id: "EXP_01",
    role: "Full Stack Developer Intern",
    company: "Zestos Ventures",
    companyFull: "Zestos Ventures Pvt Ltd (Gharpadharo)",
    period: "06/2025 – 09/2025",
    duration: "3 months",
    bullets: [
      "Contributed to the development of the company's Careers website, handling both frontend and backend integration.",
      "Developed the company's Club Website, focusing on frontend UI, responsiveness, and user experience.",
      "Worked with the team to build features, fix bugs, and manage APIs using the MERN stack in an Agile workflow.",
      "Participated in daily stand-ups & weekly meetings, collaborating on progress, blockers, and deployment plans.",
    ],
    tags: [],
    certificate: "/certificates/ZestosVentures.png",
  },
];

export default function ExperienceSection() {
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const ctx = gsap.context(() => {
      gsap.from(".exp-card", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".timeline-node", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(2)",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [visible]);

  return (
    <>
      <style>{`
        .clip-card {
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);
        }

        .scan::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to bottom, transparent, rgba(255,0,0,0.05), transparent);
          transition: top 0.6s ease;
        }

        .scan:hover::before {
          top: 150%;
        }

        @keyframes pulse {
          0%,100% {opacity:1; transform:scale(1);}
          50% {opacity:0.5; transform:scale(0.6);}
        }

        @keyframes floatSoft {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative py-28 overflow-hidden bg-[#050505]"
      >
        {/* 🌐 GRID BACKGROUND */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size[40px_40px] opacity-30" />

        {/* 🔴 RADIAL RED GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.08),transparent_70%)]" />

        {/* 🔥 FLOATING AURAS */}
        <div className="absolute top-1/4 -left-20 w-100 h-100 bg-red-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-100 h-100 bg-red-900/20 blur-[150px] rounded-full" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* HEADER */}
          <div
            className={`mb-20 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block px-4 py-1 mb-6 border border-red-500/30 rounded-full bg-red-500/5">
              <span className="text-red-500 text-xs font-bold uppercase tracking-[0.25em]">
                Experience
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl  font-bold text-gray-300">
              My
              <span className="ml-3 bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>

            <p className="text-zinc-500 mt-5 max-w-lg text-sm md:text-base">
              Real-world experience building scalable systems & polished UI.
            </p>
          </div>

          {/* TIMELINE */}
          <div className="relative">
            {/* LINE */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-red-600 via-red-900 to-transparent transition-all duration-700 ${
                visible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
              } origin-top`}
            />

            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* NODE */}
                <div className="timeline-node absolute -left-2.25 top-9 w-5 h-5 bg-[#050505] border-2 border-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-[pulse_2s_infinite]" />
                </div>

                {/* CARD WRAPPER */}
                <div
                  className={`pl-12 transition-all duration-700 ${
                    visible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-5"
                  }`}
                  style={{ transitionDelay: `${0.4 + index * 0.2}s` }}
                >
                  {/* CARD */}
                  <div
                    onClick={() =>
                      setActiveCard(activeCard === exp.id ? null : exp.id)
                    }
                    className={`exp-card relative cursor-pointer p-7 md:p-8 rounded-xl bg-zinc-950/50 backdrop-blur-xl border border-white/5 transition-all duration-500 clip-card scan ${
                      activeCard === exp.id
                        ? "border-red-500 shadow-[0_0_40px_rgba(255,0,0,0.2)] scale-[1.02]"
                        : "hover:border-red-500/40 hover:shadow-[0_0_40px_rgba(255,0,0,0.15)] hover:-translate-y-1"
                    }`}
                    style={{ animation: "floatSoft 6s ease-in-out infinite" }}
                  >
                    <p className="text-[10px] text-red-500 tracking-[0.25em] font-mono mb-4">
                      {exp.id} //
                    </p>

                    {/* TOP */}
                    <div className="flex justify-between flex-wrap gap-6 mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl text-gray-100 font-semibold">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-red-500 mt-1">
                          {exp.company}
                        </p>
                        <p className="text-[11px] text-gray-500 font-mono mt-1">
                          {exp.companyFull}
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <span className="block text-xs text-gray-400 font-mono">
                          {exp.period}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono border border-red-900 px-2 py-0.5 bg-red-900/10 inline-block mt-1">
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="h-px bg-linear-to-r from-white/10 to-transparent my-5" />

                    {/* BULLETS */}
                    <ul className="flex flex-col gap-3 mb-6">
                      {exp.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-gray-400 text-sm"
                        >
                          <span className="text-red-500 mt-0.5">◈</span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-red-400 border border-red-500/30 px-2 py-1 tracking-wider bg-red-500/5 hover:bg-red-500/10 transition"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CERTIFICATE BUTTON */}
                    <div className="md:absolute bottom-2 right-2 mt-4 md:mt-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCertificate(exp.certificate);
                        }}
                        className="
      px-4 py-2 text-xs font-semibold tracking-wider uppercase
      text-red-400 border border-red-500/30 rounded-lg
      bg-red-500/5
      hover:bg-red-500 hover:text-black
      transition-all duration-300
      hover:scale-105
    "
                      >
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* END */}
            <div className="pl-12 mt-12">
              <p className="text-[11px] text-gray-600 tracking-[0.2em] font-mono flex items-center gap-3">
                <span className="w-6 h-px bg-gray-600" />
                More chapters loading...
              </p>
            </div>
          </div>
        </div>
      </section>

      <CertificateModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        imageSrc={selectedCertificate || ""}
      />
    </>
  );
}
