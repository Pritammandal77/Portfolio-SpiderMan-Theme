import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
