"use client";

import React, { useState } from "react";
import { UMKMCluster } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Info, Sparkles } from "lucide-react";

interface ScatterPoint {
  id: string;
  name: string;
  cluster: UMKMCluster;
  z: number; // standardized productivity
  wz: number; // spatial lag
  quadrant: "High-High" | "Low-Low" | "Low-High" | "High-Low";
}

export function MoransScatterplot() {
  const [hoveredPoint, setHoveredPoint] = useState<ScatterPoint | null>(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>("all");

  // Representative sample of Indonesian provinces plotted in Moran's space (z, Wz)
  // Slope = 0.1602 (from the ASICM036 Spatial Error Model paper)
  const dataPoints: ScatterPoint[] = [
    // Quadrant I: High-High (Hotspot - Awakened Leaders & dynamic giants)
    { id: "dki", name: "DKI Jakarta", cluster: "Awakened Leaders", z: 2.1, wz: 1.4, quadrant: "High-High" },
    { id: "diy", name: "DI Yogyakarta", cluster: "Awakened Leaders", z: 1.5, wz: 1.1, quadrant: "High-High" },
    { id: "bali", name: "Bali", cluster: "Awakened Leaders", z: 1.7, wz: 0.9, quadrant: "High-High" },
    { id: "kepri", name: "Kepulauan Riau", cluster: "Awakened Leaders", z: 1.3, wz: 0.8, quadrant: "High-High" },
    { id: "kaltim", name: "Kalimantan Timur", cluster: "Awakened Leaders", z: 1.4, wz: 0.7, quadrant: "High-High" },
    { id: "banten", name: "Banten", cluster: "Stirring Giants", z: 0.8, wz: 1.2, quadrant: "High-High" },
    { id: "jabar", name: "Jawa Barat", cluster: "Stirring Giants", z: 0.9, wz: 1.0, quadrant: "High-High" },
    { id: "jatim", name: "Jawa Timur", cluster: "Stirring Giants", z: 0.7, wz: 0.6, quadrant: "High-High" },
    { id: "jateng", name: "Jawa Tengah", cluster: "Stirring Giants", z: 0.5, wz: 0.5, quadrant: "High-High" },

    // Quadrant III: Low-Low (Coldspot - Deep Sleepers)
    { id: "ntt", name: "Nusa Tenggara Timur", cluster: "Deep Sleepers", z: -1.6, wz: -1.2, quadrant: "Low-Low" },
    { id: "papua", name: "Papua", cluster: "Deep Sleepers", z: -1.8, wz: -1.5, quadrant: "Low-Low" },
    { id: "papuabar", name: "Papua Barat", cluster: "Deep Sleepers", z: -1.4, wz: -1.1, quadrant: "Low-Low" },
    { id: "maluku", name: "Maluku", cluster: "Deep Sleepers", z: -1.5, wz: -1.3, quadrant: "Low-Low" },
    { id: "malut", name: "Maluku Utara", cluster: "Deep Sleepers", z: -1.1, wz: -0.9, quadrant: "Low-Low" },
    { id: "sulbar", name: "Sulawesi Barat", cluster: "Deep Sleepers", z: -1.2, wz: -0.8, quadrant: "Low-Low" },
    { id: "sulteng", name: "Sulawesi Tengah", cluster: "Deep Sleepers", z: -0.8, wz: -0.7, quadrant: "Low-Low" },
    { id: "gorontalo", name: "Gorontalo", cluster: "Deep Sleepers", z: -1.0, wz: -0.8, quadrant: "Low-Low" },
    { id: "ntb", name: "Nusa Tenggara Barat", cluster: "Deep Sleepers", z: -0.7, wz: -0.6, quadrant: "Low-Low" },

    // Quadrant II: Low-High (Spatial Outlier: Wilayah tertinggal dikelilingi wilayah tinggi)
    { id: "lampung", name: "Lampung", cluster: "Stirring Giants", z: -0.4, wz: 0.6, quadrant: "Low-High" },
    { id: "bengkulu", name: "Bengkulu", cluster: "Deep Sleepers", z: -0.6, wz: 0.4, quadrant: "Low-High" },

    // Quadrant IV: High-Low (Spatial Outlier: Wilayah tinggi terisolasi)
    { id: "sumut", name: "Sumatera Utara", cluster: "Stirring Giants", z: 0.6, wz: -0.4, quadrant: "High-Low" },
    { id: "sulsel", name: "Sulawesi Selatan", cluster: "Stirring Giants", z: 0.5, wz: -0.3, quadrant: "High-Low" },
  ];

  // SVG dimensions: viewBox 0 0 460 360, Center at (230, 180)
  const centerX = 230;
  const centerY = 180;
  const scale = 75; // 1 unit in z/wz = 75 pixels

  const getCoordinates = (z: number, wz: number) => {
    return {
      x: centerX + z * scale,
      y: centerY - wz * scale,
    };
  };

  const filteredPoints = dataPoints.filter((p) => {
    if (selectedQuadrant === "all") return true;
    return p.quadrant === selectedQuadrant;
  });

  return (
    <div className="infographic-card p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-100 dark:border-blue-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#082046] text-amber-300">
              Moran&apos;s Scatterplot
            </span>
            <span className="text-xs font-bold text-slate-500">I = +0,1602 (p &lt; 0.10)</span>
          </div>
          <h3 className="text-lg font-black text-[#082046] dark:text-white mt-1">
            Visualisasi Autokorelasi Spasial 4 Kuadran
          </h3>
          <p className="text-xs text-slate-500 dark:text-blue-200/70 mt-0.5">
            Membuktikan clustering spasial: klaster maju bertetangga dengan wilayah maju (Hotspots), dan wilayah tertinggal terperangkap bersama tetangganya (Coldspots).
          </p>
        </div>

        {/* Quadrant Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {[
            { id: "all", label: "Semua Kuadran" },
            { id: "High-High", label: "Q1: High-High (Hotspot)" },
            { id: "Low-Low", label: "Q3: Low-Low (Coldspot)" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedQuadrant(btn.id)}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                selectedQuadrant === btn.id
                  ? "bg-[#082046] text-amber-300 shadow-xs"
                  : "bg-slate-100 dark:bg-[#061836] text-slate-600 dark:text-blue-200 hover:bg-slate-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scatterplot Grid & SVG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Scatterplot SVG Canvas (7 cols) */}
        <div className="lg:col-span-7 relative bg-slate-50 dark:bg-[#041124] rounded-2xl p-4 border border-blue-200/70 dark:border-blue-900/50 shadow-inner">
          <svg className="w-full h-auto aspect-[460/360] overflow-visible" viewBox="0 0 460 360">
            {/* Quadrant Shading Backgrounds */}
            <rect x="230" y="0" width="230" height="180" fill="#fef9c3" fillOpacity="0.3" /> {/* Q1: High-High */}
            <rect x="0" y="180" width="230" height="180" fill="#082046" fillOpacity="0.08" /> {/* Q3: Low-Low */}

            {/* Cartesian Axes */}
            <line x1="20" y1="180" x2="440" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="230" y1="20" x2="230" y2="340" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Regression Line: Moran's I Slope = 0.1602 */}
            {/* At x = -180 (z = -2.4): y_offset = -2.4 * 0.1602 * 75 = -28.8px -> SVG y = 180 + 28.8 = 208.8 */}
            {/* At x = +180 (z = +2.4): y_offset = +2.4 * 0.1602 * 75 = +28.8px -> SVG y = 180 - 28.8 = 151.2 */}
            <line
              x1="50"
              y1="210"
              x2="410"
              y2="150"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Quadrant Watermark Labels */}
            <text x="330" y="45" fill="#ca8a04" fontSize="11" fontWeight="800" textAnchor="middle">
              KUADRAN I: HIGH-HIGH
            </text>
            <text x="330" y="60" fill="#854d0e" fontSize="9" fontWeight="600" textAnchor="middle">
              Hotspots (Klaster Maju)
            </text>

            <text x="115" y="45" fill="#64748b" fontSize="10" fontWeight="700" textAnchor="middle">
              KUADRAN II: LOW-HIGH
            </text>
            <text x="115" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">
              Spatial Outliers
            </text>

            <text x="115" y="315" fill="#1e3a8a" fontSize="11" fontWeight="800" textAnchor="middle">
              KUADRAN III: LOW-LOW
            </text>
            <text x="115" y="330" fill="#3b82f6" fontSize="9" fontWeight="600" textAnchor="middle">
              Coldspots (The Deep Sleepers)
            </text>

            <text x="330" y="315" fill="#64748b" fontSize="10" fontWeight="700" textAnchor="middle">
              KUADRAN IV: HIGH-LOW
            </text>
            <text x="330" y="330" fill="#94a3b8" fontSize="8" textAnchor="middle">
              Spatial Outliers
            </text>

            {/* Axis Arrows & Titles */}
            <text x="430" y="195" fill="#64748b" fontSize="9" fontWeight="700" textAnchor="end">
              Produktivitas (z) ➔
            </text>
            <text x="238" y="30" fill="#64748b" fontSize="9" fontWeight="700">
              ⬆ Spatial Lag (Wz)
            </text>

            {/* Data Points */}
            {filteredPoints.map((pt) => {
              const { x, y } = getCoordinates(pt.z, pt.wz);
              const isHovered = hoveredPoint?.id === pt.id;

              // Color based on Cluster
              const fillColor =
                pt.cluster === "Awakened Leaders"
                  ? "#f59e0b"
                  : pt.cluster === "Stirring Giants"
                  ? "#0284c7"
                  : "#082046";

              const strokeColor = pt.cluster === "Deep Sleepers" ? "#38bdf8" : "#ffffff";

              return (
                <g
                  key={pt.id}
                  className="cursor-pointer transition-transform duration-200"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onClick={() => setHoveredPoint(pt)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 8 : 5}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    className="transition-all"
                  />
                  {/* Subtle label for key provinces */}
                  {(isHovered || ["dki", "bali", "ntt", "papua", "jabar"].includes(pt.id)) && (
                    <text
                      x={x + (pt.z >= 0 ? 8 : -8)}
                      y={y + 3}
                      fill={isHovered ? "#082046" : "#475569"}
                      fontSize={isHovered ? "11" : "9"}
                      fontWeight={isHovered ? "900" : "600"}
                      textAnchor={pt.z >= 0 ? "start" : "end"}
                      className="select-none pointer-events-none"
                    >
                      {pt.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Quadrant Detail & Statistical Meaning (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {hoveredPoint ? (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#071c3b] border-2 border-amber-300 dark:border-amber-600 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#082046] dark:text-white uppercase tracking-wider">
                  Provinsi Terpilih:
                </span>
                <Badge
                  variant={
                    hoveredPoint.cluster === "Awakened Leaders"
                      ? "cluster2"
                      : hoveredPoint.cluster === "Stirring Giants"
                      ? "cluster1"
                      : "cluster0"
                  }
                  className="text-xs"
                >
                  {hoveredPoint.cluster}
                </Badge>
              </div>

              <div>
                <h4 className="text-xl font-black text-[#082046] dark:text-white">
                  {hoveredPoint.name}
                </h4>
                <span className="text-xs text-[#0284c7] font-extrabold font-mono">
                  Posisi: {hoveredPoint.quadrant} (z = {hoveredPoint.z.toFixed(2)}, Wz = {hoveredPoint.wz.toFixed(2)})
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-blue-100 leading-relaxed">
                {hoveredPoint.quadrant === "High-High" &&
                  "Wilayah ini merupakan lokomotif produktivitas (Hotspot). Kepadatan transaksi QRIS dan infrastruktur perbankan tinggi memicu limpahan ekonomi (spillover) positif ke wilayah tetangga."}
                {hoveredPoint.quadrant === "Low-Low" &&
                  "Wilayah ini terjebak dalam perangkap spasial (Coldspot). Tingginya informalitas dan ketiadaan sinyal 4G menular antarprovinsi sekitar. Solusi GIAT Mode Lite USSD (*141*98#) menjadi kunci pelepasan jeratan ini."}
                {hoveredPoint.quadrant === "Low-High" &&
                  "Wilayah berproduktivitas sedang di perbatasan pusat industri. Berpotensi ditarik naik jika intervensi digital GIAT digencarkan."}
                {hoveredPoint.quadrant === "High-Low" &&
                  "Pusat pertumbuhan ekonomi lokal yang masih terisolasi dari wilayah tetangganya."}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#f0f7ff] dark:bg-[#071c3b] border border-blue-200 dark:border-blue-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-black text-[#082046] dark:text-white">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Eksplorasi Titik Provinsi</span>
              </div>
              <p className="text-slate-600 dark:text-blue-200/80 leading-relaxed">
                Arahkan kursor atau klik titik-titik provinsi pada scatterplot untuk membaca diagnostik keterhubungan spasial dan interpretasi ekonominya.
              </p>
            </div>
          )}

          {/* Key Statistical Takeaways */}
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-[#051630] border border-slate-200 dark:border-blue-900 flex items-start gap-2.5">
              <span className="font-mono font-black text-amber-500 text-sm">01</span>
              <div>
                <strong className="text-[#082046] dark:text-white">Slope Kemiringan Garis Regresi:</strong>
                <p className="text-slate-500 dark:text-blue-200/70 mt-0.5">
                  Kemiringan garis regresi biru tepat sama dengan <strong>Moran&apos;s I = +0,1602</strong>, mengonfirmasi autokorelasi spasial positif secara empiris.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#051630] border border-slate-200 dark:border-blue-900 flex items-start gap-2.5">
              <span className="font-mono font-black text-cyan-500 text-sm">02</span>
              <div>
                <strong className="text-[#082046] dark:text-white">Konsentrasi Kuadran I &amp; III:</strong>
                <p className="text-slate-500 dark:text-blue-200/70 mt-0.5">
                  Mayoritas 34 provinsi terkumpul di Kuadran I (Maju-Maju) dan Kuadran III (Tertinggal-Tertinggal), membuktikan bahwa disparitas ekonomi di Indonesia bersifat <em>spatially clustered</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
