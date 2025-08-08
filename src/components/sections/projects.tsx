"use client";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";

const projectsData = [
  {
    title: "FrameFlux",
    description: "Explore a vast library of movies, web series, and anime. Discover new titles, read reviews, and track your watchlist in this sleek entertainment hub.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: ["Next JS", "Firebase"],
    liveUrl: "https://frameflux.vercel.app/",
    githubUrl: "https://github.com/hustler3848/FrameFlux",
    dataAiHint: "movie app",
  },
  {
    title: "CodeSnippr",
    description: "A developer's productivity tool to save, organize, and quickly access code snippets. Boost your workflow and never lose a useful piece of code again.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: ["Next JS", "Firebase"],
    liveUrl: "https://dev-book-weld.vercel.app/",
    githubUrl: "https://github.com/hustler3848/DevBook",
    dataAiHint: "code snippet",
  },
  {
    title: "MindGuard",
    description: "A supportive space for students to prioritize their mental well-being. Access resources, track moods, and find tools to help manage academic stress.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: ["Next JS", "Firebase"],
    liveUrl: "https://mind-guard-three.vercel.app/",
    githubUrl: "https://github.com/hustler3848/Mind-Guard",
    dataAiHint: "mental health",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          My Work
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
