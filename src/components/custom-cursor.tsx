
"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

const themeColors = {
  'theme-dark': 'hsl(0 0% 96%)', // foreground
  'theme-light': 'hsl(0 0% 10%)', // foreground
  'theme-cyberpunk': 'hsl(127 100% 82%)', // foreground
  'theme-minimal-beige': 'hsl(0 0% 17%)', // foreground
  'project-hover-color': 'hsl(var(--primary))'
};

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const { theme } = useTheme(); 
  const isMobile = useIsMobile();

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  useEffect(() => {
    if (isMobile) return;
    
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element) {
          if (e.target.closest('a, button, input, label, select, textarea')) {
            setIsHovering(true);
          }
          if (e.target.closest('.group.project-card')) { 
            setIsHoveringProject(true);
          }
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
        if (e.target instanceof Element) {
            if (e.target.closest('a, button, input, label, select, textarea')) {
              setIsHovering(false);
            }
            if (e.target.closest('.group.project-card')) {
                setIsHoveringProject(false);
            }
        }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);


    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile]);

  const cursorColor = themeColors[theme] || 'hsl(0 0% 96%)';

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: cursorColor,
      mixBlendMode: 'difference' as const,
    },
    hover: {
      width: 40,
      height: 40,
      backgroundColor: cursorColor,
      mixBlendMode: 'difference' as const,
    },
    projectHover: {
      width: 80,
      height: 80,
      backgroundColor: themeColors['project-hover-color'],
      mixBlendMode: 'difference' as const,
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={isHoveringProject ? "projectHover" : isHovering ? "hover" : "default"}
      transition={{ type: "spring", ...springConfig, duration: 0.2, ease: "easeInOut" }}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
    />
  );
}
