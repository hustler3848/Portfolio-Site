"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Palette, Sun, Moon, Zap, Leaf } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeSwitcher() {
  const { theme, setTheme, accentColor, setAccentColor, themes } = useTheme();

  const cycleTheme = () => {
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };
  
  const getIcon = () => {
    switch(theme) {
      case 'theme-dark': return <Moon />;
      case 'theme-light': return <Sun />;
      case 'theme-cyberpunk': return <Zap />;
      case 'theme-beige': return <Leaf />;
      default: return <Moon />;
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={cycleTheme}>
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
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Palette />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Customize</h4>
              <p className="text-sm text-muted-foreground">
                Pick an accent color.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="relative">
                <input
                  id="accent-color"
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-full h-10 p-1 border rounded-md appearance-none cursor-pointer"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "hsl(var(--border))",
                  }}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
