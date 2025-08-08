"use client";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";

const projectsData = [
  {
    title: "Project Alpha",
    description: "A cutting-edge web application for data visualization.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: ["React", "Next.js", "D3.js"],
    liveUrl: "#",
    githubUrl: "#",
    dataAiHint: "data visualization",
  },
  {
    title: "Project Beta",
    description: "An e-commerce platform with a focus on user experience.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: ["Vue.js", "Nuxt", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    dataAiHint: "ecommerce platform",
  },
  {
    title: "Project Gamma",
    description: "A mobile-first social networking app.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: ["React Native", "Firebase", "GraphQL"],
    liveUrl: "#",
    githubUrl: "#",
    dataAiHint: "social networking",
  },
  {
    title: "Project Delta",
    description: "A content management system for creative writers.",
    imageUrl: "https://placehold.co/600x400.png",
    tags: ["SvelteKit", "Tailwind CSS", "Supabase"],
    liveUrl: "#",
    githubUrl: "#",
    dataAiHint: "content management",
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
