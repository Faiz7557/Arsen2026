"use client";

import React from "react";
import { useGiat } from "@/context/giat-context";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, dismissToast } = useGiat();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const bgColors = {
          success: "bg-emerald-950 border-emerald-500/50 text-white shadow-emerald-950/40",
          info: "bg-[#082046] border-blue-400/50 text-white shadow-[#082046]/40",
          warning: "bg-amber-950 border-amber-500/50 text-white shadow-amber-950/40",
          error: "bg-rose-950 border-rose-500/50 text-white shadow-rose-950/40",
        };

        const Icon =
          toast.type === "success"
            ? CheckCircle2
            : toast.type === "warning" || toast.type === "error"
            ? AlertCircle
            : Info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-3 duration-200 ${bgColors[toast.type]}`}
          >
            <Icon className="h-5 w-5 shrink-0 mt-0.5 text-amber-300" />
            <div className="flex-1 text-sm">
              <h4 className="font-black tracking-tight">{toast.title}</h4>
              {toast.description && (
                <p className="mt-0.5 text-xs text-blue-100/80 leading-relaxed font-medium">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
