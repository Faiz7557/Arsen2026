"use client";

import React from "react";
import { Award, Printer, X, ShieldCheck, Sparkles, CheckCircle2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreditScoreDetail, UMKM } from "@/types";

interface CreditCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  umkm: UMKM;
  scoreDetail: CreditScoreDetail;
}

export function CreditCertificateModal({
  isOpen,
  onClose,
  umkm,
  scoreDetail,
}: CreditCertificateModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateNumber = `ICS-GIAT/ASE2026/09/${umkm.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateFormatted = "28 September 2026";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#041124]/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#071c3b] p-6 sm:p-8 shadow-2xl border-4 border-amber-300 dark:border-amber-500/60 text-[#082046] dark:text-white space-y-6 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Tutup Sertifikat"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Certificate Formal Header */}
        <div className="text-center border-b-2 border-amber-200/80 dark:border-blue-900 pb-5 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            <Award className="h-4 w-4" />
            <span>Airlangga Statistics Event (ASE) 2026 • Regulatory Sandbox</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#082046] dark:text-white">
            Sertifikat Kelayakan Kredit Alternatif
          </h2>
          <p className="text-xs text-slate-500 dark:text-blue-200/70 font-serif italic">
            Innovative Credit Scoring (ICS) Engine • Gerakan Inklusif Agunan Terintegrasi (GIAT)
          </p>

          <div className="inline-block mt-1 font-mono text-[11px] bg-slate-100 dark:bg-[#041124] px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-blue-200">
            No. Dokumen: {certificateNumber}
          </div>
        </div>

        {/* UMKM Profile Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-amber-50/50 dark:bg-[#051630] border border-amber-200/60 dark:border-blue-900/60 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Nama Usaha:</span>
            <div className="font-extrabold text-[#082046] dark:text-white truncate">
              {umkm.name}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Pemilik / Pengelola:</span>
            <div className="font-bold text-[#082046] dark:text-white">
              {umkm.owner}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Klaster Wilayah:</span>
            <div className="font-bold text-[#0284c7]">
              {umkm.cluster}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Lokasi Usaha:</span>
            <div className="font-bold text-[#082046] dark:text-white truncate">
              {umkm.city}, {umkm.province}
            </div>
          </div>
        </div>

        {/* Score & Underwriting Decision Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#082046] via-[#0d2f60] to-[#123e7a] text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5 border border-white/10">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
              Hasil Evaluasi Algoritma Objektif
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300">
              Skor: {scoreDetail.totalScore}{" "}
              <span className="text-xl sm:text-2xl text-white font-mono">/ 850</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>GRADE {scoreDetail.grade} • SANGAT BANKABLE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center sm:text-right shrink-0">
            <div className="p-3 rounded-xl bg-white/10 border border-white/15">
              <span className="text-[10px] text-blue-200 block">Rekomendasi Plafon</span>
              <span className="text-lg font-black text-white">
                Rp {(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Juta
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15">
              <span className="text-[10px] text-blue-200 block">Suku Bunga KUR</span>
              <span className="text-lg font-black text-emerald-300">
                {scoreDetail.estimatedInterestRate}% p.a.
              </span>
            </div>
          </div>
        </div>

        {/* 5-Dimensional Breakdown Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-blue-200">
            Transparansi Pembobotan 5 Parameter (Agunan Digital):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            {Object.entries(scoreDetail.dimensions).map(([key, dim]) => (
              <div
                key={key}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#061836] border border-slate-200 dark:border-blue-900/40 text-center space-y-1"
              >
                <span className="text-[10px] text-slate-500 dark:text-blue-200 font-semibold block truncate">
                  {dim.name}
                </span>
                <div className="text-base font-black text-[#082046] dark:text-white">
                  {dim.score}
                  <span className="text-[10px] text-slate-400 font-normal">/100</span>
                </div>
                <span className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 font-bold block">
                  Bobot {dim.weight}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer & Verification Seals */}
        <div className="pt-4 border-t border-slate-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-xl bg-[#082046] text-white p-2 flex items-center justify-center border border-amber-300 shadow-md">
              <QrCode className="h-10 w-10 text-amber-300" />
            </div>
            <div className="text-[11px] leading-tight text-slate-500 dark:text-blue-200/80">
              <div className="font-bold text-[#082046] dark:text-white">
                Terverifikasi Digital Ledger GIAT
              </div>
              <div>Subtema: Sosial Ekonomi • Arsen 2026</div>
              <div className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                Tim IRIS Iqbal I&apos;tishom (ASICM036)
              </div>
            </div>
          </div>

          <div className="text-right text-[11px] text-slate-400 hidden sm:block">
            <div>Diterbitkan: {dateFormatted}</div>
            <div>Berlaku hingga: 28 September 2027</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-xs font-bold"
          >
            Tutup
          </Button>
          <Button
            variant="gold"
            onClick={handlePrint}
            className="gap-2 text-xs font-black shadow-lg"
          >
            <Printer className="h-4 w-4" />
            <span>Cetak / Simpan PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
