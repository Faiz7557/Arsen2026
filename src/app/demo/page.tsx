"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Gauge,
  Network,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Compass,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGiat } from "@/context/giat-context";

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { activeUmkm, transactions, addTransaction, scoreDetail, submitLoanApplication } = useGiat();
  const [simulatedScanDone, setSimulatedScanDone] = useState(false);
  const [simulatedApplyDone, setSimulatedApplyDone] = useState(false);

  const steps = [
    {
      num: 1,
      title: "Identifikasi Paradoks UMKM",
      subtitle: "Feasible namun Tidak Bankable",
      icon: Compass,
    },
    {
      num: 2,
      title: "GIAT Kasir & QRIS",
      subtitle: "Merekam Transaksi Offline & Online",
      icon: CreditCard,
    },
    {
      num: 3,
      title: "GIAT Score",
      subtitle: "Kalkulasi Skor Kredit Alternatif",
      icon: Gauge,
    },
    {
      num: 4,
      title: "GIAT Connect",
      subtitle: "Pengajuan ke Bank Tanpa Agunan Fisik",
      icon: Network,
    },
    {
      num: 5,
      title: "Dampak Spasial Makro",
      subtitle: "Menuju Indonesia Emas 2045",
      icon: Award,
    },
  ];

  const handleDemoScan = () => {
    addTransaction({
      umkmId: activeUmkm.id,
      customerName: "Rian (Pengunjung Demo Lomba)",
      amount: 45000,
      method: "QRIS",
      category: "Paket Demo Spesial",
    });
    setSimulatedScanDone(true);
  };

  const handleDemoApply = () => {
    submitLoanApplication("partner-bri", 35000000, 24, "Modal Usaha");
    setSimulatedApplyDone(true);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="default" className="text-xs px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
          🎯 Panduan Demo Interaktif untuk Dewan Juri
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Tur End-to-End Solusi GIAT
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Ikuti simulasi interaktif 5 langkah ini untuk memahami bagaimana gagasan inovasi GIAT bekerja dari pencatatan kasir hingga penyaluran kredit perbankan.
        </p>
      </div>

      {/* Step Indicator Bar */}
      <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="grid grid-cols-5 gap-2">
          {steps.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`flex flex-col items-center text-center p-2 rounded-xl transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-md font-bold"
                    : isDone
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-1.5 ${
                  isCurrent
                    ? "bg-blue-600 text-white"
                    : isDone
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                }`}>
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                </div>
                <span className="text-[11px] font-bold hidden sm:inline truncate max-w-full">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-10 shadow-xl min-h-[460px] flex flex-col justify-between">
        {/* Step 1: Problem Identification */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Langkah 1 dari 5</Badge>
              <span className="text-xs text-zinc-500">• Diagnosis Masalah Awal</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
                Memperkenalkan &quot;The Sleeping Giant&quot;
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Temui <strong>{activeUmkm.name}</strong>, salah satu dari 64,2 juta UMKM di Indonesia. Usahanya sangat laris dan menguntungkan (feasible), namun ditolak bank karena tidak punya sertifikat tanah ataupun laporan pembukuan akuntansi formal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs text-zinc-400">Profil Usaha</span>
                <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  {activeUmkm.avatar} {activeUmkm.name}
                </div>
                <span className="text-xs text-zinc-500">{activeUmkm.category} • {activeUmkm.city}</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <span className="text-xs text-amber-800 dark:text-amber-300">Omzet Nyata</span>
                <div className="text-lg font-bold text-amber-900 dark:text-amber-200 mt-1">
                  Rp {(activeUmkm.monthlyRevenue / 1000000).toFixed(1)} Jt / bln
                </div>
                <span className="text-xs text-zinc-500">48+ transaksi harian ramai</span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                <span className="text-xs text-rose-800 dark:text-rose-300">Status Perbankan</span>
                <div className="text-lg font-bold text-rose-700 dark:text-rose-400 mt-1">
                  Unbankable ❌
                </div>
                <span className="text-xs text-zinc-500">Nihil agunan sertifikat tanah</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
              💡 <strong>Gagasan Inti GIAT:</strong> Kita tidak meminta Bu Dewi membuat neraca akuntansi rumit. Cukup catat transaksi hariannya lewat QRIS atau mode kasir sederhana — GIAT akan mengonversinya menjadi bukti kelayakan pinjaman secara otomatis!
            </div>
          </div>
        )}

        {/* Step 2: GIAT Kasir */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Langkah 2 dari 5</Badge>
              <span className="text-xs text-zinc-500">• Modul 1: GIAT Kasir</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
                Merekam Jejak Transaksi Kasir &amp; QRIS
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Setiap kali pembeli membayar dengan QRIS atau kasir menginput nominal belanjaan, sistem GIAT merekam waktu, nominal, dan frekuensi secara aman.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <QrCode className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {simulatedScanDone ? "✅ Transaksi Berhasil Direkam!" : "Simulasikan Transaksi QRIS"}
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Klik tombol di samping untuk mensimulasikan satu transaksi QRIS senilai Rp 45.000.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleDemoScan}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
              >
                <CreditCard className="h-4 w-4" />
                <span>{simulatedScanDone ? "Simulasikan Lagi (+1 Trx)" : "Simulasikan Scan QRIS"}</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border">
                <span className="text-zinc-400 block text-[10px]">Total Transaksi:</span>
                <strong className="text-base text-zinc-900 dark:text-zinc-100">{transactions.length} Trx</strong>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border">
                <span className="text-zinc-400 block text-[10px]">Mode Offline USSD:</span>
                <strong className="text-base text-amber-600">*141*98# Aktif</strong>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border">
                <span className="text-zinc-400 block text-[10px]">Akurasi Data:</span>
                <strong className="text-base text-emerald-600">100% Digital</strong>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border">
                <span className="text-zinc-400 block text-[10px]">Status Enkripsi:</span>
                <strong className="text-base text-blue-600">UU PDP Ready</strong>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: GIAT Score */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Langkah 3 dari 5</Badge>
              <span className="text-xs text-zinc-500">• Modul 2: GIAT Score</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
                Mengonversi Transaksi Menjadi Skor Kredit Objektif
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Algoritma GIAT mengevaluasi 5 dimensi: frekuensi, stabilitas arus kas, keragaman pembeli, tren omzet, dan adopsi digital, menghasilkan skor kredit setara standar biro kredit perbankan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/30 text-center space-y-2">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Total Skor GIAT</span>
                <div className="text-4xl font-black text-zinc-900 dark:text-zinc-50">
                  {scoreDetail.totalScore}
                </div>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
                  Grade {scoreDetail.grade}
                </span>
                <p className="text-[11px] text-zinc-500 mt-1">Skala OJK: 300 - 850</p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-center space-y-2">
                <span className="text-xs font-semibold text-zinc-500">Plafon Pinjaman Terbuka</span>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  Rp {(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Jt
                </div>
                <span className="text-xs text-zinc-500 block">Pre-Approved</span>
                <p className="text-[11px] text-zinc-400">Tanpa agunan sertifikat tanah</p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-center space-y-2">
                <span className="text-xs font-semibold text-zinc-500">Estimasi Suku Bunga</span>
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  {scoreDetail.estimatedInterestRate}%
                </div>
                <span className="text-xs text-zinc-500 block">per tahun (p.a.)</span>
                <p className="text-[11px] text-zinc-400">Setara bunga KUR Mikro pemerintah</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border text-xs text-zinc-600 dark:text-zinc-300">
              📊 <strong>Inovasi:</strong> Mengeliminasi subjektivitas petugas bank. Pelaku usaha mikro tidak perlu lagi cemas ditolak karena tidak memiliki aset jaminan fisik.
            </div>
          </div>
        )}

        {/* Step 4: GIAT Connect */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Langkah 4 dari 5</Badge>
              <span className="text-xs text-zinc-500">• Modul 3: GIAT Connect</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
                Pencairan Pinjaman oleh Bank &amp; Fintech Mitra
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Skor kredit dan riwayat kasir disalurkan secara digital ke mitra pembiayaan (Bank BRI, Mandiri, BSI, Modalku, Amartha) untuk pencairan cepat tanpa tatap muka.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏛️</span>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Bank Rakyat Indonesia (KUR Digital)
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Plafon Rp 35.000.000 • Tenor 24 Bulan • Bunga 6.0% p.a.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleDemoApply}
                disabled={simulatedApplyDone}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>{simulatedApplyDone ? "✅ Pinjaman Berhasil Diajukan" : "Simulasikan Pengajuan Kredit"}</span>
              </Button>
            </div>

            {simulatedApplyDone && (
              <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-medium animate-in fade-in">
                🎉 <strong>Status Pengajuan:</strong> Disetujui secara otomatis melalui sistem verifikasi digital footprint! Modal kerja siap dicairkan ke rekening Bu Dewi untuk ekspansi usaha.
              </div>
            )}
          </div>
        )}

        {/* Step 5: Macro Impact */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Langkah 5 dari 5</Badge>
              <span className="text-xs text-zinc-500">• Kesimpulan &amp; Visi 2045</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50">
                Dampak Makro: Menutup Financing Gap Rp2.400T
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Ketika 20 juta UMKM feasible yang sebelumnya unbankable berhasil terhubung ke pembiayaan formal secara presisi berbasis klaster spasial, raksasa ekonomi Indonesia benar-benar terbangun.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">+24%</div>
                <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block mt-1">
                  Lonjakan Produktivitas
                </span>
                <p className="text-[11px] text-zinc-500 mt-1">Tenaga kerja industri mikro &amp; kecil</p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">&gt; Rp 1.000 T</div>
                <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block mt-1">
                  Kredit Baru Tersalurkan
                </span>
                <p className="text-[11px] text-zinc-500 mt-1">Menutup defisit gap Rp 2.400T</p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">3 Klaster</div>
                <span className="text-xs text-zinc-600 dark:text-zinc-300 font-bold block mt-1">
                  Intervensi Presisi
                </span>
                <p className="text-[11px] text-zinc-500 mt-1">Deep Sleepers, Stirring Giants, Leaders</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 text-white text-xs leading-relaxed space-y-2">
              <p className="font-bold text-sm text-cyan-400">
                🌟 Menjawab Tema Besar Arsen 2026:
              </p>
              <p>
                &quot;UMKM Indonesia tidak lagi soal <em>apakah mereka layak</em>, tapi <em>seberapa cepat rekam jejak mereka bisa terbaca</em>. Volatilitas ekonomi yang selama ini bersembunyi di balik informalitas kini bisa dibaca lewat data. GIAT membuktikan: data transaksi berbicara lebih dulu, modal menyusul tepat sasaran, menggerakkan raksasa tidur menuju Visi Indonesia Emas 2045.&quot;
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons (Prev / Next) */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <Button
            variant="outline"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="gap-2 text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Langkah Sebelumnya</span>
          </Button>

          <span className="text-xs font-mono text-zinc-400">
            {currentStep} / {steps.length}
          </span>

          {currentStep < steps.length ? (
            <Button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
              className="gap-2 text-xs bg-blue-600 hover:bg-blue-700 font-bold"
            >
              <span>Lanjut ke Langkah {currentStep + 1}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button className="gap-2 text-xs bg-emerald-600 hover:bg-emerald-700 font-bold">
                <span>Eksplorasi Mandiri di Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
