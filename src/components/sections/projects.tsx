
"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTilt } from "@/hooks/use-tilt";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const projectsData = [
  {
    title: "FrameFlux",
    client: "Personal",
    category: "Web App",
    imageUrl: "/images/project-1.png",
    dataAiHint: "movie app",
    liveDemoUrl: "https://frameflux.vercel.app/",
  },
  {
    title: "CodeSnippr",
    client: "Personal",
    category: "Development Tool",
    imageUrl: "/images/project-2.png",
    dataAiHint: "code snippet",
    liveDemoUrl: "https://dev-book-weld.vercel.app/",
  },
  {
    title: "MindGuard",
    client: "Hackathon",
    category: "Mental Health",
    imageUrl: "/images/project-3.png",
    dataAiHint: "mental health",
    liveDemoUrl: "https://mind-guard-three.vercel.app/",
  },
  {
    title: "Exam PDF PRO",
    client: "Personal",
    category: "Portfolio",
    imageUrl: "/images/project-4.png",
    dataAiHint: "portfolio website",
    liveDemoUrl: "https://exam-pdf-pro.vercel.app/",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  }
}

const textSlideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
}

const backgroundSlideIn = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
}


function ProjectRow({ project, isMobile }: { project: typeof projectsData[0], isMobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const tiltRef = React.useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(tiltRef);

  if (isMobile) {
      return (
        <motion.div 
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-lg overflow-hidden shadow-lg"
          >
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
              <div className="relative aspect-video">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={project.dataAiHint}
                />
              </div>
              <div className="p-6">
                <h3 className="font-headline text-2xl font-bold flex items-start">
                  {project.title}
                  <ArrowUpRight className="h-5 w-5 ml-2 mt-1 shrink-0" />
                </h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p className="font-semibold">{project.client}</p>
                  <p>{project.category}</p>
                </div>
              </div>
            </a>
          </motion.div>
      );
  }
  
  return (
    <motion.div variants={itemVariants} className="border-t border-border overflow-hidden">
      <a 
        href={project.liveDemoUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block relative group"
      >
        <motion.div 
          className="absolute inset-0 bg-primary/90 pointer-events-none" 
          initial="hidden"
          animate={hovered ? "visible" : "hidden"}
          variants={backgroundSlideIn}
        />
        <div 
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex justify-between items-center py-8 relative">
            <motion.div initial="hidden" animate="visible" variants={textSlideIn}>
              <h3 
                className={cn(
                  "font-headline text-3xl md:text-5xl font-bold flex items-start transition-colors duration-400 ease-in-out",
                  hovered ? "text-primary-foreground" : "text-foreground"
                )}
              >
                {project.title}
                <ArrowUpRight 
                  className={cn(
                    "w-8 h-8 md:w-12 md:h-12 ml-2 mt-1 shrink-0 transition-transform duration-300",
                    hovered && "-translate-y-1 translate-x-1"
                  )} 
                />
              </h3>
            </motion.div>

            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={textSlideIn}
              className={cn(
                "text-right text-sm transition-colors duration-400 ease-in-out",
                hovered ? "text-primary-foreground/80" : "text-muted-foreground"
              )}
            >
              <p className="font-semibold">{project.client}</p>
              <p>{project.category}</p>
            </motion.div>
            
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute left-1/2 -translate-x-1/2 w-[300px] h-[200px] md:w-[400px] md:h-[250px] rounded-lg overflow-hidden pointer-events-none z-10"
                  style={{
                    rotateX,
                    rotateY,
                    perspective: "1000px"
                  }}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={project.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"/>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </a>
    </motion.div>
  );
}


export function Projects() {
  const isMobile = useIsMobile();

  const headingAndGradient = (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div 
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"
      />
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
    </div>
  );

  if (isMobile) {
    return (
      <section id="projects" className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div 
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"
          />
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
          <div className="grid grid-cols-1 gap-8">
            {projectsData.map((project) => (
              <ProjectRow key={project.title} project={project} isMobile />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      {headingAndGradient}
      <motion.div 
        className="relative border-b border-border" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {projectsData.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
