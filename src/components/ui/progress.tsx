import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number; // 0 - 100
  max?: number;
  className?: string;
  barClassName?: string;
  variant?: "primary" | "success" | "warning" | "danger" | "gradient" | "gold";
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
    primary: "bg-[#0284c7]",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    gold: "bg-gradient-to-r from-amber-400 to-[#d97706]",
    gradient: "bg-gradient-to-r from-[#0284c7] via-[#2563eb] to-[#f59e0b]",
  }[variant];

  return (
    <div
      className={cn(
        "w-full h-2.5 bg-blue-100 dark:bg-blue-950/80 rounded-full overflow-hidden border border-blue-200/40",
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
