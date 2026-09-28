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
  Users,
  Compass,
  SignalZero,
  QrCode,
  Lock,
  Server,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [activeTabSwot, setActiveTabSwot] = useState<"strengths" | "weaknesses" | "opportunities" | "threats">("strengths");

  const macroStats = [
    { label: "Total Unit UMKM", value: "64,2 Juta", sub: "99,9% Usaha Mikro", icon: Users },
    { label: "Kontribusi PDB", value: "61%", sub: "Pondasi Raksasa Nasional", icon: TrendingUp },
    { label: "Financing Gap", value: "Rp 2.400 T", sub: "Stagnasi Kredit 19-20%", icon: AlertTriangle },
    { label: "Feasible Unbankable", value: "20 Juta Unit", sub: "The Invisible Majority", icon: Layers },
  ];

  const features = [
    {
      title: "GIAT Kasir",
      sub: "Pencatatan Otomatis",
      desc: "Merekam transaksi harian secara otomatis melalui integrasi QRIS dan e-wallet yang sudah dipakai UMKM.",
      icon: CreditCard,
      badge: "Modul 1",
      link: "/kasir",
      bgGradient: "from-blue-600 to-[#082046]",
    },
    {
      title: "GIAT Score",
      sub: "Alternative Credit Scoring",
      desc: "Mengonversi volatilitas transaksi harian menjadi skor kredit terukur (300-850) berbasis 5 dimensi objektif.",
      icon: Gauge,
      badge: "Modul 2",
      link: "/score",
      bgGradient: "from-amber-500 to-[#d97706]",
    },
    {
      title: "Mode Lite USSD",
      sub: "Inklusi Wilayah 3T",
      desc: "Fitur khusus untuk wilayah minim sinyal atau blank spot menggunakan menu USSD (*141*98#) tanpa kuota internet.",
      icon: SignalZero,
      badge: "Inovasi 3T",
      link: "/kasir",
      bgGradient: "from-cyan-600 to-blue-700",
    },
    {
      title: "GIAT Connect",
      sub: "Marketplace Lembaga Keuangan",
      desc: "Menyalurkan skor kredit langsung ke bank mitra & fintech tanpa mensyaratkan agunan fisik sertifikat tanah.",
      icon: Network,
      badge: "Modul 3",
      link: "/connect",
      bgGradient: "from-emerald-600 to-teal-800",
    },
  ];

  const swotContent = {
    strengths: {
      title: "STRENGTHS",
      color: "from-emerald-600 to-teal-700",
      textColor: "text-emerald-700 dark:text-emerald-400",
      points: [
        "Menumpang infrastruktur QRIS & e-wallet eksisting yang telah diadopsi puluhan juta merchant.",
        "Langsung menjawab akar masalah (ketiadaan laporan formal) dengan jejak digital riil.",
        "Rollout presisi per klaster spasial wilayah (Deep Sleepers, Stirring Giants, Awakened Leaders).",
        "Mode Lite USSD menjamin pelaku usaha di wilayah 3T tidak tereliminasi dari sistem pencatatan.",
      ],
    },
    weaknesses: {
      title: "WEAKNESSES",
      color: "from-amber-500 to-amber-700",
      textColor: "text-amber-700 dark:text-amber-400",
      points: [
        "Lemah di wilayah minim sinyal jika tanpa pendampingan literasi Mode Lite awal.",
        "Akurasi bergantung kualitas data dan konsistensi pelaku UMKM dalam mencatat transaksi harian.",
        "Butuh koordinasi multi-pihak yang intensif antara regulator OJK/BI, perbankan, dan agregator.",
      ],
    },
    opportunities: {
      title: "OPPORTUNITIES",
      color: "from-blue-600 to-indigo-800",
      textColor: "text-blue-700 dark:text-blue-400",
      points: [
        "Momentum regulasi OJK & BI terbaru yang sangat mendukung Innovative Credit Scoring (ICS).",
        "Tingkat adopsi QRIS UMKM nasional terus melesat hingga ke warung tradisional.",
        "Pionir data kredit alternatif yang dapat menjadi standar kelayakan kredit mikro di Asia Tenggara.",
      ],
    },
    threats: {
      title: "THREATS",
      color: "from-rose-600 to-red-800",
      textColor: "text-rose-700 dark:text-rose-400",
      points: [
        "Tantangan blank spot wilayah 3T jika infrastruktur seluler 2G terputus total.",
        "Resistensi pedagang informal terhadap pencatatan data formal karena kekhawatiran pajak dini.",
        "Dinamika kepatuhan regulasi perlindungan data pribadi (UU PDP) yang mewajibkan audit ketat.",
      ],
    },
  };

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {/* Hero Section matching the Header of the Infographic */}
      <section className="relative w-full bg-gradient-to-b from-[#082046] via-[#0b2959] to-[#0e3b79] text-white pt-14 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 shadow-2xl border-b border-blue-900/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-400/15 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Top Ribbons: SDG 8 & Indonesia Emas 2045 */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-cyan-300 border border-cyan-400/30 shadow-sm backdrop-blur-md">
              🏆 Lomba Arsen 2026 • ASICM036
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-sm backdrop-blur-md">
              🇮🇩 Visi Indonesia Emas 2045
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/10 text-white border border-white/20 shadow-sm backdrop-blur-md">
              🌐 SDG&apos;s 8: Decent Work &amp; Economic Growth
            </span>
          </div>

          {/* Main 3D Infographic Title */}
          <h1 className="infographic-title-3d text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-[1.1]">
            AWAKENING THE <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
              SLEEPING GIANT
            </span>
          </h1>

          <p className="mt-4 text-lg sm:text-2xl font-extrabold text-blue-100 max-w-3xl mx-auto leading-snug">
            Bagaimana GIAT Mengubah Volatilitas Informalitas UMKM Menjadi Kepastian Data
          </p>

          {/* Infographic Context Quote Box */}
          <div className="mt-6 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-blue-100/90 leading-relaxed shadow-lg">
            Beringingan dengan <strong>SDG&apos;s 8 (Decent Work and Economic Growth)</strong>, Indonesia mencanangkan hal serupa melalui <strong>Visi Indonesia Emas 2045</strong> dengan ekonomi sebagai salah satu pilar utama. Dan kini, pilar tersebut berdiri di atas <em>&ldquo;pondasi raksasa&rdquo;</em> ekonomi Indonesia yang bernama <strong>UMKM</strong>.
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/kasir">
              <Button size="lg" variant="gold" className="gap-2 h-12 px-6 text-sm font-black shadow-xl">
                <CreditCard className="h-5 w-5" />
                <span>Coba Simulasi GIAT Kasir</span>
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-6 text-sm border-white/30 text-white hover:bg-white/15">
                <Compass className="h-5 w-5 text-amber-300" />
                <span>Panduan Tur Interaktif</span>
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="cyan" className="gap-2 h-12 px-6 text-sm font-black">
                <BarChart3 className="h-5 w-5" />
                <span>Analisis Spasial Wilayah</span>
              </Button>
            </Link>
          </div>

          {/* 4 Macro Key Stats from Infographic Section 1 */}
          <div className="mt-12 w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
            {macroStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all shadow-lg hover:border-amber-300/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-200 truncate">
                      {stat.label}
                    </span>
                    <div className="p-1.5 sm:p-2 rounded-xl bg-white/15 text-amber-300 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-3xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-blue-200/80 mt-1 font-semibold truncate">
                    {stat.sub}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sections 1 to 5: The 5 Core Paradoxes from Infographic */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="navy" className="mb-3 px-3 py-1 font-mono text-xs">
            Diagnosis Masalah Empiris • ASICM036
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#082046] dark:text-zinc-50">
            Mengapa Raksasa Ekonomi Ini Masih Tertidur?
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Dibalik angka statistik yang memukau, UMKM menyimpan kerapuhan struktural: terselimut informalitas, terjebak kesenjangan produktivitas, dan mengalami stagnasi pembiayaan perbankan selama satu dekade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Introduce The Sleeping Giant */}
          <div className="infographic-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="infographic-number-badge">1</span>
                <Badge variant="navy">Skala Raksasa</Badge>
              </div>
              <h3 className="text-lg font-black text-[#082046] dark:text-white mb-2">
                Introduce The Sleeping Giant
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-100/70 leading-relaxed">
                64,2 juta unit usaha menyumbang 61% PDB Indonesia. Namun &lsquo;Raksasa Ekonomi&rsquo; ini masih tertidur dalam balutan selimut informalitas tanpa pencatatan transaksi terstandar.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-bold text-[#082046] dark:text-blue-200">
              📊 64,2 Juta Unit • 61% PDB • 99,9% Usaha Mikro
            </div>
          </div>

          {/* 2. The Giant Disconnect */}
          <div className="infographic-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="infographic-number-badge">2</span>
                <Badge variant="gold">Visi Emas vs Realitas</Badge>
              </div>
              <h3 className="text-lg font-black text-[#082046] dark:text-white mb-2">
                The Giant Disconnect
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-100/70 leading-relaxed">
                Kendati menyumbang 61% PDB, 39% diantaranya adalah kontribusi dari hanya 0,1% usaha besar. Artinya mayoritas UMKM &ldquo;kurang bertenaga&rdquo; secara individu dan rentan shock ekonomi.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-200">
              ⚠️ 99,9% Usaha Mikro vs 0,1% Usaha Besar (39% PDB)
            </div>
          </div>

          {/* 3. The Demographic Trap */}
          <div className="infographic-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="infographic-number-badge">3</span>
                <Badge variant="danger">Perangkap Demografi</Badge>
              </div>
              <h3 className="text-lg font-black text-[#082046] dark:text-white mb-2">
                The Demographic Trap
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-100/70 leading-relaxed">
                &ldquo;Structural Absorption Gap&rdquo; memisahkan 194,5 juta usia produktif dengan hanya 10,47 juta daya serap IMK pada 2024. Ketimpangan ini menjebak 97% tenaga kerja dalam low-quality jobs.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-bold text-rose-900 dark:text-rose-200">
              🚨 194,5 Juta Usia Produktif vs 10,47 Juta Formal IMK
            </div>
          </div>

          {/* 4. The Productivity Anomaly */}
          <div className="infographic-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="infographic-number-badge">4</span>
                <Badge variant="cyan">Volume vs Value</Badge>
              </div>
              <h3 className="text-lg font-black text-[#082046] dark:text-white mb-2">
                The Productivity Anomaly
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-100/70 leading-relaxed">
                Terdapat paradoks di mana Jawa Barat unggul total output (Rp 158,49 T), namun efisiensi per pekerja DKI Jakarta jauh lebih tinggi (Rp 121,19 Jt). Industri masih bertumpu pada padat karya tanpa nilai tambah.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-bold text-[#082046] dark:text-blue-200">
              ⚖️ Jabar (Rp158,49T Output) vs DKI (Rp121,19Jt/orang)
            </div>
          </div>

          {/* 5. Stagnasi Struktural Kredit & Massive Financing Gap */}
          <div className="infographic-card p-6 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="infographic-number-badge">5</span>
                <Badge variant="danger">Defisit Rp2.400T</Badge>
              </div>
              <h3 className="text-lg font-black text-[#082046] dark:text-white mb-2">
                Stagnasi Struktural Kredit UMKM &amp; Massive Financing Gap
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-100/70 leading-relaxed">
                Porsi kredit UMKM stagnan di angka 19-20% selama sedekade terakhir, memicu financing gap sebesar Rp2.400 Triliun dari target 30% pemerintah. Kebutuhan 2026 mencapai Rp4.300 T tapi baru Rp1.900 T tersalurkan, memaksa UMKM bergantung pada pembiayaan non-formal.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-bold text-rose-900 dark:text-rose-200">
              📉 Tersalurkan: Rp1.900 T vs Kebutuhan 2026: Rp4.300 T (Gap: Rp2.400 Triliun)
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Spatial Error Model & K-means Clustering */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-blue-100 dark:border-blue-900/30">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="infographic-number-badge">6</span>
            <Badge variant="navy">Analisis Statistik Spasial</Badge>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#082046] dark:text-white">
            Unmasking the Invisible Chain: K-means Clustering &amp; Spatial Error Model
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Dengan <strong>Produktivitas Mikro</strong> sebagai variabel dependennya, nilai statistik membuktikan adanya keterhubungan spasial di mana inefisiensi ekonomi di satu wilayah cenderung &lsquo;menular&rsquo; ke provinsi tetangganya.
          </p>
        </div>

        {/* Spatial Diagnostic Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#082046] text-white shadow-xl mb-12 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Hasil Uji Diagnostik Ekonometrika Spasial
              </span>
              <h4 className="text-lg font-black text-white mt-0.5">
                Spatial Error Model &amp; Moran&apos;s Autocorrelation Test
              </h4>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
              Signifikan (p-value: 0,059 &lt; 0.10)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 text-center">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
              <span className="text-xs text-blue-200 font-semibold">Moran&apos;s I</span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-300 mt-1 font-mono">
                0,1602
              </div>
              <span className="text-[10px] text-blue-200">Autokorelasi Positif</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
              <span className="text-xs text-blue-200 font-semibold">P-value</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300 mt-1 font-mono">
                0,059
              </div>
              <span className="text-[10px] text-blue-200">Signifikan Alpha 10%</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
              <span className="text-xs text-blue-200 font-semibold">Pseudo R²</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1 font-mono">
                0,2946
              </div>
              <span className="text-[10px] text-blue-200">Daya Jelas 29,46%</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
              <span className="text-xs text-blue-200 font-semibold">AIC</span>
              <div className="text-2xl sm:text-3xl font-black text-rose-300 mt-1 font-mono">
                20,99
              </div>
              <span className="text-[10px] text-blue-200">Kebugaran Model Optimal</span>
            </div>
          </div>

          {/* 4 Regression Impact Cubes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[11px] font-bold text-blue-100 block">Persentase Informal</span>
              <span className="inline-block mt-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                ⬇️ Negatif
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[11px] font-bold text-blue-100 block">Persentase Tamat SMA</span>
              <span className="inline-block mt-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                ⬇️ Negatif
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[11px] font-bold text-blue-100 block">Rata-rata Upah</span>
              <span className="inline-block mt-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                ⬇️ Negatif
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[11px] font-bold text-blue-100 block">Tingkat Pengangguran</span>
              <span className="inline-block mt-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ⬆️ Positif
              </span>
            </div>
          </div>
        </div>

        {/* 3 Regional Clusters matching the exact Infographic Section 6 design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cluster 0: The Deep Sleepers */}
          <div className="rounded-3xl p-6 bg-[#082046] text-white border-2 border-blue-400 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-500/30 text-cyan-300 border border-cyan-400">
                  Cluster 0
                </span>
                <span className="text-xs font-mono text-blue-200">14 Provinsi</span>
              </div>
              <h3 className="text-xl font-black text-white mb-1">
                The Deep Sleepers (Tertinggal)
              </h3>
              <p className="text-xs text-blue-200 font-semibold mb-4">
                Informalitas Tinggi dan Pendidikan Rendah
              </p>
              <p className="text-xs text-blue-100/80 leading-relaxed mb-6">
                Didominasi wilayah luar Jawa dan kawasan 3T dengan penetrasi perbankan minimal dan infrastruktur sinyal internet terbatas.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs text-cyan-300 font-bold">
              🎯 Intervensi: GIAT Mode Lite USSD (*141*98#)
            </div>
          </div>

          {/* Cluster 1: The Stirring Giants */}
          <div className="rounded-3xl p-6 bg-[#0284c7] text-white border-2 border-cyan-300 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-white/20 text-white border border-white/40">
                  Cluster 1
                </span>
                <span className="text-xs font-mono text-cyan-100">13 Provinsi</span>
              </div>
              <h3 className="text-xl font-black text-white mb-1">
                The Stirring Giants (Berkembang)
              </h3>
              <p className="text-xs text-cyan-100 font-semibold mb-4">
                Volume Ekonomi Besar &amp; Produktivitas Menengah
              </p>
              <p className="text-xs text-white/90 leading-relaxed mb-6">
                Sentra industri padat karya (Jawa Barat, Jawa Tengah, Jawa Timur). Volume transaksi raksasa namun nilai tambah per pekerja belum optimal.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/20 border border-white/25 text-xs text-white font-bold">
              🎯 Intervensi: Akselerasi Kasir QRIS &amp; Scoring Kredit
            </div>
          </div>

          {/* Cluster 2: The Awakened Leaders */}
          <div className="rounded-3xl p-6 bg-[#fef08a] text-[#854d0e] border-2 border-[#f59e0b] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-[#f59e0b] text-white">
                  Cluster 2
                </span>
                <span className="text-xs font-mono text-[#854d0e] font-bold">7 Provinsi</span>
              </div>
              <h3 className="text-xl font-black text-[#78350f] mb-1">
                The Awakened Leaders (Maju)
              </h3>
              <p className="text-xs text-[#92400e] font-semibold mb-4">
                Ekosistem Ekonomi Matang &amp; Produktivitas Tinggi
              </p>
              <p className="text-xs text-[#78350f]/80 leading-relaxed mb-6">
                DKI Jakarta, Bali, Kep. Riau dengan adopsi digital tinggi dan literasi perbankan maju. Siap scale-up ekspansi modal usaha besar.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-xs text-[#78350f] font-black">
              🎯 Intervensi: Sindikasi Multi-Bank GIAT Connect
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Akar Masalah: Feasible Namun Tidak Bankable */}
      <section id="akar-masalah" className="w-full bg-[#f0f7ff] dark:bg-[#061836] py-16 sm:py-20 border-y border-blue-100 dark:border-blue-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="infographic-number-badge mx-auto mb-2">7</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#082046] dark:text-white">
              Akar Masalah: Feasible Namun Tidak Bankable
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-200/80 mt-1">
              Data dari Otoritas Jasa Keuangan &amp; Bank Indonesia (Infografis Bagian 7)
            </p>
          </div>

          {/* The Inverted Funnel with Authentic Tapered Geometry & Connector Graphics */}
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            {/* Tier 1: 64 Juta Populasi */}
            <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#082046] via-[#0d2f60] to-[#082046] text-white flex items-center justify-between shadow-xl border-2 border-amber-300/40 hover:border-amber-300 transition-all">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-400 text-[#082046] flex items-center justify-center font-black text-sm shrink-0 shadow-md">
                  1
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    Tingkat 1: Populasi Nasional
                  </span>
                  <span className="font-extrabold text-sm sm:text-lg">
                    Total Unit UMKM di Indonesia
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                  64,2 Juta
                </div>
                <span className="text-[10px] text-blue-200">99,9% Usaha Mikro</span>
              </div>
            </div>

            {/* SVG Funnel Connector 1 */}
            <div className="w-full flex justify-center py-1">
              <svg width="280" height="24" viewBox="0 0 280 24" className="text-blue-300 dark:text-blue-700">
                <polygon points="20,0 260,0 220,24 60,24" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="140" y1="0" x2="140" y2="24" stroke="#0284c7" strokeWidth="2" strokeDasharray="2 2" />
              </svg>
            </div>

            {/* Tier 2: 30 Juta Feasible */}
            <div className="w-[90%] p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#13407e] via-[#1a56db] to-[#13407e] text-white flex items-center justify-between shadow-lg border border-cyan-400/40 hover:border-cyan-300 transition-all">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-400 text-[#082046] flex items-center justify-center font-black text-sm shrink-0 shadow-md">
                  2
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-cyan-200 uppercase tracking-wider block">
                    Tingkat 2: Kelayakan Bisnis Riil
                  </span>
                  <span className="font-extrabold text-sm sm:text-lg">
                    UMKM Feasible (Menguntungkan)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-cyan-200 font-mono">
                  30 Juta
                </div>
                <span className="text-[10px] text-cyan-200">Arus Kas Positif</span>
              </div>
            </div>

            {/* SVG Funnel Connector 2: The Critical Feasibility Gap */}
            <div className="w-full flex flex-col items-center my-3 space-y-2">
              <svg width="220" height="20" viewBox="0 0 220 20" className="text-amber-400">
                <polygon points="10,0 210,0 180,20 40,20" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Dramatic Gap Callout Card matching Infographic Section 7 */}
              <div className="w-[84%] p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/60 dark:to-orange-950/40 border-2 border-dashed border-amber-400 text-center shadow-md space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-[#082046] font-black text-xs uppercase tracking-wider shadow-xs">
                  ⚡ The Feasibility Gap: 20 Juta UMKM Terjebak
                </div>
                <h4 className="text-sm font-black text-[#082046] dark:text-amber-200">
                  &ldquo;The Invisible Majority&rdquo; • Kesenjangan Pembiayaan Rp 2.400 Triliun!
                </h4>
                <p className="text-xs text-amber-950 dark:text-amber-200/90 leading-relaxed">
                  Usaha terbukti untung namun ditolak perbankan konvensional akibat ketiadaan agunan fisik (sertifikat tanah/BPKB) dan nihilnya laporan keuangan formal. Porsi kredit UMKM pun <strong>stagnan di kisaran 19-20%</strong> selama satu dekade terakhir.
                </p>
                <div className="pt-1 flex items-center justify-center gap-2 text-[11px] font-extrabold text-[#0284c7]">
                  <span>🌉 Solusi GIAT: Agunan Digital Berbasis Jejak Kasir QRIS</span>
                </div>
              </div>

              <svg width="180" height="20" viewBox="0 0 180 20" className="text-blue-400">
                <polygon points="10,0 170,0 150,20 30,20" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Tier 3: 10 Juta Bankable */}
            <div className="w-[74%] p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] text-white flex items-center justify-between shadow-lg border border-white/30 hover:border-white transition-all">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white text-[#0284c7] flex items-center justify-center font-black text-sm shrink-0 shadow-md">
                  3
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-wider block">
                    Tingkat 3: Lolos Administrasi Bank
                  </span>
                  <span className="font-extrabold text-xs sm:text-base">
                    UMKM Bankable (Tersentuh Kredit)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black text-white font-mono">
                  10 Juta
                </div>
                <span className="text-[10px] text-white/80">Hanya 15,6%</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-white dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-slate-700 dark:text-blue-100 leading-relaxed text-center shadow-md">
            <strong>Analisis Infografis:</strong> &ldquo;Dominasi sektor informal dalam klaster-klaster tersebut diperparah hambatan struktural di mana UMKM bersifat <em>feasible namun tidak bankable</em> akibat absennya prudent management dan administrasi formal. Inilah yang menyebabkan potensi ekonomi terjebak sebagai <strong>the invisible majority</strong> yang gagal tersentuh pendanaan perbankan. <strong>GIAT hadir untuk menjembatani 20 juta UMKM ini!</strong>&rdquo;
          </div>
        </div>
      </section>

      {/* Sections 8 & 9: GIAT Solusi Terintegrasi (3 Modul + Mode Lite & 4 Langkah) */}
      <section className="w-full bg-[#082046] text-white py-16 sm:py-20 border-y border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 8 Infographic Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 mb-16 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="flex flex-col items-center">
                <span className="giat-logo-3d text-5xl sm:text-7xl">
                  GIAT
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-amber-300 font-extrabold uppercase mt-1">
                  Digital Footprint
                </span>
              </div>

              <div className="h-20 w-px bg-white/20 hidden sm:block" />

              <div className="space-y-2 max-w-2xl">
                <Badge variant="cyan" className="font-bold">
                  Infrastruktur Digital Ringan
                </Badge>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  <strong>GIAT</strong> adalah infrastruktur digital ringan yang diintegrasikan QRIS/e-wallet yang sudah dipakai UMKM sehari-hari. Merekam transaksi secara otomatis, mengonversinya menjadi skor kredit alternatif, lalu menyalurkannya ke bank/fintech mitra dengan <strong>bermodalkan agunan digital</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0 justify-center">
              <Link href="/kasir">
                <Button variant="gold" className="font-black text-sm">
                  Coba GIAT Kasir
                </Button>
              </Link>
              <Link href="/score">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/15 text-sm">
                  Kalkulator Skor
                </Button>
              </Link>
            </div>
          </div>

          {/* 4 Fitur Unggulan Grid */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <span className="infographic-number-badge">8</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Fitur Unggulan GIAT
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <Link key={idx} href={feat.link} className="group">
                    <div className="h-full p-6 rounded-3xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-lg">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/15 text-amber-300">
                            {feat.badge}
                          </span>
                          <ArrowRight className="h-4 w-4 text-white/50 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                        </div>

                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.bgGradient} text-white flex items-center justify-center shadow-md mb-4`}>
                          <Icon className="h-6 w-6" />
                        </div>

                        <h4 className="text-lg font-black text-white mb-1">
                          {feat.title}
                        </h4>
                        <span className="text-xs text-amber-300 font-semibold block mb-2">
                          {feat.sub}
                        </span>

                        <p className="text-xs text-blue-100/80 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 text-xs font-bold text-cyan-300 flex items-center gap-1">
                        <span>Buka Simulasi</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 9: Cara Kerja 4 Langkah from Infographic */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="infographic-number-badge">9</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Cara Kerja: Dari Kasir ke Pencairan Pinjaman
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "Scan",
                  num: "01",
                  title: "Transaksi Digital",
                  desc: "Transaksi digital direkam otomatis melalui fitur GIAT Kasir via QRIS atau Mode Lite USSD.",
                  icon: Smartphone,
                  color: "border-blue-400",
                },
                {
                  step: "Hitung",
                  num: "02",
                  title: "GIAT Score",
                  desc: "GIAT Score menghitung skor kredit alternatif 300-850 dari riwayat transaksi & arus kas riil.",
                  icon: Gauge,
                  color: "border-amber-400",
                },
                {
                  step: "Distribusi",
                  num: "03",
                  title: "GIAT Connect",
                  desc: "GIAT Connect menyalurkan skor secara otomatis ke bank Himbara & fintech mitra terdaftar OJK.",
                  icon: Network,
                  color: "border-cyan-400",
                },
                {
                  step: "Validasi",
                  num: "04",
                  title: "Pencairan Modal",
                  desc: "Validasi dan dukungan pembiayaan dicairkan sesuai karakteristik dan klaster spasial UMKM.",
                  icon: CheckCircle2,
                  color: "border-emerald-400",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-3xl bg-white/10 border-2 ${item.color} shadow-lg flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-amber-300 font-mono">
                          {item.step}
                        </span>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-base font-black text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-blue-100/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-4 text-[10px] font-mono text-blue-200">
                      Langkah {item.num} dari 04
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10 & 11: Proyeksi Manfaat, Mitigasi Risiko & Analisis SWOT */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Section 10: Proyeksi Manfaat dan Mitigasi Risiko */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="infographic-number-badge">10</span>
            <Badge variant="navy">Dampak Nyata &amp; Manajemen Risiko</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#082046] dark:text-white mb-2">
            Proyeksi Manfaat dan Mitigasi Risiko
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
            Implementasi menyeluruh yang menjamin keandalan sistem, perlindungan data pribadi, dan perluasan inklusi finansial nasional.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#082046] text-white shrink-0 mt-0.5">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                  Financing Gap Teratasi
                </h4>
                <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-0.5">
                  Defisit Rp 2.400 Triliun tertutup bertahap dengan pembukaan akses kredit non-agunan fisik.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                  Produktivitas +24%
                </h4>
                <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-0.5">
                  Kredit baru &gt;Rp 1.000 T dialirkan ke segmen unbankable untuk eskalasi kapasitas produksi.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-600 text-white shrink-0 mt-0.5">
                <SignalZero className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                  Inklusi Wilayah 3T
                </h4>
                <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-0.5">
                  Pedagang di wilayah tertinggal tetap terjangkau lewat inovasi Mode Lite USSD *141#.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                  Mitigasi Skor Salah
                </h4>
                <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-0.5">
                  Penerapan threshold konservatif + jalur verifikasi manual untuk kasus anomali omzet.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-600 text-white shrink-0 mt-0.5">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                  Kepatuhan UU PDP
                </h4>
                <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-0.5">
                  Enkripsi end-to-end, anonymized dashboard, dan izin eksplisit pemilik UMKM.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
                <Server className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#082046] dark:text-white">
                  Skalabilitas Cloud
                </h4>
                <p className="text-xs text-slate-600 dark:text-blue-100/70 mt-0.5">
                  Arsitektur multi-bank &amp; cloud scalable sanggup menampung lonjakan jutaan transaksi per detik.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 11: Analisis SWOT from Infographic */}
        <div id="swot">
          <div className="flex items-center gap-2 mb-3">
            <span className="infographic-number-badge">11</span>
            <Badge variant="navy">Evaluasi Strategis</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#082046] dark:text-white mb-2">
            Analisis SWOT GIAT
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
            Tinjauan komprehensif atas kekuatan, kelemahan, peluang, dan tantangan adopsi nasional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(swotContent).map(([key, item]) => (
              <div
                key={key}
                className="infographic-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${item.color} text-white font-black text-center text-sm shadow-md mb-4 tracking-wider`}>
                    {item.title}
                  </div>

                  <ul className="space-y-3">
                    {item.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-blue-100 leading-relaxed">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${item.textColor}`} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: Kesimpulan & Interactive Portal Call-to-Action */}
      <section className="w-full bg-gradient-to-b from-[#f0f7ff] to-white dark:from-[#061836] dark:to-[#041124] py-16 sm:py-20 border-t border-blue-100 dark:border-blue-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#082046] text-white p-6 sm:p-12 shadow-2xl border border-white/15 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <span className="infographic-number-badge">12</span>
              <Badge variant="gold">Kesimpulan Karya ASICM036</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-xl sm:text-3xl font-black text-white leading-snug">
                  Data Berbicara Lebih Dulu, Modal Menyusul Tepat Sasaran
                </h3>
                <blockquote className="text-xs sm:text-sm text-blue-100/90 leading-relaxed italic border-l-4 border-amber-400 pl-4 py-1">
                  &ldquo;UMKM Indonesia tidak lagi soal <em>apakah mereka layak</em>, tapi <em>seberapa cepat rekam jejak mereka bisa terbaca</em>. Volatilitas ekonomi yang selama ini bersembunyi di balik informalitas kini bisa dibaca lewat data, bukan lagi ditebak. GIAT menjembatani ini: Transaksi berbicara lebih dulu, modal menyusul tepat sasaran dan mengubah raksasa yang tertidur menjadi penggerak nyata Indonesia Emas 2045.&rdquo;
                </blockquote>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link href="/dashboard">
                    <Button variant="gold" className="font-black text-sm">
                      Buka Dashboard Profil UMKM
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-sm">
                      Mulai Tur Demo 5 Langkah
                    </Button>
                  </Link>
                </div>
              </div>

              {/* QR representation for "Coba Prototype Scan Berikut" from Infographic */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 border border-white/15 text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-2.5 shadow-lg flex items-center justify-center">
                  <QrCode className="w-full h-full text-[#082046]" />
                </div>
                <span className="font-extrabold text-sm text-white mt-3">
                  Coba Prototype GIAT
                </span>
                <span className="text-[10px] text-blue-200 mt-0.5">
                  Scan QR atau klik tombol di samping
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
