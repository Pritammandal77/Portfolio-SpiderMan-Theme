"use client";

import React from "react";
import { Code2, Database, Cpu } from "lucide-react";

const LANGUAGES: string[] = ["Javascript", "Typescript", "SQL", "CPP"];
const FRONTEND: string[] = ["React", "Next.js", "JavaScript", "Tailwind CSS", "Redux"];
const BACKEND: string[] = ["Node.js", "Express", "MongoDB", "Firebase", "REST APIs"];
const TOOLS: string[] = ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Render", "Resend"];

type SkillCardProps = {
  title: string;
  items: string[];
  icon: React.ElementType;
  delay?: number;
};

function SkillCard({ title, items, icon: Icon, delay = 0 }: SkillCardProps) {
  return (
    <div
      className="
        relative w-full md:w-87.5 xl:w-78
        p-8 rounded-3xl
        bg-zinc-950/40 backdrop-blur-3xl
        border border-white/5
        group cursor-default
        transition-all duration-500
        hover:border-red-500/40
        hover:shadow-[0_0_90px_-25px_rgba(220,38,38,0.45)]
        hover:-translate-y-2
      "
      style={{
        animation: `floatCard 3s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {/* SOFT RED AURA */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-600/20 blur-[120px] rounded-full" />
      </div>

      {/* SCAN HOVER LIGHT */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-linear-to-r from-transparent via-red-500/10 to-transparent rotate-12 opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 transition">
          <Icon size={22} className="text-red-400 group-hover:text-white transition" />
        </div>

        <h3 className="text-white text-2xl font-bold tracking-tight">
          {title}
        </h3>
      </div>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-2.5">
        {items.map((skill, i) => (
          <span
            key={i}
            className="
              px-4 py-2 text-xs font-medium uppercase tracking-widest
              text-zinc-400 rounded-lg
              bg-white/5 border border-white/5
              transition-all duration-300
              hover:text-white
              hover:border-red-500/40
              hover:bg-red-500/10
              hover:scale-105
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size-[40px_40px] opacity-40" />

      {/* RED AURA */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-900/10 blur-[140px] rounded-full" />

      {/* HEADER */}
      <div className="text-center mb-20 z-10">
        <div className="inline-block px-4 py-1 mb-5 border border-red-500/30 rounded-full bg-red-500/5">
          <span className="text-red-500 text-xs font-bold uppercase tracking-[0.25em]">
            Skill Arsenal
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-300">
          Tech{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-pink-500 ml-2">
            Stack
          </span>
        </h2>

        <p className="text-zinc-500 mt-6 max-w-lg mx-auto text-lg">
          Built with precision. Powered by{" "}
          <span className="text-zinc-300">fullstack energy</span>.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-7xl z-10">
        <SkillCard title="Languages" items={LANGUAGES} icon={Code2} />
        <SkillCard title="Frontend" items={FRONTEND} icon={Code2} />
        <SkillCard title="Backend" items={BACKEND} icon={Database} />
        <SkillCard title="Tools" items={TOOLS} icon={Cpu} />
      </div>

      {/* FLOAT ANIMATION */}
      <style jsx>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
}

export default Skills;