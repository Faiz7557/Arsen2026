"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  X,
  FileImage,
  FileText,
  BarChart3,
  CreditCard,
  Gauge,
  Network,
  CheckCircle2,
  ChevronDown,
  Award,
  ExternalLink,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";

export function JudgeTourFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const [paperOpen, setPaperOpen] = useState(false);

  return (
    <>
      {/* Floating Pill Button */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#082046] text-white border-2 border-amber-400 shadow-2xl hover:scale-105 transition-all cursor-pointer group hover:bg-[#0d2f60]"
            aria-label="Buka Panduan Dewan Juri"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-[#082046]">
              <Compass className="h-4 w-4 animate-spin-slow" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-amber-300 tracking-wide uppercase">
                Panduan Juri ASE 2026
              </span>
              <span className="text-[10px] text-blue-200 -mt-0.5">
                ASICM036 • IRIS Iqbal I&apos;tishom
              </span>
            </div>
          </button>
        ) : (
          /* Expanded Floating Panel */
          <div className="w-80 sm:w-96 rounded-3xl bg-[#082046] text-white border-2 border-amber-400/80 shadow-2xl p-5 space-y-4 animate-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-400 text-[#082046]">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-amber-300 tracking-wider">
                    Panduan Evaluasi Juri
                  </h4>
                  <p className="text-[10px] text-blue-200">Airlangga Statistics Event 2026</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup Panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Document Access */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPosterOpen(true)}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold hover:bg-amber-400/30 transition-colors cursor-pointer"
              >
                <FileImage className="h-3.5 w-3.5" />
                <span>Poster Asli</span>
              </button>

              <button
                onClick={() => setPaperOpen(true)}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold hover:bg-cyan-400/30 transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Naskah Paper</span>
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-mono text-blue-300 font-bold uppercase tracking-wider block">
                Rubrik &amp; Modul Solusi:
              </span>

              <Link
                href="/analytics"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/10 transition-colors text-blue-100 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-cyan-300" />
                  <span>1. Ekonometrika &amp; Moran&apos;s I</span>
                </div>
                <span className="text-[10px] font-mono bg-cyan-400/20 text-cyan-300 px-1.5 py-0.5 rounded">
                  SEM &amp; K-means
                </span>
              </Link>

              <Link
                href="/kasir"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/10 transition-colors text-blue-100 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-emerald-300" />
                  <span>2. GIAT Kasir &amp; Mode Lite 3T</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded">
                  QRIS / USSD
                </span>
              </Link>

              <Link
                href="/score"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/10 transition-colors text-blue-100 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-amber-300" />
                  <span>3. Alternative Credit Scoring</span>
                </div>
                <span className="text-[10px] font-mono bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded">
                  5 Dimensi
                </span>
              </Link>

              <Link
                href="/connect"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/10 transition-colors text-blue-100 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-purple-300" />
                  <span>4. GIAT Connect (Agunan Digital)</span>
                </div>
                <span className="text-[10px] font-mono bg-purple-400/20 text-purple-300 px-1.5 py-0.5 rounded">
                  Underwriting
                </span>
              </Link>

              <Link
                href="/demo"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/10 transition-colors text-blue-100 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-yellow-300" />
                  <span>5. Tur Terpandu 5-Langkah</span>
                </div>
                <span className="text-[10px] font-mono bg-yellow-400/20 text-yellow-300 px-1.5 py-0.5 rounded">
                  Guided
                </span>
              </Link>
            </div>

            {/* Subtema & Team Tag */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-blue-200">
              <span>Subtema: <strong>Sosial Ekonomi</strong></span>
              <span className="font-mono text-amber-300 font-bold">UNAIR ASE 2026</span>
            </div>
          </div>
        )}
      </div>

      {/* Original Poster Lightbox Modal */}
      <Modal
        isOpen={posterOpen}
        onClose={() => setPosterOpen(false)}
        title="Karya Infografis Resmi: ASICM036"
        description="Awakening The Sleeping Giant • Airlangga Statistics Event (ASE) 2026"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-800 bg-[#082046] max-h-[70vh] overflow-y-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/infografis-asicm036.png"
              alt="Karya Infografis ASICM036 IRIS Iqbal I'tishom"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
            <span className="text-slate-500 font-medium">
              Tim: <strong>IRIS Iqbal I&apos;tishom</strong> • Subtema: <strong>Sosial Ekonomi</strong>
            </span>
            <a
              href="/infografis-asicm036.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#082046] text-amber-300 font-bold hover:bg-[#0d2f60] transition-colors"
            >
              <span>Buka Resolusi Penuh</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Modal>

      {/* Description Paper PDF Modal */}
      <Modal
        isOpen={paperOpen}
        onClose={() => setPaperOpen(false)}
        title="Naskah Deskripsi Karya Ilmiah: ASICM036"
        description="Awakening The Sleeping Giant • IRIS Iqbal I'tishom • ASE 2026"
        maxWidth="3xl"
      >
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-800 bg-slate-100 dark:bg-[#061836] h-[70vh]">
            <iframe
              src="/deskripsi-karya-asicm036.pdf"
              title="Deskripsi Karya ASICM036 IRIS Iqbal I'tishom"
              className="w-full h-full border-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
            <span className="text-slate-500 font-medium">
              Dokumen Resmi: <code>Deskripsi Karya_ASICM036_IRIS Iqbal I&apos;tishom.pdf</code>
            </span>
            <a
              href="/deskripsi-karya-asicm036.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0284c7] text-white font-bold hover:bg-[#0369a1] transition-colors"
            >
              <span>Unduh / Buka Dokumen Penuh</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}
