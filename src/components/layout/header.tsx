
"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { usePathname } from "next/navigation";
import { useTheme } from "../providers/theme-provider";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const style = getComputedStyle(document.body);
        const backgroundHslString = style.getPropertyValue('--background').trim();
        const [h, s, l] = backgroundHslString.split(" ").map(v => parseFloat(v));
        
        const backgroundStart = `hsla(${h}, ${s}%, ${l}%, 0)`;
        const backgroundEnd = `hsla(${h}, ${s}%, ${l}%, 0.8)`;
        
        if (isScrolled) {
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
  }, [isScrolled, controls, theme]);
  
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
        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href);}}
              className="link-underline text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
          <ThemeSwitcher />
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
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
                className="text-lg font-medium text-foreground"
              >
                {link.name}
              </a>
            ))}
            <ThemeSwitcher />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
