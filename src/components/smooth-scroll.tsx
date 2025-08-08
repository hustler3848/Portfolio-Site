"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePathname } from 'next/navigation';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) {
      return;
    }

    const scroll = new LocomotiveScroll({
      el: scrollRef.current as HTMLElement,
      smooth: true,
      lerp: 0.08,
    });

    return () => {
      scroll.destroy();
    };
  }, [isMobile, pathname]);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
}
