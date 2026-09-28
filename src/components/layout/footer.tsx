import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 text-sm text-zinc-500 dark:text-zinc-400">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-200/80 dark:border-zinc-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-base text-zinc-900 dark:text-zinc-50">
                GIAT Prototype • Arsen 2026
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
              <strong>Awakening The Sleeping Giant</strong>: Bagaimana GIAT Mengubah Volatilitas Informalitas UMKM Menjadi Kepastian Data. Mendukung <strong>SDG 8 (Decent Work & Economic Growth)</strong> dan pilar ekonomi <strong>Visi Indonesia Emas 2045</strong>.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                <ShieldCheck className="h-3 w-3" /> ASICM036
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                <HeartHandshake className="h-3 w-3" /> Subtema: Sosial Ekonomi
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-medium">
                🏛️ K-means & Spatial Error Model
              </span>
            </div>
          </div>

          {/* Module Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Modul GIAT
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/kasir" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  1. GIAT Kasir & Mode Lite
                </Link>
              </li>
              <li>
                <Link href="/score" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  2. GIAT Alternative Scoring
                </Link>
              </li>
              <li>
                <Link href="/connect" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  3. GIAT Connect Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard UMKM Terpadu
                </Link>
              </li>
            </ul>
          </div>

          {/* Analytical & Demo */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Riset & Eksplorasi
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/analytics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Peta Spasial 3 Klaster Wilayah
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  <Compass className="h-3 w-3 text-blue-500" />
                  <span>Panduan Tur Interaktif</span>
                </Link>
              </li>
              <li>
                <Link href="/#swot" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Analisis SWOT & Mitigasi Risiko
                </Link>
              </li>
              <li>
                <Link href="/#problem" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Financing Gap Rp2.400 Triliun
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>
            &copy; 2026 <strong>IRIS Iqbal I&apos;tishom</strong> • Arsen 2026 (ASICM036).
          </p>
          <p className="text-zinc-400 dark:text-zinc-500">
            Prototipe Fungsional Terpadu Next.js 16 + React 19 + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
