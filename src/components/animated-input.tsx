
"use client";

import { UseFormReturn } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface AnimatedInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  Icon: LucideIcon;
  type?: "text" | "email" | "textarea";
  onEnterPress?: () => void;
}

export function AnimatedInput({
  form,
  name,
  label,
  Icon,
  type = "text",
  onEnterPress
}: AnimatedInputProps) {
  const { register, formState: { errors, touchedFields }, watch } = form;
  const value = watch(name);
  const isTouched = touchedFields[name];
  const error = errors[name];
  
  const [isFocused, setIsFocused] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && onEnterPress && type !== 'textarea') {
      e.preventDefault();
      onEnterPress();
    }
  };

  const commonProps = {
    id: name,
    ...register(name),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  return (
    <div className="relative">
      <motion.div 
        animate={{ scale: isFocused ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10"
      >
        <Icon className="h-5 w-5" />
      </motion.div>

      <Label
        htmlFor={name}
        className={cn(
          "absolute left-10 transition-all duration-300 ease-in-out pointer-events-none",
          (value || isFocused)
            ? "top-1 text-xs text-primary"
            : "top-1/2 -translate-y-1/2 text-base text-muted-foreground"
        )}
      >
        {label}
      </Label>

      {type === 'textarea' ? (
         <Textarea
          {...commonProps}
          onKeyDown={handleKeyDown}
          className="pl-10 pt-6 bg-transparent"
          rows={5}
        />
      ) : (
        <Input
            type={type}
            {...commonProps}
            onKeyDown={handleKeyDown}
            className="pl-10 pt-6 h-14 bg-transparent"
        />
      )}

      <AnimatePresence>
        {error && isTouched && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-xs text-destructive"
          >
            {error.message as string}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
