"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowRight,
  Info,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import klasterData from "@/data/klaster.json";
import provinsiData from "@/data/provinsi.json";
import { UMKMCluster } from "@/types";
import { IndonesiaSpatialMap } from "@/components/analytics/indonesia-spatial-map";
import { MoransScatterplot } from "@/components/analytics/morans-scatterplot";

export default function AnalyticsPage() {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState(provinsiData[0]);

  const filteredProvinces = provinsiData.filter((p) => {
    if (selectedCluster === "all") return true;
    return p.cluster === selectedCluster;
  });

  const clusterMeta = {
    "Deep Sleepers": {
      badgeClass: "bg-[#082046] text-white border-[#38bdf8]",
      bgBar: "bg-[#082046]",
      cardClass: "border-blue-400 bg-[#082046] text-white",
    },
    "Stirring Giants": {
      badgeClass: "bg-[#0284c7] text-white border-[#bae6fd]",
      bgBar: "bg-[#0284c7]",
      cardClass: "border-cyan-300 bg-[#0284c7] text-white",
    },
    "Awakened Leaders": {
      badgeClass: "bg-[#fef08a] text-[#854d0e] border-[#f59e0b]",
      bgBar: "bg-[#f59e0b]",
      cardClass: "border-amber-400 bg-[#fef08a] text-[#854d0e]",
    },
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-blue-100 dark:border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="infographic-number-badge">6</span>
            <Badge variant="navy" className="text-xs font-mono">
              Ekonometrika Spasial &amp; K-means Clustering
            </Badge>
            <span className="text-xs text-slate-500 font-semibold">• Riset Ilmiah ASICM036</span>
          </div>
          <h1 className="text-3xl font-black text-[#082046] dark:text-white tracking-tight flex items-center gap-2">
            <span>Dashboard Analisis Klaster &amp; Efek Spasial Wilayah</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-blue-200/70 mt-1 max-w-3xl">
            Hasil pemetaan ekonometrika membuktikan adanya keterhubungan spasial (Moran&apos;s I = 0,1602): inefisiensi ekonomi di satu wilayah menular ke wilayah tetangga, sehingga perbaikan ekosistem GIAT akan memicu efek bola salju kemakmuran nasional.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/kasir">
            <Button variant="gold" className="gap-2 font-black shadow-md">
              <span>Buka Demo Kasir</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Econometric Model Summary Banner: Moran's I & Spatial Error Model */}
      <div className="p-6 rounded-3xl bg-[#082046] text-white shadow-xl space-y-6 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
          <div>
            <h3 className="text-lg font-black flex items-center gap-2 text-white">
              <Globe2 className="h-5 w-5 text-cyan-300" />
              <span>Spatial Error Model &amp; Moran&apos;s Index Diagnostic</span>
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Variabel Dependen: <strong>Produktivitas Mikro (Nilai Tambah per Tenaga Kerja)</strong>
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
            Signifikan (p-value: 0,059)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
            <span className="text-xs text-blue-200">Moran&apos;s I</span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 mt-1 font-mono">
              {klasterData.spatialModel.moransI}
            </div>
            <span className="text-[10px] text-blue-200">Autokorelasi Spasial Positif</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
            <span className="text-xs text-blue-200">P-Value</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300 mt-1 font-mono">
              {klasterData.spatialModel.pValue}
            </div>
            <span className="text-[10px] text-blue-200">Signifikan pada alpha 10%</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
            <span className="text-xs text-blue-200">Pseudo R²</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1 font-mono">
              {klasterData.spatialModel.pseudoR}
            </div>
            <span className="text-[10px] text-blue-200">Daya Jelas Model (29,46%)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
            <span className="text-xs text-blue-200">Akaike Info Criterion (AIC)</span>
            <div className="text-2xl sm:text-3xl font-black text-rose-300 mt-1 font-mono">
              {klasterData.spatialModel.aic}
            </div>
            <span className="text-[10px] text-blue-200">Model Kebugaran Optimal</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-blue-100 leading-relaxed flex items-start gap-3">
          <Info className="h-5 w-5 text-cyan-300 shrink-0 mt-0.5" />
          <p>
            <strong>Interpretasi Statistik:</strong> {klasterData.spatialModel.interpretation}
          </p>
        </div>
      </div>

      {/* The 4 Regression Variables Impact from Infographic Section 6 */}
      <div>
        <h3 className="text-base font-black text-[#082046] dark:text-white mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#082046]" />
          <span>Pengaruh 4 Variabel Kunci Terhadap Produktivitas Spasial</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {klasterData.spatialModel.regressionVariables.map((v, i) => (
            <div
              key={i}
              className="infographic-card p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#082046] dark:text-white">{v.variable}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    v.direction === "negative"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {v.direction === "negative" ? "⬇️ Negatif" : "⬆️ Positif"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-blue-100/70 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Moran's I Scatterplot 4 Quadrants Diagnostic */}
      <MoransScatterplot />

      {/* Interactive Visual Map of Indonesia's 3 Regional Clusters */}
      <IndonesiaSpatialMap
        selectedCluster={selectedCluster}
        onSelectCluster={(c) => setSelectedCluster(c)}
      />

      {/* The 3 Clusters Deep Dive Cards matching Section 6 Infographic */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xl font-black text-[#082046] dark:text-white">
            3 Klaster Wilayah Hasil K-means Clustering
          </h3>
          {/* Cluster Filter Buttons */}
          <div className="flex gap-1.5 p-1 rounded-2xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-200 dark:border-blue-800">
            <button
              onClick={() => setSelectedCluster("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCluster === "all"
                  ? "bg-[#082046] text-white shadow-sm"
                  : "text-slate-600 dark:text-blue-200 hover:text-[#082046]"
              }`}
            >
              Semua Klaster
            </button>
            {klasterData.clusters.map((c) => (
              <button
                key={c.cluster}
                onClick={() => setSelectedCluster(c.cluster)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCluster === c.cluster
                    ? "bg-[#082046] text-white shadow-sm"
                    : "text-slate-600 dark:text-blue-200 hover:text-[#082046]"
                }`}
              >
                {c.cluster}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {klasterData.clusters.map((c) => {
            const meta = clusterMeta[c.cluster as UMKMCluster];
            const isSelected = selectedCluster === "all" || selectedCluster === c.cluster;

            return (
              <div
                key={c.cluster}
                className={`rounded-3xl border-2 p-6 shadow-xl flex flex-col justify-between transition-all duration-300 ${
                  meta.cardClass
                } ${isSelected ? "opacity-100 scale-100" : "opacity-40 scale-[0.98]"}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-black border ${meta.badgeClass}`}>
                      {c.cluster}
                    </span>
                    <span className="text-xs font-mono font-bold opacity-80">
                      {c.provincesCount} Provinsi
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-black mb-1">
                      {c.label}
                    </h4>
                    <p className="text-xs leading-relaxed opacity-90">
                      {c.description}
                    </p>
                  </div>

                  {/* Quantitative Stats */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-black/15 text-xs">
                    <div className="flex justify-between">
                      <span className="opacity-80">Rata-rata Informalitas:</span>
                      <strong className="font-mono">{c.avgInformalPercentage}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Produktivitas per Pekerja:</span>
                      <strong className="font-mono">{c.avgProductivity}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Tamat SMA / Sederajat:</span>
                      <strong className="font-mono">{c.educationHighSchoolPct}%</strong>
                    </div>
                  </div>

                  {/* Key Provinces */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 opacity-80">
                      Provinsi Representatif:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {c.keyProvinces.map((prov, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-black/20 font-bold">
                          {prov}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommended GIAT Strategy */}
                <div className="mt-6 pt-4 border-t border-black/15 text-xs">
                  <span className="text-[10px] font-black uppercase tracking-wider block mb-1 text-amber-300">
                    🎯 Intervensi GIAT Presisi:
                  </span>
                  <p className="leading-relaxed font-semibold opacity-95">
                    {c.recommendedIntervention}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Province Explorer & Macro Paradoxes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (7 cols): Interactive Province List & Regional Details */}
        <div className="lg:col-span-7 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#082046]" />
                  <span>Eksplorasi Data 34 Provinsi Terpilih</span>
                </CardTitle>
                <Badge variant="navy">{filteredProvinces.length} Provinsi</Badge>
              </div>
              <CardDescription>
                Pilih salah satu provinsi untuk melihat rincian ekonomi dan rekomendasi intervensi
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Province Pill Selector */}
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 border rounded-2xl border-blue-100 dark:border-blue-900/40 bg-[#f0f7ff] dark:bg-[#061836]">
                {filteredProvinces.map((prov) => (
                  <button
                    key={prov.code}
                    onClick={() => setSelectedProvince(prov)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedProvince.code === prov.code
                        ? "bg-[#082046] text-white shadow-sm"
                        : "bg-white dark:bg-[#071c3b] hover:bg-blue-100 text-slate-700 dark:text-blue-200 border border-blue-100/50"
                    }`}
                  >
                    {prov.name}
                  </button>
                ))}
              </div>

              {/* Selected Province Details Card */}
              <div className="p-5 rounded-3xl bg-[#f0f7ff] dark:bg-[#061836] border border-blue-200 dark:border-blue-800 space-y-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-black text-[#082046] dark:text-white">
                      {selectedProvince.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono">Kode BPS: {selectedProvince.code}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${clusterMeta[selectedProvince.cluster as UMKMCluster].badgeClass}`}>
                    {selectedProvince.cluster}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#071c3b] border border-blue-100 dark:border-blue-900/40">
                    <span className="text-slate-400 block text-[10px] font-bold">Total UMKM:</span>
                    <strong className="text-[#082046] dark:text-white text-sm font-black">
                      {(selectedProvince.umkmCount / 1000000).toFixed(2)} Jt
                    </strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-[#071c3b] border border-blue-100 dark:border-blue-900/40">
                    <span className="text-slate-400 block text-[10px] font-bold">Informalitas:</span>
                    <strong className="text-rose-600 text-sm font-black">
                      {selectedProvince.informalRate}%
                    </strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-[#071c3b] border border-blue-100 dark:border-blue-900/40">
                    <span className="text-slate-400 block text-[10px] font-bold">Output / Pekerja:</span>
                    <strong className="text-[#0284c7] text-sm font-black">
                      Rp {selectedProvince.avgMonthlyOutput} Jt
                    </strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-[#071c3b] border border-blue-100 dark:border-blue-900/40">
                    <span className="text-slate-400 block text-[10px] font-bold">Tersentuh Bank:</span>
                    <strong className="text-emerald-600 text-sm font-black">
                      {selectedProvince.bankableRate}%
                    </strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 text-xs">
                  <strong className="text-[#082046] dark:text-amber-300 block mb-1">
                    Strategi Penyaluran GIAT untuk {selectedProvince.name}:
                  </strong>
                  <p className="text-slate-600 dark:text-blue-100/80 leading-relaxed">
                    {selectedProvince.cluster === "Deep Sleepers"
                      ? "Prioritaskan peluncuran GIAT Mode Lite USSD *141*98# untuk pedagang pasar & mikro tanpa mensyaratkan smartphone 4G."
                      : selectedProvince.cluster === "Stirring Giants"
                      ? "Akselerasi digitalisasi kasir QRIS agar volume raksasa beralih menjadi nilai tambah dan plafon pinjaman terangkat hingga Rp 100 Juta."
                      : "Maksimalkan sindikasi GIAT Connect dengan multi-bank swasta & fintech produktif untuk ekspansi cabang nasional."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right (5 cols): The Two Visual Paradoxes from Infographic */}
        <div className="lg:col-span-5 space-y-6">
          {/* Paradox 1: The Productivity Anomaly: Volume vs Value */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="infographic-number-badge">4</span>
                <CardTitle className="text-base">Anomali Produktivitas: Volume vs Value</CardTitle>
              </div>
              <CardDescription>
                Studi kasus dari infografis ASICM036
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-center">
                  <span className="text-xs text-amber-900 dark:text-amber-200 font-extrabold">Jawa Barat</span>
                  <div className="text-xl font-black text-amber-900 dark:text-amber-200 mt-1 font-mono">
                    Rp 158,49 T
                  </div>
                  <span className="text-[10px] text-slate-500 block font-medium">Output IMK Tertinggi</span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 text-center">
                  <span className="text-xs text-blue-900 dark:text-blue-200 font-extrabold">DKI Jakarta</span>
                  <div className="text-xl font-black text-[#082046] dark:text-blue-200 mt-1 font-mono">
                    Rp 121,19 Jt
                  </div>
                  <span className="text-[10px] text-slate-500 block font-medium">Output per Tenaga Kerja</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-blue-100/70 leading-relaxed">
                Terdapat paradoks di mana Jawa Barat unggul volume namun Jakarta jauh lebih efisien. Industri masih bertumpu pada padat karya, bukan nilai tambah. <strong>GIAT membantu meningkatkan efisiensi dengan otomatisasi data.</strong>
              </p>
            </CardContent>
          </Card>

          {/* Paradox 2: Massive Financing Gap Rp 2.400T */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span className="infographic-number-badge">5</span>
                <CardTitle className="text-base">Financing Gap Rp 2.400 Triliun</CardTitle>
              </div>
              <CardDescription>
                Kebutuhan vs Realisasi Penyaluran Kredit
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500">Tersalurkan:</span>
                  <span className="text-[#082046] dark:text-white font-mono">Rp 1.900 Triliun</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: "44%" }} />
                </div>

                <div className="flex justify-between text-xs pt-1 font-bold">
                  <span className="text-slate-500">Kebutuhan 2026:</span>
                  <span className="text-[#082046] dark:text-white font-mono">Rp 4.300 Triliun</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-[#082046]" style={{ width: "100%" }} />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 font-bold leading-relaxed">
                ⚠️ Defisit Rp 2.400 Triliun ini memaksa UMKM bergantung pada pembiayaan non-formal dan pinjol ilegal berbunga mencekik.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
