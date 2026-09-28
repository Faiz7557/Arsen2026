"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  FileCheck2,
  RotateCw,
} from "lucide-react";
import { useGiat } from "@/context/giat-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { FinancialPartner, LoanApplication } from "@/types";

export default function ConnectPage() {
  const { activeUmkm, scoreDetail, partners, applications, submitLoanApplication } = useGiat();

  // Partner filter
  const [filterType, setFilterType] = useState<string>("all");

  // Application Modal state
  const [selectedPartner, setSelectedPartner] = useState<FinancialPartner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState<number>(35000000);
  const [tenorMonths, setTenorMonths] = useState<number>(24);
  const [loanPurpose, setLoanPurpose] = useState<LoanApplication["purpose"]>("Modal Usaha");
  const [modalStep, setModalStep] = useState<"form" | "verifying" | "success">("form");
  const [verificationProgress, setVerificationProgress] = useState(0);

  // Active UMKM applications
  const umkmApplications = applications.filter((app) => app.umkmId === activeUmkm.id);

  // Filter partners
  const filteredPartners = partners.filter((p) => {
    if (filterType === "all") return true;
    if (filterType === "himbara") return p.type === "Bank Himbara";
    if (filterType === "syariah") return p.type === "Bank Syariah";
    if (filterType === "p2p") return p.type === "P2P Lending" || p.type === "Fintech Produktif";
    if (filterType === "eligible") return scoreDetail.totalScore >= p.minScore;
    return true;
  });

  const openApplyModal = (partner: FinancialPartner) => {
    setSelectedPartner(partner);
    setLoanAmount(Math.min(partner.maxLimit, scoreDetail.maxLoanLimit));
    setModalStep("form");
    setIsModalOpen(true);
  };

  const handleStartApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPartner) return;

    setModalStep("verifying");
    setVerificationProgress(20);

    // Simulate multi-step digital underwriting
    setTimeout(() => setVerificationProgress(55), 700);
    setTimeout(() => setVerificationProgress(85), 1400);
    setTimeout(() => {
      setVerificationProgress(100);
      submitLoanApplication(selectedPartner.id, loanAmount, tenorMonths, loanPurpose);
      setModalStep("success");
    }, 2100);
  };

  // Estimate monthly installment
  const interestRateAnnual = selectedPartner?.interestRate.includes("6.0%") ? 0.06 : 0.08;
  const estimatedMonthly = Math.round(
    (loanAmount * (1 + interestRateAnnual * (tenorMonths / 12))) / tenorMonths
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="default" className="text-xs">
              Modul 3: GIAT Connect
            </Badge>
            <span className="text-xs text-zinc-500">• Penyaluran Kredit Tanpa Agunan Fisik</span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
            <span>Marketplace Lembaga Keuangan Mitra</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Menyalurkan skor kredit alternatif <span className="font-semibold text-zinc-700 dark:text-zinc-300">{activeUmkm.name}</span> (Skor: <strong>{scoreDetail.totalScore}</strong>, Grade <strong>{scoreDetail.grade}</strong>) ke mitra bank &amp; fintech resmi OJK.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              <span>Ke Dashboard UMKM</span>
            </Button>
          </Link>
          <Link href="/analytics">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 font-bold">
              <span>Lihat Dampak Wilayah</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Credit Summary Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-zinc-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ⚡ Status: Layak Pengajuan Kredit (Feasible &amp; Bankable)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Plafon Pre-Approved: Rp {(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Juta
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
            Hasil evaluasi algoritma GIAT menunjukkan skor kredit <strong>{scoreDetail.totalScore} (Grade {scoreDetail.grade})</strong>. Anda memenuhi syarat di mayoritas bank mitra tanpa perlu menyerahkan sertifikat fisik tanah atau BPKB.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
          <div className="text-center px-2">
            <div className="text-xs text-zinc-300">Estimasi Bunga</div>
            <div className="text-xl font-black text-emerald-400 mt-0.5">
              {scoreDetail.estimatedInterestRate}% p.a.
            </div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center px-2">
            <div className="text-xs text-zinc-300">Agunan Fisik</div>
            <div className="text-xl font-black text-cyan-300 mt-0.5">
              0% (Digital)
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <span className="text-xs font-semibold text-zinc-400 mr-2">Filter Mitra:</span>
        {[
          { id: "all", label: "Semua Mitra" },
          { id: "eligible", label: "Memenuhi Syarat Skor" },
          { id: "himbara", label: "Bank Himbara (KUR)" },
          { id: "syariah", label: "Bank Syariah" },
          { id: "p2p", label: "Fintech P2P Produktif" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === tab.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => {
          const isEligible = scoreDetail.totalScore >= partner.minScore;

          return (
            <div
              key={partner.id}
              className={`rounded-3xl border bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                isEligible
                  ? "border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50"
                  : "border-zinc-200 dark:border-zinc-800 opacity-75"
              }`}
            >
              <div>
                {/* Partner Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                      {partner.logo}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50 leading-tight">
                        {partner.name}
                      </h3>
                      <span className="text-xs text-zinc-500 font-medium">
                        {partner.type}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                    {partner.badgeText}
                  </span>
                </div>

                {/* Score Requirement Status */}
                <div className="mb-4">
                  {isEligible ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>Skor Anda Memenuhi ({scoreDetail.totalScore} ≥ {partner.minScore})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl border border-amber-200 dark:border-amber-800">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>Butuh Skor Minimal {partner.minScore} (Saat ini: {scoreDetail.totalScore})</span>
                    </div>
                  )}
                </div>

                {/* Partner Details Table */}
                <div className="space-y-2 text-xs py-3 border-y border-zinc-100 dark:border-zinc-800 mb-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Plafon Maksimal:</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      Hingga Rp {(partner.maxLimit / 1000000).toFixed(0)} Juta
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Suku Bunga:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {partner.interestRate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Tenor Pinjaman:</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {partner.tenor}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Kecepatan Verifikasi:</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {partner.approvalSpeed}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Agunan:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      Jejak Digital Kasir GIAT
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => openApplyModal(partner)}
                className={`w-full gap-2 font-bold cursor-pointer ${
                  isEligible
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300"
                }`}
              >
                <span>{isEligible ? "Ajukan Pinjaman Sekarang" : "Ajukan dengan Verifikasi Lanjut"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Active Loan Applications Tracking */}
      <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-5 w-5 text-blue-600" />
            <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-50">
              Riwayat Pengajuan Kredit UMKM Ini
            </h3>
          </div>
          <Badge variant="outline">{umkmApplications.length} Pengajuan</Badge>
        </div>

        {umkmApplications.length === 0 ? (
          <div className="p-8 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
            <p className="text-sm text-zinc-500">
              Belum ada pengajuan kredit aktif. Klik salah satu mitra di atas untuk mengajukan kredit pertama Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {umkmApplications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{app.partnerLogo}</span>
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {app.partnerName}
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-400">
                        ID: {app.id} • {app.purpose}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Nominal:</span>
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      Rp {app.approvedAmount.toLocaleString("id-ID")}
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Tenor:</span>
                    <strong className="text-zinc-900 dark:text-zinc-100">{app.tenorMonths} Bulan</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Bunga:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">{app.interestRate}% p.a.</strong>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  {app.notes}
                </p>

                <div className="text-[10px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
                  <span>Diajukan: {new Date(app.submittedAt).toLocaleDateString("id-ID")}</span>
                  <span>Snapshot Skor: {app.giatScoreSnapshot}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive 3-Step Loan Application Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPartner ? `Pengajuan Kredit: ${selectedPartner.name}` : "Pengajuan Kredit"}
        description="Verifikasi otomatis SLIK & jejak digital kasir tanpa agunan fisik"
      >
        {modalStep === "form" && selectedPartner && (
          <form onSubmit={handleStartApplication} className="space-y-5">
            {/* Amount Slider */}
            <div className="space-y-2 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Nominal Pinjaman Modal:
                </label>
                <span className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  Rp {loanAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <input
                type="range"
                min="5000000"
                max={Math.min(selectedPartner.maxLimit, scoreDetail.maxLoanLimit)}
                step="2500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>Min: Rp 5 Juta</span>
                <span>Plafon Pre-Approved: Rp {(scoreDetail.maxLoanLimit / 1000000).toFixed(0)} Jt</span>
              </div>
            </div>

            {/* Tenor & Purpose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Jangka Waktu (Tenor)
                </label>
                <Select
                  value={tenorMonths}
                  onChange={(e) => setTenorMonths(Number(e.target.value))}
                >
                  <option value={6}>6 Bulan</option>
                  <option value={12}>12 Bulan (1 Tahun)</option>
                  <option value={24}>24 Bulan (2 Tahun)</option>
                  <option value={36}>36 Bulan (3 Tahun)</option>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Tujuan Penggunaan Dana
                </label>
                <Select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value as LoanApplication["purpose"])}
                >
                  <option value="Modal Usaha">Modal Usaha / Stok Barang</option>
                  <option value="Pembelian Stok">Pembelian Alat / Bahan Baku</option>
                  <option value="Upgrade Alat Kasir/QRIS">Digitalisasi Kasir & POS</option>
                  <option value="Ekspansi Cabang">Buka Cabang Baru</option>
                </Select>
              </div>
            </div>

            {/* Installment Simulation Box */}
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Estimasi Angsuran Bulanan:</span>
                <span className="font-black text-blue-700 dark:text-blue-300 text-sm">
                  Rp {estimatedMonthly.toLocaleString("id-ID")} / bulan
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Jaminan yang Digunakan:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  Data Transaksi QRIS (Skor: {scoreDetail.totalScore})
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 font-bold bg-blue-600 hover:bg-blue-700 h-11 cursor-pointer">
              <ShieldCheck className="h-4 w-4" />
              <span>Kirim Pengajuan Berbasis Agunan Digital</span>
            </Button>
          </form>
        )}

        {/* Step 2: Underwriting Progress Simulator */}
        {modalStep === "verifying" && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <RotateCw className="h-10 w-10 text-blue-600 animate-spin" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Memvalidasi Digital Footprint Kasir...
              </h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                Sistem GIAT sedang menyinkronkan 48+ transaksi harian dan skor {scoreDetail.totalScore} ke sistem perbankan mitra.
              </p>
            </div>

            <div className="w-full max-w-xs space-y-1">
              <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${verificationProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-400">{verificationProgress}% Selesai</span>
            </div>
          </div>
        )}

        {/* Step 3: Success Instant Approval */}
        {modalStep === "success" && (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <h4 className="text-2xl font-black text-zinc-900 dark:text-zinc-50">
                🎉 Pengajuan Berhasil Disetujui!
              </h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                Plafon senilai <strong>Rp {loanAmount.toLocaleString("id-ID")}</strong> telah disetujui oleh {selectedPartner?.name}.
              </p>
            </div>

            <div className="w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-400">Peminjam:</span>
                <span className="font-bold">{activeUmkm.name} ({activeUmkm.owner})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tenor:</span>
                <span className="font-bold">{tenorMonths} Bulan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Agunan:</span>
                <span className="font-bold text-emerald-600">Digital Footprint QRIS Tervalidasi</span>
              </div>
            </div>

            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full font-bold bg-blue-600 hover:bg-blue-700"
            >
              Selesai &amp; Lihat Riwayat
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
