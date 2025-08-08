
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code, PenTool, Wind, Smartphone, Server, BrainCircuit } from "lucide-react";

const skills = [
    { name: "React & Next.js", icon: <Code className="h-4 w-4" /> },
    { name: "UI/UX Design", icon: <PenTool className="h-4 w-4" /> },
    { name: "Tailwind CSS", icon: <Wind className="h-4 w-4" /> },
    { name: "Gen AI", icon: <BrainCircuit className="h-4 w-4" /> },
    { name: "Responsive Design", icon: <Smartphone className="h-4 w-4" /> },
    { name: "Firebase", icon: <Server className="h-4 w-4" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const skillsVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
}

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary text-secondary-foreground">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <motion.div 
            className="md:col-span-2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-64 h-64 group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-background">
                  <Image
                    src="https://placehold.co/400x400.png"
                    alt="Darshan"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    data-ai-hint="professional portrait"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
            </div>
          </motion.div>
          <div className="md:col-span-3 text-center md:text-left">
            <motion.p variants={itemVariants} className="text-primary font-semibold tracking-wider uppercase">A Bit About Me</motion.p>
            <motion.h2 variants={itemVariants} className="mb-4">Bridging Design and Technology</motion.h2>
            <motion.p variants={itemVariants} className="text-base md:text-lg text-secondary-foreground/80 mb-6">
              I&apos;m a developer who loves turning ideas into reality with <span className="text-primary">clean code</span> and <span className="text-primary">great design</span>. I am passionate about creating intuitive, dynamic user experiences and am always eager to learn new technologies to push the boundaries of what&apos;s possible on the web.
            </motion.p>
            
            <motion.div
                variants={skillsVariants}
                className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
                {skills.map((skill) => (
                    <motion.div key={skill.name} variants={skillItemVariants}>
                        <Badge variant="outline" className="text-base py-1.5 px-3 border-primary/30 bg-primary/10">
                            {skill.icon}
                            <span className="ml-2">{skill.name}</span>
                        </Badge>
                    </motion.div>
                ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
