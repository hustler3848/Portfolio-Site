
"use client"

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { Blogs } from "@/components/sections/blogs";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [keySequence, setKeySequence] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length > 1) return; // Ignore keys like Shift, Control, etc.
      const newSequence = (keySequence + e.key).slice(-5);
      setKeySequence(newSequence);
      if (newSequence.toLowerCase() === 'hello') {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 4000); // Animation for 4s
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);
  
  const mainVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } }
  }

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
            variants={mainVariants}
            initial="hidden"
            animate="visible"
        >
            <CustomCursor />
            <Particles className="fixed inset-0 -z-10" quantity={150} celebration={showEasterEgg} />
            <Header />
            <main className="flex flex-col">
                <Intro />
                <About />
                <Projects />
                <Blogs />
                <Contact />
            </main>
            <Footer />
        </motion.div>
      )}
    </SmoothScroll>
  );
}
