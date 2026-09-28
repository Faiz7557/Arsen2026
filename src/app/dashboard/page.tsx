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

  const clusterColors = {
    "Deep Sleepers": "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300",
    "Stirring Giants": "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300",
    "Awakened Leaders": "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300",
  }[activeUmkm.cluster];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs">
              Portal Pelaku Usaha
            </Badge>
            <span className="text-xs text-zinc-500">• Profil &amp; Rekapitulasi Digital</span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-3">
            <span>{activeUmkm.avatar}</span>
            <span>{activeUmkm.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Pemilik: <strong>{activeUmkm.owner}</strong> • Kategori: <strong>{activeUmkm.category}</strong>
          </p>
        </div>

        {/* Switcher Cards */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400">Pilih Profil Sampel:</span>
          <div className="flex flex-wrap gap-1.5">
            {umkms.map((u) => (
              <button
                key={u.id}
                onClick={() => setActiveUmkmId(u.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeUmkm.id === u.id
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100"
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
      <div className="p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl shrink-0 shadow-lg">
            {activeUmkm.avatar}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {activeUmkm.name}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${clusterColors}`}>
                {activeUmkm.cluster}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeUmkm.isBankable ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}>
                {activeUmkm.isBankable ? "✅ Bankable Resmi" : "⚠️ Feasible tapi Unbankable (Target GIAT)"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-blue-500" />
                {activeUmkm.city}, {activeUmkm.province}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                Berdiri sejak {activeUmkm.establishedYear} ({2026 - activeUmkm.establishedYear} thn)
              </span>
              <span className="flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5 text-blue-500" />
                QRIS ID: <code className="font-mono text-zinc-700 dark:text-zinc-300">{activeUmkm.qrisId}</code>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/kasir">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold shadow-md">
              <PlusCircle className="h-4 w-4" />
              <span>Input Kasir</span>
            </Button>
          </Link>
          <Link href="/score">
            <Button variant="outline" className="gap-2">
              <Gauge className="h-4 w-4 text-indigo-500" />
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
        />
        <StatCard
          title="Frekuensi Kasir"
          value={`${activeUmkm.avgDailyTransactions} Trx/hr`}
          subtitle="Konsistensi pembeli"
          icon={<Receipt className="h-5 w-5" />}
        />
        <StatCard
          title="Skor Kredit GIAT"
          value={`${scoreDetail.totalScore}`}
          badge={`Grade ${scoreDetail.grade}`}
          subtitle={`${scoreDetail.feasibilityRatio}% Feasible`}
          icon={<Gauge className="h-5 w-5" />}
        />
        <StatCard
          title="Plafon Pinjaman Siap"
          value={`Rp ${(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Jt`}
          subtitle="Pre-Approved Tanpa Agunan"
          icon={<ShieldCheck className="h-5 w-5" />}
        />
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-3">
          Akses Cepat Modul GIAT
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/kasir" className="group">
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-blue-500/50 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <CreditCard className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                1. GIAT Kasir &amp; Mode Lite
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Catat penjualan QRIS harian atau simulasikan transaksi USSD daerah 3T.
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-blue-600 gap-1">
                <span>Buka Kasir</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>

          <Link href="/score" className="group">
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-indigo-500/50 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Gauge className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                2. GIAT Alternative Scoring
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Lihat rincian 5 dimensi skor kredit dan uji slider parameter What-If.
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-indigo-600 gap-1">
                <span>Buka Scoring</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>

          <Link href="/connect" className="group">
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:border-emerald-500/50 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Network className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                3. GIAT Connect Marketplace
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Pilih bank atau fintech mitra dan ajukan pinjaman modal usaha instan.
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-emerald-600 gap-1">
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
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span>Kesiapan Akses Pembiayaan Perbankan</span>
              </CardTitle>
              <CardDescription>
                Indikator kelayakan tanpa jaminan sertifikat tanah
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span>Tingkat Kelayakan Usaha (Feasibility)</span>
                  <span className="text-blue-600 font-bold">{scoreDetail.feasibilityRatio}%</span>
                </div>
                <Progress value={scoreDetail.feasibilityRatio} variant="primary" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span>Konsistensi Arus Kas Masuk</span>
                  <span className="text-emerald-600 font-bold">
                    {scoreDetail.dimensions.revenueConsistency.score}%
                  </span>
                </div>
                <Progress value={scoreDetail.dimensions.revenueConsistency.score} variant="success" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span>Frekuensi Transaksi Digital Kasir</span>
                  <span className="text-indigo-600 font-bold">
                    {scoreDetail.dimensions.transactionFrequency.score}%
                  </span>
                </div>
                <Progress value={scoreDetail.dimensions.transactionFrequency.score} variant="gradient" />
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 text-xs space-y-1">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                  💡 Kesimpulan Analisis AI GIAT:
                </span>
                <p className="text-zinc-500 leading-relaxed">
                  Usaha ini telah memenuhi kriteria perbankan formal berkat bukti konsistensi pencatatan transaksi kasir QRIS. Pembiayaan modal kerja Rp {(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Juta direkomendasikan dengan tingkat bunga terendah 6,0% p.a.
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
                  <span>Transaksi Kasir Terakhir</span>
                </CardTitle>
                <CardDescription>Terekam via QRIS &amp; GIAT Kasir</CardDescription>
              </div>
              <Link href="/kasir">
                <Button variant="ghost" size="sm" className="text-xs">
                  Lihat Semua
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {umkmTrx.slice(0, 4).map((trx) => (
                  <div
                    key={trx.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-100 dark:border-zinc-800/80 text-xs"
                  >
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {trx.customerName}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {trx.category} • <span className="font-mono">{trx.method}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        +Rp {trx.amount.toLocaleString("id-ID")}
                      </span>
                      <div className="text-[10px] text-zinc-400">
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
