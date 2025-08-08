
"use client";

import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  mainCircleSize?: number;
  sprayInterval?: number; // ms between sprays
  particleLife?: number; // ms
}

export function Particles({
  className,
  mainCircleSize = 15,
  sprayInterval = 100,
  particleLife = 2000,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<any[]>([]);
  const mouse = useRef<{ x: number; y: number; }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const follower = useRef<{ x: number; y: number; }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const lastSprayTime = useRef(0);

  useEffect(() => {
    if (isMobile) return;
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    const animationFrameId = requestAnimationFrame(animate);
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  const initCanvas = () => {
    resizeCanvas();
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

  class Particle {
    x: number;
    y: number;
    size: number;
    alpha: number;
    velocity: { x: number; y: number };
    color: string;
    hue: number;
    life: number;
    maxLife: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1; // Smaller droplets
      this.alpha = 1;
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 2;
      this.velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
      this.hue = Math.floor(Math.random() * 360);
      this.color = `hsla(${this.hue}, 100%, 70%, ${this.alpha})`;
      this.maxLife = particleLife + Math.random() * 1000;
      this.life = this.maxLife;
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
      // Update position
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      // Reduce life
      this.life -= 16; // rough estimate for 60fps

      // Update alpha based on life
      this.alpha = Math.max(0, this.life / this.maxLife);
      this.color = `hsla(${this.hue}, 100%, 70%, ${this.alpha})`;
    }
  }

  const animate = (timestamp: number) => {
    if (!context.current) return;
    const { w, h } = canvasSize.current;
    context.current.clearRect(0, 0, w, h);
    
    // Lerp follower towards mouse
    follower.current.x += (mouse.current.x - follower.current.x) * 0.1;
    follower.current.y += (mouse.current.y - follower.current.y) * 0.1;
    
    // Draw follower circle
    context.current.beginPath();
    context.current.arc(follower.current.x, follower.current.y, mainCircleSize, 0, 2 * Math.PI);
    context.current.fillStyle = `hsl(${timestamp / 20 % 360}, 100%, 70%)`;
    context.current.fill();

    // Spray particles
    if (timestamp - lastSprayTime.current > sprayInterval) {
        particles.current.push(new Particle(follower.current.x, follower.current.y));
        lastSprayTime.current = timestamp;
    }

    // Update and draw particles
    particles.current = particles.current.filter(p => p.life > 0);
    particles.current.forEach(p => {
        p.update();
        p.draw();
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
