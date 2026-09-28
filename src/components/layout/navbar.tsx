"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  Gauge,
  Network,
  BarChart3,
  Sparkles,
  LayoutDashboard,
  Compass,
  RotateCcw,
  Menu,
  X,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGiat } from "@/context/giat-context";

export function Navbar() {
  const pathname = usePathname();
  const { activeUmkm, umkms, setActiveUmkmId, resetDemoData } = useGiat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/kasir", label: "GIAT Kasir", icon: CreditCard, badge: "Modul 1" },
    { href: "/score", label: "GIAT Score", icon: Gauge, badge: "Modul 2" },
    { href: "/connect", label: "GIAT Connect", icon: Network, badge: "Modul 3" },
    { href: "/analytics", label: "Analisis Wilayah", icon: BarChart3 },
    { href: "/demo", label: "Demo Panduan", icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                GIAT
              </span>
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-mono border-blue-400/40 text-blue-600 dark:text-blue-400">
                ASICM036
              </Badge>
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 -mt-1 hidden sm:inline">
              Awakening The Sleeping Giant
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1 py-0.2 rounded font-mono bg-blue-100/70 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Active UMKM Switcher + Reset Demo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick UMKM Switcher Dropdown */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs">
            <Store className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <select
              aria-label="Pilih UMKM Aktif"
              value={activeUmkm.id}
              onChange={(e) => setActiveUmkmId(e.target.value)}
              className="bg-transparent font-medium text-zinc-700 dark:text-zinc-300 focus:outline-none cursor-pointer max-w-[130px] truncate"
            >
              {umkms.map((u) => (
                <option key={u.id} value={u.id} className="dark:bg-zinc-900">
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
            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 h-8 px-2"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden md:inline text-xs ml-1">Reset Demo</span>
          </Button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-semibold text-zinc-500">Pilih Profil UMKM:</span>
            <select
              aria-label="Pilih Profil UMKM Mobile"
              value={activeUmkm.id}
              onChange={(e) => setActiveUmkmId(e.target.value)}
              className="text-xs p-1 rounded border dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
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
                  className={`flex items-center justify-between p-2.5 rounded-lg text-sm ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
