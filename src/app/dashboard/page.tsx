"use client";

import React from "react";
import Link from "next/link";
import {
  CreditCard,
  Gauge,
  Network,
  ArrowRight,
  TrendingUp,
  Receipt,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  Clock,
  Layers,
} from "lucide-react";
import { useGiat } from "@/context/giat-context";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const { umkms, activeUmkm, setActiveUmkmId, transactions, scoreDetail } = useGiat();

  const umkmTrx = transactions.filter((t) => t.umkmId === activeUmkm.id);

  // Infographic cluster styles matching Section 6
  const clusterStyles = {
    "Deep Sleepers": "bg-[#082046] text-white border-2 border-[#38bdf8] shadow-sm",
    "Stirring Giants": "bg-[#0284c7] text-white border-2 border-[#bae6fd] shadow-sm",
    "Awakened Leaders": "bg-[#fef08a] text-[#854d0e] border-2 border-[#f59e0b] shadow-sm font-black",
  }[activeUmkm.cluster];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-blue-100 dark:border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="navy" className="text-xs">
              Portal Pelaku Usaha UMKM
            </Badge>
            <span className="text-xs text-slate-500 font-semibold">• Profil &amp; Rekapitulasi Digital</span>
          </div>
          <h1 className="text-3xl font-black text-[#082046] dark:text-white tracking-tight flex items-center gap-3">
            <span>{activeUmkm.avatar}</span>
            <span>{activeUmkm.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-200/70 mt-1">
            Pemilik: <strong>{activeUmkm.owner}</strong> • Kategori: <strong>{activeUmkm.category}</strong>
          </p>
        </div>

        {/* Switcher Cards */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pilih Profil Sampel:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {umkms.map((u) => (
              <button
                key={u.id}
                onClick={() => setActiveUmkmId(u.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeUmkm.id === u.id
                    ? "bg-[#082046] text-white shadow-md border border-white/20"
                    : "bg-white dark:bg-[#071c3b] border border-blue-100 dark:border-blue-900/40 text-slate-700 dark:text-blue-100 hover:bg-blue-50"
                }`}
              >
                <span>{u.avatar}</span>
                <span className="max-w-[120px] truncate">{u.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Details Banner */}
      <div className="p-6 rounded-3xl border border-blue-100 dark:border-blue-900/40 bg-white dark:bg-[#071c3b] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#082046] to-[#1a56db] text-white flex items-center justify-center text-3xl shrink-0 shadow-lg border border-white/10">
            {activeUmkm.avatar}
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-black text-[#082046] dark:text-white">
                {activeUmkm.name}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${clusterStyles}`}>
                Klaster: {activeUmkm.cluster}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeUmkm.isBankable 
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300" 
                  : "bg-amber-100 text-amber-900 border border-amber-300"
              }`}>
                {activeUmkm.isBankable ? "✅ Bankable Resmi" : "⚠️ Feasible tapi Unbankable (Target GIAT)"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-blue-200/70 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#0284c7]" />
                {activeUmkm.city}, {activeUmkm.province}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-[#0284c7]" />
                Berdiri sejak {activeUmkm.establishedYear} ({2026 - activeUmkm.establishedYear} tahun)
              </span>
              <span className="flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5 text-[#0284c7]" />
                QRIS ID: <code className="font-mono text-[#082046] dark:text-blue-300 font-bold">{activeUmkm.qrisId}</code>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/kasir">
            <Button variant="gold" className="gap-2 font-black shadow-md">
              <PlusCircle className="h-4 w-4" />
              <span>Input Kasir</span>
            </Button>
          </Link>
          <Link href="/score">
            <Button variant="outline" className="gap-2">
              <Gauge className="h-4 w-4 text-[#082046]" />
              <span>Skor GIAT</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Omzet Rata-rata"
          value={`Rp ${(activeUmkm.monthlyRevenue / 1000000).toFixed(1)} Jt`}
          subtitle="Arus kas per bulan"
          icon={<TrendingUp className="h-5 w-5" />}
          accentColor="navy"
        />
        <StatCard
          title="Frekuensi Kasir"
          value={`${activeUmkm.avgDailyTransactions} Trx/hr`}
          subtitle="Konsistensi pembeli"
          icon={<Receipt className="h-5 w-5" />}
          accentColor="cyan"
        />
        <StatCard
          title="Skor Kredit GIAT"
          value={`${scoreDetail.totalScore}`}
          badge={`Grade ${scoreDetail.grade}`}
          subtitle={`${scoreDetail.feasibilityRatio}% Feasible`}
          icon={<Gauge className="h-5 w-5" />}
          accentColor="gold"
        />
        <StatCard
          title="Plafon Pinjaman Siap"
          value={`Rp ${(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Jt`}
          subtitle="Pre-Approved Tanpa Agunan Fisik"
          icon={<ShieldCheck className="h-5 w-5" />}
          accentColor="emerald"
        />
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h3 className="text-base font-black text-[#082046] dark:text-white mb-3">
          Akses Cepat Modul Solusi GIAT
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/kasir" className="group">
            <div className="infographic-card p-5">
              <div className="w-10 h-10 rounded-xl bg-[#082046] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-md">
                <CreditCard className="h-5 w-5" />
              </div>
              <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                1. GIAT Kasir &amp; Mode Lite
              </h4>
              <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-1">
                Catat penjualan QRIS harian atau simulasikan transaksi USSD daerah 3T.
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-[#0284c7] gap-1">
                <span>Buka Kasir</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>

          <Link href="/score" className="group">
            <div className="infographic-card p-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-[#082046] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-md">
                <Gauge className="h-5 w-5" />
              </div>
              <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                2. GIAT Alternative Scoring
              </h4>
              <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-1">
                Lihat rincian 5 dimensi skor kredit dan uji slider parameter What-If.
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-amber-600 gap-1">
                <span>Buka Scoring</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>

          <Link href="/connect" className="group">
            <div className="infographic-card p-5">
              <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-md">
                <Network className="h-5 w-5" />
              </div>
              <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                3. GIAT Connect Marketplace
              </h4>
              <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-1">
                Pilih bank atau fintech mitra dan ajukan pinjaman modal usaha instan.
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-[#0284c7] gap-1">
                <span>Pilih Bank Mitra</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Two columns: Health status & Recent Transaction Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (6 cols): Financial Health Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span>Kesiapan Akses Pembiayaan Perbankan</span>
              </CardTitle>
              <CardDescription>
                Indikator kelayakan modal usaha tanpa mensyaratkan agunan tanah
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-bold text-slate-700 dark:text-blue-200">
                  <span>Tingkat Kelayakan Usaha (Feasibility)</span>
                  <span className="text-[#0284c7] font-black">{scoreDetail.feasibilityRatio}%</span>
                </div>
                <Progress value={scoreDetail.feasibilityRatio} variant="primary" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-bold text-slate-700 dark:text-blue-200">
                  <span>Konsistensi Arus Kas Masuk</span>
                  <span className="text-emerald-600 font-black">
                    {scoreDetail.dimensions.revenueConsistency.score}%
                  </span>
                </div>
                <Progress value={scoreDetail.dimensions.revenueConsistency.score} variant="success" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-bold text-slate-700 dark:text-blue-200">
                  <span>Frekuensi Transaksi Digital Kasir</span>
                  <span className="text-amber-600 font-black">
                    {scoreDetail.dimensions.transactionFrequency.score}%
                  </span>
                </div>
                <Progress value={scoreDetail.dimensions.transactionFrequency.score} variant="gradient" />
              </div>

              <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-200 dark:border-blue-800 text-xs space-y-1.5">
                <span className="font-black text-[#082046] dark:text-white block">
                  💡 Rekomendasi Solusi GIAT:
                </span>
                <p className="text-slate-600 dark:text-blue-100/70 leading-relaxed">
                  Usaha ini telah terbukti feasible berkat konsistensi kasir harian. Plafon pembiayaan senilai <strong>Rp {(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Juta</strong> siap disalurkan melalui mitra bank dengan bunga kompetitif mulai 6,0% p.a.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right (6 cols): Recent Transactions for this UMKM */}
        <div className="lg:col-span-6 space-y-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-emerald-600" />
                  <span>Transaksi Kasir Terkini</span>
                </CardTitle>
                <CardDescription>Terekam via QRIS &amp; GIAT Kasir</CardDescription>
              </div>
              <Link href="/kasir">
                <Button variant="ghost" size="sm" className="text-xs font-bold">
                  Lihat Semua
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {umkmTrx.slice(0, 4).map((trx) => (
                  <div
                    key={trx.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-100 dark:border-blue-900/40 text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-[#082046] dark:text-white">
                        {trx.customerName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-blue-200/70">
                        {trx.category} • <span className="font-mono font-bold text-[#0284c7]">{trx.method}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                        +Rp {trx.amount.toLocaleString("id-ID")}
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {new Date(trx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
