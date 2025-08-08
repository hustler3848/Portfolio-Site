
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useRef } from "react";

export function Intro() {
  const magneticRef = useRef<HTMLButtonElement>(null);
  const { x, y } = useMagnetic(magneticRef);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if(element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
  };
  
  const headline = "Crafting Digital Experiences";
  const words = headline.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="text-sm uppercase tracking-widest text-primary">
          Creative Developer & Designer
        </motion.p>
        <motion.h1 
          variants={containerVariants}
          className="flex flex-wrap justify-center"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="mr-[0.25em]" // Adjust spacing between words
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-base md:text-lg text-foreground/80">
          I build beautiful, functional, and user-centric web applications.
        </motion.p>
        <motion.div 
          variants={itemVariants} 
        >
          <motion.div
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          >
            <Button ref={magneticRef} size="lg" onClick={() => scrollTo('#projects')} className="group">
              View My Work
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
