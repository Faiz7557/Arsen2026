import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "navy"
    | "gold"
    | "cyan"
    | "success"
    | "warning"
    | "danger"
    | "outline"
    | "cluster0"
    | "cluster1"
    | "cluster2";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-blue-100 text-[#082046] dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    navy: "bg-[#082046] text-white border-[#082046] shadow-sm",
    gold: "bg-[#fef3c7] text-[#92400e] border-[#fcd34d] font-bold shadow-xs",
    cyan: "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd] font-semibold",
    success: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
    warning: "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800",
    danger: "bg-rose-100 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800",
    outline: "border-blue-200 dark:border-blue-800 text-[#082046] dark:text-blue-200 bg-white/80 dark:bg-zinc-900/80",
    cluster0: "bg-[#082046] text-white border-[#38bdf8] font-bold shadow-sm",
    cluster1: "bg-[#0284c7] text-white border-[#bae6fd] font-bold shadow-sm",
    cluster2: "bg-[#fef08a] text-[#854d0e] border-[#f59e0b] font-bold shadow-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
