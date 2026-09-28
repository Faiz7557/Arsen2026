"use client";

import React, { useState } from "react";
import { UMKMCluster } from "@/types";

interface IslandRegion {
  id: string;
  name: string;
  dominantCluster: UMKMCluster;
  provincesCount: number;
  informalRate: number;
  description: string;
  // SVG path or simplified coordinates
  path: string;
  labelX: number;
  labelY: number;
}

interface IndonesiaSpatialMapProps {
  onSelectCluster?: (cluster: UMKMCluster | "all") => void;
  selectedCluster?: string;
}

export function IndonesiaSpatialMap({
  onSelectCluster,
  selectedCluster = "all",
}: IndonesiaSpatialMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<IslandRegion | null>(null);

  // Simplified geometric stylized SVG paths of Indonesia's 7 major island groups
  const regions: IslandRegion[] = [
    {
      id: "sumatera",
      name: "Sumatera",
      dominantCluster: "Stirring Giants",
      provincesCount: 10,
      informalRate: 62.4,
      description: "Sentra perkebunan & UMKM perdagangan. Terbagi antara Stirring Giants & Deep Sleepers di pesisir barat.",
      path: "M 45,95 L 65,70 L 95,50 L 115,40 L 135,45 L 125,65 L 105,95 L 85,120 L 70,145 L 55,140 Z",
      labelX: 85,
      labelY: 90,
    },
    {
      id: "jawa",
      name: "Jawa",
      dominantCluster: "Stirring Giants",
      provincesCount: 6,
      informalRate: 54.1,
      description: "Pusat volume ekonomi IMK (Jabar, Jateng, Jatim) dan episentrum Awakened Leaders di DKI Jakarta.",
      path: "M 95,160 L 135,160 L 180,165 L 210,170 L 225,175 L 215,185 L 160,180 L 120,175 L 95,170 Z",
      labelX: 160,
      labelY: 175,
    },
    {
      id: "kalimantan",
      name: "Kalimantan",
      dominantCluster: "Stirring Giants",
      provincesCount: 5,
      informalRate: 51.8,
      description: "Koridor energi & logistik IKN Nusantara. Menunjukkan akselerasi produktivitas menuju Awakened Leaders di Kaltim.",
      path: "M 150,80 L 185,60 L 215,65 L 230,85 L 225,115 L 195,130 L 165,125 L 145,105 Z",
      labelX: 185,
      labelY: 95,
    },
    {
      id: "sulawesi",
      name: "Sulawesi",
      dominantCluster: "Deep Sleepers",
      provincesCount: 6,
      informalRate: 71.3,
      description: "Karakteristik kepulauan dengan informalitas tinggi pada subsektor perikanan dan pertanian rakyat.",
      path: "M 255,75 L 275,65 L 285,85 L 265,105 L 280,120 L 270,140 L 255,135 L 250,105 Z",
      labelX: 265,
      labelY: 105,
    },
    {
      id: "bali_nusa",
      name: "Bali & Nusa Tenggara",
      dominantCluster: "Awakened Leaders",
      provincesCount: 3,
      informalRate: 48.7,
      description: "Kontras tinggi: Bali sebagai Awakened Leader pariwisata digital vs NTT sebagai Deep Sleepers yang butuh Mode Lite USSD.",
      path: "M 235,180 L 255,182 L 285,185 L 305,183 L 300,192 L 265,190 L 235,187 Z",
      labelX: 270,
      labelY: 195,
    },
    {
      id: "maluku",
      name: "Kepulauan Maluku",
      dominantCluster: "Deep Sleepers",
      provincesCount: 2,
      informalRate: 76.5,
      description: "Wilayah 3T kepulauan dengan ketergantungan tinggi pada transaksi tunai dan konektivitas dasar.",
      path: "M 320,85 L 335,80 L 340,100 L 325,115 L 315,100 Z",
      labelX: 330,
      labelY: 100,
    },
    {
      id: "papua",
      name: "Papua",
      dominantCluster: "Deep Sleepers",
      provincesCount: 6,
      informalRate: 84.2,
      description: "Klaster Deep Sleepers paling dominan dengan kesenjangan serapan formal tertinggi; prioritas utama solusi GIAT Mode Lite.",
      path: "M 360,90 L 410,95 L 430,120 L 425,150 L 390,145 L 365,130 L 350,110 Z",
      labelX: 395,
      labelY: 120,
    },
  ];

  const clusterColors = {
    "Deep Sleepers": {
      fill: "#082046",
      stroke: "#38bdf8",
      hover: "#0d2f60",
      badge: "bg-[#082046] text-white border-[#38bdf8]",
    },
    "Stirring Giants": {
      fill: "#0284c7",
      stroke: "#bae6fd",
      hover: "#0369a1",
      badge: "bg-[#0284c7] text-white border-[#bae6fd]",
    },
    "Awakened Leaders": {
      fill: "#fef08a",
      stroke: "#f59e0b",
      hover: "#fde047",
      badge: "bg-[#fef08a] text-[#854d0e] border-[#f59e0b]",
    },
  };

  return (
    <div className="w-full space-y-4">
      {/* Map Interactive Box */}
      <div className="relative rounded-3xl bg-[#082046] p-6 sm:p-8 text-white shadow-2xl border border-white/10 overflow-hidden">
        {/* Subtle grid background lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest text-cyan-300 font-extrabold uppercase">
                Peta Spasial Klaster Ekonomi Indonesia
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              Sebaran 3 Klaster Wilayah K-means
            </h4>
          </div>

          {/* Map Cluster Legend */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <button
              onClick={() => onSelectCluster?.("Deep Sleepers")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#082046] border border-[#38bdf8] text-white hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#082046] border border-[#38bdf8]" />
              <span>Deep Sleepers</span>
            </button>
            <button
              onClick={() => onSelectCluster?.("Stirring Giants")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0284c7] border border-[#bae6fd] text-white hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
              <span>Stirring Giants</span>
            </button>
            <button
              onClick={() => onSelectCluster?.("Awakened Leaders")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef08a] border border-[#f59e0b] text-[#854d0e] hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <span>Awakened Leaders</span>
            </button>
          </div>
        </div>

        {/* SVG Canvas */}
        <div className="relative w-full aspect-[2.2/1] min-h-[220px] sm:min-h-[280px] my-4 flex items-center justify-center">
          <svg
            className="w-full h-full drop-shadow-xl"
            viewBox="30 30 420 180"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Equator line */}
            <line
              x1="30"
              y1="110"
              x2="450"
              y2="110"
              stroke="#ffffff15"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            <text x="35" y="106" fill="#ffffff40" fontSize="7" fontFamily="monospace">
              Ekuator (0°)
            </text>

            {/* Region Paths */}
            {regions.map((reg) => {
              const meta = clusterColors[reg.dominantCluster];
              const isDimmed =
                selectedCluster !== "all" && selectedCluster !== reg.dominantCluster;
              const isHovered = hoveredRegion?.id === reg.id;

              return (
                <g
                  key={reg.id}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredRegion(reg)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectCluster?.(reg.dominantCluster)}
                >
                  <path
                    d={reg.path}
                    fill={isHovered ? meta.hover : meta.fill}
                    stroke={meta.stroke}
                    strokeWidth={isHovered ? "2.5" : "1.5"}
                    opacity={isDimmed ? 0.3 : 1}
                    className="transition-all duration-200"
                  />
                  {/* Region Marker Circle & Label */}
                  <circle
                    cx={reg.labelX}
                    cy={reg.labelY}
                    r={isHovered ? 4 : 2.5}
                    fill={meta.stroke}
                    className="transition-all"
                  />
                  <text
                    x={reg.labelX}
                    y={reg.labelY - 6}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    className="pointer-events-none drop-shadow-md select-none"
                    opacity={isDimmed ? 0.4 : 0.95}
                  >
                    {reg.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Region Inspection Callout */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          {hoveredRegion ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-full font-black text-xs ${clusterColors[hoveredRegion.dominantCluster].badge}`}>
                {hoveredRegion.name} • {hoveredRegion.dominantCluster}
              </span>
              <span className="text-blue-100 font-medium">
                {hoveredRegion.description}
              </span>
            </div>
          ) : (
            <div className="text-blue-200/90 font-medium flex items-center gap-2">
              <span>💡</span>
              <span>Arahkan kursor atau klik pada kepulauan di atas untuk menyorot profil klaster wilayah &amp; rekomendasi intervensi GIAT.</span>
            </div>
          )}

          {hoveredRegion && (
            <div className="shrink-0 flex items-center gap-2 text-cyan-300 font-mono font-bold">
              <span>Informalitas: {hoveredRegion.informalRate}%</span>
              <span>•</span>
              <span>{hoveredRegion.provincesCount} Prov</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
