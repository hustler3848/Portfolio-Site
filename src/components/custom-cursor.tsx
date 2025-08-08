
"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme(); // Will get theme from context
  const [accentColor, setAccentColor] = useState('hsl(var(--primary))');
  const isMobile = useIsMobile();

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  useEffect(() => {
    if (isMobile) return;
    // Function to get the computed accent color
    const updateAccentColor = () => {
      if (typeof window !== 'undefined') {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        setAccentColor(`hsl(${primaryColor})`);
      }
    };
    updateAccentColor();
    
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element && (e.target.closest('a, button, input, label, select, textarea'))) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      if (e.target instanceof Element && (e.target.closest('a, button, input, label, select, textarea'))) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Re-calculate accent color when theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && mutation.target === document.body) {
          updateAccentColor();
        }
      });
    });
    observer.observe(document.body, { attributes: true });


    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      observer.disconnect();
    };
  }, [theme, isMobile]); // Rerun effect when theme changes or isMobile changes

  const variants = {
    default: {
      width: 20,
      height: 20,
      borderColor: accentColor,
      backgroundColor: 'rgba(0,0,0,0)',
      x: cursorX,
      y: cursorY,
      translateX: "-50%",
      translateY: "-50%",
    },
    hover: {
      width: 40,
      height: 40,
      backgroundColor: accentColor,
      opacity: 0.3,
      borderColor: accentColor,
      x: cursorX,
      y: cursorY,
      translateX: "-50%",
      translateY: "-50%",
    },
  };

  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      variants={variants}
      animate={isHovering ? "hover" : "default"}
      transition={{ type: "spring", ...springConfig, duration: 0.2, ease: "easeInOut" }}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block border-2"
    />
  );
}
