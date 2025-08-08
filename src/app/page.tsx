
"use client"

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Intro } from "@/components/sections/intro";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Particles } from "@/components/particles";
import { Preloader } from "@/components/preloader";
import { CustomCursor } from "@/components/custom-cursor";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <CustomCursor />
      <Particles className="fixed inset-0 -z-10" />
      <Header />
      <main className="flex flex-col">
        <Intro />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
