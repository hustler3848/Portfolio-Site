
"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useTheme } from "../providers/theme-provider";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const { theme } = useTheme();

  const updateHeaderStyle = (scrolled: boolean) => {
    if (typeof window !== 'undefined') {
        const style = getComputedStyle(document.body);
        const backgroundHslString = style.getPropertyValue('--background').trim();
        
        const hslMatch = backgroundHslString.match(/(\d{1,3})(?:(?:\s,?\s*)|,)(\d{1,3})%?(?:(?:\s,?\s*)|,)(\d{1,3})%?/);
        if(!hslMatch) return;
        const [h, s, l] = [hslMatch[1], hslMatch[2], hslMatch[3]];

        const backgroundStart = `hsla(${h}, ${s}%, ${l}%, 0)`;
        const backgroundEnd = `hsla(${h}, ${s}%, ${l}%, 0.8)`;
        
        if (scrolled) {
          controls.start({
            backgroundColor: backgroundEnd,
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          });
        } else {
          controls.start({
            backgroundColor: backgroundStart,
            backdropFilter: "blur(4px)",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          });
        }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    updateHeaderStyle(isScrolled);
  }, [theme, isScrolled, controls]);
  
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
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('#hero');}} className="font-headline text-2xl font-bold text-foreground transition-colors hover:text-primary">
          Darshan
        </a>
        <nav className="hidden items-center gap-2 md:flex rounded-full px-2">
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
