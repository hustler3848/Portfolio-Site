
"use client";

import React, { useRef, useEffect } from 'react';
import { useTheme } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
}

export function Particles({
  className,
  quantity = 50,
  staticity = 40,
  ease = 50,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  const { theme } = useTheme();

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, []);
  
  useEffect(() => {
    if (canvasContainerRef.current) {
        const handleMouseMove = (e: MouseEvent) => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const { w, h } = canvasSize.current;
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                mouse.current = {
                    x: x,
                    y: y,
                };
            }
        };
        
        canvasContainerRef.current.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (canvasContainerRef.current) {
                canvasContainerRef.current.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }
  }, []);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
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
    translateX: number;
    translateY: number;
    radius: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;

    constructor(x?: number, y?: number) {
      const { w, h } = canvasSize.current;
      this.x = x ?? Math.random() * w;
      this.y = y ?? Math.random() * h;
      this.translateX = 0;
      this.translateY = 0;
      this.radius = Math.random() * 1.5 + 0.5;
      this.alpha = 0;
      this.targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
      this.dx = (Math.random() - 0.5) * 0.2;
      this.dy = (Math.random() - 0.5) * 0.2;
      this.magnetism = 0.1 + Math.random() * 4;
    }

    draw() {
      if(context.current) {
        let accentHsl;
        if (typeof window !== 'undefined') {
            accentHsl = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        } else {
            accentHsl = "182 100% 50%";
        }

        const [h, s, l] = accentHsl.split(" ").map(val => parseFloat(val));
        context.current.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${this.alpha})`;
        context.current.beginPath();
        context.current.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.current.fill();
      }
    }

    move() {
      const { w, h } = canvasSize.current;
      
      let mx = this.x;
      let my = this.y;

      if(mouse.current.x && mouse.current.y) {
          mx = mouse.current.x;
          my = mouse.current.y;
      }
      
      let dx = this.x - mx;
      let dy = this.y - my;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let a = -1 / (dist / this.magnetism);
      
      this.translateX += dx * a;
      this.translateY += dy * a;

      this.x += (this.translateX + this.dx - this.x) / (staticity / this.radius);
      this.y += (this.translateY + this.dy - this.y) / (staticity / this.radius);

      if (this.x < 0 || this.x > w) this.dx = -this.dx;
      if (this.y < 0 || this.y > h) this.dy = -this.dy;
      if (this.alpha < this.targetAlpha) this.alpha += 0.01;

      this.draw();
    }
  }

  const drawParticles = () => {
    if(!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    for (let i = 0; i < quantity; i++) {
      circles.current.push(new Circle());
    }
    draw();
  };
  
  const draw = () => {
      if(!context.current) return;
      const { w, h } = canvasSize.current;
      context.current.clearRect(0, 0, w, h);
      circles.current.forEach(circle => circle.move());
  }

  const animate = () => {
    draw();
    requestAnimationFrame(animate);
  };
  

  return (
    <div className={cn("w-full h-full", className)} ref={canvasContainerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

    