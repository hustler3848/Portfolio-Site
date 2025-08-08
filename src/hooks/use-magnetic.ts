
import { useState, useEffect, RefObject } from 'react';
import { useSpring } from 'framer-motion';

export function useMagnetic(ref: RefObject<HTMLElement>, strength = 20) {
  const [isHovering, setIsHovering] = useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - elementCenterX;
      const deltaY = e.clientY - elementCenterY;
      
      x.set(deltaX * (strength / 100));
      y.set(deltaY * (strength / 100));
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, isHovering, strength, x, y]);

  return { x, y };
}
