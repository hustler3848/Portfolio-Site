
"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const { accentColor } = useTheme();

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const cursorX = useSpring(position.x, springConfig);
  const cursorY = useSpring(position.y, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof Element && (e.target.closest('a, button, input[type="color"], label'))) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      if (e.target instanceof Element && (e.target.closest('a, button, input[type="color"], label'))) {
        setIsHovering(false);
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
  }, []);

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
      borderColor: accentColor,
      x: cursorX,
      y: cursorY,
      translateX: "-50%",
      translateY: "-50%",
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={isHovering ? "hover" : "default"}
      transition={{ type: "spring", ...springConfig, duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block border-2"
    />
  );
}
