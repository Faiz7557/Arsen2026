import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, Compass, Layers, Globe2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-blue-900/30 bg-[#082046] text-white py-12 text-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-[#082046] font-black text-lg shadow-md border border-amber-200">
                G
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-wider text-amber-300">
                  GIAT • ARSEN 2026
                </span>
                <span className="text-[11px] text-blue-200/80">
                  Airlangga Statistics Event • Universitas Airlangga
                </span>
              </div>
            </div>

            <p className="text-xs text-blue-100/80 max-w-md leading-relaxed">
              <strong>Awakening The Sleeping Giant</strong>: Bagaimana GIAT Mengubah Volatilitas Informalitas UMKM Menjadi Kepastian Data. Menjawab paradoks 64,2 juta UMKM menuju pilar ekonomi <strong>Visi Indonesia Emas 2045</strong> dan <strong>SDG&apos;s 8 (Decent Work &amp; Economic Growth)</strong>.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-300 font-bold border border-cyan-400/30">
                <ShieldCheck className="h-3 w-3" /> No. Peserta: ASICM036
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 font-bold border border-amber-400/30">
                <HeartHandshake className="h-3 w-3" /> Tim: IRIS Iqbal I&apos;tishom
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 font-bold border border-emerald-400/30">
                <Globe2 className="h-3 w-3" /> Subtema: Sosial Ekonomi
              </span>
            </div>
          </div>

          {/* Module Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-400">
              Modul Solusi GIAT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/kasir" className="text-blue-100/80 hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  1. GIAT Kasir &amp; Mode Lite
                </Link>
              </li>
              <li>
                <Link href="/score" className="text-blue-100/80 hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  2. GIAT Alternative Scoring
                </Link>
              </li>
              <li>
                <Link href="/connect" className="text-blue-100/80 hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  3. GIAT Connect Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-blue-100/80 hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Dashboard Profil UMKM
                </Link>
              </li>
            </ul>
          </div>

          {/* Analytical & Demo */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-cyan-300">
              Riset Statistik Spasial
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/analytics" className="text-blue-100/80 hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  K-means: 3 Klaster Wilayah
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-blue-100/80 hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Moran&apos;s I &amp; Spatial Error Model
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-blue-100/80 hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <Compass className="h-3 w-3 text-amber-400" />
                  Panduan Interaktif Dewan Juri
                </Link>
              </li>
              <li>
                <Link href="/#akar-masalah" className="text-blue-100/80 hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  Akar Masalah: Feasible Unbankable
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-200/70">
          <p>
            &copy; 2026 <strong>IRIS Iqbal I&apos;tishom</strong> • Karya Infografis &amp; Prototipe ASICM036
          </p>
          <p className="font-mono text-[11px] text-blue-300/80">
            Airlangga Statistics Event (ASE) 2026 • Universitas Airlangga
          </p>
        </div>
      </div>
    </footer>
  );
}
