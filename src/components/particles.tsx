
"use client";

import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  friction?: number;
  gravity?: number;
}

export function Particles({
  className,
  quantity = 150,
  friction = 0.98,
  gravity = 0.05
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef<{ x: number | null; y: number; }>({ x: null, y: null });
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
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
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
    hue: number;

    constructor() {
      const { w, h } = canvasSize.current;
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.alpha = 0.1 + Math.random() * 0.3;
      this.velocity = { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 };
      this.hue = Math.floor(Math.random() * 360);
      this.color = `hsla(${this.hue}, 100%, 70%, ${this.alpha})`;
    }

    draw() {
      if(context.current) {
        context.current.beginPath();
        context.current.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.current.fillStyle = this.color;
        context.current.fill();
      }
    }

    update() {
      const { w, h } = canvasSize.current;
      
      // Apply gravity
      this.velocity.y += gravity;

      // Apply friction
      this.velocity.x *= friction;
      this.velocity.y *= friction;

      // Attract to mouse
      if (mouse.current.x !== null && mouse.current.y !== null) {
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 1) { // prevent division by zero
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          
          // The force is stronger when closer to the mouse
          const force = (Math.max(300 - dist, 0) / 300) * 0.6;
          
          this.velocity.x += forceDirectionX * force;
          this.velocity.y += forceDirectionY * force;
        }
      }

      // Update position
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      // Bounce off walls
      if (this.x <= this.size || this.x >= w - this.size) {
        this.velocity.x *= -0.8;
        this.x = this.x <= this.size ? this.size : w - this.size;
      }
      if (this.y <= this.size || this.y >= h - this.size) {
        this.velocity.y *= -0.8;
        this.y = this.y <= this.size ? this.size : h - this.size;
      }
      
      // Update color and alpha
      this.hue += 0.5;
      this.color = `hsla(${this.hue}, 100%, 70%, ${this.alpha})`;
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
    <div className={cn("pointer-events-none fixed inset-0 -z-20", className)}>
      <canvas ref={canvasRef} />
    </div>
  );
}
