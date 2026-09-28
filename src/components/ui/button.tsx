import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "navy" | "gold" | "cyan" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[#1a56db] text-white hover:bg-[#1649b8] focus:ring-blue-500 shadow-md shadow-blue-500/20",
      navy:
        "bg-[#082046] text-white hover:bg-[#0d2f60] focus:ring-[#082046] shadow-md shadow-[#082046]/25 border border-white/10",
      gold:
        "bg-gradient-to-r from-[#f59e0b] via-[#eab308] to-[#d97706] text-[#082046] font-black hover:from-[#d97706] hover:to-[#b45309] hover:text-white focus:ring-amber-500 shadow-md shadow-amber-500/30 border border-amber-200/40",
      cyan:
        "bg-[#0284c7] text-white hover:bg-[#0369a1] focus:ring-cyan-500 shadow-md shadow-cyan-500/20",
      secondary:
        "bg-[#eaf3fd] text-[#082046] hover:bg-[#dbeafe] dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 focus:ring-blue-400 border border-blue-200/60",
      outline:
        "border-2 border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-zinc-800 text-[#082046] dark:text-blue-200 focus:ring-blue-400",
      ghost:
        "bg-transparent hover:bg-blue-50/70 dark:hover:bg-zinc-800 text-[#082046] dark:text-zinc-300 focus:ring-blue-400",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
