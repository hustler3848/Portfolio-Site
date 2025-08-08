
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Intro() {

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if(element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5, // This delay starts after the preloader finishes
      },
    },
  };

  const itemVariants = {
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
        <motion.h1 variants={itemVariants}>
          Crafting Digital Experiences
        </motion.h1>
        <motion.p variants={itemVariants} className="text-base md:text-lg text-foreground/80">
          I build beautiful, functional, and user-centric web applications.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button size="lg" onClick={() => scrollTo('#projects')} className="group">
            <span className="absolute inset-0 w-full h-full bg-primary/20 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-500"></span>
            <span className="relative">View My Work</span>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
