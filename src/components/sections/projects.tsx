
"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useSpring } from "framer-motion";
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
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function ProjectRowMobile({ project }: { project: typeof projectsData[0] }) {
  return (
    <motion.div
      variants={itemVariants}
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
  const [mouseY, setMouseY] = useState(0);

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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-8"
          >
            {projectsData.map((project) => (
              <ProjectRowMobile key={project.title} project={project} />
            ))}
          </motion.div>
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
                top: `${mouseY}px`,
                right: '20%',
                translateX: "0%",
                translateY: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: {duration: 0.4, ease: 'easeOut'} }}
              exit={{ opacity: 0, scale: 0.8, transition: {duration: 0.2, ease: 'easeOut'} }}
              className="absolute w-[300px] h-[200px] md:w-[400px] md:h-[250px] rounded-lg overflow-hidden pointer-events-none z-10"
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                <Image
                  src={projectsData[hoveredIndex].imageUrl}
                  alt={projectsData[hoveredIndex].title}
                  fill
                  sizes="400px"
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={projectsData[hoveredIndex].dataAiHint}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"/>
            </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative border-b border-border"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {projectsData.map((project, index) => (
            <motion.a
                key={project.title}
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                onMouseEnter={(e) => {
                  setHoveredIndex(index);
                  setMouseY(e.clientY);
                }}
                onMouseMove={(e) => setMouseY(e.clientY)}
                className="block group project-card project-link-hover"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-8 relative border-t border-border group-hover:border-transparent transition-colors duration-200">
                        <h3 className="font-headline text-3xl md:text-5xl font-bold flex items-start transition-colors duration-200">
                            {project.title}
                            <ArrowUpRight
                                className={cn(
                                    "w-8 h-8 md:w-12 md:h-12 ml-2 mt-1 shrink-0 transition-transform duration-300",
                                    hoveredIndex === index && "-translate-y-1 translate-x-1"
                                )}
                            />
                        </h3>

                        <div className="text-right text-sm text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200">
                            <p className="font-semibold">{project.client}</p>
                            <p>{project.category}</p>
                        </div>
                    </div>
                </div>
            </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

    