
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projectsData = [
  {
    title: "FrameFlux",
    client: "Personal",
    category: "Web App",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "movie app",
  },
  {
    title: "CodeSnippr",
    client: "Personal",
    category: "Development Tool",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "code snippet",
  },
  {
    title: "MindGuard",
    client: "Hackathon",
    category: "Mental Health",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "mental health",
  },
  {
    title: "Portfolio V1",
    client: "Personal",
    category: "Portfolio",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "portfolio website",
  },
];

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseY(e.clientY);
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8, y: 0 },
    enter: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.8, y: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      <div 
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <span className="w-3 h-3 bg-primary rounded-full"></span>
          <h2 className="text-sm uppercase tracking-widest font-semibold">Featured Projects</h2>
        </motion.div>

        <div className="relative border-b border-border" onMouseMove={handleMouseMove}>
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                variants={imageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[200px] md:w-[400px] md:h-[250px] rounded-lg overflow-hidden pointer-events-none z-10"
                style={{ top: mouseY - 200 }}
              >
                <Image
                  src={projectsData[hoveredIndex].imageUrl}
                  alt={projectsData[hoveredIndex].title}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={projectsData[hoveredIndex].dataAiHint}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {projectsData.map((project, index) => (
            <div
              key={project.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div
                className={
                  "absolute inset-0 bg-primary transition-all duration-500 ease-in-out"
                }
                style={{
                  clipPath: `inset(0 ${hoveredIndex === index ? '0' : '100%'} 0 0)`,
                }}
              />
              <a href="#" className="block relative">
                <div className="flex justify-between items-center py-8 px-4 border-t border-border transition-colors duration-500 ease-in-out group-hover:text-primary-foreground">
                  <h3 className="font-headline text-3xl md:text-5xl font-bold">{project.title}</h3>
                  <div className="text-right text-sm text-muted-foreground transition-colors duration-500 ease-in-out group-hover:text-primary-foreground/80">
                    <p className="font-semibold">{project.client}</p>
                    <p>{project.category}</p>
                  </div>
                  <motion.div
                    className="absolute right-8 top-1/2 -translate-y-1/2"
                    initial={{x: -20, opacity: 0}}
                    animate={{x: hoveredIndex === index ? 0 : -20, opacity: hoveredIndex === index ? 1 : 0}}
                    transition={{duration: 0.3, ease: 'easeOut'}}
                  >
                     <ArrowRight className="w-8 h-8"/>
                  </motion.div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
