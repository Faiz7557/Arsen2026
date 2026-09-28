"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Gauge,
  Network,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Layers,
  Smartphone,
  Check,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [activeTabSwot, setActiveTabSwot] = useState<"strengths" | "weaknesses" | "opportunities" | "threats">("strengths");

  const macroStats = [
    { label: "Total Unit UMKM", value: "64,2 Juta", sub: "99,9% Usaha Mikro", icon: Users },
    { label: "Kontribusi PDB", value: "61%", sub: "Pondasi Raksasa Nasional", icon: TrendingUp },
    { label: "Financing Gap", value: "Rp 2.400 T", sub: "Stagnasi Kredit 19-20%", icon: AlertTriangle },
    { label: "UMKM Feasible Unbankable", value: "20 Juta Unit", sub: "Invisible Majority", icon: Layers },
  ];

  const modules = [
    {
      num: "01",
      badge: "Modul Kasir",
      title: "GIAT Kasir & Mode Lite",
      desc: "Merekam transaksi otomatis melalui integrasi QRIS & E-Wallet. Dilengkapi Mode Lite (USSD) untuk daerah 3T minim sinyal agar data transaksi tetap terabadikan secara offline-first.",
      icon: CreditCard,
      color: "from-blue-600 to-cyan-500",
      link: "/kasir",
      actionText: "Buka Simulasi Kasir",
      highlights: ["Pencatatan Otomatis QRIS", "Simulasi Mode USSD *141*98#", "Offline-first Storage"],
    },
    {
      num: "02",
      badge: "Modul Scoring",
      title: "GIAT Score (Alternative Credit)",
      desc: "Mengonversi volatilitas transaksi harian menjadi skor kredit terukur (300-850) melalui 5 dimensi objektif tanpa mensyaratkan jaminan aset tanah/bangunan fisik.",
      icon: Gauge,
      color: "from-indigo-600 to-purple-600",
      link: "/score",
      actionText: "Lihat Kalkulator Skor",
      highlights: ["5 Dimensi Pembobotan Data", "Indeks Risiko Gagal Bayar", "Simulasi What-If Interaktif"],
    },
    {
      num: "03",
      badge: "Modul Distribusi",
      title: "GIAT Connect (Marketplace)",
      desc: "Menghubungkan UMKM terverifikasi dengan Bank Himbara, Bank Syariah, dan Fintech P2P produktif. Membuka plafon pinjaman terkurasi sesuai kemampuan bayar riil.",
      icon: Network,
      color: "from-emerald-600 to-teal-500",
      link: "/connect",
      actionText: "Eksplor Mitra Pembiayaan",
      highlights: ["Pre-Approved Tanpa Agunan Fisik", "Kemitraan Bank & P2P Lending", "Pencairan Cepat < 24 Jam"],
    },
  ];

  const swotContent = {
    strengths: [
      "Menumpang pada infrastruktur QRIS & smartphone yang sudah eksisting diadopsi 40+ juta merchant.",
      "Menyelesaikan langsung akar masalah (ketiadaan laporan keuangan formal) dengan jejak transaksi digital.",
      "Dukungan intervensi presisi berbasis karakteristik klaster spasial wilayah (Deep Sleepers, Stirring Giants, Awakened Leaders).",
      "Model offline-first & USSD menjamin inklusifitas pelaku usaha di wilayah 3T.",
    ],
    weaknesses: [
      "Memerlukan edukasi awal bagi pedagang tradisional yang masih nyaman bertransaksi 100% tunai.",
      "Akurasi penilaian skor bergantung pada konsistensi pelaku UMKM dalam mencatat penjualan.",
      "Kebutuhan koordinasi multi-pihak yang intensif antara regulator (OJK/BI), perbankan, dan agregator.",
    ],
    opportunities: [
      "Momentum regulasi OJK & BI yang sangat pro pada Innovative Credit Scoring (ICS) dan digitalisasi UMKM.",
      "Tingkat penetrasi QRIS nasional yang tumbuh eksponensial di pasar-pasar tradisional.",
      "Peluang menjadi pelopor standarisasi data alternatif kelayakan kredit UMKM di Asia Tenggara.",
    ],
    threats: [
      "Tantangan blank spot wilayah 3T yang ekstrem jika infrastruktur telekomunikasi terputus total.",
      "Resistensi awal pedagang informal yang khawatir terhadap pencatatan data pajak sebelum usahanya berkembang.",
      "Dinamika regulasi perlindungan data pribadi (UU PDP) yang mewajibkan enkripsi end-to-end ketat.",
    ],
  };

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/15 to-cyan-400/10 blur-3xl -z-10 rounded-full pointer-events-none" />

        {/* Badges Ribbon */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-6">
          <Badge variant="default" className="py-1 px-3 text-xs bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            🏆 Lomba Arsen 2026 • Karya ASICM036
          </Badge>
          <Badge variant="success" className="py-1 px-3 text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            🌐 SDG&apos;s 8 & Visi Indonesia Emas 2045
          </Badge>
          <Badge variant="outline" className="py-1 px-3 text-xs font-mono">
            Spatial Error Model & K-means
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 max-w-5xl mx-auto leading-tight">
          Awakening The{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Sleeping Giant
          </span>
        </h1>

        <p className="mt-4 text-xl sm:text-2xl font-semibold text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
          Bagaimana GIAT Mengubah Volatilitas Informalitas UMKM Menjadi Kepastian Data
        </p>

        <p className="mt-5 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Mengatasi paradoks 64,2 juta UMKM Indonesia yang <strong>feasible secara bisnis</strong> namun <strong>unbankable secara administratif</strong> dengan mengubah rekam jejak kasir QRIS menjadi skor kredit alternatif.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/kasir">
            <Button size="lg" className="gap-2 shadow-xl shadow-blue-500/25 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6">
              <CreditCard className="h-5 w-5" />
              <span>Coba Demo GIAT Kasir</span>
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg" className="gap-2 h-12 px-6">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <span>Panduan Tur Interaktif</span>
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="secondary" size="lg" className="gap-2 h-12 px-5">
              <BarChart3 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <span>Analisis Spasial Wilayah</span>
            </Button>
          </Link>
        </div>

        {/* Interactive Stats Ribbon */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {macroStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm text-left hover:border-blue-500/40 transition-all hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {stat.label}
                  </span>
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 7 Core Paradoxes & Problem Analysis (From Infographic) */}
      <section id="problem" className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 font-mono text-xs text-blue-600 dark:text-blue-400 border-blue-400/30">
            Dianalisis dari Infografis & Paper ASICM036
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Mengapa Raksasa Ekonomi Ini Masih Tertidur?
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400">
            Kombinasi ketimpangan struktural, informalitas yang membungkus 99,9% pelaku usaha, dan ketiadaan rekam jejak formal memicu stagnasi kredit nasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Introduce Sleeping Giant */}
          <Card className="hover:border-blue-500/40 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-black flex items-center justify-center">
                  1
                </span>
                <Badge variant="outline">Skala Raksasa</Badge>
              </div>
              <CardTitle>Introduce The Sleeping Giant</CardTitle>
              <CardDescription>
                64,2 juta unit usaha menyumbang 61% PDB Indonesia. Namun raksasa ini menyimpan kerapuhan: terselimuti informalitas dan minim pencatatan digital.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400 pt-0">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 font-mono border border-zinc-200 dark:border-zinc-800">
                PDB: 61% • Unit: 64,2 Juta • Status: Informal
              </div>
            </CardContent>
          </Card>

          {/* 2. The Giant Disconnect */}
          <Card className="hover:border-blue-500/40 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-black flex items-center justify-center">
                  2
                </span>
                <Badge variant="warning">Ketimpangan</Badge>
              </div>
              <CardTitle>The Giant Disconnect</CardTitle>
              <CardDescription>
                Kendati menyumbang 61% PDB, 39% diantaranya adalah kontribusi dari 0,1% usaha besar. Artinya mayoritas UMKM &quot;kurang bertenaga&quot; per individu usaha.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400 pt-0">
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-mono border border-amber-200 dark:border-amber-800">
                99,9% Usaha Mikro vs 0,1% Usaha Besar (39% PDB)
              </div>
            </CardContent>
          </Card>

          {/* 3. The Demographic Trap */}
          <Card className="hover:border-blue-500/40 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-black flex items-center justify-center">
                  3
                </span>
                <Badge variant="danger">Perangkap Demografi</Badge>
              </div>
              <CardTitle>Structural Absorption Gap</CardTitle>
              <CardDescription>
                Dari 194,5 juta usia produktif, hanya 10,47 juta diserap sektor formal IMK. 97% sisanya terserap dalam low-quality jobs tanpa jaminan masa depan.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400 pt-0">
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-mono border border-rose-200 dark:border-rose-800">
                194,5 Juta Usia Produktif vs 10,47 Juta Formal IMK
              </div>
            </CardContent>
          </Card>

          {/* 4. The Productivity Anomaly */}
          <Card className="hover:border-blue-500/40 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-black flex items-center justify-center">
                  4
                </span>
                <Badge variant="outline">Volume vs Value</Badge>
              </div>
              <CardTitle>Paradoks Volume vs Value</CardTitle>
              <CardDescription>
                Jawa Barat unggul total output (Rp 158,49 T), namun efisiensi per pekerja DKI Jakarta jauh lebih tinggi (Rp 121,19 Jt/orang). Industri kita bertumpu pada kuantitas padat karya, bukan nilai tambah.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400 pt-0">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 font-mono border border-zinc-200 dark:border-zinc-800">
                Jabar: Rp158,49T total vs DKI: Rp121,19 Jt/pekerja
              </div>
            </CardContent>
          </Card>

          {/* 5. Stagnasi Kredit & Gap */}
          <Card className="hover:border-blue-500/40 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-black flex items-center justify-center">
                  5
                </span>
                <Badge variant="danger">Financing Gap Rp2.400T</Badge>
              </div>
              <CardTitle>Stagnasi Struktural Kredit</CardTitle>
              <CardDescription>
                Porsi kredit UMKM stagnan di kisaran 19-20% selama satu dekade (target 30%). Kebutuhan pendanaan 2026 mencapai Rp 4.300 T, sementara tersalurkan hanya Rp 1.900 T.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400 pt-0">
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-mono border border-rose-200 dark:border-rose-800">
                Tersalurkan: Rp1.900 T • Kebutuhan: Rp4.300 T
              </div>
            </CardContent>
          </Card>

          {/* 6. Feasible Tapi Unbankable */}
          <Card className="hover:border-blue-500/40 transition-all border-blue-500/40 bg-gradient-to-br from-blue-50/20 to-white dark:from-blue-950/20 dark:to-zinc-900">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                  7
                </span>
                <Badge variant="success">Akar Masalah Inti</Badge>
              </div>
              <CardTitle>Feasible Tapi Tidak Bankable</CardTitle>
              <CardDescription>
                Dari 64 juta UMKM: 30 juta bersifat feasible (menguntungkan secara bisnis), tapi hanya 10 juta yang bankable secara dokumen perbankan. 20 juta UMKM terjebak menjadi &quot;invisible majority&quot;.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-zinc-500 dark:text-zinc-400 pt-0">
              <div className="p-3 rounded-lg bg-blue-100/60 dark:bg-blue-950 font-bold text-blue-700 dark:text-blue-300 font-mono border border-blue-200 dark:border-blue-800">
                20 Juta UMKM Terjebak: GIAT Hadir Menjawab Ini!
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The 3 Modules of GIAT */}
      <section id="modules" className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-zinc-50/60 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-3 px-3 py-1 font-mono text-xs">
            Arsitektur Solusi Terintegrasi
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Tiga Modul Solusi GIAT
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400">
            Infrastruktur digital ringan yang bermodalkan agunan digital: merekam transaksi kasir, mengonversinya menjadi skor kredit alternatif, dan menyalurkannya langsung ke lembaga keuangan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-zinc-200 dark:text-zinc-800 group-hover:text-blue-500/20 transition-colors">
                      {m.num}
                    </span>
                    <Badge variant="outline" className="font-semibold text-xs border-blue-500/30 text-blue-600 dark:text-blue-400">
                      {m.badge}
                    </Badge>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${m.color} text-white flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                    {m.title}
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {m.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 mb-8">
                    {m.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={m.link} className="w-full">
                  <Button className="w-full gap-2 font-semibold">
                    <span>{m.actionText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cara Kerja 4 Langkah: Scan -> Hitung -> Distribusi -> Validasi */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 font-mono text-xs">
            Alur End-to-End
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Bagaimana GIAT Bekerja dalam 4 Langkah
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400">
            Dari satu kali scan QRIS di meja kasir hingga pencairan kredit modal usaha tanpa sertifikat tanah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "1. Scan",
              title: "Transaksi Kasir Terekam",
              desc: "Pelanggan membayar via QRIS atau kasir mencatat penjualan. Mode Lite USSD memastikan daerah minim sinyal tetap tercatat.",
              icon: Smartphone,
              color: "text-blue-500",
            },
            {
              step: "2. Hitung",
              title: "Kalkulasi GIAT Score",
              desc: "Algoritma menganalisis frekuensi, stabilitas arus kas harian, dan keragaman pembeli menjadi skor kredit objektif 300-850.",
              icon: Gauge,
              color: "text-indigo-500",
            },
            {
              step: "3. Distribusi",
              title: "Koneksi Mitra Keuangan",
              desc: "Skor dialirkan ke bank mitra (BRI, Mandiri, BSI) & fintech P2P (Amartha, Modalku) dengan penawaran bunga kompetitif.",
              icon: Network,
              color: "text-emerald-500",
            },
            {
              step: "4. Validasi",
              title: "Pencairan Tanpa Agunan Fisik",
              desc: "Bank memverifikasi digital footprint tanpa butuh sertifikat tanah. Dana dicairkan untuk memperbesar kapasitas usaha.",
              icon: CheckCircle2,
              color: "text-amber-500",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm hover:border-blue-500/50 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {item.step}
                  </span>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SWOT Analysis Section */}
      <section id="swot" className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3 px-3 py-1 font-mono text-xs">
            Evaluasi Strategis
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Analisis SWOT & Mitigasi Risiko
          </h2>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Kesiapan implementasi komprehensif dari infografis ASICM036
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            {[
              { id: "strengths", label: "Strengths (Kekuatan)", color: "text-emerald-600" },
              { id: "weaknesses", label: "Weaknesses (Kelemahan)", color: "text-amber-600" },
              { id: "opportunities", label: "Opportunities (Peluang)", color: "text-blue-600" },
              { id: "threats", label: "Threats (Ancaman)", color: "text-rose-600" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabSwot(tab.id as "strengths" | "weaknesses" | "opportunities" | "threats")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTabSwot === tab.id
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SWOT List */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-8 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {swotContent[activeTabSwot].map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/80"
              >
                <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Proyeksi Manfaat & Mitigasi Box */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">+24%</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 font-medium">
                Peningkatan Produktivitas Tenaga Kerja IMK
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400">&gt; Rp 1.000 T</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 font-medium">
                Penyaluran Kredit Baru ke Segmen Unbankable
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">Mode Lite USSD</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 font-medium">
                Jangkau Wilayah 3T Tanpa Hambatan Sinyal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Explore CTA Banner */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 p-8 sm:p-14 text-white shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" /> Siap Mencoba Prototipe Fungsional?
            </span>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Mulai Uji Coba Alur Lengkap GIAT Sekarang
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Pilih UMKM contoh, input transaksi penjualan via QRIS, pantau kenaikan skor kredit secara real-time, lalu ajukan pinjaman modal ke bank mitra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-900 hover:bg-zinc-100 font-extrabold shadow-lg h-12 px-6">
                Buka Dashboard UMKM
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 font-bold h-12 px-6">
                Ikuti Panduan Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
