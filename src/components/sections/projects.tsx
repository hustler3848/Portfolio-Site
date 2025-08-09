
"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
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
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: "100%" },
  visible: { 
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9]
    }
  }
}

function ProjectRowMobile({ project }: { project: typeof projectsData[0] }) {
  return (
    <motion.div 
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

export function Projects() {
  const isMobile = useIsMobile();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if(containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(rect.width / 2); // Center horizontally
            mouseY.set(e.clientY - rect.top);
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);


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
              <ProjectRowMobile key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      {headingAndGradient}
      <AnimatePresence>
        {hoveredIndex !== null && projectsData[hoveredIndex] && (
            <motion.div
              style={{
                x: '55%',
                y: smoothMouseY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute w-[300px] h-[200px] md:w-[400px] md:h-[250px] rounded-lg overflow-hidden pointer-events-none z-10"
            >
              <Image
                src={projectsData[hoveredIndex].imageUrl}
                alt={projectsData[hoveredIndex].title}
                fill
                sizes="400px"
                style={{ objectFit: 'cover' }}
                data-ai-hint={projectsData[hoveredIndex].dataAiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"/>
            </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        ref={containerRef}
        className="relative border-b border-border" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {projectsData.map((project, index) => (
            <div key={project.title} className="overflow-hidden">
                <motion.a 
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants} 
                    onMouseEnter={() => setHoveredIndex(index)}
                    className="block group project-card"
                >
                    <motion.div 
                        animate={{
                            backgroundColor: hoveredIndex === index ? 'hsl(var(--primary))' : 'transparent',
                            color: hoveredIndex === index ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="container mx-auto px-4 sm:px-6 lg:px-8"
                    >
                        <div className="flex justify-between items-center py-8 relative border-t border-border">
                            <h3 className="font-headline text-3xl md:text-5xl font-bold flex items-start">
                                {project.title}
                                <ArrowUpRight 
                                    className={cn(
                                        "w-8 h-8 md:w-12 md:h-12 ml-2 mt-1 shrink-0 transition-transform duration-300",
                                        hoveredIndex === index && "-translate-y-1 translate-x-1"
                                    )} 
                                />
                            </h3>

                            <motion.div 
                                animate={{ color: hoveredIndex === index ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))' }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="text-right text-sm"
                            >
                                <p className="font-semibold">{project.client}</p>
                                <p>{project.category}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.a>
            </div>
        ))}
      </motion.div>
    </section>
  );
}
