import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  badge?: string;
  accentColor?: "navy" | "gold" | "cyan" | "emerald";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  badge,
  accentColor = "navy",
}: StatCardProps) {
  const iconBgStyles = {
    navy: "bg-[#082046] text-white shadow-sm shadow-[#082046]/20",
    gold: "bg-amber-100 text-amber-800 border border-amber-300 shadow-sm",
    cyan: "bg-cyan-100 text-cyan-800 border border-cyan-300 shadow-sm",
    emerald: "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm",
  }[accentColor];

  return (
    <div
      className={cn(
        "rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-[#071c3b] p-5 shadow-sm shadow-blue-950/5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-500 dark:text-blue-200/60 uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className={cn("p-2 rounded-xl text-xs", iconBgStyles)}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2 flex-wrap">
        <h3 className="text-2xl sm:text-3xl font-black text-[#082046] dark:text-white tracking-tight">
          {value}
        </h3>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]">
            {badge}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-bold",
                trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {trend.value}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-500 dark:text-blue-200/60 truncate font-medium">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
