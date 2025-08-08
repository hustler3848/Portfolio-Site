
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogData = [
  {
    id: 1,
    title: "15 Best Chrome Extensions for Productivity in 2025 (Tested)",
    excerpt: "15 Best Chrome Extensions for Productivity in 2025 (Tested)",
    date: "April 25, 2025",
    readTime: "7 min read",
    imageUrl: "/images/blog-1.png",
    url: "https://info-glimpse.blogspot.com/2025/04/best-chrome-extensions-for-productivity.html",
    dataAiHint: "chrome extensions productivity",
  },
  {
    id: 2,
    title: "7 Best Free Productivity Apps for Students (2025)",
    excerpt: "Let’s face it — juggling lectures, assignments, group projects, and maybe even a part-time job?",
    date: "April 25, 2025",
    readTime: "10 min read",
    imageUrl: "/images/blog-2.png",
    url: "https://info-glimpse.blogspot.com/2025/04/best-free-productivity-apps-for.html",
    dataAiHint: "student productivity apps",
  },
  {
    id: 3,
    title: "How to Use ChatGPT for Content Writing",
    excerpt: "Writing content doesn’t have to be a long, stressful process anymore. Whether you're a blogger, marketer, or student, ChatGPT can be your powerful sidekick",
    date: "July 22, 2025",
    readTime: "9 min read",
    imageUrl: "/images/blog-3.png",
    url: "https://info-glimpse.blogspot.com/2025/07/how-to-use-chatgpt-for-content-writing.html",
    dataAiHint: "ai content writing",
  },
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

export function Blogs() {
  return (
    <section id="blogs" className="py-24 bg-secondary text-secondary-foreground">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-foreground to-primary animate-shine-infinite">
            From My Blog
          </h2>
          <p className="text-base md:text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
            A collection of my thoughts on design, development, and the tech world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="relative bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-primary/20 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="overflow-hidden aspect-[1.5/1] relative">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      data-ai-hint={post.dataAiHint}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                       <div className="flex items-center gap-1.5">
                           <Calendar className="w-4 h-4"/>
                           <span>{post.date}</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                           <Clock className="w-4 h-4"/>
                           <span>{post.readTime}</span>
                       </div>
                    </div>
                    <h3 className="font-headline text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-secondary-foreground/80 line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="inline-flex items-center font-semibold text-primary group-hover:text-primary/90 transition-colors duration-300">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
        <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
        >
          <Button size="lg" asChild className="blob-link">
            <a href="#!" target="_blank" rel="noopener noreferrer">View More</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
