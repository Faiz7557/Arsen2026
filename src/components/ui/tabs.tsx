"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode; badge?: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-200 dark:border-blue-800 shadow-xs",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
              isActive
                ? "bg-[#082046] text-white shadow-md border border-white/10"
                : "text-slate-600 dark:text-blue-200 hover:text-[#082046] hover:bg-white/60 dark:hover:bg-white/10"
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={cn(
                  "px-2 py-0.5 text-[10px] rounded-full font-black",
                  isActive
                    ? "bg-amber-400 text-[#082046]"
                    : "bg-blue-100 text-[#082046] dark:bg-blue-900 dark:text-blue-200"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
