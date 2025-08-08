
"use client";

import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  ease?: number;
}

export function Particles({
  className,
  quantity = 50,
  ease = 2,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null; dx: number; dy: number }>({ x: null, y: null, dx: 0, dy: 0 });
  const lastMousePosition = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, [theme, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        if (lastMousePosition.current.x !== null) {
            mouse.current.dx = clientX - lastMousePosition.current.x;
            mouse.current.dy = clientY - lastMousePosition.current.y;
        }
        lastMousePosition.current = { x: clientX, y: clientY };
        mouse.current.x = clientX;
        mouse.current.y = clientY;
    };

    const handleMouseLeave = () => {
        mouse.current = { x: null, y: null, dx: 0, dy: 0 };
        lastMousePosition.current = { x: null, y: null };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasRef.current && context.current) {
      canvasSize.current.w = window.innerWidth;
      canvasSize.current.h = window.innerHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  class Circle {
    x: number;
    y: number;
    size: number;
    alpha: number;
    velocity: { x: number; y: number };
    color: string;
    swirlAngle: number;
    swirlRadius: number;

    constructor() {
      const { w, h } = canvasSize.current;
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 8 + 4; // Increased size further
      this.alpha = 0;
      this.velocity = { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 };
      const hue = Math.floor(Math.random() * 360);
      this.color = `${hue}, 100%, 70%`;
      this.swirlAngle = Math.random() * Math.PI * 2;
      this.swirlRadius = Math.random() * 80 + 20;
    }

    draw() {
      if(context.current && this.alpha > 0) {
        context.current.beginPath();
        context.current.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.current.fillStyle = `hsla(${this.color}, ${this.alpha})`;
        context.current.fill();
      }
    }

    update() {
      if (mouse.current.x !== null && mouse.current.y !== null) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseSpeed = Math.sqrt(mouse.current.dx * mouse.current.dx + mouse.current.dy * mouse.current.dy);

          if (dist < 150) {
              this.alpha = Math.min(1, this.alpha + 0.15);
          } else {
              this.alpha = Math.max(0, this.alpha - 0.04);
          }
          
          if (mouseSpeed > 1) { // If mouse is moving, trail it
            if (dist > 0) {
              this.x += dx / (ease / this.size);
              this.y += dy / (ease / this.size);
            }
          } else { // If mouse is still, swirl
            this.swirlAngle += 0.03;
            const swirlX = mouse.current.x + Math.cos(this.swirlAngle) * this.swirlRadius;
            const swirlY = mouse.current.y + Math.sin(this.swirlAngle) * this.swirlRadius;
            const swirlDx = swirlX - this.x;
            const swirlDy = swirlY - this.y;
            this.x += swirlDx / (ease / this.size * 2); // Slower easing for swirl
            this.y += swirlDy / (ease / this.size * 2);
          }

      } else {
          this.alpha = Math.max(0, this.alpha - 0.04);
      }

      // Reset mouse delta
      mouse.current.dx *= 0.95;
      mouse.current.dy *= 0.95;
    }
  }

  const drawParticles = () => {
    circles.current = [];
    for (let i = 0; i < quantity; i++) {
      circles.current.push(new Circle());
    }
  };
  
  const animate = () => {
    if (!context.current) return;
    const { w, h } = canvasSize.current;
    context.current.clearRect(0, 0, w, h);
    
    circles.current.forEach(circle => {
        circle.update();
        circle.draw();
    });

    requestAnimationFrame(animate);
  };
  
  if (isMobile) return null;

  return (
    <div className={cn("pointer-events-none", className)}>
      <canvas ref={canvasRef} />
    </div>
  );
}
