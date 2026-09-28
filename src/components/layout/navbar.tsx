"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  Gauge,
  Network,
  BarChart3,
  LayoutDashboard,
  Compass,
  RotateCcw,
  Menu,
  X,
  Store,
  FileImage,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useGiat } from "@/context/giat-context";

export function Navbar() {
  const pathname = usePathname();
  const { activeUmkm, umkms, setActiveUmkmId, resetDemoData } = useGiat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [posterModalOpen, setPosterModalOpen] = useState(false);
  const [paperModalOpen, setPaperModalOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/kasir", label: "GIAT Kasir", icon: CreditCard, badge: "Modul 1" },
    { href: "/score", label: "GIAT Score", icon: Gauge, badge: "Modul 2" },
    { href: "/connect", label: "GIAT Connect", icon: Network, badge: "Modul 3" },
    { href: "/analytics", label: "Analisis Spasial", icon: BarChart3 },
    { href: "/demo", label: "Panduan Demo", icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900/20 bg-[#082046]/95 text-white backdrop-blur-md shadow-md transition-colors">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand / Logo matching the 3D golden GIAT identity from infographic */}
        <Link href="/" className="flex items-center gap-3 font-extrabold tracking-tight group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-[#082046] shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform border border-amber-200">
            <span className="font-black text-lg">G</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                GIAT
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
                ASICM036
              </span>
            </div>
            <span className="text-[10px] text-blue-200/80 -mt-1 hidden sm:inline font-medium">
              Awakening The Sleeping Giant
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-white/15 text-amber-300 font-extrabold shadow-inner border border-white/10"
                    : "text-blue-100/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Active UMKM Switcher + Poster Button + Reset Demo */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* View Original Infographic Poster Button for Judges */}
          <button
            onClick={() => setPosterModalOpen(true)}
            title="Lihat Poster Karya Infografis Asli (ASICM036)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 transition-all cursor-pointer shadow-xs"
          >
            <FileImage className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Poster Asli</span>
          </button>

          {/* View Description Paper PDF Button for Judges */}
          <button
            onClick={() => setPaperModalOpen(true)}
            title="Lihat Naskah Deskripsi Karya Ilmiah ASICM036"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 transition-all cursor-pointer shadow-xs"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Naskah Paper</span>
          </button>

          {/* Quick UMKM Switcher Dropdown with Cluster Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15 bg-white/10 text-xs shadow-inner">
            <Store className="h-3.5 w-3.5 text-amber-300" />
            <select
              aria-label="Pilih Profil UMKM"
              value={activeUmkm.id}
              onChange={(e) => setActiveUmkmId(e.target.value)}
              className="bg-transparent font-bold text-white focus:outline-none cursor-pointer max-w-[130px] truncate"
            >
              {umkms.map((u) => (
                <option key={u.id} value={u.id} className="text-[#082046] bg-white">
                  {u.avatar} {u.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetDemoData}
            title="Reset data transaksi demo ke default"
            className="text-blue-200 hover:text-white hover:bg-white/10 h-8 px-2.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden md:inline text-xs ml-1 font-bold">Reset</span>
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#061836] p-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-semibold text-blue-200">Pilih Profil UMKM:</span>
            <select
              aria-label="Pilih Profil UMKM Mobile"
              value={activeUmkm.id}
              onChange={(e) => setActiveUmkmId(e.target.value)}
              className="text-xs p-1.5 rounded-lg border bg-[#082046] text-white border-white/20"
            >
              {umkms.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.avatar} {u.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-sm ${
                    isActive
                      ? "bg-white/15 text-amber-300 font-extrabold"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Original Infographic Poster Modal for Judges */}
      <Modal
        isOpen={posterModalOpen}
        onClose={() => setPosterModalOpen(false)}
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

      {/* Description Paper PDF Modal for Judges */}
      <Modal
        isOpen={paperModalOpen}
        onClose={() => setPaperModalOpen(false)}
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
              File: <code>Deskripsi Karya_ASICM036_IRIS Iqbal I&apos;tishom.pdf</code>
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
    </header>
  );
}
