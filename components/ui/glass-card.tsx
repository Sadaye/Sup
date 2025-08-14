import { cn } from "@/lib/utils";
import * as React from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";