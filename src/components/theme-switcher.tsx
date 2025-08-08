
"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Zap, Coffee } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeSwitcher() {
  const { theme, setTheme, themes, isChanging } = useTheme();

  const cycleTheme = () => {
    if (isChanging) return;
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };
  
  const getIcon = () => {
    switch(theme) {
      case 'theme-dark': return <Moon />;
      case 'theme-light': return <Sun />;
      case 'theme-cyberpunk': return <Zap />;
      case 'theme-minimal-beige': return <Coffee />;
      default: return <Moon />;
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={cycleTheme} aria-label="Cycle Theme" disabled={isChanging}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {getIcon()}
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  );
}
