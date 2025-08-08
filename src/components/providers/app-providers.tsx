"use client";

import { CustomCursor } from "@/components/custom-cursor";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "./theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  // This hook will ensure that the context is available before rendering children.
  // If the context is not yet available, this component will suspend.
  useTheme();

  return (
    <>
      <CustomCursor />
      {children}
      <Toaster />
    </>
  )
}
