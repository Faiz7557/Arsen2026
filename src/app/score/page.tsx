"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  Sliders,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  RotateCcw,
  Award,
} from "lucide-react";
import { useGiat } from "@/context/giat-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateCreditScoreFromParams } from "@/lib/scoring";
import { CreditCertificateModal } from "@/components/score/credit-certificate-modal";

export default function ScorePage() {
  const { activeUmkm, scoreDetail } = useGiat();

  // Certificate Modal state
  const [isCertOpen, setIsCertOpen] = useState(false);

  // What-If Simulator state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simDailyTrx, setSimDailyTrx] = useState(activeUmkm.avgDailyTransactions);
  const [simMonthlyRevenue, setSimMonthlyRevenue] = useState(activeUmkm.monthlyRevenue);
  const [simConsistency, setSimConsistency] = useState(85);
  const [simDiversity, setSimDiversity] = useState(80);
  const [simDigitalShare, setSimDigitalShare] = useState(75);

  // Simulated score computation
  const simulatedScore = calculateCreditScoreFromParams({
    dailyTransactions: simDailyTrx,
    monthlyRevenue: simMonthlyRevenue,
    consistencyRate: simConsistency,
    customerDiversityScore: simDiversity,
    digitalSharePct: simDigitalShare,
    operatingMonths: (2026 - activeUmkm.establishedYear) * 12,
  });

  const displayScore = isSimulating ? simulatedScore : scoreDetail;

  // Grade color helper
  const gradeStyles = {
    A: { bg: "bg-emerald-100 text-emerald-900 border-emerald-400", label: "Sangat Bankable (Risiko Rendah)" },
    B: { bg: "bg-blue-100 text-[#082046] border-blue-400", label: "Bankable Bersyarat (Layak Kredit)" },
    C: { bg: "bg-amber-100 text-amber-900 border-amber-400", label: "Perlu Pendampingan Mikro" },
    D: { bg: "bg-rose-100 text-rose-900 border-rose-400", label: "Belum Bankable" },
  }[displayScore.grade];

  // Radial score gauge calculations (300 to 850 range)
  const normalizedGauge = Math.max(0, Math.min(1, (displayScore.totalScore - 300) / 550));
  const strokeDashoffset = 440 - (440 * (normalizedGauge * 0.75));

  const resetSimulator = () => {
    setSimDailyTrx(activeUmkm.avgDailyTransactions);
    setSimMonthlyRevenue(activeUmkm.monthlyRevenue);
    setSimConsistency(85);
    setSimDiversity(80);
    setSimDigitalShare(75);
    setIsSimulating(false);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-blue-100 dark:border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="infographic-number-badge">8</span>
            <Badge variant="navy" className="text-xs">
              Modul 2: GIAT Score
            </Badge>
            <span className="text-xs text-slate-500 font-semibold">• Innovative Credit Scoring (ICS)</span>
          </div>
          <h1 className="text-3xl font-black text-[#082046] dark:text-white tracking-tight flex items-center gap-2">
            <span>Analisis Kelayakan Kredit Alternatif</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-200/70 mt-1">
            Mengevaluasi kelayakan usaha <span className="font-extrabold text-[#082046] dark:text-white">{activeUmkm.name}</span> berbasis transaksi digital tanpa agunan fisik sertifikat tanah.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsCertOpen(true)}
            className="gap-2 font-bold border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 shadow-xs"
          >
            <Award className="h-4 w-4 text-amber-500" />
            <span className="hidden sm:inline">Cetak</span> Sertifikat Skor
          </Button>
          <Link href="/connect">
            <Button variant="gold" className="gap-2 font-black shadow-md">
              <span>Pilih Mitra Kredit (GIAT Connect)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Score Overview: Gauge Card & Key Metric Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column (5 cols): Radial Score Gauge */}
        <div className="lg:col-span-5">
          <div className="infographic-card h-full flex flex-col justify-between p-6 bg-gradient-to-b from-white to-[#f0f7ff] dark:from-[#082046] dark:to-[#051630] border-2 border-blue-200 dark:border-blue-800 shadow-xl">
            <div className="text-center pb-2">
              <div className="inline-flex items-center gap-1.5 mx-auto text-xs font-black px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]">
                <Sparkles className="h-3.5 w-3.5" />
                {isSimulating ? "Mode Simulasi Interaktif" : "Skor Real-Time Aktif"}
              </div>
              <h3 className="text-xl font-black text-[#082046] dark:text-white mt-3">
                Indeks Kelayakan GIAT
              </h3>
              <p className="text-xs text-slate-500 dark:text-blue-200/70">
                Rentang Penilaian Standar OJK: 300 - 850
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-6">
              {/* Radial SVG Gauge */}
              <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-135" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray="440"
                    strokeDashoffset="110"
                    className="text-slate-200 dark:text-blue-950"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="transparent"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    strokeDasharray="440"
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="50%" stopColor="#2563eb" />
                      <stop offset="80%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-5xl font-black tracking-tight text-[#082046] dark:text-white font-mono">
                    {displayScore.totalScore}
                  </span>
                  <div className={`mt-1 px-3 py-0.5 rounded-full text-xs font-black border ${gradeStyles.bg}`}>
                    Grade {displayScore.grade}
                  </div>
                  <span className="text-[11px] text-slate-400 font-bold mt-1">
                    Skala 300 - 850
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-black text-[#082046] dark:text-white">
                  {gradeStyles.label}
                </span>
                <p className="text-xs text-slate-500 dark:text-blue-200/70 mt-1 max-w-xs">
                  {displayScore.feasibilityRatio}% UMKM dengan profil ini sukses membayar angsuran tepat waktu tanpa risiko kredit macet.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-blue-100 dark:border-blue-900/40 bg-white/60 dark:bg-white/5 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-blue-200 font-semibold">Agunan Fisik:</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> 0% (Digantikan Agunan Digital)
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCertOpen(true)}
              className="w-full mt-3 gap-2 font-black text-xs border-amber-300 dark:border-amber-600 text-[#082046] dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/20 hover:bg-amber-100 shadow-xs"
            >
              <Award className="h-4 w-4 text-amber-500" />
              <span>Buka Sertifikat Penilaian Resmi</span>
            </Button>
          </div>
        </div>

        {/* Right Column (7 cols): Key Financial Metrics & 5-Dimensional Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* 4 Financial Health Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-[#071c3b] shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Plafon Maksimal</span>
              <div className="text-xl font-black text-[#082046] dark:text-white mt-1">
                Rp {(displayScore.maxLoanLimit / 1000000).toFixed(0)} Jt
              </div>
              <span className="text-[10px] text-slate-500">Kapasitas kas harian</span>
            </div>

            <div className="p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-[#071c3b] shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Bunga Indikatif</span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {displayScore.estimatedInterestRate}% p.a.
              </div>
              <span className="text-[10px] text-slate-500">Setara KUR Mikro</span>
            </div>

            <div className="p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-[#071c3b] shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rasio Feasible</span>
              <div className="text-xl font-black text-[#0284c7] mt-1">
                {displayScore.feasibilityRatio}%
              </div>
              <span className="text-[10px] text-slate-500">Tingkat kelayakan</span>
            </div>

            <div className="p-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-[#071c3b] shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Risiko Default</span>
              <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1">
                {displayScore.defaultRisk}%
              </div>
              <span className="text-[10px] text-slate-500">Probabilitas NPL</span>
            </div>
          </div>

          {/* 5-Dimensional Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[#082046]" />
                  <span>Rincian 5 Parameter Skor Objektif</span>
                </CardTitle>
                <Badge variant="navy" className="text-xs font-mono">
                  Bobot Total: 100%
                </Badge>
              </div>
              <CardDescription>
                Transparansi penilaian tanpa bias subjektif petugas perbankan tradisional.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {Object.entries(displayScore.dimensions).map(([key, dim]) => (
                <div key={key} className="space-y-1.5 p-3 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-100 dark:border-blue-900/40">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#082046] dark:text-white">{dim.name}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-white dark:bg-zinc-800 text-[#082046] dark:text-blue-200 font-mono font-bold border border-blue-200/50">
                        Bobot {dim.weight}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-black">
                      <span className="text-[#0284c7]">{dim.score}/100</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        dim.status === "Optimal" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {dim.status}
                      </span>
                    </div>
                  </div>

                  <Progress value={dim.score} variant={dim.score >= 80 ? "success" : "primary"} />

                  <p className="text-[11px] text-slate-500 dark:text-blue-100/70 leading-relaxed pt-0.5">
                    {dim.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Interactive "What-If" Parameter Simulator */}
      <Card className="border-amber-300 dark:border-amber-700 shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg">Simulasi Interaktif: &quot;What-If&quot; Parameter Usaha</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {isSimulating && (
                <Button variant="ghost" size="sm" onClick={resetSimulator} className="text-xs gap-1 font-bold">
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Kembalikan Data Riil</span>
                </Button>
              )}
              <Badge variant={isSimulating ? "gold" : "outline"} className="text-xs">
                {isSimulating ? "Simulator Berjalan" : "Geser Slider untuk Simulasi"}
              </Badge>
            </div>
          </div>
          <CardDescription>
            Uji bagaimana peningkatan frekuensi pembeli, adopsi QRIS, atau stabilitas omzet akan mendongkrak skor kredit dan plafon pinjaman UMKM ini secara instan.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slider 1: Daily Transactions */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-100 dark:border-blue-900/40">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-blue-200">Frekuensi Transaksi:</span>
                <span className="font-mono text-[#0284c7] font-black">{simDailyTrx} trx/hari</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="1"
                value={simDailyTrx}
                onChange={(e) => {
                  setSimDailyTrx(Number(e.target.value));
                  setIsSimulating(true);
                }}
                className="w-full accent-[#082046] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block font-medium">Baseline Warung: 48 trx/hari</span>
            </div>

            {/* Slider 2: Monthly Revenue */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-100 dark:border-blue-900/40">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-blue-200">Omzet Bulanan:</span>
                <span className="font-mono text-amber-600 font-black">
                  Rp {(simMonthlyRevenue / 1000000).toFixed(1)} Jt
                </span>
              </div>
              <input
                type="range"
                min="5000000"
                max="80000000"
                step="1000000"
                value={simMonthlyRevenue}
                onChange={(e) => {
                  setSimMonthlyRevenue(Number(e.target.value));
                  setIsSimulating(true);
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block font-medium">Baseline Omzet: Rp 28,5 Jt</span>
            </div>

            {/* Slider 3: QRIS / Non-Cash Share */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-100 dark:border-blue-900/40">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-blue-200">Porsi Transaksi QRIS:</span>
                <span className="font-mono text-emerald-600 font-black">{simDigitalShare}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={simDigitalShare}
                onChange={(e) => {
                  setSimDigitalShare(Number(e.target.value));
                  setIsSimulating(true);
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block font-medium">Semakin tinggi makin dipercaya bank</span>
            </div>
          </div>

          {/* Dynamic Comparison Banner */}
          {isSimulating && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-blue-50 dark:from-amber-950/40 dark:via-yellow-950/40 dark:to-blue-950/40 border border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-[#082046] font-black text-sm shadow-md">
                  {simulatedScore.totalScore > scoreDetail.totalScore ? "📈 Naik" : "📊 Simulasi"}
                </div>
                <div>
                  <h4 className="font-black text-sm text-[#082046] dark:text-white">
                    Proyeksi Skor Baru: {simulatedScore.totalScore} (Grade {simulatedScore.grade})
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-blue-200/80">
                    Plafon pinjaman naik dari Rp {(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Jt menjadi{" "}
                    <strong className="text-amber-600 dark:text-amber-400">
                      Rp {(simulatedScore.maxLoanLimit / 1000000).toFixed(0)} Juta!
                    </strong>
                  </p>
                </div>
              </div>

              <Link href="/connect">
                <Button size="sm" variant="gold" className="gap-2 font-black shrink-0">
                  <span>Lihat Penawaran Bank</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 6-Month Trend History Chart & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (7 cols): Trend History Line Chart */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span>Tren Riwayat Skor 6 Bulan Terakhir</span>
                </CardTitle>
                <Badge variant="success">+55 Poin sejak April</Badge>
              </div>
              <CardDescription>
                Konsistensi pemakaian QRIS memicu tren kenaikan skor yang stabil.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Custom SVG Line Chart */}
              <div className="h-60 w-full flex flex-col justify-end pt-4 pb-2">
                <div className="relative h-44 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                    <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" className="text-slate-200 dark:text-blue-950" strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke="currentColor" className="text-slate-200 dark:text-blue-950" strokeDasharray="3 3" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" className="text-slate-200 dark:text-blue-950" strokeDasharray="3 3" />

                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="0,125 100,105 200,90 300,75 400,60 500,45 500,160 0,160"
                      fill="url(#areaGradient)"
                    />

                    <polyline
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,125 100,105 200,90 300,75 400,60 500,45"
                    />

                    {[
                      { x: 0, y: 125, score: 683 },
                      { x: 100, y: 105, score: 700 },
                      { x: 200, y: 90, score: 712 },
                      { x: 300, y: 75, score: 724 },
                      { x: 400, y: 60, score: 732 },
                      { x: 500, y: 45, score: displayScore.totalScore },
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="5" className="fill-[#082046] stroke-white" strokeWidth="2.5" />
                        <text x={pt.x} y={pt.y - 12} textAnchor="middle" className="text-[10px] font-black fill-[#082046] dark:fill-blue-200 font-mono">
                          {pt.score}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-3 border-t border-blue-100 dark:border-blue-900/40">
                  <span>Apr 2026</span>
                  <span>Mei 2026</span>
                  <span>Jun 2026</span>
                  <span>Jul 2026</span>
                  <span>Agu 2026</span>
                  <span className="text-[#082046] dark:text-blue-300 font-black">Sep (Kini)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right (5 cols): AI Recommendations to Increase Score */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#0284c7]" />
                <span>Rekomendasi Peningkatan Skor</span>
              </CardTitle>
              <CardDescription>Langkah aksi terukur untuk menaikkan peringkat ke Grade A</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {displayScore.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-100 dark:border-blue-900/40">
                  <span className="w-5 h-5 rounded-full bg-[#082046] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-blue-100/80 leading-relaxed font-semibold">
                    {rec}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="p-5 rounded-3xl bg-[#082046] text-white text-center space-y-3 shadow-xl">
            <h4 className="text-sm font-black text-amber-300">
              Skor Anda Memenuhi Syarat di 5 Bank Mitra!
            </h4>
            <p className="text-xs text-blue-100/80">
              Ajukan pinjaman modal usaha tanpa perlu datang ke kantor cabang dan tanpa agunan sertifikat.
            </p>
            <Link href="/connect" className="inline-block w-full pt-1">
              <Button variant="gold" className="w-full gap-2 font-black text-sm">
                <span>Ajukan Kredit di GIAT Connect</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Credit Certificate Modal */}
      <CreditCertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        umkm={activeUmkm}
        scoreDetail={displayScore}
      />
    </div>
  );
}
