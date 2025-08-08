
"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
        setIsScrolled(latest > 10);
    });
  }, [scrollY]);
  
  useEffect(() => {
    controls.start({
        backgroundColor: isScrolled ? "hsl(var(--background) / 0.8)" : "hsl(var(--background) / 0)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "0 0 0 rgba(0, 0, 0, 0)",
        transition: { duration: 0.5, ease: "easeInOut" }
    });
  }, [isScrolled, controls]);


  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if(element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
    setIsOpen(false);
  };


  return (
    <motion.header
      animate={controls}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('#hero');}} className="font-headline text-2xl font-bold text-foreground transition-colors hover:text-primary">
          Darshan
        </a>
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              asChild
              className="blob-link text-base font-medium text-foreground transition-colors rounded-full px-4 py-2"
            >
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href);}}
              >
                {link.name}
              </a>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
        >
          <div className="flex flex-col items-center gap-6 bg-background/95 py-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href);}}
                className="text-lg font-medium text-foreground transition-colors hover:text-primary/90"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
