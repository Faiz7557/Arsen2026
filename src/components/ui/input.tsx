import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-[#061836] px-3.5 py-2 text-sm text-[#082046] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#082046] dark:focus:ring-blue-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-2xs font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
