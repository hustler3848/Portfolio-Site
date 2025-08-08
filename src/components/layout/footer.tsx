
"use client";

import { Github, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from 'framer-motion';

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/Darshwan" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/darshan-lamichhane-0a1b13278/" },
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/darshan.lamichhane.39" },
];

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.6
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer
      role="contentinfo"
      className="w-full bg-secondary text-secondary-foreground py-16"
    >
      <motion.div 
        className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={itemVariants}>
          <p className="text-primary font-semibold tracking-wider uppercase">Let's Connect</p>
          <h3 className="text-3xl md:text-4xl font-bold mt-2">Got a project in mind?</h3>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <TooltipProvider delayDuration={100}>
            {socialLinks.map((social) => (
              <Tooltip key={social.name}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-2 blob-btn-icon" asChild>
                      <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                        <social.icon className="h-6 w-6" />
                      </a>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </motion.div>

        <motion.p variants={itemVariants} className="text-sm text-muted-foreground mt-4">
          © {new Date().getFullYear()} Darshan. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
}
