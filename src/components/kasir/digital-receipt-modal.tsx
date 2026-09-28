"use client";

import React from "react";
import { CheckCircle2, Printer, X, Sparkles, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction, UMKM } from "@/types";

interface DigitalReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  umkm: UMKM;
}

export function DigitalReceiptModal({
  isOpen,
  onClose,
  transaction,
  umkm,
}: DigitalReceiptModalProps) {
  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(transaction.timestamp).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041124]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#071c3b] p-6 shadow-2xl border border-blue-200 dark:border-blue-800 text-[#082046] dark:text-white space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Tutup Struk"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success Icon */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 shadow-md animate-bounce">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Transaksi Sukses Terekam
          </span>
          <h3 className="text-lg font-black text-[#082046] dark:text-white mt-0.5">
            Struk Digital GIAT Kasir
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-blue-200/70">
            Jejak transaksi otomatis masuk perhitungan Innovative Credit Scoring (ICS)
          </p>
        </div>

        {/* Realistic Thermal Receipt Card */}
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-[#041124] border border-amber-200/80 dark:border-blue-900/60 font-mono text-xs space-y-3 shadow-inner">
          <div className="text-center pb-2 border-b border-dashed border-slate-300 dark:border-slate-700">
            <div className="font-black text-sm tracking-tight text-[#082046] dark:text-white">
              {umkm.name.toUpperCase()}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-blue-200/70">
              NMID: {umkm.qrisId} • {umkm.city}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{formattedDate}</div>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">No. Ref:</span>
              <span className="font-bold">{transaction.referenceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Pelanggan:</span>
              <span className="font-bold">{transaction.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kategori / Menu:</span>
              <span className="font-bold truncate max-w-[160px] text-right">{transaction.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Metode Bayar:</span>
              <span className="font-black text-[#0284c7]">{transaction.method}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 flex justify-between items-baseline">
            <span className="font-bold text-xs uppercase text-slate-600 dark:text-slate-300">TOTAL:</span>
            <span className="font-black text-base text-[#082046] dark:text-amber-300">
              Rp {transaction.amount.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Ledger & Credit Impact Notice */}
          <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 text-center space-y-1">
            <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3" />
              <span>+2 Poin Konsistensi Arus Kas</span>
            </div>
            <div className="text-[9px] text-slate-400">
              *** TERVERIFIKASI SISTEM GIAT OJK SANDBOX ***
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="flex-1 gap-1.5 text-xs font-bold border-slate-300 dark:border-slate-700"
          >
            <Printer className="h-4 w-4" />
            <span>Cetak Struk</span>
          </Button>
          <Button
            variant="navy"
            onClick={onClose}
            className="flex-1 text-xs font-black shadow-md"
          >
            Transaksi Baru
          </Button>
        </div>
      </div>
    </div>
  );
}
