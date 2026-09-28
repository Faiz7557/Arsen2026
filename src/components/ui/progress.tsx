import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number; // 0 - 100
  max?: number;
  className?: string;
  barClassName?: string;
  variant?: "primary" | "success" | "warning" | "danger" | "gradient";
}

export function Progress({
  value,
  max = 100,
  className,
  barClassName,
  variant = "primary",
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantStyles = {
    primary: "bg-blue-600 dark:bg-blue-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    gradient: "bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500",
  }[variant];

  return (
    <div
      className={cn(
        "w-full h-2.5 bg-zinc-200/80 dark:bg-zinc-800 rounded-full overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out",
          variantStyles,
          barClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
