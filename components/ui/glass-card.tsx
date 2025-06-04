import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "prominent" | "subtle";
  className?: string;
}

const variants = {
  default: "glass-card p-6",
  prominent: "glass-card p-6 shadow-xl",
  subtle: "glass-card p-4 shadow-sm",
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";