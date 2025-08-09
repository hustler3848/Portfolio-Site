
"use client";

import { useRef, RefObject } from 'react';
import { useSpring, useTransform, motionValue } from 'framer-motion';

const springConfig = {
    stiffness: 150,
    damping: 20,
    mass: 0.1
};

export function useTilt(ref: RefObject<HTMLElement>, strength = 15) {
    const x = motionValue(0);
    const y = motionValue(0);

    const rotateX = useSpring(useTransform(y, [-1, 1], [`${strength}deg`, `-${strength}deg`]), springConfig);
    const rotateY = useSpring(useTransform(x, [-1, 1], [`-${strength}deg`, `${strength}deg`]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };
    
    return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

