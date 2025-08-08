
"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const { theme } = useTheme(); 
  const [cursorColor, setCursorColor] = useState('hsl(var(--foreground))');
  const isMobile = useIsMobile();

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  useEffect(() => {
    if (isMobile) return;
    
    const updateCursorColor = () => {
        if (typeof window !== 'undefined') {
            const foregroundHslString = getComputedStyle(document.body).getPropertyValue('--foreground').trim();
            setCursorColor(`hsl(${foregroundHslString})`);
        }
    }
    updateCursorColor();

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

    const observer = new MutationObserver(updateCursorColor);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });


    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      observer.disconnect();
    };
  }, [theme, isMobile]);

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: cursorColor,
      mixBlendMode: 'difference' as const,
      x: cursorX,
      y: cursorY,
      translateX: "-50%",
      translateY: "-50%",
    },
    hover: {
      width: 40,
      height: 40,
      backgroundColor: cursorColor,
      mixBlendMode: 'difference' as const,
      x: cursorX,
      y: cursorY,
      translateX: "-50%",
      translateY: "-50%",
    },
    projectHover: {
      width: 80,
      height: 80,
      backgroundColor: 'hsl(var(--primary))',
      mixBlendMode: 'difference' as const,
      x: cursorX,
      y: cursorY,
      translateX: "-50%",
      translateY: "-50%",
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      variants={variants}
      animate={isHoveringProject ? "projectHover" : isHovering ? "hover" : "default"}
      transition={{ type: "spring", ...springConfig, duration: 0.2, ease: "easeInOut" }}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
    />
  );
}
