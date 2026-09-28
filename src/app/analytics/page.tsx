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

export default function AnalyticsPage() {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [selectedProvince, setSelectedProvince] = useState(provinsiData[0]);

  // Filter provinces based on selected cluster
  const filteredProvinces = provinsiData.filter((p) => {
    if (selectedCluster === "all") return true;
    return p.cluster === selectedCluster;
  });

  const clusterMeta = {
    "Deep Sleepers": {
      color: "rose",
      badgeClass: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300",
      bgBar: "bg-rose-500",
    },
    "Stirring Giants": {
      color: "amber",
      badgeClass: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300",
      bgBar: "bg-amber-500",
    },
    "Awakened Leaders": {
      color: "emerald",
      badgeClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300",
      bgBar: "bg-emerald-500",
    },
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs font-mono">
              Ekonometrika Spasial &amp; K-means Clustering
            </Badge>
            <span className="text-xs text-zinc-500">• Riset Pendukung ASICM036</span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            <span>Dashboard Analisis Klaster &amp; Efek Spasial Wilayah</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-3xl">
            Hasil pemetaan ekonometrika membuktikan adanya keterhubungan spasial (Moran&apos;s I = 0,1602): inefisiensi ekonomi di satu wilayah menular ke wilayah tetangga, sehingga perbaikan ekosistem GIAT akan memicu efek bola salju kemakmuran.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/kasir">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold">
              <span>Buka Demo Kasir</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Econometric Model Summary Banner: Moran's I & Spatial Error Model */}
      <div className="p-6 rounded-3xl bg-zinc-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-cyan-400" />
              <span>Spatial Error Model &amp; Moran&apos;s Index Diagnostic</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Variabel Dependen: <strong>Produktivitas Mikro (Nilai Tambah per Tenaga Kerja)</strong>
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
            Signifikan (p-value: 0,059)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/60">
            <span className="text-xs text-zinc-400">Moran&apos;s I</span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
              {klasterData.spatialModel.moransI}
            </div>
            <span className="text-[10px] text-zinc-400">Autokorelasi Spasial Positif</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/60">
            <span className="text-xs text-zinc-400">P-Value</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
              {klasterData.spatialModel.pValue}
            </div>
            <span className="text-[10px] text-zinc-400">Signifikan pada alpha 10%</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/60">
            <span className="text-xs text-zinc-400">Pseudo R²</span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400 mt-1">
              {klasterData.spatialModel.pseudoR}
            </div>
            <span className="text-[10px] text-zinc-400">Daya Jelas Model (29,46%)</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700/60">
            <span className="text-xs text-zinc-400">Akaike Info Criterion (AIC)</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              {klasterData.spatialModel.aic}
            </div>
            <span className="text-[10px] text-zinc-400">Model Kebugaran Optimal</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/60 text-xs text-zinc-300 leading-relaxed flex items-start gap-3">
          <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <strong>Interpretasi Statistik:</strong> {klasterData.spatialModel.interpretation}
          </p>
        </div>
      </div>

      {/* The 4 Regression Variables Impact */}
      <div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600" />
          <span>Pengaruh 4 Variabel Kunci Terhadap Ketimpangan Spasial</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {klasterData.spatialModel.regressionVariables.map((v, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{v.variable}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    v.direction === "negative"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  }`}
                >
                  {v.effect}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The 3 Clusters Deep Dive Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            3 Klaster Hasil K-means Clustering Wilayah
          </h3>
          {/* Cluster Filter Buttons */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setSelectedCluster("all")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCluster === "all"
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              Semua Klaster
            </button>
            {klasterData.clusters.map((c) => (
              <button
                key={c.cluster}
                onClick={() => setSelectedCluster(c.cluster)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCluster === c.cluster
                    ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
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
                className={`rounded-3xl border bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col justify-between transition-all duration-300 ${
                  isSelected ? "opacity-100 shadow-lg border-zinc-300 dark:border-zinc-700" : "opacity-40"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${meta.badgeClass}`}>
                      {c.cluster}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {c.provincesCount} Provinsi
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      {c.label}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  {/* Quantitative Stats */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Rata-rata Informalitas:</span>
                      <strong className="text-zinc-900 dark:text-zinc-100">{c.avgInformalPercentage}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Produktivitas per Pekerja:</span>
                      <strong className="text-blue-600 dark:text-blue-400">{c.avgProductivity}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Tamat SMA / Sederajat:</span>
                      <strong className="text-zinc-900 dark:text-zinc-100">{c.educationHighSchoolPct}%</strong>
                    </div>
                  </div>

                  {/* Key Provinces */}
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                      Provinsi Representatif:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {c.keyProvinces.map((prov, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {prov}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommended GIAT Strategy */}
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                    🎯 Intervensi GIAT Presisi:
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
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
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>Eksplorasi Data Provinsi Terpilih</span>
                </CardTitle>
                <Badge variant="outline">{filteredProvinces.length} Provinsi</Badge>
              </div>
              <CardDescription>
                Pilih salah satu provinsi untuk melihat rincian ekonomi dan rekomendasi intervensi
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Province Pill Selector */}
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 border rounded-xl border-zinc-200 dark:border-zinc-800">
                {filteredProvinces.map((prov) => (
                  <button
                    key={prov.code}
                    onClick={() => setSelectedProvince(prov)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedProvince.code === prov.code
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {prov.name}
                  </button>
                ))}
              </div>

              {/* Selected Province Details Card */}
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-black text-zinc-900 dark:text-zinc-50">
                      {selectedProvince.name}
                    </h4>
                    <span className="text-xs text-zinc-500">Kode Wilayah: {selectedProvince.code}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${clusterMeta[selectedProvince.cluster as UMKMCluster].badgeClass}`}>
                    {selectedProvince.cluster}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-400 block text-[10px]">Total UMKM:</span>
                    <strong className="text-zinc-900 dark:text-zinc-100 text-sm">
                      {(selectedProvince.umkmCount / 1000000).toFixed(2)} Juta
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-400 block text-[10px]">Informalitas:</span>
                    <strong className="text-rose-600 text-sm">
                      {selectedProvince.informalRate}%
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-400 block text-[10px]">Output / Pekerja:</span>
                    <strong className="text-blue-600 text-sm">
                      Rp {selectedProvince.avgMonthlyOutput} Jt
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-400 block text-[10px]">Tersentuh Bank:</span>
                    <strong className="text-emerald-600 text-sm">
                      {selectedProvince.bankableRate}%
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs">
                  <strong>Strategi Penyaluran GIAT untuk {selectedProvince.name}:</strong>{" "}
                  {selectedProvince.cluster === "Deep Sleepers"
                    ? "Prioritaskan peluncuran GIAT Mode Lite USSD *141# untuk pedagang pasar & mikro tanpa mensyaratkan smartphone 4G."
                    : selectedProvince.cluster === "Stirring Giants"
                    ? "Akselerasi digitalisasi kasir QRIS agar volume raksasa beralih menjadi nilai tambah dan plafon pinjaman terangkat hingga Rp 100 Juta."
                    : "Maksimalkan sindikasi GIAT Connect dengan multi-bank swasta & fintech produktif untuk ekspansi cabang nasional."}
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
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span>Anomali Produktivitas: Volume vs Value</span>
              </CardTitle>
              <CardDescription>
                Studi kasus dari infografis ASICM036
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-center">
                  <span className="text-xs text-amber-800 dark:text-amber-300 font-bold">Jawa Barat</span>
                  <div className="text-xl font-black text-amber-900 dark:text-amber-200 mt-1">
                    Rp 158,49 T
                  </div>
                  <span className="text-[10px] text-zinc-500 block">Total Output IMK (Volume Tertinggi)</span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-center">
                  <span className="text-xs text-blue-800 dark:text-blue-300 font-bold">DKI Jakarta</span>
                  <div className="text-xl font-black text-blue-900 dark:text-blue-200 mt-1">
                    Rp 121,19 Jt
                  </div>
                  <span className="text-[10px] text-zinc-500 block">Output per Tenaga Kerja (Efisiensi Tertinggi)</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Terdapat paradoks di mana Jawa Barat unggul volume namun Jakarta jauh lebih efisien. Industri masih bertumpu pada kuantitas padat karya, bukan kualitas nilai tambah. <strong>GIAT membantu meningkatkan efisiensi dengan otomatisasi data.</strong>
              </p>
            </CardContent>
          </Card>

          {/* Paradox 2: Massive Financing Gap Rp 2.400T */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-rose-500" />
                <span>Massive Financing Gap Rp 2.400 Triliun</span>
              </CardTitle>
              <CardDescription>
                Kebutuhan vs Realisasi Penyaluran Kredit
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Tersalurkan (2023):</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">Rp 1.900 Triliun</span>
                </div>
                <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: "44%" }} />
                </div>

                <div className="flex justify-between text-xs pt-1">
                  <span className="text-zinc-500">Kebutuhan Pendanaan (2026):</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">Rp 4.300 Triliun</span>
                </div>
                <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: "100%" }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 font-semibold">
                ⚠️ Defisit Rp 2.400 Triliun ini memaksa UMKM bergantung pada pembiayaan informal dan pinjol ilegal berbunga mencekik.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
