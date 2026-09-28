"use client";

import React from "react";
import { useGiat } from "@/context/giat-context";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, dismissToast } = useGiat();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: "bg-emerald-900/90 border-emerald-700 text-white",
          info: "bg-blue-900/90 border-blue-700 text-white",
          warning: "bg-amber-900/90 border-amber-700 text-white",
          error: "bg-rose-900/90 border-rose-700 text-white",
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
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-3 duration-200 ${bgColors[toast.type]}`}
          >
            <Icon className="h-5 w-5 shrink-0 mt-0.5 opacity-90" />
            <div className="flex-1 text-sm">
              <h4 className="font-semibold">{toast.title}</h4>
              {toast.description && (
                <p className="mt-0.5 text-xs opacity-90 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-md hover:bg-white/20 transition-colors"
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
